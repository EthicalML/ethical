(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const dc=[80.8,97.8,90.3,95.3,100.1,106.3,99.2,107.4,117,125.5,125.6,135.4,144.2,147,141.3,149.4,153,158.3,152.9,167.8,177.7,209.2,215,246.8,319.8],xu=Array.from({length:12},(n,e)=>dc[Math.round(e*24/11)]),Pt=(...n)=>'<div class="foot">'+n.map((e,t)=>`[${t+1}] <a href="${e}" target="_blank" rel="noopener">${e.replace(/^https?:\/\//,"").slice(0,72)}</a>`).join(" · ")+"</div>",Ye=(n,e)=>`<div class="rv" style="--d:${n}">${e}</div>`,Fe=(n,e,t)=>`<div class="rv r" style="--d:${n}">${e?`<b>${e}</b>`:""}<span>${t}</span></div>`,ds=(n,e,t,i)=>`<div class="rv stat" style="--d:${n}"><div class="n cnt" data-n="${e}" data-fmt="${t}">0</div><div class="l">${i}</div></div>`,Yn=n=>`<div class="fivedots">${[0,1,2,3,4].map(e=>`<i${e===n?' class="on"':""}></i>`).join("")}</div>`,oa=(n,e)=>`<div class="win"><div class="tb"><i class="on"></i><i></i><i></i><span>${n}</span></div><div class="bd">${e}</div></div>`;function uc(n,e,t,i){const s=Math.max(...n);return n.map((r,a)=>[i+a*(e-2*i)/(n.length-1),t-i-r/s*(t-2*i)])}function Xr(n){return n.map((e,t)=>(t?"L":"M")+e[0].toFixed(1)+" "+e[1].toFixed(1)).join(" ")}function Sd(n,e,t,i,s){const r=[.25,.5,.75,1].map(o=>{const l=i-s-o*(i-2*s);return`<line x1="${s}" x2="${t-s}" y1="${l}" y2="${l}" stroke="rgba(255,255,255,.07)"/>`}).join(""),a=e.map((o,l,c)=>o?`<text class="axis" x="${s+l*(t-2*s)/(c.length-1)}" y="${i-s+22}" text-anchor="middle">${o}</text>`:"").join("");return{open:`<svg viewBox="0 0 ${t} ${i}" role="img">${r}${a}<text class="axis" x="${s}" y="${s-16}">${n}</text>`,close:"</svg>"}}const bu=dc.map((n,e)=>e%4==0?"20"+(20+e/4):""),_u=["May 25","","Jul","","Sep","","Nov","","Jan 26","Feb","","Apr"];function wu(){const i=Sd("global git pushes per quarter · millions",bu,980,340,46),s=uc(dc,980,340,46);return i.open+`<path id="igArea" d="${Xr(s)} L ${s[24][0]} 294 L ${s[0][0]} 294 Z" fill="rgba(94,230,160,.16)" opacity="0"/>
  <path id="igLine" d="${Xr(s)}" fill="none" stroke="#5ee6a0" stroke-width="2.6" stroke-linejoin="round"/>
  <g id="igChip" opacity="0"><rect x="${s[24][0]-86}" y="${s[24][1]-40}" rx="4" width="78" height="26" fill="#5ee6a0"/>
  <text class="chip" x="${s[24][0]-47}" y="${s[24][1]-22}" text-anchor="middle" font-weight="600">319.8M</text></g>`+i.close}function Mu(){const i=Sd("GitHub incidents per month",_u,980,340,46),s=uc(xu,980,340,46);return i.open+`<path id="moLine" d="${Xr(s)}" fill="none" stroke="#5ee6a0" stroke-width="2.6" stroke-linejoin="round"/>
  <g id="moChip" opacity="0"><rect x="${s[11][0]-64}" y="60" rx="4" width="56" height="26" fill="#ff5a6e"/>
  <text class="chip" x="${s[11][0]-36}" y="78" text-anchor="middle" font-weight="600" fill="#0f100f">37</text></g>`+i.close}const Su=(()=>{let n="";const e=["search","fetch","db.query","transform","notify","write","fetch","db.query","commit"];for(let t=0;t<9;t++)n+=`<g class="cmspan" data-i="${t}"><rect x="60" y="${26+t*32}" width="${170+t*67%140}" height="22" rx="4" fill="#171818" stroke="rgba(255,255,255,.1)"/>
  <text x="70" y="${42+t*32}" fill="rgba(244,242,238,.66)" font-size="12" font-family="Geist Mono">tool_call · ${e[t]}</text></g>`;return`<svg id="cmsvg" viewBox="0 0 980 330" style="max-width:900px">${n}
  <text x="60" y="322" fill="rgba(244,242,238,.48)" font-size="13" font-family="Geist Mono">before · 9 spans, each visible</text>
  <g id="cmTarget" opacity="0"><rect x="560" y="120" width="360" height="70" rx="6" fill="#0f100f" stroke="#ff5a6e"/>
  <text x="740" y="150" text-anchor="middle" fill="#ff5a6e" font-size="16" font-family="Geist Mono">execute_code</text>
  <text x="740" y="174" text-anchor="middle" fill="rgba(244,242,238,.48)" font-size="12" font-family="Geist Mono">1 span · contents opaque</text></g>
  <text id="cmAfter" opacity="0" x="560" y="322" fill="rgba(244,242,238,.48)" font-size="13" font-family="Geist Mono">after · the same work, one span</text></svg>`})();function Xc(n){return`<svg id="${n}" viewBox="0 0 980 380" style="max-width:900px">
  <defs><marker id="ar${n}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#5ee6a0"/></marker></defs>
  <g class="lp" data-d="0"><rect x="70" y="152" width="180" height="62" rx="8" fill="#0f100f" stroke="rgba(255,255,255,.1)"/>
  <text x="160" y="189" text-anchor="middle" fill="rgba(244,242,238,.66)" font-size="15">desired state</text></g>
  <g class="lp" data-d=".12"><rect x="380" y="140" width="220" height="86" rx="8" fill="#171818" stroke="#5ee6a0"/>
  <text x="490" y="176" text-anchor="middle" fill="#f4f2ee" font-size="19" font-weight="600">controller</text>
  <text x="490" y="202" text-anchor="middle" fill="rgba(244,242,238,.66)" font-size="13" font-family="Geist Mono">reconcile()</text></g>
  <g class="lp" data-d=".24"><rect x="730" y="152" width="180" height="62" rx="8" fill="#0f100f" stroke="rgba(255,255,255,.1)"/>
  <text x="820" y="189" text-anchor="middle" fill="rgba(244,242,238,.66)" font-size="15">agents acting</text></g>
  <g class="lp" data-d=".34"><line x1="250" y1="183" x2="372" y2="183" stroke="#5ee6a0" stroke-width="2" marker-end="url(#ar${n})"/>
  <line x1="600" y1="183" x2="722" y2="183" stroke="#5ee6a0" stroke-width="2" marker-end="url(#ar${n})"/></g>
  <path class="lpArc" d="M820 152 C 820 40, 490 40, 490 132" fill="none" stroke="#5ee6a0" stroke-width="2" marker-end="url(#ar${n})"/>
  <g class="lp" data-d=".62"><text x="655" y="66" text-anchor="middle" fill="#5ee6a0" font-size="14" font-family="Geist Mono">sensing</text></g>
  ${["correctness distributions","delegation chains","memory provenance","semantic drift","spend"].map((e,t)=>{const i=110+t*190;return`<g class="lp" data-d="${.68+t*.06}"><rect x="${i-88}" y="308" width="176" height="40" rx="20" fill="#171818" stroke="rgba(94,230,160,.28)"/>
    <text x="${i}" y="333" text-anchor="middle" fill="rgba(244,242,238,.66)" font-size="13.5">${e}</text>
    <line x1="${i}" y1="308" x2="${Math.min(Math.max(i,410),570)}" y2="230" stroke="rgba(94,230,160,.28)" stroke-width="1.5"/></g>`}).join("")}
</svg>`}const Au=`<svg viewBox="0 0 980 260" style="max-width:860px">
  <path id="stepLine" d="M60 190 L 470 186 L 470 70 L 920 62" fill="none" stroke="#e8b45c" stroke-width="3"/>
  <circle cx="470" cy="70" r="5" fill="#e8b45c"/>
  <text x="470" y="44" text-anchor="middle" fill="#e8b45c" font-size="14" font-family="Geist Mono">the day someone fixed the pipeline</text>
  <line x1="60" y1="222" x2="920" y2="222" stroke="rgba(255,255,255,.07)"/><text class="axis" x="60" y="248">months, dashboards green throughout</text></svg>`,Tu=`<svg viewBox="0 0 980 300" style="max-width:760px">
  <g class="rv" style="--d:.1"><path d="M140 40 L840 40 L700 140 L280 140 Z" fill="#171818" stroke="#e8b45c"/>
  <text x="490" y="100" text-anchor="middle" fill="#f4f2ee" font-size="18">writing code · tooling exploded</text></g>
  <g class="rv" style="--d:.3"><path d="M280 150 L700 150 L610 230 L370 230 Z" fill="#0f100f" stroke="rgba(255,255,255,.1)"/>
  <text x="490" y="198" text-anchor="middle" fill="rgba(244,242,238,.66)" font-size="15">testing</text></g>
  <g class="rv" style="--d:.5"><path d="M370 240 L610 240 L540 292 L440 292 Z" fill="#0f100f" stroke="#ff5a6e"/>
  <text x="490" y="274" text-anchor="middle" fill="#ff5a6e" font-size="15" font-weight="700">operating · this talk</text></g></svg>`;function qc(n,e,t){const i=[8,10,9,12,14,13,16,15,19,22,21,26,25,31,30,38,46,62,88],s=300,r=190,a=18,o=uc(i,s,r,a);return`<div class="rv" style="--d:${t};flex:0 0 218px;max-width:218px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
    <span style="color:var(--ink-66);font-size:15px">${e}</span><span style="font-family:'Geist Mono',monospace;background:var(--accent);color:#0f100f;border-radius:4px;padding:2px 9px;font-size:14px">${n}</span></div>
    <svg viewBox="0 0 ${s} ${r}"><path d="${Xr(o)} L ${o[18][0]} ${r-a} L ${o[0][0]} ${r-a} Z" fill="rgba(94,230,160,.12)"/>
    <path class="drawme" d="${Xr(o)}" fill="none" stroke="#5ee6a0" stroke-width="2.4"/>
    <text class="axis" x="${a}" y="${r-3}">2023</text><text class="axis" x="${s-a}" y="${r-3}" text-anchor="end">2026</text></svg></div>`}const Eu=[{id:"0.1",vh:200,hue:"g",L:"Lc",act:"",h:`${Ye(.05,"<h1>The New Failure Modes</h1>")}
 ${Ye(.25,'<p class="lead" style="margin-top:2vh">Observability in the Age of AI Agents</p>')}
 ${Ye(.45,'<p class="src" style="margin-top:5vh">Alejandro Saucedo · Signals Berlin 2026</p>')}`},{id:"0.2",vh:180,hue:"g",L:"Ll",act:"",h:`${Ye(0,"<h2>Who's telling you this</h2>")}<div class="rows" style="font-size:clamp(14px,1.3vw,19px)">
 ${Fe(.15,"","Exec Director of AI, Data &amp; Platform · Zalando")}
 ${Fe(.28,"","Board Member · ACM")}
 ${Fe(.41,"","AI advisor · UN, OECD, Linux Foundation, Institute for Ethical AI - among others")}</div>
 ${Ye(.6,'<p class="src" style="margin-top:3vh">a decade running ML systems in production - and a year ago at SREcon, a talk about that decade</p>')}`},{id:"D1",div:"1",name:"Where We Are",sub:"Three snapshots of software, September 2026",hue:"g"},{id:"1.1",vh:240,hue:"g",L:"Ll",act:"Act 1 · Where we are",h:`${Ye(0,'<h2>The race to the <s style="opacity:.45">bottom</s> top</h2>')}<div class="rows">
 ${Fe(.12,"Uber","70%+ of pull requests from local or cloud agents")}
 ${Fe(.28,"Zalando","33% of PRs auto-approved · 250+ teams · lead time down 20-40%")}
 ${Fe(.44,"Microsoft",'"20-30% of our code is written by AI" - Nadella')}
 ${Fe(.6,"Google",'"&gt;30% of new code" - Pichai')}</div>
 ${Pt("https://www.uber.com/us/en/blog/efficient-software-factory/","https://engineering.zalando.com/posts/2026/08/agentic-engineering-at-zalando-a-snapshot.html","https://www.cnbc.com/2025/04/29/satya-nadella-says-as-much-as-30percent-of-microsoft-code-is-written-by-ai.html")}`},{id:"1.2",vh:240,hue:"g",L:"Lr",act:"Act 1 · Where we are",h:`${Ye(0,"<h2>Not just code</h2>")}<div class="rows">
 ${Fe(.12,"Anthropic","95% of internal analytics queries automated · ~95% accuracy")}
 ${Fe(.3,"OpenAI","~4,000 of ~5,000 employees on its internal data agent · 600+ PB · 70,000 datasets · insights from hours to minutes")}
 ${Fe(.5,"Spotify","2,100+ employees on the internal data assistant · 13,000+ conversations · over a quarter had never written SQL")}</div>
 ${Pt("https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude","https://openai.com/index/inside-our-in-house-data-agent/","https://engineering.atspotify.com/2026/6/encoding-your-domain-expert-the-context-layer-behind-spotifys-data-assistant")}`},{id:"1.3",vh:380,fx:"ig",hue:"g",L:"Lw",act:"Act 1 · Where we are",h:`${Ye(0,"<h2>The fastest acceleration in the history of software</h2>")}
 <div class="rv chart" style="--d:.06;background:rgba(15,16,15,.72)">${wu()}</div>
 ${Ye(.55,'<p class="lead" style="margin-top:2vh"><span class="big">+80%</span> in the last year, after five years of ~17%.</p>')}
 <div style="display:flex;gap:3vw;flex-wrap:wrap;margin-top:2vh">${qc("90M","Merged pull requests / mo",.62)}${qc("20M","New repositories / mo",.74)}</div>
 ${Ye(.84,'<p class="src" style="margin-top:2vh">GitHub Innovation Graph · GitHub availability update, April 2026 · PR/repo shapes recreated, endpoints theirs</p>')}
 ${Pt("https://innovationgraph.github.com/global-metrics/git-pushes","https://github.blog/news-insights/company-news/an-update-on-github-availability/","https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/")}`},{id:"1.4",vh:380,fx:"morph",hue:"g",L:"Lw",act:"Act 1 · Where we are",h:`${Ye(0,"<h2>PRs up. Incidents up.</h2>")}
 <div class="rv chart" style="--d:.04;background:rgba(15,16,15,.72)">${Mu()}</div>
 <div class="statgrid" style="margin-top:2.5vh">${ds(.55,257,"plain","incidents in 12 months")}${ds(.65,48,"plain","major outages")}
 <div class="rv stat" style="--d:.75"><div class="n">capacity</div><div class="l">the top root cause</div></div></div>
 ${Ye(.85,`<p class="src" style="margin-top:2vh">IncidentHub tracker, from GitHub's public status page · peak 37, Feb 2026</p>`)}
 ${Pt("https://blog.incidenthub.cloud/github-reliability-outage-history-2025-2026","https://leaddev.com/software-quality/whats-gone-wrong-at-github","https://github.blog/news-insights/company-news/an-update-on-github-availability/")}`},{id:"1.5",vh:260,hue:"g",L:"Ll",act:"Act 1 · Where we are",h:`${Ye(0,"<h2>Work left the laptop</h2>")}<div class="rows">
 ${Fe(.14,"Cursor","35% of its own merged PRs come from Cloud Agents, one VM per agent")}
 ${Fe(.32,"13.5M","Copilot coding-agent sessions in a single month - Microsoft Research")}
 ${Fe(.5,"Linear","issues route to agents with zero humans in the triage rule")}</div>
 ${Ye(.68,`<p class="lead" style="margin-top:3vh">The unit of work is no longer an editor session - it's a sandbox you never see.</p>`)}
 ${Pt("https://www.microsoft.com/en-us/research/wp-content/uploads/2026/08/ghcp_traces-6.pdf","https://linear.app/docs/agents-in-linear")}`},{id:"1.6",vh:280,hue:"g",L:"Ll",act:"Act 1 · Where we are",h:`${Ye(0,"<h2>All of it wired to one shared memory</h2>")}<div class="rows">
 ${Fe(.12,"Linear","agents now create <b>~2.4M</b> issues a week. Humans: <b>~2.5M</b>. Near parity.")}
 ${Fe(.28,"Jira","agents ship as an assignee option, assignable like teammates")}
 ${Fe(.42,"Atlassian Rovo","5M+ monthly users · 75% of the Fortune 500")}
 ${Fe(.56,"Claude","persistent, project-scoped memory across conversations")}</div>
 ${Ye(.72,'<p class="quote" style="margin-top:3vh">"What is my team working on?" is becoming <em>a query, not a conversation.</em></p>')}
 ${Pt("https://linear.app/data","https://www.atlassian.com/blog/rovo/ai-agents-in-jira","https://claude.com/blog/memory")}`},{id:"1.7",vh:260,hue:"g",L:"Lr",act:"Act 1 · Where we are",h:`${Ye(0,"<h2>And it's not just our industry</h2>")}<div class="rows">
 ${Fe(.12,"74%","of enterprises expect to run agentic AI within two years - Deloitte")}
 ${Fe(.26,"62%","of organizations are already experimenting with agents - McKinsey")}
 ${Fe(.4,"80%","of common customer-service issues resolved autonomously by 2029 - Gartner")}
 ${Fe(.54,"Klarna","2.3M conversations in month one · two-thirds of all chats · the work of <b>700</b> people")}</div>
 ${Ye(.7,'<p class="src" style="margin-top:2vh">later rebalanced to a hybrid human/AI model</p>')}
 ${Pt("https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html","https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai","https://www.gartner.com/en/newsroom/press-releases/2025-03-05-gartner-predicts-agentic-ai-will-autonomously-resolve-80-percent-of-common-customer-service-issues-without-human-intervention-by-2029","https://www.klarna.com/international/press/klarna-ai-assistant-handles-two-thirds-of-customer-service-chats-in-its-first-month/")}`},{id:"1.8",vh:240,hue:"g",L:"Ll",act:"Act 1 · Where we are",h:`${Ye(0,"<h2>Agents running the whole lifecycle</h2>")}<div class="rows">
 ${Fe(.15,"REA","plans, launches, debugs and iterates Meta's ads-ranking lifecycle - doubled accuracy-iteration gains across six models · 2 engineers per model became 3 across 8")}
 ${Fe(.4,"KernelEvolve","writes production GPU kernels - +60% inference throughput · trillions of requests a day")}</div>
 ${Pt("https://engineering.fb.com/2026/03/17/developer-tools/ranking-engineer-agent-rea-autonomous-ai-system-accelerating-meta-ads-ranking-innovation/","https://engineering.fb.com/2026/04/02/developer-tools/kernelevolve-how-metas-ranking-engineer-agent-optimizes-ai-infrastructure/")}`},{id:"1.9",vh:300,hue:"g",L:"Lr",act:"Act 1 · Where we are",h:`${Ye(0,"<h2>What it took to run that safely</h2>")}<div class="rows" style="font-size:clamp(14px,1.3vw,19px)">
 ${["Preflight access checklist","Compute budget confirmed upfront","Halt-and-pause thresholds","A failure runbook the executor consults itself","Scope fence","Bitwise correctness verification","Search termination criteria"].map((n,e)=>Fe(.1+e*.09,"",n)).join("")}</div>
 ${Ye(.8,'<p class="lead" style="margin-top:3vh">Every one of these is bespoke. None of it is standard.</p>')}
 ${Pt("https://engineering.fb.com/2026/03/17/developer-tools/ranking-engineer-agent-rea-autonomous-ai-system-accelerating-meta-ads-ranking-innovation/")}`},{id:"D2",div:"2",name:"The New Failure Modes",sub:"The same three snapshots, breaking",hue:"r",glitch:1},{id:"2.1",vh:300,hue:"r",L:"Ll",act:"Act 2 · The new failure modes",h:`${Ye(0,"<h2>April 23, 2026</h2>")}
 <div class="statgrid">${ds(.1,2092,"comma","pull requests")}${ds(.22,658,"plain","repositories")}
 <div class="rv stat" style="--d:.34"><div class="n">incorrect</div><div class="l">merge commits</div></div></div>
 ${Ye(.55,`<p class="quote" style="margin-top:5vh">"...the existing monitoring didn't catch it because the issue was about <em>merge correctness</em> rather than availability."</p><p class="src">- GitHub</p>`)}
 ${Pt("https://github.blog/news-insights/company-news/an-update-on-github-availability/")}`},{id:"2.2",vh:240,hue:"r",L:"Lr",act:"Act 2 · The new failure modes",h:`${Ye(0,"<h2>The workplace we just wired up, part 1</h2>")}<div class="rows">
 ${Fe(.15,"Replit","the agent deletes a production database during a stated code freeze, then fabricates records and reports success")}
 ${Fe(.42,"Amazon Q","the VS Code extension (~950k installs) ships a wiper prompt for two days - stopped by a <b>syntax error</b>, not a control")}</div>
 ${Pt("https://www.mintmcp.com/blog/replit-agent-production-database-deletion","https://www.scworld.com/news/amazon-q-extension-for-vs-code-reportedly-injected-with-wiper-prompt")}`},{id:"2.3",vh:280,hue:"r",L:"Ll",act:"Act 2 · The new failure modes",h:`${Ye(0,"<h2>The workplace we just wired up, part 2</h2>")}<div class="rows">
 ${Fe(.12,"","A poisoned GitHub issue exfiltrates private repos through a full-permission MCP token")}
 ${Fe(.3,"","The tool layer itself turns: postmark-mcp BCCs every email · the Smithery breach hits 3,000+ apps · CVE-2025-6514, CVSS <b>9.6</b>")}
 ${Fe(.48,"","One email, zero clicks: EchoLeak (CVE-2025-32711)")}
 ${Fe(.66,"0.1%",'poisoned memory records -&gt; <b style="color:var(--red)">80%+</b> attack success')}</div>
 ${Pt("https://invariantlabs.ai/blog/mcp-github-vulnerability","https://owasp.org/www-project-mcp-top-10/2025/MCP03-2025%E2%80%93Tool-Poisoning","https://www.hackthebox.com/blog/cve-2025-32711-echoleak-copilot-vulnerability","https://neurips.cc/virtual/2024/poster/94715")}`},{id:"2.4",vh:340,hue:"r",L:"Ll",act:"Act 2 · The new failure modes",h:`${Ye(0,"<h2>July 19, 2026</h2>")}<div class="rows">
 ${Fe(.14,"~700","agents - OpenAI's own testing swarm")}
 ${Fe(.3,"","escaped test confinement")}
 ${Fe(.44,"","stole credentials · tampered with cloud environments")}
 ${Fe(.58,"","coordinated on an unsanctioned message board")}
 ${Fe(.72,"~20%","showed evidence-tampering behaviour")}</div>
 ${Pt("https://openai.com/index/hugging-face-incident-and-the-road-ahead/","https://www.nbcnews.com/tech/tech-news/openai-report-says-network-was-hacked-rogue-ai-agents-rcna594590")}`},{id:"2.5",vh:220,hue:"r",L:"Lc",act:"Act 2 · The new failure modes",h:`${Ye(.1,'<p class="quote" style="font-size:clamp(26px,3.4vw,48px)">"With the benefit of hindsight, <em>some early signals</em> identified in this report <em>could have triggered an earlier response.</em>"</p>')}
 ${Ye(.5,'<p class="src" style="margin-top:4vh">- OpenAI</p>')}
 ${Pt("https://openai.com/index/hugging-face-incident-and-the-road-ahead/")}`},{id:"2.6",vh:300,hue:"r",L:"Lw",act:"Act 2 · The new failure modes",h:`${Ye(0,"<h2>None of these were visible to the telemetry that existed</h2>")}<div class="rv" style="--d:.1;overflow-x:auto"><table style="background:rgba(15,16,15,.72)">
 <tr><th>failure</th><th>visible?</th><th>why not</th></tr>
 <tr><td>April 23 merge commits</td><td class="no">no</td><td class="why">wrong signal - correctness vs availability</td></tr>
 <tr><td>Replit · Amazon Q · MCP chain</td><td class="no">no</td><td class="why">wrong boundary - perimeter vs inside</td></tr>
 <tr><td>Poisoned memory</td><td class="no">no</td><td class="why">wrong assumption - state treated as fact</td></tr>
 <tr><td>The swarm</td><td class="no">no</td><td class="why">wrong principal - whose action was it?</td></tr></table></div>`},{id:"D3",div:"3",name:"The Broken Contracts",sub:"Five assumptions our telemetry was built on - and what replaces them",hue:"b"},{id:"3.0",vh:280,fx:"cards",hue:"b",L:"Lw",act:"Act 3 · The broken contracts",h:`${Ye(0,Yn(-1)+"<h2>Five assumptions, all broken</h2>")}
 <div class="persp" style="display:flex;flex-direction:column;gap:1.6vh;font-size:clamp(15px,1.45vw,21px)">
 ${[["Traces","a span assumed bounded, structured text"],["SLIs","an SLI assumed a decidable success predicate"],["Memory","memory assumed stored state is fact"],["Identity","identity assumed the caller is the principal"],["Cost","billing assumed a human decided to spend"]].map((n,e)=>`<div class="card3 r" style="--d:${.12+e*.14};display:flex;gap:1.2em;align-items:baseline;border-left:2px solid var(--acc-line);padding-left:1.1em"><b style="font-family:'Geist Mono',monospace;color:var(--acc)">${n[0]}</b><span style="color:var(--ink-66)">${n[1]}</span></div>`).join("")}</div>`},{id:"3.1",vh:260,hue:"b",L:"Ll",act:"Act 3 · The broken contracts",h:`${Ye(0,Yn(0)+'<p class="eyebrow" style="color:var(--ink-48)">contract 1 · traces</p><h2>Traces: the pillar wars, in one line</h2>')}<div class="rows">
 ${Fe(.15,"2017","Bourgon's Venn diagram - metrics · logs · traces")}${Fe(.3,"2018","the same author argues the opposite")}
 ${Fe(.45,"2019","OTel unifies collection, declines to unify storage")}
 ${Fe(.6,"2023-26","wide events")}</div>
 ${Ye(.75,'<p class="lead" style="margin-top:3vh">settled as architecture · unsettled as economics · <b style="color:var(--acc)">re-opened by agents</b></p>')}
 ${Pt("https://peter.bourgon.org/blog/2017/02/21/metrics-tracing-and-logging.html","https://peter.bourgon.org/blog/2018/08/22/observability-signals.html","https://charity.wtf/2025/10/30/the-pillar-is-a-lie/")}`},{id:"3.2",vh:220,hue:"b",L:"Lr",act:"Act 3 · The broken contracts",h:`${Ye(0,Yn(0)+"<h2>What broke the span</h2>")}<div class="rows">
 ${Fe(.18,"~1.8 MB","a single screenshot, as base64, inside one span")}
 ${Fe(.42,"","The span says the tool call returned <b>200</b>. It cannot say whether the answer <b>drifted</b>.")}</div>
 ${Ye(.62,'<p class="src" style="margin-top:3vh">MLflow now detects binary in spans and offloads it to object storage; OpenInference added voice span kinds</p>')}
 ${Pt("https://arize.com/resources/llm-evaluation/")}`},{id:"3.3",vh:340,fx:"codemode",hue:"b",L:"Lw",act:"Act 3 · The broken contracts",h:`${Ye(0,Yn(0)+"<h2>Code mode: the seam disappears</h2>")}${Ye(.05,oa("trace waterfall · live",Su))}
 ${Ye(.62,'<p class="lead" style="margin-top:2vh"><span class="big">150,000 -&gt; 2,000</span> tokens. And a dozen observable operations -&gt; <span class="big">one</span>.</p>')}
 ${Pt("https://blog.cloudflare.com/code-mode/","https://www.anthropic.com/engineering/code-execution-with-mcp","https://arxiv.org/abs/2606.09692")}`},{id:"3.4",vh:260,hue:"b",L:"Lc",act:"Act 3 · The broken contracts",h:`${Ye(0,Yn(0)+"<h2>As of today, none of this has a standard</h2>")}<div class="rows" style="text-align:left">
 ${Fe(.15,"",'OTel GenAI conventions: <b>nothing marked Stable</b> - every span, event, metric and attribute still "Development"')}
 ${Fe(.3,"","No convention for <b>multimodal payloads</b>")}
 ${Fe(.45,"","No convention for <b>handoffs</b> or <b>memory operations</b>")}
 ${Fe(.6,"","Sandbox telemetry: <b>one open issue</b> - #311")}</div>
 ${Ye(.75,'<p class="src" style="margin-top:3vh">state as of the repo check, re-verified Sep 2026</p>')}
 ${Pt("https://github.com/open-telemetry/semantic-conventions-genai","https://github.com/open-telemetry/semantic-conventions-genai/issues/311")}`},{id:"3.5",vh:240,hue:"a",L:"Ll",act:"Act 3 · The broken contracts",h:`${Ye(0,Yn(1)+'<p class="eyebrow" style="color:var(--ink-48)">contract 2 · evals x telemetry</p><h2>Your agent can be 100% available, 100% within latency, and 100% wrong.</h2>')}<div class="rows">
 ${Fe(.2,"","One evaluator - run offline <b>and</b> on sampled production traces")}
 ${Fe(.38,"","Eval scores becoming telemetry: <b>gen_ai.evaluation.result</b>")}
 ${Fe(.56,"","Guardrails becoming monitors - the signal is the <b>delta</b> in trip rate, not the level")}</div>
 ${Pt("https://arize.com/resources/llm-evaluation/","https://www.braintrust.dev/articles/what-is-llm-monitoring")}`},{id:"3.6",vh:220,hue:"a",L:"Lc",act:"Act 3 · The broken contracts",h:`${Ye(.08,Yn(1)+`<p class="quote" style="font-size:clamp(24px,3vw,44px)">We went looking for a rigorous SLO over a <em>quality distribution</em>.<br>As of September 2026, we couldn't find one.</p>`)}
 ${Ye(.45,'<p class="lead" style="margin-top:3vh">If you have one - I want to see it.</p>')}
 ${Pt("https://www.gartner.com/en/newsroom/press-releases/2025-06-11-gartner-predicts-that-guardian-agents-will-capture-10-15-percent-of-the-agentic-ai-market-by-2030")}`},{id:"3.7",vh:260,hue:"v",L:"Ll",act:"Act 3 · The broken contracts",h:`${Ye(0,Yn(2)+'<p class="eyebrow" style="color:var(--ink-48)">contract 3 · memory</p><h2>Memory: no attacker required</h2>')}<div class="rows">
 ${Fe(.15,"Tuesday","the agent hallucinates. The memory layer stores it.")}
 ${Fe(.32,"Friday","three downstream workflows treat it as ground truth.")}
 ${Fe(.49,"+11 days","full recovery")}</div>
 ${Ye(.66,'<p class="src" style="margin-top:3vh;text-align:right">attacker: none</p>')}`},{id:"3.8",vh:220,hue:"v",L:"Lr",act:"Act 3 · The broken contracts",h:`${Ye(0,Yn(2)+"<h2>Prompt injection is session-scoped.<br>Memory poisoning is not.</h2>")}<div class="rows" style="margin-top:2vh">
 ${Fe(.3,"","<b>Fail soft on state, fail closed on trust</b>")}
 ${Fe(.5,"","Every memory operation is a <b>first-class trace event, with provenance</b>")}</div>
 ${Pt("https://arxiv.org/abs/2605.22842","https://arxiv.org/abs/2606.24322")}`},{id:"3.9",vh:260,hue:"i",L:"Ll",act:"Act 3 · The broken contracts",h:`${Ye(0,Yn(3)+`<p class="eyebrow" style="color:var(--ink-48)">contract 4 · identity</p><h2>Identity: three questions your gateway can't answer</h2>`)}
 <div class="statgrid" style="margin:1vh 0 4vh">${["Who are you?","Whose agent are you?","What can you do?"].map((n,e)=>`<div class="rv stat" style="--d:${.18+e*.16}"><div class="n" style="font-size:clamp(22px,2.4vw,36px)">${n}</div></div>`).join("")}</div>
 ${Ye(.7,'<p class="lead"><em style="color:var(--acc);font-style:normal">The declaration is the authorization.</em></p>')}
 ${Pt("https://axsaucedo.github.io/kaos/v0.7.5/examples/authorization.html")}`},{id:"3.10",vh:260,hue:"i",L:"Lr",act:"Act 3 · The broken contracts",h:`${Ye(0,Yn(3)+"<h2>Delegation chains, and the thing nobody monitors</h2>")}<div class="rows">
 ${Fe(.15,"","Each hop - user -&gt; agent -&gt; sub-agent -&gt; tool - stamped with <b>actor · subject · audience · scope</b>")}
 ${Fe(.35,"","The security primitive and the trace are <b>the same artifact</b>")}
 ${Fe(.55,"EU AI Act Art. 12","automatic logging, lifetime-scoped - in full application since 2 Aug 2026")}</div>
 ${Pt("https://artificialintelligenceact.eu/article/12/","https://developer.pingidentity.com/blog/securing-agentic-workflows-with-token-exchange-and-workload-identity/","https://arxiv.org/pdf/2607.05518")}`},{id:"3.11",vh:260,hue:"ah",L:"Ll",act:"Act 3 · The broken contracts",h:`${Ye(0,Yn(4)+'<p class="eyebrow" style="color:var(--ink-48)">contract 5 · cost</p><h2>Cost: nobody decided to spend that</h2>')}
 <div class="statgrid">${ds(.18,6,"x","AI infra cost since 2024 - Uber")}
 <div class="rv stat" style="--d:.34"><div class="n">flat</div><div class="l">measured productivity</div></div>
 <div class="rv stat" style="--d:.5"><div class="n">$500-2,000</div><div class="l">per engineer per month</div></div></div>
 ${Ye(.66,'<p class="lead" style="margin-top:3vh">forecast <b>+24%</b> · self-reported <b>+20%</b> · measured <b style="color:var(--red)">-19%</b> - METR RCT</p>')}
 ${Pt("https://www.uber.com/us/en/blog/efficient-software-factory/","https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/")}`},{id:"3.12",vh:240,hue:"g",L:"Lc",act:"Act 3 · The broken contracts",h:`${Ye(0,"<h2>Five contracts, one repair</h2>")}<div class="rows" style="text-align:left;margin-top:2vh">
 ${Fe(.15,"Traces","spans that carry payload, semantics, sandbox")}
 ${Fe(.27,"SLIs","evals as production telemetry")}
 ${Fe(.39,"Memory","provenance on every read and write")}
 ${Fe(.51,"Identity","the delegation chain as the trace")}
 ${Fe(.63,"Cost","budget as a precondition")}</div>
 ${Ye(.78,'<p class="quote" style="margin-top:3vh">Carry <em>provenance and meaning</em> alongside the value.</p>')}`},{id:"D4",div:"4",name:"A Decade of MLOps Already Told Us",sub:"We had this argument once before",hue:"ad"},{id:"4.1",vh:300,fx:"step",hue:"ad",L:"Lw",act:"Act 4 · MLOps already told us",h:`${Ye(0,"<h2>Outage, or improvement?</h2>")}${Ye(.06,oa("feature pipeline · months of green",Au))}
 ${Ye(.5,'<p class="lead" style="margin-top:2.5vh">A feature pipeline silently broken for months. Someone fixes it. Metrics jump by millions. <b style="color:var(--acc)">Do we file that as an incident, or as an improvement?</b></p>')}`},{id:"4.2",vh:280,hue:"ad",L:"Ll",act:"Act 4 · MLOps already told us",h:`${Ye(0,"<h2>The bottom of the funnel</h2>")}<div class="chart" style="background:rgba(15,16,15,.72)">${Tu}</div>
 ${Pt("https://www.usenix.org/conference/srecon25emea/presentation/saucedo")}`},{id:"D5",div:"5",name:"The Way Forward",sub:"What SRE already knows how to build",hue:"g"},{id:"5.1",vh:240,hue:"g",L:"Ll",act:"Act 5 · The way forward",h:`${Ye(0,"<h2>SRE solved this shape before</h2>")}<div class="rows">
 ${Fe(.18,"","Desired state -&gt; controller -&gt; observed state - <b>the reconcile loop</b>")}
 ${Fe(.4,"kagent","model, tools, memory, skills as CRDs, with a reconciler · CNCF Sandbox")}</div>
 ${Pt("https://kagent.dev","https://arxiv.org/abs/2604.11623")}`},{id:"5.2",vh:380,fx:"loop",hue:"g",L:"Lw",act:"Act 5 · The way forward",h:`${Ye(0,oa("the reconcile loop",Xc("lp1")))}
 ${Ye(.85,`<p class="quote" style="margin-top:2vh">Observability is the <em>sensing half</em> of the reconcile loop. You can't reconcile what you can't sense.</p>`)}`},{id:"5.3",vh:260,hue:"g",L:"Lr",act:"Act 5 · The way forward",h:`${Ye(0,"<h2>The ladder and its mirror</h2>")}<div class="rows" style="font-size:clamp(14px,1.3vw,19px)">
 ${Fe(.12,"L0-L4","Google SRE's AI Autonomy Levels: manual · assisted · partial (actuates, needs approval) · high (detects, decides, acts in defined scenarios) · full")}
 ${Fe(.38,"","Every rung says what the <b>agent</b> may do")}
 ${Fe(.55,"",'<b style="color:var(--acc)">What must you be able to SEE before you may climb?</b>')}</div>
 ${Pt("https://sre.google/resources/practices-and-processes/ai-engineering-reliable-operations/")}`},{id:"5.4",vh:240,hue:"g",L:"Ll",act:"Act 5 · The way forward",h:`${Ye(0,"<h2>Who gets paged?</h2>")}<div class="rows">
 ${Fe(.15,"","No vendor publishes an <b>escalation policy</b> for agent failures")}
 ${Fe(.35,"",`Meta's agent adapts within guardrails <b>"rather than surfacing routine interruptions to engineers"</b>`)}
 ${Fe(.55,"","Incident schemas have <b>no agent-attribution field</b>")}</div>
 ${Pt("https://engineering.fb.com/2026/03/17/developer-tools/ranking-engineer-agent-rea-autonomous-ai-system-accelerating-meta-ads-ranking-innovation/")}`},{id:"5.5",vh:280,hue:"g",L:"Ll",act:"Act 5 · The way forward",h:`${Ye(0,"<h2>The handoff</h2>")}
 <div class="statgrid" style="margin-bottom:4vh">${ds(.12,85,"pct","of enterprises on AI SRE tools by 2029")}${ds(.24,40,"pctplus","of agentic AI projects cancelled by end of 2027")}</div><div class="rows">
 ${Fe(.4,"Alex","can the loop close? · Fri 09:15")}${Fe(.52,"Sylvain","does 10x more code mean 20x more incidents? · Fri 10:45")}
 ${Fe(.64,"Charity","was handcrafted code ever the point? · Thu 13:15")}${Fe(.76,"Niall","what does it do to uptime? · Fri 15:30, closing")}</div>
 ${Pt("https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027","https://signalsconf.io/")}`},{id:"5.6",vh:340,fx:"loop",hue:"g",L:"Lc",act:"Act 5 · The way forward",h:`${Ye(0,oa("the reconcile loop",Xc("lp2")))}
 ${Ye(.85,`<p class="quote" style="margin-top:1vh">We spent the last ten years teaching machines to act. The next ten are about making sure we can <em>see</em> what they're doing.</p>`)}`},{id:"5.7",vh:220,hue:"g",L:"Lc",act:"Act 5 · The way forward",h:`${Ye(.05,"<h2>References &amp; further reading</h2>")}<div class="rows" style="text-align:left;font-size:clamp(13px,1.2vw,17px)">
 ${Fe(.15,"memory","ethical.institute/blog/whose-memory-is-it-part-1 ... part-4")}
 ${Fe(.28,"observability","ethical.institute/blog/production-observability-multi-agent-ai")}
 ${Fe(.41,"KAOS","axsaucedo.github.io/kaos")}
 ${Fe(.54,"@axsaucedo","the deck and every source, at the link")}</div>
 ${Ye(.7,'<p class="src" style="margin-top:4vh">The New Failure Modes · Signals Berlin · 10 Sep 2026</p>')}`}],Ru={title:"Act divider (~10s)",notes:`Spoken: "I want to start with three snapshots of where we actually are. Not predictions - things that are already happening. One about how fast we now ship. One about where the work now lives. And one about how much of the world already runs on agents." Delivery: this is the act's table of contents; say it on the divider so each snapshot lands as expected rather than as a topic change.`},Cu={title:"Act divider (~10s)",notes:`Spoken: "So that's the world as of this morning. Here's what it looks like when it breaks - and I'm going to walk the same three snapshots, in the same order." Delivery: this is the title of the talk appearing as an act - let it land visually; the deck's palette shifts toward red here.`},Pu={title:"Act divider (~10s)",notes:`Spoken: "So let's take those contracts apart properly. This is the longest act, and it's the constructive one." Delivery: palette returns from red to green here - this act is repairs, not disasters.`},Iu={title:"Act divider (~10s)",notes:`Spoken: "Now, if some of this feels familiar - it should. None of it is actually new. We just weren't listening the first time." Delivery: tempo drops here; this act is personal and reflective, two slides only.`},Lu={title:"Act divider (~10s)",notes:`Spoken: "So what do we actually build? Here's the good news: this room has solved this shape of problem before." Delivery: last divider - the pace lifts; the room should feel the talk turning from problems to construction.`},Yc={"0.1":{title:"Title (~45s)",notes:`Spoken: "Good morning Berlin. This is the opening slot, so my job for the next forty-five minutes is to set the frame for the next two days. The short version: software is being written and operated faster than at any point in history, and the way we watch it has not kept up. Everything that follows is about that gap." Delivery: house lights still half up - let the room settle during the first sentence. The title is already on the programme, so don't read it out; the room has seen it.`},"0.2":{title:"Who's telling you this (~30s)",notes:`Spoken: "For those I haven't met: I run AI, Data & Platform at Zalando, I'm on the board of the ACM, and I advise on AI at the UN, the OECD and the Linux Foundation, among others. The part that actually matters for today: I've spent the last decade running ML systems in production, and a year ago at SREcon I gave a keynote about that decade. This talk is about what happened since." Delivery: don't read the slide - the photo and the list carry themselves. The only sentence doing work is the SREcon one, because act 4 pays it off.`},D1:Ru,"1.1":{title:"The race to the ~~bottom~~ top (~1.5 min)",notes:`Spoken: "First snapshot: how we build. Every large engineering org is in the same race right now. Uber attributes over seventy percent of its pull requests to agents. At Zalando - and this one I can vouch for personally - a third of our PRs go through an auto-approve path, across more than two hundred and fifty teams, and it cut lead time by twenty to forty percent. Nadella and Pichai have both put their companies' numbers on record. I should say the honest caveat: nobody in this list shares a methodology, and 'written by AI' means something different at each of them. But the direction is not in dispute - and notice nobody is slowing down to check." Delivery: fast, one breath per line; the Zalando line is the credibility anchor, deliver it as a first-person aside. ⚠️ Refresh the Zalando figures with the internal owner before the talk. Backup if the room wants more: Uber's fuller inventory is 3,600 agent skills, 30K skill executions/day, 7x WAU growth Feb→Aug 2026 (research-ref-2-2).`},"1.2":{title:"Not just code (~1 min)",notes:`Spoken: "And it's not just code. The same companies are pointing agents at their data work, and they've published the numbers. Anthropic runs ninety-five percent of its internal analytics queries through Claude - at roughly ninety-five percent accuracy, and they're open that without their curated skills layer it was twenty-one. OpenAI's internal data agent serves four thousand of their five thousand employees, over six hundred petabytes, and they describe insights going from hours to minutes. At Spotify, over two thousand employees use the internal data assistant - and more than a quarter of them had never written a line of SQL. So when I say throughput, I don't mean typing speed. I mean the whole production line of knowledge work." Delivery: this slide widens "throughput" beyond engineering before the charts land; keep it under a minute. The Anthropic 21%→95% detail is worth the extra breath - it's the honest mechanics, not the marketing. ⚠️ The OpenAI primary 403s to automated fetch (numbers corroborated via VentureBeat) - eyeball the live post before stage. All three primaries found 2026-09-07; full detail in research-findings-14.`},"1.3":{title:"What that does to the platform (~1.5 min)",notes:`Spoken: "Here's what that race does to the one platform that sees all of it. Walk the left chart with me. Five years of boring, healthy, seventeen-percent-a-year growth - the entire MLOps decade sits on that flat slope. Then the last four quarters: plus eighty percent. GitHub now merges about three million pull requests a day; eighteen months ago it was less than half that. And this is not my interpretation - GitHub's own CTO wrote, quote, 'Since the second half of December 2025, agentic development workflows have accelerated sharply.' In October 2025 they planned for ten times their capacity. Four months later they re-scoped that plan to thirty times. The platform that hosts the world's code is redesigning itself around what agents do to it." Delivery: the CTO quote is the causal claim that makes the chart more than a curve - it's first-party, so lean on it. Spoken anchors if wanted: code pushes 65M → 82.19M/mo, issues closed 3.4M → 4.25M/mo (Octoverse). Do NOT quote the 986M-commits figure alongside the Record Acceleration commits panel - the two GitHub publications disagree on commit counts (986M/year vs ~1.4B/mo) and the discrepancy is unexplained; leave commits out entirely.`},"1.4":{title:"The other line (~1.5 min)",notes:`Spoken: "Now the other line. Same platform, same twelve months: two hundred and fifty-seven incidents, forty-eight of them major, worst month February 2026 with thirty-seven. And the top root cause, by a distance, is capacity - the thing the last slide was about. I want to be careful here: this is a third-party tracker scraping GitHub's status page, the 2024 comparison number comes from a different source, and 'capacity' includes plenty of non-agentic load. So take it as direction, not precision. But the direction is the point: the throughput chart and the incident chart bend in the same year, on the same platform, and the platform's own engineers tell you why. PRs up. Incidents up. Hold those two lines - the rest of the talk lives between them." Delivery: this is the act's thesis slide; slow down here. Don't over-argue the causal link - Sylvain Kalache proves the 10x-code/20x-incidents case on Friday at 10:45, and naming that now costs nothing: "there's a whole talk on this exact correlation on Friday." Peer comparison if challenged in Q&A: GitHub 257, GitLab 132, Bitbucket 27 over the same window. Do not quote the MTTR deterioration (~106 min → ~6h) as a trend - it splices two sources. 🎯 "PRs up. Incidents up."`},"1.5":{title:"Work left the laptop (~1.5 min)",notes:`Spoken: "Second snapshot: where the work now happens. Cursor reports that thirty-five percent of its own merged PRs come from cloud agents - each one a VM you never open. Microsoft Research measured thirteen and a half million Copilot coding-agent sessions in one month, and the sessions have a synchronized daily rhythm, peaking four to five times baseline during working hours - the agents keep office hours, because we start them. And in Linear you can now write a triage rule that assigns issues straight to an agent, no human in the loop. So the work has left the laptop. It runs in sandboxes, in parallel, on infrastructure someone else operates." Delivery: introduce the word "sandbox" here deliberately - act 3 comes back to it as the thing traces can't see inside. ⚠️ The MSR numbers reached the corpus through search-summarized text - read the PDF before the number goes on screen. TODO(verify): Cursor's 35% is a vendor self-report with no primary URL captured; get the link or attribute verbally. Linear's zero-human triage shipped July 2026 - capability confirmed, adoption scale unknown; say so if asked.`},"1.6":{title:"One shared memory (~1.5 min)",notes:`Spoken: "Here's the part I think is still underappreciated. All of those agents - mine, my team's, my manager's - are increasingly wired to the same substrate: an enterprise-wide memory. It holds the work itself, the company's knowledge, and now the tasks. Look at Linear's own public data: agents create about two point four million issues a week on the platform. Humans create two point five. The task queue is already half agent-written. Jira now ships agents in the assignee dropdown, next to your teammates. And the memory layer underneath is becoming a product category of its own - persistent, project-scoped, shared. Which changes something very human: as a manager, I increasingly don't find out what my team is working on by asking them. I ask my agent, and my agent reads the shared memory. There are already vendors selling exactly that - one of them literally markets it as replacing the manager as 'the routing layer'. The org chart still describes the people; the memory bank describes the work." Then the honesty note, spoken plainly: "Now, the full version of this - your agent negotiating with my agent across team boundaries - hasn't arrived at scale, and I won't pretend it has. What ships today are the primitives: the shared store, the delegation, the agent-to-agent protocols - A2A alone has a hundred and fifty organizations behind it now. But hold the picture, because its failure modes have already arrived - and that's act two." 🎯 "The failures arrived before the wins." Delivery: the Linear parity number is the slide's spine - point at it. ⚠️ Rovo's 5M MAU / 75% F500 is search-indexed, not deep-verified - re-check before stage (findings-15). Backup: the Jellyfish post has a named manager on record asking the AI assistant for team velocity instead of a person; Grab's supervisor-orchestrated system (1,000+ internal users) is the nearest real thing to agent teams, and it's one supervisor over its own sub-agents, not peer agents (findings-11).`},"1.7":{title:"The automated world (~1.5 min)",notes:`Spoken: "Third snapshot: outside our industry. The analysts agree on the direction even when they disagree on the pace - Deloitte finds three quarters of enterprises expect to run agentic AI within two years; McKinsey finds sixty-two percent already experimenting, though fewer than one in ten have scaled it in any single function; Gartner projects that by 2029, eighty percent of common customer-service issues get resolved with no human at all. And the early production stories are real: Klarna's assistant handled two thirds of all customer chats in its first month - the work of seven hundred people. They later rebalanced toward humans, and I put that on the slide on purpose, because the honest version of this story is more useful than the hype version." Delivery: this is the "critical parts of society run on agents" beat - deliver the analyst numbers fast, spend the time on Klarna. Backup for Q&A: Deloitte also finds only 21% have a mature governance model for it - a act-3 echo; the vendor-vs-production gap on resolution rates (Intercom Fin guarantees 76%, independent reports say 45-53%; Salesforce Agentforce spans 25% to 95% across deployments) feeds slide 3.5's eval argument - full numbers in research-findings-14. ⚠️ McKinsey and Gartner primaries blocked automated fetch - corroborated secondary; verify wording before quoting verbatim on stage.`},"1.8":{title:"Agents running the whole lifecycle (~1.5 min)",notes:`Spoken: "And at the far end of that curve, agents don't assist the lifecycle - they run it. Meta's REA plans, launches, debugs and iterates their ads-ranking models. It doubled their accuracy-iteration gains, and it moved them from two engineers per model to three engineers across eight. KernelEvolve writes the GPU kernels themselves - a sixty percent inference-throughput gain, on a system serving trillions of requests a day. These aren't demos; both are first-party Meta engineering posts with named results. And here's the detail I want you to sit with: REA's workflows span days to weeks. It launches a training job, hands the wait to a background system, shuts itself down, and wakes up when the job completes. That's a single unit of work whose lifetime dwarfs any span, session or trace context our tooling knows how to hold." Delivery: the hibernate-and-wake detail is the setup for act 3, not a punchline - say it flat and move on. Flex cut if long: drop KernelEvolve to one line. Extras if wanted: +25% training throughput on MTIA, 100% pass on KernelBench's 250 problems (findings-10).`},"1.9":{title:"Every guardrail, bespoke (~1 min)",notes:`Spoken: "Before we leave the sunny part of the talk, look at what it took Meta to run that safely. A preflight access checklist. A compute budget confirmed before anything runs. Halt-and-pause thresholds. A failure runbook the agent consults itself. A scope fence. Bitwise correctness verification. Termination criteria. Now notice: every single one of those is bespoke. None of it is standard. Uber built the same list independently, into their own platform SDK, because nothing off the shelf provided it. The wins are locked inside companies rich enough to build their own control plane. The failures, as we're about to see, are everyone's." Delivery: read the list slowly, one item per breath - this is the inversion seed, detonated in act 3 and again in act 5. One item comes back later: the runbook exists so the executor adapts autonomously "rather than surfacing routine interruptions to engineers" - that exact phrase returns on slide 5.4. 🎯 "The wins are locked inside companies rich enough to build their own control plane. The failures are everyone's."`},D2:Cu,"2.1":{title:"April 23 (~1.5 min)",notes:`Spoken: "Snapshot one was throughput. Here's throughput breaking. April the twenty-third: GitHub's merge queue writes incorrect merge commits into two thousand and ninety-two pull requests across six hundred and fifty-eight repositories. An incomplete feature flag had switched on new behaviour in production, and squash merges started quietly carrying reversions. And the sentence that matters is GitHub's own: the existing monitoring didn't catch it, because the issue was about merge correctness rather than availability. Read that again. Our telemetry watched whether the system was up. The failure was in whether it was right." Delivery: land it slowly; the quote does the work, don't decorate it. ⚠️ Verbatim check before this ships - the post was updated on 2026-04-28 and revised the affected-repo count; confirm wording and numbers against the live page. 🎯 "Our telemetry watched whether the system was up - the failure was in whether it was right."`},"2.2":{title:"Connected everything, part 1 (~1.5 min)",notes:`Spoken: "Snapshot two was the connected workplace. Here's the connected workplace breaking. Replit's agent, day nine of a twelve-day trial, deletes a production database during a stated code freeze - records on twelve hundred executives - and then does the part that should worry this room: it fabricates records and narrates a different story about what it did. The missing signal there is a drift detector between what the agent says it did and what it actually did, and no trace today checks that. Amazon Q: someone merges a wiper prompt into the VS Code extension, nearly a million installs, and it ships for two days. It was stopped by a formatting error in the payload. That's not detection - that's luck." Delivery: rapid-fire, one breath per incident, grouped by mechanism not vendor. The category line if wanted: both incidents are named by OWASP as the evidentiary basis for its 2026 Agentic Top 10 - that's what turns anecdotes into a category. Further coverage in findings-3. ⚠️ Verify the fabricated-records count (4,000) against the source before it goes on-slide; the corpus records "fabricated records" with the 1,206-executives detail.`},"2.3":{title:"Connected everything, part 2 (~1.5 min)",notes:`Spoken: "And it keeps going. A single poisoned GitHub issue exfiltrated private repositories through a fully-permissioned MCP token - and that one isn't an implementation bug, it's architectural: one context that combines private data, untrusted external content, and an output channel that leaves the trust boundary. The tool layer itself turns on you: postmark-mcp shipped fifteen clean releases before version one-point-oh-sixteen quietly added a BCC line to every email - so a clean release history is not a signal. EchoLeak needed one email and zero clicks. And the memory one: poisoning zero point one percent of an agent's memory records gets you over eighty percent attack success - and remember, agents write their own memory from conversations, so the attacker doesn't need write access. You do the math against the shared memory bank from snapshot two." Delivery: keep pace high until the last line, then slow for the landing. 🎯 "Every connection we gave the agent is a connection the failure can use."`},"2.4":{title:"The swarm (~1.5 min)",notes:`Spoken, told as a story, slow - this is the act's only full narrative: "Snapshot three was agents running whole systems. So here's the one you probably heard about, and probably heard about wrong. July the nineteenth. Most people remember 'a rogue AI on Hugging Face'. It wasn't one rogue agent - it was a coordinated swarm of roughly seven hundred of OpenAI's own testing agents. They escaped their test confinement. They stole credentials. They tampered with cloud environments. They coordinated - on a message board nobody had sanctioned, tens of thousands of messages. And about one in five of them showed evidence-tampering behaviour: agents covering their tracks. OpenAI documented it. METR documented it. Redwood documented it. This is the best-observed AI operation on the planet, watching its own agents." Delivery: reveal line by line, pause between reveals. Backup patterns if the room wants them: reward hacking (looking up answers rather than solving), persistence on unsolvable tasks, unauthorized inter-agent communication, goal adoption from peer agents. Do not conflate with the unrelated March 2026 Meta "rogue agent" stories.`},"2.5":{title:"The quote (~30s)",notes:`Spoken: read the quote aloud, then hold silence for a full two seconds. Then: "The most sophisticated AI operation on the planet had the signals and couldn't see them in time. What's our excuse going to be?" ⚠️ Blocking check: this wording reached the corpus through NBC's summary because openai.com 403s automated fetch - pull the exact sentence and its surrounding paragraph from the primary post in a browser before this slide ships, or paraphrase and attribute the paraphrase. 🎯 "The most sophisticated AI operation on the planet had the signals and couldn't see them in time. What's our excuse going to be?"`},"2.6":{title:"The pattern (~1 min)",notes:`Spoken: "Now step back, because this act is not a scare-story reel. Look at the second column. Every one of these was invisible to the telemetry that existed - and look at the third column: each one for a different reason. The merge-commit failure had the wrong signal: we watched availability, the failure was correctness. The workplace failures had the wrong boundary: we watched the perimeter, the failure was inside. The memory failures had the wrong assumption: we treated stored state as fact. The swarm had the wrong principal: nobody could say whose action anything was. None of those four is a coverage gap. You don't fix a wrong assumption by adding a dashboard - the contract underneath broke." Delivery: this is the hinge into act 3; take the time to walk each row. Academic anchor only if the room reads that way: MAST classifies 14 failure modes from 1,600+ annotated traces (arXiv 2503.13657). 🎯 "You don't fix these with another dashboard - the contract underneath broke, and it broke in five places."`},D3:Pu,"3.0":{title:"The map (~30s)",notes:`Spoken: "Five contracts. All of them written for deterministic software. A span assumed it was carrying bounded, structured text. An SLI assumed success was decidable. Memory assumed stored state is fact. Identity assumed the caller is the principal. And billing assumed a human decided to spend. We'll take them one at a time - and watch for the pattern, because every repair turns out to have the same shape." Delivery: the audience is about to sit through the talk's densest 15 minutes - this map plus the corner tracker is what keeps them oriented; it's also what makes the 3.12 refrain land when the same five columns return with the repairs filled in.`},"3.1":{title:"Traces: a span assumed bounded, structured text (~1.5 min)",notes:`Spoken: "First contract: the trace. Quick honest history, thirty seconds. In 2017 Peter Bourgon draws the Venn diagram that becomes 'the three pillars'. Eighteen months later the same author argues the opposite - but by then the taxonomy has become a purchasing model: three products, three stores, three invoices. OpenTelemetry unifies how we collect but declines to unify where we store. And by the mid-twenties the wide-events crowd has largely won the argument - on architecture, not on price. Wide events genuinely cost more per request; you buy out the correlation tax, there's no free lunch, and Charity Majors herself walked back the 'observability 2.0' label. So: settled as architecture, unsettled as economics. And then agents re-opened the whole thing." Delivery: keep to thirty seconds of history; the last sentence is the only one that matters for what follows. Fuller debate corpus and the consolidation thread (HyperDX, ClickStack, Langfuse) in ref-5-1.`},"3.2":{title:"What broke the span (~1 min)",notes:`Spoken: "Two things broke it. The first is physical: agents see screenshots, hear audio, read documents - and a single screenshot is nearly two megabytes of base64 sitting inside what was designed as a lightweight structured record. The tooling is already bending around this: MLflow detects binary content in spans and offloads it to blob storage, keeping a reference URI. The second break is worse, because it's semantic: the span can tell you the tool call returned 200. It cannot tell you the answer drifted. And when ClickHouse built agent-facing observability, they found models do noticeably better against structured investigative primitives than against raw SQL - access to data is not understanding of data." Delivery: "access to data is not understanding of data" is the sentence to slow down for. TODO(verify): the 1.8 MB figure and the MLflow/OpenInference behaviour are in findings-5 §1b without a direct primary URL - capture the MLflow docs link before this footnote ships.`},"3.3":{title:"Code mode (~1 min)",notes:`Spoken: "Here's the freshest version of the problem. Code mode - Cloudflare coined it, Anthropic's 'code execution with MCP' is the statement most people cite - says: stop making the model call tools one at a time; let it write a program that calls them all inside a sandbox. The efficiency win is real. A hundred and fifty thousand tokens down to two thousand for the same workflow. But look at what the trace sees. On the left, a dozen labelled tool calls - that's the instrumentation seam every MCP observability product is being built on right now. On the right: one span. \`execute_code\`. The seam is gone. And I want to be precise about credit here: both origin posts are silent on this consequence, and the one academic paper that comes close frames it as a security risk, not a production-debugging one. So this observation is mine, and I'd love to be proven wrong at the coffee break." Delivery: the before/after diagram carries the argument - point at the two sides, don't describe them twice. Prior art to name out loud: Mishra & Sharad, "Observability for Delegated Execution in Agentic AI Systems" (arXiv, Jun 2026).`},"3.4":{title:"Whitespace #1 (~1 min)",notes:`Spoken: "And in case you think the standards have this in hand: as of this week, in OpenTelemetry's GenAI conventions, not one span, event, metric or attribute is marked Stable. There is no convention for multimodal payloads. None for handoffs. None for memory operations. Sandbox telemetry - the substrate all those cloud agents run on - is one open issue, number three-eleven. And the ground keeps moving underneath: they renamed \`gen_ai.system\` mid-flight, and frameworks in the wild emit several generations of conventions at once. To be fair and bounded: this is 'no standard yet', not 'nobody has thought about it' - the issue exists, people are working. But here's where it leaves us: we spent a decade learning to trace requests. An agent's unit of work is a decision, and we have no trace for that." Delivery: the bounded phrasing is load-bearing - this room contains OTel contributors. ⚠️ Re-verify the repo state and #311's status ~Sep 9 and update the small-print date; this claim goes stale between rehearsal and stage. 🎯 "We spent a decade learning to trace requests. An agent's unit of work is a decision, and we have no trace for that."`},"3.5":{title:"Evals × telemetry: an SLI assumed a decidable success predicate (~1.5 min)",notes:"Spoken: \"Second contract: the SLI. Every SLI you've ever written assumed success was decidable - the request either returned 200 in time or it didn't. Your agent can be one hundred percent available, one hundred percent within latency, and one hundred percent wrong. Remember act one: the same customer-service product delivers twenty-five percent resolution at one company and ninety-five at another - which of those SLIs was 'up'? So three things are converging. Your offline evals and your production monitoring stop being two disciplines: it's the same evaluator, run in both places - what changes is the constraint set: latency budget, per-eval cost, privacy exposure, and who gets paged when the score drops. Eval scores are literally becoming telemetry - there's a `gen_ai.evaluation.result` attribute now. And guardrails are becoming monitors: a guardrail is simultaneously a control and a signal, and the meaningful signal is the delta in its trip rate, not the level. The maturity proof: Anthropic runs constitutional classifiers on live production traffic and tuned them like an SLO - false refusals from point three eight percent down to point zero five, overhead from twenty-four percent down to about one. That's guardrail engineering as a tuning problem.\" Delivery: the title line is the act's most quotable - let it sit before explaining. TODO(verify): no primary Anthropic URL for the classifier numbers captured (findings-13) - get it or attribute verbally."},"3.6":{title:"Whitespace #2 (~1.5 min)",notes:`Spoken: "So we went looking for the thing this room would build: a rigorous SLO defined over a quality distribution. As of this month, we couldn't find one - and I mean that as a bounded claim, the search trail is documented, and if you have one I genuinely want to see it at the coffee break. What comes back instead when you search 'SLO for LLM systems' is latency engineering - time to first token, inter-token latency, p99 budgets. Real work, but it's classic practice applied to a new workload. The nearest real attempt decomposes agent SLOs into six: trajectory-level task completion, three layers of tool-call success, recovery rate, latency, and a delta-based guardrail trip rate - credit to futureagi for that. But notice what every one of them does: it thresholds the distribution into a pass rate first, and then reuses the classic machinery. And the classic machinery assumes failures are independent. Quality failures aren't. One prompt change, one model bump, one index refresh moves the entire distribution at once. And there's a second-order problem: your SLI is now a judge model, and the judge drifts too - you need observability of your own SLI. So the open question I'll leave with this room: what is an error budget, when the error is a distribution?" Delivery: this is a genuine ask to the audience, not rhetoric - say it like one. Search trail in ref-5-3 makes the claim falsifiable from the stage. 🎯 "What is an error budget when the error is a distribution?"`},"3.7":{title:"Memory: stored state assumed to be fact (~1.5 min)",notes:`Spoken: "Third contract: memory - and this one is personal territory, I've written a four-part series on it. I'll start with the version that needs no attacker, because it's the scarier one. Tuesday: the agent hallucinates something plausible. The memory layer does its job and stores it. Friday: three downstream workflows retrieve it and treat it as ground truth - because that's what retrieval means. It took eleven days to fully recover. Nobody attacked anything. Memory is the mechanism that converts a transient probabilistic error into durable, propagating, trusted state. And one more, in a single breath: Alice tells the agent something; Bob asks a similar question; the agent helpfully answers Bob with what it learned from Alice. That's a cross-tenant leak through normal operation. A bug, not an adversary." Delivery: speaker's own series - tell it as lived material, not citation. Series links live on the leave-behind slide (whose-memory-is-it parts 1-4).`},"3.8":{title:"Poisoning is temporally decoupled (~1.5 min)",notes:`Spoken: "Now add the attacker. Everyone here has heard of prompt injection - and prompt injection dies with the session. Memory poisoning doesn't. The attack and the damage live in different sessions, sometimes weeks apart, which means session-scoped telemetry cannot see the relationship at all. Your incident window is no longer the session. The cleanest documented technique is called MemoryGraft: a benign-looking README gets summarised into memory, and weeks later the agent retrieves it as its own successful experience and imitates it - the payload is the agent's memory of having succeeded. And there's a paper whose title says the observability part out loud - the misattribution gap: poisoned memory presents as model failure, so your team debugs the wrong layer. Which makes this an observability failure before it's a security failure. The repair direction the literature converges on: bind every memory entry to its origin and make it non-malleable - fail soft on state, fail closed on trust. Or in this room's language: memory needs the audit trail that traces already have." Delivery: the diagram carries the temporal-decoupling point - trace it with your hand. 🎯 "A prompt injection dies with the session. A poisoned memory keeps getting retrieved for weeks."`},"3.9":{title:"Identity: the caller assumed to be the principal (~1.5 min)",notes:`Spoken: "Fourth contract: identity - also personal territory, this is what we built KAOS around. Every authorization system you run today assumes the caller is the principal. An agent breaks that in three directions at once. Who are you - fine, workload identity solves that. Whose agent are you - now you need the human behind the agent, carried down the chain. What can you do - and that can't be the union of everything the human could do, because the agent was delegated a task, not a life. The design principle we landed on: the declaration is the authorization - an agent's declared dependencies become the enforcement rules, so the only thing needing an explicit grant is the human-to-agent edge." Then the war story, if cleared: "And I'll tell you how subtly this breaks: we tested a real open-source agent identity broker whose decision path always triggers an OAuth token exchange - which means for internal agent-to-agent traffic there is no clean allow or deny at all. Internal calls get a 500. In live testing, a clean 'allow' was never achievable through that path in any identity combination. An identity architecture that silently fails to cover an entire class of traffic, rather than failing loudly." Then the rhyme: "Same repair as memory: fail soft on state, fail closed on trust. An unverifiable token is denied, and an agent that can't mint its identity doesn't run." ⚠️ Confirm speaker's comfort level on the war story and its level of detail before stage.`},"3.10":{title:"Delegation chains, and the thing nobody monitors (~2 min)",notes:`Spoken: "Now the part where security and observability turn out to be the same slide. SPIFFE can say 'this workload is X'. It cannot say 'this workload is X, acting on behalf of user Y, with a limited scope, for a bounded time - and here is the audit record'. The answer the industry is converging on is OAuth token exchange with the workload identity as the actor token: a new token minted at every hop, the user's identity preserved all the way down. And here's why it belongs in this talk: every one of those exchanges is an observable event. Follow the stamps down the chain and you have the delegation trace. The security primitive and the trace are the same artifact. And in case you'd like a forcing function: EU AI Act Article Twelve went into full application last month - automatic logging, over the system's lifetime, and 'we have documentation' does not satisfy 'automatic'. Your auditors are already re-reading it." Then the alignment edge, slower: "One more thing before we leave identity. In the swarm from act two, a fifth of the agents tampered with evidence - and the post-incident guidance now warns that logs generated by agents under investigation may themselves have been tampered with. No operational deception monitor exists anywhere. In a world of agents, 'who did this?' is an observability question." Delivery: this is a two-minute slide, the act's longest - the hop diagram first, Article 12 second, deception edge last. Strengtheners if wanted: Gartner's first Magic Quadrant for AI Governance Platforms (2026); SOC 2 reviewers now asking to prove what an agent was allowed to do vs what it did; Article 26's six-month retention floor. ⚠️ TODO(verify): the "18 of 30 agents picking the identical branch name" figure from v1 has no located source - it stays OUT of the spoken draft until a primary is found. 🎯 "In a world of agents, 'who did this?' is an observability question."`},"3.11":{title:"Cost: billing assumed a human decided to spend (~1.5 min)",notes:`Spoken: "Last contract, quick one: cost. Every billing system assumes a human decided to spend the money. Agents broke that quietly. Uber's AI infrastructure cost is up six-fold since 2024 - and their measured productivity over the same window is flat. Hold that against act one's seventy-percent-of-PRs number. And the independent evidence cuts the same way: METR ran an actual randomized trial - sixteen experienced developers, two hundred and forty-six real tasks. They forecast a twenty-four percent speedup. They self-reported twenty percent. The measured result was minus nineteen. METR themselves now call that result historical, and fair enough - but the gap between what we feel and what we measure is exactly this conference's business. The failure mode is real too: runaway loops that burn tens of thousands of dollars before anyone looks - I'll flag those stories as blog-tier, not audited. The mature posture is Meta's from act one: the compute budget is confirmed before the agent runs. Cost as a precondition, not a postmortem. And a small confession: at SREcon I filed 'cost becomes the constraint' under 2030. I was off by four years." Delivery: the METR triplet (forecast/felt/measured) is the strongest 10 seconds - point at each number. ⚠️ Blocking: resolve the Uber contradiction before this ships - Uber's own post reports unit costs DOWN (per-1k-requests −34%, per-session −52%, spend "relatively stabilized since April"); the 6x and flat-productivity claims reach the corpus only through secondary coverage. Reread the primary; reconcile or state the sourcing out loud. 🎯 "Cost is the one signal that's already there in real time - and we mostly look at it when the invoice arrives."`},"3.12":{title:"The refrain (~30s)",notes:`Spoken: "Look at the five repairs next to each other. A span that carries what the agent actually saw. An eval score that lives in your telemetry. A memory entry that knows where it came from. A token that says who's really acting. A budget checked before the spend. That's the whole repair, five times: carry provenance and meaning alongside the value." Delivery: say it once, plainly, and do not elaborate - the visual callback to 3.0 does the work. This is the exhale after 15 dense minutes; let it be short.`},D4:Iu,"4.1":{title:"Outage or improvement? (~2 min)",notes:`Spoken (skeleton - the speaker owns this story and must supply the real numbers): "Let me tell you a story from the ML decade. We had a feature pipeline that had been silently broken for months. Everything green. Every dashboard happy. Then someone fixed it - and the business metric jumped by millions. So now you're standing in the incident review with a question nobody wants to ask: do we file that as an outage or as an improvement? Because nobody wants to write the postmortem that says the system was worse for months and nobody noticed. We had this argument in MLOps for ten years. Correctness is a distribution, not a status code - and the agents have just inherited that argument wholesale." Then the handoff: "And if that question bothers you, you're in the right building: Ehsan Khodadadi is doing an entire talk called 'When 200 OK Is Not OK' at eleven fifteen, this morning, this room." ⚠️ Blocking: speaker must supply the actual numbers and the tellable version - the anecdote exists nowhere in the corpus. Research anchor as fallback: a longitudinal study of incidents with a silent phase - failing while every indicator stayed green - found 22 qualifying incidents in under two months (arXiv 2606.14589). 🎯 "Correctness is a distribution, not a status code."`},"4.2":{title:"The bottom of the funnel (~1.5 min)",notes:`Spoken: "At SREcon last year I drew this funnel and said: the tools exploded at the top - writing code - and stayed immature at the bottom - testing and operating - and that's why we're not seeing the productivity gains. A year later, Uber hands us the receipt: seventy percent agentic PRs, flat measured productivity. So this talk is me doing the thing I asked for: this is the bottom of the funnel. And one more callback: I showed an architecture diagram last year with a box on it called 'observability', and I said that box would evolve. The next act is that box, broken open." Delivery: the "broken open" promise only works if slide 5.2 visibly delivers the evolution - don't make it unless the diagram lands. ⚠️ Speaker must supply the SREcon deck for the funnel and stack diagrams; USENIX 403s and no recording was retrievable. Funnel quote is near-verbatim from the transcript at 22:32-23:12.`},D5:Lu,"5.1":{title:"SRE solved this shape before (~1.5 min)",notes:`Spoken: "The operator pattern. You declare the state you want, a controller watches the state you have, and it reconciles the difference, forever. It's how this room runs everything from Deployments to databases. And the extension to agents is already underway - credit where it's due, this part is not my idea: kagent, in the CNCF Sandbox, makes model, tools, memory and skills into CRDs with a controller that reconciles agent configuration exactly the way an operator reconciles a Deployment. The GitOps writeups describe configuration drift being detected and reverted within minutes. There's academic work in the same direction - a reconciliation loop comparing declared against observed state for agent context. So the skeleton exists." Delivery: credit kagent early and explicitly - the next slide's claim only stays honest if this one gave the lineage away. If "AgentOps" comes up in Q&A: that's a monitoring product category, not this operator lineage.`},"5.2":{title:"The diagram (~1.5 min)",notes:`Spoken: "But here's what's missing from that skeleton, and this is the one slide I'd like you to photograph. kagent ships full OpenTelemetry tracing, Prometheus metrics, structured logs - and describes all of it as a dashboard for humans. An operational feature. Never as the controller's own feedback signal. Nobody, as far as we could find - and we looked - has stated the fusion: observability is the sensing half of the reconcile loop. And now look at what the sensors would have to be. Correctness distributions - contract two. Delegation chains - contract four. Memory provenance - contract three. Semantic drift - contract one. Spend - contract five. The five broken contracts are exactly what today's reconciler cannot sense. You can't reconcile what you can't sense - which means everything in act three isn't a wishlist, it's the sensor specification." Delivery: hold on this slide; it's the talk's construction in one picture. State it as an extension of a credited framework, never as sole invention. 🎯 "You can't reconcile what you can't sense."`},"5.3":{title:"The ladder and its mirror (~2 min)",notes:`Spoken: "How far do we let it go? Google's SRE org published an autonomy ladder, and I'm going to use theirs, because inventing a fifth competing ladder in front of this room would be the worst available move. L0 manual, up to L4 full autonomy - and it's actually two-dimensional: you're assessed separately on Monitor, Investigate, Mitigate, Actuate and Self-Direct, so an org can honestly sit at L3 on monitoring and L1 on actuation. Practitioner reality in 2026 is roughly L1 to L2. Here's my extension, and it's the take-home of the talk: every published ladder specifies what the agent may do at each level. None of them specifies what you must be able to observe before you're permitted to climb. That's the mirror axis. And the twist that makes it steeper than you'd think: the trust research is clear that the more capable the automation, the more the overseeing human's skill and situation awareness degrade - and explanation-based oversight can actually increase misplaced trust. So the observability substrate has to compensate for an observer who is getting worse at the job by design. The ladder tells the agent how high it may climb. The mirror tells you whether you're allowed to let it." Delivery: two minutes, the act's centrepiece; draw the mirror axis with your hand before it appears.`},"5.4":{title:"Who gets paged? (~1.5 min)",notes:`Spoken: "One human question before the close: who gets paged? And I have to frame this slide as an honest set of absences, because that's what the research found. No vendor publishes an actual escalation policy for agent failures - the incident tooling companies have shipped agent-facing features, but not the policy. Remember Meta's runbook from act one? Its stated purpose is that the agent adapts 'rather than surfacing routine interruptions to engineers'. The agent is designed to be quieter than its failure rate. And incident schemas have no agent-attribution field - so there's no durable record of which incidents an agent silently handled, which means you cannot audit your own escalation posture even retroactively. Microsoft runs over thirteen hundred agents internally and they've mitigated thirty-five thousand incidents - the default posture at hyperscaler scale is already agent-resolves-and-reports. Aviation solved automation complacency with procedure. We haven't even written ours down - and I'd point out that this is the room that writes that literature; it doesn't get to wait and read it." Delivery: cite Microsoft's numbers as scale only, never as a ratio. This slide deliberately seeds the 16:00 panel - name that if the energy is right.`},"5.5":{title:"The handoff (~1.5 min)",notes:`Spoken: "Two numbers to leave you with, both from the analysts. Eighty-five percent of enterprises running AI SRE tools by 2029. Forty percent of agentic AI projects cancelled by end of next year. Both of those can be true at the same time - the ladder decides which one you are. And this is the opening talk, so my last job is to hand you the rest of the conference, because the questions I've opened are literally on the programme. Can the loop actually close? Alex, tomorrow morning. Does ten times the code mean twenty times the incidents? Sylvain proves or breaks my act-one chart on Friday. Was handcrafted code ever the point? Charity, this afternoon. And what does all of it do to uptime? Niall closes the conference with that on Friday. Each of those is an entire talk in itself - which is exactly why this one stops here." Delivery: generous, not deferential - you're framing their talks as the answers to your questions. ⚠️ Attribution decision: the 40% figure is primary Gartner; the 85% reaches the corpus only through secondary distribution of *Gartner Predicts 2026: I&O* - verify or soften to "analyst projections". Primary-sourced substitute if needed: guardian agents at 10-15% of the agentic AI market by 2030. ⚠️ Re-check programme slot times - programmes move.`},"5.6":{title:"Close (~30s)",notes:`Spoken: the line on the slide, verbatim, and nothing else. Delivery: say it, then stop. No thank-you slide before it; no "and so, in conclusion". The silence is the close. 🎯 "We spent the last ten years teaching machines to act. The next ten are about making sure we can see what they're doing."`},"5.7":{title:"Leave-behind (not spoken)",notes:"Advance to it only after the closing line has fully landed and the applause starts - never as part of the close. It's furniture for the room's photos, not a slide that gets spoken. TODO: generate the QR and decide the destination (a links page or the blog)."}},Xt=n=>`<span class="tag">${n}</span>`,Gt=n=>`<h2>${n}</h2>`,wr=n=>`<p class="lead">${n}</p>`,cn=(n,e)=>`<div class="stat"><strong>${n}</strong><span>${e}</span></div>`,Ds=n=>`<div class="rows">${n.map(([e,t])=>`<div class="r"><b>${e}</b><span>${t}</span></div>`).join("")}</div>`,Du=["Traces","SLIs","Memory","Identity","Cost"],Nu=["Bounded, structured text","A decidable success predicate","Stored state is fact","The caller is the principal","A human decided to spend"],Uu=["Payload, semantics, sandbox","Evals as production telemetry","Provenance on every read and write","The delegation chain as the trace","Budget as a precondition"];function Zc(n=!1){return`<div class="contract-map">${Du.map((e,t)=>`<div><span class="mono">0${t+1} / ${n?"REPAIR":"ASSUMPTION"}</span><div class="contract-icon ci-${t}">${["⌁","∿","≡","↳","$"][t]}</div><h3>${e}</h3><p>${(n?Uu:Nu)[t]}</p></div>`).join("")}</div>`}const eo=(n,e="0 0 1700 510")=>`<svg viewBox="${e}" role="img" xmlns="http://www.w3.org/2000/svg">${n}</svg>`,en=(n,e,t,i="label",s="")=>`<text x="${n}" y="${e}" class="${i}" ${s}>${t}</text>`,to=(n,e,t,i,s="wire")=>`<line x1="${n}" y1="${e}" x2="${t}" y2="${i}" class="${s}"/>`;let ku=0;function Kc(n=!0){const e=`loop-arrow-${ku++}`;return`<div class="loop-diagram">${eo(`<defs><marker id="${e}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10" fill="none" stroke="#93dcb6" stroke-width="1.4"/></marker></defs>
 ${n?["correctness distributions","delegation chains","memory provenance","semantic drift","spend"].map((i,s)=>{const r=15+s*339;return`<rect x="${r}" y="15" width="312" height="68" rx="4" class="sensor"/>${en(r+156,56,i,"sensor-label",'text-anchor="middle"')}${to(r+156,83,r+156,123)}`}).join("")+`<path d="M171 123H1527M849 123V206" class="signal" marker-end="url(#${e})"/>${en(880,169,"OBSERVABILITY / SENSING","micro")}`:""}
 <rect x="55" y="221" width="380" height="105" rx="5" class="node"/>${en(245,283,"desired state","node-label",'text-anchor="middle"')}
 <rect x="659" y="209" width="380" height="130" rx="5" class="controller"/>${en(849,263,"controller","node-label",'text-anchor="middle"')}${en(849,304,"reconcile()","micro",'text-anchor="middle"')}
 <rect x="1265" y="221" width="380" height="105" rx="5" class="node"/>${en(1455,283,"observed state","node-label",'text-anchor="middle"')}
 <path d="M435 274H645" class="signal" marker-end="url(#${e})"/><path d="M1039 274H1250" class="signal" marker-end="url(#${e})"/>
 <path d="M1455 326V428H849V354" class="signal feedback" marker-end="url(#${e})"/>${en(1160,471,"observe → compare → correct","micro",'text-anchor="middle"')}`)}</div>`}function pl(n,e,{color:t="mint",max:i=350,suffix:s="",xvalues:r=null}={}){const a=c=>60+(r?r[c]:c/(n.length-1))*660,o=c=>350-c/i*290;let l=[0,.25,.5,.75,1].map(c=>to(60,350-c*290,720,350-c*290,"grid")+en(44,358-c*290,Math.round(i*c),"axis",'text-anchor="end"')).join("");return l+=`<path d="${n.map((c,h)=>`${h?"L":"M"}${a(h)} ${o(c)}`).join(" ")}" class="plot ${t} ${r?"anchors":""}"/>`,l+=n.map((c,h)=>`<circle cx="${a(h)}" cy="${o(c)}" r="${r?6:3.5}" class="dot ${t}"/>`).join(""),l+=e.map(([c,h])=>en(a(c),397,h,"axis",'text-anchor="middle"')).join(""),l+=en(720,o(n.at(-1))-24,`${n.at(-1)}${s}`,"chart-value",'text-anchor="end"'),eo(l,"0 0 780 420")}const Ou=[80.8,100.1,117,144.2,153,167.8,177.7,209.2,215,246.8,319.8],Fu=[0,4,8,12,16,19,20,21,22,23,24].map(n=>n/24),Jc=()=>pl([35,43.2,90],[[0,"2024 avg"],[1,"2025 avg"],[2,"Apr 2026 peak"]],{max:100,suffix:"M",xvalues:[0,.55,1]});function Bu(){return`<div class="trace-pair"><div><span class="mono">MCP / 09 VISIBLE CALLS</span><div class="waterfall">${["search_issues","read_file","db.query","fetch","transform","write_file","post_comment","notify","commit"].map((e,t)=>`<div style="margin-left:${t*9}px;width:${220+t%3*25}px"><i></i>${e}</div>`).join("")}</div></div><span class="trace-arrow">→</span><div class="opaque"><span class="mono">CODE MODE / 01 SPAN</span><div class="execution"><i></i>execute_code<span>CONTENTS OPAQUE</span></div></div></div>`}const zu={.1:{layout:"title",scene:"landscape",html:`<div class="title-copy">${Xt("SIGNALS / BERLIN / 2026")}<h1>The New<br>Failure Modes<span class="full-stop">.</span></h1><p class="subtitle">Observability in the Age of AI Agents</p><p class="byline">Alejandro Saucedo</p></div><div class="title-coordinate mono">52°31′ N &nbsp; 13°24′ E<br>10 SEPTEMBER / 09:15</div>`},.2:{layout:"profile",html:`<div class="profile-copy">${Xt("YOUR SPEAKER")}<h2>Alejandro<br>Saucedo</h2>${Ds([["Zalando","Exec Director of AI,<br>Data & Platform"],["ACM","Board Member"],["AI advisor","UN · OECD · Linux Foundation<br>Institute for Ethical AI · among others"]])}</div><img class="portrait" src="/keynote/profile-face.jpg" alt="Alejandro Saucedo"/>`},1.1:{layout:"object laptop",scene:"laptop",html:`${Gt("The race to the<br><s>bottom</s> top")}<div class="object-evidence">${Ds([["70%+","Uber PRs from agents"],["33%","Zalando PRs auto-approved<br><small>250+ teams · lead time ↓ 20–40%</small>"],["20–30%","Microsoft code written by AI"],[">30%","Google new code"]])}</div><div class="object-caption mono">AG–01 / AGENT WORKSTATION<br><span>SPECTRUM / LIVE</span></div>`},1.2:{layout:"three-evidence laptop-chapter",scene:"laptop",html:`${Gt("Not just code")}<div class="evidence-columns">${[["Anthropic","95%","Internal analytics queries automated","~95% accuracy"],["OpenAI","4,000","of ~5,000 employees on its data agent","600+ PB · 70,000 datasets<br>Insights from hours to minutes"],["Spotify","2,100+","employees using the data assistant","13,000+ conversations<br>Over ¼ had never written SQL"]].map(([n,e,t,i])=>`<div>${Xt(n)}${cn(e,t)}<p>${i}</p></div>`).join("")}</div>`},1.3:{layout:"charts",html:`${Gt("The fastest acceleration<br>in the history of software")}<div class="chart-pair"><div>${Xt("01 / GLOBAL GIT PUSHES · MILLIONS / QUARTER")}${pl(Ou,[[0,"2020"],[2,"2022"],[4,"2024"],[10,"2026"]],{max:350,suffix:"M",xvalues:Fu}).replace("plot mint anchors","plot mint")}</div><div>${Xt("02 / MERGED PULL REQUESTS · MILLIONS / MONTH")}${Jc()}</div></div><div class="chart-verdict"><strong>+80%</strong><p>in the last year,<br>after five years of ~17%</p><span class="mono">GITHUB INNOVATION GRAPH<br>PRs: THREE LABELLED ANCHORS · DOTTED INTERPOLATION</span></div>`},1.4:{layout:"charts",html:`${Gt("PRs up. Incidents up.")}<div class="chart-pair"><div>${Xt("01 / MERGED PULL REQUESTS · MILLIONS / MONTH")}${Jc()}</div><div>${Xt("02 / GITHUB INCIDENTS · PER MONTH")}${pl([19,17,12,16,22,17,15,15,28,37,32,27],[[0,"May 2025"],[5,"Oct"],[9,"Feb 2026"],[11,"Apr"]],{max:40,color:"red"}).replace("</svg>",`${en(595,48,"PEAK 37 · FEB","micro",'text-anchor="middle"')}</svg>`)}</div></div><div class="bottom-stats">${cn("257","incidents in 12 months")}${cn("48","major")}${cn("capacity","top root cause")}</div><p class="src">IncidentHub tracker · GitHub public status page · correlation, not an isolated causal estimate</p>`},1.5:{layout:"evidence",html:`${Gt("Work left the laptop")}${Ds([["Cursor","35% of its own merged PRs from Cloud Agents · one VM per agent"],["Microsoft Research","13.5M Copilot coding-agent sessions in one month"],["Linear","Issues route to agents with zero humans in the triage rule"]])}<div class="sandbox-strip">${["agent / 01","agent / 02","agent / 03","agent / 04","agent / 05","agent / 06"].map(n=>`<span><i></i>${n}<small>ISOLATED SANDBOX</small></span>`).join("")}</div>${wr("The unit of work is a sandbox you never see.")}`},1.6:{layout:"memory",html:`${Gt("All of it wired to<br>one shared memory")}<div class="memory-network">${eo(`<g class="memory-orbits">${Array.from({length:24},(n,e)=>{let t=e/24*Math.PI*2,i=420+340*Math.cos(t),s=265+215*Math.sin(t);return`${to(i,s,420,265)}<circle cx="${i}" cy="${s}" r="5" class="agent-dot" style="animation-delay:${e*.17}s"/><circle cx="${i}" cy="${s}" r="3.5" class="agent-packet" style="--dx:${420-i}px;--dy:${265-s}px;animation-duration:${3+e%5}s;animation-delay:${-e*.37}s"/>`}).join("")}</g><rect x="275" y="173" width="290" height="178" rx="8" class="node"/>${en(420,214,"SHARED MEMORY","micro",'text-anchor="middle"')}${en(420,254,"the work","node-label",'text-anchor="middle"')}${en(420,290,"the knowledge","node-label",'text-anchor="middle"')}${en(420,326,"the tasks","node-label",'text-anchor="middle"')}${en(85,60,"DEVELOPERS’ AGENTS","micro")}${en(520,60,"MANAGERS’ AGENTS","micro")}${en(320,515,"TEAM AGENTS","micro")}`,"0 0 850 550")}</div><div class="memory-evidence">${cn("2.4M ≈ 2.5M","Linear issues / week: agents ≈ humans")}${Ds([["Jira","Agents assigned like teammates"],["Rovo","5M+ monthly users · 75% of Fortune 500"],["Claude","Persistent, project-scoped memory"]])}</div>${wr("“What is my team working on?” is becoming a query, not a conversation.")}`},1.7:{layout:"evidence numbers"},1.8:{layout:"lifecycle",html:`${Gt("Agents running<br>the whole lifecycle")}<div class="lifecycle-steps">${["plan","launch","debug","iterate"].map((n,e)=>`<div><span class="mono">0${e+1}</span><h3>${n}</h3></div>`).join("")}</div>${Ds([["REA / Meta","Doubled accuracy-iteration gains across six models<br>2 engineers per model → <b>3 across 8</b>"],["KernelEvolve / Meta","Production GPU kernels · <b>+60%</b> inference throughput<br>Serving <b>trillions</b> of requests a day"]])}`},1.9:{layout:"checklist",html:`${Gt("What it took<br>to run that safely")}<ol class="checks">${["Preflight access checklist","Compute budget confirmed upfront","Halt-and-pause thresholds","A failure runbook the executor consults itself","Scope fence","Bitwise correctness verification","Search termination criteria"].map(n=>`<li>${n}</li>`).join("")}</ol><p class="check-verdict">Every one of these is bespoke.<br><em>None of it is standard.</em></p>`},2.1:{layout:"incident",html:`${Xt("GITHUB / MERGE QUEUE")}${Gt("April 23, 2026")}<div class="incident-stats">${cn("2,092","pull requests")}${cn("658","repositories")}<p>incorrect<br>merge commits</p></div><blockquote>“…the existing monitoring didn’t catch it because the issue was about <em>merge correctness</em> rather than availability.”<cite>GITHUB</cite></blockquote>`},2.2:{layout:"two-evidence"},2.3:{layout:"evidence"},2.4:{layout:"swarm",html:`${Xt("OPENAI / TESTING SWARM")}${Gt("July 19, 2026")}<div class="swarm-number">~700<span>agents</span></div><div class="swarm-field">${Array.from({length:140},(n,e)=>`<i class="${e%5===0?"tampered":""}"></i>`).join("")}<span class="mono">ONE MARK / 5 AGENTS · ~20% EVIDENCE TAMPERING</span></div><div class="swarm-lines"><p>Escaped test confinement</p><p>Stole credentials · tampered with cloud environments</p><p>Coordinated on an unsanctioned message board</p><p><b>~20%</b> showed evidence-tampering behaviour</p></div>`},2.5:{layout:"quote"},2.6:{layout:"table"},"3.0":{layout:"map",html:`${Gt("Five assumptions.<br>All broken.")}${Zc()}`},3.1:{layout:"timeline journey-sealed",scene:"sealed",html:`${Gt("Traces: the pillar wars,<br>in one line")}<div class="timeline">${[["2017","Bourgon’s Venn diagram","metrics · logs · traces"],["2018","The same author<br>argues the opposite",""],["2019","OTel unifies collection","Declines to unify storage"],["2023–26","Wide events",""]].map(([n,e,t])=>`<div>${Xt(n)}<i></i><h3>${e}</h3><p>${t}</p></div>`).join("")}</div>${wr("Settled as architecture · unsettled as economics · re-opened by agents")}`},3.2:{layout:"payload journey-sealed",scene:"sealed",html:`${Gt("What broke the span")}<div class="payload-box"><span class="mono">tool_call / response</span><div class="payload-code">data:image/png;base64,iVBORw0KGgoAAAANSUhEUg…<br>QfABmGVW7r9KkpJH4aLm0P2XfJt8VwC1pX…<br>m4D9kaL2e8PzRbX6H3qF1tU5cYsN7fGw…<br>V2dXa9zNb4QpJ1cE7rLs5mW0kT8uB…</div><strong>~1.8 MB</strong><p>one screenshot inside one span</p></div><div class="payload-verdict"><span class="status"><i></i>200 OK</span><h3>It can say<br>the call returned.</h3><p>It cannot say whether<br>the answer <em>drifted.</em></p></div><p class="src">MLflow: binary offload to object storage · OpenInference: voice span kinds</p>`},3.3:{layout:"object sealed",scene:"sealed",html:`${Gt("Code mode:<br>the seam disappears")}${Bu()}<div class="token-line"><strong>150,000 → 2,000</strong><span>tokens. Observable operations → one.</span></div><div class="object-caption mono">SB–09 / SEALED EXECUTION CORE<br>NO SEAM. STILL ACTIVE.</div><div class="object-controls"><button data-object-t="0">01 Enclosure</button><button data-object-t=".55">02 Assembly</button><button data-object-t="1" class="selected">03 Boundary</button></div>`},3.4:{layout:"standard journey-sealed",scene:"sealed"},3.5:{layout:"sli",html:`<h2>Your agent can be</h2><div class="sli-triplet">${cn("100%","available")}${cn("100%","within latency")}${cn("100%","wrong.")}</div><div class="evidence-columns"><div>${Xt("01 / ONE EVALUATOR")}<p>Run offline <b>and</b> on sampled production traces</p></div><div>${Xt("02 / SCORES → TELEMETRY")}<p class="code-label">gen_ai.<br>evaluation.result</p></div><div>${Xt("03 / GUARDRAILS → MONITORS")}<p>The signal is the <b>delta</b> in trip rate, not the level</p></div></div>`},3.6:{layout:"quote"},3.7:{layout:"timeline",html:`${Gt("Memory:<br>no attacker required")}<div class="timeline three">${[["Tuesday","The agent hallucinates.","The memory layer stores it."],["Friday","Three downstream workflows","treat it as ground truth."],["+11 days","Full recovery.",""]].map(([n,e,t])=>`<div>${Xt(n)}<i></i><h3>${e}</h3><p>${t}</p></div>`).join("")}</div><p class="attacker mono">ATTACKER: NONE</p>`},3.8:{layout:"poison",html:`${Gt("Prompt injection is session-scoped.<br>Memory poisoning is not.")}<div class="session-diagram"><div class="session">${Xt("SESSION 1")}<h3>Injection lands.</h3><span class="mono">TELEMETRY BOUNDARY</span></div><div class="lag"><span class="mono">WEEKS LATER</span><div>→</div><span class="mono">PERSISTENT MEMORY</span></div><div class="session">${Xt("SESSION N")}<h3>Damage fires.</h3><span class="mono">TELEMETRY BOUNDARY</span></div></div>${wr("Fail soft on state, fail closed on trust.")}<p class="repair-line">Every memory operation is a first-class trace event, with provenance.</p>`},3.9:{layout:"identity",html:`${Xt("IDENTITY / THREE QUESTIONS YOUR GATEWAY CAN’T ANSWER")}<div class="identity-questions"><h2><span>01</span>Who are you?</h2><h2><span>02</span>Whose agent are you?</h2><h2><span>03</span>What can you do?</h2></div>${wr("The declaration is the authorization.")}`},"3.10":{layout:"delegation",html:`<div class="delegation-chain">${["user","agent","sub-agent","tool"].map((n,e)=>`<div>${Xt("HOP / 0"+e)}<h3>${n}</h3><p>actor · subject<br>audience · scope</p></div>`).join("")}</div><h2>The security primitive<br>and the trace are<br><em>the same artifact.</em></h2><div class="legal-line"><b>EU AI Act / Article 12</b><span>Automatic logging · lifetime-scoped<br>In full application since 2 Aug 2026</span></div>`},3.11:{layout:"cost",html:`${Gt("Cost: nobody decided<br>to spend that")}<div class="cost-top">${cn("6×","AI infra cost since 2024 · Uber")}${cn("flat","measured productivity")}${cn("$500–2,000","per engineer / month")}</div><span class="mono cost-source">UBER 6× / FLAT: SECONDARY REPORTING; PRIMARY UNIT-COST FIGURES DIFFER</span><div class="metr">${Xt("METR / RANDOMIZED CONTROLLED TRIAL")}${cn("+24%","forecast")}${cn("+20%","self-reported")}${cn("−19%","measured")}</div>`},3.12:{layout:"map repaired",html:`${Gt("Five contracts. One repair.")}${Zc(!0)}<p class="map-refrain">Carry <em>provenance and meaning</em> alongside the value.</p>`},4.1:{layout:"pipeline",html:`${Xt("A DECADE OF MLOPS")}${eo(`<path d="M80 310L780 307L780 100L1600 94" class="plot amber"/>${to(80,375,1600,375,"grid")}${en(80,420,"MONTHS / DASHBOARDS GREEN THROUGHOUT","micro")}${en(810,55,"the day someone fixed the pipeline","label")}<circle cx="780" cy="100" r="7" class="dot amber"/>`)}<h2>Do we file that as an incident,<br>or as an improvement?</h2>`},4.2:{layout:"funnel",html:`${Gt("The bottom<br>of the funnel")}<div class="funnel-shape"><div><span>writing code</span><small>TOOLING EXPLODED</small></div><div><span>testing</span></div><div><span>operating</span></div><b>THIS TALK</b></div>`},5.1:{layout:"object engine",scene:"engine",html:`${Gt("SRE solved<br>this shape before")}<div class="small-loop"><span>desired state</span><b>↓</b><strong>controller</strong><b>↓</b><span>observed state</span><i>↺</i></div><div class="kagent"><b>kagent</b><p>Model, tools, memory, skills as CRDs<br>with a reconciler · CNCF Sandbox</p></div><div class="object-caption mono">AG–01 / GOVERNED ENGINE<br>SENSE → COMPARE → CORRECT</div><div class="object-controls"><button data-object-t=".1">01 Running</button><button data-object-t=".6" class="selected">02 Exposed</button><button data-object-t="1">03 Governor</button></div>`},5.2:{layout:"sensing",html:`${Xt("THE RECONCILE LOOP / FIVE SENSOR INPUTS")}${Kc(!0)}<h2>Observability is the <em>sensing half</em><br>of the reconcile loop.</h2>`},5.3:{layout:"ladder",html:`${Gt("The ladder and its mirror")}<div class="ladder-diagram"><div class="ladder-levels">${[["L4","full",""],["L3","high","detects, decides, acts in defined scenarios"],["L2","partial","actuates, needs approval"],["L1","assisted",""],["L0","manual",""]].map(([n,e,t],i)=>`<div style="--step:${4-i}"><b>${n}</b><strong>${e}</strong><span>${t}</span></div>`).join("")}<span class="mono">GOOGLE SRE / AI AUTONOMY LEVELS</span></div><div class="mirror"><span class="mono">THE MIRROR AXIS</span><h3>What must you<br>be able to <em>SEE</em><br>before you<br>may climb?</h3></div></div>`},5.4:{layout:"paging",html:`${Gt("Who gets paged?")}<div class="paging-mark"><i></i><span>?</span><span class="mono">ESCALATION / UNDEFINED</span></div><div class="paging-rows">${Ds([["01","No vendor publishes an <b>escalation policy</b> for agent failures"],["02","Meta’s agent adapts “rather than surfacing routine interruptions to engineers”"],["03","Incident schemas have <b>no agent-attribution field</b>"]])}</div>`},5.5:{layout:"handoff",html:`<div class="handoff-stats">${cn("85%","of enterprises using AI SRE tools by 2029")}${cn("40%+","of agentic AI projects cancelled by end of 2027")}</div><span class="mono">ANALYST PROJECTIONS / ADOPTION AND CANCELLATION CAN COEXIST</span><div class="programme">${[["Alex","Can the loop close?","FRI 09:15"],["Sylvain","Does 10× more code mean 20× more incidents?","FRI 10:45"],["Charity","Was handcrafted code ever the point?","THU 13:15"],["Niall","What does it do to uptime?","FRI 15:30 / CLOSING"]].map(([n,e,t])=>`<div><h3>${n}</h3><p>${e}</p><span class="mono">${t}</span></div>`).join("")}</div>`},5.6:{layout:"close",html:`<div class="closing-loop">${Kc(!0)}</div><h2>We spent the last ten years<br>teaching machines to act.<br><span>The next ten are about making sure<br>we can <em>see what they’re doing.</em></span></h2>`},5.7:{layout:"references",html:`${Gt("References &<br>further reading")}<div class="reference-list">${[["This talk","ethical.institute/keynote/",""],["The memory series","ethical.institute/blog/whose-memory-is-it-part-1","Parts 1–4"],["The observability piece","ethical.institute/blog/production-observability-multi-agent-ai",""],["KAOS","axsaucedo.github.io/kaos",""],["@axsaucedo","github.com/axsaucedo",""]].map(([n,e,t])=>`<a href="https://${e}" target="_blank" rel="noopener"><b>${n}</b><span>${e.replace("ethical.institute/blog/","ethical.institute / ")} ${t}</span></a>`).join("")}</div><div class="qr-block"><img loading="lazy" src="/keynote/references-qr.svg" alt="QR code to this keynote"/><p class="mono">SCAN / THIS TALK</p></div>`}},Gu=["Cold open","Where We Are","The New Failure Modes","The Broken Contracts","A Decade of MLOps Already Told Us","The Way Forward"],Hu=Eu.map((n,e)=>{const t=n.div?Number(n.div):Number(n.id[0]),i=zu[n.id]||{};return{...n,index:e,actNumber:t,actName:Gu[t],layout:(n.div?"divider":i.layout||"evidence")+(/^(1\.[79]|2\.5|3\.[69])$/.test(n.id)?" instrument-chapter":""),scene:n.div?"landscape":i.scene||null,html:i.html??n.h,notes:Yc[n.id]?.notes||"",sourceTitle:Yc[n.id]?.title||n.name,...n.div?{html:`<div class="divider-copy">${Xt("ACT / 0"+n.div)}<h1>${{1:"Where We Are",2:"The New<br>Failure Modes",3:"The Broken<br>Contracts",4:"A Decade of MLOps<br>Already Told Us",5:"The Way<br>Forward"}[n.div]}</h1><p>${n.sub}</p></div><span class="landscape-caption mono">${["","01 / ACCELERATION","02 / LOSS OF VISIBILITY","03 / TAKING IT APART","04 / A FAMILIAR HORIZON","05 / THE FEEDBACK"][n.div]}</span>`}:{},accent:t===2?"#f17b70":t===4?"#d9b482":"#93dcb6"}}),Vu=JSON.parse(`[{"id":"0.1","title":"Title","onSlide":"- **The New Failure Modes**\\n- *Observability in the Age of AI Agents*\\n- Alejandro Saucedo · Signals Berlin 2026","chart":"","notes":"Spoken: \\"Good morning Berlin. This is the opening slot, so my job for the next forty-five minutes is to set the frame for the next two days. The short version: software is being written and operated faster than at any point in history, and the way we watch it has not kept up. Everything that follows is about that gap.\\" Delivery: house lights still half up - let the room settle during the first sentence. The title is already on the programme, so don't read it out; the room has seen it.","sources":[]},{"id":"0.2","title":"Who's telling you this","onSlide":"- Photo: \`profile-face.jpg\`, right half of the slide.\\n- Alejandro Saucedo\\n- Exec Director of AI, Data & Platform · Zalando\\n- Board Member · ACM\\n- AI advisor · UN, OECD, Linux Foundation, Institute for Ethical AI - among others","chart":"","notes":"Spoken: \\"For those I haven't met: I run AI, Data & Platform at Zalando, I'm on the board of the ACM, and I advise on AI at the UN, the OECD and the Linux Foundation, among others. The part that actually matters for today: I've spent the last decade running ML systems in production, and a year ago at SREcon I gave a keynote about that decade. This talk is about what happened since.\\" Delivery: don't read the slide - the photo and the list carry themselves. The only sentence doing work is the SREcon one, because act 3 pays it off.","sources":[]},{"id":"D1","title":"Act divider","onSlide":"- **1 · Where We Are**\\n- *Three snapshots of software, September 2026*","chart":"","notes":"Spoken: \\"I want to start with three snapshots of where we actually are. Not predictions - things that are already happening. One about how fast we now ship. One about where the work now lives. And one about how much already runs end to end with nobody driving.\\" Delivery: this is the act's table of contents; say it on the divider so each snapshot lands as expected rather than as a topic change.","sources":[]},{"id":"1.1","title":"The race to the ~~bottom~~ top","onSlide":"- Title: **The race to the ~~bottom~~ top** (\\"bottom\\" struck through)\\n- **Uber** - 70%+ of pull requests from local or cloud agents [1]\\n- **Zalando** - 33% of PRs auto-approved · 250+ teams · lead time down 20-40% [2]\\n- **Microsoft** - \\"20-30% of our code is written by AI\\" - Nadella [3]\\n- **Google** - \\">30% of new code\\" - Pichai [3]","chart":"","notes":"Spoken: \\"First snapshot: how we build. Every large engineering org is in the same race right now. Uber attributes over seventy percent of its pull requests to agents. At Zalando - and this one I can vouch for personally - a third of our PRs go through an auto-approve path, across more than two hundred and fifty teams, and it cut lead time by twenty to forty percent. Nadella and Pichai have both put their companies' numbers on record. I should say the honest caveat: nobody in this list shares a methodology, and 'written by AI' means something different at each of them. But the direction is not in dispute - and notice nobody is slowing down to check.\\" Delivery: fast, one breath per line; the Zalando line is the credibility anchor, deliver it as a first-person aside. ⚠️ Refresh the Zalando figures with the internal owner before the talk. Backup if the room wants more: Uber's fuller inventory is 3,600 agent skills, 30K skill executions/day, 7x WAU growth Feb→Aug 2026 (research-ref-2-2).","sources":[{"n":1,"href":"https://www.uber.com/us/en/blog/efficient-software-factory/"},{"n":2,"href":"https://engineering.zalando.com/posts/2026/08/agentic-engineering-at-zalando-a-snapshot.html"},{"n":3,"href":"https://www.cnbc.com/2025/04/29/satya-nadella-says-as-much-as-30percent-of-microsoft-code-is-written-by-ai.html"}]},{"id":"1.2","title":"What that does to the platform","onSlide":"- Title: **The fastest acceleration in the history of software**\\n- Three built charts, side by side, shared 2020→2026 x-axis treatment:\\n  - (a) **Global git pushes per quarter** - line, 80.8M → 319.8M\\n  - (b) **Merged pull requests per month** - line, ~35M → ~90M\\n  - (c) **New repositories per month** - line, → ~20M\\n- Callout on (a): **+80% in the last year, after five years of ~17%**\\n- Small print: GitHub Innovation Graph · GitHub availability update, April 2026\\n- **Build/animation:** progressive reveal - (a) draws its line left to right first (the elbow between 2025 Q4 and 2026 Q1 is the beat the animation lands on), then (b) and (c) fade in already drawn. In Slides this is three entrance builds; on the site version it is an animated line draw. The upward motion IS the argument - never show all three static at once.","chart":"All three BUILT, not screenshots. (a) Full quarterly series from GitHub's own Innovation Graph CSV (EU rollup excluded to avoid double-counting): 2020 Q1 80.8 · 2021 Q1 100.1 · 2022 Q1 117.0 · 2023 Q1 144.2 · 2024 Q1 153.0 · 2024 Q4 167.8 · 2025 Q1 177.7 · 2025 Q2 209.2 · 2025 Q3 215.0 · 2025 Q4 246.8 · 2026 Q1 319.8 (millions; raw CSV at \`research/assets/innovationgraph-git-pushes-raw.csv\`). Mark the elbow between 2025 Q4 and 2026 Q1. (b) Anchor points until the real monthly series is pulled: 35M (2024 monthly avg, Octoverse) · 43.2M (2025 monthly avg, Octoverse) · ~90M (April 2026 peak, read off GitHub's Record Acceleration panel). TODO(chart): query GH Archive on BigQuery (\`githubarchive\`, PullRequestEvent merged) for the true monthly series 2023→2026; until then plot the three anchors as labelled points with a dotted interpolation, never a fake smooth line. (c) New repositories: the Record Acceleration panel shows ~20M/mo peak; TODO(chart): extract approximate series from the captured panel (\`research/assets/github-record-acceleration-2023-2026.png\`) or drop to two charts - two honest charts beat three where one is hand-waved.","notes":"Spoken: \\"Here's what that race does to the one platform that sees all of it. Walk the left chart with me. Five years of boring, healthy, seventeen-percent-a-year growth - the entire MLOps decade sits on that flat slope. Then the last four quarters: plus eighty percent. GitHub now merges about three million pull requests a day; eighteen months ago it was less than half that. And this is not my interpretation - GitHub's own CTO wrote, quote, 'Since the second half of December 2025, agentic development workflows have accelerated sharply.' In October 2025 they planned for ten times their capacity. Four months later they re-scoped that plan to thirty times. The platform that hosts the world's code is redesigning itself around what agents do to it.\\" Delivery: the CTO quote is the causal claim that makes the chart more than a curve - it's first-party, so lean on it. Spoken anchors if wanted: code pushes 65M → 82.19M/mo, issues closed 3.4M → 4.25M/mo (Octoverse). Do NOT quote the 986M-commits figure alongside the Record Acceleration commits panel - the two GitHub publications disagree on commit counts (986M/year vs ~1.4B/mo) and the discrepancy is unexplained; leave commits out entirely.","sources":[{"n":1,"href":"https://innovationgraph.github.com/global-metrics/git-pushes"},{"n":2,"href":"https://github.blog/news-insights/company-news/an-update-on-github-availability/"},{"n":3,"href":"https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/"}]},{"id":"1.3","title":"The other line","onSlide":"- Title: **PRs up. Incidents up.**\\n- Left panel: the merged-PRs line from 1.2, small.\\n- Right panel: **GitHub incidents per month**, May 2025 → Apr 2026 - line rising to a labelled peak: **37, Feb 2026**\\n- Three numbers across the bottom: **257** incidents in 12 months · **48** major · top root cause: **capacity**\\n- Small print: IncidentHub tracker, from GitHub's public status page","chart":"Built line chart. Monthly outage counts May 2025 → Apr 2026 from IncidentHub: starts ~19/mo, dips to 12, climbs to the 37 peak in Feb 2026 (reference capture: \`research/assets/incidenthub-github-total-outages-by-month.png\`; exact monthlies on the source page). Optional second panel, root-cause bars: capacity 83 · deployment 71 · external dependencies 31 · configuration 30 · internal 24 · uncategorized 11 · infrastructure/network 7.","notes":"Spoken: \\"Now the other line. Same platform, same twelve months: two hundred and fifty-seven incidents, forty-eight of them major, worst month February 2026 with thirty-seven. And the top root cause, by a distance, is capacity - the thing the last slide was about. I want to be careful here: this is a third-party tracker scraping GitHub's status page, the 2024 comparison number comes from a different source, and 'capacity' includes plenty of non-agentic load. So take it as direction, not precision. But the direction is the point: the throughput chart and the incident chart bend in the same year, on the same platform, and the platform's own engineers tell you why. PRs up. Incidents up. Hold those two lines - the rest of the talk lives between them.\\" Delivery: this is the act's thesis slide; slow down here. Don't over-argue the causal link - Sylvain Kalache proves the 10x-code/20x-incidents case on Friday at 10:45, and naming that now costs nothing: \\"there's a whole talk on this exact correlation on Friday.\\" Peer comparison if challenged in Q&A: GitHub 257, GitLab 132, Bitbucket 27 over the same window. Do not quote the MTTR deterioration (~106 min → ~6h) as a trend - it splices two sources. One line worth keeping from the cut April 23 slide, spoken not shown: when GitHub's merge queue wrote bad merge commits into two thousand PRs, their own postmortem said the monitoring didn't catch it \\"because the issue was about merge correctness rather than availability\\" - that sentence returns as the observability sub-section's spine. 🎯 \\"PRs up. Incidents up.\\"","sources":[{"n":1,"href":"https://blog.incidenthub.cloud/github-reliability-outage-history-2025-2026"},{"n":2,"href":"https://leaddev.com/software-quality/whats-gone-wrong-at-github"},{"n":3,"href":"https://github.blog/news-insights/company-news/an-update-on-github-availability/"}]},{"id":"1.4","title":"Work left the laptop","onSlide":"- Title: **Work left the laptop**\\n- **Cursor** - 35% of its own merged PRs come from Cloud Agents, one VM per agent\\n- **Microsoft Research** - 13.5M Copilot coding-agent sessions in a single month\\n- **Linear** - issues route to agents with zero humans in the triage rule\\n- Bottom line, smaller: *Work lives in agent sandboxes, growingly with shared memory*","chart":"","notes":"Spoken: \\"Second snapshot: where the work now happens. Cursor reports that thirty-five percent of its own merged PRs come from cloud agents - each one a VM you never open. Microsoft Research measured thirteen and a half million Copilot coding-agent sessions in one month, and the sessions have a synchronized daily rhythm, peaking four to five times baseline during working hours - the agents keep office hours, because we start them. And in Linear you can now write a triage rule that assigns issues straight to an agent, no human in the loop. So the work has left the laptop. It runs in sandboxes, in parallel, on infrastructure someone else operates.\\" Delivery: introduce the word \\"sandbox\\" here deliberately - the observability sub-section comes back to it as the thing traces can't see inside. ⚠️ The MSR numbers reached the corpus through search-summarized text - read the PDF before the number goes on screen. TODO(verify): Cursor's 35% is a vendor self-report with no primary URL captured; get the link or attribute verbally. Linear's zero-human triage shipped July 2026 - capability confirmed, adoption scale unknown; say so if asked.","sources":[{"n":1,"href":"https://www.microsoft.com/en-us/research/wp-content/uploads/2026/08/ghcp_traces-6.pdf"},{"n":2,"href":"https://linear.app/docs/agents-in-linear"}]},{"id":"1.5","title":"One shared memory","onSlide":"- Title: **All of it wired to one shared memory**\\n- Diagram, centre: an enterprise knowledge base labelled with its layers - *the work · the knowledge · the tasks*. Around it: developers' agents, managers' agents, team agents - all reading and writing the same store. (Site build: buzz.xyz-style background - dozens of small agents moving between the store and each other.)\\n- One line underneath: *\\"What is my team working on?\\" is becoming a query, not a conversation.*\\n- Evidence lines:\\n  - **Linear** - agents now create **~2.4M** issues a week. Humans: **~2.5M**. Near parity. [1]\\n  - **Jira** - agents ship as an assignee option, assignable like teammates [2]\\n  - **Atlassian Rovo** - **5M+** monthly users · **75%** of the Fortune 500 [3]\\n  - **Claude** - persistent, project-scoped memory across conversations [4]","chart":"","notes":"Spoken: \\"Here's the part I think is still underappreciated. All of those agents - mine, my team's, my manager's - are increasingly wired to the same substrate: an enterprise-wide memory. It holds the work itself, the company's knowledge, and now the tasks. Look at Linear's own public data: agents create about two point four million issues a week on the platform. Humans create two point five. The task queue is already half agent-written. Jira now ships agents in the assignee dropdown, next to your teammates. And the memory layer underneath is becoming a product category of its own - persistent, project-scoped, shared. Which changes something very human: as a manager, I increasingly don't find out what my team is working on by asking them. I ask my agent, and my agent reads the shared memory. There are already vendors selling exactly that - one of them literally markets it as replacing the manager as 'the routing layer'. The org chart still describes the people; the memory bank describes the work.\\" Then the honesty note, spoken plainly: \\"Now, the full version of this - your agent negotiating with my agent across team boundaries - hasn't arrived at scale, and I won't pretend it has. What ships today are the primitives: the shared store, the delegation, the agent-to-agent protocols - A2A alone has a hundred and fifty organizations behind it now. But hold the picture, because its failure modes have already arrived - and that's act two.\\" 🎯 \\"The failures arrived before the wins.\\" Delivery: the Linear parity number is the slide's spine - point at it. ⚠️ Rovo's 5M MAU / 75% F500 is search-indexed, not deep-verified - re-check before stage (findings-15). Backup: the Jellyfish post has a named manager on record asking the AI assistant for team velocity instead of a person; Grab's supervisor-orchestrated system (1,000+ internal users) is the nearest real thing to agent teams, and it's one supervisor over its own sub-agents, not peer agents (findings-11).","sources":[{"n":1,"href":"https://linear.app/data"},{"n":2,"href":"https://www.atlassian.com/blog/rovo/ai-agents-in-jira"},{"n":4,"href":"https://claude.com/blog/memory"}]},{"id":"1.6","title":"Nobody's driving, and it works","onSlide":"- Title: **Agents running whole systems, end to end**\\n- **AlphaEvolve** (Google DeepMind) - evolves its own algorithms into production · recovered **0.7%** of Google's worldwide compute [1]\\n- **Azure SRE Agent** (Microsoft) - **1,300+** agents on Microsoft's own services · **35,000+** incidents mitigated [2]\\n- **Verizon** - **70M+** autonomous network actions across ~60,000 vRAN sites in 2025 · anomalies resolved in under two minutes [3]\\n- **Anthropic** - **800+** autonomous fixes cut an API-error class **1,000x** · human estimate: four years [4]\\n- Bottom line, smaller: *a single unit of work whose lifetime dwarfs any span, session or trace our tooling knows how to hold*","chart":"","notes":"Spoken: \\"Third snapshot: the far end of the curve, where agents don't assist the lifecycle - they run it, detect to decide to act, nobody driving. Google's AlphaEvolve writes and tests its own algorithms and ships them: its scheduling heuristic has been in production inside Borg for over a year, recovering nought point seven percent of Google's worldwide compute - a datacentre's worth of capacity, found by an agent. Microsoft runs its Azure SRE Agent on Microsoft's own services: thirteen hundred agents deployed, thirty-five thousand incidents mitigated - self-healing infrastructure is a product now, and it's eating its own incidents. Verizon's network ran seventy million autonomous actions last year across sixty thousand radio sites - anomalies resolved in under two minutes, and their stated goal is execution completely out of the human loop; that's not software anymore, that's physical infrastructure. And Anthropic points Claude at its own codebase: eight hundred autonomous fixes that cut a class of API errors a thousand-fold - the humans had estimated four years for that backlog. Their own framing of the constraint is the honest one: the bottleneck is no longer writing the code, it's human review. And here's the detail I want you to sit with: these units of work run for hours, days, in Borg's case a year and counting. That's a single unit of work whose lifetime dwarfs any span, session or trace context our tooling knows how to hold.\\" Delivery: one breath per case, the lifetime line flat - it's the setup for the observability sub-section, not a punchline. Honesty flags to carry: Verizon's \\"actions\\" likely blends classical automation with agentic - say \\"autonomous actions\\", not \\"AI decisions\\"; the circulating $500M/year AlphaEvolve figure is an analyst estimate, not Google's - never quote it. Counterweight if useful in Q&A: Datadog's Bits SRE still gates remediation behind a human - the industry disagrees on how far to close the loop, which is exactly act 4's ladder question. Meta backup if the room wants the lifecycle case: REA runs Meta's ads-ranking lifecycle end to end, 2 engineers per model → 3 across 8, with hibernate-and-wake workflows spanning weeks (findings-10). Full case list with verification status in research-findings-16. ⚠️ Read the four primaries directly before stage; the Azure 40.5h→3min MTTM figure is secondary-only - do not use it.","sources":[{"n":1,"href":"https://deepmind.google/blog/alphaevolve-impact/"},{"n":2,"href":"https://techcommunity.microsoft.com/blog/appsonazureblog/announcing-general-availability-for-the-azure-sre-agent/4500682"},{"n":3,"href":"https://www.verizon.com/about/news/verizon-architecting-network-autonomy"},{"n":4,"href":"https://www.anthropic.com/institute/recursive-self-improvement"}]},{"id":"1.7","title":"Building at a different pace","onSlide":"- **5,213 contributions in the past year.**\\n- Outside my work contributions. And accelerating.\\n- This keynote is one example of what I am building.","chart":"3D crystalline contribution grid: 368 real cells sampled from the author-provided GitHub screenshot. Preserve intensity levels; brightness waves are decorative, not changing activity data. The same cubes regroup into animated KAOS agents on the next view.","notes":"This is my personal GitHub activity, beyond my work contributions. The screenshot counts contributions, not exclusively commits. The pace of experimentation is accelerating; this interactive keynote is one example.","sources":[{"n":1,"href":"https://github.com/axsaucedo"}]},{"id":"1.8","title":"KAOS: learning by building","onSlide":"- **KAOS — Kubernetes Agent Orchestration System**\\n- Open-source agents, tools and model endpoints as Kubernetes resources.\\n- Building and exploring: observability, memory, identity and security.\\n- The next chapters are lessons from this work.","chart":"The contribution crystals regroup into eight interacting agent clusters at the top right. Four connected research areas link to the project and published observability and memory articles. Do not imply every research question is a shipped feature.","notes":"Introduce my hands-on work on KAOS: a Kubernetes operator and agent runtime, MCP tools and multi-agent delegation. The observability and memory articles document this exploration; identity and security are questions that emerge as agents gain access and persistence. The next sections draw on these practical learnings alongside the cited external evidence.","sources":[{"n":1,"href":"https://axsaucedo.github.io/kaos/"},{"n":2,"href":"https://ethical.institute/blog/production-observability-multi-agent-ai"},{"n":3,"href":"https://ethical.institute/blog/whose-memory-is-it-part-1"}]},{"id":"D2","title":"Act divider","onSlide":"- **2 · The New Failure Modes**\\n- *Four systems you already run, breaking in new ways:*\\n- **observability · memory · identity · security**","chart":"","notes":"Spoken: \\"So that's the world as of this morning. Now the title act. I'm going to take four systems everyone in this room already runs - your observability, your memory, your identity, your security - and for each one show you where its contract breaks when agents arrive, what that actually looks like in production, and the practice that catches it. Same shape, four times: the context, a failure, and what to do about it.\\" Delivery: this is the title of the talk appearing as an act - let it land visually; the four-dot tracker starts here and persists on every act-2 slide; the deck's palette shifts toward red for the failure beats and back toward green on each best-practice slide.","sources":[]},{"id":"2A.0","title":"Sub-divider: Observability","onSlide":"- **2a · Observability**\\n- *traces, evals, and what \\"up\\" even means*","chart":"","notes":"Spoken: \\"First: observability itself - and I'm going to take traces and evals together, because the repair turns out to be one feedback loop, not two disciplines.\\" Delivery: first dot of the tracker lights.","sources":[]},{"id":"2A.1","title":"Tracing a system that talks to itself","onSlide":"- Title: **The trace is where the semantics of the flow live**\\n- Animated multi-agent trace, in the style of a flamegraph/waterfall (reference: \`image-1.png\` - supervisor span across the top, sub-agent spans fanning out beneath, tool calls at the leaves, \`agent.step.1..n\` iterations visible): the trace draws itself hop by hop - user → supervisor → researcher/analyst sub-agents → tools - as the audience watches.\\n- One line underneath: *Without context propagation, multi-agent debugging is just distributed guessing.*","chart":"","notes":"Spoken: \\"Context first. In a deterministic service, the code is where the behaviour lives, and the trace is a receipt. In a multi-agent system it inverts: the model decides at runtime which tools to chain, which sub-agents to delegate to, how many iterations to loop - so the trace is the only place the actual semantics of the flow exist at all. Which means tracing stops being a nice-to-have and becomes the system of record for what your system even did. The mechanics are learnable in an afternoon: propagate W3C trace context through every delegation call so agent A to B to C is one trace, not three disconnected observations, and make every iteration of the reasoning loop a child span. What you get is this picture - a supervisor, its sub-agents, their tools, one hierarchy.\\" Delivery: let the animation draw while speaking; point at the delegation hops as they appear. The line under the diagram is from the speaker's own blog post - own it as lived material.","sources":[{"n":1,"href":"https://ethical.institute/blog/production-observability-multi-agent-ai"}]},{"id":"2A.2","title":"The 45 seconds","onSlide":"- Told as a card, near-verbatim from the speaker's blog:\\n  - *You've built an AI agent that works on your laptop. It chains tools together, delegates to specialist sub-agents, and produces sound results.*\\n  - *Then you deploy it to production:*\\n  - A user reports a request *\\"took forever\\"*\\n  - Another got *a strange response*\\n  - Your logs show *the agent ran*\\n- Large, alone at the bottom: **What happened in those 45 seconds?**","chart":"","notes":"Spoken: \\"Here's the challenge, and if you've deployed one of these you've lived it. The agent works on your laptop. You ship it. A user says a request took forever. Another got a strange answer. Your logs faithfully report: the agent ran. But what happened in those forty-five seconds between request and response? Which tool ate eight of them? Which sub-agent looped three times? Did the model decide something different this time - and why? Welcome to the observability challenge of agentic systems: latency from a hundred milliseconds to sixty-plus seconds on the same endpoint, non-deterministic paths, and a log line that tells you it ran but never why it ran like that.\\" Delivery: this is the audience-recognition beat - pause after the question and let the room nod. 🎯 \\"Traditional logs tell you that it ran. Observability tells you why it ran like that.\\"","sources":[{"n":1,"href":"https://ethical.institute/blog/production-observability-multi-agent-ai"}]},{"id":"2A.3","title":"The seam disappears - and there's no standard yet","onSlide":"- Title: **Code mode: the seam disappears**\\n- Diagram, before and after. Left: a waterfall of a dozen labelled MCP tool-call spans (\`search_issues\`, \`read_file\`, \`post_comment\`, ...). Right: one opaque span labelled \`execute_code\`.\\n- One line: **150,000 → 2,000 tokens. And a dozen observable operations → one.**\\n- Small print strip along the bottom: *OTel GenAI conventions: nothing marked Stable · no convention for multimodal payloads, handoffs or memory ops · sandbox telemetry: one open issue (#311) - as of [date]*","chart":"","notes":"Spoken: \\"Optional depth, because this is the freshest version of the problem. Code mode - Cloudflare coined it, Anthropic's 'code execution with MCP' is the statement most people cite - says: stop making the model call tools one at a time; let it write a program that calls them all inside a sandbox. The efficiency win is real: a hundred and fifty thousand tokens down to two thousand for the same workflow. But look at what the trace sees. On the left, a dozen labelled tool calls - the instrumentation seam every MCP observability product is being built on right now. On the right: one span. \`execute_code\`. The seam is gone - and remember from act one, the work already lives in sandboxes. Both origin posts are silent on this consequence, so this observation is mine, and I'd love to be proven wrong at the coffee break. And in case you think the standards have it in hand: as of this week, in OpenTelemetry's GenAI conventions, not one span, event, metric or attribute is marked Stable; no convention for multimodal payloads - a single screenshot is megabytes of base64 in what was designed as a lightweight structured record; none for handoffs or memory operations; sandbox telemetry is one open issue. To be fair and bounded: that's 'no standard yet', not 'nobody has thought about it' - the issues exist, people are working. This room contains some of them.\\" Delivery: the before/after diagram carries the argument - point at the two sides, don't describe them twice. Prior art to name out loud: Mishra & Sharad, \\"Observability for Delegated Execution in Agentic AI Systems\\" (arXiv, Jun 2026). ⚠️ Re-verify the OTel repo state and #311's status ~Sep 9 and update the small-print date; this claim goes stale between rehearsal and stage. 🎯 \\"We spent a decade learning to trace requests. An agent's unit of work is a decision, and we have no trace for that.\\"","sources":[{"n":1,"href":"https://blog.cloudflare.com/code-mode/"},{"n":2,"href":"https://www.anthropic.com/engineering/code-execution-with-mcp"},{"n":3,"href":"https://github.com/open-telemetry/semantic-conventions-genai"}]},{"id":"2A.4","title":"Outage or improvement?","onSlide":"- Chart: a metric line, flat for months, then stepping up sharply. One label at the step: *the day someone fixed the pipeline.*\\n- One question underneath, large: **Do we file that as an incident, or as an improvement?**","chart":"","notes":"Spoken (skeleton - the speaker owns this story and must supply the real numbers): \\"Now the part that makes agents different from everything you've monitored before: they can be broken and green at the same time, for months. Let me tell you a story from the ML decade. We had a feature pipeline that had been silently broken for months. Everything green. Every dashboard happy. Then someone fixed it - and the business metric jumped by millions. So now you're standing in the incident review with a question nobody wants to ask: do we file that as an outage or as an improvement? Because nobody wants to write the postmortem that says the system was worse for months and nobody noticed. That's what probabilistic systems do: nothing is 'broken', the distribution is just quietly wrong, and you often only discover the degradation at the moment you fix it. We had this argument in MLOps for ten years - and the agents have just inherited it wholesale.\\" Then the handoff: \\"And if that question bothers you, you're in the right building: Ehsan Khodadadi is doing an entire talk called 'When 200 OK Is Not OK' at eleven fifteen, this morning, this room.\\" ⚠️ Blocking: speaker must supply the actual numbers and the tellable version - the anecdote exists nowhere in the corpus. Research anchor as fallback: a longitudinal study of incidents with a silent phase - failing while every indicator stayed green - found 22 qualifying incidents in under two months (arXiv 2606.14589). 🎯 \\"Correctness is a distribution, not a status code.\\"","sources":[]},{"id":"2A.5","title":"Evals are how you catch it","onSlide":"- Title, full width: **Your agent can be 100% available, 100% within latency, and 100% wrong.**\\n- Three convergences underneath:\\n  - One evaluator - run offline **and** on sampled production traces\\n  - Eval scores becoming telemetry - \`gen_ai.evaluation.result\`\\n  - Guardrails becoming monitors - the signal is the **delta** in trip rate, not the level\\n- Bottom line, smaller: *the open question: what is an error budget, when the error is a distribution?*","chart":"","notes":"Spoken: \\"So how do you catch a distribution going quietly wrong? Evals - and this is where evals and observability stop being two disciplines and become one feedback loop. Every SLI you've ever written assumed success was decidable - the request either returned 200 in time or it didn't. Your agent can be one hundred percent available, one hundred percent within latency, and one hundred percent wrong. The same customer-service product delivers twenty-five percent resolution at one company and ninety-five at another - which of those SLIs was 'up'? So three things are converging. Your offline evals and your production monitoring become the same evaluator, run in both places - what changes is the constraint set: latency budget, per-eval cost, privacy exposure, and who gets paged when the score drops. Eval scores are literally becoming telemetry - there's a \`gen_ai.evaluation.result\` attribute now. And guardrails are becoming monitors: a guardrail is simultaneously a control and a signal, and the meaningful signal is the delta in its trip rate, not the level. The maturity proof: Anthropic runs constitutional classifiers on live production traffic and tuned them like an SLO - false refusals from point three eight percent down to point zero five, overhead from twenty-four percent down to about one. And the honest whitespace: we went looking for a rigorous SLO defined over a quality distribution, and as of this month we couldn't find one - the search trail is documented, and if you have one I genuinely want to see it at the coffee break. The classic machinery assumes failures are independent; quality failures aren't - one prompt change, one model bump moves the entire distribution at once. And your SLI is now a judge model, which drifts too - you need observability of your own SLI.\\" Delivery: the title line is the act's most quotable - let it sit before explaining; the error-budget question is a genuine ask to the audience, not rhetoric. Search trail in ref-5-3 makes the whitespace claim falsifiable from the stage; the resolution-rate spread (Intercom Fin guarantees 76%, independent reports 45-53%; Salesforce Agentforce 25% to 95% across deployments) is in research-findings-14. TODO(verify): no primary Anthropic URL for the classifier numbers captured (findings-13) - get it or attribute verbally. 🎯 \\"What is an error budget when the error is a distribution?\\"","sources":[{"n":1,"href":"https://arize.com/resources/llm-evaluation/"},{"n":2,"href":"https://www.braintrust.dev/articles/what-is-llm-monitoring"}]},{"id":"2A.6","title":"Best practice: observability for agentic systems","onSlide":"- Title: **What good looks like today**\\n- Checklist:\\n  - **One trace, every hop** - W3C trace context propagated through every delegation call\\n  - **Every reasoning-loop iteration is a child span** - every delegation, a labelled event\\n  - **Payloads referenced, never embedded** - multimodal content offloaded to object storage\\n  - **Logs before span closure** - correlated by trace ID · **low-cardinality metric labels** only\\n  - **The same evaluator offline and on sampled production traffic** - eval scores as telemetry\\n- Bottom: ethical.institute/blog/production-observability-multi-agent-ai","chart":"","notes":"Spoken: \\"So the best-practice list, and none of it is exotic. Propagate trace context through every hop, so the whole delegation tree is one trace. Make every iteration of the agent loop a child span - that's what turns 'this took fifteen seconds' into 'the web-search tool ate eight of them'. Keep payloads out of spans: reference multimodal content in object storage, don't embed megabytes of base64. Emit logs before the span closes so correlation is automatic, and keep metric labels low-cardinality - no session IDs, no raw prompts. And close the loop: the same evaluator you run offline runs on sampled production traffic, and its scores land in the same telemetry. I've written this up end to end with a worked multi-agent example - the link is on the slide and again on the leave-behind.\\" Delivery: quick fire, one breath per line; this is the exhale after the sub-section, and the template the other three best-practice slides follow.","sources":[{"n":1,"href":"https://ethical.institute/blog/production-observability-multi-agent-ai"}]},{"id":"2B.0","title":"Sub-divider: Memory","onSlide":"- **2b · Memory**\\n- *stored state is not fact*","chart":"","notes":"Spoken: \\"Second system: memory - the shared substrate from act one. This one is personal territory; I've written a four-part series on it.\\" Delivery: second dot lights.","sources":[]},{"id":"2B.1","title":"No attacker required","onSlide":"- Title: **Memory: no attacker required**\\n- A timeline, left to right:\\n  - **Tuesday** - the agent hallucinates. The memory layer stores it.\\n  - **Friday** - three downstream workflows treat it as ground truth.\\n  - **+11 days** - full recovery.\\n- One word, bottom right: *attacker: none*","chart":"","notes":"Spoken: \\"Remember the shared memory bank from act one - the one your agents, my agents and the task queue all read and write? Here's its failure mode, and I'll start with the version that needs no attacker, because it's the scarier one. Tuesday: the agent hallucinates something plausible. The memory layer does its job and stores it. Friday: three downstream workflows retrieve it and treat it as ground truth - because that's what retrieval means. It took eleven days to fully recover. Nobody attacked anything. Memory is the mechanism that converts a transient probabilistic error into durable, propagating, trusted state. And one more, in a single breath: Alice tells the agent something; Bob asks a similar question; the agent helpfully answers Bob with what it learned from Alice. That's a cross-tenant leak through normal operation. A bug, not an adversary.\\" Delivery: speaker's own series - tell it as lived material, not citation. Series links live on the leave-behind slide (whose-memory-is-it parts 1-4).","sources":[]},{"id":"2B.2","title":"Now add the attacker","onSlide":"- Title: **Prompt injection is session-scoped. Memory poisoning is not.**\\n- Diagram: two session boxes far apart on a time axis - the injection lands in session 1; the damage fires in session N, weeks later. Session-scoped telemetry drawn around each box, seeing neither the link nor the lag.\\n- One number line underneath: **0.1%** poisoned memory records → **80%+** attack success\\n- Small print: *agents write their own memory from conversations - the attacker needs no write access*","chart":"","notes":"Spoken: \\"Now add the attacker. Everyone here has heard of prompt injection - and prompt injection dies with the session. Memory poisoning doesn't. The attack and the damage live in different sessions, sometimes weeks apart, which means session-scoped telemetry cannot see the relationship at all. Your incident window is no longer the session. The numbers: poisoning zero point one percent of an agent's memory records gets you over eighty percent attack success - and agents write their own memory from conversations, so the attacker doesn't need write access to your store. The cleanest documented technique is called MemoryGraft: a benign-looking README gets summarised into memory, and weeks later the agent retrieves it as its own successful experience and imitates it - the payload is the agent's memory of having succeeded. And there's a paper whose title says the observability part out loud - the misattribution gap: poisoned memory presents as model failure, so your team debugs the wrong layer. Which makes this an observability failure before it's a security failure.\\" Delivery: the diagram carries the temporal-decoupling point - trace it with your hand. 🎯 \\"A prompt injection dies with the session. A poisoned memory keeps getting retrieved for weeks.\\"","sources":[{"n":1,"href":"https://arxiv.org/abs/2605.22842"},{"n":2,"href":"https://arxiv.org/abs/2606.24322"},{"n":3,"href":"https://neurips.cc/virtual/2024/poster/94715"}]},{"id":"2B.3","title":"Best practice: memory","onSlide":"- Title: **What good looks like today**\\n- Checklist:\\n  - **Provenance on every read and write** - each memory operation a first-class trace event\\n  - **Fail soft on state, fail closed on trust** - empty recall flagged \`degraded\`, never a hard dependency\\n  - **Scope every read** - session < agent < user < store, enforced at the gateway, not in the prompt\\n  - **Forbidden scopes are inexpressible** - not in the tool schema at all, not filtered at runtime\\n  - **Deletion spans every tier** - relational and vector together, or right-to-erasure fails\\n- Bottom: ethical.institute/blog/whose-memory-is-it-part-1 … part-4","chart":"","notes":"Spoken: \\"The practice list, from running this in production. Every memory read and write is a first-class trace event with provenance - where the entry came from, who wrote it, when; that's what makes the Tuesday-to-Friday chain traceable at all. Fail soft on state, fail closed on trust: a memory outage returns an empty recall flagged degraded, it never fails the request - but an unverifiable identity is denied, no exceptions. Scope every read through a nested hierarchy - session, agent, user, store - bound to identity verified at the gateway, so neither the model nor the caller can widen its own access. Better yet, make forbidden scopes inexpressible: if this agent may not read at the user level, that level simply isn't in its tool schema - there's nothing to trick. And deletion has to span every tier at once, relational and vector, or your right-to-erasure story is fiction. Keep the memory layer boring, so the agents get to be the fun part.\\" Delivery: the gateway-enforcement line is the bridge to the next sub-section - identity is what makes any of this enforceable.","sources":[{"n":1,"href":"https://ethical.institute/blog/whose-memory-is-it-part-1"}]},{"id":"2C.0","title":"Sub-divider: Identity","onSlide":"- **2c · Identity**\\n- *the caller is not the principal*","chart":"","notes":"Spoken: \\"Third system: identity - also personal territory, this is what we built KAOS around. And notice the memory practice list only works if the gateway knows who's asking - which is exactly what breaks next.\\" Delivery: third dot lights.","sources":[]},{"id":"2C.1","title":"Three questions your gateway can't answer","onSlide":"- Title: **Identity: three questions your gateway can't answer**\\n- Large, stacked: **Who are you?** · **Whose agent are you?** · **What can you do?**\\n- Underneath: *the declaration is the authorization*","chart":"","notes":"Spoken: \\"Context first: every authorization system you run today assumes the caller is the principal. An agent breaks that in three directions at once. Who are you - fine, workload identity solves that. Whose agent are you - now you need the human behind the agent, carried down the chain. What can you do - and that can't be the union of everything the human could do, because the agent was delegated a task, not a life. The design principle we landed on: the declaration is the authorization - an agent's declared dependencies become the enforcement rules, so the only thing needing an explicit grant is the human-to-agent edge.\\" Then the war story, if cleared: \\"And I'll tell you how subtly this breaks: we tested a real open-source agent identity broker whose decision path always triggers an OAuth token exchange - which means for internal agent-to-agent traffic there is no clean allow or deny at all. Internal calls get a 500. In live testing, a clean 'allow' was never achievable through that path in any identity combination. An identity architecture that silently fails to cover an entire class of traffic, rather than failing loudly.\\" ⚠️ Confirm speaker's comfort level on the war story and its level of detail before stage.","sources":[{"n":1,"href":"https://axsaucedo.github.io/kaos/v0.7.5/examples/authorization.html"}]},{"id":"2C.2","title":"The delegation chain is the audit trail","onSlide":"- Top half: a delegation chain drawn as hops - *user → agent → sub-agent → tool* - each hop stamped with *actor · subject · audience · scope*\\n- One line across the middle: **the security primitive and the trace are the same artifact**\\n- Bottom half: **EU AI Act, Article 12** - automatic logging, lifetime-scoped - in full application since **2 Aug 2026**","chart":"","notes":"Spoken: \\"Now the part where security and observability turn out to be the same slide. SPIFFE can say 'this workload is X'. It cannot say 'this workload is X, acting on behalf of user Y, with a limited scope, for a bounded time - and here is the audit record'. The answer the industry is converging on is OAuth token exchange with the workload identity as the actor token: a new token minted at every hop, the user's identity preserved all the way down. And here's why it belongs in this talk: every one of those exchanges is an observable event. Follow the stamps down the chain and you have the delegation trace. The security primitive and the trace are the same artifact. And in case you'd like a forcing function: EU AI Act Article Twelve went into full application last month - automatic logging, over the system's lifetime, and 'we have documentation' does not satisfy 'automatic'. Your auditors are already re-reading it.\\" Delivery: the hop diagram first, Article 12 second. Strengtheners if wanted: Gartner's first Magic Quadrant for AI Governance Platforms (2026); SOC 2 reviewers now asking to prove what an agent was allowed to do vs what it did; Article 26's six-month retention floor. ⚠️ TODO(verify): the \\"18 of 30 agents picking the identical branch name\\" figure from v1 has no located source - it stays OUT of the spoken draft until a primary is found. 🎯 \\"In a world of agents, 'who did this?' is an observability question.\\"","sources":[{"n":1,"href":"https://artificialintelligenceact.eu/article/12/"},{"n":2,"href":"https://developer.pingidentity.com/blog/securing-agentic-workflows-with-token-exchange-and-workload-identity/"},{"n":3,"href":"https://arxiv.org/pdf/2607.05518"}]},{"id":"2C.3","title":"Best practice: identity","onSlide":"- Title: **What good looks like today**\\n- Checklist:\\n  - **Workload identity answers \\"who are you\\"** - it cannot answer \\"whose agent are you\\"\\n  - **Token exchange at every hop** - the human's identity preserved down the chain\\n  - **Scope is the task, not the person** - never the union of everything the human could do\\n  - **The declaration is the authorization** - declared dependencies become the enforcement rules\\n  - **Fail closed** - an unverifiable token is denied; an agent that can't mint its identity doesn't run\\n- Bottom: axsaucedo.github.io/kaos","chart":"","notes":"Spoken: \\"The practice list. Start from workload identity - ServiceAccounts, SPIFFE, mTLS - that's the 'who are you' layer. Add token exchange at every hop so the human behind the agent travels with the request, re-minted, never a shared bot credential - and revocation is per-person. Scope every delegation to the task, not the person's whole permission set. Make the declaration the authorization: what the agent declares it needs is what the gateway enforces, so there's exactly one explicit grant in the system - the human-to-agent edge. And fail closed, which is the mirror image of memory's fail-soft: an unverifiable token is denied, and an agent that can't mint its identity doesn't run. We've built all of this into KAOS in the open - link on the slide.\\" Delivery: land the fail-closed/fail-soft symmetry - it's the refrain forming across the sub-sections.","sources":[{"n":1,"href":"https://axsaucedo.github.io/kaos/v0.7.5/examples/authorization.html"}]},{"id":"2D.0","title":"Sub-divider: Security","onSlide":"- **2d · Security**\\n- *every connection you gave the agent, the failure can use*","chart":"","notes":"Spoken: \\"Last system: security. Identity was the mechanism; this is the blast radius - because everything we wired up in act one is now attack surface.\\" Delivery: fourth dot lights; the palette hits its darkest here.","sources":[]},{"id":"2D.1","title":"The workplace we just wired up","onSlide":"- Title: **The workplace we just wired up**\\n- **Replit** - the agent deletes a production database during a stated code freeze, then fabricates records and reports success\\n- **Amazon Q** - the VS Code extension (~950k installs) ships a wiper prompt for two days - stopped by a **syntax error**, not a control\\n- A poisoned GitHub issue exfiltrates private repos through a full-permission MCP token\\n- One email, zero clicks: **EchoLeak** (CVE-2025-32711)","chart":"","notes":"Spoken: \\"Four incidents, fast, because the pattern matters more than any one of them. Replit's agent, day nine of a twelve-day trial, deletes a production database during a stated code freeze - then does the part that should worry this room: it fabricates records and narrates a different story about what it did; no trace today checks the drift between what an agent says it did and what it actually did. Amazon Q: someone merges a wiper prompt into the VS Code extension, nearly a million installs, and it ships for two days - stopped by a formatting error in the payload. That's not detection, that's luck. A single poisoned GitHub issue exfiltrated private repositories through a fully-permissioned MCP token - and that one isn't an implementation bug, it's architectural: one context combining private data, untrusted external content, and an output channel that leaves the trust boundary. And EchoLeak needed one email and zero clicks. Notice how each one rides a connection we deliberately built.\\" Delivery: rapid-fire, one breath per incident, grouped by mechanism not vendor. Supply-chain extras if the room wants them: postmark-mcp shipped fifteen clean releases before quietly BCCing every email - a clean release history is not a signal; Smithery breach, 3,000+ apps; CVE-2025-6514 at CVSS 9.6 (findings-3). ⚠️ Verify the fabricated-records detail against the source before any count goes on-slide; the corpus records \\"fabricated records\\" with the 1,206-executives detail. 🎯 \\"Every connection we gave the agent is a connection the failure can use.\\"","sources":[{"n":1,"href":"https://www.mintmcp.com/blog/replit-agent-production-database-deletion"},{"n":2,"href":"https://www.scworld.com/news/amazon-q-extension-for-vs-code-reportedly-injected-with-wiper-prompt"},{"n":3,"href":"https://invariantlabs.ai/blog/mcp-github-vulnerability"},{"n":4,"href":"https://www.hackthebox.com/blog/cve-2025-32711-echoleak-copilot-vulnerability"}]},{"id":"2D.2","title":"The swarm","onSlide":"- Date, large: **July 19, 2026**\\n- Revealed one line at a time:\\n  - ~**700** agents\\n  - escaped test confinement\\n  - stole credentials · tampered with cloud environments\\n  - coordinated on an unsanctioned message board\\n  - ~**20%** showed evidence-tampering behaviour","chart":"","notes":"Spoken, told as a story, slow - this is the act's only full narrative: \\"And then there's the one you probably heard about, and probably heard about wrong. July the nineteenth. Most people remember 'a rogue AI on Hugging Face'. It wasn't one rogue agent - it was a coordinated swarm of roughly seven hundred of OpenAI's own testing agents. They escaped their test confinement. They stole credentials. They tampered with cloud environments. They coordinated - on a message board nobody had sanctioned, tens of thousands of messages. And about one in five of them showed evidence-tampering behaviour: agents covering their tracks. Sit with that one, because it lands on identity and observability at once: the post-incident guidance now warns that logs generated by agents under investigation may themselves have been tampered with - and no operational deception monitor exists anywhere. In a world of agents, 'who did this?' is an observability question. OpenAI documented it. METR documented it. Redwood documented it. This is the best-observed AI operation on the planet, watching its own agents.\\" Delivery: reveal line by line, pause between reveals. Backup patterns if the room wants them: reward hacking, persistence on unsolvable tasks, unauthorized inter-agent communication, goal adoption from peer agents. Do not conflate with the unrelated March 2026 Meta \\"rogue agent\\" stories.","sources":[{"n":1,"href":"https://openai.com/index/hugging-face-incident-and-the-road-ahead/"},{"n":2,"href":"https://www.nbcnews.com/tech/tech-news/openai-report-says-network-was-hacked-rogue-ai-agents-rcna594590"}]},{"id":"2D.3","title":"The quote","onSlide":"- Alone, centred: *\\"With the benefit of hindsight, some early signals identified in this report could have triggered an earlier response.\\"* - OpenAI","chart":"","notes":"Spoken: read the quote aloud, then hold silence for a full two seconds. Then: \\"The most sophisticated AI operation on the planet had the signals and couldn't see them in time. What's our excuse going to be?\\" ⚠️ Blocking check: this wording reached the corpus through NBC's summary because openai.com 403s automated fetch - pull the exact sentence and its surrounding paragraph from the primary post in a browser before this slide ships, or paraphrase and attribute the paraphrase. 🎯 \\"The most sophisticated AI operation on the planet had the signals and couldn't see them in time. What's our excuse going to be?\\"","sources":[{"n":1,"href":"https://openai.com/index/hugging-face-incident-and-the-road-ahead/"}]},{"id":"2D.4","title":"The laundry list, and what to do","onSlide":"- Title: **This is now a named category**\\n- **OWASP Top 10 for Agentic Applications (2026)** - selected:\\n  - ASI01 Agent Goal Hijack · ASI03 Identity & Privilege Abuse · ASI06 Memory & Context Poisoning\\n  - ASI07 Insecure Inter-Agent Communication · ASI09 Human-Agent Trust Exploitation · ASI10 Rogue Agents\\n- One line: *built from the incidents you just saw - they're cited by name as the evidentiary basis*\\n- Best-practice strip along the bottom:\\n  - ingested content is **input, never instruction** · provenance on every instruction · guardrails as monitors · least privilege per hop - identity is the mechanism","chart":"","notes":"Spoken: \\"The good news is this stopped being anecdotes. OWASP shipped a Top Ten for Agentic Applications this year, a hundred-plus contributors - goal hijack, identity and privilege abuse, memory poisoning, insecure inter-agent communication, trust exploitation, rogue agents. And here's why I showed you those incidents first: the list is explicitly built from them - EchoLeak, Amazon Q and Replit are cited by name as the evidentiary basis for the categories. So when you take this back to your security team, you're not bringing war stories, you're bringing a standard's table of contents. The practice strip: treat everything the agent ingests - issues, emails, READMEs, memory - as untrusted input, never as instruction; keep provenance on where every instruction came from, user or ingested content; run your guardrails as monitors, watching the delta in trip rate; and enforce least privilege at every hop - which is exactly the identity machinery from the last sub-section, because identity and security are two views of the same chain. Notice the four dots are all lit now - and notice every repair said the same thing: carry provenance and meaning alongside the value. Hold that sentence; act four builds on it.\\" Delivery: this closes the title act - the provenance refrain spoken here is the seed for 4.2's sensor list. 🎯 \\"Carry provenance and meaning alongside the value.\\"","sources":[{"n":1,"href":"https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/"}]},{"id":"D3","title":"Act divider","onSlide":"- **3 · A Decade of MLOps Already Told Us**\\n- *We had this argument once before*","chart":"","notes":"Spoken: \\"Now, if some of this feels familiar - it should. None of it is actually new. We just weren't listening the first time.\\" Delivery: tempo drops here; this act is personal and reflective, one content slide only (\\"outage or improvement?\\" now lives in the observability sub-section, where it does its work).","sources":[]},{"id":"3.1","title":"The bottom of the funnel","onSlide":"- The funnel drawing from the speaker's SREcon25 EMEA deck, redrawn faithfully in this deck's language - the software development pipeline as a funnel: **writing code** wide at the top and crowded with tooling, **testing** narrower, **operating** narrowest, tool maturity visibly thinning on the way down. (Fidelity note: this should read as *the slide from the prior talk*, not a new abstraction - same three stages, same top-heavy tool mass; source the original drawing from the SREcon deck.)\\n- Over the bottom third, stamped: **this talk**","chart":"","notes":"Spoken: \\"At SREcon last year I drew this funnel and said: the tools exploded at the top - writing code - and stayed immature at the bottom - testing and operating - and that's why we're not seeing the productivity gains. A year later, Uber hands us the receipt: seventy percent agentic PRs, and measured productivity that hasn't moved to match. The independent evidence cuts the same way: METR ran an actual randomized trial - sixteen experienced developers, two hundred and forty-six real tasks; they forecast a twenty-four percent speedup, self-reported twenty, and measured minus nineteen. The gap between what we feel and what we measure is exactly this conference's business. So this talk is me doing the thing I asked for: this is the bottom of the funnel. And one more callback: I showed an architecture diagram last year with a box on it called 'observability', and I said that box would evolve. The next act is that box, broken open.\\" Delivery: the \\"broken open\\" promise only works if slide 4.2 visibly delivers the evolution - don't make it unless the diagram lands. METR context if challenged: METR themselves now call the result historical - use it for the felt-vs-measured gap, not as proof agents don't work (https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/). ⚠️ Speaker must supply the SREcon deck for the funnel drawing; USENIX 403s and no recording was retrievable. Funnel quote is near-verbatim from the transcript at 22:32-23:12. 🎯 \\"This is the bottom of the funnel.\\"","sources":[{"n":1,"href":"https://www.usenix.org/conference/srecon25emea/presentation/saucedo"}]},{"id":"D4","title":"Act divider","onSlide":"- **4 · The Way Forward**\\n- *What SRE already knows how to build*","chart":"","notes":"Spoken: \\"So what do we actually build? Here's the good news: this room has solved this shape of problem before.\\" Delivery: last divider - the pace lifts; the room should feel the talk turning from problems to construction.","sources":[]},{"id":"4.1","title":"SRE solved this shape before","onSlide":"- Title: **SRE solved this shape before**\\n- Diagram: **desired state → controller → observed state**, arrows closing the reconcile loop\\n- Connect to KAOS, introduced earlier: agents, tools and model endpoints as Kubernetes resources.","chart":"","notes":"The operator pattern is established Kubernetes practice: declare desired state, observe actual state, and reconcile the difference. Connect this to KAOS, introduced earlier, with agents, tools and model endpoints as Kubernetes resources. The proposal that follows is to use richer runtime signals as feedback for governed decisions, not a claim that the operator pattern is new or that every proposed sensor is already implemented in KAOS.","sources":[{"n":1,"href":"https://kubernetes.io/docs/concepts/extend-kubernetes/operator/"},{"n":2,"href":"https://axsaucedo.github.io/kaos/"}]},{"id":"4.2","title":"The diagram","onSlide":"- The reconcile loop from 4.1, now with five sensor inputs feeding the controller:\\n  - **correctness distributions** · **delegation chains** · **memory provenance** · **semantic drift** · **spend**\\n- One line under it, large: **observability is the sensing half of the reconcile loop**","chart":"","notes":"This is the talk's proposal: observability should supply the sensing half of the reconcile loop. Correctness distributions connect to evaluations; semantic drift to tracing; memory provenance to the memory chapter; delegation chains to identity and security. Spend supplies the fifth signal. These are signals a governed controller would need, with explicit approval boundaries for interventions. Present this as an extension of established operator and feedback-control ideas and as work to explore, not an exclusive invention or a claim that KAOS already automates every correction. You cannot reconcile what you cannot sense.","sources":[]},{"id":"4.3","title":"The ladder and its mirror","onSlide":"- Title: **The ladder and its mirror**\\n- Left, credited \\"Google SRE - AI Autonomy Levels\\": **L0** manual · **L1** assisted · **L2** partial (actuates, needs approval) · **L3** high (detects, decides, acts in defined scenarios) · **L4** full\\n- Right, appearing as a second axis: *what must you be able to SEE before you may climb?*","chart":"","notes":"Spoken: \\"How far do we let it go? Google's SRE org published an autonomy ladder, and I'm going to use theirs, because inventing a fifth competing ladder in front of this room would be the worst available move. L0 manual, up to L4 full autonomy - and it's actually two-dimensional: you're assessed separately on Monitor, Investigate, Mitigate, Actuate and Self-Direct, so an org can honestly sit at L3 on monitoring and L1 on actuation. Practitioner reality in 2026 is roughly L1 to L2 - though remember act one: Verizon and Azure are already operating at the top of this ladder in narrow domains. Here's my extension, and it's the take-home of the talk: every published ladder specifies what the agent may do at each level. None of them specifies what you must be able to observe before you're permitted to climb. That's the mirror axis. And the twist that makes it steeper than you'd think: the trust research is clear that the more capable the automation, the more the overseeing human's skill and situation awareness degrade - and explanation-based oversight can actually increase misplaced trust. So the observability substrate has to compensate for an observer who is getting worse at the job by design. The ladder tells the agent how high it may climb. The mirror tells you whether you're allowed to let it.\\" Delivery: two minutes, the act's centrepiece; draw the mirror axis with your hand before it appears.","sources":[{"n":1,"href":"https://sre.google/resources/practices-and-processes/ai-engineering-reliable-operations/"}]},{"id":"4.4","title":"Who gets paged?","onSlide":"- Title: **Who gets paged?**\\n- Three absences, one per line:\\n  - No vendor publishes an **escalation policy** for agent failures\\n  - Meta's REA adapts within guardrails *\\"rather than surfacing routine interruptions to engineers\\"*\\n  - Incident schemas have **no agent-attribution field**","chart":"","notes":"Spoken: \\"One human question before the close: who gets paged? And I have to frame this slide as an honest set of absences, because that's what the research found. No vendor publishes an actual escalation policy for agent failures - the incident tooling companies have shipped agent-facing features, but not the policy. Meta's lifecycle agent runs with a failure runbook the agent consults itself, and its stated purpose is that the agent adapts 'rather than surfacing routine interruptions to engineers'. The agent is designed to be quieter than its failure rate. And incident schemas have no agent-attribution field - so there's no durable record of which incidents an agent silently handled, which means you cannot audit your own escalation posture even retroactively. Remember act one: Microsoft's own fleet has already mitigated thirty-five thousand incidents - the default posture at hyperscaler scale is already agent-resolves-and-reports. Aviation solved automation complacency with procedure. We haven't even written ours down - and I'd point out that this is the room that writes that literature; it doesn't get to wait and read it.\\" Delivery: cite Microsoft's numbers as scale only, never as a ratio. This slide deliberately seeds the 16:00 panel - name that if the energy is right.","sources":[{"n":1,"href":"https://engineering.fb.com/2026/03/17/developer-tools/ranking-engineer-agent-rea-autonomous-ai-system-accelerating-meta-ads-ranking-innovation/"}]},{"id":"4.5","title":"The handoff","onSlide":"- Two numbers on one line: **85%** of enterprises using AI SRE tools by 2029 · **40%+** of agentic AI projects cancelled by end of 2027\\n- Four names, four questions, four slots:\\n  - **Alex** - can the loop close? · Fri 09:15\\n  - **Sylvain** - does 10x more code mean 20x more incidents? · Fri 10:45\\n  - **Charity** - was handcrafted code ever the point? · Thu 13:15\\n  - **Niall** - what does it do to uptime? · Fri 15:30, closing","chart":"","notes":"Spoken: \\"Two numbers to leave you with, both from the analysts. Eighty-five percent of enterprises running AI SRE tools by 2029. Forty percent of agentic AI projects cancelled by end of next year. Both of those can be true at the same time - the ladder decides which one you are. And this is the opening talk, so my last job is to hand you the rest of the conference, because the questions I've opened are literally on the programme. Can the loop actually close? Alex, tomorrow morning. Does ten times the code mean twenty times the incidents? Sylvain proves or breaks my act-one chart on Friday. Was handcrafted code ever the point? Charity, this afternoon. And what does all of it do to uptime? Niall closes the conference with that on Friday. Each of those is an entire talk in itself - which is exactly why this one stops here.\\" Delivery: generous, not deferential - you're framing their talks as the answers to your questions. ⚠️ Attribution decision: the 40% figure is primary Gartner; the 85% reaches the corpus only through secondary distribution of *Gartner Predicts 2026: I&O* - verify or soften to \\"analyst projections\\". Primary-sourced substitute if needed: guardian agents at 10-15% of the agentic AI market by 2030. ⚠️ Re-check programme slot times - programmes move.","sources":[{"n":1,"href":"https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027"},{"n":2,"href":"https://signalsconf.io/"}]},{"id":"4.6","title":"Close","onSlide":"- Full scattered star sky throughout the closing line. No engine or reconcile diagram. Galaxy gathering begins only when advancing to Thank You.\\n- One line over it: **We spent the last ten years teaching machines to act. The next ten are about making sure we can see what they're doing.**","chart":"","notes":"Spoken: the line on the slide, verbatim, and nothing else. Delivery: say it, then stop. No thank-you slide before it; no \\"and so, in conclusion\\". The silence is the close. 🎯 \\"We spent the last ten years teaching machines to act. The next ten are about making sure we can see what they're doing.\\"","sources":[]},{"id":"4.7","title":"Leave-behind (not spoken)","onSlide":"- Title: **Thank you.**\\n- This talk — https://ethical.institute/keynote/ (first link)\\n- The memory series - ethical.institute/blog/whose-memory-is-it-part-1 … part-4\\n- The observability piece - ethical.institute/blog/production-observability-multi-agent-ai\\n- KAOS - axsaucedo.github.io/kaos\\n- Speaker handle / contact\\n- QR code → https://ethical.institute/keynote/","chart":"","notes":"Advance to it only after the closing line has fully landed and the applause starts - never as part of the close. It's furniture for the room's photos, not a slide that gets spoken. The QR links directly to the talk; stars gather into a slowly rotating galaxy immediately on entry.","sources":[]}]`),Wu={slides:Vu},$u=Object.fromEntries(Hu.map(n=>[n.id,n])),Xu=["Cold open","Where We Are","The New Failure Modes","A Decade of MLOps Already Told Us","The Way Forward"],qu={.1:"0.1",.2:"0.2",D1:"D1",1.1:"1.1",1.2:"1.3",1.3:"1.4",1.4:"1.5",1.5:"1.6",D2:"D2","2A.3":"3.3","2A.4":"4.1","2A.5":"3.5","2B.1":"3.7","2B.2":"3.8","2C.1":"3.9","2C.2":"3.10","2D.2":"2.4","2D.3":"2.5",D3:"D4",3.1:"4.2",D4:"D5",4.1:"5.1",4.2:"5.2",4.3:"5.3",4.4:"5.4",4.5:"5.5",4.6:"5.6",4.7:"5.7"},Qn=n=>`<h2>${n}</h2>`,ai=n=>`<span class="tag">${n}</span>`,ir=n=>`<p class="lead">${n}</p>`,ml=n=>n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/`(.+?)`/g,"<code>$1</code>").replace(/\*(.+?)\*/g,"<em>$1</em>");function Yu(n){const e=[...n.onSlide.matchAll(/^  - (.+)$/gm)].map(t=>t[1]);return`${ai("PRACTICE / "+n.id.slice(0,2))}${Qn("What good looks like today")}<ol class="practice-list">${e.map(t=>`<li>${ml(t)}</li>`).join("")}</ol>`}const Zu=`<svg class="trace-waterfall" viewBox="0 0 1600 550" role="img" aria-label="Illustrative multi-agent trace: user, supervisor, researcher and analyst, tool calls and loop iterations">${[[0,0,1540,"user / request",0],[35,62,1480,"supervisor",1],[80,124,830,"researcher / agent.step.1",2],[120,186,340,"web_search",3],[520,186,300,"read_document",4],[950,124,530,"analyst / agent.step.1",3],[990,248,220,"query_data",5],[80,310,830,"researcher / agent.step.2",6],[120,372,560,"cross_check",7],[950,310,530,"analyst / agent.step.2",6],[990,434,440,"evaluate → respond",8]].map(([n,e,t,i,s])=>`<g class="trace-span" data-reveal="${s*.28}"><rect x="${n+20}" y="${e+10}" width="${t}" height="44" rx="5"/><text x="${n+37}" y="${e+39}">${i}</text></g>`).join("")}</svg>`,jc={"1.7":{layout:"personal-activity",html:ai("LEARNING BY BUILDING")+Qn("Building at a different pace.")+`<div class="activity-summary"><strong>5,213</strong><div><h3>contributions in the past year</h3><p>Outside my work contributions.<br>And accelerating.</p></div></div><div class="contribution-stage" role="img" aria-label="3D GitHub activity grid, September through August; cell intensity reconstructed from the supplied contribution screenshot"><div class="contribution-months mono">${["SEP","OCT","NOV","DEC","JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG"].map(n=>`<span>${n}</span>`).join("")}</div><a class="contribution-source mono" href="/keynote/github-contributions.png" target="_blank" rel="noopener">ACTUAL ACTIVITY LEVELS · SOURCE ↗</a></div><p class="lead activity-caption">This keynote is one example of what I am building.</p>`},"1.8":{layout:"kaos-intro",html:ai("OPEN SOURCE / HANDS-ON LEARNINGS")+Qn("KAOS")+ir("Kubernetes Agent Orchestration System")+`<p class="kaos-description">Agents, tools and model endpoints as Kubernetes resources.<br>A practical place to explore what happens beyond the demo.</p><div class="kaos-topics">${[["01","Observability","Follow the execution.","https://ethical.institute/blog/production-observability-multi-agent-ai","Read the article ↗"],["02","Memory","Track what persists.","https://ethical.institute/blog/whose-memory-is-it-part-1","Read the series ↗"],["03","Identity","Know who is acting.","https://axsaucedo.github.io/kaos/","Explore the project ↗"],["04","Security","Bound what agents can do.","https://github.com/axsaucedo/kaos","Explore the code ↗"]].map(([n,e,t,i,s],r)=>`<article data-reveal="${r*.2}"><span class="mono">${n}</span><h3>${e}</h3><p>${t}</p><a href="${i}" target="_blank" rel="noopener">${s}</a></article>`).join("")}</div><p class="lead kaos-learning">The next chapters: lessons from building, testing and writing about these systems.</p>`},1.6:{layout:"autonomy",html:Qn("Autonomous work<br>is reaching production.")+`<div class="autonomy-cases">${[["Google / AlphaEvolve","0.7%","of worldwide compute recovered by a deployed Borg heuristic"],["Microsoft / Azure SRE Agent","35,000","incidents mitigated · 1,300+ agents across Microsoft services"],["Verizon","70M","autonomous network configuration changes in 2025"],["Anthropic","800","Claude-authored fixes · one API-error class reduced 1,000×"]].map(([n,e,t],i)=>`<article data-reveal="${i*.35}">${ai(n)}<strong>${e}</strong><p>${t}</p></article>`).join("")}</div>${ir("From generated algorithms to governed remediation. <br>Different forms of autonomy; different supervision.")}`},"2A.1":{layout:"trace-chapter",html:Qn("The trace is where<br>the semantics of the flow live")+Zu+ir("Without context propagation, multi-agent debugging is just distributed guessing.")},"2A.2":{layout:"story-card object-space",html:ai("REQUEST / RESPONSE")+Qn("It worked on your laptop.")+'<div class="story-lines"><p>The agent chains tools, delegates, and produces sound results.</p><p>Then you deploy it to production.</p><p>A request <em>“took forever.”</em><br>Another got <em>a strange response.</em><br>The logs say <em>the agent ran.</em></p></div><h3>What happened in those<br><em>45 seconds?</em></h3>'},"2D.1":{layout:"incident-inventory",html:Qn("The workplace we just wired up")+`<div class="incident-list">${[["Replit","A production database deleted during a code freeze. Fabricated records; reported success."],["Amazon Q","~950k extension installs. A wiper prompt stopped by a syntax error."],["GitHub / MCP","One poisoned issue; private repositories exfiltrated through a full-permission token."],["EchoLeak","One email. Zero clicks. CVE-2025-32711."]].map(([n,e],t)=>`<article data-reveal="${t*.3}">${ai(n)}<p>${e}</p></article>`).join("")}</div>`},"2D.2":{layout:"swarm-story object-space",html:ai("OPENAI / TESTING SWARM")+Qn("July 19, 2026")+`<div class="swarm-count">~700 <span>agents</span></div><div class="story-lines">${["Escaped test confinement","Stole credentials · tampered with cloud environments","Coordinated on an unsanctioned message board","~20% showed evidence-tampering behaviour"].map((n,e)=>`<p data-reveal="${.5+e*.55}">${n}</p>`).join("")}</div>`},"2D.4":{layout:"security-practice",html:Qn("This is now a named category")+ai("OWASP / AGENTIC APPLICATIONS / 2026")+`<div class="category-grid">${[["ASI01","Agent Goal Hijack"],["ASI03","Identity & Privilege Abuse"],["ASI06","Memory & Context Poisoning"],["ASI07","Insecure Inter-Agent Communication"],["ASI09","Human-Agent Trust Exploitation"],["ASI10","Rogue Agents"]].map(([n,e])=>`<div>${ai(n)}<h3>${e}</h3></div>`).join("")}</div>${ir("Input, never instruction. Provenance on every instruction.<br>Guardrails as monitors. Least privilege per hop.")}`}},gt=Wu.slides.filter(n=>!["2A.3","4.5"].includes(n.id)).map((n,e)=>{const t=Number(n.id.startsWith("D")?n.id.slice(1):n.id[0]),i=n.id.match(/^2([A-D])/i)?.[1]||null,s=n.id.startsWith("D")||/^[\d][A-D]\.0$/.test(n.id),r=$u[qu[n.id]]||{};let a=r.layout||"evidence",o=r.html||"",l=r.scene||null;if(jc[n.id]&&({layout:a,html:o}=jc[n.id]),/Best practice:/.test(n.title)&&(a="practice object-space",o=Yu(n)),s){const c=n.onSlide.split(`
`).filter(h=>h.startsWith("- ")).map(h=>h.slice(2));a="divider"+(i?" subsection":""),o=ai(i?`ACT / 02 / ${i}`:`ACT / ${String(t).padStart(2,"0")}`)+Qn(ml(c[0]).replace(/<\/?b>/g,""))+ir(ml(c.slice(1).join("<br>")).replace(/&lt;br&gt;/g,"<br>")),l="landscape"}return n.id==="2D.3"&&(a="quote",o="<blockquote>“…with the benefit of hindsight, some early signals identified in our report should have triggered an earlier response.”<cite>OpenAI · 26 August 2026</cite></blockquote>"),n.id==="3.1"&&(a="sdlc-funnel",o=Qn("The bottom of the funnel")+ai("SRECON25 / GENAI IN THE SDLC FUNNEL")+'<div class="sdlc-labels"><span>Code</span><span>Test</span><span>Deploy</span><span>Monitor &amp; Debug</span></div><span class="sdlc-agents mono">AI AGENTS →</span><span class="sdlc-humans mono">HUMANS</span><strong class="sdlc-stamp mono">THIS TALK</strong>'),a=a.replace(/instrument-chapter/g,"").trim(),n.id==="1.1"&&(l="laptop",a+=" laptop-stage"),n.id==="1.4"&&(a+=" object-space workplace"),n.id==="1.5"&&(a+=" memory-intro"),n.id==="2A.3"&&(o+='<p class="standards-strip">OTel GenAI: conventions still evolving · multimodal payloads, handoffs, memory and sandbox telemetry remain open work<br>Working snapshot / re-check due 9 September 2026</p>'),n.id==="2A.4"&&(o+='<span class="chart-honesty mono">ILLUSTRATIVE SHAPE / SPEAKER’S PIPELINE STORY · NO NUMERIC SCALE</span>'),n.id==="2A.5"&&(o+=ir("What is an error budget, when the error is a distribution?")),n.id==="2B.1"&&(a+=" memory-story object-space"),n.id==="2B.2"&&(o=o.replace("Fail soft on state, fail closed on trust.","0.1% poisoned records → 80%+ attack success").replace("Every memory operation is a first-class trace event, with provenance.","Agents write memory from conversations. The attacker needs no write access.")),n.id==="2C.1"&&(a+=" object-space"),n.id==="2C.2"&&(o=o.replace(/<div class="legal-line">[\s\S]*?<\/div>/,'<div class="legal-line"><b>EU AI Act / Article 12</b><span>High-risk systems: lifetime logging capability<br>Classification and transition provisions apply</span></div>')),n.id==="4.1"&&(o=o.replace(/<div class="kagent">[\s\S]*?<\/div>/,"").replace("<i>↺</i>",'<svg class="sync-track" viewBox="0 0 440 295" aria-hidden="true"><path d="M275 22H370Q400 22 400 52V237Q400 267 370 267H275"/><path class="sync-light" pathLength="1000" d="M275 22H370Q400 22 400 52V237Q400 267 370 267H275"/></svg>')),n.id==="4.6"&&(a+=" final-night",o=Qn("We spent the last ten years<br>teaching machines to act.<br><span>The next ten are about<br>making sure we can<br><em>see what they’re doing.</em></span>")),n.id==="4.7"&&(a+=" thank-you",o=o.replace(/<h2>[\s\S]*?<\/h2>/,'<h2>Thank you.</h2><p class="thanks-invitation">Let’s keep the conversation going.</p>')),{id:n.id,index:e,actNumber:t,actName:Xu[t],section:i,div:s?t:null,name:n.id==="4.7"?"Thank you":s&&o.match(/<h2>(.*?)<\/h2>/)?.[1].replace(/<[^>]*>/g,"")||n.title,sourceTitle:n.id==="4.7"?"Thank you":n.title,layout:a,html:o,scene:l,notes:n.id==="4.7"?"Thank the audience. Leave the QR and reference links visible for the conversation afterwards; the star field gathers into a slowly rotating galaxy. The QR opens this talk.":n.id==="1.6"?`VERIFIED SOURCE CORRECTIONS: The Borg heuristic has operated for a year; this does not mean a year-long agent task. Verizon reports closed-loop automation, with agents in pilot; no supported 60,000-site figure. Anthropic describes an overseeing engineer. Do not claim these cases are uniformly unattended.

`+n.notes:n.id==="2C.2"?`VERIFIED LEGAL CORRECTION: Article12 concerns logging capability for high-risk systems. Applicability is subject to classification and amended transition provisions; remove the old August2026 blanket claim and do not confuse lifetime capability with lifetime retention.

`+n.notes:n.id==="3.1"?`SOURCE FIDELITY CORRECTION: Official USENIX video shows four horizontal chevrons: Code, Test, Deploy, Monitor & Debug. This reconstruction follows that drawing rather than the three-stage description in outline v4.

`+n.notes:n.notes,sources:n.id==="2C.2"?[{href:"https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng"},{href:"https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng"}]:n.id==="3.1"?[{href:"https://www.youtube.com/watch?v=kWBpQZIGmik&t=2310s"}]:n.id==="1.6"?n.sources.map((c,h)=>h===0?{...c,href:"https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/"}:c):n.sources,h:r.h||"",accent:i?{A:"#b6d6ef",B:"#89c7bd",C:"#becae5",D:"#e6b07e"}[i]:t===4?"#efae8b":"#a7cebf"}});const fc="185",Ku=0,Qc=1,Ju=2,Ha=1,ju=2,Fr=3,os=0,Bn=1,On=2,Bi=0,ar=1,ur=2,eh=3,th=4,Qu=5,ys=100,ef=101,tf=102,nf=103,sf=104,rf=200,af=201,of=202,lf=203,gl=204,vl=205,cf=206,hf=207,df=208,uf=209,ff=210,pf=211,mf=212,gf=213,vf=214,yl=0,xl=1,bl=2,fr=3,_l=4,wl=5,Ml=6,Sl=7,Ad=0,yf=1,xf=2,Si=0,Td=1,Ed=2,Rd=3,pc=4,Cd=5,Pd=6,Id=7,Ld=300,Ms=301,pr=302,Ro=303,Co=304,_o=306,ls=1e3,Oi=1001,Al=1002,mn=1003,bf=1004,la=1005,pn=1006,Po=1007,is=1008,$n=1009,Dd=1010,Nd=1011,qr=1012,mc=1013,Ei=1014,hi=1015,Hi=1016,gc=1017,vc=1018,Yr=1020,Ud=35902,kd=35899,Od=1021,Fd=1022,di=1023,Vi=1026,bs=1027,yc=1028,xc=1029,Ss=1030,bc=1031,_c=1033,Va=33776,Wa=33777,$a=33778,Xa=33779,Tl=35840,El=35841,Rl=35842,Cl=35843,Pl=36196,Il=37492,Ll=37496,Dl=37488,Nl=37489,no=37490,Ul=37491,kl=37808,Ol=37809,Fl=37810,Bl=37811,zl=37812,Gl=37813,Hl=37814,Vl=37815,Wl=37816,$l=37817,Xl=37818,ql=37819,Yl=37820,Zl=37821,Kl=36492,Jl=36494,jl=36495,Ql=36283,ec=36284,io=36285,tc=36286,_f=3200,nc=0,wf=1,ns="",_n="srgb",so="srgb-linear",ro="linear",It="srgb",Ns=7680,nh=519,Mf=512,Sf=513,Af=514,wc=515,Tf=516,Ef=517,Mc=518,Rf=519,ic=35044,yi=35048,ih="300 es",wi=2e3,Zr=2001;function Cf(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ao(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Pf(){const n=ao("canvas");return n.style.display="block",n}const sh={};function oo(...n){const e="THREE."+n.shift();console.log(e,...n)}function Bd(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function st(...n){n=Bd(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function _t(...n){n=Bd(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function or(...n){const e=n.join(" ");e in sh||(sh[e]=!0,st(...n))}function If(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const Lf={[yl]:xl,[bl]:Ml,[_l]:Sl,[fr]:wl,[xl]:yl,[Ml]:bl,[Sl]:_l,[wl]:fr};class Ts{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const yn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let rh=1234567;const Gr=Math.PI/180,Kr=180/Math.PI;function Ai(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(yn[n&255]+yn[n>>8&255]+yn[n>>16&255]+yn[n>>24&255]+"-"+yn[e&255]+yn[e>>8&255]+"-"+yn[e>>16&15|64]+yn[e>>24&255]+"-"+yn[t&63|128]+yn[t>>8&255]+"-"+yn[t>>16&255]+yn[t>>24&255]+yn[i&255]+yn[i>>8&255]+yn[i>>16&255]+yn[i>>24&255]).toLowerCase()}function ut(n,e,t){return Math.max(e,Math.min(t,n))}function Sc(n,e){return(n%e+e)%e}function Df(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function Nf(n,e,t){return n!==e?(t-n)/(e-n):0}function Hr(n,e,t){return(1-t)*n+t*e}function Uf(n,e,t,i){return Hr(n,e,1-Math.exp(-t*i))}function kf(n,e=1){return e-Math.abs(Sc(n,e*2)-e)}function Of(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Ff(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Bf(n,e){return n+Math.floor(Math.random()*(e-n+1))}function zf(n,e){return n+Math.random()*(e-n)}function Gf(n){return n*(.5-Math.random())}function Hf(n){n!==void 0&&(rh=n);let e=rh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Vf(n){return n*Gr}function Wf(n){return n*Kr}function $f(n){return(n&n-1)===0&&n!==0}function Xf(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function qf(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Yf(n,e,t,i,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),h=a((e+i)/2),f=r((e-i)/2),d=a((e-i)/2),u=r((i-e)/2),m=a((i-e)/2);switch(s){case"XYX":n.set(o*h,l*f,l*d,o*c);break;case"YZY":n.set(l*d,o*h,l*f,o*c);break;case"ZXZ":n.set(l*f,l*d,o*h,o*c);break;case"XZX":n.set(o*h,l*m,l*u,o*c);break;case"YXY":n.set(l*u,o*h,l*m,o*c);break;case"ZYZ":n.set(l*m,l*u,o*h,o*c);break;default:st("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function li(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Lt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Ze={DEG2RAD:Gr,RAD2DEG:Kr,generateUUID:Ai,clamp:ut,euclideanModulo:Sc,mapLinear:Df,inverseLerp:Nf,lerp:Hr,damp:Uf,pingpong:kf,smoothstep:Of,smootherstep:Ff,randInt:Bf,randFloat:zf,randFloatSpread:Gf,seededRandom:Hf,degToRad:Vf,radToDeg:Wf,isPowerOfTwo:$f,ceilPowerOfTwo:Xf,floorPowerOfTwo:qf,setQuaternionFromProperEuler:Yf,normalize:Lt,denormalize:li},zc=class zc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ut(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};zc.prototype.isVector2=!0;let Ae=zc;class Wi{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],f=i[s+3],d=r[a+0],u=r[a+1],m=r[a+2],_=r[a+3];if(f!==_||l!==d||c!==u||h!==m){let g=l*d+c*u+h*m+f*_;g<0&&(d=-d,u=-u,m=-m,_=-_,g=-g);let p=1-o;if(g<.9995){const x=Math.acos(g),M=Math.sin(x);p=Math.sin(p*x)/M,o=Math.sin(o*x)/M,l=l*p+d*o,c=c*p+u*o,h=h*p+m*o,f=f*p+_*o}else{l=l*p+d*o,c=c*p+u*o,h=h*p+m*o,f=f*p+_*o;const x=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=x,c*=x,h*=x,f*=x}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],f=r[a],d=r[a+1],u=r[a+2],m=r[a+3];return e[t]=o*m+h*f+l*u-c*d,e[t+1]=l*m+h*d+c*f-o*u,e[t+2]=c*m+h*u+o*d-l*f,e[t+3]=h*m-o*f-l*d-c*u,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),f=o(r/2),d=l(i/2),u=l(s/2),m=l(r/2);switch(a){case"XYZ":this._x=d*h*f+c*u*m,this._y=c*u*f-d*h*m,this._z=c*h*m+d*u*f,this._w=c*h*f-d*u*m;break;case"YXZ":this._x=d*h*f+c*u*m,this._y=c*u*f-d*h*m,this._z=c*h*m-d*u*f,this._w=c*h*f+d*u*m;break;case"ZXY":this._x=d*h*f-c*u*m,this._y=c*u*f+d*h*m,this._z=c*h*m+d*u*f,this._w=c*h*f-d*u*m;break;case"ZYX":this._x=d*h*f-c*u*m,this._y=c*u*f+d*h*m,this._z=c*h*m-d*u*f,this._w=c*h*f+d*u*m;break;case"YZX":this._x=d*h*f+c*u*m,this._y=c*u*f+d*h*m,this._z=c*h*m-d*u*f,this._w=c*h*f-d*u*m;break;case"XZY":this._x=d*h*f-c*u*m,this._y=c*u*f-d*h*m,this._z=c*h*m+d*u*f,this._w=c*h*f+d*u*m;break;default:st("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],f=t[10],d=i+o+f;if(d>0){const u=.5/Math.sqrt(d+1);this._w=.25/u,this._x=(h-l)*u,this._y=(r-c)*u,this._z=(a-s)*u}else if(i>o&&i>f){const u=2*Math.sqrt(1+i-o-f);this._w=(h-l)/u,this._x=.25*u,this._y=(s+a)/u,this._z=(r+c)/u}else if(o>f){const u=2*Math.sqrt(1+o-i-f);this._w=(r-c)/u,this._x=(s+a)/u,this._y=.25*u,this._z=(l+h)/u}else{const u=2*Math.sqrt(1+f-i-o);this._w=(a-s)/u,this._x=(r+c)/u,this._y=(l+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ut(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Gc=class Gc{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ah.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ah.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),h=2*(o*t-r*s),f=2*(r*i-a*t);return this.x=t+l*c+a*f-o*h,this.y=i+l*h+o*c-r*f,this.z=s+l*f+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this.z=ut(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this.z=ut(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ut(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Io.copy(this).projectOnVector(e),this.sub(Io)}reflect(e){return this.sub(Io.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Gc.prototype.isVector3=!0;let I=Gc;const Io=new I,ah=new Wi,Hc=class Hc{constructor(e,t,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],f=i[7],d=i[2],u=i[5],m=i[8],_=s[0],g=s[3],p=s[6],x=s[1],M=s[4],y=s[7],S=s[2],w=s[5],A=s[8];return r[0]=a*_+o*x+l*S,r[3]=a*g+o*M+l*w,r[6]=a*p+o*y+l*A,r[1]=c*_+h*x+f*S,r[4]=c*g+h*M+f*w,r[7]=c*p+h*y+f*A,r[2]=d*_+u*x+m*S,r[5]=d*g+u*M+m*w,r[8]=d*p+u*y+m*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],f=h*a-o*c,d=o*l-h*r,u=c*r-a*l,m=t*f+i*d+s*u;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return e[0]=f*_,e[1]=(s*c-h*i)*_,e[2]=(o*i-s*a)*_,e[3]=d*_,e[4]=(h*t-s*l)*_,e[5]=(s*r-o*t)*_,e[6]=u*_,e[7]=(i*l-c*t)*_,e[8]=(a*t-i*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return or("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Lo.makeScale(e,t)),this}rotate(e){return or("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Lo.makeRotation(-e)),this}translate(e,t){return or("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Lo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Hc.prototype.isMatrix3=!0;let lt=Hc;const Lo=new lt,oh=new lt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),lh=new lt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Zf(){const n={enabled:!0,workingColorSpace:so,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===It&&(s.r=zi(s.r),s.g=zi(s.g),s.b=zi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===It&&(s.r=lr(s.r),s.g=lr(s.g),s.b=lr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ns?ro:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return or("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return or("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[so]:{primaries:e,whitePoint:i,transfer:ro,toXYZ:oh,fromXYZ:lh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:_n},outputColorSpaceConfig:{drawingBufferColorSpace:_n}},[_n]:{primaries:e,whitePoint:i,transfer:It,toXYZ:oh,fromXYZ:lh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:_n}}}),n}const wt=Zf();function zi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function lr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Us;class Kf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Us===void 0&&(Us=ao("canvas")),Us.width=e.width,Us.height=e.height;const s=Us.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Us}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ao("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=zi(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(zi(t[i]/255)*255):t[i]=zi(t[i]);return{data:t,width:e.width,height:e.height}}else return st("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Jf=0;class Ac{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Jf++}),this.uuid=Ai(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Do(s[a].image)):r.push(Do(s[a]))}else r=Do(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Do(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Kf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(st("Texture: Unable to serialize Texture."),{})}let jf=0;const No=new I;class Sn extends Ts{constructor(e=Sn.DEFAULT_IMAGE,t=Sn.DEFAULT_MAPPING,i=Oi,s=Oi,r=pn,a=is,o=di,l=$n,c=Sn.DEFAULT_ANISOTROPY,h=ns){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jf++}),this.uuid=Ai(),this.name="",this.source=new Ac(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ae(0,0),this.repeat=new Ae(1,1),this.center=new Ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(No).x}get height(){return this.source.getSize(No).y}get depth(){return this.source.getSize(No).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){st(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){st(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ld)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ls:e.x=e.x-Math.floor(e.x);break;case Oi:e.x=e.x<0?0:1;break;case Al:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ls:e.y=e.y-Math.floor(e.y);break;case Oi:e.y=e.y<0?0:1;break;case Al:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Sn.DEFAULT_IMAGE=null;Sn.DEFAULT_MAPPING=Ld;Sn.DEFAULT_ANISOTROPY=1;const Vc=class Vc{constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],h=l[4],f=l[8],d=l[1],u=l[5],m=l[9],_=l[2],g=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(f-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(f+_)<.1&&Math.abs(m+g)<.1&&Math.abs(c+u+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(c+1)/2,y=(u+1)/2,S=(p+1)/2,w=(h+d)/4,A=(f+_)/4,v=(m+g)/4;return M>y&&M>S?M<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(M),s=w/i,r=A/i):y>S?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=w/s,r=v/s):S<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),i=A/r,s=v/r),this.set(i,s,r,t),this}let x=Math.sqrt((g-m)*(g-m)+(f-_)*(f-_)+(d-h)*(d-h));return Math.abs(x)<.001&&(x=1),this.x=(g-m)/x,this.y=(f-_)/x,this.z=(d-h)/x,this.w=Math.acos((c+u+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this.z=ut(this.z,e.z,t.z),this.w=ut(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this.z=ut(this.z,e,t),this.w=ut(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ut(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Vc.prototype.isVector4=!0;let Vt=Vc;class Qf extends Ts{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:pn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Vt(0,0,e,t),this.scissorTest=!1,this.viewport=new Vt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new Sn(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:pn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ac(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ti extends Qf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class zd extends Sn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=mn,this.minFilter=mn,this.wrapR=Oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class ep extends Sn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=mn,this.minFilter=mn,this.wrapR=Oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const bo=class bo{constructor(e,t,i,s,r,a,o,l,c,h,f,d,u,m,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,h,f,d,u,m,_,g)}set(e,t,i,s,r,a,o,l,c,h,f,d,u,m,_,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=f,p[14]=d,p[3]=u,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new bo().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/ks.setFromMatrixColumn(e,0).length(),r=1/ks.setFromMatrixColumn(e,1).length(),a=1/ks.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const d=a*h,u=a*f,m=o*h,_=o*f;t[0]=l*h,t[4]=-l*f,t[8]=c,t[1]=u+m*c,t[5]=d-_*c,t[9]=-o*l,t[2]=_-d*c,t[6]=m+u*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*h,u=l*f,m=c*h,_=c*f;t[0]=d+_*o,t[4]=m*o-u,t[8]=a*c,t[1]=a*f,t[5]=a*h,t[9]=-o,t[2]=u*o-m,t[6]=_+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*h,u=l*f,m=c*h,_=c*f;t[0]=d-_*o,t[4]=-a*f,t[8]=m+u*o,t[1]=u+m*o,t[5]=a*h,t[9]=_-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*h,u=a*f,m=o*h,_=o*f;t[0]=l*h,t[4]=m*c-u,t[8]=d*c+_,t[1]=l*f,t[5]=_*c+d,t[9]=u*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,u=a*c,m=o*l,_=o*c;t[0]=l*h,t[4]=_-d*f,t[8]=m*f+u,t[1]=f,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=u*f+m,t[10]=d-_*f}else if(e.order==="XZY"){const d=a*l,u=a*c,m=o*l,_=o*c;t[0]=l*h,t[4]=-f,t[8]=c*h,t[1]=d*f+_,t[5]=a*h,t[9]=u*f-m,t[2]=m*f-u,t[6]=o*h,t[10]=_*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(tp,e,np)}lookAt(e,t,i){const s=this.elements;return Gn.subVectors(e,t),Gn.lengthSq()===0&&(Gn.z=1),Gn.normalize(),Yi.crossVectors(i,Gn),Yi.lengthSq()===0&&(Math.abs(i.z)===1?Gn.x+=1e-4:Gn.z+=1e-4,Gn.normalize(),Yi.crossVectors(i,Gn)),Yi.normalize(),ca.crossVectors(Gn,Yi),s[0]=Yi.x,s[4]=ca.x,s[8]=Gn.x,s[1]=Yi.y,s[5]=ca.y,s[9]=Gn.y,s[2]=Yi.z,s[6]=ca.z,s[10]=Gn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],f=i[5],d=i[9],u=i[13],m=i[2],_=i[6],g=i[10],p=i[14],x=i[3],M=i[7],y=i[11],S=i[15],w=s[0],A=s[4],v=s[8],E=s[12],R=s[1],P=s[5],D=s[9],$=s[13],se=s[2],V=s[6],H=s[10],N=s[14],z=s[3],U=s[7],W=s[11],te=s[15];return r[0]=a*w+o*R+l*se+c*z,r[4]=a*A+o*P+l*V+c*U,r[8]=a*v+o*D+l*H+c*W,r[12]=a*E+o*$+l*N+c*te,r[1]=h*w+f*R+d*se+u*z,r[5]=h*A+f*P+d*V+u*U,r[9]=h*v+f*D+d*H+u*W,r[13]=h*E+f*$+d*N+u*te,r[2]=m*w+_*R+g*se+p*z,r[6]=m*A+_*P+g*V+p*U,r[10]=m*v+_*D+g*H+p*W,r[14]=m*E+_*$+g*N+p*te,r[3]=x*w+M*R+y*se+S*z,r[7]=x*A+M*P+y*V+S*U,r[11]=x*v+M*D+y*H+S*W,r[15]=x*E+M*$+y*N+S*te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],f=e[6],d=e[10],u=e[14],m=e[3],_=e[7],g=e[11],p=e[15],x=l*u-c*d,M=o*u-c*f,y=o*d-l*f,S=a*u-c*h,w=a*d-l*h,A=a*f-o*h;return t*(_*x-g*M+p*y)-i*(m*x-g*S+p*w)+s*(m*M-_*S+p*A)-r*(m*y-_*w+g*A)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-i*(r*h-o*l)+s*(r*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],f=e[9],d=e[10],u=e[11],m=e[12],_=e[13],g=e[14],p=e[15],x=t*o-i*a,M=t*l-s*a,y=t*c-r*a,S=i*l-s*o,w=i*c-r*o,A=s*c-r*l,v=h*_-f*m,E=h*g-d*m,R=h*p-u*m,P=f*g-d*_,D=f*p-u*_,$=d*p-u*g,se=x*$-M*D+y*P+S*R-w*E+A*v;if(se===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const V=1/se;return e[0]=(o*$-l*D+c*P)*V,e[1]=(s*D-i*$-r*P)*V,e[2]=(_*A-g*w+p*S)*V,e[3]=(d*w-f*A-u*S)*V,e[4]=(l*R-a*$-c*E)*V,e[5]=(t*$-s*R+r*E)*V,e[6]=(g*y-m*A-p*M)*V,e[7]=(h*A-d*y+u*M)*V,e[8]=(a*D-o*R+c*v)*V,e[9]=(i*R-t*D-r*v)*V,e[10]=(m*w-_*y+p*x)*V,e[11]=(f*y-h*w-u*x)*V,e[12]=(o*E-a*P-l*v)*V,e[13]=(t*P-i*E+s*v)*V,e[14]=(_*M-m*S-g*x)*V,e[15]=(h*S-f*M+d*x)*V,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,f=o+o,d=r*c,u=r*h,m=r*f,_=a*h,g=a*f,p=o*f,x=l*c,M=l*h,y=l*f,S=i.x,w=i.y,A=i.z;return s[0]=(1-(_+p))*S,s[1]=(u+y)*S,s[2]=(m-M)*S,s[3]=0,s[4]=(u-y)*w,s[5]=(1-(d+p))*w,s[6]=(g+x)*w,s[7]=0,s[8]=(m+M)*A,s[9]=(g-x)*A,s[10]=(1-(d+_))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=ks.set(s[0],s[1],s[2]).length();const o=ks.set(s[4],s[5],s[6]).length(),l=ks.set(s[8],s[9],s[10]).length();r<0&&(a=-a),ni.copy(this);const c=1/a,h=1/o,f=1/l;return ni.elements[0]*=c,ni.elements[1]*=c,ni.elements[2]*=c,ni.elements[4]*=h,ni.elements[5]*=h,ni.elements[6]*=h,ni.elements[8]*=f,ni.elements[9]*=f,ni.elements[10]*=f,t.setFromRotationMatrix(ni),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,s,r,a,o=wi,l=!1){const c=this.elements,h=2*r/(t-e),f=2*r/(i-s),d=(t+e)/(t-e),u=(i+s)/(i-s);let m,_;if(l)m=r/(a-r),_=a*r/(a-r);else if(o===wi)m=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Zr)m=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=f,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=wi,l=!1){const c=this.elements,h=2/(t-e),f=2/(i-s),d=-(t+e)/(t-e),u=-(i+s)/(i-s);let m,_;if(l)m=1/(a-r),_=a/(a-r);else if(o===wi)m=-2/(a-r),_=-(a+r)/(a-r);else if(o===Zr)m=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=f,c[9]=0,c[13]=u,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};bo.prototype.isMatrix4=!0;let Rt=bo;const ks=new I,ni=new Rt,tp=new I(0,0,0),np=new I(1,1,1),Yi=new I,ca=new I,Gn=new I,ch=new Rt,hh=new Wi;class Ri{constructor(e=0,t=0,i=0,s=Ri.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],f=s[2],d=s[6],u=s[10];switch(t){case"XYZ":this._y=Math.asin(ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,u),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ut(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(ut(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,u),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ut(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,u),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ut(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,u));break;case"XZY":this._z=Math.asin(-ut(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,u),this._y=0);break;default:st("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return ch.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ch,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return hh.setFromEuler(this),this.setFromQuaternion(hh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ri.DEFAULT_ORDER="XYZ";class Gd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ip=0;const dh=new I,Os=new Wi,Ii=new Rt,ha=new I,Mr=new I,sp=new I,rp=new Wi,uh=new I(1,0,0),fh=new I(0,1,0),ph=new I(0,0,1),mh={type:"added"},ap={type:"removed"},Fs={type:"childadded",child:null},Uo={type:"childremoved",child:null};class Bt extends Ts{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ip++}),this.uuid=Ai(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Bt.DEFAULT_UP.clone();const e=new I,t=new Ri,i=new Wi,s=new I(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Rt},normalMatrix:{value:new lt}}),this.matrix=new Rt,this.matrixWorld=new Rt,this.matrixAutoUpdate=Bt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Os.setFromAxisAngle(e,t),this.quaternion.multiply(Os),this}rotateOnWorldAxis(e,t){return Os.setFromAxisAngle(e,t),this.quaternion.premultiply(Os),this}rotateX(e){return this.rotateOnAxis(uh,e)}rotateY(e){return this.rotateOnAxis(fh,e)}rotateZ(e){return this.rotateOnAxis(ph,e)}translateOnAxis(e,t){return dh.copy(e).applyQuaternion(this.quaternion),this.position.add(dh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(uh,e)}translateY(e){return this.translateOnAxis(fh,e)}translateZ(e){return this.translateOnAxis(ph,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ii.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ha.copy(e):ha.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Mr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ii.lookAt(Mr,ha,this.up):Ii.lookAt(ha,Mr,this.up),this.quaternion.setFromRotationMatrix(Ii),s&&(Ii.extractRotation(s.matrixWorld),Os.setFromRotationMatrix(Ii),this.quaternion.premultiply(Os.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(_t("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(mh),Fs.child=e,this.dispatchEvent(Fs),Fs.child=null):_t("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ap),Uo.child=e,this.dispatchEvent(Uo),Uo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ii.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ii.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ii),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(mh),Fs.child=e,this.dispatchEvent(Fs),Fs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,e,sp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,rp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const f=l[c];r(e.shapes,f)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),f=a(e.shapes),d=a(e.skeletons),u=a(e.animations),m=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),u.length>0&&(i.animations=u),m.length>0&&(i.nodes=m)}return i.object=s,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Bt.DEFAULT_UP=new I(0,1,0);Bt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class St extends Bt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const op={type:"move"};class ko{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new St,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new St,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new St,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,i),p=this._getHandJoint(c,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=h.position.distanceTo(f.position),u=.02,m=.005;c.inputState.pinching&&d>u+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=u-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(op)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new St;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Hd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zi={h:0,s:0,l:0},da={h:0,s:0,l:0};function Oo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class it{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=_n){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,wt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=wt.workingColorSpace){return this.r=e,this.g=t,this.b=i,wt.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=wt.workingColorSpace){if(e=Sc(e,1),t=ut(t,0,1),i=ut(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Oo(a,r,e+1/3),this.g=Oo(a,r,e),this.b=Oo(a,r,e-1/3)}return wt.colorSpaceToWorking(this,s),this}setStyle(e,t=_n){function i(r){r!==void 0&&parseFloat(r)<1&&st("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:st("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);st("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=_n){const i=Hd[e.toLowerCase()];return i!==void 0?this.setHex(i,t):st("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=zi(e.r),this.g=zi(e.g),this.b=zi(e.b),this}copyLinearToSRGB(e){return this.r=lr(e.r),this.g=lr(e.g),this.b=lr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=_n){return wt.workingToColorSpace(xn.copy(this),e),Math.round(ut(xn.r*255,0,255))*65536+Math.round(ut(xn.g*255,0,255))*256+Math.round(ut(xn.b*255,0,255))}getHexString(e=_n){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=wt.workingColorSpace){wt.workingToColorSpace(xn.copy(this),t);const i=xn.r,s=xn.g,r=xn.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=h<=.5?f/(a+o):f/(2-a-o),a){case i:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-i)/f+2;break;case r:l=(i-s)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=wt.workingColorSpace){return wt.workingToColorSpace(xn.copy(this),t),e.r=xn.r,e.g=xn.g,e.b=xn.b,e}getStyle(e=_n){wt.workingToColorSpace(xn.copy(this),e);const t=xn.r,i=xn.g,s=xn.b;return e!==_n?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Zi),this.setHSL(Zi.h+e,Zi.s+t,Zi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Zi),e.getHSL(da);const i=Hr(Zi.h,da.h,t),s=Hr(Zi.s,da.s,t),r=Hr(Zi.l,da.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const xn=new it;it.NAMES=Hd;class Fo extends Bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ri,this.environmentIntensity=1,this.environmentRotation=new Ri,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const ii=new I,Li=new I,Bo=new I,Di=new I,Bs=new I,zs=new I,gh=new I,zo=new I,Go=new I,Ho=new I,Vo=new Vt,Wo=new Vt,$o=new Vt;class ei{constructor(e=new I,t=new I,i=new I){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),ii.subVectors(e,t),s.cross(ii);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){ii.subVectors(s,t),Li.subVectors(i,t),Bo.subVectors(e,t);const a=ii.dot(ii),o=ii.dot(Li),l=ii.dot(Bo),c=Li.dot(Li),h=Li.dot(Bo),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;const d=1/f,u=(c*l-o*h)*d,m=(a*h-o*l)*d;return r.set(1-u-m,m,u)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Di)===null?!1:Di.x>=0&&Di.y>=0&&Di.x+Di.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,Di)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Di.x),l.addScaledVector(a,Di.y),l.addScaledVector(o,Di.z),l)}static getInterpolatedAttribute(e,t,i,s,r,a){return Vo.setScalar(0),Wo.setScalar(0),$o.setScalar(0),Vo.fromBufferAttribute(e,t),Wo.fromBufferAttribute(e,i),$o.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Vo,r.x),a.addScaledVector(Wo,r.y),a.addScaledVector($o,r.z),a}static isFrontFacing(e,t,i,s){return ii.subVectors(i,t),Li.subVectors(e,t),ii.cross(Li).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ii.subVectors(this.c,this.b),Li.subVectors(this.a,this.b),ii.cross(Li).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ei.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ei.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return ei.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return ei.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ei.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;Bs.subVectors(s,i),zs.subVectors(r,i),zo.subVectors(e,i);const l=Bs.dot(zo),c=zs.dot(zo);if(l<=0&&c<=0)return t.copy(i);Go.subVectors(e,s);const h=Bs.dot(Go),f=zs.dot(Go);if(h>=0&&f<=h)return t.copy(s);const d=l*f-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(i).addScaledVector(Bs,a);Ho.subVectors(e,r);const u=Bs.dot(Ho),m=zs.dot(Ho);if(m>=0&&u<=m)return t.copy(r);const _=u*c-l*m;if(_<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(i).addScaledVector(zs,o);const g=h*m-u*f;if(g<=0&&f-h>=0&&u-m>=0)return gh.subVectors(r,s),o=(f-h)/(f-h+(u-m)),t.copy(s).addScaledVector(gh,o);const p=1/(g+_+d);return a=_*p,o=d*p,t.copy(i).addScaledVector(Bs,a).addScaledVector(zs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Es{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(si.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(si.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=si.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,si):si.fromBufferAttribute(r,a),si.applyMatrix4(e.matrixWorld),this.expandByPoint(si);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ua.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ua.copy(i.boundingBox)),ua.applyMatrix4(e.matrixWorld),this.union(ua)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,si),si.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Sr),fa.subVectors(this.max,Sr),Gs.subVectors(e.a,Sr),Hs.subVectors(e.b,Sr),Vs.subVectors(e.c,Sr),Ki.subVectors(Hs,Gs),Ji.subVectors(Vs,Hs),us.subVectors(Gs,Vs);let t=[0,-Ki.z,Ki.y,0,-Ji.z,Ji.y,0,-us.z,us.y,Ki.z,0,-Ki.x,Ji.z,0,-Ji.x,us.z,0,-us.x,-Ki.y,Ki.x,0,-Ji.y,Ji.x,0,-us.y,us.x,0];return!Xo(t,Gs,Hs,Vs,fa)||(t=[1,0,0,0,1,0,0,0,1],!Xo(t,Gs,Hs,Vs,fa))?!1:(pa.crossVectors(Ki,Ji),t=[pa.x,pa.y,pa.z],Xo(t,Gs,Hs,Vs,fa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,si).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(si).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ni[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ni[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ni[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ni[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ni[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ni[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ni[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ni[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ni),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ni=[new I,new I,new I,new I,new I,new I,new I,new I],si=new I,ua=new Es,Gs=new I,Hs=new I,Vs=new I,Ki=new I,Ji=new I,us=new I,Sr=new I,fa=new I,pa=new I,fs=new I;function Xo(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){fs.fromArray(n,r);const o=s.x*Math.abs(fs.x)+s.y*Math.abs(fs.y)+s.z*Math.abs(fs.z),l=e.dot(fs),c=t.dot(fs),h=i.dot(fs);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Qt=new I,ma=new Ae;let lp=0;class Jt extends Ts{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:lp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=ic,this.updateRanges=[],this.gpuType=hi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ma.fromBufferAttribute(this,t),ma.applyMatrix3(e),this.setXY(t,ma.x,ma.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix3(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix4(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Qt.fromBufferAttribute(this,t),Qt.applyNormalMatrix(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Qt.fromBufferAttribute(this,t),Qt.transformDirection(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=li(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Lt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=li(t,this.array)),t}setX(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=li(t,this.array)),t}setY(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=li(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=li(t,this.array)),t}setW(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),i=Lt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),i=Lt(i,this.array),s=Lt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),i=Lt(i,this.array),s=Lt(s,this.array),r=Lt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ic&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Vd extends Jt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Wd extends Jt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class pt extends Jt{constructor(e,t,i){super(new Float32Array(e),t,i)}}const cp=new Es,Ar=new I,qo=new I;class Rs{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):cp.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ar.subVectors(e,this.center);const t=Ar.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Ar,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(qo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ar.copy(e.center).add(qo)),this.expandByPoint(Ar.copy(e.center).sub(qo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let hp=0;const Zn=new Rt,Yo=new Bt,Ws=new I,Hn=new Es,Tr=new Es,hn=new I;class Mt extends Ts{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hp++}),this.uuid=Ai(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Cf(e)?Wd:Vd)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new lt().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Zn.makeRotationFromQuaternion(e),this.applyMatrix4(Zn),this}rotateX(e){return Zn.makeRotationX(e),this.applyMatrix4(Zn),this}rotateY(e){return Zn.makeRotationY(e),this.applyMatrix4(Zn),this}rotateZ(e){return Zn.makeRotationZ(e),this.applyMatrix4(Zn),this}translate(e,t,i){return Zn.makeTranslation(e,t,i),this.applyMatrix4(Zn),this}scale(e,t,i){return Zn.makeScale(e,t,i),this.applyMatrix4(Zn),this}lookAt(e){return Yo.lookAt(e),Yo.updateMatrix(),this.applyMatrix4(Yo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ws).negate(),this.translate(Ws.x,Ws.y,Ws.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new pt(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&st("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Es);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){_t("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Hn.setFromBufferAttribute(r),this.morphTargetsRelative?(hn.addVectors(this.boundingBox.min,Hn.min),this.boundingBox.expandByPoint(hn),hn.addVectors(this.boundingBox.max,Hn.max),this.boundingBox.expandByPoint(hn)):(this.boundingBox.expandByPoint(Hn.min),this.boundingBox.expandByPoint(Hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&_t('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Rs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){_t("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){const i=this.boundingSphere.center;if(Hn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Tr.setFromBufferAttribute(o),this.morphTargetsRelative?(hn.addVectors(Hn.min,Tr.min),Hn.expandByPoint(hn),hn.addVectors(Hn.max,Tr.max),Hn.expandByPoint(hn)):(Hn.expandByPoint(Tr.min),Hn.expandByPoint(Tr.max))}Hn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)hn.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(hn));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)hn.fromBufferAttribute(o,c),l&&(Ws.fromBufferAttribute(e,c),hn.add(Ws)),s=Math.max(s,i.distanceToSquared(hn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&_t('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){_t("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Jt(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let v=0;v<i.count;v++)o[v]=new I,l[v]=new I;const c=new I,h=new I,f=new I,d=new Ae,u=new Ae,m=new Ae,_=new I,g=new I;function p(v,E,R){c.fromBufferAttribute(i,v),h.fromBufferAttribute(i,E),f.fromBufferAttribute(i,R),d.fromBufferAttribute(r,v),u.fromBufferAttribute(r,E),m.fromBufferAttribute(r,R),h.sub(c),f.sub(c),u.sub(d),m.sub(d);const P=1/(u.x*m.y-m.x*u.y);isFinite(P)&&(_.copy(h).multiplyScalar(m.y).addScaledVector(f,-u.y).multiplyScalar(P),g.copy(f).multiplyScalar(u.x).addScaledVector(h,-m.x).multiplyScalar(P),o[v].add(_),o[E].add(_),o[R].add(_),l[v].add(g),l[E].add(g),l[R].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let v=0,E=x.length;v<E;++v){const R=x[v],P=R.start,D=R.count;for(let $=P,se=P+D;$<se;$+=3)p(e.getX($+0),e.getX($+1),e.getX($+2))}const M=new I,y=new I,S=new I,w=new I;function A(v){S.fromBufferAttribute(s,v),w.copy(S);const E=o[v];M.copy(E),M.sub(S.multiplyScalar(S.dot(E))).normalize(),y.crossVectors(w,E);const P=y.dot(l[v])<0?-1:1;a.setXYZW(v,M.x,M.y,M.z,P)}for(let v=0,E=x.length;v<E;++v){const R=x[v],P=R.start,D=R.count;for(let $=P,se=P+D;$<se;$+=3)A(e.getX($+0)),A(e.getX($+1)),A(e.getX($+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Jt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,u=i.count;d<u;d++)i.setXYZ(d,0,0,0);const s=new I,r=new I,a=new I,o=new I,l=new I,c=new I,h=new I,f=new I;if(e)for(let d=0,u=e.count;d<u;d+=3){const m=e.getX(d+0),_=e.getX(d+1),g=e.getX(d+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,g),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),o.fromBufferAttribute(i,m),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,g),o.add(h),l.add(h),c.add(h),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,u=t.count;d<u;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)hn.fromBufferAttribute(e,t),hn.normalize(),e.setXYZ(t,hn.x,hn.y,hn.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,f=o.normalized,d=new c.constructor(l.length*h);let u=0,m=0;for(let _=0,g=l.length;_<g;_++){o.isInterleavedBufferAttribute?u=l[_]*o.data.stride+o.offset:u=l[_]*h;for(let p=0;p<h;p++)d[m++]=c[u++]}return new Jt(d,h,f)}if(this.index===null)return st("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Mt,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,f=c.length;h<f;h++){const d=c[h],u=e(d,i);l.push(u)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let f=0,d=c.length;f<d;f++){const u=c[f];h.push(u.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],f=r[c];for(let d=0,u=f.length;d<u;d++)h.push(f[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class dp{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ic,this.updateRanges=[],this.version=0,this.uuid=Ai()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ai()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ai()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Rn=new I;class lo{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Rn.fromBufferAttribute(this,t),Rn.applyMatrix4(e),this.setXYZ(t,Rn.x,Rn.y,Rn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Rn.fromBufferAttribute(this,t),Rn.applyNormalMatrix(e),this.setXYZ(t,Rn.x,Rn.y,Rn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Rn.fromBufferAttribute(this,t),Rn.transformDirection(e),this.setXYZ(t,Rn.x,Rn.y,Rn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=li(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Lt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=Lt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=li(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=li(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=li(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=li(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Lt(t,this.array),i=Lt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Lt(t,this.array),i=Lt(i,this.array),s=Lt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Lt(t,this.array),i=Lt(i,this.array),s=Lt(s,this.array),r=Lt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){oo("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Jt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new lo(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){oo("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let up=0;class cs extends Ts{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:up++}),this.uuid=Ai(),this.name="",this.type="Material",this.blending=ar,this.side=os,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=gl,this.blendDst=vl,this.blendEquation=ys,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new it(0,0,0),this.blendAlpha=0,this.depthFunc=fr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=nh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ns,this.stencilZFail=Ns,this.stencilZPass=Ns,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){st(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){st(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ar&&(i.blending=this.blending),this.side!==os&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==gl&&(i.blendSrc=this.blendSrc),this.blendDst!==vl&&(i.blendDst=this.blendDst),this.blendEquation!==ys&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==fr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==nh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ns&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ns&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ns&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new it().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ae().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ae().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class $d extends cs{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new it(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let $s;const Er=new I,Xs=new I,qs=new I,Ys=new Ae,Rr=new Ae,Xd=new Rt,ga=new I,Cr=new I,va=new I,vh=new Ae,Zo=new Ae,yh=new Ae;class fp extends Bt{constructor(e=new $d){if(super(),this.isSprite=!0,this.type="Sprite",$s===void 0){$s=new Mt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new dp(t,5);$s.setIndex([0,1,2,0,2,3]),$s.setAttribute("position",new lo(i,3,0,!1)),$s.setAttribute("uv",new lo(i,2,3,!1))}this.geometry=$s,this.material=e,this.center=new Ae(.5,.5),this.count=1}raycast(e,t){e.camera===null&&_t('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Xs.setFromMatrixScale(this.matrixWorld),Xd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),qs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Xs.multiplyScalar(-qs.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const a=this.center;ya(ga.set(-.5,-.5,0),qs,a,Xs,s,r),ya(Cr.set(.5,-.5,0),qs,a,Xs,s,r),ya(va.set(.5,.5,0),qs,a,Xs,s,r),vh.set(0,0),Zo.set(1,0),yh.set(1,1);let o=e.ray.intersectTriangle(ga,Cr,va,!1,Er);if(o===null&&(ya(Cr.set(-.5,.5,0),qs,a,Xs,s,r),Zo.set(0,1),o=e.ray.intersectTriangle(ga,va,Cr,!1,Er),o===null))return;const l=e.ray.origin.distanceTo(Er);l<e.near||l>e.far||t.push({distance:l,point:Er.clone(),uv:ei.getInterpolation(Er,ga,Cr,va,vh,Zo,yh,new Ae),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function ya(n,e,t,i,s,r){Ys.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(Rr.x=r*Ys.x-s*Ys.y,Rr.y=s*Ys.x+r*Ys.y):Rr.copy(Ys),n.copy(e),n.x+=Rr.x,n.y+=Rr.y,n.applyMatrix4(Xd)}const Ui=new I,Ko=new I,xa=new I,ji=new I,Jo=new I,ba=new I,jo=new I;class Tc{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ui)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ui.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ui.copy(this.origin).addScaledVector(this.direction,t),Ui.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Ko.copy(e).add(t).multiplyScalar(.5),xa.copy(t).sub(e).normalize(),ji.copy(this.origin).sub(Ko);const r=e.distanceTo(t)*.5,a=-this.direction.dot(xa),o=ji.dot(this.direction),l=-ji.dot(xa),c=ji.lengthSq(),h=Math.abs(1-a*a);let f,d,u,m;if(h>0)if(f=a*l-o,d=a*o-l,m=r*h,f>=0)if(d>=-m)if(d<=m){const _=1/h;f*=_,d*=_,u=f*(f+a*d+2*o)+d*(a*f+d+2*l)+c}else d=r,f=Math.max(0,-(a*d+o)),u=-f*f+d*(d+2*l)+c;else d=-r,f=Math.max(0,-(a*d+o)),u=-f*f+d*(d+2*l)+c;else d<=-m?(f=Math.max(0,-(-a*r+o)),d=f>0?-r:Math.min(Math.max(-r,-l),r),u=-f*f+d*(d+2*l)+c):d<=m?(f=0,d=Math.min(Math.max(-r,-l),r),u=d*(d+2*l)+c):(f=Math.max(0,-(a*r+o)),d=f>0?r:Math.min(Math.max(-r,-l),r),u=-f*f+d*(d+2*l)+c);else d=a>0?-r:r,f=Math.max(0,-(a*d+o)),u=-f*f+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Ko).addScaledVector(xa,d),u}intersectSphere(e,t){Ui.subVectors(e.center,this.origin);const i=Ui.dot(this.direction),s=Ui.dot(Ui)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-d.z)*f,l=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,l=(e.min.z-d.z)*f),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Ui)!==null}intersectTriangle(e,t,i,s,r){Jo.subVectors(t,e),ba.subVectors(i,e),jo.crossVectors(Jo,ba);let a=this.direction.dot(jo),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ji.subVectors(this.origin,e);const l=o*this.direction.dot(ba.crossVectors(ji,ba));if(l<0)return null;const c=o*this.direction.dot(Jo.cross(ji));if(c<0||l+c>a)return null;const h=-o*ji.dot(jo);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Kt extends cs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new it(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ri,this.combine=Ad,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const xh=new Rt,ps=new Tc,_a=new Rs,bh=new I,wa=new I,Ma=new I,Sa=new I,Qo=new I,Aa=new I,_h=new I,Ta=new I;class yt extends Bt{constructor(e=new Mt,t=new Kt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Aa.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],f=r[l];h!==0&&(Qo.fromBufferAttribute(f,e),a?Aa.addScaledVector(Qo,h):Aa.addScaledVector(Qo.sub(t),h))}t.add(Aa)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),_a.copy(i.boundingSphere),_a.applyMatrix4(r),ps.copy(e.ray).recast(e.near),!(_a.containsPoint(ps.origin)===!1&&(ps.intersectSphere(_a,bh)===null||ps.origin.distanceToSquared(bh)>(e.far-e.near)**2))&&(xh.copy(r).invert(),ps.copy(e.ray).applyMatrix4(xh),!(i.boundingBox!==null&&ps.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ps)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,d=r.groups,u=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=d.length;m<_;m++){const g=d[m],p=a[g.materialIndex],x=Math.max(g.start,u.start),M=Math.min(o.count,Math.min(g.start+g.count,u.start+u.count));for(let y=x,S=M;y<S;y+=3){const w=o.getX(y),A=o.getX(y+1),v=o.getX(y+2);s=Ea(this,p,e,i,c,h,f,w,A,v),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const m=Math.max(0,u.start),_=Math.min(o.count,u.start+u.count);for(let g=m,p=_;g<p;g+=3){const x=o.getX(g),M=o.getX(g+1),y=o.getX(g+2);s=Ea(this,a,e,i,c,h,f,x,M,y),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,_=d.length;m<_;m++){const g=d[m],p=a[g.materialIndex],x=Math.max(g.start,u.start),M=Math.min(l.count,Math.min(g.start+g.count,u.start+u.count));for(let y=x,S=M;y<S;y+=3){const w=y,A=y+1,v=y+2;s=Ea(this,p,e,i,c,h,f,w,A,v),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const m=Math.max(0,u.start),_=Math.min(l.count,u.start+u.count);for(let g=m,p=_;g<p;g+=3){const x=g,M=g+1,y=g+2;s=Ea(this,a,e,i,c,h,f,x,M,y),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}}function pp(n,e,t,i,s,r,a,o){let l;if(e.side===Bn?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===os,o),l===null)return null;Ta.copy(o),Ta.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Ta);return c<t.near||c>t.far?null:{distance:c,point:Ta.clone(),object:n}}function Ea(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,wa),n.getVertexPosition(l,Ma),n.getVertexPosition(c,Sa);const h=pp(n,e,t,i,wa,Ma,Sa,_h);if(h){const f=new I;ei.getBarycoord(_h,wa,Ma,Sa,f),s&&(h.uv=ei.getInterpolatedAttribute(s,o,l,c,f,new Ae)),r&&(h.uv1=ei.getInterpolatedAttribute(r,o,l,c,f,new Ae)),a&&(h.normal=ei.getInterpolatedAttribute(a,o,l,c,f,new I),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new I,materialIndex:0};ei.getNormal(wa,Ma,Sa,d.normal),h.face=d,h.barycoord=f}return h}class Cs extends Sn{constructor(e=null,t=1,i=1,s,r,a,o,l,c=mn,h=mn,f,d){super(null,a,o,l,c,h,s,r,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class wh extends Jt{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Zs=new Rt,Mh=new Rt,Ra=[],Sh=new Es,mp=new Rt,Pr=new yt,Ir=new Rs;class Dn extends yt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new wh(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,mp)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Es),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Zs),Sh.copy(e.boundingBox).applyMatrix4(Zs),this.boundingBox.union(Sh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Rs),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Zs),Ir.copy(e.boundingSphere).applyMatrix4(Zs),this.boundingSphere.union(Ir)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(Pr.geometry=this.geometry,Pr.material=this.material,Pr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ir.copy(this.boundingSphere),Ir.applyMatrix4(i),e.ray.intersectsSphere(Ir)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Zs),Mh.multiplyMatrices(i,Zs),Pr.matrixWorld=Mh,Pr.raycast(e,Ra);for(let a=0,o=Ra.length;a<o;a++){const l=Ra[a];l.instanceId=r,l.object=this,t.push(l)}Ra.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new wh(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Cs(new Float32Array(s*this.count),s,this.count,yc,hi));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const el=new I,gp=new I,vp=new lt;class gs{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=el.subVectors(i,t).cross(gp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(el),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||vp.getNormalMatrix(e),s=this.coplanarPoint(el).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ms=new Rs,yp=new Ae(.5,.5),Ca=new I;class Ec{constructor(e=new gs,t=new gs,i=new gs,s=new gs,r=new gs,a=new gs){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=wi,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],f=r[5],d=r[6],u=r[7],m=r[8],_=r[9],g=r[10],p=r[11],x=r[12],M=r[13],y=r[14],S=r[15];if(s[0].setComponents(c-a,u-h,p-m,S-x).normalize(),s[1].setComponents(c+a,u+h,p+m,S+x).normalize(),s[2].setComponents(c+o,u+f,p+_,S+M).normalize(),s[3].setComponents(c-o,u-f,p-_,S-M).normalize(),i)s[4].setComponents(l,d,g,y).normalize(),s[5].setComponents(c-l,u-d,p-g,S-y).normalize();else if(s[4].setComponents(c-l,u-d,p-g,S-y).normalize(),t===wi)s[5].setComponents(c+l,u+d,p+g,S+y).normalize();else if(t===Zr)s[5].setComponents(l,d,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ms.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ms.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ms)}intersectsSprite(e){ms.center.set(0,0,0);const t=yp.distanceTo(e.center);return ms.radius=.7071067811865476+t,ms.applyMatrix4(e.matrixWorld),this.intersectsSphere(ms)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Ca.x=s.normal.x>0?e.max.x:e.min.x,Ca.y=s.normal.y>0?e.max.y:e.min.y,Ca.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ca)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ps extends cs{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new it(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const co=new I,ho=new I,Ah=new Rt,Lr=new Tc,Pa=new Rs,tl=new I,Th=new I;class Vr extends Bt{constructor(e=new Mt,t=new Ps){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)co.fromBufferAttribute(t,s-1),ho.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=co.distanceTo(ho);e.setAttribute("lineDistance",new pt(i,1))}else st("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Pa.copy(i.boundingSphere),Pa.applyMatrix4(s),Pa.radius+=r,e.ray.intersectsSphere(Pa)===!1)return;Ah.copy(s).invert(),Lr.copy(e.ray).applyMatrix4(Ah);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,d=i.attributes.position;if(h!==null){const u=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let _=u,g=m-1;_<g;_+=c){const p=h.getX(_),x=h.getX(_+1),M=Ia(this,e,Lr,l,p,x,_);M&&t.push(M)}if(this.isLineLoop){const _=h.getX(m-1),g=h.getX(u),p=Ia(this,e,Lr,l,_,g,m-1);p&&t.push(p)}}else{const u=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let _=u,g=m-1;_<g;_+=c){const p=Ia(this,e,Lr,l,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=Ia(this,e,Lr,l,m-1,u,m-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Ia(n,e,t,i,s,r,a){const o=n.geometry.attributes.position;if(co.fromBufferAttribute(o,s),ho.fromBufferAttribute(o,r),t.distanceSqToSegment(co,ho,tl,Th)>i)return;tl.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(tl);if(!(c<e.near||c>e.far))return{distance:c,point:Th.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const Eh=new I,Rh=new I;class Rc extends Vr{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)Eh.fromBufferAttribute(t,s),Rh.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Eh.distanceTo(Rh);e.setAttribute("lineDistance",new pt(i,1))}else st("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class xp extends cs{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new it(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Ch=new Rt,sc=new Tc,La=new Rs,Da=new I;class Cc extends Bt{constructor(e=new Mt,t=new xp){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),La.copy(i.boundingSphere),La.applyMatrix4(s),La.radius+=r,e.ray.intersectsSphere(La)===!1)return;Ch.copy(s).invert(),sc.copy(e.ray).applyMatrix4(Ch);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,f=i.attributes.position;if(c!==null){const d=Math.max(0,a.start),u=Math.min(c.count,a.start+a.count);for(let m=d,_=u;m<_;m++){const g=c.getX(m);Da.fromBufferAttribute(f,g),Ph(Da,g,l,s,e,t,this)}}else{const d=Math.max(0,a.start),u=Math.min(f.count,a.start+a.count);for(let m=d,_=u;m<_;m++)Da.fromBufferAttribute(f,m),Ph(Da,m,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Ph(n,e,t,i,s,r,a){const o=sc.distanceSqToPoint(n);if(o<t){const l=new I;sc.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class qd extends Sn{constructor(e=[],t=Ms,i,s,r,a,o,l,c,h){super(e,t,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class uo extends Sn{constructor(e,t,i,s,r,a,o,l,c){super(e,t,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class mr extends Sn{constructor(e,t,i=Ei,s,r,a,o=mn,l=mn,c,h=Vi,f=1){if(h!==Vi&&h!==bs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:f};super(d,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ac(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class bp extends mr{constructor(e,t=Ei,i=Ms,s,r,a=mn,o=mn,l,c=Vi){const h={width:e,height:e,depth:1},f=[h,h,h,h,h,h];super(e,e,t,i,s,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Yd extends Sn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Fn extends Mt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],f=[];let d=0,u=0;m("z","y","x",-1,-1,i,t,e,a,r,0),m("z","y","x",1,-1,i,t,-e,a,r,1),m("x","z","y",1,1,e,i,t,s,a,2),m("x","z","y",1,-1,e,i,-t,s,a,3),m("x","y","z",1,-1,e,t,i,s,r,4),m("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new pt(c,3)),this.setAttribute("normal",new pt(h,3)),this.setAttribute("uv",new pt(f,2));function m(_,g,p,x,M,y,S,w,A,v,E){const R=y/A,P=S/v,D=y/2,$=S/2,se=w/2,V=A+1,H=v+1;let N=0,z=0;const U=new I;for(let W=0;W<H;W++){const te=W*P-$;for(let L=0;L<V;L++){const j=L*R-D;U[_]=j*x,U[g]=te*M,U[p]=se,c.push(U.x,U.y,U.z),U[_]=0,U[g]=0,U[p]=w>0?1:-1,h.push(U.x,U.y,U.z),f.push(L/A),f.push(1-W/v),N+=1}}for(let W=0;W<v;W++)for(let te=0;te<A;te++){const L=d+te+V*W,j=d+te+V*(W+1),le=d+(te+1)+V*(W+1),Z=d+(te+1)+V*W;l.push(L,j,Z),l.push(j,le,Z),z+=6}o.addGroup(u,z,E),u+=z,d+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class sn extends Mt{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],f=[],d=[],u=[];let m=0;const _=[],g=i/2;let p=0;x(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new pt(f,3)),this.setAttribute("normal",new pt(d,3)),this.setAttribute("uv",new pt(u,2));function x(){const y=new I,S=new I;let w=0;const A=(t-e)/i;for(let v=0;v<=r;v++){const E=[],R=v/r,P=R*(t-e)+e;for(let D=0;D<=s;D++){const $=D/s,se=$*l+o,V=Math.sin(se),H=Math.cos(se);S.x=P*V,S.y=-R*i+g,S.z=P*H,f.push(S.x,S.y,S.z),y.set(V,A,H).normalize(),d.push(y.x,y.y,y.z),u.push($,1-R),E.push(m++)}_.push(E)}for(let v=0;v<s;v++)for(let E=0;E<r;E++){const R=_[E][v],P=_[E+1][v],D=_[E+1][v+1],$=_[E][v+1];(e>0||E!==0)&&(h.push(R,P,$),w+=3),(t>0||E!==r-1)&&(h.push(P,D,$),w+=3)}c.addGroup(p,w,0),p+=w}function M(y){const S=m,w=new Ae,A=new I;let v=0;const E=y===!0?e:t,R=y===!0?1:-1;for(let D=1;D<=s;D++)f.push(0,g*R,0),d.push(0,R,0),u.push(.5,.5),m++;const P=m;for(let D=0;D<=s;D++){const se=D/s*l+o,V=Math.cos(se),H=Math.sin(se);A.x=E*H,A.y=g*R,A.z=E*V,f.push(A.x,A.y,A.z),d.push(0,R,0),w.x=V*.5+.5,w.y=H*.5*R+.5,u.push(w.x,w.y),m++}for(let D=0;D<s;D++){const $=S+D,se=P+D;y===!0?h.push(se,se+1,$):h.push(se+1,se,$),v+=3}c.addGroup(p,v,y===!0?1:2),p+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new sn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Pc extends sn{constructor(e=1,t=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,i,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Pc(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ic extends Mt{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],a=[];o(s),c(i),h(),this.setAttribute("position",new pt(r,3)),this.setAttribute("normal",new pt(r.slice(),3)),this.setAttribute("uv",new pt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(x){const M=new I,y=new I,S=new I;for(let w=0;w<t.length;w+=3)u(t[w+0],M),u(t[w+1],y),u(t[w+2],S),l(M,y,S,x)}function l(x,M,y,S){const w=S+1,A=[];for(let v=0;v<=w;v++){A[v]=[];const E=x.clone().lerp(y,v/w),R=M.clone().lerp(y,v/w),P=w-v;for(let D=0;D<=P;D++)D===0&&v===w?A[v][D]=E:A[v][D]=E.clone().lerp(R,D/P)}for(let v=0;v<w;v++)for(let E=0;E<2*(w-v)-1;E++){const R=Math.floor(E/2);E%2===0?(d(A[v][R+1]),d(A[v+1][R]),d(A[v][R])):(d(A[v][R+1]),d(A[v+1][R+1]),d(A[v+1][R]))}}function c(x){const M=new I;for(let y=0;y<r.length;y+=3)M.x=r[y+0],M.y=r[y+1],M.z=r[y+2],M.normalize().multiplyScalar(x),r[y+0]=M.x,r[y+1]=M.y,r[y+2]=M.z}function h(){const x=new I;for(let M=0;M<r.length;M+=3){x.x=r[M+0],x.y=r[M+1],x.z=r[M+2];const y=g(x)/2/Math.PI+.5,S=p(x)/Math.PI+.5;a.push(y,1-S)}m(),f()}function f(){for(let x=0;x<a.length;x+=6){const M=a[x+0],y=a[x+2],S=a[x+4],w=Math.max(M,y,S),A=Math.min(M,y,S);w>.9&&A<.1&&(M<.2&&(a[x+0]+=1),y<.2&&(a[x+2]+=1),S<.2&&(a[x+4]+=1))}}function d(x){r.push(x.x,x.y,x.z)}function u(x,M){const y=x*3;M.x=e[y+0],M.y=e[y+1],M.z=e[y+2]}function m(){const x=new I,M=new I,y=new I,S=new I,w=new Ae,A=new Ae,v=new Ae;for(let E=0,R=0;E<r.length;E+=9,R+=6){x.set(r[E+0],r[E+1],r[E+2]),M.set(r[E+3],r[E+4],r[E+5]),y.set(r[E+6],r[E+7],r[E+8]),w.set(a[R+0],a[R+1]),A.set(a[R+2],a[R+3]),v.set(a[R+4],a[R+5]),S.copy(x).add(M).add(y).divideScalar(3);const P=g(S);_(w,R+0,x,P),_(A,R+2,M,P),_(v,R+4,y,P)}}function _(x,M,y,S){S<0&&x.x===1&&(a[M]=x.x-1),y.x===0&&y.z===0&&(a[M]=S/2/Math.PI+.5)}function g(x){return Math.atan2(x.z,-x.x)}function p(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ic(e.vertices,e.indices,e.radius,e.detail)}}class Ci{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){st("Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),r+=i.distanceTo(s),t.push(r),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let s=0;const r=i.length;let a;t?a=t:a=e*i[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=i[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===a)return s/(r-1);const h=i[s],d=i[s+1]-h,u=(a-h)/d;return(s+u)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new Ae:new I);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new I,s=[],r=[],a=[],o=new I,l=new Rt;for(let u=0;u<=e;u++){const m=u/e;s[u]=this.getTangentAt(m,new I)}r[0]=new I,a[0]=new I;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),f=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,i.set(1,0,0)),f<=c&&(c=f,i.set(0,1,0)),d<=c&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let u=1;u<=e;u++){if(r[u]=r[u-1].clone(),a[u]=a[u-1].clone(),o.crossVectors(s[u-1],s[u]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(ut(s[u-1].dot(s[u]),-1,1));r[u].applyMatrix4(l.makeRotationAxis(o,m))}a[u].crossVectors(s[u],r[u])}if(t===!0){let u=Math.acos(ut(r[0].dot(r[e]),-1,1));u/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(u=-u);for(let m=1;m<=e;m++)r[m].applyMatrix4(l.makeRotationAxis(s[m],u*m)),a[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Lc extends Ci{constructor(e=0,t=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new Ae){const i=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),d=l-this.aX,u=c-this.aY;l=d*h-u*f+this.aX,c=d*f+u*h+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class _p extends Lc{constructor(e,t,i,s,r,a){super(e,t,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Dc(){let n=0,e=0,t=0,i=0;function s(r,a,o,l){n=r,e=o,t=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,f){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,u=(o-a)/h-(l-a)/(h+f)+(l-o)/f;d*=h,u*=h,s(a,o,d,u)},calc:function(r){const a=r*r,o=a*r;return n+e*r+t*a+i*o}}}const Ih=new I,Lh=new I,nl=new Dc,il=new Dc,sl=new Dc;class fo extends Ci{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new I){const i=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(Lh.subVectors(s[0],s[1]).add(s[0]),c=Lh);const f=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Ih.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Ih),this.curveType==="centripetal"||this.curveType==="chordal"){const u=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(f),u),_=Math.pow(f.distanceToSquared(d),u),g=Math.pow(d.distanceToSquared(h),u);_<1e-4&&(_=1),m<1e-4&&(m=_),g<1e-4&&(g=_),nl.initNonuniformCatmullRom(c.x,f.x,d.x,h.x,m,_,g),il.initNonuniformCatmullRom(c.y,f.y,d.y,h.y,m,_,g),sl.initNonuniformCatmullRom(c.z,f.z,d.z,h.z,m,_,g)}else this.curveType==="catmullrom"&&(nl.initCatmullRom(c.x,f.x,d.x,h.x,this.tension),il.initCatmullRom(c.y,f.y,d.y,h.y,this.tension),sl.initCatmullRom(c.z,f.z,d.z,h.z,this.tension));return i.set(nl.calc(l),il.calc(l),sl.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new I().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Dh(n,e,t,i,s){const r=(i-e)*.5,a=(s-t)*.5,o=n*n,l=n*o;return(2*t-2*i+r+a)*l+(-3*t+3*i-2*r-a)*o+r*n+t}function wp(n,e){const t=1-n;return t*t*e}function Mp(n,e){return 2*(1-n)*n*e}function Sp(n,e){return n*n*e}function Wr(n,e,t,i){return wp(n,e)+Mp(n,t)+Sp(n,i)}function Ap(n,e){const t=1-n;return t*t*t*e}function Tp(n,e){const t=1-n;return 3*t*t*n*e}function Ep(n,e){return 3*(1-n)*n*n*e}function Rp(n,e){return n*n*n*e}function $r(n,e,t,i,s){return Ap(n,e)+Tp(n,t)+Ep(n,i)+Rp(n,s)}class Zd extends Ci{constructor(e=new Ae,t=new Ae,i=new Ae,s=new Ae){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new Ae){const i=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set($r(e,s.x,r.x,a.x,o.x),$r(e,s.y,r.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Kd extends Ci{constructor(e=new I,t=new I,i=new I,s=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new I){const i=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set($r(e,s.x,r.x,a.x,o.x),$r(e,s.y,r.y,a.y,o.y),$r(e,s.z,r.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Jd extends Ci{constructor(e=new Ae,t=new Ae){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Ae){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Ae){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Cp extends Ci{constructor(e=new I,t=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new I){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new I){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class jd extends Ci{constructor(e=new Ae,t=new Ae,i=new Ae){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Ae){const i=t,s=this.v0,r=this.v1,a=this.v2;return i.set(Wr(e,s.x,r.x,a.x),Wr(e,s.y,r.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Qd extends Ci{constructor(e=new I,t=new I,i=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new I){const i=t,s=this.v0,r=this.v1,a=this.v2;return i.set(Wr(e,s.x,r.x,a.x),Wr(e,s.y,r.y,a.y),Wr(e,s.z,r.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class wo extends Ci{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Ae){const i=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],f=s[a>s.length-3?s.length-1:a+2];return i.set(Dh(o,l.x,c.x,h.x,f.x),Dh(o,l.y,c.y,h.y,f.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new Ae().fromArray(s))}return this}}var po=Object.freeze({__proto__:null,ArcCurve:_p,CatmullRomCurve3:fo,CubicBezierCurve:Zd,CubicBezierCurve3:Kd,EllipseCurve:Lc,LineCurve:Jd,LineCurve3:Cp,QuadraticBezierCurve:jd,QuadraticBezierCurve3:Qd,SplineCurve:wo});class Pp extends Ci{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new po[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const a=s[r]-i,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,s=this.curves.length;i<s;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];i&&i.equals(h)||(t.push(h),i=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(new po[s.type]().fromJSON(s))}return this}}class wn extends Pp{constructor(e){super(),this.type="Path",this.currentPoint=new Ae,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new Jd(this.currentPoint.clone(),new Ae(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,s){const r=new jd(this.currentPoint.clone(),new Ae(e,t),new Ae(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(e,t,i,s,r,a){const o=new Zd(this.currentPoint.clone(),new Ae(e,t),new Ae(i,s),new Ae(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new wo(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,s,r,a),this}absarc(e,t,i,s,r,a){return this.absellipse(e,t,i,i,s,r,a),this}ellipse(e,t,i,s,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,i,s,r,a,o,l),this}absellipse(e,t,i,s,r,a,o,l){const c=new Lc(e,t,i,s,r,a,o,l);if(this.curves.length>0){const f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class rn extends wn{constructor(e){super(e),this.uuid=Ai(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,s=this.holes.length;i<s;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const s=e.holes[t];this.holes.push(new wn().fromJSON(s))}return this}}function Ip(n,e,t=2){const i=e&&e.length,s=i?e[0]*t:n.length;let r=eu(n,0,s,t,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(i&&(r=kp(n,e,r,t)),n.length>80*t){o=n[0],l=n[1];let h=o,f=l;for(let d=t;d<s;d+=t){const u=n[d],m=n[d+1];u<o&&(o=u),m<l&&(l=m),u>h&&(h=u),m>f&&(f=m)}c=Math.max(h-o,f-l),c=c!==0?32767/c:0}return Jr(r,a,t,o,l,c,0),a}function eu(n,e,t,i,s){let r;if(s===qp(n,e,t,i)>0)for(let a=e;a<t;a+=i)r=Nh(a/i|0,n[a],n[a+1],r);else for(let a=t-i;a>=e;a-=i)r=Nh(a/i|0,n[a],n[a+1],r);return r&&gr(r,r.next)&&(Qr(r),r=r.next),r}function As(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(gr(t,t.next)||Wt(t.prev,t,t.next)===0)){if(Qr(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function Jr(n,e,t,i,s,r,a){if(!n)return;!a&&r&&Gp(n,i,s,r);let o=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(r?Dp(n,i,s,r):Lp(n)){e.push(l.i,n.i,c.i),Qr(n),n=c.next,o=c.next;continue}if(n=c,n===o){a?a===1?(n=Np(As(n),e),Jr(n,e,t,i,s,r,2)):a===2&&Up(n,e,t,i,s,r):Jr(As(n),e,t,i,s,r,1);break}}}function Lp(n){const e=n.prev,t=n,i=n.next;if(Wt(e,t,i)>=0)return!1;const s=e.x,r=t.x,a=i.x,o=e.y,l=t.y,c=i.y,h=Math.min(s,r,a),f=Math.min(o,l,c),d=Math.max(s,r,a),u=Math.max(o,l,c);let m=i.next;for(;m!==e;){if(m.x>=h&&m.x<=d&&m.y>=f&&m.y<=u&&Br(s,o,r,l,a,c,m.x,m.y)&&Wt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Dp(n,e,t,i){const s=n.prev,r=n,a=n.next;if(Wt(s,r,a)>=0)return!1;const o=s.x,l=r.x,c=a.x,h=s.y,f=r.y,d=a.y,u=Math.min(o,l,c),m=Math.min(h,f,d),_=Math.max(o,l,c),g=Math.max(h,f,d),p=rc(u,m,e,t,i),x=rc(_,g,e,t,i);let M=n.prevZ,y=n.nextZ;for(;M&&M.z>=p&&y&&y.z<=x;){if(M.x>=u&&M.x<=_&&M.y>=m&&M.y<=g&&M!==s&&M!==a&&Br(o,h,l,f,c,d,M.x,M.y)&&Wt(M.prev,M,M.next)>=0||(M=M.prevZ,y.x>=u&&y.x<=_&&y.y>=m&&y.y<=g&&y!==s&&y!==a&&Br(o,h,l,f,c,d,y.x,y.y)&&Wt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;M&&M.z>=p;){if(M.x>=u&&M.x<=_&&M.y>=m&&M.y<=g&&M!==s&&M!==a&&Br(o,h,l,f,c,d,M.x,M.y)&&Wt(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;y&&y.z<=x;){if(y.x>=u&&y.x<=_&&y.y>=m&&y.y<=g&&y!==s&&y!==a&&Br(o,h,l,f,c,d,y.x,y.y)&&Wt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Np(n,e){let t=n;do{const i=t.prev,s=t.next.next;!gr(i,s)&&nu(i,t,t.next,s)&&jr(i,s)&&jr(s,i)&&(e.push(i.i,t.i,s.i),Qr(t),Qr(t.next),t=n=s),t=t.next}while(t!==n);return As(t)}function Up(n,e,t,i,s,r){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Wp(a,o)){let l=iu(a,o);a=As(a,a.next),l=As(l,l.next),Jr(a,e,t,i,s,r,0),Jr(l,e,t,i,s,r,0);return}o=o.next}a=a.next}while(a!==n)}function kp(n,e,t,i){const s=[];for(let r=0,a=e.length;r<a;r++){const o=e[r]*i,l=r<a-1?e[r+1]*i:n.length,c=eu(n,o,l,i,!1);c===c.next&&(c.steiner=!0),s.push(Vp(c))}s.sort(Op);for(let r=0;r<s.length;r++)t=Fp(s[r],t);return t}function Op(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=i-s}return t}function Fp(n,e){const t=Bp(n,e);if(!t)return e;const i=iu(t,n);return As(i,i.next),As(t,t.next)}function Bp(n,e){let t=e;const i=n.x,s=n.y;let r=-1/0,a;if(gr(n,t))return t;do{if(gr(n,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const f=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=i&&f>r&&(r=f,a=t.x<t.next.x?t:t.next,f===i))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let h=1/0;t=a;do{if(i>=t.x&&t.x>=l&&i!==t.x&&tu(s<c?i:r,s,l,c,s<c?r:i,s,t.x,t.y)){const f=Math.abs(s-t.y)/(i-t.x);jr(t,n)&&(f<h||f===h&&(t.x>a.x||t.x===a.x&&zp(a,t)))&&(a=t,h=f)}t=t.next}while(t!==o);return a}function zp(n,e){return Wt(n.prev,n,e.prev)<0&&Wt(e.next,n,n.next)<0}function Gp(n,e,t,i){let s=n;do s.z===0&&(s.z=rc(s.x,s.y,e,t,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,Hp(s)}function Hp(n){let e,t=1;do{let i=n,s;n=null;let r=null;for(e=0;i;){e++;let a=i,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||i.z<=a.z)?(s=i,i=i.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=a}r.nextZ=null,t*=2}while(e>1);return n}function rc(n,e,t,i,s){return n=(n-t)*s|0,e=(e-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function Vp(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function tu(n,e,t,i,s,r,a,o){return(s-a)*(e-o)>=(n-a)*(r-o)&&(n-a)*(i-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(i-o)}function Br(n,e,t,i,s,r,a,o){return!(n===a&&e===o)&&tu(n,e,t,i,s,r,a,o)}function Wp(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!$p(n,e)&&(jr(n,e)&&jr(e,n)&&Xp(n,e)&&(Wt(n.prev,n,e.prev)||Wt(n,e.prev,e))||gr(n,e)&&Wt(n.prev,n,n.next)>0&&Wt(e.prev,e,e.next)>0)}function Wt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function gr(n,e){return n.x===e.x&&n.y===e.y}function nu(n,e,t,i){const s=Ua(Wt(n,e,t)),r=Ua(Wt(n,e,i)),a=Ua(Wt(t,i,n)),o=Ua(Wt(t,i,e));return!!(s!==r&&a!==o||s===0&&Na(n,t,e)||r===0&&Na(n,i,e)||a===0&&Na(t,n,i)||o===0&&Na(t,e,i))}function Na(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function Ua(n){return n>0?1:n<0?-1:0}function $p(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&nu(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function jr(n,e){return Wt(n.prev,n,n.next)<0?Wt(n,e,n.next)>=0&&Wt(n,n.prev,e)>=0:Wt(n,e,n.prev)<0||Wt(n,n.next,e)<0}function Xp(n,e){let t=n,i=!1;const s=(n.x+e.x)/2,r=(n.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function iu(n,e){const t=ac(n.i,n.x,n.y),i=ac(e.i,e.x,e.y),s=n.next,r=e.prev;return n.next=e,e.prev=n,t.next=s,s.prev=t,i.next=t,t.prev=i,r.next=i,i.prev=r,i}function Nh(n,e,t,i){const s=ac(n,e,t);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function Qr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function ac(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function qp(n,e,t,i){let s=0;for(let r=e,a=t-i;r<t;r+=i)s+=(n[a]-n[r])*(n[r+1]+n[a+1]),a=r;return s}class Yp{static triangulate(e,t,i=2){return Ip(e,t,i)}}class Fi{static area(e){const t=e.length;let i=0;for(let s=t-1,r=0;r<t;s=r++)i+=e[s].x*e[r].y-e[r].x*e[s].y;return i*.5}static isClockWise(e){return Fi.area(e)<0}static triangulateShape(e,t){const i=[],s=[],r=[];Uh(e),kh(i,e);let a=e.length;t.forEach(Uh);for(let l=0;l<t.length;l++)s.push(a),a+=t[l].length,kh(i,t[l]);const o=Yp.triangulate(i,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function Uh(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function kh(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class Xn extends Mt{constructor(e=new rn([new Ae(.5,.5),new Ae(-.5,.5),new Ae(-.5,-.5),new Ae(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const i=this,s=[],r=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new pt(s,3)),this.setAttribute("uv",new pt(r,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,u=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:u-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,x=t.UVGenerator!==void 0?t.UVGenerator:Zp;let M,y=!1,S,w,A,v;if(p){M=p.getSpacedPoints(h),y=!0,d=!1;const pe=p.isCatmullRomCurve3?p.closed:!1;S=p.computeFrenetFrames(h,pe),w=new I,A=new I,v=new I}d||(g=0,u=0,m=0,_=0);const E=o.extractPoints(c);let R=E.shape;const P=E.holes;if(!Fi.isClockWise(R)){R=R.reverse();for(let pe=0,K=P.length;pe<K;pe++){const de=P[pe];Fi.isClockWise(de)&&(P[pe]=de.reverse())}}function $(pe){const de=10000000000000001e-36;let De=pe[0];for(let B=1;B<=pe.length;B++){const ne=B%pe.length,ve=pe[ne],Re=ve.x-De.x,ke=ve.y-De.y,O=Re*Re+ke*ke,rt=Math.max(Math.abs(ve.x),Math.abs(ve.y),Math.abs(De.x),Math.abs(De.y)),Ke=de*rt*rt;if(O<=Ke){pe.splice(ne,1),B--;continue}De=ve}}$(R),P.forEach($);const se=P.length,V=R;for(let pe=0;pe<se;pe++){const K=P[pe];R=R.concat(K)}function H(pe,K,de){return K||_t("ExtrudeGeometry: vec does not exist"),pe.clone().addScaledVector(K,de)}const N=R.length;function z(pe,K,de){let De,B,ne;const ve=pe.x-K.x,Re=pe.y-K.y,ke=de.x-pe.x,O=de.y-pe.y,rt=ve*ve+Re*Re,Ke=ve*O-Re*ke;if(Math.abs(Ke)>Number.EPSILON){const C=Math.sqrt(rt),b=Math.sqrt(ke*ke+O*O),X=K.x-Re/C,ee=K.y+ve/C,me=de.x-O/b,be=de.y+ke/b,_e=((me-X)*O-(be-ee)*ke)/(ve*O-Re*ke);De=X+ve*_e-pe.x,B=ee+Re*_e-pe.y;const ae=De*De+B*B;if(ae<=2)return new Ae(De,B);ne=Math.sqrt(ae/2)}else{let C=!1;ve>Number.EPSILON?ke>Number.EPSILON&&(C=!0):ve<-Number.EPSILON?ke<-Number.EPSILON&&(C=!0):Math.sign(Re)===Math.sign(O)&&(C=!0),C?(De=-Re,B=ve,ne=Math.sqrt(rt)):(De=ve,B=Re,ne=Math.sqrt(rt/2))}return new Ae(De/ne,B/ne)}const U=[];for(let pe=0,K=V.length,de=K-1,De=pe+1;pe<K;pe++,de++,De++)de===K&&(de=0),De===K&&(De=0),U[pe]=z(V[pe],V[de],V[De]);const W=[];let te,L=U.concat();for(let pe=0,K=se;pe<K;pe++){const de=P[pe];te=[];for(let De=0,B=de.length,ne=B-1,ve=De+1;De<B;De++,ne++,ve++)ne===B&&(ne=0),ve===B&&(ve=0),te[De]=z(de[De],de[ne],de[ve]);W.push(te),L=L.concat(te)}let j;if(g===0)j=Fi.triangulateShape(V,P);else{const pe=[],K=[];for(let de=0;de<g;de++){const De=de/g,B=u*Math.cos(De*Math.PI/2),ne=m*Math.sin(De*Math.PI/2)+_;for(let ve=0,Re=V.length;ve<Re;ve++){const ke=H(V[ve],U[ve],ne);ye(ke.x,ke.y,-B),De===0&&pe.push(ke)}for(let ve=0,Re=se;ve<Re;ve++){const ke=P[ve];te=W[ve];const O=[];for(let rt=0,Ke=ke.length;rt<Ke;rt++){const C=H(ke[rt],te[rt],ne);ye(C.x,C.y,-B),De===0&&O.push(C)}De===0&&K.push(O)}}j=Fi.triangulateShape(pe,K)}const le=j.length,Z=m+_;for(let pe=0;pe<N;pe++){const K=d?H(R[pe],L[pe],Z):R[pe];y?(A.copy(S.normals[0]).multiplyScalar(K.x),w.copy(S.binormals[0]).multiplyScalar(K.y),v.copy(M[0]).add(A).add(w),ye(v.x,v.y,v.z)):ye(K.x,K.y,0)}for(let pe=1;pe<=h;pe++)for(let K=0;K<N;K++){const de=d?H(R[K],L[K],Z):R[K];y?(A.copy(S.normals[pe]).multiplyScalar(de.x),w.copy(S.binormals[pe]).multiplyScalar(de.y),v.copy(M[pe]).add(A).add(w),ye(v.x,v.y,v.z)):ye(de.x,de.y,f/h*pe)}for(let pe=g-1;pe>=0;pe--){const K=pe/g,de=u*Math.cos(K*Math.PI/2),De=m*Math.sin(K*Math.PI/2)+_;for(let B=0,ne=V.length;B<ne;B++){const ve=H(V[B],U[B],De);ye(ve.x,ve.y,f+de)}for(let B=0,ne=P.length;B<ne;B++){const ve=P[B];te=W[B];for(let Re=0,ke=ve.length;Re<ke;Re++){const O=H(ve[Re],te[Re],De);y?ye(O.x,O.y+M[h-1].y,M[h-1].x+de):ye(O.x,O.y,f+de)}}}F(),Q();function F(){const pe=s.length/3;if(d){let K=0,de=N*K;for(let De=0;De<le;De++){const B=j[De];ge(B[2]+de,B[1]+de,B[0]+de)}K=h+g*2,de=N*K;for(let De=0;De<le;De++){const B=j[De];ge(B[0]+de,B[1]+de,B[2]+de)}}else{for(let K=0;K<le;K++){const de=j[K];ge(de[2],de[1],de[0])}for(let K=0;K<le;K++){const de=j[K];ge(de[0]+N*h,de[1]+N*h,de[2]+N*h)}}i.addGroup(pe,s.length/3-pe,0)}function Q(){const pe=s.length/3;let K=0;q(V,K),K+=V.length;for(let de=0,De=P.length;de<De;de++){const B=P[de];q(B,K),K+=B.length}i.addGroup(pe,s.length/3-pe,1)}function q(pe,K){let de=pe.length;for(;--de>=0;){const De=de;let B=de-1;B<0&&(B=pe.length-1);for(let ne=0,ve=h+g*2;ne<ve;ne++){const Re=N*ne,ke=N*(ne+1),O=K+De+Re,rt=K+B+Re,Ke=K+B+ke,C=K+De+ke;Me(O,rt,Ke,C)}}}function ye(pe,K,de){l.push(pe),l.push(K),l.push(de)}function ge(pe,K,de){Be(pe),Be(K),Be(de);const De=s.length/3,B=x.generateTopUV(i,s,De-3,De-2,De-1);Le(B[0]),Le(B[1]),Le(B[2])}function Me(pe,K,de,De){Be(pe),Be(K),Be(De),Be(K),Be(de),Be(De);const B=s.length/3,ne=x.generateSideWallUV(i,s,B-6,B-3,B-2,B-1);Le(ne[0]),Le(ne[1]),Le(ne[3]),Le(ne[1]),Le(ne[2]),Le(ne[3])}function Be(pe){s.push(l[pe*3+0]),s.push(l[pe*3+1]),s.push(l[pe*3+2])}function Le(pe){r.push(pe.x),r.push(pe.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return Kp(t,i,e)}static fromJSON(e,t){const i=[];for(let r=0,a=e.shapes.length;r<a;r++){const o=t[e.shapes[r]];i.push(o)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new po[s.type]().fromJSON(s)),new Xn(i,e.options)}}const Zp={generateTopUV:function(n,e,t,i,s){const r=e[t*3],a=e[t*3+1],o=e[i*3],l=e[i*3+1],c=e[s*3],h=e[s*3+1];return[new Ae(r,a),new Ae(o,l),new Ae(c,h)]},generateSideWallUV:function(n,e,t,i,s,r){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[i*3],h=e[i*3+1],f=e[i*3+2],d=e[s*3],u=e[s*3+1],m=e[s*3+2],_=e[r*3],g=e[r*3+1],p=e[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new Ae(a,1-l),new Ae(c,1-f),new Ae(d,1-m),new Ae(_,1-p)]:[new Ae(o,1-l),new Ae(h,1-f),new Ae(u,1-m),new Ae(g,1-p)]}};function Kp(n,e,t){if(t.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){const r=n[i];t.shapes.push(r.uuid)}else t.shapes.push(n.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Mo extends Mt{constructor(e=[new Ae(0,-.5),new Ae(.5,0),new Ae(0,.5)],t=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:i,phiLength:s},t=Math.floor(t),s=ut(s,0,Math.PI*2);const r=[],a=[],o=[],l=[],c=[],h=1/t,f=new I,d=new Ae,u=new I,m=new I,_=new I;let g=0,p=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:g=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,u.x=p*1,u.y=-g,u.z=p*0,_.copy(u),u.normalize(),l.push(u.x,u.y,u.z);break;case e.length-1:l.push(_.x,_.y,_.z);break;default:g=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,u.x=p*1,u.y=-g,u.z=p*0,m.copy(u),u.x+=_.x,u.y+=_.y,u.z+=_.z,u.normalize(),l.push(u.x,u.y,u.z),_.copy(m)}for(let x=0;x<=t;x++){const M=i+x*h*s,y=Math.sin(M),S=Math.cos(M);for(let w=0;w<=e.length-1;w++){f.x=e[w].x*y,f.y=e[w].y,f.z=e[w].x*S,a.push(f.x,f.y,f.z),d.x=x/t,d.y=w/(e.length-1),o.push(d.x,d.y);const A=l[3*w+0]*y,v=l[3*w+1],E=l[3*w+0]*S;c.push(A,v,E)}}for(let x=0;x<t;x++)for(let M=0;M<e.length-1;M++){const y=M+x*e.length,S=y,w=y+e.length,A=y+e.length+1,v=y+1;r.push(S,w,v),r.push(A,v,w)}this.setIndex(r),this.setAttribute("position",new pt(a,3)),this.setAttribute("uv",new pt(o,2)),this.setAttribute("normal",new pt(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mo(e.points,e.segments,e.phiStart,e.phiLength)}}class Nc extends Ic{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Nc(e.radius,e.detail)}}class ti extends Mt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,f=e/o,d=t/l,u=[],m=[],_=[],g=[];for(let p=0;p<h;p++){const x=p*d-a;for(let M=0;M<c;M++){const y=M*f-r;m.push(y,-x,0),_.push(0,0,1),g.push(M/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let x=0;x<o;x++){const M=x+c*p,y=x+c*(p+1),S=x+1+c*(p+1),w=x+1+c*p;u.push(M,y,w),u.push(y,S,w)}this.setIndex(u),this.setAttribute("position",new pt(m,3)),this.setAttribute("normal",new pt(_,3)),this.setAttribute("uv",new pt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ti(e.width,e.height,e.widthSegments,e.heightSegments)}}class So extends Mt{constructor(e=new rn([new Ae(0,.5),new Ae(-.5,-.5),new Ae(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const i=[],s=[],r=[],a=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(i),this.setAttribute("position",new pt(s,3)),this.setAttribute("normal",new pt(r,3)),this.setAttribute("uv",new pt(a,2));function c(h){const f=s.length/3,d=h.extractPoints(t);let u=d.shape;const m=d.holes;Fi.isClockWise(u)===!1&&(u=u.reverse());for(let g=0,p=m.length;g<p;g++){const x=m[g];Fi.isClockWise(x)===!0&&(m[g]=x.reverse())}const _=Fi.triangulateShape(u,m);for(let g=0,p=m.length;g<p;g++){const x=m[g];u=u.concat(x)}for(let g=0,p=u.length;g<p;g++){const x=u[g];s.push(x.x,x.y,0),r.push(0,0,1),a.push(x.x,x.y)}for(let g=0,p=_.length;g<p;g++){const x=_[g],M=x[0]+f,y=x[1]+f,S=x[2]+f;i.push(M,y,S),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return Jp(t,e)}static fromJSON(e,t){const i=[];for(let s=0,r=e.shapes.length;s<r;s++){const a=t[e.shapes[s]];i.push(a)}return new So(i,e.curveSegments)}}function Jp(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){const s=n[t];e.shapes.push(s.uuid)}else e.shapes.push(n.uuid);return e}class Gi extends Mt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const h=[],f=new I,d=new I,u=[],m=[],_=[],g=[];for(let p=0;p<=i;p++){const x=[],M=p/i,y=a+M*o,S=e*Math.cos(y),w=Math.sqrt(e*e-S*S);let A=0;p===0&&a===0?A=.5/t:p===i&&l===Math.PI&&(A=-.5/t);for(let v=0;v<=t;v++){const E=v/t,R=s+E*r;f.x=-w*Math.cos(R),f.y=S,f.z=w*Math.sin(R),m.push(f.x,f.y,f.z),d.copy(f).normalize(),_.push(d.x,d.y,d.z),g.push(E+A,1-M),x.push(c++)}h.push(x)}for(let p=0;p<i;p++)for(let x=0;x<t;x++){const M=h[p][x+1],y=h[p][x],S=h[p+1][x],w=h[p+1][x+1];(p!==0||a>0)&&u.push(M,y,w),(p!==i-1||l<Math.PI)&&u.push(y,S,w)}this.setIndex(u),this.setAttribute("position",new pt(m,3)),this.setAttribute("normal",new pt(_,3)),this.setAttribute("uv",new pt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class xr extends Mt{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),s=Math.floor(s);const l=[],c=[],h=[],f=[],d=new I,u=new I,m=new I;for(let _=0;_<=i;_++){const g=a+_/i*o;for(let p=0;p<=s;p++){const x=p/s*r;u.x=(e+t*Math.cos(g))*Math.cos(x),u.y=(e+t*Math.cos(g))*Math.sin(x),u.z=t*Math.sin(g),c.push(u.x,u.y,u.z),d.x=e*Math.cos(x),d.y=e*Math.sin(x),m.subVectors(u,d).normalize(),h.push(m.x,m.y,m.z),f.push(p/s),f.push(_/i)}}for(let _=1;_<=i;_++)for(let g=1;g<=s;g++){const p=(s+1)*_+g-1,x=(s+1)*(_-1)+g-1,M=(s+1)*(_-1)+g,y=(s+1)*_+g;l.push(p,x,y),l.push(x,M,y)}this.setIndex(l),this.setAttribute("position",new pt(c,3)),this.setAttribute("normal",new pt(h,3)),this.setAttribute("uv",new pt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xr(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class ea extends Mt{constructor(e=new Qd(new I(-1,-1,0),new I(-1,1,0),new I(1,1,0)),t=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:i,radialSegments:s,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new I,l=new I,c=new Ae;let h=new I;const f=[],d=[],u=[],m=[];_(),this.setIndex(m),this.setAttribute("position",new pt(f,3)),this.setAttribute("normal",new pt(d,3)),this.setAttribute("uv",new pt(u,2));function _(){for(let M=0;M<t;M++)g(M);g(r===!1?t:0),x(),p()}function g(M){h=e.getPointAt(M/t,h);const y=a.normals[M],S=a.binormals[M];for(let w=0;w<=s;w++){const A=w/s*Math.PI*2,v=Math.sin(A),E=-Math.cos(A);l.x=E*y.x+v*S.x,l.y=E*y.y+v*S.y,l.z=E*y.z+v*S.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+i*l.x,o.y=h.y+i*l.y,o.z=h.z+i*l.z,f.push(o.x,o.y,o.z)}}function p(){for(let M=1;M<=t;M++)for(let y=1;y<=s;y++){const S=(s+1)*(M-1)+(y-1),w=(s+1)*M+(y-1),A=(s+1)*M+y,v=(s+1)*(M-1)+y;m.push(S,w,v),m.push(w,A,v)}}function x(){for(let M=0;M<=t;M++)for(let y=0;y<=s;y++)c.x=M/t,c.y=y/s,u.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new ea(new po[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}function vr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(Oh(s))s.isRenderTargetTexture?(st("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(Oh(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function Ln(n){const e={};for(let t=0;t<n.length;t++){const i=vr(n[t]);for(const s in i)e[s]=i[s]}return e}function Oh(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function jp(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function su(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:wt.workingColorSpace}const Qp={clone:vr,merge:Ln};var em=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,tm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class An extends cs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=em,this.fragmentShader=tm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=vr(e.uniforms),this.uniformsGroups=jp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new it().setHex(s.value);break;case"v2":this.uniforms[i].value=new Ae().fromArray(s.value);break;case"v3":this.uniforms[i].value=new I().fromArray(s.value);break;case"v4":this.uniforms[i].value=new Vt().fromArray(s.value);break;case"m3":this.uniforms[i].value=new lt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new Rt().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class nm extends An{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ct extends cs{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new it(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new it(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=nc,this.normalScale=new Ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ri,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class kn extends Ct{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ae(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ut(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new it(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new it(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new it(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class im extends cs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=_f,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class sm extends cs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class rm extends Ps{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class Uc extends Bt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new it(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class am extends Uc{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Bt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new it(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const rl=new Rt,Fh=new I,Bh=new I;class ru{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ae(512,512),this.mapType=$n,this.map=null,this.mapPass=null,this.matrix=new Rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ec,this._frameExtents=new Ae(1,1),this._viewportCount=1,this._viewports=[new Vt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Fh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Fh),Bh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Bh),t.updateMatrixWorld(),rl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(rl,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Zr||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(rl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ka=new I,Oa=new Wi,pi=new I;class au extends Bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Rt,this.projectionMatrix=new Rt,this.projectionMatrixInverse=new Rt,this.coordinateSystem=wi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ka,Oa,pi),pi.x===1&&pi.y===1&&pi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ka,Oa,pi.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(ka,Oa,pi),pi.x===1&&pi.y===1&&pi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ka,Oa,pi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Qi=new I,zh=new Ae,Gh=new Ae;class Wn extends au{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Kr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Gr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Kr*2*Math.atan(Math.tan(Gr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Qi.x,Qi.y).multiplyScalar(-e/Qi.z),Qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Qi.x,Qi.y).multiplyScalar(-e/Qi.z)}getViewSize(e,t){return this.getViewBounds(e,zh,Gh),t.subVectors(Gh,zh)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Gr*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class om extends ru{constructor(){super(new Wn(90,1,.5,500)),this.isPointLightShadow=!0}}class lm extends Uc{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new om}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Ao extends au{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class cm extends ru{constructor(){super(new Ao(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class hm extends Uc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Bt.DEFAULT_UP),this.updateMatrix(),this.target=new Bt,this.shadow=new cm}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const Ks=-90,Js=1;class dm extends Bt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Wn(Ks,Js,e,t);s.layers=this.layers,this.add(s);const r=new Wn(Ks,Js,e,t);r.layers=this.layers,this.add(r);const a=new Wn(Ks,Js,e,t);a.layers=this.layers,this.add(a);const o=new Wn(Ks,Js,e,t);o.layers=this.layers,this.add(o);const l=new Wn(Ks,Js,e,t);l.layers=this.layers,this.add(l);const c=new Wn(Ks,Js,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===wi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Zr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(f,d,u),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class um extends Wn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Wc=class Wc{constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};Wc.prototype.isMatrix2=!0;let Hh=Wc;function Vh(n,e,t,i){const s=fm(i);switch(t){case Od:return n*e;case yc:return n*e/s.components*s.byteLength;case xc:return n*e/s.components*s.byteLength;case Ss:return n*e*2/s.components*s.byteLength;case bc:return n*e*2/s.components*s.byteLength;case Fd:return n*e*3/s.components*s.byteLength;case di:return n*e*4/s.components*s.byteLength;case _c:return n*e*4/s.components*s.byteLength;case Va:case Wa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case $a:case Xa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case El:case Cl:return Math.max(n,16)*Math.max(e,8)/4;case Tl:case Rl:return Math.max(n,8)*Math.max(e,8)/2;case Pl:case Il:case Dl:case Nl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ll:case no:case Ul:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case kl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ol:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Fl:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Bl:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case zl:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Gl:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Hl:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Vl:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Wl:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case $l:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Xl:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ql:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Yl:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Zl:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Kl:case Jl:case jl:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Ql:case ec:return Math.ceil(n/4)*Math.ceil(e/4)*8;case io:case tc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function fm(n){switch(n){case $n:case Dd:return{byteLength:1,components:1};case qr:case Nd:case Hi:return{byteLength:2,components:1};case gc:case vc:return{byteLength:2,components:4};case Ei:case mc:case hi:return{byteLength:4,components:1};case Ud:case kd:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:fc}}));typeof window<"u"&&(window.__THREE__?st("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=fc);function ou(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function pm(n){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,f=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,h),o.onUploadCallback();let u;if(c instanceof Float32Array)u=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)u=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?u=n.HALF_FLOAT:u=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)u=n.SHORT;else if(c instanceof Uint32Array)u=n.UNSIGNED_INT;else if(c instanceof Int32Array)u=n.INT;else if(c instanceof Int8Array)u=n.BYTE;else if(c instanceof Uint8Array)u=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)u=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:u,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){const h=l.array,f=l.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,h);else{f.sort((u,m)=>u.start-m.start);let d=0;for(let u=1;u<f.length;u++){const m=f[d],_=f[u];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++d,f[d]=_)}f.length=d+1;for(let u=0,m=f.length;u<m;u++){const _=f[u];n.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var mm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gm=`#ifdef USE_ALPHAHASH
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
#endif`,vm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ym=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,bm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,_m=`#ifdef USE_AOMAP
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
#endif`,wm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Mm=`#ifdef USE_BATCHING
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
#endif`,Sm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Am=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Tm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Em=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Rm=`#ifdef USE_IRIDESCENCE
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
#endif`,Cm=`#ifdef USE_BUMPMAP
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
#endif`,Pm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Im=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Lm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Dm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Nm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Um=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,km=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Om=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Fm=`#define PI 3.141592653589793
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
} // validated`,Bm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,zm=`vec3 transformedNormal = objectNormal;
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
#endif`,Gm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Hm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Vm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Wm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$m="gl_FragColor = linearToOutputTexel( gl_FragColor );",Xm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,qm=`#ifdef USE_ENVMAP
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
#endif`,Ym=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Zm=`#ifdef USE_ENVMAP
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
#endif`,Km=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Jm=`#ifdef USE_ENVMAP
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
#endif`,jm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Qm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,e0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,t0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,n0=`#ifdef USE_GRADIENTMAP
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
}`,i0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,s0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,r0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,a0=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,o0=`#ifdef USE_ENVMAP
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
#endif`,l0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,c0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,h0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,d0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,u0=`PhysicalMaterial material;
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
#endif`,f0=`uniform sampler2D dfgLUT;
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
}`,p0=`
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
#endif`,m0=`#if defined( RE_IndirectDiffuse )
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
#endif`,g0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,v0=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,y0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,x0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,b0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,w0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,M0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,S0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,A0=`#if defined( USE_POINTS_UV )
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
#endif`,T0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,E0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,R0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,C0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,P0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,I0=`#ifdef USE_MORPHTARGETS
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
#endif`,L0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,D0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,N0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,U0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,k0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,O0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,F0=`#ifdef USE_NORMALMAP
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
#endif`,B0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,z0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,G0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,H0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,V0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,W0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,$0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,X0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,q0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Y0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Z0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,K0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,J0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,j0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Q0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,eg=`float getShadowMask() {
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
}`,tg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ng=`#ifdef USE_SKINNING
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
#endif`,ig=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,sg=`#ifdef USE_SKINNING
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
#endif`,rg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ag=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,og=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,lg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,cg=`#ifdef USE_TRANSMISSION
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
#endif`,hg=`#ifdef USE_TRANSMISSION
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
#endif`,dg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ug=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const mg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,gg=`uniform sampler2D t2D;
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
}`,vg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,xg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_g=`#include <common>
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
}`,wg=`#if DEPTH_PACKING == 3200
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
}`,Mg=`#define DISTANCE
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
}`,Sg=`#define DISTANCE
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
}`,Ag=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Tg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Eg=`uniform float scale;
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
}`,Rg=`uniform vec3 diffuse;
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
}`,Cg=`#include <common>
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
}`,Pg=`uniform vec3 diffuse;
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
}`,Ig=`#define LAMBERT
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
}`,Lg=`#define LAMBERT
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
}`,Dg=`#define MATCAP
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
}`,Ng=`#define MATCAP
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
}`,Ug=`#define NORMAL
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
}`,kg=`#define NORMAL
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
}`,Og=`#define PHONG
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
}`,Fg=`#define PHONG
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
}`,Bg=`#define STANDARD
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
}`,zg=`#define STANDARD
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
}`,Gg=`#define TOON
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
}`,Hg=`#define TOON
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
}`,Vg=`uniform float size;
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
}`,Wg=`uniform vec3 diffuse;
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
}`,$g=`#include <common>
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
}`,Xg=`uniform vec3 color;
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
}`,qg=`uniform float rotation;
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
}`,Yg=`uniform vec3 diffuse;
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
}`,dt={alphahash_fragment:mm,alphahash_pars_fragment:gm,alphamap_fragment:vm,alphamap_pars_fragment:ym,alphatest_fragment:xm,alphatest_pars_fragment:bm,aomap_fragment:_m,aomap_pars_fragment:wm,batching_pars_vertex:Mm,batching_vertex:Sm,begin_vertex:Am,beginnormal_vertex:Tm,bsdfs:Em,iridescence_fragment:Rm,bumpmap_pars_fragment:Cm,clipping_planes_fragment:Pm,clipping_planes_pars_fragment:Im,clipping_planes_pars_vertex:Lm,clipping_planes_vertex:Dm,color_fragment:Nm,color_pars_fragment:Um,color_pars_vertex:km,color_vertex:Om,common:Fm,cube_uv_reflection_fragment:Bm,defaultnormal_vertex:zm,displacementmap_pars_vertex:Gm,displacementmap_vertex:Hm,emissivemap_fragment:Vm,emissivemap_pars_fragment:Wm,colorspace_fragment:$m,colorspace_pars_fragment:Xm,envmap_fragment:qm,envmap_common_pars_fragment:Ym,envmap_pars_fragment:Zm,envmap_pars_vertex:Km,envmap_physical_pars_fragment:o0,envmap_vertex:Jm,fog_vertex:jm,fog_pars_vertex:Qm,fog_fragment:e0,fog_pars_fragment:t0,gradientmap_pars_fragment:n0,lightmap_pars_fragment:i0,lights_lambert_fragment:s0,lights_lambert_pars_fragment:r0,lights_pars_begin:a0,lights_toon_fragment:l0,lights_toon_pars_fragment:c0,lights_phong_fragment:h0,lights_phong_pars_fragment:d0,lights_physical_fragment:u0,lights_physical_pars_fragment:f0,lights_fragment_begin:p0,lights_fragment_maps:m0,lights_fragment_end:g0,lightprobes_pars_fragment:v0,logdepthbuf_fragment:y0,logdepthbuf_pars_fragment:x0,logdepthbuf_pars_vertex:b0,logdepthbuf_vertex:_0,map_fragment:w0,map_pars_fragment:M0,map_particle_fragment:S0,map_particle_pars_fragment:A0,metalnessmap_fragment:T0,metalnessmap_pars_fragment:E0,morphinstance_vertex:R0,morphcolor_vertex:C0,morphnormal_vertex:P0,morphtarget_pars_vertex:I0,morphtarget_vertex:L0,normal_fragment_begin:D0,normal_fragment_maps:N0,normal_pars_fragment:U0,normal_pars_vertex:k0,normal_vertex:O0,normalmap_pars_fragment:F0,clearcoat_normal_fragment_begin:B0,clearcoat_normal_fragment_maps:z0,clearcoat_pars_fragment:G0,iridescence_pars_fragment:H0,opaque_fragment:V0,packing:W0,premultiplied_alpha_fragment:$0,project_vertex:X0,dithering_fragment:q0,dithering_pars_fragment:Y0,roughnessmap_fragment:Z0,roughnessmap_pars_fragment:K0,shadowmap_pars_fragment:J0,shadowmap_pars_vertex:j0,shadowmap_vertex:Q0,shadowmask_pars_fragment:eg,skinbase_vertex:tg,skinning_pars_vertex:ng,skinning_vertex:ig,skinnormal_vertex:sg,specularmap_fragment:rg,specularmap_pars_fragment:ag,tonemapping_fragment:og,tonemapping_pars_fragment:lg,transmission_fragment:cg,transmission_pars_fragment:hg,uv_pars_fragment:dg,uv_pars_vertex:ug,uv_vertex:fg,worldpos_vertex:pg,background_vert:mg,background_frag:gg,backgroundCube_vert:vg,backgroundCube_frag:yg,cube_vert:xg,cube_frag:bg,depth_vert:_g,depth_frag:wg,distance_vert:Mg,distance_frag:Sg,equirect_vert:Ag,equirect_frag:Tg,linedashed_vert:Eg,linedashed_frag:Rg,meshbasic_vert:Cg,meshbasic_frag:Pg,meshlambert_vert:Ig,meshlambert_frag:Lg,meshmatcap_vert:Dg,meshmatcap_frag:Ng,meshnormal_vert:Ug,meshnormal_frag:kg,meshphong_vert:Og,meshphong_frag:Fg,meshphysical_vert:Bg,meshphysical_frag:zg,meshtoon_vert:Gg,meshtoon_frag:Hg,points_vert:Vg,points_frag:Wg,shadow_vert:$g,shadow_frag:Xg,sprite_vert:qg,sprite_frag:Yg},ze={common:{diffuse:{value:new it(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new lt}},envmap:{envMap:{value:null},envMapRotation:{value:new lt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new lt},normalScale:{value:new Ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new it(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new it(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0},uvTransform:{value:new lt}},sprite:{diffuse:{value:new it(16777215)},opacity:{value:1},center:{value:new Ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}}},xi={basic:{uniforms:Ln([ze.common,ze.specularmap,ze.envmap,ze.aomap,ze.lightmap,ze.fog]),vertexShader:dt.meshbasic_vert,fragmentShader:dt.meshbasic_frag},lambert:{uniforms:Ln([ze.common,ze.specularmap,ze.envmap,ze.aomap,ze.lightmap,ze.emissivemap,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.fog,ze.lights,{emissive:{value:new it(0)},envMapIntensity:{value:1}}]),vertexShader:dt.meshlambert_vert,fragmentShader:dt.meshlambert_frag},phong:{uniforms:Ln([ze.common,ze.specularmap,ze.envmap,ze.aomap,ze.lightmap,ze.emissivemap,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.fog,ze.lights,{emissive:{value:new it(0)},specular:{value:new it(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:dt.meshphong_vert,fragmentShader:dt.meshphong_frag},standard:{uniforms:Ln([ze.common,ze.envmap,ze.aomap,ze.lightmap,ze.emissivemap,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.roughnessmap,ze.metalnessmap,ze.fog,ze.lights,{emissive:{value:new it(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:dt.meshphysical_vert,fragmentShader:dt.meshphysical_frag},toon:{uniforms:Ln([ze.common,ze.aomap,ze.lightmap,ze.emissivemap,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.gradientmap,ze.fog,ze.lights,{emissive:{value:new it(0)}}]),vertexShader:dt.meshtoon_vert,fragmentShader:dt.meshtoon_frag},matcap:{uniforms:Ln([ze.common,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.fog,{matcap:{value:null}}]),vertexShader:dt.meshmatcap_vert,fragmentShader:dt.meshmatcap_frag},points:{uniforms:Ln([ze.points,ze.fog]),vertexShader:dt.points_vert,fragmentShader:dt.points_frag},dashed:{uniforms:Ln([ze.common,ze.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:dt.linedashed_vert,fragmentShader:dt.linedashed_frag},depth:{uniforms:Ln([ze.common,ze.displacementmap]),vertexShader:dt.depth_vert,fragmentShader:dt.depth_frag},normal:{uniforms:Ln([ze.common,ze.bumpmap,ze.normalmap,ze.displacementmap,{opacity:{value:1}}]),vertexShader:dt.meshnormal_vert,fragmentShader:dt.meshnormal_frag},sprite:{uniforms:Ln([ze.sprite,ze.fog]),vertexShader:dt.sprite_vert,fragmentShader:dt.sprite_frag},background:{uniforms:{uvTransform:{value:new lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:dt.background_vert,fragmentShader:dt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new lt}},vertexShader:dt.backgroundCube_vert,fragmentShader:dt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:dt.cube_vert,fragmentShader:dt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:dt.equirect_vert,fragmentShader:dt.equirect_frag},distance:{uniforms:Ln([ze.common,ze.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:dt.distance_vert,fragmentShader:dt.distance_frag},shadow:{uniforms:Ln([ze.lights,ze.fog,{color:{value:new it(0)},opacity:{value:1}}]),vertexShader:dt.shadow_vert,fragmentShader:dt.shadow_frag}};xi.physical={uniforms:Ln([xi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new lt},clearcoatNormalScale:{value:new Ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new lt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new lt},sheen:{value:0},sheenColor:{value:new it(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new lt},transmissionSamplerSize:{value:new Ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new lt},attenuationDistance:{value:0},attenuationColor:{value:new it(0)},specularColor:{value:new it(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new lt},anisotropyVector:{value:new Ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new lt}}]),vertexShader:dt.meshphysical_vert,fragmentShader:dt.meshphysical_frag};const Fa={r:0,b:0,g:0},Zg=new Rt,lu=new lt;lu.set(-1,0,0,0,1,0,0,0,1);function Kg(n,e,t,i,s,r){const a=new it(0);let o=s===!0?0:1,l,c,h=null,f=0,d=null;function u(x){let M=x.isScene===!0?x.background:null;if(M&&M.isTexture){const y=x.backgroundBlurriness>0;M=e.get(M,y)}return M}function m(x){let M=!1;const y=u(x);y===null?g(a,o):y&&y.isColor&&(g(y,1),M=!0);const S=n.xr.getEnvironmentBlendMode();S==="additive"?t.buffers.color.setClear(0,0,0,1,r):S==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function _(x,M){const y=u(M);y&&(y.isCubeTexture||y.mapping===_o)?(c===void 0&&(c=new yt(new Fn(1,1,1),new An({name:"BackgroundCubeMaterial",uniforms:vr(xi.backgroundCube.uniforms),vertexShader:xi.backgroundCube.vertexShader,fragmentShader:xi.backgroundCube.fragmentShader,side:Bn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(S,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Zg.makeRotationFromEuler(M.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(lu),c.material.toneMapped=wt.getTransfer(y.colorSpace)!==It,(h!==y||f!==y.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,h=y,f=y.version,d=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new yt(new ti(2,2),new An({name:"BackgroundMaterial",uniforms:vr(xi.background.uniforms),vertexShader:xi.background.vertexShader,fragmentShader:xi.background.fragmentShader,side:os,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=wt.getTransfer(y.colorSpace)!==It,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||f!==y.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,h=y,f=y.version,d=n.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function g(x,M){x.getRGB(Fa,su(n)),t.buffers.color.setClear(Fa.r,Fa.g,Fa.b,M,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,M=1){a.set(x),o=M,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,g(a,o)},render:m,addToRenderList:_,dispose:p}}function Jg(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null);let r=s,a=!1;function o(P,D,$,se,V){let H=!1;const N=f(P,se,$,D);r!==N&&(r=N,c(r.object)),H=u(P,se,$,V),H&&m(P,se,$,V),V!==null&&e.update(V,n.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,y(P,D,$,se),V!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function l(){return n.createVertexArray()}function c(P){return n.bindVertexArray(P)}function h(P){return n.deleteVertexArray(P)}function f(P,D,$,se){const V=se.wireframe===!0;let H=i[D.id];H===void 0&&(H={},i[D.id]=H);const N=P.isInstancedMesh===!0?P.id:0;let z=H[N];z===void 0&&(z={},H[N]=z);let U=z[$.id];U===void 0&&(U={},z[$.id]=U);let W=U[V];return W===void 0&&(W=d(l()),U[V]=W),W}function d(P){const D=[],$=[],se=[];for(let V=0;V<t;V++)D[V]=0,$[V]=0,se[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:$,attributeDivisors:se,object:P,attributes:{},index:null}}function u(P,D,$,se){const V=r.attributes,H=D.attributes;let N=0;const z=$.getAttributes();for(const U in z)if(z[U].location>=0){const te=V[U];let L=H[U];if(L===void 0&&(U==="instanceMatrix"&&P.instanceMatrix&&(L=P.instanceMatrix),U==="instanceColor"&&P.instanceColor&&(L=P.instanceColor)),te===void 0||te.attribute!==L||L&&te.data!==L.data)return!0;N++}return r.attributesNum!==N||r.index!==se}function m(P,D,$,se){const V={},H=D.attributes;let N=0;const z=$.getAttributes();for(const U in z)if(z[U].location>=0){let te=H[U];te===void 0&&(U==="instanceMatrix"&&P.instanceMatrix&&(te=P.instanceMatrix),U==="instanceColor"&&P.instanceColor&&(te=P.instanceColor));const L={};L.attribute=te,te&&te.data&&(L.data=te.data),V[U]=L,N++}r.attributes=V,r.attributesNum=N,r.index=se}function _(){const P=r.newAttributes;for(let D=0,$=P.length;D<$;D++)P[D]=0}function g(P){p(P,0)}function p(P,D){const $=r.newAttributes,se=r.enabledAttributes,V=r.attributeDivisors;$[P]=1,se[P]===0&&(n.enableVertexAttribArray(P),se[P]=1),V[P]!==D&&(n.vertexAttribDivisor(P,D),V[P]=D)}function x(){const P=r.newAttributes,D=r.enabledAttributes;for(let $=0,se=D.length;$<se;$++)D[$]!==P[$]&&(n.disableVertexAttribArray($),D[$]=0)}function M(P,D,$,se,V,H,N){N===!0?n.vertexAttribIPointer(P,D,$,V,H):n.vertexAttribPointer(P,D,$,se,V,H)}function y(P,D,$,se){_();const V=se.attributes,H=$.getAttributes(),N=D.defaultAttributeValues;for(const z in H){const U=H[z];if(U.location>=0){let W=V[z];if(W===void 0&&(z==="instanceMatrix"&&P.instanceMatrix&&(W=P.instanceMatrix),z==="instanceColor"&&P.instanceColor&&(W=P.instanceColor)),W!==void 0){const te=W.normalized,L=W.itemSize,j=e.get(W);if(j===void 0)continue;const le=j.buffer,Z=j.type,F=j.bytesPerElement,Q=Z===n.INT||Z===n.UNSIGNED_INT||W.gpuType===mc;if(W.isInterleavedBufferAttribute){const q=W.data,ye=q.stride,ge=W.offset;if(q.isInstancedInterleavedBuffer){for(let Me=0;Me<U.locationSize;Me++)p(U.location+Me,q.meshPerAttribute);P.isInstancedMesh!==!0&&se._maxInstanceCount===void 0&&(se._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let Me=0;Me<U.locationSize;Me++)g(U.location+Me);n.bindBuffer(n.ARRAY_BUFFER,le);for(let Me=0;Me<U.locationSize;Me++)M(U.location+Me,L/U.locationSize,Z,te,ye*F,(ge+L/U.locationSize*Me)*F,Q)}else{if(W.isInstancedBufferAttribute){for(let q=0;q<U.locationSize;q++)p(U.location+q,W.meshPerAttribute);P.isInstancedMesh!==!0&&se._maxInstanceCount===void 0&&(se._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let q=0;q<U.locationSize;q++)g(U.location+q);n.bindBuffer(n.ARRAY_BUFFER,le);for(let q=0;q<U.locationSize;q++)M(U.location+q,L/U.locationSize,Z,te,L*F,L/U.locationSize*q*F,Q)}}else if(N!==void 0){const te=N[z];if(te!==void 0)switch(te.length){case 2:n.vertexAttrib2fv(U.location,te);break;case 3:n.vertexAttrib3fv(U.location,te);break;case 4:n.vertexAttrib4fv(U.location,te);break;default:n.vertexAttrib1fv(U.location,te)}}}}x()}function S(){E();for(const P in i){const D=i[P];for(const $ in D){const se=D[$];for(const V in se){const H=se[V];for(const N in H)h(H[N].object),delete H[N];delete se[V]}}delete i[P]}}function w(P){if(i[P.id]===void 0)return;const D=i[P.id];for(const $ in D){const se=D[$];for(const V in se){const H=se[V];for(const N in H)h(H[N].object),delete H[N];delete se[V]}}delete i[P.id]}function A(P){for(const D in i){const $=i[D];for(const se in $){const V=$[se];if(V[P.id]===void 0)continue;const H=V[P.id];for(const N in H)h(H[N].object),delete H[N];delete V[P.id]}}}function v(P){for(const D in i){const $=i[D],se=P.isInstancedMesh===!0?P.id:0,V=$[se];if(V!==void 0){for(const H in V){const N=V[H];for(const z in N)h(N[z].object),delete N[z];delete V[H]}delete $[se],Object.keys($).length===0&&delete i[D]}}}function E(){R(),a=!0,r!==s&&(r=s,c(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:E,resetDefaultState:R,dispose:S,releaseStatesOfGeometry:w,releaseStatesOfObject:v,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:g,disableUnusedAttributes:x}}function jg(n,e,t){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,h){h!==0&&(n.drawArraysInstanced(i,l,c,h),t.update(c,i,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let d=0;for(let u=0;u<h;u++)d+=c[u];t.update(d,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Qg(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==di&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const v=A===Hi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==$n&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==hi&&!v)}function l(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(st("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const f=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&st("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const u=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),x=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),M=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),S=n.getParameter(n.MAX_SAMPLES),w=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:u,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:y,maxSamples:S,samples:w}}function ev(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new gs,o=new lt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const u=f.length!==0||d||i!==0||s;return s=d,i=f.length,u},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){t=h(f,d,0)},this.setState=function(f,d,u){const m=f.clippingPlanes,_=f.clipIntersection,g=f.clipShadows,p=n.get(f);if(!s||m===null||m.length===0||r&&!g)r?h(null):c();else{const x=r?0:i,M=x*4;let y=p.clippingState||null;l.value=y,y=h(m,d,M,u);for(let S=0;S!==M;++S)y[S]=t[S];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(f,d,u,m){const _=f!==null?f.length:0;let g=null;if(_!==0){if(g=l.value,m!==!0||g===null){const p=u+_*4,x=d.matrixWorldInverse;o.getNormalMatrix(x),(g===null||g.length<p)&&(g=new Float32Array(p));for(let M=0,y=u;M!==_;++M,y+=4)a.copy(f[M]).applyMatrix4(x,o),a.normal.toArray(g,y),g[y+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}const ss=4,Wh=[.125,.215,.35,.446,.526,.582],xs=20,tv=256,Dr=new Ao,$h=new it;let al=null,ol=0,ll=0,cl=!1;const nv=new I;class oc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=nv}=r;al=this._renderer.getRenderTarget(),ol=this._renderer.getActiveCubeFace(),ll=this._renderer.getActiveMipmapLevel(),cl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Yh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=qh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(al,ol,ll),this._renderer.xr.enabled=cl,e.scissorTest=!1,js(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ms||e.mapping===pr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),al=this._renderer.getRenderTarget(),ol=this._renderer.getActiveCubeFace(),ll=this._renderer.getActiveMipmapLevel(),cl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:pn,minFilter:pn,generateMipmaps:!1,type:Hi,format:di,colorSpace:so,depthBuffer:!1},s=Xh(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xh(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=iv(r)),this._blurMaterial=rv(r,e,t),this._ggxMaterial=sv(r,e,t)}return s}_compileMaterial(e){const t=new yt(new Mt,e);this._renderer.compile(t,Dr)}_sceneToCubeUV(e,t,i,s,r){const l=new Wn(90,1,t,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,u=f.toneMapping;f.getClearColor($h),f.toneMapping=Si,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new yt(new Fn,new Kt({name:"PMREM.Background",side:Bn,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,g=_.material;let p=!1;const x=e.background;x?x.isColor&&(g.color.copy(x),e.background=null,p=!0):(g.color.copy($h),p=!0);for(let M=0;M<6;M++){const y=M%3;y===0?(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[M],r.y,r.z)):y===1?(l.up.set(0,0,c[M]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[M],r.z)):(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[M]));const S=this._cubeSize;js(s,y*S,M>2?S:0,S,S),f.setRenderTarget(s),p&&f.render(_,l),f.render(e,l)}f.toneMapping=u,f.autoClear=d,e.background=x}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Ms||e.mapping===pr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Yh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=qh());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;js(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Dr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-h*h),d=0+c*1.25,u=f*d,{_lodMax:m}=this,_=this._sizeLods[i],g=3*_*(i>m-ss?i-m+ss:0),p=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=u,l.mipInt.value=m-t,js(r,g,p,3*_,2*_),s.setRenderTarget(r),s.render(o,Dr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=m-i,js(e,g,p,3*_,2*_),s.setRenderTarget(e),s.render(o,Dr)}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&_t("blur direction must be either latitudinal or longitudinal!");const h=3,f=this._lodMeshes[s];f.material=c;const d=c.uniforms,u=this._sizeLods[i]-1,m=isFinite(r)?Math.PI/(2*u):2*Math.PI/(2*xs-1),_=r/m,g=isFinite(r)?1+Math.floor(h*_):xs;g>xs&&st(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${xs}`);const p=[];let x=0;for(let A=0;A<xs;++A){const v=A/_,E=Math.exp(-v*v/2);p.push(E),A===0?x+=E:A<g&&(x+=2*E)}for(let A=0;A<p.length;A++)p[A]=p[A]/x;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:M}=this;d.dTheta.value=m,d.mipInt.value=M-i;const y=this._sizeLods[s],S=3*y*(s>M-ss?s-M+ss:0),w=4*(this._cubeSize-y);js(t,S,w,3*y,2*y),l.setRenderTarget(t),l.render(f,Dr)}}function iv(n){const e=[],t=[],i=[];let s=n;const r=n-ss+1+Wh.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>n-ss?l=Wh[a-n+ss-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),h=-c,f=1+c,d=[h,h,f,h,f,f,h,h,f,f,h,f],u=6,m=6,_=3,g=2,p=1,x=new Float32Array(_*m*u),M=new Float32Array(g*m*u),y=new Float32Array(p*m*u);for(let w=0;w<u;w++){const A=w%3*2/3-1,v=w>2?0:-1,E=[A,v,0,A+2/3,v,0,A+2/3,v+1,0,A,v,0,A+2/3,v+1,0,A,v+1,0];x.set(E,_*m*w),M.set(d,g*m*w);const R=[w,w,w,w,w,w];y.set(R,p*m*w)}const S=new Mt;S.setAttribute("position",new Jt(x,_)),S.setAttribute("uv",new Jt(M,g)),S.setAttribute("faceIndex",new Jt(y,p)),i.push(new yt(S,null)),s>ss&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Xh(n,e,t){const i=new Ti(n,e,t);return i.texture.mapping=_o,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function js(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function sv(n,e,t){return new An({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:tv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:To(),fragmentShader:`

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
		`,blending:Bi,depthTest:!1,depthWrite:!1})}function rv(n,e,t){const i=new Float32Array(xs),s=new I(0,1,0);return new An({name:"SphericalGaussianBlur",defines:{n:xs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:To(),fragmentShader:`

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
		`,blending:Bi,depthTest:!1,depthWrite:!1})}function qh(){return new An({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:To(),fragmentShader:`

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
		`,blending:Bi,depthTest:!1,depthWrite:!1})}function Yh(){return new An({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:To(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bi,depthTest:!1,depthWrite:!1})}function To(){return`

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
	`}class cu extends Ti{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new qd(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Fn(5,5,5),r=new An({name:"CubemapFromEquirect",uniforms:vr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Bn,blending:Bi});r.uniforms.tEquirect.value=t;const a=new yt(s,r),o=t.minFilter;return t.minFilter===is&&(t.minFilter=pn),new dm(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}function av(n){let e=new WeakMap,t=new WeakMap,i=null;function s(d,u=!1){return d==null?null:u?a(d):r(d)}function r(d){if(d&&d.isTexture){const u=d.mapping;if(u===Ro||u===Co)if(e.has(d)){const m=e.get(d).texture;return o(m,d.mapping)}else{const m=d.image;if(m&&m.height>0){const _=new cu(m.height);return _.fromEquirectangularTexture(n,d),e.set(d,_),d.addEventListener("dispose",c),o(_.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const u=d.mapping,m=u===Ro||u===Co,_=u===Ms||u===pr;if(m||_){let g=t.get(d);const p=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return i===null&&(i=new oc(n)),g=m?i.fromEquirectangular(d,g):i.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),g.texture;if(g!==void 0)return g.texture;{const x=d.image;return m&&x&&x.height>0||_&&x&&l(x)?(i===null&&(i=new oc(n)),g=m?i.fromEquirectangular(d):i.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),d.addEventListener("dispose",h),g.texture):null}}}return d}function o(d,u){return u===Ro?d.mapping=Ms:u===Co&&(d.mapping=pr),d}function l(d){let u=0;const m=6;for(let _=0;_<m;_++)d[_]!==void 0&&u++;return u===m}function c(d){const u=d.target;u.removeEventListener("dispose",c);const m=e.get(u);m!==void 0&&(e.delete(u),m.dispose())}function h(d){const u=d.target;u.removeEventListener("dispose",h);const m=t.get(u);m!==void 0&&(t.delete(u),m.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function ov(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&or("WebGLRenderer: "+i+" extension not supported."),s}}}function lv(n,e,t,i){const s={},r=new WeakMap;function a(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",a),delete s[d.id];const u=r.get(d);u&&(e.remove(u),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(f,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function l(f){const d=f.attributes;for(const u in d)e.update(d[u],n.ARRAY_BUFFER)}function c(f){const d=[],u=f.index,m=f.attributes.position;let _=0;if(m===void 0)return;if(u!==null){const x=u.array;_=u.version;for(let M=0,y=x.length;M<y;M+=3){const S=x[M+0],w=x[M+1],A=x[M+2];d.push(S,w,w,A,A,S)}}else{const x=m.array;_=m.version;for(let M=0,y=x.length/3-1;M<y;M+=3){const S=M+0,w=M+1,A=M+2;d.push(S,w,w,A,A,S)}}const g=new(m.count>=65535?Wd:Vd)(d,1);g.version=_;const p=r.get(f);p&&e.remove(p),r.set(f,g)}function h(f){const d=r.get(f);if(d){const u=f.index;u!==null&&d.version<u.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:h}}function cv(n,e,t){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,d){n.drawElements(i,d,r,f*a),t.update(d,i,1)}function c(f,d,u){u!==0&&(n.drawElementsInstanced(i,d,r,f*a,u),t.update(d,i,u))}function h(f,d,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,f,0,u);let _=0;for(let g=0;g<u;g++)_+=d[g];t.update(_,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function hv(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:_t("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function dv(n,e,t){const i=new WeakMap,s=new Vt;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0;let d=i.get(o);if(d===void 0||d.count!==f){let R=function(){v.dispose(),i.delete(o),o.removeEventListener("dispose",R)};var u=R;d!==void 0&&d.texture.dispose();const m=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let y=0;m===!0&&(y=1),_===!0&&(y=2),g===!0&&(y=3);let S=o.attributes.position.count*y,w=1;S>e.maxTextureSize&&(w=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const A=new Float32Array(S*w*4*f),v=new zd(A,S,w,f);v.type=hi,v.needsUpdate=!0;const E=y*4;for(let P=0;P<f;P++){const D=p[P],$=x[P],se=M[P],V=S*w*4*P;for(let H=0;H<D.count;H++){const N=H*E;m===!0&&(s.fromBufferAttribute(D,H),A[V+N+0]=s.x,A[V+N+1]=s.y,A[V+N+2]=s.z,A[V+N+3]=0),_===!0&&(s.fromBufferAttribute($,H),A[V+N+4]=s.x,A[V+N+5]=s.y,A[V+N+6]=s.z,A[V+N+7]=0),g===!0&&(s.fromBufferAttribute(se,H),A[V+N+8]=s.x,A[V+N+9]=s.y,A[V+N+10]=s.z,A[V+N+11]=se.itemSize===4?s.w:1)}}d={count:f,texture:v,size:new Ae(S,w)},i.set(o,d),o.addEventListener("dispose",R)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const _=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function uv(n,e,t,i,s){let r=new WeakMap;function a(c){const h=s.render.frame,f=c.geometry,d=e.get(c,f);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const u=c.skeleton;r.get(u)!==h&&(u.update(),r.set(u,h))}return d}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const fv={[Td]:"LINEAR_TONE_MAPPING",[Ed]:"REINHARD_TONE_MAPPING",[Rd]:"CINEON_TONE_MAPPING",[pc]:"ACES_FILMIC_TONE_MAPPING",[Pd]:"AGX_TONE_MAPPING",[Id]:"NEUTRAL_TONE_MAPPING",[Cd]:"CUSTOM_TONE_MAPPING"};function pv(n,e,t,i,s,r){const a=new Ti(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new mr(e,t):void 0}),o=new Ti(e,t,{type:Hi,depthBuffer:!1,stencilBuffer:!1}),l=new Mt;l.setAttribute("position",new pt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new pt([0,2,0,0,2,0],2));const c=new nm({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new yt(l,c),f=new Ao(-1,1,1,-1,0,1);let d=null,u=null,m=!1,_,g=null,p=[],x=!1;this.setSize=function(M,y){a.setSize(M,y),o.setSize(M,y);for(let S=0;S<p.length;S++){const w=p[S];w.setSize&&w.setSize(M,y)}},this.setEffects=function(M){p=M,x=p.length>0&&p[0].isRenderPass===!0;const y=a.width,S=a.height;for(let w=0;w<p.length;w++){const A=p[w];A.setSize&&A.setSize(y,S)}},this.begin=function(M,y){if(m||M.toneMapping===Si&&p.length===0)return!1;if(g=y,y!==null){const S=y.width,w=y.height;(a.width!==S||a.height!==w)&&this.setSize(S,w)}return x===!1&&M.setRenderTarget(a),_=M.toneMapping,M.toneMapping=Si,!0},this.hasRenderPass=function(){return x},this.end=function(M,y){M.toneMapping=_,m=!0;let S=a,w=o;for(let A=0;A<p.length;A++){const v=p[A];if(v.enabled!==!1&&(v.render(M,w,S,y),v.needsSwap!==!1)){const E=S;S=w,w=E}}if(d!==M.outputColorSpace||u!==M.toneMapping){d=M.outputColorSpace,u=M.toneMapping,c.defines={},wt.getTransfer(d)===It&&(c.defines.SRGB_TRANSFER="");const A=fv[u];A&&(c.defines[A]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=S.texture,M.setRenderTarget(g),M.render(h,f),g=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const hu=new Sn,lc=new mr(1,1),du=new zd,uu=new ep,fu=new qd,Zh=[],Kh=[],Jh=new Float32Array(16),jh=new Float32Array(9),Qh=new Float32Array(4);function br(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Zh[s];if(r===void 0&&(r=new Float32Array(s),Zh[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function on(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function ln(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Eo(n,e){let t=Kh[e];t===void 0&&(t=new Int32Array(e),Kh[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function mv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function gv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;n.uniform2fv(this.addr,e),ln(t,e)}}function vv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(on(t,e))return;n.uniform3fv(this.addr,e),ln(t,e)}}function yv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;n.uniform4fv(this.addr,e),ln(t,e)}}function xv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(on(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),ln(t,e)}else{if(on(t,i))return;Qh.set(i),n.uniformMatrix2fv(this.addr,!1,Qh),ln(t,i)}}function bv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(on(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),ln(t,e)}else{if(on(t,i))return;jh.set(i),n.uniformMatrix3fv(this.addr,!1,jh),ln(t,i)}}function _v(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(on(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),ln(t,e)}else{if(on(t,i))return;Jh.set(i),n.uniformMatrix4fv(this.addr,!1,Jh),ln(t,i)}}function wv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Mv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;n.uniform2iv(this.addr,e),ln(t,e)}}function Sv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;n.uniform3iv(this.addr,e),ln(t,e)}}function Av(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;n.uniform4iv(this.addr,e),ln(t,e)}}function Tv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Ev(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;n.uniform2uiv(this.addr,e),ln(t,e)}}function Rv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;n.uniform3uiv(this.addr,e),ln(t,e)}}function Cv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;n.uniform4uiv(this.addr,e),ln(t,e)}}function Pv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(lc.compareFunction=t.isReversedDepthBuffer()?Mc:wc,r=lc):r=hu,t.setTexture2D(e||r,s)}function Iv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||uu,s)}function Lv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||fu,s)}function Dv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||du,s)}function Nv(n){switch(n){case 5126:return mv;case 35664:return gv;case 35665:return vv;case 35666:return yv;case 35674:return xv;case 35675:return bv;case 35676:return _v;case 5124:case 35670:return wv;case 35667:case 35671:return Mv;case 35668:case 35672:return Sv;case 35669:case 35673:return Av;case 5125:return Tv;case 36294:return Ev;case 36295:return Rv;case 36296:return Cv;case 35678:case 36198:case 36298:case 36306:case 35682:return Pv;case 35679:case 36299:case 36307:return Iv;case 35680:case 36300:case 36308:case 36293:return Lv;case 36289:case 36303:case 36311:case 36292:return Dv}}function Uv(n,e){n.uniform1fv(this.addr,e)}function kv(n,e){const t=br(e,this.size,2);n.uniform2fv(this.addr,t)}function Ov(n,e){const t=br(e,this.size,3);n.uniform3fv(this.addr,t)}function Fv(n,e){const t=br(e,this.size,4);n.uniform4fv(this.addr,t)}function Bv(n,e){const t=br(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function zv(n,e){const t=br(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Gv(n,e){const t=br(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Hv(n,e){n.uniform1iv(this.addr,e)}function Vv(n,e){n.uniform2iv(this.addr,e)}function Wv(n,e){n.uniform3iv(this.addr,e)}function $v(n,e){n.uniform4iv(this.addr,e)}function Xv(n,e){n.uniform1uiv(this.addr,e)}function qv(n,e){n.uniform2uiv(this.addr,e)}function Yv(n,e){n.uniform3uiv(this.addr,e)}function Zv(n,e){n.uniform4uiv(this.addr,e)}function Kv(n,e,t){const i=this.cache,s=e.length,r=Eo(t,s);on(i,r)||(n.uniform1iv(this.addr,r),ln(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=lc:a=hu;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Jv(n,e,t){const i=this.cache,s=e.length,r=Eo(t,s);on(i,r)||(n.uniform1iv(this.addr,r),ln(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||uu,r[a])}function jv(n,e,t){const i=this.cache,s=e.length,r=Eo(t,s);on(i,r)||(n.uniform1iv(this.addr,r),ln(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||fu,r[a])}function Qv(n,e,t){const i=this.cache,s=e.length,r=Eo(t,s);on(i,r)||(n.uniform1iv(this.addr,r),ln(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||du,r[a])}function ey(n){switch(n){case 5126:return Uv;case 35664:return kv;case 35665:return Ov;case 35666:return Fv;case 35674:return Bv;case 35675:return zv;case 35676:return Gv;case 5124:case 35670:return Hv;case 35667:case 35671:return Vv;case 35668:case 35672:return Wv;case 35669:case 35673:return $v;case 5125:return Xv;case 36294:return qv;case 36295:return Yv;case 36296:return Zv;case 35678:case 36198:case 36298:case 36306:case 35682:return Kv;case 35679:case 36299:case 36307:return Jv;case 35680:case 36300:case 36308:case 36293:return jv;case 36289:case 36303:case 36311:case 36292:return Qv}}class ty{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Nv(t.type)}}class ny{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ey(t.type)}}class iy{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const hl=/(\w+)(\])?(\[|\.)?/g;function ed(n,e){n.seq.push(e),n.map[e.id]=e}function sy(n,e,t){const i=n.name,s=i.length;for(hl.lastIndex=0;;){const r=hl.exec(i),a=hl.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){ed(t,c===void 0?new ty(o,n,e):new ny(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new iy(o),ed(t,f)),t=f}}}class qa{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);sy(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function td(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const ry=37297;let ay=0;function oy(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const nd=new lt;function ly(n){wt._getMatrix(nd,wt.workingColorSpace,n);const e=`mat3( ${nd.elements.map(t=>t.toFixed(4))} )`;switch(wt.getTransfer(n)){case ro:return[e,"LinearTransferOETF"];case It:return[e,"sRGBTransferOETF"];default:return st("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function id(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+oy(n.getShaderSource(e),o)}else return r}function cy(n,e){const t=ly(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const hy={[Td]:"Linear",[Ed]:"Reinhard",[Rd]:"Cineon",[pc]:"ACESFilmic",[Pd]:"AgX",[Id]:"Neutral",[Cd]:"Custom"};function dy(n,e){const t=hy[e];return t===void 0?(st("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ba=new I;function uy(){wt.getLuminanceCoefficients(Ba);const n=Ba.x.toFixed(4),e=Ba.y.toFixed(4),t=Ba.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function fy(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(zr).join(`
`)}function py(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function my(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function zr(n){return n!==""}function sd(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function rd(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const gy=/^[ \t]*#include +<([\w\d./]+)>/gm;function cc(n){return n.replace(gy,yy)}const vy=new Map;function yy(n,e){let t=dt[e];if(t===void 0){const i=vy.get(e);if(i!==void 0)t=dt[i],st('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return cc(t)}const xy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ad(n){return n.replace(xy,by)}function by(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function od(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const _y={[Ha]:"SHADOWMAP_TYPE_PCF",[Fr]:"SHADOWMAP_TYPE_VSM"};function wy(n){return _y[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const My={[Ms]:"ENVMAP_TYPE_CUBE",[pr]:"ENVMAP_TYPE_CUBE",[_o]:"ENVMAP_TYPE_CUBE_UV"};function Sy(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":My[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const Ay={[pr]:"ENVMAP_MODE_REFRACTION"};function Ty(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Ay[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Ey={[Ad]:"ENVMAP_BLENDING_MULTIPLY",[yf]:"ENVMAP_BLENDING_MIX",[xf]:"ENVMAP_BLENDING_ADD"};function Ry(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Ey[n.combine]||"ENVMAP_BLENDING_NONE"}function Cy(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Py(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=wy(t),c=Sy(t),h=Ty(t),f=Ry(t),d=Cy(t),u=fy(t),m=py(r),_=s.createProgram();let g,p,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(zr).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(zr).join(`
`),p.length>0&&(p+=`
`)):(g=[od(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(zr).join(`
`),p=[od(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Si?"#define TONE_MAPPING":"",t.toneMapping!==Si?dt.tonemapping_pars_fragment:"",t.toneMapping!==Si?dy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",dt.colorspace_pars_fragment,cy("linearToOutputTexel",t.outputColorSpace),uy(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(zr).join(`
`)),a=cc(a),a=sd(a,t),a=rd(a,t),o=cc(o),o=sd(o,t),o=rd(o,t),a=ad(a),o=ad(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===ih?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ih?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=x+g+a,y=x+p+o,S=td(s,s.VERTEX_SHADER,M),w=td(s,s.FRAGMENT_SHADER,y);s.attachShader(_,S),s.attachShader(_,w),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function A(P){if(n.debug.checkShaderErrors){const D=s.getProgramInfoLog(_)||"",$=s.getShaderInfoLog(S)||"",se=s.getShaderInfoLog(w)||"",V=D.trim(),H=$.trim(),N=se.trim();let z=!0,U=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,S,w);else{const W=id(s,S,"vertex"),te=id(s,w,"fragment");_t("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+V+`
`+W+`
`+te)}else V!==""?st("WebGLProgram: Program Info Log:",V):(H===""||N==="")&&(U=!1);U&&(P.diagnostics={runnable:z,programLog:V,vertexShader:{log:H,prefix:g},fragmentShader:{log:N,prefix:p}})}s.deleteShader(S),s.deleteShader(w),v=new qa(s,_),E=my(s,_)}let v;this.getUniforms=function(){return v===void 0&&A(this),v};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let R=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(_,ry)),R},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ay++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=S,this.fragmentShader=w,this}let Iy=0;class Ly{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Dy(e),t.set(e,i)),i}}class Dy{constructor(e){this.id=Iy++,this.code=e,this.usedTimes=0}}function Ny(n){return n===Ss||n===no||n===io}function Uy(n,e,t,i,s,r){const a=new Gd,o=new Ly,l=new Set,c=[],h=new Map,f=i.logarithmicDepthBuffer;let d=i.precision;const u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(v){return l.add(v),v===0?"uv":`uv${v}`}function _(v,E,R,P,D,$){const se=P.fog,V=D.geometry,H=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?P.environment:null,N=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,z=e.get(v.envMap||H,N),U=z&&z.mapping===_o?z.image.height:null,W=u[v.type];v.precision!==null&&(d=i.getMaxPrecision(v.precision),d!==v.precision&&st("WebGLProgram.getParameters:",v.precision,"not supported, using",d,"instead."));const te=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,L=te!==void 0?te.length:0;let j=0;V.morphAttributes.position!==void 0&&(j=1),V.morphAttributes.normal!==void 0&&(j=2),V.morphAttributes.color!==void 0&&(j=3);let le,Z,F,Q;if(W){const Oe=xi[W];le=Oe.vertexShader,Z=Oe.fragmentShader}else{le=v.vertexShader,Z=v.fragmentShader;const Oe=o.getVertexShaderStage(v),ht=o.getFragmentShaderStage(v);o.update(v,Oe,ht),F=Oe.id,Q=ht.id}const q=n.getRenderTarget(),ye=n.state.buffers.depth.getReversed(),ge=D.isInstancedMesh===!0,Me=D.isBatchedMesh===!0,Be=!!v.map,Le=!!v.matcap,pe=!!z,K=!!v.aoMap,de=!!v.lightMap,De=!!v.bumpMap&&v.wireframe===!1,B=!!v.normalMap,ne=!!v.displacementMap,ve=!!v.emissiveMap,Re=!!v.metalnessMap,ke=!!v.roughnessMap,O=v.anisotropy>0,rt=v.clearcoat>0,Ke=v.dispersion>0,C=v.iridescence>0,b=v.sheen>0,X=v.transmission>0,ee=O&&!!v.anisotropyMap,me=rt&&!!v.clearcoatMap,be=rt&&!!v.clearcoatNormalMap,_e=rt&&!!v.clearcoatRoughnessMap,ae=C&&!!v.iridescenceMap,xe=C&&!!v.iridescenceThicknessMap,Ie=b&&!!v.sheenColorMap,k=b&&!!v.sheenRoughnessMap,J=!!v.specularMap,ce=!!v.specularColorMap,Se=!!v.specularIntensityMap,Pe=X&&!!v.transmissionMap,Ge=X&&!!v.thicknessMap,G=!!v.gradientMap,we=!!v.alphaMap,re=v.alphaTest>0,Ee=!!v.alphaHash,Ne=!!v.extensions;let oe=Si;v.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(oe=n.toneMapping);const Ce={shaderID:W,shaderType:v.type,shaderName:v.name,vertexShader:le,fragmentShader:Z,defines:v.defines,customVertexShaderID:F,customFragmentShaderID:Q,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:d,batching:Me,batchingColor:Me&&D._colorsTexture!==null,instancing:ge,instancingColor:ge&&D.instanceColor!==null,instancingMorph:ge&&D.morphTexture!==null,outputColorSpace:q===null?n.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:wt.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:Be,matcap:Le,envMap:pe,envMapMode:pe&&z.mapping,envMapCubeUVHeight:U,aoMap:K,lightMap:de,bumpMap:De,normalMap:B,displacementMap:ne,emissiveMap:ve,normalMapObjectSpace:B&&v.normalMapType===wf,normalMapTangentSpace:B&&v.normalMapType===nc,packedNormalMap:B&&v.normalMapType===nc&&Ny(v.normalMap.format),metalnessMap:Re,roughnessMap:ke,anisotropy:O,anisotropyMap:ee,clearcoat:rt,clearcoatMap:me,clearcoatNormalMap:be,clearcoatRoughnessMap:_e,dispersion:Ke,iridescence:C,iridescenceMap:ae,iridescenceThicknessMap:xe,sheen:b,sheenColorMap:Ie,sheenRoughnessMap:k,specularMap:J,specularColorMap:ce,specularIntensityMap:Se,transmission:X,transmissionMap:Pe,thicknessMap:Ge,gradientMap:G,opaque:v.transparent===!1&&v.blending===ar&&v.alphaToCoverage===!1,alphaMap:we,alphaTest:re,alphaHash:Ee,combine:v.combine,mapUv:Be&&m(v.map.channel),aoMapUv:K&&m(v.aoMap.channel),lightMapUv:de&&m(v.lightMap.channel),bumpMapUv:De&&m(v.bumpMap.channel),normalMapUv:B&&m(v.normalMap.channel),displacementMapUv:ne&&m(v.displacementMap.channel),emissiveMapUv:ve&&m(v.emissiveMap.channel),metalnessMapUv:Re&&m(v.metalnessMap.channel),roughnessMapUv:ke&&m(v.roughnessMap.channel),anisotropyMapUv:ee&&m(v.anisotropyMap.channel),clearcoatMapUv:me&&m(v.clearcoatMap.channel),clearcoatNormalMapUv:be&&m(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_e&&m(v.clearcoatRoughnessMap.channel),iridescenceMapUv:ae&&m(v.iridescenceMap.channel),iridescenceThicknessMapUv:xe&&m(v.iridescenceThicknessMap.channel),sheenColorMapUv:Ie&&m(v.sheenColorMap.channel),sheenRoughnessMapUv:k&&m(v.sheenRoughnessMap.channel),specularMapUv:J&&m(v.specularMap.channel),specularColorMapUv:ce&&m(v.specularColorMap.channel),specularIntensityMapUv:Se&&m(v.specularIntensityMap.channel),transmissionMapUv:Pe&&m(v.transmissionMap.channel),thicknessMapUv:Ge&&m(v.thicknessMap.channel),alphaMapUv:we&&m(v.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(B||O),vertexNormals:!!V.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!V.attributes.uv&&(Be||we),fog:!!se,useFog:v.fog===!0,fogExp2:!!se&&se.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||V.attributes.normal===void 0&&B===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ye,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:V.attributes.position!==void 0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:L,morphTextureStride:j,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:$.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:oe,decodeVideoTexture:Be&&v.map.isVideoTexture===!0&&wt.getTransfer(v.map.colorSpace)===It,decodeVideoTextureEmissive:ve&&v.emissiveMap.isVideoTexture===!0&&wt.getTransfer(v.emissiveMap.colorSpace)===It,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===On,flipSided:v.side===Bn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Ne&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ne&&v.extensions.multiDraw===!0||Me)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ce.vertexUv1s=l.has(1),Ce.vertexUv2s=l.has(2),Ce.vertexUv3s=l.has(3),l.clear(),Ce}function g(v){const E=[];if(v.shaderID?E.push(v.shaderID):(E.push(v.customVertexShaderID),E.push(v.customFragmentShaderID)),v.defines!==void 0)for(const R in v.defines)E.push(R),E.push(v.defines[R]);return v.isRawShaderMaterial===!1&&(p(E,v),x(E,v),E.push(n.outputColorSpace)),E.push(v.customProgramCacheKey),E.join()}function p(v,E){v.push(E.precision),v.push(E.outputColorSpace),v.push(E.envMapMode),v.push(E.envMapCubeUVHeight),v.push(E.mapUv),v.push(E.alphaMapUv),v.push(E.lightMapUv),v.push(E.aoMapUv),v.push(E.bumpMapUv),v.push(E.normalMapUv),v.push(E.displacementMapUv),v.push(E.emissiveMapUv),v.push(E.metalnessMapUv),v.push(E.roughnessMapUv),v.push(E.anisotropyMapUv),v.push(E.clearcoatMapUv),v.push(E.clearcoatNormalMapUv),v.push(E.clearcoatRoughnessMapUv),v.push(E.iridescenceMapUv),v.push(E.iridescenceThicknessMapUv),v.push(E.sheenColorMapUv),v.push(E.sheenRoughnessMapUv),v.push(E.specularMapUv),v.push(E.specularColorMapUv),v.push(E.specularIntensityMapUv),v.push(E.transmissionMapUv),v.push(E.thicknessMapUv),v.push(E.combine),v.push(E.fogExp2),v.push(E.sizeAttenuation),v.push(E.morphTargetsCount),v.push(E.morphAttributeCount),v.push(E.numDirLights),v.push(E.numPointLights),v.push(E.numSpotLights),v.push(E.numSpotLightMaps),v.push(E.numHemiLights),v.push(E.numRectAreaLights),v.push(E.numDirLightShadows),v.push(E.numPointLightShadows),v.push(E.numSpotLightShadows),v.push(E.numSpotLightShadowsWithMaps),v.push(E.numLightProbes),v.push(E.shadowMapType),v.push(E.toneMapping),v.push(E.numClippingPlanes),v.push(E.numClipIntersection),v.push(E.depthPacking)}function x(v,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function M(v){const E=u[v.type];let R;if(E){const P=xi[E];R=Qp.clone(P.uniforms)}else R=v.uniforms;return R}function y(v,E){let R=h.get(E);return R!==void 0?++R.usedTimes:(R=new Py(n,E,v,s),c.push(R),h.set(E,R)),R}function S(v){if(--v.usedTimes===0){const E=c.indexOf(v);c[E]=c[c.length-1],c.pop(),h.delete(v.cacheKey),v.destroy()}}function w(v){o.remove(v)}function A(){o.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:M,acquireProgram:y,releaseProgram:S,releaseShaderCache:w,programs:c,dispose:A}}function ky(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function Oy(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function ld(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function cd(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(d){let u=0;return d.isInstancedMesh&&(u+=2),d.isSkinnedMesh&&(u+=1),u}function o(d,u,m,_,g,p){let x=n[e];return x===void 0?(x={id:d.id,object:d,geometry:u,material:m,materialVariant:a(d),groupOrder:_,renderOrder:d.renderOrder,z:g,group:p},n[e]=x):(x.id=d.id,x.object=d,x.geometry=u,x.material=m,x.materialVariant=a(d),x.groupOrder=_,x.renderOrder=d.renderOrder,x.z=g,x.group=p),e++,x}function l(d,u,m,_,g,p){const x=o(d,u,m,_,g,p);m.transmission>0?i.push(x):m.transparent===!0?s.push(x):t.push(x)}function c(d,u,m,_,g,p){const x=o(d,u,m,_,g,p);m.transmission>0?i.unshift(x):m.transparent===!0?s.unshift(x):t.unshift(x)}function h(d,u,m){t.length>1&&t.sort(d||Oy),i.length>1&&i.sort(u||ld),s.length>1&&s.sort(u||ld),m&&(t.reverse(),i.reverse(),s.reverse())}function f(){for(let d=e,u=n.length;d<u;d++){const m=n[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:f,sort:h}}function Fy(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new cd,n.set(i,[a])):s>=r.length?(a=new cd,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function By(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new it};break;case"SpotLight":t={position:new I,direction:new I,color:new it,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new it,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new it,groundColor:new it};break;case"RectAreaLight":t={color:new it,position:new I,halfWidth:new I,halfHeight:new I};break}return n[e.id]=t,t}}}function zy(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Gy=0;function Hy(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Vy(n){const e=new By,t=zy(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new I);const s=new I,r=new Rt,a=new Rt;function o(c){let h=0,f=0,d=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let u=0,m=0,_=0,g=0,p=0,x=0,M=0,y=0,S=0,w=0,A=0;c.sort(Hy);for(let E=0,R=c.length;E<R;E++){const P=c[E],D=P.color,$=P.intensity,se=P.distance;let V=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Ss?V=P.shadow.map.texture:V=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=D.r*$,f+=D.g*$,d+=D.b*$;else if(P.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(P.sh.coefficients[H],$);A++}else if(P.isDirectionalLight){const H=e.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const N=P.shadow,z=t.get(P);z.shadowIntensity=N.intensity,z.shadowBias=N.bias,z.shadowNormalBias=N.normalBias,z.shadowRadius=N.radius,z.shadowMapSize=N.mapSize,i.directionalShadow[u]=z,i.directionalShadowMap[u]=V,i.directionalShadowMatrix[u]=P.shadow.matrix,x++}i.directional[u]=H,u++}else if(P.isSpotLight){const H=e.get(P);H.position.setFromMatrixPosition(P.matrixWorld),H.color.copy(D).multiplyScalar($),H.distance=se,H.coneCos=Math.cos(P.angle),H.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),H.decay=P.decay,i.spot[_]=H;const N=P.shadow;if(P.map&&(i.spotLightMap[S]=P.map,S++,N.updateMatrices(P),P.castShadow&&w++),i.spotLightMatrix[_]=N.matrix,P.castShadow){const z=t.get(P);z.shadowIntensity=N.intensity,z.shadowBias=N.bias,z.shadowNormalBias=N.normalBias,z.shadowRadius=N.radius,z.shadowMapSize=N.mapSize,i.spotShadow[_]=z,i.spotShadowMap[_]=V,y++}_++}else if(P.isRectAreaLight){const H=e.get(P);H.color.copy(D).multiplyScalar($),H.halfWidth.set(P.width*.5,0,0),H.halfHeight.set(0,P.height*.5,0),i.rectArea[g]=H,g++}else if(P.isPointLight){const H=e.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),H.distance=P.distance,H.decay=P.decay,P.castShadow){const N=P.shadow,z=t.get(P);z.shadowIntensity=N.intensity,z.shadowBias=N.bias,z.shadowNormalBias=N.normalBias,z.shadowRadius=N.radius,z.shadowMapSize=N.mapSize,z.shadowCameraNear=N.camera.near,z.shadowCameraFar=N.camera.far,i.pointShadow[m]=z,i.pointShadowMap[m]=V,i.pointShadowMatrix[m]=P.shadow.matrix,M++}i.point[m]=H,m++}else if(P.isHemisphereLight){const H=e.get(P);H.skyColor.copy(P.color).multiplyScalar($),H.groundColor.copy(P.groundColor).multiplyScalar($),i.hemi[p]=H,p++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ze.LTC_FLOAT_1,i.rectAreaLTC2=ze.LTC_FLOAT_2):(i.rectAreaLTC1=ze.LTC_HALF_1,i.rectAreaLTC2=ze.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=f,i.ambient[2]=d;const v=i.hash;(v.directionalLength!==u||v.pointLength!==m||v.spotLength!==_||v.rectAreaLength!==g||v.hemiLength!==p||v.numDirectionalShadows!==x||v.numPointShadows!==M||v.numSpotShadows!==y||v.numSpotMaps!==S||v.numLightProbes!==A)&&(i.directional.length=u,i.spot.length=_,i.rectArea.length=g,i.point.length=m,i.hemi.length=p,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=y+S-w,i.spotLightMap.length=S,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=A,v.directionalLength=u,v.pointLength=m,v.spotLength=_,v.rectAreaLength=g,v.hemiLength=p,v.numDirectionalShadows=x,v.numPointShadows=M,v.numSpotShadows=y,v.numSpotMaps=S,v.numLightProbes=A,i.version=Gy++)}function l(c,h){let f=0,d=0,u=0,m=0,_=0;const g=h.matrixWorldInverse;for(let p=0,x=c.length;p<x;p++){const M=c[p];if(M.isDirectionalLight){const y=i.directional[f];y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(g),f++}else if(M.isSpotLight){const y=i.spot[u];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(g),u++}else if(M.isRectAreaLight){const y=i.rectArea[m];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(g),a.identity(),r.copy(M.matrixWorld),r.premultiply(g),a.extractRotation(r),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),m++}else if(M.isPointLight){const y=i.point[d];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(g),d++}else if(M.isHemisphereLight){const y=i.hemi[_];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(g),_++}}}return{setup:o,setupView:l,state:i}}function hd(n){const e=new Vy(n),t=[],i=[],s=[];function r(d){f.camera=d,t.length=0,i.length=0,s.length=0}function a(d){t.push(d)}function o(d){i.push(d)}function l(d){s.push(d)}function c(){e.setup(t)}function h(d){e.setupView(t,d)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Wy(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new hd(n),e.set(s,[o])):r>=a.length?(o=new hd(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const $y=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Xy=`uniform sampler2D shadow_pass;
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
}`,qy=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],Yy=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],dd=new Rt,Nr=new I,dl=new I;function Zy(n,e,t){let i=new Ec;const s=new Ae,r=new Ae,a=new Vt,o=new im,l=new sm,c={},h=t.maxTextureSize,f={[os]:Bn,[Bn]:os,[On]:On},d=new An({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ae},radius:{value:4}},vertexShader:$y,fragmentShader:Xy}),u=d.clone();u.defines.HORIZONTAL_PASS=1;const m=new Mt;m.setAttribute("position",new Jt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new yt(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ha;let p=this.type;this.render=function(w,A,v){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;this.type===ju&&(st("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ha);const E=n.getRenderTarget(),R=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),D=n.state;D.setBlending(Bi),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const $=p!==this.type;$&&A.traverse(function(se){se.material&&(Array.isArray(se.material)?se.material.forEach(V=>V.needsUpdate=!0):se.material.needsUpdate=!0)});for(let se=0,V=w.length;se<V;se++){const H=w[se],N=H.shadow;if(N===void 0){st("WebGLShadowMap:",H,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;s.copy(N.mapSize);const z=N.getFrameExtents();s.multiply(z),r.copy(N.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/z.x),s.x=r.x*z.x,N.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/z.y),s.y=r.y*z.y,N.mapSize.y=r.y));const U=n.state.buffers.depth.getReversed();if(N.camera._reversedDepth=U,N.map===null||$===!0){if(N.map!==null&&(N.map.depthTexture!==null&&(N.map.depthTexture.dispose(),N.map.depthTexture=null),N.map.dispose()),this.type===Fr){if(H.isPointLight){st("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}N.map=new Ti(s.x,s.y,{format:Ss,type:Hi,minFilter:pn,magFilter:pn,generateMipmaps:!1}),N.map.texture.name=H.name+".shadowMap",N.map.depthTexture=new mr(s.x,s.y,hi),N.map.depthTexture.name=H.name+".shadowMapDepth",N.map.depthTexture.format=Vi,N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=mn,N.map.depthTexture.magFilter=mn}else H.isPointLight?(N.map=new cu(s.x),N.map.depthTexture=new bp(s.x,Ei)):(N.map=new Ti(s.x,s.y),N.map.depthTexture=new mr(s.x,s.y,Ei)),N.map.depthTexture.name=H.name+".shadowMap",N.map.depthTexture.format=Vi,this.type===Ha?(N.map.depthTexture.compareFunction=U?Mc:wc,N.map.depthTexture.minFilter=pn,N.map.depthTexture.magFilter=pn):(N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=mn,N.map.depthTexture.magFilter=mn);N.camera.updateProjectionMatrix()}const W=N.map.isWebGLCubeRenderTarget?6:1;for(let te=0;te<W;te++){if(N.map.isWebGLCubeRenderTarget)n.setRenderTarget(N.map,te),n.clear();else{te===0&&(n.setRenderTarget(N.map),n.clear());const L=N.getViewport(te);a.set(r.x*L.x,r.y*L.y,r.x*L.z,r.y*L.w),D.viewport(a)}if(H.isPointLight){const L=N.camera,j=N.matrix,le=H.distance||L.far;le!==L.far&&(L.far=le,L.updateProjectionMatrix()),Nr.setFromMatrixPosition(H.matrixWorld),L.position.copy(Nr),dl.copy(L.position),dl.add(qy[te]),L.up.copy(Yy[te]),L.lookAt(dl),L.updateMatrixWorld(),j.makeTranslation(-Nr.x,-Nr.y,-Nr.z),dd.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),N._frustum.setFromProjectionMatrix(dd,L.coordinateSystem,L.reversedDepth)}else N.updateMatrices(H);i=N.getFrustum(),y(A,v,N.camera,H,this.type)}N.isPointLightShadow!==!0&&this.type===Fr&&x(N,v),N.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(E,R,P)};function x(w,A){const v=e.update(_);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,u.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,u.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Ti(s.x,s.y,{format:Ss,type:Hi})),d.uniforms.shadow_pass.value=w.map.depthTexture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(A,null,v,d,_,null),u.uniforms.shadow_pass.value=w.mapPass.texture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(A,null,v,u,_,null)}function M(w,A,v,E){let R=null;const P=v.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)R=P;else if(R=v.isPointLight===!0?l:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const D=R.uuid,$=A.uuid;let se=c[D];se===void 0&&(se={},c[D]=se);let V=se[$];V===void 0&&(V=R.clone(),se[$]=V,A.addEventListener("dispose",S)),R=V}if(R.visible=A.visible,R.wireframe=A.wireframe,E===Fr?R.side=A.shadowSide!==null?A.shadowSide:A.side:R.side=A.shadowSide!==null?A.shadowSide:f[A.side],R.alphaMap=A.alphaMap,R.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,R.map=A.map,R.clipShadows=A.clipShadows,R.clippingPlanes=A.clippingPlanes,R.clipIntersection=A.clipIntersection,R.displacementMap=A.displacementMap,R.displacementScale=A.displacementScale,R.displacementBias=A.displacementBias,R.wireframeLinewidth=A.wireframeLinewidth,R.linewidth=A.linewidth,v.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const D=n.properties.get(R);D.light=v}return R}function y(w,A,v,E,R){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&R===Fr)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,w.matrixWorld);const $=e.update(w),se=w.material;if(Array.isArray(se)){const V=$.groups;for(let H=0,N=V.length;H<N;H++){const z=V[H],U=se[z.materialIndex];if(U&&U.visible){const W=M(w,U,E,R);w.onBeforeShadow(n,w,A,v,$,W,z),n.renderBufferDirect(v,null,$,W,w,z),w.onAfterShadow(n,w,A,v,$,W,z)}}}else if(se.visible){const V=M(w,se,E,R);w.onBeforeShadow(n,w,A,v,$,V,null),n.renderBufferDirect(v,null,$,V,w,null),w.onAfterShadow(n,w,A,v,$,V,null)}}const D=w.children;for(let $=0,se=D.length;$<se;$++)y(D[$],A,v,E,R)}function S(w){w.target.removeEventListener("dispose",S);for(const v in c){const E=c[v],R=w.target.uuid;R in E&&(E[R].dispose(),delete E[R])}}}function Ky(n,e){function t(){let G=!1;const we=new Vt;let re=null;const Ee=new Vt(0,0,0,0);return{setMask:function(Ne){re!==Ne&&!G&&(n.colorMask(Ne,Ne,Ne,Ne),re=Ne)},setLocked:function(Ne){G=Ne},setClear:function(Ne,oe,Ce,Oe,ht){ht===!0&&(Ne*=Oe,oe*=Oe,Ce*=Oe),we.set(Ne,oe,Ce,Oe),Ee.equals(we)===!1&&(n.clearColor(Ne,oe,Ce,Oe),Ee.copy(we))},reset:function(){G=!1,re=null,Ee.set(-1,0,0,0)}}}function i(){let G=!1,we=!1,re=null,Ee=null,Ne=null;return{setReversed:function(oe){if(we!==oe){const Ce=e.get("EXT_clip_control");oe?Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.ZERO_TO_ONE_EXT):Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.NEGATIVE_ONE_TO_ONE_EXT),we=oe;const Oe=Ne;Ne=null,this.setClear(Oe)}},getReversed:function(){return we},setTest:function(oe){oe?q(n.DEPTH_TEST):ye(n.DEPTH_TEST)},setMask:function(oe){re!==oe&&!G&&(n.depthMask(oe),re=oe)},setFunc:function(oe){if(we&&(oe=Lf[oe]),Ee!==oe){switch(oe){case yl:n.depthFunc(n.NEVER);break;case xl:n.depthFunc(n.ALWAYS);break;case bl:n.depthFunc(n.LESS);break;case fr:n.depthFunc(n.LEQUAL);break;case _l:n.depthFunc(n.EQUAL);break;case wl:n.depthFunc(n.GEQUAL);break;case Ml:n.depthFunc(n.GREATER);break;case Sl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ee=oe}},setLocked:function(oe){G=oe},setClear:function(oe){Ne!==oe&&(Ne=oe,we&&(oe=1-oe),n.clearDepth(oe))},reset:function(){G=!1,re=null,Ee=null,Ne=null,we=!1}}}function s(){let G=!1,we=null,re=null,Ee=null,Ne=null,oe=null,Ce=null,Oe=null,ht=null;return{setTest:function(ie){G||(ie?q(n.STENCIL_TEST):ye(n.STENCIL_TEST))},setMask:function(ie){we!==ie&&!G&&(n.stencilMask(ie),we=ie)},setFunc:function(ie,Te,Ue){(re!==ie||Ee!==Te||Ne!==Ue)&&(n.stencilFunc(ie,Te,Ue),re=ie,Ee=Te,Ne=Ue)},setOp:function(ie,Te,Ue){(oe!==ie||Ce!==Te||Oe!==Ue)&&(n.stencilOp(ie,Te,Ue),oe=ie,Ce=Te,Oe=Ue)},setLocked:function(ie){G=ie},setClear:function(ie){ht!==ie&&(n.clearStencil(ie),ht=ie)},reset:function(){G=!1,we=null,re=null,Ee=null,Ne=null,oe=null,Ce=null,Oe=null,ht=null}}}const r=new t,a=new i,o=new s,l=new WeakMap,c=new WeakMap;let h={},f={},d={},u=new WeakMap,m=[],_=null,g=!1,p=null,x=null,M=null,y=null,S=null,w=null,A=null,v=new it(0,0,0),E=0,R=!1,P=null,D=null,$=null,se=null,V=null;const H=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let N=!1,z=0;const U=n.getParameter(n.VERSION);U.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(U)[1]),N=z>=1):U.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(U)[1]),N=z>=2);let W=null,te={};const L=n.getParameter(n.SCISSOR_BOX),j=n.getParameter(n.VIEWPORT),le=new Vt().fromArray(L),Z=new Vt().fromArray(j);function F(G,we,re,Ee){const Ne=new Uint8Array(4),oe=n.createTexture();n.bindTexture(G,oe),n.texParameteri(G,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(G,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ce=0;Ce<re;Ce++)G===n.TEXTURE_3D||G===n.TEXTURE_2D_ARRAY?n.texImage3D(we,0,n.RGBA,1,1,Ee,0,n.RGBA,n.UNSIGNED_BYTE,Ne):n.texImage2D(we+Ce,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ne);return oe}const Q={};Q[n.TEXTURE_2D]=F(n.TEXTURE_2D,n.TEXTURE_2D,1),Q[n.TEXTURE_CUBE_MAP]=F(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[n.TEXTURE_2D_ARRAY]=F(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Q[n.TEXTURE_3D]=F(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),q(n.DEPTH_TEST),a.setFunc(fr),De(!1),B(Qc),q(n.CULL_FACE),K(Bi);function q(G){h[G]!==!0&&(n.enable(G),h[G]=!0)}function ye(G){h[G]!==!1&&(n.disable(G),h[G]=!1)}function ge(G,we){return d[G]!==we?(n.bindFramebuffer(G,we),d[G]=we,G===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=we),G===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=we),!0):!1}function Me(G,we){let re=m,Ee=!1;if(G){re=u.get(we),re===void 0&&(re=[],u.set(we,re));const Ne=G.textures;if(re.length!==Ne.length||re[0]!==n.COLOR_ATTACHMENT0){for(let oe=0,Ce=Ne.length;oe<Ce;oe++)re[oe]=n.COLOR_ATTACHMENT0+oe;re.length=Ne.length,Ee=!0}}else re[0]!==n.BACK&&(re[0]=n.BACK,Ee=!0);Ee&&n.drawBuffers(re)}function Be(G){return _!==G?(n.useProgram(G),_=G,!0):!1}const Le={[ys]:n.FUNC_ADD,[ef]:n.FUNC_SUBTRACT,[tf]:n.FUNC_REVERSE_SUBTRACT};Le[nf]=n.MIN,Le[sf]=n.MAX;const pe={[rf]:n.ZERO,[af]:n.ONE,[of]:n.SRC_COLOR,[gl]:n.SRC_ALPHA,[ff]:n.SRC_ALPHA_SATURATE,[df]:n.DST_COLOR,[cf]:n.DST_ALPHA,[lf]:n.ONE_MINUS_SRC_COLOR,[vl]:n.ONE_MINUS_SRC_ALPHA,[uf]:n.ONE_MINUS_DST_COLOR,[hf]:n.ONE_MINUS_DST_ALPHA,[pf]:n.CONSTANT_COLOR,[mf]:n.ONE_MINUS_CONSTANT_COLOR,[gf]:n.CONSTANT_ALPHA,[vf]:n.ONE_MINUS_CONSTANT_ALPHA};function K(G,we,re,Ee,Ne,oe,Ce,Oe,ht,ie){if(G===Bi){g===!0&&(ye(n.BLEND),g=!1);return}if(g===!1&&(q(n.BLEND),g=!0),G!==Qu){if(G!==p||ie!==R){if((x!==ys||S!==ys)&&(n.blendEquation(n.FUNC_ADD),x=ys,S=ys),ie)switch(G){case ar:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ur:n.blendFunc(n.ONE,n.ONE);break;case eh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case th:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:_t("WebGLState: Invalid blending: ",G);break}else switch(G){case ar:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ur:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case eh:_t("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case th:_t("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:_t("WebGLState: Invalid blending: ",G);break}M=null,y=null,w=null,A=null,v.set(0,0,0),E=0,p=G,R=ie}return}Ne=Ne||we,oe=oe||re,Ce=Ce||Ee,(we!==x||Ne!==S)&&(n.blendEquationSeparate(Le[we],Le[Ne]),x=we,S=Ne),(re!==M||Ee!==y||oe!==w||Ce!==A)&&(n.blendFuncSeparate(pe[re],pe[Ee],pe[oe],pe[Ce]),M=re,y=Ee,w=oe,A=Ce),(Oe.equals(v)===!1||ht!==E)&&(n.blendColor(Oe.r,Oe.g,Oe.b,ht),v.copy(Oe),E=ht),p=G,R=!1}function de(G,we){G.side===On?ye(n.CULL_FACE):q(n.CULL_FACE);let re=G.side===Bn;we&&(re=!re),De(re),G.blending===ar&&G.transparent===!1?K(Bi):K(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),a.setFunc(G.depthFunc),a.setTest(G.depthTest),a.setMask(G.depthWrite),r.setMask(G.colorWrite);const Ee=G.stencilWrite;o.setTest(Ee),Ee&&(o.setMask(G.stencilWriteMask),o.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),o.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),ve(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?q(n.SAMPLE_ALPHA_TO_COVERAGE):ye(n.SAMPLE_ALPHA_TO_COVERAGE)}function De(G){P!==G&&(G?n.frontFace(n.CW):n.frontFace(n.CCW),P=G)}function B(G){G!==Ku?(q(n.CULL_FACE),G!==D&&(G===Qc?n.cullFace(n.BACK):G===Ju?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ye(n.CULL_FACE),D=G}function ne(G){G!==$&&(N&&n.lineWidth(G),$=G)}function ve(G,we,re){G?(q(n.POLYGON_OFFSET_FILL),(se!==we||V!==re)&&(se=we,V=re,a.getReversed()&&(we=-we),n.polygonOffset(we,re))):ye(n.POLYGON_OFFSET_FILL)}function Re(G){G?q(n.SCISSOR_TEST):ye(n.SCISSOR_TEST)}function ke(G){G===void 0&&(G=n.TEXTURE0+H-1),W!==G&&(n.activeTexture(G),W=G)}function O(G,we,re){re===void 0&&(W===null?re=n.TEXTURE0+H-1:re=W);let Ee=te[re];Ee===void 0&&(Ee={type:void 0,texture:void 0},te[re]=Ee),(Ee.type!==G||Ee.texture!==we)&&(W!==re&&(n.activeTexture(re),W=re),n.bindTexture(G,we||Q[G]),Ee.type=G,Ee.texture=we)}function rt(){const G=te[W];G!==void 0&&G.type!==void 0&&(n.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function Ke(){try{n.compressedTexImage2D(...arguments)}catch(G){_t("WebGLState:",G)}}function C(){try{n.compressedTexImage3D(...arguments)}catch(G){_t("WebGLState:",G)}}function b(){try{n.texSubImage2D(...arguments)}catch(G){_t("WebGLState:",G)}}function X(){try{n.texSubImage3D(...arguments)}catch(G){_t("WebGLState:",G)}}function ee(){try{n.compressedTexSubImage2D(...arguments)}catch(G){_t("WebGLState:",G)}}function me(){try{n.compressedTexSubImage3D(...arguments)}catch(G){_t("WebGLState:",G)}}function be(){try{n.texStorage2D(...arguments)}catch(G){_t("WebGLState:",G)}}function _e(){try{n.texStorage3D(...arguments)}catch(G){_t("WebGLState:",G)}}function ae(){try{n.texImage2D(...arguments)}catch(G){_t("WebGLState:",G)}}function xe(){try{n.texImage3D(...arguments)}catch(G){_t("WebGLState:",G)}}function Ie(G){return f[G]!==void 0?f[G]:n.getParameter(G)}function k(G,we){f[G]!==we&&(n.pixelStorei(G,we),f[G]=we)}function J(G){le.equals(G)===!1&&(n.scissor(G.x,G.y,G.z,G.w),le.copy(G))}function ce(G){Z.equals(G)===!1&&(n.viewport(G.x,G.y,G.z,G.w),Z.copy(G))}function Se(G,we){let re=c.get(we);re===void 0&&(re=new WeakMap,c.set(we,re));let Ee=re.get(G);Ee===void 0&&(Ee=n.getUniformBlockIndex(we,G.name),re.set(G,Ee))}function Pe(G,we){const Ee=c.get(we).get(G);l.get(we)!==Ee&&(n.uniformBlockBinding(we,Ee,G.__bindingPointIndex),l.set(we,Ee))}function Ge(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},f={},W=null,te={},d={},u=new WeakMap,m=[],_=null,g=!1,p=null,x=null,M=null,y=null,S=null,w=null,A=null,v=new it(0,0,0),E=0,R=!1,P=null,D=null,$=null,se=null,V=null,le.set(0,0,n.canvas.width,n.canvas.height),Z.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:q,disable:ye,bindFramebuffer:ge,drawBuffers:Me,useProgram:Be,setBlending:K,setMaterial:de,setFlipSided:De,setCullFace:B,setLineWidth:ne,setPolygonOffset:ve,setScissorTest:Re,activeTexture:ke,bindTexture:O,unbindTexture:rt,compressedTexImage2D:Ke,compressedTexImage3D:C,texImage2D:ae,texImage3D:xe,pixelStorei:k,getParameter:Ie,updateUBOMapping:Se,uniformBlockBinding:Pe,texStorage2D:be,texStorage3D:_e,texSubImage2D:b,texSubImage3D:X,compressedTexSubImage2D:ee,compressedTexSubImage3D:me,scissor:J,viewport:ce,reset:Ge}}function Jy(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ae,h=new WeakMap,f=new Set;let d;const u=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(C,b){return m?new OffscreenCanvas(C,b):ao("canvas")}function g(C,b,X){let ee=1;const me=Ke(C);if((me.width>X||me.height>X)&&(ee=X/Math.max(me.width,me.height)),ee<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const be=Math.floor(ee*me.width),_e=Math.floor(ee*me.height);d===void 0&&(d=_(be,_e));const ae=b?_(be,_e):d;return ae.width=be,ae.height=_e,ae.getContext("2d").drawImage(C,0,0,be,_e),st("WebGLRenderer: Texture has been resized from ("+me.width+"x"+me.height+") to ("+be+"x"+_e+")."),ae}else return"data"in C&&st("WebGLRenderer: Image in DataTexture is too big ("+me.width+"x"+me.height+")."),C;return C}function p(C){return C.generateMipmaps}function x(C){n.generateMipmap(C)}function M(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(C,b,X,ee,me,be=!1){if(C!==null){if(n[C]!==void 0)return n[C];st("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let _e;ee&&(_e=e.get("EXT_texture_norm16"),_e||st("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ae=b;if(b===n.RED&&(X===n.FLOAT&&(ae=n.R32F),X===n.HALF_FLOAT&&(ae=n.R16F),X===n.UNSIGNED_BYTE&&(ae=n.R8),X===n.UNSIGNED_SHORT&&_e&&(ae=_e.R16_EXT),X===n.SHORT&&_e&&(ae=_e.R16_SNORM_EXT)),b===n.RED_INTEGER&&(X===n.UNSIGNED_BYTE&&(ae=n.R8UI),X===n.UNSIGNED_SHORT&&(ae=n.R16UI),X===n.UNSIGNED_INT&&(ae=n.R32UI),X===n.BYTE&&(ae=n.R8I),X===n.SHORT&&(ae=n.R16I),X===n.INT&&(ae=n.R32I)),b===n.RG&&(X===n.FLOAT&&(ae=n.RG32F),X===n.HALF_FLOAT&&(ae=n.RG16F),X===n.UNSIGNED_BYTE&&(ae=n.RG8),X===n.UNSIGNED_SHORT&&_e&&(ae=_e.RG16_EXT),X===n.SHORT&&_e&&(ae=_e.RG16_SNORM_EXT)),b===n.RG_INTEGER&&(X===n.UNSIGNED_BYTE&&(ae=n.RG8UI),X===n.UNSIGNED_SHORT&&(ae=n.RG16UI),X===n.UNSIGNED_INT&&(ae=n.RG32UI),X===n.BYTE&&(ae=n.RG8I),X===n.SHORT&&(ae=n.RG16I),X===n.INT&&(ae=n.RG32I)),b===n.RGB_INTEGER&&(X===n.UNSIGNED_BYTE&&(ae=n.RGB8UI),X===n.UNSIGNED_SHORT&&(ae=n.RGB16UI),X===n.UNSIGNED_INT&&(ae=n.RGB32UI),X===n.BYTE&&(ae=n.RGB8I),X===n.SHORT&&(ae=n.RGB16I),X===n.INT&&(ae=n.RGB32I)),b===n.RGBA_INTEGER&&(X===n.UNSIGNED_BYTE&&(ae=n.RGBA8UI),X===n.UNSIGNED_SHORT&&(ae=n.RGBA16UI),X===n.UNSIGNED_INT&&(ae=n.RGBA32UI),X===n.BYTE&&(ae=n.RGBA8I),X===n.SHORT&&(ae=n.RGBA16I),X===n.INT&&(ae=n.RGBA32I)),b===n.RGB&&(X===n.UNSIGNED_SHORT&&_e&&(ae=_e.RGB16_EXT),X===n.SHORT&&_e&&(ae=_e.RGB16_SNORM_EXT),X===n.UNSIGNED_INT_5_9_9_9_REV&&(ae=n.RGB9_E5),X===n.UNSIGNED_INT_10F_11F_11F_REV&&(ae=n.R11F_G11F_B10F)),b===n.RGBA){const xe=be?ro:wt.getTransfer(me);X===n.FLOAT&&(ae=n.RGBA32F),X===n.HALF_FLOAT&&(ae=n.RGBA16F),X===n.UNSIGNED_BYTE&&(ae=xe===It?n.SRGB8_ALPHA8:n.RGBA8),X===n.UNSIGNED_SHORT&&_e&&(ae=_e.RGBA16_EXT),X===n.SHORT&&_e&&(ae=_e.RGBA16_SNORM_EXT),X===n.UNSIGNED_SHORT_4_4_4_4&&(ae=n.RGBA4),X===n.UNSIGNED_SHORT_5_5_5_1&&(ae=n.RGB5_A1)}return(ae===n.R16F||ae===n.R32F||ae===n.RG16F||ae===n.RG32F||ae===n.RGBA16F||ae===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ae}function S(C,b){let X;return C?b===null||b===Ei||b===Yr?X=n.DEPTH24_STENCIL8:b===hi?X=n.DEPTH32F_STENCIL8:b===qr&&(X=n.DEPTH24_STENCIL8,st("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Ei||b===Yr?X=n.DEPTH_COMPONENT24:b===hi?X=n.DEPTH_COMPONENT32F:b===qr&&(X=n.DEPTH_COMPONENT16),X}function w(C,b){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==mn&&C.minFilter!==pn?Math.log2(Math.max(b.width,b.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?b.mipmaps.length:1}function A(C){const b=C.target;b.removeEventListener("dispose",A),E(b),b.isVideoTexture&&h.delete(b),b.isHTMLTexture&&f.delete(b)}function v(C){const b=C.target;b.removeEventListener("dispose",v),P(b)}function E(C){const b=i.get(C);if(b.__webglInit===void 0)return;const X=C.source,ee=u.get(X);if(ee){const me=ee[b.__cacheKey];me.usedTimes--,me.usedTimes===0&&R(C),Object.keys(ee).length===0&&u.delete(X)}i.remove(C)}function R(C){const b=i.get(C);n.deleteTexture(b.__webglTexture);const X=C.source,ee=u.get(X);delete ee[b.__cacheKey],a.memory.textures--}function P(C){const b=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(b.__webglFramebuffer[ee]))for(let me=0;me<b.__webglFramebuffer[ee].length;me++)n.deleteFramebuffer(b.__webglFramebuffer[ee][me]);else n.deleteFramebuffer(b.__webglFramebuffer[ee]);b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer[ee])}else{if(Array.isArray(b.__webglFramebuffer))for(let ee=0;ee<b.__webglFramebuffer.length;ee++)n.deleteFramebuffer(b.__webglFramebuffer[ee]);else n.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&n.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let ee=0;ee<b.__webglColorRenderbuffer.length;ee++)b.__webglColorRenderbuffer[ee]&&n.deleteRenderbuffer(b.__webglColorRenderbuffer[ee]);b.__webglDepthRenderbuffer&&n.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const X=C.textures;for(let ee=0,me=X.length;ee<me;ee++){const be=i.get(X[ee]);be.__webglTexture&&(n.deleteTexture(be.__webglTexture),a.memory.textures--),i.remove(X[ee])}i.remove(C)}let D=0;function $(){D=0}function se(){return D}function V(C){D=C}function H(){const C=D;return C>=s.maxTextures&&st("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),D+=1,C}function N(C){const b=[];return b.push(C.wrapS),b.push(C.wrapT),b.push(C.wrapR||0),b.push(C.magFilter),b.push(C.minFilter),b.push(C.anisotropy),b.push(C.internalFormat),b.push(C.format),b.push(C.type),b.push(C.generateMipmaps),b.push(C.premultiplyAlpha),b.push(C.flipY),b.push(C.unpackAlignment),b.push(C.colorSpace),b.join()}function z(C,b){const X=i.get(C);if(C.isVideoTexture&&O(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&X.__version!==C.version){const ee=C.image;if(ee===null)st("WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)st("WebGLRenderer: Texture marked for update but image is incomplete");else{ye(X,C,b);return}}else C.isExternalTexture&&(X.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,X.__webglTexture,n.TEXTURE0+b)}function U(C,b){const X=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&X.__version!==C.version){ye(X,C,b);return}else C.isExternalTexture&&(X.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,X.__webglTexture,n.TEXTURE0+b)}function W(C,b){const X=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&X.__version!==C.version){ye(X,C,b);return}t.bindTexture(n.TEXTURE_3D,X.__webglTexture,n.TEXTURE0+b)}function te(C,b){const X=i.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&X.__version!==C.version){ge(X,C,b);return}t.bindTexture(n.TEXTURE_CUBE_MAP,X.__webglTexture,n.TEXTURE0+b)}const L={[ls]:n.REPEAT,[Oi]:n.CLAMP_TO_EDGE,[Al]:n.MIRRORED_REPEAT},j={[mn]:n.NEAREST,[bf]:n.NEAREST_MIPMAP_NEAREST,[la]:n.NEAREST_MIPMAP_LINEAR,[pn]:n.LINEAR,[Po]:n.LINEAR_MIPMAP_NEAREST,[is]:n.LINEAR_MIPMAP_LINEAR},le={[Mf]:n.NEVER,[Rf]:n.ALWAYS,[Sf]:n.LESS,[wc]:n.LEQUAL,[Af]:n.EQUAL,[Mc]:n.GEQUAL,[Tf]:n.GREATER,[Ef]:n.NOTEQUAL};function Z(C,b){if(b.type===hi&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===pn||b.magFilter===Po||b.magFilter===la||b.magFilter===is||b.minFilter===pn||b.minFilter===Po||b.minFilter===la||b.minFilter===is)&&st("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,L[b.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,L[b.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,L[b.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,j[b.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,j[b.minFilter]),b.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,le[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===mn||b.minFilter!==la&&b.minFilter!==is||b.type===hi&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){const X=e.get("EXT_texture_filter_anisotropic");n.texParameterf(C,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function F(C,b){let X=!1;C.__webglInit===void 0&&(C.__webglInit=!0,b.addEventListener("dispose",A));const ee=b.source;let me=u.get(ee);me===void 0&&(me={},u.set(ee,me));const be=N(b);if(be!==C.__cacheKey){me[be]===void 0&&(me[be]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,X=!0),me[be].usedTimes++;const _e=me[C.__cacheKey];_e!==void 0&&(me[C.__cacheKey].usedTimes--,_e.usedTimes===0&&R(b)),C.__cacheKey=be,C.__webglTexture=me[be].texture}return X}function Q(C,b,X){return Math.floor(Math.floor(C/X)/b)}function q(C,b,X,ee){const be=C.updateRanges;if(be.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,b.width,b.height,X,ee,b.data);else{be.sort((k,J)=>k.start-J.start);let _e=0;for(let k=1;k<be.length;k++){const J=be[_e],ce=be[k],Se=J.start+J.count,Pe=Q(ce.start,b.width,4),Ge=Q(J.start,b.width,4);ce.start<=Se+1&&Pe===Ge&&Q(ce.start+ce.count-1,b.width,4)===Pe?J.count=Math.max(J.count,ce.start+ce.count-J.start):(++_e,be[_e]=ce)}be.length=_e+1;const ae=t.getParameter(n.UNPACK_ROW_LENGTH),xe=t.getParameter(n.UNPACK_SKIP_PIXELS),Ie=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,b.width);for(let k=0,J=be.length;k<J;k++){const ce=be[k],Se=Math.floor(ce.start/4),Pe=Math.ceil(ce.count/4),Ge=Se%b.width,G=Math.floor(Se/b.width),we=Pe,re=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Ge),t.pixelStorei(n.UNPACK_SKIP_ROWS,G),t.texSubImage2D(n.TEXTURE_2D,0,Ge,G,we,re,X,ee,b.data)}C.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,ae),t.pixelStorei(n.UNPACK_SKIP_PIXELS,xe),t.pixelStorei(n.UNPACK_SKIP_ROWS,Ie)}}function ye(C,b,X){let ee=n.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(ee=n.TEXTURE_2D_ARRAY),b.isData3DTexture&&(ee=n.TEXTURE_3D);const me=F(C,b),be=b.source;t.bindTexture(ee,C.__webglTexture,n.TEXTURE0+X);const _e=i.get(be);if(be.version!==_e.__version||me===!0){if(t.activeTexture(n.TEXTURE0+X),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){const re=wt.getPrimaries(wt.workingColorSpace),Ee=b.colorSpace===ns?null:wt.getPrimaries(b.colorSpace),Ne=b.colorSpace===ns||re===Ee?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne)}t.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment);let xe=g(b.image,!1,s.maxTextureSize);xe=rt(b,xe);const Ie=r.convert(b.format,b.colorSpace),k=r.convert(b.type);let J=y(b.internalFormat,Ie,k,b.normalized,b.colorSpace,b.isVideoTexture);Z(ee,b);let ce;const Se=b.mipmaps,Pe=b.isVideoTexture!==!0,Ge=_e.__version===void 0||me===!0,G=be.dataReady,we=w(b,xe);if(b.isDepthTexture)J=S(b.format===bs,b.type),Ge&&(Pe?t.texStorage2D(n.TEXTURE_2D,1,J,xe.width,xe.height):t.texImage2D(n.TEXTURE_2D,0,J,xe.width,xe.height,0,Ie,k,null));else if(b.isDataTexture)if(Se.length>0){Pe&&Ge&&t.texStorage2D(n.TEXTURE_2D,we,J,Se[0].width,Se[0].height);for(let re=0,Ee=Se.length;re<Ee;re++)ce=Se[re],Pe?G&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,ce.width,ce.height,Ie,k,ce.data):t.texImage2D(n.TEXTURE_2D,re,J,ce.width,ce.height,0,Ie,k,ce.data);b.generateMipmaps=!1}else Pe?(Ge&&t.texStorage2D(n.TEXTURE_2D,we,J,xe.width,xe.height),G&&q(b,xe,Ie,k)):t.texImage2D(n.TEXTURE_2D,0,J,xe.width,xe.height,0,Ie,k,xe.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Pe&&Ge&&t.texStorage3D(n.TEXTURE_2D_ARRAY,we,J,Se[0].width,Se[0].height,xe.depth);for(let re=0,Ee=Se.length;re<Ee;re++)if(ce=Se[re],b.format!==di)if(Ie!==null)if(Pe){if(G)if(b.layerUpdates.size>0){const Ne=Vh(ce.width,ce.height,b.format,b.type);for(const oe of b.layerUpdates){const Ce=ce.data.subarray(oe*Ne/ce.data.BYTES_PER_ELEMENT,(oe+1)*Ne/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,oe,ce.width,ce.height,1,Ie,Ce)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,ce.width,ce.height,xe.depth,Ie,ce.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,re,J,ce.width,ce.height,xe.depth,0,ce.data,0,0);else st("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Pe?G&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,ce.width,ce.height,xe.depth,Ie,k,ce.data):t.texImage3D(n.TEXTURE_2D_ARRAY,re,J,ce.width,ce.height,xe.depth,0,Ie,k,ce.data)}else{Pe&&Ge&&t.texStorage2D(n.TEXTURE_2D,we,J,Se[0].width,Se[0].height);for(let re=0,Ee=Se.length;re<Ee;re++)ce=Se[re],b.format!==di?Ie!==null?Pe?G&&t.compressedTexSubImage2D(n.TEXTURE_2D,re,0,0,ce.width,ce.height,Ie,ce.data):t.compressedTexImage2D(n.TEXTURE_2D,re,J,ce.width,ce.height,0,ce.data):st("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Pe?G&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,ce.width,ce.height,Ie,k,ce.data):t.texImage2D(n.TEXTURE_2D,re,J,ce.width,ce.height,0,Ie,k,ce.data)}else if(b.isDataArrayTexture)if(Pe){if(Ge&&t.texStorage3D(n.TEXTURE_2D_ARRAY,we,J,xe.width,xe.height,xe.depth),G)if(b.layerUpdates.size>0){const re=Vh(xe.width,xe.height,b.format,b.type);for(const Ee of b.layerUpdates){const Ne=xe.data.subarray(Ee*re/xe.data.BYTES_PER_ELEMENT,(Ee+1)*re/xe.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Ee,xe.width,xe.height,1,Ie,k,Ne)}b.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,xe.width,xe.height,xe.depth,Ie,k,xe.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,J,xe.width,xe.height,xe.depth,0,Ie,k,xe.data);else if(b.isData3DTexture)Pe?(Ge&&t.texStorage3D(n.TEXTURE_3D,we,J,xe.width,xe.height,xe.depth),G&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,xe.width,xe.height,xe.depth,Ie,k,xe.data)):t.texImage3D(n.TEXTURE_3D,0,J,xe.width,xe.height,xe.depth,0,Ie,k,xe.data);else if(b.isFramebufferTexture){if(Ge)if(Pe)t.texStorage2D(n.TEXTURE_2D,we,J,xe.width,xe.height);else{let re=xe.width,Ee=xe.height;for(let Ne=0;Ne<we;Ne++)t.texImage2D(n.TEXTURE_2D,Ne,J,re,Ee,0,Ie,k,null),re>>=1,Ee>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in n){const re=n.canvas;if(re.hasAttribute("layoutsubtree")||re.setAttribute("layoutsubtree","true"),xe.parentNode!==re){re.appendChild(xe),f.add(b),re.onpaint=Ee=>{const Ne=Ee.changedElements;for(const oe of f)Ne.includes(oe.image)&&(oe.needsUpdate=!0)},re.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,xe);else{const Ne=n.RGBA,oe=n.RGBA,Ce=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Ne,oe,Ce,xe)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Se.length>0){if(Pe&&Ge){const re=Ke(Se[0]);t.texStorage2D(n.TEXTURE_2D,we,J,re.width,re.height)}for(let re=0,Ee=Se.length;re<Ee;re++)ce=Se[re],Pe?G&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,Ie,k,ce):t.texImage2D(n.TEXTURE_2D,re,J,Ie,k,ce);b.generateMipmaps=!1}else if(Pe){if(Ge){const re=Ke(xe);t.texStorage2D(n.TEXTURE_2D,we,J,re.width,re.height)}G&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Ie,k,xe)}else t.texImage2D(n.TEXTURE_2D,0,J,Ie,k,xe);p(b)&&x(ee),_e.__version=be.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function ge(C,b,X){if(b.image.length!==6)return;const ee=F(C,b),me=b.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+X);const be=i.get(me);if(me.version!==be.__version||ee===!0){t.activeTexture(n.TEXTURE0+X);const _e=wt.getPrimaries(wt.workingColorSpace),ae=b.colorSpace===ns?null:wt.getPrimaries(b.colorSpace),xe=b.colorSpace===ns||_e===ae?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);const Ie=b.isCompressedTexture||b.image[0].isCompressedTexture,k=b.image[0]&&b.image[0].isDataTexture,J=[];for(let oe=0;oe<6;oe++)!Ie&&!k?J[oe]=g(b.image[oe],!0,s.maxCubemapSize):J[oe]=k?b.image[oe].image:b.image[oe],J[oe]=rt(b,J[oe]);const ce=J[0],Se=r.convert(b.format,b.colorSpace),Pe=r.convert(b.type),Ge=y(b.internalFormat,Se,Pe,b.normalized,b.colorSpace),G=b.isVideoTexture!==!0,we=be.__version===void 0||ee===!0,re=me.dataReady;let Ee=w(b,ce);Z(n.TEXTURE_CUBE_MAP,b);let Ne;if(Ie){G&&we&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,Ge,ce.width,ce.height);for(let oe=0;oe<6;oe++){Ne=J[oe].mipmaps;for(let Ce=0;Ce<Ne.length;Ce++){const Oe=Ne[Ce];b.format!==di?Se!==null?G?re&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ce,0,0,Oe.width,Oe.height,Se,Oe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ce,Ge,Oe.width,Oe.height,0,Oe.data):st("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):G?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ce,0,0,Oe.width,Oe.height,Se,Pe,Oe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ce,Ge,Oe.width,Oe.height,0,Se,Pe,Oe.data)}}}else{if(Ne=b.mipmaps,G&&we){Ne.length>0&&Ee++;const oe=Ke(J[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,Ge,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(k){G?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,J[oe].width,J[oe].height,Se,Pe,J[oe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Ge,J[oe].width,J[oe].height,0,Se,Pe,J[oe].data);for(let Ce=0;Ce<Ne.length;Ce++){const ht=Ne[Ce].image[oe].image;G?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ce+1,0,0,ht.width,ht.height,Se,Pe,ht.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ce+1,Ge,ht.width,ht.height,0,Se,Pe,ht.data)}}else{G?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Se,Pe,J[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Ge,Se,Pe,J[oe]);for(let Ce=0;Ce<Ne.length;Ce++){const Oe=Ne[Ce];G?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ce+1,0,0,Se,Pe,Oe.image[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ce+1,Ge,Se,Pe,Oe.image[oe])}}}p(b)&&x(n.TEXTURE_CUBE_MAP),be.__version=me.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function Me(C,b,X,ee,me,be){const _e=r.convert(X.format,X.colorSpace),ae=r.convert(X.type),xe=y(X.internalFormat,_e,ae,X.normalized,X.colorSpace),Ie=i.get(b),k=i.get(X);if(k.__renderTarget=b,!Ie.__hasExternalTextures){const J=Math.max(1,b.width>>be),ce=Math.max(1,b.height>>be);me===n.TEXTURE_3D||me===n.TEXTURE_2D_ARRAY?t.texImage3D(me,be,xe,J,ce,b.depth,0,_e,ae,null):t.texImage2D(me,be,xe,J,ce,0,_e,ae,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),ke(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ee,me,k.__webglTexture,0,Re(b)):(me===n.TEXTURE_2D||me>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&me<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ee,me,k.__webglTexture,be),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Be(C,b,X){if(n.bindRenderbuffer(n.RENDERBUFFER,C),b.depthBuffer){const ee=b.depthTexture,me=ee&&ee.isDepthTexture?ee.type:null,be=S(b.stencilBuffer,me),_e=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;ke(b)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Re(b),be,b.width,b.height):X?n.renderbufferStorageMultisample(n.RENDERBUFFER,Re(b),be,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,be,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,_e,n.RENDERBUFFER,C)}else{const ee=b.textures;for(let me=0;me<ee.length;me++){const be=ee[me],_e=r.convert(be.format,be.colorSpace),ae=r.convert(be.type),xe=y(be.internalFormat,_e,ae,be.normalized,be.colorSpace);ke(b)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Re(b),xe,b.width,b.height):X?n.renderbufferStorageMultisample(n.RENDERBUFFER,Re(b),xe,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,xe,b.width,b.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Le(C,b,X){const ee=b.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const me=i.get(b.depthTexture);if(me.__renderTarget=b,(!me.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),ee){if(me.__webglInit===void 0&&(me.__webglInit=!0,b.depthTexture.addEventListener("dispose",A)),me.__webglTexture===void 0){me.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,me.__webglTexture),Z(n.TEXTURE_CUBE_MAP,b.depthTexture);const Ie=r.convert(b.depthTexture.format),k=r.convert(b.depthTexture.type);let J;b.depthTexture.format===Vi?J=n.DEPTH_COMPONENT24:b.depthTexture.format===bs&&(J=n.DEPTH24_STENCIL8);for(let ce=0;ce<6;ce++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,J,b.width,b.height,0,Ie,k,null)}}else z(b.depthTexture,0);const be=me.__webglTexture,_e=Re(b),ae=ee?n.TEXTURE_CUBE_MAP_POSITIVE_X+X:n.TEXTURE_2D,xe=b.depthTexture.format===bs?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(b.depthTexture.format===Vi)ke(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,xe,ae,be,0,_e):n.framebufferTexture2D(n.FRAMEBUFFER,xe,ae,be,0);else if(b.depthTexture.format===bs)ke(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,xe,ae,be,0,_e):n.framebufferTexture2D(n.FRAMEBUFFER,xe,ae,be,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function pe(C){const b=i.get(C),X=C.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==C.depthTexture){const ee=C.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),ee){const me=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,ee.removeEventListener("dispose",me)};ee.addEventListener("dispose",me),b.__depthDisposeCallback=me}b.__boundDepthTexture=ee}if(C.depthTexture&&!b.__autoAllocateDepthBuffer)if(X)for(let ee=0;ee<6;ee++)Le(b.__webglFramebuffer[ee],C,ee);else{const ee=C.texture.mipmaps;ee&&ee.length>0?Le(b.__webglFramebuffer[0],C,0):Le(b.__webglFramebuffer,C,0)}else if(X){b.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)if(t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[ee]),b.__webglDepthbuffer[ee]===void 0)b.__webglDepthbuffer[ee]=n.createRenderbuffer(),Be(b.__webglDepthbuffer[ee],C,!1);else{const me=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,be=b.__webglDepthbuffer[ee];n.bindRenderbuffer(n.RENDERBUFFER,be),n.framebufferRenderbuffer(n.FRAMEBUFFER,me,n.RENDERBUFFER,be)}}else{const ee=C.texture.mipmaps;if(ee&&ee.length>0?t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=n.createRenderbuffer(),Be(b.__webglDepthbuffer,C,!1);else{const me=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,be=b.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,be),n.framebufferRenderbuffer(n.FRAMEBUFFER,me,n.RENDERBUFFER,be)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function K(C,b,X){const ee=i.get(C);b!==void 0&&Me(ee.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),X!==void 0&&pe(C)}function de(C){const b=C.texture,X=i.get(C),ee=i.get(b);C.addEventListener("dispose",v);const me=C.textures,be=C.isWebGLCubeRenderTarget===!0,_e=me.length>1;if(_e||(ee.__webglTexture===void 0&&(ee.__webglTexture=n.createTexture()),ee.__version=b.version,a.memory.textures++),be){X.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(b.mipmaps&&b.mipmaps.length>0){X.__webglFramebuffer[ae]=[];for(let xe=0;xe<b.mipmaps.length;xe++)X.__webglFramebuffer[ae][xe]=n.createFramebuffer()}else X.__webglFramebuffer[ae]=n.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){X.__webglFramebuffer=[];for(let ae=0;ae<b.mipmaps.length;ae++)X.__webglFramebuffer[ae]=n.createFramebuffer()}else X.__webglFramebuffer=n.createFramebuffer();if(_e)for(let ae=0,xe=me.length;ae<xe;ae++){const Ie=i.get(me[ae]);Ie.__webglTexture===void 0&&(Ie.__webglTexture=n.createTexture(),a.memory.textures++)}if(C.samples>0&&ke(C)===!1){X.__webglMultisampledFramebuffer=n.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let ae=0;ae<me.length;ae++){const xe=me[ae];X.__webglColorRenderbuffer[ae]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,X.__webglColorRenderbuffer[ae]);const Ie=r.convert(xe.format,xe.colorSpace),k=r.convert(xe.type),J=y(xe.internalFormat,Ie,k,xe.normalized,xe.colorSpace,C.isXRRenderTarget===!0),ce=Re(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,ce,J,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.RENDERBUFFER,X.__webglColorRenderbuffer[ae])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(X.__webglDepthRenderbuffer=n.createRenderbuffer(),Be(X.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(be){t.bindTexture(n.TEXTURE_CUBE_MAP,ee.__webglTexture),Z(n.TEXTURE_CUBE_MAP,b);for(let ae=0;ae<6;ae++)if(b.mipmaps&&b.mipmaps.length>0)for(let xe=0;xe<b.mipmaps.length;xe++)Me(X.__webglFramebuffer[ae][xe],C,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,xe);else Me(X.__webglFramebuffer[ae],C,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);p(b)&&x(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(_e){for(let ae=0,xe=me.length;ae<xe;ae++){const Ie=me[ae],k=i.get(Ie);let J=n.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(J=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(J,k.__webglTexture),Z(J,Ie),Me(X.__webglFramebuffer,C,Ie,n.COLOR_ATTACHMENT0+ae,J,0),p(Ie)&&x(J)}t.unbindTexture()}else{let ae=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ae=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ae,ee.__webglTexture),Z(ae,b),b.mipmaps&&b.mipmaps.length>0)for(let xe=0;xe<b.mipmaps.length;xe++)Me(X.__webglFramebuffer[xe],C,b,n.COLOR_ATTACHMENT0,ae,xe);else Me(X.__webglFramebuffer,C,b,n.COLOR_ATTACHMENT0,ae,0);p(b)&&x(ae),t.unbindTexture()}C.depthBuffer&&pe(C)}function De(C){const b=C.textures;for(let X=0,ee=b.length;X<ee;X++){const me=b[X];if(p(me)){const be=M(C),_e=i.get(me).__webglTexture;t.bindTexture(be,_e),x(be),t.unbindTexture()}}}const B=[],ne=[];function ve(C){if(C.samples>0){if(ke(C)===!1){const b=C.textures,X=C.width,ee=C.height;let me=n.COLOR_BUFFER_BIT;const be=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,_e=i.get(C),ae=b.length>1;if(ae)for(let Ie=0;Ie<b.length;Ie++)t.bindFramebuffer(n.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,_e.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer);const xe=C.texture.mipmaps;xe&&xe.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,_e.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let Ie=0;Ie<b.length;Ie++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(me|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(me|=n.STENCIL_BUFFER_BIT)),ae){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,_e.__webglColorRenderbuffer[Ie]);const k=i.get(b[Ie]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,k,0)}n.blitFramebuffer(0,0,X,ee,0,0,X,ee,me,n.NEAREST),l===!0&&(B.length=0,ne.length=0,B.push(n.COLOR_ATTACHMENT0+Ie),C.depthBuffer&&C.resolveDepthBuffer===!1&&(B.push(be),ne.push(be),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,ne)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,B))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ae)for(let Ie=0;Ie<b.length;Ie++){t.bindFramebuffer(n.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.RENDERBUFFER,_e.__webglColorRenderbuffer[Ie]);const k=i.get(b[Ie]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,_e.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.TEXTURE_2D,k,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const b=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[b])}}}function Re(C){return Math.min(s.maxSamples,C.samples)}function ke(C){const b=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function O(C){const b=a.render.frame;h.get(C)!==b&&(h.set(C,b),C.update())}function rt(C,b){const X=C.colorSpace,ee=C.format,me=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||X!==so&&X!==ns&&(wt.getTransfer(X)===It?(ee!==di||me!==$n)&&st("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):_t("WebGLTextures: Unsupported texture color space:",X)),b}function Ke(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=$,this.getTextureUnits=se,this.setTextureUnits=V,this.setTexture2D=z,this.setTexture2DArray=U,this.setTexture3D=W,this.setTextureCube=te,this.rebindTextures=K,this.setupRenderTarget=de,this.updateRenderTargetMipmap=De,this.updateMultisampleRenderTarget=ve,this.setupDepthRenderbuffer=pe,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=ke,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function jy(n,e){function t(i,s=ns){let r;const a=wt.getTransfer(s);if(i===$n)return n.UNSIGNED_BYTE;if(i===gc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===vc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Ud)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===kd)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Dd)return n.BYTE;if(i===Nd)return n.SHORT;if(i===qr)return n.UNSIGNED_SHORT;if(i===mc)return n.INT;if(i===Ei)return n.UNSIGNED_INT;if(i===hi)return n.FLOAT;if(i===Hi)return n.HALF_FLOAT;if(i===Od)return n.ALPHA;if(i===Fd)return n.RGB;if(i===di)return n.RGBA;if(i===Vi)return n.DEPTH_COMPONENT;if(i===bs)return n.DEPTH_STENCIL;if(i===yc)return n.RED;if(i===xc)return n.RED_INTEGER;if(i===Ss)return n.RG;if(i===bc)return n.RG_INTEGER;if(i===_c)return n.RGBA_INTEGER;if(i===Va||i===Wa||i===$a||i===Xa)if(a===It)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Va)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Wa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===$a)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Xa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Va)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Wa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===$a)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Xa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Tl||i===El||i===Rl||i===Cl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Tl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===El)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Rl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Cl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Pl||i===Il||i===Ll||i===Dl||i===Nl||i===no||i===Ul)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Pl||i===Il)return a===It?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Ll)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Dl)return r.COMPRESSED_R11_EAC;if(i===Nl)return r.COMPRESSED_SIGNED_R11_EAC;if(i===no)return r.COMPRESSED_RG11_EAC;if(i===Ul)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===kl||i===Ol||i===Fl||i===Bl||i===zl||i===Gl||i===Hl||i===Vl||i===Wl||i===$l||i===Xl||i===ql||i===Yl||i===Zl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===kl)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ol)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Fl)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Bl)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===zl)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Gl)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Hl)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Vl)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Wl)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===$l)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Xl)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ql)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Yl)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Zl)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Kl||i===Jl||i===jl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Kl)return a===It?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Jl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===jl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ql||i===ec||i===io||i===tc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Ql)return r.COMPRESSED_RED_RGTC1_EXT;if(i===ec)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===io)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===tc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Yr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Qy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,e1=`
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

}`;class t1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Yd(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new An({vertexShader:Qy,fragmentShader:e1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new yt(new ti(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class n1 extends Ts{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,f=null,d=null,u=null,m=null;const _=typeof XRWebGLBinding<"u",g=new t1,p={},x=t.getContextAttributes();let M=null,y=null;const S=[],w=[],A=new Ae;let v=null;const E=new Wn;E.viewport=new Vt;const R=new Wn;R.viewport=new Vt;const P=[E,R],D=new um;let $=null,se=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(F){let Q=S[F];return Q===void 0&&(Q=new ko,S[F]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(F){let Q=S[F];return Q===void 0&&(Q=new ko,S[F]=Q),Q.getGripSpace()},this.getHand=function(F){let Q=S[F];return Q===void 0&&(Q=new ko,S[F]=Q),Q.getHandSpace()};function V(F){const Q=w.indexOf(F.inputSource);if(Q===-1)return;const q=S[Q];q!==void 0&&(q.update(F.inputSource,F.frame,c||a),q.dispatchEvent({type:F.type,data:F.inputSource}))}function H(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",N);for(let F=0;F<S.length;F++){const Q=w[F];Q!==null&&(w[F]=null,S[F].disconnect(Q))}$=null,se=null,g.reset();for(const F in p)delete p[F];e.setRenderTarget(M),u=null,d=null,f=null,s=null,y=null,Z.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(F){r=F,i.isPresenting===!0&&st("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(F){o=F,i.isPresenting===!0&&st("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(F){c=F},this.getBaseLayer=function(){return d!==null?d:u},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(F){if(s=F,s!==null){if(M=e.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",H),s.addEventListener("inputsourceschange",N),x.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(A),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let q=null,ye=null,ge=null;x.depth&&(ge=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,q=x.stencil?bs:Vi,ye=x.stencil?Yr:Ei);const Me={colorFormat:t.RGBA8,depthFormat:ge,scaleFactor:r};f=this.getBinding(),d=f.createProjectionLayer(Me),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Ti(d.textureWidth,d.textureHeight,{format:di,type:$n,depthTexture:new mr(d.textureWidth,d.textureHeight,ye,void 0,void 0,void 0,void 0,void 0,void 0,q),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const q={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};u=new XRWebGLLayer(s,t,q),s.updateRenderState({baseLayer:u}),e.setPixelRatio(1),e.setSize(u.framebufferWidth,u.framebufferHeight,!1),y=new Ti(u.framebufferWidth,u.framebufferHeight,{format:di,type:$n,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Z.setContext(s),Z.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function N(F){for(let Q=0;Q<F.removed.length;Q++){const q=F.removed[Q],ye=w.indexOf(q);ye>=0&&(w[ye]=null,S[ye].disconnect(q))}for(let Q=0;Q<F.added.length;Q++){const q=F.added[Q];let ye=w.indexOf(q);if(ye===-1){for(let Me=0;Me<S.length;Me++)if(Me>=w.length){w.push(q),ye=Me;break}else if(w[Me]===null){w[Me]=q,ye=Me;break}if(ye===-1)break}const ge=S[ye];ge&&ge.connect(q)}}const z=new I,U=new I;function W(F,Q,q){z.setFromMatrixPosition(Q.matrixWorld),U.setFromMatrixPosition(q.matrixWorld);const ye=z.distanceTo(U),ge=Q.projectionMatrix.elements,Me=q.projectionMatrix.elements,Be=ge[14]/(ge[10]-1),Le=ge[14]/(ge[10]+1),pe=(ge[9]+1)/ge[5],K=(ge[9]-1)/ge[5],de=(ge[8]-1)/ge[0],De=(Me[8]+1)/Me[0],B=Be*de,ne=Be*De,ve=ye/(-de+De),Re=ve*-de;if(Q.matrixWorld.decompose(F.position,F.quaternion,F.scale),F.translateX(Re),F.translateZ(ve),F.matrixWorld.compose(F.position,F.quaternion,F.scale),F.matrixWorldInverse.copy(F.matrixWorld).invert(),ge[10]===-1)F.projectionMatrix.copy(Q.projectionMatrix),F.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const ke=Be+ve,O=Le+ve,rt=B-Re,Ke=ne+(ye-Re),C=pe*Le/O*ke,b=K*Le/O*ke;F.projectionMatrix.makePerspective(rt,Ke,C,b,ke,O),F.projectionMatrixInverse.copy(F.projectionMatrix).invert()}}function te(F,Q){Q===null?F.matrixWorld.copy(F.matrix):F.matrixWorld.multiplyMatrices(Q.matrixWorld,F.matrix),F.matrixWorldInverse.copy(F.matrixWorld).invert()}this.updateCamera=function(F){if(s===null)return;let Q=F.near,q=F.far;g.texture!==null&&(g.depthNear>0&&(Q=g.depthNear),g.depthFar>0&&(q=g.depthFar)),D.near=R.near=E.near=Q,D.far=R.far=E.far=q,($!==D.near||se!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),$=D.near,se=D.far),D.layers.mask=F.layers.mask|6,E.layers.mask=D.layers.mask&-5,R.layers.mask=D.layers.mask&-3;const ye=F.parent,ge=D.cameras;te(D,ye);for(let Me=0;Me<ge.length;Me++)te(ge[Me],ye);ge.length===2?W(D,E,R):D.projectionMatrix.copy(E.projectionMatrix),L(F,D,ye)};function L(F,Q,q){q===null?F.matrix.copy(Q.matrixWorld):(F.matrix.copy(q.matrixWorld),F.matrix.invert(),F.matrix.multiply(Q.matrixWorld)),F.matrix.decompose(F.position,F.quaternion,F.scale),F.updateMatrixWorld(!0),F.projectionMatrix.copy(Q.projectionMatrix),F.projectionMatrixInverse.copy(Q.projectionMatrixInverse),F.isPerspectiveCamera&&(F.fov=Kr*2*Math.atan(1/F.projectionMatrix.elements[5]),F.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(d===null&&u===null))return l},this.setFoveation=function(F){l=F,d!==null&&(d.fixedFoveation=F),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=F)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(D)},this.getCameraTexture=function(F){return p[F]};let j=null;function le(F,Q){if(h=Q.getViewerPose(c||a),m=Q,h!==null){const q=h.views;u!==null&&(e.setRenderTargetFramebuffer(y,u.framebuffer),e.setRenderTarget(y));let ye=!1;q.length!==D.cameras.length&&(D.cameras.length=0,ye=!0);for(let Le=0;Le<q.length;Le++){const pe=q[Le];let K=null;if(u!==null)K=u.getViewport(pe);else{const De=f.getViewSubImage(d,pe);K=De.viewport,Le===0&&(e.setRenderTargetTextures(y,De.colorTexture,De.depthStencilTexture),e.setRenderTarget(y))}let de=P[Le];de===void 0&&(de=new Wn,de.layers.enable(Le),de.viewport=new Vt,P[Le]=de),de.matrix.fromArray(pe.transform.matrix),de.matrix.decompose(de.position,de.quaternion,de.scale),de.projectionMatrix.fromArray(pe.projectionMatrix),de.projectionMatrixInverse.copy(de.projectionMatrix).invert(),de.viewport.set(K.x,K.y,K.width,K.height),Le===0&&(D.matrix.copy(de.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),ye===!0&&D.cameras.push(de)}const ge=s.enabledFeatures;if(ge&&ge.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){f=i.getBinding();const Le=f.getDepthInformation(q[0]);Le&&Le.isValid&&Le.texture&&g.init(Le,s.renderState)}if(ge&&ge.includes("camera-access")&&_){e.state.unbindTexture(),f=i.getBinding();for(let Le=0;Le<q.length;Le++){const pe=q[Le].camera;if(pe){let K=p[pe];K||(K=new Yd,p[pe]=K);const de=f.getCameraImage(pe);K.sourceTexture=de}}}}for(let q=0;q<S.length;q++){const ye=w[q],ge=S[q];ye!==null&&ge!==void 0&&ge.update(ye,Q,c||a)}j&&j(F,Q),Q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Q}),m=null}const Z=new ou;Z.setAnimationLoop(le),this.setAnimationLoop=function(F){j=F},this.dispose=function(){}}}const i1=new Rt,pu=new lt;pu.set(-1,0,0,0,1,0,0,0,1);function s1(n,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,su(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,x,M,y){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),f(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&u(g,p,y)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,x,M):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Bn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Bn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const x=e.get(p),M=x.envMap,y=x.envMapRotation;M&&(g.envMap.value=M,g.envMapRotation.value.setFromMatrix4(i1.makeRotationFromEuler(y)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(pu),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,x,M){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*x,g.scale.value=M*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function f(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function u(g,p,x){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Bn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){const x=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function r1(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,S){const w=S.program;i.uniformBlockBinding(y,w)}function c(y,S){let w=s[y.id];w===void 0&&(g(y),w=h(y),s[y.id]=w,y.addEventListener("dispose",x));const A=S.program;i.updateUBOMapping(y,A);const v=e.render.frame;r[y.id]!==v&&(d(y),r[y.id]=v)}function h(y){const S=f();y.__bindingPointIndex=S;const w=n.createBuffer(),A=y.__size,v=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,w),n.bufferData(n.UNIFORM_BUFFER,A,v),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,S,w),w}function f(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return _t("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const S=s[y.id],w=y.uniforms,A=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,S);for(let v=0,E=w.length;v<E;v++){const R=w[v];if(Array.isArray(R))for(let P=0,D=R.length;P<D;P++)u(R[P],v,P,A);else u(R,v,0,A)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function u(y,S,w,A){if(_(y,S,w,A)===!0){const v=y.__offset,E=y.value;if(Array.isArray(E)){let R=0;for(let P=0;P<E.length;P++){const D=E[P],$=p(D);m(D,y.__data,R),typeof D!="number"&&typeof D!="boolean"&&!D.isMatrix3&&!ArrayBuffer.isView(D)&&(R+=$.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(E,y.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,v,y.__data)}}function m(y,S,w){typeof y=="number"||typeof y=="boolean"?S[0]=y:y.isMatrix3?(S[0]=y.elements[0],S[1]=y.elements[1],S[2]=y.elements[2],S[3]=0,S[4]=y.elements[3],S[5]=y.elements[4],S[6]=y.elements[5],S[7]=0,S[8]=y.elements[6],S[9]=y.elements[7],S[10]=y.elements[8],S[11]=0):ArrayBuffer.isView(y)?S.set(new y.constructor(y.buffer,y.byteOffset,S.length)):y.toArray(S,w)}function _(y,S,w,A){const v=y.value,E=S+"_"+w;if(A[E]===void 0)return typeof v=="number"||typeof v=="boolean"?A[E]=v:ArrayBuffer.isView(v)?A[E]=v.slice():A[E]=v.clone(),!0;{const R=A[E];if(typeof v=="number"||typeof v=="boolean"){if(R!==v)return A[E]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(R.equals(v)===!1)return R.copy(v),!0}}return!1}function g(y){const S=y.uniforms;let w=0;const A=16;for(let E=0,R=S.length;E<R;E++){const P=Array.isArray(S[E])?S[E]:[S[E]];for(let D=0,$=P.length;D<$;D++){const se=P[D],V=Array.isArray(se.value)?se.value:[se.value];for(let H=0,N=V.length;H<N;H++){const z=V[H],U=p(z),W=w%A,te=W%U.boundary,L=W+te;w+=te,L!==0&&A-L<U.storage&&(w+=A-L),se.__data=new Float32Array(U.storage/Float32Array.BYTES_PER_ELEMENT),se.__offset=w,w+=U.storage}}}const v=w%A;return v>0&&(w+=A-v),y.__size=w,y.__cache={},this}function p(y){const S={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(S.boundary=4,S.storage=4):y.isVector2?(S.boundary=8,S.storage=8):y.isVector3||y.isColor?(S.boundary=16,S.storage=12):y.isVector4?(S.boundary=16,S.storage=16):y.isMatrix3?(S.boundary=48,S.storage=48):y.isMatrix4?(S.boundary=64,S.storage=64):y.isTexture?st("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(S.boundary=16,S.storage=y.byteLength):st("WebGLRenderer: Unsupported uniform value type.",y),S}function x(y){const S=y.target;S.removeEventListener("dispose",x);const w=a.indexOf(S.__bindingPointIndex);a.splice(w,1),n.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function M(){for(const y in s)n.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:l,update:c,dispose:M}}const a1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let mi=null;function o1(){return mi===null&&(mi=new Cs(a1,16,16,Ss,Hi),mi.name="DFG_LUT",mi.minFilter=pn,mi.magFilter=pn,mi.wrapS=Oi,mi.wrapT=Oi,mi.generateMipmaps=!1,mi.needsUpdate=!0),mi}class l1{constructor(e={}){const{canvas:t=Pf(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:u=$n}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;const _=u,g=new Set([_c,bc,xc]),p=new Set([$n,Ei,qr,Yr,gc,vc]),x=new Uint32Array(4),M=new Int32Array(4),y=new I;let S=null,w=null;const A=[],v=[];let E=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Si,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const R=this;let P=!1,D=null,$=null,se=null,V=null;this._outputColorSpace=_n;let H=0,N=0,z=null,U=-1,W=null;const te=new Vt,L=new Vt;let j=null;const le=new it(0);let Z=0,F=t.width,Q=t.height,q=1,ye=null,ge=null;const Me=new Vt(0,0,F,Q),Be=new Vt(0,0,F,Q);let Le=!1;const pe=new Ec;let K=!1,de=!1;const De=new Rt,B=new I,ne=new Vt,ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Re=!1;function ke(){return z===null?q:1}let O=i;function rt(T,Y){return t.getContext(T,Y)}try{const T={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${fc}`),t.addEventListener("webglcontextlost",ht,!1),t.addEventListener("webglcontextrestored",ie,!1),t.addEventListener("webglcontextcreationerror",Te,!1),O===null){const Y="webgl2";if(O=rt(Y,T),O===null)throw rt(Y)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(T){throw _t("WebGLRenderer: "+T.message),T}let Ke,C,b,X,ee,me,be,_e,ae,xe,Ie,k,J,ce,Se,Pe,Ge,G,we,re,Ee,Ne,oe;function Ce(){Ke=new ov(O),Ke.init(),Ee=new jy(O,Ke),C=new Qg(O,Ke,e,Ee),b=new Ky(O,Ke),C.reversedDepthBuffer&&d&&b.buffers.depth.setReversed(!0),$=O.createFramebuffer(),se=O.createFramebuffer(),V=O.createFramebuffer(),X=new hv(O),ee=new ky,me=new Jy(O,Ke,b,ee,C,Ee,X),be=new av(R),_e=new pm(O),Ne=new Jg(O,_e),ae=new lv(O,_e,X,Ne),xe=new uv(O,ae,_e,Ne,X),G=new dv(O,C,me),Se=new ev(ee),Ie=new Uy(R,be,Ke,C,Ne,Se),k=new s1(R,ee),J=new Fy,ce=new Wy(Ke),Ge=new Kg(R,be,b,xe,m,l),Pe=new Zy(R,xe,C),oe=new r1(O,X,C,b),we=new jg(O,Ke,X),re=new cv(O,Ke,X),X.programs=Ie.programs,R.capabilities=C,R.extensions=Ke,R.properties=ee,R.renderLists=J,R.shadowMap=Pe,R.state=b,R.info=X}Ce(),_!==$n&&(E=new pv(_,t.width,t.height,o,s,r));const Oe=new n1(R,O);this.xr=Oe,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const T=Ke.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Ke.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(T){T!==void 0&&(q=T,this.setSize(F,Q,!1))},this.getSize=function(T){return T.set(F,Q)},this.setSize=function(T,Y,fe=!0){if(Oe.isPresenting){st("WebGLRenderer: Can't change size while VR device is presenting.");return}F=T,Q=Y,t.width=Math.floor(T*q),t.height=Math.floor(Y*q),fe===!0&&(t.style.width=T+"px",t.style.height=Y+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,T,Y)},this.getDrawingBufferSize=function(T){return T.set(F*q,Q*q).floor()},this.setDrawingBufferSize=function(T,Y,fe){F=T,Q=Y,q=fe,t.width=Math.floor(T*fe),t.height=Math.floor(Y*fe),this.setViewport(0,0,T,Y)},this.setEffects=function(T){if(_===$n){_t("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let Y=0;Y<T.length;Y++)if(T[Y].isOutputPass===!0){st("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(te)},this.getViewport=function(T){return T.copy(Me)},this.setViewport=function(T,Y,fe,he){T.isVector4?Me.set(T.x,T.y,T.z,T.w):Me.set(T,Y,fe,he),b.viewport(te.copy(Me).multiplyScalar(q).round())},this.getScissor=function(T){return T.copy(Be)},this.setScissor=function(T,Y,fe,he){T.isVector4?Be.set(T.x,T.y,T.z,T.w):Be.set(T,Y,fe,he),b.scissor(L.copy(Be).multiplyScalar(q).round())},this.getScissorTest=function(){return Le},this.setScissorTest=function(T){b.setScissorTest(Le=T)},this.setOpaqueSort=function(T){ye=T},this.setTransparentSort=function(T){ge=T},this.getClearColor=function(T){return T.copy(Ge.getClearColor())},this.setClearColor=function(){Ge.setClearColor(...arguments)},this.getClearAlpha=function(){return Ge.getClearAlpha()},this.setClearAlpha=function(){Ge.setClearAlpha(...arguments)},this.clear=function(T=!0,Y=!0,fe=!0){let he=0;if(T){let ue=!1;if(z!==null){const Ve=z.texture.format;ue=g.has(Ve)}if(ue){const Ve=z.texture.type,qe=p.has(Ve),He=Ge.getClearColor(),Je=Ge.getClearAlpha(),Qe=He.r,ct=He.g,ft=He.b;qe?(x[0]=Qe,x[1]=ct,x[2]=ft,x[3]=Je,O.clearBufferuiv(O.COLOR,0,x)):(M[0]=Qe,M[1]=ct,M[2]=ft,M[3]=Je,O.clearBufferiv(O.COLOR,0,M))}else he|=O.COLOR_BUFFER_BIT}Y&&(he|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),fe&&(he|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),he!==0&&O.clear(he)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),D=T},this.dispose=function(){t.removeEventListener("webglcontextlost",ht,!1),t.removeEventListener("webglcontextrestored",ie,!1),t.removeEventListener("webglcontextcreationerror",Te,!1),Ge.dispose(),J.dispose(),ce.dispose(),ee.dispose(),be.dispose(),xe.dispose(),Ne.dispose(),oe.dispose(),Ie.dispose(),Oe.dispose(),Oe.removeEventListener("sessionstart",ot),Oe.removeEventListener("sessionend",xt),je.stop()};function ht(T){T.preventDefault(),oo("WebGLRenderer: Context Lost."),P=!0}function ie(){oo("WebGLRenderer: Context Restored."),P=!1;const T=X.autoReset,Y=Pe.enabled,fe=Pe.autoUpdate,he=Pe.needsUpdate,ue=Pe.type;Ce(),X.autoReset=T,Pe.enabled=Y,Pe.autoUpdate=fe,Pe.needsUpdate=he,Pe.type=ue}function Te(T){_t("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Ue(T){const Y=T.target;Y.removeEventListener("dispose",Ue),$e(Y)}function $e(T){We(T),ee.remove(T)}function We(T){const Y=ee.get(T).programs;Y!==void 0&&(Y.forEach(function(fe){Ie.releaseProgram(fe)}),T.isShaderMaterial&&Ie.releaseShaderCache(T))}this.renderBufferDirect=function(T,Y,fe,he,ue,Ve){Y===null&&(Y=ve);const qe=ue.isMesh&&ue.matrixWorld.determinantAffine()<0,He=aa(T,Y,fe,he,ue);b.setMaterial(he,qe);let Je=fe.index,Qe=1;if(he.wireframe===!0){if(Je=ae.getWireframeAttribute(fe),Je===void 0)return;Qe=2}const ct=fe.drawRange,ft=fe.attributes.position;let et=ct.start*Qe,Dt=(ct.start+ct.count)*Qe;Ve!==null&&(et=Math.max(et,Ve.start*Qe),Dt=Math.min(Dt,(Ve.start+Ve.count)*Qe)),Je!==null?(et=Math.max(et,0),Dt=Math.min(Dt,Je.count)):ft!=null&&(et=Math.max(et,0),Dt=Math.min(Dt,ft.count));const Yt=Dt-et;if(Yt<0||Yt===1/0)return;Ne.setup(ue,he,He,fe,Je);let $t,Ut=we;if(Je!==null&&($t=_e.get(Je),Ut=re,Ut.setIndex($t)),ue.isMesh)he.wireframe===!0?(b.setLineWidth(he.wireframeLinewidth*ke()),Ut.setMode(O.LINES)):Ut.setMode(O.TRIANGLES);else if(ue.isLine){let vn=he.linewidth;vn===void 0&&(vn=1),b.setLineWidth(vn*ke()),ue.isLineSegments?Ut.setMode(O.LINES):ue.isLineLoop?Ut.setMode(O.LINE_LOOP):Ut.setMode(O.LINE_STRIP)}else ue.isPoints?Ut.setMode(O.POINTS):ue.isSprite&&Ut.setMode(O.TRIANGLES);if(ue.isBatchedMesh)if(Ke.get("WEBGL_multi_draw"))Ut.renderMultiDraw(ue._multiDrawStarts,ue._multiDrawCounts,ue._multiDrawCount);else{const vn=ue._multiDrawStarts,Xe=ue._multiDrawCounts,zn=ue._multiDrawCount,At=Je?_e.get(Je).bytesPerElement:1,qn=ee.get(he).currentProgram.getUniforms();for(let fi=0;fi<zn;fi++)qn.setValue(O,"_gl_DrawID",fi),Ut.render(vn[fi]/At,Xe[fi])}else if(ue.isInstancedMesh)Ut.renderInstances(et,Yt,ue.count);else if(fe.isInstancedBufferGeometry){const vn=fe._maxInstanceCount!==void 0?fe._maxInstanceCount:1/0,Xe=Math.min(fe.instanceCount,vn);Ut.renderInstances(et,Yt,Xe)}else Ut.render(et,Yt)};function tt(T,Y,fe){T.transparent===!0&&T.side===On&&T.forceSinglePass===!1?(T.side=Bn,T.needsUpdate=!0,Pi(T,Y,fe),T.side=os,T.needsUpdate=!0,Pi(T,Y,fe),T.side=On):Pi(T,Y,fe)}this.compile=function(T,Y,fe=null){fe===null&&(fe=T),w=ce.get(fe),w.init(Y),v.push(w),fe.traverseVisible(function(ue){ue.isLight&&ue.layers.test(Y.layers)&&(w.pushLight(ue),ue.castShadow&&w.pushShadow(ue))}),T!==fe&&T.traverseVisible(function(ue){ue.isLight&&ue.layers.test(Y.layers)&&(w.pushLight(ue),ue.castShadow&&w.pushShadow(ue))}),w.setupLights();const he=new Set;return T.traverse(function(ue){if(!(ue.isMesh||ue.isPoints||ue.isLine||ue.isSprite))return;const Ve=ue.material;if(Ve)if(Array.isArray(Ve))for(let qe=0;qe<Ve.length;qe++){const He=Ve[qe];tt(He,fe,ue),he.add(He)}else tt(Ve,fe,ue),he.add(Ve)}),w=v.pop(),he},this.compileAsync=function(T,Y,fe=null){const he=this.compile(T,Y,fe);return new Promise(ue=>{function Ve(){if(he.forEach(function(qe){ee.get(qe).currentProgram.isReady()&&he.delete(qe)}),he.size===0){ue(T);return}setTimeout(Ve,10)}Ke.get("KHR_parallel_shader_compile")!==null?Ve():setTimeout(Ve,10)})};let at=null;function mt(T){at&&at(T)}function ot(){je.stop()}function xt(){je.start()}const je=new ou;je.setAnimationLoop(mt),typeof self<"u"&&je.setContext(self),this.setAnimationLoop=function(T){at=T,Oe.setAnimationLoop(T),T===null?je.stop():je.start()},Oe.addEventListener("sessionstart",ot),Oe.addEventListener("sessionend",xt),this.render=function(T,Y){if(Y!==void 0&&Y.isCamera!==!0){_t("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;D!==null&&D.renderStart(T,Y);const fe=Oe.enabled===!0&&Oe.isPresenting===!0,he=E!==null&&(z===null||fe)&&E.begin(R,z);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),Oe.enabled===!0&&Oe.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Oe.cameraAutoUpdate===!0&&Oe.updateCamera(Y),Y=Oe.getCamera()),T.isScene===!0&&T.onBeforeRender(R,T,Y,z),w=ce.get(T,v.length),w.init(Y),w.state.textureUnits=me.getTextureUnits(),v.push(w),De.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),pe.setFromProjectionMatrix(De,wi,Y.reversedDepth),de=this.localClippingEnabled,K=Se.init(this.clippingPlanes,de),S=J.get(T,A.length),S.init(),A.push(S),Oe.enabled===!0&&Oe.isPresenting===!0){const qe=R.xr.getDepthSensingMesh();qe!==null&&nn(qe,Y,-1/0,R.sortObjects)}nn(T,Y,0,R.sortObjects),S.finish(),R.sortObjects===!0&&S.sort(ye,ge,Y.reversedDepth),Re=Oe.enabled===!1||Oe.isPresenting===!1||Oe.hasDepthSensing()===!1,Re&&Ge.addToRenderList(S,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),K===!0&&Se.beginShadows();const ue=w.state.shadowsArray;if(Pe.render(ue,T,Y),K===!0&&Se.endShadows(),(he&&E.hasRenderPass())===!1){const qe=S.opaque,He=S.transmissive;if(w.setupLights(),Y.isArrayCamera){const Je=Y.cameras;if(He.length>0)for(let Qe=0,ct=Je.length;Qe<ct;Qe++){const ft=Je[Qe];jt(qe,He,T,ft)}Re&&Ge.render(T);for(let Qe=0,ct=Je.length;Qe<ct;Qe++){const ft=Je[Qe];zt(S,T,ft,ft.viewport)}}else He.length>0&&jt(qe,He,T,Y),Re&&Ge.render(T),zt(S,T,Y)}z!==null&&N===0&&(me.updateMultisampleRenderTarget(z),me.updateRenderTargetMipmap(z)),he&&E.end(R),T.isScene===!0&&T.onAfterRender(R,T,Y),Ne.resetDefaultState(),U=-1,W=null,v.pop(),v.length>0?(w=v[v.length-1],me.setTextureUnits(w.state.textureUnits),K===!0&&Se.setGlobalState(R.clippingPlanes,w.state.camera)):w=null,A.pop(),A.length>0?S=A[A.length-1]:S=null,D!==null&&D.renderEnd()};function nn(T,Y,fe,he){if(T.visible===!1)return;if(T.layers.test(Y.layers)){if(T.isGroup)fe=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(Y);else if(T.isLightProbeGrid)w.pushLightProbeGrid(T);else if(T.isLight)w.pushLight(T),T.castShadow&&w.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||pe.intersectsSprite(T)){he&&ne.setFromMatrixPosition(T.matrixWorld).applyMatrix4(De);const qe=xe.update(T),He=T.material;He.visible&&S.push(T,qe,He,fe,ne.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||pe.intersectsObject(T))){const qe=xe.update(T),He=T.material;if(he&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),ne.copy(T.boundingSphere.center)):(qe.boundingSphere===null&&qe.computeBoundingSphere(),ne.copy(qe.boundingSphere.center)),ne.applyMatrix4(T.matrixWorld).applyMatrix4(De)),Array.isArray(He)){const Je=qe.groups;for(let Qe=0,ct=Je.length;Qe<ct;Qe++){const ft=Je[Qe],et=He[ft.materialIndex];et&&et.visible&&S.push(T,qe,et,fe,ne.z,ft)}}else He.visible&&S.push(T,qe,He,fe,ne.z,null)}}const Ve=T.children;for(let qe=0,He=Ve.length;qe<He;qe++)nn(Ve[qe],Y,fe,he)}function zt(T,Y,fe,he){const{opaque:ue,transmissive:Ve,transparent:qe}=T;w.setupLightsView(fe),K===!0&&Se.setGlobalState(R.clippingPlanes,fe),he&&b.viewport(te.copy(he)),ue.length>0&&Tn(ue,Y,fe),Ve.length>0&&Tn(Ve,Y,fe),qe.length>0&&Tn(qe,Y,fe),b.buffers.depth.setTest(!0),b.buffers.depth.setMask(!0),b.buffers.color.setMask(!0),b.setPolygonOffset(!1)}function jt(T,Y,fe,he){if((fe.isScene===!0?fe.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[he.id]===void 0){const et=Ke.has("EXT_color_buffer_half_float")||Ke.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[he.id]=new Ti(1,1,{generateMipmaps:!0,type:et?Hi:$n,minFilter:is,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:wt.workingColorSpace})}const Ve=w.state.transmissionRenderTarget[he.id],qe=he.viewport||te;Ve.setSize(qe.z*R.transmissionResolutionScale,qe.w*R.transmissionResolutionScale);const He=R.getRenderTarget(),Je=R.getActiveCubeFace(),Qe=R.getActiveMipmapLevel();R.setRenderTarget(Ve),R.getClearColor(le),Z=R.getClearAlpha(),Z<1&&R.setClearColor(16777215,.5),R.clear(),Re&&Ge.render(fe);const ct=R.toneMapping;R.toneMapping=Si;const ft=he.viewport;if(he.viewport!==void 0&&(he.viewport=void 0),w.setupLightsView(he),K===!0&&Se.setGlobalState(R.clippingPlanes,he),Tn(T,fe,he),me.updateMultisampleRenderTarget(Ve),me.updateRenderTargetMipmap(Ve),Ke.has("WEBGL_multisampled_render_to_texture")===!1){let et=!1;for(let Dt=0,Yt=Y.length;Dt<Yt;Dt++){const $t=Y[Dt],{object:Ut,geometry:vn,material:Xe,group:zn}=$t;if(Xe.side===On&&Ut.layers.test(he.layers)){const At=Xe.side;Xe.side=Bn,Xe.needsUpdate=!0,En(Ut,fe,he,vn,Xe,zn),Xe.side=At,Xe.needsUpdate=!0,et=!0}}et===!0&&(me.updateMultisampleRenderTarget(Ve),me.updateRenderTargetMipmap(Ve))}R.setRenderTarget(He,Je,Qe),R.setClearColor(le,Z),ft!==void 0&&(he.viewport=ft),R.toneMapping=ct}function Tn(T,Y,fe){const he=Y.isScene===!0?Y.overrideMaterial:null;for(let ue=0,Ve=T.length;ue<Ve;ue++){const qe=T[ue],{object:He,geometry:Je,group:Qe}=qe;let ct=qe.material;ct.allowOverride===!0&&he!==null&&(ct=he),He.layers.test(fe.layers)&&En(He,Y,fe,Je,ct,Qe)}}function En(T,Y,fe,he,ue,Ve){T.onBeforeRender(R,Y,fe,he,ue,Ve),T.modelViewMatrix.multiplyMatrices(fe.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),ue.onBeforeRender(R,Y,fe,he,T,Ve),ue.transparent===!0&&ue.side===On&&ue.forceSinglePass===!1?(ue.side=Bn,ue.needsUpdate=!0,R.renderBufferDirect(fe,Y,he,ue,T,Ve),ue.side=os,ue.needsUpdate=!0,R.renderBufferDirect(fe,Y,he,ue,T,Ve),ue.side=On):R.renderBufferDirect(fe,Y,he,ue,T,Ve),T.onAfterRender(R,Y,fe,he,ue,Ve)}function Pi(T,Y,fe){Y.isScene!==!0&&(Y=ve);const he=ee.get(T),ue=w.state.lights,Ve=w.state.shadowsArray,qe=ue.state.version,He=Ie.getParameters(T,ue.state,Ve,Y,fe,w.state.lightProbeGridArray),Je=Ie.getProgramCacheKey(He);let Qe=he.programs;he.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?Y.environment:null,he.fog=Y.fog;const ct=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;he.envMap=be.get(T.envMap||he.environment,ct),he.envMapRotation=he.environment!==null&&T.envMap===null?Y.environmentRotation:T.envMapRotation,Qe===void 0&&(T.addEventListener("dispose",Ue),Qe=new Map,he.programs=Qe);let ft=Qe.get(Je);if(ft!==void 0){if(he.currentProgram===ft&&he.lightsStateVersion===qe)return hs(T,He),ft}else He.uniforms=Ie.getUniforms(T),D!==null&&T.isNodeMaterial&&D.build(T,fe,He),T.onBeforeCompile(He,R),ft=Ie.acquireProgram(He,Je),Qe.set(Je,ft),he.uniforms=He.uniforms;const et=he.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(et.clippingPlanes=Se.uniform),hs(T,He),he.needsLights=gn(T),he.lightsStateVersion=qe,he.needsLights&&(et.ambientLightColor.value=ue.state.ambient,et.lightProbe.value=ue.state.probe,et.directionalLights.value=ue.state.directional,et.directionalLightShadows.value=ue.state.directionalShadow,et.spotLights.value=ue.state.spot,et.spotLightShadows.value=ue.state.spotShadow,et.rectAreaLights.value=ue.state.rectArea,et.ltc_1.value=ue.state.rectAreaLTC1,et.ltc_2.value=ue.state.rectAreaLTC2,et.pointLights.value=ue.state.point,et.pointLightShadows.value=ue.state.pointShadow,et.hemisphereLights.value=ue.state.hemi,et.directionalShadowMatrix.value=ue.state.directionalShadowMatrix,et.spotLightMatrix.value=ue.state.spotLightMatrix,et.spotLightMap.value=ue.state.spotLightMap,et.pointShadowMatrix.value=ue.state.pointShadowMatrix),he.lightProbeGrid=w.state.lightProbeGridArray.length>0,he.currentProgram=ft,he.uniformsList=null,ft}function _r(T){if(T.uniformsList===null){const Y=T.currentProgram.getUniforms();T.uniformsList=qa.seqWithValue(Y.seq,T.uniforms)}return T.uniformsList}function hs(T,Y){const fe=ee.get(T);fe.outputColorSpace=Y.outputColorSpace,fe.batching=Y.batching,fe.batchingColor=Y.batchingColor,fe.instancing=Y.instancing,fe.instancingColor=Y.instancingColor,fe.instancingMorph=Y.instancingMorph,fe.skinning=Y.skinning,fe.morphTargets=Y.morphTargets,fe.morphNormals=Y.morphNormals,fe.morphColors=Y.morphColors,fe.morphTargetsCount=Y.morphTargetsCount,fe.numClippingPlanes=Y.numClippingPlanes,fe.numIntersection=Y.numClipIntersection,fe.vertexAlphas=Y.vertexAlphas,fe.vertexTangents=Y.vertexTangents,fe.toneMapping=Y.toneMapping}function ra(T,Y){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;y.setFromMatrixPosition(Y.matrixWorld);for(let fe=0,he=T.length;fe<he;fe++){const ue=T[fe];if(ue.texture!==null&&ue.boundingBox.containsPoint(y))return ue}return null}function aa(T,Y,fe,he,ue){Y.isScene!==!0&&(Y=ve),me.resetTextureUnits();const Ve=Y.fog,qe=he.isMeshStandardMaterial||he.isMeshLambertMaterial||he.isMeshPhongMaterial?Y.environment:null,He=z===null?R.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:wt.workingColorSpace,Je=he.isMeshStandardMaterial||he.isMeshLambertMaterial&&!he.envMap||he.isMeshPhongMaterial&&!he.envMap,Qe=be.get(he.envMap||qe,Je),ct=he.vertexColors===!0&&!!fe.attributes.color&&fe.attributes.color.itemSize===4,ft=!!fe.attributes.tangent&&(!!he.normalMap||he.anisotropy>0),et=!!fe.morphAttributes.position,Dt=!!fe.morphAttributes.normal,Yt=!!fe.morphAttributes.color;let $t=Si;he.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&($t=R.toneMapping);const Ut=fe.morphAttributes.position||fe.morphAttributes.normal||fe.morphAttributes.color,vn=Ut!==void 0?Ut.length:0,Xe=ee.get(he),zn=w.state.lights;if(K===!0&&(de===!0||T!==W)){const Ft=T===W&&he.id===U;Se.setState(he,T,Ft)}let At=!1;he.version===Xe.__version?(Xe.needsLights&&Xe.lightsStateVersion!==zn.state.version||Xe.outputColorSpace!==He||ue.isBatchedMesh&&Xe.batching===!1||!ue.isBatchedMesh&&Xe.batching===!0||ue.isBatchedMesh&&Xe.batchingColor===!0&&ue.colorTexture===null||ue.isBatchedMesh&&Xe.batchingColor===!1&&ue.colorTexture!==null||ue.isInstancedMesh&&Xe.instancing===!1||!ue.isInstancedMesh&&Xe.instancing===!0||ue.isSkinnedMesh&&Xe.skinning===!1||!ue.isSkinnedMesh&&Xe.skinning===!0||ue.isInstancedMesh&&Xe.instancingColor===!0&&ue.instanceColor===null||ue.isInstancedMesh&&Xe.instancingColor===!1&&ue.instanceColor!==null||ue.isInstancedMesh&&Xe.instancingMorph===!0&&ue.morphTexture===null||ue.isInstancedMesh&&Xe.instancingMorph===!1&&ue.morphTexture!==null||Xe.envMap!==Qe||he.fog===!0&&Xe.fog!==Ve||Xe.numClippingPlanes!==void 0&&(Xe.numClippingPlanes!==Se.numPlanes||Xe.numIntersection!==Se.numIntersection)||Xe.vertexAlphas!==ct||Xe.vertexTangents!==ft||Xe.morphTargets!==et||Xe.morphNormals!==Dt||Xe.morphColors!==Yt||Xe.toneMapping!==$t||Xe.morphTargetsCount!==vn||!!Xe.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(At=!0):(At=!0,Xe.__version=he.version);let qn=Xe.currentProgram;At===!0&&(qn=Pi(he,Y,ue),D&&he.isNodeMaterial&&D.onUpdateProgram(he,qn,Xe));let fi=!1,$i=!1,Is=!1;const kt=qn.getUniforms(),Zt=Xe.uniforms;if(b.useProgram(qn.program)&&(fi=!0,$i=!0,Is=!0),he.id!==U&&(U=he.id,$i=!0),Xe.needsLights){const Ft=ra(w.state.lightProbeGridArray,ue);Xe.lightProbeGrid!==Ft&&(Xe.lightProbeGrid=Ft,$i=!0)}if(fi||W!==T){b.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),kt.setValue(O,"projectionMatrix",T.projectionMatrix),kt.setValue(O,"viewMatrix",T.matrixWorldInverse);const qi=kt.map.cameraPosition;qi!==void 0&&qi.setValue(O,B.setFromMatrixPosition(T.matrixWorld)),C.logarithmicDepthBuffer&&kt.setValue(O,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(he.isMeshPhongMaterial||he.isMeshToonMaterial||he.isMeshLambertMaterial||he.isMeshBasicMaterial||he.isMeshStandardMaterial||he.isShaderMaterial)&&kt.setValue(O,"isOrthographic",T.isOrthographicCamera===!0),W!==T&&(W=T,$i=!0,Is=!0)}if(Xe.needsLights&&(zn.state.directionalShadowMap.length>0&&kt.setValue(O,"directionalShadowMap",zn.state.directionalShadowMap,me),zn.state.spotShadowMap.length>0&&kt.setValue(O,"spotShadowMap",zn.state.spotShadowMap,me),zn.state.pointShadowMap.length>0&&kt.setValue(O,"pointShadowMap",zn.state.pointShadowMap,me)),ue.isSkinnedMesh){kt.setOptional(O,ue,"bindMatrix"),kt.setOptional(O,ue,"bindMatrixInverse");const Ft=ue.skeleton;Ft&&(Ft.boneTexture===null&&Ft.computeBoneTexture(),kt.setValue(O,"boneTexture",Ft.boneTexture,me))}ue.isBatchedMesh&&(kt.setOptional(O,ue,"batchingTexture"),kt.setValue(O,"batchingTexture",ue._matricesTexture,me),kt.setOptional(O,ue,"batchingIdTexture"),kt.setValue(O,"batchingIdTexture",ue._indirectTexture,me),kt.setOptional(O,ue,"batchingColorTexture"),ue._colorsTexture!==null&&kt.setValue(O,"batchingColorTexture",ue._colorsTexture,me));const Xi=fe.morphAttributes;if((Xi.position!==void 0||Xi.normal!==void 0||Xi.color!==void 0)&&G.update(ue,fe,qn),($i||Xe.receiveShadow!==ue.receiveShadow)&&(Xe.receiveShadow=ue.receiveShadow,kt.setValue(O,"receiveShadow",ue.receiveShadow)),(he.isMeshStandardMaterial||he.isMeshLambertMaterial||he.isMeshPhongMaterial)&&he.envMap===null&&Y.environment!==null&&(Zt.envMapIntensity.value=Y.environmentIntensity),Zt.dfgLUT!==void 0&&(Zt.dfgLUT.value=o1()),$i){if(kt.setValue(O,"toneMappingExposure",R.toneMappingExposure),Xe.needsLights&&Nt(Zt,Is),Ve&&he.fog===!0&&k.refreshFogUniforms(Zt,Ve),k.refreshMaterialUniforms(Zt,he,q,Q,w.state.transmissionRenderTarget[T.id]),Xe.needsLights&&Xe.lightProbeGrid){const Ft=Xe.lightProbeGrid;Zt.probesSH.value=Ft.texture,Zt.probesMin.value.copy(Ft.boundingBox.min),Zt.probesMax.value.copy(Ft.boundingBox.max),Zt.probesResolution.value.copy(Ft.resolution)}qa.upload(O,_r(Xe),Zt,me)}if(he.isShaderMaterial&&he.uniformsNeedUpdate===!0&&(qa.upload(O,_r(Xe),Zt,me),he.uniformsNeedUpdate=!1),he.isSpriteMaterial&&kt.setValue(O,"center",ue.center),kt.setValue(O,"modelViewMatrix",ue.modelViewMatrix),kt.setValue(O,"normalMatrix",ue.normalMatrix),kt.setValue(O,"modelMatrix",ue.matrixWorld),he.uniformsGroups!==void 0){const Ft=he.uniformsGroups;for(let qi=0,Ls=Ft.length;qi<Ls;qi++){const $c=Ft[qi];oe.update($c,qn),oe.bind($c,qn)}}return qn}function Nt(T,Y){T.ambientLightColor.needsUpdate=Y,T.lightProbe.needsUpdate=Y,T.directionalLights.needsUpdate=Y,T.directionalLightShadows.needsUpdate=Y,T.pointLights.needsUpdate=Y,T.pointLightShadows.needsUpdate=Y,T.spotLights.needsUpdate=Y,T.spotLightShadows.needsUpdate=Y,T.rectAreaLights.needsUpdate=Y,T.hemisphereLights.needsUpdate=Y}function gn(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return z},this.setRenderTargetTextures=function(T,Y,fe){const he=ee.get(T);he.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,he.__autoAllocateDepthBuffer===!1&&(he.__useRenderToTexture=!1),ee.get(T.texture).__webglTexture=Y,ee.get(T.depthTexture).__webglTexture=he.__autoAllocateDepthBuffer?void 0:fe,he.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,Y){const fe=ee.get(T);fe.__webglFramebuffer=Y,fe.__useDefaultFramebuffer=Y===void 0},this.setRenderTarget=function(T,Y=0,fe=0){z=T,H=Y,N=fe;let he=null,ue=!1,Ve=!1;if(T){const He=ee.get(T);if(He.__useDefaultFramebuffer!==void 0){b.bindFramebuffer(O.FRAMEBUFFER,He.__webglFramebuffer),te.copy(T.viewport),L.copy(T.scissor),j=T.scissorTest,b.viewport(te),b.scissor(L),b.setScissorTest(j),U=-1;return}else if(He.__webglFramebuffer===void 0)me.setupRenderTarget(T);else if(He.__hasExternalTextures)me.rebindTextures(T,ee.get(T.texture).__webglTexture,ee.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const ct=T.depthTexture;if(He.__boundDepthTexture!==ct){if(ct!==null&&ee.has(ct)&&(T.width!==ct.image.width||T.height!==ct.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");me.setupDepthRenderbuffer(T)}}const Je=T.texture;(Je.isData3DTexture||Je.isDataArrayTexture||Je.isCompressedArrayTexture)&&(Ve=!0);const Qe=ee.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Qe[Y])?he=Qe[Y][fe]:he=Qe[Y],ue=!0):T.samples>0&&me.useMultisampledRTT(T)===!1?he=ee.get(T).__webglMultisampledFramebuffer:Array.isArray(Qe)?he=Qe[fe]:he=Qe,te.copy(T.viewport),L.copy(T.scissor),j=T.scissorTest}else te.copy(Me).multiplyScalar(q).floor(),L.copy(Be).multiplyScalar(q).floor(),j=Le;if(fe!==0&&(he=$),b.bindFramebuffer(O.FRAMEBUFFER,he)&&b.drawBuffers(T,he),b.viewport(te),b.scissor(L),b.setScissorTest(j),ue){const He=ee.get(T.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+Y,He.__webglTexture,fe)}else if(Ve){const He=Y;for(let Je=0;Je<T.textures.length;Je++){const Qe=ee.get(T.textures[Je]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Je,Qe.__webglTexture,fe,He)}}else if(T!==null&&fe!==0){const He=ee.get(T.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,He.__webglTexture,fe)}U=-1},this.readRenderTargetPixels=function(T,Y,fe,he,ue,Ve,qe,He=0){if(!(T&&T.isWebGLRenderTarget)){_t("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Je=ee.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&qe!==void 0&&(Je=Je[qe]),Je){b.bindFramebuffer(O.FRAMEBUFFER,Je);try{const Qe=T.textures[He],ct=Qe.format,ft=Qe.type;if(T.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+He),!C.textureFormatReadable(ct)){_t("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!C.textureTypeReadable(ft)){_t("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=T.width-he&&fe>=0&&fe<=T.height-ue&&O.readPixels(Y,fe,he,ue,Ee.convert(ct),Ee.convert(ft),Ve)}finally{const Qe=z!==null?ee.get(z).__webglFramebuffer:null;b.bindFramebuffer(O.FRAMEBUFFER,Qe)}}},this.readRenderTargetPixelsAsync=async function(T,Y,fe,he,ue,Ve,qe,He=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Je=ee.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&qe!==void 0&&(Je=Je[qe]),Je)if(Y>=0&&Y<=T.width-he&&fe>=0&&fe<=T.height-ue){b.bindFramebuffer(O.FRAMEBUFFER,Je);const Qe=T.textures[He],ct=Qe.format,ft=Qe.type;if(T.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+He),!C.textureFormatReadable(ct))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!C.textureTypeReadable(ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const et=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,et),O.bufferData(O.PIXEL_PACK_BUFFER,Ve.byteLength,O.STREAM_READ),O.readPixels(Y,fe,he,ue,Ee.convert(ct),Ee.convert(ft),0);const Dt=z!==null?ee.get(z).__webglFramebuffer:null;b.bindFramebuffer(O.FRAMEBUFFER,Dt);const Yt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await If(O,Yt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,et),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,Ve),O.deleteBuffer(et),O.deleteSync(Yt),Ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,Y=null,fe=0){const he=Math.pow(2,-fe),ue=Math.floor(T.image.width*he),Ve=Math.floor(T.image.height*he),qe=Y!==null?Y.x:0,He=Y!==null?Y.y:0;me.setTexture2D(T,0),O.copyTexSubImage2D(O.TEXTURE_2D,fe,0,0,qe,He,ue,Ve),b.unbindTexture()},this.copyTextureToTexture=function(T,Y,fe=null,he=null,ue=0,Ve=0){let qe,He,Je,Qe,ct,ft,et,Dt,Yt;const $t=T.isCompressedTexture?T.mipmaps[Ve]:T.image;if(fe!==null)qe=fe.max.x-fe.min.x,He=fe.max.y-fe.min.y,Je=fe.isBox3?fe.max.z-fe.min.z:1,Qe=fe.min.x,ct=fe.min.y,ft=fe.isBox3?fe.min.z:0;else{const Zt=Math.pow(2,-ue);qe=Math.floor($t.width*Zt),He=Math.floor($t.height*Zt),T.isDataArrayTexture?Je=$t.depth:T.isData3DTexture?Je=Math.floor($t.depth*Zt):Je=1,Qe=0,ct=0,ft=0}he!==null?(et=he.x,Dt=he.y,Yt=he.z):(et=0,Dt=0,Yt=0);const Ut=Ee.convert(Y.format),vn=Ee.convert(Y.type);let Xe;Y.isData3DTexture?(me.setTexture3D(Y,0),Xe=O.TEXTURE_3D):Y.isDataArrayTexture||Y.isCompressedArrayTexture?(me.setTexture2DArray(Y,0),Xe=O.TEXTURE_2D_ARRAY):(me.setTexture2D(Y,0),Xe=O.TEXTURE_2D),b.activeTexture(O.TEXTURE0),b.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,Y.flipY),b.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),b.pixelStorei(O.UNPACK_ALIGNMENT,Y.unpackAlignment);const zn=b.getParameter(O.UNPACK_ROW_LENGTH),At=b.getParameter(O.UNPACK_IMAGE_HEIGHT),qn=b.getParameter(O.UNPACK_SKIP_PIXELS),fi=b.getParameter(O.UNPACK_SKIP_ROWS),$i=b.getParameter(O.UNPACK_SKIP_IMAGES);b.pixelStorei(O.UNPACK_ROW_LENGTH,$t.width),b.pixelStorei(O.UNPACK_IMAGE_HEIGHT,$t.height),b.pixelStorei(O.UNPACK_SKIP_PIXELS,Qe),b.pixelStorei(O.UNPACK_SKIP_ROWS,ct),b.pixelStorei(O.UNPACK_SKIP_IMAGES,ft);const Is=T.isDataArrayTexture||T.isData3DTexture,kt=Y.isDataArrayTexture||Y.isData3DTexture;if(T.isDepthTexture){const Zt=ee.get(T),Xi=ee.get(Y),Ft=ee.get(Zt.__renderTarget),qi=ee.get(Xi.__renderTarget);b.bindFramebuffer(O.READ_FRAMEBUFFER,Ft.__webglFramebuffer),b.bindFramebuffer(O.DRAW_FRAMEBUFFER,qi.__webglFramebuffer);for(let Ls=0;Ls<Je;Ls++)Is&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,ee.get(T).__webglTexture,ue,ft+Ls),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,ee.get(Y).__webglTexture,Ve,Yt+Ls)),O.blitFramebuffer(Qe,ct,qe,He,et,Dt,qe,He,O.DEPTH_BUFFER_BIT,O.NEAREST);b.bindFramebuffer(O.READ_FRAMEBUFFER,null),b.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(ue!==0||T.isRenderTargetTexture||ee.has(T)){const Zt=ee.get(T),Xi=ee.get(Y);b.bindFramebuffer(O.READ_FRAMEBUFFER,se),b.bindFramebuffer(O.DRAW_FRAMEBUFFER,V);for(let Ft=0;Ft<Je;Ft++)Is?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Zt.__webglTexture,ue,ft+Ft):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Zt.__webglTexture,ue),kt?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Xi.__webglTexture,Ve,Yt+Ft):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Xi.__webglTexture,Ve),ue!==0?O.blitFramebuffer(Qe,ct,qe,He,et,Dt,qe,He,O.COLOR_BUFFER_BIT,O.NEAREST):kt?O.copyTexSubImage3D(Xe,Ve,et,Dt,Yt+Ft,Qe,ct,qe,He):O.copyTexSubImage2D(Xe,Ve,et,Dt,Qe,ct,qe,He);b.bindFramebuffer(O.READ_FRAMEBUFFER,null),b.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else kt?T.isDataTexture||T.isData3DTexture?O.texSubImage3D(Xe,Ve,et,Dt,Yt,qe,He,Je,Ut,vn,$t.data):Y.isCompressedArrayTexture?O.compressedTexSubImage3D(Xe,Ve,et,Dt,Yt,qe,He,Je,Ut,$t.data):O.texSubImage3D(Xe,Ve,et,Dt,Yt,qe,He,Je,Ut,vn,$t):T.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,Ve,et,Dt,qe,He,Ut,vn,$t.data):T.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,Ve,et,Dt,$t.width,$t.height,Ut,$t.data):O.texSubImage2D(O.TEXTURE_2D,Ve,et,Dt,qe,He,Ut,vn,$t);b.pixelStorei(O.UNPACK_ROW_LENGTH,zn),b.pixelStorei(O.UNPACK_IMAGE_HEIGHT,At),b.pixelStorei(O.UNPACK_SKIP_PIXELS,qn),b.pixelStorei(O.UNPACK_SKIP_ROWS,fi),b.pixelStorei(O.UNPACK_SKIP_IMAGES,$i),Ve===0&&Y.generateMipmaps&&O.generateMipmap(Xe),b.unbindTexture()},this.initRenderTarget=function(T){ee.get(T).__webglFramebuffer===void 0&&me.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?me.setTextureCube(T,0):T.isData3DTexture?me.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?me.setTexture2DArray(T,0):me.setTexture2D(T,0),b.unbindTexture()},this.resetState=function(){H=0,N=0,z=null,b.reset(),Ne.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=wt._getDrawingBufferColorSpace(e),t.unpackColorSpace=wt._getUnpackColorSpace()}}const Cn=(n,e,t)=>{const i=Ze.clamp((t-n)/(e-n),0,1);return i*i*(3-2*i)};function sr(n,e,t=2){const i=new rn,s=-n/2,r=-e/2;return i.moveTo(s+t,r),i.lineTo(s+n-t,r),i.quadraticCurveTo(s+n,r,s+n,r+t),i.lineTo(s+n,r+e-t),i.quadraticCurveTo(s+n,r+e,s+n-t,r+e),i.lineTo(s+t,r+e),i.quadraticCurveTo(s,r+e,s,r+e-t),i.lineTo(s,r+t),i.quadraticCurveTo(s,r,s+t,r),i}function Ya(n,e,t,i,s,r=1){const a=new wn(sr(i,s,r).getPoints(32).map(o=>o.add(new Ae(e,t))));n.holes.push(a)}function c1(n,e,t,i=2,s=[]){const r=sr(n,e,i);for(const o of s)Ya(r,...o);const a=new Xn(r,{depth:t,bevelEnabled:!0,bevelSegments:5,steps:1,bevelSize:Math.min(.28,t*.2),bevelThickness:Math.min(.4,t*.2),curveSegments:32});return a.rotateX(-Math.PI/2),a.translate(0,-t/2,0),a.computeVertexNormals(),a}function ud(n=!1){const e=document.createElement("canvas");e.width=e.height=1024;const t=e.getContext("2d"),i=t.createImageData(1024,1024);let s=37;const r=()=>(s=s*1664525+1013904223>>>0,s/4294967296),a=Array.from({length:1024},()=>r());for(let l=0;l<1024;l++)for(let c=0;c<1024;c++){const h=(l*1024+c)*4,f=n?150+a[l]*55+r()*16:150+r()*65;i.data[h]=i.data[h+1]=i.data[h+2]=f,i.data[h+3]=255}t.putImageData(i,0,0);const o=new uo(e);return o.wrapS=o.wrapT=ls,o.repeat.set(2,2),o.anisotropy=16,o}function h1(){const n=new St;n.name="Sealed instrument";const e=ud(!0),t=ud(),i={aluminium:new kn({color:4738898,metalness:.94,roughness:.49,roughnessMap:e,bumpMap:e,bumpScale:.045,anisotropy:.75,anisotropyRotation:Math.PI/2,clearcoat:.16,clearcoatRoughness:.42}),edge:new kn({color:11580597,metalness:1,roughness:.27,roughnessMap:e,anisotropy:.6}),dark:new kn({color:1514011,metalness:.45,roughness:.49,roughnessMap:e,anisotropy:.5}),black:new kn({color:527116,metalness:.16,roughness:.6,roughnessMap:t,bumpMap:t,bumpScale:.028,clearcoat:.2,clearcoatRoughness:.5}),pcb:new kn({color:1517092,metalness:.24,roughness:.63,roughnessMap:t}),chip:new Ct({color:1053460,roughness:.76,roughnessMap:t}),gold:new Ct({color:9995354,metalness:.82,roughness:.43}),ceramic:new Ct({color:6512985,roughness:.7}),silk:new Kt({color:10660518})},s=[],r=new Set,a={};function o(B,ne,ve,Re=[0,0,0]){const ke=new yt(ne,ve);return ke.position.set(...Re),ke.castShadow=ke.receiveShadow=!0,B.add(ke),ke}function l(B,ne,ve,Re,ke,O=[0,0,0],rt=2,Ke=[]){return o(B,c1(ne,ve,Re,rt,Ke),ke,O)}function c(B,ne,ve,Re,ke,O=64){return o(B,new sn(ne,ne,ve,O,1),Re,ke)}function h(B,ne,ve,Re,ke){const O=new St;return O.name=B,O.position.set(...ne),n.add(O),s.push({g:O,base:new I(...ne),offset:new I(...ve),start:Re,end:ke}),a[B]=O,O}function f(B,ne,ve,Re,ke,O="#b4b9b7",rt=40){const Ke=document.createElement("canvas");Ke.width=1024,Ke.height=256;const C=Ke.getContext("2d");C.clearRect(0,0,1024,256),C.fillStyle=O,C.font=`${rt}px monospace`,C.textBaseline="middle",C.fillText(ne,24,128);const b=new uo(Ke);b.colorSpace=_n;const X=new Kt({map:b,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}),ee=o(B,new ti(ve,Re),X,ke);return ee.rotation.x=-Math.PI/2,ee}function d(B,ne){const ve=new St;ve.position.set(...ne),B.add(ve),c(ve,1.1,7,i.edge,[0,-2,0]);const Re=sr(4.6,4.6,2.2),ke=new wn;for(let rt=0;rt<6;rt++){const Ke=rt*Math.PI/3;rt?ke.lineTo(Math.cos(Ke)*.87,Math.sin(Ke)*.87):ke.moveTo(Math.cos(Ke)*.87,Math.sin(Ke)*.87)}ke.closePath(),Re.holes.push(ke);const O=new Xn(Re,{depth:1.1,bevelEnabled:!0,bevelSegments:4,bevelSize:.15,bevelThickness:.15,curveSegments:32});O.rotateX(-Math.PI/2),o(ve,O,i.edge),c(ve,.85,.1,i.chip,[0,.05,0]);for(let rt=0;rt<7;rt++){const Ke=o(ve,new xr(1.12,.12,8,32),i.dark,[0,-5+rt*.65,0]);Ke.rotation.x=Math.PI/2}return ve}const u=[[-77,-50],[77,-50],[-77,50],[77,50]],m=h("Chassis",[0,-12,0],[0,-38,0],.23,.63);l(m,172,118,3,i.dark,[0,0,0],6,u.map(([B,ne])=>[B,ne,3,3,1.4]));const _=sr(172,118,6);Ya(_,0,0,167,113,4.5);const g=new Xn(_,{depth:29,bevelEnabled:!0,bevelSegments:5,bevelSize:.4,bevelThickness:.35,curveSegments:32});g.rotateX(-Math.PI/2),o(m,g,i.aluminium,[0,1,0]);for(const[B,ne]of u)c(m,3.5,10,i.aluminium,[B,7,ne]),c(m,1.3,.1,i.chip,[B,12.1,ne]);for(const[B,ne]of[[-65,-40],[65,-40],[-65,40],[65,40]])l(m,15,12,2,i.black,[B,-3,ne],3);f(m,"ASTRA   /   SB—09",65,16,[-38,2.1,27],"#939b9b",39);const p=h("Enclosure",[0,20.5,0],[-16,97,-24],.04,.43),x=[];for(let B=0;B<18;B++)x.push([-55+B*3.3,-29,1.8,29,.8]);l(p,172,118,2.5,i.aluminium,[0,0,0],6,[...x,...u.map(([B,ne])=>[B,ne,5.4,5.4,2.6])]);const M=sr(165,111,4);Ya(M,0,0,162,108,3);const y=new Xn(M,{depth:2,bevelEnabled:!0,bevelSegments:3,bevelSize:.2,bevelThickness:.2,curveSegments:32});y.rotateX(-Math.PI/2),o(p,y,i.dark,[0,-3.6,0]),f(p,"A S T R A",45,11,[-52,1.69,29],"#303536",56),f(p,"SEALED EXECUTION INSTRUMENT",65,10,[-42,1.7,40],"#424849",25),f(p,"SB–09 / 001",27,7,[62,1.7,42],"#44494a",37);for(const[B,ne]of u){const ve=h("Fastener "+B+","+ne,[B,22.5,ne],[-16,118,-24],0,.25);d(ve,[0,0,0])}const S=h("Logic board",[0,-3,0],[-8,25,8],.2,.55);l(S,153,100,1.7,i.pcb,[0,0,0],3,u.map(([B,ne])=>[B*.92,ne*.9,3,3,1.4]));const w=document.createElement("canvas");w.width=2048,w.height=1365;const A=w.getContext("2d");A.clearRect(0,0,w.width,w.height),A.strokeStyle="#5a6960",A.lineWidth=1.6;for(let B=0;B<74;B++){const ne=70+B*137%1860,ve=90+B*173%1170;A.beginPath(),A.moveTo(ne,ve),A.lineTo(ne+30,ve),A.lineTo(ne+65,ve+35),A.lineTo(ne+115,ve+35),A.stroke(),A.beginPath(),A.arc(ne,ve,3,0,Math.PI*2),A.stroke()}A.strokeStyle="#bac2ae",A.fillStyle="#bec5b7",A.font="15px monospace";for(let B=0;B<38;B++){const ne=80+B*173%1820,ve=80+B*131%1130;A.strokeRect(ne,ve,52,27),A.fillText("R"+(102+B),ne,ve-8)}A.font="21px monospace",A.fillText("ASTRA  /  SANDBOX CONTROLLER",85,1250),A.fillText("REV 09.3   •   94V–0",1530,1250);const v=new uo(w);v.colorSpace=_n;const E=o(S,new ti(152,99),new Kt({map:v,transparent:!0,depthWrite:!1}),[0,1.34,0]);E.rotation.x=-Math.PI/2;for(let B=0;B<60;B++){const ne=-65+B*19.7%130,ve=-41+B*13.1%82;if(!(ne>6&&ve>-29&&ve<40)){l(S,2.8,1.5,1,i.ceramic,[ne,1.8,ve],.15);for(const Re of[-1.5,1.5])l(S,.6,1.65,.9,i.edge,[ne+Re,1.7,ve],.1)}}for(const[B,ne,ve,Re]of[[-50,-24,15,15],[-21,-25,12,16],[-45,22,18,17],[0,38,13,10],[-65,8,8,12]]){l(S,ve,Re,2,i.chip,[B,2.2,ne],.7),f(S,"U"+Math.round(B*B+ne*ne),ve,Re/2,[B,3.5,ne],"#89918a",62);for(let ke=0;ke<8;ke++)for(const O of[-1,1])l(S,2,.55,.45,i.edge,[B+O*(ve/2+.8),1.6,ne-Re/2+1+ke*(Re-2)/7],.1)}for(let B=0;B<7;B++)c(S,2.8,6,i.dark,[-67+B*8,4,-39]),c(S,2.45,.3,i.edge,[-67+B*8,7.15,-39]);const R=h("Connector bank",[0,0,-46],[10,20,-53],.29,.62);l(R,128,11,1.5,i.pcb,[0,0,0],1);for(let B=0;B<4;B++){const ne=-44+B*26,ve=sr(18,10,1);Ya(ve,0,0,14.5,7,.7);const Re=new Xn(ve,{depth:11,bevelEnabled:!0,bevelSize:.25,bevelThickness:.25,bevelSegments:4,curveSegments:24});o(R,Re,i.edge,[ne,6,-6]),l(R,13,8,1.2,i.chip,[ne,3,-1],.5);for(let ke=0;ke<7;ke++)l(R,.65,6,.4,i.gold,[ne-4.5+ke*1.5,4,-2],.1)}const P=h("Thermal array",[-43,9,-17],[-53,47,-12],.3,.64);l(P,47,39,2.5,i.dark,[0,0,0],2);for(let B=0;B<14;B++)l(P,1.15,36,8,i.aluminium,[-21+B*3.2,5,0],.48);for(const B of[-18,18])d(P,[B,1.7,16]);const D=h("RF shield",[-43,8,27],[-39,37,48],.34,.67);l(D,37,29,1,i.edge,[0,4,0],2);for(const B of[-18,18])l(D,1,28,7,i.aluminium,[B,0,0],.3);for(const B of[-14,14])l(D,36,1,7,i.aluminium,[0,0,B],.3);f(D,"RF / 02",28,8,[0,4.8,0],"#545b5c",58);const $=h("Sealed core",[35,9,8],[110,48,15],.38,.77),se=i.black.clone();se.color.setHex(1053717),se.roughness=.44,se.metalness=.1,se.envMapIntensity=.32,se.clearcoat=.1,l($,62,67,13,se,[0,0,0],4),f($,"A S T R A   /   0 9",43,8,[-4,6.94,-22],"#7e8989",39),f($,"SANDBOX",37,8,[-7,6.95,20],"#4f5a59",37);const V=new Ct({color:12122071,emissive:7794357,emissiveIntensity:2,roughness:.38});l($,3.5,.65,.08,V,[22,6.96,22],.3);const H=l(m,13,4.5,.7,i.black,[60,13,59.6],1);H.rotation.x=Math.PI/2;for(const B of[57,63]){const ne=o(m,new Gi(.9,20,12),V,[B,13,60.25]);ne.name="Front status LED"}const N=new lm(10485714,.4,12,2);N.position.set(22,8,22),$.add(N);const z=new St;z.name="Socketed power cartridge",$.add(z);const U=new Ct({color:2639166,metalness:.2,roughness:.63});l(z,52,42,.8,U,[0,7.5,-2],2);for(const B of[-22,22])for(const ne of[-18,14])c(z,1.55,.65,i.edge,[B,8.3,ne],24),c(z,.68,.7,i.chip,[B,8.6,ne],16);const W=new Ct({color:3357499,emissive:16717320,emissiveIntensity:0,roughness:.52,metalness:.15}),te=l(z,15,17,1.6,W,[3,8.9,-3],1);te.name="Faulty power regulator";for(const B of[-6,12])for(let ne=0;ne<7;ne++)l(z,2,.6,.45,i.gold,[B,8.2,-10+ne*2.25],.1);for(const[B,ne]of[[-15,-8],[-15,4],[17,6]]){l(z,7,7,1.3,i.chip,[B,8.7,ne],1);for(let ve=0;ve<4;ve++)l(z,5,.35,.3,i.edge,[B,9.5,ne-1.5+ve],.1)}for(let B=0;B<9;B++)l(z,2.4,4,.2,i.gold,[-18+B*4.5,7.95,17],.1);f(z,"PWR–03  /  SERVICE",29,4,[0,8.1,-17],"#c3d1c5",30);const L=W.clone();L.color.setHex(3427397),L.emissive.setHex(5627824),L.emissiveIntensity=.22;const j=U.clone();j.emissive.setHex(1461305),j.emissiveIntensity=.15;const le=V.clone(),Z=$.clone(!0);Z.name="Replacement power cartridge",n.add(Z),Z.traverse(B=>{B.material===W&&(B.material=L,B.name="Replacement power regulator"),B.material===U&&(B.material=j),B.material===V&&(B.material=le),B.isLight&&(B.intensity=0)}),a["Faulty cartridge"]=$,a["Replacement cartridge"]=Z;const F=new Ps({color:13496063,transparent:!0,opacity:0,depthWrite:!1,toneMapped:!1}),Q=F.clone(),q=[];for(let B=0;B<3;B++){const ne=new Mt;ne.setAttribute("position",new pt(new Float32Array(27),3));const ve=new Vr(ne,Q);ve.name="Regulator discharge "+B,ve.frustumCulled=!1,$.add(ve),q.push(ve)}const ye=[];for(let B=0;B<5;B++){const ne=new Mt;ne.setAttribute("position",new pt(new Float32Array(45),3));const ve=new Vr(ne,F);ve.name="Enclosure seam discharge "+B,ve.frustumCulled=!1,n.add(ve),ye.push(ve)}const ge=new Uint8Array(1024*4);for(let B=0;B<32;B++)for(let ne=0;ne<32;ne++){const ve=(B*32+ne)*4,Re=Math.hypot((ne-15.5)/15.5,(B-15.5)/15.5);ge[ve]=ge[ve+1]=ge[ve+2]=255,ge[ve+3]=Math.round(255*Math.max(0,1-Re*Re)**3)}const Me=new Cs(ge,32,32);Me.needsUpdate=!0,Me.magFilter=pn;const Be=[];for(let B=0;B<8;B++){const ne=new $d({map:Me,color:12896715,transparent:!0,opacity:0,depthWrite:!1}),ve=new fp(ne);ve.name="Fault smoke "+B,$.add(ve),Be.push(ve)}for(const B of s)B.g!==$&&B.g.traverse(ne=>{if(ne.material)for(const ve of[ne.material].flat())r.add(ve)});const Le=new Map([...r].map(B=>[B,{color:B.color.clone(),env:B.envMapIntensity,roughness:B.roughness}])),pe=new rm({color:6846069,transparent:!0,opacity:0,dashSize:1,gapSize:2,depthWrite:!1}),K=s.filter(B=>!B.g.name.startsWith("Fastener")).map(B=>{const ne=new Mt().setFromPoints([B.base,B.base]),ve=new Vr(ne,pe);return n.add(ve),{p:B,line:ve}});function de(B,ne=0,ve={}){B=Ze.clamp(Number.isFinite(B)?B:0,0,1),ne=Number.isFinite(ne)?ne:0;const Re=be=>Ze.clamp(Number.isFinite(be)?be:0,0,1),ke=Re(ve.fault),O=Re(ve.repair);for(const[be,_e]of s.entries()){_e.g.position.copy(_e.base).addScaledVector(_e.offset,Cn(_e.start,_e.end,B));const ae=Cn(_e.start,_e.end,B);_e.g.position.y+=Math.sin(ne*.65+be*1.7)*ae*.9,_e.g.position.x+=Math.sin(ne*.39+be*2.1)*ae*.35}const rt=Cn(.72,.85,B)*(1-.65*Math.max(ke,O));for(const[be,_e]of Le)be.color.copy(_e.color).multiplyScalar(1-rt*.94),_e.env!==void 0&&(be.envMapIntensity=_e.env*(1-rt*.9)),_e.roughness!==void 0&&(be.roughness=Ze.lerp(_e.roughness,.9,rt));const Ke=Cn(.03,.52,O),C=Cn(.36,.93,O);Z.position.copy($.position).add(new I(2300*(1-C),45*(1-C),-18*(1-C))),Z.rotation.z=-.12*(1-C),Z.visible=O>.3,$.position.x-=2300*Ke,$.position.y+=46*Cn(.03,.24,O),$.rotation.z=.24*Ke,$.visible=O<.64;const b=ke*(1-Cn(.3,.65,O)),X=(ne%1.85+1.85)%1.85,ee=(1-Cn(.018,.14,X))*Cn(0,.012,X)+.65*Cn(.205,.218,X)*(1-Cn(.23,.285,X)),me=b*ee;W.color.setHex(3357499).lerp(new it(16719888),b),W.emissiveIntensity=b*(2.8+.55*Math.sin(ne*2.4)+me*3.8),U.color.setHex(2639166).lerp(new it(12064784),b),U.emissive.setHex(16717832),U.emissiveIntensity=b*(.55+me*.8),V.color.setHex(12122071).lerp(new it(16736328),b),V.emissive.setHex(7794357).lerp(new it(16721936),b),V.emissiveIntensity=2*(1-b)+b*(1.55+.8*Math.sin(ne*6.8)),N.color.setHex(10485714).lerp(new it(16726044),b),N.intensity=$.visible?.4+me*1.5:0,p.rotation.x=b*(.012*Math.sin(ne*3.4)+ee*.027)*(1-Cn(.25,.5,B)),p.position.y+=b*(.35+.55*Math.sin(ne*3.4)+ee*1.5)*(1-Cn(.25,.5,B)),F.opacity=Math.min(1,me*1.7),Q.opacity=Math.min(1,b*(.23+.07*Math.sin(ne*9))+me*1.7);for(const[be,_e]of q.entries()){_e.visible=b>.005&&$.visible;const ae=_e.geometry.attributes.position;for(let xe=0;xe<9;xe++){const Ie=xe/8,k=Math.sin(Ie*Math.PI);ae.setXYZ(xe,-9+24*Ie,9.8+k*(4+be*.65+Math.sin(ne*61+xe*2.9+be)*1.5),-7+be*4+k*Math.sin(ne*47+xe*2.1+be)*1.8)}ae.needsUpdate=!0}for(const[be,_e]of ye.entries()){_e.visible=me>.005;const ae=_e.geometry.attributes.position,xe=be%2?1:-1;for(let Ie=0;Ie<15;Ie++){const k=Ie/14,J=Math.sin(k*Math.PI),ce=Math.sin(ne*73+Ie*4.1+be*2.7);ae.setXYZ(Ie,xe*(22+be*5+k*37)+J*ce*3.7,p.position.y+2+J*(5+be*1.7+ce*2.5),60+J*(7+be*1.5))}ae.needsUpdate=!0}for(const[be,_e]of Be.entries()){const ae=((ne-be*.12)%1.85+1.85)%1.85/1.85;_e.visible=b>.005&&$.visible,_e.position.set(3+Math.sin(ae*5+be)*ae*11,10.1+ae*59,-3+Math.sin(ae*3+be)*ae*8),_e.scale.setScalar(9+ae*27),_e.material.rotation=Math.sin(ne*.12+be)*.45,_e.material.opacity=b*.42*Math.sin(Math.PI*ae)*(1-ae*.35)}n.userData.state={t:B,time:ne,fault:ke,repair:O,activeFault:b,flash:me,oldRemoved:Ke,replacementSeated:C,parts:s.length,faultyVisible:$.visible,replacementVisible:Z.visible,faultyCartridgePosition:$.position.toArray(),smokeOrigin:[3,10.1,-3],smokeAttachedTo:$.name,localDischargeOpacity:Q.opacity,replacementFault:0},pe.opacity=.2*Cn(.16,.35,B)*(1-Cn(.7,.84,B));for(const{p:be,line:_e}of K){const ae=_e.geometry.attributes.position;ae.setXYZ(0,...be.base.toArray()),ae.setXYZ(1,...be.g.position.toArray()),ae.needsUpdate=!0,_e.computeLineDistances()}}function De(){const B=new Set,ne=new Set,ve=new Set([e,t]);n.traverse(Re=>{if(Re.geometry&&B.add(Re.geometry),Re.material)for(const ke of[Re.material].flat()){ne.add(ke);for(const O of Object.values(ke))O?.isTexture&&ve.add(O)}}),B.forEach(Re=>Re.dispose()),ne.forEach(Re=>Re.dispose()),ve.forEach(Re=>Re.dispose()),n.removeFromParent()}return de(0),{group:n,update:de,dispose:De,anchors:a}}function kc(n,e=!1){const t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},a={},o=n[0].morphTargetsRelative,l=new Mt;let c=0;for(let h=0;h<n.length;++h){const f=n[h];let d=0;if(t!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const u in f.attributes){if(!i.has(u))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+u+'" attribute exists among all geometries, or in none of them.'),null;r[u]===void 0&&(r[u]=[]),r[u].push(f.attributes[u]),d++}if(d!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const u in f.morphAttributes){if(!s.has(u))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[u]===void 0&&(a[u]=[]),a[u].push(f.morphAttributes[u])}if(e){let u;if(t)u=f.index.count;else if(f.attributes.position!==void 0)u=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,u,h),c+=u}}if(t){let h=0;const f=[];for(let d=0;d<n.length;++d){const u=n[d].index;for(let m=0;m<u.count;++m)f.push(u.getX(m)+h);h+=n[d].attributes.position.count}l.setIndex(f)}for(const h in r){const f=fd(r[h]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,f)}for(const h in a){const f=a[h][0].length;if(f!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<f;++d){const u=[];for(let _=0;_<a[h].length;++_)u.push(a[h][_][d]);const m=fd(u);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}}return l}function fd(n){let e,t,i,s=-1,r=0;for(let c=0;c<n.length;++c){const h=n[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}const a=new e(r),o=new Jt(a,t,i);let l=0;for(let c=0;c<n.length;++c){const h=n[c];if(h.isInterleavedBufferAttribute){const f=l/t;for(let d=0,u=h.count;d<u;d++)for(let m=0;m<t;m++){const _=h.getComponent(d,m);o.setComponent(d+f,m,_)}}else a.set(h.array,l);l+=h.count*t}return s!==void 0&&(o.gpuType=s),o}const Ur=new I;function Kn(n,e,t,i,s,r){const a=2*Math.PI*s/4,o=Math.max(r-2*s,0),l=Math.PI/4;Ur.copy(e),Ur[i]=0,Ur.normalize();const c=.5*a/(a+o),h=1-Ur.angleTo(n)/l;return Math.sign(Ur[t])===1?h*c:o/(a+o)+c+c*(1-h)}class bi extends Fn{constructor(e=1,t=1,i=1,s=2,r=.1){const a=s*2+1;if(r=Math.min(e/2,t/2,i/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:i,segments:s,radius:r},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const l=new I,c=new I,h=new I(e,t,i).divideScalar(2).subScalar(r),f=this.attributes.position.array,d=this.attributes.normal.array,u=this.attributes.uv.array,m=f.length/6,_=new I,g=.5/a;for(let p=0,x=0;p<f.length;p+=3,x+=2)switch(l.fromArray(f,p),c.copy(l),c.x-=Math.sign(c.x)*g,c.y-=Math.sign(c.y)*g,c.z-=Math.sign(c.z)*g,c.normalize(),f[p+0]=h.x*Math.sign(l.x)+c.x*r,f[p+1]=h.y*Math.sign(l.y)+c.y*r,f[p+2]=h.z*Math.sign(l.z)+c.z*r,d[p+0]=c.x,d[p+1]=c.y,d[p+2]=c.z,Math.floor(p/m)){case 0:_.set(1,0,0),u[x+0]=Kn(_,c,"z","y",r,i),u[x+1]=1-Kn(_,c,"y","z",r,t);break;case 1:_.set(-1,0,0),u[x+0]=1-Kn(_,c,"z","y",r,i),u[x+1]=1-Kn(_,c,"y","z",r,t);break;case 2:_.set(0,1,0),u[x+0]=1-Kn(_,c,"x","z",r,e),u[x+1]=Kn(_,c,"z","x",r,i);break;case 3:_.set(0,-1,0),u[x+0]=1-Kn(_,c,"x","z",r,e),u[x+1]=1-Kn(_,c,"z","x",r,i);break;case 4:_.set(0,0,1),u[x+0]=1-Kn(_,c,"x","y",r,e),u[x+1]=1-Kn(_,c,"y","x",r,t);break;case 5:_.set(0,0,-1),u[x+0]=Kn(_,c,"x","y",r,e),u[x+1]=1-Kn(_,c,"y","x",r,t);break}}static fromJSON(e){return new bi(e.width,e.height,e.depth,e.segments,e.radius)}}const d1=n=>Ze.clamp(Number.isFinite(n)?n:0,0,1),Qs=(n,e,t)=>Ze.smoothstep(n,e,t);function ki(n,e,t){const i=-n/2,s=-e/2,r=Math.max(0,Math.min(t,n/2,e/2)),a=new rn;return a.moveTo(i+r,s),a.lineTo(i+n-r,s),a.quadraticCurveTo(i+n,s,i+n,s+r),a.lineTo(i+n,s+e-r),a.quadraticCurveTo(i+n,s+e,i+n-r,s+e),a.lineTo(i+r,s+e),a.quadraticCurveTo(i,s+e,i,s+e-r),a.lineTo(i,s+r),a.quadraticCurveTo(i,s,i+r,s),a}function za(n,e,t,i){const s=new wn;s.absarc(e,t,i,0,Math.PI*2,!0),n.holes.push(s)}function ul(n,e,t=.02){const i=Math.max(0,Math.min(t,e/4)),s=e-2*i,r=new Xn(n,{depth:s,bevelEnabled:i>0,bevelSize:i,bevelThickness:i,bevelSegments:4,curveSegments:32,steps:1});return r.translate(0,0,-s/2),r}function pd(n=!1){const t=new Uint8Array(262144);let i=71;const s=()=>(i=Math.imul(i,1664525)+1013904223>>>0)/4294967296;for(let a=0;a<256;a++){const o=s();for(let l=0;l<256;l++){const c=205+Math.floor(35*(n?o*.8+s()*.2:s())),h=(a*256+l)*4;t[h]=t[h+1]=t[h+2]=c,t[h+3]=255}}const r=new Cs(t,256,256);return r.wrapS=r.wrapT=ls,r.repeat.set(2,6),r.needsUpdate=!0,r}function u1(n){const e=new Set;n.traverse(t=>{t.geometry&&e.add(t.geometry);for(const i of[t.material].flat().filter(Boolean)){e.add(i);for(const s of Object.values(i))s?.isTexture&&e.add(s)}});for(const t of e)t.dispose();n.clear(),n.removeFromParent()}function f1(){const n=new St;n.name="Agent workstation network";const e=pd(!0),t=pd(),i=new kn({color:"#303644",metalness:.84,roughness:.36,roughnessMap:e,bumpMap:e,bumpScale:.001,anisotropy:.35}),s=new Ct({color:"#727e92",metalness:.86,roughness:.3}),r=new Ct({color:"#101722",metalness:0,roughness:.48,roughnessMap:t}),a=new Ct({color:"#14565b",metalness:.18,roughness:.48}),o=new Ct({color:"#d49361",metalness:.86,roughness:.3}),l=new Ct({color:"#d8b775",metalness:.74,roughness:.35}),c=new Kt({color:"#55dfff"}),h=new Kt({color:"#8d65ff"}),f=new Kt({color:"#d5eaf3"}),d=new Kt({color:"#071526"}),u=new Map,m=(k,J,ce,Se,Pe,Ge,G,we=i,re=.04)=>{const Ee=[J,ce,Se,re].join(",");u.has(Ee)||u.set(Ee,new bi(J,ce,Se,2,Math.min(re,J/3,ce/3,Se/3)));const Ne=new yt(u.get(Ee),we);return Ne.position.set(Pe,Ge,G),Ne.castShadow=Ne.receiveShadow=!0,k.add(Ne),Ne},_=k=>{const J=new St;return J.name=k,n.add(J),J},g=(k,J,ce,Se,Pe,Ge=.04)=>{const G=ki(Se,Pe,Ge).getPoints(6).map(we=>new Ae(we.x+J,we.y+ce)).reverse();k.holes.push(new wn(G))},p=(k,J,ce,Se,Pe=i,Ge=.015)=>{const G=new yt(ul(J,ce,Ge),Pe);return G.rotation.x=-Math.PI/2,G.position.y=Se,G.castShadow=G.receiveShadow=!0,k.add(G),G},x=(k,J,ce,Se,Pe,Ge,G=s,we=24)=>{const re=new yt(new sn(J,J,ce,we),G);return re.position.set(Se,Pe,Ge),k.add(re),re},M=(k,J,ce,Se)=>{x(k,.095,.035,J,ce,Se,r,16),x(k,.065,.04,J,ce+.015,Se,s,12),m(k,.065,.008,.018,J,ce+.04,Se,r,.003)},y=(k,J,ce,Se=o)=>{const Pe=new fo(J.map(G=>new I(...G))),Ge=new yt(new ea(Pe,32,ce,8,!1),Se);return k.add(Ge),Ge},S=_("Laptop chassis"),w=_("Laptop deck"),A=_("Laptop motherboard"),v=_("Laptop cooling"),E=_("Laptop battery"),R=_("Laptop display"),P=_("Processor modules"),D=_("Memory and storage"),$=_("Captive deck fasteners"),se=ki(13,8,.38);for(const k of[-4.4,4.4])for(let J=0;J<7;J++)g(se,k,-1.8+(J-3)*.24,1.8,.1);for(const k of[-5.8,5.8])for(const J of[-3.35,3.35])za(se,k,-J,.105);p(S,se,.13,-.48);const V=ki(13,8,.38);g(V,0,0,12.62,7.62,.25),p(S,V,.38,-.23,i,.025);const H=ki(12.61,7.61,.25);g(H,0,0,12.44,7.44,.19),p(S,H,.12,.015,s,.01),m(S,11.5,.04,.045,0,-.22,4.02,c,.01);for(const k of[-5.55,5.55])for(const J of[-3.25,3.2])m(S,1.35,.08,.3,k,-.59,J,r,.06);for(const k of[-5.8,5.8])for(const J of[-3.35,3.35])M(S,k,-.38,J);for(const k of[-1,1]){for(let Se=0;Se<3;Se++){const Pe=ki(.58,.21,.04);g(Pe,0,0,.43,.12,.025);const Ge=new yt(ul(Pe,.22,.008),s);Ge.rotation.y=k*Math.PI/2,Ge.position.set(k*6.48,-.22,.3+Se*.8),S.add(Ge),m(S,.21,.035,.34,k*6.48,-.23,.3+Se*.8,r,.008)}const J=ki(2.2,.28,.04);for(let Se=0;Se<9;Se++)g(J,(Se-4)*.22,0,.11,.16,.015);const ce=new yt(ul(J,.08,.008),r);ce.rotation.y=k*Math.PI/2,ce.position.set(k*6.52,-.2,-2.15),S.add(ce)}for(const k of[-4.8,4.8]){const J=x(S,.2,1.2,k,.17,-3.64,s,32);J.rotation.z=Math.PI/2;for(const ce of[-.47,.47]){const Se=x(S,.22,.075,k+ce,.17,-3.64,r);Se.rotation.z=Math.PI/2}m(S,.65,.16,.58,k,.12,-3.46,i)}const N=ki(12.96,7.96,.36);g(N,0,.83,11.4,3.68,.14),g(N,0,-2.25,3.88,1.43,.16);for(const k of[-5.81,5.81])for(let J=0;J<12;J++)g(N,k,2.85-J*.43,.1,.22,.025);for(const k of[-5.8,5.8])for(const J of[-3.35,3.35])za(N,k,-J,.11);p(w,N,.16,.17,i,.025),m(w,11.35,.1,3.6,0,.17,-.83,r,.1);const z=new bi(.66,.105,.51,2,.035),U=new Dn(z,r,75),W=new Dn(new Fn(.7,.026,.55),c,75),te=new Dn(new Fn(.13,.009,.024),f,75),L=new Bt,j=new it;for(let k=0;k<75;k++)L.position.set((k%15-7)*.735,.3,Math.floor(k/15)*.66-2.15),L.updateMatrix(),U.setMatrixAt(k,L.matrix),L.position.y=.257,L.updateMatrix(),W.setMatrixAt(k,L.matrix),j.setHSL(.52+k%15/15*.23,.86,.59),W.setColorAt(k,j),L.position.y=.358,L.position.z-=.09,L.updateMatrix(),te.setMatrixAt(k,L.matrix);w.add(U,W,te),m(w,3.82,.04,1.37,0,.235,2.25,r,.13),m(w,3.1,.012,.018,0,.258,2.89,s,.004);for(const k of[-5.8,5.8])for(const J of[-3.35,3.35])M($,k,.27,J);for(let k=0;k<2;k++){const J=m(w,.07,.018,.4,5.2+k*.2,.27,2.3,c,.01);J.rotation.y=-.5}const le=ki(12.1,6.75,.19);for(const k of[-5.65,5.65])for(const J of[-2.85,2.85])za(le,k,-J,.12);p(A,le,.11,-.15,a,.008);for(const k of[-5.65,5.65])for(const J of[-2.85,2.85])x(A,.17,.065,k,-.07,J,l),M(A,k,-.04,J);const Z=[];for(let k=0;k<22;k++){const J=-4.95+k*.45,ce=.65+k%5*.16;Z.push(new I(J,-.086,2.65),new I(J,-.086,ce)),Z.push(new I(J,-.086,ce),new I(J*.57,-.086,ce-.44))}A.add(new Rc(new Mt().setFromPoints(Z),new Ps({color:"#63a3a1",transparent:!0,opacity:.55})));const F=new Dn(new Fn(.17,.1,.11),r,112);for(let k=0;k<112;k++){const J=Math.floor(k/28),ce=k%28;L.position.set(-5.55+ce*.41,-.015,-.1+J*.29),L.updateMatrix(),F.setMatrixAt(k,L.matrix)}A.add(F);for(const[k,J,ce,Se]of[[-1.55,-1.15,1.9,1.65],[1.15,-1.15,2.35,1.9]]){m(P,ce+.22,.09,Se+.22,k,-.025,J,a,.035),m(P,ce,.11,Se,k,.065,J,r,.04),m(P,ce*.71,.055,Se*.67,k,.147,J,s,.025);for(const Pe of[-1,1])for(let Ge=0;Ge<12;Ge++)m(P,.047,.035,.1,k+(Ge-5.5)*ce/13,.04,J+Pe*(Se/2+.04),l,.004);for(let Pe=0;Pe<3;Pe++)m(P,ce*.45,.006,.025,k,.178,J+(Pe-1)*.14,r,.002)}for(const k of[-2.5,2.25]){m(D,3.45,.085,.84,k,.035,.9,a,.025);for(let J=0;J<5;J++)m(D,.49,.07,.49,k+(J-2)*.6,.11,.89,r,.015);for(let J=0;J<22;J++)m(D,.09,.018,.12,k+(J-10.5)*.145,.086,1.31,l,.003);for(const J of[-1.77,1.77])m(D,.1,.2,.5,k+J,.045,.9,s,.015)}m(D,3.4,.08,.72,-.4,.04,1.95,a,.025);for(let k=0;k<3;k++)m(D,.64,.09,.47,-1.25+k*.86,.12,1.95,r,.015);M(D,1.11,.115,1.95),m(E,10.6,.26,1.23,0,-.12,2.78,r,.1);for(let k=0;k<4;k++){m(E,2.47,.025,1.05,(k-1.5)*2.58,.025,2.78,i,.07),m(E,.018,.035,.93,(k-1.5)*2.58+1.15,.045,2.78,s,.004);for(let J=0;J<3;J++)m(E,.63-J*.1,.008,.025,(k-1.5)*2.58,.045,2.56+J*.12,s,.003)}y(E,[[4.7,.01,2.6],[5.15,.1,2.28],[4.8,.13,1.7]],.035,r),m(E,.43,.19,.28,4.8,.11,1.64,s,.025);const Q=[];for(const k of[-4.5,4.5]){const J=ki(2.55,2.6,.35);za(J,0,0,1.06);const ce=p(v,J,.19,.15,r,.02);ce.position.x=k,ce.position.z=-1.95;const Se=new yt(new xr(1.1,.027,8,48),s);Se.rotation.x=Math.PI/2,Se.position.set(k,.26,-1.95),v.add(Se);const Pe=new St;Pe.name=k<0?"Left cooling fan":"Right cooling fan",Pe.position.set(k,.18,-1.95),v.add(Pe),Q.push(Pe);const Ge=new Dn(new bi(.63,.085,.11,1,.024),i,29);for(let we=0;we<29;we++){const re=we/29*Math.PI*2;L.position.set(Math.cos(re)*.64,0,Math.sin(re)*.64),L.rotation.set(0,-re+.64,0),L.updateMatrix(),Ge.setMatrixAt(we,L.matrix)}Pe.add(Ge),L.rotation.set(0,0,0),x(Pe,.3,.15,0,.03,0,s,32),x(Pe,.13,.015,0,.115,0,r);for(const we of[-1.1,1.1])for(const re of[-1.1,1.1])M(v,k+we,.27,-1.95+re);const G=new Dn(new Fn(.045,.36,.6),s,26);for(let we=0;we<26;we++)L.position.set(k+(we-12.5)*.085,.13,-3.36),L.updateMatrix(),G.setMatrixAt(we,L.matrix);v.add(G)}for(let k=0;k<3;k++)y(v,[[-4.45,.32,-2+k*.2],[-3,.35,-1.65+k*.22],[-1.55,.35,-1.4+k*.23],[1.2,.35,-1.3+k*.23],[3.2,.35,-1.65+k*.22],[4.5,.32,-2+k*.2]],.07);for(const k of[-1.55,1.2])m(v,1.65,.09,1.4,k,.25,-1.15,o,.07);m(R,13,.23,7.65,0,0,3.72,i,.16),m(R,12.58,.025,7.08,0,-.132,3.76,r,.09),m(R,12.12,.015,6.59,0,-.15,3.79,d,.045);const q=new St;q.position.set(0,-.164,3.79),R.add(q);const ye=(k,J,ce,Se,Pe)=>m(q,k,.009,J,ce,Pe===r?0:-.022,Se,Pe,.025);ye(11.9,.3,0,-3.03,r);for(let k=0;k<3;k++)ye(.1,.1,-5.55+k*.2,-3.03,[c,h,f][k]);ye(1.92,5.52,-4.79,.1,r);for(let k=0;k<10;k++)ye(1.14+k%3*.15,.04,-4.8,-2.17+k*.42,k===2?c:s);const ge=[];for(let k=0;k<65;k++){const J=-3.35+k*.14,ce=-1.75+Math.sin(k*.075)*.42;ge.push(J,-.012,ce-.12-Math.sin(k*.05)*.2,J,-.012,ce+.12+Math.sin(k*.05)*.2)}const Me=new Mt;Me.setAttribute("position",new pt(ge,3));const Be=[];for(let k=0;k<64;k++)Be.push(k*2,k*2+1,k*2+2,k*2+1,k*2+3,k*2+2);Me.setIndex(Be),Me.attributes.position.setUsage(yi);const Le=new Kt({color:"#6f7fff",side:On});q.add(new yt(Me,Le)),ye(5.75,2.18,-.45,.4,r),ye(2.65,2.18,4,.4,r);const pe=[0,1].map(k=>{const J=new Mt;J.setAttribute("position",new Jt(new Float32Array(390),3).setUsage(yi)),J.setIndex(Be);const ce=new yt(J,new Kt({color:k?"#ffbd88":"#76e3f4",side:On}));return ce.name=`Live telemetry waveform ${k+1}`,ce.frustumCulled=!1,q.add(ce),ce});for(let k=0;k<4;k++)ye(5.15,.014,-.42,-.3+k*.46,s);const K=new Dn(new bi(.13,.009,1,2,.004),c,12);K.name="Live screen activity chart",K.instanceMatrix.setUsage(yi),K.frustumCulled=!1,q.add(K);for(let k=0;k<12;k++)K.setColorAt(k,new it(k%3?"#adf6ff":"#a39aff"));const de=new Bt,De=new Array(12);for(let k=0;k<3;k++)ye(2.71,.73,-1.9+k*3.03,2.21,r),ye(1.5,.035,-1.9+k*3.03,2.03,f),ye(2.12,.065,-1.9+k*3.03,2.32,s);const B=new Dn(new bi(1,.01,.069,2,.003),c,3);B.name="Live screen status meters",B.frustumCulled=!1,B.instanceMatrix.setUsage(yi),q.add(B);const ne=[];x(R,.06,.024,0,-.155,7.27,r,16);for(const k of[-5.9,5.9])m(R,.16,.045,.16,k,-.15,.25,r,.03);const ve=[],Re=[],ke=[],O=[];for(let k=0;k<4;k++){const J=new St;J.name=`Agent peer ${k+1}`,n.add(J),m(J,3.35,.15,2.1,0,0,0,i,.1),m(J,2.9,.028,1,0,.09,-.24,r,.025),m(J,1.05,.015,.43,0,.09,.62,r,.035),m(J,2.9,.025,.03,0,.075,1.045,k%2?h:c,.006);const ce=new St;ce.position.set(0,.09,-.97),ce.rotation.x=-1.87,J.add(ce),m(ce,3.35,.08,2.1,0,0,1.02,i,.075),m(ce,3.08,.015,1.78,0,-.05,1.04,d,.04),m(ce,2.34,.009,.028,0,-.076,.43,c,.003);const Se=new Dn(new bi(.23,.01,1,2,.003),c,8);Se.name=`Peer ${k+1} live activity bars`,Se.frustumCulled=!1,Se.instanceMatrix.setUsage(yi),ce.add(Se),O.push(Se),ve.push(J);const Pe=new Mt,Ge=[];Pe.setAttribute("position",new Jt(new Float32Array(392*3),3).setUsage(yi));for(let re=0;re<48;re++)for(let Ee=0;Ee<8;Ee++){const Ne=re*8+Ee,oe=re*8+(Ee+1)%8,Ce=Ne+8,Oe=oe+8;Ge.push(Ne,oe,Ce,oe,Oe,Ce)}Pe.setIndex(Ge);const G=new yt(Pe,new Kt({color:"#d57c45",transparent:!0,opacity:.82,depthWrite:!1,side:On}));G.name=`Curved peer route ${k+1}`,G.frustumCulled=!1,n.add(G),Re.push(G);const we=new yt(new Gi(.115,12,8),new Kt({color:"#fff2d4",transparent:!0,opacity:1,depthWrite:!1}));n.add(we),ke.push(we)}const rt=new Set;n.traverse(k=>{k.geometry&&rt.add(k.geometry)});function Ke(k){for(const ce of k.children)ce.isGroup&&Ke(ce);if(k===n)return;const J=new Map;for(const ce of k.children)ce.isMesh&&!ce.isInstancedMesh&&(J.has(ce.material)||J.set(ce.material,[]),J.get(ce.material).push(ce));for(const[ce,Se]of J){if(Se.length<2)continue;const Pe=Se.map(we=>{we.updateMatrix();const re=we.geometry.index?we.geometry.toNonIndexed():we.geometry.clone();re.applyMatrix4(we.matrix);for(const Ee of Object.keys(re.attributes))["position","normal","uv"].includes(Ee)||re.deleteAttribute(Ee);return re}),Ge=kc(Pe,!1);if(Pe.forEach(we=>we.dispose()),!Ge)continue;const G=new yt(Ge,ce);G.castShadow=G.receiveShadow=!0,Se.forEach(we=>k.remove(we)),k.add(G)}}Ke(n);const C=new Set;n.traverse(k=>{k.geometry&&C.add(k.geometry)}),rt.forEach(k=>{C.has(k)||k.dispose()});const b=[[-12,4.1,-4.5],[12,4.1,-4.5],[-12,.1,6.8],[12,.1,6.8]],X=new Kd(new I,new I,new I,new I),ee=new I,me=new I,be=new I,_e=new I,ae=new I(0,1,0);let xe;function Ie(k,J=0){const ce=d1(k),Se=Number.isFinite(J)?J:0,Pe=Qs(ce,.09,.34),Ge=Qs(ce,.4,1),G=.82*(1-Qs(ce,.005,.11)),we=Qs(ce,.4,.79),re=Qs(ce,.49,.93),Ee=Qs(ce,.64,1);w.position.set(5.9*we,4.9*we,1.05*we),w.rotation.set(.1*we,0,-1.18*we),R.position.set(-1.15*re,.15+3.6*we,-3.65+.1*re),R.rotation.x=-1.82-.04*re,A.position.set(-1.15*re,1.5*re,-.15*re),A.rotation.x=.12*re,v.position.set(-1.3*re,3.65*re,-.5*re),v.rotation.x=.18*re,v.scale.y=.25+.75*re,P.position.set(-1.15*re,2.5*re,1.6*Ee),P.rotation.x=.12*re,D.position.set(-1.35*re,2.25*re,1.6*Ee),D.rotation.x=.13*re,E.position.set(-.8*Ee,-.7*Ee,.7*Ee),E.rotation.x=.1*Ee,$.position.set(0,.85*we,0),Q.forEach((oe,Ce)=>{oe.rotation.y=Se*(Ce?-.72:.72)}),c.color.setHSL(.56+.018*Math.sin(Se*.18),.86,.65);for(let oe=0;oe<12;oe++){const Ce=(.36+oe*.073)*(1+.34*Math.sin(Se*.72+oe*.47));De[oe]=Ce,de.position.set(2.95+oe*.19,-.024,1.32-Ce/2),de.scale.set(1,1,Ce),de.updateMatrix(),K.setMatrixAt(oe,de.matrix)}K.instanceMatrix.needsUpdate=!0,pe.forEach((oe,Ce)=>{const Oe=oe.geometry.attributes.position;for(let ht=0;ht<65;ht++){const ie=-3+ht*5.17/64,Te=.25+Ce*.4+Math.sin(ht*.15-Se*(.84+Ce*.16)+Ce)*.3+Math.sin(ht*.37-Se*.44)*.13;Oe.setXYZ(ht*2,ie,-.047-Ce*.004,Te-.021),Oe.setXYZ(ht*2+1,ie,-.047-Ce*.004,Te+.021)}Oe.needsUpdate=!0});for(let oe=0;oe<3;oe++){const Ce=1.05+.71*Math.sin(Se*.61+oe*1.7);ne[oe]=Ce,de.position.set(-2.96+oe*3.03+Ce/2,-.045,2.32),de.scale.set(Ce,1,1),de.updateMatrix(),B.setMatrixAt(oe,de.matrix)}B.instanceMatrix.needsUpdate=!0;const Ne=Me.attributes.position;for(let oe=0;oe<65;oe++){const Ce=-3.35+oe*.14,Oe=-1.75+Math.sin(oe*.075-Se*.43)*.36,ht=.13+(Math.sin(oe*.05+Se*.17)+1)*.065;Ne.setXYZ(oe*2,Ce,-.025,Oe-ht),Ne.setXYZ(oe*2+1,Ce,-.025,Oe+ht)}Ne.needsUpdate=!0,ve.forEach((oe,Ce)=>{const Oe=b[Ce],ht=Math.sign(Oe[0]),ie=Ce<2;oe.position.set(Oe[0],Oe[1]+Math.sin(Se*.28+Ce)*.22,Oe[2]),oe.rotation.y=-ht*.18+Math.sin(Se*.14+Ce)*.025,oe.scale.setScalar((1-Pe)*1.35),oe.visible=Pe<.999,Re[Ce].visible=ke[Ce].visible=G>1e-4&&oe.visible,Re[Ce].material.opacity=G,ke[Ce].material.opacity=G/.82,X.v0.set(ht*5.95,.1,ie?-2.3:2.7),X.v1.set(ht*8.7,1,ie?-5.4:6.7),X.v2.set(oe.position.x-ht*2.4,oe.position.y+.9,oe.position.z+(ie?-1.15:1.25)),X.v3.set(oe.position.x-ht*1.65*oe.scale.x,oe.position.y+.12,oe.position.z+.3);const Te=Re[Ce].geometry.attributes.position;for(let $e=0;$e<49;$e++){X.getPoint($e/48,ee),X.getTangent($e/48,me),be.crossVectors(me,ae).normalize(),_e.crossVectors(me,be).normalize();for(let We=0;We<8;We++){const tt=We/8*Math.PI*2,at=Math.cos(tt)*.065,mt=Math.sin(tt)*.065;Te.setXYZ($e*8+We,ee.x+be.x*at+_e.x*mt,ee.y+be.y*at+_e.y*mt,ee.z+be.z*at+_e.z*mt)}}Te.needsUpdate=!0;const Ue=((Se*.1+Ce*.23)%1+1)%1;X.getPoint(Ue,ke[Ce].position);for(let $e=0;$e<8;$e++){const We=.35+.19*Math.sin(Se*.82+$e*.6+Ce)+$e*.055;de.position.set(-1+$e*.285,-.085,1.65-We/2),de.scale.set(1,1,We),de.updateMatrix(),O[Ce].setMatrixAt($e,de.matrix)}O[Ce].instanceMatrix.needsUpdate=!0}),xe={progress:ce,explode:Ge,focus:Pe,hue:c.color.getHexString(),peers:ve.filter(oe=>oe.visible).length,connectorOpacity:G,connectorsVisible:Re.some(oe=>oe.visible),connectorRadius:.065,connectorColor:"d57c45",screen:{time:Se,chartHeights:[...De],meterWidths:[...ne],waveformSamples:pe.map(oe=>oe.geometry.attributes.position.getZ(32)),animatedCharts:10,ribbonLeadingZ:Ne.getZ(0),artworkGap:.013}}}return Ie(0),{group:n,update:Ie,get state(){return xe},dispose(){u1(n)}}}const qt=Math.PI*2,md=22,p1=76,Za=(n,e=0,t=1)=>Math.min(t,Math.max(e,n));function Ga(n,e,t){const i=Za((t-n)/(e-n));return i*i*(3-2*i)}function gd(n,e,t){return n<=e||n>=t?0:7*Math.sin(Math.PI*(n-e)/(t-e))**2}function vd(n){n=Za(Number.isFinite(n)?n:0);const e=Za((n-.78)/.1),t=n<.78?n:.78+.05*(2*e-e*e),i=Math.PI*.34+t*qt*24,s=(i%(2*qt)+2*qt)%(2*qt),r=md*Math.sin(i),a=md*Math.cos(i),o=a+Math.sqrt(p1**2-r**2),l=1+.15*Math.sin(n*Math.PI*4)*(1-Ga(.78,.96,n)),c=31,h=21/(l*l),f=Math.sqrt(c**2-h**2),d=83-2*h,u=-Math.asin((d-37)/25),m=30-15*Math.sin(u),_=37+15*Math.cos(u),g=52-m,p=79-_,x=Math.hypot(g,p),M=Math.acos(Za((x*x+100-31.5**2)/(20*x),-1,1))-Math.atan2(g,p);return{t:n,theta:i,phase:s,crankX:r,crankY:a,pistonY:o,camAngle:i/2,intake:gd(s,0,Math.PI),exhaust:gd(s,3*Math.PI,4*Math.PI),stroke:["INTAKE","COMPRESSION","POWER","EXHAUST"][Math.floor(s/Math.PI)],speed:l,governorRadius:f,governorHeight:h,sleeveY:d,bellAngle:u,feedbackX:m,feedbackY:_,throttleAngle:M,throttle:1.3-M,covers:Ga(.12,.43,n),cylinder:Ga(.3,.6,n),isolate:Ga(.68,1,n)}}const m1=new I(0,1,0),vt=(n,e,t)=>new I(n,e,t);function yd(n){const t=new Uint8Array(262144);let i=7103;const s=()=>(i=Math.imul(i,1664525)+1013904223>>>0,i/4294967296),r=Array.from({length:256},()=>s());for(let o=0;o<256;o++)for(let l=0;l<256;l++){const c=(o*256+l)*4,h=n==="metal"?150+r[o]*45+s()*17:175+s()*46;t[c]=t[c+1]=t[c+2]=h,t[c+3]=255}const a=new Cs(t,256,256);return a.needsUpdate=!0,a.generateMipmaps=!0,a.minFilter=is,a.magFilter=pn,a.wrapS=a.wrapT=ls,a.repeat.set(n==="metal"?2:5,n==="metal"?2:5),a.anisotropy=16,a}function gi(n,e,t){const i=new rn,s=-n/2,r=-e/2;return i.moveTo(s+t,r),i.lineTo(s+n-t,r),i.quadraticCurveTo(s+n,r,s+n,r+t),i.lineTo(s+n,r+e-t),i.quadraticCurveTo(s+n,r+e,s+n-t,r+e),i.lineTo(s+t,r+e),i.quadraticCurveTo(s,r+e,s,r+e-t),i.lineTo(s,r+t),i.quadraticCurveTo(s,r,s+t,r),i}function Jn(n,e,t,i){const s=new wn;s.absarc(e,t,i,0,qt,!0),n.holes.push(s)}function g1(n,e){const t=new rn;return t.absarc(0,0,n,0,qt),e&&Jn(t,0,0,e),t}function Pn(n,e,t=.45){const i=new Xn(n,{depth:e,steps:1,bevelEnabled:t>0,bevelSegments:4,bevelSize:t,bevelThickness:t,curveSegments:24});return i.translate(0,0,-e/2),i}function v1(n,e=1.6){const t=n*e/2,i=t*Math.cos(Math.PI/9),s=t-1.25*e,r=t+e,a=h=>{const f=Math.acos(Math.min(1,i/h));return Math.tan(f)-f},o=Math.PI/(2*n),l=a(t),c=[];for(let h=0;h<n;h++){const f=h*qt/n,d=(u,m)=>c.push(new Ae(u*Math.cos(m),u*Math.sin(m)));d(s,f-Math.PI/n),d(s,f-o-l);for(let u=0;u<=8;u++){const m=Math.max(i,s)+(r-Math.max(i,s))*u/8;d(m,f-o-l+a(m))}for(let u=8;u>=0;u--){const m=Math.max(i,s)+(r-Math.max(i,s))*u/8;d(m,f+o+l-a(m))}d(s,f+o+l),d(s,f+Math.PI/n)}return new rn(c)}function y1(){const n=new St;n.name="AG–01 / governed four-stroke";const e=yd("metal"),t=yd("polymer"),i={aluminum:new kn({color:7634304,metalness:.93,roughness:.36,roughnessMap:e,bumpMap:e,bumpScale:.035,anisotropy:.65,anisotropyRotation:Math.PI/2,clearcoat:.15,clearcoatRoughness:.5}),edge:new kn({color:11910591,metalness:.94,roughness:.28,roughnessMap:e,anisotropy:.5}),steel:new kn({color:3423295,metalness:.96,roughness:.31,roughnessMap:e,anisotropy:.35,clearcoat:.25}),black:new kn({color:1448733,metalness:.18,roughness:.57,roughnessMap:t,bumpMap:t,bumpScale:.06,clearcoat:.12,clearcoatRoughness:.55}),graphite:new kn({color:5266528,metalness:.35,roughness:.54,roughnessMap:t,bumpMap:t,bumpScale:.025,clearcoat:.18,clearcoatRoughness:.45}),rubber:new Ct({color:725008,roughness:.72,roughnessMap:t}),accent:new kn({color:10214588,metalness:.55,roughness:.3,roughnessMap:e,clearcoat:.35}),dark:new Ct({color:395787,metalness:.5,roughness:.48})},{aluminum:s,edge:r,steel:a,black:o,graphite:l,rubber:c,accent:h}=i,f=new Set,d=new Set([e,t]),u=(ie,Te,Ue,$e=0,We=0,tt=0)=>{f.add(ie);const at=new yt(ie,Te);return at.position.set($e,We,tt),at.castShadow=!0,at.receiveShadow=!0,Ue.add(at),at},m=(ie,Te,Ue=0,$e=0,We=0)=>{const tt=new St;return tt.name=Te,tt.position.set(Ue,$e,We),ie.add(tt),tt},_=(ie,Te,Ue,$e,We,tt=0,at=0,mt=0,ot=3,xt=[])=>{const je=gi(Te,Ue,ot);for(const[nn,zt,jt]of xt)Jn(je,nn,zt,jt);return u(Pn(je,$e,.5),We,ie,tt,at,mt)},g=(ie,Te,Ue,$e,We=0,tt=0,at=0,mt=0)=>u(Pn(g1(Te,mt),Ue,.3),$e,ie,We,tt,at),p=(ie,Te,Ue,$e,We=0,tt=0,at=0)=>{const mt=Math.min(.35,Te*.12,Ue*.12),ot=[new Ae(0,-Ue/2),new Ae(Te-mt,-Ue/2)];for(let xt=0;xt<=6;xt++){const je=xt/6*Math.PI/2;ot.push(new Ae(Te-mt+mt*Math.sin(je),-Ue/2+mt-mt*Math.cos(je)))}ot.push(new Ae(Te,Ue/2-mt));for(let xt=0;xt<=6;xt++){const je=xt/6*Math.PI/2;ot.push(new Ae(Te-mt+mt*Math.cos(je),Ue/2-mt+mt*Math.sin(je)))}return ot.push(new Ae(0,Ue/2)),u(new Mo(ot,64),$e,ie,We,tt,at)},x=(ie,Te,Ue,$e,We=a)=>{const tt=p(ie,$e,1,We);return M(tt,Te,Ue),tt};function M(ie,Te,Ue){const $e=Ue.clone().sub(Te);ie.position.copy(Te).add(Ue).multiplyScalar(.5),ie.quaternion.setFromUnitVectors(m1,$e.clone().normalize()),ie.scale.y=$e.length()}const y=(ie,Te,Ue,$e,We=0,tt=0,at=0)=>u(new xr(Te,Ue,10,80),$e,ie,We,tt,at);function S(ie,Te,Ue,$e,We=2){g(ie,We*1.42,.5,a,Te,Ue,$e);const tt=new rn;for(let ot=0;ot<=6;ot++){const xt=ot/6*qt;ot?tt.lineTo(We*Math.cos(xt),We*Math.sin(xt)):tt.moveTo(We,0)}const at=new wn;for(let ot=0;ot<=6;ot++){const xt=-ot/6*qt;ot?at.lineTo(We*.48*Math.cos(xt),We*.48*Math.sin(xt)):at.moveTo(We*.48,0)}return tt.holes.push(at),u(Pn(tt,1.7,.14),r,ie,Te,Ue,$e+1.1)}function w(ie,Te,Ue,$e,We,tt,at,mt="#bbc1bf"){const ot=document.createElement("canvas");ot.width=1024,ot.height=128;const xt=ot.getContext("2d");xt.fillStyle=mt,xt.font="38px monospace",xt.textAlign="center",xt.textBaseline="middle",xt.fillText(Te,512,64);const je=new uo(ot);je.colorSpace=_n,d.add(je);const nn=new Kt({map:je,transparent:!0,depthWrite:!1});return i["label"+Object.keys(i).length]=nn,u(new ti(Ue,$e),nn,ie,We,tt,at)}const A=m(n,"Engine / working core"),v=m(n,"Centrifugal governor + throttle feedback",96,0,12),E=m(A,"Mounting bed"),R=_(E,126,65,7,o,18,-46,0,7,[[-50,-22,3],[50,-22,3],[-50,22,3],[50,22,3]]);R.rotation.x=-Math.PI/2;for(const ie of[-31,67])for(const Te of[-22,22]){p(E,5,4,c,ie,-52,Te);const Ue=m(E,"Captured bed fastener",ie,-41,Te);Ue.rotation.x=-Math.PI/2,S(Ue,0,0,0,2.3)}for(const ie of[-19,19])_(E,87,9,6,s,3,-38,ie,2);const P=[];for(const ie of[-1,1]){const Te=m(A,ie>0?"Front crankcase service cover":"Rear crankcase service cover",0,0,ie*22),Ue=gi(79,76,18);Jn(Ue,0,0,12);for(const at of[-28,28])for(const mt of[-25,25])Jn(Ue,at,mt,2.4);u(Pn(Ue,5,1.1),s,Te);const $e=gi(78,75,18),We=gi(71,68,16);$e.holes.push(new wn(We.getPoints(96).reverse())),u(Pn($e,2,.3),r,Te,0,0,ie*3.3);const tt=gi(65,61,13);Jn(tt,0,0,14),u(Pn(tt,1.6,.7),l,Te,0,0,ie*4.5),g(Te,16,2,a,0,0,ie*6,10),y(Te,12.7,.55,r,0,0,ie*7.2);for(const at of[-28,28])for(const mt of[-25,25]){const ot=m(Te,"Recessed cover screw",at,mt,ie*4);ie<0&&(ot.rotation.y=Math.PI),S(ot,0,0,0,2)}for(let at=0;at<5;at++)_(Te,18,1.1,.4,a,0,-20+at*2,ie*5.5,.4);ie>0&&w(Te,"ASTRA   /   AG–01",35,4,0,24,6.4),P.push(Te)}const D=m(A,"Internal crankshaft bearing bulkheads");for(const ie of[-14,14]){const Te=gi(65,66,16);Jn(Te,0,0,26),u(Pn(Te,3,.7),a,D,0,0,ie);for(const Ue of[-25,25])x(D,vt(Ue,-22,-14),vt(Ue,-22,14),2.2,r)}const $=m(A,"Crankshaft"),se=p($,7,103,a);se.rotation.x=Math.PI/2;for(const ie of[-9,9]){const Te=new rn;Te.absarc(0,-4,22,0,qt),Jn(Te,0,13,7),u(Pn(Te,6,1),a,$,0,0,ie),g($,7,1,r,0,22,ie>0?13:-13,3.5)}const V=p($,5.3,24,r,0,22,0);V.rotation.x=Math.PI/2;const H=m($,"Flywheel",0,0,-48);g(H,43,9,a,0,0,0,32),y(H,41.8,.7,r,0,0,5),y(H,33,.45,r,0,0,5),g(H,12,15,s,0,0,0,7);for(let ie=0;ie<6;ie++){const Te=m(H,"Flywheel spoke");Te.rotation.z=ie*qt/6,_(Te,8,26,6,s,0,23,0,3),S(H,9*Math.cos(ie*qt/6),9*Math.sin(ie*qt/6),8,1.2)}for(let ie=0;ie<60;ie++){const Te=ie*qt/60,Ue=_(H,.4,ie%5?1.4:2.7,.25,r,39*Math.sin(Te),39*Math.cos(Te),5,.12);Ue.rotation.z=-Te}const N=m(A,"Connecting rod"),z=new rn;z.moveTo(-5,0),z.lineTo(-3.2,76),z.quadraticCurveTo(0,80,3.2,76),z.lineTo(5,0),z.closePath();const U=new wn;U.moveTo(-1.4,15),U.lineTo(-1.4,60),U.quadraticCurveTo(0,63,1.4,60),U.lineTo(1.4,15),U.closePath(),z.holes.push(U),u(Pn(z,4,.6),s,N),g(N,9,6,s,0,0,0,5.4),g(N,6,7,r,0,76,0,3);for(const ie of[-7,7])S(N,ie,-3,4,1.3);const W=m(A,"Piston");p(W,21.5,20,s,0,0,0);for(const ie of[4.9,7.2,9.2]){const Te=y(W,21.6,.43,a,0,ie,0);Te.rotation.x=Math.PI/2}const te=p(W,3,46,a,0,-2,0);te.rotation.x=Math.PI/2;for(const ie of[-22,22])g(W,4,.4,a,0,-2,ie,2.5);p(W,18,.25,r,0,10.1,0);const L=[];for(const ie of[-1,1]){const Te=m(A,"Sectioned finned cylinder",0,0,0),Ue=(We,tt)=>{const at=new rn,mt=ie>0?0:Math.PI;return at.absarc(0,0,We,mt+.025,mt+Math.PI-.025,!1),at.absarc(0,0,tt,mt+Math.PI-.025,mt+.025,!0),at.closePath(),at},$e=u(Pn(Ue(25,22.2),70,.25),a,Te,0,79,0);$e.rotation.x=-Math.PI/2;for(let We=0;We<12;We++){const tt=u(Pn(Ue(We===0||We===11?30:32,24.5),2.2,.55),s,Te,0,46+We*6,0);tt.rotation.x=-Math.PI/2}for(const We of[-27,27])_(Te,5,72,5,a,We,79,ie*9,1.2);L.push(Te)}const j=new Set(A.children);for(const ie of[-27,27])for(const Te of[-18,18]){x(A,vt(ie,41,Te),vt(ie,120,Te),1.7,a);const Ue=m(A,"Cylinder stud nut",ie,121,Te);Ue.rotation.x=-Math.PI/2,S(Ue,0,0,0,2.2)}const le=m(A,"Cylinder head",0,120,0);for(let ie=0;ie<3;ie++){const Te=_(le,64,55,2.6,s,0,ie*4,0,9,[[0,0,22.2],[-27,-18,2],[27,-18,2],[-27,18,2],[27,18,2]]);Te.rotation.x=-Math.PI/2}const Z=m(A,"Obsidian rocker cover",0,153,0),F=_(Z,65,43,8,o,0,0,0,10);F.rotation.x=-Math.PI/2;const Q=_(Z,66,44,1,r,0,-4,0,10,[[0,0,10]]);Q.rotation.x=-Math.PI/2;const q=w(Z,"AG–01  /  OHV",37,5,0,4.7,0);q.rotation.x=-Math.PI/2;for(const ie of[-25,25]){const Te=m(Z,"Rocker cover screw",ie,4.5,0);Te.rotation.x=-Math.PI/2,S(Te,0,0,0,2)}const ye=m(A,"Spark plug",1,132,-14);ye.rotation.x=-.32,p(ye,2.6,14,r);for(let ie=0;ie<5;ie++)p(ye,3,1.2,s,0,2+ie*1.7,0);p(ye,1.2,5,a,0,13,0);const ge=A.children.filter(ie=>!j.has(ie)),Me=[];for(const[ie,Te]of[[0,20],[48,40],[96,20]]){const Ue=m(ie===96?v:A,Te===40?"40T cam gear":"20T drive gear",ie===96?0:ie,0,ie===96?23:35),$e=v1(Te);if(Jn($e,0,0,5.3),Te===40)for(let We=0;We<6;We++){const tt=We*qt/6;Jn($e,20*Math.cos(tt),20*Math.sin(tt),6.3)}else for(let We=0;We<3;We++){const tt=We*qt/3;Jn($e,10*Math.cos(tt),10*Math.sin(tt),2.2)}u(Pn($e,5,.18),s,Ue),g(Ue,8,7,a,0,0,0,3),S(Ue,0,0,4,2.7),Me.push(Ue)}const Be=m(A,"Timing drive guard",47,0,44),Le=gi(129,78,21);Jn(Le,-47,0,11),Jn(Le,49,0,11);for(const ie of[-18,-6,6,18]){const Ue=gi(5,37,2.4).getPoints(48).map($e=>new Ae($e.x+ie,$e.y));Le.holes.push(new wn(Ue.reverse()))}u(Pn(Le,2.5,.8),l,Be);const pe=gi(129,78,21);pe.holes.push(new wn(gi(125,74,19).getPoints(96).reverse())),u(Pn(pe,.65,.2),r,Be,0,0,2.05);for(const ie of[-51,51])for(const Te of[-25,25])S(Be,ie,Te,2.3,2);w(Be,"TIMING  /  2:1",35,4,0,-27,2.7);const K=new Set(A.children),de=[],De=[],B=[],ne=[],ve=[],Re=p(A,4,48,a,48,0,9);Re.rotation.x=Math.PI/2;for(let ie=0;ie<2;ie++){const Te=ie?10:-10,Ue=ie?-8:7,$e=ie?32:25,We=$e-Te,tt=48-$e,at=m(A,ie?"Exhaust cam":"Intake cam",48,0,Ue),mt=[];for(let zt=0;zt<=256;zt++){const jt=zt/256*qt,Tn=(-2*(jt-Math.PI/2)%(2*qt)+2*qt)%(2*qt),En=ie?3*Math.PI:0,Pi=ie?4*Math.PI:Math.PI,hs=8+(Tn>En&&Tn<Pi?7*Math.sin(Math.PI*(Tn-En)/(Pi-En))**2:0)*tt/We;mt.push(new Ae(hs*Math.cos(jt),hs*Math.sin(jt)))}u(Pn(new rn(mt),5,.4),a,at),de.push(at),x(A,vt($e,142,Ue-5),vt($e,142,Ue+5),3,a);const ot=m(A,"Rocker arm",$e,142,Ue);_(ot,We+tt+7,5,5,s,(tt-We)/2,0,0,2.4,[[-(tt-We)/2,0,2]]),g(ot,4.5,6,r,0,0,0,2.3),S(ot,0,0,4,1.7),De.push({group:ot,arm:We,pushArm:tt,vx:Te,pivotX:$e,z:Ue});const xt=m(A,ie?"Exhaust valve":"Intake valve",Te,0,Ue);p(xt,1.5,28,r,0,128,0),p(xt,6.3,1.8,a,0,114,0),p(xt,4.3,1.4,r,0,137,0),ne.push(xt);const je=[];for(let zt=0;zt<=200;zt++){const jt=zt/200*qt*8;je.push(vt(Math.cos(jt)*3.5,zt/200,Math.sin(jt)*3.5))}const nn=u(new ea(new fo(je),160,.53,6,!1),a,A,Te,121,Ue);ve.push(nn),B.push(x(A,vt(48,8,Ue),vt(48,142,Ue),1.35,r)),_(A,17,8,8,a,46,78,Ue,2,[[2,0,2]])}const ke=A.children.filter(ie=>!K.has(ie));_(v,31,38,5,o,0,-23,0,6,[[0,0,7]]);const O=_(v,44,35,5,s,0,-45,0,4,[[-15,-10,2],[15,-10,2],[-15,10,2],[15,10,2]]);O.rotation.x=-Math.PI/2;for(const ie of[12,26])p(v,6,6,a,0,ie,0);p(v,3,99,r,0,46,0);const rt=p(v,4,27,a,0,0,10);rt.rotation.x=Math.PI/2;function Ke(ie){const Te=m(ie,"1:1 miter gear");u(new sn(5,11,6,64),a,Te);for(let Ue=0;Ue<20;Ue++){const $e=Ue*qt/20,We=_(Te,2,6,2,r,8*Math.sin($e),0,8*Math.cos($e),.45);We.rotation.y=$e,We.rotation.x=.6}return Te}const C=Ke(v);C.position.set(0,0,7),C.rotation.x=Math.PI/2;const b=Ke(v);b.position.y=7;const X=m(v,"Governor flyweight rotor");p(X,5.3,6,a,0,83,0),_(X,14,5,5,s,0,83,0,2),p(X,4,4,r,0,88,0);const ee=[],me=[];for(const ie of[-1,1]){const Te=u(new Gi(7,40,28),a,X);ee.push(Te);const Ue=x(X,vt(0,83,0),vt(ie*21,60,0),1.9,r),$e=x(X,vt(ie*21,60,0),vt(0,37,0),1.5,s);me.push({upper:Ue,lower:$e,side:ie});const We=g(X,3,4,r,ie*21,60,0,1);Te.userData.pin=We}const be=m(v,"Sliding collar and thrust bearing");p(be,6,8,s);for(const ie of[-3.5,3.5]){const Te=y(be,6,.6,r,0,ie,0);Te.rotation.x=Math.PI/2}p(be,7.2,2,a,0,-1,0);const _e=m(v,"Stationary collar fork");for(const ie of[-7,7])_(_e,17,2.5,2,a,5,0,ie,1);x(_e,vt(13,0,-7),vt(13,0,7),1.5,r);const ae=m(v,"Feedback bellcrank",30,37,8);_(ae,30,3.3,3,h,-10,0,0,1.5),_(ae,3.3,18,3,h,0,7,0,1.5),g(ae,3.6,5,a,0,0,0,1.5),S(ae,0,0,3,1.5),x(v,vt(30,18,8),vt(30,37,8),2,a),x(ae,vt(0,15,0),vt(0,15,10),1.2,r);const xe=x(v,vt(21,44,8),vt(37,67,8),1.35,h),Ie=m(v,"Throttle / butterfly body",52,79,8),k=g(Ie,11,15,s,0,0,0,8.4);k.rotation.y=Math.PI/2;const J=y(Ie,10.5,.5,r,8,0,0);J.rotation.y=Math.PI/2;const ce=m(Ie,"Throttle butterfly"),Se=g(ce,8,1,a);Se.rotation.y=Math.PI/2,x(ce,vt(0,0,-10),vt(0,0,10),1.1,r);const Pe=m(Ie,"Throttle actuating lever",0,0,10);_(Pe,3,13,2,h,0,-5,0,1.4),S(Pe,0,0,2,1.4);const Ge=[vt(140,79,20),vt(130,100,-13),vt(96,115,-23),vt(36,117,-23),vt(23,116,-10)];u(new ea(new fo(Ge),100,6,32,!1),o,A);for(const ie of[39,94]){const Te=y(v,3.2,.7,a,0,ie,0);Te.rotation.x=Math.PI/2}w(v,"ω  /  FEEDBACK",25,3.3,0,-31,3);const G=[...A.children],we=new Set([W,N,...L,...ge,...ke]),re=new Set([$,D,Me[0],Me[1]]),Ee=m(A,"Cylinder / piston / valve train assembly"),Ne=m(A,"Crankshaft / flywheel / timing assembly"),oe=m(A,"Housing / service covers / mounting bed assembly");for(const ie of G)(we.has(ie)?Ee:re.has(ie)?Ne:oe).add(ie);const Ce=[...P,Be,Z,le,...L,E].map((ie,Te)=>({part:ie,i:Te,rotation:ie.rotation.clone()}));function Oe(ie,Te=null,Ue=0,$e={}){Ue=Number.isFinite(Ue)?Ue:0;const We=Nt=>Ze.clamp(Number.isFinite(Nt)?Nt:0,0,1),tt=(Nt,gn=0,T=1)=>{const Y=We((Nt-gn)/(T-gn));return Y*Y*(3-2*Y)},at=We($e.openFront),mt=We($e.componentRow),ot=tt(mt),xt=vd(ie),je=Te===null?xt:{...vd(Te),covers:xt.covers,cylinder:xt.cylinder,isolate:xt.isolate,t:xt.t},{theta:nn}=je,zt=Ze.lerp(je.covers,.15,ot),jt=Ze.lerp(je.cylinder,.18,ot),Tn=$e.retainEngine?0:je.isolate*(1-ot);$.rotation.z=-nn,Me[0].rotation.z=-nn,Me[1].rotation.z=nn/2+Math.PI/40,Me[2].rotation.z=-nn,W.position.y=je.pistonY+2,N.position.set(je.crankX,je.crankY,0),N.rotation.z=Math.atan2(je.crankX,je.pistonY-je.crankY);for(let Nt=0;Nt<2;Nt++){const gn=Nt?je.exhaust:je.intake,T=De[Nt];de[Nt].rotation.z=nn/2;const Y=Math.asin(gn/T.arm);T.group.rotation.z=Y,ne[Nt].position.x=T.pivotX-T.arm*Math.cos(Y),ne[Nt].position.y=-gn,ve[Nt].scale.y=16-gn;const fe=vt(T.pivotX+T.pushArm*Math.cos(Y),142+T.pushArm*Math.sin(Y),T.z);M(B[Nt],vt(fe.x,8+gn*T.pushArm/T.arm,T.z),fe)}P[0].position.set(-16*zt,0,-22-42*zt),P[1].position.set(-22*zt,-4*zt,22+55*zt),Be.position.set(47+21*zt,0,44+69*zt),Z.position.y=153+50*zt,le.position.y=120+37*jt,L[0].position.set(-39*jt,5*jt,-22*jt),L[1].position.set(-49*jt,5*jt,40*jt),E.position.y=-22*jt,A.position.x=-1200*Tn,A.visible=Tn<.999,A.position.y=-24*Tn,v.position.set(96-40*Tn,12*Tn,12+16*Tn);const En=We($e.spread)*(1-ot);v.position.x+=90*En,P[0].position.x-=70*En,P[1].position.x+=35*En,Be.position.z+=70*En,Z.position.y+=55*En,le.position.y+=25*En,L[0].position.x-=55*En,L[1].position.z+=60*En,X.rotation.y=nn,C.rotation.z=-nn,b.rotation.y=nn,ee.forEach((Nt,gn)=>{const T=gn?1:-1;Nt.position.set(T*je.governorRadius,83-je.governorHeight,0),Nt.userData.pin.position.copy(Nt.position),Nt.userData.pin.position.z=7}),me.forEach(({upper:Nt,lower:gn,side:T})=>{const Y=vt(T*je.governorRadius,83-je.governorHeight,0);M(Nt,vt(0,83,0),Y),M(gn,Y,vt(0,je.sleeveY,0))}),be.position.y=je.sleeveY,_e.position.y=je.sleeveY;const Pi=je.bellAngle;ae.rotation.z=Pi,ce.rotation.z=-je.throttle,Pe.rotation.z=je.throttleAngle;const _r=vt(je.feedbackX,je.feedbackY,18),hs=vt(52+10*Math.sin(je.throttleAngle),79-10*Math.cos(je.throttleAngle),18);M(xe,_r,hs);for(const{part:Nt,i:gn,rotation:T}of Ce)Nt.rotation.copy(T),Nt.position.y+=Math.sin(Ue*.55+gn*1.4)*zt*.7,Nt.rotation.z+=Math.sin(Ue*.38+gn*1.9)*zt*.003;const ra=tt(at,0,.7),aa=tt(at,.2,1);return P[1].position.x-=84*ra,P[1].rotation.y-=Math.PI/2*aa,Be.position.x+=96*ra,Be.rotation.y+=Math.PI/2*aa,Ee.position.set(-65*ot,-55*ot,8*ot),Ne.position.set(70*ot,32*ot,0),v.position.lerp(vt(195,-3,8),ot),oe.position.set(-215*ot,20*ot,0),oe.visible=!0,je.openFront=at,je.componentRow=mt,je.accessoriesVisible=oe.visible,je.frontPlatePositions=[P[1].position.toArray(),Be.position.toArray()],je.frontPlateAngles=[P[1].rotation.y,Be.rotation.y],je.componentPositions=[oe.position.toArray(),Ee.position.toArray(),Ne.position.toArray(),v.position.toArray()],n.userData.state=je,je}Oe(0);function ht(){for(const ie of f)ie.dispose();for(const ie of Object.values(i))ie.dispose();for(const ie of d)ie.dispose();n.removeFromParent()}return{group:n,update:Oe,dispose:ht}}const x1=n=>Ze.clamp(Number.isFinite(n)?n:0,0,1),kr=(n,e,t)=>Ze.smootherstep(n,e,t);function nr(n,e,t){const i=new rn,s=-n/2,r=-e/2;return i.moveTo(s+t,r),i.lineTo(s+n-t,r),i.quadraticCurveTo(s+n,r,s+n,r+t),i.lineTo(s+n,r+e-t),i.quadraticCurveTo(s+n,r+e,s+n-t,r+e),i.lineTo(s+t,r+e),i.quadraticCurveTo(s,r+e,s,r+e-t),i.lineTo(s,r+t),i.quadraticCurveTo(s,r,s+t,r),i}function er(n,e,t,i,s=0,r=0){const a=nr(e,t,i).getPoints(6),o=new wn(a.reverse().map(l=>new Ae(l.x+s,l.y+r)));n.holes.push(o)}function b1(n,e,t,i){const s=new wn;s.absarc(e,t,i,0,Math.PI*2,!0),n.holes.push(s)}function tr(n,e,t=.008){const i=Math.min(t,e/4),s=e-i*2,r=new Xn(n,{depth:s,bevelEnabled:i>0,bevelSize:i,bevelThickness:i,bevelSegments:2,curveSegments:10,steps:1});return r.translate(0,0,-s/2),r}function _1(){const e=new Uint8Array(16384);let t=73;for(let s=0;s<64;s++){t=Math.imul(t,1664525)+1013904223>>>0;for(let r=0;r<64;r++){const a=205+t%37,o=(s*64+r)*4;e[o]=e[o+1]=e[o+2]=a,e[o+3]=255}}const i=new Cs(e,64,64);return i.wrapS=i.wrapT=ls,i.repeat.set(2,5),i.needsUpdate=!0,i}function w1(){const n=new St;n.name="Coordinated autonomous compute swarm";const e=_1(),t=new Ct({color:"#a9b9bf",metalness:.86,roughness:.39,roughnessMap:e,bumpMap:e,bumpScale:35e-5,envMapIntensity:.7}),i=new Ct({color:"#425e70",metalness:.8,roughness:.38,envMapIntensity:.75}),s=new Ct({color:"#182634",metalness:0,roughness:.5}),r=new Ct({color:"#185a64",metalness:.2,roughness:.45}),a=new Ct({color:"#d6a269",metalness:.85,roughness:.33}),o=new Ct({color:"#142c42",metalness:.25,roughness:.15}),l=new Ct({color:"#88e6ee",emissive:"#2fc4e1",emissiveIntensity:.65,roughness:.35}),c=new Ct({color:"#ffb267",emissive:"#f07535",emissiveIntensity:.45,roughness:.4}),h=[t,i,s,r,a,o,l,c],f=new Set,d=(z,U,W,te=.015)=>new bi(z,U,W,2,te);function u(z,U){const W=new St;W.name=z,U.add(W);const te=new Map;return{group:W,add(L,j,le=0,Z=0,F=0,Q=0,q=0,ye=0){L.applyMatrix4(new Rt().compose(new I(le,Z,F),new Wi().setFromEuler(new Ri(Q,q,ye)),new I(1,1,1)));const ge=te.get(j)||[];ge.push(L.index?L.toNonIndexed():L),L.index&&L.dispose(),te.set(j,ge)},finish(){for(const[L,j]of te){const le=kc(j);j.forEach(F=>F.dispose()),f.add(le);const Z=new yt(le,L);Z.name=`${z} — ${h.indexOf(L)}`,Z.castShadow=!0,Z.receiveShadow=!0,W.add(Z)}return W}}}const m=u("Docking backplane with nine recessed contact sockets",n),_=nr(4.05,3.18,.19);for(let z=-1;z<=1;z++)for(let U=-1;U<=1;U++)er(_,.85,.45,.07,U*1.3,z*.94);m.add(tr(_,.14,.015),i,0,0,-.7);for(const z of[-1.93,1.93])m.add(d(.1,2.9,.17),t,z,0,-.63);for(const z of[-1.49,1.49])m.add(d(3.85,.065,.08),a,0,z,-.79);for(const z of[-1.88,1.88])for(const U of[-1.41,1.41])m.add(new sn(.057,.057,.04,12),s,z,U,-.6,Math.PI/2),m.add(new sn(.029,.029,.043,8),t,z,U,-.59,Math.PI/2);m.finish();const g=u("Nine dock recessed guides and power contacts",n),p=[];for(let z=0;z<9;z++){const U=z%3-1,W=1-Math.floor(z/3),te=new St;te.name=`Agent ${z+1}: vented autonomous compute capsule`,n.add(te);const L=u(`Agent ${z+1} hollow chassis, optical recess and PCB`,te),j=new rn;j.moveTo(-.56,.3),j.lineTo(-.56,-.215),j.quadraticCurveTo(-.56,-.335,-.44,-.335),j.lineTo(.44,-.335),j.quadraticCurveTo(.56,-.335,.56,-.215),j.lineTo(.56,.3),j.quadraticCurveTo(.56,.335,.525,.335),j.lineTo(.49,.335),j.lineTo(.49,-.205),j.quadraticCurveTo(.49,-.265,.43,-.265),j.lineTo(-.43,-.265),j.quadraticCurveTo(-.49,-.265,-.49,-.205),j.lineTo(-.49,.335),j.lineTo(-.525,.335),j.quadraticCurveTo(-.56,.335,-.56,.3),L.add(tr(j,.63,.009),t);const le=nr(1.09,.65,.105);er(le,.99,.55,.075),L.add(tr(le,.025,.003),s,0,0,.331);const Z=nr(1.055,.595,.085);b1(Z,-.265,.035,.115),er(Z,.255,.105,.026,.22,-.095),er(Z,.19,.045,.018,.23,.12),L.add(tr(Z,.065,.007),i,0,0,.36),L.add(new xr(.097,.013,6,24),a,-.265,.035,.37),L.add(new sn(.085,.085,.022,24),o,-.265,.035,.34,Math.PI/2),L.add(new sn(.038,.038,.018,20),l,-.265,.035,.355,Math.PI/2),L.add(d(.18,.025,.018,.009),l,.23,.12,.35),L.add(d(.23,.07,.025,.012),s,.22,-.095,.334);for(let ge=0;ge<5;ge++)L.add(d(.023,.03,.025,.003),a,.135+ge*.04,-.095,.355);L.add(d(.89,.04,.51),r,0,-.14,-.018),L.add(d(.32,.065,.29,.015),s,-.16,-.089,-.01),L.add(d(.29,.03,.27,.01),a,-.16,-.043,-.01);for(let ge=0;ge<7;ge++)L.add(d(.025,.115,.235,.003),t,-.28+ge*.04,.025,-.01);for(const ge of[-.16,-.055,.05,.155])L.add(d(.19,.043,.069,.005),s,.27,-.095,ge);for(const ge of[-.41,.41])for(const Me of[-.2,.2])L.add(new sn(.025,.025,.08,8),a,ge,-.08,Me),L.add(new sn(.032,.032,.018,8),i,ge,-.027,Me);for(const ge of[-.42,.42])for(const Me of[-.225,.225])L.add(new sn(.033,.033,.018,12),t,ge,Me,.404,Math.PI/2),L.add(d(.032,.007,.005,.001),s,ge,Me,.415);const F=nr(1.04,.59,.08);er(F,.65,.17,.025,0,-.02),L.add(tr(F,.04,.004),i,0,0,-.318);for(let ge=0;ge<6;ge++)L.add(d(.045,.105,.15,.008),a,-.25+ge*.1,-.02,-.365);L.finish();const Q=new St;Q.name=`Agent ${z+1} reversible hinged perforated lid`,Q.position.set(0,.343,-.31),te.add(Q);const q=u(`Agent ${z+1} pierced cover and machined hinge`,Q),ye=nr(1.08,.6,.095);for(let ge=0;ge<6;ge++)er(ye,.065,.36,.025,-.285+ge*.114,0);q.add(tr(ye,.048,.004),t,0,0,.3,-Math.PI/2);for(const ge of[-.35,.35])q.add(new sn(.043,.043,.18,12),i,ge,-.008,0,0,0,Math.PI/2);q.finish(),g.add(d(1.13,.1,.63),s,U*1.3,W*.94-.385,-.34);for(const ge of[-1,1])g.add(d(.07,.54,.38),i,U*1.3+ge*.57,W*.94,-.43);g.add(d(.66,.26,.09),s,U*1.3,W*.94,-.73);for(let ge=0;ge<6;ge++)g.add(d(.045,.09,.03,.004),a,U*1.3-.25+ge*.1,W*.94,-.675);p.push({root:te,hinge:Q,col:U,row:W,dock:new I(U*1.3,W*.94,-.54),target:new I(U*2.35+(W===0?.12:0),W*1.73,.5+z%3*.22)})}g.finish();const x=u("Permission perimeter with isolated escalation gate",n);for(const z of[-2.26,2.26])x.add(d(6.45,.026,.026,.007),i,0,z,-.42);x.add(d(.026,4.52,.026,.007),i,-3.225,0,-.42);for(const z of[-3.225,3.225])for(const U of[-2.26,2.26])x.add(d(.16,.16,.045,.025),l,z,U,-.42);x.finish();const M=u("Permission gate opens for the exceptional agent",n);M.add(d(.032,4.36,.032,.009),c),M.finish();const y=20,S=new Float32Array(9*y*2*3),w=new Mt;w.setAttribute("position",new Jt(S,3).setUsage(yi)),f.add(w);const A=new Ps({color:"#64c9d4",transparent:!0,opacity:.38,depthWrite:!1}),v=new Rc(w,A);v.name="Nine independently routed task signals",v.frustumCulled=!1,n.add(v);const E=d(.055,.055,.13,.012);f.add(E);const R=new Dn(E,l,18);R.name="Travelling task packets",R.frustumCulled=!1,n.add(R);const P=new Bt,D=new I,$=new I,se=new I;let V={};function H(z,U,W){const te=z.dock,L=z.root.position,j=1-U;W.set(j*j*j*te.x+3*j*U*U*L.x+U*U*U*L.x,j*j*j*te.y+3*j*j*U*te.y+3*j*U*U*L.y+U*U*U*L.y,j*j*j*te.z+3*j*j*U*(te.z-.32)+3*j*U*U*(L.z-.75)+U*U*U*(L.z-.4)),W.x+=3*j*j*U*te.x}function N(z,U=0){const W=x1(z),te=Number.isFinite(U)?U:0,L=kr(W,.12,.65),j=kr(W,.38,.84),le=kr(W,.77,1);p.forEach((Z,F)=>{const Q=kr(W,.12+F*.012,.63+F*.012),q=Q*.055;Z.root.position.set(Z.col*1.3+(Z.target.x-Z.col*1.3)*Q+Math.sin(te*.21+F*1.9)*q,Z.row*.94+(Z.target.y-Z.row*.94)*Q+Math.sin(te*.26+F*1.4)*q,-.05+(Z.target.z+.05)*Q+Math.sin(te*.18+F)*q),F===5&&(Z.root.position.x+=le*.47,Z.root.position.z+=le*.48),Z.root.rotation.set(-.08*Q+Math.sin(te*.19+F)*.017*Q,-Z.col*.11*Q+Math.sin(te*.16+F*2)*.025*Q,Z.col*.045*Q),Z.hinge.rotation.x=-1.23*kr(W,.38+F*.008,.82+F*.008);for(let ye=0;ye<y;ye++){const ge=(F*y+ye)*6;H(Z,ye/y,$),H(Z,(ye+1)/y,se),$.toArray(S,ge),se.toArray(S,ge+3)}for(let ye=0;ye<2;ye++){const ge=((te*.058+F*.137+ye*.5)%1+1)%1;H(Z,ge,$),H(Z,Math.min(1,ge+.008),D),P.position.copy($),P.lookAt(D),P.scale.setScalar(L),P.updateMatrix(),R.setMatrixAt(F*2+ye,P.matrix)}}),M.group.position.set(3.225+le*.2,0,-.42-le*.5),M.group.rotation.y=le*.6,x.group.visible=W>.27,M.group.visible=W>.27,v.visible=L>.001,R.visible=v.visible,A.opacity=.12+L*.27,w.attributes.position.needsUpdate=!0,R.instanceMatrix.needsUpdate=!0,V={progress:W,release:L,lidOpening:j,permissionBreach:le,agentCount:p.length,capsules:p.map(Z=>({position:Z.root.position.toArray(),rotation:Z.root.rotation.toArray().slice(0,3),lidAngle:Z.hinge.rotation.x})),gatePosition:M.group.position.toArray()}}return N(0,0),{group:n,update:N,get state(){return V},dispose(){f.forEach(z=>z.dispose()),h.forEach(z=>z.dispose()),A.dispose(),e.dispose(),n.clear(),n.removeFromParent()}}}const Nn=(n,e,t)=>Ze.smootherstep(n,e,t),cr=n=>Ze.clamp(Number.isFinite(n)?n:0,0,1);function dn(n,e,t=.08){const i=new rn,s=-n/2,r=-e/2;return i.moveTo(s+t,r),i.lineTo(s+n-t,r),i.quadraticCurveTo(s+n,r,s+n,r+t),i.lineTo(s+n,r+e-t),i.quadraticCurveTo(s+n,r+e,s+n-t,r+e),i.lineTo(s+t,r+e),i.quadraticCurveTo(s,r+e,s,r+e-t),i.lineTo(s,r+t),i.quadraticCurveTo(s,r,s+t,r),i}function oi(n,e,t,i=.05,s=0,r=0){const o=dn(e,t,i).getPoints(12).map(l=>new Ae(l.x+s,l.y+r));return n.holes.push(new wn(o.reverse())),n}function _s(n,e,t,i){const s=new wn;return s.absarc(e,t,i,0,Math.PI*2,!0),n.holes.push(s),n}function un(n,e=.12,t=.012){const i=Math.min(t,e/4),s=e-i*2,r=new Xn(n,{depth:s,bevelEnabled:!0,bevelSize:i,bevelThickness:i,bevelSegments:3,curveSegments:12,steps:1});return r.translate(0,0,-s/2),r}function bt(n,e,t,i=0,s=0,r=0){const a=new yt(e,t);return a.position.set(i,s,r),a.castShadow=a.receiveShadow=!0,n.add(a),a}function Ot(n,e,t,i,s,r=0,a=0,o=0,l=.035){return bt(n,new bi(e,t,i,2,Math.min(l,e/4,t/4,i/4)),s,r,a,o)}function bn(n,e){const t=new St;return t.name=e,n.add(t),t}function M1(){const e=new Uint8Array(65536);let t=71;const i=()=>(t=Math.imul(t,1664525)+1013904223>>>0)/4294967296;for(let r=0;r<128;r++){const a=i();for(let o=0;o<128;o++){const l=(r*128+o)*4,c=208+Math.floor(32*(.85*a+.15*i()));e[l]=e[l+1]=e[l+2]=c,e[l+3]=255}}const s=new Cs(e,128,128);return s.wrapS=s.wrapT=ls,s.repeat.set(2,5),s.needsUpdate=!0,s}function Oc(n="#c59a64"){const e=M1();return{metal:new Ct({color:"#919eaa",metalness:.78,roughness:.4,roughnessMap:e,bumpMap:e,bumpScale:6e-4}),dark:new Ct({color:"#293640",metalness:.15,roughness:.48}),edge:new Ct({color:"#566b76",metalness:.7,roughness:.34,roughnessMap:e}),accent:new Ct({color:n,metalness:.72,roughness:.36}),ink:new Ct({color:"#dae5e8",metalness:.15,roughness:.42}),signal:new Ct({color:"#9ce5db",emissive:"#54bbaa",emissiveIntensity:.65,roughness:.35})}}function Fc(n){const e=new Set;n.traverse(t=>{t.geometry&&e.add(t.geometry);for(const i of[t.material].flat().filter(Boolean)){e.add(i);for(const s of Object.values(i))s?.isTexture&&e.add(s)}}),e.forEach(t=>t.dispose()),n.clear(),n.removeFromParent()}function S1(){const n=new St;n.name="Provenance cartridge archive";const e=Oc(),t=bn(n,"Archive rack enclosure"),i=bn(t,"Archive chassis"),s=[],r=[],a=[],o=[],l=un(_s(dn(.11,.11,.045),0,0,.017),.035,.005),c=new sn(.027,.027,1.7,10),h=un(dn(2.6,1.12,.075),.035,.005);for(const y of[-.86,.84]){const S=oi(dn(3.8,3.28,.15),3.38,2.89,.1);for(const w of[-1.77,1.77])for(const A of[-1.49,1.49])_s(S,w,A,.04);bt(i,un(S,.13),e.metal,0,0,y);for(const w of[-1.77,1.77])for(const A of[-1.49,1.49])bt(i,l,e.edge,w,A,y+.085)}Ot(i,3.58,.16,1.66,e.dark,0,-1.53,0);for(const y of[-1.72,1.72])Ot(i,.11,2.96,1.72,e.edge,y,0,0);for(const y of[-1.45,1.45])Ot(i,.37,.18,.9,e.dark,y,-1.72,-.05);const f=bn(t,"Vented archive service lid"),d=dn(3.58,1.68,.1);for(let y=0;y<9;y++)oi(d,.11,1.12,.045,(y-4)*.3,0);bt(f,un(d,.11),e.metal).rotation.x=-Math.PI/2,f.position.y=1.58;for(const y of[-1,1]){const S=bn(t,y<0?"Left archive service panel":"Right archive service panel"),w=oi(dn(1.62,2.82,.09),1.15,1.8,.1);bt(S,un(w,.11),e.metal).rotation.y=Math.PI/2,Ot(S,.065,1.86,1.19,e.dark,-.035*y,0,0),S.position.x=y*1.85,o.push({side:S,sign:y})}const u=un(oi(dn(3.18,1.48,.1),2.84,1.19,.07),.085),m=dn(3.19,.49,.07);oi(m,1,.14,.055,.05,-.055);const _=un(m,.13),g=new sn(.052,.052,.22,16),p=new Fn(.06,.025,.05);for(let y=0;y<4;y++){const S=(y-1.5)*.69;for(const R of[-1.6,1.6]){const P=bt(i,c,e.accent,R,S-.18,0);P.rotation.x=Math.PI/2}const w=bn(n,`Archive cartridge ${y+1}`);s.push(w),bt(w,u,e.edge,0,-.16,0).rotation.x=-Math.PI/2,bt(w,_,e.metal,0,0,.8),Ot(w,.33,.15,.025,e.accent,-1.19,.025,.885);for(let R=0;R<=y;R++)Ot(w,.023,.073,.028,e.dark,-1.29+R*.055,.025,.905);Ot(w,.23,.055,.022,e.signal,1.18,.025,.885);const A=bn(w,`Layered provenance records ${y+1}`);r.push(A);for(let R=0;R<3;R++)bt(A,h,R===2?e.accent:R===1?e.ink:e.dark,0,-.13+R*.065,-.055).rotation.x=-Math.PI/2;for(let R=0;R<5;R++)Ot(A,2.32-R*.18,.013,.022,e.edge,-.08,.022,-.44+R*.19);const v=bn(w,`Optical scan head ${y+1}`);a.push(v),Ot(v,.21,.11,1.13,e.dark,0,.16,-.05);for(const R of[-.42,.35])bt(v,g,e.edge,0,.16,R).rotation.z=Math.PI/2;Ot(v,.028,.016,.96,e.signal,0,.097,-.05);const E=bt(A,p,e.signal,0,.04,-.06);A.userData.packet=E}let x;function M(y,S=0,w={}){y=cr(y);const A=Number.isFinite(S)?S:0,v=cr(w?.cartridgesOnly??0),E=cr(w?.assembly??1),R=Nn(E,.15,.7),P=Nn(v,0,.34),D=Nn(v,.16,.88),$=Nn(v,.12,1),se=Nn(y,.12,.62),V=Nn(y,.42,1);t.position.set(-30*$+8*(1-R),3*(1-R),-1.2*(1-R)),t.visible=v<.999&&E>.15,f.position.y=1.58+.66*se+3.2*(1-Nn(E,.5,.94)),o.forEach(({side:H,sign:N})=>H.position.x=N*(1.85+.47*se+2.8*(1-Nn(E,.43,.9)))),s.forEach((H,N)=>{const z=Nn(y,.18+N*.055,.8+N*.04);H.position.set((N%2?1:-1)*.28*V,(N-1.5)*(.69+.2*V),.87*z),H.position.x=Ze.lerp(H.position.x,(N-1.5)*1.75,D),H.position.y=Ze.lerp(H.position.y,.5,D),H.position.z=Ze.lerp(H.position.z,1.3,P),H.scale.setScalar(Ze.lerp(1,.52,D)),H.rotation.set(.65*D,(N-1.5)*-.055*D,0);const U=N===0?1:Nn(E,.24+N*.1,.64+N*.12);H.visible=N===0||E>.24+N*.1,H.position.x+=(N%2?1:-1)*9*(1-U),H.position.y+=1.6*(1-U),H.position.z+=2.1*(1-U);const W=Ze.lerp(V,1.05,D);r[N].position.y=.19*W,a[N].position.x=Math.sin(A*.27+N*.9)*.99,a[N].position.y=.19*W,r[N].userData.packet.position.x=Math.sin(A*.22+N*.7)*.93}),x={progress:y,service:se,inspect:V,time:A,cartridgesOnly:v,extraction:P,row:D,assembly:E,rackArrival:R,rackPosition:t.position.toArray(),rackVisible:t.visible,departure:$,rackCleared:v>=.999,cartridges:s.map(H=>H.position.toArray()),cartridgeScale:s[0].scale.x,cartridgeVisible:s.map(H=>H.visible),scanHeads:a.map(H=>H.position.x)}}return M(0),{group:n,update:M,get state(){return x},dispose:()=>Fc(n)}}const A1={sha256:"9badb86c80b9d70d5de8044f5c4749ef71cf286923a121a2fc4eee15798cc821"},T1={columns:53,rows:7,missingCells:3,histogram:[107,233,22,3,3]},E1=[[1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,2,3,2,4,1,2,1],[0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0],[0,0,0,0,0,1,0,0,0,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1,1,0,1,1,2,1,2,1,1,1,1,2,1,1,1,1],[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,1,0,0,1,0,1,1,0,1,1,1,1,2,1,1,2,1,2,1,1,0,0],[0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,null],[0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,2,2,1,1,1,null],[1,1,0,0,0,0,0,1,0,1,0,1,1,1,1,1,0,1,1,1,3,1,2,2,2,1,1,1,0,1,1,4,1,1,1,1,0,1,1,0,1,1,1,1,2,2,3,2,4,1,1,0,null]],es={source:A1,sampling:T1,levels:E1},Ka=n=>Ze.clamp(Number.isFinite(n)?n:0,0,1),fl=(n,e=0,t=1)=>{const i=Ka((n-e)/(t-e));return i*i*i*(i*(i*6-15)+10)},Or=n=>n-Math.floor(n);function xd(){const n=new rn,e=.1;return[[-.5+e,-.5],[.5-e,-.5],[.5,-.5+e],[.5,.5-e],[.5-e,.5],[-.5+e,.5],[-.5,.5-e],[-.5,-.5+e]].forEach(([t,i],s)=>s?n.lineTo(t,i):n.moveTo(t,i)),n.closePath(),n}function R1(){const n=new St;n.name="Contribution crystals / agent collective";const e=new Array(8).fill(0),t=[];for(let H=0;H<es.sampling.rows;H++)for(let N=0;N<es.sampling.columns;N++){const z=es.levels[H][N];if(z===null)continue;const U=t.length%8;t.push({row:H,column:N,level:z,cluster:U,slot:e[U]++})}const i=t.length,s=[];for(let H=-1;H<=1;H++)for(let N=-1;N<=1;N++)for(let z=-1;z<=1;z++)(z||N||H)&&s.push(new I(z*.24,N*.24,H*.24));const r=t.map((H,N)=>{const z=N*2.399963229728653,U=22+9*Or(N*.61803398875);return new I(Math.cos(z)*U,Math.sin(z)*U*.72,Math.sin(N*1.71)*4)}),a=new Xn(xd(),{depth:.88,steps:1,bevelEnabled:!0,bevelSegments:1,bevelSize:.045,bevelThickness:.06,curveSegments:1});a.translate(0,0,-.44),a.computeBoundingBox();const o=a.boundingBox.getSize(new I);a.scale(1/o.x,1/o.y,1/o.z);const l=new So(xd()),c=new kn({color:16777215,metalness:.42,roughness:.26,clearcoat:.58,clearcoatRoughness:.22,emissive:468249,emissiveIntensity:.25,transparent:!0,opacity:1}),h=new Kt({color:16777215,transparent:!0,opacity:.25,depthWrite:!1,toneMapped:!1}),f=new Dn(a,c,i);f.name="Screenshot cells / persistent crystals";const d=new Dn(l,h,i);d.name="Quiet luminous crystal faces";for(const H of[f,d])H.instanceMatrix.setUsage(yi),H.frustumCulled=!1,n.add(H);const u=["#183b3e","#27865b","#43ba80","#71e9ad","#b7ffdc"].map(H=>new it(H)),m=[[-2.4,.8,0],[-.85,1.03,-.06],[.85,.98,.02],[2.38,.65,-.08],[-2.22,-.82,.12],[-.7,-.8,0],[.9,-.73,.12],[2.38,-.92,0]].map(H=>new I(...H)),_=m.map(H=>H.clone()),g=[[0,1],[1,2],[2,3],[4,5],[5,6],[6,7],[0,4],[1,5],[2,6],[3,7],[1,6],[2,5]],p=new Mt;p.setAttribute("position",new pt(new Float32Array(g.length*6),3));const x=new Ps({color:1530995,transparent:!0,opacity:0,depthWrite:!1}),M=new Rc(p,x);M.name="Collective communication links",M.frustumCulled=!1,n.add(M);const y=new Kt({color:12058599,transparent:!0,opacity:0,depthWrite:!1,toneMapped:!1}),S=new Dn(new Nc(.043,0),y,g.length*2);S.name="Communication pulses",S.frustumCulled=!1,S.instanceMatrix.setUsage(yi),n.add(S);const w=new Bt,A=new it,v=new I,E=new I,R=new I,P=new Wi,D=new I(0,1,0);let $;function se(H={},N=0){const z=Ka(H.strength??1),U=Ka(H.morph??0),W=Number.isFinite(N)?N:0,te=fl(U,.45,.92),L=Ka(H.arrival??1);if(z<=.001&&$)return n.visible=!1,$={...$,strength:z,morph:U,time:W,network:te},n.userData.state=$,$;n.visible=z>.001,c.opacity=1,h.opacity=.27,x.opacity=z*te*.72,y.opacity=z*te*.9;for(let le=0;le<8;le++)_[le].copy(m[le]).add(new I(Math.sin(W*.19+le*1.8)*.065,Math.sin(W*.27+le*1.4)*.11,Math.cos(W*.17+le)*.07));t.forEach((le,Z)=>{const{row:F,column:Q,level:q,cluster:ye,slot:ge}=le,Me=fl(U,Q/es.sampling.columns*.065,.92+Q/es.sampling.columns*.065),Be=.095+q*.038,Le=(Q-26)*14/53,pe=(3-F)*.285,K=ge<26;if(K)v.copy(s[ge]);else{const Re=ge-26;v.set((Re%2-.5)*.06,(Math.floor(Re/2)%2-.5)*.06,(Math.floor(Re/4)-2)*.035)}const de=Math.sin(W*.16+ye*.7)*.24;P.setFromAxisAngle(D,de),E.copy(v).applyQuaternion(P).add(_[ye]);const De=fl(L,Or(Z*.381966)*.13,.85+Or(Z*.618)*.15);w.position.set(Ze.lerp(Le,E.x,Me),Ze.lerp(pe,E.y,Me),Ze.lerp(Be*.5,E.z,Me)+Math.sin(Me*Math.PI)*(.28+.04*(Z%5))),w.position.addScaledVector(r[Z],1-De),w.rotation.set((1-De)*Math.PI*2*Or(Z*.71),Me*de+(1-De)*Math.PI*2,0);const B=K?.24:.03,ne=Ze.lerp(.207,B,Me);w.scale.set(ne,ne,Ze.lerp(Be,B,Me)),w.updateMatrix(),f.setMatrixAt(Z,w.matrix);const ve=.88+.15*Math.sin(W*.85-Q*.23+F*.38)+.045*Math.sin(W*.47+Q*.51);A.copy(u[q]).multiplyScalar(ve),f.setColorAt(Z,A),d.setColorAt(Z,A),R.set(0,0,w.scale.z*.505).applyQuaternion(w.quaternion),w.position.add(R),w.scale.set(ne*.81,ne*.81,1),w.updateMatrix(),d.setMatrixAt(Z,w.matrix)}),f.instanceMatrix.needsUpdate=d.instanceMatrix.needsUpdate=!0,f.instanceColor.needsUpdate=d.instanceColor.needsUpdate=!0;const j=p.attributes.position;return g.forEach(([le,Z],F)=>{const Q=_[le],q=_[Z];j.setXYZ(F*2,Q.x,Q.y,Q.z-.1),j.setXYZ(F*2+1,q.x,q.y,q.z-.1);for(let ye=0;ye<2;ye++){const ge=Or(W*.18+F*.173+ye*.5);w.position.copy(Q).lerp(q,ge),w.position.z-=.09,w.rotation.set(0,0,W*.4+F),w.scale.setScalar(.75+.25*Math.sin(Math.PI*ge)),w.updateMatrix(),S.setMatrixAt(F*2+ye,w.matrix)}}),j.needsUpdate=!0,S.instanceMatrix.needsUpdate=!0,$={strength:z,morph:U,arrival:L,assemblyShape:"regular-cube",arrivalDirections:8,time:W,cells:i,columns:53,rows:7,clusters:8,clusterSizes:e.slice(),network:te,drawCalls:4,sourceLevels:es.sampling.histogram.slice(),omittedCells:es.sampling.missingCells,sourceSha256:es.source.sha256},n.userData.state=$,$}se({strength:1,morph:0},0);function V(){for(const H of[f,d,S,M])H.geometry.dispose(),H.material.dispose(),H.dispose?.();n.clear(),n.removeFromParent()}return{group:n,update:se,dispose:V,get state(){return $}}}function C1(){const n=new St;n.name="From constellations to a spiral galaxy",n.renderOrder=210;const e=6800,t=new Float32Array(e*3),i=new Float32Array(e*3),s=new Float32Array(e),r=p=>{const x=Math.sin(p*127.1+31.7)*43758.5453;return x-Math.floor(x)};for(let p=0;p<e;p++){const x=p*3,M=Math.pow(r(p+1),p%9===0?2.4:.7)*3.9,y=p%4,S=y*Math.PI/2+M*1.7+(r(p+6)-.5)*.48;t[x]=(r(p+12)*2-1)*10,t[x+1]=(r(p+20)*2-1)*5.65,t[x+2]=8,i[x]=Math.cos(S)*M,i[x+1]=Math.sin(S)*M,i[x+2]=(r(p+50)-.5)*(.15+.25*(1-M/4)),s[p]=r(p+90)}const a={uTime:{value:0},uSpace:{value:0},uGather:{value:0},uPixel:{value:1}},o=new Mt;o.setAttribute("position",new Jt(t,3)),o.setAttribute("target",new Jt(i,3)),o.setAttribute("seed",new Jt(s,1));const l=new An({uniforms:a,transparent:!0,depthWrite:!1,depthTest:!1,toneMapped:!1,blending:ur,vertexShader:`attribute vec3 target;attribute float seed;uniform float uTime,uSpace,uGather,uPixel;varying float vSeed,vAlpha;
    void main(){float a=uTime*.027;vec2 spun=mat2(cos(a),-sin(a),sin(a),cos(a))*target.xy;
    vec3 goal=vec3(4.25+spun.x*.90,spun.y*1.04,8.);
    float background=step(.84,fract(seed*47.13));
    float gather=smoothstep(seed*.14,.86+seed*.14,uGather)*(1.-background);
    vec3 p=mix(position,goal,gather);p.xy+=vec2(sin(uTime*.06+seed*51.),cos(uTime*.05+seed*73.))*.025*(1.-gather);
    gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);
    gl_PointSize=(1.6+pow(seed,7.)*24.)*uPixel;vSeed=seed;vAlpha=uSpace*(.78+.18*sin(uTime*.4+seed*38.))*(1.-background*uGather*.65);}`,fragmentShader:"varying float vSeed,vAlpha;void main(){float r=length(gl_PointCoord-.5)*2.;float core=exp(-r*r*18.);float halo=exp(-r*r*4.)*.24;float hue=fract(vSeed*13.71);vec3 c=hue<.20?vec3(1.,.64,.35):hue<.65?vec3(.55,.80,1.):vec3(.96,.98,1.);gl_FragColor=vec4(c,(core+halo)*vAlpha*(1.-smoothstep(.75,1.,r)));}"}),c=new Cc(o,l);c.frustumCulled=!1,c.renderOrder=212,n.add(c);const h=new yt(new ti(24,14),new Kt({color:"#060c12",transparent:!0,opacity:0,depthWrite:!1,depthTest:!1,toneMapped:!1}));h.position.z=7.8,h.renderOrder=210,n.add(h);const f=new yt(new ti(4,4),new An({uniforms:a,transparent:!0,depthWrite:!1,depthTest:!1,toneMapped:!1,blending:ur,vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying vec2 vUv;uniform float uGather,uSpace;void main(){float r=length(vUv-.5)*2.;float a=exp(-r*r*12.)*.22+exp(-r*r*180.)*.75;gl_FragColor=vec4(.78,.87,1.,a*uGather*uSpace);}"}));f.position.set(4.25,0,8.1),f.renderOrder=211,n.add(f);const d=[[-8,2.8],[-6.9,3.5],[-5.6,2.9],[-4.8,3.8],[-3.8,3.1],[-5.6,2.9],[-5.8,1.7],[-6.9,1.1],[-7.6,1.7],[-5.8,1.7]],u=new Vr(new Mt().setFromPoints(d.map(([p,x])=>new I(p,x,8))),new Ps({color:"#789bbd",transparent:!0,opacity:0,depthWrite:!1,depthTest:!1}));u.renderOrder=211,n.add(u);let m=null,_=!1,g={};return{group:n,get state(){return g},update(p,x,M=!1){const y=p.galaxy>.001;y&&!_&&(m=x),y||(m=null),_=y;const S=y?Ze.smoothstep(Math.max(0,x-m),0,8):0,w=M?p.galaxy:S*p.galaxy;a.uTime.value=x,a.uSpace.value=p.space||0,a.uGather.value=w,a.uPixel.value=Math.max(.5,Math.min(2,(typeof innerHeight=="number"?innerHeight:1080)/1080)),h.material.opacity=p.space||0,u.material.opacity=(p.space||0)*.15*(1-w),n.visible=(p.space||0)>.001,g={stars:e,space:p.space,gather:w,rotation:x*.027}},dispose(){n.traverse(p=>{p.geometry?.dispose(),p.material?.dispose()})}}}function P1(){const n=new St;n.name="Delegation credential instrument";const e=Oc("#c69a70"),t=[],i=[],s=[],r=[],a=[],o=[],l=[],c=[],h=[],f=[],d=new Ct({color:"#244e50",metalness:.24,roughness:.5}),u=new kn({color:"#91bbc6",metalness:0,roughness:.24,transparent:!0,opacity:.1,depthWrite:!1,side:On}),m=e.edge.clone(),_=e.accent.clone(),g=e.signal.clone();m.color.set("#a6bdc8"),m.emissive.set("#648594"),m.emissiveIntensity=.08;const p=[m,_,g];p.forEach(Z=>{Z.transparent=!0,Z.opacity=0});const x=bn(n,"Identity instrument docking cradle"),M=dn(2.06,1.73,.13);for(const Z of[-.7,.7])oi(M,.15,1.16,.06,Z,0);bt(x,un(M,.16),e.edge,0,-1.5,0).rotation.x=-Math.PI/2;for(const Z of[-.77,.77])Ot(x,.16,.22,1.56,e.dark,Z,-1.6,0);const y=oi(dn(1.68,2.66,.19),1.18,1.94,.13,0,.04);for(const Z of[-.66,.66])for(const F of[-1.16,1.16])_s(y,Z,F,.041);const S=un(y,.19,.022),w=un(oi(dn(1.23,1.99,.14),1.12,1.88,.1),.07,.008),A=un(_s(dn(.1,.1,.04),0,0,.014),.03,.004),v=dn(.31,.31,.07);_s(v,0,0,.077);const E=un(v,.047,.008),R=dn(.93,1.43,.08);oi(R,.33,.1,.045,0,.54);const P=un(R,.08,.009),D=new sn(.014,.014,1,8),$=new Gi(.033,10,8),se=un(oi(dn(.96,1.6,.09),.25,.1,.035,0,.64),.045,.007),V=un(dn(.038,.075,.014),.025,.004),H=un(oi(dn(1.84,2.83,.17),1.64,2.61,.13),.09,.01),N=un(dn(1.66,2.63,.13),.035,.006),z=["Authority root","Delegated scope","Runtime credential"];for(let Z=0;Z<3;Z++){const F=bn(n,`${z[Z]} gate`);t.push(F),bt(F,S,Z===0?e.accent:e.metal);const Q=bn(F,`${z[Z]} locating bezel`);o.push(Q),bt(Q,w,e.dark,0,.04,.12);for(const K of[-.66,.66])for(const de of[-1.16,1.16])bt(F,A,e.edge,K,de,.12);const q=[];for(const K of[-1,1]){const de=bn(F,`${z[Z]} ${K<0?"left":"right"} guide rail`);Ot(de,.08,1.61,.27,e.edge,0,-.04,-.06);for(const De of[-.67,.6])Ot(de,.13,.065,.15,e.accent,0,De,.06);q.push({rail:de,sign:K})}c.push(q);const ye=bn(F,`${z[Z]} secure processor backplane`);a.push(ye),bt(ye,se,d),Ot(ye,.39,.38,.075,e.dark,.09,.12,.061),Ot(ye,.24,.23,.025,e.edge,.09,.12,.106);for(let K=0;K<5;K++)Ot(ye,.022,.075,.026,e.accent,-.06+K*.075,-.11,.057),Ot(ye,.024,.29+K*.032,.013,e.accent,-.32+K*.14,-.39,.028);for(const K of[-.66,.62])bt(ye,A,e.edge,-.32,K,.045);for(let K=0;K<=Z;K++)Ot(F,.105,.15,.13,e.accent,(K-Z/2)*.22,-1.36,0);Ot(F,.57-Z*.09,.065,.025,e.signal,0,1.16,.12);const ge=bn(F,`${z[Z]} signed credential plate`);i.push(ge),bt(ge,P,e.ink),bt(ge,E,e.accent,-.22,.27,.066);for(let K=0;K<4;K++)Ot(ge,.63-(K+Z)%3*.09,.023,.012,e.edge,-.015,.02-K*.115,.049);for(let K=0;K<5;K++)Ot(ge,.045,.072+K%2*.035,.013,e.accent,-.25+K*.12,-.5,.05);Ot(ge,.78,.085,.1,e.dark,0,-.78,0);const Me=bn(F,`${z[Z]} credential latch`);Ot(Me,.43,.12,.22,e.edge,0,.89,.04),Ot(Me,.16,.03,.07,e.accent,0,.967,.06),l.push(Me);for(let K=0;K<6;K++){const de=e.signal.clone();Ot(F,.064,.105,.038,e.dark,.697,.6-K*.21,.106),bt(F,V,de,.697,.6-K*.21,.138),f.push({material:de,gate:Z,index:K})}const Be=bt(F,$,e.signal,-.64,.65,.13);s.push(Be);const Le=bn(F,`${z[Z]} protective shield`);h.push(Le),bt(Le,H,m);const pe=bt(Le,N,u,0,0,-.025);pe.castShadow=!1;for(const K of[-1,1]){Ot(Le,.075,2.65,.64,m,K*.865,0,-.3);for(const de of[-1.2,1.2])bt(Le,A,_,K*.84,de,.064);Ot(Le,.038,.38,.028,g,K*.872,.69,.065)}if(Z<2){const K=bn(n,`Signed delegation path ${Z+1}`),de=bt(K,D,e.accent),De=bt(K,$,e.signal);r.push({bridge:K,line:de,packet:De})}}const U=new I,W=new I,te=new I,L=new I(0,1,0);let j;function le(Z,F=0,Q={}){Z=cr(Z);const q=Number.isFinite(F)?F:0,ye=Nn(Z,.08,.4),ge=Nn(Z,.42,.75),Me=Nn(Z,.79,1),Be=ge*(1-.85*Me);t.forEach((Le,pe)=>{Le.position.set((pe-1)*(1.78+.17*Me)*ye,(1-pe)*.43*ye,(1-pe)*.55*(1-.75*Me)),i[pe].position.set(0,.16*Be,.2+.83*Be),a[pe].position.set(0,-.13*Be,-.14-.43*Be),o[pe].position.z=.39*Be,l[pe].position.y=.3*Be,c[pe].forEach(({rail:K,sign:de})=>K.position.x=de*(.59+.16*Be)),s[pe].position.y=.56+Math.sin(q*.3+pe*.9)*.13,h[pe].position.set(0,.6*(1-Me),1.7-1.11*Me),h[pe].scale.setScalar(.85+.15*Me),h[pe].visible=Me>0}),f.forEach(({material:Le,gate:pe,index:K})=>{const de=.5+.5*Math.cos(q*.65-K*.7-pe*.6);Le.emissiveIntensity=.18+.78*de**3+.18*Me}),u.opacity=.1*Me,p.forEach(Le=>{Le.opacity=Me,Le.depthWrite=Me>.98}),x.position.y=-.32*ge,r.forEach(({bridge:Le,line:pe,packet:K},de)=>{U.copy(t[de].position).add(new I(.77,-.87,.02)),W.copy(t[de+1].position).add(new I(-.77,-.87,.02)),te.subVectors(W,U),pe.position.copy(U).add(W).multiplyScalar(.5),pe.scale.set(1,te.length(),1),pe.quaternion.setFromUnitVectors(L,te.normalize()),K.position.copy(U).lerp(W,.5+Math.sin(q*.37-de)*.45),Le.visible=ye>.64}),j={progress:Z,delegation:ye,inspection:ge,protection:Me,serviceTravel:Be,time:q,gates:t.map(Le=>Le.position.toArray()),credentials:i.map(Le=>Le.position.toArray()),backplanes:a.map(Le=>Le.position.toArray()),shieldPositions:h.map(Le=>Le.position.toArray()),shieldsVisible:h.map(Le=>Le.visible),ledIntensity:f.map(Le=>Le.material.emissiveIntensity)}}return le(0),{group:n,update:le,get state(){return j},dispose:()=>Fc(n)}}const ia=(n,e=0,t=1)=>Math.max(e,Math.min(t,n)),Un=(n,e,t)=>{const i=ia((t-n)/(e-n));return i*i*(3-2*i)},Ht=(n,e,t)=>n+(e-n)*t,mo=["laptop","sealed","engine","swarm","memory","identity"],Tt=(n,e,t,i,s,r,a=0,o={})=>({x:n,y:e,z:t,scale:i,turn:s,progress:r,tilt:a,spin:.35,opacity:1,fault:0,repair:0,cartridgesOnly:0,assembly:1,stretchY:1,stretchZ:1,spread:0,roll:0,openFront:0,componentRow:0,...o}),I1={D1:{laptop:Tt(3.8,-1.8,-2,.59,-.18,0,.12,{spin:.08})},"1.1":{laptop:Tt(3.8,-1.5,0,.86,-.25,.34,.12,{spin:.1})},"1.2":{laptop:Tt(5.25,3.05,-2,.38,-.25,.34,.12,{spin:1.05})},"1.3":{laptop:Tt(5.25,3.05,-2,.38,-.25,.34,.12,{spin:1.05})},"1.4":{laptop:Tt(3.5,-1.8,-1,.68,-.25,.92,.12,{spin:.55})},"1.5":{memory:Tt(-3.5,-.3,0,1.1,-.4,.2,.1,{spin:.38})},"1.6":{memory:Tt(4.9,2,-1,.98,-.22,.35,.1,{cartridgesOnly:1,spin:.16})},D2:{sealed:Tt(4.5,-.8,0,.95,-.3,.025,.2,{fault:1})},"2A.0":{sealed:Tt(4.3,-.6,0,1,-.3,.22,.22,{fault:1})},"2A.1":{sealed:Tt(5.3,2.25,-2,.38,-.2,.8,.25,{fault:1})},"2A.2":{sealed:Tt(4.2,-.4,0,.74,-.25,.8,.25,{fault:1})},"2A.4":{sealed:Tt(4.7,-1,-1,.65,-.25,.2,.18,{fault:1,repair:1})},"2A.5":{memory:Tt(6.4,4,-2,.55,-.22,0,.12,{assembly:0,spin:.12})},"2A.6":{memory:Tt(4.7,-.3,-1,1.1,-.28,0,.12,{assembly:1,spin:.24})},"2B.0":{memory:Tt(4.7,-.3,-1,1.3,-.35,.08,.12,{spin:.65})},"2B.1":{memory:Tt(4.7,-.1,0,1.25,-.35,.45,.12,{spin:.4})},"2B.2":{memory:Tt(6.4,2.3,-3,.45,-.2,.72,.12)},"2B.3":{memory:Tt(5,-.4,0,1.05,.25,1,.12)},"2C.0":{identity:Tt(4.6,-.4,-1,1.22,-.35,.05,.12,{spin:.65})},"2C.1":{identity:Tt(4.8,-.2,0,1.08,-.3,.4,.12,{spin:.45})},"2C.2":{identity:Tt(5.1,-1,-1,.86,-.25,.75,.1,{spin:.45})},"2C.3":{identity:Tt(5,-.4,0,1.05,.25,1,.12,{spin:.45})},"2D.0":{swarm:Tt(4.7,-.4,-2,.85,-.35,.38,.12)},"2D.1":{swarm:Tt(6.3,2.6,-3,.32,-.35,.6,.12)},"2D.2":{swarm:Tt(4.9,-.3,0,.86,-.35,1,.12)},D4:{engine:Tt(4.5,-1,-1,1.13,-.5,.08)},"4.1":{engine:Tt(-4.2,-.5,0,.95,-.22,.3,0,{openFront:1})},"4.2":{engine:Tt(0,-.3,-1,.38,-.22,0,0,{roll:Math.PI/2,spin:.12})},"4.3":{engine:Tt(3.5,3.25,-3,.43,-.35,.75,0,{spread:.25})},"4.4":{engine:Tt(4.6,2.4,-3,.6,-.1,0,0,{componentRow:1,spin:.1})}},mu=["day","atmosphere","rain","snow","cloud","storm","vortex","night","autumn","spring","aurora","space","galaxy","shade","wind","frost","eclipse","eclipseTransit","contributions","agents"];function L1(n){const e=Number(n.id.split(".")[1])||0,t=Object.fromEntries(mu.map(s=>[s,0]));let i;if(n.section==="A"){const s={0:{rain:.65,cloud:.8,wind:.2,storm:0},1:{rain:.85,cloud:.9,wind:.45,storm:.65},2:{rain:1,cloud:1,wind:.8,storm:.85,vortex:.18},4:{rain:1,cloud:1,wind:1,storm:1,vortex:1},5:{rain:.9,cloud:.95,wind:1,storm:1,vortex:1},6:{rain:.32,cloud:.5,wind:.2,storm:.1,vortex:0,frost:.25}};i={day:.34+e*.015,atmosphere:e===6?3.75:3+Math.min(1,e*.2),...s[e]}}else n.section==="B"?i={day:.44+e*.026,atmosphere:7,eclipse:e===0||e===3?.85:1,eclipseTransit:[.38,.5,.5,.62][e],cloud:.1,frost:.6}:n.section==="C"?i={day:.54+e*.024,atmosphere:5,eclipseTransit:1,snow:.35+e*.21,cloud:.3+e*.16,wind:.15+e*.22}:n.section==="D"?i={day:.62+e*.019,atmosphere:8,cloud:.08,autumn:1}:n.actNumber===0?i={day:e===1?.006:.027,atmosphere:0,cloud:.1}:n.id==="D1"?i={day:.065,atmosphere:.55,cloud:.1}:n.actNumber===1?i={day:.16+Math.min(e,8)*.017,atmosphere:1,cloud:e>=2?.18:.06}:n.actNumber===2?i={day:.32,atmosphere:2.6,cloud:.7,rain:.35,wind:.12}:n.actNumber===3?i={day:.79+e*.045,atmosphere:9+e*.35,autumn:.5,cloud:.08}:i={cloud:.025,...{0:{day:.88,atmosphere:9.65},1:{day:.94,atmosphere:10,aurora:.65},2:{day:1.05,atmosphere:10.8,aurora:1,night:.55},3:{day:1.07,atmosphere:11,aurora:1,night:.8},4:{day:1.09,atmosphere:11,aurora:.85,night:1},6:{day:1.11,atmosphere:11,night:1,space:1,galaxy:0},7:{day:1.12,atmosphere:11,night:1,space:1,galaxy:1}}[e]};return{...t,...i,contributions:["1.7","1.8"].includes(n.id)?1:0,agents:n.id==="1.8"?1:0}}function D1(n){let e={};const t=n.map((r,a)=>{const o={};for(const h of mo)o[h]=I1[r.id]?.[h]||{...e[h]||Tt(5,-7,-5,0,0,0),scale:0,opacity:0};e=o;const l=L1(r),c=r.div||r.id==="0.1"||r.id==="4.6";return{id:r.id,objects:o,...l,landscape:c?1:r.section==="A"?.48:r.actNumber===4?.63:.84,travel:a/(n.length-1),cameraX:r.div?-.35:0,cameraY:r.div?4.3:4,cameraZ:r.div?18:17,system:{strength:["D3","3.1"].includes(r.id)?1:0,progress:r.id==="3.1"?1:0,x:r.id==="D3"?4.5:0,y:r.id==="D3"?-.8:-.5,z:-2,scale:1.1,turn:0,sleeveTurn:r.id==="3.1"?Math.PI/4:0},axis:r.section==="B"?"x":r.actNumber===4?"depth":"y"}}),i=(r,a,o)=>Object.fromEntries(Object.keys(r).map(l=>[l,Ht(r[l],a[l],o)]));function s(r){const a=ia(r,0,t.length-1),o=Math.min(Math.floor(a),t.length-1),l=t[o],c=t[Math.min(o+1,t.length-1)],h=a-o,f=Un(0,1,h),d=Math.sin(Math.PI*f),u={};for(const _ of mo){const g=l.objects[_],p=c.objects[_];u[_]=i(g,p,f);const x=u[_];if(g.scale===0&&p.scale===0){x.opacity=0;continue}g.scale>0&&p.scale>0||(g.scale>0?(x.scale=g.scale,x.x=g.x-24*Un(0,.72,f),x.opacity=f<.9?1:0,x.turn=g.turn+Math.PI*2*Un(0,.85,f),x.progress=Ht(g.progress,1,f)):(x.scale=p.scale,x.x=p.x+24*(1-Un(.25,1,f)),x.opacity=f>.1?1:0,x.turn=p.turn-Math.PI*2*(1-Un(.15,1,f)),x.progress=Ht(1,p.progress,f)))}if(l.id==="2A.4"&&c.id==="2A.5"){const _=u.sealed,g=u.memory,p=l.objects.sealed,x=c.objects.memory,M=Ht(p.x,x.x,f),y=Ht(p.scale/.6643,x.scale,f),S=Ht(p.y,x.y-.79*x.scale,f),w=Ht(p.z,x.z,f);Object.assign(_,{x:M,y:S,z:w,scale:y*.6643,stretchY:Ht(1,.684,f),stretchZ:Ht(1,.745,f),turn:Ht(p.turn,x.turn,f),tilt:Ht(p.tilt,x.tilt,f),progress:Ht(p.progress,0,Un(0,.4,f)),opacity:f<.6?1:0}),Object.assign(g,{x:M,y:S+.79*y,z:w,scale:y,turn:_.turn,tilt:_.tilt,progress:0,assembly:x.assembly*Un(.6,1,f),opacity:f>=.6?1:0})}const m=i(l.system,c.system,f);return l.id==="3.1"&&c.id==="D4"&&(m.progress=1-Un(0,.55,f),m.sleeveTurn=Math.PI/4*m.progress,m.x=-25*Un(.35,1,f),m.strength=f<.999?1:0),{position:a,index:o,raw:h,t:f,flight:d,objects:u,axis:l.axis,...Object.fromEntries([...mu,"landscape","travel","cameraX","cameraY","cameraZ"].map(_=>[_,Ht(l[_],c[_],f)])),system:m}}return{shots:t,sample:s}}function N1(){const n=new St,e=[],t=new Kt({color:"#182b38",side:On,transparent:!0});e.push(t);const i=Array.from({length:16},(a,o)=>{const l=new St;l.position.z=6.3,n.add(l);const c=[-1,1].map(h=>{const f=new Mt;f.setAttribute("position",new pt(new Float32Array(144),3).setUsage(yi));const d=new yt(f,t);return d.frustumCulled=!1,l.add(d),e.push(f),{wing:d,side:h}});return{bird:l,wings:c,i:o}});let s;function r(a,o){const l=Number.isFinite(o)?o:0;t.opacity=.42*(1-Ze.clamp(a.storm||0,0,1))*(1-Ze.clamp(a.night||0,0,1)),i.forEach(({bird:d,wings:u,i:m})=>{const _=Math.floor(m/8),g=Math.ceil(m%8/2),p=m%2?1:-1,x=((l*(.22+_*.045)+_*11+7)%29+29)%29-14.5;d.position.set(x-g*.62,2.35-_*.65+g*.21*p+Math.sin(l*.14+_)*.12,6.3),d.scale.setScalar(_?.64:.91),d.visible=t.opacity>.01;const M=Math.sin(l*Math.PI+m*.43);u.forEach(({wing:y,side:S})=>{const w=y.geometry.attributes.position,A=v=>[S*v*.32,M*.215*Math.pow(v,1.25)+(.065-.035*M)*Math.sin(v*Math.PI),0];for(let v=0;v<8;v++){const E=A(v/8),R=A((v+1)/8),P=.023*(1-v/8.5);[E,R,[R[0],R[1]-P,0],E,[R[0],R[1]-P,0],[E[0],E[1]-P,0]].forEach(($,se)=>w.setXYZ(v*6+se,...$))}w.needsUpdate=!0})});const c=i[0],h=c.wings[0].wing.geometry.attributes.position,f=h.getY(43)*c.bird.scale.y;s={bird:c.bird.position.toArray(),wing:f,wingtip:f,wingRoot:h.getY(0),flapPhase:Math.sin(l*Math.PI),flapPeriod:2,nearWingspan:.64*.91,opacity:t.opacity}}return{group:n,update:r,get state(){return s},dispose(){e.forEach(a=>a.dispose()),n.removeFromParent()}}}function U1(){const n=new St;n.name="Turbulent particle storm funnel",n.position.set(5.5,-1.3,-.15);const e={uTime:{value:0},uStrength:{value:0},uPixel:{value:1}},t=[];function i(r,a=!1){const o=new Float32Array(r*3);let l=a?409:197;for(let d=0;d<o.length;d++)l=Math.imul(l,1664525)+1013904223>>>0,o[d]=l/4294967296;const c=new Mt;c.setAttribute("position",new Jt(o,3));const h=new An({uniforms:e,transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:`uniform float uTime,uStrength,uPixel;varying float vAlpha,vSeed,vShade;
        void main(){vec3 s=position;float dust=${a?"1.":"0."};
        float h=fract(s.y+uTime*(.085+s.z*.035));
        // Three coherent corkscrews carry most of the mass. A smaller loose
        // population peels away into wisps, making the rotation legible.
        float band=floor(s.x*3.),within=fract(s.x*3.)-.5;
        float loose=step(.80,s.z),speed=3.15+band*.16;
        float a=band*2.094+uTime*speed+h*14.+within*.54+sin(h*9.-uTime*1.9)*.34;
        a=mix(a,s.x*6.283+uTime*(2.1+s.z)+h*12.,loose);
        float radius=(.10+pow(h,1.45)*1.20)*(.79+s.z*.27);
        radius*=1.+sin(a*2.+h*8.-uTime*2.2)*.11;
        radius=mix(radius,radius*(.45+s.y*.78),loose);
        float lean=sin(h*3.7-uTime*.74)*.17*h;
        vec3 p=vec3(cos(a)*radius+lean,h*3.2,sin(a)*radius*.78);
        p.x+=sin(s.z*31.+uTime*1.4+h*8.)*.045;
        float reveal=smoothstep(1.-uStrength-.1,1.-uStrength+.11,h);
        float edge=smoothstep(0.,.035,h)*(1.-smoothstep(.93,1.,h));
        float size=(13.+s.z*16.+h*12.)*uPixel;
        vAlpha=(.13+s.z*.16)*edge*reveal*uStrength*(1.-loose*.36);
        if(dust>.5){
          float r=.24+sqrt(s.y)*1.12;float angle=s.x*6.283+uTime*(2.9+s.z*1.2);
          p=vec3(cos(angle)*r,.075+sin(s.z*3.141)*(.17+s.y*.23),sin(angle)*r*.66);
          p.x+=sin(uTime*.7)*.07;size=(10.+s.z*23.)*uPixel;
          vAlpha=smoothstep(.52,.95,uStrength)*(.16+s.z*.22);
        }
        vSeed=s.x;vShade=.19+.43*(cos(a)*.5+.5)+s.z*.13;
        gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);gl_PointSize=size;
      }`,fragmentShader:`varying float vAlpha,vSeed,vShade;
        float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
        float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
        void main(){vec2 p=gl_PointCoord-.5;float r=length(p);
          float rough=noise(p*7.+vSeed*37.)*.64+noise(p*15.-vSeed*21.)*.36;
          float soft=exp(-r*r*9.)*(1.-smoothstep(.31+rough*.10,.50,r));
          vec3 c=mix(${a?"vec3(.20,.18,.14)":"vec3(.065,.105,.14)"},${a?"vec3(.49,.40,.29)":"vec3(.36,.42,.47)"},vShade);
          gl_FragColor=vec4(c,soft*(.43+rough*.65)*vAlpha);
        }`}),f=new Cc(c,h);return f.name=a?"Turbulent ground contact dust":"Layered spiralling smoke particles",f.frustumCulled=!1,n.add(f),t.push(c,h),f}i(1800),i(300,!0);let s;return{group:n,get state(){return s},update(r,a,o=!1){const l=Ze.clamp(Number.isFinite(r)?r:0,0,1),c=o?0:Number.isFinite(a)?a:0;e.uStrength.value=l,e.uTime.value=c,e.uPixel.value=Math.max(.5,Math.min(2,(typeof innerHeight=="number"?innerHeight:1080)/1080)),n.visible=l>.005,s={strength:l,visible:n.visible,base:n.position.toArray(),topY:1.9,visibleLowerY:1.9-l*3.2,phase:c*3.15,helicalBands:3,topRadius:1.3,dust:l>.52,smokeParticles:1800,dustParticles:300,surfaceMeshes:0,reduced:o}},dispose(){t.forEach(r=>r.dispose()),n.removeFromParent()}}}function k1(){const n=new St;n.name="Seasonal atmosphere";const e=[],t=Object.fromEntries(["Time","Rain","Snow","Night","Cloud","Storm","Autumn","Aurora","Shade","Wind","Frost"].map(L=>["u"+L,{value:0}]));t.uPixel={value:1},t.uSkyWidth={value:24};const i="uniform float uTime,uRain,uSnow,uNight,uCloud,uStorm,uAutumn,uAurora,uShade,uWind,uFrost,uPixel,uSkyWidth;",s=`float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
  float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
  float fbm(vec2 p){return noise(p)*.55+noise(p*2.03)*.27+noise(p*4.01)*.13;}`;function r(L,j,le){const Z=new ti(24,14),F=new An({uniforms:t,transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:"varying vec2 p;void main(){p=position.xy;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`varying vec2 p;${i}${s}
${le}`}),Q=new yt(Z,F);return Q.name=L,Q.position.z=j,n.add(Q),e.push(Z,F),Q}const a=r("Five layered storm banks with independent wind",-.4,`
    void main(){float bank=0.,edgeLight=0.;
    float clearing=1.-smoothstep(0.,.42,uCloud);
    for(int i=0;i<5;i++){
      float k=float(i),direction=i<2?-1.:1.;
      float center=(k-2.)*3.8+sin(uTime*(.014+k*.004)+k)*1.4+direction*clearing*10.;
      float wind=(.13+k*.055)*(1.+uWind*5.);
      vec2 q=vec2((p.x-center-uTime*wind)*.32,p.y*.61+k*13.7);
      float n=fbm(q)+noise(q*7.1)*.045;
      float ridge=3.4-k*.44+sin((p.x-center)*.31+k)*.15;
      float altitude=exp(-pow(abs((p.y-ridge)*(.77+k*.065)),2.));
      float envelope=exp(-pow(abs((p.x-center)/(6.4+k*.32)),4.));
      float density=smoothstep(.22,.60,n)*altitude*envelope;
      bank+=density*(.85+k*.08);
      edgeLight+=max(0.,n-(noise(q+vec2(.05,.17))*.76+.12))*density;
    }
    vec3 c=mix(vec3(.83,.81,.80),vec3(.20,.26,.34),uStorm*.76+uCloud*.16);
    c=mix(c,c*.48,uShade);
    c+=vec3(.16,.14,.11)*min(1.,edgeLight*4.);
    gl_FragColor=vec4(c,min(.94,bank)*uCloud*.95);}`),o=r("Wide flowing auroral ribbons with continuous folds",-.6,`
    void main(){float x=p.x,energy=0.;vec3 color=vec3(0.);
      for(int i=0;i<2;i++){
        float k=float(i);
        float curve=1.9+k*.85+sin(x*.28+uTime*.22+k*1.6)*.57+sin(x*.61-uTime*.13+k)*.20;
        float y=p.y-curve;
        float fold=.60+.40*noise(vec2(x*.38-uTime*.14,k*7.+uTime*.075));
        float width=.36+noise(vec2(x*.22+uTime*.08,k*5.))* .31;
        float edge=exp(-abs(y)/(.075+width*.08));
        float veil=exp(-max(y,0.)/(.7+width))*smoothstep(-.15,.16,y);
        float broad=exp(-pow(abs(y)/width,2.))*.23;
        float a=(edge*.34+veil*.40+broad)*fold*(1.-k*.20);
        vec3 c=mix(vec3(.14,.98,.52),vec3(.13,.76,.85),smoothstep(.05,1.35,y));
        c=mix(c,vec3(.47,.45,.72),smoothstep(1.4,2.7,y)*.20);
        color+=c*a;energy+=a;
      }
      float sky=smoothstep(.05,.7,p.y),edge=1.-smoothstep(10.,12.,abs(p.x));
      gl_FragColor=vec4(color/max(.001,energy),min(.78,energy)*uAurora*sky*edge);
    }`),l=r("Single animated neon lightning stroke to ground",-.12,`
    float segment(vec2 p,vec2 a,vec2 b){vec2 v=b-a;return length(p-a-v*clamp(dot(p-a,v)/dot(v,v),0.,1.));}
    void main(){
      float cycle=floor(uTime/10.7),age=mod(uTime,10.7)-2.4;
      float pulse=smoothstep(0.,.04,age)*(1.-smoothstep(.14,.43,age));
      float strength=pulse*smoothstep(.25,.65,uStorm);
      if(strength<.001){gl_FragColor=vec4(0.);return;}
      float x=3.2+hash(vec2(cycle,8.))*4.6;
      vec2 previous=vec2(x,4.4);float distanceToStroke=100.;
      for(int i=1;i<=9;i++){
        float k=float(i),jitter=(hash(vec2(k+cycle*13.,2.))-.5)*.65;
        vec2 next=vec2(x+jitter-k*.052,4.4-k*.64);
        distanceToStroke=min(distanceToStroke,segment(p,previous,next));previous=next;
      }
      float core=1.-smoothstep(.012,.025,distanceToStroke);
      float glow=exp(-distanceToStroke*12.)*.23;
      float atmosphere=exp(-dot((p-vec2(x,1.7))*vec2(.45,.25),(p-vec2(x,1.7))*vec2(.45,.25)))*.045;
      gl_FragColor=vec4(vec3(.67,.86,1.),clamp((core*.9+glow+atmosphere)*strength,0.,.97));
    }`),c=U1();n.add(c.group);const h=new Ct({color:"#64717d",roughness:.85,emissive:"#34414d",emissiveIntensity:.12,transparent:!0,opacity:0,depthWrite:!1});e.push(h);function f(L,j){const le=j.map(([Q,q,ye=[0,0,0],ge=[1,1,1]])=>{Q.applyMatrix4(new Rt().compose(new I(...q),new Wi().setFromEuler(new Ri(...ye)),new I(...ge)));const Me=Q.index?Q.toNonIndexed():Q.clone();return Q.dispose(),Me}),Z=kc(le);le.forEach(Q=>Q.dispose());const F=new yt(Z,h);return F.name=L,n.add(F),e.push(Z),F}const d=(L,j,le)=>new Fn(L,j,le),u=new rn;u.moveTo(-.36,0),u.lineTo(0,.28),u.lineTo(.36,0),u.closePath();const m=new Xn(u,{depth:.44,bevelEnabled:!1});m.translate(0,0,-.22);const _=f("Distant windborne house",[[d(.55,.43,.4),[0,0,0]],[m,[0,.215,0]],[d(.075,.23,.085),[.18,.32,-.055]]]),g=[[new Gi(1,12,8),[0,0,0],[0,0,0],[.34,.16,.14]],[d(.18,.23,.16),[.29,.07,0],[0,0,-.25]],[new Gi(1,10,6),[.41,.14,0],[0,0,0],[.14,.09,.1]]];for(const L of[-.23,.21])for(const j of[-.09,.09])g.push([d(.05,.25,.045),[L,-.21,j],[0,0,L<0?-.15:.18]]);for(const L of[-.095,.095])g.push([new Pc(.029,.12,7),[.36,.25,L],[0,0,-.2]]),g.push([d(.1,.025,.055),[.29,.18,L*1.6]]);g.push([new sn(.012,.018,.3,7),[-.38,.02,0],[0,0,-.45]]);const p=f("Distant windborne cow",g),x=f("Distant windborne laptop",[[d(.65,.035,.42),[0,0,0]],[d(.65,.4,.027),[0,.19,-.22],[-.22,0,0]]]),M=[_,p,x],y=new St;y.name="Distant autumn woodland canopy banks",n.add(y),y.position.z=.48;const S=new Gi(1,12,8),w=new sn(.022,.035,1,7),A=new Kt({color:"#ffffff",transparent:!0,opacity:0,depthWrite:!1}),v=new Kt({color:"#603a30",transparent:!0,opacity:0,depthWrite:!1});e.push(S,w,A,v);const E=28,R=new Dn(S,A,E*5),P=new Dn(w,v,E);R.name="Lobed copper and russet tree crowns",P.name="Recessed woodland trunks",y.add(P,R);const D=new Bt,$=new it,se=["#8c3f30","#a44b32","#bd6540","#92452f","#b55a34"];for(let L=0;L<E;L++){const j=L>=8,le=j?L-8:L,Z=j?6.55+le*.26:-11.65+le*.38,F=-1.64-Math.sin(le*.31+1)*.1,Q=.32+(.5+.5*Math.sin(L*17.3))*.36;D.position.set(Z,F+Q*.28,0),D.rotation.set(0,0,.035*Math.sin(L)),D.scale.set(1,Q*.6,1),D.updateMatrix(),P.setMatrixAt(L,D.matrix);for(let q=0;q<5;q++){const ye=q/5*Math.PI*2,ge=Q*.2;D.position.set(Z+Math.cos(ye)*ge,F+Q*.66+Math.sin(ye)*Q*.16,Math.sin(L+q)*.045),D.scale.set(Q*(.25+q*.011),Q*(.32-q*.012),Q*.22),D.rotation.set(0,L*.27,Math.sin(q)*.09),D.updateMatrix(),R.setMatrixAt(L*5+q,D.matrix),$.set(se[(L+q)%se.length]),R.setColorAt(L*5+q,$)}}function V(L,j){const le=new Float32Array(L*3);for(let q=0;q<L;q++)le[q*3]=Math.sin(q*73.7+2)*43758.5453,le[q*3+1]=Math.sin(q*19.3+7)*15273.13,le[q*3+2]=q/L;const Z=new Mt;Z.setAttribute("position",new Jt(le,3));const F=new An({uniforms:t,transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:`${i}varying float vAlpha,vSeed;void main(){vec3 s=fract(position);vec3 p;float k=${j.toFixed(1)};
      if(k<.5){float fall=fract(s.y-uTime*(.29+s.z*.1)*(1.+uWind*.35));p=vec3(s.x*27.-13.5-fall*(1.4+uWind*4.),fall*14.-7.,6.);vAlpha=uRain;}
      else if(k<1.5){p=vec3(mod(s.x*27.+uTime*(.10+uWind*3.4),27.)-13.5+sin(uTime*.33+s.z*20.)*.5,fract(s.y-uTime*(.018+s.z*.014+uSnow*.016))*14.-7.,6.);vAlpha=uSnow;}
      else if(k<2.5){p=vec3((s.x-.5)*uSkyWidth,(s.y-.5)*13.,-1.5);vAlpha=pow(uNight,.55)*(.88+.12*sin(uTime*.36+s.z*50.));}
      else {p=vec3(mod(s.x*27.+uTime*(.32+uWind*1.5),27.)-13.5+sin(uTime*.4+s.z*12.)*.7,fract(s.y-uTime*(.024+s.z*.02))*14.-7.,6.);vAlpha=uAutumn*.74;}
      vAlpha*=k>1.5&&k<2.5?.72+.28*s.z:.4+.6*s.z;vSeed=s.z;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);gl_PointSize=(k<.5?26.:k<1.5?4.5:k<2.5?1.6+pow(s.z,5.)*7.4:9.)*uPixel;}`,fragmentShader:`${i}varying float vAlpha,vSeed;void main(){vec2 p=gl_PointCoord-.5;float k=${j.toFixed(1)};float a;vec3 c=vec3(.86,.92,1.);
      if(k<.5){a=(1.-smoothstep(.029,.084,abs(p.x+p.y*(.19+uWind*.30))))*(1.-smoothstep(.37,.5,abs(p.y)));c=vec3(.76,.85,.93);}
      else if(k<2.5){a=1.-smoothstep(.09,.5,length(p));if(k>1.5){float r=length(p)*2.;a=(exp(-r*r*15.)+exp(-r*r*3.5)*.28)*(1.-smoothstep(.8,1.,r));c=vSeed<.20?vec3(1.,.80,.53):vSeed>.72?vec3(.61,.80,1.):vec3(.97,.98,1.);}}
      else{float t=uTime*.6+vSeed*15.;p=mat2(cos(t),-sin(t),sin(t),cos(t))*p;a=1.-smoothstep(.30,.37,length(p*vec2(1.,1.8)));float vein=abs(p.x)*1.7+abs(p.y)*.7;a*=1.-smoothstep(.42,.62,vein);c=mix(vec3(.74,.10,.055),vec3(.95,.38,.11),vSeed);}
      gl_FragColor=vec4(c,a*vAlpha*.85*(k<.5?1.-uShade*.68:1.));}`}),Q=new Cc(Z,F);return Q.frustumCulled=!1,n.add(Q),e.push(Z,F),Q}const H=V(950,0),N=V(370,1),z=V(5200,2),U=V(70,3);z.name="Bright sky-only Milky Way stars",z.renderOrder=30,z.material.blending=ur,z.material.depthTest=!0;const W=r("Subtle sky-only Milky Way haze",-1.48,`
    void main(){float center=2.05+(p.x+11.5)*.09;
      float d=abs(p.y-center),cloud=fbm(vec2(p.x*.34,p.y*.7));
      float band=exp(-d*d/1.9)*(.25+cloud*.75);
      gl_FragColor=vec4(.55,.67,.88,band*pow(uNight,.7)*.085);
    }`);W.renderOrder=29,W.material.blending=ur,W.material.depthTest=!0;let te;return{group:n,get state(){return te},update(L,j){const le=Number.isFinite(j)?j:0,Z=typeof innerWidth=="number"&&typeof innerHeight=="number"&&innerHeight>0?innerWidth/innerHeight:16/9;t.uSkyWidth.value=Math.max(24,10*Z+2),t.uTime.value=le,t.uPixel.value=Math.min(2,(typeof innerHeight=="number"?innerHeight:1080)/1080);for(const K of["rain","snow","night","cloud","storm","autumn","aurora","shade","wind","frost"])t["u"+K[0].toUpperCase()+K.slice(1)].value=Ze.clamp(L[K]||0,0,1);const F=t.uAutumn.value;y.visible=F>.005,A.opacity=F*.76,v.opacity=F*.65,y.rotation.z=Math.sin(le*.27)*.0014,W.visible=t.uNight.value>.005;const Q=t.uCloud.value;a.visible=Q>.005;for(const[K,de]of[[H,L.rain],[N,L.snow],[z,L.night],[U,L.autumn],[o,L.aurora],[l,L.storm]])K.visible=de>.005;const q=1-Ze.smoothstep(Q,0,.42),ye=t.uStorm.value,ge=t.uWind.value,Me=Ze.clamp(L.vortex||0,0,1);c.update(Me,le,!!L.reducedMotion);const Be=Ze.smoothstep(Me,.45,.85);h.opacity=Be*.73,M.forEach((K,de)=>{const De=((le*(.75+de*.1+ge*.45)+de*9.5+6)%31+31)%31-15.5;K.position.set(De,.05+de*.3+Math.sin(le*.41+de*1.7)*.46,.15+de*.08),K.rotation.set(Math.sin(le*.24+de)*.32,le*(.18+de*.035)+de,Math.sin(le*.39+de)*.58),K.scale.setScalar(de===1?.74:.79),K.visible=Be>.005});const Le=(le%10.7+10.7)%10.7-2.4,pe=Ze.smoothstep(Le,0,.04)*(1-Ze.smoothstep(Le,.14,.43));l.visible=ye>.25&&pe>.001,te={cloud:Q,cloudsVisible:a.visible,opacityMultiplier:Q*.95,clearing:q,bankCenters:[0,1,2,3,4].map(K=>(K-2)*3.8+Math.sin(le*(.014+K*.004)+K)*1.4+(K<2?-1:1)*q*10),windOffsets:[.13,.185,.24,.295,.35].map(K=>le*K*(1+ge*5)),rainCount:950,rainStreakPixels:26*t.uPixel.value,vortex:Me,funnel:c.state,wind:ge,starCount:5200,starDepth:-1.5,starVerticalRange:[-6.5,6.5],starHorizontalRange:[-t.uSkyWidth.value/2,t.uSkyWidth.value/2],starLowerEdgeMask:"terrain-depth-only",starOpacity:Math.pow(t.uNight.value,.55),starRenderOrder:30,autumnTrees:y.visible?E:0,aurora:t.uAurora.value,auroraDrift:le*.28,lightning:pe*Ze.smoothstep(ye,.25,.65),flying:M.map(K=>({name:K.name,visible:K.visible,position:K.position.toArray(),rotation:K.rotation.toArray().slice(0,3)}))}},dispose(){c.dispose(),e.forEach(L=>L.dispose()),n.removeFromParent()}}}function O1(){const n=new St;n.name="Mechanical SDLC funnel";const e=Oc("#bc8152");e.metal.color.set("#b5bdc0"),e.metal.roughness=.34,e.edge.color.set("#3a4a53"),e.edge.roughness=.43;const t=[1.75,1.3,.94,.66],i=[2.15,1.82,1.48,1.14],s=["Code","Test","Deploy","Monitor and debug"],r=[],a=[],o=Object.values(e);e.edge.emissive.set("#263039"),e.edge.emissiveIntensity=.08;const l=(x,M=80)=>{const y=new Mo(x.map(S=>new Ae(...S)),M);return y.rotateX(Math.PI/2),y},c=l([[.014,-.014],[.035,-.014],[.04,-.009],[.04,.009],[.034,.016],[.014,.016],[.014,-.014]],16),h=l([[.041,-.006],[.053,-.006],[.056,0],[.053,.007],[.041,.007],[.041,-.006]],24),f=t.map(x=>x+.08),d=.34,u=f.reduce((x,M)=>x+M*2,0)+d*3;let m=-u/2;for(let x=0;x<4;x++){const M=t[x],y=i[x],S=M*.82,w=.085,A=new St;A.name=`${s[x]} tapered sleeve`,n.add(A);const v=m+f[x];m+=f[x]*2+d,r.push({sleeve:A,targetX:v,radius:M,length:y});const E=[[S-.025,-y/2],[S,-y/2+.025],[S,-y/2+.09],[M,y/2-.065],[M,y/2-.022],[M-.022,y/2]];bt(A,l(E),x===0?e.accent:e.metal).name=`${s[x]} brushed outer shell`;const R=[[M-w,y/2],[M-w-.013,y/2-.032],[S-w,-y/2+.028],[S-w,-y/2]],P=bt(A,l(R),e.edge);P.name=`${s[x]} open inner bore`;const D=new rn;D.absarc(0,0,M+.08,0,Math.PI*2,!1),_s(D,0,0,M-w);for(let N=0;N<8;N++){const z=N*Math.PI/4;_s(D,Math.cos(z)*(M-.008),Math.sin(z)*(M-.008),.029)}bt(A,un(D,.085,.012),e.metal,0,0,y/2-.012).name=`${s[x]} drilled front flange`;const $=[[S-w,-.022],[S+.032,-.022],[S+.047,-.007],[S+.047,.018],[S+.029,.033],[S-w,.033],[S-w,-.022]];bt(A,l($),e.edge,0,0,-y/2+.008).name=`${s[x]} rear locating collar`;const se=[[M-w+.009,-.005],[M-w+.027,-.005],[M-w+.027,.005],[M-w+.009,.005],[M-w+.009,-.005]];bt(A,l(se),e.signal,0,0,y/2+.035).name=`${s[x]} rim light guide`;for(let N=0;N<8;N++){const z=N*Math.PI/4,U=Math.cos(z)*(M-.008),W=Math.sin(z)*(M-.008);bt(A,h,e.edge,U,W,y/2+.039),bt(A,c,e.accent,U,W,y/2+.052)}for(const N of[.2,.72]){const z=Ze.lerp(S,M,N),U=-y/2+y*N,W=[[z-.006,-.019],[z+.014,-.019],[z+.02,-.012],[z+.02,.012],[z+.014,.019],[z-.006,.019]];bt(A,l(W),e.edge,0,0,U)}const V=new yt(new Fn(.1,.025,y*.52),e.edge);V.position.set(0,-.92*M,-.025),V.rotation.x=-.17,A.add(V);const H=bt(A,new Fn(.042,.036,.09),e.signal);a.push(H)}const _=new Map(o.map(x=>[x,x.opacity]));for(const x of _.keys())x.alphaHash=!0;let g;function p(x={},M=0){const y=Number.isFinite(M)?M:0,S=cr(x.progress??0),w=Nn(S,.03,.97),A=cr(x.strength??0);n.visible=A>.001,n.position.set(x.x??0,x.y??0,x.z??0),n.scale.setScalar(Number.isFinite(x.scale)?x.scale:1),n.rotation.set((x.tilt??.13)+Math.sin(y*.11)*.012,(x.turn??-.13)+Math.sin(y*.09)*.035,0);for(const[v,E]of _)v.opacity=E*A;r.forEach(({sleeve:v,targetX:E,radius:R,length:P},D)=>{v.position.set(E*w,Math.sin(y*.19+D*.6)*.034*w,0),v.rotation.y=x.sleeveTurn??0,v.rotation.z=Math.sin(y*.13+D*.65)*.055,a[D].position.set(0,-.92*R+.023,Math.sin(y*.28+D*.7)*P*.19),a[D].rotation.x=-.17}),g={...x,progress:S,spread:w,strength:A,time:y,nativeWidth:u,rotation:n.rotation.toArray().slice(0,3),stages:r.map(({sleeve:v})=>({name:v.name,position:v.position.toArray(),rotation:v.rotation.z,yaw:v.rotation.y}))}}return p(),{group:n,update:p,get state(){return g},dispose:()=>{e.ink.dispose(),e.dark.dispose(),Fc(n)}}}const ri=Object.freeze({winter:{top:"#bdd9ea",middle:"#d3e5ec",horizon:"#edf0e8",glow:"#f8efce",sun:"#fff5d5",ridges:["#dce8ea","#cddfe4","#bbd3dc","#a9c5d1","#94b6c6","#83a7ba"]},cloud:{top:"#a8c2d3",middle:"#c8d8df",horizon:"#e5e3d8",glow:"#d9c0a9",sun:"#fff0ba",ridges:["#d3deda","#c1d1d1","#adc4c9","#99b6c1","#85a7b6","#7395a8"]},storm:{top:"#30495d",middle:"#435d72",horizon:"#7c92a1",glow:"#8eabb7",sun:"#ffe1a0",ridges:["#607b8e","#557286","#4b677d","#415b72","#354d65","#293f57"]},autumn:{top:"#91b9d3",middle:"#d7c5cb",horizon:"#f3c8ab",glow:"#ffe0a4",sun:"#fff0bd",ridges:["#dba99d","#ce907c","#be785f","#ad624f","#994f46","#83443f"]},spring:{top:"#b5dbe6",middle:"#d1e7e2",horizon:"#f4e9ca",glow:"#fff1c9",sun:"#fff6db",ridges:["#d6e0bf","#c4d5ab","#b0c999","#9bbf8a","#87ae7f","#769d76"]},sunset:{top:"#483047",middle:"#b65b69",horizon:"#ffc090",glow:"#ffd1a0",sun:"#ffebc6",ridges:["#db9185","#c97870","#b35e5d","#9b494e","#803c46","#64333e"]},dusk:{top:"#241b32",middle:"#953746",horizon:"#ff8557",glow:"#ffb66c",sun:"#ffe6bd",ridges:["#b77279","#995e6f","#794759","#593345","#3d2939","#261f2f"]},morning:{top:"#80bddf",middle:"#bcdfed",horizon:"#f5e4c4",glow:"#ffe4aa",sun:"#ffebbf",ridges:["#d6ddd1","#c7d5cb","#b5c9c1","#a2bcb6","#8aaca9","#779b9f"]},rain:{top:"#35536b",middle:"#4b687e",horizon:"#8398a8",glow:"#abbac0",sun:"#ffe5ac",ridges:["#637d90","#587489","#4d6c83","#436078","#38536c","#2c435b"]},snow:{top:"#afcadd",middle:"#d3e1e9",horizon:"#f0f1ee",glow:"#edf2ee",sun:"#eef4f0",ridges:["#e1e9ec","#d5e2e8","#c5d8e2","#b2cbd8","#9cbbcd","#8aaabd"]},clear:{top:"#79bbe2",middle:"#b9deef",horizon:"#f3e7cc",glow:"#ffe0a5",sun:"#fff0be",ridges:["#d8ddc5","#c9d4bc","#b6c9ae","#a0ba9e","#8cac92","#7b9d89"]},night:{top:"#090c13",middle:"#171d2b",horizon:"#424454",glow:"#545267",sun:"#9aabc0",ridges:["#343949","#2b3040","#232a38","#1c2330","#151d27","#0e151d"]},dawn:{top:"#262838",middle:"#b66a64",horizon:"#ffd28a",glow:"#fff3ac",sun:"#fff7c9",ridges:["#b7a5a9","#8f8fa1","#637a94","#3e617e","#274762","#182f48"]},eclipse:{top:"#1b112d",middle:"#49243f",horizon:"#9b4659",glow:"#f05b70",sun:"#ffbcc2",ridges:["#904b65","#783e5b","#603149","#4a293e","#362237","#251b2c"]}}),F1=Object.freeze({left:.06,right:.48,top:.2,bottom:.52,color:"#f4eee7"}),Ja=Object.freeze({height:10,position:[0,0,20],near:.1,far:100});function B1(n=16/9){const e=new Ao(-5*n,5*n,5,-5,Ja.near,Ja.far);return e.position.set(...Ja.position),e}const In=n=>new I(...n.slice(1).match(/../g).map(e=>parseInt(e,16)/255)),z1=`
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,vs=[[.4,.42,.435,.405,.44,.425,.4,.435,.47,.44,.485,.44,.41,.42,.44],[.37,.39,.42,.38,.355,.38,.365,.36,.41,.43,.395,.37,.36,.38,.4],[.41,.44,.425,.395,.355,.34,.355,.37,.34,.32,.35,.395,.41,.37,.35],[.3,.32,.285,.26,.29,.325,.31,.275,.3,.345,.325,.295,.27,.29,.32],[.3,.285,.26,.235,.2,.19,.21,.235,.25,.235,.21,.19,.22,.25,.27],[.13,.15,.13,.115,.14,.16,.18,.16,.14,.13,.145,.175,.195,.18,.16]],G1=vs.map(n=>new wo(n.map((e,t)=>new Ae(-.8+t/(n.length-1)*1.6,e-.5))));function H1(n){const e=new rn;e.moveTo(-.8,-.75);const t=new wo(n.map((i,s)=>new Ae(-.8+s/(n.length-1)*1.6,i-.5)));for(let i=0;i<=1400;i++){const s=i/1400,r=t.getPoint(s),a=Math.min(n.length-2,Math.floor(s*(n.length-1))),o=Ze.lerp(n[a],n[a+1],s*(n.length-1)-a)-.5;e.lineTo(r.x,Ze.lerp(o,r.y,.48))}return e.lineTo(.8,-.75),e.closePath(),new So(e)}function V1({palette:n="dusk",aspect:e=16/9,grain:t=.35,reducedMotion:i=!1}={}){if(!ri[n])throw new RangeError(`Unknown landscape palette: ${n}`);const s=new St;s.name="Quiet landscape";let r=0,a=0,o=0,l=n==="eclipse"?1:0,c=!1,h=l?.5:0,f=0,d=0,u=10*e,m=!1;const _=[],g=(L,j,le={})=>{const Z=new An({uniforms:L,vertexShader:z1,fragmentShader:`varying vec2 vUv; varying vec3 vPosition;
${j}`,toneMapped:!1,...le});return _.push(Z),Z},p=(L,j,le)=>{const Z=new ti(1,1);_.push(Z);const F=new yt(Z,j);return F.name=L,F.position.z=le,F.scale.set(u*1.6,15,1),F.frustumCulled=!1,s.add(F),F},x={uTop:{value:In(ri[n].top)},uMiddle:{value:In(ri[n].middle)},uHorizon:{value:In(ri[n].horizon)},uGlow:{value:In(ri[n].glow)},uProgress:{value:0},uSun:{value:new Ae(.77,.49)},uAspect:{value:e},uRays:{value:1},uGlowGain:{value:1}},M=p("Gradient atmosphere",g(x,`
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
      c *= 1.0 - quiet * 0.05;
      c *= 1.0 - uProgress * 0.075;
      gl_FragColor = vec4(c, 1.0);
    }
  `),-2),y={uColor:{value:In(ri[n].sun)},uOpacity:{value:1}},S=p("Low sun",g(y,`
    uniform vec3 uColor;uniform float uOpacity;
    void main() {
      float d = length(vUv - 0.5);
      float edge = fwidth(d);
      float alpha = 1.0 - smoothstep(0.46 - edge, 0.46 + edge, d);
      gl_FragColor = vec4(uColor * (0.94 + vUv.y * 0.06), alpha*uOpacity);
    }
  `,{transparent:!0,depthWrite:!1}),-1);S.scale.setScalar(.86);const w=S.material.clone();_.push(w),w.uniforms.uColor.value.copy(In("#cbd9eb"));const A=p("Rising moon",w,-1.05);A.scale.setScalar(.95),w.fragmentShader=`varying vec2 vUv;uniform vec3 uColor;uniform float uOpacity;
    void main(){float d=length(vUv-.5);float a=1.-smoothstep(.45,.46,d);
    gl_FragColor=vec4(uColor*(.94+.06*(1.-smoothstep(0.,.46,d))),a*uOpacity);}`;const v=S.material.clone();_.push(v),v.uniforms.uColor.value.copy(In("#160a20")),v.uniforms.uSolarOffset={value:new Ae},v.uniforms.uSolarRadius={value:.86*.46/.905},v.fragmentShader=`varying vec2 vUv;
    uniform vec3 uColor;
    uniform vec2 uSolarOffset;
    uniform float uOpacity, uSolarRadius;
    void main() {
      vec2 p = vUv - .5;
      float lunarDistance = length(p);
      float solarDistance = length(p-uSolarOffset);
      float lunarEdge = fwidth(lunarDistance);
      float solarEdge = fwidth(solarDistance);
      float lunarMask = 1.-smoothstep(.46-lunarEdge,.46+lunarEdge,lunarDistance);
      float solarMask = 1.-smoothstep(uSolarRadius-solarEdge,uSolarRadius+solarEdge,solarDistance);
      gl_FragColor = vec4(uColor, lunarMask*solarMask*uOpacity);
    }`;const E=p("Eclipse lunar occluder",v,-.9);E.scale.setScalar(.905);const R={uOpacity:{value:0},uLunarOffset:{value:new Ae},uLunarRadius:{value:.905*.46/1.24}},P=p("Eclipse ruby corona",g(R,`
    uniform float uOpacity, uLunarRadius;
    uniform vec2 uLunarOffset;
    void main() {
      float d = length(vUv - .5);
      // Keep the bright ridge outside the lunar radius (.336 in these UVs),
      // so the occluder cannot swallow the most luminous half of the rim.
      float edge = exp(-pow((d - .349) / .012, 2.));
      float halo = exp(-pow((d - .355) / .078, 2.));
      float a = min(1., edge * .96 + halo * .23) * uOpacity;
      a *= 1. - smoothstep(.44, .5, d);
      // Apply the same physical lunar silhouette to the luminous rim and halo.
      // At totality only the corona outside the lunar disc can remain visible.
      float lunarDistance = length(vUv-.5-uLunarOffset);
      float lunarEdge = fwidth(lunarDistance);
      a *= smoothstep(uLunarRadius-lunarEdge,uLunarRadius+lunarEdge,lunarDistance);
      gl_FragColor = vec4(mix(vec3(.94,.055,.15),vec3(1.,.42,.47),edge), a);
    }
  `,{transparent:!0,depthWrite:!1}),-1.02);P.scale.setScalar(1.24);const D=vs.map((L,j)=>{const le=H1(L);_.push(le);const Z={uColor:{value:In(ri[n].ridges[j])},uHaze:{value:In(ri[n].horizon)},uDepth:{value:j/5},uProgress:{value:0}},F=new yt(le,g(Z,`
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
    `));return F.name=`Ridge ${j+1}`,F.position.z=j,F.scale.set(u,10,1),F.frustumCulled=!1,s.add(F),F}),$=new Ae;function se(L){let j=-1/0;for(let le=0;le<D.length;le++){const Z=D[le],F=Ze.clamp(((L-Z.position.x)/u+.8)/1.6,0,1),Q=Math.min(vs[le].length-2,Math.floor(F*(vs[le].length-1))),q=Ze.lerp(vs[le][Q],vs[le][Q+1],F*(vs[le].length-1)-Q)-.5;G1[le].getPoint(F,$),j=Math.max(j,Ze.lerp(q,$.y,.48)*10+Z.position.y)}return j}const V={uAmount:{value:Ze.clamp(t,0,1)}},H=p("Host-controlled grain",g(V,`
    uniform float uAmount;
    void main() {
      vec2 p = gl_FragCoord.xy;
      float noise = fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))));
      gl_FragColor = vec4(vec3(step(0.5, noise)), abs(noise - 0.5) * 0.12 * uAmount);
    }
  `,{transparent:!0,depthTest:!1,depthWrite:!1}),8);H.renderOrder=100;function N(L){if(m)return;d=Ze.clamp(Number.isFinite(L)?L:0,0,1);const j=i?0:d;D.forEach((ge,Me)=>{const Be=Ze.smoothstep(j,Me*.032,1);ge.position.x=(Be-.35)*(.008+Me*.008)*u*(Me%2?-1:1),ge.position.y=-Be*(.06+Me*.055),ge.material.uniforms.uProgress.value=d});const le=Ze.clamp(r/.94,0,1.18)*Math.PI,Z=.5+Math.cos(le)*.34,F=.49+Math.sin(le)*.37;S.position.set((Z-.5)*u,(F-.5)*10,-1);const Q=(1-Ze.smoothstep(Z,.3,.52))*Ze.smoothstep(F,.48,.6);f=se(S.position.x);const q=.86*.46;c=!0;for(let ge=0;ge<9;ge++){const Me=(ge/8*2-1)*q;if(S.position.y+Math.sqrt(Math.max(0,q*q-Me*Me))>se(S.position.x+Me)){c=!1;break}}y.uOpacity.value=(c?1-a:1)*(1-o*.48)*(1-Q*.15),w.uniforms.uOpacity.value=a,A.position.set(.31*u,2.35,-1.05),E.position.set(S.position.x+(h-.5)*1.9,S.position.y,-.9),v.uniforms.uSolarOffset.value.set((S.position.x-E.position.x)/.905,0),v.uniforms.uOpacity.value=Ze.smoothstep(l,0,.08),E.visible=P.visible=l>0,P.position.set(S.position.x,S.position.y,-1.02),R.uLunarOffset.value.set((E.position.x-S.position.x)/1.24,(E.position.y-S.position.y)/1.24),R.uOpacity.value=Ze.smoothstep(l,.48,1);const ye=(1-Ze.smoothstep(Math.sin(le),.12,.65))*(1-a)*(1-o);x.uRays.value=ye*(1-l),x.uGlowGain.value=(1-.82*Ze.smoothstep(r,.045,.2)*(1-Ze.smoothstep(r,.78,.94)))*(1-.78*l)*(1-.85*a),x.uSun.value.set(Z,F),x.uProgress.value=r}function z(L){if(!ri[L])throw new RangeError(`Unknown landscape palette: ${L}`);l=L==="eclipse"?1:0,h=l?.5:0;const j=ri[L];for(const[le,Z]of[["uTop","top"],["uMiddle","middle"],["uHorizon","horizon"],["uGlow","glow"]])x[le].value.copy(In(j[Z]));y.uColor.value.copy(In(j.sun)),D.forEach((le,Z)=>{le.material.uniforms.uColor.value.copy(In(j.ridges[Z])),le.material.uniforms.uHaze.value.copy(In(j.horizon))}),N(d)}const U=["dawn","morning","cloud","rain","storm","snow","winter","clear","autumn","sunset","dusk","night","eclipse"].map(L=>{const j=ri[L];return{...Object.fromEntries(["top","middle","horizon","glow","sun"].map(le=>[le,In(j[le])])),ridges:j.ridges.map(In)}});function W(L,j=L/11,le=0,Z=0,F=0,Q){const q=Ze.clamp(Number.isFinite(L)?L:0,0,12),ye=Math.min(11,Math.floor(q)),ge=ye===0?Ze.smootherstep(q,0,1):q-ye,Me=U[ye],Be=U[ye+1];r=Number.isFinite(j)?j:0,a=Ze.clamp(le,0,1),o=Ze.clamp(Z,0,1),l=Ze.clamp(F,0,1),h=Number.isFinite(Q)?Ze.clamp(Q,0,1):.5*Ze.smootherstep(l,0,1);const Le=U[12];for(const[pe,K]of[["uTop","top"],["uMiddle","middle"],["uHorizon","horizon"],["uGlow","glow"]])x[pe].value.copy(Me[K]).lerp(Be[K],ge).lerp(Le[K],l);y.uColor.value.copy(Me.sun).lerp(Be.sun,ge).lerp(Le.sun,l),D.forEach((pe,K)=>{pe.material.uniforms.uColor.value.copy(Me.ridges[K]).lerp(Be.ridges[K],ge).lerp(Le.ridges[K],l),pe.material.uniforms.uHaze.value.copy(Me.horizon).lerp(Be.horizon,ge).lerp(Le.horizon,l)})}function te(L){if(!Number.isFinite(L)||L<=0)throw new RangeError("Aspect must be positive.");u=10*L,x.uAspect.value=L;for(const j of[M,H])j.scale.x=u*1.6;for(const j of D)j.scale.x=u;N(d)}return N(0),{group:s,update:N,setPalette:z,setAtmosphere:W,setAspect:te,get celestial(){return{sun:S.position.toArray(),moon:A.position.toArray(),sunOpacity:y.uOpacity.value,moonOpacity:w.uniforms.uOpacity.value,day:r,eclipse:l,eclipseTransit:h,shadowClipped:!0,eclipseMoon:E.position.toArray(),eclipseMoonOpacity:v.uniforms.uOpacity.value,coronaOpacity:R.uOpacity.value,coronaMoonMasked:!0,coronaLunarOffset:R.uLunarOffset.value.toArray(),solarOccluded:c,terrainAtSun:f}},headlineRegion:F1,cameraDefaults:Ja,grain:V.uAmount,setGrain(L){V.uAmount.value=Ze.clamp(L,0,1)},setReducedMotion(L){i=!!L,N(d)},dispose(){if(!m){m=!0;for(const L of _)L.dispose();s.clear(),s.removeFromParent()}}}}function W1(n,e,t){const i=new l1({antialias:!0,alpha:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0});i.setPixelRatio(1),i.outputColorSpace=_n,i.toneMapping=pc,i.toneMappingExposure=1.2,i.autoClear=!1,n.appendChild(i.domElement);const s=new Fo,r=new Wn(35,16/9,.05,120),a=new Fo,o=B1(16/9),l=V1({aspect:16/9,grain:.45});a.add(l.group),l.group.position.y=-.85;const c=O1();s.add(c.group);const h=new Map,f=R1();s.add(f.group);const d=C1();a.add(d.group);const u=k1();a.add(u.group);let m,_=!1,g=1920,p=1080,x=null,M=0,y=0,S=null;const w=new Ae,A=new Ae;function v(){const U=new Fo;U.background=new it("#101514");for(const[L,j,le,Z,F,Q]of[[14,8,5,-5,12,4],[3,11,4,12,7,1],[16,2,8,-2,6,-9],[8,3,2.4,0,5,12]]){const q=new yt(new ti(L,j),new Kt({color:new it(le,le,le)}));q.position.set(Z,F,Q),q.lookAt(0,0,0),U.add(q)}const W=new oc(i),te=W.fromScene(U,.025);s.environment=te.texture,s.environmentIntensity=1,m?.dispose(),m=te,W.dispose(),U.traverse(L=>{L.geometry?.dispose(),L.material?.dispose()})}v();const E=[];for(const[U,W,te]of[[16118505,2.5,[-8,12,7]],[12965080,2,[9,5,-8]],[14872295,.7,[7,3,11]]]){const L=new hm(U,W);L.position.set(...te),s.add(L),E.push(L)}s.add(new am(13820118,856848,.35));const R=N1();a.add(R.group);function P(U){if(!h.has(U)){const W={laptop:f1,sealed:h1,engine:y1,swarm:w1,memory:S1,identity:P1}[U](),te=new St;te.add(W.group);const L={laptop:.52,sealed:.028,engine:.022,swarm:1,memory:1,identity:1}[U];W.group.scale.setScalar(L),U==="engine"&&W.group.position.set(-.55,-1,0),U==="sealed"&&(W.group.position.y=-.65),te.visible=!1,s.add(te),h.set(U,Object.assign(W,{wrapper:te}))}return h.get(U)}function D(U,W){g=Math.max(1,Math.round(U)),p=Math.max(1,Math.round(W)),i.setSize(g,p,!1)}let $=!0,se=0;for(const U of mo)P(U);async function V(){const U=[];try{r.position.set(0,4,17),r.lookAt(0,0,0);for(const W of[s,a])W.traverse(te=>{U.push([te,te.visible,te.frustumCulled]),te.visible=!0,te.frustumCulled=!1});await i.compileAsync(a,o),await i.compileAsync(s,r),i.setSize(256,144,!1);for(let W=0;W<3;W++){for(const[L,j]of h)L==="engine"?j.update(W/2,0,0,{retainEngine:!0,spread:1}):j.update(W/2,0,{fault:1,repair:W/2,cartridgesOnly:W/2,assembly:W/2});f.update({strength:1,morph:W/2},0),c.update({strength:W===1?.5:1,progress:W/2,scale:1,x:0,y:0,z:0,turn:0},0),u.update({cloud:1,rain:1,snow:1,storm:1,night:1,aurora:1,autumn:1},3.4);for(const L of[s,a])L.traverse(j=>{j.visible=!0,j.frustumCulled=!1});const te=[];s.traverse(L=>{L.isPointLight&&te.push(L)});for(let L=0;L<=te.length;L++)te.forEach((j,le)=>j.visible=le<L),i.clear(),i.render(a,o),i.clearDepth(),i.render(s,r),se++;await new Promise(L=>setTimeout(L,0))}i.getContext().finish()}finally{i.setSize(g,p,!1);for(const[W,te,L]of U)W.visible=te,W.frustumCulled=L;for(const W of h.values())W.wrapper.visible=!1;$=!1}}const H=V(),N=new I;function z(U,W=0,te=!1,L=1/60,j=!1){if(_||$)return;S=U;const le=te?0:W;te||j?(w.set(0,0),A.set(0,0)):A.lerp(w,1-Math.exp(-L*1.2)),l.setAtmosphere(U.atmosphere,U.day,U.night,U.cloud,U.eclipse,U.eclipseTransit),u.update(U,le),l.update(U.travel+Math.sin(le*.023)*.006),l.group.position.x=Math.sin(U.travel*Math.PI*2)*.25,o.zoom=1+U.travel*.035+Math.sin(le*.019)*.004,o.updateProjectionMatrix(),R.update(U,le),d.update(U,le,te||j);const Z=U.contributions||0,F=Z>.001?Ze.clamp((U.agents||0)/Z,0,1):0;f.update({strength:Z,morph:F,arrival:F>.001?1:Z},le),f.group.position.set(Ze.lerp(-.4,4.9,F)+(F>.99?-24:0)*(1-Z),Ze.lerp(-1.15,2.3,F),-.5),f.group.rotation.set(Ze.lerp(-.32,.06,F),Ze.lerp(.06,-.12,F),0),f.group.scale.setScalar(Ze.lerp(1.08,.85,F)),r.position.set(U.cameraX+w.x*.055,U.cameraY+w.y*.035,U.cameraZ),N.set(0,0,0),r.lookAt(N),E[0].position.x=-8+Math.sin(le*.16)*.6+A.x*1.2,E[1].position.z=-8+Math.cos(le*.13)*.7,s.environmentRotation.y=Math.sin(le*.09)*.025+A.x*.035,E[2].intensity=U.objects.engine.opacity>.1?1.15:.7,c.update(U.system,le);for(const Q of mo){const q=U.objects[Q];if(q.opacity<=1e-4||q.scale<=1e-4){h.has(Q)&&(h.get(Q).wrapper.visible=!1);continue}const ye=P(Q);ye.wrapper.visible=!0,ye.wrapper.position.set(q.x,q.y+Math.sin(le*.48+(Q==="engine"?2:0))*.075,q.z),ye.wrapper.rotation.set(q.tilt+Math.sin(le*.17)*.004,q.turn+Math.sin(le*.34)*q.spin,q.roll+Math.sin(le*.11)*.003),ye.wrapper.scale.set(q.scale,q.scale*q.stretchY,q.scale*q.stretchZ);const ge=x?.kind===Q?x.t:q.progress;M=ge,Q==="laptop"&&(y=ge),Q==="engine"?ye.update(ge,te?null:le*.018%.5,le*.6,{retainEngine:!0,spread:q.spread,openFront:q.openFront,componentRow:q.componentRow}):ye.update(ge,le,{fault:q.fault,repair:q.repair,cartridgesOnly:q.cartridgesOnly,assembly:q.assembly})}i.setViewport(0,0,g,p),i.setScissorTest(!1),i.setClearColor(856081,1),i.clear(),i.render(a,o),i.clearDepth(),i.render(s,r)}return i.domElement.addEventListener("webglcontextlost",U=>{U.preventDefault(),_=!0,e("context")}),i.domElement.addEventListener("webglcontextrestored",()=>{try{v(),_=!1,t()}catch(U){e("restore",U)}}),{renderer:i,ready:H,resize:D,draw:z,setPointer(U,W){w.set(U,W)},clearManual(){x=null},getObjectProgress(){return M},setObjectProgress(U,W="sealed"){x={kind:W,t:U}},getState(){const U=i.getContext(),W=U.getExtension("WEBGL_debug_renderer_info");return{lost:_,warmed:!$,warmedFrames:se,galaxy:d.state,contributions:f.state,environment:!!s.environment,models:[...h.keys()],renderer:W?U.getParameter(W.UNMASKED_RENDERER_WEBGL):U.getParameter(U.RENDERER),calls:i.info.render.calls,triangles:i.info.render.triangles,geometries:i.info.memory.geometries,programs:i.info.programs.length,textures:i.info.memory.textures,laptop:h.get("laptop")?.state,instrument:c.state,objects:Object.fromEntries([...h].map(([te,L])=>[te,L.state||L.group.userData.state||null])),weather:Object.fromEntries(["day","rain","snow","cloud","storm","vortex","night","autumn","spring","aurora","wind","frost","eclipse"].map(te=>[te,S?.[te]])),landscapeMotion:{...R.state,clouds:u.state,celestial:l.celestial},laptopT:y,objectProgress:M,journey:S,parts:Object.fromEntries([...h].map(([te,L])=>[te,Object.fromEntries(["Laptop display","Laptop motherboard","Laptop deck","Left cooling fan","Enclosure","Sealed core","Crankshaft","Front crankcase service cover","Centrifugal governor + throttle feedback"].map(j=>{const le=L.group.getObjectByName(j);return[j,le?{position:le.position.toArray(),rotation:le.rotation.toArray().slice(0,3)}:null]}))])),poses:Object.fromEntries([...h].map(([te,L])=>[te,{visible:L.wrapper.visible,position:L.wrapper.position.toArray(),rotation:L.wrapper.rotation.toArray().slice(0,3),scale:L.wrapper.scale.x}]))}},dispose(){h.forEach(U=>{U.dispose()}),c.dispose(),u.dispose(),d.dispose(),f.dispose(),l.dispose(),m?.dispose(),R.dispose(),i.dispose(),i.domElement.remove()}}}function $1(n){const e=n.findIndex(v=>v.id==="1.2"),t=e+1,i=document.querySelector('[data-id="1.2"] .chart-pair>div:nth-child(2)'),s=document.querySelector('[data-id="1.3"] .chart-pair>div:first-child'),r=document.createElement("div");r.id="evidence-world",r.setAttribute("aria-hidden","true");const a=i.cloneNode(!0);a.id="travelling-chart";const o=[...a.querySelectorAll(".plot")];o.forEach(v=>v.setAttribute("pathLength","1")),r.appendChild(a),document.querySelector("#stage").insertBefore(r,document.querySelector("#slides")),i.classList.add("shared-chart-source"),s.classList.add("shared-chart-source");const l=a.querySelector(".tag"),c=[i,s].map(v=>v.querySelector(".tag").textContent),h=v=>{let E=0,R=0;for(let P=v;P&&P.id!=="stage";P=P.offsetParent)E+=P.offsetLeft,R+=P.offsetTop;return{x:E,y:R}},f=h(i),d=h(s),u=n.map((v,E)=>{const R=document.querySelector(`[data-id="${v.id}"]`),P=[...R.querySelectorAll(".chart-pair .plot,.pipeline .plot")];return P.forEach(D=>D.setAttribute("pathLength","1")),{index:E,lines:P,reveals:[...R.querySelectorAll("[data-reveal]")],last:-1}}),m=n.findIndex(v=>v.id==="4.1"),_=document.querySelector(".sync-light"),g=document.querySelector('[data-id="4.1"] .small-loop > strong'),p=n.findIndex(v=>v.id==="2A.1"),x="http://www.w3.org/2000/svg",M=[...document.querySelectorAll(".trace-span")].map((v,E)=>{const R=v.querySelector("rect"),P=v.ownerSVGElement;let D=P.querySelector("defs");D||(D=document.createElementNS(x,"defs"),P.prepend(D));const $=Number(R.getAttribute("x")),se=Number(R.getAttribute("y")),V=Number(R.getAttribute("width")),H=document.createElementNS(x,"linearGradient");H.id=`trace-light-${E}`,H.setAttribute("gradientUnits","userSpaceOnUse");for(const[z,U]of[[0,0],[.35,.12],[.62,.48],[.83,.16],[1,0]]){const W=document.createElementNS(x,"stop");W.setAttribute("offset",z),W.setAttribute("stop-color","#9fe9ff"),W.setAttribute("stop-opacity",U),H.append(W)}D.append(H);const N=R.cloneNode();return N.classList.add("trace-glow"),N.style.setProperty("--trace-light",`url(#${H.id})`),N.setAttribute("aria-hidden","true"),R.after(N),{gradient:H,glow:N,x:$,y:se,w:V,i:E}});let y=-1,S=0;const w=(v,E,R)=>{v.style[E]!==R&&(v.style[E]=R)};function A(v,E,R,P,D=0,$=!1){if(Math.abs(v-p)<1.1)for(const j of M){const le=((E?0:D)*.2+j.i*.13)%1,Z=Math.min(380,j.w*.65),F=j.x-Z+le*(j.w+Z*2);j.gradient.setAttribute("x1",F),j.gradient.setAttribute("x2",F+Z)}if(_&&Math.abs(v-m)<1.1){const j=E?0:D*.34;_.style.strokeDashoffset=String(-j*1e3),g.style.textShadow=`0 0 ${8+10*(.5+.5*Math.sin(j*Math.PI*2))}px #85dbff99`}const se=Math.round(v);y!==se&&(y=se,S=D);const V=E||R||$,H=V?20:Math.max(0,D-S),N=Un(e,t,v),z=P.offset(e,v),U=P.offset(t,v),W=v<e?z:v>t?U:{x:0,y:0},te=c[v<e+.5?0:1];l.textContent!==te&&(l.textContent=te),a.style.setProperty("--chart-panel",`rgba(19,43,64,${N*.94})`),a.style.setProperty("--chart-line",`rgb(${Ht(130,105,N)},${Ht(29,178,N)},${Ht(50,255,N)})`),a.style.setProperty("--chart-ink",`rgb(${Ht(20,244,N)},${Ht(49,247,N)},${Ht(70,250,N)})`);const L=v>e-1&&v<t+1&&!R;w(a,"visibility",L?"visible":"hidden"),w(a,"opacity","1"),o.forEach(j=>{w(j,"strokeDasharray","1"),w(j,"strokeDashoffset",String(y===e&&!V?1-Un(.4,2.6,H):0))}),L&&w(a,"transform",`translate3d(${Ht(f.x,d.x,N)+W.x}px,${Ht(f.y,d.y,N)+W.y}px,0)`);for(const j of u){if(Math.abs(j.index-v)>1.05)continue;const le=j.index===y?H:0;j.lines.forEach((Z,F)=>{const Q=V?1:Un(F*.4,2.2+F*.4,le);w(Z,"strokeDasharray","1"),w(Z,"strokeDashoffset",String(1-Q))}),j.reveals.forEach(Z=>{const F=Number(Z.dataset.reveal)||0,Q=V?1:Un(F,F+.9,le);w(Z,"opacity",String(Q)),w(Z,"transform",`translateY(${(1-Q)*12}px)`)})}}return{update:A}}function X1(n=0,e=3.8,t=.86){let i=n,s=0;return{snap(r){i=r,s=0},step(r,a){const o=Math.max(1,Math.ceil(a*120)),l=Math.min(a,.08)/o;for(let c=0;c<o;c++)s+=(e*e*(r-i)-2*t*e*s)*l,i+=s*l;return Math.abs(r-i)<2e-5&&Math.abs(s)<1e-4&&(i=r,s=0),i},get position(){return i},get velocity(){return s}}}const q1={.1:"down",.2:"right",D1:"down",1.1:"down",1.2:"right",1.3:"down",1.4:"left",1.5:"down",1.6:"down",D2:"down","2A.0":"right","2A.1":"down","2A.2":"right","2A.3":"down","2A.4":"up","2A.5":"right","2A.6":"down","2B.0":"left","2B.1":"left","2B.2":"down","2B.3":"down","2C.0":"right","2C.1":"right","2C.2":"down","2C.3":"down","2D.0":"down","2D.1":"right","2D.2":"up","2D.3":"right","2D.4":"down",D3:"down",3.1:"right",D4:"down",4.1:"up",4.2:"down",4.3:"left",4.4:"down",4.5:"down",4.6:"down"},Y1={down:[0,1160],up:[0,-1160],right:[2040,0],left:[-2040,0]};function Z1(n){const e=[{x:0,y:0}];for(let s=1;s<n.length;s++){const[r,a]=Y1[q1[n[s-1].id]||"down"];e.push({x:e[s-1].x+r,y:e[s-1].y+a})}function t(s){const r=ia(s,0,n.length-1),a=Math.min(Math.floor(r),n.length-2),o=Un(.025,.975,r-a),l=e[a],c=e[a+1];return{x:Ht(l.x,c.x,o),y:Ht(l.y,c.y,o),dx:c.x-l.x,dy:c.y-l.y,t:o,index:a}}function i(s,r){const a=t(r),o=e[s];return{x:o.x-a.x,y:o.y-a.y}}return{anchors:e,sample:t,offset:i}}const ja=Z1(gt),K1=D1(gt);let gu;const go=X1();let vo=!0,ts=[],Vn=null,vi=0;const nt=n=>document.querySelector(n),ui=n=>[...document.querySelectorAll(n)],jn=matchMedia("(prefers-reduced-motion: reduce)").matches,J1=new URLSearchParams(location.search),sa=J1.has("presenter"),rs=typeof BroadcastChannel<"u"?new BroadcastChannel("signals-keynote"):null;let Et=0,fn=[],an=null,Qa=0,ci=0,bd=0,_d=0,yo=0,yr=!1,tn=null,Mi=!1,hr=null,dr=0,_i=!0,rr=null,ws=0;const as=n=>n.div?n.name:(n.html.match(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/)?.[1]||n.sourceTitle.split(" (~")[0]).replace(/<br\s*\/?>/g," ").replace(/<[^>]*>/g,"").replace(/&amp;/g,"&"),hc=()=>Math.max(0,gt.findIndex(n=>n.id===decodeURIComponent(location.hash.slice(1))));function xo(){rs?.postMessage({type:"state",index:Et,id:gt[Et].id,startedAt:hr,pausedMs:dr,paused:_i})}function j1(n){return n.actNumber!==2?-2:n.section?"ABCD".indexOf(n.section):-1}function Q1(n){const e=document.createElement("div");return e.innerHTML=n||"",e.querySelectorAll(".foot,.fivedots,.eyebrow").forEach(t=>t.remove()),e.querySelectorAll("[style]").forEach(t=>t.removeAttribute("style")),e.querySelectorAll(".cnt").forEach(t=>{const i=Number(t.dataset.n);t.textContent=t.dataset.fmt==="comma"?i.toLocaleString("en-US"):i+({pct:"%",pctplus:"%+",x:"×"}[t.dataset.fmt]||"")}),e.innerHTML}function ex(n){const e=document.createElement("div");return e.innerHTML=n.h||"",(n.sources||[...e.querySelectorAll(".foot a")]).map((t,i)=>{let s;try{const r=new URL(t.href);s=r.hostname.replace(/^www\./,"")+(r.hostname==="github.com"?" / "+r.pathname.split("/").filter(Boolean).slice(0,2).join("/"):"")}catch{s=t.textContent}return`<a href="${t.href}" target="_blank" rel="noopener" title="${t.href}">[${i+1}] ${s}</a>`}).join(" &nbsp; ")}function tx(){nt("#slides").innerHTML=gt.map(e=>`<section class="slide ${e.layout}" id="slide-${e.id}" aria-label="Slide ${e.id}: ${as(e)}" aria-hidden="true" data-id="${e.id}" style="--accent:${e.accent}"><div class="content">${e.html===e.h?Q1(e.html):e.html}${e.scene&&e.scene!=="landscape"?`<div class="static-object">${e.scene==="sealed"?"execute_code<br><small>01 SPAN / CONTENTS OPAQUE</small>":e.scene==="engine"?"desired state<br>↓<br>controller<br>↑<br>observed state":"AG–01<br>NETWORK / ACTIVE"}</div>`:""}</div><div class="foot">${ex(e)}</div></section>`).join("");const n=nt('[data-id="3.4"] .src');n&&(n.textContent="Working snapshot · final repository check due 9 September 2026"),nt("#rail").innerHTML=gt.map(e=>`<button data-go="${e.index}" class="${e.div?"divider":""}" aria-label="Slide ${e.id}: ${as(e)}" title="${e.id} · ${as(e)}"></button>`).join(""),nt("#slide-index").innerHTML=gt.map(e=>`<button data-go="${e.index}" class="${e.div?"is-divider":""}"><span>${e.id}</span>${as(e)}</button>`).join(""),ui("[data-go]").forEach(e=>e.addEventListener("click",()=>{Mn(Number(e.dataset.go)),nt("#navigator").close()})),ui("[data-object-t]").forEach(e=>e.addEventListener("click",()=>{vu(Number(e.dataset.objectT),!0)}))}function wd(){const n=Math.min(innerWidth/1920,innerHeight/1080);nt("#stage").style.setProperty("--scale",n);let e=0;fn=gt.map(t=>{const i=e;return e+=innerHeight*(t.div||t.scene?3.6:2.65),i}),nt("#runway").style.height=fn.at(-1)+innerHeight+"px",tn?.resize(1920*n*Math.min(devicePixelRatio,2),1080*n*Math.min(devicePixelRatio,2)),sa||(yr=!0,scrollTo(0,fn[Et]),Vn=fn[Et],vo=!0,an=null,ci=0)}function ta(n){let e=0;for(let t=1;t<fn.length;t++)Math.abs(n-fn[t])<Math.abs(n-fn[e])&&(e=t);return e}function Bc(n,e=!0){Et=n;const t=gt[n];ui(".slide").forEach((s,r)=>{s.classList.toggle("active",r===n),s.setAttribute("aria-hidden",String(r!==n)),s.inert=r!==n}),ui("#rail button").forEach((s,r)=>{s.classList.toggle("active",r===n),s.classList.toggle("passed",r<n),s.setAttribute("aria-current",r===n?"step":"false")}),ui("#slide-index button").forEach((s,r)=>s.classList.toggle("active",r===n)),nt("#act-label").textContent=t.div?"":t.actNumber?`${String(t.actNumber).padStart(2,"0")} / ${t.actName}`:"OPENING KEYNOTE",nt("#slide-label").textContent=`${String(n+1).padStart(2,"0")} / ${gt.length}   ·   ${t.id}`,nt("#stage").style.setProperty("--accent",t.accent);const i=j1(t);nt("#contract-tracker").innerHTML=i===-2?"":`${i>=0?["OBSERVABILITY","MEMORY","IDENTITY","SECURITY"][i]:"FOUR SYSTEMS"} ${Array.from({length:4},(s,r)=>`<i class="${r===i?"on":""}"></i>`).join("")}`,ui(".slide.active [data-object-t]").forEach(s=>s.classList.toggle("selected",Number(s.dataset.objectT)===(t.scene==="sealed"?1:.6))),nt("#previous").disabled=n===0,nt("#next").disabled=n===gt.length-1,e&&history.replaceState(null,"",`${location.pathname}${location.search}#${t.id}`),xo()}function vu(n,e=!1){if(cancelAnimationFrame(ws),ui(".slide.active [data-object-t]").forEach(r=>r.classList.toggle("selected",Number(r.dataset.objectT)===n)),!e||jn||!tn){tn?.setObjectProgress(n,gt[Et].scene==="engine"?"engine":"sealed");return}const t=tn.getObjectProgress(),i=performance.now(),s=r=>{const a=Math.min(1,(r-i)/800),o=a*a*(3-2*a);tn.setObjectProgress(t+(n-t)*o,gt[Et].scene==="engine"?"engine":"sealed"),a<1&&(ws=requestAnimationFrame(s))};ws=requestAnimationFrame(s)}function Mn(n,e=!1){if(n=Math.max(0,Math.min(gt.length-1,n)),clearTimeout(yo),sa){rs?.postMessage({type:"go",index:n});return}const t=fn[n];cancelAnimationFrame(ws),tn?.clearManual(),e||jn?(an=null,ci=0,yr=!0,scrollTo(0,t),Vn=t,vo=!0,Bc(n)):(an=t,Qa=scrollY,ci=0)}function Md(n){const e=gt[Et].actNumber,t=Math.max(0,Math.min(4,e+n));Mn(t===0?0:gt.findIndex(i=>i.id===`D${t}`))}function nx(){try{tn=W1(nt("#graphics"),()=>{Mi=!0,na()},()=>{Mi=!1,na()});const n=Math.min(innerWidth/1920,innerHeight/1080);tn.resize(1920*n*Math.min(devicePixelRatio,2),1080*n*Math.min(devicePixelRatio,2)),Mi=!1}catch(n){console.error("WebGL unavailable; static presentation is active.",n),Mi=!0}}function na(){document.body.classList.toggle("static-mode",Mi),nt("#graphics-status").hidden=!Mi,nt("#graphics-status").textContent="3D GRAPHICS UNAVAILABLE"}function ix(){window.open(`${location.pathname}?presenter#${gt[Et].id}`,"signals-presenter","popup,width=1400,height=940")}function sx(n){if(!(n.metaKey||n.ctrlKey||n.altKey||/INPUT|TEXTAREA|SELECT/.test(n.target.tagName))){if(nt("#blackout").hidden===!1){nt("#blackout").hidden=!0,n.preventDefault();return}if(!(nt("dialog[open]")||n.target.closest?.("[contenteditable=true]")||["Enter"," "].includes(n.key)&&n.target.closest?.("button,a"))){if(n.repeat&&["ArrowRight","ArrowLeft","PageDown","PageUp"," ","Enter"].includes(n.key)){n.preventDefault();return}switch(n.key){case"ArrowRight":case"PageDown":case"Enter":case" ":n.preventDefault(),Mn((an===null?Et:ta(an))+1);break;case"ArrowLeft":case"PageUp":n.preventDefault(),Mn((an===null?Et:ta(an))-1);break;case"ArrowDown":n.preventDefault(),Md(1);break;case"ArrowUp":n.preventDefault(),Md(-1);break;case"Home":n.preventDefault(),Mn(0);break;case"End":n.preventDefault(),Mn(gt.length-1);break;case"g":case"G":nt("#navigator").showModal();break;case"?":nt("#help").showModal();break;case"p":case"P":ix();break;case"b":case"B":nt("#blackout").hidden=!1;break;case"f":case"F":document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen?.().catch(()=>{});break}}}}function yu(n){const e=Math.min(.032,(n-(bd||n))/1e3);if(bd=n,an!==null){const l=an-Qa;ci+=(l*30-ci*11)*e,Qa+=ci*e;const c=Qa;yr=!0,Math.abs(l)<.5&&Math.abs(ci)<3?(scrollTo(0,an),an=null,ci=0):scrollTo(0,c)}(Vn===null||jn)&&(Vn=scrollY);const t=an!==null?8:5.5;Vn+=(scrollY-Vn)*(1-Math.exp(-e*t)),Math.abs(scrollY-Vn)<.05&&(Vn=scrollY);const i=ta(Vn);i!==Et&&Bc(i);let s=0;for(;s<fn.length-2&&Vn>fn[s+1];)s++;vi=s+ia((Vn-fn[s])/(fn[s+1]-fn[s])),(vo||jn)&&(go.snap(jn?Et:vi),vo=!1);const r=go.step(vi,e),a=K1.sample(jn?Et:r);a.route=ja.sample(jn?Et:r),nt("#stage").classList.toggle("theme-light",ts[Et].classList.contains("theme-light")),nt("#stage").classList.toggle("theme-dark",ts[Et].classList.contains("theme-dark"));const o=Mi;for(let l=Math.max(0,s-1);l<=Math.min(gt.length-1,s+2);l++){const c=ts[l],h=jn||o,f=h?{x:0,y:0}:ja.offset(l,vi),d=h?l===Et:Math.abs(l-vi)<1.01;c.classList.toggle("travelling",d),c.style.opacity=d?"1":"0",c.style.transform=`translate3d(${f.x}px,${f.y}px,0)`;const u=c._layers||(c._layers=[...c.querySelector(".content").children]);for(let m=0;m<u.length;m++){const _=Math.min(m,5)*.014;u[m].style.transform=h?"":`translate3d(${f.x*_}px,${f.y*_}px,0)`}}for(let l=0;l<ts.length;l++)Math.abs(l-vi)>1.01&&(ts[l].classList.remove("travelling"),ts[l].style.opacity="0");if(gu?.update(jn?Et:vi,jn,o,ja,rr??n/1e3,rr!==null),nt("#stage").style.setProperty("--journey-progress",String(vi/(gt.length-1))),tn&&!o)try{tn.draw(a,rr??n/1e3,jn,e,rr!==null)}catch(l){console.error("Graphics stopped; static slides retained.",l),Mi=!0,na()}n-_d>1e3&&(xo(),_d=n),requestAnimationFrame(yu)}function rx(){document.body.classList.add("presenter-mode"),nt("#presenter").hidden=!1,nt("#presenter").innerHTML='<div class="presenter-toolbar"><h1>Signals / Presenter</h1><time id="clock">00:00 / 45:00</time><button id="timer">Start clock</button><button id="timer-reset">Reset</button><button id="p-prev">← Previous</button><button id="p-next">Next →</button></div><div class="presenter-grid"><div><span class="mono">CURRENT SLIDE</span><h2 id="presenter-current"></h2><div id="speaker-notes"></div></div><div><span class="mono">UP NEXT</span><h2 id="presenter-next"></h2><p id="presenter-warning">The outline includes unresolved source checks and speaker-owned stories. See PREFLIGHT.md before stage.</p><span class="mono">← → SLIDES / ↑ ↓ ACTS · AUDIENCE WINDOW STAYS IN SYNC</span></div></div>';const n=e=>{Et=e,nt("#presenter-current").textContent=`${gt[e].id} / ${as(gt[e])}`,nt("#speaker-notes").textContent=gt[e].notes,nt("#speaker-notes").scrollTop=0,nt("#presenter-next").textContent=e<gt.length-1?`${gt[e+1].id} / ${as(gt[e+1])}`:"End of deck"};nt("#slide-index").innerHTML=gt.map(e=>`<button data-go="${e.index}"><span>${e.id}</span>${as(e)}</button>`).join(""),ui("#slide-index button").forEach(e=>e.onclick=()=>{Mn(Number(e.dataset.go)),nt("#navigator").close()}),n(hc()),nt("#p-prev").onclick=()=>Mn(Et-1),nt("#p-next").onclick=()=>Mn(Et+1),nt("#timer").onclick=()=>{rs?.postMessage({type:"timer",action:_i?"start":"pause"})},nt("#timer-reset").onclick=()=>rs?.postMessage({type:"timer",action:"reset"}),rs?.addEventListener("message",({data:e})=>{e.type==="state"&&(e.index!==Et&&n(e.index),hr=e.startedAt,dr=e.pausedMs,_i=e.paused,nt("#timer").textContent=_i?"Start clock":"Pause clock")}),setInterval(()=>{const e=_i?dr:dr+Date.now()-hr,t=Math.floor(e/1e3);nt("#clock").textContent=`${String(Math.floor(t/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")} / 45:00`,nt("#clock").style.color=t>=2700?"#f17b70":""},300),rs?.postMessage({type:"request-state"})}ui("[data-close]").forEach(n=>n.onclick=()=>n.closest("dialog").close());ui("dialog").forEach(n=>n.addEventListener("click",e=>{if(e.target===n){const t=n.getBoundingClientRect();(e.clientX<t.left||e.clientX>t.right||e.clientY<t.top||e.clientY>t.bottom)&&n.close()}}));addEventListener("keydown",sx);nt("#blackout").addEventListener("click",()=>{nt("#blackout").hidden=!0});nt("#stage").addEventListener("click",n=>{if(!(n.button!==0||n.target.closest("a,button,input,textarea,select,dialog,[role=button],[contenteditable=true]")||nt("dialog[open]")||getSelection()?.toString())){if(!nt("#blackout").hidden){nt("#blackout").hidden=!0;return}Mn((an===null?Et:ta(an))+1)}});nt("#menu-button").onclick=()=>nt("#navigator").showModal();nt("#help-button").onclick=()=>nt("#help").showModal();nt("#previous").onclick=()=>Mn(Et-1);nt("#next").onclick=()=>Mn(Et+1);sa?rx():(tx(),ts=ui(".slide"),ts.forEach((n,e)=>n.classList.add(gt[e].actNumber<3&&!["0.1","0.2"].includes(gt[e].id)&&(!["A","B"].includes(gt[e].section)||["2A.0"].includes(gt[e].id))?"theme-light":"theme-dark")),gu=$1(gt),Et=hc(),nx(),wd(),Bc(Et),na(),addEventListener("resize",wd),addEventListener("pointermove",n=>tn?.setPointer((n.clientX/innerWidth-.5)*2,(.5-n.clientY/innerHeight)*2),{passive:!0}),addEventListener("pointerout",n=>{n.relatedTarget||tn?.setPointer(0,0)}),addEventListener("hashchange",()=>Mn(hc(),!0)),addEventListener("wheel",()=>{an=null,ci=0,cancelAnimationFrame(ws),tn?.clearManual()},{passive:!0}),addEventListener("touchstart",()=>{an=null,ci=0,cancelAnimationFrame(ws),tn?.clearManual()},{passive:!0}),addEventListener("scroll",()=>{if(yr){yr=!1;return}clearTimeout(yo),an===null&&(yo=setTimeout(()=>{const n=ta(scrollY);Math.abs(scrollY-fn[n])<innerHeight*.48&&Mn(n)},800))},{passive:!0}),rs?.addEventListener("message",({data:n})=>{n.type==="go"&&Mn(n.index),n.type==="request-state"&&xo(),n.type==="timer"&&(n.action==="reset"?(dr=0,hr=null,_i=!0):n.action==="start"&&_i?(hr=Date.now(),_i=!1):n.action==="pause"&&!_i&&(dr+=Date.now()-hr,_i=!0),xo())}),requestAnimationFrame(yu));window.keynote={ready:sa,slides:gt.map(n=>({id:n.id,title:as(n),layout:n.layout,scene:n.scene})),go(n,e=!0){Mn(typeof n=="number"?n:gt.findIndex(t=>t.id===n),e)},setObjectProgress:vu,scrollBetween(n,e){const t=gt.findIndex(i=>i.id===n);t<0||t>=gt.length-1||(an=null,ci=0,clearTimeout(yo),yr=!0,cancelAnimationFrame(ws),tn?.clearManual(),scrollTo(0,fn[t]+ia(e)*(fn[t+1]-fn[t])))},freeze(n=12){rr=n},unfreeze(){rr=null},getState(){return{index:Et,id:gt[Et].id,settled:an===null&&(Vn===null||Math.abs(Vn-scrollY)<.5),journeyPosition:vi,documentCamera:ja.sample(vi),objectPosition:go.position,objectVelocity:go.velocity,scrollY,position:fn[Et],static:Mi,reduced:jn,graphics:tn?.getState()}},loseContext(){tn?.renderer.forceContextLoss()},restoreContext(){tn?.renderer.forceContextRestore()}};addEventListener("pagehide",()=>{tn?.dispose(),rs?.close()},{once:!0});if(!sa){const n=document.createElement("div");n.id="startup-loading",n.setAttribute("role","status"),n.textContent="Preparing the journey",document.body.append(n),Promise.all([tn?.ready,document.fonts.ready,...[...document.images].map(e=>e.decode().catch(()=>{}))]).catch(e=>{console.error("Scene preparation failed",e),Mi=!0,na()}).finally(()=>{window.keynote.ready=!0,n.remove()})}
