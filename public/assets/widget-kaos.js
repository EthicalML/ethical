// Prototype KAOS graph with a fixed CSS mount: canvas backing-store resize never sizes the container.
(function () {
  const NODES=[
    {id:'plan',t:'PLANNER',x:.5,y:.12},{id:'ret',t:'RETRIEVER',x:.17,y:.38},{id:'code',t:'CODER',x:.5,y:.42},
    {id:'anal',t:'ANALYST',x:.83,y:.38},{id:'pol',t:'POLICY GATE',x:.5,y:.68},{id:'ver',t:'VERIFIER',x:.24,y:.88},{id:'aud',t:'AUDIT LOG',x:.76,y:.88}
  ];
  const EDGES=[[0,1],[0,2],[0,3],[1,4],[2,4],[3,4],[4,5],[4,6],[5,0]];
  function mount(host) {
    if(host.dataset.mounted)return;host.dataset.mounted='true';host.classList.add('kaos-canvas-mount');
    const canvas=document.createElement('canvas');canvas.setAttribute('aria-hidden','true');host.appendChild(canvas);
    const ctx=canvas.getContext('2d'),pointer={x:-1,y:-1};let w=0,h=0,t=0,active=true,raf=0;
    const status=host.closest('.kaos-panel')?.querySelector('[data-kaos-status]');
    function fit(){const r=host.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,1.5);w=r.width;h=r.height;canvas.width=Math.max(1,Math.round(w*dpr));canvas.height=Math.max(1,Math.round(h*dpr));ctx.setTransform(dpr,0,0,dpr,0,0);}
    function compact(){
      const pad=26,mid=h*.42,plan={x:pad,y:mid},gate={x:w-pad,y:mid},mids=[-1,0,1].map(k=>({x:w*.5+k*Math.min(46,w*.14),y:mid+k*Math.min(26,h*.2)}));
      mids.forEach((m,i)=>[[plan,m],[m,gate]].forEach(([a,b],j)=>{ctx.strokeStyle='rgba(244,242,238,.16)';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();const u=(t*.42+i*.19+j*.5)%1;ctx.beginPath();ctx.arc(a.x+(b.x-a.x)*u,a.y+(b.y-a.y)*u,2,0,7);ctx.fillStyle=`rgba(94,230,160,${.3+Math.sin(u*Math.PI)*.6})`;ctx.fill();}));
      const node=(p,r,color)=>{ctx.beginPath();ctx.arc(p.x,p.y,r+4,0,7);ctx.fillStyle='rgba(94,230,160,.08)';ctx.fill();ctx.beginPath();ctx.arc(p.x,p.y,r,0,7);ctx.fillStyle='#0f100f';ctx.fill();ctx.strokeStyle=color;ctx.stroke();};mids.forEach(m=>node(m,7,'rgba(94,230,160,.5)'));node(plan,10,'#5ee6a0');node(gate,10,'rgba(232,180,92,.9)');ctx.font="8.5px 'Geist Mono',monospace";ctx.textAlign='center';ctx.fillStyle='rgba(244,242,238,.55)';ctx.fillText('PLANNER',plan.x+8,mid+26);ctx.fillText('POLICY GATE',gate.x-14,mid+26);ctx.textAlign='left';
    }
    function draw(){
      t+=.016;ctx.clearRect(0,0,w,h);if(h<220){compact();if(active&&!matchMedia('(prefers-reduced-motion: reduce)').matches)raf=requestAnimationFrame(draw);return;}
      const pad=34,p=NODES.map(n=>({...n,sx:pad+n.x*(w-pad*2),sy:pad+n.y*(h-pad*2)}));let hovered=-1,best=26;
      p.forEach((n,i)=>{const d=Math.hypot(n.sx-pointer.x,n.sy-pointer.y);if(d<best){best=d;hovered=i;}});
      if(status)status.textContent=hovered>=0?`${p[hovered].t} — INSPECTING`:'RUNNING';
      EDGES.forEach(([a,b],ei)=>{const A=p[a],B=p[b],on=hovered===a||hovered===b;ctx.strokeStyle=on?'rgba(94,230,160,.65)':'rgba(244,242,238,.16)';ctx.lineWidth=on?1.4:1;ctx.beginPath();ctx.moveTo(A.sx,A.sy);ctx.lineTo(B.sx,B.sy);ctx.stroke();for(let k=0;k<2;k++){const u=(t*.34+ei*.17+k*.5)%1,x=A.sx+(B.sx-A.sx)*u,y=A.sy+(B.sy-A.sy)*u;ctx.beginPath();ctx.arc(x,y,2.1,0,7);ctx.fillStyle=`rgba(94,230,160,${.25+Math.sin(u*Math.PI)*.6})`;ctx.fill();}});
      p.forEach((n,i)=>{const on=hovered===i,pulse=1+.12*Math.sin(t*1.6+i),r=(n.id==='plan'||n.id==='pol'?15:12)*pulse;ctx.beginPath();ctx.arc(n.sx,n.sy,r+(on?7:4),0,7);ctx.fillStyle=on?'rgba(94,230,160,.16)':'rgba(94,230,160,.06)';ctx.fill();ctx.beginPath();ctx.arc(n.sx,n.sy,r,0,7);ctx.fillStyle='#0f100f';ctx.fill();ctx.strokeStyle=n.id==='pol'?'rgba(232,180,92,.9)':on?'#5ee6a0':'rgba(94,230,160,.5)';ctx.lineWidth=1.3;ctx.stroke();ctx.font="9.5px 'Geist Mono',monospace";ctx.textAlign='center';ctx.fillStyle=on?'rgba(244,242,238,.95)':'rgba(244,242,238,.55)';ctx.fillText(n.t,n.sx,n.sy+r+14);});ctx.textAlign='left';
      if(active&&!matchMedia('(prefers-reduced-motion: reduce)').matches)raf=requestAnimationFrame(draw);
    }
    host.addEventListener('pointermove',e=>{const r=canvas.getBoundingClientRect();pointer.x=e.clientX-r.left;pointer.y=e.clientY-r.top;});
    host.addEventListener('pointerleave',()=>{pointer.x=-1;pointer.y=-1;});
    fit();draw();new ResizeObserver(()=>{fit();if(matchMedia('(prefers-reduced-motion: reduce)').matches)draw();}).observe(host);
    new IntersectionObserver(([entry])=>{const next=entry.isIntersecting;if(next&&!active){active=true;raf=requestAnimationFrame(draw);}active=next;if(!next)cancelAnimationFrame(raf);}).observe(host);
  }
  function setup(){document.querySelectorAll('[data-widget="kaos-graph"]').forEach(mount);}
  document.readyState==='loading'?addEventListener('DOMContentLoaded',setup,{once:true}):setup();
})();
