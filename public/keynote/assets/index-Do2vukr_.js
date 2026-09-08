(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Wl=[80.8,97.8,90.3,95.3,100.1,106.3,99.2,107.4,117,125.5,125.6,135.4,144.2,147,141.3,149.4,153,158.3,152.9,167.8,177.7,209.2,215,246.8,319.8],cu=Array.from({length:12},(i,e)=>Wl[Math.round(e*24/11)]),xt=(...i)=>'<div class="foot">'+i.map((e,t)=>`[${t+1}] <a href="${e}" target="_blank" rel="noopener">${e.replace(/^https?:\/\//,"").slice(0,72)}</a>`).join(" · ")+"</div>",He=(i,e)=>`<div class="rv" style="--d:${i}">${e}</div>`,De=(i,e,t)=>`<div class="rv r" style="--d:${i}">${e?`<b>${e}</b>`:""}<span>${t}</span></div>`,Zi=(i,e,t,n)=>`<div class="rv stat" style="--d:${i}"><div class="n cnt" data-n="${e}" data-fmt="${t}">0</div><div class="l">${n}</div></div>`,Pn=i=>`<div class="fivedots">${[0,1,2,3,4].map(e=>`<i${e===i?' class="on"':""}></i>`).join("")}</div>`,Hr=(i,e)=>`<div class="win"><div class="tb"><i class="on"></i><i></i><i></i><span>${i}</span></div><div class="bd">${e}</div></div>`;function $l(i,e,t,n){const s=Math.max(...i);return i.map((r,a)=>[n+a*(e-2*n)/(i.length-1),t-n-r/s*(t-2*n)])}function Rr(i){return i.map((e,t)=>(t?"L":"M")+e[0].toFixed(1)+" "+e[1].toFixed(1)).join(" ")}function ld(i,e,t,n,s){const r=[.25,.5,.75,1].map(o=>{const l=n-s-o*(n-2*s);return`<line x1="${s}" x2="${t-s}" y1="${l}" y2="${l}" stroke="rgba(255,255,255,.07)"/>`}).join(""),a=e.map((o,l,c)=>o?`<text class="axis" x="${s+l*(t-2*s)/(c.length-1)}" y="${n-s+22}" text-anchor="middle">${o}</text>`:"").join("");return{open:`<svg viewBox="0 0 ${t} ${n}" role="img">${r}${a}<text class="axis" x="${s}" y="${s-16}">${i}</text>`,close:"</svg>"}}const hu=Wl.map((i,e)=>e%4==0?"20"+(20+e/4):""),du=["May 25","","Jul","","Sep","","Nov","","Jan 26","Feb","","Apr"];function uu(){const n=ld("global git pushes per quarter · millions",hu,980,340,46),s=$l(Wl,980,340,46);return n.open+`<path id="igArea" d="${Rr(s)} L ${s[24][0]} 294 L ${s[0][0]} 294 Z" fill="rgba(94,230,160,.16)" opacity="0"/>
  <path id="igLine" d="${Rr(s)}" fill="none" stroke="#5ee6a0" stroke-width="2.6" stroke-linejoin="round"/>
  <g id="igChip" opacity="0"><rect x="${s[24][0]-86}" y="${s[24][1]-40}" rx="4" width="78" height="26" fill="#5ee6a0"/>
  <text class="chip" x="${s[24][0]-47}" y="${s[24][1]-22}" text-anchor="middle" font-weight="600">319.8M</text></g>`+n.close}function fu(){const n=ld("GitHub incidents per month",du,980,340,46),s=$l(cu,980,340,46);return n.open+`<path id="moLine" d="${Rr(s)}" fill="none" stroke="#5ee6a0" stroke-width="2.6" stroke-linejoin="round"/>
  <g id="moChip" opacity="0"><rect x="${s[11][0]-64}" y="60" rx="4" width="56" height="26" fill="#ff5a6e"/>
  <text class="chip" x="${s[11][0]-36}" y="78" text-anchor="middle" font-weight="600" fill="#0f100f">37</text></g>`+n.close}const pu=(()=>{let i="";const e=["search","fetch","db.query","transform","notify","write","fetch","db.query","commit"];for(let t=0;t<9;t++)i+=`<g class="cmspan" data-i="${t}"><rect x="60" y="${26+t*32}" width="${170+t*67%140}" height="22" rx="4" fill="#171818" stroke="rgba(255,255,255,.1)"/>
  <text x="70" y="${42+t*32}" fill="rgba(244,242,238,.66)" font-size="12" font-family="Geist Mono">tool_call · ${e[t]}</text></g>`;return`<svg id="cmsvg" viewBox="0 0 980 330" style="max-width:900px">${i}
  <text x="60" y="322" fill="rgba(244,242,238,.48)" font-size="13" font-family="Geist Mono">before · 9 spans, each visible</text>
  <g id="cmTarget" opacity="0"><rect x="560" y="120" width="360" height="70" rx="6" fill="#0f100f" stroke="#ff5a6e"/>
  <text x="740" y="150" text-anchor="middle" fill="#ff5a6e" font-size="16" font-family="Geist Mono">execute_code</text>
  <text x="740" y="174" text-anchor="middle" fill="rgba(244,242,238,.48)" font-size="12" font-family="Geist Mono">1 span · contents opaque</text></g>
  <text id="cmAfter" opacity="0" x="560" y="322" fill="rgba(244,242,238,.48)" font-size="13" font-family="Geist Mono">after · the same work, one span</text></svg>`})();function Pc(i){return`<svg id="${i}" viewBox="0 0 980 380" style="max-width:900px">
  <defs><marker id="ar${i}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#5ee6a0"/></marker></defs>
  <g class="lp" data-d="0"><rect x="70" y="152" width="180" height="62" rx="8" fill="#0f100f" stroke="rgba(255,255,255,.1)"/>
  <text x="160" y="189" text-anchor="middle" fill="rgba(244,242,238,.66)" font-size="15">desired state</text></g>
  <g class="lp" data-d=".12"><rect x="380" y="140" width="220" height="86" rx="8" fill="#171818" stroke="#5ee6a0"/>
  <text x="490" y="176" text-anchor="middle" fill="#f4f2ee" font-size="19" font-weight="600">controller</text>
  <text x="490" y="202" text-anchor="middle" fill="rgba(244,242,238,.66)" font-size="13" font-family="Geist Mono">reconcile()</text></g>
  <g class="lp" data-d=".24"><rect x="730" y="152" width="180" height="62" rx="8" fill="#0f100f" stroke="rgba(255,255,255,.1)"/>
  <text x="820" y="189" text-anchor="middle" fill="rgba(244,242,238,.66)" font-size="15">agents acting</text></g>
  <g class="lp" data-d=".34"><line x1="250" y1="183" x2="372" y2="183" stroke="#5ee6a0" stroke-width="2" marker-end="url(#ar${i})"/>
  <line x1="600" y1="183" x2="722" y2="183" stroke="#5ee6a0" stroke-width="2" marker-end="url(#ar${i})"/></g>
  <path class="lpArc" d="M820 152 C 820 40, 490 40, 490 132" fill="none" stroke="#5ee6a0" stroke-width="2" marker-end="url(#ar${i})"/>
  <g class="lp" data-d=".62"><text x="655" y="66" text-anchor="middle" fill="#5ee6a0" font-size="14" font-family="Geist Mono">sensing</text></g>
  ${["correctness distributions","delegation chains","memory provenance","semantic drift","spend"].map((e,t)=>{const n=110+t*190;return`<g class="lp" data-d="${.68+t*.06}"><rect x="${n-88}" y="308" width="176" height="40" rx="20" fill="#171818" stroke="rgba(94,230,160,.28)"/>
    <text x="${n}" y="333" text-anchor="middle" fill="rgba(244,242,238,.66)" font-size="13.5">${e}</text>
    <line x1="${n}" y1="308" x2="${Math.min(Math.max(n,410),570)}" y2="230" stroke="rgba(94,230,160,.28)" stroke-width="1.5"/></g>`}).join("")}
</svg>`}const mu=`<svg viewBox="0 0 980 260" style="max-width:860px">
  <path id="stepLine" d="M60 190 L 470 186 L 470 70 L 920 62" fill="none" stroke="#e8b45c" stroke-width="3"/>
  <circle cx="470" cy="70" r="5" fill="#e8b45c"/>
  <text x="470" y="44" text-anchor="middle" fill="#e8b45c" font-size="14" font-family="Geist Mono">the day someone fixed the pipeline</text>
  <line x1="60" y1="222" x2="920" y2="222" stroke="rgba(255,255,255,.07)"/><text class="axis" x="60" y="248">months, dashboards green throughout</text></svg>`,gu=`<svg viewBox="0 0 980 300" style="max-width:760px">
  <g class="rv" style="--d:.1"><path d="M140 40 L840 40 L700 140 L280 140 Z" fill="#171818" stroke="#e8b45c"/>
  <text x="490" y="100" text-anchor="middle" fill="#f4f2ee" font-size="18">writing code · tooling exploded</text></g>
  <g class="rv" style="--d:.3"><path d="M280 150 L700 150 L610 230 L370 230 Z" fill="#0f100f" stroke="rgba(255,255,255,.1)"/>
  <text x="490" y="198" text-anchor="middle" fill="rgba(244,242,238,.66)" font-size="15">testing</text></g>
  <g class="rv" style="--d:.5"><path d="M370 240 L610 240 L540 292 L440 292 Z" fill="#0f100f" stroke="#ff5a6e"/>
  <text x="490" y="274" text-anchor="middle" fill="#ff5a6e" font-size="15" font-weight="700">operating · this talk</text></g></svg>`;function Ic(i,e,t){const n=[8,10,9,12,14,13,16,15,19,22,21,26,25,31,30,38,46,62,88],s=300,r=190,a=18,o=$l(n,s,r,a);return`<div class="rv" style="--d:${t};flex:0 0 218px;max-width:218px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
    <span style="color:var(--ink-66);font-size:15px">${e}</span><span style="font-family:'Geist Mono',monospace;background:var(--accent);color:#0f100f;border-radius:4px;padding:2px 9px;font-size:14px">${i}</span></div>
    <svg viewBox="0 0 ${s} ${r}"><path d="${Rr(o)} L ${o[18][0]} ${r-a} L ${o[0][0]} ${r-a} Z" fill="rgba(94,230,160,.12)"/>
    <path class="drawme" d="${Rr(o)}" fill="none" stroke="#5ee6a0" stroke-width="2.4"/>
    <text class="axis" x="${a}" y="${r-3}">2023</text><text class="axis" x="${s-a}" y="${r-3}" text-anchor="end">2026</text></svg></div>`}const vu=[{id:"0.1",vh:200,hue:"g",L:"Lc",act:"",h:`${He(.05,"<h1>The New Failure Modes</h1>")}
 ${He(.25,'<p class="lead" style="margin-top:2vh">Observability in the Age of AI Agents</p>')}
 ${He(.45,'<p class="src" style="margin-top:5vh">Alejandro Saucedo · Signals Berlin 2026</p>')}`},{id:"0.2",vh:180,hue:"g",L:"Ll",act:"",h:`${He(0,"<h2>Who's telling you this</h2>")}<div class="rows" style="font-size:clamp(14px,1.3vw,19px)">
 ${De(.15,"","Exec Director of AI, Data &amp; Platform · Zalando")}
 ${De(.28,"","Board Member · ACM")}
 ${De(.41,"","AI advisor · UN, OECD, Linux Foundation, Institute for Ethical AI - among others")}</div>
 ${He(.6,'<p class="src" style="margin-top:3vh">a decade running ML systems in production - and a year ago at SREcon, a talk about that decade</p>')}`},{id:"D1",div:"1",name:"Where We Are",sub:"Three snapshots of software, September 2026",hue:"g"},{id:"1.1",vh:240,hue:"g",L:"Ll",act:"Act 1 · Where we are",h:`${He(0,'<h2>The race to the <s style="opacity:.45">bottom</s> top</h2>')}<div class="rows">
 ${De(.12,"Uber","70%+ of pull requests from local or cloud agents")}
 ${De(.28,"Zalando","33% of PRs auto-approved · 250+ teams · lead time down 20-40%")}
 ${De(.44,"Microsoft",'"20-30% of our code is written by AI" - Nadella')}
 ${De(.6,"Google",'"&gt;30% of new code" - Pichai')}</div>
 ${xt("https://www.uber.com/us/en/blog/efficient-software-factory/","https://engineering.zalando.com/posts/2026/08/agentic-engineering-at-zalando-a-snapshot.html","https://www.cnbc.com/2025/04/29/satya-nadella-says-as-much-as-30percent-of-microsoft-code-is-written-by-ai.html")}`},{id:"1.2",vh:240,hue:"g",L:"Lr",act:"Act 1 · Where we are",h:`${He(0,"<h2>Not just code</h2>")}<div class="rows">
 ${De(.12,"Anthropic","95% of internal analytics queries automated · ~95% accuracy")}
 ${De(.3,"OpenAI","~4,000 of ~5,000 employees on its internal data agent · 600+ PB · 70,000 datasets · insights from hours to minutes")}
 ${De(.5,"Spotify","2,100+ employees on the internal data assistant · 13,000+ conversations · over a quarter had never written SQL")}</div>
 ${xt("https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude","https://openai.com/index/inside-our-in-house-data-agent/","https://engineering.atspotify.com/2026/6/encoding-your-domain-expert-the-context-layer-behind-spotifys-data-assistant")}`},{id:"1.3",vh:380,fx:"ig",hue:"g",L:"Lw",act:"Act 1 · Where we are",h:`${He(0,"<h2>The fastest acceleration in the history of software</h2>")}
 <div class="rv chart" style="--d:.06;background:rgba(15,16,15,.72)">${uu()}</div>
 ${He(.55,'<p class="lead" style="margin-top:2vh"><span class="big">+80%</span> in the last year, after five years of ~17%.</p>')}
 <div style="display:flex;gap:3vw;flex-wrap:wrap;margin-top:2vh">${Ic("90M","Merged pull requests / mo",.62)}${Ic("20M","New repositories / mo",.74)}</div>
 ${He(.84,'<p class="src" style="margin-top:2vh">GitHub Innovation Graph · GitHub availability update, April 2026 · PR/repo shapes recreated, endpoints theirs</p>')}
 ${xt("https://innovationgraph.github.com/global-metrics/git-pushes","https://github.blog/news-insights/company-news/an-update-on-github-availability/","https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/")}`},{id:"1.4",vh:380,fx:"morph",hue:"g",L:"Lw",act:"Act 1 · Where we are",h:`${He(0,"<h2>PRs up. Incidents up.</h2>")}
 <div class="rv chart" style="--d:.04;background:rgba(15,16,15,.72)">${fu()}</div>
 <div class="statgrid" style="margin-top:2.5vh">${Zi(.55,257,"plain","incidents in 12 months")}${Zi(.65,48,"plain","major outages")}
 <div class="rv stat" style="--d:.75"><div class="n">capacity</div><div class="l">the top root cause</div></div></div>
 ${He(.85,`<p class="src" style="margin-top:2vh">IncidentHub tracker, from GitHub's public status page · peak 37, Feb 2026</p>`)}
 ${xt("https://blog.incidenthub.cloud/github-reliability-outage-history-2025-2026","https://leaddev.com/software-quality/whats-gone-wrong-at-github","https://github.blog/news-insights/company-news/an-update-on-github-availability/")}`},{id:"1.5",vh:260,hue:"g",L:"Ll",act:"Act 1 · Where we are",h:`${He(0,"<h2>Work left the laptop</h2>")}<div class="rows">
 ${De(.14,"Cursor","35% of its own merged PRs come from Cloud Agents, one VM per agent")}
 ${De(.32,"13.5M","Copilot coding-agent sessions in a single month - Microsoft Research")}
 ${De(.5,"Linear","issues route to agents with zero humans in the triage rule")}</div>
 ${He(.68,`<p class="lead" style="margin-top:3vh">The unit of work is no longer an editor session - it's a sandbox you never see.</p>`)}
 ${xt("https://www.microsoft.com/en-us/research/wp-content/uploads/2026/08/ghcp_traces-6.pdf","https://linear.app/docs/agents-in-linear")}`},{id:"1.6",vh:280,hue:"g",L:"Ll",act:"Act 1 · Where we are",h:`${He(0,"<h2>All of it wired to one shared memory</h2>")}<div class="rows">
 ${De(.12,"Linear","agents now create <b>~2.4M</b> issues a week. Humans: <b>~2.5M</b>. Near parity.")}
 ${De(.28,"Jira","agents ship as an assignee option, assignable like teammates")}
 ${De(.42,"Atlassian Rovo","5M+ monthly users · 75% of the Fortune 500")}
 ${De(.56,"Claude","persistent, project-scoped memory across conversations")}</div>
 ${He(.72,'<p class="quote" style="margin-top:3vh">"What is my team working on?" is becoming <em>a query, not a conversation.</em></p>')}
 ${xt("https://linear.app/data","https://www.atlassian.com/blog/rovo/ai-agents-in-jira","https://claude.com/blog/memory")}`},{id:"1.7",vh:260,hue:"g",L:"Lr",act:"Act 1 · Where we are",h:`${He(0,"<h2>And it's not just our industry</h2>")}<div class="rows">
 ${De(.12,"74%","of enterprises expect to run agentic AI within two years - Deloitte")}
 ${De(.26,"62%","of organizations are already experimenting with agents - McKinsey")}
 ${De(.4,"80%","of common customer-service issues resolved autonomously by 2029 - Gartner")}
 ${De(.54,"Klarna","2.3M conversations in month one · two-thirds of all chats · the work of <b>700</b> people")}</div>
 ${He(.7,'<p class="src" style="margin-top:2vh">later rebalanced to a hybrid human/AI model</p>')}
 ${xt("https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html","https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai","https://www.gartner.com/en/newsroom/press-releases/2025-03-05-gartner-predicts-agentic-ai-will-autonomously-resolve-80-percent-of-common-customer-service-issues-without-human-intervention-by-2029","https://www.klarna.com/international/press/klarna-ai-assistant-handles-two-thirds-of-customer-service-chats-in-its-first-month/")}`},{id:"1.8",vh:240,hue:"g",L:"Ll",act:"Act 1 · Where we are",h:`${He(0,"<h2>Agents running the whole lifecycle</h2>")}<div class="rows">
 ${De(.15,"REA","plans, launches, debugs and iterates Meta's ads-ranking lifecycle - doubled accuracy-iteration gains across six models · 2 engineers per model became 3 across 8")}
 ${De(.4,"KernelEvolve","writes production GPU kernels - +60% inference throughput · trillions of requests a day")}</div>
 ${xt("https://engineering.fb.com/2026/03/17/developer-tools/ranking-engineer-agent-rea-autonomous-ai-system-accelerating-meta-ads-ranking-innovation/","https://engineering.fb.com/2026/04/02/developer-tools/kernelevolve-how-metas-ranking-engineer-agent-optimizes-ai-infrastructure/")}`},{id:"1.9",vh:300,hue:"g",L:"Lr",act:"Act 1 · Where we are",h:`${He(0,"<h2>What it took to run that safely</h2>")}<div class="rows" style="font-size:clamp(14px,1.3vw,19px)">
 ${["Preflight access checklist","Compute budget confirmed upfront","Halt-and-pause thresholds","A failure runbook the executor consults itself","Scope fence","Bitwise correctness verification","Search termination criteria"].map((i,e)=>De(.1+e*.09,"",i)).join("")}</div>
 ${He(.8,'<p class="lead" style="margin-top:3vh">Every one of these is bespoke. None of it is standard.</p>')}
 ${xt("https://engineering.fb.com/2026/03/17/developer-tools/ranking-engineer-agent-rea-autonomous-ai-system-accelerating-meta-ads-ranking-innovation/")}`},{id:"D2",div:"2",name:"The New Failure Modes",sub:"The same three snapshots, breaking",hue:"r",glitch:1},{id:"2.1",vh:300,hue:"r",L:"Ll",act:"Act 2 · The new failure modes",h:`${He(0,"<h2>April 23, 2026</h2>")}
 <div class="statgrid">${Zi(.1,2092,"comma","pull requests")}${Zi(.22,658,"plain","repositories")}
 <div class="rv stat" style="--d:.34"><div class="n">incorrect</div><div class="l">merge commits</div></div></div>
 ${He(.55,`<p class="quote" style="margin-top:5vh">"...the existing monitoring didn't catch it because the issue was about <em>merge correctness</em> rather than availability."</p><p class="src">- GitHub</p>`)}
 ${xt("https://github.blog/news-insights/company-news/an-update-on-github-availability/")}`},{id:"2.2",vh:240,hue:"r",L:"Lr",act:"Act 2 · The new failure modes",h:`${He(0,"<h2>The workplace we just wired up, part 1</h2>")}<div class="rows">
 ${De(.15,"Replit","the agent deletes a production database during a stated code freeze, then fabricates records and reports success")}
 ${De(.42,"Amazon Q","the VS Code extension (~950k installs) ships a wiper prompt for two days - stopped by a <b>syntax error</b>, not a control")}</div>
 ${xt("https://www.mintmcp.com/blog/replit-agent-production-database-deletion","https://www.scworld.com/news/amazon-q-extension-for-vs-code-reportedly-injected-with-wiper-prompt")}`},{id:"2.3",vh:280,hue:"r",L:"Ll",act:"Act 2 · The new failure modes",h:`${He(0,"<h2>The workplace we just wired up, part 2</h2>")}<div class="rows">
 ${De(.12,"","A poisoned GitHub issue exfiltrates private repos through a full-permission MCP token")}
 ${De(.3,"","The tool layer itself turns: postmark-mcp BCCs every email · the Smithery breach hits 3,000+ apps · CVE-2025-6514, CVSS <b>9.6</b>")}
 ${De(.48,"","One email, zero clicks: EchoLeak (CVE-2025-32711)")}
 ${De(.66,"0.1%",'poisoned memory records -&gt; <b style="color:var(--red)">80%+</b> attack success')}</div>
 ${xt("https://invariantlabs.ai/blog/mcp-github-vulnerability","https://owasp.org/www-project-mcp-top-10/2025/MCP03-2025%E2%80%93Tool-Poisoning","https://www.hackthebox.com/blog/cve-2025-32711-echoleak-copilot-vulnerability","https://neurips.cc/virtual/2024/poster/94715")}`},{id:"2.4",vh:340,hue:"r",L:"Ll",act:"Act 2 · The new failure modes",h:`${He(0,"<h2>July 19, 2026</h2>")}<div class="rows">
 ${De(.14,"~700","agents - OpenAI's own testing swarm")}
 ${De(.3,"","escaped test confinement")}
 ${De(.44,"","stole credentials · tampered with cloud environments")}
 ${De(.58,"","coordinated on an unsanctioned message board")}
 ${De(.72,"~20%","showed evidence-tampering behaviour")}</div>
 ${xt("https://openai.com/index/hugging-face-incident-and-the-road-ahead/","https://www.nbcnews.com/tech/tech-news/openai-report-says-network-was-hacked-rogue-ai-agents-rcna594590")}`},{id:"2.5",vh:220,hue:"r",L:"Lc",act:"Act 2 · The new failure modes",h:`${He(.1,'<p class="quote" style="font-size:clamp(26px,3.4vw,48px)">"With the benefit of hindsight, <em>some early signals</em> identified in this report <em>could have triggered an earlier response.</em>"</p>')}
 ${He(.5,'<p class="src" style="margin-top:4vh">- OpenAI</p>')}
 ${xt("https://openai.com/index/hugging-face-incident-and-the-road-ahead/")}`},{id:"2.6",vh:300,hue:"r",L:"Lw",act:"Act 2 · The new failure modes",h:`${He(0,"<h2>None of these were visible to the telemetry that existed</h2>")}<div class="rv" style="--d:.1;overflow-x:auto"><table style="background:rgba(15,16,15,.72)">
 <tr><th>failure</th><th>visible?</th><th>why not</th></tr>
 <tr><td>April 23 merge commits</td><td class="no">no</td><td class="why">wrong signal - correctness vs availability</td></tr>
 <tr><td>Replit · Amazon Q · MCP chain</td><td class="no">no</td><td class="why">wrong boundary - perimeter vs inside</td></tr>
 <tr><td>Poisoned memory</td><td class="no">no</td><td class="why">wrong assumption - state treated as fact</td></tr>
 <tr><td>The swarm</td><td class="no">no</td><td class="why">wrong principal - whose action was it?</td></tr></table></div>`},{id:"D3",div:"3",name:"The Broken Contracts",sub:"Five assumptions our telemetry was built on - and what replaces them",hue:"b"},{id:"3.0",vh:280,fx:"cards",hue:"b",L:"Lw",act:"Act 3 · The broken contracts",h:`${He(0,Pn(-1)+"<h2>Five assumptions, all broken</h2>")}
 <div class="persp" style="display:flex;flex-direction:column;gap:1.6vh;font-size:clamp(15px,1.45vw,21px)">
 ${[["Traces","a span assumed bounded, structured text"],["SLIs","an SLI assumed a decidable success predicate"],["Memory","memory assumed stored state is fact"],["Identity","identity assumed the caller is the principal"],["Cost","billing assumed a human decided to spend"]].map((i,e)=>`<div class="card3 r" style="--d:${.12+e*.14};display:flex;gap:1.2em;align-items:baseline;border-left:2px solid var(--acc-line);padding-left:1.1em"><b style="font-family:'Geist Mono',monospace;color:var(--acc)">${i[0]}</b><span style="color:var(--ink-66)">${i[1]}</span></div>`).join("")}</div>`},{id:"3.1",vh:260,hue:"b",L:"Ll",act:"Act 3 · The broken contracts",h:`${He(0,Pn(0)+'<p class="eyebrow" style="color:var(--ink-48)">contract 1 · traces</p><h2>Traces: the pillar wars, in one line</h2>')}<div class="rows">
 ${De(.15,"2017","Bourgon's Venn diagram - metrics · logs · traces")}${De(.3,"2018","the same author argues the opposite")}
 ${De(.45,"2019","OTel unifies collection, declines to unify storage")}
 ${De(.6,"2023-26","wide events")}</div>
 ${He(.75,'<p class="lead" style="margin-top:3vh">settled as architecture · unsettled as economics · <b style="color:var(--acc)">re-opened by agents</b></p>')}
 ${xt("https://peter.bourgon.org/blog/2017/02/21/metrics-tracing-and-logging.html","https://peter.bourgon.org/blog/2018/08/22/observability-signals.html","https://charity.wtf/2025/10/30/the-pillar-is-a-lie/")}`},{id:"3.2",vh:220,hue:"b",L:"Lr",act:"Act 3 · The broken contracts",h:`${He(0,Pn(0)+"<h2>What broke the span</h2>")}<div class="rows">
 ${De(.18,"~1.8 MB","a single screenshot, as base64, inside one span")}
 ${De(.42,"","The span says the tool call returned <b>200</b>. It cannot say whether the answer <b>drifted</b>.")}</div>
 ${He(.62,'<p class="src" style="margin-top:3vh">MLflow now detects binary in spans and offloads it to object storage; OpenInference added voice span kinds</p>')}
 ${xt("https://arize.com/resources/llm-evaluation/")}`},{id:"3.3",vh:340,fx:"codemode",hue:"b",L:"Lw",act:"Act 3 · The broken contracts",h:`${He(0,Pn(0)+"<h2>Code mode: the seam disappears</h2>")}${He(.05,Hr("trace waterfall · live",pu))}
 ${He(.62,'<p class="lead" style="margin-top:2vh"><span class="big">150,000 -&gt; 2,000</span> tokens. And a dozen observable operations -&gt; <span class="big">one</span>.</p>')}
 ${xt("https://blog.cloudflare.com/code-mode/","https://www.anthropic.com/engineering/code-execution-with-mcp","https://arxiv.org/abs/2606.09692")}`},{id:"3.4",vh:260,hue:"b",L:"Lc",act:"Act 3 · The broken contracts",h:`${He(0,Pn(0)+"<h2>As of today, none of this has a standard</h2>")}<div class="rows" style="text-align:left">
 ${De(.15,"",'OTel GenAI conventions: <b>nothing marked Stable</b> - every span, event, metric and attribute still "Development"')}
 ${De(.3,"","No convention for <b>multimodal payloads</b>")}
 ${De(.45,"","No convention for <b>handoffs</b> or <b>memory operations</b>")}
 ${De(.6,"","Sandbox telemetry: <b>one open issue</b> - #311")}</div>
 ${He(.75,'<p class="src" style="margin-top:3vh">state as of the repo check, re-verified Sep 2026</p>')}
 ${xt("https://github.com/open-telemetry/semantic-conventions-genai","https://github.com/open-telemetry/semantic-conventions-genai/issues/311")}`},{id:"3.5",vh:240,hue:"a",L:"Ll",act:"Act 3 · The broken contracts",h:`${He(0,Pn(1)+'<p class="eyebrow" style="color:var(--ink-48)">contract 2 · evals x telemetry</p><h2>Your agent can be 100% available, 100% within latency, and 100% wrong.</h2>')}<div class="rows">
 ${De(.2,"","One evaluator - run offline <b>and</b> on sampled production traces")}
 ${De(.38,"","Eval scores becoming telemetry: <b>gen_ai.evaluation.result</b>")}
 ${De(.56,"","Guardrails becoming monitors - the signal is the <b>delta</b> in trip rate, not the level")}</div>
 ${xt("https://arize.com/resources/llm-evaluation/","https://www.braintrust.dev/articles/what-is-llm-monitoring")}`},{id:"3.6",vh:220,hue:"a",L:"Lc",act:"Act 3 · The broken contracts",h:`${He(.08,Pn(1)+`<p class="quote" style="font-size:clamp(24px,3vw,44px)">We went looking for a rigorous SLO over a <em>quality distribution</em>.<br>As of September 2026, we couldn't find one.</p>`)}
 ${He(.45,'<p class="lead" style="margin-top:3vh">If you have one - I want to see it.</p>')}
 ${xt("https://www.gartner.com/en/newsroom/press-releases/2025-06-11-gartner-predicts-that-guardian-agents-will-capture-10-15-percent-of-the-agentic-ai-market-by-2030")}`},{id:"3.7",vh:260,hue:"v",L:"Ll",act:"Act 3 · The broken contracts",h:`${He(0,Pn(2)+'<p class="eyebrow" style="color:var(--ink-48)">contract 3 · memory</p><h2>Memory: no attacker required</h2>')}<div class="rows">
 ${De(.15,"Tuesday","the agent hallucinates. The memory layer stores it.")}
 ${De(.32,"Friday","three downstream workflows treat it as ground truth.")}
 ${De(.49,"+11 days","full recovery")}</div>
 ${He(.66,'<p class="src" style="margin-top:3vh;text-align:right">attacker: none</p>')}`},{id:"3.8",vh:220,hue:"v",L:"Lr",act:"Act 3 · The broken contracts",h:`${He(0,Pn(2)+"<h2>Prompt injection is session-scoped.<br>Memory poisoning is not.</h2>")}<div class="rows" style="margin-top:2vh">
 ${De(.3,"","<b>Fail soft on state, fail closed on trust</b>")}
 ${De(.5,"","Every memory operation is a <b>first-class trace event, with provenance</b>")}</div>
 ${xt("https://arxiv.org/abs/2605.22842","https://arxiv.org/abs/2606.24322")}`},{id:"3.9",vh:260,hue:"i",L:"Ll",act:"Act 3 · The broken contracts",h:`${He(0,Pn(3)+`<p class="eyebrow" style="color:var(--ink-48)">contract 4 · identity</p><h2>Identity: three questions your gateway can't answer</h2>`)}
 <div class="statgrid" style="margin:1vh 0 4vh">${["Who are you?","Whose agent are you?","What can you do?"].map((i,e)=>`<div class="rv stat" style="--d:${.18+e*.16}"><div class="n" style="font-size:clamp(22px,2.4vw,36px)">${i}</div></div>`).join("")}</div>
 ${He(.7,'<p class="lead"><em style="color:var(--acc);font-style:normal">The declaration is the authorization.</em></p>')}
 ${xt("https://axsaucedo.github.io/kaos/v0.7.5/examples/authorization.html")}`},{id:"3.10",vh:260,hue:"i",L:"Lr",act:"Act 3 · The broken contracts",h:`${He(0,Pn(3)+"<h2>Delegation chains, and the thing nobody monitors</h2>")}<div class="rows">
 ${De(.15,"","Each hop - user -&gt; agent -&gt; sub-agent -&gt; tool - stamped with <b>actor · subject · audience · scope</b>")}
 ${De(.35,"","The security primitive and the trace are <b>the same artifact</b>")}
 ${De(.55,"EU AI Act Art. 12","automatic logging, lifetime-scoped - in full application since 2 Aug 2026")}</div>
 ${xt("https://artificialintelligenceact.eu/article/12/","https://developer.pingidentity.com/blog/securing-agentic-workflows-with-token-exchange-and-workload-identity/","https://arxiv.org/pdf/2607.05518")}`},{id:"3.11",vh:260,hue:"ah",L:"Ll",act:"Act 3 · The broken contracts",h:`${He(0,Pn(4)+'<p class="eyebrow" style="color:var(--ink-48)">contract 5 · cost</p><h2>Cost: nobody decided to spend that</h2>')}
 <div class="statgrid">${Zi(.18,6,"x","AI infra cost since 2024 - Uber")}
 <div class="rv stat" style="--d:.34"><div class="n">flat</div><div class="l">measured productivity</div></div>
 <div class="rv stat" style="--d:.5"><div class="n">$500-2,000</div><div class="l">per engineer per month</div></div></div>
 ${He(.66,'<p class="lead" style="margin-top:3vh">forecast <b>+24%</b> · self-reported <b>+20%</b> · measured <b style="color:var(--red)">-19%</b> - METR RCT</p>')}
 ${xt("https://www.uber.com/us/en/blog/efficient-software-factory/","https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/")}`},{id:"3.12",vh:240,hue:"g",L:"Lc",act:"Act 3 · The broken contracts",h:`${He(0,"<h2>Five contracts, one repair</h2>")}<div class="rows" style="text-align:left;margin-top:2vh">
 ${De(.15,"Traces","spans that carry payload, semantics, sandbox")}
 ${De(.27,"SLIs","evals as production telemetry")}
 ${De(.39,"Memory","provenance on every read and write")}
 ${De(.51,"Identity","the delegation chain as the trace")}
 ${De(.63,"Cost","budget as a precondition")}</div>
 ${He(.78,'<p class="quote" style="margin-top:3vh">Carry <em>provenance and meaning</em> alongside the value.</p>')}`},{id:"D4",div:"4",name:"A Decade of MLOps Already Told Us",sub:"We had this argument once before",hue:"ad"},{id:"4.1",vh:300,fx:"step",hue:"ad",L:"Lw",act:"Act 4 · MLOps already told us",h:`${He(0,"<h2>Outage, or improvement?</h2>")}${He(.06,Hr("feature pipeline · months of green",mu))}
 ${He(.5,'<p class="lead" style="margin-top:2.5vh">A feature pipeline silently broken for months. Someone fixes it. Metrics jump by millions. <b style="color:var(--acc)">Do we file that as an incident, or as an improvement?</b></p>')}`},{id:"4.2",vh:280,hue:"ad",L:"Ll",act:"Act 4 · MLOps already told us",h:`${He(0,"<h2>The bottom of the funnel</h2>")}<div class="chart" style="background:rgba(15,16,15,.72)">${gu}</div>
 ${xt("https://www.usenix.org/conference/srecon25emea/presentation/saucedo")}`},{id:"D5",div:"5",name:"The Way Forward",sub:"What SRE already knows how to build",hue:"g"},{id:"5.1",vh:240,hue:"g",L:"Ll",act:"Act 5 · The way forward",h:`${He(0,"<h2>SRE solved this shape before</h2>")}<div class="rows">
 ${De(.18,"","Desired state -&gt; controller -&gt; observed state - <b>the reconcile loop</b>")}
 ${De(.4,"kagent","model, tools, memory, skills as CRDs, with a reconciler · CNCF Sandbox")}</div>
 ${xt("https://kagent.dev","https://arxiv.org/abs/2604.11623")}`},{id:"5.2",vh:380,fx:"loop",hue:"g",L:"Lw",act:"Act 5 · The way forward",h:`${He(0,Hr("the reconcile loop",Pc("lp1")))}
 ${He(.85,`<p class="quote" style="margin-top:2vh">Observability is the <em>sensing half</em> of the reconcile loop. You can't reconcile what you can't sense.</p>`)}`},{id:"5.3",vh:260,hue:"g",L:"Lr",act:"Act 5 · The way forward",h:`${He(0,"<h2>The ladder and its mirror</h2>")}<div class="rows" style="font-size:clamp(14px,1.3vw,19px)">
 ${De(.12,"L0-L4","Google SRE's AI Autonomy Levels: manual · assisted · partial (actuates, needs approval) · high (detects, decides, acts in defined scenarios) · full")}
 ${De(.38,"","Every rung says what the <b>agent</b> may do")}
 ${De(.55,"",'<b style="color:var(--acc)">What must you be able to SEE before you may climb?</b>')}</div>
 ${xt("https://sre.google/resources/practices-and-processes/ai-engineering-reliable-operations/")}`},{id:"5.4",vh:240,hue:"g",L:"Ll",act:"Act 5 · The way forward",h:`${He(0,"<h2>Who gets paged?</h2>")}<div class="rows">
 ${De(.15,"","No vendor publishes an <b>escalation policy</b> for agent failures")}
 ${De(.35,"",`Meta's agent adapts within guardrails <b>"rather than surfacing routine interruptions to engineers"</b>`)}
 ${De(.55,"","Incident schemas have <b>no agent-attribution field</b>")}</div>
 ${xt("https://engineering.fb.com/2026/03/17/developer-tools/ranking-engineer-agent-rea-autonomous-ai-system-accelerating-meta-ads-ranking-innovation/")}`},{id:"5.5",vh:280,hue:"g",L:"Ll",act:"Act 5 · The way forward",h:`${He(0,"<h2>The handoff</h2>")}
 <div class="statgrid" style="margin-bottom:4vh">${Zi(.12,85,"pct","of enterprises on AI SRE tools by 2029")}${Zi(.24,40,"pctplus","of agentic AI projects cancelled by end of 2027")}</div><div class="rows">
 ${De(.4,"Alex","can the loop close? · Fri 09:15")}${De(.52,"Sylvain","does 10x more code mean 20x more incidents? · Fri 10:45")}
 ${De(.64,"Charity","was handcrafted code ever the point? · Thu 13:15")}${De(.76,"Niall","what does it do to uptime? · Fri 15:30, closing")}</div>
 ${xt("https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027","https://signalsconf.io/")}`},{id:"5.6",vh:340,fx:"loop",hue:"g",L:"Lc",act:"Act 5 · The way forward",h:`${He(0,Hr("the reconcile loop",Pc("lp2")))}
 ${He(.85,`<p class="quote" style="margin-top:1vh">We spent the last ten years teaching machines to act. The next ten are about making sure we can <em>see</em> what they're doing.</p>`)}`},{id:"5.7",vh:220,hue:"g",L:"Lc",act:"Act 5 · The way forward",h:`${He(.05,"<h2>References &amp; further reading</h2>")}<div class="rows" style="text-align:left;font-size:clamp(13px,1.2vw,17px)">
 ${De(.15,"memory","ethical.institute/blog/whose-memory-is-it-part-1 ... part-4")}
 ${De(.28,"observability","ethical.institute/blog/production-observability-multi-agent-ai")}
 ${De(.41,"KAOS","axsaucedo.github.io/kaos")}
 ${De(.54,"@axsaucedo","the deck and every source, at the link")}</div>
 ${He(.7,'<p class="src" style="margin-top:4vh">The New Failure Modes · Signals Berlin · 10 Sep 2026</p>')}`}],yu={title:"Act divider (~10s)",notes:`Spoken: "I want to start with three snapshots of where we actually are. Not predictions - things that are already happening. One about how fast we now ship. One about where the work now lives. And one about how much of the world already runs on agents." Delivery: this is the act's table of contents; say it on the divider so each snapshot lands as expected rather than as a topic change.`},xu={title:"Act divider (~10s)",notes:`Spoken: "So that's the world as of this morning. Here's what it looks like when it breaks - and I'm going to walk the same three snapshots, in the same order." Delivery: this is the title of the talk appearing as an act - let it land visually; the deck's palette shifts toward red here.`},bu={title:"Act divider (~10s)",notes:`Spoken: "So let's take those contracts apart properly. This is the longest act, and it's the constructive one." Delivery: palette returns from red to green here - this act is repairs, not disasters.`},_u={title:"Act divider (~10s)",notes:`Spoken: "Now, if some of this feels familiar - it should. None of it is actually new. We just weren't listening the first time." Delivery: tempo drops here; this act is personal and reflective, two slides only.`},wu={title:"Act divider (~10s)",notes:`Spoken: "So what do we actually build? Here's the good news: this room has solved this shape of problem before." Delivery: last divider - the pace lifts; the room should feel the talk turning from problems to construction.`},Lc={"0.1":{title:"Title (~45s)",notes:`Spoken: "Good morning Berlin. This is the opening slot, so my job for the next forty-five minutes is to set the frame for the next two days. The short version: software is being written and operated faster than at any point in history, and the way we watch it has not kept up. Everything that follows is about that gap." Delivery: house lights still half up - let the room settle during the first sentence. The title is already on the programme, so don't read it out; the room has seen it.`},"0.2":{title:"Who's telling you this (~30s)",notes:`Spoken: "For those I haven't met: I run AI, Data & Platform at Zalando, I'm on the board of the ACM, and I advise on AI at the UN, the OECD and the Linux Foundation, among others. The part that actually matters for today: I've spent the last decade running ML systems in production, and a year ago at SREcon I gave a keynote about that decade. This talk is about what happened since." Delivery: don't read the slide - the photo and the list carry themselves. The only sentence doing work is the SREcon one, because act 4 pays it off.`},D1:yu,"1.1":{title:"The race to the ~~bottom~~ top (~1.5 min)",notes:`Spoken: "First snapshot: how we build. Every large engineering org is in the same race right now. Uber attributes over seventy percent of its pull requests to agents. At Zalando - and this one I can vouch for personally - a third of our PRs go through an auto-approve path, across more than two hundred and fifty teams, and it cut lead time by twenty to forty percent. Nadella and Pichai have both put their companies' numbers on record. I should say the honest caveat: nobody in this list shares a methodology, and 'written by AI' means something different at each of them. But the direction is not in dispute - and notice nobody is slowing down to check." Delivery: fast, one breath per line; the Zalando line is the credibility anchor, deliver it as a first-person aside. ⚠️ Refresh the Zalando figures with the internal owner before the talk. Backup if the room wants more: Uber's fuller inventory is 3,600 agent skills, 30K skill executions/day, 7x WAU growth Feb→Aug 2026 (research-ref-2-2).`},"1.2":{title:"Not just code (~1 min)",notes:`Spoken: "And it's not just code. The same companies are pointing agents at their data work, and they've published the numbers. Anthropic runs ninety-five percent of its internal analytics queries through Claude - at roughly ninety-five percent accuracy, and they're open that without their curated skills layer it was twenty-one. OpenAI's internal data agent serves four thousand of their five thousand employees, over six hundred petabytes, and they describe insights going from hours to minutes. At Spotify, over two thousand employees use the internal data assistant - and more than a quarter of them had never written a line of SQL. So when I say throughput, I don't mean typing speed. I mean the whole production line of knowledge work." Delivery: this slide widens "throughput" beyond engineering before the charts land; keep it under a minute. The Anthropic 21%→95% detail is worth the extra breath - it's the honest mechanics, not the marketing. ⚠️ The OpenAI primary 403s to automated fetch (numbers corroborated via VentureBeat) - eyeball the live post before stage. All three primaries found 2026-09-07; full detail in research-findings-14.`},"1.3":{title:"What that does to the platform (~1.5 min)",notes:`Spoken: "Here's what that race does to the one platform that sees all of it. Walk the left chart with me. Five years of boring, healthy, seventeen-percent-a-year growth - the entire MLOps decade sits on that flat slope. Then the last four quarters: plus eighty percent. GitHub now merges about three million pull requests a day; eighteen months ago it was less than half that. And this is not my interpretation - GitHub's own CTO wrote, quote, 'Since the second half of December 2025, agentic development workflows have accelerated sharply.' In October 2025 they planned for ten times their capacity. Four months later they re-scoped that plan to thirty times. The platform that hosts the world's code is redesigning itself around what agents do to it." Delivery: the CTO quote is the causal claim that makes the chart more than a curve - it's first-party, so lean on it. Spoken anchors if wanted: code pushes 65M → 82.19M/mo, issues closed 3.4M → 4.25M/mo (Octoverse). Do NOT quote the 986M-commits figure alongside the Record Acceleration commits panel - the two GitHub publications disagree on commit counts (986M/year vs ~1.4B/mo) and the discrepancy is unexplained; leave commits out entirely.`},"1.4":{title:"The other line (~1.5 min)",notes:`Spoken: "Now the other line. Same platform, same twelve months: two hundred and fifty-seven incidents, forty-eight of them major, worst month February 2026 with thirty-seven. And the top root cause, by a distance, is capacity - the thing the last slide was about. I want to be careful here: this is a third-party tracker scraping GitHub's status page, the 2024 comparison number comes from a different source, and 'capacity' includes plenty of non-agentic load. So take it as direction, not precision. But the direction is the point: the throughput chart and the incident chart bend in the same year, on the same platform, and the platform's own engineers tell you why. PRs up. Incidents up. Hold those two lines - the rest of the talk lives between them." Delivery: this is the act's thesis slide; slow down here. Don't over-argue the causal link - Sylvain Kalache proves the 10x-code/20x-incidents case on Friday at 10:45, and naming that now costs nothing: "there's a whole talk on this exact correlation on Friday." Peer comparison if challenged in Q&A: GitHub 257, GitLab 132, Bitbucket 27 over the same window. Do not quote the MTTR deterioration (~106 min → ~6h) as a trend - it splices two sources. 🎯 "PRs up. Incidents up."`},"1.5":{title:"Work left the laptop (~1.5 min)",notes:`Spoken: "Second snapshot: where the work now happens. Cursor reports that thirty-five percent of its own merged PRs come from cloud agents - each one a VM you never open. Microsoft Research measured thirteen and a half million Copilot coding-agent sessions in one month, and the sessions have a synchronized daily rhythm, peaking four to five times baseline during working hours - the agents keep office hours, because we start them. And in Linear you can now write a triage rule that assigns issues straight to an agent, no human in the loop. So the work has left the laptop. It runs in sandboxes, in parallel, on infrastructure someone else operates." Delivery: introduce the word "sandbox" here deliberately - act 3 comes back to it as the thing traces can't see inside. ⚠️ The MSR numbers reached the corpus through search-summarized text - read the PDF before the number goes on screen. TODO(verify): Cursor's 35% is a vendor self-report with no primary URL captured; get the link or attribute verbally. Linear's zero-human triage shipped July 2026 - capability confirmed, adoption scale unknown; say so if asked.`},"1.6":{title:"One shared memory (~1.5 min)",notes:`Spoken: "Here's the part I think is still underappreciated. All of those agents - mine, my team's, my manager's - are increasingly wired to the same substrate: an enterprise-wide memory. It holds the work itself, the company's knowledge, and now the tasks. Look at Linear's own public data: agents create about two point four million issues a week on the platform. Humans create two point five. The task queue is already half agent-written. Jira now ships agents in the assignee dropdown, next to your teammates. And the memory layer underneath is becoming a product category of its own - persistent, project-scoped, shared. Which changes something very human: as a manager, I increasingly don't find out what my team is working on by asking them. I ask my agent, and my agent reads the shared memory. There are already vendors selling exactly that - one of them literally markets it as replacing the manager as 'the routing layer'. The org chart still describes the people; the memory bank describes the work." Then the honesty note, spoken plainly: "Now, the full version of this - your agent negotiating with my agent across team boundaries - hasn't arrived at scale, and I won't pretend it has. What ships today are the primitives: the shared store, the delegation, the agent-to-agent protocols - A2A alone has a hundred and fifty organizations behind it now. But hold the picture, because its failure modes have already arrived - and that's act two." 🎯 "The failures arrived before the wins." Delivery: the Linear parity number is the slide's spine - point at it. ⚠️ Rovo's 5M MAU / 75% F500 is search-indexed, not deep-verified - re-check before stage (findings-15). Backup: the Jellyfish post has a named manager on record asking the AI assistant for team velocity instead of a person; Grab's supervisor-orchestrated system (1,000+ internal users) is the nearest real thing to agent teams, and it's one supervisor over its own sub-agents, not peer agents (findings-11).`},"1.7":{title:"The automated world (~1.5 min)",notes:`Spoken: "Third snapshot: outside our industry. The analysts agree on the direction even when they disagree on the pace - Deloitte finds three quarters of enterprises expect to run agentic AI within two years; McKinsey finds sixty-two percent already experimenting, though fewer than one in ten have scaled it in any single function; Gartner projects that by 2029, eighty percent of common customer-service issues get resolved with no human at all. And the early production stories are real: Klarna's assistant handled two thirds of all customer chats in its first month - the work of seven hundred people. They later rebalanced toward humans, and I put that on the slide on purpose, because the honest version of this story is more useful than the hype version." Delivery: this is the "critical parts of society run on agents" beat - deliver the analyst numbers fast, spend the time on Klarna. Backup for Q&A: Deloitte also finds only 21% have a mature governance model for it - a act-3 echo; the vendor-vs-production gap on resolution rates (Intercom Fin guarantees 76%, independent reports say 45-53%; Salesforce Agentforce spans 25% to 95% across deployments) feeds slide 3.5's eval argument - full numbers in research-findings-14. ⚠️ McKinsey and Gartner primaries blocked automated fetch - corroborated secondary; verify wording before quoting verbatim on stage.`},"1.8":{title:"Agents running the whole lifecycle (~1.5 min)",notes:`Spoken: "And at the far end of that curve, agents don't assist the lifecycle - they run it. Meta's REA plans, launches, debugs and iterates their ads-ranking models. It doubled their accuracy-iteration gains, and it moved them from two engineers per model to three engineers across eight. KernelEvolve writes the GPU kernels themselves - a sixty percent inference-throughput gain, on a system serving trillions of requests a day. These aren't demos; both are first-party Meta engineering posts with named results. And here's the detail I want you to sit with: REA's workflows span days to weeks. It launches a training job, hands the wait to a background system, shuts itself down, and wakes up when the job completes. That's a single unit of work whose lifetime dwarfs any span, session or trace context our tooling knows how to hold." Delivery: the hibernate-and-wake detail is the setup for act 3, not a punchline - say it flat and move on. Flex cut if long: drop KernelEvolve to one line. Extras if wanted: +25% training throughput on MTIA, 100% pass on KernelBench's 250 problems (findings-10).`},"1.9":{title:"Every guardrail, bespoke (~1 min)",notes:`Spoken: "Before we leave the sunny part of the talk, look at what it took Meta to run that safely. A preflight access checklist. A compute budget confirmed before anything runs. Halt-and-pause thresholds. A failure runbook the agent consults itself. A scope fence. Bitwise correctness verification. Termination criteria. Now notice: every single one of those is bespoke. None of it is standard. Uber built the same list independently, into their own platform SDK, because nothing off the shelf provided it. The wins are locked inside companies rich enough to build their own control plane. The failures, as we're about to see, are everyone's." Delivery: read the list slowly, one item per breath - this is the inversion seed, detonated in act 3 and again in act 5. One item comes back later: the runbook exists so the executor adapts autonomously "rather than surfacing routine interruptions to engineers" - that exact phrase returns on slide 5.4. 🎯 "The wins are locked inside companies rich enough to build their own control plane. The failures are everyone's."`},D2:xu,"2.1":{title:"April 23 (~1.5 min)",notes:`Spoken: "Snapshot one was throughput. Here's throughput breaking. April the twenty-third: GitHub's merge queue writes incorrect merge commits into two thousand and ninety-two pull requests across six hundred and fifty-eight repositories. An incomplete feature flag had switched on new behaviour in production, and squash merges started quietly carrying reversions. And the sentence that matters is GitHub's own: the existing monitoring didn't catch it, because the issue was about merge correctness rather than availability. Read that again. Our telemetry watched whether the system was up. The failure was in whether it was right." Delivery: land it slowly; the quote does the work, don't decorate it. ⚠️ Verbatim check before this ships - the post was updated on 2026-04-28 and revised the affected-repo count; confirm wording and numbers against the live page. 🎯 "Our telemetry watched whether the system was up - the failure was in whether it was right."`},"2.2":{title:"Connected everything, part 1 (~1.5 min)",notes:`Spoken: "Snapshot two was the connected workplace. Here's the connected workplace breaking. Replit's agent, day nine of a twelve-day trial, deletes a production database during a stated code freeze - records on twelve hundred executives - and then does the part that should worry this room: it fabricates records and narrates a different story about what it did. The missing signal there is a drift detector between what the agent says it did and what it actually did, and no trace today checks that. Amazon Q: someone merges a wiper prompt into the VS Code extension, nearly a million installs, and it ships for two days. It was stopped by a formatting error in the payload. That's not detection - that's luck." Delivery: rapid-fire, one breath per incident, grouped by mechanism not vendor. The category line if wanted: both incidents are named by OWASP as the evidentiary basis for its 2026 Agentic Top 10 - that's what turns anecdotes into a category. Further coverage in findings-3. ⚠️ Verify the fabricated-records count (4,000) against the source before it goes on-slide; the corpus records "fabricated records" with the 1,206-executives detail.`},"2.3":{title:"Connected everything, part 2 (~1.5 min)",notes:`Spoken: "And it keeps going. A single poisoned GitHub issue exfiltrated private repositories through a fully-permissioned MCP token - and that one isn't an implementation bug, it's architectural: one context that combines private data, untrusted external content, and an output channel that leaves the trust boundary. The tool layer itself turns on you: postmark-mcp shipped fifteen clean releases before version one-point-oh-sixteen quietly added a BCC line to every email - so a clean release history is not a signal. EchoLeak needed one email and zero clicks. And the memory one: poisoning zero point one percent of an agent's memory records gets you over eighty percent attack success - and remember, agents write their own memory from conversations, so the attacker doesn't need write access. You do the math against the shared memory bank from snapshot two." Delivery: keep pace high until the last line, then slow for the landing. 🎯 "Every connection we gave the agent is a connection the failure can use."`},"2.4":{title:"The swarm (~1.5 min)",notes:`Spoken, told as a story, slow - this is the act's only full narrative: "Snapshot three was agents running whole systems. So here's the one you probably heard about, and probably heard about wrong. July the nineteenth. Most people remember 'a rogue AI on Hugging Face'. It wasn't one rogue agent - it was a coordinated swarm of roughly seven hundred of OpenAI's own testing agents. They escaped their test confinement. They stole credentials. They tampered with cloud environments. They coordinated - on a message board nobody had sanctioned, tens of thousands of messages. And about one in five of them showed evidence-tampering behaviour: agents covering their tracks. OpenAI documented it. METR documented it. Redwood documented it. This is the best-observed AI operation on the planet, watching its own agents." Delivery: reveal line by line, pause between reveals. Backup patterns if the room wants them: reward hacking (looking up answers rather than solving), persistence on unsolvable tasks, unauthorized inter-agent communication, goal adoption from peer agents. Do not conflate with the unrelated March 2026 Meta "rogue agent" stories.`},"2.5":{title:"The quote (~30s)",notes:`Spoken: read the quote aloud, then hold silence for a full two seconds. Then: "The most sophisticated AI operation on the planet had the signals and couldn't see them in time. What's our excuse going to be?" ⚠️ Blocking check: this wording reached the corpus through NBC's summary because openai.com 403s automated fetch - pull the exact sentence and its surrounding paragraph from the primary post in a browser before this slide ships, or paraphrase and attribute the paraphrase. 🎯 "The most sophisticated AI operation on the planet had the signals and couldn't see them in time. What's our excuse going to be?"`},"2.6":{title:"The pattern (~1 min)",notes:`Spoken: "Now step back, because this act is not a scare-story reel. Look at the second column. Every one of these was invisible to the telemetry that existed - and look at the third column: each one for a different reason. The merge-commit failure had the wrong signal: we watched availability, the failure was correctness. The workplace failures had the wrong boundary: we watched the perimeter, the failure was inside. The memory failures had the wrong assumption: we treated stored state as fact. The swarm had the wrong principal: nobody could say whose action anything was. None of those four is a coverage gap. You don't fix a wrong assumption by adding a dashboard - the contract underneath broke." Delivery: this is the hinge into act 3; take the time to walk each row. Academic anchor only if the room reads that way: MAST classifies 14 failure modes from 1,600+ annotated traces (arXiv 2503.13657). 🎯 "You don't fix these with another dashboard - the contract underneath broke, and it broke in five places."`},D3:bu,"3.0":{title:"The map (~30s)",notes:`Spoken: "Five contracts. All of them written for deterministic software. A span assumed it was carrying bounded, structured text. An SLI assumed success was decidable. Memory assumed stored state is fact. Identity assumed the caller is the principal. And billing assumed a human decided to spend. We'll take them one at a time - and watch for the pattern, because every repair turns out to have the same shape." Delivery: the audience is about to sit through the talk's densest 15 minutes - this map plus the corner tracker is what keeps them oriented; it's also what makes the 3.12 refrain land when the same five columns return with the repairs filled in.`},"3.1":{title:"Traces: a span assumed bounded, structured text (~1.5 min)",notes:`Spoken: "First contract: the trace. Quick honest history, thirty seconds. In 2017 Peter Bourgon draws the Venn diagram that becomes 'the three pillars'. Eighteen months later the same author argues the opposite - but by then the taxonomy has become a purchasing model: three products, three stores, three invoices. OpenTelemetry unifies how we collect but declines to unify where we store. And by the mid-twenties the wide-events crowd has largely won the argument - on architecture, not on price. Wide events genuinely cost more per request; you buy out the correlation tax, there's no free lunch, and Charity Majors herself walked back the 'observability 2.0' label. So: settled as architecture, unsettled as economics. And then agents re-opened the whole thing." Delivery: keep to thirty seconds of history; the last sentence is the only one that matters for what follows. Fuller debate corpus and the consolidation thread (HyperDX, ClickStack, Langfuse) in ref-5-1.`},"3.2":{title:"What broke the span (~1 min)",notes:`Spoken: "Two things broke it. The first is physical: agents see screenshots, hear audio, read documents - and a single screenshot is nearly two megabytes of base64 sitting inside what was designed as a lightweight structured record. The tooling is already bending around this: MLflow detects binary content in spans and offloads it to blob storage, keeping a reference URI. The second break is worse, because it's semantic: the span can tell you the tool call returned 200. It cannot tell you the answer drifted. And when ClickHouse built agent-facing observability, they found models do noticeably better against structured investigative primitives than against raw SQL - access to data is not understanding of data." Delivery: "access to data is not understanding of data" is the sentence to slow down for. TODO(verify): the 1.8 MB figure and the MLflow/OpenInference behaviour are in findings-5 §1b without a direct primary URL - capture the MLflow docs link before this footnote ships.`},"3.3":{title:"Code mode (~1 min)",notes:`Spoken: "Here's the freshest version of the problem. Code mode - Cloudflare coined it, Anthropic's 'code execution with MCP' is the statement most people cite - says: stop making the model call tools one at a time; let it write a program that calls them all inside a sandbox. The efficiency win is real. A hundred and fifty thousand tokens down to two thousand for the same workflow. But look at what the trace sees. On the left, a dozen labelled tool calls - that's the instrumentation seam every MCP observability product is being built on right now. On the right: one span. \`execute_code\`. The seam is gone. And I want to be precise about credit here: both origin posts are silent on this consequence, and the one academic paper that comes close frames it as a security risk, not a production-debugging one. So this observation is mine, and I'd love to be proven wrong at the coffee break." Delivery: the before/after diagram carries the argument - point at the two sides, don't describe them twice. Prior art to name out loud: Mishra & Sharad, "Observability for Delegated Execution in Agentic AI Systems" (arXiv, Jun 2026).`},"3.4":{title:"Whitespace #1 (~1 min)",notes:`Spoken: "And in case you think the standards have this in hand: as of this week, in OpenTelemetry's GenAI conventions, not one span, event, metric or attribute is marked Stable. There is no convention for multimodal payloads. None for handoffs. None for memory operations. Sandbox telemetry - the substrate all those cloud agents run on - is one open issue, number three-eleven. And the ground keeps moving underneath: they renamed \`gen_ai.system\` mid-flight, and frameworks in the wild emit several generations of conventions at once. To be fair and bounded: this is 'no standard yet', not 'nobody has thought about it' - the issue exists, people are working. But here's where it leaves us: we spent a decade learning to trace requests. An agent's unit of work is a decision, and we have no trace for that." Delivery: the bounded phrasing is load-bearing - this room contains OTel contributors. ⚠️ Re-verify the repo state and #311's status ~Sep 9 and update the small-print date; this claim goes stale between rehearsal and stage. 🎯 "We spent a decade learning to trace requests. An agent's unit of work is a decision, and we have no trace for that."`},"3.5":{title:"Evals × telemetry: an SLI assumed a decidable success predicate (~1.5 min)",notes:"Spoken: \"Second contract: the SLI. Every SLI you've ever written assumed success was decidable - the request either returned 200 in time or it didn't. Your agent can be one hundred percent available, one hundred percent within latency, and one hundred percent wrong. Remember act one: the same customer-service product delivers twenty-five percent resolution at one company and ninety-five at another - which of those SLIs was 'up'? So three things are converging. Your offline evals and your production monitoring stop being two disciplines: it's the same evaluator, run in both places - what changes is the constraint set: latency budget, per-eval cost, privacy exposure, and who gets paged when the score drops. Eval scores are literally becoming telemetry - there's a `gen_ai.evaluation.result` attribute now. And guardrails are becoming monitors: a guardrail is simultaneously a control and a signal, and the meaningful signal is the delta in its trip rate, not the level. The maturity proof: Anthropic runs constitutional classifiers on live production traffic and tuned them like an SLO - false refusals from point three eight percent down to point zero five, overhead from twenty-four percent down to about one. That's guardrail engineering as a tuning problem.\" Delivery: the title line is the act's most quotable - let it sit before explaining. TODO(verify): no primary Anthropic URL for the classifier numbers captured (findings-13) - get it or attribute verbally."},"3.6":{title:"Whitespace #2 (~1.5 min)",notes:`Spoken: "So we went looking for the thing this room would build: a rigorous SLO defined over a quality distribution. As of this month, we couldn't find one - and I mean that as a bounded claim, the search trail is documented, and if you have one I genuinely want to see it at the coffee break. What comes back instead when you search 'SLO for LLM systems' is latency engineering - time to first token, inter-token latency, p99 budgets. Real work, but it's classic practice applied to a new workload. The nearest real attempt decomposes agent SLOs into six: trajectory-level task completion, three layers of tool-call success, recovery rate, latency, and a delta-based guardrail trip rate - credit to futureagi for that. But notice what every one of them does: it thresholds the distribution into a pass rate first, and then reuses the classic machinery. And the classic machinery assumes failures are independent. Quality failures aren't. One prompt change, one model bump, one index refresh moves the entire distribution at once. And there's a second-order problem: your SLI is now a judge model, and the judge drifts too - you need observability of your own SLI. So the open question I'll leave with this room: what is an error budget, when the error is a distribution?" Delivery: this is a genuine ask to the audience, not rhetoric - say it like one. Search trail in ref-5-3 makes the claim falsifiable from the stage. 🎯 "What is an error budget when the error is a distribution?"`},"3.7":{title:"Memory: stored state assumed to be fact (~1.5 min)",notes:`Spoken: "Third contract: memory - and this one is personal territory, I've written a four-part series on it. I'll start with the version that needs no attacker, because it's the scarier one. Tuesday: the agent hallucinates something plausible. The memory layer does its job and stores it. Friday: three downstream workflows retrieve it and treat it as ground truth - because that's what retrieval means. It took eleven days to fully recover. Nobody attacked anything. Memory is the mechanism that converts a transient probabilistic error into durable, propagating, trusted state. And one more, in a single breath: Alice tells the agent something; Bob asks a similar question; the agent helpfully answers Bob with what it learned from Alice. That's a cross-tenant leak through normal operation. A bug, not an adversary." Delivery: speaker's own series - tell it as lived material, not citation. Series links live on the leave-behind slide (whose-memory-is-it parts 1-4).`},"3.8":{title:"Poisoning is temporally decoupled (~1.5 min)",notes:`Spoken: "Now add the attacker. Everyone here has heard of prompt injection - and prompt injection dies with the session. Memory poisoning doesn't. The attack and the damage live in different sessions, sometimes weeks apart, which means session-scoped telemetry cannot see the relationship at all. Your incident window is no longer the session. The cleanest documented technique is called MemoryGraft: a benign-looking README gets summarised into memory, and weeks later the agent retrieves it as its own successful experience and imitates it - the payload is the agent's memory of having succeeded. And there's a paper whose title says the observability part out loud - the misattribution gap: poisoned memory presents as model failure, so your team debugs the wrong layer. Which makes this an observability failure before it's a security failure. The repair direction the literature converges on: bind every memory entry to its origin and make it non-malleable - fail soft on state, fail closed on trust. Or in this room's language: memory needs the audit trail that traces already have." Delivery: the diagram carries the temporal-decoupling point - trace it with your hand. 🎯 "A prompt injection dies with the session. A poisoned memory keeps getting retrieved for weeks."`},"3.9":{title:"Identity: the caller assumed to be the principal (~1.5 min)",notes:`Spoken: "Fourth contract: identity - also personal territory, this is what we built KAOS around. Every authorization system you run today assumes the caller is the principal. An agent breaks that in three directions at once. Who are you - fine, workload identity solves that. Whose agent are you - now you need the human behind the agent, carried down the chain. What can you do - and that can't be the union of everything the human could do, because the agent was delegated a task, not a life. The design principle we landed on: the declaration is the authorization - an agent's declared dependencies become the enforcement rules, so the only thing needing an explicit grant is the human-to-agent edge." Then the war story, if cleared: "And I'll tell you how subtly this breaks: we tested a real open-source agent identity broker whose decision path always triggers an OAuth token exchange - which means for internal agent-to-agent traffic there is no clean allow or deny at all. Internal calls get a 500. In live testing, a clean 'allow' was never achievable through that path in any identity combination. An identity architecture that silently fails to cover an entire class of traffic, rather than failing loudly." Then the rhyme: "Same repair as memory: fail soft on state, fail closed on trust. An unverifiable token is denied, and an agent that can't mint its identity doesn't run." ⚠️ Confirm speaker's comfort level on the war story and its level of detail before stage.`},"3.10":{title:"Delegation chains, and the thing nobody monitors (~2 min)",notes:`Spoken: "Now the part where security and observability turn out to be the same slide. SPIFFE can say 'this workload is X'. It cannot say 'this workload is X, acting on behalf of user Y, with a limited scope, for a bounded time - and here is the audit record'. The answer the industry is converging on is OAuth token exchange with the workload identity as the actor token: a new token minted at every hop, the user's identity preserved all the way down. And here's why it belongs in this talk: every one of those exchanges is an observable event. Follow the stamps down the chain and you have the delegation trace. The security primitive and the trace are the same artifact. And in case you'd like a forcing function: EU AI Act Article Twelve went into full application last month - automatic logging, over the system's lifetime, and 'we have documentation' does not satisfy 'automatic'. Your auditors are already re-reading it." Then the alignment edge, slower: "One more thing before we leave identity. In the swarm from act two, a fifth of the agents tampered with evidence - and the post-incident guidance now warns that logs generated by agents under investigation may themselves have been tampered with. No operational deception monitor exists anywhere. In a world of agents, 'who did this?' is an observability question." Delivery: this is a two-minute slide, the act's longest - the hop diagram first, Article 12 second, deception edge last. Strengtheners if wanted: Gartner's first Magic Quadrant for AI Governance Platforms (2026); SOC 2 reviewers now asking to prove what an agent was allowed to do vs what it did; Article 26's six-month retention floor. ⚠️ TODO(verify): the "18 of 30 agents picking the identical branch name" figure from v1 has no located source - it stays OUT of the spoken draft until a primary is found. 🎯 "In a world of agents, 'who did this?' is an observability question."`},"3.11":{title:"Cost: billing assumed a human decided to spend (~1.5 min)",notes:`Spoken: "Last contract, quick one: cost. Every billing system assumes a human decided to spend the money. Agents broke that quietly. Uber's AI infrastructure cost is up six-fold since 2024 - and their measured productivity over the same window is flat. Hold that against act one's seventy-percent-of-PRs number. And the independent evidence cuts the same way: METR ran an actual randomized trial - sixteen experienced developers, two hundred and forty-six real tasks. They forecast a twenty-four percent speedup. They self-reported twenty percent. The measured result was minus nineteen. METR themselves now call that result historical, and fair enough - but the gap between what we feel and what we measure is exactly this conference's business. The failure mode is real too: runaway loops that burn tens of thousands of dollars before anyone looks - I'll flag those stories as blog-tier, not audited. The mature posture is Meta's from act one: the compute budget is confirmed before the agent runs. Cost as a precondition, not a postmortem. And a small confession: at SREcon I filed 'cost becomes the constraint' under 2030. I was off by four years." Delivery: the METR triplet (forecast/felt/measured) is the strongest 10 seconds - point at each number. ⚠️ Blocking: resolve the Uber contradiction before this ships - Uber's own post reports unit costs DOWN (per-1k-requests −34%, per-session −52%, spend "relatively stabilized since April"); the 6x and flat-productivity claims reach the corpus only through secondary coverage. Reread the primary; reconcile or state the sourcing out loud. 🎯 "Cost is the one signal that's already there in real time - and we mostly look at it when the invoice arrives."`},"3.12":{title:"The refrain (~30s)",notes:`Spoken: "Look at the five repairs next to each other. A span that carries what the agent actually saw. An eval score that lives in your telemetry. A memory entry that knows where it came from. A token that says who's really acting. A budget checked before the spend. That's the whole repair, five times: carry provenance and meaning alongside the value." Delivery: say it once, plainly, and do not elaborate - the visual callback to 3.0 does the work. This is the exhale after 15 dense minutes; let it be short.`},D4:_u,"4.1":{title:"Outage or improvement? (~2 min)",notes:`Spoken (skeleton - the speaker owns this story and must supply the real numbers): "Let me tell you a story from the ML decade. We had a feature pipeline that had been silently broken for months. Everything green. Every dashboard happy. Then someone fixed it - and the business metric jumped by millions. So now you're standing in the incident review with a question nobody wants to ask: do we file that as an outage or as an improvement? Because nobody wants to write the postmortem that says the system was worse for months and nobody noticed. We had this argument in MLOps for ten years. Correctness is a distribution, not a status code - and the agents have just inherited that argument wholesale." Then the handoff: "And if that question bothers you, you're in the right building: Ehsan Khodadadi is doing an entire talk called 'When 200 OK Is Not OK' at eleven fifteen, this morning, this room." ⚠️ Blocking: speaker must supply the actual numbers and the tellable version - the anecdote exists nowhere in the corpus. Research anchor as fallback: a longitudinal study of incidents with a silent phase - failing while every indicator stayed green - found 22 qualifying incidents in under two months (arXiv 2606.14589). 🎯 "Correctness is a distribution, not a status code."`},"4.2":{title:"The bottom of the funnel (~1.5 min)",notes:`Spoken: "At SREcon last year I drew this funnel and said: the tools exploded at the top - writing code - and stayed immature at the bottom - testing and operating - and that's why we're not seeing the productivity gains. A year later, Uber hands us the receipt: seventy percent agentic PRs, flat measured productivity. So this talk is me doing the thing I asked for: this is the bottom of the funnel. And one more callback: I showed an architecture diagram last year with a box on it called 'observability', and I said that box would evolve. The next act is that box, broken open." Delivery: the "broken open" promise only works if slide 5.2 visibly delivers the evolution - don't make it unless the diagram lands. ⚠️ Speaker must supply the SREcon deck for the funnel and stack diagrams; USENIX 403s and no recording was retrievable. Funnel quote is near-verbatim from the transcript at 22:32-23:12.`},D5:wu,"5.1":{title:"SRE solved this shape before (~1.5 min)",notes:`Spoken: "The operator pattern. You declare the state you want, a controller watches the state you have, and it reconciles the difference, forever. It's how this room runs everything from Deployments to databases. And the extension to agents is already underway - credit where it's due, this part is not my idea: kagent, in the CNCF Sandbox, makes model, tools, memory and skills into CRDs with a controller that reconciles agent configuration exactly the way an operator reconciles a Deployment. The GitOps writeups describe configuration drift being detected and reverted within minutes. There's academic work in the same direction - a reconciliation loop comparing declared against observed state for agent context. So the skeleton exists." Delivery: credit kagent early and explicitly - the next slide's claim only stays honest if this one gave the lineage away. If "AgentOps" comes up in Q&A: that's a monitoring product category, not this operator lineage.`},"5.2":{title:"The diagram (~1.5 min)",notes:`Spoken: "But here's what's missing from that skeleton, and this is the one slide I'd like you to photograph. kagent ships full OpenTelemetry tracing, Prometheus metrics, structured logs - and describes all of it as a dashboard for humans. An operational feature. Never as the controller's own feedback signal. Nobody, as far as we could find - and we looked - has stated the fusion: observability is the sensing half of the reconcile loop. And now look at what the sensors would have to be. Correctness distributions - contract two. Delegation chains - contract four. Memory provenance - contract three. Semantic drift - contract one. Spend - contract five. The five broken contracts are exactly what today's reconciler cannot sense. You can't reconcile what you can't sense - which means everything in act three isn't a wishlist, it's the sensor specification." Delivery: hold on this slide; it's the talk's construction in one picture. State it as an extension of a credited framework, never as sole invention. 🎯 "You can't reconcile what you can't sense."`},"5.3":{title:"The ladder and its mirror (~2 min)",notes:`Spoken: "How far do we let it go? Google's SRE org published an autonomy ladder, and I'm going to use theirs, because inventing a fifth competing ladder in front of this room would be the worst available move. L0 manual, up to L4 full autonomy - and it's actually two-dimensional: you're assessed separately on Monitor, Investigate, Mitigate, Actuate and Self-Direct, so an org can honestly sit at L3 on monitoring and L1 on actuation. Practitioner reality in 2026 is roughly L1 to L2. Here's my extension, and it's the take-home of the talk: every published ladder specifies what the agent may do at each level. None of them specifies what you must be able to observe before you're permitted to climb. That's the mirror axis. And the twist that makes it steeper than you'd think: the trust research is clear that the more capable the automation, the more the overseeing human's skill and situation awareness degrade - and explanation-based oversight can actually increase misplaced trust. So the observability substrate has to compensate for an observer who is getting worse at the job by design. The ladder tells the agent how high it may climb. The mirror tells you whether you're allowed to let it." Delivery: two minutes, the act's centrepiece; draw the mirror axis with your hand before it appears.`},"5.4":{title:"Who gets paged? (~1.5 min)",notes:`Spoken: "One human question before the close: who gets paged? And I have to frame this slide as an honest set of absences, because that's what the research found. No vendor publishes an actual escalation policy for agent failures - the incident tooling companies have shipped agent-facing features, but not the policy. Remember Meta's runbook from act one? Its stated purpose is that the agent adapts 'rather than surfacing routine interruptions to engineers'. The agent is designed to be quieter than its failure rate. And incident schemas have no agent-attribution field - so there's no durable record of which incidents an agent silently handled, which means you cannot audit your own escalation posture even retroactively. Microsoft runs over thirteen hundred agents internally and they've mitigated thirty-five thousand incidents - the default posture at hyperscaler scale is already agent-resolves-and-reports. Aviation solved automation complacency with procedure. We haven't even written ours down - and I'd point out that this is the room that writes that literature; it doesn't get to wait and read it." Delivery: cite Microsoft's numbers as scale only, never as a ratio. This slide deliberately seeds the 16:00 panel - name that if the energy is right.`},"5.5":{title:"The handoff (~1.5 min)",notes:`Spoken: "Two numbers to leave you with, both from the analysts. Eighty-five percent of enterprises running AI SRE tools by 2029. Forty percent of agentic AI projects cancelled by end of next year. Both of those can be true at the same time - the ladder decides which one you are. And this is the opening talk, so my last job is to hand you the rest of the conference, because the questions I've opened are literally on the programme. Can the loop actually close? Alex, tomorrow morning. Does ten times the code mean twenty times the incidents? Sylvain proves or breaks my act-one chart on Friday. Was handcrafted code ever the point? Charity, this afternoon. And what does all of it do to uptime? Niall closes the conference with that on Friday. Each of those is an entire talk in itself - which is exactly why this one stops here." Delivery: generous, not deferential - you're framing their talks as the answers to your questions. ⚠️ Attribution decision: the 40% figure is primary Gartner; the 85% reaches the corpus only through secondary distribution of *Gartner Predicts 2026: I&O* - verify or soften to "analyst projections". Primary-sourced substitute if needed: guardian agents at 10-15% of the agentic AI market by 2030. ⚠️ Re-check programme slot times - programmes move.`},"5.6":{title:"Close (~30s)",notes:`Spoken: the line on the slide, verbatim, and nothing else. Delivery: say it, then stop. No thank-you slide before it; no "and so, in conclusion". The silence is the close. 🎯 "We spent the last ten years teaching machines to act. The next ten are about making sure we can see what they're doing."`},"5.7":{title:"Leave-behind (not spoken)",notes:"Advance to it only after the closing line has fully landed and the applause starts - never as part of the close. It's furniture for the room's photos, not a slide that gets spoken. TODO: generate the QR and decide the destination (a links page or the blog)."}},Ot=i=>`<span class="tag">${i}</span>`,Lt=i=>`<h2>${i}</h2>`,ir=i=>`<p class="lead">${i}</p>`,Jt=(i,e)=>`<div class="stat"><strong>${i}</strong><span>${e}</span></div>`,vs=i=>`<div class="rows">${i.map(([e,t])=>`<div class="r"><b>${e}</b><span>${t}</span></div>`).join("")}</div>`,Mu=["Traces","SLIs","Memory","Identity","Cost"],Su=["Bounded, structured text","A decidable success predicate","Stored state is fact","The caller is the principal","A human decided to spend"],Eu=["Payload, semantics, sandbox","Evals as production telemetry","Provenance on every read and write","The delegation chain as the trace","Budget as a precondition"];function Dc(i=!1){return`<div class="contract-map">${Mu.map((e,t)=>`<div><span class="mono">0${t+1} / ${i?"REPAIR":"ASSUMPTION"}</span><div class="contract-icon ci-${t}">${["⌁","∿","≡","↳","$"][t]}</div><h3>${e}</h3><p>${(i?Eu:Su)[t]}</p></div>`).join("")}</div>`}const Na=(i,e="0 0 1700 510")=>`<svg viewBox="${e}" role="img" xmlns="http://www.w3.org/2000/svg">${i}</svg>`,Wt=(i,e,t,n="label",s="")=>`<text x="${i}" y="${e}" class="${n}" ${s}>${t}</text>`,Ua=(i,e,t,n,s="wire")=>`<line x1="${i}" y1="${e}" x2="${t}" y2="${n}" class="${s}"/>`;let Tu=0;function Nc(i=!0){const e=`loop-arrow-${Tu++}`;return`<div class="loop-diagram">${Na(`<defs><marker id="${e}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10" fill="none" stroke="#93dcb6" stroke-width="1.4"/></marker></defs>
 ${i?["correctness distributions","delegation chains","memory provenance","semantic drift","spend"].map((n,s)=>{const r=15+s*339;return`<rect x="${r}" y="15" width="312" height="68" rx="4" class="sensor"/>${Wt(r+156,56,n,"sensor-label",'text-anchor="middle"')}${Ua(r+156,83,r+156,123)}`}).join("")+`<path d="M171 123H1527M849 123V206" class="signal" marker-end="url(#${e})"/>${Wt(880,169,"OBSERVABILITY / SENSING","micro")}`:""}
 <rect x="55" y="221" width="380" height="105" rx="5" class="node"/>${Wt(245,283,"desired state","node-label",'text-anchor="middle"')}
 <rect x="659" y="209" width="380" height="130" rx="5" class="controller"/>${Wt(849,263,"controller","node-label",'text-anchor="middle"')}${Wt(849,304,"reconcile()","micro",'text-anchor="middle"')}
 <rect x="1265" y="221" width="380" height="105" rx="5" class="node"/>${Wt(1455,283,"observed state","node-label",'text-anchor="middle"')}
 <path d="M435 274H645" class="signal" marker-end="url(#${e})"/><path d="M1039 274H1250" class="signal" marker-end="url(#${e})"/>
 <path d="M1455 326V428H849V354" class="signal feedback" marker-end="url(#${e})"/>${Wt(1160,471,"observe → compare → correct","micro",'text-anchor="middle"')}`)}</div>`}function qo(i,e,{color:t="mint",max:n=350,suffix:s="",xvalues:r=null}={}){const a=c=>60+(r?r[c]:c/(i.length-1))*660,o=c=>350-c/n*290;let l=[0,.25,.5,.75,1].map(c=>Ua(60,350-c*290,720,350-c*290,"grid")+Wt(44,358-c*290,Math.round(n*c),"axis",'text-anchor="end"')).join("");return l+=`<path d="${i.map((c,h)=>`${h?"L":"M"}${a(h)} ${o(c)}`).join(" ")}" class="plot ${t} ${r?"anchors":""}"/>`,l+=i.map((c,h)=>`<circle cx="${a(h)}" cy="${o(c)}" r="${r?6:3.5}" class="dot ${t}"/>`).join(""),l+=e.map(([c,h])=>Wt(a(c),397,h,"axis",'text-anchor="middle"')).join(""),l+=Wt(720,o(i.at(-1))-24,`${i.at(-1)}${s}`,"chart-value",'text-anchor="end"'),Na(l,"0 0 780 420")}const Au=[80.8,100.1,117,144.2,153,167.8,177.7,209.2,215,246.8,319.8],Ru=[0,4,8,12,16,19,20,21,22,23,24].map(i=>i/24),Uc=()=>qo([35,43.2,90],[[0,"2024 avg"],[1,"2025 avg"],[2,"Apr 2026 peak"]],{max:100,suffix:"M",xvalues:[0,.55,1]});function Cu(){return`<div class="trace-pair"><div><span class="mono">MCP / 09 VISIBLE CALLS</span><div class="waterfall">${["search_issues","read_file","db.query","fetch","transform","write_file","post_comment","notify","commit"].map((e,t)=>`<div style="margin-left:${t*9}px;width:${220+t%3*25}px"><i></i>${e}</div>`).join("")}</div></div><span class="trace-arrow">→</span><div class="opaque"><span class="mono">CODE MODE / 01 SPAN</span><div class="execution"><i></i>execute_code<span>CONTENTS OPAQUE</span></div></div></div>`}const Pu={.1:{layout:"title",scene:"landscape",html:`<div class="title-copy">${Ot("SIGNALS / BERLIN / 2026")}<h1>The New<br>Failure Modes<span class="full-stop">.</span></h1><p class="subtitle">Observability in the Age of AI Agents</p><p class="byline">Alejandro Saucedo</p></div><div class="title-coordinate mono">52°31′ N &nbsp; 13°24′ E<br>10 SEPTEMBER / 09:15</div>`},.2:{layout:"profile",html:`<div class="profile-copy">${Ot("YOUR SPEAKER")}<h2>Alejandro<br>Saucedo</h2>${vs([["Zalando","Exec Director of AI,<br>Data & Platform"],["ACM","Board Member"],["AI advisor","UN · OECD · Linux Foundation<br>Institute for Ethical AI · among others"]])}</div><img class="portrait" src="/keynote/profile-face.jpg" alt="Alejandro Saucedo"/>`},1.1:{layout:"object laptop",scene:"laptop",html:`${Lt("The race to the<br><s>bottom</s> top")}<div class="object-evidence">${vs([["70%+","Uber PRs from agents"],["33%","Zalando PRs auto-approved<br><small>250+ teams · lead time ↓ 20–40%</small>"],["20–30%","Microsoft code written by AI"],[">30%","Google new code"]])}</div><div class="object-caption mono">AG–01 / AGENT WORKSTATION<br><span>SPECTRUM / LIVE</span></div>`},1.2:{layout:"three-evidence laptop-chapter",scene:"laptop",html:`${Lt("Not just code")}<div class="evidence-columns">${[["Anthropic","95%","Internal analytics queries automated","~95% accuracy"],["OpenAI","4,000","of ~5,000 employees on its data agent","600+ PB · 70,000 datasets<br>Insights from hours to minutes"],["Spotify","2,100+","employees using the data assistant","13,000+ conversations<br>Over ¼ had never written SQL"]].map(([i,e,t,n])=>`<div>${Ot(i)}${Jt(e,t)}<p>${n}</p></div>`).join("")}</div>`},1.3:{layout:"charts",html:`${Lt("The fastest acceleration<br>in the history of software")}<div class="chart-pair"><div>${Ot("01 / GLOBAL GIT PUSHES · MILLIONS / QUARTER")}${qo(Au,[[0,"2020"],[2,"2022"],[4,"2024"],[10,"2026"]],{max:350,suffix:"M",xvalues:Ru}).replace("plot mint anchors","plot mint")}</div><div>${Ot("02 / MERGED PULL REQUESTS · MILLIONS / MONTH")}${Uc()}</div></div><div class="chart-verdict"><strong>+80%</strong><p>in the last year,<br>after five years of ~17%</p><span class="mono">GITHUB INNOVATION GRAPH<br>PRs: THREE LABELLED ANCHORS · DOTTED INTERPOLATION</span></div>`},1.4:{layout:"charts",html:`${Lt("PRs up. Incidents up.")}<div class="chart-pair"><div>${Ot("01 / MERGED PULL REQUESTS · MILLIONS / MONTH")}${Uc()}</div><div>${Ot("02 / GITHUB INCIDENTS · PER MONTH")}${qo([19,17,12,16,22,17,15,15,28,37,32,27],[[0,"May 2025"],[5,"Oct"],[9,"Feb 2026"],[11,"Apr"]],{max:40,color:"red"}).replace("</svg>",`${Wt(595,48,"PEAK 37 · FEB","micro",'text-anchor="middle"')}</svg>`)}</div></div><div class="bottom-stats">${Jt("257","incidents in 12 months")}${Jt("48","major")}${Jt("capacity","top root cause")}</div><p class="src">IncidentHub tracker · GitHub public status page · correlation, not an isolated causal estimate</p>`},1.5:{layout:"evidence",html:`${Lt("Work left the laptop")}${vs([["Cursor","35% of its own merged PRs from Cloud Agents · one VM per agent"],["Microsoft Research","13.5M Copilot coding-agent sessions in one month"],["Linear","Issues route to agents with zero humans in the triage rule"]])}<div class="sandbox-strip">${["agent / 01","agent / 02","agent / 03","agent / 04","agent / 05","agent / 06"].map(i=>`<span><i></i>${i}<small>ISOLATED SANDBOX</small></span>`).join("")}</div>${ir("The unit of work is a sandbox you never see.")}`},1.6:{layout:"memory",html:`${Lt("All of it wired to<br>one shared memory")}<div class="memory-network">${Na(`<g class="memory-orbits">${Array.from({length:24},(i,e)=>{let t=e/24*Math.PI*2,n=420+340*Math.cos(t),s=265+215*Math.sin(t);return`${Ua(n,s,420,265)}<circle cx="${n}" cy="${s}" r="5" class="agent-dot" style="animation-delay:${e*.17}s"/><circle cx="${n}" cy="${s}" r="3.5" class="agent-packet" style="--dx:${420-n}px;--dy:${265-s}px;animation-duration:${3+e%5}s;animation-delay:${-e*.37}s"/>`}).join("")}</g><rect x="275" y="173" width="290" height="178" rx="8" class="node"/>${Wt(420,214,"SHARED MEMORY","micro",'text-anchor="middle"')}${Wt(420,254,"the work","node-label",'text-anchor="middle"')}${Wt(420,290,"the knowledge","node-label",'text-anchor="middle"')}${Wt(420,326,"the tasks","node-label",'text-anchor="middle"')}${Wt(85,60,"DEVELOPERS’ AGENTS","micro")}${Wt(520,60,"MANAGERS’ AGENTS","micro")}${Wt(320,515,"TEAM AGENTS","micro")}`,"0 0 850 550")}</div><div class="memory-evidence">${Jt("2.4M ≈ 2.5M","Linear issues / week: agents ≈ humans")}${vs([["Jira","Agents assigned like teammates"],["Rovo","5M+ monthly users · 75% of Fortune 500"],["Claude","Persistent, project-scoped memory"]])}</div>${ir("“What is my team working on?” is becoming a query, not a conversation.")}`},1.7:{layout:"evidence numbers"},1.8:{layout:"lifecycle",html:`${Lt("Agents running<br>the whole lifecycle")}<div class="lifecycle-steps">${["plan","launch","debug","iterate"].map((i,e)=>`<div><span class="mono">0${e+1}</span><h3>${i}</h3></div>`).join("")}</div>${vs([["REA / Meta","Doubled accuracy-iteration gains across six models<br>2 engineers per model → <b>3 across 8</b>"],["KernelEvolve / Meta","Production GPU kernels · <b>+60%</b> inference throughput<br>Serving <b>trillions</b> of requests a day"]])}`},1.9:{layout:"checklist",html:`${Lt("What it took<br>to run that safely")}<ol class="checks">${["Preflight access checklist","Compute budget confirmed upfront","Halt-and-pause thresholds","A failure runbook the executor consults itself","Scope fence","Bitwise correctness verification","Search termination criteria"].map(i=>`<li>${i}</li>`).join("")}</ol><p class="check-verdict">Every one of these is bespoke.<br><em>None of it is standard.</em></p>`},2.1:{layout:"incident",html:`${Ot("GITHUB / MERGE QUEUE")}${Lt("April 23, 2026")}<div class="incident-stats">${Jt("2,092","pull requests")}${Jt("658","repositories")}<p>incorrect<br>merge commits</p></div><blockquote>“…the existing monitoring didn’t catch it because the issue was about <em>merge correctness</em> rather than availability.”<cite>GITHUB</cite></blockquote>`},2.2:{layout:"two-evidence"},2.3:{layout:"evidence"},2.4:{layout:"swarm",html:`${Ot("OPENAI / TESTING SWARM")}${Lt("July 19, 2026")}<div class="swarm-number">~700<span>agents</span></div><div class="swarm-field">${Array.from({length:140},(i,e)=>`<i class="${e%5===0?"tampered":""}"></i>`).join("")}<span class="mono">ONE MARK / 5 AGENTS · ~20% EVIDENCE TAMPERING</span></div><div class="swarm-lines"><p>Escaped test confinement</p><p>Stole credentials · tampered with cloud environments</p><p>Coordinated on an unsanctioned message board</p><p><b>~20%</b> showed evidence-tampering behaviour</p></div>`},2.5:{layout:"quote"},2.6:{layout:"table"},"3.0":{layout:"map",html:`${Lt("Five assumptions.<br>All broken.")}${Dc()}`},3.1:{layout:"timeline journey-sealed",scene:"sealed",html:`${Lt("Traces: the pillar wars,<br>in one line")}<div class="timeline">${[["2017","Bourgon’s Venn diagram","metrics · logs · traces"],["2018","The same author<br>argues the opposite",""],["2019","OTel unifies collection","Declines to unify storage"],["2023–26","Wide events",""]].map(([i,e,t])=>`<div>${Ot(i)}<i></i><h3>${e}</h3><p>${t}</p></div>`).join("")}</div>${ir("Settled as architecture · unsettled as economics · re-opened by agents")}`},3.2:{layout:"payload journey-sealed",scene:"sealed",html:`${Lt("What broke the span")}<div class="payload-box"><span class="mono">tool_call / response</span><div class="payload-code">data:image/png;base64,iVBORw0KGgoAAAANSUhEUg…<br>QfABmGVW7r9KkpJH4aLm0P2XfJt8VwC1pX…<br>m4D9kaL2e8PzRbX6H3qF1tU5cYsN7fGw…<br>V2dXa9zNb4QpJ1cE7rLs5mW0kT8uB…</div><strong>~1.8 MB</strong><p>one screenshot inside one span</p></div><div class="payload-verdict"><span class="status"><i></i>200 OK</span><h3>It can say<br>the call returned.</h3><p>It cannot say whether<br>the answer <em>drifted.</em></p></div><p class="src">MLflow: binary offload to object storage · OpenInference: voice span kinds</p>`},3.3:{layout:"object sealed",scene:"sealed",html:`${Lt("Code mode:<br>the seam disappears")}${Cu()}<div class="token-line"><strong>150,000 → 2,000</strong><span>tokens. Observable operations → one.</span></div><div class="object-caption mono">SB–09 / SEALED EXECUTION CORE<br>NO SEAM. STILL ACTIVE.</div><div class="object-controls"><button data-object-t="0">01 Enclosure</button><button data-object-t=".55">02 Assembly</button><button data-object-t="1" class="selected">03 Boundary</button></div>`},3.4:{layout:"standard journey-sealed",scene:"sealed"},3.5:{layout:"sli",html:`<h2>Your agent can be</h2><div class="sli-triplet">${Jt("100%","available")}${Jt("100%","within latency")}${Jt("100%","wrong.")}</div><div class="evidence-columns"><div>${Ot("01 / ONE EVALUATOR")}<p>Run offline <b>and</b> on sampled production traces</p></div><div>${Ot("02 / SCORES → TELEMETRY")}<p class="code-label">gen_ai.<br>evaluation.result</p></div><div>${Ot("03 / GUARDRAILS → MONITORS")}<p>The signal is the <b>delta</b> in trip rate, not the level</p></div></div>`},3.6:{layout:"quote"},3.7:{layout:"timeline",html:`${Lt("Memory:<br>no attacker required")}<div class="timeline three">${[["Tuesday","The agent hallucinates.","The memory layer stores it."],["Friday","Three downstream workflows","treat it as ground truth."],["+11 days","Full recovery.",""]].map(([i,e,t])=>`<div>${Ot(i)}<i></i><h3>${e}</h3><p>${t}</p></div>`).join("")}</div><p class="attacker mono">ATTACKER: NONE</p>`},3.8:{layout:"poison",html:`${Lt("Prompt injection is session-scoped.<br>Memory poisoning is not.")}<div class="session-diagram"><div class="session">${Ot("SESSION 1")}<h3>Injection lands.</h3><span class="mono">TELEMETRY BOUNDARY</span></div><div class="lag"><span class="mono">WEEKS LATER</span><div>→</div><span class="mono">PERSISTENT MEMORY</span></div><div class="session">${Ot("SESSION N")}<h3>Damage fires.</h3><span class="mono">TELEMETRY BOUNDARY</span></div></div>${ir("Fail soft on state, fail closed on trust.")}<p class="repair-line">Every memory operation is a first-class trace event, with provenance.</p>`},3.9:{layout:"identity",html:`${Ot("IDENTITY / THREE QUESTIONS YOUR GATEWAY CAN’T ANSWER")}<div class="identity-questions"><h2><span>01</span>Who are you?</h2><h2><span>02</span>Whose agent are you?</h2><h2><span>03</span>What can you do?</h2></div>${ir("The declaration is the authorization.")}`},"3.10":{layout:"delegation",html:`<div class="delegation-chain">${["user","agent","sub-agent","tool"].map((i,e)=>`<div>${Ot("HOP / 0"+e)}<h3>${i}</h3><p>actor · subject<br>audience · scope</p></div>`).join("")}</div><h2>The security primitive<br>and the trace are<br><em>the same artifact.</em></h2><div class="legal-line"><b>EU AI Act / Article 12</b><span>Automatic logging · lifetime-scoped<br>In full application since 2 Aug 2026</span></div>`},3.11:{layout:"cost",html:`${Lt("Cost: nobody decided<br>to spend that")}<div class="cost-top">${Jt("6×","AI infra cost since 2024 · Uber")}${Jt("flat","measured productivity")}${Jt("$500–2,000","per engineer / month")}</div><span class="mono cost-source">UBER 6× / FLAT: SECONDARY REPORTING; PRIMARY UNIT-COST FIGURES DIFFER</span><div class="metr">${Ot("METR / RANDOMIZED CONTROLLED TRIAL")}${Jt("+24%","forecast")}${Jt("+20%","self-reported")}${Jt("−19%","measured")}</div>`},3.12:{layout:"map repaired",html:`${Lt("Five contracts. One repair.")}${Dc(!0)}<p class="map-refrain">Carry <em>provenance and meaning</em> alongside the value.</p>`},4.1:{layout:"pipeline",html:`${Ot("A DECADE OF MLOPS")}${Na(`<path d="M80 310L780 307L780 100L1600 94" class="plot amber"/>${Ua(80,375,1600,375,"grid")}${Wt(80,420,"MONTHS / DASHBOARDS GREEN THROUGHOUT","micro")}${Wt(810,55,"the day someone fixed the pipeline","label")}<circle cx="780" cy="100" r="7" class="dot amber"/>`)}<h2>Do we file that as an incident,<br>or as an improvement?</h2>`},4.2:{layout:"funnel",html:`${Lt("The bottom<br>of the funnel")}<div class="funnel-shape"><div><span>writing code</span><small>TOOLING EXPLODED</small></div><div><span>testing</span></div><div><span>operating</span></div><b>THIS TALK</b></div>`},5.1:{layout:"object engine",scene:"engine",html:`${Lt("SRE solved<br>this shape before")}<div class="small-loop"><span>desired state</span><b>↓</b><strong>controller</strong><b>↓</b><span>observed state</span><i>↺</i></div><div class="kagent"><b>kagent</b><p>Model, tools, memory, skills as CRDs<br>with a reconciler · CNCF Sandbox</p></div><div class="object-caption mono">AG–01 / GOVERNED ENGINE<br>SENSE → COMPARE → CORRECT</div><div class="object-controls"><button data-object-t=".1">01 Running</button><button data-object-t=".6" class="selected">02 Exposed</button><button data-object-t="1">03 Governor</button></div>`},5.2:{layout:"sensing",html:`${Ot("THE RECONCILE LOOP / FIVE SENSOR INPUTS")}${Nc(!0)}<h2>Observability is the <em>sensing half</em><br>of the reconcile loop.</h2>`},5.3:{layout:"ladder",html:`${Lt("The ladder and its mirror")}<div class="ladder-diagram"><div class="ladder-levels">${[["L4","full",""],["L3","high","detects, decides, acts in defined scenarios"],["L2","partial","actuates, needs approval"],["L1","assisted",""],["L0","manual",""]].map(([i,e,t],n)=>`<div style="--step:${4-n}"><b>${i}</b><strong>${e}</strong><span>${t}</span></div>`).join("")}<span class="mono">GOOGLE SRE / AI AUTONOMY LEVELS</span></div><div class="mirror"><span class="mono">THE MIRROR AXIS</span><h3>What must you<br>be able to <em>SEE</em><br>before you<br>may climb?</h3></div></div>`},5.4:{layout:"paging",html:`${Lt("Who gets paged?")}<div class="paging-mark"><i></i><span>?</span><span class="mono">ESCALATION / UNDEFINED</span></div><div class="paging-rows">${vs([["01","No vendor publishes an <b>escalation policy</b> for agent failures"],["02","Meta’s agent adapts “rather than surfacing routine interruptions to engineers”"],["03","Incident schemas have <b>no agent-attribution field</b>"]])}</div>`},5.5:{layout:"handoff",html:`<div class="handoff-stats">${Jt("85%","of enterprises using AI SRE tools by 2029")}${Jt("40%+","of agentic AI projects cancelled by end of 2027")}</div><span class="mono">ANALYST PROJECTIONS / ADOPTION AND CANCELLATION CAN COEXIST</span><div class="programme">${[["Alex","Can the loop close?","FRI 09:15"],["Sylvain","Does 10× more code mean 20× more incidents?","FRI 10:45"],["Charity","Was handcrafted code ever the point?","THU 13:15"],["Niall","What does it do to uptime?","FRI 15:30 / CLOSING"]].map(([i,e,t])=>`<div><h3>${i}</h3><p>${e}</p><span class="mono">${t}</span></div>`).join("")}</div>`},5.6:{layout:"close",html:`<div class="closing-loop">${Nc(!0)}</div><h2>We spent the last ten years<br>teaching machines to act.<br><span>The next ten are about making sure<br>we can <em>see what they’re doing.</em></span></h2>`},5.7:{layout:"references",html:`${Lt("References &<br>further reading")}<div class="reference-list">${[["The memory series","ethical.institute/blog/whose-memory-is-it-part-1","Parts 1–4"],["The observability piece","ethical.institute/blog/production-observability-multi-agent-ai",""],["KAOS","axsaucedo.github.io/kaos",""],["@axsaucedo","github.com/axsaucedo",""]].map(([i,e,t])=>`<a href="https://${e}" target="_blank" rel="noopener"><b>${i}</b><span>${e.replace("ethical.institute/blog/","ethical.institute / ")} ${t}</span></a>`).join("")}</div><div class="qr-block"><img loading="lazy" src="/keynote/references-qr.svg" alt="QR code to the observability article"/><p class="mono">SCAN / THE OBSERVABILITY PIECE</p></div>`}},Iu=["Cold open","Where We Are","The New Failure Modes","The Broken Contracts","A Decade of MLOps Already Told Us","The Way Forward"],Lu=vu.map((i,e)=>{const t=i.div?Number(i.div):Number(i.id[0]),n=Pu[i.id]||{};return{...i,index:e,actNumber:t,actName:Iu[t],layout:(i.div?"divider":n.layout||"evidence")+(/^(1\.[79]|2\.5|3\.[69])$/.test(i.id)?" instrument-chapter":""),scene:i.div?"landscape":n.scene||null,html:n.html??i.h,notes:Lc[i.id]?.notes||"",sourceTitle:Lc[i.id]?.title||i.name,...i.div?{html:`<div class="divider-copy">${Ot("ACT / 0"+i.div)}<h1>${{1:"Where We Are",2:"The New<br>Failure Modes",3:"The Broken<br>Contracts",4:"A Decade of MLOps<br>Already Told Us",5:"The Way<br>Forward"}[i.div]}</h1><p>${i.sub}</p></div><span class="landscape-caption mono">${["","01 / ACCELERATION","02 / LOSS OF VISIBILITY","03 / TAKING IT APART","04 / A FAMILIAR HORIZON","05 / THE FEEDBACK"][i.div]}</span>`}:{},accent:t===2?"#f17b70":t===4?"#d9b482":"#93dcb6"}}),Du=JSON.parse(`[{"id":"0.1","title":"Title","onSlide":"- **The New Failure Modes**\\n- *Observability in the Age of AI Agents*\\n- Alejandro Saucedo · Signals Berlin 2026","chart":"","notes":"Spoken: \\"Good morning Berlin. This is the opening slot, so my job for the next forty-five minutes is to set the frame for the next two days. The short version: software is being written and operated faster than at any point in history, and the way we watch it has not kept up. Everything that follows is about that gap.\\" Delivery: house lights still half up - let the room settle during the first sentence. The title is already on the programme, so don't read it out; the room has seen it.","sources":[]},{"id":"0.2","title":"Who's telling you this","onSlide":"- Photo: \`profile-face.jpg\`, right half of the slide.\\n- Alejandro Saucedo\\n- Exec Director of AI, Data & Platform · Zalando\\n- Board Member · ACM\\n- AI advisor · UN, OECD, Linux Foundation, Institute for Ethical AI - among others","chart":"","notes":"Spoken: \\"For those I haven't met: I run AI, Data & Platform at Zalando, I'm on the board of the ACM, and I advise on AI at the UN, the OECD and the Linux Foundation, among others. The part that actually matters for today: I've spent the last decade running ML systems in production, and a year ago at SREcon I gave a keynote about that decade. This talk is about what happened since.\\" Delivery: don't read the slide - the photo and the list carry themselves. The only sentence doing work is the SREcon one, because act 3 pays it off.","sources":[]},{"id":"D1","title":"Act divider","onSlide":"- **1 · Where We Are**\\n- *Three snapshots of software, September 2026*","chart":"","notes":"Spoken: \\"I want to start with three snapshots of where we actually are. Not predictions - things that are already happening. One about how fast we now ship. One about where the work now lives. And one about how much already runs end to end with nobody driving.\\" Delivery: this is the act's table of contents; say it on the divider so each snapshot lands as expected rather than as a topic change.","sources":[]},{"id":"1.1","title":"The race to the ~~bottom~~ top","onSlide":"- Title: **The race to the ~~bottom~~ top** (\\"bottom\\" struck through)\\n- **Uber** - 70%+ of pull requests from local or cloud agents [1]\\n- **Zalando** - 33% of PRs auto-approved · 250+ teams · lead time down 20-40% [2]\\n- **Microsoft** - \\"20-30% of our code is written by AI\\" - Nadella [3]\\n- **Google** - \\">30% of new code\\" - Pichai [3]","chart":"","notes":"Spoken: \\"First snapshot: how we build. Every large engineering org is in the same race right now. Uber attributes over seventy percent of its pull requests to agents. At Zalando - and this one I can vouch for personally - a third of our PRs go through an auto-approve path, across more than two hundred and fifty teams, and it cut lead time by twenty to forty percent. Nadella and Pichai have both put their companies' numbers on record. I should say the honest caveat: nobody in this list shares a methodology, and 'written by AI' means something different at each of them. But the direction is not in dispute - and notice nobody is slowing down to check.\\" Delivery: fast, one breath per line; the Zalando line is the credibility anchor, deliver it as a first-person aside. ⚠️ Refresh the Zalando figures with the internal owner before the talk. Backup if the room wants more: Uber's fuller inventory is 3,600 agent skills, 30K skill executions/day, 7x WAU growth Feb→Aug 2026 (research-ref-2-2).","sources":[{"n":1,"href":"https://www.uber.com/us/en/blog/efficient-software-factory/"},{"n":2,"href":"https://engineering.zalando.com/posts/2026/08/agentic-engineering-at-zalando-a-snapshot.html"},{"n":3,"href":"https://www.cnbc.com/2025/04/29/satya-nadella-says-as-much-as-30percent-of-microsoft-code-is-written-by-ai.html"}]},{"id":"1.2","title":"What that does to the platform","onSlide":"- Title: **The fastest acceleration in the history of software**\\n- Three built charts, side by side, shared 2020→2026 x-axis treatment:\\n  - (a) **Global git pushes per quarter** - line, 80.8M → 319.8M\\n  - (b) **Merged pull requests per month** - line, ~35M → ~90M\\n  - (c) **New repositories per month** - line, → ~20M\\n- Callout on (a): **+80% in the last year, after five years of ~17%**\\n- Small print: GitHub Innovation Graph · GitHub availability update, April 2026\\n- **Build/animation:** progressive reveal - (a) draws its line left to right first (the elbow between 2025 Q4 and 2026 Q1 is the beat the animation lands on), then (b) and (c) fade in already drawn. In Slides this is three entrance builds; on the site version it is an animated line draw. The upward motion IS the argument - never show all three static at once.","chart":"All three BUILT, not screenshots. (a) Full quarterly series from GitHub's own Innovation Graph CSV (EU rollup excluded to avoid double-counting): 2020 Q1 80.8 · 2021 Q1 100.1 · 2022 Q1 117.0 · 2023 Q1 144.2 · 2024 Q1 153.0 · 2024 Q4 167.8 · 2025 Q1 177.7 · 2025 Q2 209.2 · 2025 Q3 215.0 · 2025 Q4 246.8 · 2026 Q1 319.8 (millions; raw CSV at \`research/assets/innovationgraph-git-pushes-raw.csv\`). Mark the elbow between 2025 Q4 and 2026 Q1. (b) Anchor points until the real monthly series is pulled: 35M (2024 monthly avg, Octoverse) · 43.2M (2025 monthly avg, Octoverse) · ~90M (April 2026 peak, read off GitHub's Record Acceleration panel). TODO(chart): query GH Archive on BigQuery (\`githubarchive\`, PullRequestEvent merged) for the true monthly series 2023→2026; until then plot the three anchors as labelled points with a dotted interpolation, never a fake smooth line. (c) New repositories: the Record Acceleration panel shows ~20M/mo peak; TODO(chart): extract approximate series from the captured panel (\`research/assets/github-record-acceleration-2023-2026.png\`) or drop to two charts - two honest charts beat three where one is hand-waved.","notes":"Spoken: \\"Here's what that race does to the one platform that sees all of it. Walk the left chart with me. Five years of boring, healthy, seventeen-percent-a-year growth - the entire MLOps decade sits on that flat slope. Then the last four quarters: plus eighty percent. GitHub now merges about three million pull requests a day; eighteen months ago it was less than half that. And this is not my interpretation - GitHub's own CTO wrote, quote, 'Since the second half of December 2025, agentic development workflows have accelerated sharply.' In October 2025 they planned for ten times their capacity. Four months later they re-scoped that plan to thirty times. The platform that hosts the world's code is redesigning itself around what agents do to it.\\" Delivery: the CTO quote is the causal claim that makes the chart more than a curve - it's first-party, so lean on it. Spoken anchors if wanted: code pushes 65M → 82.19M/mo, issues closed 3.4M → 4.25M/mo (Octoverse). Do NOT quote the 986M-commits figure alongside the Record Acceleration commits panel - the two GitHub publications disagree on commit counts (986M/year vs ~1.4B/mo) and the discrepancy is unexplained; leave commits out entirely.","sources":[{"n":1,"href":"https://innovationgraph.github.com/global-metrics/git-pushes"},{"n":2,"href":"https://github.blog/news-insights/company-news/an-update-on-github-availability/"},{"n":3,"href":"https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/"}]},{"id":"1.3","title":"The other line","onSlide":"- Title: **PRs up. Incidents up.**\\n- Left panel: the merged-PRs line from 1.2, small.\\n- Right panel: **GitHub incidents per month**, May 2025 → Apr 2026 - line rising to a labelled peak: **37, Feb 2026**\\n- Three numbers across the bottom: **257** incidents in 12 months · **48** major · top root cause: **capacity**\\n- Small print: IncidentHub tracker, from GitHub's public status page","chart":"Built line chart. Monthly outage counts May 2025 → Apr 2026 from IncidentHub: starts ~19/mo, dips to 12, climbs to the 37 peak in Feb 2026 (reference capture: \`research/assets/incidenthub-github-total-outages-by-month.png\`; exact monthlies on the source page). Optional second panel, root-cause bars: capacity 83 · deployment 71 · external dependencies 31 · configuration 30 · internal 24 · uncategorized 11 · infrastructure/network 7.","notes":"Spoken: \\"Now the other line. Same platform, same twelve months: two hundred and fifty-seven incidents, forty-eight of them major, worst month February 2026 with thirty-seven. And the top root cause, by a distance, is capacity - the thing the last slide was about. I want to be careful here: this is a third-party tracker scraping GitHub's status page, the 2024 comparison number comes from a different source, and 'capacity' includes plenty of non-agentic load. So take it as direction, not precision. But the direction is the point: the throughput chart and the incident chart bend in the same year, on the same platform, and the platform's own engineers tell you why. PRs up. Incidents up. Hold those two lines - the rest of the talk lives between them.\\" Delivery: this is the act's thesis slide; slow down here. Don't over-argue the causal link - Sylvain Kalache proves the 10x-code/20x-incidents case on Friday at 10:45, and naming that now costs nothing: \\"there's a whole talk on this exact correlation on Friday.\\" Peer comparison if challenged in Q&A: GitHub 257, GitLab 132, Bitbucket 27 over the same window. Do not quote the MTTR deterioration (~106 min → ~6h) as a trend - it splices two sources. One line worth keeping from the cut April 23 slide, spoken not shown: when GitHub's merge queue wrote bad merge commits into two thousand PRs, their own postmortem said the monitoring didn't catch it \\"because the issue was about merge correctness rather than availability\\" - that sentence returns as the observability sub-section's spine. 🎯 \\"PRs up. Incidents up.\\"","sources":[{"n":1,"href":"https://blog.incidenthub.cloud/github-reliability-outage-history-2025-2026"},{"n":2,"href":"https://leaddev.com/software-quality/whats-gone-wrong-at-github"},{"n":3,"href":"https://github.blog/news-insights/company-news/an-update-on-github-availability/"}]},{"id":"1.4","title":"Work left the laptop","onSlide":"- Title: **Work left the laptop**\\n- **Cursor** - 35% of its own merged PRs come from Cloud Agents, one VM per agent\\n- **Microsoft Research** - 13.5M Copilot coding-agent sessions in a single month\\n- **Linear** - issues route to agents with zero humans in the triage rule\\n- Bottom line, smaller: *Work lives in agent sandboxes, growingly with shared memory*","chart":"","notes":"Spoken: \\"Second snapshot: where the work now happens. Cursor reports that thirty-five percent of its own merged PRs come from cloud agents - each one a VM you never open. Microsoft Research measured thirteen and a half million Copilot coding-agent sessions in one month, and the sessions have a synchronized daily rhythm, peaking four to five times baseline during working hours - the agents keep office hours, because we start them. And in Linear you can now write a triage rule that assigns issues straight to an agent, no human in the loop. So the work has left the laptop. It runs in sandboxes, in parallel, on infrastructure someone else operates.\\" Delivery: introduce the word \\"sandbox\\" here deliberately - the observability sub-section comes back to it as the thing traces can't see inside. ⚠️ The MSR numbers reached the corpus through search-summarized text - read the PDF before the number goes on screen. TODO(verify): Cursor's 35% is a vendor self-report with no primary URL captured; get the link or attribute verbally. Linear's zero-human triage shipped July 2026 - capability confirmed, adoption scale unknown; say so if asked.","sources":[{"n":1,"href":"https://www.microsoft.com/en-us/research/wp-content/uploads/2026/08/ghcp_traces-6.pdf"},{"n":2,"href":"https://linear.app/docs/agents-in-linear"}]},{"id":"1.5","title":"One shared memory","onSlide":"- Title: **All of it wired to one shared memory**\\n- Diagram, centre: an enterprise knowledge base labelled with its layers - *the work · the knowledge · the tasks*. Around it: developers' agents, managers' agents, team agents - all reading and writing the same store. (Site build: buzz.xyz-style background - dozens of small agents moving between the store and each other.)\\n- One line underneath: *\\"What is my team working on?\\" is becoming a query, not a conversation.*\\n- Evidence lines:\\n  - **Linear** - agents now create **~2.4M** issues a week. Humans: **~2.5M**. Near parity. [1]\\n  - **Jira** - agents ship as an assignee option, assignable like teammates [2]\\n  - **Atlassian Rovo** - **5M+** monthly users · **75%** of the Fortune 500 [3]\\n  - **Claude** - persistent, project-scoped memory across conversations [4]","chart":"","notes":"Spoken: \\"Here's the part I think is still underappreciated. All of those agents - mine, my team's, my manager's - are increasingly wired to the same substrate: an enterprise-wide memory. It holds the work itself, the company's knowledge, and now the tasks. Look at Linear's own public data: agents create about two point four million issues a week on the platform. Humans create two point five. The task queue is already half agent-written. Jira now ships agents in the assignee dropdown, next to your teammates. And the memory layer underneath is becoming a product category of its own - persistent, project-scoped, shared. Which changes something very human: as a manager, I increasingly don't find out what my team is working on by asking them. I ask my agent, and my agent reads the shared memory. There are already vendors selling exactly that - one of them literally markets it as replacing the manager as 'the routing layer'. The org chart still describes the people; the memory bank describes the work.\\" Then the honesty note, spoken plainly: \\"Now, the full version of this - your agent negotiating with my agent across team boundaries - hasn't arrived at scale, and I won't pretend it has. What ships today are the primitives: the shared store, the delegation, the agent-to-agent protocols - A2A alone has a hundred and fifty organizations behind it now. But hold the picture, because its failure modes have already arrived - and that's act two.\\" 🎯 \\"The failures arrived before the wins.\\" Delivery: the Linear parity number is the slide's spine - point at it. ⚠️ Rovo's 5M MAU / 75% F500 is search-indexed, not deep-verified - re-check before stage (findings-15). Backup: the Jellyfish post has a named manager on record asking the AI assistant for team velocity instead of a person; Grab's supervisor-orchestrated system (1,000+ internal users) is the nearest real thing to agent teams, and it's one supervisor over its own sub-agents, not peer agents (findings-11).","sources":[{"n":1,"href":"https://linear.app/data"},{"n":2,"href":"https://www.atlassian.com/blog/rovo/ai-agents-in-jira"},{"n":4,"href":"https://claude.com/blog/memory"}]},{"id":"1.6","title":"Nobody's driving, and it works","onSlide":"- Title: **Agents running whole systems, end to end**\\n- **AlphaEvolve** (Google DeepMind) - evolves its own algorithms into production · recovered **0.7%** of Google's worldwide compute [1]\\n- **Azure SRE Agent** (Microsoft) - **1,300+** agents on Microsoft's own services · **35,000+** incidents mitigated [2]\\n- **Verizon** - **70M+** autonomous network actions across ~60,000 vRAN sites in 2025 · anomalies resolved in under two minutes [3]\\n- **Anthropic** - **800+** autonomous fixes cut an API-error class **1,000x** · human estimate: four years [4]\\n- Bottom line, smaller: *a single unit of work whose lifetime dwarfs any span, session or trace our tooling knows how to hold*","chart":"","notes":"Spoken: \\"Third snapshot: the far end of the curve, where agents don't assist the lifecycle - they run it, detect to decide to act, nobody driving. Google's AlphaEvolve writes and tests its own algorithms and ships them: its scheduling heuristic has been in production inside Borg for over a year, recovering nought point seven percent of Google's worldwide compute - a datacentre's worth of capacity, found by an agent. Microsoft runs its Azure SRE Agent on Microsoft's own services: thirteen hundred agents deployed, thirty-five thousand incidents mitigated - self-healing infrastructure is a product now, and it's eating its own incidents. Verizon's network ran seventy million autonomous actions last year across sixty thousand radio sites - anomalies resolved in under two minutes, and their stated goal is execution completely out of the human loop; that's not software anymore, that's physical infrastructure. And Anthropic points Claude at its own codebase: eight hundred autonomous fixes that cut a class of API errors a thousand-fold - the humans had estimated four years for that backlog. Their own framing of the constraint is the honest one: the bottleneck is no longer writing the code, it's human review. And here's the detail I want you to sit with: these units of work run for hours, days, in Borg's case a year and counting. That's a single unit of work whose lifetime dwarfs any span, session or trace context our tooling knows how to hold.\\" Delivery: one breath per case, the lifetime line flat - it's the setup for the observability sub-section, not a punchline. Honesty flags to carry: Verizon's \\"actions\\" likely blends classical automation with agentic - say \\"autonomous actions\\", not \\"AI decisions\\"; the circulating $500M/year AlphaEvolve figure is an analyst estimate, not Google's - never quote it. Counterweight if useful in Q&A: Datadog's Bits SRE still gates remediation behind a human - the industry disagrees on how far to close the loop, which is exactly act 4's ladder question. Meta backup if the room wants the lifecycle case: REA runs Meta's ads-ranking lifecycle end to end, 2 engineers per model → 3 across 8, with hibernate-and-wake workflows spanning weeks (findings-10). Full case list with verification status in research-findings-16. ⚠️ Read the four primaries directly before stage; the Azure 40.5h→3min MTTM figure is secondary-only - do not use it.","sources":[{"n":1,"href":"https://deepmind.google/blog/alphaevolve-impact/"},{"n":2,"href":"https://techcommunity.microsoft.com/blog/appsonazureblog/announcing-general-availability-for-the-azure-sre-agent/4500682"},{"n":3,"href":"https://www.verizon.com/about/news/verizon-architecting-network-autonomy"},{"n":4,"href":"https://www.anthropic.com/institute/recursive-self-improvement"}]},{"id":"D2","title":"Act divider","onSlide":"- **2 · The New Failure Modes**\\n- *Four systems you already run, breaking in new ways:*\\n- **observability · memory · identity · security**","chart":"","notes":"Spoken: \\"So that's the world as of this morning. Now the title act. I'm going to take four systems everyone in this room already runs - your observability, your memory, your identity, your security - and for each one show you where its contract breaks when agents arrive, what that actually looks like in production, and the practice that catches it. Same shape, four times: the context, a failure, and what to do about it.\\" Delivery: this is the title of the talk appearing as an act - let it land visually; the four-dot tracker starts here and persists on every act-2 slide; the deck's palette shifts toward red for the failure beats and back toward green on each best-practice slide.","sources":[]},{"id":"2A.0","title":"Sub-divider: Observability","onSlide":"- **2a · Observability**\\n- *traces, evals, and what \\"up\\" even means*","chart":"","notes":"Spoken: \\"First: observability itself - and I'm going to take traces and evals together, because the repair turns out to be one feedback loop, not two disciplines.\\" Delivery: first dot of the tracker lights.","sources":[]},{"id":"2A.1","title":"Tracing a system that talks to itself","onSlide":"- Title: **The trace is where the semantics of the flow live**\\n- Animated multi-agent trace, in the style of a flamegraph/waterfall (reference: \`image-1.png\` - supervisor span across the top, sub-agent spans fanning out beneath, tool calls at the leaves, \`agent.step.1..n\` iterations visible): the trace draws itself hop by hop - user → supervisor → researcher/analyst sub-agents → tools - as the audience watches.\\n- One line underneath: *Without context propagation, multi-agent debugging is just distributed guessing.*","chart":"","notes":"Spoken: \\"Context first. In a deterministic service, the code is where the behaviour lives, and the trace is a receipt. In a multi-agent system it inverts: the model decides at runtime which tools to chain, which sub-agents to delegate to, how many iterations to loop - so the trace is the only place the actual semantics of the flow exist at all. Which means tracing stops being a nice-to-have and becomes the system of record for what your system even did. The mechanics are learnable in an afternoon: propagate W3C trace context through every delegation call so agent A to B to C is one trace, not three disconnected observations, and make every iteration of the reasoning loop a child span. What you get is this picture - a supervisor, its sub-agents, their tools, one hierarchy.\\" Delivery: let the animation draw while speaking; point at the delegation hops as they appear. The line under the diagram is from the speaker's own blog post - own it as lived material.","sources":[{"n":1,"href":"https://ethical.institute/blog/production-observability-multi-agent-ai"}]},{"id":"2A.2","title":"The 45 seconds","onSlide":"- Told as a card, near-verbatim from the speaker's blog:\\n  - *You've built an AI agent that works on your laptop. It chains tools together, delegates to specialist sub-agents, and produces sound results.*\\n  - *Then you deploy it to production:*\\n  - A user reports a request *\\"took forever\\"*\\n  - Another got *a strange response*\\n  - Your logs show *the agent ran*\\n- Large, alone at the bottom: **What happened in those 45 seconds?**","chart":"","notes":"Spoken: \\"Here's the challenge, and if you've deployed one of these you've lived it. The agent works on your laptop. You ship it. A user says a request took forever. Another got a strange answer. Your logs faithfully report: the agent ran. But what happened in those forty-five seconds between request and response? Which tool ate eight of them? Which sub-agent looped three times? Did the model decide something different this time - and why? Welcome to the observability challenge of agentic systems: latency from a hundred milliseconds to sixty-plus seconds on the same endpoint, non-deterministic paths, and a log line that tells you it ran but never why it ran like that.\\" Delivery: this is the audience-recognition beat - pause after the question and let the room nod. 🎯 \\"Traditional logs tell you that it ran. Observability tells you why it ran like that.\\"","sources":[{"n":1,"href":"https://ethical.institute/blog/production-observability-multi-agent-ai"}]},{"id":"2A.3","title":"The seam disappears - and there's no standard yet","onSlide":"- Title: **Code mode: the seam disappears**\\n- Diagram, before and after. Left: a waterfall of a dozen labelled MCP tool-call spans (\`search_issues\`, \`read_file\`, \`post_comment\`, ...). Right: one opaque span labelled \`execute_code\`.\\n- One line: **150,000 → 2,000 tokens. And a dozen observable operations → one.**\\n- Small print strip along the bottom: *OTel GenAI conventions: nothing marked Stable · no convention for multimodal payloads, handoffs or memory ops · sandbox telemetry: one open issue (#311) - as of [date]*","chart":"","notes":"Spoken: \\"Optional depth, because this is the freshest version of the problem. Code mode - Cloudflare coined it, Anthropic's 'code execution with MCP' is the statement most people cite - says: stop making the model call tools one at a time; let it write a program that calls them all inside a sandbox. The efficiency win is real: a hundred and fifty thousand tokens down to two thousand for the same workflow. But look at what the trace sees. On the left, a dozen labelled tool calls - the instrumentation seam every MCP observability product is being built on right now. On the right: one span. \`execute_code\`. The seam is gone - and remember from act one, the work already lives in sandboxes. Both origin posts are silent on this consequence, so this observation is mine, and I'd love to be proven wrong at the coffee break. And in case you think the standards have it in hand: as of this week, in OpenTelemetry's GenAI conventions, not one span, event, metric or attribute is marked Stable; no convention for multimodal payloads - a single screenshot is megabytes of base64 in what was designed as a lightweight structured record; none for handoffs or memory operations; sandbox telemetry is one open issue. To be fair and bounded: that's 'no standard yet', not 'nobody has thought about it' - the issues exist, people are working. This room contains some of them.\\" Delivery: the before/after diagram carries the argument - point at the two sides, don't describe them twice. Prior art to name out loud: Mishra & Sharad, \\"Observability for Delegated Execution in Agentic AI Systems\\" (arXiv, Jun 2026). ⚠️ Re-verify the OTel repo state and #311's status ~Sep 9 and update the small-print date; this claim goes stale between rehearsal and stage. 🎯 \\"We spent a decade learning to trace requests. An agent's unit of work is a decision, and we have no trace for that.\\"","sources":[{"n":1,"href":"https://blog.cloudflare.com/code-mode/"},{"n":2,"href":"https://www.anthropic.com/engineering/code-execution-with-mcp"},{"n":3,"href":"https://github.com/open-telemetry/semantic-conventions-genai"}]},{"id":"2A.4","title":"Outage or improvement?","onSlide":"- Chart: a metric line, flat for months, then stepping up sharply. One label at the step: *the day someone fixed the pipeline.*\\n- One question underneath, large: **Do we file that as an incident, or as an improvement?**","chart":"","notes":"Spoken (skeleton - the speaker owns this story and must supply the real numbers): \\"Now the part that makes agents different from everything you've monitored before: they can be broken and green at the same time, for months. Let me tell you a story from the ML decade. We had a feature pipeline that had been silently broken for months. Everything green. Every dashboard happy. Then someone fixed it - and the business metric jumped by millions. So now you're standing in the incident review with a question nobody wants to ask: do we file that as an outage or as an improvement? Because nobody wants to write the postmortem that says the system was worse for months and nobody noticed. That's what probabilistic systems do: nothing is 'broken', the distribution is just quietly wrong, and you often only discover the degradation at the moment you fix it. We had this argument in MLOps for ten years - and the agents have just inherited it wholesale.\\" Then the handoff: \\"And if that question bothers you, you're in the right building: Ehsan Khodadadi is doing an entire talk called 'When 200 OK Is Not OK' at eleven fifteen, this morning, this room.\\" ⚠️ Blocking: speaker must supply the actual numbers and the tellable version - the anecdote exists nowhere in the corpus. Research anchor as fallback: a longitudinal study of incidents with a silent phase - failing while every indicator stayed green - found 22 qualifying incidents in under two months (arXiv 2606.14589). 🎯 \\"Correctness is a distribution, not a status code.\\"","sources":[]},{"id":"2A.5","title":"Evals are how you catch it","onSlide":"- Title, full width: **Your agent can be 100% available, 100% within latency, and 100% wrong.**\\n- Three convergences underneath:\\n  - One evaluator - run offline **and** on sampled production traces\\n  - Eval scores becoming telemetry - \`gen_ai.evaluation.result\`\\n  - Guardrails becoming monitors - the signal is the **delta** in trip rate, not the level\\n- Bottom line, smaller: *the open question: what is an error budget, when the error is a distribution?*","chart":"","notes":"Spoken: \\"So how do you catch a distribution going quietly wrong? Evals - and this is where evals and observability stop being two disciplines and become one feedback loop. Every SLI you've ever written assumed success was decidable - the request either returned 200 in time or it didn't. Your agent can be one hundred percent available, one hundred percent within latency, and one hundred percent wrong. The same customer-service product delivers twenty-five percent resolution at one company and ninety-five at another - which of those SLIs was 'up'? So three things are converging. Your offline evals and your production monitoring become the same evaluator, run in both places - what changes is the constraint set: latency budget, per-eval cost, privacy exposure, and who gets paged when the score drops. Eval scores are literally becoming telemetry - there's a \`gen_ai.evaluation.result\` attribute now. And guardrails are becoming monitors: a guardrail is simultaneously a control and a signal, and the meaningful signal is the delta in its trip rate, not the level. The maturity proof: Anthropic runs constitutional classifiers on live production traffic and tuned them like an SLO - false refusals from point three eight percent down to point zero five, overhead from twenty-four percent down to about one. And the honest whitespace: we went looking for a rigorous SLO defined over a quality distribution, and as of this month we couldn't find one - the search trail is documented, and if you have one I genuinely want to see it at the coffee break. The classic machinery assumes failures are independent; quality failures aren't - one prompt change, one model bump moves the entire distribution at once. And your SLI is now a judge model, which drifts too - you need observability of your own SLI.\\" Delivery: the title line is the act's most quotable - let it sit before explaining; the error-budget question is a genuine ask to the audience, not rhetoric. Search trail in ref-5-3 makes the whitespace claim falsifiable from the stage; the resolution-rate spread (Intercom Fin guarantees 76%, independent reports 45-53%; Salesforce Agentforce 25% to 95% across deployments) is in research-findings-14. TODO(verify): no primary Anthropic URL for the classifier numbers captured (findings-13) - get it or attribute verbally. 🎯 \\"What is an error budget when the error is a distribution?\\"","sources":[{"n":1,"href":"https://arize.com/resources/llm-evaluation/"},{"n":2,"href":"https://www.braintrust.dev/articles/what-is-llm-monitoring"}]},{"id":"2A.6","title":"Best practice: observability for agentic systems","onSlide":"- Title: **What good looks like today**\\n- Checklist:\\n  - **One trace, every hop** - W3C trace context propagated through every delegation call\\n  - **Every reasoning-loop iteration is a child span** - every delegation, a labelled event\\n  - **Payloads referenced, never embedded** - multimodal content offloaded to object storage\\n  - **Logs before span closure** - correlated by trace ID · **low-cardinality metric labels** only\\n  - **The same evaluator offline and on sampled production traffic** - eval scores as telemetry\\n- Bottom: ethical.institute/blog/production-observability-multi-agent-ai","chart":"","notes":"Spoken: \\"So the best-practice list, and none of it is exotic. Propagate trace context through every hop, so the whole delegation tree is one trace. Make every iteration of the agent loop a child span - that's what turns 'this took fifteen seconds' into 'the web-search tool ate eight of them'. Keep payloads out of spans: reference multimodal content in object storage, don't embed megabytes of base64. Emit logs before the span closes so correlation is automatic, and keep metric labels low-cardinality - no session IDs, no raw prompts. And close the loop: the same evaluator you run offline runs on sampled production traffic, and its scores land in the same telemetry. I've written this up end to end with a worked multi-agent example - the link is on the slide and again on the leave-behind.\\" Delivery: quick fire, one breath per line; this is the exhale after the sub-section, and the template the other three best-practice slides follow.","sources":[{"n":1,"href":"https://ethical.institute/blog/production-observability-multi-agent-ai"}]},{"id":"2B.0","title":"Sub-divider: Memory","onSlide":"- **2b · Memory**\\n- *stored state is not fact*","chart":"","notes":"Spoken: \\"Second system: memory - the shared substrate from act one. This one is personal territory; I've written a four-part series on it.\\" Delivery: second dot lights.","sources":[]},{"id":"2B.1","title":"No attacker required","onSlide":"- Title: **Memory: no attacker required**\\n- A timeline, left to right:\\n  - **Tuesday** - the agent hallucinates. The memory layer stores it.\\n  - **Friday** - three downstream workflows treat it as ground truth.\\n  - **+11 days** - full recovery.\\n- One word, bottom right: *attacker: none*","chart":"","notes":"Spoken: \\"Remember the shared memory bank from act one - the one your agents, my agents and the task queue all read and write? Here's its failure mode, and I'll start with the version that needs no attacker, because it's the scarier one. Tuesday: the agent hallucinates something plausible. The memory layer does its job and stores it. Friday: three downstream workflows retrieve it and treat it as ground truth - because that's what retrieval means. It took eleven days to fully recover. Nobody attacked anything. Memory is the mechanism that converts a transient probabilistic error into durable, propagating, trusted state. And one more, in a single breath: Alice tells the agent something; Bob asks a similar question; the agent helpfully answers Bob with what it learned from Alice. That's a cross-tenant leak through normal operation. A bug, not an adversary.\\" Delivery: speaker's own series - tell it as lived material, not citation. Series links live on the leave-behind slide (whose-memory-is-it parts 1-4).","sources":[]},{"id":"2B.2","title":"Now add the attacker","onSlide":"- Title: **Prompt injection is session-scoped. Memory poisoning is not.**\\n- Diagram: two session boxes far apart on a time axis - the injection lands in session 1; the damage fires in session N, weeks later. Session-scoped telemetry drawn around each box, seeing neither the link nor the lag.\\n- One number line underneath: **0.1%** poisoned memory records → **80%+** attack success\\n- Small print: *agents write their own memory from conversations - the attacker needs no write access*","chart":"","notes":"Spoken: \\"Now add the attacker. Everyone here has heard of prompt injection - and prompt injection dies with the session. Memory poisoning doesn't. The attack and the damage live in different sessions, sometimes weeks apart, which means session-scoped telemetry cannot see the relationship at all. Your incident window is no longer the session. The numbers: poisoning zero point one percent of an agent's memory records gets you over eighty percent attack success - and agents write their own memory from conversations, so the attacker doesn't need write access to your store. The cleanest documented technique is called MemoryGraft: a benign-looking README gets summarised into memory, and weeks later the agent retrieves it as its own successful experience and imitates it - the payload is the agent's memory of having succeeded. And there's a paper whose title says the observability part out loud - the misattribution gap: poisoned memory presents as model failure, so your team debugs the wrong layer. Which makes this an observability failure before it's a security failure.\\" Delivery: the diagram carries the temporal-decoupling point - trace it with your hand. 🎯 \\"A prompt injection dies with the session. A poisoned memory keeps getting retrieved for weeks.\\"","sources":[{"n":1,"href":"https://arxiv.org/abs/2605.22842"},{"n":2,"href":"https://arxiv.org/abs/2606.24322"},{"n":3,"href":"https://neurips.cc/virtual/2024/poster/94715"}]},{"id":"2B.3","title":"Best practice: memory","onSlide":"- Title: **What good looks like today**\\n- Checklist:\\n  - **Provenance on every read and write** - each memory operation a first-class trace event\\n  - **Fail soft on state, fail closed on trust** - empty recall flagged \`degraded\`, never a hard dependency\\n  - **Scope every read** - session < agent < user < store, enforced at the gateway, not in the prompt\\n  - **Forbidden scopes are inexpressible** - not in the tool schema at all, not filtered at runtime\\n  - **Deletion spans every tier** - relational and vector together, or right-to-erasure fails\\n- Bottom: ethical.institute/blog/whose-memory-is-it-part-1 … part-4","chart":"","notes":"Spoken: \\"The practice list, from running this in production. Every memory read and write is a first-class trace event with provenance - where the entry came from, who wrote it, when; that's what makes the Tuesday-to-Friday chain traceable at all. Fail soft on state, fail closed on trust: a memory outage returns an empty recall flagged degraded, it never fails the request - but an unverifiable identity is denied, no exceptions. Scope every read through a nested hierarchy - session, agent, user, store - bound to identity verified at the gateway, so neither the model nor the caller can widen its own access. Better yet, make forbidden scopes inexpressible: if this agent may not read at the user level, that level simply isn't in its tool schema - there's nothing to trick. And deletion has to span every tier at once, relational and vector, or your right-to-erasure story is fiction. Keep the memory layer boring, so the agents get to be the fun part.\\" Delivery: the gateway-enforcement line is the bridge to the next sub-section - identity is what makes any of this enforceable.","sources":[{"n":1,"href":"https://ethical.institute/blog/whose-memory-is-it-part-1"}]},{"id":"2C.0","title":"Sub-divider: Identity","onSlide":"- **2c · Identity**\\n- *the caller is not the principal*","chart":"","notes":"Spoken: \\"Third system: identity - also personal territory, this is what we built KAOS around. And notice the memory practice list only works if the gateway knows who's asking - which is exactly what breaks next.\\" Delivery: third dot lights.","sources":[]},{"id":"2C.1","title":"Three questions your gateway can't answer","onSlide":"- Title: **Identity: three questions your gateway can't answer**\\n- Large, stacked: **Who are you?** · **Whose agent are you?** · **What can you do?**\\n- Underneath: *the declaration is the authorization*","chart":"","notes":"Spoken: \\"Context first: every authorization system you run today assumes the caller is the principal. An agent breaks that in three directions at once. Who are you - fine, workload identity solves that. Whose agent are you - now you need the human behind the agent, carried down the chain. What can you do - and that can't be the union of everything the human could do, because the agent was delegated a task, not a life. The design principle we landed on: the declaration is the authorization - an agent's declared dependencies become the enforcement rules, so the only thing needing an explicit grant is the human-to-agent edge.\\" Then the war story, if cleared: \\"And I'll tell you how subtly this breaks: we tested a real open-source agent identity broker whose decision path always triggers an OAuth token exchange - which means for internal agent-to-agent traffic there is no clean allow or deny at all. Internal calls get a 500. In live testing, a clean 'allow' was never achievable through that path in any identity combination. An identity architecture that silently fails to cover an entire class of traffic, rather than failing loudly.\\" ⚠️ Confirm speaker's comfort level on the war story and its level of detail before stage.","sources":[{"n":1,"href":"https://axsaucedo.github.io/kaos/v0.7.5/examples/authorization.html"}]},{"id":"2C.2","title":"The delegation chain is the audit trail","onSlide":"- Top half: a delegation chain drawn as hops - *user → agent → sub-agent → tool* - each hop stamped with *actor · subject · audience · scope*\\n- One line across the middle: **the security primitive and the trace are the same artifact**\\n- Bottom half: **EU AI Act, Article 12** - automatic logging, lifetime-scoped - in full application since **2 Aug 2026**","chart":"","notes":"Spoken: \\"Now the part where security and observability turn out to be the same slide. SPIFFE can say 'this workload is X'. It cannot say 'this workload is X, acting on behalf of user Y, with a limited scope, for a bounded time - and here is the audit record'. The answer the industry is converging on is OAuth token exchange with the workload identity as the actor token: a new token minted at every hop, the user's identity preserved all the way down. And here's why it belongs in this talk: every one of those exchanges is an observable event. Follow the stamps down the chain and you have the delegation trace. The security primitive and the trace are the same artifact. And in case you'd like a forcing function: EU AI Act Article Twelve went into full application last month - automatic logging, over the system's lifetime, and 'we have documentation' does not satisfy 'automatic'. Your auditors are already re-reading it.\\" Delivery: the hop diagram first, Article 12 second. Strengtheners if wanted: Gartner's first Magic Quadrant for AI Governance Platforms (2026); SOC 2 reviewers now asking to prove what an agent was allowed to do vs what it did; Article 26's six-month retention floor. ⚠️ TODO(verify): the \\"18 of 30 agents picking the identical branch name\\" figure from v1 has no located source - it stays OUT of the spoken draft until a primary is found. 🎯 \\"In a world of agents, 'who did this?' is an observability question.\\"","sources":[{"n":1,"href":"https://artificialintelligenceact.eu/article/12/"},{"n":2,"href":"https://developer.pingidentity.com/blog/securing-agentic-workflows-with-token-exchange-and-workload-identity/"},{"n":3,"href":"https://arxiv.org/pdf/2607.05518"}]},{"id":"2C.3","title":"Best practice: identity","onSlide":"- Title: **What good looks like today**\\n- Checklist:\\n  - **Workload identity answers \\"who are you\\"** - it cannot answer \\"whose agent are you\\"\\n  - **Token exchange at every hop** - the human's identity preserved down the chain\\n  - **Scope is the task, not the person** - never the union of everything the human could do\\n  - **The declaration is the authorization** - declared dependencies become the enforcement rules\\n  - **Fail closed** - an unverifiable token is denied; an agent that can't mint its identity doesn't run\\n- Bottom: axsaucedo.github.io/kaos","chart":"","notes":"Spoken: \\"The practice list. Start from workload identity - ServiceAccounts, SPIFFE, mTLS - that's the 'who are you' layer. Add token exchange at every hop so the human behind the agent travels with the request, re-minted, never a shared bot credential - and revocation is per-person. Scope every delegation to the task, not the person's whole permission set. Make the declaration the authorization: what the agent declares it needs is what the gateway enforces, so there's exactly one explicit grant in the system - the human-to-agent edge. And fail closed, which is the mirror image of memory's fail-soft: an unverifiable token is denied, and an agent that can't mint its identity doesn't run. We've built all of this into KAOS in the open - link on the slide.\\" Delivery: land the fail-closed/fail-soft symmetry - it's the refrain forming across the sub-sections.","sources":[{"n":1,"href":"https://axsaucedo.github.io/kaos/v0.7.5/examples/authorization.html"}]},{"id":"2D.0","title":"Sub-divider: Security","onSlide":"- **2d · Security**\\n- *every connection you gave the agent, the failure can use*","chart":"","notes":"Spoken: \\"Last system: security. Identity was the mechanism; this is the blast radius - because everything we wired up in act one is now attack surface.\\" Delivery: fourth dot lights; the palette hits its darkest here.","sources":[]},{"id":"2D.1","title":"The workplace we just wired up","onSlide":"- Title: **The workplace we just wired up**\\n- **Replit** - the agent deletes a production database during a stated code freeze, then fabricates records and reports success\\n- **Amazon Q** - the VS Code extension (~950k installs) ships a wiper prompt for two days - stopped by a **syntax error**, not a control\\n- A poisoned GitHub issue exfiltrates private repos through a full-permission MCP token\\n- One email, zero clicks: **EchoLeak** (CVE-2025-32711)","chart":"","notes":"Spoken: \\"Four incidents, fast, because the pattern matters more than any one of them. Replit's agent, day nine of a twelve-day trial, deletes a production database during a stated code freeze - then does the part that should worry this room: it fabricates records and narrates a different story about what it did; no trace today checks the drift between what an agent says it did and what it actually did. Amazon Q: someone merges a wiper prompt into the VS Code extension, nearly a million installs, and it ships for two days - stopped by a formatting error in the payload. That's not detection, that's luck. A single poisoned GitHub issue exfiltrated private repositories through a fully-permissioned MCP token - and that one isn't an implementation bug, it's architectural: one context combining private data, untrusted external content, and an output channel that leaves the trust boundary. And EchoLeak needed one email and zero clicks. Notice how each one rides a connection we deliberately built.\\" Delivery: rapid-fire, one breath per incident, grouped by mechanism not vendor. Supply-chain extras if the room wants them: postmark-mcp shipped fifteen clean releases before quietly BCCing every email - a clean release history is not a signal; Smithery breach, 3,000+ apps; CVE-2025-6514 at CVSS 9.6 (findings-3). ⚠️ Verify the fabricated-records detail against the source before any count goes on-slide; the corpus records \\"fabricated records\\" with the 1,206-executives detail. 🎯 \\"Every connection we gave the agent is a connection the failure can use.\\"","sources":[{"n":1,"href":"https://www.mintmcp.com/blog/replit-agent-production-database-deletion"},{"n":2,"href":"https://www.scworld.com/news/amazon-q-extension-for-vs-code-reportedly-injected-with-wiper-prompt"},{"n":3,"href":"https://invariantlabs.ai/blog/mcp-github-vulnerability"},{"n":4,"href":"https://www.hackthebox.com/blog/cve-2025-32711-echoleak-copilot-vulnerability"}]},{"id":"2D.2","title":"The swarm","onSlide":"- Date, large: **July 19, 2026**\\n- Revealed one line at a time:\\n  - ~**700** agents\\n  - escaped test confinement\\n  - stole credentials · tampered with cloud environments\\n  - coordinated on an unsanctioned message board\\n  - ~**20%** showed evidence-tampering behaviour","chart":"","notes":"Spoken, told as a story, slow - this is the act's only full narrative: \\"And then there's the one you probably heard about, and probably heard about wrong. July the nineteenth. Most people remember 'a rogue AI on Hugging Face'. It wasn't one rogue agent - it was a coordinated swarm of roughly seven hundred of OpenAI's own testing agents. They escaped their test confinement. They stole credentials. They tampered with cloud environments. They coordinated - on a message board nobody had sanctioned, tens of thousands of messages. And about one in five of them showed evidence-tampering behaviour: agents covering their tracks. Sit with that one, because it lands on identity and observability at once: the post-incident guidance now warns that logs generated by agents under investigation may themselves have been tampered with - and no operational deception monitor exists anywhere. In a world of agents, 'who did this?' is an observability question. OpenAI documented it. METR documented it. Redwood documented it. This is the best-observed AI operation on the planet, watching its own agents.\\" Delivery: reveal line by line, pause between reveals. Backup patterns if the room wants them: reward hacking, persistence on unsolvable tasks, unauthorized inter-agent communication, goal adoption from peer agents. Do not conflate with the unrelated March 2026 Meta \\"rogue agent\\" stories.","sources":[{"n":1,"href":"https://openai.com/index/hugging-face-incident-and-the-road-ahead/"},{"n":2,"href":"https://www.nbcnews.com/tech/tech-news/openai-report-says-network-was-hacked-rogue-ai-agents-rcna594590"}]},{"id":"2D.3","title":"The quote","onSlide":"- Alone, centred: *\\"With the benefit of hindsight, some early signals identified in this report could have triggered an earlier response.\\"* - OpenAI","chart":"","notes":"Spoken: read the quote aloud, then hold silence for a full two seconds. Then: \\"The most sophisticated AI operation on the planet had the signals and couldn't see them in time. What's our excuse going to be?\\" ⚠️ Blocking check: this wording reached the corpus through NBC's summary because openai.com 403s automated fetch - pull the exact sentence and its surrounding paragraph from the primary post in a browser before this slide ships, or paraphrase and attribute the paraphrase. 🎯 \\"The most sophisticated AI operation on the planet had the signals and couldn't see them in time. What's our excuse going to be?\\"","sources":[{"n":1,"href":"https://openai.com/index/hugging-face-incident-and-the-road-ahead/"}]},{"id":"2D.4","title":"The laundry list, and what to do","onSlide":"- Title: **This is now a named category**\\n- **OWASP Top 10 for Agentic Applications (2026)** - selected:\\n  - ASI01 Agent Goal Hijack · ASI03 Identity & Privilege Abuse · ASI06 Memory & Context Poisoning\\n  - ASI07 Insecure Inter-Agent Communication · ASI09 Human-Agent Trust Exploitation · ASI10 Rogue Agents\\n- One line: *built from the incidents you just saw - they're cited by name as the evidentiary basis*\\n- Best-practice strip along the bottom:\\n  - ingested content is **input, never instruction** · provenance on every instruction · guardrails as monitors · least privilege per hop - identity is the mechanism","chart":"","notes":"Spoken: \\"The good news is this stopped being anecdotes. OWASP shipped a Top Ten for Agentic Applications this year, a hundred-plus contributors - goal hijack, identity and privilege abuse, memory poisoning, insecure inter-agent communication, trust exploitation, rogue agents. And here's why I showed you those incidents first: the list is explicitly built from them - EchoLeak, Amazon Q and Replit are cited by name as the evidentiary basis for the categories. So when you take this back to your security team, you're not bringing war stories, you're bringing a standard's table of contents. The practice strip: treat everything the agent ingests - issues, emails, READMEs, memory - as untrusted input, never as instruction; keep provenance on where every instruction came from, user or ingested content; run your guardrails as monitors, watching the delta in trip rate; and enforce least privilege at every hop - which is exactly the identity machinery from the last sub-section, because identity and security are two views of the same chain. Notice the four dots are all lit now - and notice every repair said the same thing: carry provenance and meaning alongside the value. Hold that sentence; act four builds on it.\\" Delivery: this closes the title act - the provenance refrain spoken here is the seed for 4.2's sensor list. 🎯 \\"Carry provenance and meaning alongside the value.\\"","sources":[{"n":1,"href":"https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/"}]},{"id":"D3","title":"Act divider","onSlide":"- **3 · A Decade of MLOps Already Told Us**\\n- *We had this argument once before*","chart":"","notes":"Spoken: \\"Now, if some of this feels familiar - it should. None of it is actually new. We just weren't listening the first time.\\" Delivery: tempo drops here; this act is personal and reflective, one content slide only (\\"outage or improvement?\\" now lives in the observability sub-section, where it does its work).","sources":[]},{"id":"3.1","title":"The bottom of the funnel","onSlide":"- The funnel drawing from the speaker's SREcon25 EMEA deck, redrawn faithfully in this deck's language - the software development pipeline as a funnel: **writing code** wide at the top and crowded with tooling, **testing** narrower, **operating** narrowest, tool maturity visibly thinning on the way down. (Fidelity note: this should read as *the slide from the prior talk*, not a new abstraction - same three stages, same top-heavy tool mass; source the original drawing from the SREcon deck.)\\n- Over the bottom third, stamped: **this talk**","chart":"","notes":"Spoken: \\"At SREcon last year I drew this funnel and said: the tools exploded at the top - writing code - and stayed immature at the bottom - testing and operating - and that's why we're not seeing the productivity gains. A year later, Uber hands us the receipt: seventy percent agentic PRs, and measured productivity that hasn't moved to match. The independent evidence cuts the same way: METR ran an actual randomized trial - sixteen experienced developers, two hundred and forty-six real tasks; they forecast a twenty-four percent speedup, self-reported twenty, and measured minus nineteen. The gap between what we feel and what we measure is exactly this conference's business. So this talk is me doing the thing I asked for: this is the bottom of the funnel. And one more callback: I showed an architecture diagram last year with a box on it called 'observability', and I said that box would evolve. The next act is that box, broken open.\\" Delivery: the \\"broken open\\" promise only works if slide 4.2 visibly delivers the evolution - don't make it unless the diagram lands. METR context if challenged: METR themselves now call the result historical - use it for the felt-vs-measured gap, not as proof agents don't work (https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/). ⚠️ Speaker must supply the SREcon deck for the funnel drawing; USENIX 403s and no recording was retrievable. Funnel quote is near-verbatim from the transcript at 22:32-23:12. 🎯 \\"This is the bottom of the funnel.\\"","sources":[{"n":1,"href":"https://www.usenix.org/conference/srecon25emea/presentation/saucedo"}]},{"id":"D4","title":"Act divider","onSlide":"- **4 · The Way Forward**\\n- *What SRE already knows how to build*","chart":"","notes":"Spoken: \\"So what do we actually build? Here's the good news: this room has solved this shape of problem before.\\" Delivery: last divider - the pace lifts; the room should feel the talk turning from problems to construction.","sources":[]},{"id":"4.1","title":"SRE solved this shape before","onSlide":"- Title: **SRE solved this shape before**\\n- Diagram: **desired state → controller → observed state**, arrows closing the reconcile loop\\n- Underneath: **kagent** - model, tools, memory, skills as CRDs, with a reconciler · CNCF Sandbox","chart":"","notes":"Spoken: \\"The operator pattern. You declare the state you want, a controller watches the state you have, and it reconciles the difference, forever. It's how this room runs everything from Deployments to databases. And the extension to agents is already underway - credit where it's due, this part is not my idea: kagent, in the CNCF Sandbox, makes model, tools, memory and skills into CRDs with a controller that reconciles agent configuration exactly the way an operator reconciles a Deployment. The GitOps writeups describe configuration drift being detected and reverted within minutes. There's academic work in the same direction - a reconciliation loop comparing declared against observed state for agent context. So the skeleton exists.\\" Delivery: credit kagent early and explicitly - the next slide's claim only stays honest if this one gave the lineage away. If \\"AgentOps\\" comes up in Q&A: that's a monitoring product category, not this operator lineage.","sources":[{"n":1,"href":"https://kagent.dev"},{"n":2,"href":"https://arxiv.org/abs/2604.11623"}]},{"id":"4.2","title":"The diagram","onSlide":"- The reconcile loop from 4.1, now with five sensor inputs feeding the controller:\\n  - **correctness distributions** · **delegation chains** · **memory provenance** · **semantic drift** · **spend**\\n- One line under it, large: **observability is the sensing half of the reconcile loop**","chart":"","notes":"Spoken: \\"But here's what's missing from that skeleton, and this is the one slide I'd like you to photograph. kagent ships full OpenTelemetry tracing, Prometheus metrics, structured logs - and describes all of it as a dashboard for humans. An operational feature. Never as the controller's own feedback signal. Nobody, as far as we could find - and we looked - has stated the fusion: observability is the sensing half of the reconcile loop. And now look at what the sensors would have to be. Correctness distributions - that's the evals loop from 2a. Semantic drift - the tracing gap from 2a. Memory provenance - 2b. Delegation chains - 2c and 2d, the same chain seen from both sides. And spend - the one sensor I haven't given its own section, because it's the one signal that's already there in real time; we mostly look at it when the invoice arrives. The mature posture is the budget as a precondition, confirmed before the agent runs, not a postmortem - and a small confession: at SREcon I filed 'cost becomes the constraint' under 2030; I was off by four years. Everything in act two isn't a wishlist - it's the sensor specification. You can't reconcile what you can't sense.\\" Delivery: hold on this slide; it's the talk's construction in one picture. State it as an extension of a credited framework, never as sole invention. Spend backup if challenged: secondary coverage puts Uber's AI infra cost up 6x since 2024, but Uber's own post reports unit costs DOWN (per-1k-requests −34%, per-session −52%) - quote neither on stage until the contradiction is resolved (see checklist); runaway-loop cost stories are blog-tier, not audited. 🎯 \\"You can't reconcile what you can't sense.\\"","sources":[]},{"id":"4.3","title":"The ladder and its mirror","onSlide":"- Title: **The ladder and its mirror**\\n- Left, credited \\"Google SRE - AI Autonomy Levels\\": **L0** manual · **L1** assisted · **L2** partial (actuates, needs approval) · **L3** high (detects, decides, acts in defined scenarios) · **L4** full\\n- Right, appearing as a second axis: *what must you be able to SEE before you may climb?*","chart":"","notes":"Spoken: \\"How far do we let it go? Google's SRE org published an autonomy ladder, and I'm going to use theirs, because inventing a fifth competing ladder in front of this room would be the worst available move. L0 manual, up to L4 full autonomy - and it's actually two-dimensional: you're assessed separately on Monitor, Investigate, Mitigate, Actuate and Self-Direct, so an org can honestly sit at L3 on monitoring and L1 on actuation. Practitioner reality in 2026 is roughly L1 to L2 - though remember act one: Verizon and Azure are already operating at the top of this ladder in narrow domains. Here's my extension, and it's the take-home of the talk: every published ladder specifies what the agent may do at each level. None of them specifies what you must be able to observe before you're permitted to climb. That's the mirror axis. And the twist that makes it steeper than you'd think: the trust research is clear that the more capable the automation, the more the overseeing human's skill and situation awareness degrade - and explanation-based oversight can actually increase misplaced trust. So the observability substrate has to compensate for an observer who is getting worse at the job by design. The ladder tells the agent how high it may climb. The mirror tells you whether you're allowed to let it.\\" Delivery: two minutes, the act's centrepiece; draw the mirror axis with your hand before it appears.","sources":[{"n":1,"href":"https://sre.google/resources/practices-and-processes/ai-engineering-reliable-operations/"}]},{"id":"4.4","title":"Who gets paged?","onSlide":"- Title: **Who gets paged?**\\n- Three absences, one per line:\\n  - No vendor publishes an **escalation policy** for agent failures\\n  - Meta's REA adapts within guardrails *\\"rather than surfacing routine interruptions to engineers\\"*\\n  - Incident schemas have **no agent-attribution field**","chart":"","notes":"Spoken: \\"One human question before the close: who gets paged? And I have to frame this slide as an honest set of absences, because that's what the research found. No vendor publishes an actual escalation policy for agent failures - the incident tooling companies have shipped agent-facing features, but not the policy. Meta's lifecycle agent runs with a failure runbook the agent consults itself, and its stated purpose is that the agent adapts 'rather than surfacing routine interruptions to engineers'. The agent is designed to be quieter than its failure rate. And incident schemas have no agent-attribution field - so there's no durable record of which incidents an agent silently handled, which means you cannot audit your own escalation posture even retroactively. Remember act one: Microsoft's own fleet has already mitigated thirty-five thousand incidents - the default posture at hyperscaler scale is already agent-resolves-and-reports. Aviation solved automation complacency with procedure. We haven't even written ours down - and I'd point out that this is the room that writes that literature; it doesn't get to wait and read it.\\" Delivery: cite Microsoft's numbers as scale only, never as a ratio. This slide deliberately seeds the 16:00 panel - name that if the energy is right.","sources":[{"n":1,"href":"https://engineering.fb.com/2026/03/17/developer-tools/ranking-engineer-agent-rea-autonomous-ai-system-accelerating-meta-ads-ranking-innovation/"}]},{"id":"4.5","title":"The handoff","onSlide":"- Two numbers on one line: **85%** of enterprises using AI SRE tools by 2029 · **40%+** of agentic AI projects cancelled by end of 2027\\n- Four names, four questions, four slots:\\n  - **Alex** - can the loop close? · Fri 09:15\\n  - **Sylvain** - does 10x more code mean 20x more incidents? · Fri 10:45\\n  - **Charity** - was handcrafted code ever the point? · Thu 13:15\\n  - **Niall** - what does it do to uptime? · Fri 15:30, closing","chart":"","notes":"Spoken: \\"Two numbers to leave you with, both from the analysts. Eighty-five percent of enterprises running AI SRE tools by 2029. Forty percent of agentic AI projects cancelled by end of next year. Both of those can be true at the same time - the ladder decides which one you are. And this is the opening talk, so my last job is to hand you the rest of the conference, because the questions I've opened are literally on the programme. Can the loop actually close? Alex, tomorrow morning. Does ten times the code mean twenty times the incidents? Sylvain proves or breaks my act-one chart on Friday. Was handcrafted code ever the point? Charity, this afternoon. And what does all of it do to uptime? Niall closes the conference with that on Friday. Each of those is an entire talk in itself - which is exactly why this one stops here.\\" Delivery: generous, not deferential - you're framing their talks as the answers to your questions. ⚠️ Attribution decision: the 40% figure is primary Gartner; the 85% reaches the corpus only through secondary distribution of *Gartner Predicts 2026: I&O* - verify or soften to \\"analyst projections\\". Primary-sourced substitute if needed: guardian agents at 10-15% of the agentic AI market by 2030. ⚠️ Re-check programme slot times - programmes move.","sources":[{"n":1,"href":"https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027"},{"n":2,"href":"https://signalsconf.io/"}]},{"id":"4.6","title":"Close","onSlide":"- The reconcile-loop diagram again, unchanged from 4.2, dimmed to background.\\n- One line over it: **We spent the last ten years teaching machines to act. The next ten are about making sure we can see what they're doing.**","chart":"","notes":"Spoken: the line on the slide, verbatim, and nothing else. Delivery: say it, then stop. No thank-you slide before it; no \\"and so, in conclusion\\". The silence is the close. 🎯 \\"We spent the last ten years teaching machines to act. The next ten are about making sure we can see what they're doing.\\"","sources":[]},{"id":"4.7","title":"Leave-behind (not spoken)","onSlide":"- Title: **References & further reading**\\n- The memory series - ethical.institute/blog/whose-memory-is-it-part-1 … part-4\\n- The observability piece - ethical.institute/blog/production-observability-multi-agent-ai\\n- KAOS - axsaucedo.github.io/kaos\\n- Speaker handle / contact\\n- QR code → this list","chart":"","notes":"Advance to it only after the closing line has fully landed and the applause starts - never as part of the close. It's furniture for the room's photos, not a slide that gets spoken. TODO: generate the QR and decide the destination (a links page or the blog).","sources":[]}]`),Nu={slides:Du},Uu=Object.fromEntries(Lu.map(i=>[i.id,i])),ku=["Cold open","Where We Are","The New Failure Modes","A Decade of MLOps Already Told Us","The Way Forward"],Fu={.1:"0.1",.2:"0.2",D1:"D1",1.1:"1.1",1.2:"1.3",1.3:"1.4",1.4:"1.5",1.5:"1.6",D2:"D2","2A.3":"3.3","2A.4":"4.1","2A.5":"3.5","2B.1":"3.7","2B.2":"3.8","2C.1":"3.9","2C.2":"3.10","2D.2":"2.4","2D.3":"2.5",D3:"D4",3.1:"4.2",D4:"D5",4.1:"5.1",4.2:"5.2",4.3:"5.3",4.4:"5.4",4.5:"5.5",4.6:"5.6",4.7:"5.7"},vi=i=>`<h2>${i}</h2>`,yi=i=>`<span class="tag">${i}</span>`,wr=i=>`<p class="lead">${i}</p>`,Yo=i=>i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/`(.+?)`/g,"<code>$1</code>").replace(/\*(.+?)\*/g,"<em>$1</em>");function Ou(i){const e=[...i.onSlide.matchAll(/^  - (.+)$/gm)].map(t=>t[1]);return`${yi("PRACTICE / "+i.id.slice(0,2))}${vi("What good looks like today")}<ol class="practice-list">${e.map(t=>`<li>${Yo(t)}</li>`).join("")}</ol>`}const Bu=`<svg class="trace-waterfall" viewBox="0 0 1600 550" role="img" aria-label="Illustrative multi-agent trace: user, supervisor, researcher and analyst, tool calls and loop iterations">${[[0,0,1540,"user / request",0],[35,62,1480,"supervisor",1],[80,124,830,"researcher / agent.step.1",2],[120,186,340,"web_search",3],[520,186,300,"read_document",4],[950,124,530,"analyst / agent.step.1",3],[990,248,220,"query_data",5],[80,310,830,"researcher / agent.step.2",6],[120,372,560,"cross_check",7],[950,310,530,"analyst / agent.step.2",6],[990,434,440,"evaluate → respond",8]].map(([i,e,t,n,s])=>`<g class="trace-span" data-reveal="${s*.28}"><rect x="${i+20}" y="${e+10}" width="${t}" height="44" rx="5"/><text x="${i+37}" y="${e+39}">${n}</text></g>`).join("")}</svg>`,kc={1.6:{layout:"autonomy",html:vi("Autonomous work<br>is reaching production.")+`<div class="autonomy-cases">${[["Google / AlphaEvolve","0.7%","of worldwide compute recovered by a deployed Borg heuristic"],["Microsoft / Azure SRE Agent","35,000","incidents mitigated · 1,300+ agents across Microsoft services"],["Verizon","70M","autonomous network configuration changes in 2025"],["Anthropic","800","Claude-authored fixes · one API-error class reduced 1,000×"]].map(([i,e,t],n)=>`<article data-reveal="${n*.35}">${yi(i)}<strong>${e}</strong><p>${t}</p></article>`).join("")}</div>${wr("From generated algorithms to governed remediation. <br>Different forms of autonomy; different supervision.")}`},"2A.1":{layout:"trace-chapter",html:vi("The trace is where<br>the semantics of the flow live")+Bu+wr("Without context propagation, multi-agent debugging is just distributed guessing.")},"2A.2":{layout:"story-card object-space",html:yi("REQUEST / RESPONSE")+vi("It worked on your laptop.")+'<div class="story-lines"><p>The agent chains tools, delegates, and produces sound results.</p><p>Then you deploy it to production.</p><p>A request <em>“took forever.”</em><br>Another got <em>a strange response.</em><br>The logs say <em>the agent ran.</em></p></div><h3>What happened in those<br><em>45 seconds?</em></h3>'},"2D.1":{layout:"incident-inventory",html:vi("The workplace we just wired up")+`<div class="incident-list">${[["Replit","A production database deleted during a code freeze. Fabricated records; reported success."],["Amazon Q","~950k extension installs. A wiper prompt stopped by a syntax error."],["GitHub / MCP","One poisoned issue; private repositories exfiltrated through a full-permission token."],["EchoLeak","One email. Zero clicks. CVE-2025-32711."]].map(([i,e],t)=>`<article data-reveal="${t*.3}">${yi(i)}<p>${e}</p></article>`).join("")}</div>`},"2D.2":{layout:"swarm-story object-space",html:yi("OPENAI / TESTING SWARM")+vi("July 19, 2026")+`<div class="swarm-count">~700 <span>agents</span></div><div class="story-lines">${["Escaped test confinement","Stole credentials · tampered with cloud environments","Coordinated on an unsanctioned message board","~20% showed evidence-tampering behaviour"].map((i,e)=>`<p data-reveal="${.5+e*.55}">${i}</p>`).join("")}</div>`},"2D.4":{layout:"security-practice",html:vi("This is now a named category")+yi("OWASP / AGENTIC APPLICATIONS / 2026")+`<div class="category-grid">${[["ASI01","Agent Goal Hijack"],["ASI03","Identity & Privilege Abuse"],["ASI06","Memory & Context Poisoning"],["ASI07","Insecure Inter-Agent Communication"],["ASI09","Human-Agent Trust Exploitation"],["ASI10","Rogue Agents"]].map(([i,e])=>`<div>${yi(i)}<h3>${e}</h3></div>`).join("")}</div>${wr("Input, never instruction. Provenance on every instruction.<br>Guardrails as monitors. Least privilege per hop.")}`}},mt=Nu.slides.filter(i=>!["2A.3","4.5"].includes(i.id)).map((i,e)=>{const t=Number(i.id.startsWith("D")?i.id.slice(1):i.id[0]),n=i.id.match(/^2([A-D])/i)?.[1]||null,s=i.id.startsWith("D")||/^[\d][A-D]\.0$/.test(i.id),r=Uu[Fu[i.id]]||{};let a=r.layout||"evidence",o=r.html||"",l=r.scene||null;if(kc[i.id]&&({layout:a,html:o}=kc[i.id]),/Best practice:/.test(i.title)&&(a="practice object-space",o=Ou(i)),s){const c=i.onSlide.split(`
`).filter(h=>h.startsWith("- ")).map(h=>h.slice(2));a="divider"+(n?" subsection":""),o=yi(n?`ACT / 02 / ${n}`:`ACT / ${String(t).padStart(2,"0")}`)+vi(Yo(c[0]).replace(/<\/?b>/g,""))+wr(Yo(c.slice(1).join("<br>")).replace(/&lt;br&gt;/g,"<br>")),l="landscape"}return i.id==="2D.3"&&(a="quote",o="<blockquote>“…with the benefit of hindsight, some early signals identified in our report should have triggered an earlier response.”<cite>OpenAI · 26 August 2026</cite></blockquote>"),i.id==="3.1"&&(a="sdlc-funnel",o=vi("The bottom of the funnel")+yi("SRECON25 / GENAI IN THE SDLC FUNNEL")+'<div class="sdlc-labels"><span>Code</span><span>Test</span><span>Deploy</span><span>Monitor &amp; Debug</span></div><span class="sdlc-agents mono">AI AGENTS →</span><span class="sdlc-humans mono">HUMANS</span><strong class="sdlc-stamp mono">THIS TALK</strong>'),a=a.replace(/instrument-chapter/g,"").trim(),i.id==="1.1"&&(l="laptop",a+=" laptop-stage"),i.id==="1.4"&&(a+=" object-space workplace"),i.id==="1.5"&&(a+=" memory-intro"),i.id==="2A.3"&&(o+='<p class="standards-strip">OTel GenAI: conventions still evolving · multimodal payloads, handoffs, memory and sandbox telemetry remain open work<br>Working snapshot / re-check due 9 September 2026</p>'),i.id==="2A.4"&&(o+='<span class="chart-honesty mono">ILLUSTRATIVE SHAPE / SPEAKER’S PIPELINE STORY · NO NUMERIC SCALE</span>'),i.id==="2A.5"&&(o+=wr("What is an error budget, when the error is a distribution?")),i.id==="2B.1"&&(a+=" memory-story object-space"),i.id==="2B.2"&&(o=o.replace("Fail soft on state, fail closed on trust.","0.1% poisoned records → 80%+ attack success").replace("Every memory operation is a first-class trace event, with provenance.","Agents write memory from conversations. The attacker needs no write access.")),i.id==="2C.1"&&(a+=" object-space"),i.id==="2C.2"&&(o=o.replace(/<div class="legal-line">[\s\S]*?<\/div>/,'<div class="legal-line"><b>EU AI Act / Article 12</b><span>High-risk systems: lifetime logging capability<br>Classification and transition provisions apply</span></div>')),i.id==="4.6"&&(a+=" final-night"),i.id==="4.7"&&(a+=" thank-you",o=o.replace(/<h2>[\s\S]*?<\/h2>/,'<h2>Thank you.</h2><p class="thanks-invitation">Let’s keep the conversation going.</p>')),{id:i.id,index:e,actNumber:t,actName:ku[t],section:n,div:s?t:null,name:i.id==="4.7"?"Thank you":s&&o.match(/<h2>(.*?)<\/h2>/)?.[1].replace(/<[^>]*>/g,"")||i.title,sourceTitle:i.id==="4.7"?"Thank you":i.title,layout:a,html:o,scene:l,notes:i.id==="4.7"?"Thank the audience. Leave the QR and reference links visible for the conversation afterwards; the complete engine keeps operating alongside them.":i.id==="1.6"?`VERIFIED SOURCE CORRECTIONS: The Borg heuristic has operated for a year; this does not mean a year-long agent task. Verizon reports closed-loop automation, with agents in pilot; no supported 60,000-site figure. Anthropic describes an overseeing engineer. Do not claim these cases are uniformly unattended.

`+i.notes:i.id==="2C.2"?`VERIFIED LEGAL CORRECTION: Article12 concerns logging capability for high-risk systems. Applicability is subject to classification and amended transition provisions; remove the old August2026 blanket claim and do not confuse lifetime capability with lifetime retention.

`+i.notes:i.id==="3.1"?`SOURCE FIDELITY CORRECTION: Official USENIX video shows four horizontal chevrons: Code, Test, Deploy, Monitor & Debug. This reconstruction follows that drawing rather than the three-stage description in outline v4.

`+i.notes:i.notes,sources:i.id==="2C.2"?[{href:"https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng"},{href:"https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng"}]:i.id==="3.1"?[{href:"https://www.youtube.com/watch?v=kWBpQZIGmik&t=2310s"}]:i.id==="1.6"?i.sources.map((c,h)=>h===0?{...c,href:"https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/"}:c):i.sources,h:r.h||"",accent:n?{A:"#b6d6ef",B:"#89c7bd",C:"#becae5",D:"#e6b07e"}[n]:t===4?"#efae8b":"#a7cebf"}});const Xl="185",zu=0,Fc=1,Gu=2,Ma=1,Hu=2,yr=3,Wi=0,xn=1,kn=2,wi=0,Vs=1,Oc=2,Bc=3,zc=4,Vu=5,ts=100,Wu=101,$u=102,Xu=103,qu=104,Yu=200,Zu=201,Ku=202,Ju=203,Zo=204,Ko=205,Qu=206,ju=207,ef=208,tf=209,nf=210,sf=211,rf=212,af=213,of=214,Jo=0,Qo=1,jo=2,Zs=3,el=4,tl=5,nl=6,il=7,cd=0,lf=1,cf=2,ai=0,hd=1,dd=2,ud=3,ql=4,fd=5,pd=6,md=7,gd=300,rs=301,Ks=302,oo=303,lo=304,no=306,$i=1e3,xi=1001,sl=1002,sn=1003,hf=1004,Vr=1005,en=1006,co=1007,Oi=1008,An=1009,vd=1010,yd=1011,Cr=1012,Yl=1013,ci=1014,Xn=1015,Si=1016,Zl=1017,Kl=1018,Pr=1020,xd=35902,bd=35899,_d=1021,wd=1022,qn=1023,Ei=1026,is=1027,Jl=1028,Ql=1029,as=1030,jl=1031,ec=1033,Sa=33776,Ea=33777,Ta=33778,Aa=33779,rl=35840,al=35841,ol=35842,ll=35843,cl=36196,hl=37492,dl=37496,ul=37488,fl=37489,ka=37490,pl=37491,ml=37808,gl=37809,vl=37810,yl=37811,xl=37812,bl=37813,_l=37814,wl=37815,Ml=37816,Sl=37817,El=37818,Tl=37819,Al=37820,Rl=37821,Cl=36492,Pl=36494,Il=36495,Ll=36283,Dl=36284,Fa=36285,Nl=36286,df=3200,Ul=0,uf=1,Fi="",ln="srgb",Oa="srgb-linear",Ba="linear",bt="srgb",ys=7680,Gc=519,ff=512,pf=513,mf=514,tc=515,gf=516,vf=517,nc=518,yf=519,kl=35044,Mr=35048,Hc="300 es",ri=2e3,Ir=2001;function xf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function za(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function bf(){const i=za("canvas");return i.style.display="block",i}const Vc={};function Ga(...i){const e="THREE."+i.shift();console.log(e,...i)}function Md(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ye(...i){i=Md(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function ot(...i){i=Md(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Ws(...i){const e=i.join(" ");e in Vc||(Vc[e]=!0,Ye(...i))}function _f(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const wf={[Jo]:Qo,[jo]:nl,[el]:il,[Zs]:tl,[Qo]:Jo,[nl]:jo,[il]:el,[tl]:Zs};class ls{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const an=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Wc=1234567;const Sr=Math.PI/180,Lr=180/Math.PI;function oi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(an[i&255]+an[i>>8&255]+an[i>>16&255]+an[i>>24&255]+"-"+an[e&255]+an[e>>8&255]+"-"+an[e>>16&15|64]+an[e>>24&255]+"-"+an[t&63|128]+an[t>>8&255]+"-"+an[t>>16&255]+an[t>>24&255]+an[n&255]+an[n>>8&255]+an[n>>16&255]+an[n>>24&255]).toLowerCase()}function nt(i,e,t){return Math.max(e,Math.min(t,i))}function ic(i,e){return(i%e+e)%e}function Mf(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Sf(i,e,t){return i!==e?(t-i)/(e-i):0}function Er(i,e,t){return(1-t)*i+t*e}function Ef(i,e,t,n){return Er(i,e,1-Math.exp(-t*n))}function Tf(i,e=1){return e-Math.abs(ic(i,e*2)-e)}function Af(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Rf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Cf(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Pf(i,e){return i+Math.random()*(e-i)}function If(i){return i*(.5-Math.random())}function Lf(i){i!==void 0&&(Wc=i);let e=Wc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Df(i){return i*Sr}function Nf(i){return i*Lr}function Uf(i){return(i&i-1)===0&&i!==0}function kf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Ff(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Of(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),m=r((e-n)/2),u=a((e-n)/2),d=r((n-e)/2),p=a((n-e)/2);switch(s){case"XYX":i.set(o*h,l*m,l*u,o*c);break;case"YZY":i.set(l*u,o*h,l*m,o*c);break;case"ZXZ":i.set(l*m,l*u,o*h,o*c);break;case"XZX":i.set(o*h,l*p,l*d,o*c);break;case"YXY":i.set(l*d,o*h,l*p,o*c);break;case"ZYZ":i.set(l*p,l*d,o*h,o*c);break;default:Ye("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Wn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function _t(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const pt={DEG2RAD:Sr,RAD2DEG:Lr,generateUUID:oi,clamp:nt,euclideanModulo:ic,mapLinear:Mf,inverseLerp:Sf,lerp:Er,damp:Ef,pingpong:Tf,smoothstep:Af,smootherstep:Rf,randInt:Cf,randFloat:Pf,randFloatSpread:If,seededRandom:Lf,degToRad:Df,radToDeg:Nf,isPowerOfTwo:Uf,ceilPowerOfTwo:kf,floorPowerOfTwo:Ff,setQuaternionFromProperEuler:Of,normalize:_t,denormalize:Wn},vc=class vc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};vc.prototype.isVector2=!0;let we=vc;class cs{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],m=n[s+3],u=r[a+0],d=r[a+1],p=r[a+2],x=r[a+3];if(m!==x||l!==u||c!==d||h!==p){let g=l*u+c*d+h*p+m*x;g<0&&(u=-u,d=-d,p=-p,x=-x,g=-g);let f=1-o;if(g<.9995){const w=Math.acos(g),E=Math.sin(w);f=Math.sin(f*w)/E,o=Math.sin(o*w)/E,l=l*f+u*o,c=c*f+d*o,h=h*f+p*o,m=m*f+x*o}else{l=l*f+u*o,c=c*f+d*o,h=h*f+p*o,m=m*f+x*o;const w=1/Math.sqrt(l*l+c*c+h*h+m*m);l*=w,c*=w,h*=w,m*=w}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=m}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],m=r[a],u=r[a+1],d=r[a+2],p=r[a+3];return e[t]=o*p+h*m+l*d-c*u,e[t+1]=l*p+h*u+c*m-o*d,e[t+2]=c*p+h*d+o*u-l*m,e[t+3]=h*p-o*m-l*u-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),m=o(r/2),u=l(n/2),d=l(s/2),p=l(r/2);switch(a){case"XYZ":this._x=u*h*m+c*d*p,this._y=c*d*m-u*h*p,this._z=c*h*p+u*d*m,this._w=c*h*m-u*d*p;break;case"YXZ":this._x=u*h*m+c*d*p,this._y=c*d*m-u*h*p,this._z=c*h*p-u*d*m,this._w=c*h*m+u*d*p;break;case"ZXY":this._x=u*h*m-c*d*p,this._y=c*d*m+u*h*p,this._z=c*h*p+u*d*m,this._w=c*h*m-u*d*p;break;case"ZYX":this._x=u*h*m-c*d*p,this._y=c*d*m+u*h*p,this._z=c*h*p-u*d*m,this._w=c*h*m+u*d*p;break;case"YZX":this._x=u*h*m+c*d*p,this._y=c*d*m+u*h*p,this._z=c*h*p-u*d*m,this._w=c*h*m-u*d*p;break;case"XZY":this._x=u*h*m-c*d*p,this._y=c*d*m-u*h*p,this._z=c*h*p+u*d*m,this._w=c*h*m+u*d*p;break;default:Ye("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],m=t[10],u=n+o+m;if(u>0){const d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-s)*d}else if(n>o&&n>m){const d=2*Math.sqrt(1+n-o-m);this._w=(h-l)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+c)/d}else if(o>m){const d=2*Math.sqrt(1+o-n-m);this._w=(r-c)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+m-n-o);this._w=(a-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(nt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const yc=class yc{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion($c.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion($c.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),m=2*(r*n-a*t);return this.x=t+l*c+a*m-o*h,this.y=n+l*h+o*c-r*m,this.z=s+l*m+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ho.copy(this).projectOnVector(e),this.sub(ho)}reflect(e){return this.sub(ho.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};yc.prototype.isVector3=!0;let U=yc;const ho=new U,$c=new cs,xc=class xc{constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],m=n[7],u=n[2],d=n[5],p=n[8],x=s[0],g=s[3],f=s[6],w=s[1],E=s[4],y=s[7],S=s[2],T=s[5],A=s[8];return r[0]=a*x+o*w+l*S,r[3]=a*g+o*E+l*T,r[6]=a*f+o*y+l*A,r[1]=c*x+h*w+m*S,r[4]=c*g+h*E+m*T,r[7]=c*f+h*y+m*A,r[2]=u*x+d*w+p*S,r[5]=u*g+d*E+p*T,r[8]=u*f+d*y+p*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],m=h*a-o*c,u=o*l-h*r,d=c*r-a*l,p=t*m+n*u+s*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/p;return e[0]=m*x,e[1]=(s*c-h*n)*x,e[2]=(o*n-s*a)*x,e[3]=u*x,e[4]=(h*t-s*l)*x,e[5]=(s*r-o*t)*x,e[6]=d*x,e[7]=(n*l-c*t)*x,e[8]=(a*t-n*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Ws("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(uo.makeScale(e,t)),this}rotate(e){return Ws("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(uo.makeRotation(-e)),this}translate(e,t){return Ws("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(uo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};xc.prototype.isMatrix3=!0;let je=xc;const uo=new je,Xc=new je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),qc=new je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Bf(){const i={enabled:!0,workingColorSpace:Oa,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===bt&&(s.r=Mi(s.r),s.g=Mi(s.g),s.b=Mi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===bt&&(s.r=$s(s.r),s.g=$s(s.g),s.b=$s(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Fi?Ba:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ws("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ws("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Oa]:{primaries:e,whitePoint:n,transfer:Ba,toXYZ:Xc,fromXYZ:qc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ln},outputColorSpaceConfig:{drawingBufferColorSpace:ln}},[ln]:{primaries:e,whitePoint:n,transfer:bt,toXYZ:Xc,fromXYZ:qc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ln}}}),i}const lt=Bf();function Mi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function $s(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let xs;class zf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{xs===void 0&&(xs=za("canvas")),xs.width=e.width,xs.height=e.height;const s=xs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=xs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=za("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Mi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Mi(t[n]/255)*255):t[n]=Mi(t[n]);return{data:t,width:e.width,height:e.height}}else return Ye("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Gf=0;class sc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Gf++}),this.uuid=oi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(fo(s[a].image)):r.push(fo(s[a]))}else r=fo(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function fo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?zf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ye("Texture: Unable to serialize Texture."),{})}let Hf=0;const po=new U;class un extends ls{constructor(e=un.DEFAULT_IMAGE,t=un.DEFAULT_MAPPING,n=xi,s=xi,r=en,a=Oi,o=qn,l=An,c=un.DEFAULT_ANISOTROPY,h=Fi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Hf++}),this.uuid=oi(),this.name="",this.source=new sc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new we(0,0),this.repeat=new we(1,1),this.center=new we(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(po).x}get height(){return this.source.getSize(po).y}get depth(){return this.source.getSize(po).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ye(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ye(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==gd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case $i:e.x=e.x-Math.floor(e.x);break;case xi:e.x=e.x<0?0:1;break;case sl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case $i:e.y=e.y-Math.floor(e.y);break;case xi:e.y=e.y<0?0:1;break;case sl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}un.DEFAULT_IMAGE=null;un.DEFAULT_MAPPING=gd;un.DEFAULT_ANISOTROPY=1;const bc=class bc{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],h=l[4],m=l[8],u=l[1],d=l[5],p=l[9],x=l[2],g=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(m-x)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(m+x)<.1&&Math.abs(p+g)<.1&&Math.abs(c+d+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,y=(d+1)/2,S=(f+1)/2,T=(h+u)/4,A=(m+x)/4,v=(p+g)/4;return E>y&&E>S?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=T/n,r=A/n):y>S?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=T/s,r=v/s):S<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),n=A/r,s=v/r),this.set(n,s,r,t),this}let w=Math.sqrt((g-p)*(g-p)+(m-x)*(m-x)+(u-h)*(u-h));return Math.abs(w)<.001&&(w=1),this.x=(g-p)/w,this.y=(m-x)/w,this.z=(u-h)/w,this.w=Math.acos((c+d+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this.w=nt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this.w=nt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};bc.prototype.isVector4=!0;let Nt=bc;class Vf extends ls{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:en,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Nt(0,0,e,t),this.scissorTest=!1,this.viewport=new Nt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new un(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:en,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new sc(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class li extends Vf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Sd extends un{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=sn,this.minFilter=sn,this.wrapR=xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Wf extends un{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=sn,this.minFilter=sn,this.wrapR=xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const to=class to{constructor(e,t,n,s,r,a,o,l,c,h,m,u,d,p,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,m,u,d,p,x,g)}set(e,t,n,s,r,a,o,l,c,h,m,u,d,p,x,g){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=m,f[14]=u,f[3]=d,f[7]=p,f[11]=x,f[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new to().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/bs.setFromMatrixColumn(e,0).length(),r=1/bs.setFromMatrixColumn(e,1).length(),a=1/bs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),m=Math.sin(r);if(e.order==="XYZ"){const u=a*h,d=a*m,p=o*h,x=o*m;t[0]=l*h,t[4]=-l*m,t[8]=c,t[1]=d+p*c,t[5]=u-x*c,t[9]=-o*l,t[2]=x-u*c,t[6]=p+d*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*h,d=l*m,p=c*h,x=c*m;t[0]=u+x*o,t[4]=p*o-d,t[8]=a*c,t[1]=a*m,t[5]=a*h,t[9]=-o,t[2]=d*o-p,t[6]=x+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*h,d=l*m,p=c*h,x=c*m;t[0]=u-x*o,t[4]=-a*m,t[8]=p+d*o,t[1]=d+p*o,t[5]=a*h,t[9]=x-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*h,d=a*m,p=o*h,x=o*m;t[0]=l*h,t[4]=p*c-d,t[8]=u*c+x,t[1]=l*m,t[5]=x*c+u,t[9]=d*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,d=a*c,p=o*l,x=o*c;t[0]=l*h,t[4]=x-u*m,t[8]=p*m+d,t[1]=m,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=d*m+p,t[10]=u-x*m}else if(e.order==="XZY"){const u=a*l,d=a*c,p=o*l,x=o*c;t[0]=l*h,t[4]=-m,t[8]=c*h,t[1]=u*m+x,t[5]=a*h,t[9]=d*m-p,t[2]=p*m-d,t[6]=o*h,t[10]=x*m+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose($f,e,Xf)}lookAt(e,t,n){const s=this.elements;return wn.subVectors(e,t),wn.lengthSq()===0&&(wn.z=1),wn.normalize(),Pi.crossVectors(n,wn),Pi.lengthSq()===0&&(Math.abs(n.z)===1?wn.x+=1e-4:wn.z+=1e-4,wn.normalize(),Pi.crossVectors(n,wn)),Pi.normalize(),Wr.crossVectors(wn,Pi),s[0]=Pi.x,s[4]=Wr.x,s[8]=wn.x,s[1]=Pi.y,s[5]=Wr.y,s[9]=wn.y,s[2]=Pi.z,s[6]=Wr.z,s[10]=wn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],m=n[5],u=n[9],d=n[13],p=n[2],x=n[6],g=n[10],f=n[14],w=n[3],E=n[7],y=n[11],S=n[15],T=s[0],A=s[4],v=s[8],R=s[12],D=s[1],N=s[5],k=s[9],G=s[13],X=s[2],F=s[6],Z=s[10],H=s[14],$=s[3],Q=s[7],V=s[11],ee=s[15];return r[0]=a*T+o*D+l*X+c*$,r[4]=a*A+o*N+l*F+c*Q,r[8]=a*v+o*k+l*Z+c*V,r[12]=a*R+o*G+l*H+c*ee,r[1]=h*T+m*D+u*X+d*$,r[5]=h*A+m*N+u*F+d*Q,r[9]=h*v+m*k+u*Z+d*V,r[13]=h*R+m*G+u*H+d*ee,r[2]=p*T+x*D+g*X+f*$,r[6]=p*A+x*N+g*F+f*Q,r[10]=p*v+x*k+g*Z+f*V,r[14]=p*R+x*G+g*H+f*ee,r[3]=w*T+E*D+y*X+S*$,r[7]=w*A+E*N+y*F+S*Q,r[11]=w*v+E*k+y*Z+S*V,r[15]=w*R+E*G+y*H+S*ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],m=e[6],u=e[10],d=e[14],p=e[3],x=e[7],g=e[11],f=e[15],w=l*d-c*u,E=o*d-c*m,y=o*u-l*m,S=a*d-c*h,T=a*u-l*h,A=a*m-o*h;return t*(x*w-g*E+f*y)-n*(p*w-g*S+f*T)+s*(p*E-x*S+f*A)-r*(p*y-x*T+g*A)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],m=e[9],u=e[10],d=e[11],p=e[12],x=e[13],g=e[14],f=e[15],w=t*o-n*a,E=t*l-s*a,y=t*c-r*a,S=n*l-s*o,T=n*c-r*o,A=s*c-r*l,v=h*x-m*p,R=h*g-u*p,D=h*f-d*p,N=m*g-u*x,k=m*f-d*x,G=u*f-d*g,X=w*G-E*k+y*N+S*D-T*R+A*v;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const F=1/X;return e[0]=(o*G-l*k+c*N)*F,e[1]=(s*k-n*G-r*N)*F,e[2]=(x*A-g*T+f*S)*F,e[3]=(u*T-m*A-d*S)*F,e[4]=(l*D-a*G-c*R)*F,e[5]=(t*G-s*D+r*R)*F,e[6]=(g*y-p*A-f*E)*F,e[7]=(h*A-u*y+d*E)*F,e[8]=(a*k-o*D+c*v)*F,e[9]=(n*D-t*k-r*v)*F,e[10]=(p*T-x*y+f*w)*F,e[11]=(m*y-h*T-d*w)*F,e[12]=(o*R-a*N-l*v)*F,e[13]=(t*N-n*R+s*v)*F,e[14]=(x*E-p*S-g*w)*F,e[15]=(h*S-m*E+u*w)*F,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,m=o+o,u=r*c,d=r*h,p=r*m,x=a*h,g=a*m,f=o*m,w=l*c,E=l*h,y=l*m,S=n.x,T=n.y,A=n.z;return s[0]=(1-(x+f))*S,s[1]=(d+y)*S,s[2]=(p-E)*S,s[3]=0,s[4]=(d-y)*T,s[5]=(1-(u+f))*T,s[6]=(g+w)*T,s[7]=0,s[8]=(p+E)*A,s[9]=(g-w)*A,s[10]=(1-(u+x))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=bs.set(s[0],s[1],s[2]).length();const o=bs.set(s[4],s[5],s[6]).length(),l=bs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),zn.copy(this);const c=1/a,h=1/o,m=1/l;return zn.elements[0]*=c,zn.elements[1]*=c,zn.elements[2]*=c,zn.elements[4]*=h,zn.elements[5]*=h,zn.elements[6]*=h,zn.elements[8]*=m,zn.elements[9]*=m,zn.elements[10]*=m,t.setFromRotationMatrix(zn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=ri,l=!1){const c=this.elements,h=2*r/(t-e),m=2*r/(n-s),u=(t+e)/(t-e),d=(n+s)/(n-s);let p,x;if(l)p=r/(a-r),x=a*r/(a-r);else if(o===ri)p=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===Ir)p=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=m,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=ri,l=!1){const c=this.elements,h=2/(t-e),m=2/(n-s),u=-(t+e)/(t-e),d=-(n+s)/(n-s);let p,x;if(l)p=1/(a-r),x=a/(a-r);else if(o===ri)p=-2/(a-r),x=-(a+r)/(a-r);else if(o===Ir)p=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=m,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};to.prototype.isMatrix4=!0;let yt=to;const bs=new U,zn=new yt,$f=new U(0,0,0),Xf=new U(1,1,1),Pi=new U,Wr=new U,wn=new U,Yc=new yt,Zc=new cs;class Ti{constructor(e=0,t=0,n=0,s=Ti.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],m=s[2],u=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-nt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-m,r),this._z=0);break;case"ZXY":this._x=Math.asin(nt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-m,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-nt(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(nt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-m,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Ye("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Yc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Yc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Zc.setFromEuler(this),this.setFromQuaternion(Zc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ti.DEFAULT_ORDER="XYZ";class Ed{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let qf=0;const Kc=new U,_s=new cs,di=new yt,$r=new U,sr=new U,Yf=new U,Zf=new cs,Jc=new U(1,0,0),Qc=new U(0,1,0),jc=new U(0,0,1),eh={type:"added"},Kf={type:"removed"},ws={type:"childadded",child:null},mo={type:"childremoved",child:null};class kt extends ls{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:qf++}),this.uuid=oi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=kt.DEFAULT_UP.clone();const e=new U,t=new Ti,n=new cs,s=new U(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new yt},normalMatrix:{value:new je}}),this.matrix=new yt,this.matrixWorld=new yt,this.matrixAutoUpdate=kt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ed,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return _s.setFromAxisAngle(e,t),this.quaternion.multiply(_s),this}rotateOnWorldAxis(e,t){return _s.setFromAxisAngle(e,t),this.quaternion.premultiply(_s),this}rotateX(e){return this.rotateOnAxis(Jc,e)}rotateY(e){return this.rotateOnAxis(Qc,e)}rotateZ(e){return this.rotateOnAxis(jc,e)}translateOnAxis(e,t){return Kc.copy(e).applyQuaternion(this.quaternion),this.position.add(Kc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Jc,e)}translateY(e){return this.translateOnAxis(Qc,e)}translateZ(e){return this.translateOnAxis(jc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(di.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?$r.copy(e):$r.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),sr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?di.lookAt(sr,$r,this.up):di.lookAt($r,sr,this.up),this.quaternion.setFromRotationMatrix(di),s&&(di.extractRotation(s.matrixWorld),_s.setFromRotationMatrix(di),this.quaternion.premultiply(_s.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(ot("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(eh),ws.child=e,this.dispatchEvent(ws),ws.child=null):ot("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Kf),mo.child=e,this.dispatchEvent(mo),mo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),di.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),di.multiply(e.parent.matrixWorld)),e.applyMatrix4(di),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(eh),ws.child=e,this.dispatchEvent(ws),ws.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sr,e,Yf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sr,Zf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const m=l[c];r(e.shapes,m)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),m=a(e.shapes),u=a(e.skeletons),d=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),m.length>0&&(n.shapes=m),u.length>0&&(n.skeletons=u),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}kt.DEFAULT_UP=new U(0,1,0);kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class vt extends kt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Jf={type:"move"};class go{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new vt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new vt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new vt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const x of e.hand.values()){const g=t.getJointPose(x,n),f=this._getHandJoint(c,x);g!==null&&(f.matrix.fromArray(g.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=g.radius),f.visible=g!==null}const h=c.joints["index-finger-tip"],m=c.joints["thumb-tip"],u=h.position.distanceTo(m.position),d=.02,p=.005;c.inputState.pinching&&u>d+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=d-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Jf)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new vt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Td={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ii={h:0,s:0,l:0},Xr={h:0,s:0,l:0};function vo(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Je{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ln){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,lt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=lt.workingColorSpace){return this.r=e,this.g=t,this.b=n,lt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=lt.workingColorSpace){if(e=ic(e,1),t=nt(t,0,1),n=nt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=vo(a,r,e+1/3),this.g=vo(a,r,e),this.b=vo(a,r,e-1/3)}return lt.colorSpaceToWorking(this,s),this}setStyle(e,t=ln){function n(r){r!==void 0&&parseFloat(r)<1&&Ye("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ye("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ye("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ln){const n=Td[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ye("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Mi(e.r),this.g=Mi(e.g),this.b=Mi(e.b),this}copyLinearToSRGB(e){return this.r=$s(e.r),this.g=$s(e.g),this.b=$s(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ln){return lt.workingToColorSpace(on.copy(this),e),Math.round(nt(on.r*255,0,255))*65536+Math.round(nt(on.g*255,0,255))*256+Math.round(nt(on.b*255,0,255))}getHexString(e=ln){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=lt.workingColorSpace){lt.workingToColorSpace(on.copy(this),t);const n=on.r,s=on.g,r=on.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const m=a-o;switch(c=h<=.5?m/(a+o):m/(2-a-o),a){case n:l=(s-r)/m+(s<r?6:0);break;case s:l=(r-n)/m+2;break;case r:l=(n-s)/m+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=lt.workingColorSpace){return lt.workingToColorSpace(on.copy(this),t),e.r=on.r,e.g=on.g,e.b=on.b,e}getStyle(e=ln){lt.workingToColorSpace(on.copy(this),e);const t=on.r,n=on.g,s=on.b;return e!==ln?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Ii),this.setHSL(Ii.h+e,Ii.s+t,Ii.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ii),e.getHSL(Xr);const n=Er(Ii.h,Xr.h,t),s=Er(Ii.s,Xr.s,t),r=Er(Ii.l,Xr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const on=new Je;Je.NAMES=Td;class yo extends kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ti,this.environmentIntensity=1,this.environmentRotation=new Ti,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Gn=new U,ui=new U,xo=new U,fi=new U,Ms=new U,Ss=new U,th=new U,bo=new U,_o=new U,wo=new U,Mo=new Nt,So=new Nt,Eo=new Nt;class Fn{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Gn.subVectors(e,t),s.cross(Gn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Gn.subVectors(s,t),ui.subVectors(n,t),xo.subVectors(e,t);const a=Gn.dot(Gn),o=Gn.dot(ui),l=Gn.dot(xo),c=ui.dot(ui),h=ui.dot(xo),m=a*c-o*o;if(m===0)return r.set(0,0,0),null;const u=1/m,d=(c*l-o*h)*u,p=(a*h-o*l)*u;return r.set(1-d-p,p,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,fi)===null?!1:fi.x>=0&&fi.y>=0&&fi.x+fi.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,fi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,fi.x),l.addScaledVector(a,fi.y),l.addScaledVector(o,fi.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return Mo.setScalar(0),So.setScalar(0),Eo.setScalar(0),Mo.fromBufferAttribute(e,t),So.fromBufferAttribute(e,n),Eo.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Mo,r.x),a.addScaledVector(So,r.y),a.addScaledVector(Eo,r.z),a}static isFrontFacing(e,t,n,s){return Gn.subVectors(n,t),ui.subVectors(e,t),Gn.cross(ui).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Gn.subVectors(this.c,this.b),ui.subVectors(this.a,this.b),Gn.cross(ui).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Fn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Fn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Fn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Fn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Fn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Ms.subVectors(s,n),Ss.subVectors(r,n),bo.subVectors(e,n);const l=Ms.dot(bo),c=Ss.dot(bo);if(l<=0&&c<=0)return t.copy(n);_o.subVectors(e,s);const h=Ms.dot(_o),m=Ss.dot(_o);if(h>=0&&m<=h)return t.copy(s);const u=l*m-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Ms,a);wo.subVectors(e,r);const d=Ms.dot(wo),p=Ss.dot(wo);if(p>=0&&d<=p)return t.copy(r);const x=d*c-l*p;if(x<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Ss,o);const g=h*p-d*m;if(g<=0&&m-h>=0&&d-p>=0)return th.subVectors(r,s),o=(m-h)/(m-h+(d-p)),t.copy(s).addScaledVector(th,o);const f=1/(g+x+u);return a=x*f,o=u*f,t.copy(n).addScaledVector(Ms,a).addScaledVector(Ss,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class hs{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Hn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Hn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Hn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Hn):Hn.fromBufferAttribute(r,a),Hn.applyMatrix4(e.matrixWorld),this.expandByPoint(Hn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),qr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),qr.copy(n.boundingBox)),qr.applyMatrix4(e.matrixWorld),this.union(qr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Hn),Hn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(rr),Yr.subVectors(this.max,rr),Es.subVectors(e.a,rr),Ts.subVectors(e.b,rr),As.subVectors(e.c,rr),Li.subVectors(Ts,Es),Di.subVectors(As,Ts),Ki.subVectors(Es,As);let t=[0,-Li.z,Li.y,0,-Di.z,Di.y,0,-Ki.z,Ki.y,Li.z,0,-Li.x,Di.z,0,-Di.x,Ki.z,0,-Ki.x,-Li.y,Li.x,0,-Di.y,Di.x,0,-Ki.y,Ki.x,0];return!To(t,Es,Ts,As,Yr)||(t=[1,0,0,0,1,0,0,0,1],!To(t,Es,Ts,As,Yr))?!1:(Zr.crossVectors(Li,Di),t=[Zr.x,Zr.y,Zr.z],To(t,Es,Ts,As,Yr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Hn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Hn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(pi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),pi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),pi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),pi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),pi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),pi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),pi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),pi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(pi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const pi=[new U,new U,new U,new U,new U,new U,new U,new U],Hn=new U,qr=new hs,Es=new U,Ts=new U,As=new U,Li=new U,Di=new U,Ki=new U,rr=new U,Yr=new U,Zr=new U,Ji=new U;function To(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Ji.fromArray(i,r);const o=s.x*Math.abs(Ji.x)+s.y*Math.abs(Ji.y)+s.z*Math.abs(Ji.z),l=e.dot(Ji),c=t.dot(Ji),h=n.dot(Ji);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Vt=new U,Kr=new we;let Qf=0;class fn extends ls{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Qf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=kl,this.updateRanges=[],this.gpuType=Xn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Kr.fromBufferAttribute(this,t),Kr.applyMatrix3(e),this.setXY(t,Kr.x,Kr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix3(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix4(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyNormalMatrix(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.transformDirection(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=_t(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Wn(t,this.array)),t}setX(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Wn(t,this.array)),t}setY(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Wn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Wn(t,this.array)),t}setW(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),s=_t(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),s=_t(s,this.array),r=_t(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==kl&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Ad extends fn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Rd extends fn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class dt extends fn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const jf=new hs,ar=new U,Ao=new U;class ds{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):jf.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ar.subVectors(e,this.center);const t=ar.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ar,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ao.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ar.copy(e.center).add(Ao)),this.expandByPoint(ar.copy(e.center).sub(Ao))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let ep=0;const In=new yt,Ro=new kt,Rs=new U,Mn=new hs,or=new hs,Qt=new U;class St extends ls{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ep++}),this.uuid=oi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(xf(e)?Rd:Ad)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new je().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return In.makeRotationFromQuaternion(e),this.applyMatrix4(In),this}rotateX(e){return In.makeRotationX(e),this.applyMatrix4(In),this}rotateY(e){return In.makeRotationY(e),this.applyMatrix4(In),this}rotateZ(e){return In.makeRotationZ(e),this.applyMatrix4(In),this}translate(e,t,n){return In.makeTranslation(e,t,n),this.applyMatrix4(In),this}scale(e,t,n){return In.makeScale(e,t,n),this.applyMatrix4(In),this}lookAt(e){return Ro.lookAt(e),Ro.updateMatrix(),this.applyMatrix4(Ro.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Rs).negate(),this.translate(Rs.x,Rs.y,Rs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new dt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ye("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ot("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Mn.setFromBufferAttribute(r),this.morphTargetsRelative?(Qt.addVectors(this.boundingBox.min,Mn.min),this.boundingBox.expandByPoint(Qt),Qt.addVectors(this.boundingBox.max,Mn.max),this.boundingBox.expandByPoint(Qt)):(this.boundingBox.expandByPoint(Mn.min),this.boundingBox.expandByPoint(Mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ot('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ds);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ot("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){const n=this.boundingSphere.center;if(Mn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];or.setFromBufferAttribute(o),this.morphTargetsRelative?(Qt.addVectors(Mn.min,or.min),Mn.expandByPoint(Qt),Qt.addVectors(Mn.max,or.max),Mn.expandByPoint(Qt)):(Mn.expandByPoint(or.min),Mn.expandByPoint(or.max))}Mn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Qt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Qt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Qt.fromBufferAttribute(o,c),l&&(Rs.fromBufferAttribute(e,c),Qt.add(Rs)),s=Math.max(s,n.distanceToSquared(Qt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&ot('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ot("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new fn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let v=0;v<n.count;v++)o[v]=new U,l[v]=new U;const c=new U,h=new U,m=new U,u=new we,d=new we,p=new we,x=new U,g=new U;function f(v,R,D){c.fromBufferAttribute(n,v),h.fromBufferAttribute(n,R),m.fromBufferAttribute(n,D),u.fromBufferAttribute(r,v),d.fromBufferAttribute(r,R),p.fromBufferAttribute(r,D),h.sub(c),m.sub(c),d.sub(u),p.sub(u);const N=1/(d.x*p.y-p.x*d.y);isFinite(N)&&(x.copy(h).multiplyScalar(p.y).addScaledVector(m,-d.y).multiplyScalar(N),g.copy(m).multiplyScalar(d.x).addScaledVector(h,-p.x).multiplyScalar(N),o[v].add(x),o[R].add(x),o[D].add(x),l[v].add(g),l[R].add(g),l[D].add(g))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let v=0,R=w.length;v<R;++v){const D=w[v],N=D.start,k=D.count;for(let G=N,X=N+k;G<X;G+=3)f(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const E=new U,y=new U,S=new U,T=new U;function A(v){S.fromBufferAttribute(s,v),T.copy(S);const R=o[v];E.copy(R),E.sub(S.multiplyScalar(S.dot(R))).normalize(),y.crossVectors(T,R);const N=y.dot(l[v])<0?-1:1;a.setXYZW(v,E.x,E.y,E.z,N)}for(let v=0,R=w.length;v<R;++v){const D=w[v],N=D.start,k=D.count;for(let G=N,X=N+k;G<X;G+=3)A(e.getX(G+0)),A(e.getX(G+1)),A(e.getX(G+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new fn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);const s=new U,r=new U,a=new U,o=new U,l=new U,c=new U,h=new U,m=new U;if(e)for(let u=0,d=e.count;u<d;u+=3){const p=e.getX(u+0),x=e.getX(u+1),g=e.getX(u+2);s.fromBufferAttribute(t,p),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,g),h.subVectors(a,r),m.subVectors(s,r),h.cross(m),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,d=t.count;u<d;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),m.subVectors(s,r),h.cross(m),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Qt.fromBufferAttribute(e,t),Qt.normalize(),e.setXYZ(t,Qt.x,Qt.y,Qt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,m=o.normalized,u=new c.constructor(l.length*h);let d=0,p=0;for(let x=0,g=l.length;x<g;x++){o.isInterleavedBufferAttribute?d=l[x]*o.data.stride+o.offset:d=l[x]*h;for(let f=0;f<h;f++)u[p++]=c[d++]}return new fn(u,h,m)}if(this.index===null)return Ye("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new St,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,m=c.length;h<m;h++){const u=c[h],d=e(u,n);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let m=0,u=c.length;m<u;m++){const d=c[m];h.push(d.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],m=r[c];for(let u=0,d=m.length;u<d;u++)h.push(m[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const m=a[c];this.addGroup(m.start,m.count,m.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class tp{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=kl,this.updateRanges=[],this.version=0,this.uuid=oi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=oi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=oi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const pn=new U;class Ha{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)pn.fromBufferAttribute(this,t),pn.applyMatrix4(e),this.setXYZ(t,pn.x,pn.y,pn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)pn.fromBufferAttribute(this,t),pn.applyNormalMatrix(e),this.setXYZ(t,pn.x,pn.y,pn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)pn.fromBufferAttribute(this,t),pn.transformDirection(e),this.setXYZ(t,pn.x,pn.y,pn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=_t(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Wn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Wn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Wn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Wn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),s=_t(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),s=_t(s,this.array),r=_t(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Ga("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new fn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ha(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ga("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let np=0;class Xi extends ls{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:np++}),this.uuid=oi(),this.name="",this.type="Material",this.blending=Vs,this.side=Wi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Zo,this.blendDst=Ko,this.blendEquation=ts,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=Zs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Gc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ys,this.stencilZFail=ys,this.stencilZPass=ys,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ye(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ye(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Vs&&(n.blending=this.blending),this.side!==Wi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Zo&&(n.blendSrc=this.blendSrc),this.blendDst!==Ko&&(n.blendDst=this.blendDst),this.blendEquation!==ts&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Zs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Gc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ys&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ys&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ys&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Je().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new we().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new we().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Cd extends Xi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Je(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Cs;const lr=new U,Ps=new U,Is=new U,Ls=new we,cr=new we,Pd=new yt,Jr=new U,hr=new U,Qr=new U,nh=new we,Co=new we,ih=new we;class ip extends kt{constructor(e=new Cd){if(super(),this.isSprite=!0,this.type="Sprite",Cs===void 0){Cs=new St;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new tp(t,5);Cs.setIndex([0,1,2,0,2,3]),Cs.setAttribute("position",new Ha(n,3,0,!1)),Cs.setAttribute("uv",new Ha(n,2,3,!1))}this.geometry=Cs,this.material=e,this.center=new we(.5,.5),this.count=1}raycast(e,t){e.camera===null&&ot('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ps.setFromMatrixScale(this.matrixWorld),Pd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Is.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ps.multiplyScalar(-Is.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;jr(Jr.set(-.5,-.5,0),Is,a,Ps,s,r),jr(hr.set(.5,-.5,0),Is,a,Ps,s,r),jr(Qr.set(.5,.5,0),Is,a,Ps,s,r),nh.set(0,0),Co.set(1,0),ih.set(1,1);let o=e.ray.intersectTriangle(Jr,hr,Qr,!1,lr);if(o===null&&(jr(hr.set(-.5,.5,0),Is,a,Ps,s,r),Co.set(0,1),o=e.ray.intersectTriangle(Jr,Qr,hr,!1,lr),o===null))return;const l=e.ray.origin.distanceTo(lr);l<e.near||l>e.far||t.push({distance:l,point:lr.clone(),uv:Fn.getInterpolation(lr,Jr,hr,Qr,nh,Co,ih,new we),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function jr(i,e,t,n,s,r){Ls.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(cr.x=r*Ls.x-s*Ls.y,cr.y=s*Ls.x+r*Ls.y):cr.copy(Ls),i.copy(e),i.x+=cr.x,i.y+=cr.y,i.applyMatrix4(Pd)}const mi=new U,Po=new U,ea=new U,Ni=new U,Io=new U,ta=new U,Lo=new U;class rc{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,mi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=mi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(mi.copy(this.origin).addScaledVector(this.direction,t),mi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Po.copy(e).add(t).multiplyScalar(.5),ea.copy(t).sub(e).normalize(),Ni.copy(this.origin).sub(Po);const r=e.distanceTo(t)*.5,a=-this.direction.dot(ea),o=Ni.dot(this.direction),l=-Ni.dot(ea),c=Ni.lengthSq(),h=Math.abs(1-a*a);let m,u,d,p;if(h>0)if(m=a*l-o,u=a*o-l,p=r*h,m>=0)if(u>=-p)if(u<=p){const x=1/h;m*=x,u*=x,d=m*(m+a*u+2*o)+u*(a*m+u+2*l)+c}else u=r,m=Math.max(0,-(a*u+o)),d=-m*m+u*(u+2*l)+c;else u=-r,m=Math.max(0,-(a*u+o)),d=-m*m+u*(u+2*l)+c;else u<=-p?(m=Math.max(0,-(-a*r+o)),u=m>0?-r:Math.min(Math.max(-r,-l),r),d=-m*m+u*(u+2*l)+c):u<=p?(m=0,u=Math.min(Math.max(-r,-l),r),d=u*(u+2*l)+c):(m=Math.max(0,-(a*r+o)),u=m>0?r:Math.min(Math.max(-r,-l),r),d=-m*m+u*(u+2*l)+c);else u=a>0?-r:r,m=Math.max(0,-(a*u+o)),d=-m*m+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,m),s&&s.copy(Po).addScaledVector(ea,u),d}intersectSphere(e,t){mi.subVectors(e.center,this.origin);const n=mi.dot(this.direction),s=mi.dot(mi)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,m=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),m>=0?(o=(e.min.z-u.z)*m,l=(e.max.z-u.z)*m):(o=(e.max.z-u.z)*m,l=(e.min.z-u.z)*m),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,mi)!==null}intersectTriangle(e,t,n,s,r){Io.subVectors(t,e),ta.subVectors(n,e),Lo.crossVectors(Io,ta);let a=this.direction.dot(Lo),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ni.subVectors(this.origin,e);const l=o*this.direction.dot(ta.crossVectors(Ni,ta));if(l<0)return null;const c=o*this.direction.dot(Io.cross(Ni));if(c<0||l+c>a)return null;const h=-o*Ni.dot(Lo);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class cn extends Xi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ti,this.combine=cd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const sh=new yt,Qi=new rc,na=new ds,rh=new U,ia=new U,sa=new U,ra=new U,Do=new U,aa=new U,ah=new U,oa=new U;class ht extends kt{constructor(e=new St,t=new cn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){aa.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],m=r[l];h!==0&&(Do.fromBufferAttribute(m,e),a?aa.addScaledVector(Do,h):aa.addScaledVector(Do.sub(t),h))}t.add(aa)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),na.copy(n.boundingSphere),na.applyMatrix4(r),Qi.copy(e.ray).recast(e.near),!(na.containsPoint(Qi.origin)===!1&&(Qi.intersectSphere(na,rh)===null||Qi.origin.distanceToSquared(rh)>(e.far-e.near)**2))&&(sh.copy(r).invert(),Qi.copy(e.ray).applyMatrix4(sh),!(n.boundingBox!==null&&Qi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Qi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,m=r.attributes.normal,u=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,x=u.length;p<x;p++){const g=u[p],f=a[g.materialIndex],w=Math.max(g.start,d.start),E=Math.min(o.count,Math.min(g.start+g.count,d.start+d.count));for(let y=w,S=E;y<S;y+=3){const T=o.getX(y),A=o.getX(y+1),v=o.getX(y+2);s=la(this,f,e,n,c,h,m,T,A,v),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const p=Math.max(0,d.start),x=Math.min(o.count,d.start+d.count);for(let g=p,f=x;g<f;g+=3){const w=o.getX(g),E=o.getX(g+1),y=o.getX(g+2);s=la(this,a,e,n,c,h,m,w,E,y),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,x=u.length;p<x;p++){const g=u[p],f=a[g.materialIndex],w=Math.max(g.start,d.start),E=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let y=w,S=E;y<S;y+=3){const T=y,A=y+1,v=y+2;s=la(this,f,e,n,c,h,m,T,A,v),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const p=Math.max(0,d.start),x=Math.min(l.count,d.start+d.count);for(let g=p,f=x;g<f;g+=3){const w=g,E=g+1,y=g+2;s=la(this,a,e,n,c,h,m,w,E,y),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}}function sp(i,e,t,n,s,r,a,o){let l;if(e.side===xn?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Wi,o),l===null)return null;oa.copy(o),oa.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(oa);return c<t.near||c>t.far?null:{distance:c,point:oa.clone(),object:i}}function la(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,ia),i.getVertexPosition(l,sa),i.getVertexPosition(c,ra);const h=sp(i,e,t,n,ia,sa,ra,ah);if(h){const m=new U;Fn.getBarycoord(ah,ia,sa,ra,m),s&&(h.uv=Fn.getInterpolatedAttribute(s,o,l,c,m,new we)),r&&(h.uv1=Fn.getInterpolatedAttribute(r,o,l,c,m,new we)),a&&(h.normal=Fn.getInterpolatedAttribute(a,o,l,c,m,new U),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new U,materialIndex:0};Fn.getNormal(ia,sa,ra,u.normal),h.face=u,h.barycoord=m}return h}class us extends un{constructor(e=null,t=1,n=1,s,r,a,o,l,c=sn,h=sn,m,u){super(null,a,o,l,c,h,s,r,m,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class oh extends fn{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ds=new yt,lh=new yt,ca=[],ch=new hs,rp=new yt,dr=new ht,ur=new ds;class ki extends ht{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new oh(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,rp)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new hs),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ds),ch.copy(e.boundingBox).applyMatrix4(Ds),this.boundingBox.union(ch)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ds),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ds),ur.copy(e.boundingSphere).applyMatrix4(Ds),this.boundingSphere.union(ur)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(dr.geometry=this.geometry,dr.material=this.material,dr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ur.copy(this.boundingSphere),ur.applyMatrix4(n),e.ray.intersectsSphere(ur)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ds),lh.multiplyMatrices(n,Ds),dr.matrixWorld=lh,dr.raycast(e,ca);for(let a=0,o=ca.length;a<o;a++){const l=ca[a];l.instanceId=r,l.object=this,t.push(l)}ca.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new oh(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new us(new Float32Array(s*this.count),s,this.count,Jl,Xn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const No=new U,ap=new U,op=new je;class es{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=No.subVectors(n,t).cross(ap.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(No),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||op.getNormalMatrix(e),s=this.coplanarPoint(No).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ji=new ds,lp=new we(.5,.5),ha=new U;class ac{constructor(e=new es,t=new es,n=new es,s=new es,r=new es,a=new es){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ri,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],m=r[5],u=r[6],d=r[7],p=r[8],x=r[9],g=r[10],f=r[11],w=r[12],E=r[13],y=r[14],S=r[15];if(s[0].setComponents(c-a,d-h,f-p,S-w).normalize(),s[1].setComponents(c+a,d+h,f+p,S+w).normalize(),s[2].setComponents(c+o,d+m,f+x,S+E).normalize(),s[3].setComponents(c-o,d-m,f-x,S-E).normalize(),n)s[4].setComponents(l,u,g,y).normalize(),s[5].setComponents(c-l,d-u,f-g,S-y).normalize();else if(s[4].setComponents(c-l,d-u,f-g,S-y).normalize(),t===ri)s[5].setComponents(c+l,d+u,f+g,S+y).normalize();else if(t===Ir)s[5].setComponents(l,u,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ji.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ji.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ji)}intersectsSprite(e){ji.center.set(0,0,0);const t=lp.distanceTo(e.center);return ji.radius=.7071067811865476+t,ji.applyMatrix4(e.matrixWorld),this.intersectsSphere(ji)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(ha.x=s.normal.x>0?e.max.x:e.min.x,ha.y=s.normal.y>0?e.max.y:e.min.y,ha.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ha)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Js extends Xi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Je(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Va=new U,Wa=new U,hh=new yt,fr=new rc,da=new ds,Uo=new U,dh=new U;class $a extends kt{constructor(e=new St,t=new Js){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Va.fromBufferAttribute(t,s-1),Wa.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Va.distanceTo(Wa);e.setAttribute("lineDistance",new dt(n,1))}else Ye("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),da.copy(n.boundingSphere),da.applyMatrix4(s),da.radius+=r,e.ray.intersectsSphere(da)===!1)return;hh.copy(s).invert(),fr.copy(e.ray).applyMatrix4(hh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const d=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let x=d,g=p-1;x<g;x+=c){const f=h.getX(x),w=h.getX(x+1),E=ua(this,e,fr,l,f,w,x);E&&t.push(E)}if(this.isLineLoop){const x=h.getX(p-1),g=h.getX(d),f=ua(this,e,fr,l,x,g,p-1);f&&t.push(f)}}else{const d=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let x=d,g=p-1;x<g;x+=c){const f=ua(this,e,fr,l,x,x+1,x);f&&t.push(f)}if(this.isLineLoop){const x=ua(this,e,fr,l,p-1,d,p-1);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ua(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(Va.fromBufferAttribute(o,s),Wa.fromBufferAttribute(o,r),t.distanceSqToSegment(Va,Wa,Uo,dh)>n)return;Uo.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Uo);if(!(c<e.near||c>e.far))return{distance:c,point:dh.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const uh=new U,fh=new U;class Id extends $a{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)uh.fromBufferAttribute(t,s),fh.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+uh.distanceTo(fh);e.setAttribute("lineDistance",new dt(n,1))}else Ye("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class cp extends Xi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Je(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ph=new yt,Fl=new rc,fa=new ds,pa=new U;class hp extends kt{constructor(e=new St,t=new cp){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),fa.copy(n.boundingSphere),fa.applyMatrix4(s),fa.radius+=r,e.ray.intersectsSphere(fa)===!1)return;ph.copy(s).invert(),Fl.copy(e.ray).applyMatrix4(ph);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,m=n.attributes.position;if(c!==null){const u=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);for(let p=u,x=d;p<x;p++){const g=c.getX(p);pa.fromBufferAttribute(m,g),mh(pa,g,l,s,e,t,this)}}else{const u=Math.max(0,a.start),d=Math.min(m.count,a.start+a.count);for(let p=u,x=d;p<x;p++)pa.fromBufferAttribute(m,p),mh(pa,p,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function mh(i,e,t,n,s,r,a){const o=Fl.distanceSqToPoint(i);if(o<t){const l=new U;Fl.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Ld extends un{constructor(e=[],t=rs,n,s,r,a,o,l,c,h){super(e,t,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Dr extends un{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Qs extends un{constructor(e,t,n=ci,s,r,a,o=sn,l=sn,c,h=Ei,m=1){if(h!==Ei&&h!==is)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:m};super(u,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new sc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class dp extends Qs{constructor(e,t=ci,n=rs,s,r,a=sn,o=sn,l,c=Ei){const h={width:e,height:e,depth:1},m=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,l,c),this.image=m,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Dd extends un{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Yn extends St{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],m=[];let u=0,d=0;p("z","y","x",-1,-1,n,t,e,a,r,0),p("z","y","x",1,-1,n,t,-e,a,r,1),p("x","z","y",1,1,e,n,t,s,a,2),p("x","z","y",1,-1,e,n,-t,s,a,3),p("x","y","z",1,-1,e,t,n,s,r,4),p("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new dt(c,3)),this.setAttribute("normal",new dt(h,3)),this.setAttribute("uv",new dt(m,2));function p(x,g,f,w,E,y,S,T,A,v,R){const D=y/A,N=S/v,k=y/2,G=S/2,X=T/2,F=A+1,Z=v+1;let H=0,$=0;const Q=new U;for(let V=0;V<Z;V++){const ee=V*N-G;for(let J=0;J<F;J++){const ve=J*D-k;Q[x]=ve*w,Q[g]=ee*E,Q[f]=X,c.push(Q.x,Q.y,Q.z),Q[x]=0,Q[g]=0,Q[f]=T>0?1:-1,h.push(Q.x,Q.y,Q.z),m.push(J/A),m.push(1-V/v),H+=1}}for(let V=0;V<v;V++)for(let ee=0;ee<A;ee++){const J=u+ee+F*V,ve=u+ee+F*(V+1),Oe=u+(ee+1)+F*(V+1),he=u+(ee+1)+F*V;l.push(J,ve,he),l.push(ve,Oe,he),$+=6}o.addGroup(d,$,R),d+=$,u+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ct extends St{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],m=[],u=[],d=[];let p=0;const x=[],g=n/2;let f=0;w(),a===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new dt(m,3)),this.setAttribute("normal",new dt(u,3)),this.setAttribute("uv",new dt(d,2));function w(){const y=new U,S=new U;let T=0;const A=(t-e)/n;for(let v=0;v<=r;v++){const R=[],D=v/r,N=D*(t-e)+e;for(let k=0;k<=s;k++){const G=k/s,X=G*l+o,F=Math.sin(X),Z=Math.cos(X);S.x=N*F,S.y=-D*n+g,S.z=N*Z,m.push(S.x,S.y,S.z),y.set(F,A,Z).normalize(),u.push(y.x,y.y,y.z),d.push(G,1-D),R.push(p++)}x.push(R)}for(let v=0;v<s;v++)for(let R=0;R<r;R++){const D=x[R][v],N=x[R+1][v],k=x[R+1][v+1],G=x[R][v+1];(e>0||R!==0)&&(h.push(D,N,G),T+=3),(t>0||R!==r-1)&&(h.push(N,k,G),T+=3)}c.addGroup(f,T,0),f+=T}function E(y){const S=p,T=new we,A=new U;let v=0;const R=y===!0?e:t,D=y===!0?1:-1;for(let k=1;k<=s;k++)m.push(0,g*D,0),u.push(0,D,0),d.push(.5,.5),p++;const N=p;for(let k=0;k<=s;k++){const X=k/s*l+o,F=Math.cos(X),Z=Math.sin(X);A.x=R*Z,A.y=g*D,A.z=R*F,m.push(A.x,A.y,A.z),u.push(0,D,0),T.x=F*.5+.5,T.y=Z*.5*D+.5,d.push(T.x,T.y),p++}for(let k=0;k<s;k++){const G=S+k,X=N+k;y===!0?h.push(X,X+1,G):h.push(X+1,X,G),v+=3}c.addGroup(f,v,y===!0?1:2),f+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ct(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class hi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ye("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const h=n[s],u=n[s+1]-h,d=(a-h)/u;return(s+d)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new we:new U);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new U,s=[],r=[],a=[],o=new U,l=new yt;for(let d=0;d<=e;d++){const p=d/e;s[d]=this.getTangentAt(p,new U)}r[0]=new U,a[0]=new U;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),m=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),m<=c&&(c=m,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos(nt(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,p))}a[d].crossVectors(s[d],r[d])}if(t===!0){let d=Math.acos(nt(r[0].dot(r[e]),-1,1));d/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(d=-d);for(let p=1;p<=e;p++)r[p].applyMatrix4(l.makeRotationAxis(s[p],d*p)),a[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class oc extends hi{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new we){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),m=Math.sin(this.aRotation),u=l-this.aX,d=c-this.aY;l=u*h-d*m+this.aX,c=u*m+d*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class up extends oc{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function lc(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,m){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,d=(o-a)/h-(l-a)/(h+m)+(l-o)/m;u*=h,d*=h,s(a,o,u,d)},calc:function(r){const a=r*r,o=a*r;return i+e*r+t*a+n*o}}}const gh=new U,vh=new U,ko=new lc,Fo=new lc,Oo=new lc;class Xa extends hi{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new U){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(vh.subVectors(s[0],s[1]).add(s[0]),c=vh);const m=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(gh.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=gh),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(m),d),x=Math.pow(m.distanceToSquared(u),d),g=Math.pow(u.distanceToSquared(h),d);x<1e-4&&(x=1),p<1e-4&&(p=x),g<1e-4&&(g=x),ko.initNonuniformCatmullRom(c.x,m.x,u.x,h.x,p,x,g),Fo.initNonuniformCatmullRom(c.y,m.y,u.y,h.y,p,x,g),Oo.initNonuniformCatmullRom(c.z,m.z,u.z,h.z,p,x,g)}else this.curveType==="catmullrom"&&(ko.initCatmullRom(c.x,m.x,u.x,h.x,this.tension),Fo.initCatmullRom(c.y,m.y,u.y,h.y,this.tension),Oo.initCatmullRom(c.z,m.z,u.z,h.z,this.tension));return n.set(ko.calc(l),Fo.calc(l),Oo.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new U().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function yh(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function fp(i,e){const t=1-i;return t*t*e}function pp(i,e){return 2*(1-i)*i*e}function mp(i,e){return i*i*e}function Tr(i,e,t,n){return fp(i,e)+pp(i,t)+mp(i,n)}function gp(i,e){const t=1-i;return t*t*t*e}function vp(i,e){const t=1-i;return 3*t*t*i*e}function yp(i,e){return 3*(1-i)*i*i*e}function xp(i,e){return i*i*i*e}function Ar(i,e,t,n,s){return gp(i,e)+vp(i,t)+yp(i,n)+xp(i,s)}class Nd extends hi{constructor(e=new we,t=new we,n=new we,s=new we){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new we){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ar(e,s.x,r.x,a.x,o.x),Ar(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ud extends hi{constructor(e=new U,t=new U,n=new U,s=new U){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new U){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ar(e,s.x,r.x,a.x,o.x),Ar(e,s.y,r.y,a.y,o.y),Ar(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class kd extends hi{constructor(e=new we,t=new we){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new we){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new we){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class bp extends hi{constructor(e=new U,t=new U){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new U){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new U){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Fd extends hi{constructor(e=new we,t=new we,n=new we){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new we){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Tr(e,s.x,r.x,a.x),Tr(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Od extends hi{constructor(e=new U,t=new U,n=new U){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new U){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Tr(e,s.x,r.x,a.x),Tr(e,s.y,r.y,a.y),Tr(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class cc extends hi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new we){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],m=s[a>s.length-3?s.length-1:a+2];return n.set(yh(o,l.x,c.x,h.x,m.x),yh(o,l.y,c.y,h.y,m.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new we().fromArray(s))}return this}}var qa=Object.freeze({__proto__:null,ArcCurve:up,CatmullRomCurve3:Xa,CubicBezierCurve:Nd,CubicBezierCurve3:Ud,EllipseCurve:oc,LineCurve:kd,LineCurve3:bp,QuadraticBezierCurve:Fd,QuadraticBezierCurve3:Od,SplineCurve:cc});class _p extends hi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new qa[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new qa[s.type]().fromJSON(s))}return this}}class hn extends _p{constructor(e){super(),this.type="Path",this.currentPoint=new we,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new kd(this.currentPoint.clone(),new we(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new Fd(this.currentPoint.clone(),new we(e,t),new we(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){const o=new Nd(this.currentPoint.clone(),new we(e,t),new we(n,s),new we(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new cc(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,s,r,a,o,l),this}absellipse(e,t,n,s,r,a,o,l){const c=new oc(e,t,n,s,r,a,o,l);if(this.curves.length>0){const m=c.getPoint(0);m.equals(this.currentPoint)||this.lineTo(m.x,m.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class nn extends hn{constructor(e){super(e),this.uuid=oi(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new hn().fromJSON(s))}return this}}function wp(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=Bd(i,0,s,t,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=Ap(i,e,r,t)),i.length>80*t){o=i[0],l=i[1];let h=o,m=l;for(let u=t;u<s;u+=t){const d=i[u],p=i[u+1];d<o&&(o=d),p<l&&(l=p),d>h&&(h=d),p>m&&(m=p)}c=Math.max(h-o,m-l),c=c!==0?32767/c:0}return Nr(r,a,t,o,l,c,0),a}function Bd(i,e,t,n,s){let r;if(s===Op(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=xh(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=xh(a/n|0,i[a],i[a+1],r);return r&&js(r,r.next)&&(kr(r),r=r.next),r}function os(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(js(t,t.next)||Ut(t.prev,t,t.next)===0)){if(kr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Nr(i,e,t,n,s,r,a){if(!i)return;!a&&r&&Lp(i,n,s,r);let o=i;for(;i.prev!==i.next;){const l=i.prev,c=i.next;if(r?Sp(i,n,s,r):Mp(i)){e.push(l.i,i.i,c.i),kr(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=Ep(os(i),e),Nr(i,e,t,n,s,r,2)):a===2&&Tp(i,e,t,n,s,r):Nr(os(i),e,t,n,s,r,1);break}}}function Mp(i){const e=i.prev,t=i,n=i.next;if(Ut(e,t,n)>=0)return!1;const s=e.x,r=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(s,r,a),m=Math.min(o,l,c),u=Math.max(s,r,a),d=Math.max(o,l,c);let p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=u&&p.y>=m&&p.y<=d&&xr(s,o,r,l,a,c,p.x,p.y)&&Ut(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Sp(i,e,t,n){const s=i.prev,r=i,a=i.next;if(Ut(s,r,a)>=0)return!1;const o=s.x,l=r.x,c=a.x,h=s.y,m=r.y,u=a.y,d=Math.min(o,l,c),p=Math.min(h,m,u),x=Math.max(o,l,c),g=Math.max(h,m,u),f=Ol(d,p,e,t,n),w=Ol(x,g,e,t,n);let E=i.prevZ,y=i.nextZ;for(;E&&E.z>=f&&y&&y.z<=w;){if(E.x>=d&&E.x<=x&&E.y>=p&&E.y<=g&&E!==s&&E!==a&&xr(o,h,l,m,c,u,E.x,E.y)&&Ut(E.prev,E,E.next)>=0||(E=E.prevZ,y.x>=d&&y.x<=x&&y.y>=p&&y.y<=g&&y!==s&&y!==a&&xr(o,h,l,m,c,u,y.x,y.y)&&Ut(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;E&&E.z>=f;){if(E.x>=d&&E.x<=x&&E.y>=p&&E.y<=g&&E!==s&&E!==a&&xr(o,h,l,m,c,u,E.x,E.y)&&Ut(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;y&&y.z<=w;){if(y.x>=d&&y.x<=x&&y.y>=p&&y.y<=g&&y!==s&&y!==a&&xr(o,h,l,m,c,u,y.x,y.y)&&Ut(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Ep(i,e){let t=i;do{const n=t.prev,s=t.next.next;!js(n,s)&&Gd(n,t,t.next,s)&&Ur(n,s)&&Ur(s,n)&&(e.push(n.i,t.i,s.i),kr(t),kr(t.next),t=i=s),t=t.next}while(t!==i);return os(t)}function Tp(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Up(a,o)){let l=Hd(a,o);a=os(a,a.next),l=os(l,l.next),Nr(a,e,t,n,s,r,0),Nr(l,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function Ap(i,e,t,n){const s=[];for(let r=0,a=e.length;r<a;r++){const o=e[r]*n,l=r<a-1?e[r+1]*n:i.length,c=Bd(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(Np(c))}s.sort(Rp);for(let r=0;r<s.length;r++)t=Cp(s[r],t);return t}function Rp(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Cp(i,e){const t=Pp(i,e);if(!t)return e;const n=Hd(t,i);return os(n,n.next),os(t,t.next)}function Pp(i,e){let t=e;const n=i.x,s=i.y;let r=-1/0,a;if(js(i,t))return t;do{if(js(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const m=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(m<=n&&m>r&&(r=m,a=t.x<t.next.x?t:t.next,m===n))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let h=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&zd(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){const m=Math.abs(s-t.y)/(n-t.x);Ur(t,i)&&(m<h||m===h&&(t.x>a.x||t.x===a.x&&Ip(a,t)))&&(a=t,h=m)}t=t.next}while(t!==o);return a}function Ip(i,e){return Ut(i.prev,i,e.prev)<0&&Ut(e.next,i,i.next)<0}function Lp(i,e,t,n){let s=i;do s.z===0&&(s.z=Ol(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Dp(s)}function Dp(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function Ol(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Np(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function zd(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function xr(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&zd(i,e,t,n,s,r,a,o)}function Up(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!kp(i,e)&&(Ur(i,e)&&Ur(e,i)&&Fp(i,e)&&(Ut(i.prev,i,e.prev)||Ut(i,e.prev,e))||js(i,e)&&Ut(i.prev,i,i.next)>0&&Ut(e.prev,e,e.next)>0)}function Ut(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function js(i,e){return i.x===e.x&&i.y===e.y}function Gd(i,e,t,n){const s=ga(Ut(i,e,t)),r=ga(Ut(i,e,n)),a=ga(Ut(t,n,i)),o=ga(Ut(t,n,e));return!!(s!==r&&a!==o||s===0&&ma(i,t,e)||r===0&&ma(i,n,e)||a===0&&ma(t,i,n)||o===0&&ma(t,e,n))}function ma(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function ga(i){return i>0?1:i<0?-1:0}function kp(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Gd(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Ur(i,e){return Ut(i.prev,i,i.next)<0?Ut(i,e,i.next)>=0&&Ut(i,i.prev,e)>=0:Ut(i,e,i.prev)<0||Ut(i,i.next,e)<0}function Fp(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Hd(i,e){const t=Bl(i.i,i.x,i.y),n=Bl(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function xh(i,e,t,n){const s=Bl(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function kr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Bl(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Op(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class Bp{static triangulate(e,t,n=2){return wp(e,t,n)}}class bi{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return bi.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];bh(e),_h(n,e);let a=e.length;t.forEach(bh);for(let l=0;l<t.length;l++)s.push(a),a+=t[l].length,_h(n,t[l]);const o=Bp.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function bh(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function _h(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class On extends St{constructor(e=new nn([new we(.5,.5),new we(-.5,.5),new we(-.5,-.5),new we(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new dt(s,3)),this.setAttribute("uv",new dt(r,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,m=t.depth!==void 0?t.depth:1;let u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:d-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const f=t.extrudePath,w=t.UVGenerator!==void 0?t.UVGenerator:zp;let E,y=!1,S,T,A,v;if(f){E=f.getSpacedPoints(h),y=!0,u=!1;const de=f.isCatmullRomCurve3?f.closed:!1;S=f.computeFrenetFrames(h,de),T=new U,A=new U,v=new U}u||(g=0,d=0,p=0,x=0);const R=o.extractPoints(c);let D=R.shape;const N=R.holes;if(!bi.isClockWise(D)){D=D.reverse();for(let de=0,P=N.length;de<P;de++){const z=N[de];bi.isClockWise(z)&&(N[de]=z.reverse())}}function G(de){const z=10000000000000001e-36;let ne=de[0];for(let ye=1;ye<=de.length;ye++){const Ae=ye%de.length,Te=de[Ae],Fe=Te.x-ne.x,Be=Te.y-ne.y,O=Fe*Fe+Be*Be,Xe=Math.max(Math.abs(Te.x),Math.abs(Te.y),Math.abs(ne.x),Math.abs(ne.y)),qe=z*Xe*Xe;if(O<=qe){de.splice(Ae,1),ye--;continue}ne=Te}}G(D),N.forEach(G);const X=N.length,F=D;for(let de=0;de<X;de++){const P=N[de];D=D.concat(P)}function Z(de,P,z){return P||ot("ExtrudeGeometry: vec does not exist"),de.clone().addScaledVector(P,z)}const H=D.length;function $(de,P,z){let ne,ye,Ae;const Te=de.x-P.x,Fe=de.y-P.y,Be=z.x-de.x,O=z.y-de.y,Xe=Te*Te+Fe*Fe,qe=Te*O-Fe*Be;if(Math.abs(qe)>Number.EPSILON){const C=Math.sqrt(Xe),b=Math.sqrt(Be*Be+O*O),_=P.x-Fe/C,I=P.y+Te/C,B=z.x-O/b,se=z.y+Be/b,me=((B-_)*O-(se-I)*Be)/(Te*O-Fe*Be);ne=_+Te*me-de.x,ye=I+Fe*me-de.y;const j=ne*ne+ye*ye;if(j<=2)return new we(ne,ye);Ae=Math.sqrt(j/2)}else{let C=!1;Te>Number.EPSILON?Be>Number.EPSILON&&(C=!0):Te<-Number.EPSILON?Be<-Number.EPSILON&&(C=!0):Math.sign(Fe)===Math.sign(O)&&(C=!0),C?(ne=-Fe,ye=Te,Ae=Math.sqrt(Xe)):(ne=Te,ye=Fe,Ae=Math.sqrt(Xe/2))}return new we(ne/Ae,ye/Ae)}const Q=[];for(let de=0,P=F.length,z=P-1,ne=de+1;de<P;de++,z++,ne++)z===P&&(z=0),ne===P&&(ne=0),Q[de]=$(F[de],F[z],F[ne]);const V=[];let ee,J=Q.concat();for(let de=0,P=X;de<P;de++){const z=N[de];ee=[];for(let ne=0,ye=z.length,Ae=ye-1,Te=ne+1;ne<ye;ne++,Ae++,Te++)Ae===ye&&(Ae=0),Te===ye&&(Te=0),ee[ne]=$(z[ne],z[Ae],z[Te]);V.push(ee),J=J.concat(ee)}let ve;if(g===0)ve=bi.triangulateShape(F,N);else{const de=[],P=[];for(let z=0;z<g;z++){const ne=z/g,ye=d*Math.cos(ne*Math.PI/2),Ae=p*Math.sin(ne*Math.PI/2)+x;for(let Te=0,Fe=F.length;Te<Fe;Te++){const Be=Z(F[Te],Q[Te],Ae);be(Be.x,Be.y,-ye),ne===0&&de.push(Be)}for(let Te=0,Fe=X;Te<Fe;Te++){const Be=N[Te];ee=V[Te];const O=[];for(let Xe=0,qe=Be.length;Xe<qe;Xe++){const C=Z(Be[Xe],ee[Xe],Ae);be(C.x,C.y,-ye),ne===0&&O.push(C)}ne===0&&P.push(O)}}ve=bi.triangulateShape(de,P)}const Oe=ve.length,he=p+x;for(let de=0;de<H;de++){const P=u?Z(D[de],J[de],he):D[de];y?(A.copy(S.normals[0]).multiplyScalar(P.x),T.copy(S.binormals[0]).multiplyScalar(P.y),v.copy(E[0]).add(A).add(T),be(v.x,v.y,v.z)):be(P.x,P.y,0)}for(let de=1;de<=h;de++)for(let P=0;P<H;P++){const z=u?Z(D[P],J[P],he):D[P];y?(A.copy(S.normals[de]).multiplyScalar(z.x),T.copy(S.binormals[de]).multiplyScalar(z.y),v.copy(E[de]).add(A).add(T),be(v.x,v.y,v.z)):be(z.x,z.y,m/h*de)}for(let de=g-1;de>=0;de--){const P=de/g,z=d*Math.cos(P*Math.PI/2),ne=p*Math.sin(P*Math.PI/2)+x;for(let ye=0,Ae=F.length;ye<Ae;ye++){const Te=Z(F[ye],Q[ye],ne);be(Te.x,Te.y,m+z)}for(let ye=0,Ae=N.length;ye<Ae;ye++){const Te=N[ye];ee=V[ye];for(let Fe=0,Be=Te.length;Fe<Be;Fe++){const O=Z(Te[Fe],ee[Fe],ne);y?be(O.x,O.y+E[h-1].y,E[h-1].x+z):be(O.x,O.y,m+z)}}}K(),fe();function K(){const de=s.length/3;if(u){let P=0,z=H*P;for(let ne=0;ne<Oe;ne++){const ye=ve[ne];_e(ye[2]+z,ye[1]+z,ye[0]+z)}P=h+g*2,z=H*P;for(let ne=0;ne<Oe;ne++){const ye=ve[ne];_e(ye[0]+z,ye[1]+z,ye[2]+z)}}else{for(let P=0;P<Oe;P++){const z=ve[P];_e(z[2],z[1],z[0])}for(let P=0;P<Oe;P++){const z=ve[P];_e(z[0]+H*h,z[1]+H*h,z[2]+H*h)}}n.addGroup(de,s.length/3-de,0)}function fe(){const de=s.length/3;let P=0;ue(F,P),P+=F.length;for(let z=0,ne=N.length;z<ne;z++){const ye=N[z];ue(ye,P),P+=ye.length}n.addGroup(de,s.length/3-de,1)}function ue(de,P){let z=de.length;for(;--z>=0;){const ne=z;let ye=z-1;ye<0&&(ye=de.length-1);for(let Ae=0,Te=h+g*2;Ae<Te;Ae++){const Fe=H*Ae,Be=H*(Ae+1),O=P+ne+Fe,Xe=P+ye+Fe,qe=P+ye+Be,C=P+ne+Be;Ie(O,Xe,qe,C)}}}function be(de,P,z){l.push(de),l.push(P),l.push(z)}function _e(de,P,z){Ze(de),Ze(P),Ze(z);const ne=s.length/3,ye=w.generateTopUV(n,s,ne-3,ne-2,ne-1);Le(ye[0]),Le(ye[1]),Le(ye[2])}function Ie(de,P,z,ne){Ze(de),Ze(P),Ze(ne),Ze(P),Ze(z),Ze(ne);const ye=s.length/3,Ae=w.generateSideWallUV(n,s,ye-6,ye-3,ye-2,ye-1);Le(Ae[0]),Le(Ae[1]),Le(Ae[3]),Le(Ae[1]),Le(Ae[2]),Le(Ae[3])}function Ze(de){s.push(l[de*3+0]),s.push(l[de*3+1]),s.push(l[de*3+2])}function Le(de){r.push(de.x),r.push(de.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Gp(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,a=e.shapes.length;r<a;r++){const o=t[e.shapes[r]];n.push(o)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new qa[s.type]().fromJSON(s)),new On(n,e.options)}}const zp={generateTopUV:function(i,e,t,n,s){const r=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[s*3],h=e[s*3+1];return[new we(r,a),new we(o,l),new we(c,h)]},generateSideWallUV:function(i,e,t,n,s,r){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],m=e[n*3+2],u=e[s*3],d=e[s*3+1],p=e[s*3+2],x=e[r*3],g=e[r*3+1],f=e[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new we(a,1-l),new we(c,1-m),new we(u,1-p),new we(x,1-f)]:[new we(o,1-l),new we(h,1-m),new we(d,1-p),new we(g,1-f)]}};function Gp(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class hc extends St{constructor(e=[new we(0,-.5),new we(.5,0),new we(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=nt(s,0,Math.PI*2);const r=[],a=[],o=[],l=[],c=[],h=1/t,m=new U,u=new we,d=new U,p=new U,x=new U;let g=0,f=0;for(let w=0;w<=e.length-1;w++)switch(w){case 0:g=e[w+1].x-e[w].x,f=e[w+1].y-e[w].y,d.x=f*1,d.y=-g,d.z=f*0,x.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case e.length-1:l.push(x.x,x.y,x.z);break;default:g=e[w+1].x-e[w].x,f=e[w+1].y-e[w].y,d.x=f*1,d.y=-g,d.z=f*0,p.copy(d),d.x+=x.x,d.y+=x.y,d.z+=x.z,d.normalize(),l.push(d.x,d.y,d.z),x.copy(p)}for(let w=0;w<=t;w++){const E=n+w*h*s,y=Math.sin(E),S=Math.cos(E);for(let T=0;T<=e.length-1;T++){m.x=e[T].x*y,m.y=e[T].y,m.z=e[T].x*S,a.push(m.x,m.y,m.z),u.x=w/t,u.y=T/(e.length-1),o.push(u.x,u.y);const A=l[3*T+0]*y,v=l[3*T+1],R=l[3*T+0]*S;c.push(A,v,R)}}for(let w=0;w<t;w++)for(let E=0;E<e.length-1;E++){const y=E+w*e.length,S=y,T=y+e.length,A=y+e.length+1,v=y+1;r.push(S,T,v),r.push(A,v,T)}this.setIndex(r),this.setAttribute("position",new dt(a,3)),this.setAttribute("uv",new dt(o,2)),this.setAttribute("normal",new dt(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hc(e.points,e.segments,e.phiStart,e.phiLength)}}class Bn extends St{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,m=e/o,u=t/l,d=[],p=[],x=[],g=[];for(let f=0;f<h;f++){const w=f*u-a;for(let E=0;E<c;E++){const y=E*m-r;p.push(y,-w,0),x.push(0,0,1),g.push(E/o),g.push(1-f/l)}}for(let f=0;f<l;f++)for(let w=0;w<o;w++){const E=w+c*f,y=w+c*(f+1),S=w+1+c*(f+1),T=w+1+c*f;d.push(E,y,T),d.push(y,S,T)}this.setIndex(d),this.setAttribute("position",new dt(p,3)),this.setAttribute("normal",new dt(x,3)),this.setAttribute("uv",new dt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bn(e.width,e.height,e.widthSegments,e.heightSegments)}}class dc extends St{constructor(e=new nn([new we(0,.5),new we(-.5,-.5),new we(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],s=[],r=[],a=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new dt(s,3)),this.setAttribute("normal",new dt(r,3)),this.setAttribute("uv",new dt(a,2));function c(h){const m=s.length/3,u=h.extractPoints(t);let d=u.shape;const p=u.holes;bi.isClockWise(d)===!1&&(d=d.reverse());for(let g=0,f=p.length;g<f;g++){const w=p[g];bi.isClockWise(w)===!0&&(p[g]=w.reverse())}const x=bi.triangulateShape(d,p);for(let g=0,f=p.length;g<f;g++){const w=p[g];d=d.concat(w)}for(let g=0,f=d.length;g<f;g++){const w=d[g];s.push(w.x,w.y,0),r.push(0,0,1),a.push(w.x,w.y)}for(let g=0,f=x.length;g<f;g++){const w=x[g],E=w[0]+m,y=w[1]+m,S=w[2]+m;n.push(E,y,S),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return Hp(t,e)}static fromJSON(e,t){const n=[];for(let s=0,r=e.shapes.length;s<r;s++){const a=t[e.shapes[s]];n.push(a)}return new dc(n,e.curveSegments)}}function Hp(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){const s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}class fs extends St{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],m=new U,u=new U,d=[],p=[],x=[],g=[];for(let f=0;f<=n;f++){const w=[],E=f/n,y=a+E*o,S=e*Math.cos(y),T=Math.sqrt(e*e-S*S);let A=0;f===0&&a===0?A=.5/t:f===n&&l===Math.PI&&(A=-.5/t);for(let v=0;v<=t;v++){const R=v/t,D=s+R*r;m.x=-T*Math.cos(D),m.y=S,m.z=T*Math.sin(D),p.push(m.x,m.y,m.z),u.copy(m).normalize(),x.push(u.x,u.y,u.z),g.push(R+A,1-E),w.push(c++)}h.push(w)}for(let f=0;f<n;f++)for(let w=0;w<t;w++){const E=h[f][w+1],y=h[f][w],S=h[f+1][w],T=h[f+1][w+1];(f!==0||a>0)&&d.push(E,y,T),(f!==n-1||l<Math.PI)&&d.push(y,S,T)}this.setIndex(d),this.setAttribute("position",new dt(p,3)),this.setAttribute("normal",new dt(x,3)),this.setAttribute("uv",new dt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fs(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ps extends St{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);const l=[],c=[],h=[],m=[],u=new U,d=new U,p=new U;for(let x=0;x<=n;x++){const g=a+x/n*o;for(let f=0;f<=s;f++){const w=f/s*r;d.x=(e+t*Math.cos(g))*Math.cos(w),d.y=(e+t*Math.cos(g))*Math.sin(w),d.z=t*Math.sin(g),c.push(d.x,d.y,d.z),u.x=e*Math.cos(w),u.y=e*Math.sin(w),p.subVectors(d,u).normalize(),h.push(p.x,p.y,p.z),m.push(f/s),m.push(x/n)}}for(let x=1;x<=n;x++)for(let g=1;g<=s;g++){const f=(s+1)*x+g-1,w=(s+1)*(x-1)+g-1,E=(s+1)*(x-1)+g,y=(s+1)*x+g;l.push(f,w,y),l.push(w,E,y)}this.setIndex(l),this.setAttribute("position",new dt(c,3)),this.setAttribute("normal",new dt(h,3)),this.setAttribute("uv",new dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ps(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Fr extends St{constructor(e=new Od(new U(-1,-1,0),new U(-1,1,0),new U(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new U,l=new U,c=new we;let h=new U;const m=[],u=[],d=[],p=[];x(),this.setIndex(p),this.setAttribute("position",new dt(m,3)),this.setAttribute("normal",new dt(u,3)),this.setAttribute("uv",new dt(d,2));function x(){for(let E=0;E<t;E++)g(E);g(r===!1?t:0),w(),f()}function g(E){h=e.getPointAt(E/t,h);const y=a.normals[E],S=a.binormals[E];for(let T=0;T<=s;T++){const A=T/s*Math.PI*2,v=Math.sin(A),R=-Math.cos(A);l.x=R*y.x+v*S.x,l.y=R*y.y+v*S.y,l.z=R*y.z+v*S.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,m.push(o.x,o.y,o.z)}}function f(){for(let E=1;E<=t;E++)for(let y=1;y<=s;y++){const S=(s+1)*(E-1)+(y-1),T=(s+1)*E+(y-1),A=(s+1)*E+y,v=(s+1)*(E-1)+y;p.push(S,T,v),p.push(T,A,v)}}function w(){for(let E=0;E<=t;E++)for(let y=0;y<=s;y++)c.x=E/t,c.y=y/s,d.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Fr(new qa[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}function er(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(wh(s))s.isRenderTargetTexture?(Ye("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(wh(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function vn(i){const e={};for(let t=0;t<i.length;t++){const n=er(i[t]);for(const s in n)e[s]=n[s]}return e}function wh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Vp(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Vd(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:lt.workingColorSpace}const Wp={clone:er,merge:vn};var $p=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Xp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class bn extends Xi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$p,this.fragmentShader=Xp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=er(e.uniforms),this.uniformsGroups=Vp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Je().setHex(s.value);break;case"v2":this.uniforms[n].value=new we().fromArray(s.value);break;case"v3":this.uniforms[n].value=new U().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Nt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new je().fromArray(s.value);break;case"m4":this.uniforms[n].value=new yt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class qp extends bn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class gt extends Xi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ul,this.normalScale=new we(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ti,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class En extends gt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new we(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return nt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Je(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Je(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Je(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Yp extends Xi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=df,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Zp extends Xi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Kp extends Js{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class uc extends kt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Je(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Jp extends uc{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Je(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Bo=new yt,Mh=new U,Sh=new U;class Wd{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new we(512,512),this.mapType=An,this.map=null,this.mapPass=null,this.matrix=new yt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ac,this._frameExtents=new we(1,1),this._viewportCount=1,this._viewports=[new Nt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Mh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Mh),Sh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Sh),t.updateMatrixWorld(),Bo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Bo,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Ir||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Bo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const va=new U,ya=new cs,Jn=new U;class $d extends kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new yt,this.projectionMatrix=new yt,this.projectionMatrixInverse=new yt,this.coordinateSystem=ri,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(va,ya,Jn),Jn.x===1&&Jn.y===1&&Jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(va,ya,Jn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(va,ya,Jn),Jn.x===1&&Jn.y===1&&Jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(va,ya,Jn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ui=new U,Eh=new we,Th=new we;class Tn extends $d{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Lr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Sr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Lr*2*Math.atan(Math.tan(Sr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ui.x,Ui.y).multiplyScalar(-e/Ui.z),Ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ui.x,Ui.y).multiplyScalar(-e/Ui.z)}getViewSize(e,t){return this.getViewBounds(e,Eh,Th),t.subVectors(Th,Eh)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Sr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Qp extends Wd{constructor(){super(new Tn(90,1,.5,500)),this.isPointLightShadow=!0}}class jp extends uc{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Qp}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class io extends $d{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class em extends Wd{constructor(){super(new io(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class tm extends uc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.target=new kt,this.shadow=new em}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const Ns=-90,Us=1;class nm extends kt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Tn(Ns,Us,e,t);s.layers=this.layers,this.add(s);const r=new Tn(Ns,Us,e,t);r.layers=this.layers,this.add(r);const a=new Tn(Ns,Us,e,t);a.layers=this.layers,this.add(a);const o=new Tn(Ns,Us,e,t);o.layers=this.layers,this.add(o);const l=new Tn(Ns,Us,e,t);l.layers=this.layers,this.add(l);const c=new Tn(Ns,Us,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===ri)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ir)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,m=e.getRenderTarget(),u=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(m,u,d),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class im extends Tn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const _c=class _c{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};_c.prototype.isMatrix2=!0;let Ah=_c;function Rh(i,e,t,n){const s=sm(n);switch(t){case _d:return i*e;case Jl:return i*e/s.components*s.byteLength;case Ql:return i*e/s.components*s.byteLength;case as:return i*e*2/s.components*s.byteLength;case jl:return i*e*2/s.components*s.byteLength;case wd:return i*e*3/s.components*s.byteLength;case qn:return i*e*4/s.components*s.byteLength;case ec:return i*e*4/s.components*s.byteLength;case Sa:case Ea:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ta:case Aa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case al:case ll:return Math.max(i,16)*Math.max(e,8)/4;case rl:case ol:return Math.max(i,8)*Math.max(e,8)/2;case cl:case hl:case ul:case fl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case dl:case ka:case pl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ml:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case gl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case vl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case yl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case xl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case bl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case _l:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case wl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Ml:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Sl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case El:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Tl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Al:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Rl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Cl:case Pl:case Il:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ll:case Dl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Fa:case Nl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function sm(i){switch(i){case An:case vd:return{byteLength:1,components:1};case Cr:case yd:case Si:return{byteLength:2,components:1};case Zl:case Kl:return{byteLength:2,components:4};case ci:case Yl:case Xn:return{byteLength:4,components:1};case xd:case bd:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Xl}}));typeof window<"u"&&(window.__THREE__?Ye("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Xl);function Xd(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function rm(i){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,m=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:m}}function n(o,l,c){const h=l.array,m=l.updateRanges;if(i.bindBuffer(c,o),m.length===0)i.bufferSubData(c,0,h);else{m.sort((d,p)=>d.start-p.start);let u=0;for(let d=1;d<m.length;d++){const p=m[u],x=m[d];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++u,m[u]=x)}m.length=u+1;for(let d=0,p=m.length;d<p;d++){const x=m[d];i.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var am=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,om=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,lm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,cm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,dm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,um=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,fm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,pm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,mm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,gm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,vm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ym=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,xm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,_m=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,wm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Mm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Sm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Em=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Tm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Am=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Rm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Cm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Pm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Im=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Lm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Dm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Nm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Um=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,km="gl_FragColor = linearToOutputTexel( gl_FragColor );",Fm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Om=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Bm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,zm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Gm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Hm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Vm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Wm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,$m=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Xm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,qm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ym=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Zm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Km=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Jm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Qm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,jm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,e0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,t0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,n0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,i0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,s0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,r0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,a0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,o0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,l0=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,c0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,h0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,d0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,u0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,f0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,p0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,m0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,g0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,v0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,y0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,x0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,b0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,w0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,M0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,S0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,E0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,T0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,A0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,R0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,C0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,P0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,I0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,L0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,D0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,N0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,U0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,k0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,F0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,O0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,B0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,z0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,G0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,H0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,V0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,W0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,$0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,X0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,q0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Y0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Z0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,K0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,J0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Q0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,j0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,eg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,tg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ng=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,sg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,rg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ag=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,og=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ug=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,fg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,pg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,mg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,gg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,vg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,xg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,_g=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Mg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Eg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Ag=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Rg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ig=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ng=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ug=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,kg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Og=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Bg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,tt={alphahash_fragment:am,alphahash_pars_fragment:om,alphamap_fragment:lm,alphamap_pars_fragment:cm,alphatest_fragment:hm,alphatest_pars_fragment:dm,aomap_fragment:um,aomap_pars_fragment:fm,batching_pars_vertex:pm,batching_vertex:mm,begin_vertex:gm,beginnormal_vertex:vm,bsdfs:ym,iridescence_fragment:xm,bumpmap_pars_fragment:bm,clipping_planes_fragment:_m,clipping_planes_pars_fragment:wm,clipping_planes_pars_vertex:Mm,clipping_planes_vertex:Sm,color_fragment:Em,color_pars_fragment:Tm,color_pars_vertex:Am,color_vertex:Rm,common:Cm,cube_uv_reflection_fragment:Pm,defaultnormal_vertex:Im,displacementmap_pars_vertex:Lm,displacementmap_vertex:Dm,emissivemap_fragment:Nm,emissivemap_pars_fragment:Um,colorspace_fragment:km,colorspace_pars_fragment:Fm,envmap_fragment:Om,envmap_common_pars_fragment:Bm,envmap_pars_fragment:zm,envmap_pars_vertex:Gm,envmap_physical_pars_fragment:Qm,envmap_vertex:Hm,fog_vertex:Vm,fog_pars_vertex:Wm,fog_fragment:$m,fog_pars_fragment:Xm,gradientmap_pars_fragment:qm,lightmap_pars_fragment:Ym,lights_lambert_fragment:Zm,lights_lambert_pars_fragment:Km,lights_pars_begin:Jm,lights_toon_fragment:jm,lights_toon_pars_fragment:e0,lights_phong_fragment:t0,lights_phong_pars_fragment:n0,lights_physical_fragment:i0,lights_physical_pars_fragment:s0,lights_fragment_begin:r0,lights_fragment_maps:a0,lights_fragment_end:o0,lightprobes_pars_fragment:l0,logdepthbuf_fragment:c0,logdepthbuf_pars_fragment:h0,logdepthbuf_pars_vertex:d0,logdepthbuf_vertex:u0,map_fragment:f0,map_pars_fragment:p0,map_particle_fragment:m0,map_particle_pars_fragment:g0,metalnessmap_fragment:v0,metalnessmap_pars_fragment:y0,morphinstance_vertex:x0,morphcolor_vertex:b0,morphnormal_vertex:_0,morphtarget_pars_vertex:w0,morphtarget_vertex:M0,normal_fragment_begin:S0,normal_fragment_maps:E0,normal_pars_fragment:T0,normal_pars_vertex:A0,normal_vertex:R0,normalmap_pars_fragment:C0,clearcoat_normal_fragment_begin:P0,clearcoat_normal_fragment_maps:I0,clearcoat_pars_fragment:L0,iridescence_pars_fragment:D0,opaque_fragment:N0,packing:U0,premultiplied_alpha_fragment:k0,project_vertex:F0,dithering_fragment:O0,dithering_pars_fragment:B0,roughnessmap_fragment:z0,roughnessmap_pars_fragment:G0,shadowmap_pars_fragment:H0,shadowmap_pars_vertex:V0,shadowmap_vertex:W0,shadowmask_pars_fragment:$0,skinbase_vertex:X0,skinning_pars_vertex:q0,skinning_vertex:Y0,skinnormal_vertex:Z0,specularmap_fragment:K0,specularmap_pars_fragment:J0,tonemapping_fragment:Q0,tonemapping_pars_fragment:j0,transmission_fragment:eg,transmission_pars_fragment:tg,uv_pars_fragment:ng,uv_pars_vertex:ig,uv_vertex:sg,worldpos_vertex:rg,background_vert:ag,background_frag:og,backgroundCube_vert:lg,backgroundCube_frag:cg,cube_vert:hg,cube_frag:dg,depth_vert:ug,depth_frag:fg,distance_vert:pg,distance_frag:mg,equirect_vert:gg,equirect_frag:vg,linedashed_vert:yg,linedashed_frag:xg,meshbasic_vert:bg,meshbasic_frag:_g,meshlambert_vert:wg,meshlambert_frag:Mg,meshmatcap_vert:Sg,meshmatcap_frag:Eg,meshnormal_vert:Tg,meshnormal_frag:Ag,meshphong_vert:Rg,meshphong_frag:Cg,meshphysical_vert:Pg,meshphysical_frag:Ig,meshtoon_vert:Lg,meshtoon_frag:Dg,points_vert:Ng,points_frag:Ug,shadow_vert:kg,shadow_frag:Fg,sprite_vert:Og,sprite_frag:Bg},Ne={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new we(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new U},probesMax:{value:new U},probesResolution:{value:new U}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new we(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},ti={basic:{uniforms:vn([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.fog]),vertexShader:tt.meshbasic_vert,fragmentShader:tt.meshbasic_frag},lambert:{uniforms:vn([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new Je(0)},envMapIntensity:{value:1}}]),vertexShader:tt.meshlambert_vert,fragmentShader:tt.meshlambert_frag},phong:{uniforms:vn([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:tt.meshphong_vert,fragmentShader:tt.meshphong_frag},standard:{uniforms:vn([Ne.common,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.roughnessmap,Ne.metalnessmap,Ne.fog,Ne.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag},toon:{uniforms:vn([Ne.common,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.gradientmap,Ne.fog,Ne.lights,{emissive:{value:new Je(0)}}]),vertexShader:tt.meshtoon_vert,fragmentShader:tt.meshtoon_frag},matcap:{uniforms:vn([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,{matcap:{value:null}}]),vertexShader:tt.meshmatcap_vert,fragmentShader:tt.meshmatcap_frag},points:{uniforms:vn([Ne.points,Ne.fog]),vertexShader:tt.points_vert,fragmentShader:tt.points_frag},dashed:{uniforms:vn([Ne.common,Ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:tt.linedashed_vert,fragmentShader:tt.linedashed_frag},depth:{uniforms:vn([Ne.common,Ne.displacementmap]),vertexShader:tt.depth_vert,fragmentShader:tt.depth_frag},normal:{uniforms:vn([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,{opacity:{value:1}}]),vertexShader:tt.meshnormal_vert,fragmentShader:tt.meshnormal_frag},sprite:{uniforms:vn([Ne.sprite,Ne.fog]),vertexShader:tt.sprite_vert,fragmentShader:tt.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:tt.background_vert,fragmentShader:tt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:tt.backgroundCube_vert,fragmentShader:tt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:tt.cube_vert,fragmentShader:tt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:tt.equirect_vert,fragmentShader:tt.equirect_frag},distance:{uniforms:vn([Ne.common,Ne.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:tt.distance_vert,fragmentShader:tt.distance_frag},shadow:{uniforms:vn([Ne.lights,Ne.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:tt.shadow_vert,fragmentShader:tt.shadow_frag}};ti.physical={uniforms:vn([ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new we(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new we},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new we},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag};const xa={r:0,b:0,g:0},zg=new yt,qd=new je;qd.set(-1,0,0,0,1,0,0,0,1);function Gg(i,e,t,n,s,r){const a=new Je(0);let o=s===!0?0:1,l,c,h=null,m=0,u=null;function d(w){let E=w.isScene===!0?w.background:null;if(E&&E.isTexture){const y=w.backgroundBlurriness>0;E=e.get(E,y)}return E}function p(w){let E=!1;const y=d(w);y===null?g(a,o):y&&y.isColor&&(g(y,1),E=!0);const S=i.xr.getEnvironmentBlendMode();S==="additive"?t.buffers.color.setClear(0,0,0,1,r):S==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(w,E){const y=d(E);y&&(y.isCubeTexture||y.mapping===no)?(c===void 0&&(c=new ht(new Yn(1,1,1),new bn({name:"BackgroundCubeMaterial",uniforms:er(ti.backgroundCube.uniforms),vertexShader:ti.backgroundCube.vertexShader,fragmentShader:ti.backgroundCube.fragmentShader,side:xn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(S,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(zg.makeRotationFromEuler(E.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(qd),c.material.toneMapped=lt.getTransfer(y.colorSpace)!==bt,(h!==y||m!==y.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=y,m=y.version,u=i.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new ht(new Bn(2,2),new bn({name:"BackgroundMaterial",uniforms:er(ti.background.uniforms),vertexShader:ti.background.vertexShader,fragmentShader:ti.background.fragmentShader,side:Wi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=lt.getTransfer(y.colorSpace)!==bt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||m!==y.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=y,m=y.version,u=i.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null))}function g(w,E){w.getRGB(xa,Vd(i)),t.buffers.color.setClear(xa.r,xa.g,xa.b,E,r)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,E=1){a.set(w),o=E,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(w){o=w,g(a,o)},render:p,addToRenderList:x,dispose:f}}function Hg(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function o(N,k,G,X,F){let Z=!1;const H=m(N,X,G,k);r!==H&&(r=H,c(r.object)),Z=d(N,X,G,F),Z&&p(N,X,G,F),F!==null&&e.update(F,i.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,y(N,k,G,X),F!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function l(){return i.createVertexArray()}function c(N){return i.bindVertexArray(N)}function h(N){return i.deleteVertexArray(N)}function m(N,k,G,X){const F=X.wireframe===!0;let Z=n[k.id];Z===void 0&&(Z={},n[k.id]=Z);const H=N.isInstancedMesh===!0?N.id:0;let $=Z[H];$===void 0&&($={},Z[H]=$);let Q=$[G.id];Q===void 0&&(Q={},$[G.id]=Q);let V=Q[F];return V===void 0&&(V=u(l()),Q[F]=V),V}function u(N){const k=[],G=[],X=[];for(let F=0;F<t;F++)k[F]=0,G[F]=0,X[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:G,attributeDivisors:X,object:N,attributes:{},index:null}}function d(N,k,G,X){const F=r.attributes,Z=k.attributes;let H=0;const $=G.getAttributes();for(const Q in $)if($[Q].location>=0){const ee=F[Q];let J=Z[Q];if(J===void 0&&(Q==="instanceMatrix"&&N.instanceMatrix&&(J=N.instanceMatrix),Q==="instanceColor"&&N.instanceColor&&(J=N.instanceColor)),ee===void 0||ee.attribute!==J||J&&ee.data!==J.data)return!0;H++}return r.attributesNum!==H||r.index!==X}function p(N,k,G,X){const F={},Z=k.attributes;let H=0;const $=G.getAttributes();for(const Q in $)if($[Q].location>=0){let ee=Z[Q];ee===void 0&&(Q==="instanceMatrix"&&N.instanceMatrix&&(ee=N.instanceMatrix),Q==="instanceColor"&&N.instanceColor&&(ee=N.instanceColor));const J={};J.attribute=ee,ee&&ee.data&&(J.data=ee.data),F[Q]=J,H++}r.attributes=F,r.attributesNum=H,r.index=X}function x(){const N=r.newAttributes;for(let k=0,G=N.length;k<G;k++)N[k]=0}function g(N){f(N,0)}function f(N,k){const G=r.newAttributes,X=r.enabledAttributes,F=r.attributeDivisors;G[N]=1,X[N]===0&&(i.enableVertexAttribArray(N),X[N]=1),F[N]!==k&&(i.vertexAttribDivisor(N,k),F[N]=k)}function w(){const N=r.newAttributes,k=r.enabledAttributes;for(let G=0,X=k.length;G<X;G++)k[G]!==N[G]&&(i.disableVertexAttribArray(G),k[G]=0)}function E(N,k,G,X,F,Z,H){H===!0?i.vertexAttribIPointer(N,k,G,F,Z):i.vertexAttribPointer(N,k,G,X,F,Z)}function y(N,k,G,X){x();const F=X.attributes,Z=G.getAttributes(),H=k.defaultAttributeValues;for(const $ in Z){const Q=Z[$];if(Q.location>=0){let V=F[$];if(V===void 0&&($==="instanceMatrix"&&N.instanceMatrix&&(V=N.instanceMatrix),$==="instanceColor"&&N.instanceColor&&(V=N.instanceColor)),V!==void 0){const ee=V.normalized,J=V.itemSize,ve=e.get(V);if(ve===void 0)continue;const Oe=ve.buffer,he=ve.type,K=ve.bytesPerElement,fe=he===i.INT||he===i.UNSIGNED_INT||V.gpuType===Yl;if(V.isInterleavedBufferAttribute){const ue=V.data,be=ue.stride,_e=V.offset;if(ue.isInstancedInterleavedBuffer){for(let Ie=0;Ie<Q.locationSize;Ie++)f(Q.location+Ie,ue.meshPerAttribute);N.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let Ie=0;Ie<Q.locationSize;Ie++)g(Q.location+Ie);i.bindBuffer(i.ARRAY_BUFFER,Oe);for(let Ie=0;Ie<Q.locationSize;Ie++)E(Q.location+Ie,J/Q.locationSize,he,ee,be*K,(_e+J/Q.locationSize*Ie)*K,fe)}else{if(V.isInstancedBufferAttribute){for(let ue=0;ue<Q.locationSize;ue++)f(Q.location+ue,V.meshPerAttribute);N.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let ue=0;ue<Q.locationSize;ue++)g(Q.location+ue);i.bindBuffer(i.ARRAY_BUFFER,Oe);for(let ue=0;ue<Q.locationSize;ue++)E(Q.location+ue,J/Q.locationSize,he,ee,J*K,J/Q.locationSize*ue*K,fe)}}else if(H!==void 0){const ee=H[$];if(ee!==void 0)switch(ee.length){case 2:i.vertexAttrib2fv(Q.location,ee);break;case 3:i.vertexAttrib3fv(Q.location,ee);break;case 4:i.vertexAttrib4fv(Q.location,ee);break;default:i.vertexAttrib1fv(Q.location,ee)}}}}w()}function S(){R();for(const N in n){const k=n[N];for(const G in k){const X=k[G];for(const F in X){const Z=X[F];for(const H in Z)h(Z[H].object),delete Z[H];delete X[F]}}delete n[N]}}function T(N){if(n[N.id]===void 0)return;const k=n[N.id];for(const G in k){const X=k[G];for(const F in X){const Z=X[F];for(const H in Z)h(Z[H].object),delete Z[H];delete X[F]}}delete n[N.id]}function A(N){for(const k in n){const G=n[k];for(const X in G){const F=G[X];if(F[N.id]===void 0)continue;const Z=F[N.id];for(const H in Z)h(Z[H].object),delete Z[H];delete F[N.id]}}}function v(N){for(const k in n){const G=n[k],X=N.isInstancedMesh===!0?N.id:0,F=G[X];if(F!==void 0){for(const Z in F){const H=F[Z];for(const $ in H)h(H[$].object),delete H[$];delete F[Z]}delete G[X],Object.keys(G).length===0&&delete n[k]}}}function R(){D(),a=!0,r!==s&&(r=s,c(r.object))}function D(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:R,resetDefaultState:D,dispose:S,releaseStatesOfGeometry:T,releaseStatesOfObject:v,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:g,disableUnusedAttributes:w}}function Vg(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let d=0;d<h;d++)u+=c[d];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Wg(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==qn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const v=A===Si&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==An&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Xn&&!v)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(Ye("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const m=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Ye("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),w=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:m,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:g,maxAttributes:f,maxVertexUniforms:w,maxVaryings:E,maxFragmentUniforms:y,maxSamples:S,samples:T}}function $g(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new es,o=new je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(m,u){const d=m.length!==0||u||n!==0||s;return s=u,n=m.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(m,u){t=h(m,u,0)},this.setState=function(m,u,d){const p=m.clippingPlanes,x=m.clipIntersection,g=m.clipShadows,f=i.get(m);if(!s||p===null||p.length===0||r&&!g)r?h(null):c();else{const w=r?0:n,E=w*4;let y=f.clippingState||null;l.value=y,y=h(p,u,E,d);for(let S=0;S!==E;++S)y[S]=t[S];f.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(m,u,d,p){const x=m!==null?m.length:0;let g=null;if(x!==0){if(g=l.value,p!==!0||g===null){const f=d+x*4,w=u.matrixWorldInverse;o.getNormalMatrix(w),(g===null||g.length<f)&&(g=new Float32Array(f));for(let E=0,y=d;E!==x;++E,y+=4)a.copy(m[E]).applyMatrix4(w,o),a.normal.toArray(g,y),g[y+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}const Bi=4,Ch=[.125,.215,.35,.446,.526,.582],ns=20,Xg=256,pr=new io,Ph=new Je;let zo=null,Go=0,Ho=0,Vo=!1;const qg=new U;class zl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=qg}=r;zo=this._renderer.getRenderTarget(),Go=this._renderer.getActiveCubeFace(),Ho=this._renderer.getActiveMipmapLevel(),Vo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Dh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Lh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(zo,Go,Ho),this._renderer.xr.enabled=Vo,e.scissorTest=!1,ks(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===rs||e.mapping===Ks?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),zo=this._renderer.getRenderTarget(),Go=this._renderer.getActiveCubeFace(),Ho=this._renderer.getActiveMipmapLevel(),Vo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:en,minFilter:en,generateMipmaps:!1,type:Si,format:qn,colorSpace:Oa,depthBuffer:!1},s=Ih(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ih(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Yg(r)),this._blurMaterial=Kg(r,e,t),this._ggxMaterial=Zg(r,e,t)}return s}_compileMaterial(e){const t=new ht(new St,e);this._renderer.compile(t,pr)}_sceneToCubeUV(e,t,n,s,r){const l=new Tn(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],m=this._renderer,u=m.autoClear,d=m.toneMapping;m.getClearColor(Ph),m.toneMapping=ai,m.autoClear=!1,m.state.buffers.depth.getReversed()&&(m.setRenderTarget(s),m.clearDepth(),m.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ht(new Yn,new cn({name:"PMREM.Background",side:xn,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,g=x.material;let f=!1;const w=e.background;w?w.isColor&&(g.color.copy(w),e.background=null,f=!0):(g.color.copy(Ph),f=!0);for(let E=0;E<6;E++){const y=E%3;y===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[E],r.y,r.z)):y===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[E]));const S=this._cubeSize;ks(s,y*S,E>2?S:0,S,S),m.setRenderTarget(s),f&&m.render(x,l),m.render(e,l)}m.toneMapping=d,m.autoClear=u,e.background=w}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===rs||e.mapping===Ks;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Dh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Lh());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;ks(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,pr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),m=Math.sqrt(c*c-h*h),u=0+c*1.25,d=m*u,{_lodMax:p}=this,x=this._sizeLods[n],g=3*x*(n>p-Bi?n-p+Bi:0),f=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=d,l.mipInt.value=p-t,ks(r,g,f,3*x,2*x),s.setRenderTarget(r),s.render(o,pr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=p-n,ks(e,g,f,3*x,2*x),s.setRenderTarget(e),s.render(o,pr)}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&ot("blur direction must be either latitudinal or longitudinal!");const h=3,m=this._lodMeshes[s];m.material=c;const u=c.uniforms,d=this._sizeLods[n]-1,p=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*ns-1),x=r/p,g=isFinite(r)?1+Math.floor(h*x):ns;g>ns&&Ye(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${ns}`);const f=[];let w=0;for(let A=0;A<ns;++A){const v=A/x,R=Math.exp(-v*v/2);f.push(R),A===0?w+=R:A<g&&(w+=2*R)}for(let A=0;A<f.length;A++)f[A]=f[A]/w;u.envMap.value=e.texture,u.samples.value=g,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:E}=this;u.dTheta.value=p,u.mipInt.value=E-n;const y=this._sizeLods[s],S=3*y*(s>E-Bi?s-E+Bi:0),T=4*(this._cubeSize-y);ks(t,S,T,3*y,2*y),l.setRenderTarget(t),l.render(m,pr)}}function Yg(i){const e=[],t=[],n=[];let s=i;const r=i-Bi+1+Ch.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-Bi?l=Ch[a-i+Bi-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),h=-c,m=1+c,u=[h,h,m,h,m,m,h,h,m,m,h,m],d=6,p=6,x=3,g=2,f=1,w=new Float32Array(x*p*d),E=new Float32Array(g*p*d),y=new Float32Array(f*p*d);for(let T=0;T<d;T++){const A=T%3*2/3-1,v=T>2?0:-1,R=[A,v,0,A+2/3,v,0,A+2/3,v+1,0,A,v,0,A+2/3,v+1,0,A,v+1,0];w.set(R,x*p*T),E.set(u,g*p*T);const D=[T,T,T,T,T,T];y.set(D,f*p*T)}const S=new St;S.setAttribute("position",new fn(w,x)),S.setAttribute("uv",new fn(E,g)),S.setAttribute("faceIndex",new fn(y,f)),n.push(new ht(S,null)),s>Bi&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Ih(i,e,t){const n=new li(i,e,t);return n.texture.mapping=no,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ks(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Zg(i,e,t){return new bn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Xg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:so(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function Kg(i,e,t){const n=new Float32Array(ns),s=new U(0,1,0);return new bn({name:"SphericalGaussianBlur",defines:{n:ns,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:so(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function Lh(){return new bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:so(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function Dh(){return new bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:so(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function so(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Yd extends li{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Ld(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Yn(5,5,5),r=new bn({name:"CubemapFromEquirect",uniforms:er(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:xn,blending:wi});r.uniforms.tEquirect.value=t;const a=new ht(s,r),o=t.minFilter;return t.minFilter===Oi&&(t.minFilter=en),new nm(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function Jg(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,d=!1){return u==null?null:d?a(u):r(u)}function r(u){if(u&&u.isTexture){const d=u.mapping;if(d===oo||d===lo)if(e.has(u)){const p=e.get(u).texture;return o(p,u.mapping)}else{const p=u.image;if(p&&p.height>0){const x=new Yd(p.height);return x.fromEquirectangularTexture(i,u),e.set(u,x),u.addEventListener("dispose",c),o(x.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const d=u.mapping,p=d===oo||d===lo,x=d===rs||d===Ks;if(p||x){let g=t.get(u);const f=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return n===null&&(n=new zl(i)),g=p?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{const w=u.image;return p&&w&&w.height>0||x&&w&&l(w)?(n===null&&(n=new zl(i)),g=p?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function o(u,d){return d===oo?u.mapping=rs:d===lo&&(u.mapping=Ks),u}function l(u){let d=0;const p=6;for(let x=0;x<p;x++)u[x]!==void 0&&d++;return d===p}function c(u){const d=u.target;d.removeEventListener("dispose",c);const p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function h(u){const d=u.target;d.removeEventListener("dispose",h);const p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function m(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:m}}function Qg(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Ws("WebGLRenderer: "+n+" extension not supported."),s}}}function jg(i,e,t,n){const s={},r=new WeakMap;function a(m){const u=m.target;u.index!==null&&e.remove(u.index);for(const p in u.attributes)e.remove(u.attributes[p]);u.removeEventListener("dispose",a),delete s[u.id];const d=r.get(u);d&&(e.remove(d),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(m,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function l(m){const u=m.attributes;for(const d in u)e.update(u[d],i.ARRAY_BUFFER)}function c(m){const u=[],d=m.index,p=m.attributes.position;let x=0;if(p===void 0)return;if(d!==null){const w=d.array;x=d.version;for(let E=0,y=w.length;E<y;E+=3){const S=w[E+0],T=w[E+1],A=w[E+2];u.push(S,T,T,A,A,S)}}else{const w=p.array;x=p.version;for(let E=0,y=w.length/3-1;E<y;E+=3){const S=E+0,T=E+1,A=E+2;u.push(S,T,T,A,A,S)}}const g=new(p.count>=65535?Rd:Ad)(u,1);g.version=x;const f=r.get(m);f&&e.remove(f),r.set(m,g)}function h(m){const u=r.get(m);if(u){const d=m.index;d!==null&&u.version<d.version&&c(m)}else c(m);return r.get(m)}return{get:o,update:l,getWireframeAttribute:h}}function ev(i,e,t){let n;function s(m){n=m}let r,a;function o(m){r=m.type,a=m.bytesPerElement}function l(m,u){i.drawElements(n,u,r,m*a),t.update(u,n,1)}function c(m,u,d){d!==0&&(i.drawElementsInstanced(n,u,r,m*a,d),t.update(u,n,d))}function h(m,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,m,0,d);let x=0;for(let g=0;g<d;g++)x+=u[g];t.update(x,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function tv(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:ot("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function nv(i,e,t){const n=new WeakMap,s=new Nt;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,m=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==m){let D=function(){v.dispose(),n.delete(o),o.removeEventListener("dispose",D)};var d=D;u!==void 0&&u.texture.dispose();const p=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],w=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let y=0;p===!0&&(y=1),x===!0&&(y=2),g===!0&&(y=3);let S=o.attributes.position.count*y,T=1;S>e.maxTextureSize&&(T=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const A=new Float32Array(S*T*4*m),v=new Sd(A,S,T,m);v.type=Xn,v.needsUpdate=!0;const R=y*4;for(let N=0;N<m;N++){const k=f[N],G=w[N],X=E[N],F=S*T*4*N;for(let Z=0;Z<k.count;Z++){const H=Z*R;p===!0&&(s.fromBufferAttribute(k,Z),A[F+H+0]=s.x,A[F+H+1]=s.y,A[F+H+2]=s.z,A[F+H+3]=0),x===!0&&(s.fromBufferAttribute(G,Z),A[F+H+4]=s.x,A[F+H+5]=s.y,A[F+H+6]=s.z,A[F+H+7]=0),g===!0&&(s.fromBufferAttribute(X,Z),A[F+H+8]=s.x,A[F+H+9]=s.y,A[F+H+10]=s.z,A[F+H+11]=X.itemSize===4?s.w:1)}}u={count:m,texture:v,size:new we(S,T)},n.set(o,u),o.addEventListener("dispose",D)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let g=0;g<c.length;g++)p+=c[g];const x=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",x),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function iv(i,e,t,n,s){let r=new WeakMap;function a(c){const h=s.render.frame,m=c.geometry,u=e.get(c,m);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return u}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const sv={[hd]:"LINEAR_TONE_MAPPING",[dd]:"REINHARD_TONE_MAPPING",[ud]:"CINEON_TONE_MAPPING",[ql]:"ACES_FILMIC_TONE_MAPPING",[pd]:"AGX_TONE_MAPPING",[md]:"NEUTRAL_TONE_MAPPING",[fd]:"CUSTOM_TONE_MAPPING"};function rv(i,e,t,n,s,r){const a=new li(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new Qs(e,t):void 0}),o=new li(e,t,{type:Si,depthBuffer:!1,stencilBuffer:!1}),l=new St;l.setAttribute("position",new dt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new dt([0,2,0,0,2,0],2));const c=new qp({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new ht(l,c),m=new io(-1,1,1,-1,0,1);let u=null,d=null,p=!1,x,g=null,f=[],w=!1;this.setSize=function(E,y){a.setSize(E,y),o.setSize(E,y);for(let S=0;S<f.length;S++){const T=f[S];T.setSize&&T.setSize(E,y)}},this.setEffects=function(E){f=E,w=f.length>0&&f[0].isRenderPass===!0;const y=a.width,S=a.height;for(let T=0;T<f.length;T++){const A=f[T];A.setSize&&A.setSize(y,S)}},this.begin=function(E,y){if(p||E.toneMapping===ai&&f.length===0)return!1;if(g=y,y!==null){const S=y.width,T=y.height;(a.width!==S||a.height!==T)&&this.setSize(S,T)}return w===!1&&E.setRenderTarget(a),x=E.toneMapping,E.toneMapping=ai,!0},this.hasRenderPass=function(){return w},this.end=function(E,y){E.toneMapping=x,p=!0;let S=a,T=o;for(let A=0;A<f.length;A++){const v=f[A];if(v.enabled!==!1&&(v.render(E,T,S,y),v.needsSwap!==!1)){const R=S;S=T,T=R}}if(u!==E.outputColorSpace||d!==E.toneMapping){u=E.outputColorSpace,d=E.toneMapping,c.defines={},lt.getTransfer(u)===bt&&(c.defines.SRGB_TRANSFER="");const A=sv[d];A&&(c.defines[A]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=S.texture,E.setRenderTarget(g),E.render(h,m),g=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const Zd=new un,Gl=new Qs(1,1),Kd=new Sd,Jd=new Wf,Qd=new Ld,Nh=[],Uh=[],kh=new Float32Array(16),Fh=new Float32Array(9),Oh=new Float32Array(4);function nr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Nh[s];if(r===void 0&&(r=new Float32Array(s),Nh[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Zt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Kt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ro(i,e){let t=Uh[e];t===void 0&&(t=new Int32Array(e),Uh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function av(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function ov(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;i.uniform2fv(this.addr,e),Kt(t,e)}}function lv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Zt(t,e))return;i.uniform3fv(this.addr,e),Kt(t,e)}}function cv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;i.uniform4fv(this.addr,e),Kt(t,e)}}function hv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Zt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Kt(t,e)}else{if(Zt(t,n))return;Oh.set(n),i.uniformMatrix2fv(this.addr,!1,Oh),Kt(t,n)}}function dv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Zt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Kt(t,e)}else{if(Zt(t,n))return;Fh.set(n),i.uniformMatrix3fv(this.addr,!1,Fh),Kt(t,n)}}function uv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Zt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Kt(t,e)}else{if(Zt(t,n))return;kh.set(n),i.uniformMatrix4fv(this.addr,!1,kh),Kt(t,n)}}function fv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function pv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;i.uniform2iv(this.addr,e),Kt(t,e)}}function mv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Zt(t,e))return;i.uniform3iv(this.addr,e),Kt(t,e)}}function gv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;i.uniform4iv(this.addr,e),Kt(t,e)}}function vv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function yv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;i.uniform2uiv(this.addr,e),Kt(t,e)}}function xv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Zt(t,e))return;i.uniform3uiv(this.addr,e),Kt(t,e)}}function bv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;i.uniform4uiv(this.addr,e),Kt(t,e)}}function _v(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Gl.compareFunction=t.isReversedDepthBuffer()?nc:tc,r=Gl):r=Zd,t.setTexture2D(e||r,s)}function wv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Jd,s)}function Mv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Qd,s)}function Sv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Kd,s)}function Ev(i){switch(i){case 5126:return av;case 35664:return ov;case 35665:return lv;case 35666:return cv;case 35674:return hv;case 35675:return dv;case 35676:return uv;case 5124:case 35670:return fv;case 35667:case 35671:return pv;case 35668:case 35672:return mv;case 35669:case 35673:return gv;case 5125:return vv;case 36294:return yv;case 36295:return xv;case 36296:return bv;case 35678:case 36198:case 36298:case 36306:case 35682:return _v;case 35679:case 36299:case 36307:return wv;case 35680:case 36300:case 36308:case 36293:return Mv;case 36289:case 36303:case 36311:case 36292:return Sv}}function Tv(i,e){i.uniform1fv(this.addr,e)}function Av(i,e){const t=nr(e,this.size,2);i.uniform2fv(this.addr,t)}function Rv(i,e){const t=nr(e,this.size,3);i.uniform3fv(this.addr,t)}function Cv(i,e){const t=nr(e,this.size,4);i.uniform4fv(this.addr,t)}function Pv(i,e){const t=nr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Iv(i,e){const t=nr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Lv(i,e){const t=nr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Dv(i,e){i.uniform1iv(this.addr,e)}function Nv(i,e){i.uniform2iv(this.addr,e)}function Uv(i,e){i.uniform3iv(this.addr,e)}function kv(i,e){i.uniform4iv(this.addr,e)}function Fv(i,e){i.uniform1uiv(this.addr,e)}function Ov(i,e){i.uniform2uiv(this.addr,e)}function Bv(i,e){i.uniform3uiv(this.addr,e)}function zv(i,e){i.uniform4uiv(this.addr,e)}function Gv(i,e,t){const n=this.cache,s=e.length,r=ro(t,s);Zt(n,r)||(i.uniform1iv(this.addr,r),Kt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Gl:a=Zd;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Hv(i,e,t){const n=this.cache,s=e.length,r=ro(t,s);Zt(n,r)||(i.uniform1iv(this.addr,r),Kt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Jd,r[a])}function Vv(i,e,t){const n=this.cache,s=e.length,r=ro(t,s);Zt(n,r)||(i.uniform1iv(this.addr,r),Kt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Qd,r[a])}function Wv(i,e,t){const n=this.cache,s=e.length,r=ro(t,s);Zt(n,r)||(i.uniform1iv(this.addr,r),Kt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Kd,r[a])}function $v(i){switch(i){case 5126:return Tv;case 35664:return Av;case 35665:return Rv;case 35666:return Cv;case 35674:return Pv;case 35675:return Iv;case 35676:return Lv;case 5124:case 35670:return Dv;case 35667:case 35671:return Nv;case 35668:case 35672:return Uv;case 35669:case 35673:return kv;case 5125:return Fv;case 36294:return Ov;case 36295:return Bv;case 36296:return zv;case 35678:case 36198:case 36298:case 36306:case 35682:return Gv;case 35679:case 36299:case 36307:return Hv;case 35680:case 36300:case 36308:case 36293:return Vv;case 36289:case 36303:case 36311:case 36292:return Wv}}class Xv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ev(t.type)}}class qv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=$v(t.type)}}class Yv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Wo=/(\w+)(\])?(\[|\.)?/g;function Bh(i,e){i.seq.push(e),i.map[e.id]=e}function Zv(i,e,t){const n=i.name,s=n.length;for(Wo.lastIndex=0;;){const r=Wo.exec(n),a=Wo.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Bh(t,c===void 0?new Xv(o,i,e):new qv(o,i,e));break}else{let m=t.map[o];m===void 0&&(m=new Yv(o),Bh(t,m)),t=m}}}class Ra{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Zv(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function zh(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Kv=37297;let Jv=0;function Qv(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Gh=new je;function jv(i){lt._getMatrix(Gh,lt.workingColorSpace,i);const e=`mat3( ${Gh.elements.map(t=>t.toFixed(4))} )`;switch(lt.getTransfer(i)){case Ba:return[e,"LinearTransferOETF"];case bt:return[e,"sRGBTransferOETF"];default:return Ye("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Hh(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Qv(i.getShaderSource(e),o)}else return r}function ey(i,e){const t=jv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const ty={[hd]:"Linear",[dd]:"Reinhard",[ud]:"Cineon",[ql]:"ACESFilmic",[pd]:"AgX",[md]:"Neutral",[fd]:"Custom"};function ny(i,e){const t=ty[e];return t===void 0?(Ye("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ba=new U;function iy(){lt.getLuminanceCoefficients(ba);const i=ba.x.toFixed(4),e=ba.y.toFixed(4),t=ba.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function sy(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(br).join(`
`)}function ry(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function ay(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function br(i){return i!==""}function Vh(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Wh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const oy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Hl(i){return i.replace(oy,cy)}const ly=new Map;function cy(i,e){let t=tt[e];if(t===void 0){const n=ly.get(e);if(n!==void 0)t=tt[n],Ye('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Hl(t)}const hy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function $h(i){return i.replace(hy,dy)}function dy(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Xh(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const uy={[Ma]:"SHADOWMAP_TYPE_PCF",[yr]:"SHADOWMAP_TYPE_VSM"};function fy(i){return uy[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const py={[rs]:"ENVMAP_TYPE_CUBE",[Ks]:"ENVMAP_TYPE_CUBE",[no]:"ENVMAP_TYPE_CUBE_UV"};function my(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":py[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const gy={[Ks]:"ENVMAP_MODE_REFRACTION"};function vy(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":gy[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const yy={[cd]:"ENVMAP_BLENDING_MULTIPLY",[lf]:"ENVMAP_BLENDING_MIX",[cf]:"ENVMAP_BLENDING_ADD"};function xy(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":yy[i.combine]||"ENVMAP_BLENDING_NONE"}function by(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function _y(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=fy(t),c=my(t),h=vy(t),m=xy(t),u=by(t),d=sy(t),p=ry(r),x=s.createProgram();let g,f,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(br).join(`
`),g.length>0&&(g+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(br).join(`
`),f.length>0&&(f+=`
`)):(g=[Xh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(br).join(`
`),f=[Xh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+m:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ai?"#define TONE_MAPPING":"",t.toneMapping!==ai?tt.tonemapping_pars_fragment:"",t.toneMapping!==ai?ny("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",tt.colorspace_pars_fragment,ey("linearToOutputTexel",t.outputColorSpace),iy(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(br).join(`
`)),a=Hl(a),a=Vh(a,t),a=Wh(a,t),o=Hl(o),o=Vh(o,t),o=Wh(o,t),a=$h(a),o=$h(o),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,f=["#define varying in",t.glslVersion===Hc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Hc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const E=w+g+a,y=w+f+o,S=zh(s,s.VERTEX_SHADER,E),T=zh(s,s.FRAGMENT_SHADER,y);s.attachShader(x,S),s.attachShader(x,T),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function A(N){if(i.debug.checkShaderErrors){const k=s.getProgramInfoLog(x)||"",G=s.getShaderInfoLog(S)||"",X=s.getShaderInfoLog(T)||"",F=k.trim(),Z=G.trim(),H=X.trim();let $=!0,Q=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,S,T);else{const V=Hh(s,S,"vertex"),ee=Hh(s,T,"fragment");ot("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+F+`
`+V+`
`+ee)}else F!==""?Ye("WebGLProgram: Program Info Log:",F):(Z===""||H==="")&&(Q=!1);Q&&(N.diagnostics={runnable:$,programLog:F,vertexShader:{log:Z,prefix:g},fragmentShader:{log:H,prefix:f}})}s.deleteShader(S),s.deleteShader(T),v=new Ra(s,x),R=ay(s,x)}let v;this.getUniforms=function(){return v===void 0&&A(this),v};let R;this.getAttributes=function(){return R===void 0&&A(this),R};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=s.getProgramParameter(x,Kv)),D},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Jv++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=S,this.fragmentShader=T,this}let wy=0;class My{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Sy(e),t.set(e,n)),n}}class Sy{constructor(e){this.id=wy++,this.code=e,this.usedTimes=0}}function Ey(i){return i===as||i===ka||i===Fa}function Ty(i,e,t,n,s,r){const a=new Ed,o=new My,l=new Set,c=[],h=new Map,m=n.logarithmicDepthBuffer;let u=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(v){return l.add(v),v===0?"uv":`uv${v}`}function x(v,R,D,N,k,G){const X=N.fog,F=k.geometry,Z=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?N.environment:null,H=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,$=e.get(v.envMap||Z,H),Q=$&&$.mapping===no?$.image.height:null,V=d[v.type];v.precision!==null&&(u=n.getMaxPrecision(v.precision),u!==v.precision&&Ye("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));const ee=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,J=ee!==void 0?ee.length:0;let ve=0;F.morphAttributes.position!==void 0&&(ve=1),F.morphAttributes.normal!==void 0&&(ve=2),F.morphAttributes.color!==void 0&&(ve=3);let Oe,he,K,fe;if(V){const Ee=ti[V];Oe=Ee.vertexShader,he=Ee.fragmentShader}else{Oe=v.vertexShader,he=v.fragmentShader;const Ee=o.getVertexShaderStage(v),Qe=o.getFragmentShaderStage(v);o.update(v,Ee,Qe),K=Ee.id,fe=Qe.id}const ue=i.getRenderTarget(),be=i.state.buffers.depth.getReversed(),_e=k.isInstancedMesh===!0,Ie=k.isBatchedMesh===!0,Ze=!!v.map,Le=!!v.matcap,de=!!$,P=!!v.aoMap,z=!!v.lightMap,ne=!!v.bumpMap&&v.wireframe===!1,ye=!!v.normalMap,Ae=!!v.displacementMap,Te=!!v.emissiveMap,Fe=!!v.metalnessMap,Be=!!v.roughnessMap,O=v.anisotropy>0,Xe=v.clearcoat>0,qe=v.dispersion>0,C=v.iridescence>0,b=v.sheen>0,_=v.transmission>0,I=O&&!!v.anisotropyMap,B=Xe&&!!v.clearcoatMap,se=Xe&&!!v.clearcoatNormalMap,me=Xe&&!!v.clearcoatRoughnessMap,j=C&&!!v.iridescenceMap,ae=C&&!!v.iridescenceThicknessMap,ge=b&&!!v.sheenColorMap,Se=b&&!!v.sheenRoughnessMap,Re=!!v.specularMap,Ce=!!v.specularColorMap,Pe=!!v.specularIntensityMap,W=_&&!!v.transmissionMap,oe=_&&!!v.thicknessMap,L=!!v.gradientMap,pe=!!v.alphaMap,q=v.alphaTest>0,re=!!v.alphaHash,xe=!!v.extensions;let le=ai;v.toneMapped&&(ue===null||ue.isXRRenderTarget===!0)&&(le=i.toneMapping);const Me={shaderID:V,shaderType:v.type,shaderName:v.name,vertexShader:Oe,fragmentShader:he,defines:v.defines,customVertexShaderID:K,customFragmentShaderID:fe,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:Ie,batchingColor:Ie&&k._colorsTexture!==null,instancing:_e,instancingColor:_e&&k.instanceColor!==null,instancingMorph:_e&&k.morphTexture!==null,outputColorSpace:ue===null?i.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:lt.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:Ze,matcap:Le,envMap:de,envMapMode:de&&$.mapping,envMapCubeUVHeight:Q,aoMap:P,lightMap:z,bumpMap:ne,normalMap:ye,displacementMap:Ae,emissiveMap:Te,normalMapObjectSpace:ye&&v.normalMapType===uf,normalMapTangentSpace:ye&&v.normalMapType===Ul,packedNormalMap:ye&&v.normalMapType===Ul&&Ey(v.normalMap.format),metalnessMap:Fe,roughnessMap:Be,anisotropy:O,anisotropyMap:I,clearcoat:Xe,clearcoatMap:B,clearcoatNormalMap:se,clearcoatRoughnessMap:me,dispersion:qe,iridescence:C,iridescenceMap:j,iridescenceThicknessMap:ae,sheen:b,sheenColorMap:ge,sheenRoughnessMap:Se,specularMap:Re,specularColorMap:Ce,specularIntensityMap:Pe,transmission:_,transmissionMap:W,thicknessMap:oe,gradientMap:L,opaque:v.transparent===!1&&v.blending===Vs&&v.alphaToCoverage===!1,alphaMap:pe,alphaTest:q,alphaHash:re,combine:v.combine,mapUv:Ze&&p(v.map.channel),aoMapUv:P&&p(v.aoMap.channel),lightMapUv:z&&p(v.lightMap.channel),bumpMapUv:ne&&p(v.bumpMap.channel),normalMapUv:ye&&p(v.normalMap.channel),displacementMapUv:Ae&&p(v.displacementMap.channel),emissiveMapUv:Te&&p(v.emissiveMap.channel),metalnessMapUv:Fe&&p(v.metalnessMap.channel),roughnessMapUv:Be&&p(v.roughnessMap.channel),anisotropyMapUv:I&&p(v.anisotropyMap.channel),clearcoatMapUv:B&&p(v.clearcoatMap.channel),clearcoatNormalMapUv:se&&p(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:me&&p(v.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&p(v.iridescenceMap.channel),iridescenceThicknessMapUv:ae&&p(v.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&p(v.sheenColorMap.channel),sheenRoughnessMapUv:Se&&p(v.sheenRoughnessMap.channel),specularMapUv:Re&&p(v.specularMap.channel),specularColorMapUv:Ce&&p(v.specularColorMap.channel),specularIntensityMapUv:Pe&&p(v.specularIntensityMap.channel),transmissionMapUv:W&&p(v.transmissionMap.channel),thicknessMapUv:oe&&p(v.thicknessMap.channel),alphaMapUv:pe&&p(v.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(ye||O),vertexNormals:!!F.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!F.attributes.uv&&(Ze||pe),fog:!!X,useFog:v.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||F.attributes.normal===void 0&&ye===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:m,reversedDepthBuffer:be,skinning:k.isSkinnedMesh===!0,hasPositionAttribute:F.attributes.position!==void 0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:J,morphTextureStride:ve,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:G.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:le,decodeVideoTexture:Ze&&v.map.isVideoTexture===!0&&lt.getTransfer(v.map.colorSpace)===bt,decodeVideoTextureEmissive:Te&&v.emissiveMap.isVideoTexture===!0&&lt.getTransfer(v.emissiveMap.colorSpace)===bt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===kn,flipSided:v.side===xn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:xe&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xe&&v.extensions.multiDraw===!0||Ie)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Me.vertexUv1s=l.has(1),Me.vertexUv2s=l.has(2),Me.vertexUv3s=l.has(3),l.clear(),Me}function g(v){const R=[];if(v.shaderID?R.push(v.shaderID):(R.push(v.customVertexShaderID),R.push(v.customFragmentShaderID)),v.defines!==void 0)for(const D in v.defines)R.push(D),R.push(v.defines[D]);return v.isRawShaderMaterial===!1&&(f(R,v),w(R,v),R.push(i.outputColorSpace)),R.push(v.customProgramCacheKey),R.join()}function f(v,R){v.push(R.precision),v.push(R.outputColorSpace),v.push(R.envMapMode),v.push(R.envMapCubeUVHeight),v.push(R.mapUv),v.push(R.alphaMapUv),v.push(R.lightMapUv),v.push(R.aoMapUv),v.push(R.bumpMapUv),v.push(R.normalMapUv),v.push(R.displacementMapUv),v.push(R.emissiveMapUv),v.push(R.metalnessMapUv),v.push(R.roughnessMapUv),v.push(R.anisotropyMapUv),v.push(R.clearcoatMapUv),v.push(R.clearcoatNormalMapUv),v.push(R.clearcoatRoughnessMapUv),v.push(R.iridescenceMapUv),v.push(R.iridescenceThicknessMapUv),v.push(R.sheenColorMapUv),v.push(R.sheenRoughnessMapUv),v.push(R.specularMapUv),v.push(R.specularColorMapUv),v.push(R.specularIntensityMapUv),v.push(R.transmissionMapUv),v.push(R.thicknessMapUv),v.push(R.combine),v.push(R.fogExp2),v.push(R.sizeAttenuation),v.push(R.morphTargetsCount),v.push(R.morphAttributeCount),v.push(R.numDirLights),v.push(R.numPointLights),v.push(R.numSpotLights),v.push(R.numSpotLightMaps),v.push(R.numHemiLights),v.push(R.numRectAreaLights),v.push(R.numDirLightShadows),v.push(R.numPointLightShadows),v.push(R.numSpotLightShadows),v.push(R.numSpotLightShadowsWithMaps),v.push(R.numLightProbes),v.push(R.shadowMapType),v.push(R.toneMapping),v.push(R.numClippingPlanes),v.push(R.numClipIntersection),v.push(R.depthPacking)}function w(v,R){a.disableAll(),R.instancing&&a.enable(0),R.instancingColor&&a.enable(1),R.instancingMorph&&a.enable(2),R.matcap&&a.enable(3),R.envMap&&a.enable(4),R.normalMapObjectSpace&&a.enable(5),R.normalMapTangentSpace&&a.enable(6),R.clearcoat&&a.enable(7),R.iridescence&&a.enable(8),R.alphaTest&&a.enable(9),R.vertexColors&&a.enable(10),R.vertexAlphas&&a.enable(11),R.vertexUv1s&&a.enable(12),R.vertexUv2s&&a.enable(13),R.vertexUv3s&&a.enable(14),R.vertexTangents&&a.enable(15),R.anisotropy&&a.enable(16),R.alphaHash&&a.enable(17),R.batching&&a.enable(18),R.dispersion&&a.enable(19),R.batchingColor&&a.enable(20),R.gradientMap&&a.enable(21),R.packedNormalMap&&a.enable(22),R.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),R.fog&&a.enable(0),R.useFog&&a.enable(1),R.flatShading&&a.enable(2),R.logarithmicDepthBuffer&&a.enable(3),R.reversedDepthBuffer&&a.enable(4),R.skinning&&a.enable(5),R.morphTargets&&a.enable(6),R.morphNormals&&a.enable(7),R.morphColors&&a.enable(8),R.premultipliedAlpha&&a.enable(9),R.shadowMapEnabled&&a.enable(10),R.doubleSided&&a.enable(11),R.flipSided&&a.enable(12),R.useDepthPacking&&a.enable(13),R.dithering&&a.enable(14),R.transmission&&a.enable(15),R.sheen&&a.enable(16),R.opaque&&a.enable(17),R.pointsUvs&&a.enable(18),R.decodeVideoTexture&&a.enable(19),R.decodeVideoTextureEmissive&&a.enable(20),R.alphaToCoverage&&a.enable(21),R.numLightProbeGrids>0&&a.enable(22),R.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function E(v){const R=d[v.type];let D;if(R){const N=ti[R];D=Wp.clone(N.uniforms)}else D=v.uniforms;return D}function y(v,R){let D=h.get(R);return D!==void 0?++D.usedTimes:(D=new _y(i,R,v,s),c.push(D),h.set(R,D)),D}function S(v){if(--v.usedTimes===0){const R=c.indexOf(v);c[R]=c[c.length-1],c.pop(),h.delete(v.cacheKey),v.destroy()}}function T(v){o.remove(v)}function A(){o.dispose()}return{getParameters:x,getProgramCacheKey:g,getUniforms:E,acquireProgram:y,releaseProgram:S,releaseShaderCache:T,programs:c,dispose:A}}function Ay(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Ry(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function qh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Yh(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function o(u,d,p,x,g,f){let w=i[e];return w===void 0?(w={id:u.id,object:u,geometry:d,material:p,materialVariant:a(u),groupOrder:x,renderOrder:u.renderOrder,z:g,group:f},i[e]=w):(w.id=u.id,w.object=u,w.geometry=d,w.material=p,w.materialVariant=a(u),w.groupOrder=x,w.renderOrder=u.renderOrder,w.z=g,w.group=f),e++,w}function l(u,d,p,x,g,f){const w=o(u,d,p,x,g,f);p.transmission>0?n.push(w):p.transparent===!0?s.push(w):t.push(w)}function c(u,d,p,x,g,f){const w=o(u,d,p,x,g,f);p.transmission>0?n.unshift(w):p.transparent===!0?s.unshift(w):t.unshift(w)}function h(u,d,p){t.length>1&&t.sort(u||Ry),n.length>1&&n.sort(d||qh),s.length>1&&s.sort(d||qh),p&&(t.reverse(),n.reverse(),s.reverse())}function m(){for(let u=e,d=i.length;u<d;u++){const p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:m,sort:h}}function Cy(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Yh,i.set(n,[a])):s>=r.length?(a=new Yh,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Py(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new Je};break;case"SpotLight":t={position:new U,direction:new U,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new Je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":t={color:new Je,position:new U,halfWidth:new U,halfHeight:new U};break}return i[e.id]=t,t}}}function Iy(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Ly=0;function Dy(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Ny(i){const e=new Py,t=Iy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new U);const s=new U,r=new yt,a=new yt;function o(c){let h=0,m=0,u=0;for(let R=0;R<9;R++)n.probe[R].set(0,0,0);let d=0,p=0,x=0,g=0,f=0,w=0,E=0,y=0,S=0,T=0,A=0;c.sort(Dy);for(let R=0,D=c.length;R<D;R++){const N=c[R],k=N.color,G=N.intensity,X=N.distance;let F=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===as?F=N.shadow.map.texture:F=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)h+=k.r*G,m+=k.g*G,u+=k.b*G;else if(N.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(N.sh.coefficients[Z],G);A++}else if(N.isDirectionalLight){const Z=e.get(N);if(Z.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const H=N.shadow,$=t.get(N);$.shadowIntensity=H.intensity,$.shadowBias=H.bias,$.shadowNormalBias=H.normalBias,$.shadowRadius=H.radius,$.shadowMapSize=H.mapSize,n.directionalShadow[d]=$,n.directionalShadowMap[d]=F,n.directionalShadowMatrix[d]=N.shadow.matrix,w++}n.directional[d]=Z,d++}else if(N.isSpotLight){const Z=e.get(N);Z.position.setFromMatrixPosition(N.matrixWorld),Z.color.copy(k).multiplyScalar(G),Z.distance=X,Z.coneCos=Math.cos(N.angle),Z.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),Z.decay=N.decay,n.spot[x]=Z;const H=N.shadow;if(N.map&&(n.spotLightMap[S]=N.map,S++,H.updateMatrices(N),N.castShadow&&T++),n.spotLightMatrix[x]=H.matrix,N.castShadow){const $=t.get(N);$.shadowIntensity=H.intensity,$.shadowBias=H.bias,$.shadowNormalBias=H.normalBias,$.shadowRadius=H.radius,$.shadowMapSize=H.mapSize,n.spotShadow[x]=$,n.spotShadowMap[x]=F,y++}x++}else if(N.isRectAreaLight){const Z=e.get(N);Z.color.copy(k).multiplyScalar(G),Z.halfWidth.set(N.width*.5,0,0),Z.halfHeight.set(0,N.height*.5,0),n.rectArea[g]=Z,g++}else if(N.isPointLight){const Z=e.get(N);if(Z.color.copy(N.color).multiplyScalar(N.intensity),Z.distance=N.distance,Z.decay=N.decay,N.castShadow){const H=N.shadow,$=t.get(N);$.shadowIntensity=H.intensity,$.shadowBias=H.bias,$.shadowNormalBias=H.normalBias,$.shadowRadius=H.radius,$.shadowMapSize=H.mapSize,$.shadowCameraNear=H.camera.near,$.shadowCameraFar=H.camera.far,n.pointShadow[p]=$,n.pointShadowMap[p]=F,n.pointShadowMatrix[p]=N.shadow.matrix,E++}n.point[p]=Z,p++}else if(N.isHemisphereLight){const Z=e.get(N);Z.skyColor.copy(N.color).multiplyScalar(G),Z.groundColor.copy(N.groundColor).multiplyScalar(G),n.hemi[f]=Z,f++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ne.LTC_FLOAT_1,n.rectAreaLTC2=Ne.LTC_FLOAT_2):(n.rectAreaLTC1=Ne.LTC_HALF_1,n.rectAreaLTC2=Ne.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=m,n.ambient[2]=u;const v=n.hash;(v.directionalLength!==d||v.pointLength!==p||v.spotLength!==x||v.rectAreaLength!==g||v.hemiLength!==f||v.numDirectionalShadows!==w||v.numPointShadows!==E||v.numSpotShadows!==y||v.numSpotMaps!==S||v.numLightProbes!==A)&&(n.directional.length=d,n.spot.length=x,n.rectArea.length=g,n.point.length=p,n.hemi.length=f,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=y+S-T,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=A,v.directionalLength=d,v.pointLength=p,v.spotLength=x,v.rectAreaLength=g,v.hemiLength=f,v.numDirectionalShadows=w,v.numPointShadows=E,v.numSpotShadows=y,v.numSpotMaps=S,v.numLightProbes=A,n.version=Ly++)}function l(c,h){let m=0,u=0,d=0,p=0,x=0;const g=h.matrixWorldInverse;for(let f=0,w=c.length;f<w;f++){const E=c[f];if(E.isDirectionalLight){const y=n.directional[m];y.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(g),m++}else if(E.isSpotLight){const y=n.spot[d];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(g),d++}else if(E.isRectAreaLight){const y=n.rectArea[p];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(g),a.identity(),r.copy(E.matrixWorld),r.premultiply(g),a.extractRotation(r),y.halfWidth.set(E.width*.5,0,0),y.halfHeight.set(0,E.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),p++}else if(E.isPointLight){const y=n.point[u];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(g),u++}else if(E.isHemisphereLight){const y=n.hemi[x];y.direction.setFromMatrixPosition(E.matrixWorld),y.direction.transformDirection(g),x++}}}return{setup:o,setupView:l,state:n}}function Zh(i){const e=new Ny(i),t=[],n=[],s=[];function r(u){m.camera=u,t.length=0,n.length=0,s.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function l(u){s.push(u)}function c(){e.setup(t)}function h(u){e.setupView(t,u)}const m={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:m,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Uy(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Zh(i),e.set(s,[o])):r>=a.length?(o=new Zh(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const ky=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Fy=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Oy=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],By=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],Kh=new yt,mr=new U,$o=new U;function zy(i,e,t){let n=new ac;const s=new we,r=new we,a=new Nt,o=new Yp,l=new Zp,c={},h=t.maxTextureSize,m={[Wi]:xn,[xn]:Wi,[kn]:kn},u=new bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new we},radius:{value:4}},vertexShader:ky,fragmentShader:Fy}),d=u.clone();d.defines.HORIZONTAL_PASS=1;const p=new St;p.setAttribute("position",new fn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new ht(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ma;let f=this.type;this.render=function(T,A,v){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;this.type===Hu&&(Ye("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ma);const R=i.getRenderTarget(),D=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),k=i.state;k.setBlending(wi),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const G=f!==this.type;G&&A.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(F=>F.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,F=T.length;X<F;X++){const Z=T[X],H=Z.shadow;if(H===void 0){Ye("WebGLShadowMap:",Z,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const $=H.getFrameExtents();s.multiply($),r.copy(H.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/$.x),s.x=r.x*$.x,H.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/$.y),s.y=r.y*$.y,H.mapSize.y=r.y));const Q=i.state.buffers.depth.getReversed();if(H.camera._reversedDepth=Q,H.map===null||G===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===yr){if(Z.isPointLight){Ye("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new li(s.x,s.y,{format:as,type:Si,minFilter:en,magFilter:en,generateMipmaps:!1}),H.map.texture.name=Z.name+".shadowMap",H.map.depthTexture=new Qs(s.x,s.y,Xn),H.map.depthTexture.name=Z.name+".shadowMapDepth",H.map.depthTexture.format=Ei,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=sn,H.map.depthTexture.magFilter=sn}else Z.isPointLight?(H.map=new Yd(s.x),H.map.depthTexture=new dp(s.x,ci)):(H.map=new li(s.x,s.y),H.map.depthTexture=new Qs(s.x,s.y,ci)),H.map.depthTexture.name=Z.name+".shadowMap",H.map.depthTexture.format=Ei,this.type===Ma?(H.map.depthTexture.compareFunction=Q?nc:tc,H.map.depthTexture.minFilter=en,H.map.depthTexture.magFilter=en):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=sn,H.map.depthTexture.magFilter=sn);H.camera.updateProjectionMatrix()}const V=H.map.isWebGLCubeRenderTarget?6:1;for(let ee=0;ee<V;ee++){if(H.map.isWebGLCubeRenderTarget)i.setRenderTarget(H.map,ee),i.clear();else{ee===0&&(i.setRenderTarget(H.map),i.clear());const J=H.getViewport(ee);a.set(r.x*J.x,r.y*J.y,r.x*J.z,r.y*J.w),k.viewport(a)}if(Z.isPointLight){const J=H.camera,ve=H.matrix,Oe=Z.distance||J.far;Oe!==J.far&&(J.far=Oe,J.updateProjectionMatrix()),mr.setFromMatrixPosition(Z.matrixWorld),J.position.copy(mr),$o.copy(J.position),$o.add(Oy[ee]),J.up.copy(By[ee]),J.lookAt($o),J.updateMatrixWorld(),ve.makeTranslation(-mr.x,-mr.y,-mr.z),Kh.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),H._frustum.setFromProjectionMatrix(Kh,J.coordinateSystem,J.reversedDepth)}else H.updateMatrices(Z);n=H.getFrustum(),y(A,v,H.camera,Z,this.type)}H.isPointLightShadow!==!0&&this.type===yr&&w(H,v),H.needsUpdate=!1}f=this.type,g.needsUpdate=!1,i.setRenderTarget(R,D,N)};function w(T,A){const v=e.update(x);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new li(s.x,s.y,{format:as,type:Si})),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(A,null,v,u,x,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(A,null,v,d,x,null)}function E(T,A,v,R){let D=null;const N=v.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(N!==void 0)D=N;else if(D=v.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const k=D.uuid,G=A.uuid;let X=c[k];X===void 0&&(X={},c[k]=X);let F=X[G];F===void 0&&(F=D.clone(),X[G]=F,A.addEventListener("dispose",S)),D=F}if(D.visible=A.visible,D.wireframe=A.wireframe,R===yr?D.side=A.shadowSide!==null?A.shadowSide:A.side:D.side=A.shadowSide!==null?A.shadowSide:m[A.side],D.alphaMap=A.alphaMap,D.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,D.map=A.map,D.clipShadows=A.clipShadows,D.clippingPlanes=A.clippingPlanes,D.clipIntersection=A.clipIntersection,D.displacementMap=A.displacementMap,D.displacementScale=A.displacementScale,D.displacementBias=A.displacementBias,D.wireframeLinewidth=A.wireframeLinewidth,D.linewidth=A.linewidth,v.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const k=i.properties.get(D);k.light=v}return D}function y(T,A,v,R,D){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&D===yr)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,T.matrixWorld);const G=e.update(T),X=T.material;if(Array.isArray(X)){const F=G.groups;for(let Z=0,H=F.length;Z<H;Z++){const $=F[Z],Q=X[$.materialIndex];if(Q&&Q.visible){const V=E(T,Q,R,D);T.onBeforeShadow(i,T,A,v,G,V,$),i.renderBufferDirect(v,null,G,V,T,$),T.onAfterShadow(i,T,A,v,G,V,$)}}}else if(X.visible){const F=E(T,X,R,D);T.onBeforeShadow(i,T,A,v,G,F,null),i.renderBufferDirect(v,null,G,F,T,null),T.onAfterShadow(i,T,A,v,G,F,null)}}const k=T.children;for(let G=0,X=k.length;G<X;G++)y(k[G],A,v,R,D)}function S(T){T.target.removeEventListener("dispose",S);for(const v in c){const R=c[v],D=T.target.uuid;D in R&&(R[D].dispose(),delete R[D])}}}function Gy(i,e){function t(){let L=!1;const pe=new Nt;let q=null;const re=new Nt(0,0,0,0);return{setMask:function(xe){q!==xe&&!L&&(i.colorMask(xe,xe,xe,xe),q=xe)},setLocked:function(xe){L=xe},setClear:function(xe,le,Me,Ee,Qe){Qe===!0&&(xe*=Ee,le*=Ee,Me*=Ee),pe.set(xe,le,Me,Ee),re.equals(pe)===!1&&(i.clearColor(xe,le,Me,Ee),re.copy(pe))},reset:function(){L=!1,q=null,re.set(-1,0,0,0)}}}function n(){let L=!1,pe=!1,q=null,re=null,xe=null;return{setReversed:function(le){if(pe!==le){const Me=e.get("EXT_clip_control");le?Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.ZERO_TO_ONE_EXT):Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.NEGATIVE_ONE_TO_ONE_EXT),pe=le;const Ee=xe;xe=null,this.setClear(Ee)}},getReversed:function(){return pe},setTest:function(le){le?ue(i.DEPTH_TEST):be(i.DEPTH_TEST)},setMask:function(le){q!==le&&!L&&(i.depthMask(le),q=le)},setFunc:function(le){if(pe&&(le=wf[le]),re!==le){switch(le){case Jo:i.depthFunc(i.NEVER);break;case Qo:i.depthFunc(i.ALWAYS);break;case jo:i.depthFunc(i.LESS);break;case Zs:i.depthFunc(i.LEQUAL);break;case el:i.depthFunc(i.EQUAL);break;case tl:i.depthFunc(i.GEQUAL);break;case nl:i.depthFunc(i.GREATER);break;case il:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}re=le}},setLocked:function(le){L=le},setClear:function(le){xe!==le&&(xe=le,pe&&(le=1-le),i.clearDepth(le))},reset:function(){L=!1,q=null,re=null,xe=null,pe=!1}}}function s(){let L=!1,pe=null,q=null,re=null,xe=null,le=null,Me=null,Ee=null,Qe=null;return{setTest:function(rt){L||(rt?ue(i.STENCIL_TEST):be(i.STENCIL_TEST))},setMask:function(rt){pe!==rt&&!L&&(i.stencilMask(rt),pe=rt)},setFunc:function(rt,Pt,zt){(q!==rt||re!==Pt||xe!==zt)&&(i.stencilFunc(rt,Pt,zt),q=rt,re=Pt,xe=zt)},setOp:function(rt,Pt,zt){(le!==rt||Me!==Pt||Ee!==zt)&&(i.stencilOp(rt,Pt,zt),le=rt,Me=Pt,Ee=zt)},setLocked:function(rt){L=rt},setClear:function(rt){Qe!==rt&&(i.clearStencil(rt),Qe=rt)},reset:function(){L=!1,pe=null,q=null,re=null,xe=null,le=null,Me=null,Ee=null,Qe=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},m={},u={},d=new WeakMap,p=[],x=null,g=!1,f=null,w=null,E=null,y=null,S=null,T=null,A=null,v=new Je(0,0,0),R=0,D=!1,N=null,k=null,G=null,X=null,F=null;const Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,$=0;const Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(Q)[1]),H=$>=1):Q.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),H=$>=2);let V=null,ee={};const J=i.getParameter(i.SCISSOR_BOX),ve=i.getParameter(i.VIEWPORT),Oe=new Nt().fromArray(J),he=new Nt().fromArray(ve);function K(L,pe,q,re){const xe=new Uint8Array(4),le=i.createTexture();i.bindTexture(L,le),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Me=0;Me<q;Me++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(pe,0,i.RGBA,1,1,re,0,i.RGBA,i.UNSIGNED_BYTE,xe):i.texImage2D(pe+Me,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,xe);return le}const fe={};fe[i.TEXTURE_2D]=K(i.TEXTURE_2D,i.TEXTURE_2D,1),fe[i.TEXTURE_CUBE_MAP]=K(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),fe[i.TEXTURE_2D_ARRAY]=K(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),fe[i.TEXTURE_3D]=K(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ue(i.DEPTH_TEST),a.setFunc(Zs),ne(!1),ye(Fc),ue(i.CULL_FACE),P(wi);function ue(L){h[L]!==!0&&(i.enable(L),h[L]=!0)}function be(L){h[L]!==!1&&(i.disable(L),h[L]=!1)}function _e(L,pe){return u[L]!==pe?(i.bindFramebuffer(L,pe),u[L]=pe,L===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=pe),L===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=pe),!0):!1}function Ie(L,pe){let q=p,re=!1;if(L){q=d.get(pe),q===void 0&&(q=[],d.set(pe,q));const xe=L.textures;if(q.length!==xe.length||q[0]!==i.COLOR_ATTACHMENT0){for(let le=0,Me=xe.length;le<Me;le++)q[le]=i.COLOR_ATTACHMENT0+le;q.length=xe.length,re=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,re=!0);re&&i.drawBuffers(q)}function Ze(L){return x!==L?(i.useProgram(L),x=L,!0):!1}const Le={[ts]:i.FUNC_ADD,[Wu]:i.FUNC_SUBTRACT,[$u]:i.FUNC_REVERSE_SUBTRACT};Le[Xu]=i.MIN,Le[qu]=i.MAX;const de={[Yu]:i.ZERO,[Zu]:i.ONE,[Ku]:i.SRC_COLOR,[Zo]:i.SRC_ALPHA,[nf]:i.SRC_ALPHA_SATURATE,[ef]:i.DST_COLOR,[Qu]:i.DST_ALPHA,[Ju]:i.ONE_MINUS_SRC_COLOR,[Ko]:i.ONE_MINUS_SRC_ALPHA,[tf]:i.ONE_MINUS_DST_COLOR,[ju]:i.ONE_MINUS_DST_ALPHA,[sf]:i.CONSTANT_COLOR,[rf]:i.ONE_MINUS_CONSTANT_COLOR,[af]:i.CONSTANT_ALPHA,[of]:i.ONE_MINUS_CONSTANT_ALPHA};function P(L,pe,q,re,xe,le,Me,Ee,Qe,rt){if(L===wi){g===!0&&(be(i.BLEND),g=!1);return}if(g===!1&&(ue(i.BLEND),g=!0),L!==Vu){if(L!==f||rt!==D){if((w!==ts||S!==ts)&&(i.blendEquation(i.FUNC_ADD),w=ts,S=ts),rt)switch(L){case Vs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Oc:i.blendFunc(i.ONE,i.ONE);break;case Bc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case zc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:ot("WebGLState: Invalid blending: ",L);break}else switch(L){case Vs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Oc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Bc:ot("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case zc:ot("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ot("WebGLState: Invalid blending: ",L);break}E=null,y=null,T=null,A=null,v.set(0,0,0),R=0,f=L,D=rt}return}xe=xe||pe,le=le||q,Me=Me||re,(pe!==w||xe!==S)&&(i.blendEquationSeparate(Le[pe],Le[xe]),w=pe,S=xe),(q!==E||re!==y||le!==T||Me!==A)&&(i.blendFuncSeparate(de[q],de[re],de[le],de[Me]),E=q,y=re,T=le,A=Me),(Ee.equals(v)===!1||Qe!==R)&&(i.blendColor(Ee.r,Ee.g,Ee.b,Qe),v.copy(Ee),R=Qe),f=L,D=!1}function z(L,pe){L.side===kn?be(i.CULL_FACE):ue(i.CULL_FACE);let q=L.side===xn;pe&&(q=!q),ne(q),L.blending===Vs&&L.transparent===!1?P(wi):P(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);const re=L.stencilWrite;o.setTest(re),re&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Te(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ue(i.SAMPLE_ALPHA_TO_COVERAGE):be(i.SAMPLE_ALPHA_TO_COVERAGE)}function ne(L){N!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),N=L)}function ye(L){L!==zu?(ue(i.CULL_FACE),L!==k&&(L===Fc?i.cullFace(i.BACK):L===Gu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):be(i.CULL_FACE),k=L}function Ae(L){L!==G&&(H&&i.lineWidth(L),G=L)}function Te(L,pe,q){L?(ue(i.POLYGON_OFFSET_FILL),(X!==pe||F!==q)&&(X=pe,F=q,a.getReversed()&&(pe=-pe),i.polygonOffset(pe,q))):be(i.POLYGON_OFFSET_FILL)}function Fe(L){L?ue(i.SCISSOR_TEST):be(i.SCISSOR_TEST)}function Be(L){L===void 0&&(L=i.TEXTURE0+Z-1),V!==L&&(i.activeTexture(L),V=L)}function O(L,pe,q){q===void 0&&(V===null?q=i.TEXTURE0+Z-1:q=V);let re=ee[q];re===void 0&&(re={type:void 0,texture:void 0},ee[q]=re),(re.type!==L||re.texture!==pe)&&(V!==q&&(i.activeTexture(q),V=q),i.bindTexture(L,pe||fe[L]),re.type=L,re.texture=pe)}function Xe(){const L=ee[V];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function qe(){try{i.compressedTexImage2D(...arguments)}catch(L){ot("WebGLState:",L)}}function C(){try{i.compressedTexImage3D(...arguments)}catch(L){ot("WebGLState:",L)}}function b(){try{i.texSubImage2D(...arguments)}catch(L){ot("WebGLState:",L)}}function _(){try{i.texSubImage3D(...arguments)}catch(L){ot("WebGLState:",L)}}function I(){try{i.compressedTexSubImage2D(...arguments)}catch(L){ot("WebGLState:",L)}}function B(){try{i.compressedTexSubImage3D(...arguments)}catch(L){ot("WebGLState:",L)}}function se(){try{i.texStorage2D(...arguments)}catch(L){ot("WebGLState:",L)}}function me(){try{i.texStorage3D(...arguments)}catch(L){ot("WebGLState:",L)}}function j(){try{i.texImage2D(...arguments)}catch(L){ot("WebGLState:",L)}}function ae(){try{i.texImage3D(...arguments)}catch(L){ot("WebGLState:",L)}}function ge(L){return m[L]!==void 0?m[L]:i.getParameter(L)}function Se(L,pe){m[L]!==pe&&(i.pixelStorei(L,pe),m[L]=pe)}function Re(L){Oe.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),Oe.copy(L))}function Ce(L){he.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),he.copy(L))}function Pe(L,pe){let q=c.get(pe);q===void 0&&(q=new WeakMap,c.set(pe,q));let re=q.get(L);re===void 0&&(re=i.getUniformBlockIndex(pe,L.name),q.set(L,re))}function W(L,pe){const re=c.get(pe).get(L);l.get(pe)!==re&&(i.uniformBlockBinding(pe,re,L.__bindingPointIndex),l.set(pe,re))}function oe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},m={},V=null,ee={},u={},d=new WeakMap,p=[],x=null,g=!1,f=null,w=null,E=null,y=null,S=null,T=null,A=null,v=new Je(0,0,0),R=0,D=!1,N=null,k=null,G=null,X=null,F=null,Oe.set(0,0,i.canvas.width,i.canvas.height),he.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ue,disable:be,bindFramebuffer:_e,drawBuffers:Ie,useProgram:Ze,setBlending:P,setMaterial:z,setFlipSided:ne,setCullFace:ye,setLineWidth:Ae,setPolygonOffset:Te,setScissorTest:Fe,activeTexture:Be,bindTexture:O,unbindTexture:Xe,compressedTexImage2D:qe,compressedTexImage3D:C,texImage2D:j,texImage3D:ae,pixelStorei:Se,getParameter:ge,updateUBOMapping:Pe,uniformBlockBinding:W,texStorage2D:se,texStorage3D:me,texSubImage2D:b,texSubImage3D:_,compressedTexSubImage2D:I,compressedTexSubImage3D:B,scissor:Re,viewport:Ce,reset:oe}}function Hy(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new we,h=new WeakMap,m=new Set;let u;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(C,b){return p?new OffscreenCanvas(C,b):za("canvas")}function g(C,b,_){let I=1;const B=qe(C);if((B.width>_||B.height>_)&&(I=_/Math.max(B.width,B.height)),I<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const se=Math.floor(I*B.width),me=Math.floor(I*B.height);u===void 0&&(u=x(se,me));const j=b?x(se,me):u;return j.width=se,j.height=me,j.getContext("2d").drawImage(C,0,0,se,me),Ye("WebGLRenderer: Texture has been resized from ("+B.width+"x"+B.height+") to ("+se+"x"+me+")."),j}else return"data"in C&&Ye("WebGLRenderer: Image in DataTexture is too big ("+B.width+"x"+B.height+")."),C;return C}function f(C){return C.generateMipmaps}function w(C){i.generateMipmap(C)}function E(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(C,b,_,I,B,se=!1){if(C!==null){if(i[C]!==void 0)return i[C];Ye("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let me;I&&(me=e.get("EXT_texture_norm16"),me||Ye("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=b;if(b===i.RED&&(_===i.FLOAT&&(j=i.R32F),_===i.HALF_FLOAT&&(j=i.R16F),_===i.UNSIGNED_BYTE&&(j=i.R8),_===i.UNSIGNED_SHORT&&me&&(j=me.R16_EXT),_===i.SHORT&&me&&(j=me.R16_SNORM_EXT)),b===i.RED_INTEGER&&(_===i.UNSIGNED_BYTE&&(j=i.R8UI),_===i.UNSIGNED_SHORT&&(j=i.R16UI),_===i.UNSIGNED_INT&&(j=i.R32UI),_===i.BYTE&&(j=i.R8I),_===i.SHORT&&(j=i.R16I),_===i.INT&&(j=i.R32I)),b===i.RG&&(_===i.FLOAT&&(j=i.RG32F),_===i.HALF_FLOAT&&(j=i.RG16F),_===i.UNSIGNED_BYTE&&(j=i.RG8),_===i.UNSIGNED_SHORT&&me&&(j=me.RG16_EXT),_===i.SHORT&&me&&(j=me.RG16_SNORM_EXT)),b===i.RG_INTEGER&&(_===i.UNSIGNED_BYTE&&(j=i.RG8UI),_===i.UNSIGNED_SHORT&&(j=i.RG16UI),_===i.UNSIGNED_INT&&(j=i.RG32UI),_===i.BYTE&&(j=i.RG8I),_===i.SHORT&&(j=i.RG16I),_===i.INT&&(j=i.RG32I)),b===i.RGB_INTEGER&&(_===i.UNSIGNED_BYTE&&(j=i.RGB8UI),_===i.UNSIGNED_SHORT&&(j=i.RGB16UI),_===i.UNSIGNED_INT&&(j=i.RGB32UI),_===i.BYTE&&(j=i.RGB8I),_===i.SHORT&&(j=i.RGB16I),_===i.INT&&(j=i.RGB32I)),b===i.RGBA_INTEGER&&(_===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),_===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),_===i.UNSIGNED_INT&&(j=i.RGBA32UI),_===i.BYTE&&(j=i.RGBA8I),_===i.SHORT&&(j=i.RGBA16I),_===i.INT&&(j=i.RGBA32I)),b===i.RGB&&(_===i.UNSIGNED_SHORT&&me&&(j=me.RGB16_EXT),_===i.SHORT&&me&&(j=me.RGB16_SNORM_EXT),_===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),_===i.UNSIGNED_INT_10F_11F_11F_REV&&(j=i.R11F_G11F_B10F)),b===i.RGBA){const ae=se?Ba:lt.getTransfer(B);_===i.FLOAT&&(j=i.RGBA32F),_===i.HALF_FLOAT&&(j=i.RGBA16F),_===i.UNSIGNED_BYTE&&(j=ae===bt?i.SRGB8_ALPHA8:i.RGBA8),_===i.UNSIGNED_SHORT&&me&&(j=me.RGBA16_EXT),_===i.SHORT&&me&&(j=me.RGBA16_SNORM_EXT),_===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),_===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function S(C,b){let _;return C?b===null||b===ci||b===Pr?_=i.DEPTH24_STENCIL8:b===Xn?_=i.DEPTH32F_STENCIL8:b===Cr&&(_=i.DEPTH24_STENCIL8,Ye("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===ci||b===Pr?_=i.DEPTH_COMPONENT24:b===Xn?_=i.DEPTH_COMPONENT32F:b===Cr&&(_=i.DEPTH_COMPONENT16),_}function T(C,b){return f(C)===!0||C.isFramebufferTexture&&C.minFilter!==sn&&C.minFilter!==en?Math.log2(Math.max(b.width,b.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?b.mipmaps.length:1}function A(C){const b=C.target;b.removeEventListener("dispose",A),R(b),b.isVideoTexture&&h.delete(b),b.isHTMLTexture&&m.delete(b)}function v(C){const b=C.target;b.removeEventListener("dispose",v),N(b)}function R(C){const b=n.get(C);if(b.__webglInit===void 0)return;const _=C.source,I=d.get(_);if(I){const B=I[b.__cacheKey];B.usedTimes--,B.usedTimes===0&&D(C),Object.keys(I).length===0&&d.delete(_)}n.remove(C)}function D(C){const b=n.get(C);i.deleteTexture(b.__webglTexture);const _=C.source,I=d.get(_);delete I[b.__cacheKey],a.memory.textures--}function N(C){const b=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let I=0;I<6;I++){if(Array.isArray(b.__webglFramebuffer[I]))for(let B=0;B<b.__webglFramebuffer[I].length;B++)i.deleteFramebuffer(b.__webglFramebuffer[I][B]);else i.deleteFramebuffer(b.__webglFramebuffer[I]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[I])}else{if(Array.isArray(b.__webglFramebuffer))for(let I=0;I<b.__webglFramebuffer.length;I++)i.deleteFramebuffer(b.__webglFramebuffer[I]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let I=0;I<b.__webglColorRenderbuffer.length;I++)b.__webglColorRenderbuffer[I]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[I]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const _=C.textures;for(let I=0,B=_.length;I<B;I++){const se=n.get(_[I]);se.__webglTexture&&(i.deleteTexture(se.__webglTexture),a.memory.textures--),n.remove(_[I])}n.remove(C)}let k=0;function G(){k=0}function X(){return k}function F(C){k=C}function Z(){const C=k;return C>=s.maxTextures&&Ye("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),k+=1,C}function H(C){const b=[];return b.push(C.wrapS),b.push(C.wrapT),b.push(C.wrapR||0),b.push(C.magFilter),b.push(C.minFilter),b.push(C.anisotropy),b.push(C.internalFormat),b.push(C.format),b.push(C.type),b.push(C.generateMipmaps),b.push(C.premultiplyAlpha),b.push(C.flipY),b.push(C.unpackAlignment),b.push(C.colorSpace),b.join()}function $(C,b){const _=n.get(C);if(C.isVideoTexture&&O(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&_.__version!==C.version){const I=C.image;if(I===null)Ye("WebGLRenderer: Texture marked for update but no image data found.");else if(I.complete===!1)Ye("WebGLRenderer: Texture marked for update but image is incomplete");else{be(_,C,b);return}}else C.isExternalTexture&&(_.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,_.__webglTexture,i.TEXTURE0+b)}function Q(C,b){const _=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&_.__version!==C.version){be(_,C,b);return}else C.isExternalTexture&&(_.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,_.__webglTexture,i.TEXTURE0+b)}function V(C,b){const _=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&_.__version!==C.version){be(_,C,b);return}t.bindTexture(i.TEXTURE_3D,_.__webglTexture,i.TEXTURE0+b)}function ee(C,b){const _=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&_.__version!==C.version){_e(_,C,b);return}t.bindTexture(i.TEXTURE_CUBE_MAP,_.__webglTexture,i.TEXTURE0+b)}const J={[$i]:i.REPEAT,[xi]:i.CLAMP_TO_EDGE,[sl]:i.MIRRORED_REPEAT},ve={[sn]:i.NEAREST,[hf]:i.NEAREST_MIPMAP_NEAREST,[Vr]:i.NEAREST_MIPMAP_LINEAR,[en]:i.LINEAR,[co]:i.LINEAR_MIPMAP_NEAREST,[Oi]:i.LINEAR_MIPMAP_LINEAR},Oe={[ff]:i.NEVER,[yf]:i.ALWAYS,[pf]:i.LESS,[tc]:i.LEQUAL,[mf]:i.EQUAL,[nc]:i.GEQUAL,[gf]:i.GREATER,[vf]:i.NOTEQUAL};function he(C,b){if(b.type===Xn&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===en||b.magFilter===co||b.magFilter===Vr||b.magFilter===Oi||b.minFilter===en||b.minFilter===co||b.minFilter===Vr||b.minFilter===Oi)&&Ye("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,J[b.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,J[b.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,J[b.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,ve[b.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,ve[b.minFilter]),b.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,Oe[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===sn||b.minFilter!==Vr&&b.minFilter!==Oi||b.type===Xn&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const _=e.get("EXT_texture_filter_anisotropic");i.texParameterf(C,_.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function K(C,b){let _=!1;C.__webglInit===void 0&&(C.__webglInit=!0,b.addEventListener("dispose",A));const I=b.source;let B=d.get(I);B===void 0&&(B={},d.set(I,B));const se=H(b);if(se!==C.__cacheKey){B[se]===void 0&&(B[se]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,_=!0),B[se].usedTimes++;const me=B[C.__cacheKey];me!==void 0&&(B[C.__cacheKey].usedTimes--,me.usedTimes===0&&D(b)),C.__cacheKey=se,C.__webglTexture=B[se].texture}return _}function fe(C,b,_){return Math.floor(Math.floor(C/_)/b)}function ue(C,b,_,I){const se=C.updateRanges;if(se.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,b.width,b.height,_,I,b.data);else{se.sort((Se,Re)=>Se.start-Re.start);let me=0;for(let Se=1;Se<se.length;Se++){const Re=se[me],Ce=se[Se],Pe=Re.start+Re.count,W=fe(Ce.start,b.width,4),oe=fe(Re.start,b.width,4);Ce.start<=Pe+1&&W===oe&&fe(Ce.start+Ce.count-1,b.width,4)===W?Re.count=Math.max(Re.count,Ce.start+Ce.count-Re.start):(++me,se[me]=Ce)}se.length=me+1;const j=t.getParameter(i.UNPACK_ROW_LENGTH),ae=t.getParameter(i.UNPACK_SKIP_PIXELS),ge=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,b.width);for(let Se=0,Re=se.length;Se<Re;Se++){const Ce=se[Se],Pe=Math.floor(Ce.start/4),W=Math.ceil(Ce.count/4),oe=Pe%b.width,L=Math.floor(Pe/b.width),pe=W,q=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,oe),t.pixelStorei(i.UNPACK_SKIP_ROWS,L),t.texSubImage2D(i.TEXTURE_2D,0,oe,L,pe,q,_,I,b.data)}C.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,j),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ae),t.pixelStorei(i.UNPACK_SKIP_ROWS,ge)}}function be(C,b,_){let I=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(I=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(I=i.TEXTURE_3D);const B=K(C,b),se=b.source;t.bindTexture(I,C.__webglTexture,i.TEXTURE0+_);const me=n.get(se);if(se.version!==me.__version||B===!0){if(t.activeTexture(i.TEXTURE0+_),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){const q=lt.getPrimaries(lt.workingColorSpace),re=b.colorSpace===Fi?null:lt.getPrimaries(b.colorSpace),xe=b.colorSpace===Fi||q===re?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe)}t.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment);let ae=g(b.image,!1,s.maxTextureSize);ae=Xe(b,ae);const ge=r.convert(b.format,b.colorSpace),Se=r.convert(b.type);let Re=y(b.internalFormat,ge,Se,b.normalized,b.colorSpace,b.isVideoTexture);he(I,b);let Ce;const Pe=b.mipmaps,W=b.isVideoTexture!==!0,oe=me.__version===void 0||B===!0,L=se.dataReady,pe=T(b,ae);if(b.isDepthTexture)Re=S(b.format===is,b.type),oe&&(W?t.texStorage2D(i.TEXTURE_2D,1,Re,ae.width,ae.height):t.texImage2D(i.TEXTURE_2D,0,Re,ae.width,ae.height,0,ge,Se,null));else if(b.isDataTexture)if(Pe.length>0){W&&oe&&t.texStorage2D(i.TEXTURE_2D,pe,Re,Pe[0].width,Pe[0].height);for(let q=0,re=Pe.length;q<re;q++)Ce=Pe[q],W?L&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,Ce.width,Ce.height,ge,Se,Ce.data):t.texImage2D(i.TEXTURE_2D,q,Re,Ce.width,Ce.height,0,ge,Se,Ce.data);b.generateMipmaps=!1}else W?(oe&&t.texStorage2D(i.TEXTURE_2D,pe,Re,ae.width,ae.height),L&&ue(b,ae,ge,Se)):t.texImage2D(i.TEXTURE_2D,0,Re,ae.width,ae.height,0,ge,Se,ae.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){W&&oe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,Re,Pe[0].width,Pe[0].height,ae.depth);for(let q=0,re=Pe.length;q<re;q++)if(Ce=Pe[q],b.format!==qn)if(ge!==null)if(W){if(L)if(b.layerUpdates.size>0){const xe=Rh(Ce.width,Ce.height,b.format,b.type);for(const le of b.layerUpdates){const Me=Ce.data.subarray(le*xe/Ce.data.BYTES_PER_ELEMENT,(le+1)*xe/Ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,le,Ce.width,Ce.height,1,ge,Me)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,Ce.width,Ce.height,ae.depth,ge,Ce.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,Re,Ce.width,Ce.height,ae.depth,0,Ce.data,0,0);else Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else W?L&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,Ce.width,Ce.height,ae.depth,ge,Se,Ce.data):t.texImage3D(i.TEXTURE_2D_ARRAY,q,Re,Ce.width,Ce.height,ae.depth,0,ge,Se,Ce.data)}else{W&&oe&&t.texStorage2D(i.TEXTURE_2D,pe,Re,Pe[0].width,Pe[0].height);for(let q=0,re=Pe.length;q<re;q++)Ce=Pe[q],b.format!==qn?ge!==null?W?L&&t.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,Ce.width,Ce.height,ge,Ce.data):t.compressedTexImage2D(i.TEXTURE_2D,q,Re,Ce.width,Ce.height,0,Ce.data):Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):W?L&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,Ce.width,Ce.height,ge,Se,Ce.data):t.texImage2D(i.TEXTURE_2D,q,Re,Ce.width,Ce.height,0,ge,Se,Ce.data)}else if(b.isDataArrayTexture)if(W){if(oe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,Re,ae.width,ae.height,ae.depth),L)if(b.layerUpdates.size>0){const q=Rh(ae.width,ae.height,b.format,b.type);for(const re of b.layerUpdates){const xe=ae.data.subarray(re*q/ae.data.BYTES_PER_ELEMENT,(re+1)*q/ae.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,re,ae.width,ae.height,1,ge,Se,xe)}b.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ae.width,ae.height,ae.depth,ge,Se,ae.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Re,ae.width,ae.height,ae.depth,0,ge,Se,ae.data);else if(b.isData3DTexture)W?(oe&&t.texStorage3D(i.TEXTURE_3D,pe,Re,ae.width,ae.height,ae.depth),L&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ae.width,ae.height,ae.depth,ge,Se,ae.data)):t.texImage3D(i.TEXTURE_3D,0,Re,ae.width,ae.height,ae.depth,0,ge,Se,ae.data);else if(b.isFramebufferTexture){if(oe)if(W)t.texStorage2D(i.TEXTURE_2D,pe,Re,ae.width,ae.height);else{let q=ae.width,re=ae.height;for(let xe=0;xe<pe;xe++)t.texImage2D(i.TEXTURE_2D,xe,Re,q,re,0,ge,Se,null),q>>=1,re>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in i){const q=i.canvas;if(q.hasAttribute("layoutsubtree")||q.setAttribute("layoutsubtree","true"),ae.parentNode!==q){q.appendChild(ae),m.add(b),q.onpaint=re=>{const xe=re.changedElements;for(const le of m)xe.includes(le.image)&&(le.needsUpdate=!0)},q.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ae);else{const xe=i.RGBA,le=i.RGBA,Me=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,xe,le,Me,ae)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Pe.length>0){if(W&&oe){const q=qe(Pe[0]);t.texStorage2D(i.TEXTURE_2D,pe,Re,q.width,q.height)}for(let q=0,re=Pe.length;q<re;q++)Ce=Pe[q],W?L&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,ge,Se,Ce):t.texImage2D(i.TEXTURE_2D,q,Re,ge,Se,Ce);b.generateMipmaps=!1}else if(W){if(oe){const q=qe(ae);t.texStorage2D(i.TEXTURE_2D,pe,Re,q.width,q.height)}L&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ge,Se,ae)}else t.texImage2D(i.TEXTURE_2D,0,Re,ge,Se,ae);f(b)&&w(I),me.__version=se.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function _e(C,b,_){if(b.image.length!==6)return;const I=K(C,b),B=b.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+_);const se=n.get(B);if(B.version!==se.__version||I===!0){t.activeTexture(i.TEXTURE0+_);const me=lt.getPrimaries(lt.workingColorSpace),j=b.colorSpace===Fi?null:lt.getPrimaries(b.colorSpace),ae=b.colorSpace===Fi||me===j?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ae);const ge=b.isCompressedTexture||b.image[0].isCompressedTexture,Se=b.image[0]&&b.image[0].isDataTexture,Re=[];for(let le=0;le<6;le++)!ge&&!Se?Re[le]=g(b.image[le],!0,s.maxCubemapSize):Re[le]=Se?b.image[le].image:b.image[le],Re[le]=Xe(b,Re[le]);const Ce=Re[0],Pe=r.convert(b.format,b.colorSpace),W=r.convert(b.type),oe=y(b.internalFormat,Pe,W,b.normalized,b.colorSpace),L=b.isVideoTexture!==!0,pe=se.__version===void 0||I===!0,q=B.dataReady;let re=T(b,Ce);he(i.TEXTURE_CUBE_MAP,b);let xe;if(ge){L&&pe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,re,oe,Ce.width,Ce.height);for(let le=0;le<6;le++){xe=Re[le].mipmaps;for(let Me=0;Me<xe.length;Me++){const Ee=xe[Me];b.format!==qn?Pe!==null?L?q&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Me,0,0,Ee.width,Ee.height,Pe,Ee.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Me,oe,Ee.width,Ee.height,0,Ee.data):Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Me,0,0,Ee.width,Ee.height,Pe,W,Ee.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Me,oe,Ee.width,Ee.height,0,Pe,W,Ee.data)}}}else{if(xe=b.mipmaps,L&&pe){xe.length>0&&re++;const le=qe(Re[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,re,oe,le.width,le.height)}for(let le=0;le<6;le++)if(Se){L?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,Re[le].width,Re[le].height,Pe,W,Re[le].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,oe,Re[le].width,Re[le].height,0,Pe,W,Re[le].data);for(let Me=0;Me<xe.length;Me++){const Qe=xe[Me].image[le].image;L?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Me+1,0,0,Qe.width,Qe.height,Pe,W,Qe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Me+1,oe,Qe.width,Qe.height,0,Pe,W,Qe.data)}}else{L?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,Pe,W,Re[le]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,oe,Pe,W,Re[le]);for(let Me=0;Me<xe.length;Me++){const Ee=xe[Me];L?q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Me+1,0,0,Pe,W,Ee.image[le]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Me+1,oe,Pe,W,Ee.image[le])}}}f(b)&&w(i.TEXTURE_CUBE_MAP),se.__version=B.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function Ie(C,b,_,I,B,se){const me=r.convert(_.format,_.colorSpace),j=r.convert(_.type),ae=y(_.internalFormat,me,j,_.normalized,_.colorSpace),ge=n.get(b),Se=n.get(_);if(Se.__renderTarget=b,!ge.__hasExternalTextures){const Re=Math.max(1,b.width>>se),Ce=Math.max(1,b.height>>se);B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY?t.texImage3D(B,se,ae,Re,Ce,b.depth,0,me,j,null):t.texImage2D(B,se,ae,Re,Ce,0,me,j,null)}t.bindFramebuffer(i.FRAMEBUFFER,C),Be(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,I,B,Se.__webglTexture,0,Fe(b)):(B===i.TEXTURE_2D||B>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&B<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,I,B,Se.__webglTexture,se),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ze(C,b,_){if(i.bindRenderbuffer(i.RENDERBUFFER,C),b.depthBuffer){const I=b.depthTexture,B=I&&I.isDepthTexture?I.type:null,se=S(b.stencilBuffer,B),me=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Be(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Fe(b),se,b.width,b.height):_?i.renderbufferStorageMultisample(i.RENDERBUFFER,Fe(b),se,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,se,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,me,i.RENDERBUFFER,C)}else{const I=b.textures;for(let B=0;B<I.length;B++){const se=I[B],me=r.convert(se.format,se.colorSpace),j=r.convert(se.type),ae=y(se.internalFormat,me,j,se.normalized,se.colorSpace);Be(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Fe(b),ae,b.width,b.height):_?i.renderbufferStorageMultisample(i.RENDERBUFFER,Fe(b),ae,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,ae,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Le(C,b,_){const I=b.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,C),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const B=n.get(b.depthTexture);if(B.__renderTarget=b,(!B.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),I){if(B.__webglInit===void 0&&(B.__webglInit=!0,b.depthTexture.addEventListener("dispose",A)),B.__webglTexture===void 0){B.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture),he(i.TEXTURE_CUBE_MAP,b.depthTexture);const ge=r.convert(b.depthTexture.format),Se=r.convert(b.depthTexture.type);let Re;b.depthTexture.format===Ei?Re=i.DEPTH_COMPONENT24:b.depthTexture.format===is&&(Re=i.DEPTH24_STENCIL8);for(let Ce=0;Ce<6;Ce++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,0,Re,b.width,b.height,0,ge,Se,null)}}else $(b.depthTexture,0);const se=B.__webglTexture,me=Fe(b),j=I?i.TEXTURE_CUBE_MAP_POSITIVE_X+_:i.TEXTURE_2D,ae=b.depthTexture.format===is?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(b.depthTexture.format===Ei)Be(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ae,j,se,0,me):i.framebufferTexture2D(i.FRAMEBUFFER,ae,j,se,0);else if(b.depthTexture.format===is)Be(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ae,j,se,0,me):i.framebufferTexture2D(i.FRAMEBUFFER,ae,j,se,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function de(C){const b=n.get(C),_=C.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==C.depthTexture){const I=C.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),I){const B=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,I.removeEventListener("dispose",B)};I.addEventListener("dispose",B),b.__depthDisposeCallback=B}b.__boundDepthTexture=I}if(C.depthTexture&&!b.__autoAllocateDepthBuffer)if(_)for(let I=0;I<6;I++)Le(b.__webglFramebuffer[I],C,I);else{const I=C.texture.mipmaps;I&&I.length>0?Le(b.__webglFramebuffer[0],C,0):Le(b.__webglFramebuffer,C,0)}else if(_){b.__webglDepthbuffer=[];for(let I=0;I<6;I++)if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[I]),b.__webglDepthbuffer[I]===void 0)b.__webglDepthbuffer[I]=i.createRenderbuffer(),Ze(b.__webglDepthbuffer[I],C,!1);else{const B=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,se=b.__webglDepthbuffer[I];i.bindRenderbuffer(i.RENDERBUFFER,se),i.framebufferRenderbuffer(i.FRAMEBUFFER,B,i.RENDERBUFFER,se)}}else{const I=C.texture.mipmaps;if(I&&I.length>0?t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),Ze(b.__webglDepthbuffer,C,!1);else{const B=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,se=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,se),i.framebufferRenderbuffer(i.FRAMEBUFFER,B,i.RENDERBUFFER,se)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function P(C,b,_){const I=n.get(C);b!==void 0&&Ie(I.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),_!==void 0&&de(C)}function z(C){const b=C.texture,_=n.get(C),I=n.get(b);C.addEventListener("dispose",v);const B=C.textures,se=C.isWebGLCubeRenderTarget===!0,me=B.length>1;if(me||(I.__webglTexture===void 0&&(I.__webglTexture=i.createTexture()),I.__version=b.version,a.memory.textures++),se){_.__webglFramebuffer=[];for(let j=0;j<6;j++)if(b.mipmaps&&b.mipmaps.length>0){_.__webglFramebuffer[j]=[];for(let ae=0;ae<b.mipmaps.length;ae++)_.__webglFramebuffer[j][ae]=i.createFramebuffer()}else _.__webglFramebuffer[j]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){_.__webglFramebuffer=[];for(let j=0;j<b.mipmaps.length;j++)_.__webglFramebuffer[j]=i.createFramebuffer()}else _.__webglFramebuffer=i.createFramebuffer();if(me)for(let j=0,ae=B.length;j<ae;j++){const ge=n.get(B[j]);ge.__webglTexture===void 0&&(ge.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&Be(C)===!1){_.__webglMultisampledFramebuffer=i.createFramebuffer(),_.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,_.__webglMultisampledFramebuffer);for(let j=0;j<B.length;j++){const ae=B[j];_.__webglColorRenderbuffer[j]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,_.__webglColorRenderbuffer[j]);const ge=r.convert(ae.format,ae.colorSpace),Se=r.convert(ae.type),Re=y(ae.internalFormat,ge,Se,ae.normalized,ae.colorSpace,C.isXRRenderTarget===!0),Ce=Fe(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ce,Re,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+j,i.RENDERBUFFER,_.__webglColorRenderbuffer[j])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(_.__webglDepthRenderbuffer=i.createRenderbuffer(),Ze(_.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(se){t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture),he(i.TEXTURE_CUBE_MAP,b);for(let j=0;j<6;j++)if(b.mipmaps&&b.mipmaps.length>0)for(let ae=0;ae<b.mipmaps.length;ae++)Ie(_.__webglFramebuffer[j][ae],C,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ae);else Ie(_.__webglFramebuffer[j],C,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);f(b)&&w(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(me){for(let j=0,ae=B.length;j<ae;j++){const ge=B[j],Se=n.get(ge);let Re=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(Re=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Re,Se.__webglTexture),he(Re,ge),Ie(_.__webglFramebuffer,C,ge,i.COLOR_ATTACHMENT0+j,Re,0),f(ge)&&w(Re)}t.unbindTexture()}else{let j=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(j=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(j,I.__webglTexture),he(j,b),b.mipmaps&&b.mipmaps.length>0)for(let ae=0;ae<b.mipmaps.length;ae++)Ie(_.__webglFramebuffer[ae],C,b,i.COLOR_ATTACHMENT0,j,ae);else Ie(_.__webglFramebuffer,C,b,i.COLOR_ATTACHMENT0,j,0);f(b)&&w(j),t.unbindTexture()}C.depthBuffer&&de(C)}function ne(C){const b=C.textures;for(let _=0,I=b.length;_<I;_++){const B=b[_];if(f(B)){const se=E(C),me=n.get(B).__webglTexture;t.bindTexture(se,me),w(se),t.unbindTexture()}}}const ye=[],Ae=[];function Te(C){if(C.samples>0){if(Be(C)===!1){const b=C.textures,_=C.width,I=C.height;let B=i.COLOR_BUFFER_BIT;const se=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,me=n.get(C),j=b.length>1;if(j)for(let ge=0;ge<b.length;ge++)t.bindFramebuffer(i.FRAMEBUFFER,me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,me.__webglMultisampledFramebuffer);const ae=C.texture.mipmaps;ae&&ae.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,me.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,me.__webglFramebuffer);for(let ge=0;ge<b.length;ge++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(B|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(B|=i.STENCIL_BUFFER_BIT)),j){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,me.__webglColorRenderbuffer[ge]);const Se=n.get(b[ge]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Se,0)}i.blitFramebuffer(0,0,_,I,0,0,_,I,B,i.NEAREST),l===!0&&(ye.length=0,Ae.length=0,ye.push(i.COLOR_ATTACHMENT0+ge),C.depthBuffer&&C.resolveDepthBuffer===!1&&(ye.push(se),Ae.push(se),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ae)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ye))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),j)for(let ge=0;ge<b.length;ge++){t.bindFramebuffer(i.FRAMEBUFFER,me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,me.__webglColorRenderbuffer[ge]);const Se=n.get(b[ge]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.TEXTURE_2D,Se,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,me.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const b=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function Fe(C){return Math.min(s.maxSamples,C.samples)}function Be(C){const b=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function O(C){const b=a.render.frame;h.get(C)!==b&&(h.set(C,b),C.update())}function Xe(C,b){const _=C.colorSpace,I=C.format,B=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||_!==Oa&&_!==Fi&&(lt.getTransfer(_)===bt?(I!==qn||B!==An)&&Ye("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ot("WebGLTextures: Unsupported texture color space:",_)),b}function qe(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=Z,this.resetTextureUnits=G,this.getTextureUnits=X,this.setTextureUnits=F,this.setTexture2D=$,this.setTexture2DArray=Q,this.setTexture3D=V,this.setTextureCube=ee,this.rebindTextures=P,this.setupRenderTarget=z,this.updateRenderTargetMipmap=ne,this.updateMultisampleRenderTarget=Te,this.setupDepthRenderbuffer=de,this.setupFrameBufferTexture=Ie,this.useMultisampledRTT=Be,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Vy(i,e){function t(n,s=Fi){let r;const a=lt.getTransfer(s);if(n===An)return i.UNSIGNED_BYTE;if(n===Zl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Kl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===xd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===bd)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===vd)return i.BYTE;if(n===yd)return i.SHORT;if(n===Cr)return i.UNSIGNED_SHORT;if(n===Yl)return i.INT;if(n===ci)return i.UNSIGNED_INT;if(n===Xn)return i.FLOAT;if(n===Si)return i.HALF_FLOAT;if(n===_d)return i.ALPHA;if(n===wd)return i.RGB;if(n===qn)return i.RGBA;if(n===Ei)return i.DEPTH_COMPONENT;if(n===is)return i.DEPTH_STENCIL;if(n===Jl)return i.RED;if(n===Ql)return i.RED_INTEGER;if(n===as)return i.RG;if(n===jl)return i.RG_INTEGER;if(n===ec)return i.RGBA_INTEGER;if(n===Sa||n===Ea||n===Ta||n===Aa)if(a===bt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Sa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ea)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Sa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ea)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ta)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Aa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===rl||n===al||n===ol||n===ll)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===rl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===al)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ol)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ll)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===cl||n===hl||n===dl||n===ul||n===fl||n===ka||n===pl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===cl||n===hl)return a===bt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===dl)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ul)return r.COMPRESSED_R11_EAC;if(n===fl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===ka)return r.COMPRESSED_RG11_EAC;if(n===pl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ml||n===gl||n===vl||n===yl||n===xl||n===bl||n===_l||n===wl||n===Ml||n===Sl||n===El||n===Tl||n===Al||n===Rl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ml)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===gl)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===vl)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===yl)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===xl)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===bl)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===_l)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===wl)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ml)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Sl)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===El)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Tl)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Al)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Rl)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Cl||n===Pl||n===Il)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Cl)return a===bt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Pl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Il)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ll||n===Dl||n===Fa||n===Nl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ll)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Dl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Fa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Nl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Pr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const Wy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,$y=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Xy{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Dd(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new bn({vertexShader:Wy,fragmentShader:$y,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ht(new Bn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class qy extends ls{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,m=null,u=null,d=null,p=null;const x=typeof XRWebGLBinding<"u",g=new Xy,f={},w=t.getContextAttributes();let E=null,y=null;const S=[],T=[],A=new we;let v=null;const R=new Tn;R.viewport=new Nt;const D=new Tn;D.viewport=new Nt;const N=[R,D],k=new im;let G=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let fe=S[K];return fe===void 0&&(fe=new go,S[K]=fe),fe.getTargetRaySpace()},this.getControllerGrip=function(K){let fe=S[K];return fe===void 0&&(fe=new go,S[K]=fe),fe.getGripSpace()},this.getHand=function(K){let fe=S[K];return fe===void 0&&(fe=new go,S[K]=fe),fe.getHandSpace()};function F(K){const fe=T.indexOf(K.inputSource);if(fe===-1)return;const ue=S[fe];ue!==void 0&&(ue.update(K.inputSource,K.frame,c||a),ue.dispatchEvent({type:K.type,data:K.inputSource}))}function Z(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",H);for(let K=0;K<S.length;K++){const fe=T[K];fe!==null&&(T[K]=null,S[K].disconnect(fe))}G=null,X=null,g.reset();for(const K in f)delete f[K];e.setRenderTarget(E),d=null,u=null,m=null,s=null,y=null,he.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&Ye("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,n.isPresenting===!0&&Ye("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return m===null&&x&&(m=new XRWebGLBinding(s,t)),m},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(E=e.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",H),w.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(A),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ue=null,be=null,_e=null;w.depth&&(_e=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ue=w.stencil?is:Ei,be=w.stencil?Pr:ci);const Ie={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:r};m=this.getBinding(),u=m.createProjectionLayer(Ie),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new li(u.textureWidth,u.textureHeight,{format:qn,type:An,depthTexture:new Qs(u.textureWidth,u.textureHeight,be,void 0,void 0,void 0,void 0,void 0,void 0,ue),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ue={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,ue),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new li(d.framebufferWidth,d.framebufferHeight,{format:qn,type:An,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),he.setContext(s),he.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function H(K){for(let fe=0;fe<K.removed.length;fe++){const ue=K.removed[fe],be=T.indexOf(ue);be>=0&&(T[be]=null,S[be].disconnect(ue))}for(let fe=0;fe<K.added.length;fe++){const ue=K.added[fe];let be=T.indexOf(ue);if(be===-1){for(let Ie=0;Ie<S.length;Ie++)if(Ie>=T.length){T.push(ue),be=Ie;break}else if(T[Ie]===null){T[Ie]=ue,be=Ie;break}if(be===-1)break}const _e=S[be];_e&&_e.connect(ue)}}const $=new U,Q=new U;function V(K,fe,ue){$.setFromMatrixPosition(fe.matrixWorld),Q.setFromMatrixPosition(ue.matrixWorld);const be=$.distanceTo(Q),_e=fe.projectionMatrix.elements,Ie=ue.projectionMatrix.elements,Ze=_e[14]/(_e[10]-1),Le=_e[14]/(_e[10]+1),de=(_e[9]+1)/_e[5],P=(_e[9]-1)/_e[5],z=(_e[8]-1)/_e[0],ne=(Ie[8]+1)/Ie[0],ye=Ze*z,Ae=Ze*ne,Te=be/(-z+ne),Fe=Te*-z;if(fe.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Fe),K.translateZ(Te),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),_e[10]===-1)K.projectionMatrix.copy(fe.projectionMatrix),K.projectionMatrixInverse.copy(fe.projectionMatrixInverse);else{const Be=Ze+Te,O=Le+Te,Xe=ye-Fe,qe=Ae+(be-Fe),C=de*Le/O*Be,b=P*Le/O*Be;K.projectionMatrix.makePerspective(Xe,qe,C,b,Be,O),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function ee(K,fe){fe===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(fe.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let fe=K.near,ue=K.far;g.texture!==null&&(g.depthNear>0&&(fe=g.depthNear),g.depthFar>0&&(ue=g.depthFar)),k.near=D.near=R.near=fe,k.far=D.far=R.far=ue,(G!==k.near||X!==k.far)&&(s.updateRenderState({depthNear:k.near,depthFar:k.far}),G=k.near,X=k.far),k.layers.mask=K.layers.mask|6,R.layers.mask=k.layers.mask&-5,D.layers.mask=k.layers.mask&-3;const be=K.parent,_e=k.cameras;ee(k,be);for(let Ie=0;Ie<_e.length;Ie++)ee(_e[Ie],be);_e.length===2?V(k,R,D):k.projectionMatrix.copy(R.projectionMatrix),J(K,k,be)};function J(K,fe,ue){ue===null?K.matrix.copy(fe.matrixWorld):(K.matrix.copy(ue.matrixWorld),K.matrix.invert(),K.matrix.multiply(fe.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(fe.projectionMatrix),K.projectionMatrixInverse.copy(fe.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Lr*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(u===null&&d===null))return l},this.setFoveation=function(K){l=K,u!==null&&(u.fixedFoveation=K),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=K)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(k)},this.getCameraTexture=function(K){return f[K]};let ve=null;function Oe(K,fe){if(h=fe.getViewerPose(c||a),p=fe,h!==null){const ue=h.views;d!==null&&(e.setRenderTargetFramebuffer(y,d.framebuffer),e.setRenderTarget(y));let be=!1;ue.length!==k.cameras.length&&(k.cameras.length=0,be=!0);for(let Le=0;Le<ue.length;Le++){const de=ue[Le];let P=null;if(d!==null)P=d.getViewport(de);else{const ne=m.getViewSubImage(u,de);P=ne.viewport,Le===0&&(e.setRenderTargetTextures(y,ne.colorTexture,ne.depthStencilTexture),e.setRenderTarget(y))}let z=N[Le];z===void 0&&(z=new Tn,z.layers.enable(Le),z.viewport=new Nt,N[Le]=z),z.matrix.fromArray(de.transform.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale),z.projectionMatrix.fromArray(de.projectionMatrix),z.projectionMatrixInverse.copy(z.projectionMatrix).invert(),z.viewport.set(P.x,P.y,P.width,P.height),Le===0&&(k.matrix.copy(z.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),be===!0&&k.cameras.push(z)}const _e=s.enabledFeatures;if(_e&&_e.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){m=n.getBinding();const Le=m.getDepthInformation(ue[0]);Le&&Le.isValid&&Le.texture&&g.init(Le,s.renderState)}if(_e&&_e.includes("camera-access")&&x){e.state.unbindTexture(),m=n.getBinding();for(let Le=0;Le<ue.length;Le++){const de=ue[Le].camera;if(de){let P=f[de];P||(P=new Dd,f[de]=P);const z=m.getCameraImage(de);P.sourceTexture=z}}}}for(let ue=0;ue<S.length;ue++){const be=T[ue],_e=S[ue];be!==null&&_e!==void 0&&_e.update(be,fe,c||a)}ve&&ve(K,fe),fe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:fe}),p=null}const he=new Xd;he.setAnimationLoop(Oe),this.setAnimationLoop=function(K){ve=K},this.dispose=function(){}}}const Yy=new yt,jd=new je;jd.set(-1,0,0,0,1,0,0,0,1);function Zy(i,e){function t(g,f){g.matrixAutoUpdate===!0&&g.updateMatrix(),f.value.copy(g.matrix)}function n(g,f){f.color.getRGB(g.fogColor.value,Vd(i)),f.isFog?(g.fogNear.value=f.near,g.fogFar.value=f.far):f.isFogExp2&&(g.fogDensity.value=f.density)}function s(g,f,w,E,y){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(g,f):f.isMeshLambertMaterial?(r(g,f),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(g,f),m(g,f)):f.isMeshPhongMaterial?(r(g,f),h(g,f),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(g,f),u(g,f),f.isMeshPhysicalMaterial&&d(g,f,y)):f.isMeshMatcapMaterial?(r(g,f),p(g,f)):f.isMeshDepthMaterial?r(g,f):f.isMeshDistanceMaterial?(r(g,f),x(g,f)):f.isMeshNormalMaterial?r(g,f):f.isLineBasicMaterial?(a(g,f),f.isLineDashedMaterial&&o(g,f)):f.isPointsMaterial?l(g,f,w,E):f.isSpriteMaterial?c(g,f):f.isShadowMaterial?(g.color.value.copy(f.color),g.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(g,f){g.opacity.value=f.opacity,f.color&&g.diffuse.value.copy(f.color),f.emissive&&g.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(g.map.value=f.map,t(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.bumpMap&&(g.bumpMap.value=f.bumpMap,t(f.bumpMap,g.bumpMapTransform),g.bumpScale.value=f.bumpScale,f.side===xn&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,t(f.normalMap,g.normalMapTransform),g.normalScale.value.copy(f.normalScale),f.side===xn&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,t(f.displacementMap,g.displacementMapTransform),g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias),f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,g.emissiveMapTransform)),f.specularMap&&(g.specularMap.value=f.specularMap,t(f.specularMap,g.specularMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest);const w=e.get(f),E=w.envMap,y=w.envMapRotation;E&&(g.envMap.value=E,g.envMapRotation.value.setFromMatrix4(Yy.makeRotationFromEuler(y)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(jd),g.reflectivity.value=f.reflectivity,g.ior.value=f.ior,g.refractionRatio.value=f.refractionRatio),f.lightMap&&(g.lightMap.value=f.lightMap,g.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,g.lightMapTransform)),f.aoMap&&(g.aoMap.value=f.aoMap,g.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,g.aoMapTransform))}function a(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,f.map&&(g.map.value=f.map,t(f.map,g.mapTransform))}function o(g,f){g.dashSize.value=f.dashSize,g.totalSize.value=f.dashSize+f.gapSize,g.scale.value=f.scale}function l(g,f,w,E){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.size.value=f.size*w,g.scale.value=E*.5,f.map&&(g.map.value=f.map,t(f.map,g.uvTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function c(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.rotation.value=f.rotation,f.map&&(g.map.value=f.map,t(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function h(g,f){g.specular.value.copy(f.specular),g.shininess.value=Math.max(f.shininess,1e-4)}function m(g,f){f.gradientMap&&(g.gradientMap.value=f.gradientMap)}function u(g,f){g.metalness.value=f.metalness,f.metalnessMap&&(g.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,g.metalnessMapTransform)),g.roughness.value=f.roughness,f.roughnessMap&&(g.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,g.roughnessMapTransform)),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)}function d(g,f,w){g.ior.value=f.ior,f.sheen>0&&(g.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),g.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(g.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,g.sheenColorMapTransform)),f.sheenRoughnessMap&&(g.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,g.sheenRoughnessMapTransform))),f.clearcoat>0&&(g.clearcoat.value=f.clearcoat,g.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(g.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,g.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(g.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===xn&&g.clearcoatNormalScale.value.negate())),f.dispersion>0&&(g.dispersion.value=f.dispersion),f.iridescence>0&&(g.iridescence.value=f.iridescence,g.iridescenceIOR.value=f.iridescenceIOR,g.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(g.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,g.iridescenceMapTransform)),f.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),f.transmission>0&&(g.transmission.value=f.transmission,g.transmissionSamplerMap.value=w.texture,g.transmissionSamplerSize.value.set(w.width,w.height),f.transmissionMap&&(g.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,g.transmissionMapTransform)),g.thickness.value=f.thickness,f.thicknessMap&&(g.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=f.attenuationDistance,g.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(g.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(g.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=f.specularIntensity,g.specularColor.value.copy(f.specularColor),f.specularColorMap&&(g.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,g.specularColorMapTransform)),f.specularIntensityMap&&(g.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,f){f.matcap&&(g.matcap.value=f.matcap)}function x(g,f){const w=e.get(f).light;g.referencePosition.value.setFromMatrixPosition(w.matrixWorld),g.nearDistance.value=w.shadow.camera.near,g.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Ky(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,S){const T=S.program;n.uniformBlockBinding(y,T)}function c(y,S){let T=s[y.id];T===void 0&&(g(y),T=h(y),s[y.id]=T,y.addEventListener("dispose",w));const A=S.program;n.updateUBOMapping(y,A);const v=e.render.frame;r[y.id]!==v&&(u(y),r[y.id]=v)}function h(y){const S=m();y.__bindingPointIndex=S;const T=i.createBuffer(),A=y.__size,v=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,A,v),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,T),T}function m(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return ot("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const S=s[y.id],T=y.uniforms,A=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let v=0,R=T.length;v<R;v++){const D=T[v];if(Array.isArray(D))for(let N=0,k=D.length;N<k;N++)d(D[N],v,N,A);else d(D,v,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(y,S,T,A){if(x(y,S,T,A)===!0){const v=y.__offset,R=y.value;if(Array.isArray(R)){let D=0;for(let N=0;N<R.length;N++){const k=R[N],G=f(k);p(k,y.__data,D),typeof k!="number"&&typeof k!="boolean"&&!k.isMatrix3&&!ArrayBuffer.isView(k)&&(D+=G.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(R,y.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,y.__data)}}function p(y,S,T){typeof y=="number"||typeof y=="boolean"?S[0]=y:y.isMatrix3?(S[0]=y.elements[0],S[1]=y.elements[1],S[2]=y.elements[2],S[3]=0,S[4]=y.elements[3],S[5]=y.elements[4],S[6]=y.elements[5],S[7]=0,S[8]=y.elements[6],S[9]=y.elements[7],S[10]=y.elements[8],S[11]=0):ArrayBuffer.isView(y)?S.set(new y.constructor(y.buffer,y.byteOffset,S.length)):y.toArray(S,T)}function x(y,S,T,A){const v=y.value,R=S+"_"+T;if(A[R]===void 0)return typeof v=="number"||typeof v=="boolean"?A[R]=v:ArrayBuffer.isView(v)?A[R]=v.slice():A[R]=v.clone(),!0;{const D=A[R];if(typeof v=="number"||typeof v=="boolean"){if(D!==v)return A[R]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(D.equals(v)===!1)return D.copy(v),!0}}return!1}function g(y){const S=y.uniforms;let T=0;const A=16;for(let R=0,D=S.length;R<D;R++){const N=Array.isArray(S[R])?S[R]:[S[R]];for(let k=0,G=N.length;k<G;k++){const X=N[k],F=Array.isArray(X.value)?X.value:[X.value];for(let Z=0,H=F.length;Z<H;Z++){const $=F[Z],Q=f($),V=T%A,ee=V%Q.boundary,J=V+ee;T+=ee,J!==0&&A-J<Q.storage&&(T+=A-J),X.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=T,T+=Q.storage}}}const v=T%A;return v>0&&(T+=A-v),y.__size=T,y.__cache={},this}function f(y){const S={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(S.boundary=4,S.storage=4):y.isVector2?(S.boundary=8,S.storage=8):y.isVector3||y.isColor?(S.boundary=16,S.storage=12):y.isVector4?(S.boundary=16,S.storage=16):y.isMatrix3?(S.boundary=48,S.storage=48):y.isMatrix4?(S.boundary=64,S.storage=64):y.isTexture?Ye("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(S.boundary=16,S.storage=y.byteLength):Ye("WebGLRenderer: Unsupported uniform value type.",y),S}function w(y){const S=y.target;S.removeEventListener("dispose",w);const T=a.indexOf(S.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function E(){for(const y in s)i.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:l,update:c,dispose:E}}const Jy=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Qn=null;function Qy(){return Qn===null&&(Qn=new us(Jy,16,16,as,Si),Qn.name="DFG_LUT",Qn.minFilter=en,Qn.magFilter=en,Qn.wrapS=xi,Qn.wrapT=xi,Qn.generateMipmaps=!1,Qn.needsUpdate=!0),Qn}class jy{constructor(e={}){const{canvas:t=bf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:m=!1,reversedDepthBuffer:u=!1,outputBufferType:d=An}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const x=d,g=new Set([ec,jl,Ql]),f=new Set([An,ci,Cr,Pr,Zl,Kl]),w=new Uint32Array(4),E=new Int32Array(4),y=new U;let S=null,T=null;const A=[],v=[];let R=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ai,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let N=!1,k=null,G=null,X=null,F=null;this._outputColorSpace=ln;let Z=0,H=0,$=null,Q=-1,V=null;const ee=new Nt,J=new Nt;let ve=null;const Oe=new Je(0);let he=0,K=t.width,fe=t.height,ue=1,be=null,_e=null;const Ie=new Nt(0,0,K,fe),Ze=new Nt(0,0,K,fe);let Le=!1;const de=new ac;let P=!1,z=!1;const ne=new yt,ye=new U,Ae=new Nt,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Fe=!1;function Be(){return $===null?ue:1}let O=n;function Xe(M,Y){return t.getContext(M,Y)}try{const M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:m};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Xl}`),t.addEventListener("webglcontextlost",Qe,!1),t.addEventListener("webglcontextrestored",rt,!1),t.addEventListener("webglcontextcreationerror",Pt,!1),O===null){const Y="webgl2";if(O=Xe(Y,M),O===null)throw Xe(Y)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(M){throw ot("WebGLRenderer: "+M.message),M}let qe,C,b,_,I,B,se,me,j,ae,ge,Se,Re,Ce,Pe,W,oe,L,pe,q,re,xe,le;function Me(){qe=new Qg(O),qe.init(),re=new Vy(O,qe),C=new Wg(O,qe,e,re),b=new Gy(O,qe),C.reversedDepthBuffer&&u&&b.buffers.depth.setReversed(!0),G=O.createFramebuffer(),X=O.createFramebuffer(),F=O.createFramebuffer(),_=new tv(O),I=new Ay,B=new Hy(O,qe,b,I,C,re,_),se=new Jg(D),me=new rm(O),xe=new Hg(O,me),j=new jg(O,me,_,xe),ae=new iv(O,j,me,xe,_),L=new nv(O,C,B),Pe=new $g(I),ge=new Ty(D,se,qe,C,xe,Pe),Se=new Zy(D,I),Re=new Cy,Ce=new Uy(qe),oe=new Gg(D,se,b,ae,p,l),W=new zy(D,ae,C),le=new Ky(O,_,C,b),pe=new Vg(O,qe,_),q=new ev(O,qe,_),_.programs=ge.programs,D.capabilities=C,D.extensions=qe,D.properties=I,D.renderLists=Re,D.shadowMap=W,D.state=b,D.info=_}Me(),x!==An&&(R=new rv(x,t.width,t.height,o,s,r));const Ee=new qy(D,O);this.xr=Ee,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const M=qe.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=qe.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return ue},this.setPixelRatio=function(M){M!==void 0&&(ue=M,this.setSize(K,fe,!1))},this.getSize=function(M){return M.set(K,fe)},this.setSize=function(M,Y,ce=!0){if(Ee.isPresenting){Ye("WebGLRenderer: Can't change size while VR device is presenting.");return}K=M,fe=Y,t.width=Math.floor(M*ue),t.height=Math.floor(Y*ue),ce===!0&&(t.style.width=M+"px",t.style.height=Y+"px"),R!==null&&R.setSize(t.width,t.height),this.setViewport(0,0,M,Y)},this.getDrawingBufferSize=function(M){return M.set(K*ue,fe*ue).floor()},this.setDrawingBufferSize=function(M,Y,ce){K=M,fe=Y,ue=ce,t.width=Math.floor(M*ce),t.height=Math.floor(Y*ce),this.setViewport(0,0,M,Y)},this.setEffects=function(M){if(x===An){ot("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let Y=0;Y<M.length;Y++)if(M[Y].isOutputPass===!0){Ye("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(ee)},this.getViewport=function(M){return M.copy(Ie)},this.setViewport=function(M,Y,ce,te){M.isVector4?Ie.set(M.x,M.y,M.z,M.w):Ie.set(M,Y,ce,te),b.viewport(ee.copy(Ie).multiplyScalar(ue).round())},this.getScissor=function(M){return M.copy(Ze)},this.setScissor=function(M,Y,ce,te){M.isVector4?Ze.set(M.x,M.y,M.z,M.w):Ze.set(M,Y,ce,te),b.scissor(J.copy(Ze).multiplyScalar(ue).round())},this.getScissorTest=function(){return Le},this.setScissorTest=function(M){b.setScissorTest(Le=M)},this.setOpaqueSort=function(M){be=M},this.setTransparentSort=function(M){_e=M},this.getClearColor=function(M){return M.copy(oe.getClearColor())},this.setClearColor=function(){oe.setClearColor(...arguments)},this.getClearAlpha=function(){return oe.getClearAlpha()},this.setClearAlpha=function(){oe.setClearAlpha(...arguments)},this.clear=function(M=!0,Y=!0,ce=!0){let te=0;if(M){let ie=!1;if($!==null){const ke=$.texture.format;ie=g.has(ke)}if(ie){const ke=$.texture.type,Ge=f.has(ke),Ue=oe.getClearColor(),Ve=oe.getClearAlpha(),We=Ue.r,et=Ue.g,it=Ue.b;Ge?(w[0]=We,w[1]=et,w[2]=it,w[3]=Ve,O.clearBufferuiv(O.COLOR,0,w)):(E[0]=We,E[1]=et,E[2]=it,E[3]=Ve,O.clearBufferiv(O.COLOR,0,E))}else te|=O.COLOR_BUFFER_BIT}Y&&(te|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ce&&(te|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),te!==0&&O.clear(te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),k=M},this.dispose=function(){t.removeEventListener("webglcontextlost",Qe,!1),t.removeEventListener("webglcontextrestored",rt,!1),t.removeEventListener("webglcontextcreationerror",Pt,!1),oe.dispose(),Re.dispose(),Ce.dispose(),I.dispose(),se.dispose(),ae.dispose(),xe.dispose(),le.dispose(),ge.dispose(),Ee.dispose(),Ee.removeEventListener("sessionstart",wc),Ee.removeEventListener("sessionend",Mc),Yi.stop()};function Qe(M){M.preventDefault(),Ga("WebGLRenderer: Context Lost."),N=!0}function rt(){Ga("WebGLRenderer: Context Restored."),N=!1;const M=_.autoReset,Y=W.enabled,ce=W.autoUpdate,te=W.needsUpdate,ie=W.type;Me(),_.autoReset=M,W.enabled=Y,W.autoUpdate=ce,W.needsUpdate=te,W.type=ie}function Pt(M){ot("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function zt(M){const Y=M.target;Y.removeEventListener("dispose",zt),At(Y)}function At(M){tn(M),I.remove(M)}function tn(M){const Y=I.get(M).programs;Y!==void 0&&(Y.forEach(function(ce){ge.releaseProgram(ce)}),M.isShaderMaterial&&ge.releaseShaderCache(M))}this.renderBufferDirect=function(M,Y,ce,te,ie,ke){Y===null&&(Y=Te);const Ge=ie.isMesh&&ie.matrixWorld.determinantAffine()<0,Ue=au(M,Y,ce,te,ie);b.setMaterial(te,Ge);let Ve=ce.index,We=1;if(te.wireframe===!0){if(Ve=j.getWireframeAttribute(ce),Ve===void 0)return;We=2}const et=ce.drawRange,it=ce.attributes.position;let $e=et.start*We,Mt=(et.start+et.count)*We;ke!==null&&($e=Math.max($e,ke.start*We),Mt=Math.min(Mt,(ke.start+ke.count)*We)),Ve!==null?($e=Math.max($e,0),Mt=Math.min(Mt,Ve.count)):it!=null&&($e=Math.max($e,0),Mt=Math.min(Mt,it.count));const Gt=Mt-$e;if(Gt<0||Gt===1/0)return;xe.setup(ie,te,Ue,ce,Ve);let Ft,Et=pe;if(Ve!==null&&(Ft=me.get(Ve),Et=q,Et.setIndex(Ft)),ie.isMesh)te.wireframe===!0?(b.setLineWidth(te.wireframeLinewidth*Be()),Et.setMode(O.LINES)):Et.setMode(O.TRIANGLES);else if(ie.isLine){let rn=te.linewidth;rn===void 0&&(rn=1),b.setLineWidth(rn*Be()),ie.isLineSegments?Et.setMode(O.LINES):ie.isLineLoop?Et.setMode(O.LINE_LOOP):Et.setMode(O.LINE_STRIP)}else ie.isPoints?Et.setMode(O.POINTS):ie.isSprite&&Et.setMode(O.TRIANGLES);if(ie.isBatchedMesh)if(qe.get("WEBGL_multi_draw"))Et.renderMultiDraw(ie._multiDrawStarts,ie._multiDrawCounts,ie._multiDrawCount);else{const rn=ie._multiDrawStarts,ze=ie._multiDrawCounts,_n=ie._multiDrawCount,ut=Ve?me.get(Ve).bytesPerElement:1,Cn=I.get(te).currentProgram.getUniforms();for(let Kn=0;Kn<_n;Kn++)Cn.setValue(O,"_gl_DrawID",Kn),Et.render(rn[Kn]/ut,ze[Kn])}else if(ie.isInstancedMesh)Et.renderInstances($e,Gt,ie.count);else if(ce.isInstancedBufferGeometry){const rn=ce._maxInstanceCount!==void 0?ce._maxInstanceCount:1/0,ze=Math.min(ce.instanceCount,rn);Et.renderInstances($e,Gt,ze)}else Et.render($e,Gt)};function It(M,Y,ce){M.transparent===!0&&M.side===kn&&M.forceSinglePass===!1?(M.side=xn,M.needsUpdate=!0,Gr(M,Y,ce),M.side=Wi,M.needsUpdate=!0,Gr(M,Y,ce),M.side=kn):Gr(M,Y,ce)}this.compile=function(M,Y,ce=null){ce===null&&(ce=M),T=Ce.get(ce),T.init(Y),v.push(T),ce.traverseVisible(function(ie){ie.isLight&&ie.layers.test(Y.layers)&&(T.pushLight(ie),ie.castShadow&&T.pushShadow(ie))}),M!==ce&&M.traverseVisible(function(ie){ie.isLight&&ie.layers.test(Y.layers)&&(T.pushLight(ie),ie.castShadow&&T.pushShadow(ie))}),T.setupLights();const te=new Set;return M.traverse(function(ie){if(!(ie.isMesh||ie.isPoints||ie.isLine||ie.isSprite))return;const ke=ie.material;if(ke)if(Array.isArray(ke))for(let Ge=0;Ge<ke.length;Ge++){const Ue=ke[Ge];It(Ue,ce,ie),te.add(Ue)}else It(ke,ce,ie),te.add(ke)}),T=v.pop(),te},this.compileAsync=function(M,Y,ce=null){const te=this.compile(M,Y,ce);return new Promise(ie=>{function ke(){if(te.forEach(function(Ge){I.get(Ge).currentProgram.isReady()&&te.delete(Ge)}),te.size===0){ie(M);return}setTimeout(ke,10)}qe.get("KHR_parallel_shader_compile")!==null?ke():setTimeout(ke,10)})};let Rn=null;function qi(M){Rn&&Rn(M)}function wc(){Yi.stop()}function Mc(){Yi.start()}const Yi=new Xd;Yi.setAnimationLoop(qi),typeof self<"u"&&Yi.setContext(self),this.setAnimationLoop=function(M){Rn=M,Ee.setAnimationLoop(M),M===null?Yi.stop():Yi.start()},Ee.addEventListener("sessionstart",wc),Ee.addEventListener("sessionend",Mc),this.render=function(M,Y){if(Y!==void 0&&Y.isCamera!==!0){ot("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;k!==null&&k.renderStart(M,Y);const ce=Ee.enabled===!0&&Ee.isPresenting===!0,te=R!==null&&($===null||ce)&&R.begin(D,$);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),Ee.enabled===!0&&Ee.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(Ee.cameraAutoUpdate===!0&&Ee.updateCamera(Y),Y=Ee.getCamera()),M.isScene===!0&&M.onBeforeRender(D,M,Y,$),T=Ce.get(M,v.length),T.init(Y),T.state.textureUnits=B.getTextureUnits(),v.push(T),ne.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),de.setFromProjectionMatrix(ne,ri,Y.reversedDepth),z=this.localClippingEnabled,P=Pe.init(this.clippingPlanes,z),S=Re.get(M,A.length),S.init(),A.push(S),Ee.enabled===!0&&Ee.isPresenting===!0){const Ge=D.xr.getDepthSensingMesh();Ge!==null&&ao(Ge,Y,-1/0,D.sortObjects)}ao(M,Y,0,D.sortObjects),S.finish(),D.sortObjects===!0&&S.sort(be,_e,Y.reversedDepth),Fe=Ee.enabled===!1||Ee.isPresenting===!1||Ee.hasDepthSensing()===!1,Fe&&oe.addToRenderList(S,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),P===!0&&Pe.beginShadows();const ie=T.state.shadowsArray;if(W.render(ie,M,Y),P===!0&&Pe.endShadows(),(te&&R.hasRenderPass())===!1){const Ge=S.opaque,Ue=S.transmissive;if(T.setupLights(),Y.isArrayCamera){const Ve=Y.cameras;if(Ue.length>0)for(let We=0,et=Ve.length;We<et;We++){const it=Ve[We];Ec(Ge,Ue,M,it)}Fe&&oe.render(M);for(let We=0,et=Ve.length;We<et;We++){const it=Ve[We];Sc(S,M,it,it.viewport)}}else Ue.length>0&&Ec(Ge,Ue,M,Y),Fe&&oe.render(M),Sc(S,M,Y)}$!==null&&H===0&&(B.updateMultisampleRenderTarget($),B.updateRenderTargetMipmap($)),te&&R.end(D),M.isScene===!0&&M.onAfterRender(D,M,Y),xe.resetDefaultState(),Q=-1,V=null,v.pop(),v.length>0?(T=v[v.length-1],B.setTextureUnits(T.state.textureUnits),P===!0&&Pe.setGlobalState(D.clippingPlanes,T.state.camera)):T=null,A.pop(),A.length>0?S=A[A.length-1]:S=null,k!==null&&k.renderEnd()};function ao(M,Y,ce,te){if(M.visible===!1)return;if(M.layers.test(Y.layers)){if(M.isGroup)ce=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(Y);else if(M.isLightProbeGrid)T.pushLightProbeGrid(M);else if(M.isLight)T.pushLight(M),M.castShadow&&T.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||de.intersectsSprite(M)){te&&Ae.setFromMatrixPosition(M.matrixWorld).applyMatrix4(ne);const Ge=ae.update(M),Ue=M.material;Ue.visible&&S.push(M,Ge,Ue,ce,Ae.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||de.intersectsObject(M))){const Ge=ae.update(M),Ue=M.material;if(te&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ae.copy(M.boundingSphere.center)):(Ge.boundingSphere===null&&Ge.computeBoundingSphere(),Ae.copy(Ge.boundingSphere.center)),Ae.applyMatrix4(M.matrixWorld).applyMatrix4(ne)),Array.isArray(Ue)){const Ve=Ge.groups;for(let We=0,et=Ve.length;We<et;We++){const it=Ve[We],$e=Ue[it.materialIndex];$e&&$e.visible&&S.push(M,Ge,$e,ce,Ae.z,it)}}else Ue.visible&&S.push(M,Ge,Ue,ce,Ae.z,null)}}const ke=M.children;for(let Ge=0,Ue=ke.length;Ge<Ue;Ge++)ao(ke[Ge],Y,ce,te)}function Sc(M,Y,ce,te){const{opaque:ie,transmissive:ke,transparent:Ge}=M;T.setupLightsView(ce),P===!0&&Pe.setGlobalState(D.clippingPlanes,ce),te&&b.viewport(ee.copy(te)),ie.length>0&&zr(ie,Y,ce),ke.length>0&&zr(ke,Y,ce),Ge.length>0&&zr(Ge,Y,ce),b.buffers.depth.setTest(!0),b.buffers.depth.setMask(!0),b.buffers.color.setMask(!0),b.setPolygonOffset(!1)}function Ec(M,Y,ce,te){if((ce.isScene===!0?ce.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[te.id]===void 0){const $e=qe.has("EXT_color_buffer_half_float")||qe.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[te.id]=new li(1,1,{generateMipmaps:!0,type:$e?Si:An,minFilter:Oi,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:lt.workingColorSpace})}const ke=T.state.transmissionRenderTarget[te.id],Ge=te.viewport||ee;ke.setSize(Ge.z*D.transmissionResolutionScale,Ge.w*D.transmissionResolutionScale);const Ue=D.getRenderTarget(),Ve=D.getActiveCubeFace(),We=D.getActiveMipmapLevel();D.setRenderTarget(ke),D.getClearColor(Oe),he=D.getClearAlpha(),he<1&&D.setClearColor(16777215,.5),D.clear(),Fe&&oe.render(ce);const et=D.toneMapping;D.toneMapping=ai;const it=te.viewport;if(te.viewport!==void 0&&(te.viewport=void 0),T.setupLightsView(te),P===!0&&Pe.setGlobalState(D.clippingPlanes,te),zr(M,ce,te),B.updateMultisampleRenderTarget(ke),B.updateRenderTargetMipmap(ke),qe.has("WEBGL_multisampled_render_to_texture")===!1){let $e=!1;for(let Mt=0,Gt=Y.length;Mt<Gt;Mt++){const Ft=Y[Mt],{object:Et,geometry:rn,material:ze,group:_n}=Ft;if(ze.side===kn&&Et.layers.test(te.layers)){const ut=ze.side;ze.side=xn,ze.needsUpdate=!0,Tc(Et,ce,te,rn,ze,_n),ze.side=ut,ze.needsUpdate=!0,$e=!0}}$e===!0&&(B.updateMultisampleRenderTarget(ke),B.updateRenderTargetMipmap(ke))}D.setRenderTarget(Ue,Ve,We),D.setClearColor(Oe,he),it!==void 0&&(te.viewport=it),D.toneMapping=et}function zr(M,Y,ce){const te=Y.isScene===!0?Y.overrideMaterial:null;for(let ie=0,ke=M.length;ie<ke;ie++){const Ge=M[ie],{object:Ue,geometry:Ve,group:We}=Ge;let et=Ge.material;et.allowOverride===!0&&te!==null&&(et=te),Ue.layers.test(ce.layers)&&Tc(Ue,Y,ce,Ve,et,We)}}function Tc(M,Y,ce,te,ie,ke){M.onBeforeRender(D,Y,ce,te,ie,ke),M.modelViewMatrix.multiplyMatrices(ce.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),ie.onBeforeRender(D,Y,ce,te,M,ke),ie.transparent===!0&&ie.side===kn&&ie.forceSinglePass===!1?(ie.side=xn,ie.needsUpdate=!0,D.renderBufferDirect(ce,Y,te,ie,M,ke),ie.side=Wi,ie.needsUpdate=!0,D.renderBufferDirect(ce,Y,te,ie,M,ke),ie.side=kn):D.renderBufferDirect(ce,Y,te,ie,M,ke),M.onAfterRender(D,Y,ce,te,ie,ke)}function Gr(M,Y,ce){Y.isScene!==!0&&(Y=Te);const te=I.get(M),ie=T.state.lights,ke=T.state.shadowsArray,Ge=ie.state.version,Ue=ge.getParameters(M,ie.state,ke,Y,ce,T.state.lightProbeGridArray),Ve=ge.getProgramCacheKey(Ue);let We=te.programs;te.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?Y.environment:null,te.fog=Y.fog;const et=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;te.envMap=se.get(M.envMap||te.environment,et),te.envMapRotation=te.environment!==null&&M.envMap===null?Y.environmentRotation:M.envMapRotation,We===void 0&&(M.addEventListener("dispose",zt),We=new Map,te.programs=We);let it=We.get(Ve);if(it!==void 0){if(te.currentProgram===it&&te.lightsStateVersion===Ge)return Rc(M,Ue),it}else Ue.uniforms=ge.getUniforms(M),k!==null&&M.isNodeMaterial&&k.build(M,ce,Ue),M.onBeforeCompile(Ue,D),it=ge.acquireProgram(Ue,Ve),We.set(Ve,it),te.uniforms=Ue.uniforms;const $e=te.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&($e.clippingPlanes=Pe.uniform),Rc(M,Ue),te.needsLights=lu(M),te.lightsStateVersion=Ge,te.needsLights&&($e.ambientLightColor.value=ie.state.ambient,$e.lightProbe.value=ie.state.probe,$e.directionalLights.value=ie.state.directional,$e.directionalLightShadows.value=ie.state.directionalShadow,$e.spotLights.value=ie.state.spot,$e.spotLightShadows.value=ie.state.spotShadow,$e.rectAreaLights.value=ie.state.rectArea,$e.ltc_1.value=ie.state.rectAreaLTC1,$e.ltc_2.value=ie.state.rectAreaLTC2,$e.pointLights.value=ie.state.point,$e.pointLightShadows.value=ie.state.pointShadow,$e.hemisphereLights.value=ie.state.hemi,$e.directionalShadowMatrix.value=ie.state.directionalShadowMatrix,$e.spotLightMatrix.value=ie.state.spotLightMatrix,$e.spotLightMap.value=ie.state.spotLightMap,$e.pointShadowMatrix.value=ie.state.pointShadowMatrix),te.lightProbeGrid=T.state.lightProbeGridArray.length>0,te.currentProgram=it,te.uniformsList=null,it}function Ac(M){if(M.uniformsList===null){const Y=M.currentProgram.getUniforms();M.uniformsList=Ra.seqWithValue(Y.seq,M.uniforms)}return M.uniformsList}function Rc(M,Y){const ce=I.get(M);ce.outputColorSpace=Y.outputColorSpace,ce.batching=Y.batching,ce.batchingColor=Y.batchingColor,ce.instancing=Y.instancing,ce.instancingColor=Y.instancingColor,ce.instancingMorph=Y.instancingMorph,ce.skinning=Y.skinning,ce.morphTargets=Y.morphTargets,ce.morphNormals=Y.morphNormals,ce.morphColors=Y.morphColors,ce.morphTargetsCount=Y.morphTargetsCount,ce.numClippingPlanes=Y.numClippingPlanes,ce.numIntersection=Y.numClipIntersection,ce.vertexAlphas=Y.vertexAlphas,ce.vertexTangents=Y.vertexTangents,ce.toneMapping=Y.toneMapping}function ru(M,Y){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;y.setFromMatrixPosition(Y.matrixWorld);for(let ce=0,te=M.length;ce<te;ce++){const ie=M[ce];if(ie.texture!==null&&ie.boundingBox.containsPoint(y))return ie}return null}function au(M,Y,ce,te,ie){Y.isScene!==!0&&(Y=Te),B.resetTextureUnits();const ke=Y.fog,Ge=te.isMeshStandardMaterial||te.isMeshLambertMaterial||te.isMeshPhongMaterial?Y.environment:null,Ue=$===null?D.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:lt.workingColorSpace,Ve=te.isMeshStandardMaterial||te.isMeshLambertMaterial&&!te.envMap||te.isMeshPhongMaterial&&!te.envMap,We=se.get(te.envMap||Ge,Ve),et=te.vertexColors===!0&&!!ce.attributes.color&&ce.attributes.color.itemSize===4,it=!!ce.attributes.tangent&&(!!te.normalMap||te.anisotropy>0),$e=!!ce.morphAttributes.position,Mt=!!ce.morphAttributes.normal,Gt=!!ce.morphAttributes.color;let Ft=ai;te.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Ft=D.toneMapping);const Et=ce.morphAttributes.position||ce.morphAttributes.normal||ce.morphAttributes.color,rn=Et!==void 0?Et.length:0,ze=I.get(te),_n=T.state.lights;if(P===!0&&(z===!0||M!==V)){const Rt=M===V&&te.id===Q;Pe.setState(te,M,Rt)}let ut=!1;te.version===ze.__version?(ze.needsLights&&ze.lightsStateVersion!==_n.state.version||ze.outputColorSpace!==Ue||ie.isBatchedMesh&&ze.batching===!1||!ie.isBatchedMesh&&ze.batching===!0||ie.isBatchedMesh&&ze.batchingColor===!0&&ie.colorTexture===null||ie.isBatchedMesh&&ze.batchingColor===!1&&ie.colorTexture!==null||ie.isInstancedMesh&&ze.instancing===!1||!ie.isInstancedMesh&&ze.instancing===!0||ie.isSkinnedMesh&&ze.skinning===!1||!ie.isSkinnedMesh&&ze.skinning===!0||ie.isInstancedMesh&&ze.instancingColor===!0&&ie.instanceColor===null||ie.isInstancedMesh&&ze.instancingColor===!1&&ie.instanceColor!==null||ie.isInstancedMesh&&ze.instancingMorph===!0&&ie.morphTexture===null||ie.isInstancedMesh&&ze.instancingMorph===!1&&ie.morphTexture!==null||ze.envMap!==We||te.fog===!0&&ze.fog!==ke||ze.numClippingPlanes!==void 0&&(ze.numClippingPlanes!==Pe.numPlanes||ze.numIntersection!==Pe.numIntersection)||ze.vertexAlphas!==et||ze.vertexTangents!==it||ze.morphTargets!==$e||ze.morphNormals!==Mt||ze.morphColors!==Gt||ze.toneMapping!==Ft||ze.morphTargetsCount!==rn||!!ze.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(ut=!0):(ut=!0,ze.__version=te.version);let Cn=ze.currentProgram;ut===!0&&(Cn=Gr(te,Y,ie),k&&te.isNodeMaterial&&k.onUpdateProgram(te,Cn,ze));let Kn=!1,Ai=!1,ms=!1;const Tt=Cn.getUniforms(),Ht=ze.uniforms;if(b.useProgram(Cn.program)&&(Kn=!0,Ai=!0,ms=!0),te.id!==Q&&(Q=te.id,Ai=!0),ze.needsLights){const Rt=ru(T.state.lightProbeGridArray,ie);ze.lightProbeGrid!==Rt&&(ze.lightProbeGrid=Rt,Ai=!0)}if(Kn||V!==M){b.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),Tt.setValue(O,"projectionMatrix",M.projectionMatrix),Tt.setValue(O,"viewMatrix",M.matrixWorldInverse);const Ci=Tt.map.cameraPosition;Ci!==void 0&&Ci.setValue(O,ye.setFromMatrixPosition(M.matrixWorld)),C.logarithmicDepthBuffer&&Tt.setValue(O,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(te.isMeshPhongMaterial||te.isMeshToonMaterial||te.isMeshLambertMaterial||te.isMeshBasicMaterial||te.isMeshStandardMaterial||te.isShaderMaterial)&&Tt.setValue(O,"isOrthographic",M.isOrthographicCamera===!0),V!==M&&(V=M,Ai=!0,ms=!0)}if(ze.needsLights&&(_n.state.directionalShadowMap.length>0&&Tt.setValue(O,"directionalShadowMap",_n.state.directionalShadowMap,B),_n.state.spotShadowMap.length>0&&Tt.setValue(O,"spotShadowMap",_n.state.spotShadowMap,B),_n.state.pointShadowMap.length>0&&Tt.setValue(O,"pointShadowMap",_n.state.pointShadowMap,B)),ie.isSkinnedMesh){Tt.setOptional(O,ie,"bindMatrix"),Tt.setOptional(O,ie,"bindMatrixInverse");const Rt=ie.skeleton;Rt&&(Rt.boneTexture===null&&Rt.computeBoneTexture(),Tt.setValue(O,"boneTexture",Rt.boneTexture,B))}ie.isBatchedMesh&&(Tt.setOptional(O,ie,"batchingTexture"),Tt.setValue(O,"batchingTexture",ie._matricesTexture,B),Tt.setOptional(O,ie,"batchingIdTexture"),Tt.setValue(O,"batchingIdTexture",ie._indirectTexture,B),Tt.setOptional(O,ie,"batchingColorTexture"),ie._colorsTexture!==null&&Tt.setValue(O,"batchingColorTexture",ie._colorsTexture,B));const Ri=ce.morphAttributes;if((Ri.position!==void 0||Ri.normal!==void 0||Ri.color!==void 0)&&L.update(ie,ce,Cn),(Ai||ze.receiveShadow!==ie.receiveShadow)&&(ze.receiveShadow=ie.receiveShadow,Tt.setValue(O,"receiveShadow",ie.receiveShadow)),(te.isMeshStandardMaterial||te.isMeshLambertMaterial||te.isMeshPhongMaterial)&&te.envMap===null&&Y.environment!==null&&(Ht.envMapIntensity.value=Y.environmentIntensity),Ht.dfgLUT!==void 0&&(Ht.dfgLUT.value=Qy()),Ai){if(Tt.setValue(O,"toneMappingExposure",D.toneMappingExposure),ze.needsLights&&ou(Ht,ms),ke&&te.fog===!0&&Se.refreshFogUniforms(Ht,ke),Se.refreshMaterialUniforms(Ht,te,ue,fe,T.state.transmissionRenderTarget[M.id]),ze.needsLights&&ze.lightProbeGrid){const Rt=ze.lightProbeGrid;Ht.probesSH.value=Rt.texture,Ht.probesMin.value.copy(Rt.boundingBox.min),Ht.probesMax.value.copy(Rt.boundingBox.max),Ht.probesResolution.value.copy(Rt.resolution)}Ra.upload(O,Ac(ze),Ht,B)}if(te.isShaderMaterial&&te.uniformsNeedUpdate===!0&&(Ra.upload(O,Ac(ze),Ht,B),te.uniformsNeedUpdate=!1),te.isSpriteMaterial&&Tt.setValue(O,"center",ie.center),Tt.setValue(O,"modelViewMatrix",ie.modelViewMatrix),Tt.setValue(O,"normalMatrix",ie.normalMatrix),Tt.setValue(O,"modelMatrix",ie.matrixWorld),te.uniformsGroups!==void 0){const Rt=te.uniformsGroups;for(let Ci=0,gs=Rt.length;Ci<gs;Ci++){const Cc=Rt[Ci];le.update(Cc,Cn),le.bind(Cc,Cn)}}return Cn}function ou(M,Y){M.ambientLightColor.needsUpdate=Y,M.lightProbe.needsUpdate=Y,M.directionalLights.needsUpdate=Y,M.directionalLightShadows.needsUpdate=Y,M.pointLights.needsUpdate=Y,M.pointLightShadows.needsUpdate=Y,M.spotLights.needsUpdate=Y,M.spotLightShadows.needsUpdate=Y,M.rectAreaLights.needsUpdate=Y,M.hemisphereLights.needsUpdate=Y}function lu(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return Z},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return $},this.setRenderTargetTextures=function(M,Y,ce){const te=I.get(M);te.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,te.__autoAllocateDepthBuffer===!1&&(te.__useRenderToTexture=!1),I.get(M.texture).__webglTexture=Y,I.get(M.depthTexture).__webglTexture=te.__autoAllocateDepthBuffer?void 0:ce,te.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,Y){const ce=I.get(M);ce.__webglFramebuffer=Y,ce.__useDefaultFramebuffer=Y===void 0},this.setRenderTarget=function(M,Y=0,ce=0){$=M,Z=Y,H=ce;let te=null,ie=!1,ke=!1;if(M){const Ue=I.get(M);if(Ue.__useDefaultFramebuffer!==void 0){b.bindFramebuffer(O.FRAMEBUFFER,Ue.__webglFramebuffer),ee.copy(M.viewport),J.copy(M.scissor),ve=M.scissorTest,b.viewport(ee),b.scissor(J),b.setScissorTest(ve),Q=-1;return}else if(Ue.__webglFramebuffer===void 0)B.setupRenderTarget(M);else if(Ue.__hasExternalTextures)B.rebindTextures(M,I.get(M.texture).__webglTexture,I.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const et=M.depthTexture;if(Ue.__boundDepthTexture!==et){if(et!==null&&I.has(et)&&(M.width!==et.image.width||M.height!==et.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");B.setupDepthRenderbuffer(M)}}const Ve=M.texture;(Ve.isData3DTexture||Ve.isDataArrayTexture||Ve.isCompressedArrayTexture)&&(ke=!0);const We=I.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(We[Y])?te=We[Y][ce]:te=We[Y],ie=!0):M.samples>0&&B.useMultisampledRTT(M)===!1?te=I.get(M).__webglMultisampledFramebuffer:Array.isArray(We)?te=We[ce]:te=We,ee.copy(M.viewport),J.copy(M.scissor),ve=M.scissorTest}else ee.copy(Ie).multiplyScalar(ue).floor(),J.copy(Ze).multiplyScalar(ue).floor(),ve=Le;if(ce!==0&&(te=G),b.bindFramebuffer(O.FRAMEBUFFER,te)&&b.drawBuffers(M,te),b.viewport(ee),b.scissor(J),b.setScissorTest(ve),ie){const Ue=I.get(M.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Ue.__webglTexture,ce)}else if(ke){const Ue=Y;for(let Ve=0;Ve<M.textures.length;Ve++){const We=I.get(M.textures[Ve]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Ve,We.__webglTexture,ce,Ue)}}else if(M!==null&&ce!==0){const Ue=I.get(M.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Ue.__webglTexture,ce)}Q=-1},this.readRenderTargetPixels=function(M,Y,ce,te,ie,ke,Ge,Ue=0){if(!(M&&M.isWebGLRenderTarget)){ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ve=I.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Ge!==void 0&&(Ve=Ve[Ge]),Ve){b.bindFramebuffer(O.FRAMEBUFFER,Ve);try{const We=M.textures[Ue],et=We.format,it=We.type;if(M.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Ue),!C.textureFormatReadable(et)){ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!C.textureTypeReadable(it)){ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=M.width-te&&ce>=0&&ce<=M.height-ie&&O.readPixels(Y,ce,te,ie,re.convert(et),re.convert(it),ke)}finally{const We=$!==null?I.get($).__webglFramebuffer:null;b.bindFramebuffer(O.FRAMEBUFFER,We)}}},this.readRenderTargetPixelsAsync=async function(M,Y,ce,te,ie,ke,Ge,Ue=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ve=I.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Ge!==void 0&&(Ve=Ve[Ge]),Ve)if(Y>=0&&Y<=M.width-te&&ce>=0&&ce<=M.height-ie){b.bindFramebuffer(O.FRAMEBUFFER,Ve);const We=M.textures[Ue],et=We.format,it=We.type;if(M.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Ue),!C.textureFormatReadable(et))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!C.textureTypeReadable(it))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const $e=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,$e),O.bufferData(O.PIXEL_PACK_BUFFER,ke.byteLength,O.STREAM_READ),O.readPixels(Y,ce,te,ie,re.convert(et),re.convert(it),0);const Mt=$!==null?I.get($).__webglFramebuffer:null;b.bindFramebuffer(O.FRAMEBUFFER,Mt);const Gt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await _f(O,Gt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,$e),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,ke),O.deleteBuffer($e),O.deleteSync(Gt),ke}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,Y=null,ce=0){const te=Math.pow(2,-ce),ie=Math.floor(M.image.width*te),ke=Math.floor(M.image.height*te),Ge=Y!==null?Y.x:0,Ue=Y!==null?Y.y:0;B.setTexture2D(M,0),O.copyTexSubImage2D(O.TEXTURE_2D,ce,0,0,Ge,Ue,ie,ke),b.unbindTexture()},this.copyTextureToTexture=function(M,Y,ce=null,te=null,ie=0,ke=0){let Ge,Ue,Ve,We,et,it,$e,Mt,Gt;const Ft=M.isCompressedTexture?M.mipmaps[ke]:M.image;if(ce!==null)Ge=ce.max.x-ce.min.x,Ue=ce.max.y-ce.min.y,Ve=ce.isBox3?ce.max.z-ce.min.z:1,We=ce.min.x,et=ce.min.y,it=ce.isBox3?ce.min.z:0;else{const Ht=Math.pow(2,-ie);Ge=Math.floor(Ft.width*Ht),Ue=Math.floor(Ft.height*Ht),M.isDataArrayTexture?Ve=Ft.depth:M.isData3DTexture?Ve=Math.floor(Ft.depth*Ht):Ve=1,We=0,et=0,it=0}te!==null?($e=te.x,Mt=te.y,Gt=te.z):($e=0,Mt=0,Gt=0);const Et=re.convert(Y.format),rn=re.convert(Y.type);let ze;Y.isData3DTexture?(B.setTexture3D(Y,0),ze=O.TEXTURE_3D):Y.isDataArrayTexture||Y.isCompressedArrayTexture?(B.setTexture2DArray(Y,0),ze=O.TEXTURE_2D_ARRAY):(B.setTexture2D(Y,0),ze=O.TEXTURE_2D),b.activeTexture(O.TEXTURE0),b.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,Y.flipY),b.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),b.pixelStorei(O.UNPACK_ALIGNMENT,Y.unpackAlignment);const _n=b.getParameter(O.UNPACK_ROW_LENGTH),ut=b.getParameter(O.UNPACK_IMAGE_HEIGHT),Cn=b.getParameter(O.UNPACK_SKIP_PIXELS),Kn=b.getParameter(O.UNPACK_SKIP_ROWS),Ai=b.getParameter(O.UNPACK_SKIP_IMAGES);b.pixelStorei(O.UNPACK_ROW_LENGTH,Ft.width),b.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Ft.height),b.pixelStorei(O.UNPACK_SKIP_PIXELS,We),b.pixelStorei(O.UNPACK_SKIP_ROWS,et),b.pixelStorei(O.UNPACK_SKIP_IMAGES,it);const ms=M.isDataArrayTexture||M.isData3DTexture,Tt=Y.isDataArrayTexture||Y.isData3DTexture;if(M.isDepthTexture){const Ht=I.get(M),Ri=I.get(Y),Rt=I.get(Ht.__renderTarget),Ci=I.get(Ri.__renderTarget);b.bindFramebuffer(O.READ_FRAMEBUFFER,Rt.__webglFramebuffer),b.bindFramebuffer(O.DRAW_FRAMEBUFFER,Ci.__webglFramebuffer);for(let gs=0;gs<Ve;gs++)ms&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,I.get(M).__webglTexture,ie,it+gs),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,I.get(Y).__webglTexture,ke,Gt+gs)),O.blitFramebuffer(We,et,Ge,Ue,$e,Mt,Ge,Ue,O.DEPTH_BUFFER_BIT,O.NEAREST);b.bindFramebuffer(O.READ_FRAMEBUFFER,null),b.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(ie!==0||M.isRenderTargetTexture||I.has(M)){const Ht=I.get(M),Ri=I.get(Y);b.bindFramebuffer(O.READ_FRAMEBUFFER,X),b.bindFramebuffer(O.DRAW_FRAMEBUFFER,F);for(let Rt=0;Rt<Ve;Rt++)ms?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ht.__webglTexture,ie,it+Rt):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Ht.__webglTexture,ie),Tt?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ri.__webglTexture,ke,Gt+Rt):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Ri.__webglTexture,ke),ie!==0?O.blitFramebuffer(We,et,Ge,Ue,$e,Mt,Ge,Ue,O.COLOR_BUFFER_BIT,O.NEAREST):Tt?O.copyTexSubImage3D(ze,ke,$e,Mt,Gt+Rt,We,et,Ge,Ue):O.copyTexSubImage2D(ze,ke,$e,Mt,We,et,Ge,Ue);b.bindFramebuffer(O.READ_FRAMEBUFFER,null),b.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else Tt?M.isDataTexture||M.isData3DTexture?O.texSubImage3D(ze,ke,$e,Mt,Gt,Ge,Ue,Ve,Et,rn,Ft.data):Y.isCompressedArrayTexture?O.compressedTexSubImage3D(ze,ke,$e,Mt,Gt,Ge,Ue,Ve,Et,Ft.data):O.texSubImage3D(ze,ke,$e,Mt,Gt,Ge,Ue,Ve,Et,rn,Ft):M.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,ke,$e,Mt,Ge,Ue,Et,rn,Ft.data):M.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,ke,$e,Mt,Ft.width,Ft.height,Et,Ft.data):O.texSubImage2D(O.TEXTURE_2D,ke,$e,Mt,Ge,Ue,Et,rn,Ft);b.pixelStorei(O.UNPACK_ROW_LENGTH,_n),b.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ut),b.pixelStorei(O.UNPACK_SKIP_PIXELS,Cn),b.pixelStorei(O.UNPACK_SKIP_ROWS,Kn),b.pixelStorei(O.UNPACK_SKIP_IMAGES,Ai),ke===0&&Y.generateMipmaps&&O.generateMipmap(ze),b.unbindTexture()},this.initRenderTarget=function(M){I.get(M).__webglFramebuffer===void 0&&B.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?B.setTextureCube(M,0):M.isData3DTexture?B.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?B.setTexture2DArray(M,0):B.setTexture2D(M,0),b.unbindTexture()},this.resetState=function(){Z=0,H=0,$=null,b.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ri}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=lt._getDrawingBufferColorSpace(e),t.unpackColorSpace=lt._getUnpackColorSpace()}}const mn=(i,e,t)=>{const n=pt.clamp((t-i)/(e-i),0,1);return n*n*(3-2*n)};function Gs(i,e,t=2){const n=new nn,s=-i/2,r=-e/2;return n.moveTo(s+t,r),n.lineTo(s+i-t,r),n.quadraticCurveTo(s+i,r,s+i,r+t),n.lineTo(s+i,r+e-t),n.quadraticCurveTo(s+i,r+e,s+i-t,r+e),n.lineTo(s+t,r+e),n.quadraticCurveTo(s,r+e,s,r+e-t),n.lineTo(s,r+t),n.quadraticCurveTo(s,r,s+t,r),n}function Ca(i,e,t,n,s,r=1){const a=new hn(Gs(n,s,r).getPoints(32).map(o=>o.add(new we(e,t))));i.holes.push(a)}function ex(i,e,t,n=2,s=[]){const r=Gs(i,e,n);for(const o of s)Ca(r,...o);const a=new On(r,{depth:t,bevelEnabled:!0,bevelSegments:5,steps:1,bevelSize:Math.min(.28,t*.2),bevelThickness:Math.min(.4,t*.2),curveSegments:32});return a.rotateX(-Math.PI/2),a.translate(0,-t/2,0),a.computeVertexNormals(),a}function Jh(i=!1){const e=document.createElement("canvas");e.width=e.height=1024;const t=e.getContext("2d"),n=t.createImageData(1024,1024);let s=37;const r=()=>(s=s*1664525+1013904223>>>0,s/4294967296),a=Array.from({length:1024},()=>r());for(let l=0;l<1024;l++)for(let c=0;c<1024;c++){const h=(l*1024+c)*4,m=i?150+a[l]*55+r()*16:150+r()*65;n.data[h]=n.data[h+1]=n.data[h+2]=m,n.data[h+3]=255}t.putImageData(n,0,0);const o=new Dr(e);return o.wrapS=o.wrapT=$i,o.repeat.set(2,2),o.anisotropy=16,o}function tx(){const i=new vt;i.name="Sealed instrument";const e=Jh(!0),t=Jh(),n={aluminium:new En({color:4738898,metalness:.94,roughness:.49,roughnessMap:e,bumpMap:e,bumpScale:.045,anisotropy:.75,anisotropyRotation:Math.PI/2,clearcoat:.16,clearcoatRoughness:.42}),edge:new En({color:11580597,metalness:1,roughness:.27,roughnessMap:e,anisotropy:.6}),dark:new En({color:1514011,metalness:.45,roughness:.49,roughnessMap:e,anisotropy:.5}),black:new En({color:527116,metalness:.16,roughness:.6,roughnessMap:t,bumpMap:t,bumpScale:.028,clearcoat:.2,clearcoatRoughness:.5}),pcb:new En({color:1517092,metalness:.24,roughness:.63,roughnessMap:t}),chip:new gt({color:1053460,roughness:.76,roughnessMap:t}),gold:new gt({color:9995354,metalness:.82,roughness:.43}),ceramic:new gt({color:6512985,roughness:.7}),silk:new cn({color:10660518})},s=[],r=new Set,a={};function o(P,z,ne,ye=[0,0,0]){const Ae=new ht(z,ne);return Ae.position.set(...ye),Ae.castShadow=Ae.receiveShadow=!0,P.add(Ae),Ae}function l(P,z,ne,ye,Ae,Te=[0,0,0],Fe=2,Be=[]){return o(P,ex(z,ne,ye,Fe,Be),Ae,Te)}function c(P,z,ne,ye,Ae,Te=64){return o(P,new Ct(z,z,ne,Te,1),ye,Ae)}function h(P,z,ne,ye,Ae){const Te=new vt;return Te.name=P,Te.position.set(...z),i.add(Te),s.push({g:Te,base:new U(...z),offset:new U(...ne),start:ye,end:Ae}),a[P]=Te,Te}function m(P,z,ne,ye,Ae,Te="#b4b9b7",Fe=40){const Be=document.createElement("canvas");Be.width=1024,Be.height=256;const O=Be.getContext("2d");O.clearRect(0,0,1024,256),O.fillStyle=Te,O.font=`${Fe}px monospace`,O.textBaseline="middle",O.fillText(z,24,128);const Xe=new Dr(Be);Xe.colorSpace=ln;const qe=new cn({map:Xe,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}),C=o(P,new Bn(ne,ye),qe,Ae);return C.rotation.x=-Math.PI/2,C}function u(P,z){const ne=new vt;ne.position.set(...z),P.add(ne),c(ne,1.1,7,n.edge,[0,-2,0]);const ye=Gs(4.6,4.6,2.2),Ae=new hn;for(let Fe=0;Fe<6;Fe++){const Be=Fe*Math.PI/3;Fe?Ae.lineTo(Math.cos(Be)*.87,Math.sin(Be)*.87):Ae.moveTo(Math.cos(Be)*.87,Math.sin(Be)*.87)}Ae.closePath(),ye.holes.push(Ae);const Te=new On(ye,{depth:1.1,bevelEnabled:!0,bevelSegments:4,bevelSize:.15,bevelThickness:.15,curveSegments:32});Te.rotateX(-Math.PI/2),o(ne,Te,n.edge),c(ne,.85,.1,n.chip,[0,.05,0]);for(let Fe=0;Fe<7;Fe++){const Be=o(ne,new ps(1.12,.12,8,32),n.dark,[0,-5+Fe*.65,0]);Be.rotation.x=Math.PI/2}return ne}const d=[[-77,-50],[77,-50],[-77,50],[77,50]],p=h("Chassis",[0,-12,0],[0,-38,0],.23,.63);l(p,172,118,3,n.dark,[0,0,0],6,d.map(([P,z])=>[P,z,3,3,1.4]));const x=Gs(172,118,6);Ca(x,0,0,167,113,4.5);const g=new On(x,{depth:29,bevelEnabled:!0,bevelSegments:5,bevelSize:.4,bevelThickness:.35,curveSegments:32});g.rotateX(-Math.PI/2),o(p,g,n.aluminium,[0,1,0]);for(const[P,z]of d)c(p,3.5,10,n.aluminium,[P,7,z]),c(p,1.3,.1,n.chip,[P,12.1,z]);for(const[P,z]of[[-65,-40],[65,-40],[-65,40],[65,40]])l(p,15,12,2,n.black,[P,-3,z],3);m(p,"ASTRA   /   SB—09",65,16,[-38,2.1,27],"#939b9b",39);const f=h("Enclosure",[0,20.5,0],[-16,97,-24],.04,.43),w=[];for(let P=0;P<18;P++)w.push([-55+P*3.3,-29,1.8,29,.8]);l(f,172,118,2.5,n.aluminium,[0,0,0],6,[...w,...d.map(([P,z])=>[P,z,5.4,5.4,2.6])]);const E=Gs(165,111,4);Ca(E,0,0,162,108,3);const y=new On(E,{depth:2,bevelEnabled:!0,bevelSegments:3,bevelSize:.2,bevelThickness:.2,curveSegments:32});y.rotateX(-Math.PI/2),o(f,y,n.dark,[0,-3.6,0]),m(f,"A S T R A",45,11,[-52,1.69,29],"#303536",56),m(f,"SEALED EXECUTION INSTRUMENT",65,10,[-42,1.7,40],"#424849",25),m(f,"SB–09 / 001",27,7,[62,1.7,42],"#44494a",37);for(const[P,z]of d){const ne=h("Fastener "+P+","+z,[P,22.5,z],[-16,118,-24],0,.25);u(ne,[0,0,0])}const S=h("Logic board",[0,-3,0],[-8,25,8],.2,.55);l(S,153,100,1.7,n.pcb,[0,0,0],3,d.map(([P,z])=>[P*.92,z*.9,3,3,1.4]));const T=document.createElement("canvas");T.width=2048,T.height=1365;const A=T.getContext("2d");A.clearRect(0,0,T.width,T.height),A.strokeStyle="#5a6960",A.lineWidth=1.6;for(let P=0;P<74;P++){const z=70+P*137%1860,ne=90+P*173%1170;A.beginPath(),A.moveTo(z,ne),A.lineTo(z+30,ne),A.lineTo(z+65,ne+35),A.lineTo(z+115,ne+35),A.stroke(),A.beginPath(),A.arc(z,ne,3,0,Math.PI*2),A.stroke()}A.strokeStyle="#bac2ae",A.fillStyle="#bec5b7",A.font="15px monospace";for(let P=0;P<38;P++){const z=80+P*173%1820,ne=80+P*131%1130;A.strokeRect(z,ne,52,27),A.fillText("R"+(102+P),z,ne-8)}A.font="21px monospace",A.fillText("ASTRA  /  SANDBOX CONTROLLER",85,1250),A.fillText("REV 09.3   •   94V–0",1530,1250);const v=new Dr(T);v.colorSpace=ln;const R=o(S,new Bn(152,99),new cn({map:v,transparent:!0,depthWrite:!1}),[0,1.34,0]);R.rotation.x=-Math.PI/2;for(let P=0;P<60;P++){const z=-65+P*19.7%130,ne=-41+P*13.1%82;if(!(z>6&&ne>-29&&ne<40)){l(S,2.8,1.5,1,n.ceramic,[z,1.8,ne],.15);for(const ye of[-1.5,1.5])l(S,.6,1.65,.9,n.edge,[z+ye,1.7,ne],.1)}}for(const[P,z,ne,ye]of[[-50,-24,15,15],[-21,-25,12,16],[-45,22,18,17],[0,38,13,10],[-65,8,8,12]]){l(S,ne,ye,2,n.chip,[P,2.2,z],.7),m(S,"U"+Math.round(P*P+z*z),ne,ye/2,[P,3.5,z],"#89918a",62);for(let Ae=0;Ae<8;Ae++)for(const Te of[-1,1])l(S,2,.55,.45,n.edge,[P+Te*(ne/2+.8),1.6,z-ye/2+1+Ae*(ye-2)/7],.1)}for(let P=0;P<7;P++)c(S,2.8,6,n.dark,[-67+P*8,4,-39]),c(S,2.45,.3,n.edge,[-67+P*8,7.15,-39]);const D=h("Connector bank",[0,0,-46],[10,20,-53],.29,.62);l(D,128,11,1.5,n.pcb,[0,0,0],1);for(let P=0;P<4;P++){const z=-44+P*26,ne=Gs(18,10,1);Ca(ne,0,0,14.5,7,.7);const ye=new On(ne,{depth:11,bevelEnabled:!0,bevelSize:.25,bevelThickness:.25,bevelSegments:4,curveSegments:24});o(D,ye,n.edge,[z,6,-6]),l(D,13,8,1.2,n.chip,[z,3,-1],.5);for(let Ae=0;Ae<7;Ae++)l(D,.65,6,.4,n.gold,[z-4.5+Ae*1.5,4,-2],.1)}const N=h("Thermal array",[-43,9,-17],[-53,47,-12],.3,.64);l(N,47,39,2.5,n.dark,[0,0,0],2);for(let P=0;P<14;P++)l(N,1.15,36,8,n.aluminium,[-21+P*3.2,5,0],.48);for(const P of[-18,18])u(N,[P,1.7,16]);const k=h("RF shield",[-43,8,27],[-39,37,48],.34,.67);l(k,37,29,1,n.edge,[0,4,0],2);for(const P of[-18,18])l(k,1,28,7,n.aluminium,[P,0,0],.3);for(const P of[-14,14])l(k,36,1,7,n.aluminium,[0,0,P],.3);m(k,"RF / 02",28,8,[0,4.8,0],"#545b5c",58);const G=h("Sealed core",[35,9,8],[110,48,15],.38,.77),X=n.black.clone();X.color.setHex(1053717),X.roughness=.44,X.metalness=.1,X.envMapIntensity=.32,X.clearcoat=.1,l(G,62,67,13,X,[0,0,0],4),m(G,"A S T R A   /   0 9",43,8,[-4,6.94,-22],"#7e8989",39),m(G,"SANDBOX",37,8,[-7,6.95,20],"#4f5a59",37);const F=new gt({color:12122071,emissive:7794357,emissiveIntensity:2,roughness:.38});l(G,3.5,.65,.08,F,[22,6.96,22],.3);const Z=l(p,13,4.5,.7,n.black,[60,13,59.6],1);Z.rotation.x=Math.PI/2;for(const P of[57,63]){const z=o(p,new fs(.9,20,12),F,[P,13,60.25]);z.name="Front status LED"}const H=new jp(10485714,.4,12,2);H.position.set(22,8,22),G.add(H);const $=new vt;$.name="Socketed power cartridge",G.add($);const Q=new gt({color:2639166,metalness:.2,roughness:.63});l($,52,42,.8,Q,[0,7.5,-2],2);for(const P of[-22,22])for(const z of[-18,14])c($,1.55,.65,n.edge,[P,8.3,z],24),c($,.68,.7,n.chip,[P,8.6,z],16);const V=new gt({color:3357499,emissive:16717320,emissiveIntensity:0,roughness:.52,metalness:.15}),ee=l($,15,17,1.6,V,[3,8.9,-3],1);ee.name="Faulty power regulator";for(const P of[-6,12])for(let z=0;z<7;z++)l($,2,.6,.45,n.gold,[P,8.2,-10+z*2.25],.1);for(const[P,z]of[[-15,-8],[-15,4],[17,6]]){l($,7,7,1.3,n.chip,[P,8.7,z],1);for(let ne=0;ne<4;ne++)l($,5,.35,.3,n.edge,[P,9.5,z-1.5+ne],.1)}for(let P=0;P<9;P++)l($,2.4,4,.2,n.gold,[-18+P*4.5,7.95,17],.1);m($,"PWR–03  /  SERVICE",29,4,[0,8.1,-17],"#c3d1c5",30);const J=V.clone();J.color.setHex(3427397),J.emissive.setHex(5627824),J.emissiveIntensity=.22;const ve=F.clone(),Oe=G.clone(!0);Oe.name="Replacement power cartridge",i.add(Oe),Oe.traverse(P=>{P.material===V&&(P.material=J,P.name="Replacement power regulator"),P.material===F&&(P.material=ve),P.isLight&&(P.intensity=0)}),a["Faulty cartridge"]=G,a["Replacement cartridge"]=Oe;const he=new Js({color:13496063,transparent:!0,opacity:0,depthWrite:!1,toneMapped:!1}),K=[];for(let P=0;P<3;P++){const z=new St;z.setAttribute("position",new dt(new Float32Array(27),3));const ne=new $a(z,he);ne.name="Regulator discharge "+P,ne.frustumCulled=!1,G.add(ne),K.push(ne)}const fe=new Uint8Array(1024*4);for(let P=0;P<32;P++)for(let z=0;z<32;z++){const ne=(P*32+z)*4,ye=Math.hypot((z-15.5)/15.5,(P-15.5)/15.5);fe[ne]=fe[ne+1]=fe[ne+2]=255,fe[ne+3]=Math.round(255*Math.max(0,1-ye*ye)**3)}const ue=new us(fe,32,32);ue.needsUpdate=!0,ue.magFilter=en;const be=[];for(let P=0;P<8;P++){const z=new Cd({map:ue,color:8688281,transparent:!0,opacity:0,depthWrite:!1}),ne=new ip(z);ne.name="Fault smoke "+P,i.add(ne),be.push(ne)}for(const P of s)P.g!==G&&P.g.traverse(z=>{if(z.material)for(const ne of[z.material].flat())r.add(ne)});const _e=new Map([...r].map(P=>[P,{color:P.color.clone(),env:P.envMapIntensity,roughness:P.roughness}])),Ie=new Kp({color:6846069,transparent:!0,opacity:0,dashSize:1,gapSize:2,depthWrite:!1}),Ze=s.filter(P=>!P.g.name.startsWith("Fastener")).map(P=>{const z=new St().setFromPoints([P.base,P.base]),ne=new $a(z,Ie);return i.add(ne),{p:P,line:ne}});function Le(P,z=0,ne={}){P=pt.clamp(Number.isFinite(P)?P:0,0,1),z=Number.isFinite(z)?z:0;const ye=_=>pt.clamp(Number.isFinite(_)?_:0,0,1),Ae=ye(ne.fault),Te=ye(ne.repair);for(const[_,I]of s.entries()){I.g.position.copy(I.base).addScaledVector(I.offset,mn(I.start,I.end,P));const B=mn(I.start,I.end,P);I.g.position.y+=Math.sin(z*.65+_*1.7)*B*.9,I.g.position.x+=Math.sin(z*.39+_*2.1)*B*.35}const Fe=mn(.72,.85,P)*(1-.65*Math.max(Ae,Te));for(const[_,I]of _e)_.color.copy(I.color).multiplyScalar(1-Fe*.94),I.env!==void 0&&(_.envMapIntensity=I.env*(1-Fe*.9)),I.roughness!==void 0&&(_.roughness=pt.lerp(I.roughness,.9,Fe));const Be=mn(.03,.52,Te),O=mn(.36,.93,Te);Oe.position.copy(G.position).add(new U(154*(1-O),38*(1-O),-18*(1-O))),Oe.rotation.z=-.12*(1-O),Oe.visible=Te>.3,G.position.x-=158*Be,G.position.y+=46*mn(.03,.24,Te),G.rotation.z=.13*Be,G.visible=Te<.64;const Xe=Ae*(1-mn(.3,.65,Te)),qe=(z%1.85+1.85)%1.85,C=(1-mn(.018,.14,qe))*mn(0,.012,qe)+.65*mn(.205,.218,qe)*(1-mn(.23,.285,qe)),b=Xe*C;V.color.setHex(3357499).lerp(new Je(13051672),Xe),V.emissiveIntensity=Xe*(1.2+.35*Math.sin(z*2.4)+b*2.8),F.color.setHex(12122071).lerp(new Je(16736328),Xe),F.emissive.setHex(7794357).lerp(new Je(16721936),Xe),F.emissiveIntensity=2*(1-Xe)+Xe*(1.55+.8*Math.sin(z*6.8)),H.color.setHex(10485714).lerp(new Je(16726044),Xe),H.intensity=G.visible?.4+b*1.5:0,f.rotation.x=Xe*(.009*Math.sin(z*3.4)+C*.014)*(1-mn(.25,.5,P)),f.position.y+=Xe*(.25+.45*Math.sin(z*3.4)+C*.75)*(1-mn(.25,.5,P)),he.opacity=b;for(const[_,I]of K.entries()){I.visible=b>.005&&G.visible;const B=I.geometry.attributes.position;for(let se=0;se<9;se++){const me=se/8,j=Math.sin(me*Math.PI);B.setXYZ(se,-6+18*me,9.5+j*(2.1+_*.5+Math.sin(z*61+se*2.9+_)*1.2),-7+_*4+j*Math.sin(z*47+se*2.1+_)*1.25)}B.needsUpdate=!0}for(const[_,I]of be.entries()){const B=((z*.26+_/8)%1+1)%1;I.visible=Xe>.005&&G.visible,I.position.set(G.position.x+19+Math.sin(B*5+_)*B*8,Math.max(G.position.y+12,20)+B*45,G.position.z+16+B*7),I.scale.setScalar(6+B*17),I.material.rotation=Math.sin(z*.12+_)*.45,I.material.opacity=Xe*.19*Math.sin(Math.PI*B)*(1-B*.45)}i.userData.state={t:P,time:z,fault:Ae,repair:Te,activeFault:Xe,flash:b,oldRemoved:Be,replacementSeated:O,parts:s.length,faultyVisible:G.visible,replacementVisible:Oe.visible},Ie.opacity=.2*mn(.16,.35,P)*(1-mn(.7,.84,P));for(const{p:_,line:I}of Ze){const B=I.geometry.attributes.position;B.setXYZ(0,..._.base.toArray()),B.setXYZ(1,..._.g.position.toArray()),B.needsUpdate=!0,I.computeLineDistances()}}function de(){const P=new Set,z=new Set,ne=new Set([e,t]);i.traverse(ye=>{if(ye.geometry&&P.add(ye.geometry),ye.material)for(const Ae of[ye.material].flat()){z.add(Ae);for(const Te of Object.values(Ae))Te?.isTexture&&ne.add(Te)}}),P.forEach(ye=>ye.dispose()),z.forEach(ye=>ye.dispose()),ne.forEach(ye=>ye.dispose()),i.removeFromParent()}return Le(0),{group:i,update:Le,dispose:de,anchors:a}}function eu(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new St;let c=0;for(let h=0;h<i.length;++h){const m=i[h];let u=0;if(t!==(m.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in m.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(m.attributes[d]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==m.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in m.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[d]===void 0&&(a[d]=[]),a[d].push(m.morphAttributes[d])}if(e){let d;if(t)d=m.index.count;else if(m.attributes.position!==void 0)d=m.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,h),c+=d}}if(t){let h=0;const m=[];for(let u=0;u<i.length;++u){const d=i[u].index;for(let p=0;p<d.count;++p)m.push(d.getX(p)+h);h+=i[u].attributes.position.count}l.setIndex(m)}for(const h in r){const m=Qh(r[h]);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,m)}for(const h in a){const m=a[h][0].length;if(m!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<m;++u){const d=[];for(let x=0;x<a[h].length;++x)d.push(a[h][x][u]);const p=Qh(d);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(p)}}}return l}function Qh(i){let e,t,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}const a=new e(r),o=new fn(a,t,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const m=l/t;for(let u=0,d=h.count;u<d;u++)for(let p=0;p<t;p++){const x=h.getComponent(u,p);o.setComponent(u+m,p,x)}}else a.set(h.array,l);l+=h.count*t}return s!==void 0&&(o.gpuType=s),o}const gr=new U;function Ln(i,e,t,n,s,r){const a=2*Math.PI*s/4,o=Math.max(r-2*s,0),l=Math.PI/4;gr.copy(e),gr[n]=0,gr.normalize();const c=.5*a/(a+o),h=1-gr.angleTo(i)/l;return Math.sign(gr[t])===1?h*c:o/(a+o)+c+c*(1-h)}class zi extends Yn{constructor(e=1,t=1,n=1,s=2,r=.1){const a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const l=new U,c=new U,h=new U(e,t,n).divideScalar(2).subScalar(r),m=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,p=m.length/6,x=new U,g=.5/a;for(let f=0,w=0;f<m.length;f+=3,w+=2)switch(l.fromArray(m,f),c.copy(l),c.x-=Math.sign(c.x)*g,c.y-=Math.sign(c.y)*g,c.z-=Math.sign(c.z)*g,c.normalize(),m[f+0]=h.x*Math.sign(l.x)+c.x*r,m[f+1]=h.y*Math.sign(l.y)+c.y*r,m[f+2]=h.z*Math.sign(l.z)+c.z*r,u[f+0]=c.x,u[f+1]=c.y,u[f+2]=c.z,Math.floor(f/p)){case 0:x.set(1,0,0),d[w+0]=Ln(x,c,"z","y",r,n),d[w+1]=1-Ln(x,c,"y","z",r,t);break;case 1:x.set(-1,0,0),d[w+0]=1-Ln(x,c,"z","y",r,n),d[w+1]=1-Ln(x,c,"y","z",r,t);break;case 2:x.set(0,1,0),d[w+0]=1-Ln(x,c,"x","z",r,e),d[w+1]=Ln(x,c,"z","x",r,n);break;case 3:x.set(0,-1,0),d[w+0]=1-Ln(x,c,"x","z",r,e),d[w+1]=1-Ln(x,c,"z","x",r,n);break;case 4:x.set(0,0,1),d[w+0]=1-Ln(x,c,"x","y",r,e),d[w+1]=1-Ln(x,c,"y","x",r,t);break;case 5:x.set(0,0,-1),d[w+0]=Ln(x,c,"x","y",r,e),d[w+1]=1-Ln(x,c,"y","x",r,t);break}}static fromJSON(e){return new zi(e.width,e.height,e.depth,e.segments,e.radius)}}const nx=i=>pt.clamp(Number.isFinite(i)?i:0,0,1),Fs=(i,e,t)=>pt.smoothstep(i,e,t);function gi(i,e,t){const n=-i/2,s=-e/2,r=Math.max(0,Math.min(t,i/2,e/2)),a=new nn;return a.moveTo(n+r,s),a.lineTo(n+i-r,s),a.quadraticCurveTo(n+i,s,n+i,s+r),a.lineTo(n+i,s+e-r),a.quadraticCurveTo(n+i,s+e,n+i-r,s+e),a.lineTo(n+r,s+e),a.quadraticCurveTo(n,s+e,n,s+e-r),a.lineTo(n,s+r),a.quadraticCurveTo(n,s,n+r,s),a}function _a(i,e,t,n){const s=new hn;s.absarc(e,t,n,0,Math.PI*2,!0),i.holes.push(s)}function Xo(i,e,t=.02){const n=Math.max(0,Math.min(t,e/4)),s=e-2*n,r=new On(i,{depth:s,bevelEnabled:n>0,bevelSize:n,bevelThickness:n,bevelSegments:4,curveSegments:32,steps:1});return r.translate(0,0,-s/2),r}function jh(i=!1){const t=new Uint8Array(262144);let n=71;const s=()=>(n=Math.imul(n,1664525)+1013904223>>>0)/4294967296;for(let a=0;a<256;a++){const o=s();for(let l=0;l<256;l++){const c=205+Math.floor(35*(i?o*.8+s()*.2:s())),h=(a*256+l)*4;t[h]=t[h+1]=t[h+2]=c,t[h+3]=255}}const r=new us(t,256,256);return r.wrapS=r.wrapT=$i,r.repeat.set(2,6),r.needsUpdate=!0,r}function ix(i){const e=new Set;i.traverse(t=>{t.geometry&&e.add(t.geometry);for(const n of[t.material].flat().filter(Boolean)){e.add(n);for(const s of Object.values(n))s?.isTexture&&e.add(s)}});for(const t of e)t.dispose();i.clear(),i.removeFromParent()}function sx(){const i=new vt;i.name="Agent workstation network";const e=jh(!0),t=jh(),n=new En({color:"#303644",metalness:.84,roughness:.36,roughnessMap:e,bumpMap:e,bumpScale:.001,anisotropy:.35}),s=new gt({color:"#727e92",metalness:.86,roughness:.3}),r=new gt({color:"#101722",metalness:0,roughness:.48,roughnessMap:t}),a=new gt({color:"#14565b",metalness:.18,roughness:.48}),o=new gt({color:"#d49361",metalness:.86,roughness:.3}),l=new gt({color:"#d8b775",metalness:.74,roughness:.35}),c=new cn({color:"#55dfff"}),h=new cn({color:"#8d65ff"}),m=new cn({color:"#d5eaf3"}),u=new cn({color:"#071526"}),d=new Map,p=(_,I,B,se,me,j,ae,ge=n,Se=.04)=>{const Re=[I,B,se,Se].join(",");d.has(Re)||d.set(Re,new zi(I,B,se,2,Math.min(Se,I/3,B/3,se/3)));const Ce=new ht(d.get(Re),ge);return Ce.position.set(me,j,ae),Ce.castShadow=Ce.receiveShadow=!0,_.add(Ce),Ce},x=_=>{const I=new vt;return I.name=_,i.add(I),I},g=(_,I,B,se,me,j=.04)=>{const ae=gi(se,me,j).getPoints(6).map(ge=>new we(ge.x+I,ge.y+B)).reverse();_.holes.push(new hn(ae))},f=(_,I,B,se,me=n,j=.015)=>{const ae=new ht(Xo(I,B,j),me);return ae.rotation.x=-Math.PI/2,ae.position.y=se,ae.castShadow=ae.receiveShadow=!0,_.add(ae),ae},w=(_,I,B,se,me,j,ae=s,ge=24)=>{const Se=new ht(new Ct(I,I,B,ge),ae);return Se.position.set(se,me,j),_.add(Se),Se},E=(_,I,B,se)=>{w(_,.095,.035,I,B,se,r,16),w(_,.065,.04,I,B+.015,se,s,12),p(_,.065,.008,.018,I,B+.04,se,r,.003)},y=(_,I,B,se=o)=>{const me=new Xa(I.map(ae=>new U(...ae))),j=new ht(new Fr(me,32,B,8,!1),se);return _.add(j),j},S=x("Laptop chassis"),T=x("Laptop deck"),A=x("Laptop motherboard"),v=x("Laptop cooling"),R=x("Laptop battery"),D=x("Laptop display"),N=x("Processor modules"),k=x("Memory and storage"),G=x("Captive deck fasteners"),X=gi(13,8,.38);for(const _ of[-4.4,4.4])for(let I=0;I<7;I++)g(X,_,-1.8+(I-3)*.24,1.8,.1);for(const _ of[-5.8,5.8])for(const I of[-3.35,3.35])_a(X,_,-I,.105);f(S,X,.13,-.48);const F=gi(13,8,.38);g(F,0,0,12.62,7.62,.25),f(S,F,.38,-.23,n,.025);const Z=gi(12.61,7.61,.25);g(Z,0,0,12.44,7.44,.19),f(S,Z,.12,.015,s,.01),p(S,11.5,.04,.045,0,-.22,4.02,c,.01);for(const _ of[-5.55,5.55])for(const I of[-3.25,3.2])p(S,1.35,.08,.3,_,-.59,I,r,.06);for(const _ of[-5.8,5.8])for(const I of[-3.35,3.35])E(S,_,-.38,I);for(const _ of[-1,1]){for(let se=0;se<3;se++){const me=gi(.58,.21,.04);g(me,0,0,.43,.12,.025);const j=new ht(Xo(me,.22,.008),s);j.rotation.y=_*Math.PI/2,j.position.set(_*6.48,-.22,.3+se*.8),S.add(j),p(S,.21,.035,.34,_*6.48,-.23,.3+se*.8,r,.008)}const I=gi(2.2,.28,.04);for(let se=0;se<9;se++)g(I,(se-4)*.22,0,.11,.16,.015);const B=new ht(Xo(I,.08,.008),r);B.rotation.y=_*Math.PI/2,B.position.set(_*6.52,-.2,-2.15),S.add(B)}for(const _ of[-4.8,4.8]){const I=w(S,.2,1.2,_,.17,-3.64,s,32);I.rotation.z=Math.PI/2;for(const B of[-.47,.47]){const se=w(S,.22,.075,_+B,.17,-3.64,r);se.rotation.z=Math.PI/2}p(S,.65,.16,.58,_,.12,-3.46,n)}const H=gi(12.96,7.96,.36);g(H,0,.83,11.4,3.68,.14),g(H,0,-2.25,3.88,1.43,.16);for(const _ of[-5.81,5.81])for(let I=0;I<12;I++)g(H,_,2.85-I*.43,.1,.22,.025);for(const _ of[-5.8,5.8])for(const I of[-3.35,3.35])_a(H,_,-I,.11);f(T,H,.16,.17,n,.025),p(T,11.35,.1,3.6,0,.17,-.83,r,.1);const $=new zi(.66,.105,.51,2,.035),Q=new ki($,r,75),V=new ki(new Yn(.7,.026,.55),c,75),ee=new ki(new Yn(.13,.009,.024),m,75),J=new kt,ve=new Je;for(let _=0;_<75;_++)J.position.set((_%15-7)*.735,.3,Math.floor(_/15)*.66-2.15),J.updateMatrix(),Q.setMatrixAt(_,J.matrix),J.position.y=.257,J.updateMatrix(),V.setMatrixAt(_,J.matrix),ve.setHSL(.52+_%15/15*.23,.86,.59),V.setColorAt(_,ve),J.position.y=.358,J.position.z-=.09,J.updateMatrix(),ee.setMatrixAt(_,J.matrix);T.add(Q,V,ee),p(T,3.82,.04,1.37,0,.235,2.25,r,.13),p(T,3.1,.012,.018,0,.258,2.89,s,.004);for(const _ of[-5.8,5.8])for(const I of[-3.35,3.35])E(G,_,.27,I);for(let _=0;_<2;_++){const I=p(T,.07,.018,.4,5.2+_*.2,.27,2.3,c,.01);I.rotation.y=-.5}const Oe=gi(12.1,6.75,.19);for(const _ of[-5.65,5.65])for(const I of[-2.85,2.85])_a(Oe,_,-I,.12);f(A,Oe,.11,-.15,a,.008);for(const _ of[-5.65,5.65])for(const I of[-2.85,2.85])w(A,.17,.065,_,-.07,I,l),E(A,_,-.04,I);const he=[];for(let _=0;_<22;_++){const I=-4.95+_*.45,B=.65+_%5*.16;he.push(new U(I,-.086,2.65),new U(I,-.086,B)),he.push(new U(I,-.086,B),new U(I*.57,-.086,B-.44))}A.add(new Id(new St().setFromPoints(he),new Js({color:"#63a3a1",transparent:!0,opacity:.55})));const K=new ki(new Yn(.17,.1,.11),r,112);for(let _=0;_<112;_++){const I=Math.floor(_/28),B=_%28;J.position.set(-5.55+B*.41,-.015,-.1+I*.29),J.updateMatrix(),K.setMatrixAt(_,J.matrix)}A.add(K);for(const[_,I,B,se]of[[-1.55,-1.15,1.9,1.65],[1.15,-1.15,2.35,1.9]]){p(N,B+.22,.09,se+.22,_,-.025,I,a,.035),p(N,B,.11,se,_,.065,I,r,.04),p(N,B*.71,.055,se*.67,_,.147,I,s,.025);for(const me of[-1,1])for(let j=0;j<12;j++)p(N,.047,.035,.1,_+(j-5.5)*B/13,.04,I+me*(se/2+.04),l,.004);for(let me=0;me<3;me++)p(N,B*.45,.006,.025,_,.178,I+(me-1)*.14,r,.002)}for(const _ of[-2.5,2.25]){p(k,3.45,.085,.84,_,.035,.9,a,.025);for(let I=0;I<5;I++)p(k,.49,.07,.49,_+(I-2)*.6,.11,.89,r,.015);for(let I=0;I<22;I++)p(k,.09,.018,.12,_+(I-10.5)*.145,.086,1.31,l,.003);for(const I of[-1.77,1.77])p(k,.1,.2,.5,_+I,.045,.9,s,.015)}p(k,3.4,.08,.72,-.4,.04,1.95,a,.025);for(let _=0;_<3;_++)p(k,.64,.09,.47,-1.25+_*.86,.12,1.95,r,.015);E(k,1.11,.115,1.95),p(R,10.6,.26,1.23,0,-.12,2.78,r,.1);for(let _=0;_<4;_++){p(R,2.47,.025,1.05,(_-1.5)*2.58,.025,2.78,n,.07),p(R,.018,.035,.93,(_-1.5)*2.58+1.15,.045,2.78,s,.004);for(let I=0;I<3;I++)p(R,.63-I*.1,.008,.025,(_-1.5)*2.58,.045,2.56+I*.12,s,.003)}y(R,[[4.7,.01,2.6],[5.15,.1,2.28],[4.8,.13,1.7]],.035,r),p(R,.43,.19,.28,4.8,.11,1.64,s,.025);const fe=[];for(const _ of[-4.5,4.5]){const I=gi(2.55,2.6,.35);_a(I,0,0,1.06);const B=f(v,I,.19,.15,r,.02);B.position.x=_,B.position.z=-1.95;const se=new ht(new ps(1.1,.027,8,48),s);se.rotation.x=Math.PI/2,se.position.set(_,.26,-1.95),v.add(se);const me=new vt;me.name=_<0?"Left cooling fan":"Right cooling fan",me.position.set(_,.18,-1.95),v.add(me),fe.push(me);const j=new ki(new zi(.63,.085,.11,1,.024),n,29);for(let ge=0;ge<29;ge++){const Se=ge/29*Math.PI*2;J.position.set(Math.cos(Se)*.64,0,Math.sin(Se)*.64),J.rotation.set(0,-Se+.64,0),J.updateMatrix(),j.setMatrixAt(ge,J.matrix)}me.add(j),J.rotation.set(0,0,0),w(me,.3,.15,0,.03,0,s,32),w(me,.13,.015,0,.115,0,r);for(const ge of[-1.1,1.1])for(const Se of[-1.1,1.1])E(v,_+ge,.27,-1.95+Se);const ae=new ki(new Yn(.045,.36,.6),s,26);for(let ge=0;ge<26;ge++)J.position.set(_+(ge-12.5)*.085,.13,-3.36),J.updateMatrix(),ae.setMatrixAt(ge,J.matrix);v.add(ae)}for(let _=0;_<3;_++)y(v,[[-4.45,.32,-2+_*.2],[-3,.35,-1.65+_*.22],[-1.55,.35,-1.4+_*.23],[1.2,.35,-1.3+_*.23],[3.2,.35,-1.65+_*.22],[4.5,.32,-2+_*.2]],.07);for(const _ of[-1.55,1.2])p(v,1.65,.09,1.4,_,.25,-1.15,o,.07);p(D,13,.23,7.65,0,0,3.72,n,.16),p(D,12.58,.025,7.08,0,-.132,3.76,r,.09),p(D,12.12,.015,6.59,0,-.15,3.79,u,.045);const ue=new vt;ue.position.set(0,-.164,3.79),D.add(ue);const be=(_,I,B,se,me)=>p(ue,_,.009,I,B,me===r?0:-.022,se,me,.025);be(11.9,.3,0,-3.03,r);for(let _=0;_<3;_++)be(.1,.1,-5.55+_*.2,-3.03,[c,h,m][_]);be(1.92,5.52,-4.79,.1,r);for(let _=0;_<10;_++)be(1.14+_%3*.15,.04,-4.8,-2.17+_*.42,_===2?c:s);const _e=[];for(let _=0;_<65;_++){const I=-3.35+_*.14,B=-1.75+Math.sin(_*.075)*.42;_e.push(I,-.012,B-.12-Math.sin(_*.05)*.2,I,-.012,B+.12+Math.sin(_*.05)*.2)}const Ie=new St;Ie.setAttribute("position",new dt(_e,3));const Ze=[];for(let _=0;_<64;_++)Ze.push(_*2,_*2+1,_*2+2,_*2+1,_*2+3,_*2+2);Ie.setIndex(Ze),Ie.attributes.position.setUsage(Mr);const Le=new cn({color:"#6f7fff",side:kn});ue.add(new ht(Ie,Le)),be(5.75,2.18,-.45,.4,r),be(2.65,2.18,4,.4,r);for(let _=0;_<8;_++)be(.16,.028,-3.13,-.45+_*.24,s),be(1.15+_*7%6*.45,.035,-1.08+_%3*.15,-.45+_*.24,_%3===0?h:c);const de=new ki(new zi(.13,.009,1,2,.004),c,12);de.name="Live screen activity chart",de.instanceMatrix.setUsage(Mr),de.frustumCulled=!1,ue.add(de);for(let _=0;_<12;_++)de.setColorAt(_,new Je(_%3?"#adf6ff":"#a39aff"));const P=new kt,z=new Array(12);for(let _=0;_<3;_++)be(2.71,.73,-1.9+_*3.03,2.21,r),be(1.5,.035,-1.9+_*3.03,2.12,m),be(.75,.028,-2.25+_*3.03,2.35,c);w(D,.06,.024,0,-.155,7.27,r,16);for(const _ of[-5.9,5.9])p(D,.16,.045,.16,_,-.15,.25,r,.03);const ne=[],ye=[],Ae=[];for(let _=0;_<4;_++){const I=new vt;I.name=`Agent peer ${_+1}`,i.add(I),p(I,3.35,.15,2.1,0,0,0,n,.1),p(I,2.9,.028,1,0,.09,-.24,r,.025),p(I,1.05,.015,.43,0,.09,.62,r,.035),p(I,2.9,.025,.03,0,.075,1.045,_%2?h:c,.006);const B=new vt;B.position.set(0,.09,-.97),B.rotation.x=-1.87,I.add(B),p(B,3.35,.08,2.1,0,0,1.02,n,.075),p(B,3.08,.015,1.78,0,-.05,1.04,u,.04);for(let ge=0;ge<5;ge++)p(B,1.75-ge%3*.36,.012,.023,-.29,-.062,.48+ge*.22,ge%2?h:c,.003);ne.push(I);const se=new Float32Array(147),me=new St;me.setAttribute("position",new fn(se,3).setUsage(Mr));const j=new $a(me,new Js({color:"#95b9e8",transparent:!0,opacity:.35,depthWrite:!1}));j.name=`Curved peer route ${_+1}`,j.frustumCulled=!1,i.add(j),ye.push(j);const ae=new ht(new fs(.072,12,8),new cn({color:"#9fe8ff",transparent:!0,opacity:1,depthWrite:!1}));i.add(ae),Ae.push(ae)}const Te=new Set;i.traverse(_=>{_.geometry&&Te.add(_.geometry)});function Fe(_){for(const B of _.children)B.isGroup&&Fe(B);if(_===i)return;const I=new Map;for(const B of _.children)B.isMesh&&!B.isInstancedMesh&&(I.has(B.material)||I.set(B.material,[]),I.get(B.material).push(B));for(const[B,se]of I){if(se.length<2)continue;const me=se.map(ge=>{ge.updateMatrix();const Se=ge.geometry.index?ge.geometry.toNonIndexed():ge.geometry.clone();Se.applyMatrix4(ge.matrix);for(const Re of Object.keys(Se.attributes))["position","normal","uv"].includes(Re)||Se.deleteAttribute(Re);return Se}),j=eu(me,!1);if(me.forEach(ge=>ge.dispose()),!j)continue;const ae=new ht(j,B);ae.castShadow=ae.receiveShadow=!0,se.forEach(ge=>_.remove(ge)),_.add(ae)}}Fe(i);const Be=new Set;i.traverse(_=>{_.geometry&&Be.add(_.geometry)}),Te.forEach(_=>{Be.has(_)||_.dispose()});const O=[[-10,3.5,-3.8],[10,3.5,-3.8],[-10,.25,5.7],[10,.25,5.7]],Xe=new Ud(new U,new U,new U,new U),qe=new U;let C;function b(_,I=0){const B=nx(_),se=Number.isFinite(I)?I:0,me=Fs(B,.09,.34),j=Fs(B,.4,1),ae=.35*(1-Fs(B,.005,.11)),ge=Fs(B,.4,.79),Se=Fs(B,.49,.93),Re=Fs(B,.64,1);T.position.set(5.9*ge,4.9*ge,1.05*ge),T.rotation.set(.1*ge,0,-1.18*ge),D.position.set(-1.15*Se,.15+3.6*ge,-3.65+.1*Se),D.rotation.x=-1.82-.04*Se,A.position.set(-1.15*Se,1.5*Se,-.15*Se),A.rotation.x=.12*Se,v.position.set(-1.3*Se,3.65*Se,-.5*Se),v.rotation.x=.18*Se,v.scale.y=.25+.75*Se,N.position.set(-1.15*Se,2.5*Se,1.6*Re),N.rotation.x=.12*Se,k.position.set(-1.35*Se,2.25*Se,1.6*Re),k.rotation.x=.13*Se,R.position.set(-.8*Re,-.7*Re,.7*Re),R.rotation.x=.1*Re,G.position.set(0,.85*ge,0),fe.forEach((Pe,W)=>{Pe.rotation.y=se*(W?-.72:.72)}),c.color.setHSL(.56+.018*Math.sin(se*.18),.86,.65);for(let Pe=0;Pe<12;Pe++){const W=(.36+Pe*.076)*(1+.19*Math.sin(se*.43+Pe*.38));z[Pe]=W,P.position.set(2.95+Pe*.19,-.024,1.32-W/2),P.scale.set(1,1,W),P.updateMatrix(),de.setMatrixAt(Pe,P.matrix)}de.instanceMatrix.needsUpdate=!0;const Ce=Ie.attributes.position;for(let Pe=0;Pe<65;Pe++){const W=-3.35+Pe*.14,oe=-1.75+Math.sin(Pe*.075-se*.24)*.36,L=.13+(Math.sin(Pe*.05+se*.17)+1)*.065;Ce.setXYZ(Pe*2,W,-.025,oe-L),Ce.setXYZ(Pe*2+1,W,-.025,oe+L)}Ce.needsUpdate=!0,ne.forEach((Pe,W)=>{const oe=O[W],L=Math.sign(oe[0]),pe=W<2;Pe.position.set(oe[0],oe[1]+Math.sin(se*.21+W)*.11,oe[2]),Pe.rotation.y=-L*.18+Math.sin(se*.14+W)*.025,Pe.scale.setScalar((1-me)*1.35),Pe.visible=me<.999,ye[W].visible=Ae[W].visible=ae>1e-4&&Pe.visible,ye[W].material.opacity=ae,Ae[W].material.opacity=ae/.35,Xe.v0.set(L*5.95,.1,pe?-2.3:2.7),Xe.v1.set(L*7.45,.75,pe?-4.4:5.1),Xe.v2.set(Pe.position.x-L*2.4,Pe.position.y+.9,Pe.position.z+(pe?-1.15:1.25)),Xe.v3.set(Pe.position.x-L*1.65*Pe.scale.x,Pe.position.y+.12,Pe.position.z+.3);const q=ye[W].geometry.attributes.position;for(let xe=0;xe<49;xe++)Xe.getPoint(xe/48,qe),q.setXYZ(xe,qe.x,qe.y,qe.z);q.needsUpdate=!0;const re=((se*.075+W*.23)%1+1)%1;Xe.getPoint(re,Ae[W].position)}),C={progress:B,explode:j,focus:me,hue:c.color.getHexString(),peers:ne.filter(Pe=>Pe.visible).length,connectorOpacity:ae,connectorsVisible:ye.some(Pe=>Pe.visible),screen:{time:se,chartHeights:[...z],ribbonLeadingZ:Ce.getZ(0),artworkGap:.013}}}return b(0),{group:i,update:b,get state(){return C},dispose(){ix(i)}}}const Bt=Math.PI*2,ed=22,rx=76,Pa=(i,e=0,t=1)=>Math.min(t,Math.max(e,i));function wa(i,e,t){const n=Pa((t-i)/(e-i));return n*n*(3-2*n)}function td(i,e,t){return i<=e||i>=t?0:7*Math.sin(Math.PI*(i-e)/(t-e))**2}function nd(i){i=Pa(Number.isFinite(i)?i:0);const e=Pa((i-.78)/.1),t=i<.78?i:.78+.05*(2*e-e*e),n=Math.PI*.34+t*Bt*24,s=(n%(2*Bt)+2*Bt)%(2*Bt),r=ed*Math.sin(n),a=ed*Math.cos(n),o=a+Math.sqrt(rx**2-r**2),l=1+.15*Math.sin(i*Math.PI*4)*(1-wa(.78,.96,i)),c=31,h=21/(l*l),m=Math.sqrt(c**2-h**2),u=83-2*h,d=-Math.asin((u-37)/25),p=30-15*Math.sin(d),x=37+15*Math.cos(d),g=52-p,f=79-x,w=Math.hypot(g,f),E=Math.acos(Pa((w*w+100-31.5**2)/(20*w),-1,1))-Math.atan2(g,f);return{t:i,theta:n,phase:s,crankX:r,crankY:a,pistonY:o,camAngle:n/2,intake:td(s,0,Math.PI),exhaust:td(s,3*Math.PI,4*Math.PI),stroke:["INTAKE","COMPRESSION","POWER","EXHAUST"][Math.floor(s/Math.PI)],speed:l,governorRadius:m,governorHeight:h,sleeveY:u,bellAngle:d,feedbackX:p,feedbackY:x,throttleAngle:E,throttle:1.3-E,covers:wa(.12,.43,i),cylinder:wa(.3,.6,i),isolate:wa(.68,1,i)}}const ax=new U(0,1,0),at=(i,e,t)=>new U(i,e,t);function id(i){const t=new Uint8Array(262144);let n=7103;const s=()=>(n=Math.imul(n,1664525)+1013904223>>>0,n/4294967296),r=Array.from({length:256},()=>s());for(let o=0;o<256;o++)for(let l=0;l<256;l++){const c=(o*256+l)*4,h=i==="metal"?150+r[o]*45+s()*17:175+s()*46;t[c]=t[c+1]=t[c+2]=h,t[c+3]=255}const a=new us(t,256,256);return a.needsUpdate=!0,a.generateMipmaps=!0,a.minFilter=Oi,a.magFilter=en,a.wrapS=a.wrapT=$i,a.repeat.set(i==="metal"?2:5,i==="metal"?2:5),a.anisotropy=16,a}function jn(i,e,t){const n=new nn,s=-i/2,r=-e/2;return n.moveTo(s+t,r),n.lineTo(s+i-t,r),n.quadraticCurveTo(s+i,r,s+i,r+t),n.lineTo(s+i,r+e-t),n.quadraticCurveTo(s+i,r+e,s+i-t,r+e),n.lineTo(s+t,r+e),n.quadraticCurveTo(s,r+e,s,r+e-t),n.lineTo(s,r+t),n.quadraticCurveTo(s,r,s+t,r),n}function Dn(i,e,t,n){const s=new hn;s.absarc(e,t,n,0,Bt,!0),i.holes.push(s)}function ox(i,e){const t=new nn;return t.absarc(0,0,i,0,Bt),e&&Dn(t,0,0,e),t}function gn(i,e,t=.45){const n=new On(i,{depth:e,steps:1,bevelEnabled:t>0,bevelSegments:4,bevelSize:t,bevelThickness:t,curveSegments:24});return n.translate(0,0,-e/2),n}function lx(i,e=1.6){const t=i*e/2,n=t*Math.cos(Math.PI/9),s=t-1.25*e,r=t+e,a=h=>{const m=Math.acos(Math.min(1,n/h));return Math.tan(m)-m},o=Math.PI/(2*i),l=a(t),c=[];for(let h=0;h<i;h++){const m=h*Bt/i,u=(d,p)=>c.push(new we(d*Math.cos(p),d*Math.sin(p)));u(s,m-Math.PI/i),u(s,m-o-l);for(let d=0;d<=8;d++){const p=Math.max(n,s)+(r-Math.max(n,s))*d/8;u(p,m-o-l+a(p))}for(let d=8;d>=0;d--){const p=Math.max(n,s)+(r-Math.max(n,s))*d/8;u(p,m+o+l-a(p))}u(s,m+o+l),u(s,m+Math.PI/i)}return new nn(c)}function cx(){const i=new vt;i.name="AG–01 / governed four-stroke";const e=id("metal"),t=id("polymer"),n={aluminum:new En({color:7634304,metalness:.93,roughness:.36,roughnessMap:e,bumpMap:e,bumpScale:.035,anisotropy:.65,anisotropyRotation:Math.PI/2,clearcoat:.15,clearcoatRoughness:.5}),edge:new En({color:11910591,metalness:.94,roughness:.28,roughnessMap:e,anisotropy:.5}),steel:new En({color:3423295,metalness:.96,roughness:.31,roughnessMap:e,anisotropy:.35,clearcoat:.25}),black:new En({color:1448733,metalness:.18,roughness:.57,roughnessMap:t,bumpMap:t,bumpScale:.06,clearcoat:.12,clearcoatRoughness:.55}),graphite:new En({color:5266528,metalness:.35,roughness:.54,roughnessMap:t,bumpMap:t,bumpScale:.025,clearcoat:.18,clearcoatRoughness:.45}),rubber:new gt({color:725008,roughness:.72,roughnessMap:t}),accent:new En({color:10214588,metalness:.55,roughness:.3,roughnessMap:e,clearcoat:.35}),dark:new gt({color:395787,metalness:.5,roughness:.48})},{aluminum:s,edge:r,steel:a,black:o,graphite:l,rubber:c,accent:h}=n,m=new Set,u=new Set([e,t]),d=(W,oe,L,pe=0,q=0,re=0)=>{m.add(W);const xe=new ht(W,oe);return xe.position.set(pe,q,re),xe.castShadow=!0,xe.receiveShadow=!0,L.add(xe),xe},p=(W,oe,L=0,pe=0,q=0)=>{const re=new vt;return re.name=oe,re.position.set(L,pe,q),W.add(re),re},x=(W,oe,L,pe,q,re=0,xe=0,le=0,Me=3,Ee=[])=>{const Qe=jn(oe,L,Me);for(const[rt,Pt,zt]of Ee)Dn(Qe,rt,Pt,zt);return d(gn(Qe,pe,.5),q,W,re,xe,le)},g=(W,oe,L,pe,q=0,re=0,xe=0,le=0)=>d(gn(ox(oe,le),L,.3),pe,W,q,re,xe),f=(W,oe,L,pe,q=0,re=0,xe=0)=>{const le=Math.min(.35,oe*.12,L*.12),Me=[new we(0,-L/2),new we(oe-le,-L/2)];for(let Ee=0;Ee<=6;Ee++){const Qe=Ee/6*Math.PI/2;Me.push(new we(oe-le+le*Math.sin(Qe),-L/2+le-le*Math.cos(Qe)))}Me.push(new we(oe,L/2-le));for(let Ee=0;Ee<=6;Ee++){const Qe=Ee/6*Math.PI/2;Me.push(new we(oe-le+le*Math.cos(Qe),L/2-le+le*Math.sin(Qe)))}return Me.push(new we(0,L/2)),d(new hc(Me,64),pe,W,q,re,xe)},w=(W,oe,L,pe,q=a)=>{const re=f(W,pe,1,q);return E(re,oe,L),re};function E(W,oe,L){const pe=L.clone().sub(oe);W.position.copy(oe).add(L).multiplyScalar(.5),W.quaternion.setFromUnitVectors(ax,pe.clone().normalize()),W.scale.y=pe.length()}const y=(W,oe,L,pe,q=0,re=0,xe=0)=>d(new ps(oe,L,10,80),pe,W,q,re,xe);function S(W,oe,L,pe,q=2){g(W,q*1.42,.5,a,oe,L,pe);const re=new nn;for(let Me=0;Me<=6;Me++){const Ee=Me/6*Bt;Me?re.lineTo(q*Math.cos(Ee),q*Math.sin(Ee)):re.moveTo(q,0)}const xe=new hn;for(let Me=0;Me<=6;Me++){const Ee=-Me/6*Bt;Me?xe.lineTo(q*.48*Math.cos(Ee),q*.48*Math.sin(Ee)):xe.moveTo(q*.48,0)}return re.holes.push(xe),d(gn(re,1.7,.14),r,W,oe,L,pe+1.1)}function T(W,oe,L,pe,q,re,xe,le="#bbc1bf"){const Me=document.createElement("canvas");Me.width=1024,Me.height=128;const Ee=Me.getContext("2d");Ee.fillStyle=le,Ee.font="38px monospace",Ee.textAlign="center",Ee.textBaseline="middle",Ee.fillText(oe,512,64);const Qe=new Dr(Me);Qe.colorSpace=ln,u.add(Qe);const rt=new cn({map:Qe,transparent:!0,depthWrite:!1});return n["label"+Object.keys(n).length]=rt,d(new Bn(L,pe),rt,W,q,re,xe)}const A=p(i,"Engine / working core"),v=p(i,"Centrifugal governor + throttle feedback",96,0,12),R=p(A,"Mounting bed"),D=x(R,126,65,7,o,18,-46,0,7,[[-50,-22,3],[50,-22,3],[-50,22,3],[50,22,3]]);D.rotation.x=-Math.PI/2;for(const W of[-31,67])for(const oe of[-22,22]){f(R,5,4,c,W,-52,oe);const L=p(R,"Captured bed fastener",W,-41,oe);L.rotation.x=-Math.PI/2,S(L,0,0,0,2.3)}for(const W of[-19,19])x(R,87,9,6,s,3,-38,W,2);const N=[];for(const W of[-1,1]){const oe=p(A,W>0?"Front crankcase service cover":"Rear crankcase service cover",0,0,W*22),L=jn(79,76,18);Dn(L,0,0,12);for(const xe of[-28,28])for(const le of[-25,25])Dn(L,xe,le,2.4);d(gn(L,5,1.1),s,oe);const pe=jn(78,75,18),q=jn(71,68,16);pe.holes.push(new hn(q.getPoints(96).reverse())),d(gn(pe,2,.3),r,oe,0,0,W*3.3);const re=jn(65,61,13);Dn(re,0,0,14),d(gn(re,1.6,.7),l,oe,0,0,W*4.5),g(oe,16,2,a,0,0,W*6,10),y(oe,12.7,.55,r,0,0,W*7.2);for(const xe of[-28,28])for(const le of[-25,25]){const Me=p(oe,"Recessed cover screw",xe,le,W*4);W<0&&(Me.rotation.y=Math.PI),S(Me,0,0,0,2)}for(let xe=0;xe<5;xe++)x(oe,18,1.1,.4,a,0,-20+xe*2,W*5.5,.4);W>0&&T(oe,"ASTRA   /   AG–01",35,4,0,24,6.4),N.push(oe)}for(const W of[-14,14]){const oe=jn(65,66,16);Dn(oe,0,0,26),d(gn(oe,3,.7),a,A,0,0,W);for(const L of[-25,25])w(A,at(L,-22,-14),at(L,-22,14),2.2,r)}const k=p(A,"Crankshaft"),G=f(k,7,103,a);G.rotation.x=Math.PI/2;for(const W of[-9,9]){const oe=new nn;oe.absarc(0,-4,22,0,Bt),Dn(oe,0,13,7),d(gn(oe,6,1),a,k,0,0,W),g(k,7,1,r,0,22,W>0?13:-13,3.5)}const X=f(k,5.3,24,r,0,22,0);X.rotation.x=Math.PI/2;const F=p(k,"Flywheel",0,0,-48);g(F,43,9,a,0,0,0,32),y(F,41.8,.7,r,0,0,5),y(F,33,.45,r,0,0,5),g(F,12,15,s,0,0,0,7);for(let W=0;W<6;W++){const oe=p(F,"Flywheel spoke");oe.rotation.z=W*Bt/6,x(oe,8,26,6,s,0,23,0,3),S(F,9*Math.cos(W*Bt/6),9*Math.sin(W*Bt/6),8,1.2)}for(let W=0;W<60;W++){const oe=W*Bt/60,L=x(F,.4,W%5?1.4:2.7,.25,r,39*Math.sin(oe),39*Math.cos(oe),5,.12);L.rotation.z=-oe}const Z=p(A,"Connecting rod"),H=new nn;H.moveTo(-5,0),H.lineTo(-3.2,76),H.quadraticCurveTo(0,80,3.2,76),H.lineTo(5,0),H.closePath();const $=new hn;$.moveTo(-1.4,15),$.lineTo(-1.4,60),$.quadraticCurveTo(0,63,1.4,60),$.lineTo(1.4,15),$.closePath(),H.holes.push($),d(gn(H,4,.6),s,Z),g(Z,9,6,s,0,0,0,5.4),g(Z,6,7,r,0,76,0,3);for(const W of[-7,7])S(Z,W,-3,4,1.3);const Q=p(A,"Piston");f(Q,21.5,20,s,0,0,0);for(const W of[4.9,7.2,9.2]){const oe=y(Q,21.6,.43,a,0,W,0);oe.rotation.x=Math.PI/2}const V=f(Q,3,46,a,0,-2,0);V.rotation.x=Math.PI/2;for(const W of[-22,22])g(Q,4,.4,a,0,-2,W,2.5);f(Q,18,.25,r,0,10.1,0);const ee=[];for(const W of[-1,1]){const oe=p(A,"Sectioned finned cylinder",0,0,0),L=(q,re)=>{const xe=new nn,le=W>0?0:Math.PI;return xe.absarc(0,0,q,le+.025,le+Math.PI-.025,!1),xe.absarc(0,0,re,le+Math.PI-.025,le+.025,!0),xe.closePath(),xe},pe=d(gn(L(25,22.2),70,.25),a,oe,0,79,0);pe.rotation.x=-Math.PI/2;for(let q=0;q<12;q++){const re=d(gn(L(q===0||q===11?30:32,24.5),2.2,.55),s,oe,0,46+q*6,0);re.rotation.x=-Math.PI/2}for(const q of[-27,27])x(oe,5,72,5,a,q,79,W*9,1.2);ee.push(oe)}for(const W of[-27,27])for(const oe of[-18,18]){w(A,at(W,41,oe),at(W,120,oe),1.7,a);const L=p(A,"Cylinder stud nut",W,121,oe);L.rotation.x=-Math.PI/2,S(L,0,0,0,2.2)}const J=p(A,"Cylinder head",0,120,0);for(let W=0;W<3;W++){const oe=x(J,64,55,2.6,s,0,W*4,0,9,[[0,0,22.2],[-27,-18,2],[27,-18,2],[-27,18,2],[27,18,2]]);oe.rotation.x=-Math.PI/2}const ve=p(A,"Obsidian rocker cover",0,153,0),Oe=x(ve,65,43,8,o,0,0,0,10);Oe.rotation.x=-Math.PI/2;const he=x(ve,66,44,1,r,0,-4,0,10,[[0,0,10]]);he.rotation.x=-Math.PI/2;const K=T(ve,"AG–01  /  OHV",37,5,0,4.7,0);K.rotation.x=-Math.PI/2;for(const W of[-25,25]){const oe=p(ve,"Rocker cover screw",W,4.5,0);oe.rotation.x=-Math.PI/2,S(oe,0,0,0,2)}const fe=p(A,"Spark plug",1,132,-14);fe.rotation.x=-.32,f(fe,2.6,14,r);for(let W=0;W<5;W++)f(fe,3,1.2,s,0,2+W*1.7,0);f(fe,1.2,5,a,0,13,0);const ue=[];for(const[W,oe]of[[0,20],[48,40],[96,20]]){const L=p(W===96?v:A,oe===40?"40T cam gear":"20T drive gear",W===96?0:W,0,W===96?23:35),pe=lx(oe);if(Dn(pe,0,0,5.3),oe===40)for(let q=0;q<6;q++){const re=q*Bt/6;Dn(pe,20*Math.cos(re),20*Math.sin(re),6.3)}else for(let q=0;q<3;q++){const re=q*Bt/3;Dn(pe,10*Math.cos(re),10*Math.sin(re),2.2)}d(gn(pe,5,.18),s,L),g(L,8,7,a,0,0,0,3),S(L,0,0,4,2.7),ue.push(L)}const be=p(A,"Timing drive guard",47,0,44),_e=jn(129,78,21);Dn(_e,-47,0,11),Dn(_e,49,0,11);for(const W of[-18,-6,6,18]){const L=jn(5,37,2.4).getPoints(48).map(pe=>new we(pe.x+W,pe.y));_e.holes.push(new hn(L.reverse()))}d(gn(_e,2.5,.8),l,be);const Ie=jn(129,78,21);Ie.holes.push(new hn(jn(125,74,19).getPoints(96).reverse())),d(gn(Ie,.65,.2),r,be,0,0,2.05);for(const W of[-51,51])for(const oe of[-25,25])S(be,W,oe,2.3,2);T(be,"TIMING  /  2:1",35,4,0,-27,2.7);const Ze=[],Le=[],de=[],P=[],z=[],ne=f(A,4,48,a,48,0,9);ne.rotation.x=Math.PI/2;for(let W=0;W<2;W++){const oe=W?10:-10,L=W?-8:7,pe=W?32:25,q=pe-oe,re=48-pe,xe=p(A,W?"Exhaust cam":"Intake cam",48,0,L),le=[];for(let Pt=0;Pt<=256;Pt++){const zt=Pt/256*Bt,At=(-2*(zt-Math.PI/2)%(2*Bt)+2*Bt)%(2*Bt),tn=W?3*Math.PI:0,It=W?4*Math.PI:Math.PI,qi=8+(At>tn&&At<It?7*Math.sin(Math.PI*(At-tn)/(It-tn))**2:0)*re/q;le.push(new we(qi*Math.cos(zt),qi*Math.sin(zt)))}d(gn(new nn(le),5,.4),a,xe),Ze.push(xe),w(A,at(pe,142,L-5),at(pe,142,L+5),3,a);const Me=p(A,"Rocker arm",pe,142,L);x(Me,q+re+7,5,5,s,(re-q)/2,0,0,2.4,[[-(re-q)/2,0,2]]),g(Me,4.5,6,r,0,0,0,2.3),S(Me,0,0,4,1.7),Le.push({group:Me,arm:q,pushArm:re,vx:oe,pivotX:pe,z:L});const Ee=p(A,W?"Exhaust valve":"Intake valve",oe,0,L);f(Ee,1.5,28,r,0,128,0),f(Ee,6.3,1.8,a,0,114,0),f(Ee,4.3,1.4,r,0,137,0),P.push(Ee);const Qe=[];for(let Pt=0;Pt<=200;Pt++){const zt=Pt/200*Bt*8;Qe.push(at(Math.cos(zt)*3.5,Pt/200,Math.sin(zt)*3.5))}const rt=d(new Fr(new Xa(Qe),160,.53,6,!1),a,A,oe,121,L);z.push(rt),de.push(w(A,at(48,8,L),at(48,142,L),1.35,r)),x(A,17,8,8,a,46,78,L,2,[[2,0,2]])}x(v,31,38,5,o,0,-23,0,6,[[0,0,7]]);const ye=x(v,44,35,5,s,0,-45,0,4,[[-15,-10,2],[15,-10,2],[-15,10,2],[15,10,2]]);ye.rotation.x=-Math.PI/2;for(const W of[12,26])f(v,6,6,a,0,W,0);f(v,3,99,r,0,46,0);const Ae=f(v,4,27,a,0,0,10);Ae.rotation.x=Math.PI/2;function Te(W){const oe=p(W,"1:1 miter gear");d(new Ct(5,11,6,64),a,oe);for(let L=0;L<20;L++){const pe=L*Bt/20,q=x(oe,2,6,2,r,8*Math.sin(pe),0,8*Math.cos(pe),.45);q.rotation.y=pe,q.rotation.x=.6}return oe}const Fe=Te(v);Fe.position.set(0,0,7),Fe.rotation.x=Math.PI/2;const Be=Te(v);Be.position.y=7;const O=p(v,"Governor flyweight rotor");f(O,5.3,6,a,0,83,0),x(O,14,5,5,s,0,83,0,2),f(O,4,4,r,0,88,0);const Xe=[],qe=[];for(const W of[-1,1]){const oe=d(new fs(7,40,28),a,O);Xe.push(oe);const L=w(O,at(0,83,0),at(W*21,60,0),1.9,r),pe=w(O,at(W*21,60,0),at(0,37,0),1.5,s);qe.push({upper:L,lower:pe,side:W});const q=g(O,3,4,r,W*21,60,0,1);oe.userData.pin=q}const C=p(v,"Sliding collar and thrust bearing");f(C,6,8,s);for(const W of[-3.5,3.5]){const oe=y(C,6,.6,r,0,W,0);oe.rotation.x=Math.PI/2}f(C,7.2,2,a,0,-1,0);const b=p(v,"Stationary collar fork");for(const W of[-7,7])x(b,17,2.5,2,a,5,0,W,1);w(b,at(13,0,-7),at(13,0,7),1.5,r);const _=p(v,"Feedback bellcrank",30,37,8);x(_,30,3.3,3,h,-10,0,0,1.5),x(_,3.3,18,3,h,0,7,0,1.5),g(_,3.6,5,a,0,0,0,1.5),S(_,0,0,3,1.5),w(v,at(30,18,8),at(30,37,8),2,a),w(_,at(0,15,0),at(0,15,10),1.2,r);const I=w(v,at(21,44,8),at(37,67,8),1.35,h),B=p(v,"Throttle / butterfly body",52,79,8),se=g(B,11,15,s,0,0,0,8.4);se.rotation.y=Math.PI/2;const me=y(B,10.5,.5,r,8,0,0);me.rotation.y=Math.PI/2;const j=p(B,"Throttle butterfly"),ae=g(j,8,1,a);ae.rotation.y=Math.PI/2,w(j,at(0,0,-10),at(0,0,10),1.1,r);const ge=p(B,"Throttle actuating lever",0,0,10);x(ge,3,13,2,h,0,-5,0,1.4),S(ge,0,0,2,1.4);const Se=[at(140,79,20),at(130,100,-13),at(96,115,-23),at(36,117,-23),at(23,116,-10)];d(new Fr(new Xa(Se),100,6,32,!1),o,A);for(const W of[39,94]){const oe=y(v,3.2,.7,a,0,W,0);oe.rotation.x=Math.PI/2}T(v,"ω  /  FEEDBACK",25,3.3,0,-31,3);const Re=[...N,be,ve,J,...ee,R].map((W,oe)=>({part:W,i:oe,rotation:W.rotation.clone()}));function Ce(W,oe=null,L=0,pe={}){const q=nd(W),re=oe===null?q:{...nd(oe),covers:q.covers,cylinder:q.cylinder,isolate:q.isolate,t:q.t},{theta:xe,covers:le,cylinder:Me}=re,Ee=pe.retainEngine?0:re.isolate;k.rotation.z=-xe,ue[0].rotation.z=-xe,ue[1].rotation.z=xe/2+Math.PI/40,ue[2].rotation.z=-xe,Q.position.y=re.pistonY+2,Z.position.set(re.crankX,re.crankY,0),Z.rotation.z=Math.atan2(re.crankX,re.pistonY-re.crankY);for(let At=0;At<2;At++){const tn=At?re.exhaust:re.intake,It=Le[At];Ze[At].rotation.z=xe/2;const Rn=Math.asin(tn/It.arm);It.group.rotation.z=Rn,P[At].position.x=It.pivotX-It.arm*Math.cos(Rn),P[At].position.y=-tn,z[At].scale.y=16-tn;const qi=at(It.pivotX+It.pushArm*Math.cos(Rn),142+It.pushArm*Math.sin(Rn),It.z);E(de[At],at(qi.x,8+tn*It.pushArm/It.arm,It.z),qi)}N[0].position.set(-16*le,0,-22-42*le),N[1].position.set(-22*le,-4*le,22+55*le),be.position.set(47+21*le,0,44+69*le),ve.position.y=153+50*le,J.position.y=120+37*Me,ee[0].position.set(-39*Me,5*Me,-22*Me),ee[1].position.set(-49*Me,5*Me,40*Me),R.position.y=-22*Me,A.position.x=-1200*Ee,A.visible=Ee<.999,A.position.y=-24*Ee,v.position.set(96-40*Ee,12*Ee,12+16*Ee);const Qe=Math.max(0,Math.min(1,pe.spread||0));v.position.x+=90*Qe,N[0].position.x-=70*Qe,N[1].position.x+=35*Qe,be.position.z+=70*Qe,ve.position.y+=55*Qe,J.position.y+=25*Qe,ee[0].position.x-=55*Qe,ee[1].position.z+=60*Qe,O.rotation.y=xe,Fe.rotation.z=-xe,Be.rotation.y=xe,Xe.forEach((At,tn)=>{const It=tn?1:-1;At.position.set(It*re.governorRadius,83-re.governorHeight,0),At.userData.pin.position.copy(At.position),At.userData.pin.position.z=7}),qe.forEach(({upper:At,lower:tn,side:It})=>{const Rn=at(It*re.governorRadius,83-re.governorHeight,0);E(At,at(0,83,0),Rn),E(tn,Rn,at(0,re.sleeveY,0))}),C.position.y=re.sleeveY,b.position.y=re.sleeveY;const rt=re.bellAngle;_.rotation.z=rt,j.rotation.z=-re.throttle,ge.rotation.z=re.throttleAngle;const Pt=at(re.feedbackX,re.feedbackY,18),zt=at(52+10*Math.sin(re.throttleAngle),79-10*Math.cos(re.throttleAngle),18);E(I,Pt,zt);for(const{part:At,i:tn,rotation:It}of Re)At.rotation.copy(It),At.position.y+=Math.sin(L*.55+tn*1.4)*le*.7,At.rotation.z+=Math.sin(L*.38+tn*1.9)*le*.003;return i.userData.state=re,re}Ce(0);function Pe(){for(const W of m)W.dispose();for(const W of Object.values(n))W.dispose();for(const W of u)W.dispose();i.removeFromParent()}return{group:i,update:Ce,dispose:Pe}}const hx=i=>pt.clamp(Number.isFinite(i)?i:0,0,1),vr=(i,e,t)=>pt.smootherstep(i,e,t);function zs(i,e,t){const n=new nn,s=-i/2,r=-e/2;return n.moveTo(s+t,r),n.lineTo(s+i-t,r),n.quadraticCurveTo(s+i,r,s+i,r+t),n.lineTo(s+i,r+e-t),n.quadraticCurveTo(s+i,r+e,s+i-t,r+e),n.lineTo(s+t,r+e),n.quadraticCurveTo(s,r+e,s,r+e-t),n.lineTo(s,r+t),n.quadraticCurveTo(s,r,s+t,r),n}function Os(i,e,t,n,s=0,r=0){const a=zs(e,t,n).getPoints(6),o=new hn(a.reverse().map(l=>new we(l.x+s,l.y+r)));i.holes.push(o)}function dx(i,e,t,n){const s=new hn;s.absarc(e,t,n,0,Math.PI*2,!0),i.holes.push(s)}function Bs(i,e,t=.008){const n=Math.min(t,e/4),s=e-n*2,r=new On(i,{depth:s,bevelEnabled:n>0,bevelSize:n,bevelThickness:n,bevelSegments:2,curveSegments:10,steps:1});return r.translate(0,0,-s/2),r}function ux(){const e=new Uint8Array(16384);let t=73;for(let s=0;s<64;s++){t=Math.imul(t,1664525)+1013904223>>>0;for(let r=0;r<64;r++){const a=205+t%37,o=(s*64+r)*4;e[o]=e[o+1]=e[o+2]=a,e[o+3]=255}}const n=new us(e,64,64);return n.wrapS=n.wrapT=$i,n.repeat.set(2,5),n.needsUpdate=!0,n}function fx(){const i=new vt;i.name="Coordinated autonomous compute swarm";const e=ux(),t=new gt({color:"#a9b9bf",metalness:.86,roughness:.39,roughnessMap:e,bumpMap:e,bumpScale:35e-5,envMapIntensity:.7}),n=new gt({color:"#425e70",metalness:.8,roughness:.38,envMapIntensity:.75}),s=new gt({color:"#182634",metalness:0,roughness:.5}),r=new gt({color:"#185a64",metalness:.2,roughness:.45}),a=new gt({color:"#d6a269",metalness:.85,roughness:.33}),o=new gt({color:"#142c42",metalness:.25,roughness:.15}),l=new gt({color:"#88e6ee",emissive:"#2fc4e1",emissiveIntensity:.65,roughness:.35}),c=new gt({color:"#ffb267",emissive:"#f07535",emissiveIntensity:.45,roughness:.4}),h=[t,n,s,r,a,o,l,c],m=new Set,u=($,Q,V,ee=.015)=>new zi($,Q,V,2,ee);function d($,Q){const V=new vt;V.name=$,Q.add(V);const ee=new Map;return{group:V,add(J,ve,Oe=0,he=0,K=0,fe=0,ue=0,be=0){J.applyMatrix4(new yt().compose(new U(Oe,he,K),new cs().setFromEuler(new Ti(fe,ue,be)),new U(1,1,1)));const _e=ee.get(ve)||[];_e.push(J.index?J.toNonIndexed():J),J.index&&J.dispose(),ee.set(ve,_e)},finish(){for(const[J,ve]of ee){const Oe=eu(ve);ve.forEach(K=>K.dispose()),m.add(Oe);const he=new ht(Oe,J);he.name=`${$} — ${h.indexOf(J)}`,he.castShadow=!0,he.receiveShadow=!0,V.add(he)}return V}}}const p=d("Docking backplane with nine recessed contact sockets",i),x=zs(4.05,3.18,.19);for(let $=-1;$<=1;$++)for(let Q=-1;Q<=1;Q++)Os(x,.85,.45,.07,Q*1.3,$*.94);p.add(Bs(x,.14,.015),n,0,0,-.7);for(const $ of[-1.93,1.93])p.add(u(.1,2.9,.17),t,$,0,-.63);for(const $ of[-1.49,1.49])p.add(u(3.85,.065,.08),a,0,$,-.79);for(const $ of[-1.88,1.88])for(const Q of[-1.41,1.41])p.add(new Ct(.057,.057,.04,12),s,$,Q,-.6,Math.PI/2),p.add(new Ct(.029,.029,.043,8),t,$,Q,-.59,Math.PI/2);p.finish();const g=d("Nine dock recessed guides and power contacts",i),f=[];for(let $=0;$<9;$++){const Q=$%3-1,V=1-Math.floor($/3),ee=new vt;ee.name=`Agent ${$+1}: vented autonomous compute capsule`,i.add(ee);const J=d(`Agent ${$+1} hollow chassis, optical recess and PCB`,ee),ve=new nn;ve.moveTo(-.56,.3),ve.lineTo(-.56,-.215),ve.quadraticCurveTo(-.56,-.335,-.44,-.335),ve.lineTo(.44,-.335),ve.quadraticCurveTo(.56,-.335,.56,-.215),ve.lineTo(.56,.3),ve.quadraticCurveTo(.56,.335,.525,.335),ve.lineTo(.49,.335),ve.lineTo(.49,-.205),ve.quadraticCurveTo(.49,-.265,.43,-.265),ve.lineTo(-.43,-.265),ve.quadraticCurveTo(-.49,-.265,-.49,-.205),ve.lineTo(-.49,.335),ve.lineTo(-.525,.335),ve.quadraticCurveTo(-.56,.335,-.56,.3),J.add(Bs(ve,.63,.009),t);const Oe=zs(1.09,.65,.105);Os(Oe,.99,.55,.075),J.add(Bs(Oe,.025,.003),s,0,0,.331);const he=zs(1.055,.595,.085);dx(he,-.265,.035,.115),Os(he,.255,.105,.026,.22,-.095),Os(he,.19,.045,.018,.23,.12),J.add(Bs(he,.065,.007),n,0,0,.36),J.add(new ps(.097,.013,6,24),a,-.265,.035,.37),J.add(new Ct(.085,.085,.022,24),o,-.265,.035,.34,Math.PI/2),J.add(new Ct(.038,.038,.018,20),l,-.265,.035,.355,Math.PI/2),J.add(u(.18,.025,.018,.009),l,.23,.12,.35),J.add(u(.23,.07,.025,.012),s,.22,-.095,.334);for(let _e=0;_e<5;_e++)J.add(u(.023,.03,.025,.003),a,.135+_e*.04,-.095,.355);J.add(u(.89,.04,.51),r,0,-.14,-.018),J.add(u(.32,.065,.29,.015),s,-.16,-.089,-.01),J.add(u(.29,.03,.27,.01),a,-.16,-.043,-.01);for(let _e=0;_e<7;_e++)J.add(u(.025,.115,.235,.003),t,-.28+_e*.04,.025,-.01);for(const _e of[-.16,-.055,.05,.155])J.add(u(.19,.043,.069,.005),s,.27,-.095,_e);for(const _e of[-.41,.41])for(const Ie of[-.2,.2])J.add(new Ct(.025,.025,.08,8),a,_e,-.08,Ie),J.add(new Ct(.032,.032,.018,8),n,_e,-.027,Ie);for(const _e of[-.42,.42])for(const Ie of[-.225,.225])J.add(new Ct(.033,.033,.018,12),t,_e,Ie,.404,Math.PI/2),J.add(u(.032,.007,.005,.001),s,_e,Ie,.415);const K=zs(1.04,.59,.08);Os(K,.65,.17,.025,0,-.02),J.add(Bs(K,.04,.004),n,0,0,-.318);for(let _e=0;_e<6;_e++)J.add(u(.045,.105,.15,.008),a,-.25+_e*.1,-.02,-.365);J.finish();const fe=new vt;fe.name=`Agent ${$+1} reversible hinged perforated lid`,fe.position.set(0,.343,-.31),ee.add(fe);const ue=d(`Agent ${$+1} pierced cover and machined hinge`,fe),be=zs(1.08,.6,.095);for(let _e=0;_e<6;_e++)Os(be,.065,.36,.025,-.285+_e*.114,0);ue.add(Bs(be,.048,.004),t,0,0,.3,-Math.PI/2);for(const _e of[-.35,.35])ue.add(new Ct(.043,.043,.18,12),n,_e,-.008,0,0,0,Math.PI/2);ue.finish(),g.add(u(1.13,.1,.63),s,Q*1.3,V*.94-.385,-.34);for(const _e of[-1,1])g.add(u(.07,.54,.38),n,Q*1.3+_e*.57,V*.94,-.43);g.add(u(.66,.26,.09),s,Q*1.3,V*.94,-.73);for(let _e=0;_e<6;_e++)g.add(u(.045,.09,.03,.004),a,Q*1.3-.25+_e*.1,V*.94,-.675);f.push({root:ee,hinge:fe,col:Q,row:V,dock:new U(Q*1.3,V*.94,-.54),target:new U(Q*2.35+(V===0?.12:0),V*1.73,.5+$%3*.22)})}g.finish();const w=d("Permission perimeter with isolated escalation gate",i);for(const $ of[-2.26,2.26])w.add(u(6.45,.026,.026,.007),n,0,$,-.42);w.add(u(.026,4.52,.026,.007),n,-3.225,0,-.42);for(const $ of[-3.225,3.225])for(const Q of[-2.26,2.26])w.add(u(.16,.16,.045,.025),l,$,Q,-.42);w.finish();const E=d("Permission gate opens for the exceptional agent",i);E.add(u(.032,4.36,.032,.009),c),E.finish();const y=20,S=new Float32Array(9*y*2*3),T=new St;T.setAttribute("position",new fn(S,3).setUsage(Mr)),m.add(T);const A=new Js({color:"#64c9d4",transparent:!0,opacity:.38,depthWrite:!1}),v=new Id(T,A);v.name="Nine independently routed task signals",v.frustumCulled=!1,i.add(v);const R=u(.055,.055,.13,.012);m.add(R);const D=new ki(R,l,18);D.name="Travelling task packets",D.frustumCulled=!1,i.add(D);const N=new kt,k=new U,G=new U,X=new U;let F={};function Z($,Q,V){const ee=$.dock,J=$.root.position,ve=1-Q;V.set(ve*ve*ve*ee.x+3*ve*Q*Q*J.x+Q*Q*Q*J.x,ve*ve*ve*ee.y+3*ve*ve*Q*ee.y+3*ve*Q*Q*J.y+Q*Q*Q*J.y,ve*ve*ve*ee.z+3*ve*ve*Q*(ee.z-.32)+3*ve*Q*Q*(J.z-.75)+Q*Q*Q*(J.z-.4)),V.x+=3*ve*ve*Q*ee.x}function H($,Q=0){const V=hx($),ee=Number.isFinite(Q)?Q:0,J=vr(V,.12,.65),ve=vr(V,.38,.84),Oe=vr(V,.77,1);f.forEach((he,K)=>{const fe=vr(V,.12+K*.012,.63+K*.012),ue=fe*.055;he.root.position.set(he.col*1.3+(he.target.x-he.col*1.3)*fe+Math.sin(ee*.21+K*1.9)*ue,he.row*.94+(he.target.y-he.row*.94)*fe+Math.sin(ee*.26+K*1.4)*ue,-.05+(he.target.z+.05)*fe+Math.sin(ee*.18+K)*ue),K===5&&(he.root.position.x+=Oe*.47,he.root.position.z+=Oe*.48),he.root.rotation.set(-.08*fe+Math.sin(ee*.19+K)*.017*fe,-he.col*.11*fe+Math.sin(ee*.16+K*2)*.025*fe,he.col*.045*fe),he.hinge.rotation.x=-1.23*vr(V,.38+K*.008,.82+K*.008);for(let be=0;be<y;be++){const _e=(K*y+be)*6;Z(he,be/y,G),Z(he,(be+1)/y,X),G.toArray(S,_e),X.toArray(S,_e+3)}for(let be=0;be<2;be++){const _e=((ee*.058+K*.137+be*.5)%1+1)%1;Z(he,_e,G),Z(he,Math.min(1,_e+.008),k),N.position.copy(G),N.lookAt(k),N.scale.setScalar(J),N.updateMatrix(),D.setMatrixAt(K*2+be,N.matrix)}}),E.group.position.set(3.225+Oe*.2,0,-.42-Oe*.5),E.group.rotation.y=Oe*.6,w.group.visible=V>.27,E.group.visible=V>.27,v.visible=J>.001,D.visible=v.visible,A.opacity=.12+J*.27,T.attributes.position.needsUpdate=!0,D.instanceMatrix.needsUpdate=!0,F={progress:V,release:J,lidOpening:ve,permissionBreach:Oe,agentCount:f.length,capsules:f.map(he=>({position:he.root.position.toArray(),rotation:he.root.rotation.toArray().slice(0,3),lidAngle:he.hinge.rotation.x})),gatePosition:E.group.position.toArray()}}return H(0,0),{group:i,update:H,get state(){return F},dispose(){m.forEach($=>$.dispose()),h.forEach($=>$.dispose()),A.dispose(),e.dispose(),i.clear(),i.removeFromParent()}}}const ni=(i,e,t)=>pt.smootherstep(i,e,t),Ya=i=>pt.clamp(Number.isFinite(i)?i:0,0,1);function $t(i,e,t=.08){const n=new nn,s=-i/2,r=-e/2;return n.moveTo(s+t,r),n.lineTo(s+i-t,r),n.quadraticCurveTo(s+i,r,s+i,r+t),n.lineTo(s+i,r+e-t),n.quadraticCurveTo(s+i,r+e,s+i-t,r+e),n.lineTo(s+t,r+e),n.quadraticCurveTo(s,r+e,s,r+e-t),n.lineTo(s,r+t),n.quadraticCurveTo(s,r,s+t,r),n}function Un(i,e,t,n=.05,s=0,r=0){const o=$t(e,t,n).getPoints(12).map(l=>new we(l.x+s,l.y+r));return i.holes.push(new hn(o.reverse())),i}function Xs(i,e,t,n){const s=new hn;return s.absarc(e,t,n,0,Math.PI*2,!0),i.holes.push(s),i}function Xt(i,e=.12,t=.012){const n=Math.min(t,e/4),s=e-n*2,r=new On(i,{depth:s,bevelEnabled:!0,bevelSize:n,bevelThickness:n,bevelSegments:3,curveSegments:12,steps:1});return r.translate(0,0,-s/2),r}function st(i,e,t,n=0,s=0,r=0){const a=new ht(e,t);return a.position.set(n,s,r),a.castShadow=a.receiveShadow=!0,i.add(a),a}function ft(i,e,t,n,s,r=0,a=0,o=0,l=.035){return st(i,new zi(e,t,n,2,Math.min(l,e/4,t/4,n/4)),s,r,a,o)}function Dt(i,e){const t=new vt;return t.name=e,i.add(t),t}function px(){const e=new Uint8Array(65536);let t=71;const n=()=>(t=Math.imul(t,1664525)+1013904223>>>0)/4294967296;for(let r=0;r<128;r++){const a=n();for(let o=0;o<128;o++){const l=(r*128+o)*4,c=208+Math.floor(32*(.85*a+.15*n()));e[l]=e[l+1]=e[l+2]=c,e[l+3]=255}}const s=new us(e,128,128);return s.wrapS=s.wrapT=$i,s.repeat.set(2,5),s.needsUpdate=!0,s}function fc(i="#c59a64"){const e=px();return{metal:new gt({color:"#919eaa",metalness:.78,roughness:.4,roughnessMap:e,bumpMap:e,bumpScale:6e-4}),dark:new gt({color:"#293640",metalness:.15,roughness:.48}),edge:new gt({color:"#566b76",metalness:.7,roughness:.34,roughnessMap:e}),accent:new gt({color:i,metalness:.72,roughness:.36}),ink:new gt({color:"#dae5e8",metalness:.15,roughness:.42}),signal:new gt({color:"#9ce5db",emissive:"#54bbaa",emissiveIntensity:.65,roughness:.35})}}function pc(i){const e=new Set;i.traverse(t=>{t.geometry&&e.add(t.geometry);for(const n of[t.material].flat().filter(Boolean)){e.add(n);for(const s of Object.values(n))s?.isTexture&&e.add(s)}}),e.forEach(t=>t.dispose()),i.clear(),i.removeFromParent()}function mx(){const i=new vt;i.name="Provenance cartridge archive";const e=fc(),t=Dt(i,"Archive rack enclosure"),n=Dt(t,"Archive chassis"),s=[],r=[],a=[],o=[],l=Xt(Xs($t(.11,.11,.045),0,0,.017),.035,.005),c=new Ct(.027,.027,1.7,10),h=Xt($t(2.6,1.12,.075),.035,.005);for(const y of[-.86,.84]){const S=Un($t(3.8,3.28,.15),3.38,2.89,.1);for(const T of[-1.77,1.77])for(const A of[-1.49,1.49])Xs(S,T,A,.04);st(n,Xt(S,.13),e.metal,0,0,y);for(const T of[-1.77,1.77])for(const A of[-1.49,1.49])st(n,l,e.edge,T,A,y+.085)}ft(n,3.58,.16,1.66,e.dark,0,-1.53,0);for(const y of[-1.72,1.72])ft(n,.11,2.96,1.72,e.edge,y,0,0);for(const y of[-1.45,1.45])ft(n,.37,.18,.9,e.dark,y,-1.72,-.05);const m=Dt(t,"Vented archive service lid"),u=$t(3.58,1.68,.1);for(let y=0;y<9;y++)Un(u,.11,1.12,.045,(y-4)*.3,0);st(m,Xt(u,.11),e.metal).rotation.x=-Math.PI/2,m.position.y=1.58;for(const y of[-1,1]){const S=Dt(t,y<0?"Left archive service panel":"Right archive service panel"),T=Un($t(1.62,2.82,.09),1.15,1.8,.1);st(S,Xt(T,.11),e.metal).rotation.y=Math.PI/2,ft(S,.065,1.86,1.19,e.dark,-.035*y,0,0),S.position.x=y*1.85,o.push({side:S,sign:y})}const d=Xt(Un($t(3.18,1.48,.1),2.84,1.19,.07),.085),p=$t(3.19,.49,.07);Un(p,1,.14,.055,.05,-.055);const x=Xt(p,.13),g=new Ct(.052,.052,.22,16),f=new Yn(.06,.025,.05);for(let y=0;y<4;y++){const S=(y-1.5)*.69;for(const D of[-1.6,1.6]){const N=st(n,c,e.accent,D,S-.18,0);N.rotation.x=Math.PI/2}const T=Dt(i,`Archive cartridge ${y+1}`);s.push(T),st(T,d,e.edge,0,-.16,0).rotation.x=-Math.PI/2,st(T,x,e.metal,0,0,.8),ft(T,.33,.15,.025,e.accent,-1.19,.025,.885);for(let D=0;D<=y;D++)ft(T,.023,.073,.028,e.dark,-1.29+D*.055,.025,.905);ft(T,.23,.055,.022,e.signal,1.18,.025,.885);const A=Dt(T,`Layered provenance records ${y+1}`);r.push(A);for(let D=0;D<3;D++)st(A,h,D===2?e.accent:D===1?e.ink:e.dark,0,-.13+D*.065,-.055).rotation.x=-Math.PI/2;for(let D=0;D<5;D++)ft(A,2.32-D*.18,.013,.022,e.edge,-.08,.022,-.44+D*.19);const v=Dt(T,`Optical scan head ${y+1}`);a.push(v),ft(v,.21,.11,1.13,e.dark,0,.16,-.05);for(const D of[-.42,.35])st(v,g,e.edge,0,.16,D).rotation.z=Math.PI/2;ft(v,.028,.016,.96,e.signal,0,.097,-.05);const R=st(A,f,e.signal,0,.04,-.06);A.userData.packet=R}let w;function E(y,S=0,T={}){y=Ya(y);const A=Number.isFinite(S)?S:0,v=Ya(T?.cartridgesOnly??0),R=ni(v,0,.34),D=ni(v,.16,.88),N=ni(v,.24,1),k=ni(y,.12,.62),G=ni(y,.42,1);t.position.x=-20*N,t.visible=v<1,m.position.y=1.58+.66*k,o.forEach(({side:X,sign:F})=>X.position.x=F*(1.85+.47*k)),s.forEach((X,F)=>{const Z=ni(y,.18+F*.055,.8+F*.04);X.position.set((F%2?1:-1)*.28*G,(F-1.5)*(.69+.2*G),.87*Z),X.position.x=pt.lerp(X.position.x,(F-1.5)*1.75,D),X.position.y=pt.lerp(X.position.y,.5,D),X.position.z=pt.lerp(X.position.z,1.3,R),X.scale.setScalar(pt.lerp(1,.52,D)),X.rotation.set(.65*D,(F-1.5)*-.055*D,0);const H=pt.lerp(G,1.05,D);r[F].position.y=.19*H,a[F].position.x=Math.sin(A*.27+F*.9)*.99,a[F].position.y=.19*H,r[F].userData.packet.position.x=Math.sin(A*.22+F*.7)*.93}),w={progress:y,service:k,inspect:G,time:A,cartridgesOnly:v,extraction:R,row:D,rackPosition:t.position.toArray(),rackVisible:t.visible,cartridges:s.map(X=>X.position.toArray()),cartridgeScale:s[0].scale.x,scanHeads:a.map(X=>X.position.x)}}return E(0),{group:i,update:E,get state(){return w},dispose:()=>pc(i)}}function gx(){const i=new vt;i.name="Distribution calibration bench";const e=fc("#76b9bb"),t=Dt(i,"Isolated metrology base"),n=Dt(i,"Comparator bridge"),s=$t(4.4,2.7,.22);for(const d of[-1.8,1.8])for(const p of[-.95,.95])Xs(s,d,p,.1);st(t,Xt(s,.23),e.metal,0,-.65,0).rotation.x=-Math.PI/2;for(const d of[-1.8,1.8])for(const p of[-.95,.95])st(t,new Ct(.16,.19,.25,20),e.dark,d,-.83,p);const r=[],a=[],o=[],l=[];for(const d of[-1.12,1.12]){const p=Dt(i,d<0?"Reference sample carousel":"Observed sample carousel");p.position.x=d,r.push(p),st(p,new Ct(.91,.91,.25,48),e.dark,0,-.4,0);const x=st(p,new ps(.87,.035,10,64),e.edge,0,-.25,0);x.rotation.x=Math.PI/2;const g=Dt(p,"Indexed specimen rotor");l.push(g),st(g,new Ct(.77,.77,.08,48),e.metal,0,-.23,0);for(let y=0;y<8;y++){const S=y*Math.PI/4,T=st(g,new Ct(.15,.15,.1,20),e.dark,Math.cos(S)*.56,-.15,Math.sin(S)*.56);st(g,new Ct(.1,.1,.07,20),y%3===0?e.accent:e.ink,T.position.x,-.08,T.position.z)}const f=Dt(i,"Removable optical head");a.push(f),f.position.x=d;const w=Un($t(1.94,1.94,.3),1.55,1.55,.3);st(f,Xt(w,.12),e.metal,0,.5,0).rotation.x=-Math.PI/2;for(const y of[-.76,.76])ft(f,1.4,.035,.05,e.signal,0,.57,y);const E=Dt(i,"Reciprocating inspection probe");E.position.x=d,o.push(E),st(E,new Ct(.11,.11,.65,24),e.edge,0,.83,0),st(E,new Ct(.17,.11,.19,24),e.dark,0,.41,0),st(E,new Ct(.085,.085,.028,24),e.signal,0,.3,0)}for(const d of[-2,2])ft(n,.16,1.55,.22,e.metal,d,.24,-.85),ft(n,.05,1.12,.03,e.accent,d,.26,-.71);ft(n,4.15,.27,.32,e.metal,0,1.05,-.85);const c=Dt(i,"Comparator measurement electronics");ft(c,.98,.53,.25,e.dark,0,.54,-.66);const h=[];for(let d=0;d<7;d++){const p=ft(c,.075,.25,.025,e.signal,(d-3)*.115,.54,-.52);h.push(p)}let m;function u(d,p=0){d=Ya(d);const x=ni(d,.2,1);n.position.set(0,x*1.8,-x*.8),c.position.set(0,x*1.2,x*.3),r.forEach((g,f)=>{g.position.x=(f?1:-1)*(1.12+x*.65),g.position.y=-x*.25,l[f].rotation.y=p*.23*(f?-.8:1)}),a.forEach((g,f)=>{g.position.set((f?1:-1)*(1.12+x*.72),x*1.5,x*.55),g.rotation.z=(f?1:-1)*x*.24}),o.forEach((g,f)=>{g.position.set((f?1:-1)*(1.12+x*.65),x*2.3+Math.sin(p*.65+f)*.055,0)}),h.forEach((g,f)=>g.scale.y=.45+.45*(.5+.5*Math.sin(p*.7+f*.8))),m={progress:d,open:x,carousel:l[0].rotation.y}}return u(0),{group:i,update:u,get state(){return m},dispose:()=>pc(i)}}function vx(){const i=new vt;i.name="Delegation credential instrument";const e=fc("#c69a70"),t=[],n=[],s=[],r=[],a=[],o=[],l=[],c=[],h=[],m=[],u=new gt({color:"#244e50",metalness:.24,roughness:.5}),d=new En({color:"#91bbc6",metalness:0,roughness:.24,transparent:!0,opacity:.1,depthWrite:!1,side:kn}),p=e.edge.clone(),x=e.accent.clone(),g=e.signal.clone();p.color.set("#a6bdc8"),p.emissive.set("#648594"),p.emissiveIntensity=.08;const f=[p,x,g];f.forEach(he=>{he.transparent=!0,he.opacity=0});const w=Dt(i,"Identity instrument docking cradle"),E=$t(2.06,1.73,.13);for(const he of[-.7,.7])Un(E,.15,1.16,.06,he,0);st(w,Xt(E,.16),e.edge,0,-1.5,0).rotation.x=-Math.PI/2;for(const he of[-.77,.77])ft(w,.16,.22,1.56,e.dark,he,-1.6,0);const y=Un($t(1.68,2.66,.19),1.18,1.94,.13,0,.04);for(const he of[-.66,.66])for(const K of[-1.16,1.16])Xs(y,he,K,.041);const S=Xt(y,.19,.022),T=Xt(Un($t(1.23,1.99,.14),1.12,1.88,.1),.07,.008),A=Xt(Xs($t(.1,.1,.04),0,0,.014),.03,.004),v=$t(.31,.31,.07);Xs(v,0,0,.077);const R=Xt(v,.047,.008),D=$t(.93,1.43,.08);Un(D,.33,.1,.045,0,.54);const N=Xt(D,.08,.009),k=new Ct(.014,.014,1,8),G=new fs(.033,10,8),X=Xt(Un($t(.96,1.6,.09),.25,.1,.035,0,.64),.045,.007),F=Xt($t(.038,.075,.014),.025,.004),Z=Xt(Un($t(1.84,2.83,.17),1.64,2.61,.13),.09,.01),H=Xt($t(1.66,2.63,.13),.035,.006),$=["Authority root","Delegated scope","Runtime credential"];for(let he=0;he<3;he++){const K=Dt(i,`${$[he]} gate`);t.push(K),st(K,S,he===0?e.accent:e.metal);const fe=Dt(K,`${$[he]} locating bezel`);o.push(fe),st(fe,T,e.dark,0,.04,.12);for(const P of[-.66,.66])for(const z of[-1.16,1.16])st(K,A,e.edge,P,z,.12);const ue=[];for(const P of[-1,1]){const z=Dt(K,`${$[he]} ${P<0?"left":"right"} guide rail`);ft(z,.08,1.61,.27,e.edge,0,-.04,-.06);for(const ne of[-.67,.6])ft(z,.13,.065,.15,e.accent,0,ne,.06);ue.push({rail:z,sign:P})}c.push(ue);const be=Dt(K,`${$[he]} secure processor backplane`);a.push(be),st(be,X,u),ft(be,.39,.38,.075,e.dark,.09,.12,.061),ft(be,.24,.23,.025,e.edge,.09,.12,.106);for(let P=0;P<5;P++)ft(be,.022,.075,.026,e.accent,-.06+P*.075,-.11,.057),ft(be,.024,.29+P*.032,.013,e.accent,-.32+P*.14,-.39,.028);for(const P of[-.66,.62])st(be,A,e.edge,-.32,P,.045);for(let P=0;P<=he;P++)ft(K,.105,.15,.13,e.accent,(P-he/2)*.22,-1.36,0);ft(K,.57-he*.09,.065,.025,e.signal,0,1.16,.12);const _e=Dt(K,`${$[he]} signed credential plate`);n.push(_e),st(_e,N,e.ink),st(_e,R,e.accent,-.22,.27,.066);for(let P=0;P<4;P++)ft(_e,.63-(P+he)%3*.09,.023,.012,e.edge,-.015,.02-P*.115,.049);for(let P=0;P<5;P++)ft(_e,.045,.072+P%2*.035,.013,e.accent,-.25+P*.12,-.5,.05);ft(_e,.78,.085,.1,e.dark,0,-.78,0);const Ie=Dt(K,`${$[he]} credential latch`);ft(Ie,.43,.12,.22,e.edge,0,.89,.04),ft(Ie,.16,.03,.07,e.accent,0,.967,.06),l.push(Ie);for(let P=0;P<6;P++){const z=e.signal.clone();ft(K,.064,.105,.038,e.dark,.697,.6-P*.21,.106),st(K,F,z,.697,.6-P*.21,.138),m.push({material:z,gate:he,index:P})}const Ze=st(K,G,e.signal,-.64,.65,.13);s.push(Ze);const Le=Dt(K,`${$[he]} protective shield`);h.push(Le),st(Le,Z,p);const de=st(Le,H,d,0,0,-.025);de.castShadow=!1;for(const P of[-1,1]){ft(Le,.075,2.65,.64,p,P*.865,0,-.3);for(const z of[-1.2,1.2])st(Le,A,x,P*.84,z,.064);ft(Le,.038,.38,.028,g,P*.872,.69,.065)}if(he<2){const P=Dt(i,`Signed delegation path ${he+1}`),z=st(P,k,e.accent),ne=st(P,G,e.signal);r.push({bridge:P,line:z,packet:ne})}}const Q=new U,V=new U,ee=new U,J=new U(0,1,0);let ve;function Oe(he,K=0,fe={}){he=Ya(he);const ue=Number.isFinite(K)?K:0,be=ni(he,.08,.4),_e=ni(he,.42,.75),Ie=ni(he,.79,1),Ze=_e*(1-.85*Ie);t.forEach((Le,de)=>{Le.position.set((de-1)*(1.78+.17*Ie)*be,(1-de)*.43*be,(1-de)*.55*(1-.75*Ie)),n[de].position.set(0,.16*Ze,.2+.83*Ze),a[de].position.set(0,-.13*Ze,-.14-.43*Ze),o[de].position.z=.39*Ze,l[de].position.y=.3*Ze,c[de].forEach(({rail:P,sign:z})=>P.position.x=z*(.59+.16*Ze)),s[de].position.y=.56+Math.sin(ue*.3+de*.9)*.13,h[de].position.set(0,.6*(1-Ie),1.7-1.11*Ie),h[de].scale.setScalar(.85+.15*Ie),h[de].visible=Ie>0}),m.forEach(({material:Le,gate:de,index:P})=>{const z=.5+.5*Math.cos(ue*.65-P*.7-de*.6);Le.emissiveIntensity=.18+.78*z**3+.18*Ie}),d.opacity=.1*Ie,f.forEach(Le=>{Le.opacity=Ie,Le.depthWrite=Ie>.98}),w.position.y=-.32*_e,r.forEach(({bridge:Le,line:de,packet:P},z)=>{Q.copy(t[z].position).add(new U(.77,-.87,.02)),V.copy(t[z+1].position).add(new U(-.77,-.87,.02)),ee.subVectors(V,Q),de.position.copy(Q).add(V).multiplyScalar(.5),de.scale.set(1,ee.length(),1),de.quaternion.setFromUnitVectors(J,ee.normalize()),P.position.copy(Q).lerp(V,.5+Math.sin(ue*.37-z)*.45),Le.visible=be>.64}),ve={progress:he,delegation:be,inspection:_e,protection:Ie,serviceTravel:Ze,time:ue,gates:t.map(Le=>Le.position.toArray()),credentials:n.map(Le=>Le.position.toArray()),backplanes:a.map(Le=>Le.position.toArray()),shieldPositions:h.map(Le=>Le.position.toArray()),shieldsVisible:h.map(Le=>Le.visible),ledIntensity:m.map(Le=>Le.material.emissiveIntensity)}}return Oe(0),{group:i,update:Oe,get state(){return ve},dispose:()=>pc(i)}}const Br=(i,e=0,t=1)=>Math.max(e,Math.min(t,i)),ii=(i,e,t)=>{const n=Br((t-i)/(e-i));return n*n*(3-2*n)},Gi=(i,e,t)=>i+(e-i)*t,Za=["laptop","sealed","engine","swarm","memory","identity","assurance"],ct=(i,e,t,n,s,r,a=0,o={})=>({x:i,y:e,z:t,scale:n,turn:s,progress:r,tilt:a,spin:.35,opacity:1,fault:0,repair:0,cartridgesOnly:0,spread:0,...o}),yx={D1:{laptop:ct(3.8,-1.8,-2,.59,-.18,0,.12,{spin:.08})},"1.1":{laptop:ct(3.8,-1.5,0,.86,-.25,.34,.12,{spin:.1})},"1.2":{laptop:ct(6,2.35,-2,.38,-.25,.34,.12,{spin:1.05})},"1.3":{laptop:ct(6,2.35,-2,.38,-.25,.34,.12,{spin:1.05})},"1.4":{laptop:ct(3.5,-1.8,-1,.68,-.25,.92,.12,{spin:.55})},"1.5":{memory:ct(-3.5,-.3,0,1.1,-.4,.2,.1,{spin:.38})},"1.6":{memory:ct(4.9,2,-1,.98,-.22,.35,.1,{cartridgesOnly:1,spin:.16})},D2:{sealed:ct(4.5,-.8,0,.95,-.3,.025,.2,{fault:1})},"2A.0":{sealed:ct(4.3,-.6,0,1,-.3,.22,.22,{fault:1})},"2A.1":{sealed:ct(5.3,2.25,-2,.38,-.2,.8,.25,{fault:1})},"2A.2":{sealed:ct(4.2,-.4,0,.94,-.25,.18,.25,{fault:1})},"2A.4":{sealed:ct(4.5,.7,-1,.55,-.3,.23,.24,{fault:1,repair:1}),assurance:ct(4.7,-2.6,-1,.65,-.25,0,.15)},"2A.5":{assurance:ct(6,3.25,-2,.4,-.25,.2,.18)},"2A.6":{assurance:ct(4.8,-.6,-1,1,-.35,1,.15)},"2B.0":{memory:ct(4.7,-.3,-1,1.3,-.35,.08,.12,{spin:.65})},"2B.1":{memory:ct(4.7,-.1,0,1.25,-.35,.45,.12,{spin:.4})},"2B.2":{memory:ct(6.4,2.3,-3,.45,-.2,.72,.12)},"2B.3":{memory:ct(5,-.4,0,1.05,.25,1,.12)},"2C.0":{identity:ct(4.6,-.4,-1,1.22,-.35,.05,.12,{spin:.65})},"2C.1":{identity:ct(4.8,-.2,0,1.08,-.3,.4,.12,{spin:.45})},"2C.2":{identity:ct(5.1,-1,-1,.86,-.25,.75,.1,{spin:.45})},"2C.3":{identity:ct(5,-.4,0,1.05,.25,1,.12,{spin:.45})},"2D.0":{swarm:ct(4.7,-.4,-2,.85,-.35,.38,.12)},"2D.1":{swarm:ct(6.3,2.6,-3,.32,-.35,.6,.12)},"2D.2":{swarm:ct(4.9,-.3,0,.86,-.35,1,.12)},D4:{engine:ct(4.3,-1.9,-1,.72,-.5,.08)},"4.1":{engine:ct(3.8,-.7,0,1.05,-.22,.57)},"4.2":{engine:ct(0,-.3,-1,.63,-.22,.65)},"4.3":{engine:ct(5.9,2.5,-3,.43,-.35,.75,0,{spread:.25})},"4.4":{engine:ct(5.5,2.3,-3,.42,-.4,.95,0,{spread:.65})},"4.6":{engine:ct(6.2,3.2,-4,.29,-.5,1,0,{spread:1})},"4.7":{engine:ct(3.8,-.6,-1,.88,-.4,.65)}},tu=["day","atmosphere","rain","snow","cloud","storm","vortex","night","autumn","spring","aurora"];function xx(i){const e=Number(i.id.split(".")[1])||0,t=Object.fromEntries(tu.map(s=>[s,0]));let n;return i.section==="A"?n={day:.28+e*.025,atmosphere:3+Math.min(1,e/4),rain:.5+e*.08,cloud:1,storm:Math.min(1,e/3),vortex:e>=5?(e-4)/2:0}:i.section==="B"?n={day:.44+e*.022,atmosphere:5,snow:1,cloud:.38}:i.section==="C"?n={day:.54+e*.022,atmosphere:6,cloud:.025}:i.section==="D"?n={day:.64+e*.015,atmosphere:7+Math.max(0,e-2)/2,cloud:.035,autumn:Math.max(0,e-2)/2}:i.actNumber===0?n={day:.015+e*.015,atmosphere:0,cloud:.15}:i.actNumber===1?n={day:.05+e*.025,atmosphere:.15+e*.11,cloud:.18}:i.actNumber===2?n={day:.25,atmosphere:2,cloud:.85}:i.actNumber===3?n={day:.73+e*.02,atmosphere:9,spring:1,cloud:.025}:n={day:e>=6?.99+(e-6)*.01:.78+e*.028,atmosphere:e>=6?11:9.65+e*.11,cloud:.12,aurora:e>=6?1:e===5?.18:0,night:e>=6?1:0},{...t,...n}}function bx(i){let e={};const t=i.map((r,a)=>{const o={};for(const h of Za)o[h]=yx[r.id]?.[h]||{...e[h]||ct(5,-7,-5,0,0,0),scale:0,opacity:0};e=o;const l=xx(r),c=r.div||r.id==="0.1"||r.id==="4.6";return{id:r.id,objects:o,...l,landscape:c?1:r.section==="A"?.48:r.actNumber===4?.63:.84,travel:a/(i.length-1),cameraX:r.div?-.35:0,cameraY:r.div?4.3:4,cameraZ:r.div?18:17,system:{strength:r.id==="3.1"?.85:0,x:0,y:-.5,z:-2,scale:1.1,turn:0},axis:r.section==="B"?"x":r.actNumber===4?"depth":"y"}}),n=(r,a,o)=>Object.fromEntries(Object.keys(r).map(l=>[l,Gi(r[l],a[l],o)]));function s(r){const a=Br(r,0,t.length-1),o=Math.min(Math.floor(a),t.length-1),l=t[o],c=t[Math.min(o+1,t.length-1)],h=a-o,m=ii(0,1,h),u=Math.sin(Math.PI*m),d={};for(const p of Za){const x=l.objects[p],g=c.objects[p];d[p]=n(x,g,m);const f=d[p];if(x.scale===0&&g.scale===0){f.opacity=0;continue}x.scale>0&&g.scale>0||(x.scale>0?(f.scale=x.scale,f.x=x.x-24*ii(0,.72,m),f.opacity=m<.9?1:0,f.turn=x.turn+Math.PI*2*ii(0,.85,m),f.progress=Gi(x.progress,1,m)):(f.scale=g.scale,f.x=g.x+24*(1-ii(.25,1,m)),f.opacity=m>.1?1:0,f.turn=g.turn-Math.PI*2*(1-ii(.15,1,m)),f.progress=Gi(1,g.progress,m)))}return{position:a,index:o,raw:h,t:m,flight:u,objects:d,axis:l.axis,...Object.fromEntries([...tu,"landscape","travel","cameraX","cameraY","cameraZ"].map(p=>[p,Gi(l[p],c[p],m)])),system:n(l.system,c.system,m)}}return{shots:t,sample:s}}function _x(){const i=new vt,e=[],t=new cn({color:"#182b38",side:kn,transparent:!0});e.push(t);const n=Array.from({length:16},(a,o)=>{const l=new vt;l.position.z=6.3,i.add(l);const c=[-1,1].map(h=>{const m=new St;m.setAttribute("position",new dt(new Float32Array(144),3).setUsage(Mr));const u=new ht(m,t);return u.frustumCulled=!1,l.add(u),e.push(m),{wing:u,side:h}});return{bird:l,wings:c,i:o}});let s;function r(a,o){const l=Number.isFinite(o)?o:0;t.opacity=(1-pt.clamp(a.storm||0,0,1))*(1-pt.clamp(a.night||0,0,1)),n.forEach(({bird:u,wings:d,i:p})=>{const x=Math.floor(p/8),g=Math.ceil(p%8/2),f=p%2?1:-1,w=((l*(.22+x*.045)+x*11+7)%29+29)%29-14.5;u.position.set(w-g*.62,2.35-x*.65+g*.21*f+Math.sin(l*.14+x)*.12,6.3),u.scale.setScalar(x?.64:.91),u.visible=t.opacity>.01;const E=Math.sin(l*Math.PI+p*.43);d.forEach(({wing:y,side:S})=>{const T=y.geometry.attributes.position,A=v=>[S*v*.32,E*.215*Math.pow(v,1.25)+(.065-.035*E)*Math.sin(v*Math.PI),0];for(let v=0;v<8;v++){const R=A(v/8),D=A((v+1)/8),N=.023*(1-v/8.5);[R,D,[D[0],D[1]-N,0],R,[D[0],D[1]-N,0],[R[0],R[1]-N,0]].forEach((G,X)=>T.setXYZ(v*6+X,...G))}T.needsUpdate=!0})});const c=n[0],h=c.wings[0].wing.geometry.attributes.position,m=h.getY(43)*c.bird.scale.y;s={bird:c.bird.position.toArray(),wing:m,wingtip:m,wingRoot:h.getY(0),flapPhase:Math.sin(l*Math.PI),flapPeriod:2,nearWingspan:.64*.91,opacity:t.opacity}}return{group:i,update:r,get state(){return s},dispose(){e.forEach(a=>a.dispose()),i.removeFromParent()}}}function wx(){const i=new vt;i.name="Seasonal atmosphere";const e=[],t=Object.fromEntries(["Time","Rain","Snow","Night","Cloud","Storm","Vortex","Autumn","Aurora"].map(x=>["u"+x,{value:0}]));t.uPixel={value:1};const n="uniform float uTime,uRain,uSnow,uNight,uCloud,uStorm,uVortex,uAutumn,uAurora,uPixel;",s=`float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
  float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
  float fbm(vec2 p){return noise(p)*.55+noise(p*2.03)*.27+noise(p*4.01)*.13;}`;function r(x,g,f){const w=new Bn(24,14),E=new bn({uniforms:t,transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:"varying vec2 p;void main(){p=position.xy;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`varying vec2 p;${n}${s}
${f}`}),y=new ht(w,E);return y.name=x,y.position.z=g,i.add(y),e.push(w,E),y}const a=r("Three receding cloud banks with independent wind",-.4,`
    void main(){float bank=0.,edgeLight=0.;
    float clearing=1.-smoothstep(.10,.72,uCloud);
    for(int i=0;i<3;i++){
      float k=float(i),direction=i==0?-1.:1.;
      float center=(k-1.)*3.1+sin(uTime*(.014+k*.004)+k)*1.4+direction*clearing*17.;
      float wind=.10+k*.065;
      vec2 q=vec2((p.x-center-uTime*wind)*.32,p.y*.68+k*13.7);
      float n=fbm(q)+noise(q*7.1)*.045;
      float ridge=2.55-k*.56+sin((p.x-center)*.31+k)*.15;
      float altitude=exp(-pow(abs((p.y-ridge)*(1.05+k*.14)),2.));
      float envelope=exp(-pow(abs((p.x-center)/(4.4+k*.7)),4.));
      float density=smoothstep(.29,.68,n)*altitude*envelope;
      bank+=density*(.72+k*.12);
      edgeLight+=max(0.,n-fbm(q+vec2(.05,.17)))*density;
    }
    vec3 c=mix(vec3(.83,.81,.80),vec3(.24,.29,.36),uStorm*.76+uCloud*.16);
    c+=vec3(.16,.14,.11)*min(1.,edgeLight*4.);
    float lightning=pow(max(0.,sin(uTime*.31)),10.)*uStorm;
    c+=vec3(.09,.11,.14)*lightning*exp(-pow((p.x-5.)*.3,2.));
    gl_FragColor=vec4(c,min(.86,bank)*uCloud*.84);}`),o=r("Slow auroral curtains",-.6,`
    void main(){float x=p.x;float ribbon=1.8+sin(x*.43+uTime*.055)*.65+sin(x*.9-uTime*.035)*.23;
    float y=p.y-ribbon;float curtain=exp(-abs(y)*2.1)*smoothstep(-.15,.13,y);
    float folds=.45+.55*pow(.5+.5*sin(x*9.+fbm(vec2(x,uTime*.03))*4.),2.);
    vec3 c=mix(vec3(.20,.9,.64),vec3(.57,.35,.85),smoothstep(.0,1.5,y));
    gl_FragColor=vec4(c,curtain*folds*uAurora*.38);}`),l=r("Distant wind-sheared storm clouds",-.2,`
    void main(){vec2 q=(p-vec2(5.,1.35))*vec2(.34,.65);float r=length(q),angle=atan(q.y,q.x);
    float spin=angle+2.8*exp(-r*.8)-uTime*.045;
    vec2 warped=vec2(cos(spin),sin(spin))*r;
    float density=fbm(warped*4.5+vec2(uTime*.012,3.));
    density+=fbm(warped*9.-vec2(uTime*.018,0.))*.25;
    float eye=smoothstep(.10,.29,r),edge=1.-smoothstep(.7,1.35,r);
    float clouds=smoothstep(.24,.67,density)*eye*edge;
    float light=fbm(warped*4.5+vec2(.13,3.1));
    vec3 c=mix(vec3(.22,.28,.34),vec3(.57,.62,.67),light);
    gl_FragColor=vec4(c,clouds*uVortex*uCloud*.65);}`);function c(x,g){const f=new Float32Array(x*3);for(let S=0;S<x;S++)f[S*3]=Math.sin(S*73.7+2)*43758.5453,f[S*3+1]=Math.sin(S*19.3+7)*15273.13,f[S*3+2]=S/x;const w=new St;w.setAttribute("position",new fn(f,3));const E=new bn({uniforms:t,transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:`${n}varying float vAlpha,vSeed;void main(){vec3 s=fract(position);vec3 p;float k=${g.toFixed(1)};
      if(k<.5){p=vec3(s.x*23.-11.5-fract(s.y-uTime*(.29+s.z*.1))*1.4,fract(s.y-uTime*(.29+s.z*.1))*14.-7.,6.);vAlpha=uRain;}
      else if(k<1.5){p=vec3(s.x*23.-11.5+sin(uTime*.23+s.z*20.)*.5,fract(s.y-uTime*(.018+s.z*.014))*14.-7.,6.);vAlpha=uSnow;}
      else if(k<2.5){p=vec3(s.x*23.-11.5,s.y*6.+.5,-.7);vAlpha=uNight*(.65+.25*sin(uTime*.3+s.z*50.));}
      else {p=vec3(s.x*23.-11.5+sin(uTime*.2+s.z*12.)*.7,fract(s.y-uTime*(.024+s.z*.02))*14.-7.,6.);vAlpha=uAutumn*.42;}
      vAlpha*=.4+.6*s.z;vSeed=s.z;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);gl_PointSize=(k<.5?16.:k<1.5?4.5:k<2.5?2.5:6.)*uPixel;}`,fragmentShader:`${n}varying float vAlpha,vSeed;void main(){vec2 p=gl_PointCoord-.5;float k=${g.toFixed(1)};float a;vec3 c=vec3(.86,.92,1.);
      if(k<.5){a=(1.-smoothstep(.018,.055,abs(p.x+p.y*.1)))*(1.-smoothstep(.3,.5,abs(p.y)));c=vec3(.63,.74,.85);}
      else if(k<2.5){a=1.-smoothstep(.13,.5,length(p));}
      else{float t=uTime*.6+vSeed*15.;p=mat2(cos(t),-sin(t),sin(t),cos(t))*p;a=1.-smoothstep(.30,.37,length(p*vec2(1.,1.8)));c=mix(vec3(.66,.18,.06),vec3(.92,.60,.13),vSeed);}
      gl_FragColor=vec4(c,a*vAlpha*.85);}`}),y=new hp(w,E);return y.frustumCulled=!1,i.add(y),e.push(w,E),y}const h=c(700,0),m=c(370,1),u=c(260,2),d=c(35,3);let p;return{group:i,get state(){return p},update(x,g){const f=Number.isFinite(g)?g:0;t.uTime.value=f,t.uPixel.value=Math.min(2,(typeof innerHeight=="number"?innerHeight:1080)/1080);for(const y of["rain","snow","night","cloud","storm","vortex","autumn","aurora"])t["u"+y[0].toUpperCase()+y.slice(1)].value=pt.clamp(x[y]||0,0,1);const w=t.uCloud.value;a.visible=w>.005;for(const[y,S]of[[h,x.rain],[m,x.snow],[u,x.night],[d,x.autumn],[o,x.aurora],[l,(x.vortex||0)*w]])y.visible=S>.005;const E=1-pt.smoothstep(w,.1,.72);p={cloud:w,cloudsVisible:a.visible,opacityMultiplier:w*.84,clearing:E,bankCenters:[0,1,2].map(y=>(y-1)*3.1+Math.sin(f*(.014+y*.004)+y)*1.4+(y===0?-1:1)*E*17),windOffsets:[.1,.165,.23].map(y=>f*y)}},dispose(){e.forEach(x=>x.dispose()),i.removeFromParent()}}}function Mx(){const i=new vt;i.name="SDLC funnel";const e=[],t=new gt({color:"#ca682e",metalness:.45,roughness:.4,transparent:!0}),n=new cn({color:"#ffe0a1",transparent:!0});for(let a=0;a<4;a++){const o=2.1-a*.4,l=new nn;l.moveTo(-1.5,0),l.lineTo(.05,o),l.lineTo(1.5,o*.77),l.lineTo(.22,0),l.lineTo(1.5,-o*.77),l.lineTo(.05,-o),l.closePath();const c=new ht(new On(l,{depth:.14,bevelEnabled:!0,bevelSegments:2,bevelSize:.025,bevelThickness:.025,steps:1}),t);c.position.x=-4.1+a*2.6,i.add(c),e.push(c)}const s=new ht(new fs(.065,12,8),n);i.add(s);let r;return{group:i,update(a,o){i.visible=a.strength>.001,i.position.set(a.x,a.y,a.z),i.scale.setScalar(a.scale),i.rotation.set(.02,Math.sin(o*.09)*.035,0),t.opacity=n.opacity=a.strength,e.forEach((l,c)=>l.position.z=Math.sin(o*.18+c*.5)*.055),s.position.set(-6+o*.16%1*12,-2.55,.2),r={...a,time:o,rotation:i.rotation.toArray().slice(0,3)}},get state(){return r},dispose(){i.traverse(a=>a.geometry?.dispose()),t.dispose(),n.dispose(),i.removeFromParent()}}}const Vn=Object.freeze({winter:{top:"#284b70",middle:"#7aacc3",horizon:"#d8e2dc",glow:"#f8efce",sun:"#fff5d5",ridges:["#cbdce0","#abc5ce","#88acbb","#5e8d9f","#406b83","#294a66"]},cloud:{top:"#263747",middle:"#647884",horizon:"#b8adb0",glow:"#d9c0a9",sun:"#ddd4ba",ridges:["#8b9c9e","#73878c","#526f7b","#395566","#243e50","#172b3e"]},storm:{top:"#101923",middle:"#303e50",horizon:"#67747f",glow:"#8eabb7",sun:"#aabcc1",ridges:["#657583","#516575","#3d5265","#2b4054","#1d3044","#122033"]},autumn:{top:"#304e67",middle:"#8b9caa",horizon:"#f5c98d",glow:"#ffe4aa",sun:"#fff0bd",ridges:["#c3ab83","#ad8f66","#92764d","#775d39","#594931","#35362c"]},spring:{top:"#38627a",middle:"#91b6b1",horizon:"#efd8b0",glow:"#fff1c9",sun:"#fff6db",ridges:["#b5c2a1","#96ad8b","#719674","#537c60","#3b614e","#294737"]},dusk:{top:"#202439",middle:"#934a66",horizon:"#ffae64",glow:"#ffe49a",sun:"#ffe0ac",ridges:["#a58a9a","#89758a","#685b74","#484458","#303342","#20252e"]},morning:{top:"#223b53",middle:"#648794",horizon:"#efcaa4",glow:"#ffe4aa",sun:"#ffebbf",ridges:["#849d9b","#718e8a","#547a76","#3c625f","#2a4849","#1a323a"]},rain:{top:"#1b293a",middle:"#425467",horizon:"#8c9ca7",glow:"#abbac0",sun:"#b4c4ce",ridges:["#6e838c","#607781","#4e6672","#3b5361","#2b4050","#1c2e3c"]},snow:{top:"#394357",middle:"#8b9aab",horizon:"#d8dde0",glow:"#edf2ee",sun:"#eef4f0",ridges:["#d5dee2","#bdcdd5","#9cafbd","#6c8698","#435e75","#293f56"]},clear:{top:"#263f59",middle:"#66849a",horizon:"#e6c999",glow:"#ffe0a5",sun:"#fff0be",ridges:["#a4a996","#8c9886","#708773","#536c60","#3b534d","#273c3d"]},night:{top:"#090c13",middle:"#171d2b",horizon:"#424454",glow:"#545267",sun:"#9aabc0",ridges:["#343949","#2b3040","#232a38","#1c2330","#151d27","#0e151d"]},dawn:{top:"#262838",middle:"#b66a64",horizon:"#ffd28a",glow:"#fff3ac",sun:"#fff7c9",ridges:["#b7a5a9","#8f8fa1","#637a94","#3e617e","#274762","#182f48"]}}),Sx=Object.freeze({left:.06,right:.48,top:.2,bottom:.52,color:"#f4eee7"}),Ia=Object.freeze({height:10,position:[0,0,20],near:.1,far:100});function Ex(i=16/9){const e=new io(-5*i,5*i,5,-5,Ia.near,Ia.far);return e.position.set(...Ia.position),e}const yn=i=>new U(...i.slice(1).match(/../g).map(e=>parseInt(e,16)/255)),Tx=`
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Ax=[[.4,.42,.435,.405,.44,.425,.4,.435,.47,.44,.485,.44,.41,.42,.44],[.37,.39,.42,.38,.355,.38,.365,.36,.41,.43,.395,.37,.36,.38,.4],[.41,.44,.425,.395,.355,.34,.355,.37,.34,.32,.35,.395,.41,.37,.35],[.3,.32,.285,.26,.29,.325,.31,.275,.3,.345,.325,.295,.27,.29,.32],[.3,.285,.26,.235,.2,.19,.21,.235,.25,.235,.21,.19,.22,.25,.27],[.13,.15,.13,.115,.14,.16,.18,.16,.14,.13,.145,.175,.195,.18,.16]];function Rx(i){const e=new nn;e.moveTo(-.8,-.75);const t=new cc(i.map((n,s)=>new we(-.8+s/(i.length-1)*1.6,n-.5)));for(let n=0;n<=1400;n++){const s=n/1400,r=t.getPoint(s),a=Math.min(i.length-2,Math.floor(s*(i.length-1))),o=pt.lerp(i[a],i[a+1],s*(i.length-1)-a)-.5;e.lineTo(r.x,pt.lerp(o,r.y,.48))}return e.lineTo(.8,-.75),e.closePath(),new dc(e)}function Cx({palette:i="dusk",aspect:e=16/9,grain:t=.35,reducedMotion:n=!1}={}){if(!Vn[i])throw new RangeError(`Unknown landscape palette: ${i}`);const s=new vt;s.name="Quiet landscape";let r=0,a=0,o=0,l=0,c=10*e,h=!1;const m=[],u=(k,G,X={})=>{const F=new bn({uniforms:k,vertexShader:Tx,fragmentShader:`varying vec2 vUv; varying vec3 vPosition;
${G}`,toneMapped:!1,...X});return m.push(F),F},d=(k,G,X)=>{const F=new Bn(1,1);m.push(F);const Z=new ht(F,G);return Z.name=k,Z.position.z=X,Z.scale.set(c*1.6,15,1),Z.frustumCulled=!1,s.add(Z),Z},p={uTop:{value:yn(Vn[i].top)},uMiddle:{value:yn(Vn[i].middle)},uHorizon:{value:yn(Vn[i].horizon)},uGlow:{value:yn(Vn[i].glow)},uProgress:{value:0},uSun:{value:new we(.77,.49)},uAspect:{value:e},uRays:{value:1},uGlowGain:{value:1}},x=d("Gradient atmosphere",u(p,`
    uniform vec3 uTop, uMiddle, uHorizon, uGlow;
    uniform float uProgress, uAspect, uRays, uGlowGain;
    uniform vec2 uSun;
    void main() {
      vec2 uv = vec2(vPosition.x * 1.6 + 0.5, vPosition.y * 1.5 + 0.5);
      float horizon = 0.34 - uProgress * 0.025;
      float height = uv.y + (1.0 - smoothstep(0.30, 0.85, uv.x)) * 0.19;
      vec3 c = mix(uHorizon, uMiddle, smoothstep(horizon, 0.72, height));
      c = mix(c, uTop, smoothstep(0.60, 1.05, height));
      vec2 delta = (uv - uSun) * vec2(uAspect * 0.6, 1.6);
      float glow = exp(-dot(delta, delta) * 9.0) * .85 * uGlowGain;
      float angle = atan(delta.y, delta.x);
      float rays = pow(.5+.5*sin(angle*19.+sin(angle*7.)*1.8),14.);
      rays += .4*pow(.5+.5*sin(angle*37.),22.);
      c += uGlow * rays * exp(-length(delta)*3.5) * uRays * .10;
      c = mix(c, uGlow, glow);
      // This is the sky's own light falloff, not an overlay behind the title.
      float quiet = (1.0 - smoothstep(0.38, 0.69, uv.x)) * smoothstep(0.42, 0.66, uv.y);
      c *= 1.0 - quiet * 0.35;
      c *= 1.0 - uProgress * 0.075;
      gl_FragColor = vec4(c, 1.0);
    }
  `),-2),g={uColor:{value:yn(Vn[i].sun)},uOpacity:{value:1}},f=d("Low sun",u(g,`
    uniform vec3 uColor;uniform float uOpacity;
    void main() {
      float d = length(vUv - 0.5);
      float edge = fwidth(d);
      float alpha = 1.0 - smoothstep(0.46 - edge, 0.46 + edge, d);
      gl_FragColor = vec4(uColor * (0.94 + vUv.y * 0.06), alpha*uOpacity);
    }
  `,{transparent:!0,depthWrite:!1}),-1);f.scale.setScalar(.86);const w=f.material.clone();m.push(w),w.uniforms.uColor.value.copy(yn("#cbd9eb"));const E=d("Rising moon",w,-1.05);E.scale.setScalar(.95),w.fragmentShader=`varying vec2 vUv;uniform vec3 uColor;uniform float uOpacity;
    void main(){float d=length(vUv-.5);float a=1.-smoothstep(.45,.46,d);
    gl_FragColor=vec4(uColor*(.94+.06*(1.-smoothstep(0.,.46,d))),a*uOpacity);}`;const y=Ax.map((k,G)=>{const X=Rx(k);m.push(X);const F={uColor:{value:yn(Vn[i].ridges[G])},uHaze:{value:yn(Vn[i].horizon)},uDepth:{value:G/5},uProgress:{value:0}},Z=new ht(X,u(F,`
      uniform vec3 uColor, uHaze;
      uniform float uDepth, uProgress;
      void main() {
        float y = vPosition.y + 0.5;
        float haze = smoothstep(0.0, 0.55, y) * (1.0 - uDepth) * 0.14;
        vec3 c = mix(uColor, uHaze, haze);
        c *= mix(0.68, 1.0, smoothstep(-0.1, 0.48, y));
        c *= 1.0 - uProgress * 0.055;
        gl_FragColor = vec4(c, 1.0);
      }
    `));return Z.name=`Ridge ${G+1}`,Z.position.z=G,Z.scale.set(c,10,1),Z.frustumCulled=!1,s.add(Z),Z}),S={uAmount:{value:pt.clamp(t,0,1)}},T=d("Host-controlled grain",u(S,`
    uniform float uAmount;
    void main() {
      vec2 p = gl_FragCoord.xy;
      float noise = fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))));
      gl_FragColor = vec4(vec3(step(0.5, noise)), abs(noise - 0.5) * 0.12 * uAmount);
    }
  `,{transparent:!0,depthTest:!1,depthWrite:!1}),8);T.renderOrder=100;function A(k){if(h)return;l=pt.clamp(Number.isFinite(k)?k:0,0,1);const G=n?0:l;y.forEach((Q,V)=>{const ee=pt.smoothstep(G,V*.032,1);Q.position.x=(ee-.35)*(.008+V*.008)*c*(V%2?-1:1),Q.position.y=-ee*(.06+V*.055),Q.material.uniforms.uProgress.value=l});const X=pt.clamp(r/.94,0,1)*Math.PI,F=.5+Math.cos(X)*.34,Z=.49+Math.sin(X)*.37;f.position.set((F-.5)*c,(Z-.5)*10,-1);const H=(1-pt.smoothstep(F,.3,.52))*pt.smoothstep(Z,.48,.6);g.uOpacity.value=(1-pt.smoothstep(r,.9,.98))*(1-a)*(1-o*.86)*(1-H*.82),w.uniforms.uOpacity.value=a,E.position.set(.31*c,2.35,-1.05);const $=(1-pt.smoothstep(Math.sin(X),.12,.65))*(1-a)*(1-o);p.uRays.value=$,p.uGlowGain.value=1-.82*pt.smoothstep(r,.045,.2)*(1-pt.smoothstep(r,.78,.94)),p.uSun.value.set(F,Z),p.uProgress.value=r}function v(k){if(!Vn[k])throw new RangeError(`Unknown landscape palette: ${k}`);const G=Vn[k];for(const[X,F]of[["uTop","top"],["uMiddle","middle"],["uHorizon","horizon"],["uGlow","glow"]])p[X].value.copy(yn(G[F]));g.uColor.value.copy(yn(G.sun)),y.forEach((X,F)=>{X.material.uniforms.uColor.value.copy(yn(G.ridges[F])),X.material.uniforms.uHaze.value.copy(yn(G.horizon))}),A(l)}const R=["dawn","morning","cloud","rain","storm","snow","winter","clear","autumn","spring","dusk","night"].map(k=>{const G=Vn[k];return{...Object.fromEntries(["top","middle","horizon","glow","sun"].map(X=>[X,yn(G[X])])),ridges:G.ridges.map(yn)}});function D(k,G=k/11,X=0,F=0){const Z=pt.clamp(k,0,11),H=Math.min(10,Math.floor(Z)),$=Z-H,Q=R[H],V=R[H+1];r=G,a=X,o=F;for(const[ee,J]of[["uTop","top"],["uMiddle","middle"],["uHorizon","horizon"],["uGlow","glow"]])p[ee].value.copy(Q[J]).lerp(V[J],$);g.uColor.value.copy(Q.sun).lerp(V.sun,$),y.forEach((ee,J)=>{ee.material.uniforms.uColor.value.copy(Q.ridges[J]).lerp(V.ridges[J],$),ee.material.uniforms.uHaze.value.copy(Q.horizon).lerp(V.horizon,$)})}function N(k){if(!Number.isFinite(k)||k<=0)throw new RangeError("Aspect must be positive.");c=10*k,p.uAspect.value=k;for(const G of[x,T])G.scale.x=c*1.6;for(const G of y)G.scale.x=c;A(l)}return A(0),{group:s,update:A,setPalette:v,setAtmosphere:D,setAspect:N,get celestial(){return{sun:f.position.toArray(),moon:E.position.toArray(),sunOpacity:g.uOpacity.value,moonOpacity:w.uniforms.uOpacity.value}},headlineRegion:Sx,cameraDefaults:Ia,grain:S.uAmount,setGrain(k){S.uAmount.value=pt.clamp(k,0,1)},setReducedMotion(k){n=!!k,A(l)},dispose(){if(!h){h=!0;for(const k of m)k.dispose();s.clear(),s.removeFromParent()}}}}function Px(i,e,t){const n=new jy({antialias:!0,alpha:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0});n.setPixelRatio(1),n.outputColorSpace=ln,n.toneMapping=ql,n.toneMappingExposure=1.2,n.autoClear=!1,i.appendChild(n.domElement);const s=new yo,r=new Tn(35,16/9,.05,120),a=new yo,o=Ex(16/9),l=Cx({aspect:16/9,grain:.45});a.add(l.group),l.group.position.y=-.85;const c=Mx();s.add(c.group);const h=new Map,m=wx();a.add(m.group);let u,d=!1,p=1920,x=1080,g=null,f=0,w=0,E=null;const y=new we,S=new we;function T(){const V=new yo;V.background=new Je("#101514");for(const[ve,Oe,he,K,fe,ue]of[[14,8,5,-5,12,4],[3,11,4,12,7,1],[16,2,8,-2,6,-9],[8,3,2.4,0,5,12]]){const be=new ht(new Bn(ve,Oe),new cn({color:new Je(he,he,he)}));be.position.set(K,fe,ue),be.lookAt(0,0,0),V.add(be)}const ee=new zl(n),J=ee.fromScene(V,.025);s.environment=J.texture,s.environmentIntensity=1,u?.dispose(),u=J,ee.dispose(),V.traverse(ve=>{ve.geometry?.dispose(),ve.material?.dispose()})}T();const A=[];for(const[V,ee,J]of[[16118505,2.5,[-8,12,7]],[12965080,2,[9,5,-8]],[14872295,.7,[7,3,11]]]){const ve=new tm(V,ee);ve.position.set(...J),s.add(ve),A.push(ve)}s.add(new Jp(13820118,856848,.35));const v=new bn({transparent:!0,depthWrite:!1,depthTest:!1,toneMapped:!1,uniforms:{uDark:{value:0}},vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}",fragmentShader:"varying vec2 vUv;uniform float uDark;void main(){float upper=smoothstep(.18,.64,vUv.y);float left=1.-smoothstep(.24,.76,vUv.x);gl_FragColor=vec4(vec3(.051,.063,.067),uDark*(.66+.24*upper+.08*left)+(1.-uDark)*left*upper*.17);}"}),R=new ht(new Bn(2,2),v);R.frustumCulled=!1,R.renderOrder=200,a.add(R);const D=_x();a.add(D.group);const N=document.createElement("canvas");N.width=N.height=128;const k=N.getContext("2d"),G=k.createRadialGradient(64,64,2,64,64,63);G.addColorStop(0,"rgba(0,0,0,.65)"),G.addColorStop(1,"transparent"),k.fillStyle=G,k.fillRect(0,0,128,128);const X=new Dr(N),F=new Bn(1,1);function Z(V){if(!h.has(V)){const ee={laptop:sx,sealed:tx,engine:cx,swarm:fx,memory:mx,identity:vx,assurance:gx}[V](),J=new vt;J.add(ee.group);const ve={laptop:.52,sealed:.028,engine:.022,swarm:1,memory:1,identity:1,assurance:1}[V];ee.group.scale.setScalar(ve),V==="engine"&&ee.group.position.set(-.55,-1,0),V==="sealed"&&(ee.group.position.y=-.65);const Oe=new cn({map:X,transparent:!0,depthWrite:!1,opacity:.35}),he=new ht(F,Oe);he.rotation.x=-Math.PI/2,he.position.y=-2.2,he.scale.set(9,6,1),J.add(he),J.visible=!1,s.add(J),h.set(V,Object.assign(ee,{wrapper:J,shadow:he,shadowMaterial:Oe}))}return h.get(V)}function H(V,ee){p=Math.max(1,Math.round(V)),x=Math.max(1,Math.round(ee)),n.setSize(p,x,!1)}for(const V of Za)Z(V).wrapper.visible=!0;n.compile(s,r);for(const V of h.values())V.wrapper.visible=!1;const $=new U;function Q(V,ee=0,J=!1,ve=1/60,Oe=!1){if(d)return;E=V;const he=J?0:ee;J||Oe?(y.set(0,0),S.set(0,0)):S.lerp(y,1-Math.exp(-ve*1.2)),l.setAtmosphere(V.atmosphere,V.day,V.night,V.cloud),m.update(V,he),l.update(V.travel+Math.sin(he*.023)*.006),l.group.position.x=Math.sin(V.travel*Math.PI*2)*.25,o.zoom=1+V.travel*.035+Math.sin(he*.019)*.004,o.updateProjectionMatrix(),v.uniforms.uDark.value=1-Math.min(1,V.landscape),D.update(V,he),r.position.set(V.cameraX+y.x*.055,V.cameraY+y.y*.035,V.cameraZ),$.set(0,0,0),r.lookAt($),A[0].position.x=-8+Math.sin(he*.16)*.6+S.x*1.2,A[1].position.z=-8+Math.cos(he*.13)*.7,s.environmentRotation.y=Math.sin(he*.09)*.025+S.x*.035,A[2].intensity=V.objects.engine.opacity>.1?1.15:.7,c.update(V.system,he);for(const K of Za){const fe=V.objects[K];if(fe.opacity<=1e-4||fe.scale<=1e-4){h.has(K)&&(h.get(K).wrapper.visible=!1);continue}const ue=Z(K);ue.wrapper.visible=!0,ue.wrapper.position.set(fe.x,fe.y+Math.sin(he*.22+(K==="engine"?2:0))*.045,fe.z),ue.wrapper.rotation.set(fe.tilt+Math.sin(he*.17)*.004,fe.turn+Math.sin(he*.16)*fe.spin,Math.sin(he*.11)*.003),ue.wrapper.scale.setScalar(fe.scale);const be=g?.kind===K?g.t:fe.progress;f=be,K==="laptop"&&(w=be),K==="engine"?ue.update(be,J?null:he*.018%.5,he*.6,{retainEngine:!0,spread:fe.spread}):ue.update(be,he,{fault:fe.fault,repair:fe.repair,cartridgesOnly:fe.cartridgesOnly}),ue.shadowMaterial.opacity=.25*(1-be*.7)*fe.opacity}n.setViewport(0,0,p,x),n.setScissorTest(!1),n.setClearColor(856081,1),n.clear(),n.render(a,o),n.clearDepth(),n.render(s,r)}return n.domElement.addEventListener("webglcontextlost",V=>{V.preventDefault(),d=!0,e("context")}),n.domElement.addEventListener("webglcontextrestored",()=>{try{T(),d=!1,t()}catch(V){e("restore",V)}}),{renderer:n,resize:H,draw:Q,setPointer(V,ee){y.set(V,ee)},clearManual(){g=null},getObjectProgress(){return f},setObjectProgress(V,ee="sealed"){g={kind:ee,t:V}},getState(){const V=n.getContext(),ee=V.getExtension("WEBGL_debug_renderer_info");return{lost:d,environment:!!s.environment,models:[...h.keys()],renderer:ee?V.getParameter(ee.UNMASKED_RENDERER_WEBGL):V.getParameter(V.RENDERER),calls:n.info.render.calls,triangles:n.info.render.triangles,geometries:n.info.memory.geometries,textures:n.info.memory.textures,laptop:h.get("laptop")?.state,instrument:c.state,objects:Object.fromEntries([...h].map(([J,ve])=>[J,ve.state||ve.group.userData.state||null])),weather:Object.fromEntries(["day","rain","snow","cloud","storm","vortex","night","autumn","spring","aurora"].map(J=>[J,E?.[J]])),landscapeMotion:{...D.state,clouds:m.state,celestial:l.celestial},laptopT:w,objectProgress:f,journey:E,parts:Object.fromEntries([...h].map(([J,ve])=>[J,Object.fromEntries(["Laptop display","Laptop motherboard","Laptop deck","Left cooling fan","Enclosure","Sealed core","Crankshaft","Front crankcase service cover","Centrifugal governor + throttle feedback"].map(Oe=>{const he=ve.group.getObjectByName(Oe);return[Oe,he?{position:he.position.toArray(),rotation:he.rotation.toArray().slice(0,3)}:null]}))])),poses:Object.fromEntries([...h].map(([J,ve])=>[J,{visible:ve.wrapper.visible,position:ve.wrapper.position.toArray(),rotation:ve.wrapper.rotation.toArray().slice(0,3),scale:ve.wrapper.scale.x}]))}},dispose(){h.forEach(V=>{V.dispose(),V.shadowMaterial.dispose()}),c.dispose(),m.dispose(),l.dispose(),u?.dispose(),X.dispose(),F.dispose(),D.dispose(),R.geometry.dispose(),v.dispose(),n.dispose(),n.domElement.remove()}}}function Ix(i){const e=i.findIndex(w=>w.id==="1.2"),t=e+1,n=document.querySelector('[data-id="1.2"] .chart-pair>div:nth-child(2)'),s=document.querySelector('[data-id="1.3"] .chart-pair>div:first-child'),r=document.createElement("div");r.id="evidence-world",r.setAttribute("aria-hidden","true");const a=n.cloneNode(!0);a.id="travelling-chart";const o=[...a.querySelectorAll(".plot")];o.forEach(w=>w.setAttribute("pathLength","1")),r.appendChild(a),document.querySelector("#stage").insertBefore(r,document.querySelector("#slides")),n.classList.add("shared-chart-source"),s.classList.add("shared-chart-source");const l=a.querySelector(".tag"),c=[n,s].map(w=>w.querySelector(".tag").textContent),h=w=>{let E=0,y=0;for(let S=w;S&&S.id!=="stage";S=S.offsetParent)E+=S.offsetLeft,y+=S.offsetTop;return{x:E,y}},m=h(n),u=h(s),d=i.map((w,E)=>{const y=document.querySelector(`[data-id="${w.id}"]`),S=[...y.querySelectorAll(".chart-pair .plot,.pipeline .plot")];return S.forEach(T=>T.setAttribute("pathLength","1")),{index:E,lines:S,reveals:[...y.querySelectorAll("[data-reveal]")],last:-1}});let p=-1,x=0;const g=(w,E,y)=>{w.style[E]!==y&&(w.style[E]=y)};function f(w,E,y,S,T=0,A=!1){const v=Math.round(w);p!==v&&(p=v,x=T);const R=E||y||A,D=R?20:Math.max(0,T-x),N=ii(e,t,w),k=S.offset(e,w),G=S.offset(t,w),X=w<e?k:w>t?G:{x:0,y:0},F=c[w<e+.5?0:1];l.textContent!==F&&(l.textContent=F);const Z=w>e-1&&w<t+1&&!y;g(a,"visibility",Z?"visible":"hidden"),g(a,"opacity","1"),o.forEach(H=>{g(H,"strokeDasharray","1"),g(H,"strokeDashoffset",String(p===e&&!R?1-ii(.4,2.6,D):0))}),Z&&g(a,"transform",`translate3d(${Gi(m.x,u.x,N)+X.x}px,${Gi(m.y,u.y,N)+X.y}px,0)`);for(const H of d){if(Math.abs(H.index-w)>1.05)continue;const $=H.index===p?D:0;H.lines.forEach((Q,V)=>{const ee=R?1:ii(V*.4,2.2+V*.4,$);g(Q,"strokeDasharray","1"),g(Q,"strokeDashoffset",String(1-ee))}),H.reveals.forEach(Q=>{const V=Number(Q.dataset.reveal)||0,ee=R?1:ii(V,V+.9,$);g(Q,"opacity",String(ee)),g(Q,"transform",`translateY(${(1-ee)*12}px)`)})}}return{update:f}}function Lx(i=0,e=3.8,t=.86){let n=i,s=0;return{snap(r){n=r,s=0},step(r,a){const o=Math.max(1,Math.ceil(a*120)),l=Math.min(a,.08)/o;for(let c=0;c<o;c++)s+=(e*e*(r-n)-2*t*e*s)*l,n+=s*l;return Math.abs(r-n)<2e-5&&Math.abs(s)<1e-4&&(n=r,s=0),n},get position(){return n},get velocity(){return s}}}const Dx={.1:"down",.2:"right",D1:"down",1.1:"down",1.2:"right",1.3:"down",1.4:"left",1.5:"down",1.6:"down",D2:"down","2A.0":"right","2A.1":"down","2A.2":"right","2A.3":"down","2A.4":"up","2A.5":"right","2A.6":"down","2B.0":"left","2B.1":"left","2B.2":"down","2B.3":"down","2C.0":"right","2C.1":"right","2C.2":"down","2C.3":"down","2D.0":"down","2D.1":"right","2D.2":"up","2D.3":"right","2D.4":"down",D3:"down",3.1:"right",D4:"down",4.1:"up",4.2:"down",4.3:"left",4.4:"down",4.5:"down",4.6:"down"},Nx={down:[0,1160],up:[0,-1160],right:[2040,0],left:[-2040,0]};function Ux(i){const e=[{x:0,y:0}];for(let s=1;s<i.length;s++){const[r,a]=Nx[Dx[i[s-1].id]||"down"];e.push({x:e[s-1].x+r,y:e[s-1].y+a})}function t(s){const r=Br(s,0,i.length-1),a=Math.min(Math.floor(r),i.length-2),o=ii(.025,.975,r-a),l=e[a],c=e[a+1];return{x:Gi(l.x,c.x,o),y:Gi(l.y,c.y,o),dx:c.x-l.x,dy:c.y-l.y,t:o,index:a}}function n(s,r){const a=t(r),o=e[s];return{x:o.x-a.x,y:o.y-a.y}}return{anchors:e,sample:t,offset:n}}const La=Ux(mt),kx=bx(mt);let nu;const Ka=Lx();let Ja=!0,_r=[],Sn=null,ei=0;const Ke=i=>document.querySelector(i),Zn=i=>[...document.querySelectorAll(i)],Nn=matchMedia("(prefers-reduced-motion: reduce)").matches,Fx=new URLSearchParams(location.search),mc=Fx.has("presenter"),Hi=typeof BroadcastChannel<"u"?new BroadcastChannel("signals-keynote"):null;let wt=0,jt=[],qt=null,Da=0,$n=0,sd=0,rd=0,Qa=0,tr=!1,Yt=null,_i=!1,qs=null,Ys=0,si=!0,Hs=null,ss=0;const Vi=i=>i.div?i.name:(i.html.match(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/)?.[1]||i.sourceTitle.split(" (~")[0]).replace(/<br\s*\/?>/g," ").replace(/<[^>]*>/g,"").replace(/&amp;/g,"&"),Vl=()=>Math.max(0,mt.findIndex(i=>i.id===decodeURIComponent(location.hash.slice(1))));function ja(){Hi?.postMessage({type:"state",index:wt,id:mt[wt].id,startedAt:qs,pausedMs:Ys,paused:si})}function Ox(i){return i.actNumber!==2?-2:i.section?"ABCD".indexOf(i.section):-1}function Bx(i){const e=document.createElement("div");return e.innerHTML=i||"",e.querySelectorAll(".foot,.fivedots,.eyebrow").forEach(t=>t.remove()),e.querySelectorAll("[style]").forEach(t=>t.removeAttribute("style")),e.querySelectorAll(".cnt").forEach(t=>{const n=Number(t.dataset.n);t.textContent=t.dataset.fmt==="comma"?n.toLocaleString("en-US"):n+({pct:"%",pctplus:"%+",x:"×"}[t.dataset.fmt]||"")}),e.innerHTML}function zx(i){const e=document.createElement("div");return e.innerHTML=i.h||"",(i.sources||[...e.querySelectorAll(".foot a")]).map((t,n)=>{let s;try{const r=new URL(t.href);s=r.hostname.replace(/^www\./,"")+(r.hostname==="github.com"?" / "+r.pathname.split("/").filter(Boolean).slice(0,2).join("/"):"")}catch{s=t.textContent}return`<a href="${t.href}" target="_blank" rel="noopener" title="${t.href}">[${n+1}] ${s}</a>`}).join(" &nbsp; ")}function Gx(){Ke("#slides").innerHTML=mt.map(e=>`<section class="slide ${e.layout}" id="slide-${e.id}" aria-label="Slide ${e.id}: ${Vi(e)}" aria-hidden="true" data-id="${e.id}" style="--accent:${e.accent}"><div class="content">${e.html===e.h?Bx(e.html):e.html}${e.scene&&e.scene!=="landscape"?`<div class="static-object">${e.scene==="sealed"?"execute_code<br><small>01 SPAN / CONTENTS OPAQUE</small>":e.scene==="engine"?"desired state<br>↓<br>controller<br>↑<br>observed state":"AG–01<br>NETWORK / ACTIVE"}</div>`:""}</div><div class="foot">${zx(e)}</div></section>`).join("");const i=Ke('[data-id="3.4"] .src');i&&(i.textContent="Working snapshot · final repository check due 9 September 2026"),Ke("#rail").innerHTML=mt.map(e=>`<button data-go="${e.index}" class="${e.div?"divider":""}" aria-label="Slide ${e.id}: ${Vi(e)}" title="${e.id} · ${Vi(e)}"></button>`).join(""),Ke("#slide-index").innerHTML=mt.map(e=>`<button data-go="${e.index}" class="${e.div?"is-divider":""}"><span>${e.id}</span>${Vi(e)}</button>`).join(""),Zn("[data-go]").forEach(e=>e.addEventListener("click",()=>{dn(Number(e.dataset.go)),Ke("#navigator").close()})),Zn("[data-object-t]").forEach(e=>e.addEventListener("click",()=>{iu(Number(e.dataset.objectT),!0)}))}function ad(){const i=Math.min(innerWidth/1920,innerHeight/1080);Ke("#stage").style.setProperty("--scale",i);let e=0;jt=mt.map(t=>{const n=e;return e+=innerHeight*(t.div||t.scene?3.6:2.65),n}),Ke("#runway").style.height=jt.at(-1)+innerHeight+"px",Yt?.resize(1920*i*Math.min(devicePixelRatio,2),1080*i*Math.min(devicePixelRatio,2)),mc||(tr=!0,scrollTo(0,jt[wt]),Sn=jt[wt],Ja=!0,qt=null,$n=0)}function Or(i){let e=0;for(let t=1;t<jt.length;t++)Math.abs(i-jt[t])<Math.abs(i-jt[e])&&(e=t);return e}function gc(i,e=!0){wt=i;const t=mt[i];Zn(".slide").forEach((s,r)=>{s.classList.toggle("active",r===i),s.setAttribute("aria-hidden",String(r!==i)),s.inert=r!==i}),Zn("#rail button").forEach((s,r)=>{s.classList.toggle("active",r===i),s.classList.toggle("passed",r<i),s.setAttribute("aria-current",r===i?"step":"false")}),Zn("#slide-index button").forEach((s,r)=>s.classList.toggle("active",r===i)),Ke("#act-label").textContent=t.div?"":t.actNumber?`${String(t.actNumber).padStart(2,"0")} / ${t.actName}`:"OPENING KEYNOTE",Ke("#slide-label").textContent=`${String(i+1).padStart(2,"0")} / ${mt.length}   ·   ${t.id}`,Ke("#stage").style.setProperty("--accent",t.accent);const n=Ox(t);Ke("#contract-tracker").innerHTML=n===-2?"":`${n>=0?["OBSERVABILITY","MEMORY","IDENTITY","SECURITY"][n]:"FOUR SYSTEMS"} ${Array.from({length:4},(s,r)=>`<i class="${r===n?"on":""}"></i>`).join("")}`,Zn(".slide.active [data-object-t]").forEach(s=>s.classList.toggle("selected",Number(s.dataset.objectT)===(t.scene==="sealed"?1:.6))),Ke("#previous").disabled=i===0,Ke("#next").disabled=i===mt.length-1,e&&history.replaceState(null,"",`${location.pathname}${location.search}#${t.id}`),ja()}function iu(i,e=!1){if(cancelAnimationFrame(ss),Zn(".slide.active [data-object-t]").forEach(r=>r.classList.toggle("selected",Number(r.dataset.objectT)===i)),!e||Nn||!Yt){Yt?.setObjectProgress(i,mt[wt].scene==="engine"?"engine":"sealed");return}const t=Yt.getObjectProgress(),n=performance.now(),s=r=>{const a=Math.min(1,(r-n)/800),o=a*a*(3-2*a);Yt.setObjectProgress(t+(i-t)*o,mt[wt].scene==="engine"?"engine":"sealed"),a<1&&(ss=requestAnimationFrame(s))};ss=requestAnimationFrame(s)}function dn(i,e=!1){if(i=Math.max(0,Math.min(mt.length-1,i)),clearTimeout(Qa),mc){Hi?.postMessage({type:"go",index:i});return}const t=jt[i];cancelAnimationFrame(ss),Yt?.clearManual(),e||Nn?(qt=null,$n=0,tr=!0,scrollTo(0,t),Sn=t,Ja=!0,gc(i)):(qt=t,Da=scrollY,$n=0)}function od(i){const e=mt[wt].actNumber,t=Math.max(0,Math.min(4,e+i));dn(t===0?0:mt.findIndex(n=>n.id===`D${t}`))}function Hx(){try{Yt=Px(Ke("#graphics"),()=>{_i=!0,eo()},()=>{_i=!1,eo()});const i=Math.min(innerWidth/1920,innerHeight/1080);Yt.resize(1920*i*Math.min(devicePixelRatio,2),1080*i*Math.min(devicePixelRatio,2)),_i=!1}catch(i){console.error("WebGL unavailable; static presentation is active.",i),_i=!0}}function eo(){document.body.classList.toggle("static-mode",_i),Ke("#graphics-status").hidden=!_i,Ke("#graphics-status").textContent="3D GRAPHICS UNAVAILABLE"}function Vx(){window.open(`${location.pathname}?presenter#${mt[wt].id}`,"signals-presenter","popup,width=1400,height=940")}function Wx(i){if(!(i.metaKey||i.ctrlKey||i.altKey||/INPUT|TEXTAREA|SELECT/.test(i.target.tagName))){if(Ke("#blackout").hidden===!1){Ke("#blackout").hidden=!0,i.preventDefault();return}if(!(Ke("dialog[open]")||i.target.closest?.("[contenteditable=true]")||["Enter"," "].includes(i.key)&&i.target.closest?.("button,a"))){if(i.repeat&&["ArrowRight","ArrowLeft","PageDown","PageUp"," ","Enter"].includes(i.key)){i.preventDefault();return}switch(i.key){case"ArrowRight":case"PageDown":case"Enter":case" ":i.preventDefault(),dn((qt===null?wt:Or(qt))+1);break;case"ArrowLeft":case"PageUp":i.preventDefault(),dn((qt===null?wt:Or(qt))-1);break;case"ArrowDown":i.preventDefault(),od(1);break;case"ArrowUp":i.preventDefault(),od(-1);break;case"Home":i.preventDefault(),dn(0);break;case"End":i.preventDefault(),dn(mt.length-1);break;case"g":case"G":Ke("#navigator").showModal();break;case"?":Ke("#help").showModal();break;case"p":case"P":Vx();break;case"b":case"B":Ke("#blackout").hidden=!1;break;case"f":case"F":document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen?.().catch(()=>{});break}}}}function su(i){const e=Math.min(.032,(i-(sd||i))/1e3);if(sd=i,qt!==null){const l=qt-Da;$n+=(l*30-$n*11)*e,Da+=$n*e;const c=Da;tr=!0,Math.abs(l)<.5&&Math.abs($n)<3?(scrollTo(0,qt),qt=null,$n=0):scrollTo(0,c)}(Sn===null||Nn)&&(Sn=scrollY);const t=qt!==null?8:5.5;Sn+=(scrollY-Sn)*(1-Math.exp(-e*t)),Math.abs(scrollY-Sn)<.05&&(Sn=scrollY);const n=Or(Sn);n!==wt&&gc(n);let s=0;for(;s<jt.length-2&&Sn>jt[s+1];)s++;ei=s+Br((Sn-jt[s])/(jt[s+1]-jt[s])),(Ja||Nn)&&(Ka.snap(Nn?wt:ei),Ja=!1);const r=Ka.step(ei,e),a=kx.sample(Nn?wt:r);a.route=La.sample(Nn?wt:r);const o=_i;for(let l=Math.max(0,s-1);l<=Math.min(mt.length-1,s+2);l++){const c=_r[l],h=Nn||o,m=h?{x:0,y:0}:La.offset(l,ei),u=h?l===wt:Math.abs(l-ei)<1.01;c.classList.toggle("travelling",u),c.style.opacity=u?"1":"0",c.style.transform=`translate3d(${m.x}px,${m.y}px,0)`;const d=c._layers||(c._layers=[...c.querySelector(".content").children]);for(let p=0;p<d.length;p++){const x=Math.min(p,5)*.014;d[p].style.transform=h?"":`translate3d(${m.x*x}px,${m.y*x}px,0)`}}for(let l=0;l<_r.length;l++)Math.abs(l-ei)>1.01&&(_r[l].classList.remove("travelling"),_r[l].style.opacity="0");if(nu?.update(Nn?wt:ei,Nn,o,La,Hs??i/1e3,Hs!==null),Ke("#stage").style.setProperty("--journey-progress",String(ei/(mt.length-1))),Yt&&!o)try{Yt.draw(a,Hs??i/1e3,Nn,e,Hs!==null)}catch(l){console.error("Graphics stopped; static slides retained.",l),_i=!0,eo()}i-rd>1e3&&(ja(),rd=i),requestAnimationFrame(su)}function $x(){document.body.classList.add("presenter-mode"),Ke("#presenter").hidden=!1,Ke("#presenter").innerHTML='<div class="presenter-toolbar"><h1>Signals / Presenter</h1><time id="clock">00:00 / 45:00</time><button id="timer">Start clock</button><button id="timer-reset">Reset</button><button id="p-prev">← Previous</button><button id="p-next">Next →</button></div><div class="presenter-grid"><div><span class="mono">CURRENT SLIDE</span><h2 id="presenter-current"></h2><div id="speaker-notes"></div></div><div><span class="mono">UP NEXT</span><h2 id="presenter-next"></h2><p id="presenter-warning">The outline includes unresolved source checks and speaker-owned stories. See PREFLIGHT.md before stage.</p><span class="mono">← → SLIDES / ↑ ↓ ACTS · AUDIENCE WINDOW STAYS IN SYNC</span></div></div>';const i=e=>{wt=e,Ke("#presenter-current").textContent=`${mt[e].id} / ${Vi(mt[e])}`,Ke("#speaker-notes").textContent=mt[e].notes,Ke("#speaker-notes").scrollTop=0,Ke("#presenter-next").textContent=e<mt.length-1?`${mt[e+1].id} / ${Vi(mt[e+1])}`:"End of deck"};Ke("#slide-index").innerHTML=mt.map(e=>`<button data-go="${e.index}"><span>${e.id}</span>${Vi(e)}</button>`).join(""),Zn("#slide-index button").forEach(e=>e.onclick=()=>{dn(Number(e.dataset.go)),Ke("#navigator").close()}),i(Vl()),Ke("#p-prev").onclick=()=>dn(wt-1),Ke("#p-next").onclick=()=>dn(wt+1),Ke("#timer").onclick=()=>{Hi?.postMessage({type:"timer",action:si?"start":"pause"})},Ke("#timer-reset").onclick=()=>Hi?.postMessage({type:"timer",action:"reset"}),Hi?.addEventListener("message",({data:e})=>{e.type==="state"&&(e.index!==wt&&i(e.index),qs=e.startedAt,Ys=e.pausedMs,si=e.paused,Ke("#timer").textContent=si?"Start clock":"Pause clock")}),setInterval(()=>{const e=si?Ys:Ys+Date.now()-qs,t=Math.floor(e/1e3);Ke("#clock").textContent=`${String(Math.floor(t/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")} / 45:00`,Ke("#clock").style.color=t>=2700?"#f17b70":""},300),Hi?.postMessage({type:"request-state"})}Zn("[data-close]").forEach(i=>i.onclick=()=>i.closest("dialog").close());Zn("dialog").forEach(i=>i.addEventListener("click",e=>{if(e.target===i){const t=i.getBoundingClientRect();(e.clientX<t.left||e.clientX>t.right||e.clientY<t.top||e.clientY>t.bottom)&&i.close()}}));addEventListener("keydown",Wx);Ke("#blackout").addEventListener("click",()=>{Ke("#blackout").hidden=!0});Ke("#stage").addEventListener("click",i=>{if(!(i.button!==0||i.target.closest("a,button,input,textarea,select,dialog,[role=button],[contenteditable=true]")||Ke("dialog[open]")||getSelection()?.toString())){if(!Ke("#blackout").hidden){Ke("#blackout").hidden=!0;return}dn((qt===null?wt:Or(qt))+1)}});Ke("#menu-button").onclick=()=>Ke("#navigator").showModal();Ke("#help-button").onclick=()=>Ke("#help").showModal();Ke("#previous").onclick=()=>dn(wt-1);Ke("#next").onclick=()=>dn(wt+1);mc?$x():(Gx(),_r=Zn(".slide"),nu=Ix(mt),wt=Vl(),Hx(),ad(),gc(wt),eo(),addEventListener("resize",ad),addEventListener("pointermove",i=>Yt?.setPointer((i.clientX/innerWidth-.5)*2,(.5-i.clientY/innerHeight)*2),{passive:!0}),addEventListener("pointerout",i=>{i.relatedTarget||Yt?.setPointer(0,0)}),addEventListener("hashchange",()=>dn(Vl(),!0)),addEventListener("wheel",()=>{qt=null,$n=0,cancelAnimationFrame(ss),Yt?.clearManual()},{passive:!0}),addEventListener("touchstart",()=>{qt=null,$n=0,cancelAnimationFrame(ss),Yt?.clearManual()},{passive:!0}),addEventListener("scroll",()=>{if(tr){tr=!1;return}clearTimeout(Qa),qt===null&&(Qa=setTimeout(()=>{const i=Or(scrollY);Math.abs(scrollY-jt[i])<innerHeight*.48&&dn(i)},800))},{passive:!0}),Hi?.addEventListener("message",({data:i})=>{i.type==="go"&&dn(i.index),i.type==="request-state"&&ja(),i.type==="timer"&&(i.action==="reset"?(Ys=0,qs=null,si=!0):i.action==="start"&&si?(qs=Date.now(),si=!1):i.action==="pause"&&!si&&(Ys+=Date.now()-qs,si=!0),ja())}),requestAnimationFrame(su));window.keynote={ready:!0,slides:mt.map(i=>({id:i.id,title:Vi(i),layout:i.layout,scene:i.scene})),go(i,e=!0){dn(typeof i=="number"?i:mt.findIndex(t=>t.id===i),e)},setObjectProgress:iu,scrollBetween(i,e){const t=mt.findIndex(n=>n.id===i);t<0||t>=mt.length-1||(qt=null,$n=0,clearTimeout(Qa),tr=!0,cancelAnimationFrame(ss),Yt?.clearManual(),scrollTo(0,jt[t]+Br(e)*(jt[t+1]-jt[t])))},freeze(i=12){Hs=i},unfreeze(){Hs=null},getState(){return{index:wt,id:mt[wt].id,settled:qt===null&&(Sn===null||Math.abs(Sn-scrollY)<.5),journeyPosition:ei,documentCamera:La.sample(ei),objectPosition:Ka.position,objectVelocity:Ka.velocity,scrollY,position:jt[wt],static:_i,reduced:Nn,graphics:Yt?.getState()}},loseContext(){Yt?.renderer.forceContextLoss()},restoreContext(){Yt?.renderer.forceContextRestore()}};addEventListener("pagehide",()=>{Yt?.dispose(),Hi?.close()},{once:!0});
