---
title: "Agentic Security & Identity: Who Are You, Who's Your Agent, And What Should They Be Allowed To Do? (Part 1)"
date: 2026-09-19
image: './featured.png'
summary: 'This is a 2-part series on agent identity and security: who the user is, who the agent is, and what each of them should be allowed to reach. Part 1 covers the delegation problem, the standards to build on, and the Agentic Identity Broker that Zalando has just open sourced.'
tags: [agents, identity, security, oauth, kubernetes]
series: 'Agentic Security & Identity'
---

The first time I wired one of our agents up to GitHub, I did what everyone does. I put a bot token in a Kubernetes Secret and let every user's request ride on it.

It works on the first day, and then it doesn't. GitHub saw one identity for all of us, so I couldn't tell whose request was whose. Revoking one person's access would have meant rotating a credential everybody else depended on. And that durable token now lived somewhere the agent could read, which means anything that could talk to the agent could reach for it.

So how do we let an agent act on one person's behalf without handing it a credential that belongs to everyone?

Recently I spent some time extending the [Kubernetes Agent Orchestration System (KAOS)](https://github.com/axsaucedo/kaos) to support agent identity and authorization. Along the way I hit most of the issues that anyone would whilst introducing identity into an agentic system, so I thought it would be useful to compile the research, the architecture decisions and the worked example into this 2-part series.

The timing worked out well, because the component that solves the hardest part of this has just been released in the open. [Zalando open sourced the Agentic Identity Broker](https://github.com/zalando-incubator/agentic-identity-broker) under MIT, after running it internally in production for several of their MCP servers. That broker is what lets an agent obtain a user's real GitHub token instead of a shared one, and a good chunk of this post is about what it does and why we adopted it rather than writing our own.

Hopefully this is useful for anyone doing the same on their own platform. My objective:

> Let's make agent identity boring, so that nobody has to be clever about it at three in the morning.

As with my previous posts on [observability for agentic systems](https://hackernoon.com/production-observability-for-multi-agent-ai-with-kaos-otel-signoz), [autonomous always-on agents](https://hackernoon.com/autonomous-agentic-systems-a-practical-guide-to-always-on-agents) and the recent series on [multi-tiered agent memory](/blog/whose-memory-is-it-part-4/), I use KAOS as the concrete example. The goal is practical intuition for the primitives (subject and actor, enforcement points, grants, token exchange, consent) so it applies whether you run KAOS, a gateway of your own, or plain MCP servers behind FastMCP.

This post is the first of a 2-part series:

- **Part 1 (this post): the problem, what to build on, and the broker.** The three questions every agent request has to answer, the standards and tools that already exist, what the Agentic Identity Broker does, and the architecture decisions we made on top of it.
- **[Part 2: agent identity in action.](/blog/agentic-security-and-identity-part-2/)** A worked example that runs end to end on a cluster, with two users, two agents, a tool, a model and a third-party service, and real allow and deny outputs.

## Three Questions Every Agent Request Has to Answer

Before any of the machinery makes sense it helps to be precise about what we are actually asking on each request. There are three questions, and a lot of confusion in this space comes from collapsing them into one:

1. **Who are you?** Which human called the agent, and which groups are they in? Sometimes the honest answer is "nobody", because an autonomous agent woke up on a schedule.
2. **Who's your agent?** Which agent is making this call, and can it prove that identity without a human present?
3. **What can you and your agent do?** Can *this* user use *this* agent, and can *this* agent reach *that* tool, model or external service?

The second question is the one most platforms answer badly, because an agent is a workload and a workload does not log in. It has no browser, no password and nobody at the keyboard, so every mechanism designed around a human consenting in a redirect does not apply to it directly.

The first and second questions together produce a distinction we lean on for the rest of the series. A call that a person started carries two identities at once, and they are not interchangeable:

- The **subject** is the human the work is being done for. It arrives as an OIDC token from whatever identity provider you already run.
- The **actor** is the agent doing the work. It arrives as the agent's own machine credential, and it is what a chain of agents keeps changing as the work moves between them.

![The subject stays the same human across a chain of agents while the actor changes at every hop](./subject-actor.svg)

We decide resource access on the **actor**, and we use the **subject** for what the user personally delegated. An autonomous agent that nobody started carries only the actor, which is exactly why the two have to be separable. Collapsing them is tempting because in the simple case there is one user and one agent, and it breaks the instant one agent calls another and you can no longer tell whether "the caller" means the person who started it or the agent three hops down.

One warning on the word *subject*, because it is overloaded and we hit the collision ourselves. When I say subject here I mean the delegating human in an on-behalf-of flow. In part 2 you will meet an `AccessGrant` whose `subject` field can name a user, a group or an agent, which is a different and more general use of the same word. I have kept the two apart by always saying *AccessGrant subject* for the second one.

## The Shared Bot Token, and Why Everyone Builds It First

The naive way to let an agent use GitHub is to give it a single bot account's token and let every user's request ride on it. Nobody builds this out of carelessness; they build it because it is the easy thing to build. One token in a Secret, one HTTP client, done, and it works in the demo.

Then it doesn't. That token is a shared credential, and a shared credential has three problems that show up in a specific order:

- **Attribution goes first.** GitHub sees one identity for every request, so your audit trail says a bot did it. When somebody asks who asked for a change, the honest answer is that you don't know.
- **Permissions go next.** The bot needs the union of what every user might need, so the least-privileged person on your team is now operating with the most-privileged token you issued.
- **Revocation goes last, and it goes worst.** One person leaves, and the only lever you have is rotating a credential that everyone else depends on.

![A shared bot token makes GitHub see one identity for everyone, while per-user delegation makes it see the real person](./bot-vs-delegated.svg)

The obvious repairs do not work either, and the broker's own documentation has [the clearest table I have seen](https://agenticidentitybroker.dev/docs/introduction/) on why. There are three things teams reach for, and each one drops at least one of the four properties you actually need, which are least privilege, user consent, revocability and auditability.

| What you reach for | What it costs you |
| --- | --- |
| Hand the agent the user's own OAuth token | The token is far too broad, you cannot revoke it for one agent, and there is no record of what the agent did with it. It then spreads to every agent the user touches. |
| Give each agent its own third-party client | It does not scale past a handful, there is no shared place for a user to see what they have consented to, and provider secrets end up copied into every agent. |
| Static API keys or a shared service account | No per-user delegation and no expiry, with consent and audit weakest of all. This is the bot token we started with. |

Underneath all three is the same missing piece. The cluster can decide *whether* a request leaves, but it has no authority over GitHub's tokens, so it cannot make GitHub see Alice rather than the bot. Nothing you write in a Kubernetes policy object closes that gap. Bridging it needs a component that holds each user's *real* third-party credential, obtained with that user's consent, and puts the right one on each outbound call.

We did not want to write that component, and we no longer have to.

## What Already Exists to Build On

Before writing anything we went looking for what we could stand on, and the short answer is that the base is solid and the agent-specific layer on top of it is very much still moving. Being clear about which half you are relying on matters, because one of them is a decade of deployed practice and the other is a set of drafts that may not survive.

### The Stable Base

None of these were written for agents, and all of them do most of the work anyway.

| Specification | What it gives us |
| --- | --- |
| [RFC 8693, OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html) | The one primitive that matters most here. A client presents a `subject_token`, optionally an `actor_token`, and asks for a token aimed at a specific target, and the `act` claim can carry the delegation. It deliberately leaves the trust and policy decisions to you. |
| [RFC 9068, JWT profile for access tokens](https://www.rfc-editor.org/rfc/rfc9068.html) | Makes the user and agent context locally verifiable rather than requiring a round trip. |
| [RFC 8414, authorization server metadata](https://www.rfc-editor.org/rfc/rfc8414.html) and [RFC 9728, protected resource metadata](https://www.rfc-editor.org/rfc/rfc9728.html) | Discovery, so an agent finds the right issuer and asks for a token with the right audience instead of hardcoding either. |
| [RFC 8707, resource indicators](https://www.rfc-editor.org/rfc/rfc8707.html) and [RFC 9449, DPoP](https://www.rfc-editor.org/rfc/rfc9449.html) | Bind a token to a target and to a sender, which is how you stop a token minted for one hop being replayed on another. |
| [Kubernetes bound, audience-scoped ServiceAccount tokens](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/) ([KEP-1205](https://github.com/kubernetes/enhancements/blob/master/keps/sig-auth/1205-bound-service-account-tokens/README.md)) | A workload identity that expires and rotates itself, already present in every cluster. This is the default agent identity in KAOS. |
| [SPIFFE and SPIRE](https://spiffe.io/docs/latest/spiffe-about/spiffe-concepts/) | The same idea generalised past the cluster boundary, for when one cluster stops being the edge of your world. |
| [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final) | The vocabulary for what we are building, a policy enforcement point in the path consulting a policy decision point. |

The other thing to read is the [MCP authorization specification](https://modelcontextprotocol.io/specification/2026-07-28/basic/security_best_practices), which has moved several times and is worth reading at its current revision rather than the one you bookmarked. It is where the prohibition on *token passthrough* lives, which is the rule that a token minted for one hop must never be silently reused on the next. That rule is the difference between delegation and a confused deputy, and it is the single most common way these systems go wrong.

### The Agent-Specific Work Is Still Moving

Here the ground is much softer, and anyone telling you there is a settled standard for agent identity is selling something.

The most promising umbrella is the IETF WIMSE working group's [AI Identity Management System draft](https://datatracker.ietf.org/doc/draft-ietf-wimse-aims/), which treats an agent as a workload and composes workload identity with OAuth delegation. It only became a working group document on 15 September 2026, four days before I wrote this, so nobody has implementation experience with that exact text yet.

Around it sits a cluster of individual drafts, none of them adopted. The [OAuth extension for AI agents acting on behalf of users](https://datatracker.ietf.org/doc/draft-oauth-ai-agents-on-behalf-of-user/) adds a way for consent to name the acting agent explicitly, and it is useful prior art that has already expired. Others propose attenuated task-scoped tokens or verifiable delegation chains. I would read them for the ideas and build on none of them.

One draft worth singling out because it shows up in practice is [Client ID Metadata Documents](https://datatracker.ietf.org/doc/draft-ietf-oauth-client-id-metadata-document/), where the `client_id` is an HTTPS URL that the authorization server fetches to learn who is asking. It is the alternative to dynamic client registration, and the trade is that you stop accumulating per-server registration state and start depending on HTTPS origin control and safe document retrieval instead. The broker we ended up adopting uses it.

### The Products, and Which Layer They Occupy

The commercial space is crowded and the marketing blurs the categories, so I found it easier to sort the products by the job we actually needed doing. Establishing and trading identities is where Keycloak, Auth0's work for generative AI, Okta, WorkOS, Descope and the broker in this post sit. Arcade and Composio solve a narrower problem, bundling third-party OAuth per tool and handing your agent a working connector. SPIFFE and the cloud agent identities cover workload identity. A gateway does the enforcing, whether that is Envoy, agentgateway or a mesh, and an engine like Open Policy Agent evaluates the rules.

![The layers of the agent identity stack, from workload identity at the bottom through brokering and enforcement to policy at the top](./layer-map.svg)

The useful thing to notice is that no gateway and no policy engine creates trustworthy delegation context on its own. They enforce a decision about identities that something else has to have established. That is why the broker layer is the one we could not skip, and until recently we had not found one we could adopt rather than build.

## Zalando Open Sourced the Agentic Identity Broker

The [Agentic Identity Broker](https://agenticidentitybroker.dev/) (AIB) is the component we had been waiting on, and it went public in the `zalando-incubator` organisation under an MIT licence. Its [documentation site](https://agenticidentitybroker.dev/) calls it an OAuth2 broker for delegation and consent, and states the goal in one line that is worth keeping in mind for the rest of this post: users delegate scoped, revocable access to agents without handing those agents their credentials.

Its own concepts page reduces the whole thing to [four facts](https://agenticidentitybroker.dev/docs/concepts/), and they are a better summary than I would have written:

1. **Delegation is per user, per agent, per service, and scoped.** A person creates a grant that lets one agent use specific permission sets with specific services. It can expire, and it can be revoked.
2. **The broker owns the third-party tokens.** Authorising a service creates a session holding encrypted access and refresh tokens, and the agent never receives them.
3. **Access is exchanged, not shared.** At request time a gateway presents the agent token and the target resource, and the broker returns the right provider token.
4. **Authentication is somebody else's job.** The broker does not log users in. A trusted proxy authenticates the person and passes them in a header.

That fourth one is the load-bearing design decision, and it is why the broker is adoptable rather than a migration.

The vault is the part that no amount of cluster-side policy can substitute for. When Alice consents to her agent touching GitHub, GitHub issues a token for Alice and the broker stores it, encrypted. The agent never sees it. That credential has to be issued by GitHub *to Alice*, and nothing you write in a Kubernetes object can conjure it.

Consent is where the user gets a say and gets it back. The project includes a React frontend where a person can see which agents they have delegated what to, across services like Google, GitHub, Databricks and Linear, and withdraw it. Revocation stops being a credential rotation that breaks everyone and becomes one person clicking one thing.

The delegation chain is what makes the exchange safe. Present the broker with proof of who the user is and which agent is acting, and it returns that user's stored third-party token. That trade is the only thing it does with identity, because agents get their identity from an agent identity service and users get theirs from the login provider you already run.

The [exchange itself](https://agenticidentitybroker.dev/docs/concepts/token-exchange) is worth looking at closely, because the party list tells you where the trust sits. The gateway authenticates to the broker with a signed client assertion validated against the upstream JWKS, so only a gateway you trust can ask for stored credentials at all, and the assertion subject lands in the audit record. The subject token is the agent's token, and the broker pulls the user and the agent out of it with configurable expressions over the claims. The resource names the target, which the broker normalises and matches against the services it knows. Only after all of that does it check that the user actually has a live grant, decrypt or refresh the stored token, and hand it back.

### Where It Sits: the Gateway, Never the Agent

The design decision that made AIB attractive to us is where it expects to be called from. The project describes itself as designed for an infrastructure gateway in the call path between an agent and an MCP server, or between agents. It is not a library you import into your agent, and it is not a service your agent code calls.

That matters more than it sounds. The moment credential handling lives in the agent runtime, every language, every framework and every custom MCP server someone writes becomes a boundary you have to trust. Putting the swap in the gateway means the agent's code has no credential path at all, so there is nothing for a prompt injection to talk it into handing over. It can still be talked into making a call it is authorized to make, which is a different problem that I come back to at the end.

![The agent holds only its own identity, the gateway asks the broker for the stored credential, and the request goes out as the user](./aib-callpath.svg)

The README makes the case for this concretely on the MCP side. Frameworks like FastMCP can implement the full OAuth 2.1 ceremony that the MCP specification asks for, but then you configure and maintain that for every MCP server you deploy, which means running a multitude of OAuth2 authorization servers. With a broker and a gateway in front, MCP server development collapses back down to writing the tools, and the ceremonies, vaulting and token translation happen transparently for all of them at once.

### What It Deliberately Does Not Do

The project is unusually clear about its own boundaries, which I appreciate more than I expected to. It states plainly that it is [not an identity provider](https://agenticidentitybroker.dev/docs/introduction/why-not-idp), with no human login or user directory in it at all. Something upstream has to authenticate the human and hand it a pre-authenticated request. It is also not a general secrets manager: it holds OAuth2 delegations and the third-party tokens behind them, and nothing else. It is not the MCP server, the agent runtime or the gateway either.

That is a short list of non-goals for a product in this space, and it is the reason the thing is adoptable. A broker that also wanted to be your identity provider would be asking you to migrate your users, and nobody is doing that to add agent support.

It is worth being equally honest about what the design does not eliminate. The trusted gateway still sees the downstream provider token, because somebody has to put it on the outbound request. What the architecture does is shrink the set of components that touch a user's credential down from "every agent and every MCP server" to "the gateway", which is a large reduction and not the same thing as zero.

### Inside It: a Vault, a Grant Model, and Two Doors

A few details decided it for us.

**The vault takes encryption seriously.** Provider access tokens, refresh tokens and service client secrets are all encrypted, with no plaintext fallback available. The documented production path uses per-value AES-GCM-SIV data keys under a hierarchical KMS keyring. Each ciphertext is bound to its own service, so a stored token cannot be replayed against a different one. The in-process key backend exists for development and says so.

**Two policy gates guard an exchange, and both have to say yes.** The broker evaluates its own expression over the request, and the optional external processor in front of it runs Open Policy Agent over the proxied call. They are composed as a fail-closed AND, so the OPA layer does not replace the broker's own grant check and neither one can wave a request through on its own.

**The grant model is in business language, not scope strings.** The domain objects are a principal, a registered agent, a third-party service, a permission set and a grant with an optional expiry. The permission set is the interesting one, because it maps a choice a human can actually understand onto the provider scope strings underneath. Revoking a grant removes that one agent's authority; terminating a provider session deletes the stored tokens and affects every agent that depended on them. Those are two different operations with two different blast radii, and having both is right.

**There are two doors, on purpose.** The end-user API and the admin API are separate ports with separate contracts, and the admin port is expected to stay internal behind stronger policy. We run it that way.

![Inside the broker: an end-user API for consent and OAuth, an internal admin API, the grant model, and the encrypted vault behind both](./broker-internals.svg)

### Proxy, Local or Hybrid: the Choice That Decides Whether Keycloak Stays

The detail I wish I had understood sooner is that the broker has [three OAuth2 server modes](https://agenticidentitybroker.dev/docs/concepts/oauth2-server-modes), and picking one is really a decision about how much of your existing identity estate you keep.

| Mode | Who issues agent tokens | When you want it |
| --- | --- | --- |
| `proxy` (the default) | Your existing authorization server does. The broker forwards the OAuth endpoints to it, republishes its keys, and adds the grant system on top. | You already run something for agent tokens and want consent and delegation added to it. This is what KAOS does, with Keycloak upstream. |
| `local` | The broker does, signing its own ES256 tokens with keys it manages and rotates. | You have no authorization server for agents and would rather not stand one up. |
| `hybrid` | Both, chosen per registered agent. | You are migrating, or you have a mixed fleet you do not intend to unify. |

We run proxy mode, which is the concrete answer to "does this replace Keycloak". It does not, because in this mode Keycloak is still the thing issuing the tokens and the broker is adding a consent and delegation layer in front. Choosing `local` would change that answer for agent tokens, and it would still leave human login with Keycloak, because the broker does not do human login in any mode.

One operational note worth knowing before you pick proxy. The broker fetches upstream metadata at startup and refuses to start if that fails, and if the upstream keys later go away its JWKS endpoint returns a 503 and key-dependent flows reject requests. It fails closed on its upstream, which is the behaviour you want and also a dependency you should plan for.

### Zalando Has Been Talking About This Publicly

The day before I wrote this, Magnus Jungsbluth and Jan Brennenstuhl presented [Economies of Scale for MCP and Agents: Why You Need an Identity Broker](https://github.com/zalando-incubator/agentic-identity-broker/blob/main/docs/resources/public-relations.md) at AGNTCon and MCPCon Europe in Amsterdam, and the deck is published in the repository. It is worth reading, because it says more about the shape of the thing than the README does.

They say the broker is built and used in the Zalando Agent Platform, which the deck draws as a combination of the kagent runtime, agentgateway, application registration, a user interface and the identity and consent delegation layer. Their engineering blog [describes the same platform](https://engineering.zalando.com/posts/2026/08/agentic-engineering-at-zalando-a-snapshot.html) from the other end, where team-hosted internal MCP servers are automatically protected by a default ingress OAuth filter and the broker sits in that call path.

I keep coming back to how they define effective access on one of those slides. For a user-delegated call it is the user's permission intersected with the agent's permission, plus a live delegation, and all of those have to hold at the moment of the call rather than at the moment somebody set it up. An autonomous call has no user and no delegation in it, so it reduces to the agent's own permission, which is a different question that deserves its own answer rather than a weaker version of this one.

![Effective access is what the user may do intersected with what the agent may do, and only while a live delegation exists](./effective-access.svg)

Their maturity labels are unusually specific for a conference deck. Centralised tool authorization is marked available, tool approvals in progress, strong affirmation through CIBA on the roadmap, and intent-based access as outlook. The README adds sessionless on-behalf-of for semi-autonomous agents and formalised agent-to-agent token exchange. It also notes that agent registration now uses client ID metadata documents, and labels the older dynamic client registration flow as historical.

I would take the honesty of that labelling as a good sign rather than a warning. What is public is real code with limited internal production use behind it, described as "coding in the open to gauge our approach", and not a claim of a broadly operated mature product. Two of those unfinished items are the hardest open problems in the field. The semi-autonomous case in particular, where an agent wakes on a schedule with no human in a browser, is one where every delegation design that assumes a redirect flow excludes it by construction. Getting that right matters more as agents stop waiting to be asked, and it is an opportunity to contribute rather than a gap to work around.

## Build, Adopt or Wrap?

Having surveyed all of that, the question we actually had to answer was which parts to write ourselves. The split matters, because "we use AIB" is a sentence people hear as "AIB does all of your security", and it does not.

**We adopted AIB for delegated third-party identity.** Holding a user's GitHub credential, recording their consent, and swapping one proven identity for another is a genuinely hard problem with a lot of specification surface, and it is not the problem our platform exists to solve. Writing our own token vault would have been the worst kind of undifferentiated work.

**We kept Keycloak for user identity, and for agent OIDC clients.** This is the part worth being explicit about, because AIB does not fill this slot and is not trying to. Its end-user API takes a pre-authenticated header, which means something upstream has to have already established who the human is. In our setup that something is Keycloak, providing the login flow, the group membership that our access rules match on, and the audience mapper that makes a user's token acceptable as an exchange subject. Keycloak also does double duty on the agent side, where the operator registers each agent as its own client through dynamic client registration, because the broker needs to tie an exchange request to a specific agent. If your deployment has no human users at all you can run agents on Kubernetes ServiceAccounts and drop Keycloak entirely, but the moment a person logs in you need a user identity provider and it will not be the broker.

![What we adopted, what we kept, and what we built ourselves](./adopt-keep-build.svg)

**We wrote the enforcement ourselves.** Deciding whether *this* agent may reach *that* resource inside our own cluster is a question about our own objects, and the answer has to be available on every hop of every request. We run it as our own policy decision point, and part 2 walks through exactly how.

## The Architecture Decisions

Most of the interesting work was not code, it was choosing between options that all sounded reasonable in a design document. These are the decisions that shaped the implementation, each with the option we turned down, because the rejected alternative usually explains the decision better than the decision does.

### Decision 1: Enforcement Lives at the Gateway

Every call, whether a user reaching an agent or an agent reaching a tool, a model or another agent, travels through one gateway that checks it before letting it through. The gateway validates the identities and asks a policy decision point for an allow or deny. On the specific egress routes we generate for a declared third-party service, and only on those, it additionally fetches the user's provider credential from the broker and attaches it to the outbound request.

We rejected putting the checks in the agent runtime. It reads as the simpler option, and it duplicates the decision into every language and framework you support, which makes your security posture a function of application correctness. It also leaves you with no answer for the custom MCP server somebody wrote in an afternoon. We also rejected a sidecar per workload, which enforces uniformly but multiplies the things that have to be upgraded in lockstep, and a service mesh, which solves a larger problem than we had at a cost we did not want to impose on every KAOS user.

![The three enforcement topologies we compared: checks in the agent runtime, a sidecar per workload, and one gateway with a NetworkPolicy behind it](./enforcement-options.svg)

The catch is that a gateway only enforces what actually goes through it, which is why the gateway decision is really two decisions. The second one is a NetworkPolicy that stops workloads talking to each other directly over ClusterIP. Without it, a deny-by-default gateway is a suggestion.

### Decision 2: Two Identities, Kept Separate All the Way Down

A protected call carries the user token and the agent's own token, and both travel together rather than one being exchanged for the other at the edge. Resource access is decided on the agent, and the user identity rides along for third-party delegation.

The alternative was to collapse them, resolving the user at the gateway and letting everything downstream trust that. It works until one agent calls another, at which point "the caller" is ambiguous and you cannot express the thing you most need to express, which is that this particular agent may reach this particular tool regardless of who started the chain.

### Decision 3: The SDK Propagates, It Never Enforces

Our SDK carries the verified identity and context across hops and keeps the agent's token fresh, so that the gateway has something real to check on the next hop. It does not authenticate users and it does not make authorization decisions.

This is a deliberate demotion. It is tempting to let the SDK do a quick local check, and the moment it does, a workload that skips the SDK skips the security model, and you cannot tell the difference from the outside. Keeping the SDK useful but powerless means an agent written without it is no less safe, just less convenient.

### Decision 4: Authorization as Data, and Why We Reversed Half of It

We wanted explicit grant rows rather than a policy language: this group may use that agent, this agent may reach that tool, this user delegated that scope. Grant tables are easy to diff and easy to explain to somebody who does not write Rego, and most platforms never need more than that.

We originally decided to keep that data in the broker and have it answer the runtime decision, and we reversed that. What we run now is our own policy decision point, stock Open Policy Agent behind the gateway's standard authorization contract, with our operator projecting grant data into it from the Kubernetes objects. Nobody hand-writes policy, so the data-first model survived intact; what changed is who evaluates it and where.

![The filter order at the gateway, with our own decision point running before the token exchange](./decision-point-order.svg)

Two things pushed the reversal. The decision point has to answer on every hop of every request and fail closed when it cannot, so we wanted it running as our own highly available service rather than as a dependency on a component with a broader job. The order matters too, because our decision point runs *before* the token swap, which is what makes "allow this request but do not exchange a token for it" expressible at all. Coupling the two had been the single biggest reason we had not adopted a broker earlier.

### Decision 5: Fail With a Re-Auth URL, Then Retry

A first call to a third-party service that the user has not consented to fails with an instruction telling them how to approve, and they retry afterwards. A missing platform grant just fails closed with no user action offered, because there is nothing the user could do about it themselves.

We considered treating every human action as one generic approval queue, which conflates "you need to consent" with "an administrator has to grant you something" and leaves the user staring at a pending state for a decision that was never theirs. We also considered pausing the task and resuming it after approval, which is a better experience and needs durable task state we did not want to make load-bearing for security.

### Decision 6: We Own the Integration, Not the Lifecycle

The broker and the identity provider run as their own Helm releases, with their own storage, keys, migrations and upgrades. Our operator does not manage them; it configures our platform to use them, and keeps the registration current from our side.

The alternative, having the platform install and lifecycle-manage its own broker, demos beautifully and is wrong for anyone running this seriously. Production deployments already have an identity provider, and they are not going to accept a second one appearing under an operator's control with its own upgrade schedule.

## Lessons for Production Agent Identity

Four things we would tell anyone starting this, which are not obvious from the decisions above.

### 1. Fail closed, then pay for it

The gateway has to deny when the policy decision point says no *and* when it cannot reach it at all, because "no answer" and "no" have to be the same outcome. That is not a setting you switch on, it is what treating an unavailable authorization backend as a deny actually means, and it should not be relaxable into allow-on-error.

That safe default is also a bill, because it makes the decision point a hard dependency of every request in the cluster, so it has to run highly available with multiple replicas from day one. We consider this the right trade, but it is a trade, and anyone who tells you fail-closed is free has not run it.

### 2. Start coarse, because fine-grained authorization is a different problem

Our gateway decides whether an agent may reach a resource. It does not decide which tool on that resource, or with which arguments. That finer question needs to understand the payload, which means understanding MCP, which means the gateway grows a protocol parser and your security model grows a dependency on a spec that is still moving.

Resource-boundary decisions get you most of the value for a fraction of the surface. Keep the finer control in the runtime until you have a concrete case that needs it.

### 3. Identity is not safety

This is the one I would put on a poster. Authorization decides whether an agent *may* call a tool. It says nothing whatsoever about whether that tool's output is trustworthy, and a perfectly authorized call can return poisoned content that talks the agent into its next action.

Prompt injection and tool poisoning live on a different axis to everything in this post, and a team that has just finished an identity programme is exactly the team most likely to think it is covered.

### 4. Put the decision behind a contract you can swap

We evaluate grants with Open Policy Agent, behind the gateway's standard external authorization contract. Nothing above that contract knows what is underneath it, so replacing the engine later is a deployment change rather than a redesign.

We got this right partly by luck, since we had already reversed one decision about where the decision point lives and the neutral contract is what made that reversal cheap. Assume you will change your mind about the engine, and make sure that is allowed to be a small change.

## Closing Thoughts for Part 1

We opened with an agent holding a bot token that belongs to everyone, and the reason that pattern persists is not that people like it. It persists because the alternative needs a component that holds each user's real credentials with their consent, and until recently you either wrote that yourself or you did without.

The Agentic Identity Broker being open sourced changes that arithmetic. The credential vault and the consent surface, which are the parts we least wanted to write, are now something we install. We still had to supply the user identity, the agent identity, the routing, the enforcement and the integration between all of them, so this is one component rather than a solution. But it is the component that was blocking us, and Zalando describing real internal production use behind it counts for more than a reference implementation would.

The parts that remain unfinished are the ones where the specifications themselves are still being written. On-behalf-of for an agent with no user session is the one I would watch, and it is open for contribution rather than something to work around.

Everything in this post is design. In part 2 we run it on a real cluster, with two users who get different answers to the same request, an autonomous agent acting as itself, a tool and a model gated by what their agent declared, and a third-party call that goes out as the real person. The failed requests are in there too, and they are the ones that show the controls actually taking effect.

**The series:**

- **Part 1 (this post): the problem, what to build on, and the broker.** The three questions every agent request has to answer, the standards and tools that already exist, what the Agentic Identity Broker does, and the architecture decisions we made on top of it.
- **[Part 2: agent identity in action.](/blog/agentic-security-and-identity-part-2/)** A worked example that runs end to end on a cluster, with two users, two agents, a tool, a model and a third-party service, and real allow and deny outputs.
