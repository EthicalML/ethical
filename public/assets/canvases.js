// Ported from the design prototype: three 9s hero scenes, tear and mode swap.
(function () {
  const LABELS = ['Human intent','Models','Agents & tools','Data','Evaluations','Monitoring','Standards','Institutions'];

  document.querySelectorAll('[data-widget="hero-cycle"]').forEach((canvas) => {
    if (canvas.dataset.mounted) return;
    canvas.dataset.mounted = 'true';
    const host = canvas.closest('.hero, .canvas-variant') || canvas.parentElement;
    const ctx = canvas.getContext('2d');
    const pointer = { x: .5, y: .5 };
    const state = { cur: 'planes', next: null, mix: 0, auto: true, last: 0, spin: 0, armed: true, tear: 0 };
    const buttons = [...host.querySelectorAll('[data-hero-mode]')];
    let width = 0, height = 0, dpr = 1, raf = 0, start = performance.now(), visible = true;
    let graph, sphere, buffer;

    function fit() {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(devicePixelRatio || 1, 1.5);
      width = rect.width; height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function initGraph() {
      const nodes = [];
      [{y:-.62,n:16},{y:0,n:20},{y:.62,n:15}].forEach((layer, li) => {
        const cols = Math.ceil(Math.sqrt(layer.n * 1.7));
        for (let i = 0; i < layer.n; i++) {
          const gx = (i % cols) / (cols - 1) - .5;
          const gz = Math.floor(i / cols) / Math.max(1, Math.ceil(layer.n / cols) - 1) - .5;
          nodes.push({ x:gx*2.5+(Math.random()-.5)*.3, y:layer.y+(Math.random()-.5)*.14, z:gz*2.1+(Math.random()-.5)*.28, layer:li, period:11+Math.random()*14, offset:Math.random()*20, seed:Math.random() });
        }
      });
      LABELS.forEach((label, i) => { if (nodes[i*6]) nodes[i*6].anchor = label; });
      const edges = [];
      for (let i=0;i<nodes.length;i++) for (let j=i+1;j<nodes.length;j++) {
        const a=nodes[i], b=nodes[j], distance=Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z);
        const same=a.layer===b.layer, limit=same?.78:.82;
        if (distance<=limit && (same || Math.random()<=.35)) edges.push({i,j,d:distance,limit});
      }
      graph={nodes,edges};
    }
    function drawPlanes(c,w,h,t) {
      if (!graph) initGraph();
      const yaw=t*.055+state.spin+(pointer.x-.5)*.35, tilt=.3+(pointer.y-.5)*.14;
      const scale=Math.min(w*1.15,h)*.4, cx=w*.5, cy=h*.5;
      const life=(n)=>{const u=((t+n.offset)%n.period)/n.period, raw=Math.min(1,Math.min(u,1-u)/.3);return raw*raw*(3-2*raw);};
      const points=graph.nodes.map((n)=>{
        const co=Math.cos(yaw),si=Math.sin(yaw); let x=n.x*co-n.z*si,z=n.x*si+n.z*co;
        const ct=Math.cos(tilt),st=Math.sin(tilt),y=n.y*ct-z*st; z=n.y*st+z*ct;
        const k=4.2/(4.2-z); return {x:cx+x*scale*k,y:cy+y*scale*k,z,k,a:life(n),anchor:n.anchor,seed:n.seed};
      });
      c.lineWidth=1;
      graph.edges.forEach((e)=>{const a=points[e.i],b=points[e.j],alpha=a.a*b.a*(1-e.d/e.limit)*(.3+.3*((a.z+b.z)/2+1)/2);if(alpha<.012)return;c.strokeStyle=`rgba(94,230,160,${alpha})`;c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.stroke();});
      points.forEach((p)=>{if(p.a<.02)return;const r=(1.3+1.9*p.k)*(.7+p.seed*.6),bright=p.seed>.78;c.beginPath();c.arc(p.x,p.y,r,0,7);c.fillStyle=bright?`rgba(94,230,160,${p.a*.95})`:`rgba(244,242,238,${p.a*(.3+.42*p.k)})`;c.fill();if(bright){c.beginPath();c.arc(p.x,p.y,r+6+3*p.k,0,7);c.strokeStyle=`rgba(94,230,160,${p.a*.16})`;c.stroke();}if(p.anchor&&p.z>-.1){c.font="10px 'Geist Mono',monospace";c.fillStyle=`rgba(244,242,238,${p.a*.3})`;c.fillText(p.anchor.toUpperCase(),p.x+11,p.y-9);}});
    }
    function initSphere() {
      const vertices=[], edges=[], seen=new Set(), golden=Math.PI*(3-Math.sqrt(5));
      for(let i=0;i<48;i++){const y=1-(i/47)*2,r=Math.sqrt(Math.max(0,1-y*y)),th=golden*i;vertices.push([Math.cos(th)*r,y,Math.sin(th)*r]);}
      for(let i=0;i<48;i++) vertices.map((p,j)=>({j,d:(p[0]-vertices[i][0])**2+(p[1]-vertices[i][1])**2+(p[2]-vertices[i][2])**2})).filter(x=>x.j!==i).sort((a,b)=>a.d-b.d).slice(0,3).forEach(({j})=>{const key=i<j?`${i}-${j}`:`${j}-${i}`;if(!seen.has(key)){seen.add(key);edges.push([i,j]);}});
      sphere={v:vertices,e:edges};
    }
    function drawSphere(c,w,h,t) {
      if(!sphere)initSphere(); const rx=-.24+t*.06+(pointer.y-.5)*.5,ry=.4+t*.2+state.spin*1.4+(pointer.x-.5)*.9,R=Math.min(w,h)*.36,cx=w*.6,cy=h*.5;
      const cyy=Math.cos(rx),syy=Math.sin(rx),cxx=Math.cos(ry),sxx=Math.sin(ry);
      const p=sphere.v.map(v=>{const y1=v[1]*cyy-v[2]*syy,z1=v[1]*syy+v[2]*cyy,x2=v[0]*cxx+z1*sxx,z2=-v[0]*sxx+z1*cxx,s=3.4/(3.4+z2);return{x:cx+x2*s*R,y:cy+y1*s*R,z:z2};});
      const alive=sphere.v.map((_,i)=>Math.max(0,Math.min(1,(Math.sin(t*.9+(i*1.7)%(Math.PI*2))+.65)*1.4)));
      c.setLineDash([1,6]);c.strokeStyle='rgba(62,207,166,.18)';c.beginPath();c.arc(cx,cy,R*1.06,0,7);c.stroke();c.setLineDash([]);
      sphere.e.forEach(([a,b])=>{const life=Math.min(alive[a],alive[b]);if(life<=.02)return;const depth=.15+Math.max(0,1-((p[a].z+p[b].z)/2+1)/2)*.75;c.strokeStyle=`rgba(62,207,166,${depth*life*.8})`;c.beginPath();c.moveTo(p[a].x,p[a].y);c.lineTo(p[b].x,p[b].y);c.stroke();});
      p.forEach((q,i)=>{const life=alive[i];if(life<=.02)return;const depth=.4+Math.max(0,1-(q.z+1)/2)*.6;c.beginPath();c.arc(q.x,q.y,2.4*(.4+life*.9),0,7);c.fillStyle=`rgba(62,207,166,${depth*life*(q.z<0?1:.45)})`;c.fill();});
      const glow=c.createRadialGradient(cx,cy,0,cx,cy,R*.22);glow.addColorStop(0,'rgba(62,207,166,.5)');glow.addColorStop(1,'rgba(62,207,166,0)');c.fillStyle=glow;c.beginPath();c.arc(cx,cy,R*.22,0,7);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(cx,cy,3,0,7);c.fill();
    }
    function drawContour(c,w,h,t) {
      const cx=w*(.56+(pointer.x-.5)*.05),cy=h*(.5+(pointer.y-.5)*.05),step=Math.max(w,h)/46,swirl=state.spin*1.1;
      for(let i=1;i<=54;i++){c.beginPath();for(let a=0;a<=84;a++){const th=a/84*Math.PI*2+swirl+i*.012,warp=1+.17*Math.sin(th*2+i*.09+t*.22)+.09*Math.sin(th*3-i*.05-t*.15)+.05*Math.cos(th*5+t*.1),r=i*step*warp,x=cx+Math.cos(th)*r*1.15,y=cy+Math.sin(th)*r*.78;a?c.lineTo(x,y):c.moveTo(x,y);}c.closePath();c.lineWidth=.7;const fade=.34-i/54*.26;c.strokeStyle=i%9===0?`rgba(94,230,160,${fade+.1})`:`rgba(244,242,238,${fade})`;c.stroke();}
      c.beginPath();c.ellipse(cx,cy,14,9,t*.25,0,7);c.strokeStyle='rgba(94,230,160,.75)';c.lineWidth=1.1;c.stroke();
    }
    function paint(mode,c,w,h,t){if(mode==='sphere')drawSphere(c,w,h,t);else if(mode==='contour')drawContour(c,w,h,t);else drawPlanes(c,w,h,t);}
    function draw(t) {
      const dt=Math.max(0,Math.min(.05,t-state.last));state.last=t;const modes=['planes','sphere','contour'],phase=t%9,inTear=phase>=6.4&&phase<7.4;
      if(state.auto){state.tear=inTear?(phase-6.4):0;if(!inTear&&phase>=7.4&&!state.next&&state.armed){state.armed=false;state.next=modes[(modes.indexOf(state.cur)+1)%3];state.mix=0;}if(phase<6.4)state.armed=true;}
      if(state.next){state.mix+=dt/1.25;if(state.mix>=1){state.cur=state.next;state.next=null;state.mix=0;buttons.forEach(b=>b.classList.toggle('active',b.dataset.heroMode===state.cur));}}
      const tear=state.tear?Math.sin(Math.min(1,state.tear)*Math.PI)*.9+.1:(state.next?(1-Math.min(1,state.mix))*.3:0),smooth=u=>u*u*(3-2*u),k=state.next?smooth(Math.min(1,state.mix)):0,bell=state.next?Math.sin(Math.min(1,state.mix)*Math.PI):0;state.spin+=dt*bell*2.4;
      if(!buffer)buffer=document.createElement('canvas');if(buffer.width!==Math.round(width)||buffer.height!==Math.round(height)){buffer.width=Math.round(width);buffer.height=Math.round(height);}const b=buffer.getContext('2d');b.clearRect(0,0,width,height);
      const layer=(mode,alpha,scale)=>{b.save();b.globalAlpha=alpha;b.translate(width*.5,height*.5);b.scale(scale,scale);b.translate(-width*.5,-height*.5);paint(mode,b,width,height,t);b.restore();};
      layer(state.cur,1-k,1+k*.16);if(state.next)layer(state.next,k,.86+k*.14);
      ctx.clearRect(0,0,width,height);if(tear<.02){ctx.drawImage(buffer,0,0,width,height);return;}
      const tick=Math.floor(t/.055),rnd=n=>{const x=Math.sin(tick*12.9898+n*78.233)*43758.5453;return x-Math.floor(x);},bh=height/16;
      for(let i=0;i<16;i++){const r=rnd(i),dx=(r-.5)*90*tear*(r>.62?1.8:.5);if(r>.94&&tear>.5)continue;ctx.drawImage(buffer,0,i*bh,width,bh,dx,i*bh+(rnd(i+50)-.5)*4*tear,width,bh);if(r>.78){ctx.globalAlpha=.4*tear;ctx.globalCompositeOperation='screen';ctx.drawImage(buffer,0,i*bh,width,bh,dx+7*tear,i*bh,width,bh);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;}}
      ctx.globalAlpha=.08*tear;ctx.fillStyle='#5ee6a0';ctx.fillRect(0,(rnd(99)*height)|0,width,2+3*tear);ctx.globalAlpha=1;
    }
    function loop(now){draw((now-start)/1000);if(visible)raf=requestAnimationFrame(loop);}
    buttons.forEach((button)=>button.addEventListener('click',()=>{const mode=button.dataset.heroMode;state.auto=false;state.tear=0;state.armed=false;if(mode!==state.cur){state.next=mode;state.mix=0;}else state.next=null;buttons.forEach(b=>b.classList.toggle('active',b===button));}));
    host.addEventListener('pointermove',(event)=>{const r=host.getBoundingClientRect();pointer.x=(event.clientX-r.left)/r.width;pointer.y=(event.clientY-r.top)/r.height;});
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    fit();draw(0);if(!reduced)raf=requestAnimationFrame(loop);
    new ResizeObserver(()=>{fit();if(reduced)draw(0);}).observe(canvas);
    document.addEventListener('visibilitychange',()=>{visible=!document.hidden;if(visible&&!reduced){start=performance.now();state.last=0;raf=requestAnimationFrame(loop);}else cancelAnimationFrame(raf);});
  });
})();

// Prototype canvas ports: Kompute's 27-cubie cube plus XAI and ecosystem previews.
(function () {
  function engine(canvas, draw) {
    const ctx = canvas.getContext('2d');
    let width=0,height=0,raf=0,start=performance.now(),active=true;
    const pointer={x:.5,y:.5};
    function fit(){const r=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,1.5);width=r.width;height=r.height;canvas.width=Math.max(1,Math.round(width*dpr));canvas.height=Math.max(1,Math.round(height*dpr));ctx.setTransform(dpr,0,0,dpr,0,0);}
    function frame(now){draw(ctx,width,height,(now-start)/1000,pointer);if(active&&!matchMedia('(prefers-reduced-motion: reduce)').matches)raf=requestAnimationFrame(frame);}
    canvas.addEventListener('pointermove',(e)=>{const r=canvas.getBoundingClientRect();pointer.x=(e.clientX-r.left)/r.width;pointer.y=(e.clientY-r.top)/r.height;});
    fit();draw(ctx,width,height,0,pointer);
    new ResizeObserver(()=>{fit();draw(ctx,width,height,0,pointer);}).observe(canvas);
    new IntersectionObserver(([entry])=>{const next=entry.isIntersecting;if(next&&!active){active=true;start=performance.now();raf=requestAnimationFrame(frame);}active=next;if(!active)cancelAnimationFrame(raf);}).observe(canvas);
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches)raf=requestAnimationFrame(frame);
  }

  function cubeDrawer() {
    let cubies=[],move=null,phase='scramble',pause=0,moves=[],scramble=[],last;
    for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++)for(let z=-1;z<=1;z++)cubies.push({p:[x,y,z],home:[x,y,z],m:[[1,0,0],[0,1,0],[0,0,1]]});
    function queue(){const seq=[];let prior=-1;for(let i=0;i<14;i++){let axis;do{axis=Math.floor(Math.random()*3);}while(axis===prior);prior=axis;seq.push({axis,layer:Math.random()<.5?-1:1,dir:Math.random()<.5?1:-1});}scramble=seq;moves=seq.slice();phase='scramble';}
    function rot([x,y,z],axis,dir){if(axis===0)return[x,-dir*z,dir*y];if(axis===1)return[dir*z,y,-dir*x];return[-dir*y,dir*x,z];}
    function step(dt){if(!moves.length&&!move&&phase==='scramble'&&!scramble.length)queue();if(!move){if(pause>0){pause-=dt;return;}if(!moves.length){if(phase==='scramble'){moves=scramble.slice().reverse().map(m=>({...m,dir:-m.dir}));phase='solve';pause=.5;}else{queue();pause=1.1;}return;}move={...moves.shift(),t:0};}move.t+=dt/.42;if(move.t>=1){const{axis,layer,dir}=move;cubies.forEach(c=>{if(c.p[axis]!==layer)return;c.p=rot(c.p,axis,dir).map(Math.round);c.m=c.m.map(col=>rot(col,axis,dir));});move=null;pause=.06;}}
    queue();
    return function draw(ctx,w,h,t,pointer){
      const dt=Math.max(0,Math.min(.05,last == null ? 0.016 : t-last));last=t;step(dt);ctx.clearRect(0,0,w,h);
      const yaw=t*.18+(pointer.x-.5)*1.3,pitch=-.46+(pointer.y-.5)*.5,S=Math.min(w,h)*.23,cx=w/2,cy=h/2;
      const ease=u=>u<.5?4*u*u*u:1-Math.pow(-2*u+2,3)/2;
      const spin=(v,axis,ang)=>{const c=Math.cos(ang),s=Math.sin(ang),[x,y,z]=v;if(axis===0)return[x,y*c-z*s,y*s+z*c];if(axis===1)return[x*c+z*s,y,-x*s+z*c];return[x*c-y*s,x*s+y*c,z];};
      const world=v=>{const yc=Math.cos(yaw),ys=Math.sin(yaw),pc=Math.cos(pitch),ps=Math.sin(pitch),x1=v[0]*yc-v[2]*ys,z1=v[0]*ys+v[2]*yc,y1=v[1]*pc-z1*ps,z2=v[1]*ps+z1*pc;return[x1,y1,z2];};
      const proj=p=>{const k=8/(8-p[2]);return[cx+p[0]*S*k,cy+p[1]*S*k,p[2]];};
      const tones=['#efece6','#a8ada3','#5ee6a0','#3f9c74','#cfd2c9','#7d847c'],axes=[[1,0,0],[0,1,0],[0,0,1]],quads=[],half=.46;
      cubies.forEach(c=>{const moving=move&&c.p[move.axis]===move.layer,ang=moving?move.dir*Math.PI/2*ease(Math.min(move.t,1)):0,centreZ=world(moving?spin(c.p,move.axis,ang):c.p)[2];
        for(let f=0;f<6;f++){const axis=f>>1,sign=f%2?-1:1,nLocal=axes[axis].map(v=>v*sign),toWorld=vl=>[0,1,2].map(i=>c.m[0][i]*vl[0]+c.m[1][i]*vl[1]+c.m[2][i]*vl[2]),n=toWorld(nLocal),u=toWorld(axes[(axis+1)%3]),v=toWorld(axes[(axis+2)%3]),quadAt=k=>[[-1,-1],[1,-1],[1,1],[-1,1]].map(([a,b])=>[0,1,2].map(i=>c.p[i]+n[i]*half+(u[i]*a+v[i]*b)*half*k)),screen=cs=>cs.map(p=>proj(world(moving?spin(p,move.axis,ang):p))),pts3=quadAt(1).map(p=>world(moving?spin(p,move.axis,ang):p)),nw=world(moving?spin(n,move.axis,ang):n);if(nw[2]<.03)continue;let tone=null;for(let i=0;i<3;i++)if(Math.abs(nLocal[i])===1&&Math.abs(c.home[i])===1&&Math.sign(nLocal[i])===Math.sign(c.home[i]))tone=tones[i*2+(nLocal[i]>0?0:1)];quads.push({pts:pts3.map(proj),sticker:screen(quadAt(.82)),depth:centreZ*4+pts3.reduce((s,p)=>s+p[2],0)/4,tone,shade:.68+.32*Math.max(0,nw[2])-.12*nw[1]});}
      });
      const path=pts=>{ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();};
      quads.sort((a,b)=>a.depth-b.depth).forEach(q=>{const body=Math.round(10+12*q.shade);path(q.pts);ctx.fillStyle=`rgb(${body},${body+1},${body})`;ctx.fill();ctx.strokeStyle='rgba(0,0,0,.7)';ctx.stroke();if(!q.tone)return;const rgb=[1,3,5].map(i=>parseInt(q.tone.slice(i,i+2),16)).map(v=>Math.max(0,Math.min(255,Math.round(v*q.shade))));path(q.sticker);ctx.fillStyle=`rgb(${rgb.join(',')})`;ctx.fill();});
    };
  }
  function drawXai(ctx,w,h,t){ctx.clearRect(0,0,w,h);const labels=['Data analysis','Model evaluation','Production monitoring'],notes=['DISTRIBUTIONS · PROXIES','ATTRIBUTION · SUBGROUPS','DRIFT · OUTLIERS'];ctx.font="12px 'Geist',sans-serif";labels.forEach((label,i)=>{const y=28+i*54;ctx.fillStyle='rgba(244,242,238,.88)';ctx.fillText(label,16,y);ctx.textAlign='right';ctx.font="8px 'Geist Mono',monospace";ctx.fillStyle='rgba(244,242,238,.42)';ctx.fillText(notes[i],w-16,y);ctx.textAlign='left';ctx.fillStyle='rgba(255,255,255,.07)';ctx.fillRect(16,y+12,w-32,8);const sw=(w-32)*.32,x=16-sw+((t*.42+i*.28)%1)*(w-32+sw),g=ctx.createLinearGradient(x,0,x+sw,0);g.addColorStop(0,'rgba(94,230,160,0)');g.addColorStop(.5,'#5ee6a0');g.addColorStop(1,'rgba(94,230,160,0)');ctx.fillStyle=g;ctx.fillRect(Math.max(16,x),y+12,Math.min(w-16,x+sw)-Math.max(16,x),8);ctx.font="12px 'Geist',sans-serif";});}
  function drawEco(ctx,w,h,t){ctx.clearRect(0,0,w,h);const rows=[['Serving & inference',48],['Orchestration & pipelines',37],['Monitoring & observability',31],['Feature & vector stores',24],['Explainability & fairness',22],['ML security',17],['GPU & acceleration',15]];ctx.font="10px 'Geist',sans-serif";rows.forEach(([label,n],i)=>{const y=20+i*24,grow=Math.min(1,Math.max(0,t*.8-i*.08));ctx.fillStyle='rgba(244,242,238,.68)';ctx.fillText(label,10,y);ctx.fillStyle='rgba(255,255,255,.07)';ctx.fillRect(w*.55,y-8,w*.35,7);ctx.fillStyle='rgba(94,230,160,.6)';ctx.fillRect(w*.55,y-8,w*.35*(n/48)*grow,7);ctx.textAlign='right';ctx.fillStyle='rgba(244,242,238,.45)';ctx.fillText(String(Math.round(n*grow)),w-8,y);ctx.textAlign='left';});}
  function drawKaosPreview(ctx,w,h,t){ctx.clearRect(0,0,w,h);const nodes=[[.5,.13],[.18,.4],[.5,.42],[.82,.4],[.5,.68],[.25,.87],[.75,.87]],edges=[[0,1],[0,2],[0,3],[1,4],[2,4],[3,4],[4,5],[4,6],[5,0]],pad=34,points=nodes.map(([x,y])=>[pad+x*(w-pad*2),pad+y*(h-pad*2)]);edges.forEach(([a,b],i)=>{const A=points[a],B=points[b];ctx.strokeStyle='rgba(244,242,238,.16)';ctx.beginPath();ctx.moveTo(...A);ctx.lineTo(...B);ctx.stroke();for(let k=0;k<2;k++){const u=(t*.34+i*.17+k*.5)%1;ctx.fillStyle=`rgba(94,230,160,${.25+Math.sin(u*Math.PI)*.6})`;ctx.beginPath();ctx.arc(A[0]+(B[0]-A[0])*u,A[1]+(B[1]-A[1])*u,2,0,7);ctx.fill();}});points.forEach((p,i)=>{ctx.fillStyle='#0f100f';ctx.strokeStyle=i===4?'#e8b45c':'rgba(94,230,160,.65)';ctx.beginPath();ctx.arc(p[0],p[1],i===0||i===4?14:11,0,7);ctx.fill();ctx.stroke();});}
  document.querySelectorAll('[data-widget="kompute-cube"]').forEach(c=>engine(c,cubeDrawer()));
  document.querySelectorAll('[data-widget="xai-preview"]').forEach(c=>engine(c,drawXai));
  document.querySelectorAll('[data-widget="eco-preview"]').forEach(c=>engine(c,drawEco));
  document.querySelectorAll('[data-widget="nav-preview"]').forEach((canvas)=>{
    const cube=cubeDrawer();
    engine(canvas,(ctx,w,h,t,pointer)=>{
      const mode=canvas.dataset.previewMode;
      ctx.clearRect(0,0,w,h);
      if(mode==='kompute')cube(ctx,w,h,t,pointer);
      else if(mode==='xai')drawXai(ctx,w,h*.72,t,pointer);
      else if(mode==='list')drawEco(ctx,w,h*.72,t,pointer);
      else drawKaosPreview(ctx,w,h,t);
    });
  });
})();
