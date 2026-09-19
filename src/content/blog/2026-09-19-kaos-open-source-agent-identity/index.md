---
title: Moving KAOS to the Open-Source Agentic Identity Broker
date: 2026-09-19
image: './featured.png'
summary: 'The Agentic Identity Broker was released as open source, so we spent a day moving KAOS off the closed-source clone it had been using. This is what broke, what we patched, and the one blocker we could not fix ourselves.'
tags: [kaos, agents, identity, kubernetes, open-source]
---

> Every workaround in our tree now carries the number of the upstream issue that will let us delete it.

The [Agentic Identity Broker](https://github.com/zalando-incubator/agentic-identity-broker) was finally released as a public repository, which is something we had been waiting on for a while. [KAOS](/open-source/kaos/) already had an AIB-backed identity mode, but it was built against a closed-source clone that nobody outside the original team could get hold of. So `--agent-auth-enabled aib` was a flag you could read in our docs and never actually run.

I spent a day moving the whole integration onto the public release, pinned at `v0.1.8`, and that work is now out as KAOS v0.8.0. What follows is what broke along the way, because the interesting part wasn't the migration itself, it was finding out how many of my assumptions had been carrying the closed-source version's behaviour for me.

## What the Broker Actually Does for KAOS

When KAOS deploys an agent, that agent needs to prove who it is to everything else in the cluster. Our operator registers the agent with the broker, mints client credentials for it, and the agent then obtains a token that says which agent it is. Anything that receives a call from that agent verifies the token against the broker's JWKS.

The second job is token exchange. When an agent calls a third-party service through the gateway, we swap the agent's own token for one that the downstream service will accept, following RFC 8693. That swap happens in the request path, inside Envoy, and it's the part that carries all the risk.

Those two halves are independent, and it turned out they broke in completely different ways.

## Discovery Was Where I Started, and It Was the Cheap Fix

The operator has to find the broker's authorization server metadata before it can do anything else. Our code went looking for an OpenID Connect discovery document, because that's what the closed-source clone served. The public broker serves RFC 8414 authorization-server metadata instead, and only that.

The fix was small. The operator now speaks RFC 8414, checks issuer equality exactly, and uses the advertised `jwks_uri` with a fallback to `<issuer>/oauth2/jwks.json`. Half an hour of work and the registration half of the flow came back to life.

At which point I thought I was nearly done, which is usually the point where I'm not.

## Token Exchange Had Moved Into Envoy Dynamic Metadata

The public `extproc` sidecar does not read the subject token and resource URI from request headers. It reads them only from Envoy dynamic metadata, under the key `aib.tokenexchange`. Our generated `EnvoyExtensionPolicy` published no such metadata, so the sidecar came up healthy, answered on its gRPC port, and had nothing to work with. Everything looked fine and no request could complete.

We now emit an inline Lua filter in that policy which publishes `aib.tokenexchange.subject_token` and `aib.tokenexchange.resource_uri`, with the filter chain ordered `jwt_authn -> ext_authz -> lua -> ext_proc`.

That ordering is the part worth dwelling on. `ext_authz` is our own policy decision point, `kaos-pdp`, running OPA with our rego. It sits **before** the swap, which means a policy can allow a request and still decline to exchange a token for it. That distinction used to be the reason we didn't adopt AIB more broadly, because the old design coupled the exchange to the authorization decision and there was no way to express one without the other. Keeping our own decision point in front of the exchange is what makes it expressible, and it's the main architectural opinion in the whole migration.

One incidental discovery while getting there: on Envoy Gateway v1.4.6, enabling the Backend extension API through configuration alone does nothing until you restart the gateway. `kaos system install` now does the restart for you.

## The Bridge We Had to Build, and Want to Delete

Here's the one I couldn't patch. The public broker will not register an agent that carries no permission sets, and a permission set has to reference scopes on a service that already exists.

We want identity and nothing else. There's no third-party service in the picture, no delegation, and nothing downstream being called on the agent's behalf. To register an agent whose only purpose is to have an identity, we first have to invent a service that nothing will ever call, then invent a permission set over that service's scopes, and attach it to every agent.

So that is exactly what KAOS does today. The CLI seeds a service named `kaos-identity-placeholder`, pointed at endpoints that deliberately do not resolve, plus a permission set named `kaos-identity`, and the operator binds every agent to it through `AIB_DEFAULT_PERMISSION_SET`. When the set can't be resolved the operator raises an `IdentityProvisioningDegraded` condition so at least the failure is visible.

I labelled it as scaffolding in the code and I would very much like to delete it. A fake service sitting in the broker's catalogue misleads anyone who goes looking at what is registered, and it's one more piece of state to create, keep in sync and reason about during upgrades. We filed it upstream as [issue #56](https://github.com/zalando-incubator/agentic-identity-broker/issues/56) without a patch, because whether an agent can exist purely as an identity is a product decision on their side rather than a one-line change on ours.

## Four Chart Bugs, Four Pull Requests

The rest of what broke was packaging, and those we could just fix. Each one is filed as an issue and has a pull request against it:

- The chart base64-encodes the memory encryption key one more time than the JWE signing key, so the broker starts up complaining the key is 24 bytes when it needs 32. We got past it by supplying that key double-encoded, which works and is not something anyone would guess from the values file ([#54](https://github.com/zalando-incubator/agentic-identity-broker/issues/54), [PR #60](https://github.com/zalando-incubator/agentic-identity-broker/pull/60)).
- The chart ships token-exchange expressions already filled in as defaults, which is enough for the broker to conclude that exchange is switched on and refuse to start in local mode without a trust anchor. Our values file blanks all three, which reads strangely to anyone reviewing it ([#55](https://github.com/zalando-incubator/agentic-identity-broker/issues/55), [PR #61](https://github.com/zalando-incubator/agentic-identity-broker/pull/61)).
- Rolling a new signing or encryption key through the chart leaves the running broker using the old one, because the deployment carries a checksum annotation for the ConfigMap but not for the secrets. Helm reports success and you find out later, when a token signed with the key you thought you had retired still verifies ([#57](https://github.com/zalando-incubator/agentic-identity-broker/issues/57), [PR #62](https://github.com/zalando-incubator/agentic-identity-broker/pull/62)).
- The chart version is stuck at `0.1.0` and the chart isn't published to a registry, so we install it from a path ([#58](https://github.com/zalando-incubator/agentic-identity-broker/issues/58), [PR #63](https://github.com/zalando-incubator/agentic-identity-broker/pull/63)).

We also filed [#59](https://github.com/zalando-incubator/agentic-identity-broker/issues/59) asking for the `aib.tokenexchange` metadata contract to be documented, since working it out took a day and the next person integrating with plain Envoy will hit exactly the same wall.

Every one of those workarounds is annotated in our tree with the issue it belongs to, so we can delete them when the fixes land rather than carrying them forever as folklore.

## Does This Let Us Drop Keycloak?

Partly, and the honest answer depends on whether humans are in the loop.

Keycloak is doing two different jobs in KAOS. For agent identity, AIB replaces it outright. Once #56 is resolved, `--agent-auth-enabled aib` stands entirely on its own with no placeholder service and nothing else to install, and the Keycloak agent path becomes redundant.

For user identity it doesn't. AIB's end-user API takes a pre-authenticated header, so something upstream has to have already established who the human is. In our setup that something is Keycloak, and in the token-exchange flow we even add a Keycloak audience mapper so a user's token is acceptable as an exchange subject.

So if your deployment has no human users, `--user-auth-enabled none` with AIB for agents means Keycloak is genuinely gone. If humans do log in, you still need a user identity provider, and AIB is not trying to fill that slot.

## What We Have Not Proven Yet

Everything we validated on the KIND cluster used an agent as the subject of the exchange. We never tested how the broker derives the agent when the subject token belongs to a user instead, where it appears to read `azp`. If you want to lean on AIB with humans in the flow, that's the next thing to test, and it may well turn into a third upstream issue.

## Closing Thoughts

The migration itself was a day. What took the time was the set of small contract differences between a broker you developed against and a broker someone else now maintains in public, and I think that's the normal cost of something becoming open source rather than a complaint about it. We'd rather have the public broker with six filed issues against it than the private one with none.

If you're running agents on Kubernetes and want them to have real identities, the pieces are now all obtainable. The broker is at [zalando-incubator/agentic-identity-broker](https://github.com/zalando-incubator/agentic-identity-broker), and KAOS v0.8.0 is on [GitHub](https://github.com/axsaucedo/kaos) with its [documentation](https://axsaucedo.github.io/kaos/) and authorization walkthrough rewritten against the real `v0.1.8` admin schema.
