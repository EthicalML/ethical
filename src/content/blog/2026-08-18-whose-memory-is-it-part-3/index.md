---
title: Whose Memory Is It? Building Multi-Tenant, Multi-Tier Memory for AI Agents (Part 3)
date: 2026-08-18
image: './featured.jpg'
source: hackernoon
url: https://hackernoon.com/whose-memory-is-it-building-multi-tenant-multi-tier-memory-for-ai-agents-part-3
summary: 'This is a 4-part series on how agents remember: building short-, medium- and long-term memory that scales across users, agents, and kubernetes clusters.'
tags: [agents, memory, kubernetes]
series: 'Whose Memory Is It?'
---

It is 2am, the memory database just crashed and thirty agents were mid-conversation across your cluster. What do your users experience?

The impact depends on the design choices of the memory system. Which storage does the memory layer sit on? Does it run inside each agent or as a service they share? What does the resource declare about replicas and availability? And what did everyone agree happens when a dependency disappears?

In this post we design multi-tenant memory as native Kubernetes infrastructure, then probe that design failure by failure.

> This captures why the memory layer deserves the same treatment as any other infrastructure component: a resource, a topology, and a failure contract.

Recently I spent some time extending the [Kubernetes Agent Orchestration System (KAOS)](https://github.com/axsaucedo/agentic-kubernetes-operator) to support multi-tiered memory persistence (aka short-, medium- and long-term memory). Along the way I hit most of the same issues that anyone would whilst building or integrating multi-tiered memory into a multi-tenant system, so I thought it would be useful to compile the learnings, design choices and examples into this series.

This is Part 3 of the series, and here we make the memory design run as infrastructure. It follows [Part 1](/blog/whose-memory-is-it-part-1), where we surveyed ~30 memory engines and adopted [Mem0](https://github.com/mem0ai/mem0) as a library behind our own interface, and [Part 2](/blog/whose-memory-is-it-part-2), where we designed the three memory tiers (a verbatim short-term window, a rolling medium-term summary, and extracted long-term facts) and the scope model that derives "whose memory is it?" from verified identity.

The objective throughout the series is:

> Let's make the memory layer BORING, so that the agents can continue to be the fun part.

This part consists of three sections:

1. **Memory as infrastructure**: The three architecture decisions behind the `MemoryStore` Kubernetes resource, covering the storage profiles, the deployment topology, and the resource specification itself.
2. **Standing it up on a cluster**: The installation with identity enabled, how auth is wired into the memory path, and the CLI that renders the resources.
3. **The failure contract**: What actually happens when a database node dies, a service replica bounces mid-compaction, the whole memory path disappears, or the auth service goes down.

Finally we wrap up with the lessons that carry beyond KAOS. The hands-on walkthrough of integrating the same pattern in your own agent, together with the discussion of when long-term memory is worth adding at all, now lives in Part 4, next to the running example.

Here's a refresher on this 4-part series on Multi-Tiered / Multi-Tenant Agent Memory:

- **[Part 1: What agent memory is and what to build on.](/blog/whose-memory-is-it-part-1)** The taxonomy, the baseline implementations everyone starts with, and the engine landscape from surveying ~30 tools.
- **[Part 2: Tiers and scopes for multi-tenant agents.](/blog/whose-memory-is-it-part-2)** The three-tier design and the answer to whose memory it is.
- **Part 3 (this post): Memory as infrastructure.** The Kubernetes `MemoryStore` resource, its deployment topology, and the failure contract probed scenario by scenario.
- **Part 4: Agent memory in action.** A worked example that runs end to end on a secured cluster with real outputs, plus how to integrate the same pattern in your own agent (coming soon...).

Let's get started.

## Kubernetes Enters the Picture: Memory as Infrastructure

Now that we have all the separate pieces, we need to decide how to stitch them together as a cohesive platform. As I took forward this exercise, this resulted in various architectural design choices. In this post we will go through the three biggest archivetural choices in this section.

### Decision 1: Choosing the Storage

The first design decision was, which data store should we go for? Should we go for FAISS? Chroma? pgvector? Milvus? Pinecone?

Or maybe more than one! It did not need to be a single choice, especially when considering the requirements differ between a local development loop and a production fleet.

- **For development** the priority is zero external dependencies, so the store should be embeddable in the service container.
- **For production** the priorities are durability, horizontal scaling, and reusing infrastructure you already operate.

This ruled out SaaS-only options like Pinecone for the first iteration, as well as library-only indexes with no persistence or filtering (eg FAISS). At least for now, it also ruled out dedicated clusters that would add heavy new infrastructure (Milvus, Weaviate). For this I landed on two storage modes with the same service code on top of both:

- **Local mode** runs embedded Chroma for the long-term vectors and SQLite for the conversational tiers, all inside the service container on one PersistentVolume, so a development cluster needs no external database at all.
- **External mode** points the service at your own Postgres with pgvector through a connection secret, carrying every tier on infrastructure you already operate. The mode is configuration driven, so other stores can slot in behind the same interface, with pgvector as the first-class supported path.

One interesting caveat that I ran into, was learning that some database engines apply scope filters after the retrieval step, which means that in some cases a query expecting a number of results may return less than expected. This is a known consideration on [pgvector as it post-filters by default](https://dev.to/franckpachot/no-pre-filtering-in-pgvector-means-reduced-ann-recall-1aa1), and it is why engines like [Qdrant filter inside the index traversal](https://qdrant.tech/documentation/manage-data/multitenancy/).

To mitigate this, I validated the pre-filtering behaviour on both Chroma and pgvector before committing to the design, for which both passed. Mem0's FAISS path post-filters, which is why I decided to go for Chroma instead for the local path.

One more property of the storage boundary is worth stating explicitly: isolation **between** stores is a connection decision. Two `MemoryStore` resources pointing at the same DSN share the same underlying tables, and only the scope filtering from Part 2 separates their data. When a tenant needs physical isolation, you give it its own store with its own DSN, which is the "store is the group" lesson from Part 2 applied at the infrastructure layer. Within a shared database, the service applies scope-key filtering on every query and ships Postgres row-level security as hardening behind it.

![Local and external MemoryStore storage modes](./storage-modes.svg)

### Decision 2: Designing the Data Plane

The second design decision was where, and how, the memory layer runs. Should it run **inside every agent** as a library? As a **side-car** next to every pod? Or as a **central service component**?

Integrating the Mem0 Python SDK directly in the agent service looks attractive at first, but the challenges compound with the number of agents. Namely as LLM calls for fact-extraction/summarization land on the serving process, every agent replica opens its own datastore connections, every agent image carries the engine and its dependencies, and replicas of the same agent silently diverge in what they remember.

Instead, going for the central option gives us the opposite: LLM extraction lands on the `MemoryStore` service, agents only interact with the respective store, agent images can use only the client, and scales with replicas horizontally.

The "how" mattered as much as the "where", however. If the requirement had been long-term memory alone, the central option could have been as easy as "just deploy Mem0". However I needed a unified layer for short-, medium- and long-term memory where we could interact with it as one integrated contract, server-side scope enforcement, telemetry on every operation, as well as scoped access control.

For this I had to introduce a new layer through the `kaos-memory` Python package, which provides both the runtime client and the `MemoryStore` service. I will cover the package in more detail in Part 4.

Here's the visual overview of how it all fits together in the data plane:

![Agent fleet connected to the MemoryStore data plane and its durable storage and model services](./data-plane-topology.svg)

### Decision 3: Designing the Custom Resource

The third design decision involved designing the architectural abstraction of "Memory" as an infrastructure component in Kubernetes. In this case it meant codifying the `MemoryStore` resources into a specification that brings together all the points that we covered thus far.

This took me longer than I would've liked, but I was happy with the proposed contract, which is the following:

```yaml
apiVersion: kaos.tools/v1alpha1
kind: MemoryStore
metadata:
  name: shared-memory
spec:
  engine: mem0
  storage:
    type: external # or "local" for dev: Chroma + SQLite on a PVC
    external:
      provider: pgvector
      connectionSecretRef:
        name: pgvector-dsn
        key: dsn
  models:
    summarization:
      modelAPI: my-modelapi
      model: gpt-4o-mini
    embedding:
      modelAPI: my-modelapi
      model: text-embedding-3-small
  shortTerm:
    tokenBudget: 4096 # verbatim window bound
  mediumTerm:
    enabled: true # fold overflow into a rolling summary
  longTerm:
    extraction:
      concurrency: 4 # background extraction workers
```

To provide the intuition on the one we landed on, here's what these mean:

- `storage.type`: provides the `local` type for dev and `external` for prod.
- `storage.local.provider` / `storage.external.provider`: embedded Chroma plus SQLite for local (one container on a PersistentVolume, single replica); Postgres with pgvector for external, referenced through a `connectionSecretRef` as a bring-your-own database.
- `storage.external.embeddingDims`: the vector dimensions of the embedding model.
- `replicas`: defaults by mode, 1 for local (the volume is single-writer) and 2 for external (the service is stateless over Postgres, guarded by a disruption budget).
- `models.summarization` / `models.embedding`: references to `ModelAPI` resources instead of provider keys, so the memory system's LLM calls go through the same gateway, quotas, and observability as every other component.
- `shortTerm` / `mediumTerm` / `longTerm`: one typed block per tier, with the cross-tier compaction invariant validated at apply time instead of pod startup.
- `maxReadScope`: the store owner's ceiling on how far any bound agent may read, defaulting to `agent`; raising it to `user` is what permits cross-agent recall on this store, and an agent's own `maxReadScope` may never exceed it. This is the store's half of the scope model from Part 2.
- `defaultFailureMode`: `soft` or `strict` write behaviour for bound agents, overridable per agent.

These were some of the major design decisions worth highlighting - there were of course a much longer list of tradeoff decisions which are out of the scope of this post, as otherwise I'd never finish the blog post if we cover all of them. However to mention a few honorable mentions are:

- Treating memory as augmentation and not a hard dependency: recall is always soft, so a memory outage degrades an agent and never stops it (the `degraded` flag on every recall in the worked example is where this surfaces)
- Wrapping Mem0 as a library inside the service instead of running the stock Mem0 server
- Serializing compaction through database locks so multiple service replicas can fold the same session without double-folds
- Shipping without a durable extraction queue (for now), since the short-term tier is the recoverable source of truth and a queue is only worth building once needed

Now that we have the resources designed, we can stand them up on a real cluster and see what the declarations turn into.

## Standing It Up on a Cluster

Now that we implemented this architecture in the control plane, I can now show what the end product looks like in practice.

Any installation of the K8s Agent OS (KAOS) would have memory enabled, and by default any MemoryStore would run with the local datastore (Chroma + SQLite on a PVC). However for production environments the Postgres setup with pgvector is recommended.

We can create the full cluster with auth enabled with the cli:

```bash
$ kaos system install \
  --authz-enabled \
  --user-auth keycloak \
  --agent-auth keycloak \
  --wait
```

This sets up and configures user and agent auth with keycloak, as well as authorization based access control for the memory itself. You can read more about this in the [KAOS security documentation](https://axsaucedo.github.io/kaos/latest/security/overview.html).

![Request path through the gateway, identity, authorization, KAOS resources, and MemoryStore](./cluster-request-path.svg)

The wiring matters for what comes later in this part, so it is worth explaining this up-front.

A user's request enters through the gateway mesh, where the user token is verified against the identity service. The agent runtime receives the request with the verified identity attached, derives the read scope and the write attribution from it server-side, and calls the `MemoryStore` service. The store never talks to the auth provider itself: it trusts the identities that arrive on the request as they are verified through the Gateway (runs on gateway-only ingress / cluster-ip restricted), and the operator keeps the authorization graph in sync. Each hop in that chain is a separate thing that can fail, which is exactly what the failure section probes.

With the control plane in place, we can now create dataplane components. The `MemoryStore` here references the `ModelAPI` its background workers will use for summarization and embeddings:

```bash
$ kaos memorystore create shared-memory \
  --modelapi my-modelapi \
  --summarization-model gpt-4o-mini \
  --embedding-model text-embedding-3-small
```

Then an agent binds to it, with the read configuration from Part 2 carried on the agent resource:

```bash
$ kaos agent deploy assistant \
  --modelapi my-modelapi \
  --model gpt-4o-mini \
  --memory-store shared-memory \
  --memory-tools read
```

These commands render exactly the `MemoryStore` specification from Decision 3 plus the agent binding, and the operator does the rest: it deploys the service with the replica defaults for the storage mode, wires the DSN secret, projects the identity configuration, and expands the agent's scope ceiling into its runtime configuration. Part 4 goes into a practical example using this setup end to end with real users; here we stay on the platform side, because now we get to break it.

## The Failure Contract

Now that we have the memory-as-infrastructure design decision in place, and have also understood what the control and data plane looks like, we can now assess how some of our design decisions would behave on specific failure modes.

Here we will walk through five incidents in increasing impact.

### Failure 1: One service replica goes down

23:47 pm. A routine node pool upgrade evicts one of the two `MemoryStore` replicas.

![MemoryStore topology when one service replica is evicted](./failure-replica-eviction.svg)

We should not expect any escalations on this one.

In external mode the service defaults to two replicas and is deliberately stateless: the deployment mounts no volumes, and even the engine's internal change-history log is placed on an ephemeral per-replica path so that Postgres remains the only shared state. A `PodDisruptionBudget` with `minAvailable: 1` guards exactly this kind of voluntary eviction, and the readiness probe (which pings both the relational tier and the vector collection) pulls an unhealthy replica out of the Service endpoints without killing it. The surviving replica keeps serving from the same database, and nothing is lost.

However, it is worth stating that the context where an issue would happen is if it was deployed in local mode, as it is designed as single-replica, primarily for development.

### Failure 2: Replicas bounce mid-compaction

00:12 pm. The upgrade rolls on and bounces the replica that was mid-fold, halfway through compacting a session's overflow into its medium-term summary.

![MemoryStore recovery when a replica is killed during compaction](./failure-mid-compaction.svg)

Summarizaton (aka compaction) is where a bounce could corrupt state, since the fold spans a summarization call and several table mutations.

The service serializes each fold with a Postgres advisory lock keyed on the scope, and runs it as one transaction: read the pending rows, produce the new summary as an append-only version, prune old versions, delete the folded rows (aka conversations outside of the current window), commit.

The killed replica's transaction rolls back, the rows stay marked pending, and the advisory lock is session-level so Postgres releases it the moment the dead connection drops. Re-running the fold is idempotent, so nothing double-folds and no summary version is ever half-written.

There is one honest gap: nothing actively sweeps for orphaned pending rows, they fold when the next write to that scope triggers compaction again. And long-term extraction keeps the "no durable queue" trade-off from the design section: the evicted messages are handed to an in-process background worker, so a replica death in that window can lose one batch of extracted facts. With the medium-term tier enabled the same messages still fold into the durable digest, so the conversational record survives even when a fact batch does not.

### Failure 3: A database node goes down

02:00 am. The database node itself dies. This is the incident we opened this blog post with, and it goes to whoever owns Postgres.

![MemoryStore degradation when the Postgres database node goes down](./failure-database-node.svg)

The `MemoryStore` supports any custom DSN to bring-your-own datastore through `connectionSecretRef`, and the operator deliberately does nothing about Postgres availability as it's expected to be an "external service" which is assumed to be HA for critical workloads.

In this case, both `MemoryStore` service replicas flip `NotReady` and drain from the endpoints until the database returns.

What the memory layer contributes is bounded state loss on either side of the failover. The medium-term summaries and the long-term facts live in regular logged tables and survive a crash. The short-term window is the deliberate trade-off, as it is an `UNLOGGED` table, which keeps the hottest per-message path at RAM speed at the cost of being truncated by a Postgres crash recovery. After a hard failover the agents come back with their durable digests and facts intact, minus the verbatim window of in-flight conversations, which is the tier designed to be cheapest to lose.

### Failure 4: The whole memory path is unreachable

02:01 am. From the agents' side: the memory path is simply gone, and thirty conversations are mid-message.

![Agents continuing with degraded memory when the whole memory path is unreachable](./failure-memory-path.svg)

On the service side, the conversational tiers return and the `degraded` flag is set. On the client side, any failure at all (timeout, connection refused, an error status) is caught and returned as an empty recall marked `degraded`, with a 5 second recall timeout so a hanging store cannot stall the message.

The agent runtime does not stop however, as message history falls back to the runtime's own event log, the memory block is simply absent, and the user gets an answer from an agent with a shorter memory. It is still an open question on how and whether to "inform" the agent about the degraded memory.

Writes follow the soft or strict contract from the resource: `soft` (the default) logs the failure and moves on, `strict` fails the message, which is the right choice only for agents whose writes are the product. Erasure is the deliberate exception, as a `forget` command that cannot clear the durable tiers surfaces as an error, because a deletion you cannot confirm must never look like a success.

### Failure 5: The auth service goes down

02:40 am. The teams fix the store, and they are back up. However to complete the night, the node running the auth service goes down with the identity issuer on it.

![Request path when the authentication service is unavailable](./failure-auth-service.svg)

The wiring section showed that identity is verified at the gateway + auth server(s) which both verify tokens offline. The gateway checks user JWTs against a cached JWKS, the policy engine checks them against signing keys the operator projects into the policy on a short poll interval, and when the issuer is unreachable the projector leaves the existing keys intact rather than blanking them. A user holding a valid, unexpired token keeps recalling and writing memory as if nothing happened.

New logins fail however since they need the issuer. Agents that mint their identity through client credentials serve from a cached token until it needs refreshing, then refuse to run with a stale or empty identity rather than degrade, and the policy engine denies whatever it cannot verify.

The store itself never talks to the auth provider, as it requires the identities to be present and trusts what the gateway verified. The net effect is that an issuer outage is a slow burn rather than a cliff: sessions age out one by one, and every path that cannot verify refuses rather than guesses.

Across the five scenarios the main patterns I adopted were that 1) state loss is bounded by tier durability, 2) service loss is absorbed by stateless replicas, database loss is delegated to the database, and 3) trust loss fails closed. This it is what lets memory stay an augmentation instead of becoming the dependency that takes the fleet down.

## Lessons for Production Agentic Memory

Here are the patterns from this part that I would carry into any agentic memory system. Remember we started with 5 lessons from Part 2 so here I start from #6.

### 6. Adopt the engine and own the contract

Wrap the memory engine behind your own interface, and adopt it for the right reason, which is latency and token cost at scale, since raw accuracy can actually favour full-context baselines. Every gap in the engine you select becomes your integration layer, so choose the gaps you know how to fill.

### 7. Memory is augmentation, never a hard dependency

Recall should degrade instead of raise, so that a memory outage produces an agent with a shorter memory instead of an agent that is down. If an outage of the memory path would be treated as an outage of the agent, the design needs revisiting before it scales.

### 8. Fail soft on state, fail closed on trust

The two halves of the failure contract follow different philosophies, and both are deliberate. When state is unavailable the system degrades: recall comes back empty and flagged, writes log and continue. When trust cannot be established the system refuses: an unverifiable token is denied, and an agent that cannot mint its identity does not run. Confusing the two produces either a fleet that is down when it could serve, or one that serves what it should have refused.

### 9. Probe the failure contract before your users do

Every scenario in this part has an expected answer: kill a replica and nothing is lost, bounce it mid-fold and the transaction rolls back, take the database down and the agents keep answering with shorter memory. Walking through them, or scripting them chaos-style, turns "memory degrades gracefully" from a README claim into behaviour you have observed, and any deviation becomes a bug in the contract rather than a surprise at 2am.

## Closing Thoughts for Part 3

We opened at 2am with the memory database down and thirty agents mid-conversation, asking four questions. After this part, each has a precise answer.

Which storage does the memory layer sit on? A profile, not a single pick: embedded Chroma plus SQLite on a volume for development, and your own Postgres with pgvector for production, referenced through a secret so the database's availability story stays with the team that already operates it.

Does memory run inside each agent or as a service they share? As a shared `MemoryStore` service, so the LLM extraction, the datastore connections, and what a fleet remembers stay consistent instead of diverging replica by replica.

What does the resource declare about replicas and availability? Two stateless replicas by default in external mode, a disruption budget, and readiness that drains a failing replica instead of killing it, all rendered from a few lines of spec.

And what did everyone agree happens when a dependency disappears? The failure contract: recall degrades to empty context and flags it, writes honour soft or strict, erasure refuses to fail silently, and identity verifies offline so an auth outage burns slowly instead of falling off a cliff. The agents keep serving with a shorter memory, and the 2am page goes to whoever owns the database, the same as any other night.

What remains is proof. In Part 4 we run the whole system end to end on a secured cluster: two users, three agents with different read entitlements, every tier and scope boundary exercised with real captured outputs, plus how to integrate the same pattern in your own agent, from scratch or through the `kaos-memory` package, and the operational lessons that close the series.

**The series:**

- **[Part 1: What agent memory is and what to build on.](/blog/whose-memory-is-it-part-1)** The taxonomy, the baseline implementations everyone starts with, and the engine landscape from surveying ~30 tools.
- **[Part 2: Tiers and scopes for multi-tenant agents.](/blog/whose-memory-is-it-part-2)** The three-tier design and the answer to whose memory it is.
- **Part 3 (this post): Memory as infrastructure.** The Kubernetes `MemoryStore` resource, its deployment topology, and the failure contract probed scenario by scenario.
- **Part 4: Agent memory in action.** A worked example that runs end to end on a secured cluster with real outputs, plus how to integrate the same pattern in your own agent (coming soon...).
