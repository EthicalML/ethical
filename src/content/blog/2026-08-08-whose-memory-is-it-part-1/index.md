---
title: Whose Memory Is It? Building Multi-Tenant, Multi-Tier Memory for AI Agents (Part 1)
date: 2026-08-08
image: './featured.jpg'
source: hackernoon
url: https://hackernoon.com/whose-memory-is-it-building-multi-tenant-multi-tier-memory-for-ai-agents-part-1
summary: 'This is a 4-part series on how agents remember: building short-, medium- and long-term memory that scales across users, agents, and kubernetes clusters.'
tags: [agents, memory, kubernetes]
series: 'Whose Memory Is It?'
---

LLMs are stateless by design, and without added memory logic every session starts from zero.

A number of dedicated memory layers have emerged (and continue emerging almost daily) to tackle this, each with different approaches and tradeoffs. Which one should you adopt?

Recently I spent some time extending the Kubernetes Agent Orchestration System (KAOS) to support multi-tiered memory persistence (aka short-, medium- and long-term memory). Along the way I hit most of the same issues that anyone would whilst building or integrating multi-tiered memory into an agentic system, so I thought it would be useful to compile all the learnings, design choices and examples into this 4-part series.

Hopefully this post is useful for anyone looking to do this on their own project. My objective:

> Let's make the memory layer BORING, so that the agents can continue to be the fun part.

This first part includes the research findings from exploring ~30 tools, together with the taxonomy and the baseline implementations that motivate needing them, including tools like [Mem0](https://github.com/mem0ai/mem0), [Zep/Graphiti](https://github.com/getzep/graphiti), [Letta (MemGPT)](https://www.letta.com/), [Cognee](https://github.com/topoteretes/cognee), [Memobase](https://github.com/memodb-io/memobase), [Redis Agent Memory Server](https://github.com/redis/agent-memory-server), as well as native implementations in [OpenAI's products](https://openai.com/index/memory-and-new-controls-for-chatgpt/), [Claude](https://claude.com/blog/memory), [LangGraph](https://docs.langchain.com/oss/python/langgraph/overview), [CrewAI](https://docs.crewai.com/introduction), and [Google ADK](https://google.github.io/adk-docs/), among many others.

Throughout the series, I also share the learnings and best practices that came out of navigating through a large number of architecture tradeoffs, and getting my hands dirty on the implementation that now ships as a distributed, highly available, and scalable `MemoryStore` resource that any agent can bind to.

As with my previous posts on [observability for agentic systems](https://hackernoon.com/production-observability-for-multi-agent-ai-with-kaos-otel-signoz) and [autonomous always-on agentic patterns](https://hackernoon.com/autonomous-agentic-systems-a-practical-guide-to-always-on-agents), I will use KAOS as the concrete implementation example (concretely from Part 2, hands-on in Part 4), but the goal is to provide practical intuition for the primitives (tiers, scopes, folding, degradation), so that it applies whether you use KAOS, Mem0 directly, LangGraph, CrewAI, or a memory layer you wrote yourself.

This post is the first of a 4-part series, which we plan to release weekly over the next couple of weeks:

- **Part 1 (this post): What agent memory is and what to build on.** The taxonomy, the baseline implementations everyone starts with, and the engine landscape from surveying ~30 tools.
- **Part 2: Tiers and scopes for multi-tenant agents.** The three-tier design and the answer to whose memory it is (coming soon...).
- **Part 3: Memory as infrastructure.** The Kubernetes `MemoryStore` resource, its deployment topology, and how to integrate it in your own agent (coming soon...).
- **Part 4: Agent memory in action.** A worked example that runs end to end on a secured cluster, with real outputs (coming soon...).

## A Working Taxonomy of Agent Memory

"Memory" is one of the most overloaded words in agentic systems, so it is worth separating it from the concepts it gets conflated with, such as:

- The **context window**, which holds working state for a single model call.
- **Session history**, which holds an auditable transcript of what was said.
- **Prompt telemetry**, which holds the specific prompts relative to events in the system.

To be more precise we can look at Princeton University's paper on [Cognitive Architectures for Language Agents (CoALA)](https://arxiv.org/abs/2309.02427) to provide a more precise definition for "Memory" in agentic systems. We can define "Memory" as the component that holds the short-, medium- and long-term information an agent carries across turns and sessions to inform its reasoning.

This research paper quoted also provides a useful taxonomy for "memory types" that we will use to reason throughout the series, and especially in the tier design of part 2. This includes the memory types for episodic, semantic, procedural and temporal memory.

These memory types are also mentioned in the Berkeley paper that released [MemGPT](https://arxiv.org/abs/2310.08560), as well as how the Stanford paper on large-scale LLM simulations [Generative Agents: Interactive Simulacra of Human Behavior](https://arxiv.org/abs/2304.03442) structured their memory event stream.

The formal definition of these memory types (+ a few examples) is outlined as follows:

| Memory type          | What it holds                                  | Example                                                     |
| -------------------- | ---------------------------------------------- | ----------------------------------------------------------- |
| Short-term (working) | Verbatim recent turns of the live conversation | "The user just said port 8080"                              |
| Episodic             | Records of specific past events                | "On Tuesday the deploy failed twice"                        |
| Semantic             | Distilled, durable facts                       | "The user prefers blue-green deploys"                       |
| Procedural           | Learned skills and how-tos                     | "Here is how we roll back this service"                     |
| Temporal             | Facts with validity intervals                  | "Joe _was_ in a relationship until March, but not anymore." |

In practice what I found out however is that most frameworks only implement a small number of these, namely **short-term** is always present, **episodic and semantic** are bundled (the only difference is whether time is preserved), **procedural** tends to be present mainly in coding agents (eg creating skills, commands, extensions), and **temporal** tends to be replaced with "forgetting memory" functionality instead, or embedded with episodic/semantic.

These appear more informally defined as:

- **Conversational continuity**: The agent remembers what was said three turns ago; a _same-session_ problem.
- **Learned knowledge**: The agent remembers what it figured out last week; a _cross-session_ problem.

For example, frameworks like [LangGraph](https://docs.langchain.com/oss/python/langgraph/persistence) separate thread-scoped checkpointers from a cross-thread store. Another example is [Letta](https://docs.letta.com/guides/core-concepts/memory/memory-blocks), which separates always-in-context memory blocks from an archival tier.

Most of the design mistakes I made early came from either trying to tackle all of these "memory-types" separately, by bundling sub-optimally, or by oversimplifying too much.

But before we dive into the implementation, let's cover the basics.

## Memory 101: The Version Everyone Starts With

Almost every agent system starts with the same memory implementation:

```python
memory = []

async def handle_message(user_message):
    memory.append({"role": "user", "content": user_message})
    response = await run_agent(memory[-20:], tools)
    memory.append({"role": "assistant", "content": response})
    return response
```

And to be honest, the original KAOS memory was exactly this. It was an in-process queue with a max length, which ensured it was replaying the last N events into the next prompt.

The second version everyone builds is "just embed everything":

```python
async def handle_message(user_message):
    hits = await vector_store.search(embed(user_message), top_k=5)
    context = "\n".join(h.text for h in hits)
    response = await run_agent([context, user_message], tools)
    await vector_store.add(embed(user_message), user_message)
    return response
```

This is better, but this is not memory in the form that we introduced eariler, it is just a better search mechanism across the prompt history.

Another tempting alternative as the next step is "context windows are huge now, just replay everything".

However this is not a great approach, and there are some benchmarks like [UCLA's Bench on Long-Term Interactive Memory](https://arxiv.org/abs/2410.10813), which showed that models reasoning over full ~115K-token interaction histories lose 30-60% accuracy versus the same models given oracle retrieval.

If we look at it from a feature / functionality standpoint, we can summarise the gaps between the base and the production implementation as follows:

| Naive memory                         | Production memory                                                      |
| ------------------------------------ | ---------------------------------------------------------------------- |
| Last-N turns, unbounded token growth | Token-budgeted window with principled eviction                         |
| Verbatim replay of everything        | Distilled facts, separated from the transcript (eg long- / short-term) |
| One user, one process                | Many tenants, many agents, many replicas                               |
| Memory lives inside the agent pod    | Memory survives restarts and is shared across the fleet                |
| Writes block the response            | Extraction runs off the hot path                                       |
| Nothing is ever forgotten            | Decay, retention, and right-to-erasure                                 |
| Memory failure crashes the turn      | Memory failure degrades the turn                                       |

In this case we can position "production memory" a tiered, scoped, context-specific and dynamic store, as opposed to purely a vector database connected to an agent.

Achieving this in a way that scales does get complex, as we need to decide who can see each memory tier, when we store facts, and how the agent behaves when memory fails.

However now that we have the conceptual foundation in place, we can start looking at these functionalities relative to the frameworks available.

## Choosing an Engine: Build, Adopt, or Wrap

Before designing anything, I surveyed the landscape thoroughly, assessing dozens of tools across three tiers, and we will cover the scope, approach and learnings in this section, starting with an overview of all the tiers as follows.

**Tier 1: Dedicated memory frameworks.**
This tier encompasses purpose-built frameworks whose whole job is agent memory. From the longer list, we reduced it to the actively maintained ones:

| Candidate                                                                 | Approach                                                                                   | Store                                          | Strength                                             | Weakness                                            |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------- |
| [Mem0](https://github.com/mem0ai/mem0)                                    | extracts facts from conversations into a vector store and recalls them by similarity       | Qdrant, pgvector, others                       | most adopted, cleanest library integration           | no OTel, tenant isolation only at application level |
| [Zep / Graphiti](https://github.com/getzep/graphiti)                      | builds a temporal knowledge graph where facts carry validity intervals and provenance      | Neo4j or FalkorDB                              | richest memory model, time-aware fact invalidation   | heaviest to operate, costliest writes               |
| [Cognee](https://github.com/topoteretes/cognee)                           | combines a knowledge graph with vector search, populated by an extract-and-load pipeline   | LanceDB by default, Postgres or Neo4j optional | multi-tenancy and OTel built in                      | early stage, heavy dependencies, changing API       |
| [Memobase](https://github.com/memodb-io/memobase)                         | maintains structured user profiles and event timelines, with no embeddings on the hot path | Postgres + Redis                               | cheapest write path                                  | profile-only recall, weak self-hosted multi-tenancy |
| [Redis Agent Memory Server](https://github.com/redis/agent-memory-server) | serves two memory tiers (working and long-term) behind one REST API                        | Redis                                          | the two-tier model mirrors what agents actually need | young project, no OTel                              |

What this tier taught me is that the architectural differences are really differences in recall pattern and write cost. Vector-first designs answer "what do we know about X" cheaply, graph-first designs answer "how did this fact change over time" at the price of an LLM-heavy ingestion pipeline plus a graph database. The profile-first designs answer "who is this user" with no embeddings on the hot path at all, and the two-tier designs bake in the working-versus-long-term split directly.

There were also clear shared gaps, mainly at the infrastructure level; none of them enforces tenant isolation below the application level, and almost none ships OpenTelemetry, so whichever one you pick, scope enforcement and observability become your integration work. That shared gap shaped the KAOS design more than any individual feature did.

It's also worth noting that several of these libraries also offer an enterprise tier, so it was important to validate that basic features are not gated behind a paywall (similar to what we previously experienced with Google ADK and Vertex). More specifically [Mem0's own platform-versus-OSS documentation](https://docs.mem0.ai/platform/platform-vs-oss) gates temporal reasoning, memory decay, webhooks, export, analytics, and auto-scaling behind the managed platform, and [Zep draws the line](https://www.getzep.com/platform/graphiti/) at governed multi-tenancy and compliance, with the OSS Graphiti engine giving you a single context graph to run yourself. The pattern across vendors is that the memory algorithms are open while the operational maturity is the commercial product, which previews the exact layer a platform adopting one of these engines has to build.

**Tier 2. Agent frameworks with native memory.**
This tier encompasses the embedded memory functionality across end-to-end agentic frameworks, and included the usual suspect / popular frameworks like [LangGraph's Store and LangMem](https://docs.langchain.com/oss/python/langgraph/persistence), [CrewAI memory](https://docs.crewai.com/introduction), [LlamaIndex memory](https://docs.llamaindex.ai/), [Google ADK](https://google.github.io/adk-docs/)'s MemoryService, and the [Microsoft Agent Framework](https://github.com/microsoft/agent-framework). These were reviewed for their design choices, but adopting one for its memory means importing a second agent runtime next to your own, so they served as references and not as candidates.

The learning from this tier is actually what they all had in common. Every framework independently separates session-scoped state and cross-session knowledge, such as how LangGraph has thread-scoped checkpointers versus its cross-thread Store.

There was also a clear separation between "local playground" and "production grade" when it comes to memory for all frameworks.

- [LangGraph](https://docs.langchain.com/oss/python/langgraph/add-memory): In-memory store is for development, but it's recommended to use a database-backed checkpointer and store for production.
- [Google ADK](https://adk.dev/sessions/memory/): Heavier paywall, as it only offers the `InMemoryMemoryService` as open source, but anything serious would need to use Vertex AI.
- [Microsoft Agent Framework](https://learn.microsoft.com/en-us/agent-framework/get-started/memory): Defaults to an in-memory context provider, with durable state via first-party Cosmos checkpoint storage, and ships a first-party `Mem0ContextProvider`.
- CrewAI: Community documented replacing its native store with Mem0 after hitting redeploy and user-isolation gaps.

Also interesting learnings from agent runtimes and coding agents:

- [OpenClaw](https://docs.openclaw.ai/reference/AGENTS.default): layers markdown memory files (`MEMORY.md`, dated notes, per-skill `SKILL.md`) and runs a "Skill Workshop" where the agent proposes new skills from successful conversations for human approval.
- [Hermes agent](https://github.com/NousResearch/hermes-agent/blob/main/website/docs/user-guide/features/skills.md): Uses skills explicitly as procedural memory, which are auto-proposed after repeated successful tool-call patterns, carry semver versions bumped on each self-improvement, and follow an anti-sediment principle where a skill should get shorter and sharper over time.
- [Claude Code skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview): Uses progressive disclosure, loading only ~100 tokens of skill metadata until a skill is triggered.

Native memory is increasingly an extensible interface where the shipped default is a placeholder, which means memory is being externalized by design across the ecosystem, and the dominant production pattern is framework plus engine. This is something that we had to take into consideration as well.

**Tier 3. Managed and commercial services.**
This tier included commercial services with managed memory platforms, which provided insights on the broader design of the system and the interactions with the memory, as opposed to just the design of the memory capability itself. These included the [Mem0 Platform](https://mem0.ai/), [Zep Cloud](https://www.getzep.com/), [Letta Cloud](https://www.letta.com/), [OpenAI memory](https://openai.com/index/memory-and-new-controls-for-chatgpt/), and [Google's Vertex Memory Bank](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/memory-bank/overview).

The learnings from this tier were also quite helpful to understand some of the architectural and feature tradeoffs that were done at the platform level. Every managed platform has the same two-layer model: namely 1) an explicit, user-curated layer (eg. OpenAI's saved memories, Claude's editable memory summary) that is visible/available at the surface, and that is build on top of; 2) an automatically inferred and consolidated layer (eg. OpenAI's chat-history reference, Vertex Memory Bank's LLM extraction with per-scope deduplication and contradiction checks) where the memory store/retrieval algorithms live.

There was however a clear distinction on the scope in which memory is available across each platform: For Claude, memory scope is per project, in Vertex scope is per identity with configurable memory "topics", and Zep scopes per subject graph. None of them defaults to one global memory per account, which makes it clear that there is a design decision required on the isolation boundary.

### Conclusions from Surveying the Ecosystem

Given the review was done in context of KAOS, the lens / considerations through which these were reviewed included the following non-exhaustive list:

- Long-term capability coverage
- Retrieval quality
- Embeddability as a library
- Pluggable storage backends
- Infrastructure delta / overhead
- Multi-tenancy hooks
- Observability
- Licensing
- Maturity
- Write-path cost

Based on these, the library that clearly stood out was **Mem0**. At least at the time of writing, Mem0 maximized the features and capabilities with the lowest integration friction. Mem0 also has the strongest ecosystem maturity, and pluggable stores.

It's however worth noting that despite Mem0 being the right choice for this context, one learning that may seem obvious in retrospect was that **there is no "Perfect Candidate".** The graph-first leaders (Graphiti, Cognee) have the most features but at the highest cost. Low-delta options (Redis AMS) buy fit at maturity cost. Building it yourself directly on the raw vector or graph stores, which we also weighed as the baseline option, allows you to have all the features and fit, but at the cost of rebuilding mature extraction and retrieval that already exists under permissive licenses.

This also applies to the numbers the frameworks publish about themselves. Interestingly enough, Mem0's own research supports that extraction-based memory improves latency and cost, however it does not improve raw accuracy: in [Mem0's own evaluation](https://arxiv.org/abs/2504.19413) on LoCoMo, a full-context baseline beats Mem0 on raw accuracy (72.9% vs 66.9%), while memory buys a 91% cut in p95 latency (1.44s vs 17.1s) and over 90% fewer tokens per conversation. At fleet scale that trade is exactly right, since you cannot ship 17-second turns and 26K-token replays, but it is a trade you should make knowingly.

As part of this, despite Mem0 being the strongest choice, it became clear that **adopting a memory engine means choosing which 60% of the system you do not have to build, and committing to build the remaining 40% around it**.

For Mem0, this meant working on the bridge to close some of the gaps, particularly at the infrastructure and interoperability layer. These included:

- Enabling telemetry by instrumenting every operation and ensure correlation+consistency with the broader KAOS telemetry.
- Introduce tenant isolation, as this is enforced at the Mem0 application level, so enforce scope through the memory service.
- Bundle up the kubernetes packaging to ensure high availability and scalability as a distributed service.
- Bridge the short- and medium-term memory with a native integration with the Pydantic AI server that we have built as part of KAOS.

Each of these gaps becomes a design decision in parts 2 and 3.

Based on these initial decisions we were able to proceed to the architecture of the memory system itself, which is exactly where part 2 picks up.

## Closing Thoughts for Part 1

This first part covered the ground you need before writing any memory code with a working taxonomy that separates memory from the context window and the session transcript. We also reviewed the baseline implementations and the understood some of the limitations. This included the survey of the memory engine landscape, and the thinking process that went into selecting the memory framework to build upon.

However this is only the beginning as choosing the memory framework is only 40% of the work, we still need to build the remaining 60% to ensure we can integrate it in a coherent and scalable way for our distributed agent system use-case.

In part 2 we take that position and design the memory system itself. This includes the three tiers that separate "memory tiers", and the scope model that answers the title’s question of "whose memory is it?". Stay tuned, part 2

**The series:**

- Part 1 (this post): What agent memory is and what to build on.
- Part 2: Tiers and scopes for multi-tenant agents (coming soon...).
- Part 3: Memory as infrastructure (coming soon...).
- Part 4: Agent memory in action (coming soon...).
