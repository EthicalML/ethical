(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();function $d(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var Es={},mo,$l;function Kd(){return $l||($l=1,mo=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),mo}var go={},Fi={},Kl;function ms(){if(Kl)return Fi;Kl=1;let i;const e=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return Fi.getSymbolSize=function(n){if(!n)throw new Error('"version" cannot be null or undefined');if(n<1||n>40)throw new Error('"version" should be in range from 1 to 40');return n*4+17},Fi.getSymbolTotalCodewords=function(n){return e[n]},Fi.getBCHDigit=function(t){let n=0;for(;t!==0;)n++,t>>>=1;return n},Fi.setToSJISFunction=function(n){if(typeof n!="function")throw new Error('"toSJISFunc" is not a valid function.');i=n},Fi.isKanjiModeEnabled=function(){return typeof i<"u"},Fi.toSJIS=function(n){return i(n)},Fi}var vo={},Zl;function xl(){return Zl||(Zl=1,(function(i){i.L={bit:1},i.M={bit:0},i.Q={bit:3},i.H={bit:2};function e(t){if(typeof t!="string")throw new Error("Param is not a string");switch(t.toLowerCase()){case"l":case"low":return i.L;case"m":case"medium":return i.M;case"q":case"quartile":return i.Q;case"h":case"high":return i.H;default:throw new Error("Unknown EC Level: "+t)}}i.isValid=function(n){return n&&typeof n.bit<"u"&&n.bit>=0&&n.bit<4},i.from=function(n,s){if(i.isValid(n))return n;try{return e(n)}catch{return s}}})(vo)),vo}var xo,Jl;function Zd(){if(Jl)return xo;Jl=1;function i(){this.buffer=[],this.length=0}return i.prototype={get:function(e){const t=Math.floor(e/8);return(this.buffer[t]>>>7-e%8&1)===1},put:function(e,t){for(let n=0;n<t;n++)this.putBit((e>>>t-n-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(e){const t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}},xo=i,xo}var _o,Ql;function Jd(){if(Ql)return _o;Ql=1;function i(e){if(!e||e<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}return i.prototype.set=function(e,t,n,s){const r=e*this.size+t;this.data[r]=n,s&&(this.reservedBit[r]=!0)},i.prototype.get=function(e,t){return this.data[e*this.size+t]},i.prototype.xor=function(e,t,n){this.data[e*this.size+t]^=n},i.prototype.isReserved=function(e,t){return this.reservedBit[e*this.size+t]},_o=i,_o}var yo={},jl;function Qd(){return jl||(jl=1,(function(i){const e=ms().getSymbolSize;i.getRowColCoords=function(n){if(n===1)return[];const s=Math.floor(n/7)+2,r=e(n),a=r===145?26:Math.ceil((r-13)/(2*s-2))*2,o=[r-7];for(let c=1;c<s-1;c++)o[c]=o[c-1]-a;return o.push(6),o.reverse()},i.getPositions=function(n){const s=[],r=i.getRowColCoords(n),a=r.length;for(let o=0;o<a;o++)for(let c=0;c<a;c++)o===0&&c===0||o===0&&c===a-1||o===a-1&&c===0||s.push([r[o],r[c]]);return s}})(yo)),yo}var Mo={},eu;function jd(){if(eu)return Mo;eu=1;const i=ms().getSymbolSize,e=7;return Mo.getPositions=function(n){const s=i(n);return[[0,0],[s-e,0],[0,s-e]]},Mo}var So={},tu;function ef(){return tu||(tu=1,(function(i){i.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const e={N1:3,N2:3,N3:40,N4:10};i.isValid=function(s){return s!=null&&s!==""&&!isNaN(s)&&s>=0&&s<=7},i.from=function(s){return i.isValid(s)?parseInt(s,10):void 0},i.getPenaltyN1=function(s){const r=s.size;let a=0,o=0,c=0,l=null,u=null;for(let p=0;p<r;p++){o=c=0,l=u=null;for(let d=0;d<r;d++){let h=s.get(p,d);h===l?o++:(o>=5&&(a+=e.N1+(o-5)),l=h,o=1),h=s.get(d,p),h===u?c++:(c>=5&&(a+=e.N1+(c-5)),u=h,c=1)}o>=5&&(a+=e.N1+(o-5)),c>=5&&(a+=e.N1+(c-5))}return a},i.getPenaltyN2=function(s){const r=s.size;let a=0;for(let o=0;o<r-1;o++)for(let c=0;c<r-1;c++){const l=s.get(o,c)+s.get(o,c+1)+s.get(o+1,c)+s.get(o+1,c+1);(l===4||l===0)&&a++}return a*e.N2},i.getPenaltyN3=function(s){const r=s.size;let a=0,o=0,c=0;for(let l=0;l<r;l++){o=c=0;for(let u=0;u<r;u++)o=o<<1&2047|s.get(l,u),u>=10&&(o===1488||o===93)&&a++,c=c<<1&2047|s.get(u,l),u>=10&&(c===1488||c===93)&&a++}return a*e.N3},i.getPenaltyN4=function(s){let r=0;const a=s.data.length;for(let c=0;c<a;c++)r+=s.data[c];return Math.abs(Math.ceil(r*100/a/5)-10)*e.N4};function t(n,s,r){switch(n){case i.Patterns.PATTERN000:return(s+r)%2===0;case i.Patterns.PATTERN001:return s%2===0;case i.Patterns.PATTERN010:return r%3===0;case i.Patterns.PATTERN011:return(s+r)%3===0;case i.Patterns.PATTERN100:return(Math.floor(s/2)+Math.floor(r/3))%2===0;case i.Patterns.PATTERN101:return s*r%2+s*r%3===0;case i.Patterns.PATTERN110:return(s*r%2+s*r%3)%2===0;case i.Patterns.PATTERN111:return(s*r%3+(s+r)%2)%2===0;default:throw new Error("bad maskPattern:"+n)}}i.applyMask=function(s,r){const a=r.size;for(let o=0;o<a;o++)for(let c=0;c<a;c++)r.isReserved(c,o)||r.xor(c,o,t(s,c,o))},i.getBestMask=function(s,r){const a=Object.keys(i.Patterns).length;let o=0,c=1/0;for(let l=0;l<a;l++){r(l),i.applyMask(l,s);const u=i.getPenaltyN1(s)+i.getPenaltyN2(s)+i.getPenaltyN3(s)+i.getPenaltyN4(s);i.applyMask(l,s),u<c&&(c=u,o=l)}return o}})(So)),So}var Kr={},nu;function $h(){if(nu)return Kr;nu=1;const i=xl(),e=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],t=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Kr.getBlocksCount=function(s,r){switch(r){case i.L:return e[(s-1)*4+0];case i.M:return e[(s-1)*4+1];case i.Q:return e[(s-1)*4+2];case i.H:return e[(s-1)*4+3];default:return}},Kr.getTotalCodewordsCount=function(s,r){switch(r){case i.L:return t[(s-1)*4+0];case i.M:return t[(s-1)*4+1];case i.Q:return t[(s-1)*4+2];case i.H:return t[(s-1)*4+3];default:return}},Kr}var bo={},dr={},iu;function tf(){if(iu)return dr;iu=1;const i=new Uint8Array(512),e=new Uint8Array(256);return(function(){let n=1;for(let s=0;s<255;s++)i[s]=n,e[n]=s,n<<=1,n&256&&(n^=285);for(let s=255;s<512;s++)i[s]=i[s-255]})(),dr.log=function(n){if(n<1)throw new Error("log("+n+")");return e[n]},dr.exp=function(n){return i[n]},dr.mul=function(n,s){return n===0||s===0?0:i[e[n]+e[s]]},dr}var su;function nf(){return su||(su=1,(function(i){const e=tf();i.mul=function(n,s){const r=new Uint8Array(n.length+s.length-1);for(let a=0;a<n.length;a++)for(let o=0;o<s.length;o++)r[a+o]^=e.mul(n[a],s[o]);return r},i.mod=function(n,s){let r=new Uint8Array(n);for(;r.length-s.length>=0;){const a=r[0];for(let c=0;c<s.length;c++)r[c]^=e.mul(s[c],a);let o=0;for(;o<r.length&&r[o]===0;)o++;r=r.slice(o)}return r},i.generateECPolynomial=function(n){let s=new Uint8Array([1]);for(let r=0;r<n;r++)s=i.mul(s,new Uint8Array([1,e.exp(r)]));return s}})(bo)),bo}var Eo,ru;function sf(){if(ru)return Eo;ru=1;const i=nf();function e(t){this.genPoly=void 0,this.degree=t,this.degree&&this.initialize(this.degree)}return e.prototype.initialize=function(n){this.degree=n,this.genPoly=i.generateECPolynomial(this.degree)},e.prototype.encode=function(n){if(!this.genPoly)throw new Error("Encoder not initialized");const s=new Uint8Array(n.length+this.degree);s.set(n);const r=i.mod(s,this.genPoly),a=this.degree-r.length;if(a>0){const o=new Uint8Array(this.degree);return o.set(r,a),o}return r},Eo=e,Eo}var wo={},To={},Ao={},au;function Kh(){return au||(au=1,Ao.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}),Ao}var ni={},ou;function Zh(){if(ou)return ni;ou=1;const i="[0-9]+",e="[A-Z $%*+\\-./:]+";let t="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";t=t.replace(/u/g,"\\u");const n="(?:(?![A-Z0-9 $%*+\\-./:]|"+t+`)(?:.|[\r
]))+`;ni.KANJI=new RegExp(t,"g"),ni.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),ni.BYTE=new RegExp(n,"g"),ni.NUMERIC=new RegExp(i,"g"),ni.ALPHANUMERIC=new RegExp(e,"g");const s=new RegExp("^"+t+"$"),r=new RegExp("^"+i+"$"),a=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return ni.testKanji=function(c){return s.test(c)},ni.testNumeric=function(c){return r.test(c)},ni.testAlphanumeric=function(c){return a.test(c)},ni}var cu;function gs(){return cu||(cu=1,(function(i){const e=Kh(),t=Zh();i.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},i.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},i.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},i.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},i.MIXED={bit:-1},i.getCharCountIndicator=function(r,a){if(!r.ccBits)throw new Error("Invalid mode: "+r);if(!e.isValid(a))throw new Error("Invalid version: "+a);return a>=1&&a<10?r.ccBits[0]:a<27?r.ccBits[1]:r.ccBits[2]},i.getBestModeForData=function(r){return t.testNumeric(r)?i.NUMERIC:t.testAlphanumeric(r)?i.ALPHANUMERIC:t.testKanji(r)?i.KANJI:i.BYTE},i.toString=function(r){if(r&&r.id)return r.id;throw new Error("Invalid mode")},i.isValid=function(r){return r&&r.bit&&r.ccBits};function n(s){if(typeof s!="string")throw new Error("Param is not a string");switch(s.toLowerCase()){case"numeric":return i.NUMERIC;case"alphanumeric":return i.ALPHANUMERIC;case"kanji":return i.KANJI;case"byte":return i.BYTE;default:throw new Error("Unknown mode: "+s)}}i.from=function(r,a){if(i.isValid(r))return r;try{return n(r)}catch{return a}}})(To)),To}var lu;function rf(){return lu||(lu=1,(function(i){const e=ms(),t=$h(),n=xl(),s=gs(),r=Kh(),a=7973,o=e.getBCHDigit(a);function c(d,h,m){for(let _=1;_<=40;_++)if(h<=i.getCapacity(_,m,d))return _}function l(d,h){return s.getCharCountIndicator(d,h)+4}function u(d,h){let m=0;return d.forEach(function(_){const g=l(_.mode,h);m+=g+_.getBitsLength()}),m}function p(d,h){for(let m=1;m<=40;m++)if(u(d,m)<=i.getCapacity(m,h,s.MIXED))return m}i.from=function(h,m){return r.isValid(h)?parseInt(h,10):m},i.getCapacity=function(h,m,_){if(!r.isValid(h))throw new Error("Invalid QR Code version");typeof _>"u"&&(_=s.BYTE);const g=e.getSymbolTotalCodewords(h),f=t.getTotalCodewordsCount(h,m),M=(g-f)*8;if(_===s.MIXED)return M;const b=M-l(_,h);switch(_){case s.NUMERIC:return Math.floor(b/10*3);case s.ALPHANUMERIC:return Math.floor(b/11*2);case s.KANJI:return Math.floor(b/13);case s.BYTE:default:return Math.floor(b/8)}},i.getBestVersionForData=function(h,m){let _;const g=n.from(m,n.M);if(Array.isArray(h)){if(h.length>1)return p(h,g);if(h.length===0)return 1;_=h[0]}else _=h;return c(_.mode,_.getLength(),g)},i.getEncodedBits=function(h){if(!r.isValid(h)||h<7)throw new Error("Invalid QR Code version");let m=h<<12;for(;e.getBCHDigit(m)-o>=0;)m^=a<<e.getBCHDigit(m)-o;return h<<12|m}})(wo)),wo}var Ro={},uu;function af(){if(uu)return Ro;uu=1;const i=ms(),e=1335,t=21522,n=i.getBCHDigit(e);return Ro.getEncodedBits=function(r,a){const o=r.bit<<3|a;let c=o<<10;for(;i.getBCHDigit(c)-n>=0;)c^=e<<i.getBCHDigit(c)-n;return(o<<10|c)^t},Ro}var Co={},Po,hu;function of(){if(hu)return Po;hu=1;const i=gs();function e(t){this.mode=i.NUMERIC,this.data=t.toString()}return e.getBitsLength=function(n){return 10*Math.floor(n/3)+(n%3?n%3*3+1:0)},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(n){let s,r,a;for(s=0;s+3<=this.data.length;s+=3)r=this.data.substr(s,3),a=parseInt(r,10),n.put(a,10);const o=this.data.length-s;o>0&&(r=this.data.substr(s),a=parseInt(r,10),n.put(a,o*3+1))},Po=e,Po}var Io,du;function cf(){if(du)return Io;du=1;const i=gs(),e=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function t(n){this.mode=i.ALPHANUMERIC,this.data=n}return t.getBitsLength=function(s){return 11*Math.floor(s/2)+6*(s%2)},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(s){let r;for(r=0;r+2<=this.data.length;r+=2){let a=e.indexOf(this.data[r])*45;a+=e.indexOf(this.data[r+1]),s.put(a,11)}this.data.length%2&&s.put(e.indexOf(this.data[r]),6)},Io=t,Io}var Lo,fu;function lf(){if(fu)return Lo;fu=1;const i=gs();function e(t){this.mode=i.BYTE,typeof t=="string"?this.data=new TextEncoder().encode(t):this.data=new Uint8Array(t)}return e.getBitsLength=function(n){return n*8},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(t){for(let n=0,s=this.data.length;n<s;n++)t.put(this.data[n],8)},Lo=e,Lo}var No,pu;function uf(){if(pu)return No;pu=1;const i=gs(),e=ms();function t(n){this.mode=i.KANJI,this.data=n}return t.getBitsLength=function(s){return s*13},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(n){let s;for(s=0;s<this.data.length;s++){let r=e.toSJIS(this.data[s]);if(r>=33088&&r<=40956)r-=33088;else if(r>=57408&&r<=60351)r-=49472;else throw new Error("Invalid SJIS character: "+this.data[s]+`
Make sure your charset is UTF-8`);r=(r>>>8&255)*192+(r&255),n.put(r,13)}},No=t,No}var Do={exports:{}},mu;function hf(){return mu||(mu=1,(function(i){var e={single_source_shortest_paths:function(t,n,s){var r={},a={};a[n]=0;var o=e.PriorityQueue.make();o.push(n,0);for(var c,l,u,p,d,h,m,_,g;!o.empty();){c=o.pop(),l=c.value,p=c.cost,d=t[l]||{};for(u in d)d.hasOwnProperty(u)&&(h=d[u],m=p+h,_=a[u],g=typeof a[u]>"u",(g||_>m)&&(a[u]=m,o.push(u,m),r[u]=l))}if(typeof s<"u"&&typeof a[s]>"u"){var f=["Could not find a path from ",n," to ",s,"."].join("");throw new Error(f)}return r},extract_shortest_path_from_predecessor_list:function(t,n){for(var s=[],r=n;r;)s.push(r),t[r],r=t[r];return s.reverse(),s},find_path:function(t,n,s){var r=e.single_source_shortest_paths(t,n,s);return e.extract_shortest_path_from_predecessor_list(r,s)},PriorityQueue:{make:function(t){var n=e.PriorityQueue,s={},r;t=t||{};for(r in n)n.hasOwnProperty(r)&&(s[r]=n[r]);return s.queue=[],s.sorter=t.sorter||n.default_sorter,s},default_sorter:function(t,n){return t.cost-n.cost},push:function(t,n){var s={value:t,cost:n};this.queue.push(s),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};i.exports=e})(Do)),Do.exports}var gu;function df(){return gu||(gu=1,(function(i){const e=gs(),t=of(),n=cf(),s=lf(),r=uf(),a=Zh(),o=ms(),c=hf();function l(f){return unescape(encodeURIComponent(f)).length}function u(f,M,b){const x=[];let w;for(;(w=f.exec(b))!==null;)x.push({data:w[0],index:w.index,mode:M,length:w[0].length});return x}function p(f){const M=u(a.NUMERIC,e.NUMERIC,f),b=u(a.ALPHANUMERIC,e.ALPHANUMERIC,f);let x,w;return o.isKanjiModeEnabled()?(x=u(a.BYTE,e.BYTE,f),w=u(a.KANJI,e.KANJI,f)):(x=u(a.BYTE_KANJI,e.BYTE,f),w=[]),M.concat(b,x,w).sort(function(E,v){return E.index-v.index}).map(function(E){return{data:E.data,mode:E.mode,length:E.length}})}function d(f,M){switch(M){case e.NUMERIC:return t.getBitsLength(f);case e.ALPHANUMERIC:return n.getBitsLength(f);case e.KANJI:return r.getBitsLength(f);case e.BYTE:return s.getBitsLength(f)}}function h(f){return f.reduce(function(M,b){const x=M.length-1>=0?M[M.length-1]:null;return x&&x.mode===b.mode?(M[M.length-1].data+=b.data,M):(M.push(b),M)},[])}function m(f){const M=[];for(let b=0;b<f.length;b++){const x=f[b];switch(x.mode){case e.NUMERIC:M.push([x,{data:x.data,mode:e.ALPHANUMERIC,length:x.length},{data:x.data,mode:e.BYTE,length:x.length}]);break;case e.ALPHANUMERIC:M.push([x,{data:x.data,mode:e.BYTE,length:x.length}]);break;case e.KANJI:M.push([x,{data:x.data,mode:e.BYTE,length:l(x.data)}]);break;case e.BYTE:M.push([{data:x.data,mode:e.BYTE,length:l(x.data)}])}}return M}function _(f,M){const b={},x={start:{}};let w=["start"];for(let S=0;S<f.length;S++){const E=f[S],v=[];for(let T=0;T<E.length;T++){const R=E[T],C=""+S+T;v.push(C),b[C]={node:R,lastCount:0},x[C]={};for(let I=0;I<w.length;I++){const B=w[I];b[B]&&b[B].node.mode===R.mode?(x[B][C]=d(b[B].lastCount+R.length,R.mode)-d(b[B].lastCount,R.mode),b[B].lastCount+=R.length):(b[B]&&(b[B].lastCount=R.length),x[B][C]=d(R.length,R.mode)+4+e.getCharCountIndicator(R.mode,M))}}w=v}for(let S=0;S<w.length;S++)x[w[S]].end=0;return{map:x,table:b}}function g(f,M){let b;const x=e.getBestModeForData(f);if(b=e.from(M,x),b!==e.BYTE&&b.bit<x.bit)throw new Error('"'+f+'" cannot be encoded with mode '+e.toString(b)+`.
 Suggested mode is: `+e.toString(x));switch(b===e.KANJI&&!o.isKanjiModeEnabled()&&(b=e.BYTE),b){case e.NUMERIC:return new t(f);case e.ALPHANUMERIC:return new n(f);case e.KANJI:return new r(f);case e.BYTE:return new s(f)}}i.fromArray=function(M){return M.reduce(function(b,x){return typeof x=="string"?b.push(g(x,null)):x.data&&b.push(g(x.data,x.mode)),b},[])},i.fromString=function(M,b){const x=p(M,o.isKanjiModeEnabled()),w=m(x),S=_(w,b),E=c.find_path(S.map,"start","end"),v=[];for(let T=1;T<E.length-1;T++)v.push(S.table[E[T]].node);return i.fromArray(h(v))},i.rawSplit=function(M){return i.fromArray(p(M,o.isKanjiModeEnabled()))}})(Co)),Co}var vu;function ff(){if(vu)return go;vu=1;const i=ms(),e=xl(),t=Zd(),n=Jd(),s=Qd(),r=jd(),a=ef(),o=$h(),c=sf(),l=rf(),u=af(),p=gs(),d=df();function h(S,E){const v=S.size,T=r.getPositions(E);for(let R=0;R<T.length;R++){const C=T[R][0],I=T[R][1];for(let B=-1;B<=7;B++)if(!(C+B<=-1||v<=C+B))for(let X=-1;X<=7;X++)I+X<=-1||v<=I+X||(B>=0&&B<=6&&(X===0||X===6)||X>=0&&X<=6&&(B===0||B===6)||B>=2&&B<=4&&X>=2&&X<=4?S.set(C+B,I+X,!0,!0):S.set(C+B,I+X,!1,!0))}}function m(S){const E=S.size;for(let v=8;v<E-8;v++){const T=v%2===0;S.set(v,6,T,!0),S.set(6,v,T,!0)}}function _(S,E){const v=s.getPositions(E);for(let T=0;T<v.length;T++){const R=v[T][0],C=v[T][1];for(let I=-2;I<=2;I++)for(let B=-2;B<=2;B++)I===-2||I===2||B===-2||B===2||I===0&&B===0?S.set(R+I,C+B,!0,!0):S.set(R+I,C+B,!1,!0)}}function g(S,E){const v=S.size,T=l.getEncodedBits(E);let R,C,I;for(let B=0;B<18;B++)R=Math.floor(B/3),C=B%3+v-8-3,I=(T>>B&1)===1,S.set(R,C,I,!0),S.set(C,R,I,!0)}function f(S,E,v){const T=S.size,R=u.getEncodedBits(E,v);let C,I;for(C=0;C<15;C++)I=(R>>C&1)===1,C<6?S.set(C,8,I,!0):C<8?S.set(C+1,8,I,!0):S.set(T-15+C,8,I,!0),C<8?S.set(8,T-C-1,I,!0):C<9?S.set(8,15-C-1+1,I,!0):S.set(8,15-C-1,I,!0);S.set(T-8,8,1,!0)}function M(S,E){const v=S.size;let T=-1,R=v-1,C=7,I=0;for(let B=v-1;B>0;B-=2)for(B===6&&B--;;){for(let X=0;X<2;X++)if(!S.isReserved(R,B-X)){let H=!1;I<E.length&&(H=(E[I]>>>C&1)===1),S.set(R,B-X,H),C--,C===-1&&(I++,C=7)}if(R+=T,R<0||v<=R){R-=T,T=-T;break}}}function b(S,E,v){const T=new t;v.forEach(function(X){T.put(X.mode.bit,4),T.put(X.getLength(),p.getCharCountIndicator(X.mode,S)),X.write(T)});const R=i.getSymbolTotalCodewords(S),C=o.getTotalCodewordsCount(S,E),I=(R-C)*8;for(T.getLengthInBits()+4<=I&&T.put(0,4);T.getLengthInBits()%8!==0;)T.putBit(0);const B=(I-T.getLengthInBits())/8;for(let X=0;X<B;X++)T.put(X%2?17:236,8);return x(T,S,E)}function x(S,E,v){const T=i.getSymbolTotalCodewords(E),R=o.getTotalCodewordsCount(E,v),C=T-R,I=o.getBlocksCount(E,v),B=T%I,X=I-B,H=Math.floor(T/I),J=Math.floor(C/I),z=J+1,L=H-J,V=new c(L);let K=0;const Z=new Array(I),N=new Array(I);let Q=0;const xe=new Uint8Array(S.buffer);for(let de=0;de<I;de++){const me=de<X?J:z;Z[de]=xe.slice(K,K+me),N[de]=V.encode(Z[de]),K+=me,Q=Math.max(Q,me)}const ce=new Uint8Array(T);let W=0,j,ne;for(j=0;j<Q;j++)for(ne=0;ne<I;ne++)j<Z[ne].length&&(ce[W++]=Z[ne][j]);for(j=0;j<L;j++)for(ne=0;ne<I;ne++)ce[W++]=N[ne][j];return ce}function w(S,E,v,T){let R;if(Array.isArray(S))R=d.fromArray(S);else if(typeof S=="string"){let H=E;if(!H){const J=d.rawSplit(S);H=l.getBestVersionForData(J,v)}R=d.fromString(S,H||40)}else throw new Error("Invalid data");const C=l.getBestVersionForData(R,v);if(!C)throw new Error("The amount of data is too big to be stored in a QR Code");if(!E)E=C;else if(E<C)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+C+`.
`);const I=b(E,v,R),B=i.getSymbolSize(E),X=new n(B);return h(X,E),m(X),_(X,E),f(X,v,0),E>=7&&g(X,E),M(X,I),isNaN(T)&&(T=a.getBestMask(X,f.bind(null,X,v))),a.applyMask(T,X),f(X,v,T),{modules:X,version:E,errorCorrectionLevel:v,maskPattern:T,segments:R}}return go.create=function(E,v){if(typeof E>"u"||E==="")throw new Error("No input text");let T=e.M,R,C;return typeof v<"u"&&(T=e.from(v.errorCorrectionLevel,e.M),R=l.from(v.version),C=a.from(v.maskPattern),v.toSJISFunc&&i.setToSJISFunction(v.toSJISFunc)),w(E,R,T,C)},go}var Uo={},Fo={},xu;function Jh(){return xu||(xu=1,(function(i){function e(t){if(typeof t=="number"&&(t=t.toString()),typeof t!="string")throw new Error("Color should be defined as hex string");let n=t.slice().replace("#","").split("");if(n.length<3||n.length===5||n.length>8)throw new Error("Invalid hex color: "+t);(n.length===3||n.length===4)&&(n=Array.prototype.concat.apply([],n.map(function(r){return[r,r]}))),n.length===6&&n.push("F","F");const s=parseInt(n.join(""),16);return{r:s>>24&255,g:s>>16&255,b:s>>8&255,a:s&255,hex:"#"+n.slice(0,6).join("")}}i.getOptions=function(n){n||(n={}),n.color||(n.color={});const s=typeof n.margin>"u"||n.margin===null||n.margin<0?4:n.margin,r=n.width&&n.width>=21?n.width:void 0,a=n.scale||4;return{width:r,scale:r?4:a,margin:s,color:{dark:e(n.color.dark||"#000000ff"),light:e(n.color.light||"#ffffffff")},type:n.type,rendererOpts:n.rendererOpts||{}}},i.getScale=function(n,s){return s.width&&s.width>=n+s.margin*2?s.width/(n+s.margin*2):s.scale},i.getImageWidth=function(n,s){const r=i.getScale(n,s);return Math.floor((n+s.margin*2)*r)},i.qrToImageData=function(n,s,r){const a=s.modules.size,o=s.modules.data,c=i.getScale(a,r),l=Math.floor((a+r.margin*2)*c),u=r.margin*c,p=[r.color.light,r.color.dark];for(let d=0;d<l;d++)for(let h=0;h<l;h++){let m=(d*l+h)*4,_=r.color.light;if(d>=u&&h>=u&&d<l-u&&h<l-u){const g=Math.floor((d-u)/c),f=Math.floor((h-u)/c);_=p[o[g*a+f]?1:0]}n[m++]=_.r,n[m++]=_.g,n[m++]=_.b,n[m]=_.a}}})(Fo)),Fo}var _u;function pf(){return _u||(_u=1,(function(i){const e=Jh();function t(s,r,a){s.clearRect(0,0,r.width,r.height),r.style||(r.style={}),r.height=a,r.width=a,r.style.height=a+"px",r.style.width=a+"px"}function n(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}i.render=function(r,a,o){let c=o,l=a;typeof c>"u"&&(!a||!a.getContext)&&(c=a,a=void 0),a||(l=n()),c=e.getOptions(c);const u=e.getImageWidth(r.modules.size,c),p=l.getContext("2d"),d=p.createImageData(u,u);return e.qrToImageData(d.data,r,c),t(p,l,u),p.putImageData(d,0,0),l},i.renderToDataURL=function(r,a,o){let c=o;typeof c>"u"&&(!a||!a.getContext)&&(c=a,a=void 0),c||(c={});const l=i.render(r,a,c),u=c.type||"image/png",p=c.rendererOpts||{};return l.toDataURL(u,p.quality)}})(Uo)),Uo}var Oo={},yu;function mf(){if(yu)return Oo;yu=1;const i=Jh();function e(s,r){const a=s.a/255,o=r+'="'+s.hex+'"';return a<1?o+" "+r+'-opacity="'+a.toFixed(2).slice(1)+'"':o}function t(s,r,a){let o=s+r;return typeof a<"u"&&(o+=" "+a),o}function n(s,r,a){let o="",c=0,l=!1,u=0;for(let p=0;p<s.length;p++){const d=Math.floor(p%r),h=Math.floor(p/r);!d&&!l&&(l=!0),s[p]?(u++,p>0&&d>0&&s[p-1]||(o+=l?t("M",d+a,.5+h+a):t("m",c,0),c=0,l=!1),d+1<r&&s[p+1]||(o+=t("h",u),u=0)):c++}return o}return Oo.render=function(r,a,o){const c=i.getOptions(a),l=r.modules.size,u=r.modules.data,p=l+c.margin*2,d=c.color.light.a?"<path "+e(c.color.light,"fill")+' d="M0 0h'+p+"v"+p+'H0z"/>':"",h="<path "+e(c.color.dark,"stroke")+' d="'+n(u,l,c.margin)+'"/>',m='viewBox="0 0 '+p+" "+p+'"',g='<svg xmlns="http://www.w3.org/2000/svg" '+(c.width?'width="'+c.width+'" height="'+c.width+'" ':"")+m+' shape-rendering="crispEdges">'+d+h+`</svg>
`;return typeof o=="function"&&o(null,g),g},Oo}var Mu;function gf(){if(Mu)return Es;Mu=1;const i=Kd(),e=ff(),t=pf(),n=mf();function s(r,a,o,c,l){const u=[].slice.call(arguments,1),p=u.length,d=typeof u[p-1]=="function";if(!d&&!i())throw new Error("Callback required as last argument");if(d){if(p<2)throw new Error("Too few arguments provided");p===2?(l=o,o=a,a=c=void 0):p===3&&(a.getContext&&typeof l>"u"?(l=c,c=void 0):(l=c,c=o,o=a,a=void 0))}else{if(p<1)throw new Error("Too few arguments provided");return p===1?(o=a,a=c=void 0):p===2&&!a.getContext&&(c=o,o=a,a=void 0),new Promise(function(h,m){try{const _=e.create(o,c);h(r(_,a,c))}catch(_){m(_)}})}try{const h=e.create(o,c);l(null,r(h,a,c))}catch(h){l(h)}}return Es.create=e.create,Es.toCanvas=s.bind(null,t.render),Es.toDataURL=s.bind(null,t.renderToDataURL),Es.toString=s.bind(null,function(r,a,o){return n.render(r,o)}),Es}var vf=gf();const xf=$d(vf),_f=new URLSearchParams(location.search).has("presenter");if(location.hostname==="ethical.institute"&&!_f){const i=()=>{window.dataLayer=window.dataLayer||[],window.gtag=function(){window.dataLayer.push(arguments)},window.gtag("js",new Date),window.gtag("config","G-L2HXV1W6H6",{page_title:document.title,page_location:location.href.split("#")[0]});const e=document.createElement("script");e.async=!0,e.src="https://www.googletagmanager.com/gtag/js?id=G-L2HXV1W6H6",document.head.append(e)};document.readyState==="complete"?i():window.addEventListener("load",i,{once:!0})}const Mt=[{id:"01",index:0,actNumber:0,actName:"Opening",div:!1,name:"The State of AI in Enterprise in 2026",sourceTitle:"The State of AI in Enterprise in 2026",html:'<p class="kicker">ENTERPRISE AI / 2026</p><h1>The State of AI<br>in Enterprise<br><em>in 2026.</em></h1><p class="byline">Alejandro Saucedo<br><span>Director of Markets AI, Data &amp; Platform</span></p>',layout:"enterprise hero v2-intro",theme:"dark",accent:"#59c4d0",notes:`SPEAKER NOTES
Slide creation: Christian Mettner

ORIGINAL SOURCE SLIDE
Alejandro
Saucedo
Director of Markets AI, Data & Platform
AI productivity
& Agentic Engineering`,sources:[]},{id:"02",index:1,actNumber:0,actName:"Opening",div:!1,name:"Alejandro Saucedo",sourceTitle:"Alejandro Saucedo",html:'<figure class="portrait"><img src="source/02-0.jpg" alt="Alejandro Saucedo" decoding="async"></figure><div class="bio"><p class="kicker">YOUR SPEAKER</p><h2>Alejandro<br>Saucedo</h2><div class="rows"><div data-reveal><b>Zalando</b><span>Director of Markets AI, Data & Platform</span></div><div data-reveal><b>ACM</b><span>Board member · elected 2020–2028</span></div><div data-reveal><b>United Nations</b><span>AI expert · AI Advisory Group</span></div></div></div>',layout:"enterprise bio-layout v2-intro",theme:"dark",accent:"#59c4d0",notes:`SPEAKER NOTES
…and since 2 weeks ago, a father of 2
It is funny that there are so many similarities on agentic systems and toddlers

ORIGINAL SOURCE SLIDE
About me:
Alejandro Saucedo
Zalando

Director of Markets AI, Data & Platform
Board Member (
Elected 
2020-2028)
A.C.M.
AI Expert at the U.N. AI Advisory Group
U.N.
The State of GenAI & ML in 2025`,sources:[]},{id:"03",index:2,actNumber:1,actName:"Motivations",div:!0,name:"Motivations",sourceTitle:"Motivations",html:'<p class="kicker">01 / MOTIVATIONS</p><h2>Market trends,<br>opportunities<br>and challenges.</h2>',layout:"enterprise v2 v2-divider",theme:"light",accent:"#59c4d0",notes:`SPEAKER NOTES
Our core competencies are key to success for our platform:
Fashion
Digital Experience
Convenience


ORIGINAL SOURCE SLIDE
‹#›
Motivations
Market trends, opportunities and challenges


AI productivity
& Agentic Engineering`,sources:[]},{id:"04",index:3,actNumber:1,actName:"Motivations",div:!1,name:"The AI market and its numbers",sourceTitle:"The AI market and its numbers",html:'<p class="kicker">MOTIVATIONS / THE AI MARKET</p><h2>The AI market.<br>And its numbers.</h2><div class="market-metrics"><article data-reveal><h3>~$757bn</h3><p>Market valuation in 2025 [1]</p></article><article data-reveal><h3>5×</h3><p>Projected increase over five years [2]</p></article><article data-reveal><h3>100m+</h3><p>Working in the AI space by year end · source forecast [3]</p></article></div><p class="source-note">Source-deck estimates. Market size, projected growth and employment are separate measures.</p>',layout:"enterprise v2 v2-market",theme:"light",accent:"#59c4d0",notes:`SPEAKER NOTES

And expected to continue growing
As part of these we also have to see case studies with hard value 
[slide:case studies]

ORIGINAL SOURCE SLIDE
The AI Market
and it’s numbers.
~$757Bn
.

Market valuation in 2025 [1]
Projected 5y increase [2]
+5x. 
Working in AI space by EOY [3]
+100m
[1] 
https://www.precedenceresearch.com/artificial-intelligence-market
 
[2] 
https://explodingtopics.com/blog/ai-statistics
[3] 
https://www3.weforum.org/docs/WEF_Future_of_Jobs_2020.pdf
 
The State of GenAI & ML in 2025`,sources:[{href:"https://www.precedenceresearch.com/artificial-intelligence-market"},{href:"https://explodingtopics.com/blog/ai-statistics"},{href:"https://www3.weforum.org/docs/WEF_Future_of_Jobs_2020.pdf"}]},{id:"05",index:4,actNumber:1,actName:"Motivations",div:!1,name:"Growing success stories",sourceTitle:"Growing success stories",html:'<p class="kicker">MOTIVATIONS / COMMERCIAL VALUE</p><h2>Growing<br>success stories.</h2><div class="detail-rows"><div data-reveal><h3>GitHub</h3><p>Copilot: <b>$300m annual recurring revenue in 2024</b> [1].</p></div><div data-reveal><h3>Adobe</h3><p>GenStudio: <b>more than $1bn in ending ARR</b> book of business [2].</p></div><div data-reveal><h3>Accenture / BCG</h3><p><b>$3.7bn GenAI bookings / revenue</b>; approximately <b>$5bn estimated for 2026</b> [3].</p></div></div>',layout:"enterprise v2 v2-object-right",theme:"light",accent:"#59c4d0",notes:`SPEAKER NOTES
…
With the growing success stories there are growing questions
[slide: articles]


ORIGINAL SOURCE SLIDE
The AI Market
and growing success stories.
GitHub

Copilot $300M Annual Recurrent Revenue in 2024 [1]
Genstudio >$1B in ending ARR book of business [2]
Adobe
$3.7bn GenAI Bookings Revenue / ~$5bn Est. 26 [3]
Accenture/BCG
[1] 
https://www.arr.club/signal/github-copilot-arr-surpassed-300m
	
[2]
.
https://www.adobe.com/cc-shared/assets/investor-relations/pdfs/21305202/c56hryhwgerfaw.pdf
[3] 
https://www.ben-evans.com/benedictevans/2024/7/9/the-ai-summer
The State of GenAI & ML in 2025`,sources:[{href:"https://www.arr.club/signal/github-copilot-arr-surpassed-300m"},{href:"https://www.adobe.com/cc-shared/assets/investor-relations/pdfs/21305202/c56hryhwgerfaw.pdf"},{href:"https://www.ben-evans.com/benedictevans/2024/7/9/the-ai-summer"}]},{id:"06",index:5,actNumber:1,actName:"Motivations",div:!1,name:"Zalando: GenAI and ML across systems and applications",sourceTitle:"Zalando: GenAI and ML across systems and applications",html:'<p class="kicker">ZALANDO / GENAI & ML</p><h2>Across systems<br>and applications.</h2><div class="usecase-grid"><div data-reveal><span class="uc-number">01</span><span>Search & recommendations</span></div><div data-reveal><span class="uc-number">02</span><span>Warehouse inventory optimisation</span></div><div data-reveal><span class="uc-number">03</span><span>Conversational AI</span><small>GenAI</small></div><div data-reveal><span class="uc-number">04</span><span>Replenishment prediction</span></div><div data-reveal><span class="uc-number">05</span><span>Pricing optimisation / pricing as a service</span></div><div data-reveal><span class="uc-number">06</span><span>Forecasting demand, returns, etc.</span></div><div data-reveal><span class="uc-number">07</span><span>Size & fit recommendations</span></div><div data-reveal><span class="uc-number">08</span><span>Machine translation</span><small>GenAI</small></div><div data-reveal><span class="uc-number">09</span><span>Fraud detection</span></div><div data-reveal><span class="uc-number">10</span><span>Virtual clothing try-on</span><small>GenAI</small></div><div data-reveal><span class="uc-number">11</span><span>Marketing intelligence</span></div><div data-reveal><span class="uc-number">12</span><span>Competitive matching</span></div></div><div class="tryon-studio" aria-label="Three virtual clothing try-on looks from the original Zalando demonstration"><div class="studio-label">VIRTUAL CLOTHING TRY-ON <span>01 / 03</span></div><div class="looks"><figure class="look look-1"><div class="garment" role="img" aria-label="Virtual model wearing outfit 1"></div><figcaption>LOOK 01</figcaption></figure><figure class="look look-2"><div class="garment" role="img" aria-label="Virtual model wearing outfit 2"></div><figcaption>LOOK 02</figcaption></figure><figure class="look look-3"><div class="garment" role="img" aria-label="Virtual model wearing outfit 3"></div><figcaption>LOOK 03</figcaption></figure></div><p>One customer. Different combinations.<br><b>Personalised experiences across the journey.</b></p></div>',layout:"enterprise v2 v2-zalando",theme:"light",accent:"#59c4d0",notes:`SPEAKER NOTES
At Zalando we have captured this as well
We have use-cases across search, recommendation, forecasting, marketing intel,
But we also are leveraging GenAI 
Conversational fashion assistant
Machine translation
VIrtual clothing try-on
Even foundation models for time series forecasting
There is a lot of value [slide]

ORIGINAL SOURCE SLIDE
Zalando | GenAI & ML
Across systems and applications








Search & Recommendations
Warehouse Inventory Optimization
Conversational AI
GenAI
Replenishment Prediction
Pricing Optimization / Pricing as a Service
Forecasting Demand, Returns, etc
Size & Fit Recommendations
Machine Translation
GenAI
Fraud Detection
Virtual Clothing Try-On 
GenAI
Marketing Intelligence
Competitive Matching

The State of GenAI & ML in 2025`,sources:[]},{id:"07",index:6,actNumber:1,actName:"Motivations",div:!1,name:"Annotated history of AI and agentic systems",sourceTitle:"Annotated history of AI and agentic systems",html:'<p class="kicker">MOTIVATIONS / ANNOTATED HISTORY</p><h2>Artificial intelligence<br>and agentic systems.</h2><div class="history-grid"><article data-reveal><span>1800s–1970s</span><h3>Foundations</h3><p>Linear regression and statistical learning; neural networks and shallow learning; recurrent architectures and early learning RNNs.</p></article><article data-reveal><span>1950 / 1997</span><h3>Reasoning benchmarks</h3><p>The Turing Test; IBM Deep Blue vs. Garry Kasparov.</p></article><article data-reveal><span>2016–2018</span><h3>A new architecture</h3><p>AlphaGo; the Transformer architecture; the first GPT.</p></article><article data-reveal><span>2019–2020</span><h3>The API frontier</h3><p>GPT-2: 1.5bn parameters, staged release. GPT-3: 175bn parameters and few-shot APIs.</p></article><article data-reveal><span>2022</span><h3>Chat goes mainstream</h3><p>ChatGPT launches; instruction-following becomes a mainstream interface.</p></article><article data-reveal><span>2023–2024</span><h3>A strong model wave</h3><p>Llama, GPT-4, Mixtral and Gemini; the first strong open-weight wave.</p></article><article data-reveal><span>H1 2025</span><h3>Agent tooling</h3><p>DeepSeek-R1 and Manus; China as a serious player; agent SDK releases.</p></article><article data-reveal><span>H2 2025</span><h3>Agent harnesses</h3><p>Claude Opus 4.5; the emergence of the agent harness.</p></article><article data-reveal><span>H1 2026</span><h3>Autonomous harnesses</h3><p>GLM, Kimi and serious open weights; OpenClaw, Hermes and autonomous agentic harnesses.</p></article><article data-reveal><span>H2 2026</span><h3>Loop engineering</h3><p>The shift towards agentic loops and the systems around them.</p></article></div>',layout:"enterprise v2 v2-history",theme:"light",accent:"#59c4d0",notes:`SPEAKER NOTES


ORIGINAL SOURCE SLIDE

Annotated History 
of Artificial Intelligence & Agentic Systems
First Neural Net (NN) / Linear Regression / Shallow Learning
1800

First Recurrent 
NN (RNN) Architecture. ~1972: First Learning RNNs
1950; The Turing Test, 
1960; IBM Deep Blue vs. Garry Kasparov


1925
/
60


AlphaGo by Deep Mind;
Transformer architecture and the first GPT

2016/17
Chatgpt 
Launch; instruction chat goes mainstream



2022

DeepSeek-R1 + Manus; China as serious player
+AgentsSDKs release


H1/2025
H2/2026
The Rise of the and “Loop engineering”
2023/24

Llama, GPT-4, Mixrtal, Gemini; First strong open-weight wave
2019/20

GPT-2 1.5B Staged Release  GPT-3 175B;  Few-shot API frontier




Claude Opus 4.5 Storms the world.
The birth of the  “Agent Harness”
H2/2025
H1/2026
Open Weights get serious (GLM, Kimi, etc) OpenClaw, Hermes and autonomous agentic harness
The State of GenAI & ML in 2025`,sources:[]},{id:"08",index:7,actNumber:1,actName:"Motivations",div:!1,name:"The fundamental shift: which one is it?",sourceTitle:"The fundamental shift: which one is it?",html:'<p class="kicker">MOTIVATIONS / THE FUNDAMENTAL SHIFT</p><h2>Which one is it?</h2><div class="quote-typeset"><blockquote data-reveal><span>JANUARY 2023</span><p>“The hottest new programming language is English.”</p><cite>Andrej Karpathy</cite></blockquote><blockquote data-reveal><span>JANUARY 2026</span><p>“It feels like I’m cheating. Which is a very weird feeling to have. It takes a while to unpack. It’s because some code that used to be a point of pride and high IQ and knowledge is suddenly free and instant and it’s very disorienting.”</p><cite>Andrej Karpathy</cite></blockquote></div>',layout:"enterprise v2 v2-quotes",theme:"light",accent:"#59c4d0",notes:`SPEAKER NOTES


ORIGINAL SOURCE SLIDE
The State of GenAI & ML in 2025
The AI Market
The Fundamental Shift
Which one is it?`,sources:[]},{id:"09",index:8,actNumber:1,actName:"Motivations",div:!1,name:"GenAI value unlock",sourceTitle:"GenAI value unlock",html:'<p class="kicker">MOTIVATIONS / GENAI VALUE UNLOCK</p><h2>More than speed.</h2><div class="value-ladder" aria-label="Individual to team to department to major competitive advantage"><span data-reveal>Individual</span><span data-reveal>Team</span><span data-reveal>Department</span><span data-reveal>Major competitive advantage</span></div><div class="detail-cards"><article data-reveal><h3>Individual → team</h3><p>The source describes an <b>order-of-magnitude scaling effect</b>: individual productivity approaching former team output, extending what one person can hold and execute.</p></article><article data-reveal><h3>More than speed</h3><p>The short-sighted view sees faster development. The transformative question: <b>at a higher level of abstraction, what becomes possible that was previously impossible?</b></p></article><article data-reveal><h3>Beyond tech</h3><p>This is not confined to technology. The next wave is <b>data, analysts and commercial domain expertise</b>—all at once or staggered.</p></article><article data-reveal><h3>The junior gap</h3><p>Repetitive coding tasks have traditionally built experience. As that path changes, <b>where will the next generation of senior engineers develop their skills?</b></p></article></div>',layout:"enterprise v2 v2-value",theme:"light",accent:"#59c4d0",notes:`SPEAKER NOTES


ORIGINAL SOURCE SLIDE
The State of GenAI & ML in 2025
The AI Market
GenAI Value Unlock
Individual
The scaling effect is
 at least one order of magnitude
: individual productivity now matches former team output
, providing significantly higher cognitive limitations.
More than
 Speed
The short-sighted view sees this as faster development. The transformative view asks: 
If we can now operate at a higher level of abstraction, what becomes possible that was previously impossible?

The Junior 
Gap
Across industry there is a growing 
challenge for junior colleagues. The traditional learning path
 - 
gaining experience through repetitive coding tasks
 - 
is vanishing. Where will the next generation of senior engineers develop their skills?
Team
Department
Major Competitive Advantage
Beyond 
Tech
This is something that is not just affecting tech. The next wave is data, analysts and then commercial domain expertise. All at once or staggered, but it’s a matter of when, not whether.`,sources:[]},{id:"10",index:9,actNumber:1,actName:"Motivations",div:!1,name:"GenAI-powered funnel",sourceTitle:"GenAI-powered funnel",html:'<p class="kicker">MOTIVATIONS / GENAI-POWERED FUNNEL</p><h2>Capture attention.<br>Convert it into value.</h2><div class="funnel-copy"><p data-reveal>New innovations in GenAI introduce <b>meaningful ways of capturing and converting attention.</b></p><p data-reveal>This includes <b>hyper-personalised experiences</b> that meet the customer where they are, rather than forcing the product.</p><p data-reveal>Not only <b>better experiences</b>, but tangible opportunities for <b>net-new business value.</b></p></div><figure class="native-revenue"><svg viewBox="0 0 880 500" role="img" aria-label="AI apps: years from zero to one hundred million dollars ARR, redrawn from the source chart"><text x="75" y="26" class="chart-title">AI APPS · YEARS FROM $0 TO $100M ARR</text><path class="grid-line" d="M70 424.0H810"/><text x="54" y="429.0" text-anchor="end">$0m</text><path class="grid-line" d="M70 336.5H810"/><text x="54" y="341.5" text-anchor="end">$25m</text><path class="grid-line" d="M70 249.0H810"/><text x="54" y="254.0" text-anchor="end">$50m</text><path class="grid-line" d="M70 161.5H810"/><text x="54" y="166.5" text-anchor="end">$75m</text><path class="grid-line" d="M70 74.0H810"/><text x="54" y="79.0" text-anchor="end">$100m</text><text x="189.0" y="452" text-anchor="middle">0.5</text><text x="308" y="452" text-anchor="middle">1</text><text x="427.0" y="452" text-anchor="middle">1.5</text><text x="546" y="452" text-anchor="middle">2</text><text x="665.0" y="452" text-anchor="middle">2.5</text><text x="784" y="452" text-anchor="middle">3</text><text x="430" y="480">YEARS</text><g><title>Together AI: approximate trajectory from source graphic</title><path data-draw pathLength="1" d="M70 424 C 151.0 400 256.2 159.0 284.2 74.0" stroke="#335dad" fill="none" stroke-width="3"/><circle cx="284.20000000000005" cy="74.0" r="4" fill="#335dad"/><text class="series-label" x="284.20000000000005" y="64.0" text-anchor="middle" fill="#335dad">Together AI</text></g><g><title>Cursor: approximate trajectory from source graphic</title><path data-draw pathLength="1" d="M70 424 C 170.8 400 308.6 159.0 336.6 74.0" stroke="#132b45" fill="none" stroke-width="3"/><circle cx="336.56" cy="74.0" r="4" fill="#132b45"/><text class="series-label" x="336.56" y="53.0" text-anchor="middle" fill="#132b45">Cursor</text></g><g><title>Midjourney: approximate trajectory from source graphic</title><path data-draw pathLength="1" d="M70 424 C 205.0 400 399.0 166.0 427.0 81.0" stroke="#335b62" fill="none" stroke-width="3"/><circle cx="427.0" cy="81.0" r="4" fill="#335b62"/><text class="series-label" x="427.0" y="71.0" text-anchor="middle" fill="#335b62">Midjourney</text></g><g><title>WIZ: approximate trajectory from source graphic</title><path data-draw pathLength="1" d="M70 424 C 232.0 400 470.4 159.0 498.4 74.0" stroke="#777769" fill="none" stroke-width="3"/><circle cx="498.40000000000003" cy="74.0" r="4" fill="#777769"/><text class="series-label" x="498.40000000000003" y="53.0" text-anchor="middle" fill="#777769">WIZ</text></g><g><title>ElevenLabs: approximate trajectory from source graphic</title><path data-draw pathLength="1" d="M70 424 C 259.0 400 541.8 169.5 569.8 84.5" stroke="#774c55" fill="none" stroke-width="3"/><circle cx="569.8" cy="84.5" r="4" fill="#774c55"/><text class="series-label" x="569.8" y="74.5" text-anchor="middle" fill="#774c55">ElevenLabs</text></g><g><title>Mercor: approximate trajectory from source graphic</title><path data-draw pathLength="1" d="M70 424 C 257.2 400 537.0 236.0 565.0 151.0" stroke="#636fc0" fill="none" stroke-width="3"/><circle cx="565.04" cy="151.0" r="4" fill="#636fc0"/><text class="series-label" x="565.04" y="130.0" text-anchor="middle" fill="#636fc0">Mercor</text></g><g><title>Harvey: approximate trajectory from source graphic</title><path data-draw pathLength="1" d="M70 424 C 272.5 400 577.5 316.5 605.5 231.5" stroke="#9b4a5f" fill="none" stroke-width="3"/><circle cx="605.5" cy="231.5" r="4" fill="#9b4a5f"/><text class="series-label" x="605.5" y="221.5" text-anchor="middle" fill="#9b4a5f">Harvey</text></g><g><title>Sierra AI: approximate trajectory from source graphic</title><path data-draw pathLength="1" d="M70 424 C 239.2 400 489.4 414.5 517.4 329.5" stroke="#338f62" fill="none" stroke-width="3"/><circle cx="517.44" cy="329.5" r="4" fill="#338f62"/><text class="series-label" x="517.44" y="308.5" text-anchor="middle" fill="#338f62">Sierra AI</text></g><g><title>Glean: approximate trajectory from source graphic</title><path data-draw pathLength="1" d="M70 424 C 340.0 400 756.0 159.0 784.0 74.0" stroke="#735db5" fill="none" stroke-width="3"/><circle cx="784" cy="74.0" r="4" fill="#735db5"/><text class="series-label" x="784" y="64.0" text-anchor="middle" fill="#735db5">Glean</text></g><g><title>Codeium: approximate trajectory from source graphic</title><path data-draw pathLength="1" d="M70 424 C 326.5 400 720.3 358.5 748.3 273.5" stroke="#159b9b" fill="none" stroke-width="3"/><circle cx="748.3000000000001" cy="273.5" r="4" fill="#159b9b"/><text class="series-label" x="748.3000000000001" y="252.5" text-anchor="middle" fill="#159b9b">Codeium</text></g><g><title>Bolt: approximate trajectory from source graphic</title><path data-draw pathLength="1" d="M70 424 C 86.2 400 84.8 439.0 112.8 354.0" stroke="#af6741" fill="none" stroke-width="3"/><circle cx="112.84" cy="354.0" r="4" fill="#af6741"/><text class="series-label" x="112.84" y="344.0" text-anchor="middle" fill="#af6741">Bolt</text></g><g><title>Lovable: approximate trajectory from source graphic</title><path data-draw pathLength="1" d="M70 424 C 97.0 400 113.4 432.0 141.4 347.0" stroke="#ba555c" fill="none" stroke-width="3"/><circle cx="141.39999999999998" cy="347.0" r="4" fill="#ba555c"/><text class="series-label" x="141.39999999999998" y="326.0" text-anchor="middle" fill="#ba555c">Lovable</text></g></svg><figcaption>Visual reconstruction of the supplied Rule of Thumb chart. Curves are approximate; no raw dataset was supplied.</figcaption></figure>',layout:"enterprise v2 v2-revenue",theme:"light",accent:"#59c4d0",notes:`SPEAKER NOTES
Particularly relevant 

ORIGINAL SOURCE SLIDE
New innovations in GenAI are introducing 
meaningful
 ways of 
capturing
 and 
converting
 attention.
This includes 
hyper-personalised
 experiences that 
meet the customer
 where they are vs 
force the product
.
The AI Market
GenAI-Powered Funnel
The State of GenAI & ML in 2025
Not only 
better experiences
; but also tangible opportunities for 
net-new business value
.`,sources:[]},{id:"11",index:10,actNumber:2,actName:"From tools to systems",div:!0,name:"Trends: products, trends and limitations",sourceTitle:"Trends: products, trends and limitations",html:'<p class="kicker">02 / TRENDS</p><h2>Products, trends<br>and limitations.</h2>',layout:"enterprise v2 v2-divider",theme:"dark",accent:"#59c4d0",notes:`SPEAKER NOTES


ORIGINAL SOURCE SLIDE
‹#›
Trends
Products, Trends and Limitations
AI productivity
& Agentic Engineering`,sources:[]},{id:"12",index:11,actNumber:2,actName:"From tools to systems",div:!1,name:"GenAI products: how it started",sourceTitle:"GenAI products: how it started",html:'<p class="kicker">TRENDS / GENAI PRODUCTS</p><h2>How it started.</h2><div class="product-origins"><article data-reveal><h3>ChatGPT</h3><p>Conversational assistance</p></article><article data-reveal><h3>DALL·E</h3><p>Text-to-image generation</p></article><article data-reveal><h3>Stable Diffusion</h3><p>Open image generation</p></article><article data-reveal><h3>BERT</h3><p>Language understanding</p></article></div>',layout:"enterprise v2 v2-start",theme:"dark",accent:"#59c4d0",notes:`SPEAKER NOTES
In the early days
Life was easy
We had 1-2 choices for different tooling
[slide: today]


ORIGINAL SOURCE SLIDE
GenAI Products
How it started
The State of GenAI & ML in 2025`,sources:[]},{id:"13",index:12,actNumber:2,actName:"From tools to systems",div:!1,name:"GenAI products: how it is going",sourceTitle:"GenAI products: how it is going",html:'<p class="kicker">TRENDS / GENAI PRODUCTS</p><h2>How it is going.</h2><div class="native-prism"><div class="prism-center"><b>VISION</b><span>Risk ↔ reward</span><small>Solve · augment · create<br>automate · optimise</small></div><article data-reveal><h3>Sound</h3><p>Music · speech · voice</p><small>Mubert · Soundful · AudioCraft · AIVA · ElevenLabs</small></article><article data-reveal><h3>Design</h3><p>Images · layout · brand</p><small>Canva · Adobe Firefly · Figma · Wix · Looka</small></article><article data-reveal><h3>Flows</h3><p>Productivity · personal workflows</p><small>Fathom · Cogram · Otter · Reclaim</small></article><article data-reveal><h3>Conversational</h3><p>Assistants · language · learning</p><small>Claude · Bard · Duolingo Max · Babbel</small></article><article data-reveal><h3>Text</h3><p>Code · writing · content</p><small>GitHub Copilot · CodeWhisperer · Writer · Jasper</small></article><article data-reveal><h3>Video</h3><p>Creation · animation · enhancement · editing</p><small>Runway · Pika · Synthesia · Descript · Topaz</small></article></div><p class="source-note">Rebuilt from the source’s GenAI Prism: capability families and representative tools, not a current vendor ranking.</p>',layout:"enterprise v2 v2-prism",theme:"dark",accent:"#59c4d0",notes:`SPEAKER NOTES
Fast-forward to today
Dozens of new tools every week
Let’s double click on some trends first on dev tooling
[slide: funnel]

ORIGINAL SOURCE SLIDE
GenAI Products
How it’s going
https://thelettertwo.com/2023/12/28/genai-prism-infographic-unveiled/
 
The State of GenAI & ML in 2025`,sources:[{href:"https://thelettertwo.com/2023/12/28/genai-prism-infographic-unveiled/"}]},{id:"14",index:13,actNumber:2,actName:"From tools to systems",div:!1,name:"GenAI in the SDLC funnel",sourceTitle:"GenAI in the SDLC funnel",html:'<p class="kicker">TRENDS / REFLECTIONS</p><h2>GenAI in the<br>SDLC funnel.</h2><div class="sdlc-labels"><article data-reveal><span>01</span><h3>Code</h3><p>Claude Code · GitHub Copilot · Gemini Code Assist · Windsurf</p></article><article data-reveal><span>02</span><h3>Test</h3><p>CodeRabbit · Functionize · Qodo · Mabl</p></article><article data-reveal><span>03</span><h3>Operate</h3><p>Harness AIDA · Amazon Q · K8sGPT</p></article><article data-reveal><span>04</span><h3>Monitor & debug</h3><p>env0 · Sentry</p></article></div><div class="sdlc-roles"><span>AI COPILOTS →</span><p>Generation, verification, operation and feedback form one system.</p><span>← HUMANS</span></div>',layout:"enterprise v2 v2-sdlc",theme:"dark",accent:"#59c4d0",notes:`SPEAKER NOTES
Let’s have a look at the developer funnel
A lot of ideas flow: code is written
Only some makes it to QA
A subset then is architected and operated
And finally there is a limit on monitoring and debugging

AI Copilots pushing a lot on the funnel
However the metrics that need to converge are higher
The bottleneck tends to be PRs 
Or the number of apps we monitor

ORIGINAL SOURCE SLIDE
Reflections.
GenAI in the SDLC funnel.

1
Code

2
Test

3
Operate

4
Monitor & Debug

Humans

AI Copilots
`,sources:[]},{id:"15",index:14,actNumber:2,actName:"From tools to systems",div:!1,name:"The bottleneck is upstream",sourceTitle:"The bottleneck is upstream",html:'<p class="kicker">TRENDS / SIMILAR IN OTHER PRODUCTS</p><h2>The bottleneck<br>is upstream.</h2><div class="media-grid"><article data-reveal><h3>Video</h3><p>Runway · Hour One · Synthesia</p></article><article data-reveal><h3>Music</h3><p>Udio · Suno · Riffusion</p></article><article data-reveal><h3>Voice</h3><p>ElevenLabs · Descript · Resemble AI</p></article><article data-reveal><h3>Images</h3><p>DALL·E · Canva · Midjourney</p></article><article data-reveal><h3>3D</h3><p>Hyper3D · Meshy · 3D AI</p></article><article data-reveal><h3>And beyond</h3><p>Thousands of additional tools.</p></article></div>',layout:"enterprise v2 v2-media",theme:"light",accent:"#59c4d0",notes:`SPEAKER NOTES
We have seen varying levels of maturity 
Similarly some higher coverage than others
I have to say these keep blowing my mind
And the development is quite quick
However this is not without limitations
[slide:limitations]

ORIGINAL SOURCE SLIDE
Similar in Other Products
The Bottleneck is Upstream
The State of GenAI & ML in 2025
Video

Music

Voice

Images

3D

…
1000s of many more tools!`,sources:[]},{id:"16",index:15,actNumber:2,actName:"From tools to systems",div:!1,name:"Challenges and limitations",sourceTitle:"Challenges and limitations",html:'<p class="kicker">TRENDS / CHALLENGES & LIMITATIONS</p><h2>How do we build<br>great GenAI?</h2><div class="detail-cards"><article data-reveal><h3>01 / Top-of-funnel bottleneck</h3><p>Tooling concentrates on generation. Agents work faster and in parallel, but <b>quality review, operations and maintenance</b> still constrain value delivery.</p></article><article data-reveal><h3>02 / Verification velocity</h3><p>Verification capacity creates a growing backlog. More code is not useful unless <b>more value reaches production</b>. This needs new methodologies and frameworks.</p></article><article data-reveal><h3>03 / Beyond the individual</h3><p>Organisations see varying individual acceleration and often <b>slow down as more people enter the same workstream</b>. Scaling productivity is a systems problem.</p></article><article data-reveal><h3>04+ / Production practice</h3><p>GenAI is non-deterministic. Production brings challenges in <b>monitoring, reproducibility, orchestration and scheduling</b>, with best practices still developing.</p></article></div>',layout:"enterprise v2 v2-limitations",theme:"light",accent:"#59c4d0",notes:`SPEAKER NOTES
Challenges…

How do we build great GenAI?
[slide: transition]

ORIGINAL SOURCE SLIDE
GenAI Products
Challenges and Limitations
The State of GenAI & ML in 2025




04+
Lack of best practices for AI systems
Often as engineers we forget that GenAI has key properties of non-deterministic nature bringing challenges in production, such as monitoring, reproducibility, orchestration, scheduling, etc.


03
Scaling Productivity Beyond the Individual
Currently organisations struggle to scale the productivity beyond a single person. Often seeing varying levels of acceleration, and a slow-down as the number of resources are added into the same workstream.


02
Verification Velocity Limitations
We have limitations on the velocity in which we can verify assets, which results in increasing backlog. More code written is not useful if more value is not delivered in production. This requires new methodologies, and frameworks.


01
Top of the funnel bottleneck
Large amount of tooling addresses only the “top of the funnel” productivity, resulting in bottlenecks on value-delivery - e.g. agents work faster and with horizontal parallelism but quality review, operations, maintenance continues to be a bottleneck.
How do we build great GenAI?`,sources:[]},{id:"17",index:16,actNumber:3,actName:"Enterprise practice",div:!0,name:"Case studies across companies",sourceTitle:"Case studies across companies",html:'<p class="kicker">03 / CASE STUDIES</p><h2>Use cases<br>across companies.</h2>',layout:"enterprise v2 v2-divider",theme:"light",accent:"#59c4d0",notes:`SPEAKER NOTES
Let’s dive into…

ORIGINAL SOURCE SLIDE
‹#›
Case Studies
Use-cases across companies 
AI productivity
& Agentic Engineering
`,sources:[]},{id:"18",index:17,actNumber:3,actName:"Enterprise practice",div:!1,name:"Machine learning maturity: evolution towards value",sourceTitle:"Machine learning maturity: evolution towards value",html:'<p class="kicker">CASE STUDIES / MACHINE LEARNING MATURITY</p><h2>Evolution towards value.</h2><div class="native-maturity"><svg viewBox="0 0 800 360" role="img" aria-label="Conceptual analytics maturity curve from raw data to autonomous systems"><path class="chart-axis" d="M35 15V315H775"/><text x="40" y="15">PRODUCTIVITY</text><text x="320" y="343">MATURITY OF ANALYTICS CAPABILITIES</text><path data-draw pathLength="1" class="maturity-curve" d="M70 280 C290 272 585 190 710 55"/><path class="chasm" d="M440 42V310"/><text x="440" y="30" text-anchor="middle">CHASM</text><g data-reveal><circle cx="70" cy="280" r="10" class="maturity-node"/><text x="70" y="285" text-anchor="middle" class="node-index">1</text></g><g data-reveal><circle cx="150" cy="270" r="12" class="maturity-node"/><text x="150" y="275" text-anchor="middle" class="node-index">2</text></g><g data-reveal><circle cx="230" cy="254" r="15" class="maturity-node"/><text x="230" y="259" text-anchor="middle" class="node-index">3</text></g><g data-reveal><circle cx="310" cy="233" r="18" class="maturity-node"/><text x="310" y="238" text-anchor="middle" class="node-index">4</text></g><g data-reveal><circle cx="390" cy="210" r="22" class="maturity-node"/><text x="390" y="215" text-anchor="middle" class="node-index">5</text></g><g data-reveal><circle cx="500" cy="167" r="29" class="maturity-node"/><text x="500" y="172" text-anchor="middle" class="node-index">6</text></g><g data-reveal><circle cx="610" cy="115" r="33" class="maturity-node"/><text x="610" y="120" text-anchor="middle" class="node-index">7</text></g><g data-reveal><circle cx="710" cy="55" r="37" class="maturity-node"/><text x="710" y="60" text-anchor="middle" class="node-index">8</text></g></svg><div class="maturity-legend"><span><b>01</b>Raw data</span><span><b>02</b>Cleaned data</span><span><b>03</b>Standard reports</span><span><b>04</b>Ad hoc reports & OLAP</span><span><b>05</b>Self-service BI & agile visualisation</span><span><b>06</b>Predictive analytics & machine learning</span><span><b>07</b>Prescriptive analytics</span><span><b>08</b>Autonomous systems</span></div><div class="maturity-questions">What happened? → Why did it happen? → What will happen? → Optimised actions</div><span>Conceptual framework, not an empirical productivity curve.</span></div><div class="maturity-argument"><h3>Time-to-value:<br>from concept to AI system</h3><p data-reveal>This is often presented as a <b>linear maturity curve towards autonomous systems.</b></p><p data-reveal>The secret is <b>how precisely we identify the right use case</b>, and <b>how quickly we capture value from data and AI.</b></p><p data-reveal>A huge opportunity lies in <b>AI maturity, data limitations and ML development speed.</b></p></div>',layout:"enterprise v2 v2-maturity",theme:"light",accent:"#59c4d0",notes:`SPEAKER NOTES


ORIGINAL SOURCE SLIDE
Machine Learning Maturity
Evolution towards value
Time-to-Value from concept to AI system
The secret is 
how precise 
can we identify the right use-case, and 
how fast
 capture value from Data & AI.
Often this model is thought through as 
linear maturity curve
 towards 
autonomous systems
.
A huge opportunity can be captured by addressing 
AI 
maturity,
 
data limitations
, 
ML development speed
.
The State of GenAI & ML in 2025`,sources:[]},{id:"19",index:18,actNumber:3,actName:"Enterprise practice",div:!1,name:"Success stories & learnings.",sourceTitle:"Success stories & learnings.",html:'<p class="kicker">CASE STUDIES / DEVELOPER ECOSYSTEM</p><h2>Success stories & learnings.</h2><div class="case-study-grid"><div class="case-results"><article data-reveal><h3>Intercom / Fin</h3><p><b>2× R&D productivity in nine months.</b> 93.6% agent-driven PRs; 19.2% AI-approved; 497 fully autonomous.</p></article><article data-reveal><h3>Stripe</h3><p><b>1,000+ merged PRs per week.</b> Unattended one-shot coding agents and deterministic “Blueprints”.</p></article><article data-reveal><h3>Spotify</h3><p><b>1,500+ merged AI-generated PRs.</b> Half of PRs automated by Fleet Management since mid-2024.</p></article><article data-reveal><h3>Duolingo</h3><p><b>70% more PRs.</b> 67% decrease in median code-review turnaround; 25% speed increase.</p></article></div><div class="case-lessons"><h3>Top five learnings</h3><ol><li data-reveal>Build a <b>shared agentic engineering platform</b>, not a collection of individual AI tools.</li><li data-reveal>Treat <b>context, tools and configuration</b> as first-class infrastructure.</li><li data-reveal>Wrap agents in <b>deterministic harnesses</b> with review, quality and permission gates.</li><li data-reveal>Put agents <b>where work already happens</b>; start with bounded, repeatable workflows.</li><li data-reveal>Instrument the <b>full software factory</b>; manage AI productivity as an operating system.</li></ol></div></div>',layout:"enterprise v2 v2-cases",theme:"light",accent:"#59c4d0",notes:`SPEAKER NOTES
1. Intercom’s plugin marketplace, Stripe’s Minions, Spotify’s fleet agents, and Duolingo’s Slack agent
2. Accessing repo content, docs, CI, observability - codeases consistency
3. Not freely roaming; deterministic workflows and loops
4. Don’t break the experience; separate portals vs integrated experiences; go beyond the chatbot
5. You can’t improve what you can’t measure; speed vs outcome



1. Shared agent infrastructure beats individual tool adoption.
2. Context engineering is becoming a core platform function.
3. MCP/tool registries and standardized configuration are emerging as leverage points.
4. Review automation is where throughput bottlenecks move next.
5. Deterministic gates matter more than clever prompts.
6. Workflow placement drives adoption.
7. Measurement becomes an engineering capability, not a dashboard afterthought.
8. The highest-ROI use cases are bounded, repetitive, testable, and context-rich.
9. Security and permissions have to become part of the agent harness.
10. The real organizational change is cultural: “modernizing the factory is everyone’s job.”

ORIGINAL SOURCE SLIDE
Duolingo;
 70% increase in pull requests, 67% decrease in median code-review turnaround time, 25% speed increase.
Partner Tech Day: AI productivity & Agentic Engineering
Intercom (Fin);
 2x R&D productivity in 9 months; 93.6% agent-driven PRs, 19.2% AI-approved, and 497 fully autonomous.
Stripe;
 1,000+ merged PRs per week; Unattended one-shot coding agents, and introduced “Blueprints”.
Spotify;
 1,500+ merged AI-generated PRs; half of PRs automated by its Fleet Management system since mid-2024.
Developer Ecosystem
Success Stories & Learnings
Top 5 Learnings:

1. Build a shared agentic engineering platform, not a collection of individual AI tools.
2. Treat context, tools, and configuration as first-class infrastructure.
3. Wrap agents in deterministic harnesses with review, quality, and permission gates.
4. Put agents where work already happens, and start with bounded, repeatable workflows.
5. Instrument the full software factory and manage AI productivity as an operating system.`,sources:[]},{id:"20",index:19,actNumber:3,actName:"Enterprise practice",div:!1,name:"Success stories & learnings.",sourceTitle:"Success stories & learnings.",html:'<p class="kicker">CASE STUDIES / DATA ECOSYSTEM</p><h2>Success stories & learnings.</h2><div class="case-study-grid"><div class="case-results"><article data-reveal><h3>Anthropic</h3><p><b>95% of analytics queries automated.</b> ~95% aggregate accuracy; Skills evaluation accuracy from &lt;21% to &gt;95%.</p></article><article data-reveal><h3>OpenAI</h3><p><b>5,000+ internal users; 600+ PB of data; 70,000 datasets.</b> Insights reduced from days to minutes.</p></article><article data-reveal><h3>Spotify</h3><p><b>2,100+ colleagues.</b> 13,000+ conversations; 60,000+ messages; 177 context clusters.</p></article></div><div class="case-lessons"><h3>Top five learnings</h3><ol><li data-reveal>The winning layer is not the chatbot; it is the <b>data context system</b>.</li><li data-reveal><b>Human-curated semantics</b> beat raw query history.</li><li data-reveal>Package <b>procedural knowledge</b> as reusable skills and workflows.</li><li data-reveal>Package <b>procedural knowledge</b> as reusable skills and workflows. <small>(Repeated emphasis in the source.)</small></li><li data-reveal>Adoption happens <b>where work already happens</b>, with pass-through permissions and visible evidence.</li></ol></div></div>',layout:"enterprise v2 v2-cases",theme:"dark",accent:"#59c4d0",notes:`SPEAKER NOTES
1. Hard thing to have good data, not a great agent; which data, when
2. Curated insights vs noise; human verified not manual
3. Skills change game; procedural determinism
4. Data quality is as important as ever
5. Going beyond the chatbot


1. Agentic data is a context problem before it is a model problem.
2. The semantic layer becomes the control surface for trust.
3. Text-to-SQL is only the first rung of the ladder.
4. Data agents need owned domain slices, not one giant warehouse prompt.
5. Validation must be built into the loop.
6. Memory is most valuable when it stores corrections, not chat history.
7. Agents should expose evidence, sources, and caveats.
8. Put the agent where questions already happen.
9. The analytics team’s role shifts from answering tickets to curating the system.
10. The field is still reliability-constrained.


ORIGINAL SOURCE SLIDE
Spotify;
 2,100+ Spotifiers, across 13,000+ conversations, 60,000+ messages, and 177 context clusters.
OpenAI;
 5k+ internal users, 600+ PB of data, 70k datasets, reducing insights from days to minutes.
Anthropic;
 95% of analytics queries automated; ~95% aggregate accuracy; Skills eval accuracy <21% to >95%
Partner Tech Day: AI productivity & Agentic Engineering
Developer Ecosystem
Success Stories & Learnings
Top 5 Learnings:

1. The winning layer is not the chatbot; it is the data context system.
2. Human-curated semantics beat raw query history.
3. Procedural knowledge needs to be packaged as reusable skills/workflows.
4. Procedural knowledge needs to be packaged as reusable skills/workflows.
5. Adoption happens when the agent lives where work already happens, but with pass-through permissions and visible evidence.`,sources:[]},{id:"21",index:20,actNumber:3,actName:"Enterprise practice",div:!1,name:"GenAI stack: establishing the foundation for success",sourceTitle:"GenAI stack: establishing the foundation for success",html:'<p class="kicker">CASE STUDIES / GENAI STACK</p><h2>Establishing the foundation<br>for success.</h2><div class="stack-argument"><p data-reveal>The core potential is not in the models alone, but in the <b>interconnected, data-centric ecosystem.</b></p><p data-reveal>This includes <b>complex orchestration across applications, infrastructure and data flow</b> in agentic systems.</p><p data-reveal>It draws on <b>traditional MLOps</b>, while adding <b>further complexities and tooling requirements.</b></p></div><div class="architecture" aria-label="Complete agentic stack"><div class="arch-security" data-reveal><b>Security</b><small>Cross-cutting</small></div><div class="arch-obs" data-reveal><b>Observability & evaluations</b><small>LangFuse · Elastic · Alertmanager</small></div><div class="arch-hardware" data-reveal><b>Hardware scheduling</b><small>Kueue · Volcano</small></div><div class="arch-mlops" data-reveal><b>MLOps orchestration</b><small>Ray · Airflow · Kubeflow</small></div><div class="arch-guardrails" data-reveal><b>Guardrails & moderation</b><small>AI judge · prompt verification · security</small></div><div class="arch-agents" data-reveal><b>Agent orchestration</b><small>Kagent · LangGraph</small></div><div class="arch-market" data-reveal><b>A2A / MCP marketplaces</b><small>Discovery & interoperability</small></div><div class="arch-vectors" data-reveal><b>Vector databases</b><small>Milvus · Postgres</small></div><div class="arch-services" data-reveal><b>Services</b><small>Files · resources</small></div><div class="arch-models" data-reveal><b>Cloud models</b><small>OpenAI · Anthropic</small></div><div class="arch-gateway" data-reveal><b>Gateway</b><small>Envoy AI</small></div></div>',layout:"enterprise v2 v2-stack",theme:"dark",accent:"#59c4d0",notes:`SPEAKER NOTES
Let’s have a look at the agentic-centric stack
… and security

ORIGINAL SOURCE SLIDE
The State of GenAI & ML in 2025
The 
core potential
 is not on the models themselves, but in the 
interconnected data-centric ecosystem
This includes 
complex orchestration
 across 
applications
, 
infrastructure
 and 
complex data flow
 in agentic systems
This extracts best practices from 
traditional MLOps
 but brings 
further complexities
 and 
tooling requirements
Gateway
(Envoy AI, etc)
Hardware Scheduling
(eg Kueue, Volcano, etc)
Agent Orchestration
(Kagent, LangGraph, etc)
MLOps Orchestration
(eg Ray, Airflow, Kubeflow, etc)
A2A / MCP Market-
places
Observability & Evals
(LangFuse, Elastic, Alertmanager, etc)
Cloud Models
(OpenAI, Anthropic, etc)
Vector DBs
(Milvus, Postgres, etc)
Services
(Files, Resources, etc)
Guardrails & Moderation
(AI Judge, Prompt Verification, Security, etc)
Security
GenAI Stack
Establishing the Foundation for Success`,sources:[]},{id:"22",index:21,actNumber:3,actName:"Enterprise practice",div:!1,name:"The boring data",sourceTitle:"The boring data",html:'<p class="kicker">CASE STUDIES / GENAI ECOSYSTEM</p><h2>The “boring” data.</h2><div class="data-argument"><p data-reveal><b>Garbage in = garbage out</b> is more true than ever across intelligent systems and processes.</p><p data-reveal>New protocols drive <b>standardisation and interoperability</b>—including Envoy and MCP.</p><p data-reveal>Strategic investment in the <b>“boring” data</b> is key: make customer context, dimensions and access usable through standardised model context protocols.</p></div><div class="mcp-diagram"><div class="mcp-host" data-reveal><b>MCP hosts / agents</b><span>Applications and assistants</span></div><i class="flow-link"></i><div class="mcp-client" data-reveal><b>MCP clients</b><span>Protocol connections</span></div><div class="mcp-bus"><span>MODEL CONTEXT PROTOCOL</span></div><div class="mcp-servers"><article data-reveal><b>MCP server</b><span>Remote services</span><small>Messaging · email · calendar</small></article><article data-reveal><b>MCP server</b><span>Enterprise data</span><small>Customer · dimensions · access</small></article><article data-reveal><b>MCP server</b><span>Local resources</span><small>Files · local data sources</small></article></div></div>',layout:"enterprise v2 v2-data",theme:"dark",accent:"#59c4d0",notes:`SPEAKER NOTES


ORIGINAL SOURCE SLIDE
GenAI Ecosystem
The “Boring” Data
This requires equally new protocols that drive 
standardisation
 and best practice for 
interoperability
 (eg envoy, MCP, etc)
The archetypal 
garbage-in = garbage-out
 is true now more than ever across our intelligent systems and processes
Strategic investment in 
the “Boring” data 
is key by leveraging
 standardised model context protocols.
Agents
Great 
Data
(Customer, Dimensions, Access,
etc)
Services containing answers
Services containing answers
Services containing answers
The State of GenAI & ML in 2025`,sources:[]},{id:"23",index:22,actNumber:4,actName:"Closing",div:!0,name:"The state of AI in enterprise",sourceTitle:"The state of AI in enterprise",html:'<p class="kicker">CLOSING THOUGHTS / KEY AREAS & RESOURCES</p><h2>The advantage<br>is the system.</h2><div class="cards"><article data-reveal><span class="step">01</span><h3>Choose value</h3><p>Start with an outcome you can measure.</p></article><article data-reveal><span class="step">02</span><h3>Build context</h3><p>Make knowledge and permissions usable.</p></article><article data-reveal><span class="step">03</span><h3>Close the loop</h3><p>Evaluate, observe and improve real work.</p></article></div><p class="closing"><a href="https://www.linkedin.com/in/axsaucedo/" target="_blank" rel="noopener">Alejandro Saucedo ↗</a></p>',layout:"enterprise wide",theme:"dark",accent:"#59c4d0",notes:`SPEAKER NOTES
Our core competencies are key to success for our platform:
Fashion
Digital Experience
Convenience


ORIGINAL SOURCE SLIDE
‹#›
Closing Thoughts
Key Areas to Highlight and Resources
& Agentic Engineering

`,sources:[]},{id:"24",index:23,actNumber:4,actName:"Closing",div:!1,name:"Thank you",sourceTitle:"Thank you",html:'<p class="kicker">THE STATE OF AI IN ENTERPRISE IN 2026</p><h2>Thank you.</h2><p class="thanks-name"><a href="https://www.linkedin.com/in/axsaucedo/" target="_blank" rel="noopener">Alejandro Saucedo ↗</a></p><div class="live-deck"><div id="live-deck-qr" aria-label="QR code for the live slides"></div><div><span>Explore the live slides</span><a data-live-deck target="_blank" rel="noopener">Open this presentation ↗</a></div></div>',layout:"enterprise thank-you",theme:"dark",accent:"#59c4d0",notes:"Thank the audience. Invite them to revisit the live presentation and connect on LinkedIn. The stars gather into a slowly turning galaxy while the conversation continues.",sources:[]}];const _l="185",yf=0,Su=1,Mf=2,Ia=1,Sf=2,Ar=3,Ji=0,Rn=1,Tn=2,Ai=0,Zs=1,tr=2,bu=3,Eu=4,bf=5,cs=100,Ef=101,wf=102,Tf=103,Af=104,Rf=200,Cf=201,Pf=202,If=203,bc=204,Ec=205,Lf=206,Nf=207,Df=208,Uf=209,Ff=210,Of=211,Bf=212,kf=213,zf=214,wc=0,Tc=1,Ac=2,nr=3,Rc=4,Cc=5,Pc=6,Ic=7,Qh=0,Gf=1,Hf=2,di=0,jh=1,ed=2,td=3,yl=4,nd=5,id=6,sd=7,rd=300,ds=301,ir=302,Bo=303,ko=304,oo=306,Qi=1e3,wi=1001,Lc=1002,ln=1003,Vf=1004,Zr=1005,cn=1006,zo=1007,qi=1008,Un=1009,ad=1010,od=1011,Ur=1012,Ml=1013,mi=1014,Qn=1015,Ii=1016,Sl=1017,bl=1018,Fr=1020,cd=35902,ld=35899,ud=1021,hd=1022,jn=1023,Li=1026,us=1027,El=1028,wl=1029,fs=1030,Tl=1031,Al=1033,La=33776,Na=33777,Da=33778,Ua=33779,Nc=35840,Dc=35841,Uc=35842,Fc=35843,Oc=36196,Bc=37492,kc=37496,zc=37488,Gc=37489,Ha=37490,Hc=37491,Vc=37808,Wc=37809,Xc=37810,qc=37811,Yc=37812,$c=37813,Kc=37814,Zc=37815,Jc=37816,Qc=37817,jc=37818,el=37819,tl=37820,nl=37821,il=36492,sl=36494,rl=36495,al=36283,ol=36284,Va=36285,cl=36286,Wf=3200,ll=0,Xf=1,Xi="",pn="srgb",Wa="srgb-linear",Xa="linear",It="srgb",ws=7680,wu=519,qf=512,Yf=513,$f=514,Rl=515,Kf=516,Zf=517,Cl=518,Jf=519,ul=35044,Vi=35048,Tu="300 es",ui=2e3,Or=2001;function Qf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function qa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function jf(){const i=qa("canvas");return i.style.display="block",i}const Au={};function Ya(...i){const e="THREE."+i.shift();console.log(e,...i)}function dd(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function nt(...i){i=dd(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function xt(...i){i=dd(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Js(...i){const e=i.join(" ");e in Au||(Au[e]=!0,nt(...i))}function ep(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const tp={[wc]:Tc,[Ac]:Pc,[Rc]:Ic,[nr]:Cc,[Tc]:wc,[Pc]:Ac,[Ic]:Rc,[Cc]:nr};class vs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const dn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ru=1234567;const Pr=Math.PI/180,Br=180/Math.PI;function fi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(dn[i&255]+dn[i>>8&255]+dn[i>>16&255]+dn[i>>24&255]+"-"+dn[e&255]+dn[e>>8&255]+"-"+dn[e>>16&15|64]+dn[e>>24&255]+"-"+dn[t&63|128]+dn[t>>8&255]+"-"+dn[t>>16&255]+dn[t>>24&255]+dn[n&255]+dn[n>>8&255]+dn[n>>16&255]+dn[n>>24&255]).toLowerCase()}function dt(i,e,t){return Math.max(e,Math.min(t,i))}function Pl(i,e){return(i%e+e)%e}function np(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function ip(i,e,t){return i!==e?(t-i)/(e-i):0}function Ir(i,e,t){return(1-t)*i+t*e}function sp(i,e,t,n){return Ir(i,e,1-Math.exp(-t*n))}function rp(i,e=1){return e-Math.abs(Pl(i,e*2)-e)}function ap(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function op(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function cp(i,e){return i+Math.floor(Math.random()*(e-i+1))}function lp(i,e){return i+Math.random()*(e-i)}function up(i){return i*(.5-Math.random())}function hp(i){i!==void 0&&(Ru=i);let e=Ru+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function dp(i){return i*Pr}function fp(i){return i*Br}function pp(i){return(i&i-1)===0&&i!==0}function mp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function gp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function vp(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),u=a((e+n)/2),p=r((e-n)/2),d=a((e-n)/2),h=r((n-e)/2),m=a((n-e)/2);switch(s){case"XYX":i.set(o*u,c*p,c*d,o*l);break;case"YZY":i.set(c*d,o*u,c*p,o*l);break;case"ZXZ":i.set(c*p,c*d,o*u,o*l);break;case"XZX":i.set(o*u,c*m,c*h,o*l);break;case"YXY":i.set(c*h,o*u,c*m,o*l);break;case"ZYZ":i.set(c*m,c*h,o*u,o*l);break;default:nt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Zn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Lt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Qe={DEG2RAD:Pr,RAD2DEG:Br,generateUUID:fi,clamp:dt,euclideanModulo:Pl,mapLinear:np,inverseLerp:ip,lerp:Ir,damp:sp,pingpong:rp,smoothstep:ap,smootherstep:op,randInt:cp,randFloat:lp,randFloatSpread:up,seededRandom:hp,degToRad:dp,radToDeg:fp,isPowerOfTwo:pp,ceilPowerOfTwo:mp,floorPowerOfTwo:gp,setQuaternionFromProperEuler:vp,normalize:Lt,denormalize:Zn},Hl=class Hl{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Hl.prototype.isVector2=!0;let Ee=Hl;class ji{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],p=n[s+3],d=r[a+0],h=r[a+1],m=r[a+2],_=r[a+3];if(p!==_||c!==d||l!==h||u!==m){let g=c*d+l*h+u*m+p*_;g<0&&(d=-d,h=-h,m=-m,_=-_,g=-g);let f=1-o;if(g<.9995){const M=Math.acos(g),b=Math.sin(M);f=Math.sin(f*M)/b,o=Math.sin(o*M)/b,c=c*f+d*o,l=l*f+h*o,u=u*f+m*o,p=p*f+_*o}else{c=c*f+d*o,l=l*f+h*o,u=u*f+m*o,p=p*f+_*o;const M=1/Math.sqrt(c*c+l*l+u*u+p*p);c*=M,l*=M,u*=M,p*=M}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],p=r[a],d=r[a+1],h=r[a+2],m=r[a+3];return e[t]=o*m+u*p+c*h-l*d,e[t+1]=c*m+u*d+l*p-o*h,e[t+2]=l*m+u*h+o*d-c*p,e[t+3]=u*m-o*p-c*d-l*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),p=o(r/2),d=c(n/2),h=c(s/2),m=c(r/2);switch(a){case"XYZ":this._x=d*u*p+l*h*m,this._y=l*h*p-d*u*m,this._z=l*u*m+d*h*p,this._w=l*u*p-d*h*m;break;case"YXZ":this._x=d*u*p+l*h*m,this._y=l*h*p-d*u*m,this._z=l*u*m-d*h*p,this._w=l*u*p+d*h*m;break;case"ZXY":this._x=d*u*p-l*h*m,this._y=l*h*p+d*u*m,this._z=l*u*m+d*h*p,this._w=l*u*p-d*h*m;break;case"ZYX":this._x=d*u*p-l*h*m,this._y=l*h*p+d*u*m,this._z=l*u*m-d*h*p,this._w=l*u*p+d*h*m;break;case"YZX":this._x=d*u*p+l*h*m,this._y=l*h*p+d*u*m,this._z=l*u*m-d*h*p,this._w=l*u*p-d*h*m;break;case"XZY":this._x=d*u*p-l*h*m,this._y=l*h*p-d*u*m,this._z=l*u*m+d*h*p,this._w=l*u*p+d*h*m;break;default:nt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],p=t[10],d=n+o+p;if(d>0){const h=.5/Math.sqrt(d+1);this._w=.25/h,this._x=(u-c)*h,this._y=(r-l)*h,this._z=(a-s)*h}else if(n>o&&n>p){const h=2*Math.sqrt(1+n-o-p);this._w=(u-c)/h,this._x=.25*h,this._y=(s+a)/h,this._z=(r+l)/h}else if(o>p){const h=2*Math.sqrt(1+o-n-p);this._w=(r-l)/h,this._x=(s+a)/h,this._y=.25*h,this._z=(c+u)/h}else{const h=2*Math.sqrt(1+p-n-o);this._w=(a-s)/h,this._x=(r+l)/h,this._y=(c+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(dt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Vl=class Vl{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Cu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Cu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),u=2*(o*t-r*s),p=2*(r*n-a*t);return this.x=t+c*l+a*p-o*u,this.y=n+c*u+o*l-r*p,this.z=s+c*p+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this.z=dt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this.z=dt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Go.copy(this).projectOnVector(e),this.sub(Go)}reflect(e){return this.sub(Go.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Vl.prototype.isVector3=!0;let D=Vl;const Go=new D,Cu=new ji,Wl=class Wl{constructor(e,t,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],p=n[7],d=n[2],h=n[5],m=n[8],_=s[0],g=s[3],f=s[6],M=s[1],b=s[4],x=s[7],w=s[2],S=s[5],E=s[8];return r[0]=a*_+o*M+c*w,r[3]=a*g+o*b+c*S,r[6]=a*f+o*x+c*E,r[1]=l*_+u*M+p*w,r[4]=l*g+u*b+p*S,r[7]=l*f+u*x+p*E,r[2]=d*_+h*M+m*w,r[5]=d*g+h*b+m*S,r[8]=d*f+h*x+m*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],p=u*a-o*l,d=o*c-u*r,h=l*r-a*c,m=t*p+n*d+s*h;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return e[0]=p*_,e[1]=(s*l-u*n)*_,e[2]=(o*n-s*a)*_,e[3]=d*_,e[4]=(u*t-s*c)*_,e[5]=(s*r-o*t)*_,e[6]=h*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Js("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ho.makeScale(e,t)),this}rotate(e){return Js("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ho.makeRotation(-e)),this}translate(e,t){return Js("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ho.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Wl.prototype.isMatrix3=!0;let ct=Wl;const Ho=new ct,Pu=new ct().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Iu=new ct().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function xp(){const i={enabled:!0,workingColorSpace:Wa,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===It&&(s.r=Ri(s.r),s.g=Ri(s.g),s.b=Ri(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===It&&(s.r=Qs(s.r),s.g=Qs(s.g),s.b=Qs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Xi?Xa:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Js("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Js("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Wa]:{primaries:e,whitePoint:n,transfer:Xa,toXYZ:Pu,fromXYZ:Iu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:pn},outputColorSpaceConfig:{drawingBufferColorSpace:pn}},[pn]:{primaries:e,whitePoint:n,transfer:It,toXYZ:Pu,fromXYZ:Iu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:pn}}}),i}const _t=xp();function Ri(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Qs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ts;class _p{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ts===void 0&&(Ts=qa("canvas")),Ts.width=e.width,Ts.height=e.height;const s=Ts.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Ts}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=qa("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ri(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ri(t[n]/255)*255):t[n]=Ri(t[n]);return{data:t,width:e.width,height:e.height}}else return nt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let yp=0;class Il{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:yp++}),this.uuid=fi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Vo(s[a].image)):r.push(Vo(s[a]))}else r=Vo(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Vo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?_p.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(nt("Texture: Unable to serialize Texture."),{})}let Mp=0;const Wo=new D;class vn extends vs{constructor(e=vn.DEFAULT_IMAGE,t=vn.DEFAULT_MAPPING,n=wi,s=wi,r=cn,a=qi,o=jn,c=Un,l=vn.DEFAULT_ANISOTROPY,u=Xi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Mp++}),this.uuid=fi(),this.name="",this.source=new Il(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ee(0,0),this.repeat=new Ee(1,1),this.center=new Ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ct,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Wo).x}get height(){return this.source.getSize(Wo).y}get depth(){return this.source.getSize(Wo).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){nt(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){nt(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==rd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Qi:e.x=e.x-Math.floor(e.x);break;case wi:e.x=e.x<0?0:1;break;case Lc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Qi:e.y=e.y-Math.floor(e.y);break;case wi:e.y=e.y<0?0:1;break;case Lc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}vn.DEFAULT_IMAGE=null;vn.DEFAULT_MAPPING=rd;vn.DEFAULT_ANISOTROPY=1;const Xl=class Xl{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],u=c[4],p=c[8],d=c[1],h=c[5],m=c[9],_=c[2],g=c[6],f=c[10];if(Math.abs(u-d)<.01&&Math.abs(p-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(p+_)<.1&&Math.abs(m+g)<.1&&Math.abs(l+h+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(l+1)/2,x=(h+1)/2,w=(f+1)/2,S=(u+d)/4,E=(p+_)/4,v=(m+g)/4;return b>x&&b>w?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=S/n,r=E/n):x>w?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=S/s,r=v/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=E/r,s=v/r),this.set(n,s,r,t),this}let M=Math.sqrt((g-m)*(g-m)+(p-_)*(p-_)+(d-u)*(d-u));return Math.abs(M)<.001&&(M=1),this.x=(g-m)/M,this.y=(p-_)/M,this.z=(d-u)/M,this.w=Math.acos((l+h+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this.z=dt(this.z,e.z,t.z),this.w=dt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this.z=dt(this.z,e,t),this.w=dt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Xl.prototype.isVector4=!0;let zt=Xl;class Sp extends vs{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:cn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new zt(0,0,e,t),this.scissorTest=!1,this.viewport=new zt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new vn(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:cn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Il(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class pi extends Sp{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class fd extends vn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class bp extends vn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ao=class ao{constructor(e,t,n,s,r,a,o,c,l,u,p,d,h,m,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,u,p,d,h,m,_,g)}set(e,t,n,s,r,a,o,c,l,u,p,d,h,m,_,g){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=u,f[10]=p,f[14]=d,f[3]=h,f[7]=m,f[11]=_,f[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ao().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/As.setFromMatrixColumn(e,0).length(),r=1/As.setFromMatrixColumn(e,1).length(),a=1/As.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),p=Math.sin(r);if(e.order==="XYZ"){const d=a*u,h=a*p,m=o*u,_=o*p;t[0]=c*u,t[4]=-c*p,t[8]=l,t[1]=h+m*l,t[5]=d-_*l,t[9]=-o*c,t[2]=_-d*l,t[6]=m+h*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*u,h=c*p,m=l*u,_=l*p;t[0]=d+_*o,t[4]=m*o-h,t[8]=a*l,t[1]=a*p,t[5]=a*u,t[9]=-o,t[2]=h*o-m,t[6]=_+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*u,h=c*p,m=l*u,_=l*p;t[0]=d-_*o,t[4]=-a*p,t[8]=m+h*o,t[1]=h+m*o,t[5]=a*u,t[9]=_-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*u,h=a*p,m=o*u,_=o*p;t[0]=c*u,t[4]=m*l-h,t[8]=d*l+_,t[1]=c*p,t[5]=_*l+d,t[9]=h*l-m,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,h=a*l,m=o*c,_=o*l;t[0]=c*u,t[4]=_-d*p,t[8]=m*p+h,t[1]=p,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=h*p+m,t[10]=d-_*p}else if(e.order==="XZY"){const d=a*c,h=a*l,m=o*c,_=o*l;t[0]=c*u,t[4]=-p,t[8]=l*u,t[1]=d*p+_,t[5]=a*u,t[9]=h*p-m,t[2]=m*p-h,t[6]=o*u,t[10]=_*p+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ep,e,wp)}lookAt(e,t,n){const s=this.elements;return Pn.subVectors(e,t),Pn.lengthSq()===0&&(Pn.z=1),Pn.normalize(),Oi.crossVectors(n,Pn),Oi.lengthSq()===0&&(Math.abs(n.z)===1?Pn.x+=1e-4:Pn.z+=1e-4,Pn.normalize(),Oi.crossVectors(n,Pn)),Oi.normalize(),Jr.crossVectors(Pn,Oi),s[0]=Oi.x,s[4]=Jr.x,s[8]=Pn.x,s[1]=Oi.y,s[5]=Jr.y,s[9]=Pn.y,s[2]=Oi.z,s[6]=Jr.z,s[10]=Pn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],p=n[5],d=n[9],h=n[13],m=n[2],_=n[6],g=n[10],f=n[14],M=n[3],b=n[7],x=n[11],w=n[15],S=s[0],E=s[4],v=s[8],T=s[12],R=s[1],C=s[5],I=s[9],B=s[13],X=s[2],H=s[6],J=s[10],z=s[14],L=s[3],V=s[7],K=s[11],Z=s[15];return r[0]=a*S+o*R+c*X+l*L,r[4]=a*E+o*C+c*H+l*V,r[8]=a*v+o*I+c*J+l*K,r[12]=a*T+o*B+c*z+l*Z,r[1]=u*S+p*R+d*X+h*L,r[5]=u*E+p*C+d*H+h*V,r[9]=u*v+p*I+d*J+h*K,r[13]=u*T+p*B+d*z+h*Z,r[2]=m*S+_*R+g*X+f*L,r[6]=m*E+_*C+g*H+f*V,r[10]=m*v+_*I+g*J+f*K,r[14]=m*T+_*B+g*z+f*Z,r[3]=M*S+b*R+x*X+w*L,r[7]=M*E+b*C+x*H+w*V,r[11]=M*v+b*I+x*J+w*K,r[15]=M*T+b*B+x*z+w*Z,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],p=e[6],d=e[10],h=e[14],m=e[3],_=e[7],g=e[11],f=e[15],M=c*h-l*d,b=o*h-l*p,x=o*d-c*p,w=a*h-l*u,S=a*d-c*u,E=a*p-o*u;return t*(_*M-g*b+f*x)-n*(m*M-g*w+f*S)+s*(m*b-_*w+f*E)-r*(m*x-_*S+g*E)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],u=e[10];return t*(a*u-o*l)-n*(r*u-o*c)+s*(r*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],p=e[9],d=e[10],h=e[11],m=e[12],_=e[13],g=e[14],f=e[15],M=t*o-n*a,b=t*c-s*a,x=t*l-r*a,w=n*c-s*o,S=n*l-r*o,E=s*l-r*c,v=u*_-p*m,T=u*g-d*m,R=u*f-h*m,C=p*g-d*_,I=p*f-h*_,B=d*f-h*g,X=M*B-b*I+x*C+w*R-S*T+E*v;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const H=1/X;return e[0]=(o*B-c*I+l*C)*H,e[1]=(s*I-n*B-r*C)*H,e[2]=(_*E-g*S+f*w)*H,e[3]=(d*S-p*E-h*w)*H,e[4]=(c*R-a*B-l*T)*H,e[5]=(t*B-s*R+r*T)*H,e[6]=(g*x-m*E-f*b)*H,e[7]=(u*E-d*x+h*b)*H,e[8]=(a*I-o*R+l*v)*H,e[9]=(n*R-t*I-r*v)*H,e[10]=(m*S-_*x+f*M)*H,e[11]=(p*x-u*S-h*M)*H,e[12]=(o*T-a*C-c*v)*H,e[13]=(t*C-n*T+s*v)*H,e[14]=(_*b-m*w-g*M)*H,e[15]=(u*w-p*b+d*M)*H,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,p=o+o,d=r*l,h=r*u,m=r*p,_=a*u,g=a*p,f=o*p,M=c*l,b=c*u,x=c*p,w=n.x,S=n.y,E=n.z;return s[0]=(1-(_+f))*w,s[1]=(h+x)*w,s[2]=(m-b)*w,s[3]=0,s[4]=(h-x)*S,s[5]=(1-(d+f))*S,s[6]=(g+M)*S,s[7]=0,s[8]=(m+b)*E,s[9]=(g-M)*E,s[10]=(1-(d+_))*E,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=As.set(s[0],s[1],s[2]).length();const o=As.set(s[4],s[5],s[6]).length(),c=As.set(s[8],s[9],s[10]).length();r<0&&(a=-a),qn.copy(this);const l=1/a,u=1/o,p=1/c;return qn.elements[0]*=l,qn.elements[1]*=l,qn.elements[2]*=l,qn.elements[4]*=u,qn.elements[5]*=u,qn.elements[6]*=u,qn.elements[8]*=p,qn.elements[9]*=p,qn.elements[10]*=p,t.setFromRotationMatrix(qn),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,s,r,a,o=ui,c=!1){const l=this.elements,u=2*r/(t-e),p=2*r/(n-s),d=(t+e)/(t-e),h=(n+s)/(n-s);let m,_;if(c)m=r/(a-r),_=a*r/(a-r);else if(o===ui)m=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Or)m=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=p,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=ui,c=!1){const l=this.elements,u=2/(t-e),p=2/(n-s),d=-(t+e)/(t-e),h=-(n+s)/(n-s);let m,_;if(c)m=1/(a-r),_=a/(a-r);else if(o===ui)m=-2/(a-r),_=-(a+r)/(a-r);else if(o===Or)m=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=p,l[9]=0,l[13]=h,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};ao.prototype.isMatrix4=!0;let Rt=ao;const As=new D,qn=new Rt,Ep=new D(0,0,0),wp=new D(1,1,1),Oi=new D,Jr=new D,Pn=new D,Lu=new Rt,Nu=new ji;class gi{constructor(e=0,t=0,n=0,s=gi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],p=s[2],d=s[6],h=s[10];switch(t){case"XYZ":this._y=Math.asin(dt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-dt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,h),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(dt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-p,h),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-dt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(d,h),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(dt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(o,h));break;case"XZY":this._z=Math.asin(-dt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,h),this._y=0);break;default:nt("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Lu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Lu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Nu.setFromEuler(this),this.setFromQuaternion(Nu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}gi.DEFAULT_ORDER="XYZ";class pd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Tp=0;const Du=new D,Rs=new ji,_i=new Rt,Qr=new D,fr=new D,Ap=new D,Rp=new ji,Uu=new D(1,0,0),Fu=new D(0,1,0),Ou=new D(0,0,1),Bu={type:"added"},Cp={type:"removed"},Cs={type:"childadded",child:null},Xo={type:"childremoved",child:null};class kt extends vs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Tp++}),this.uuid=fi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=kt.DEFAULT_UP.clone();const e=new D,t=new gi,n=new ji,s=new D(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Rt},normalMatrix:{value:new ct}}),this.matrix=new Rt,this.matrixWorld=new Rt,this.matrixAutoUpdate=kt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new pd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Rs.setFromAxisAngle(e,t),this.quaternion.multiply(Rs),this}rotateOnWorldAxis(e,t){return Rs.setFromAxisAngle(e,t),this.quaternion.premultiply(Rs),this}rotateX(e){return this.rotateOnAxis(Uu,e)}rotateY(e){return this.rotateOnAxis(Fu,e)}rotateZ(e){return this.rotateOnAxis(Ou,e)}translateOnAxis(e,t){return Du.copy(e).applyQuaternion(this.quaternion),this.position.add(Du.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Uu,e)}translateY(e){return this.translateOnAxis(Fu,e)}translateZ(e){return this.translateOnAxis(Ou,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_i.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Qr.copy(e):Qr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),fr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_i.lookAt(fr,Qr,this.up):_i.lookAt(Qr,fr,this.up),this.quaternion.setFromRotationMatrix(_i),s&&(_i.extractRotation(s.matrixWorld),Rs.setFromRotationMatrix(_i),this.quaternion.premultiply(Rs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(xt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Bu),Cs.child=e,this.dispatchEvent(Cs),Cs.child=null):xt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Cp),Xo.child=e,this.dispatchEvent(Xo),Xo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),_i.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_i.multiply(e.parent.matrixWorld)),e.applyMatrix4(_i),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Bu),Cs.child=e,this.dispatchEvent(Cs),Cs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fr,e,Ap),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fr,Rp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const p=c[l];r(e.shapes,p)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),p=a(e.shapes),d=a(e.skeletons),h=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),p.length>0&&(n.shapes=p),d.length>0&&(n.skeletons=d),h.length>0&&(n.animations=h),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}kt.DEFAULT_UP=new D(0,1,0);kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class St extends kt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Pp={type:"move"};class qo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new St,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new St,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new St,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,n),f=this._getHandJoint(l,_);g!==null&&(f.matrix.fromArray(g.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=g.radius),f.visible=g!==null}const u=l.joints["index-finger-tip"],p=l.joints["thumb-tip"],d=u.position.distanceTo(p.position),h=.02,m=.005;l.inputState.pinching&&d>h+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=h-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Pp)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new St;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const md={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Bi={h:0,s:0,l:0},jr={h:0,s:0,l:0};function Yo(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class it{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=pn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,_t.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=_t.workingColorSpace){return this.r=e,this.g=t,this.b=n,_t.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=_t.workingColorSpace){if(e=Pl(e,1),t=dt(t,0,1),n=dt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Yo(a,r,e+1/3),this.g=Yo(a,r,e),this.b=Yo(a,r,e-1/3)}return _t.colorSpaceToWorking(this,s),this}setStyle(e,t=pn){function n(r){r!==void 0&&parseFloat(r)<1&&nt("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:nt("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);nt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=pn){const n=md[e.toLowerCase()];return n!==void 0?this.setHex(n,t):nt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ri(e.r),this.g=Ri(e.g),this.b=Ri(e.b),this}copyLinearToSRGB(e){return this.r=Qs(e.r),this.g=Qs(e.g),this.b=Qs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=pn){return _t.workingToColorSpace(fn.copy(this),e),Math.round(dt(fn.r*255,0,255))*65536+Math.round(dt(fn.g*255,0,255))*256+Math.round(dt(fn.b*255,0,255))}getHexString(e=pn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=_t.workingColorSpace){_t.workingToColorSpace(fn.copy(this),t);const n=fn.r,s=fn.g,r=fn.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const p=a-o;switch(l=u<=.5?p/(a+o):p/(2-a-o),a){case n:c=(s-r)/p+(s<r?6:0);break;case s:c=(r-n)/p+2;break;case r:c=(n-s)/p+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=_t.workingColorSpace){return _t.workingToColorSpace(fn.copy(this),t),e.r=fn.r,e.g=fn.g,e.b=fn.b,e}getStyle(e=pn){_t.workingToColorSpace(fn.copy(this),e);const t=fn.r,n=fn.g,s=fn.b;return e!==pn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Bi),this.setHSL(Bi.h+e,Bi.s+t,Bi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Bi),e.getHSL(jr);const n=Ir(Bi.h,jr.h,t),s=Ir(Bi.s,jr.s,t),r=Ir(Bi.l,jr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const fn=new it;it.NAMES=md;class $o extends kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new gi,this.environmentIntensity=1,this.environmentRotation=new gi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Yn=new D,yi=new D,Ko=new D,Mi=new D,Ps=new D,Is=new D,ku=new D,Zo=new D,Jo=new D,Qo=new D,jo=new zt,ec=new zt,tc=new zt;class Vn{constructor(e=new D,t=new D,n=new D){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Yn.subVectors(e,t),s.cross(Yn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Yn.subVectors(s,t),yi.subVectors(n,t),Ko.subVectors(e,t);const a=Yn.dot(Yn),o=Yn.dot(yi),c=Yn.dot(Ko),l=yi.dot(yi),u=yi.dot(Ko),p=a*l-o*o;if(p===0)return r.set(0,0,0),null;const d=1/p,h=(l*c-o*u)*d,m=(a*u-o*c)*d;return r.set(1-h-m,m,h)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Mi)===null?!1:Mi.x>=0&&Mi.y>=0&&Mi.x+Mi.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,Mi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Mi.x),c.addScaledVector(a,Mi.y),c.addScaledVector(o,Mi.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return jo.setScalar(0),ec.setScalar(0),tc.setScalar(0),jo.fromBufferAttribute(e,t),ec.fromBufferAttribute(e,n),tc.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(jo,r.x),a.addScaledVector(ec,r.y),a.addScaledVector(tc,r.z),a}static isFrontFacing(e,t,n,s){return Yn.subVectors(n,t),yi.subVectors(e,t),Yn.cross(yi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Yn.subVectors(this.c,this.b),yi.subVectors(this.a,this.b),Yn.cross(yi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Vn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Vn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Vn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Vn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Vn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Ps.subVectors(s,n),Is.subVectors(r,n),Zo.subVectors(e,n);const c=Ps.dot(Zo),l=Is.dot(Zo);if(c<=0&&l<=0)return t.copy(n);Jo.subVectors(e,s);const u=Ps.dot(Jo),p=Is.dot(Jo);if(u>=0&&p<=u)return t.copy(s);const d=c*p-u*l;if(d<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(Ps,a);Qo.subVectors(e,r);const h=Ps.dot(Qo),m=Is.dot(Qo);if(m>=0&&h<=m)return t.copy(r);const _=h*l-c*m;if(_<=0&&l>=0&&m<=0)return o=l/(l-m),t.copy(n).addScaledVector(Is,o);const g=u*m-h*p;if(g<=0&&p-u>=0&&h-m>=0)return ku.subVectors(r,s),o=(p-u)/(p-u+(h-m)),t.copy(s).addScaledVector(ku,o);const f=1/(g+_+d);return a=_*f,o=d*f,t.copy(n).addScaledVector(Ps,a).addScaledVector(Is,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class xs{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint($n.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint($n.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=$n.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,$n):$n.fromBufferAttribute(r,a),$n.applyMatrix4(e.matrixWorld),this.expandByPoint($n);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ea.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ea.copy(n.boundingBox)),ea.applyMatrix4(e.matrixWorld),this.union(ea)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,$n),$n.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(pr),ta.subVectors(this.max,pr),Ls.subVectors(e.a,pr),Ns.subVectors(e.b,pr),Ds.subVectors(e.c,pr),ki.subVectors(Ns,Ls),zi.subVectors(Ds,Ns),ns.subVectors(Ls,Ds);let t=[0,-ki.z,ki.y,0,-zi.z,zi.y,0,-ns.z,ns.y,ki.z,0,-ki.x,zi.z,0,-zi.x,ns.z,0,-ns.x,-ki.y,ki.x,0,-zi.y,zi.x,0,-ns.y,ns.x,0];return!nc(t,Ls,Ns,Ds,ta)||(t=[1,0,0,0,1,0,0,0,1],!nc(t,Ls,Ns,Ds,ta))?!1:(na.crossVectors(ki,zi),t=[na.x,na.y,na.z],nc(t,Ls,Ns,Ds,ta))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,$n).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize($n).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Si=[new D,new D,new D,new D,new D,new D,new D,new D],$n=new D,ea=new xs,Ls=new D,Ns=new D,Ds=new D,ki=new D,zi=new D,ns=new D,pr=new D,ta=new D,na=new D,is=new D;function nc(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){is.fromArray(i,r);const o=s.x*Math.abs(is.x)+s.y*Math.abs(is.y)+s.z*Math.abs(is.z),c=e.dot(is),l=t.dot(is),u=n.dot(is);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Zt=new D,ia=new Ee;let Ip=0;class $t extends vs{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ip++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ul,this.updateRanges=[],this.gpuType=Qn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ia.fromBufferAttribute(this,t),ia.applyMatrix3(e),this.setXY(t,ia.x,ia.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyMatrix3(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyMatrix4(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyNormalMatrix(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.transformDirection(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Zn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Lt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Zn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Zn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Zn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Zn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array),s=Lt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array),s=Lt(s,this.array),r=Lt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ul&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class gd extends $t{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class vd extends $t{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class yt extends $t{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Lp=new xs,mr=new D,ic=new D;class _s{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Lp.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;mr.subVectors(e,this.center);const t=mr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(mr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ic.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(mr.copy(e.center).add(ic)),this.expandByPoint(mr.copy(e.center).sub(ic))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Np=0;const On=new Rt,sc=new kt,Us=new D,In=new xs,gr=new xs,sn=new D;class Et extends vs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Np++}),this.uuid=fi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Qf(e)?vd:gd)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ct().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return On.makeRotationFromQuaternion(e),this.applyMatrix4(On),this}rotateX(e){return On.makeRotationX(e),this.applyMatrix4(On),this}rotateY(e){return On.makeRotationY(e),this.applyMatrix4(On),this}rotateZ(e){return On.makeRotationZ(e),this.applyMatrix4(On),this}translate(e,t,n){return On.makeTranslation(e,t,n),this.applyMatrix4(On),this}scale(e,t,n){return On.makeScale(e,t,n),this.applyMatrix4(On),this}lookAt(e){return sc.lookAt(e),sc.updateMatrix(),this.applyMatrix4(sc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Us).negate(),this.translate(Us.x,Us.y,Us.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new yt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&nt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){xt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];In.setFromBufferAttribute(r),this.morphTargetsRelative?(sn.addVectors(this.boundingBox.min,In.min),this.boundingBox.expandByPoint(sn),sn.addVectors(this.boundingBox.max,In.max),this.boundingBox.expandByPoint(sn)):(this.boundingBox.expandByPoint(In.min),this.boundingBox.expandByPoint(In.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&xt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _s);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){xt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){const n=this.boundingSphere.center;if(In.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];gr.setFromBufferAttribute(o),this.morphTargetsRelative?(sn.addVectors(In.min,gr.min),In.expandByPoint(sn),sn.addVectors(In.max,gr.max),In.expandByPoint(sn)):(In.expandByPoint(gr.min),In.expandByPoint(gr.max))}In.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)sn.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(sn));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)sn.fromBufferAttribute(o,l),c&&(Us.fromBufferAttribute(e,l),sn.add(Us)),s=Math.max(s,n.distanceToSquared(sn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&xt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){xt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new $t(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let v=0;v<n.count;v++)o[v]=new D,c[v]=new D;const l=new D,u=new D,p=new D,d=new Ee,h=new Ee,m=new Ee,_=new D,g=new D;function f(v,T,R){l.fromBufferAttribute(n,v),u.fromBufferAttribute(n,T),p.fromBufferAttribute(n,R),d.fromBufferAttribute(r,v),h.fromBufferAttribute(r,T),m.fromBufferAttribute(r,R),u.sub(l),p.sub(l),h.sub(d),m.sub(d);const C=1/(h.x*m.y-m.x*h.y);isFinite(C)&&(_.copy(u).multiplyScalar(m.y).addScaledVector(p,-h.y).multiplyScalar(C),g.copy(p).multiplyScalar(h.x).addScaledVector(u,-m.x).multiplyScalar(C),o[v].add(_),o[T].add(_),o[R].add(_),c[v].add(g),c[T].add(g),c[R].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let v=0,T=M.length;v<T;++v){const R=M[v],C=R.start,I=R.count;for(let B=C,X=C+I;B<X;B+=3)f(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const b=new D,x=new D,w=new D,S=new D;function E(v){w.fromBufferAttribute(s,v),S.copy(w);const T=o[v];b.copy(T),b.sub(w.multiplyScalar(w.dot(T))).normalize(),x.crossVectors(S,T);const C=x.dot(c[v])<0?-1:1;a.setXYZW(v,b.x,b.y,b.z,C)}for(let v=0,T=M.length;v<T;++v){const R=M[v],C=R.start,I=R.count;for(let B=C,X=C+I;B<X;B+=3)E(e.getX(B+0)),E(e.getX(B+1)),E(e.getX(B+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new $t(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,h=n.count;d<h;d++)n.setXYZ(d,0,0,0);const s=new D,r=new D,a=new D,o=new D,c=new D,l=new D,u=new D,p=new D;if(e)for(let d=0,h=e.count;d<h;d+=3){const m=e.getX(d+0),_=e.getX(d+1),g=e.getX(d+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,g),u.subVectors(a,r),p.subVectors(s,r),u.cross(p),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),o.add(u),c.add(u),l.add(u),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,h=t.count;d<h;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,r),p.subVectors(s,r),u.cross(p),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)sn.fromBufferAttribute(e,t),sn.normalize(),e.setXYZ(t,sn.x,sn.y,sn.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,p=o.normalized,d=new l.constructor(c.length*u);let h=0,m=0;for(let _=0,g=c.length;_<g;_++){o.isInterleavedBufferAttribute?h=c[_]*o.data.stride+o.offset:h=c[_]*u;for(let f=0;f<u;f++)d[m++]=l[h++]}return new $t(d,u,p)}if(this.index===null)return nt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Et,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,p=l.length;u<p;u++){const d=l[u],h=e(d,n);c.push(h)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let p=0,d=l.length;p<d;p++){const h=l[p];u.push(h.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],p=r[l];for(let d=0,h=p.length;d<h;d++)u.push(p[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const p=a[l];this.addGroup(p.start,p.count,p.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Dp{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ul,this.updateRanges=[],this.version=0,this.uuid=fi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=fi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=fi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Mn=new D;class $a{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Mn.fromBufferAttribute(this,t),Mn.applyMatrix4(e),this.setXYZ(t,Mn.x,Mn.y,Mn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Mn.fromBufferAttribute(this,t),Mn.applyNormalMatrix(e),this.setXYZ(t,Mn.x,Mn.y,Mn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Mn.fromBufferAttribute(this,t),Mn.transformDirection(e),this.setXYZ(t,Mn.x,Mn.y,Mn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Zn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Lt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Lt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Zn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Zn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Zn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Zn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array),s=Lt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array),s=Lt(s,this.array),r=Lt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Ya("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new $t(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new $a(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ya("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let Up=0;class es extends vs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Up++}),this.uuid=fi(),this.name="",this.type="Material",this.blending=Zs,this.side=Ji,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=bc,this.blendDst=Ec,this.blendEquation=cs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new it(0,0,0),this.blendAlpha=0,this.depthFunc=nr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=wu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ws,this.stencilZFail=ws,this.stencilZPass=ws,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){nt(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){nt(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Zs&&(n.blending=this.blending),this.side!==Ji&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==bc&&(n.blendSrc=this.blendSrc),this.blendDst!==Ec&&(n.blendDst=this.blendDst),this.blendEquation!==cs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==nr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==wu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ws&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ws&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ws&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new it().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ee().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ee().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class xd extends es{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new it(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Fs;const vr=new D,Os=new D,Bs=new D,ks=new Ee,xr=new Ee,_d=new Rt,sa=new D,_r=new D,ra=new D,zu=new Ee,rc=new Ee,Gu=new Ee;class Fp extends kt{constructor(e=new xd){if(super(),this.isSprite=!0,this.type="Sprite",Fs===void 0){Fs=new Et;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Dp(t,5);Fs.setIndex([0,1,2,0,2,3]),Fs.setAttribute("position",new $a(n,3,0,!1)),Fs.setAttribute("uv",new $a(n,2,3,!1))}this.geometry=Fs,this.material=e,this.center=new Ee(.5,.5),this.count=1}raycast(e,t){e.camera===null&&xt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Os.setFromMatrixScale(this.matrixWorld),_d.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Bs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Os.multiplyScalar(-Bs.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;aa(sa.set(-.5,-.5,0),Bs,a,Os,s,r),aa(_r.set(.5,-.5,0),Bs,a,Os,s,r),aa(ra.set(.5,.5,0),Bs,a,Os,s,r),zu.set(0,0),rc.set(1,0),Gu.set(1,1);let o=e.ray.intersectTriangle(sa,_r,ra,!1,vr);if(o===null&&(aa(_r.set(-.5,.5,0),Bs,a,Os,s,r),rc.set(0,1),o=e.ray.intersectTriangle(sa,ra,_r,!1,vr),o===null))return;const c=e.ray.origin.distanceTo(vr);c<e.near||c>e.far||t.push({distance:c,point:vr.clone(),uv:Vn.getInterpolation(vr,sa,_r,ra,zu,rc,Gu,new Ee),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function aa(i,e,t,n,s,r){ks.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(xr.x=r*ks.x-s*ks.y,xr.y=s*ks.x+r*ks.y):xr.copy(ks),i.copy(e),i.x+=xr.x,i.y+=xr.y,i.applyMatrix4(_d)}const bi=new D,ac=new D,oa=new D,Gi=new D,oc=new D,ca=new D,cc=new D;class Ll{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,bi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=bi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(bi.copy(this.origin).addScaledVector(this.direction,t),bi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ac.copy(e).add(t).multiplyScalar(.5),oa.copy(t).sub(e).normalize(),Gi.copy(this.origin).sub(ac);const r=e.distanceTo(t)*.5,a=-this.direction.dot(oa),o=Gi.dot(this.direction),c=-Gi.dot(oa),l=Gi.lengthSq(),u=Math.abs(1-a*a);let p,d,h,m;if(u>0)if(p=a*c-o,d=a*o-c,m=r*u,p>=0)if(d>=-m)if(d<=m){const _=1/u;p*=_,d*=_,h=p*(p+a*d+2*o)+d*(a*p+d+2*c)+l}else d=r,p=Math.max(0,-(a*d+o)),h=-p*p+d*(d+2*c)+l;else d=-r,p=Math.max(0,-(a*d+o)),h=-p*p+d*(d+2*c)+l;else d<=-m?(p=Math.max(0,-(-a*r+o)),d=p>0?-r:Math.min(Math.max(-r,-c),r),h=-p*p+d*(d+2*c)+l):d<=m?(p=0,d=Math.min(Math.max(-r,-c),r),h=d*(d+2*c)+l):(p=Math.max(0,-(a*r+o)),d=p>0?r:Math.min(Math.max(-r,-c),r),h=-p*p+d*(d+2*c)+l);else d=a>0?-r:r,p=Math.max(0,-(a*d+o)),h=-p*p+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(ac).addScaledVector(oa,d),h}intersectSphere(e,t){bi.subVectors(e.center,this.origin);const n=bi.dot(this.direction),s=bi.dot(bi)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,p=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),u>=0?(r=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),p>=0?(o=(e.min.z-d.z)*p,c=(e.max.z-d.z)*p):(o=(e.max.z-d.z)*p,c=(e.min.z-d.z)*p),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,bi)!==null}intersectTriangle(e,t,n,s,r){oc.subVectors(t,e),ca.subVectors(n,e),cc.crossVectors(oc,ca);let a=this.direction.dot(cc),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Gi.subVectors(this.origin,e);const c=o*this.direction.dot(ca.crossVectors(Gi,ca));if(c<0)return null;const l=o*this.direction.dot(oc.cross(Gi));if(l<0||c+l>a)return null;const u=-o*Gi.dot(cc);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class jt extends es{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new it(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gi,this.combine=Qh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Hu=new Rt,ss=new Ll,la=new _s,Vu=new D,ua=new D,ha=new D,da=new D,lc=new D,fa=new D,Wu=new D,pa=new D;class gt extends kt{constructor(e=new Et,t=new jt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){fa.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],p=r[c];u!==0&&(lc.fromBufferAttribute(p,e),a?fa.addScaledVector(lc,u):fa.addScaledVector(lc.sub(t),u))}t.add(fa)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),la.copy(n.boundingSphere),la.applyMatrix4(r),ss.copy(e.ray).recast(e.near),!(la.containsPoint(ss.origin)===!1&&(ss.intersectSphere(la,Vu)===null||ss.origin.distanceToSquared(Vu)>(e.far-e.near)**2))&&(Hu.copy(r).invert(),ss.copy(e.ray).applyMatrix4(Hu),!(n.boundingBox!==null&&ss.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ss)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,p=r.attributes.normal,d=r.groups,h=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=d.length;m<_;m++){const g=d[m],f=a[g.materialIndex],M=Math.max(g.start,h.start),b=Math.min(o.count,Math.min(g.start+g.count,h.start+h.count));for(let x=M,w=b;x<w;x+=3){const S=o.getX(x),E=o.getX(x+1),v=o.getX(x+2);s=ma(this,f,e,n,l,u,p,S,E,v),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const m=Math.max(0,h.start),_=Math.min(o.count,h.start+h.count);for(let g=m,f=_;g<f;g+=3){const M=o.getX(g),b=o.getX(g+1),x=o.getX(g+2);s=ma(this,a,e,n,l,u,p,M,b,x),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let m=0,_=d.length;m<_;m++){const g=d[m],f=a[g.materialIndex],M=Math.max(g.start,h.start),b=Math.min(c.count,Math.min(g.start+g.count,h.start+h.count));for(let x=M,w=b;x<w;x+=3){const S=x,E=x+1,v=x+2;s=ma(this,f,e,n,l,u,p,S,E,v),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const m=Math.max(0,h.start),_=Math.min(c.count,h.start+h.count);for(let g=m,f=_;g<f;g+=3){const M=g,b=g+1,x=g+2;s=ma(this,a,e,n,l,u,p,M,b,x),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}}function Op(i,e,t,n,s,r,a,o){let c;if(e.side===Rn?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===Ji,o),c===null)return null;pa.copy(o),pa.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(pa);return l<t.near||l>t.far?null:{distance:l,point:pa.clone(),object:i}}function ma(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,ua),i.getVertexPosition(c,ha),i.getVertexPosition(l,da);const u=Op(i,e,t,n,ua,ha,da,Wu);if(u){const p=new D;Vn.getBarycoord(Wu,ua,ha,da,p),s&&(u.uv=Vn.getInterpolatedAttribute(s,o,c,l,p,new Ee)),r&&(u.uv1=Vn.getInterpolatedAttribute(r,o,c,l,p,new Ee)),a&&(u.normal=Vn.getInterpolatedAttribute(a,o,c,l,p,new D),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new D,materialIndex:0};Vn.getNormal(ua,ha,da,d.normal),u.face=d,u.barycoord=p}return u}class ys extends vn{constructor(e=null,t=1,n=1,s,r,a,o,c,l=ln,u=ln,p,d){super(null,a,o,c,l,u,s,r,p,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Xu extends $t{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const zs=new Rt,qu=new Rt,ga=[],Yu=new xs,Bp=new Rt,yr=new gt,Mr=new _s;class zn extends gt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Xu(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Bp)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new xs),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,zs),Yu.copy(e.boundingBox).applyMatrix4(zs),this.boundingBox.union(Yu)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new _s),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,zs),Mr.copy(e.boundingSphere).applyMatrix4(zs),this.boundingSphere.union(Mr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(yr.geometry=this.geometry,yr.material=this.material,yr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Mr.copy(this.boundingSphere),Mr.applyMatrix4(n),e.ray.intersectsSphere(Mr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,zs),qu.multiplyMatrices(n,zs),yr.matrixWorld=qu,yr.raycast(e,ga);for(let a=0,o=ga.length;a<o;a++){const c=ga[a];c.instanceId=r,c.object=this,t.push(c)}ga.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Xu(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new ys(new Float32Array(s*this.count),s,this.count,El,Qn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const uc=new D,kp=new D,zp=new ct;class as{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=uc.subVectors(n,t).cross(kp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(uc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||zp.getNormalMatrix(e),s=this.coplanarPoint(uc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const rs=new _s,Gp=new Ee(.5,.5),va=new D;class Nl{constructor(e=new as,t=new as,n=new as,s=new as,r=new as,a=new as){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ui,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],u=r[4],p=r[5],d=r[6],h=r[7],m=r[8],_=r[9],g=r[10],f=r[11],M=r[12],b=r[13],x=r[14],w=r[15];if(s[0].setComponents(l-a,h-u,f-m,w-M).normalize(),s[1].setComponents(l+a,h+u,f+m,w+M).normalize(),s[2].setComponents(l+o,h+p,f+_,w+b).normalize(),s[3].setComponents(l-o,h-p,f-_,w-b).normalize(),n)s[4].setComponents(c,d,g,x).normalize(),s[5].setComponents(l-c,h-d,f-g,w-x).normalize();else if(s[4].setComponents(l-c,h-d,f-g,w-x).normalize(),t===ui)s[5].setComponents(l+c,h+d,f+g,w+x).normalize();else if(t===Or)s[5].setComponents(c,d,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),rs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),rs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(rs)}intersectsSprite(e){rs.center.set(0,0,0);const t=Gp.distanceTo(e.center);return rs.radius=.7071067811865476+t,rs.applyMatrix4(e.matrixWorld),this.intersectsSphere(rs)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(va.x=s.normal.x>0?e.max.x:e.min.x,va.y=s.normal.y>0?e.max.y:e.min.y,va.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(va)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class cr extends es{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new it(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ka=new D,Za=new D,$u=new Rt,Sr=new Ll,xa=new _s,hc=new D,Ku=new D;class Lr extends kt{constructor(e=new Et,t=new cr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Ka.fromBufferAttribute(t,s-1),Za.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Ka.distanceTo(Za);e.setAttribute("lineDistance",new yt(n,1))}else nt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),xa.copy(n.boundingSphere),xa.applyMatrix4(s),xa.radius+=r,e.ray.intersectsSphere(xa)===!1)return;$u.copy(s).invert(),Sr.copy(e.ray).applyMatrix4($u);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){const h=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let _=h,g=m-1;_<g;_+=l){const f=u.getX(_),M=u.getX(_+1),b=_a(this,e,Sr,c,f,M,_);b&&t.push(b)}if(this.isLineLoop){const _=u.getX(m-1),g=u.getX(h),f=_a(this,e,Sr,c,_,g,m-1);f&&t.push(f)}}else{const h=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let _=h,g=m-1;_<g;_+=l){const f=_a(this,e,Sr,c,_,_+1,_);f&&t.push(f)}if(this.isLineLoop){const _=_a(this,e,Sr,c,m-1,h,m-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function _a(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(Ka.fromBufferAttribute(o,s),Za.fromBufferAttribute(o,r),t.distanceSqToSegment(Ka,Za,hc,Ku)>n)return;hc.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(hc);if(!(l<e.near||l>e.far))return{distance:l,point:Ku.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Zu=new D,Ju=new D;class yd extends Lr{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Zu.fromBufferAttribute(t,s),Ju.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Zu.distanceTo(Ju);e.setAttribute("lineDistance",new yt(n,1))}else nt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Hp extends es{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new it(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Qu=new Rt,hl=new Ll,ya=new _s,Ma=new D;class Dl extends kt{constructor(e=new Et,t=new Hp){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ya.copy(n.boundingSphere),ya.applyMatrix4(s),ya.radius+=r,e.ray.intersectsSphere(ya)===!1)return;Qu.copy(s).invert(),hl.copy(e.ray).applyMatrix4(Qu);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,p=n.attributes.position;if(l!==null){const d=Math.max(0,a.start),h=Math.min(l.count,a.start+a.count);for(let m=d,_=h;m<_;m++){const g=l.getX(m);Ma.fromBufferAttribute(p,g),ju(Ma,g,c,s,e,t,this)}}else{const d=Math.max(0,a.start),h=Math.min(p.count,a.start+a.count);for(let m=d,_=h;m<_;m++)Ma.fromBufferAttribute(p,m),ju(Ma,m,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ju(i,e,t,n,s,r,a){const o=hl.distanceSqToPoint(i);if(o<t){const c=new D;hl.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Md extends vn{constructor(e=[],t=ds,n,s,r,a,o,c,l,u){super(e,t,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ja extends vn{constructor(e,t,n,s,r,a,o,c,l){super(e,t,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class sr extends vn{constructor(e,t,n=mi,s,r,a,o=ln,c=ln,l,u=Li,p=1){if(u!==Li&&u!==us)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:p};super(d,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Il(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Vp extends sr{constructor(e,t=mi,n=ds,s,r,a=ln,o=ln,c,l=Li){const u={width:e,height:e,depth:1},p=[u,u,u,u,u,u];super(e,e,t,n,s,r,a,o,c,l),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Sd extends vn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class An extends Et{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],p=[];let d=0,h=0;m("z","y","x",-1,-1,n,t,e,a,r,0),m("z","y","x",1,-1,n,t,-e,a,r,1),m("x","z","y",1,1,e,n,t,s,a,2),m("x","z","y",1,-1,e,n,-t,s,a,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new yt(l,3)),this.setAttribute("normal",new yt(u,3)),this.setAttribute("uv",new yt(p,2));function m(_,g,f,M,b,x,w,S,E,v,T){const R=x/E,C=w/v,I=x/2,B=w/2,X=S/2,H=E+1,J=v+1;let z=0,L=0;const V=new D;for(let K=0;K<J;K++){const Z=K*C-B;for(let N=0;N<H;N++){const Q=N*R-I;V[_]=Q*M,V[g]=Z*b,V[f]=X,l.push(V.x,V.y,V.z),V[_]=0,V[g]=0,V[f]=S>0?1:-1,u.push(V.x,V.y,V.z),p.push(N/E),p.push(1-K/v),z+=1}}for(let K=0;K<v;K++)for(let Z=0;Z<E;Z++){const N=d+Z+H*K,Q=d+Z+H*(K+1),xe=d+(Z+1)+H*(K+1),ce=d+(Z+1)+H*K;c.push(N,Q,ce),c.push(Q,xe,ce),L+=6}o.addGroup(h,L,T),h+=L,d+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new An(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Pt extends Et{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],p=[],d=[],h=[];let m=0;const _=[],g=n/2;let f=0;M(),a===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(u),this.setAttribute("position",new yt(p,3)),this.setAttribute("normal",new yt(d,3)),this.setAttribute("uv",new yt(h,2));function M(){const x=new D,w=new D;let S=0;const E=(t-e)/n;for(let v=0;v<=r;v++){const T=[],R=v/r,C=R*(t-e)+e;for(let I=0;I<=s;I++){const B=I/s,X=B*c+o,H=Math.sin(X),J=Math.cos(X);w.x=C*H,w.y=-R*n+g,w.z=C*J,p.push(w.x,w.y,w.z),x.set(H,E,J).normalize(),d.push(x.x,x.y,x.z),h.push(B,1-R),T.push(m++)}_.push(T)}for(let v=0;v<s;v++)for(let T=0;T<r;T++){const R=_[T][v],C=_[T+1][v],I=_[T+1][v+1],B=_[T][v+1];(e>0||T!==0)&&(u.push(R,C,B),S+=3),(t>0||T!==r-1)&&(u.push(C,I,B),S+=3)}l.addGroup(f,S,0),f+=S}function b(x){const w=m,S=new Ee,E=new D;let v=0;const T=x===!0?e:t,R=x===!0?1:-1;for(let I=1;I<=s;I++)p.push(0,g*R,0),d.push(0,R,0),h.push(.5,.5),m++;const C=m;for(let I=0;I<=s;I++){const X=I/s*c+o,H=Math.cos(X),J=Math.sin(X);E.x=T*J,E.y=g*R,E.z=T*H,p.push(E.x,E.y,E.z),d.push(0,R,0),S.x=H*.5+.5,S.y=J*.5*R+.5,h.push(S.x,S.y),m++}for(let I=0;I<s;I++){const B=w+I,X=C+I;x===!0?u.push(X,X+1,B):u.push(X+1,X,B),v+=3}l.addGroup(f,v,x===!0?1:2),f+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ul extends Pt{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Ul(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class vi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){nt("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);const u=n[s],d=n[s+1]-u,h=(a-u)/d;return(s+h)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),c=t||(a.isVector2?new Ee:new D);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new D,s=[],r=[],a=[],o=new D,c=new Rt;for(let h=0;h<=e;h++){const m=h/e;s[h]=this.getTangentAt(m,new D)}r[0]=new D,a[0]=new D;let l=Number.MAX_VALUE;const u=Math.abs(s[0].x),p=Math.abs(s[0].y),d=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),p<=l&&(l=p,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let h=1;h<=e;h++){if(r[h]=r[h-1].clone(),a[h]=a[h-1].clone(),o.crossVectors(s[h-1],s[h]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(dt(s[h-1].dot(s[h]),-1,1));r[h].applyMatrix4(c.makeRotationAxis(o,m))}a[h].crossVectors(s[h],r[h])}if(t===!0){let h=Math.acos(dt(r[0].dot(r[e]),-1,1));h/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(h=-h);for(let m=1;m<=e;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],h*m)),a[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Fl extends vi{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new Ee){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),p=Math.sin(this.aRotation),d=c-this.aX,h=l-this.aY;c=d*u-h*p+this.aX,l=d*p+h*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Wp extends Fl{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Ol(){let i=0,e=0,t=0,n=0;function s(r,a,o,c){i=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,u,p){let d=(a-r)/l-(o-r)/(l+u)+(o-a)/u,h=(o-a)/u-(c-a)/(u+p)+(c-o)/p;d*=u,h*=u,s(a,o,d,h)},calc:function(r){const a=r*r,o=a*r;return i+e*r+t*a+n*o}}}const eh=new D,th=new D,dc=new Ol,fc=new Ol,pc=new Ol;class Qa extends vi{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new D){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,u;this.closed||o>0?l=s[(o-1)%r]:(th.subVectors(s[0],s[1]).add(s[0]),l=th);const p=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(eh.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=eh),this.curveType==="centripetal"||this.curveType==="chordal"){const h=this.curveType==="chordal"?.5:.25;let m=Math.pow(l.distanceToSquared(p),h),_=Math.pow(p.distanceToSquared(d),h),g=Math.pow(d.distanceToSquared(u),h);_<1e-4&&(_=1),m<1e-4&&(m=_),g<1e-4&&(g=_),dc.initNonuniformCatmullRom(l.x,p.x,d.x,u.x,m,_,g),fc.initNonuniformCatmullRom(l.y,p.y,d.y,u.y,m,_,g),pc.initNonuniformCatmullRom(l.z,p.z,d.z,u.z,m,_,g)}else this.curveType==="catmullrom"&&(dc.initCatmullRom(l.x,p.x,d.x,u.x,this.tension),fc.initCatmullRom(l.y,p.y,d.y,u.y,this.tension),pc.initCatmullRom(l.z,p.z,d.z,u.z,this.tension));return n.set(dc.calc(c),fc.calc(c),pc.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new D().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function nh(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,o=i*i,c=i*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*i+t}function Xp(i,e){const t=1-i;return t*t*e}function qp(i,e){return 2*(1-i)*i*e}function Yp(i,e){return i*i*e}function Nr(i,e,t,n){return Xp(i,e)+qp(i,t)+Yp(i,n)}function $p(i,e){const t=1-i;return t*t*t*e}function Kp(i,e){const t=1-i;return 3*t*t*i*e}function Zp(i,e){return 3*(1-i)*i*i*e}function Jp(i,e){return i*i*i*e}function Dr(i,e,t,n,s){return $p(i,e)+Kp(i,t)+Zp(i,n)+Jp(i,s)}class bd extends vi{constructor(e=new Ee,t=new Ee,n=new Ee,s=new Ee){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new Ee){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Dr(e,s.x,r.x,a.x,o.x),Dr(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ed extends vi{constructor(e=new D,t=new D,n=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new D){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Dr(e,s.x,r.x,a.x,o.x),Dr(e,s.y,r.y,a.y,o.y),Dr(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class wd extends vi{constructor(e=new Ee,t=new Ee){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Ee){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Ee){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Qp extends vi{constructor(e=new D,t=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new D){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new D){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Td extends vi{constructor(e=new Ee,t=new Ee,n=new Ee){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Ee){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Nr(e,s.x,r.x,a.x),Nr(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ad extends vi{constructor(e=new D,t=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new D){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Nr(e,s.x,r.x,a.x),Nr(e,s.y,r.y,a.y),Nr(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class co extends vi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Ee){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],u=s[a>s.length-2?s.length-1:a+1],p=s[a>s.length-3?s.length-1:a+2];return n.set(nh(o,c.x,l.x,u.x,p.x),nh(o,c.y,l.y,u.y,p.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new Ee().fromArray(s))}return this}}var ja=Object.freeze({__proto__:null,ArcCurve:Wp,CatmullRomCurve3:Qa,CubicBezierCurve:bd,CubicBezierCurve3:Ed,EllipseCurve:Fl,LineCurve:wd,LineCurve3:Qp,QuadraticBezierCurve:Td,QuadraticBezierCurve3:Ad,SplineCurve:co});class jp extends vi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ja[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new ja[s.type]().fromJSON(s))}return this}}class mn extends jp{constructor(e){super(),this.type="Path",this.currentPoint=new Ee,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new wd(this.currentPoint.clone(),new Ee(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new Td(this.currentPoint.clone(),new Ee(e,t),new Ee(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){const o=new bd(this.currentPoint.clone(),new Ee(e,t),new Ee(n,s),new Ee(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new co(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,s,r,a,o,c),this}absellipse(e,t,n,s,r,a,o,c){const l=new Fl(e,t,n,s,r,a,o,c);if(this.curves.length>0){const p=l.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class an extends mn{constructor(e){super(e),this.uuid=fi(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new mn().fromJSON(s))}return this}}function em(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=Rd(i,0,s,t,!0);const a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(n&&(r=rm(i,e,r,t)),i.length>80*t){o=i[0],c=i[1];let u=o,p=c;for(let d=t;d<s;d+=t){const h=i[d],m=i[d+1];h<o&&(o=h),m<c&&(c=m),h>u&&(u=h),m>p&&(p=m)}l=Math.max(u-o,p-c),l=l!==0?32767/l:0}return kr(r,a,t,o,c,l,0),a}function Rd(i,e,t,n,s){let r;if(s===gm(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=ih(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=ih(a/n|0,i[a],i[a+1],r);return r&&rr(r,r.next)&&(Gr(r),r=r.next),r}function ps(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(rr(t,t.next)||Gt(t.prev,t,t.next)===0)){if(Gr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function kr(i,e,t,n,s,r,a){if(!i)return;!a&&r&&um(i,n,s,r);let o=i;for(;i.prev!==i.next;){const c=i.prev,l=i.next;if(r?nm(i,n,s,r):tm(i)){e.push(c.i,i.i,l.i),Gr(i),i=l.next,o=l.next;continue}if(i=l,i===o){a?a===1?(i=im(ps(i),e),kr(i,e,t,n,s,r,2)):a===2&&sm(i,e,t,n,s,r):kr(ps(i),e,t,n,s,r,1);break}}}function tm(i){const e=i.prev,t=i,n=i.next;if(Gt(e,t,n)>=0)return!1;const s=e.x,r=t.x,a=n.x,o=e.y,c=t.y,l=n.y,u=Math.min(s,r,a),p=Math.min(o,c,l),d=Math.max(s,r,a),h=Math.max(o,c,l);let m=n.next;for(;m!==e;){if(m.x>=u&&m.x<=d&&m.y>=p&&m.y<=h&&Rr(s,o,r,c,a,l,m.x,m.y)&&Gt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function nm(i,e,t,n){const s=i.prev,r=i,a=i.next;if(Gt(s,r,a)>=0)return!1;const o=s.x,c=r.x,l=a.x,u=s.y,p=r.y,d=a.y,h=Math.min(o,c,l),m=Math.min(u,p,d),_=Math.max(o,c,l),g=Math.max(u,p,d),f=dl(h,m,e,t,n),M=dl(_,g,e,t,n);let b=i.prevZ,x=i.nextZ;for(;b&&b.z>=f&&x&&x.z<=M;){if(b.x>=h&&b.x<=_&&b.y>=m&&b.y<=g&&b!==s&&b!==a&&Rr(o,u,c,p,l,d,b.x,b.y)&&Gt(b.prev,b,b.next)>=0||(b=b.prevZ,x.x>=h&&x.x<=_&&x.y>=m&&x.y<=g&&x!==s&&x!==a&&Rr(o,u,c,p,l,d,x.x,x.y)&&Gt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;b&&b.z>=f;){if(b.x>=h&&b.x<=_&&b.y>=m&&b.y<=g&&b!==s&&b!==a&&Rr(o,u,c,p,l,d,b.x,b.y)&&Gt(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;x&&x.z<=M;){if(x.x>=h&&x.x<=_&&x.y>=m&&x.y<=g&&x!==s&&x!==a&&Rr(o,u,c,p,l,d,x.x,x.y)&&Gt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function im(i,e){let t=i;do{const n=t.prev,s=t.next.next;!rr(n,s)&&Pd(n,t,t.next,s)&&zr(n,s)&&zr(s,n)&&(e.push(n.i,t.i,s.i),Gr(t),Gr(t.next),t=i=s),t=t.next}while(t!==i);return ps(t)}function sm(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&fm(a,o)){let c=Id(a,o);a=ps(a,a.next),c=ps(c,c.next),kr(a,e,t,n,s,r,0),kr(c,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function rm(i,e,t,n){const s=[];for(let r=0,a=e.length;r<a;r++){const o=e[r]*n,c=r<a-1?e[r+1]*n:i.length,l=Rd(i,o,c,n,!1);l===l.next&&(l.steiner=!0),s.push(dm(l))}s.sort(am);for(let r=0;r<s.length;r++)t=om(s[r],t);return t}function am(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function om(i,e){const t=cm(i,e);if(!t)return e;const n=Id(t,i);return ps(n,n.next),ps(t,t.next)}function cm(i,e){let t=e;const n=i.x,s=i.y;let r=-1/0,a;if(rr(i,t))return t;do{if(rr(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const p=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(p<=n&&p>r&&(r=p,a=t.x<t.next.x?t:t.next,p===n))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,c=a.x,l=a.y;let u=1/0;t=a;do{if(n>=t.x&&t.x>=c&&n!==t.x&&Cd(s<l?n:r,s,c,l,s<l?r:n,s,t.x,t.y)){const p=Math.abs(s-t.y)/(n-t.x);zr(t,i)&&(p<u||p===u&&(t.x>a.x||t.x===a.x&&lm(a,t)))&&(a=t,u=p)}t=t.next}while(t!==o);return a}function lm(i,e){return Gt(i.prev,i,e.prev)<0&&Gt(e.next,i,i.next)<0}function um(i,e,t,n){let s=i;do s.z===0&&(s.z=dl(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,hm(s)}function hm(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,!!a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function dl(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function dm(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Cd(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function Rr(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&Cd(i,e,t,n,s,r,a,o)}function fm(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!pm(i,e)&&(zr(i,e)&&zr(e,i)&&mm(i,e)&&(Gt(i.prev,i,e.prev)||Gt(i,e.prev,e))||rr(i,e)&&Gt(i.prev,i,i.next)>0&&Gt(e.prev,e,e.next)>0)}function Gt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function rr(i,e){return i.x===e.x&&i.y===e.y}function Pd(i,e,t,n){const s=ba(Gt(i,e,t)),r=ba(Gt(i,e,n)),a=ba(Gt(t,n,i)),o=ba(Gt(t,n,e));return!!(s!==r&&a!==o||s===0&&Sa(i,t,e)||r===0&&Sa(i,n,e)||a===0&&Sa(t,i,n)||o===0&&Sa(t,e,n))}function Sa(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function ba(i){return i>0?1:i<0?-1:0}function pm(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Pd(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function zr(i,e){return Gt(i.prev,i,i.next)<0?Gt(i,e,i.next)>=0&&Gt(i,i.prev,e)>=0:Gt(i,e,i.prev)<0||Gt(i,i.next,e)<0}function mm(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Id(i,e){const t=fl(i.i,i.x,i.y),n=fl(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function ih(i,e,t,n){const s=fl(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Gr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function fl(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function gm(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class vm{static triangulate(e,t,n=2){return em(e,t,n)}}class Ti{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return Ti.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];sh(e),rh(n,e);let a=e.length;t.forEach(sh);for(let c=0;c<t.length;c++)s.push(a),a+=t[c].length,rh(n,t[c]);const o=vm.triangulate(n,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}}function sh(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function rh(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Wn extends Et{constructor(e=new an([new Ee(.5,.5),new Ee(-.5,.5),new Ee(-.5,-.5),new Ee(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let o=0,c=e.length;o<c;o++){const l=e[o];a(l)}this.setAttribute("position",new yt(s,3)),this.setAttribute("uv",new yt(r,2)),this.computeVertexNormals();function a(o){const c=[],l=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,p=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,h=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:h-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const f=t.extrudePath,M=t.UVGenerator!==void 0?t.UVGenerator:xm;let b,x=!1,w,S,E,v;if(f){b=f.getSpacedPoints(u),x=!0,d=!1;const ve=f.isCatmullRomCurve3?f.closed:!1;w=f.computeFrenetFrames(u,ve),S=new D,E=new D,v=new D}d||(g=0,h=0,m=0,_=0);const T=o.extractPoints(l);let R=T.shape;const C=T.holes;if(!Ti.isClockWise(R)){R=R.reverse();for(let ve=0,ue=C.length;ve<ue;ve++){const ge=C[ve];Ti.isClockWise(ge)&&(C[ve]=ge.reverse())}}function B(ve){const ge=10000000000000001e-36;let Le=ve[0];for(let U=1;U<=ve.length;U++){const k=U%ve.length,ie=ve[k],Te=ie.x-Le.x,Ne=ie.y-Le.y,O=Te*Te+Ne*Ne,st=Math.max(Math.abs(ie.x),Math.abs(ie.y),Math.abs(Le.x),Math.abs(Le.y)),Ye=ge*st*st;if(O<=Ye){ve.splice(k,1),U--;continue}Le=ie}}B(R),C.forEach(B);const X=C.length,H=R;for(let ve=0;ve<X;ve++){const ue=C[ve];R=R.concat(ue)}function J(ve,ue,ge){return ue||xt("ExtrudeGeometry: vec does not exist"),ve.clone().addScaledVector(ue,ge)}const z=R.length;function L(ve,ue,ge){let Le,U,k;const ie=ve.x-ue.x,Te=ve.y-ue.y,Ne=ge.x-ve.x,O=ge.y-ve.y,st=ie*ie+Te*Te,Ye=ie*O-Te*Ne;if(Math.abs(Ye)>Number.EPSILON){const P=Math.sqrt(st),y=Math.sqrt(Ne*Ne+O*O),q=ue.x-Te/P,ee=ue.y+ie/P,pe=ge.x-O/y,ye=ge.y+Ne/y,Me=((pe-q)*O-(ye-ee)*Ne)/(ie*O-Te*Ne);Le=q+ie*Me-ve.x,U=ee+Te*Me-ve.y;const re=Le*Le+U*U;if(re<=2)return new Ee(Le,U);k=Math.sqrt(re/2)}else{let P=!1;ie>Number.EPSILON?Ne>Number.EPSILON&&(P=!0):ie<-Number.EPSILON?Ne<-Number.EPSILON&&(P=!0):Math.sign(Te)===Math.sign(O)&&(P=!0),P?(Le=-Te,U=ie,k=Math.sqrt(st)):(Le=ie,U=Te,k=Math.sqrt(st/2))}return new Ee(Le/k,U/k)}const V=[];for(let ve=0,ue=H.length,ge=ue-1,Le=ve+1;ve<ue;ve++,ge++,Le++)ge===ue&&(ge=0),Le===ue&&(Le=0),V[ve]=L(H[ve],H[ge],H[Le]);const K=[];let Z,N=V.concat();for(let ve=0,ue=X;ve<ue;ve++){const ge=C[ve];Z=[];for(let Le=0,U=ge.length,k=U-1,ie=Le+1;Le<U;Le++,k++,ie++)k===U&&(k=0),ie===U&&(ie=0),Z[Le]=L(ge[Le],ge[k],ge[ie]);K.push(Z),N=N.concat(Z)}let Q;if(g===0)Q=Ti.triangulateShape(H,C);else{const ve=[],ue=[];for(let ge=0;ge<g;ge++){const Le=ge/g,U=h*Math.cos(Le*Math.PI/2),k=m*Math.sin(Le*Math.PI/2)+_;for(let ie=0,Te=H.length;ie<Te;ie++){const Ne=J(H[ie],V[ie],k);de(Ne.x,Ne.y,-U),Le===0&&ve.push(Ne)}for(let ie=0,Te=X;ie<Te;ie++){const Ne=C[ie];Z=K[ie];const O=[];for(let st=0,Ye=Ne.length;st<Ye;st++){const P=J(Ne[st],Z[st],k);de(P.x,P.y,-U),Le===0&&O.push(P)}Le===0&&ue.push(O)}}Q=Ti.triangulateShape(ve,ue)}const xe=Q.length,ce=m+_;for(let ve=0;ve<z;ve++){const ue=d?J(R[ve],N[ve],ce):R[ve];x?(E.copy(w.normals[0]).multiplyScalar(ue.x),S.copy(w.binormals[0]).multiplyScalar(ue.y),v.copy(b[0]).add(E).add(S),de(v.x,v.y,v.z)):de(ue.x,ue.y,0)}for(let ve=1;ve<=u;ve++)for(let ue=0;ue<z;ue++){const ge=d?J(R[ue],N[ue],ce):R[ue];x?(E.copy(w.normals[ve]).multiplyScalar(ge.x),S.copy(w.binormals[ve]).multiplyScalar(ge.y),v.copy(b[ve]).add(E).add(S),de(v.x,v.y,v.z)):de(ge.x,ge.y,p/u*ve)}for(let ve=g-1;ve>=0;ve--){const ue=ve/g,ge=h*Math.cos(ue*Math.PI/2),Le=m*Math.sin(ue*Math.PI/2)+_;for(let U=0,k=H.length;U<k;U++){const ie=J(H[U],V[U],Le);de(ie.x,ie.y,p+ge)}for(let U=0,k=C.length;U<k;U++){const ie=C[U];Z=K[U];for(let Te=0,Ne=ie.length;Te<Ne;Te++){const O=J(ie[Te],Z[Te],Le);x?de(O.x,O.y+b[u-1].y,b[u-1].x+ge):de(O.x,O.y,p+ge)}}}W(),j();function W(){const ve=s.length/3;if(d){let ue=0,ge=z*ue;for(let Le=0;Le<xe;Le++){const U=Q[Le];me(U[2]+ge,U[1]+ge,U[0]+ge)}ue=u+g*2,ge=z*ue;for(let Le=0;Le<xe;Le++){const U=Q[Le];me(U[0]+ge,U[1]+ge,U[2]+ge)}}else{for(let ue=0;ue<xe;ue++){const ge=Q[ue];me(ge[2],ge[1],ge[0])}for(let ue=0;ue<xe;ue++){const ge=Q[ue];me(ge[0]+z*u,ge[1]+z*u,ge[2]+z*u)}}n.addGroup(ve,s.length/3-ve,0)}function j(){const ve=s.length/3;let ue=0;ne(H,ue),ue+=H.length;for(let ge=0,Le=C.length;ge<Le;ge++){const U=C[ge];ne(U,ue),ue+=U.length}n.addGroup(ve,s.length/3-ve,1)}function ne(ve,ue){let ge=ve.length;for(;--ge>=0;){const Le=ge;let U=ge-1;U<0&&(U=ve.length-1);for(let k=0,ie=u+g*2;k<ie;k++){const Te=z*k,Ne=z*(k+1),O=ue+Le+Te,st=ue+U+Te,Ye=ue+U+Ne,P=ue+Le+Ne;Ae(O,st,Ye,P)}}}function de(ve,ue,ge){c.push(ve),c.push(ue),c.push(ge)}function me(ve,ue,ge){He(ve),He(ue),He(ge);const Le=s.length/3,U=M.generateTopUV(n,s,Le-3,Le-2,Le-1);Oe(U[0]),Oe(U[1]),Oe(U[2])}function Ae(ve,ue,ge,Le){He(ve),He(ue),He(Le),He(ue),He(ge),He(Le);const U=s.length/3,k=M.generateSideWallUV(n,s,U-6,U-3,U-2,U-1);Oe(k[0]),Oe(k[1]),Oe(k[3]),Oe(k[1]),Oe(k[2]),Oe(k[3])}function He(ve){s.push(c[ve*3+0]),s.push(c[ve*3+1]),s.push(c[ve*3+2])}function Oe(ve){r.push(ve.x),r.push(ve.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return _m(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,a=e.shapes.length;r<a;r++){const o=t[e.shapes[r]];n.push(o)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new ja[s.type]().fromJSON(s)),new Wn(n,e.options)}}const xm={generateTopUV:function(i,e,t,n,s){const r=e[t*3],a=e[t*3+1],o=e[n*3],c=e[n*3+1],l=e[s*3],u=e[s*3+1];return[new Ee(r,a),new Ee(o,c),new Ee(l,u)]},generateSideWallUV:function(i,e,t,n,s,r){const a=e[t*3],o=e[t*3+1],c=e[t*3+2],l=e[n*3],u=e[n*3+1],p=e[n*3+2],d=e[s*3],h=e[s*3+1],m=e[s*3+2],_=e[r*3],g=e[r*3+1],f=e[r*3+2];return Math.abs(o-u)<Math.abs(a-l)?[new Ee(a,1-c),new Ee(l,1-p),new Ee(d,1-m),new Ee(_,1-f)]:[new Ee(o,1-c),new Ee(u,1-p),new Ee(h,1-m),new Ee(g,1-f)]}};function _m(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class lo extends Et{constructor(e=[new Ee(0,-.5),new Ee(.5,0),new Ee(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=dt(s,0,Math.PI*2);const r=[],a=[],o=[],c=[],l=[],u=1/t,p=new D,d=new Ee,h=new D,m=new D,_=new D;let g=0,f=0;for(let M=0;M<=e.length-1;M++)switch(M){case 0:g=e[M+1].x-e[M].x,f=e[M+1].y-e[M].y,h.x=f*1,h.y=-g,h.z=f*0,_.copy(h),h.normalize(),c.push(h.x,h.y,h.z);break;case e.length-1:c.push(_.x,_.y,_.z);break;default:g=e[M+1].x-e[M].x,f=e[M+1].y-e[M].y,h.x=f*1,h.y=-g,h.z=f*0,m.copy(h),h.x+=_.x,h.y+=_.y,h.z+=_.z,h.normalize(),c.push(h.x,h.y,h.z),_.copy(m)}for(let M=0;M<=t;M++){const b=n+M*u*s,x=Math.sin(b),w=Math.cos(b);for(let S=0;S<=e.length-1;S++){p.x=e[S].x*x,p.y=e[S].y,p.z=e[S].x*w,a.push(p.x,p.y,p.z),d.x=M/t,d.y=S/(e.length-1),o.push(d.x,d.y);const E=c[3*S+0]*x,v=c[3*S+1],T=c[3*S+0]*w;l.push(E,v,T)}}for(let M=0;M<t;M++)for(let b=0;b<e.length-1;b++){const x=b+M*e.length,w=x,S=x+e.length,E=x+e.length+1,v=x+1;r.push(w,S,v),r.push(E,v,S)}this.setIndex(r),this.setAttribute("position",new yt(a,3)),this.setAttribute("uv",new yt(o,2)),this.setAttribute("normal",new yt(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new lo(e.points,e.segments,e.phiStart,e.phiLength)}}class Xn extends Et{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,p=e/o,d=t/c,h=[],m=[],_=[],g=[];for(let f=0;f<u;f++){const M=f*d-a;for(let b=0;b<l;b++){const x=b*p-r;m.push(x,-M,0),_.push(0,0,1),g.push(b/o),g.push(1-f/c)}}for(let f=0;f<c;f++)for(let M=0;M<o;M++){const b=M+l*f,x=M+l*(f+1),w=M+1+l*(f+1),S=M+1+l*f;h.push(b,x,S),h.push(x,w,S)}this.setIndex(h),this.setAttribute("position",new yt(m,3)),this.setAttribute("normal",new yt(_,3)),this.setAttribute("uv",new yt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xn(e.width,e.height,e.widthSegments,e.heightSegments)}}class Bl extends Et{constructor(e=new an([new Ee(0,.5),new Ee(-.5,-.5),new Ee(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],s=[],r=[],a=[];let o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let u=0;u<e.length;u++)l(e[u]),this.addGroup(o,c,u),o+=c,c=0;this.setIndex(n),this.setAttribute("position",new yt(s,3)),this.setAttribute("normal",new yt(r,3)),this.setAttribute("uv",new yt(a,2));function l(u){const p=s.length/3,d=u.extractPoints(t);let h=d.shape;const m=d.holes;Ti.isClockWise(h)===!1&&(h=h.reverse());for(let g=0,f=m.length;g<f;g++){const M=m[g];Ti.isClockWise(M)===!0&&(m[g]=M.reverse())}const _=Ti.triangulateShape(h,m);for(let g=0,f=m.length;g<f;g++){const M=m[g];h=h.concat(M)}for(let g=0,f=h.length;g<f;g++){const M=h[g];s.push(M.x,M.y,0),r.push(0,0,1),a.push(M.x,M.y)}for(let g=0,f=_.length;g<f;g++){const M=_[g],b=M[0]+p,x=M[1]+p,w=M[2]+p;n.push(b,x,w),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return ym(t,e)}static fromJSON(e,t){const n=[];for(let s=0,r=e.shapes.length;s<r;s++){const a=t[e.shapes[s]];n.push(a)}return new Bl(n,e.curveSegments)}}function ym(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){const s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}class Ci extends Et{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const u=[],p=new D,d=new D,h=[],m=[],_=[],g=[];for(let f=0;f<=n;f++){const M=[],b=f/n,x=a+b*o,w=e*Math.cos(x),S=Math.sqrt(e*e-w*w);let E=0;f===0&&a===0?E=.5/t:f===n&&c===Math.PI&&(E=-.5/t);for(let v=0;v<=t;v++){const T=v/t,R=s+T*r;p.x=-S*Math.cos(R),p.y=w,p.z=S*Math.sin(R),m.push(p.x,p.y,p.z),d.copy(p).normalize(),_.push(d.x,d.y,d.z),g.push(T+E,1-b),M.push(l++)}u.push(M)}for(let f=0;f<n;f++)for(let M=0;M<t;M++){const b=u[f][M+1],x=u[f][M],w=u[f+1][M],S=u[f+1][M+1];(f!==0||a>0)&&h.push(b,x,S),(f!==n-1||c<Math.PI)&&h.push(x,w,S)}this.setIndex(h),this.setAttribute("position",new yt(m,3)),this.setAttribute("normal",new yt(_,3)),this.setAttribute("uv",new yt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ci(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ms extends Et{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);const c=[],l=[],u=[],p=[],d=new D,h=new D,m=new D;for(let _=0;_<=n;_++){const g=a+_/n*o;for(let f=0;f<=s;f++){const M=f/s*r;h.x=(e+t*Math.cos(g))*Math.cos(M),h.y=(e+t*Math.cos(g))*Math.sin(M),h.z=t*Math.sin(g),l.push(h.x,h.y,h.z),d.x=e*Math.cos(M),d.y=e*Math.sin(M),m.subVectors(h,d).normalize(),u.push(m.x,m.y,m.z),p.push(f/s),p.push(_/n)}}for(let _=1;_<=n;_++)for(let g=1;g<=s;g++){const f=(s+1)*_+g-1,M=(s+1)*(_-1)+g-1,b=(s+1)*(_-1)+g,x=(s+1)*_+g;c.push(f,M,x),c.push(M,b,x)}this.setIndex(c),this.setAttribute("position",new yt(l,3)),this.setAttribute("normal",new yt(u,3)),this.setAttribute("uv",new yt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ms(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Hr extends Et{constructor(e=new Ad(new D(-1,-1,0),new D(-1,1,0),new D(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new D,c=new D,l=new Ee;let u=new D;const p=[],d=[],h=[],m=[];_(),this.setIndex(m),this.setAttribute("position",new yt(p,3)),this.setAttribute("normal",new yt(d,3)),this.setAttribute("uv",new yt(h,2));function _(){for(let b=0;b<t;b++)g(b);g(r===!1?t:0),M(),f()}function g(b){u=e.getPointAt(b/t,u);const x=a.normals[b],w=a.binormals[b];for(let S=0;S<=s;S++){const E=S/s*Math.PI*2,v=Math.sin(E),T=-Math.cos(E);c.x=T*x.x+v*w.x,c.y=T*x.y+v*w.y,c.z=T*x.z+v*w.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=u.x+n*c.x,o.y=u.y+n*c.y,o.z=u.z+n*c.z,p.push(o.x,o.y,o.z)}}function f(){for(let b=1;b<=t;b++)for(let x=1;x<=s;x++){const w=(s+1)*(b-1)+(x-1),S=(s+1)*b+(x-1),E=(s+1)*b+x,v=(s+1)*(b-1)+x;m.push(w,S,v),m.push(S,E,v)}}function M(){for(let b=0;b<=t;b++)for(let x=0;x<=s;x++)l.x=b/t,l.y=x/s,h.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Hr(new ja[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}function ar(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(ah(s))s.isRenderTargetTexture?(nt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(ah(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function wn(i){const e={};for(let t=0;t<i.length;t++){const n=ar(i[t]);for(const s in n)e[s]=n[s]}return e}function ah(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Mm(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Ld(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:_t.workingColorSpace}const Sm={clone:ar,merge:wn};var bm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Em=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class xn extends es{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=bm,this.fragmentShader=Em,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ar(e.uniforms),this.uniformsGroups=Mm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new it().setHex(s.value);break;case"v2":this.uniforms[n].value=new Ee().fromArray(s.value);break;case"v3":this.uniforms[n].value=new D().fromArray(s.value);break;case"v4":this.uniforms[n].value=new zt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new ct().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Rt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class wm extends xn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Tt extends es{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new it(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new it(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ll,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Nn extends Tt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ee(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return dt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new it(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new it(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new it(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Tm extends es{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Wf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Am extends es{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Rm extends cr{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class kl extends kt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new it(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Cm extends kl{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new it(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const mc=new Rt,oh=new D,ch=new D;class Nd{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ee(512,512),this.mapType=Un,this.map=null,this.mapPass=null,this.matrix=new Rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Nl,this._frameExtents=new Ee(1,1),this._viewportCount=1,this._viewports=[new zt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;oh.setFromMatrixPosition(e.matrixWorld),t.position.copy(oh),ch.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ch),t.updateMatrixWorld(),mc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(mc,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Or||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(mc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Ea=new D,wa=new ji,ii=new D;class Dd extends kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Rt,this.projectionMatrix=new Rt,this.projectionMatrixInverse=new Rt,this.coordinateSystem=ui,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ea,wa,ii),ii.x===1&&ii.y===1&&ii.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ea,wa,ii.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ea,wa,ii),ii.x===1&&ii.y===1&&ii.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ea,wa,ii.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Hi=new D,lh=new Ee,uh=new Ee;class Dn extends Dd{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Br*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Pr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Br*2*Math.atan(Math.tan(Pr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Hi.x,Hi.y).multiplyScalar(-e/Hi.z),Hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Hi.x,Hi.y).multiplyScalar(-e/Hi.z)}getViewSize(e,t){return this.getViewBounds(e,lh,uh),t.subVectors(uh,lh)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Pr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Pm extends Nd{constructor(){super(new Dn(90,1,.5,500)),this.isPointLightShadow=!0}}class Im extends kl{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Pm}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class uo extends Dd{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Lm extends Nd{constructor(){super(new uo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Nm extends kl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.target=new kt,this.shadow=new Lm}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const Gs=-90,Hs=1;class Dm extends kt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Dn(Gs,Hs,e,t);s.layers=this.layers,this.add(s);const r=new Dn(Gs,Hs,e,t);r.layers=this.layers,this.add(r);const a=new Dn(Gs,Hs,e,t);a.layers=this.layers,this.add(a);const o=new Dn(Gs,Hs,e,t);o.layers=this.layers,this.add(o);const c=new Dn(Gs,Hs,e,t);c.layers=this.layers,this.add(c);const l=new Dn(Gs,Hs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===ui)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Or)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,p=e.getRenderTarget(),d=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(p,d,h),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Um extends Dn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const ql=class ql{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};ql.prototype.isMatrix2=!0;let hh=ql;function dh(i,e,t,n){const s=Fm(n);switch(t){case ud:return i*e;case El:return i*e/s.components*s.byteLength;case wl:return i*e/s.components*s.byteLength;case fs:return i*e*2/s.components*s.byteLength;case Tl:return i*e*2/s.components*s.byteLength;case hd:return i*e*3/s.components*s.byteLength;case jn:return i*e*4/s.components*s.byteLength;case Al:return i*e*4/s.components*s.byteLength;case La:case Na:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Da:case Ua:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Dc:case Fc:return Math.max(i,16)*Math.max(e,8)/4;case Nc:case Uc:return Math.max(i,8)*Math.max(e,8)/2;case Oc:case Bc:case zc:case Gc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case kc:case Ha:case Hc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Vc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Wc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Xc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case qc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Yc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case $c:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Kc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Zc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Jc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Qc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case jc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case el:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case tl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case nl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case il:case sl:case rl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case al:case ol:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Va:case cl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Fm(i){switch(i){case Un:case ad:return{byteLength:1,components:1};case Ur:case od:case Ii:return{byteLength:2,components:1};case Sl:case bl:return{byteLength:2,components:4};case mi:case Ml:case Qn:return{byteLength:4,components:1};case cd:case ld:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:_l}}));typeof window<"u"&&(window.__THREE__?nt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=_l);function Ud(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Om(i){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,p=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,u),o.onUploadCallback();let h;if(l instanceof Float32Array)h=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)h=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?h=i.HALF_FLOAT:h=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)h=i.SHORT;else if(l instanceof Uint32Array)h=i.UNSIGNED_INT;else if(l instanceof Int32Array)h=i.INT;else if(l instanceof Int8Array)h=i.BYTE;else if(l instanceof Uint8Array)h=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)h=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:h,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:p}}function n(o,c,l){const u=c.array,p=c.updateRanges;if(i.bindBuffer(l,o),p.length===0)i.bufferSubData(l,0,u);else{p.sort((h,m)=>h.start-m.start);let d=0;for(let h=1;h<p.length;h++){const m=p[d],_=p[h];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++d,p[d]=_)}p.length=d+1;for(let h=0,m=p.length;h<m;h++){const _=p[h];i.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Bm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,km=`#ifdef USE_ALPHAHASH
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
#endif`,zm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Gm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Vm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wm=`#ifdef USE_AOMAP
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
#endif`,Xm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qm=`#ifdef USE_BATCHING
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
#endif`,Ym=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$m=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Km=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Jm=`#ifdef USE_IRIDESCENCE
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
#endif`,Qm=`#ifdef USE_BUMPMAP
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
#endif`,jm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,e0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,t0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,n0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,i0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,s0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,r0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,a0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,o0=`#define PI 3.141592653589793
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
} // validated`,c0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,l0=`vec3 transformedNormal = objectNormal;
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
#endif`,u0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,h0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,d0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,f0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,p0="gl_FragColor = linearToOutputTexel( gl_FragColor );",m0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,g0=`#ifdef USE_ENVMAP
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
#endif`,v0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,x0=`#ifdef USE_ENVMAP
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
#endif`,_0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,y0=`#ifdef USE_ENVMAP
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
#endif`,M0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,S0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,b0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,E0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,w0=`#ifdef USE_GRADIENTMAP
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
}`,T0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,A0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,R0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,C0=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,P0=`#ifdef USE_ENVMAP
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
#endif`,I0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,L0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,N0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,D0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,U0=`PhysicalMaterial material;
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
#endif`,F0=`uniform sampler2D dfgLUT;
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
}`,O0=`
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
#endif`,B0=`#if defined( RE_IndirectDiffuse )
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
#endif`,k0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,z0=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,G0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,H0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,V0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,W0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,X0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,q0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Y0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,$0=`#if defined( USE_POINTS_UV )
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
#endif`,K0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Z0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,J0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Q0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,j0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,eg=`#ifdef USE_MORPHTARGETS
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
#endif`,tg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ng=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ig=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,sg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ag=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,og=`#ifdef USE_NORMALMAP
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
#endif`,cg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,lg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ug=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,hg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,dg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,fg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,pg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,mg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,gg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,vg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,xg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,_g=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,yg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Mg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Sg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,bg=`float getShadowMask() {
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
}`,Eg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wg=`#ifdef USE_SKINNING
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
#endif`,Tg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ag=`#ifdef USE_SKINNING
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
#endif`,Rg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Cg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Pg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ig=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Lg=`#ifdef USE_TRANSMISSION
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
#endif`,Ng=`#ifdef USE_TRANSMISSION
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
#endif`,Dg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ug=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Fg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Og=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Bg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,kg=`uniform sampler2D t2D;
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
}`,zg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Hg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wg=`#include <common>
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
}`,Xg=`#if DEPTH_PACKING == 3200
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
}`,qg=`#define DISTANCE
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
}`,Yg=`#define DISTANCE
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
}`,$g=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Kg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zg=`uniform float scale;
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
}`,Jg=`uniform vec3 diffuse;
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
}`,Qg=`#include <common>
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
}`,jg=`uniform vec3 diffuse;
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
}`,ev=`#define LAMBERT
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
}`,tv=`#define LAMBERT
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
}`,nv=`#define MATCAP
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
}`,iv=`#define MATCAP
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
}`,sv=`#define NORMAL
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
}`,rv=`#define NORMAL
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
}`,av=`#define PHONG
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
}`,ov=`#define PHONG
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
}`,cv=`#define STANDARD
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
}`,lv=`#define STANDARD
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
}`,uv=`#define TOON
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
}`,hv=`#define TOON
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
}`,dv=`uniform float size;
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
}`,fv=`uniform vec3 diffuse;
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
}`,pv=`#include <common>
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
}`,mv=`uniform vec3 color;
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
}`,gv=`uniform float rotation;
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
}`,vv=`uniform vec3 diffuse;
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
}`,ht={alphahash_fragment:Bm,alphahash_pars_fragment:km,alphamap_fragment:zm,alphamap_pars_fragment:Gm,alphatest_fragment:Hm,alphatest_pars_fragment:Vm,aomap_fragment:Wm,aomap_pars_fragment:Xm,batching_pars_vertex:qm,batching_vertex:Ym,begin_vertex:$m,beginnormal_vertex:Km,bsdfs:Zm,iridescence_fragment:Jm,bumpmap_pars_fragment:Qm,clipping_planes_fragment:jm,clipping_planes_pars_fragment:e0,clipping_planes_pars_vertex:t0,clipping_planes_vertex:n0,color_fragment:i0,color_pars_fragment:s0,color_pars_vertex:r0,color_vertex:a0,common:o0,cube_uv_reflection_fragment:c0,defaultnormal_vertex:l0,displacementmap_pars_vertex:u0,displacementmap_vertex:h0,emissivemap_fragment:d0,emissivemap_pars_fragment:f0,colorspace_fragment:p0,colorspace_pars_fragment:m0,envmap_fragment:g0,envmap_common_pars_fragment:v0,envmap_pars_fragment:x0,envmap_pars_vertex:_0,envmap_physical_pars_fragment:P0,envmap_vertex:y0,fog_vertex:M0,fog_pars_vertex:S0,fog_fragment:b0,fog_pars_fragment:E0,gradientmap_pars_fragment:w0,lightmap_pars_fragment:T0,lights_lambert_fragment:A0,lights_lambert_pars_fragment:R0,lights_pars_begin:C0,lights_toon_fragment:I0,lights_toon_pars_fragment:L0,lights_phong_fragment:N0,lights_phong_pars_fragment:D0,lights_physical_fragment:U0,lights_physical_pars_fragment:F0,lights_fragment_begin:O0,lights_fragment_maps:B0,lights_fragment_end:k0,lightprobes_pars_fragment:z0,logdepthbuf_fragment:G0,logdepthbuf_pars_fragment:H0,logdepthbuf_pars_vertex:V0,logdepthbuf_vertex:W0,map_fragment:X0,map_pars_fragment:q0,map_particle_fragment:Y0,map_particle_pars_fragment:$0,metalnessmap_fragment:K0,metalnessmap_pars_fragment:Z0,morphinstance_vertex:J0,morphcolor_vertex:Q0,morphnormal_vertex:j0,morphtarget_pars_vertex:eg,morphtarget_vertex:tg,normal_fragment_begin:ng,normal_fragment_maps:ig,normal_pars_fragment:sg,normal_pars_vertex:rg,normal_vertex:ag,normalmap_pars_fragment:og,clearcoat_normal_fragment_begin:cg,clearcoat_normal_fragment_maps:lg,clearcoat_pars_fragment:ug,iridescence_pars_fragment:hg,opaque_fragment:dg,packing:fg,premultiplied_alpha_fragment:pg,project_vertex:mg,dithering_fragment:gg,dithering_pars_fragment:vg,roughnessmap_fragment:xg,roughnessmap_pars_fragment:_g,shadowmap_pars_fragment:yg,shadowmap_pars_vertex:Mg,shadowmap_vertex:Sg,shadowmask_pars_fragment:bg,skinbase_vertex:Eg,skinning_pars_vertex:wg,skinning_vertex:Tg,skinnormal_vertex:Ag,specularmap_fragment:Rg,specularmap_pars_fragment:Cg,tonemapping_fragment:Pg,tonemapping_pars_fragment:Ig,transmission_fragment:Lg,transmission_pars_fragment:Ng,uv_pars_fragment:Dg,uv_pars_vertex:Ug,uv_vertex:Fg,worldpos_vertex:Og,background_vert:Bg,background_frag:kg,backgroundCube_vert:zg,backgroundCube_frag:Gg,cube_vert:Hg,cube_frag:Vg,depth_vert:Wg,depth_frag:Xg,distance_vert:qg,distance_frag:Yg,equirect_vert:$g,equirect_frag:Kg,linedashed_vert:Zg,linedashed_frag:Jg,meshbasic_vert:Qg,meshbasic_frag:jg,meshlambert_vert:ev,meshlambert_frag:tv,meshmatcap_vert:nv,meshmatcap_frag:iv,meshnormal_vert:sv,meshnormal_frag:rv,meshphong_vert:av,meshphong_frag:ov,meshphysical_vert:cv,meshphysical_frag:lv,meshtoon_vert:uv,meshtoon_frag:hv,points_vert:dv,points_frag:fv,shadow_vert:pv,shadow_frag:mv,sprite_vert:gv,sprite_frag:vv},Be={common:{diffuse:{value:new it(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ct}},envmap:{envMap:{value:null},envMapRotation:{value:new ct},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ct}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ct}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ct},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ct},normalScale:{value:new Ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ct},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ct}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ct}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ct}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new it(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new D},probesMax:{value:new D},probesResolution:{value:new D}},points:{diffuse:{value:new it(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0},uvTransform:{value:new ct}},sprite:{diffuse:{value:new it(16777215)},opacity:{value:1},center:{value:new Ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}}},oi={basic:{uniforms:wn([Be.common,Be.specularmap,Be.envmap,Be.aomap,Be.lightmap,Be.fog]),vertexShader:ht.meshbasic_vert,fragmentShader:ht.meshbasic_frag},lambert:{uniforms:wn([Be.common,Be.specularmap,Be.envmap,Be.aomap,Be.lightmap,Be.emissivemap,Be.bumpmap,Be.normalmap,Be.displacementmap,Be.fog,Be.lights,{emissive:{value:new it(0)},envMapIntensity:{value:1}}]),vertexShader:ht.meshlambert_vert,fragmentShader:ht.meshlambert_frag},phong:{uniforms:wn([Be.common,Be.specularmap,Be.envmap,Be.aomap,Be.lightmap,Be.emissivemap,Be.bumpmap,Be.normalmap,Be.displacementmap,Be.fog,Be.lights,{emissive:{value:new it(0)},specular:{value:new it(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ht.meshphong_vert,fragmentShader:ht.meshphong_frag},standard:{uniforms:wn([Be.common,Be.envmap,Be.aomap,Be.lightmap,Be.emissivemap,Be.bumpmap,Be.normalmap,Be.displacementmap,Be.roughnessmap,Be.metalnessmap,Be.fog,Be.lights,{emissive:{value:new it(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag},toon:{uniforms:wn([Be.common,Be.aomap,Be.lightmap,Be.emissivemap,Be.bumpmap,Be.normalmap,Be.displacementmap,Be.gradientmap,Be.fog,Be.lights,{emissive:{value:new it(0)}}]),vertexShader:ht.meshtoon_vert,fragmentShader:ht.meshtoon_frag},matcap:{uniforms:wn([Be.common,Be.bumpmap,Be.normalmap,Be.displacementmap,Be.fog,{matcap:{value:null}}]),vertexShader:ht.meshmatcap_vert,fragmentShader:ht.meshmatcap_frag},points:{uniforms:wn([Be.points,Be.fog]),vertexShader:ht.points_vert,fragmentShader:ht.points_frag},dashed:{uniforms:wn([Be.common,Be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ht.linedashed_vert,fragmentShader:ht.linedashed_frag},depth:{uniforms:wn([Be.common,Be.displacementmap]),vertexShader:ht.depth_vert,fragmentShader:ht.depth_frag},normal:{uniforms:wn([Be.common,Be.bumpmap,Be.normalmap,Be.displacementmap,{opacity:{value:1}}]),vertexShader:ht.meshnormal_vert,fragmentShader:ht.meshnormal_frag},sprite:{uniforms:wn([Be.sprite,Be.fog]),vertexShader:ht.sprite_vert,fragmentShader:ht.sprite_frag},background:{uniforms:{uvTransform:{value:new ct},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ht.background_vert,fragmentShader:ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ct}},vertexShader:ht.backgroundCube_vert,fragmentShader:ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ht.cube_vert,fragmentShader:ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ht.equirect_vert,fragmentShader:ht.equirect_frag},distance:{uniforms:wn([Be.common,Be.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ht.distance_vert,fragmentShader:ht.distance_frag},shadow:{uniforms:wn([Be.lights,Be.fog,{color:{value:new it(0)},opacity:{value:1}}]),vertexShader:ht.shadow_vert,fragmentShader:ht.shadow_frag}};oi.physical={uniforms:wn([oi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ct},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ct},clearcoatNormalScale:{value:new Ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ct},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ct},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ct},sheen:{value:0},sheenColor:{value:new it(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ct},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ct},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ct},transmissionSamplerSize:{value:new Ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ct},attenuationDistance:{value:0},attenuationColor:{value:new it(0)},specularColor:{value:new it(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ct},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ct},anisotropyVector:{value:new Ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ct}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag};const Ta={r:0,b:0,g:0},xv=new Rt,Fd=new ct;Fd.set(-1,0,0,0,1,0,0,0,1);function _v(i,e,t,n,s,r){const a=new it(0);let o=s===!0?0:1,c,l,u=null,p=0,d=null;function h(M){let b=M.isScene===!0?M.background:null;if(b&&b.isTexture){const x=M.backgroundBlurriness>0;b=e.get(b,x)}return b}function m(M){let b=!1;const x=h(M);x===null?g(a,o):x&&x.isColor&&(g(x,1),b=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(M,b){const x=h(b);x&&(x.isCubeTexture||x.mapping===oo)?(l===void 0&&(l=new gt(new An(1,1,1),new xn({name:"BackgroundCubeMaterial",uniforms:ar(oi.backgroundCube.uniforms),vertexShader:oi.backgroundCube.vertexShader,fragmentShader:oi.backgroundCube.fragmentShader,side:Rn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,S,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=x,l.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(xv.makeRotationFromEuler(b.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Fd),l.material.toneMapped=_t.getTransfer(x.colorSpace)!==It,(u!==x||p!==x.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=x,p=x.version,d=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new gt(new Xn(2,2),new xn({name:"BackgroundMaterial",uniforms:ar(oi.background.uniforms),vertexShader:oi.background.vertexShader,fragmentShader:oi.background.fragmentShader,side:Ji,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=_t.getTransfer(x.colorSpace)!==It,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||p!==x.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,u=x,p=x.version,d=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function g(M,b){M.getRGB(Ta,Ld(i)),t.buffers.color.setClear(Ta.r,Ta.g,Ta.b,b,r)}function f(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,b=1){a.set(M),o=b,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,g(a,o)},render:m,addToRenderList:_,dispose:f}}function yv(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(C,I,B,X,H){let J=!1;const z=p(C,X,B,I);r!==z&&(r=z,l(r.object)),J=h(C,X,B,H),J&&m(C,X,B,H),H!==null&&e.update(H,i.ELEMENT_ARRAY_BUFFER),(J||a)&&(a=!1,x(C,I,B,X),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function c(){return i.createVertexArray()}function l(C){return i.bindVertexArray(C)}function u(C){return i.deleteVertexArray(C)}function p(C,I,B,X){const H=X.wireframe===!0;let J=n[I.id];J===void 0&&(J={},n[I.id]=J);const z=C.isInstancedMesh===!0?C.id:0;let L=J[z];L===void 0&&(L={},J[z]=L);let V=L[B.id];V===void 0&&(V={},L[B.id]=V);let K=V[H];return K===void 0&&(K=d(c()),V[H]=K),K}function d(C){const I=[],B=[],X=[];for(let H=0;H<t;H++)I[H]=0,B[H]=0,X[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:B,attributeDivisors:X,object:C,attributes:{},index:null}}function h(C,I,B,X){const H=r.attributes,J=I.attributes;let z=0;const L=B.getAttributes();for(const V in L)if(L[V].location>=0){const Z=H[V];let N=J[V];if(N===void 0&&(V==="instanceMatrix"&&C.instanceMatrix&&(N=C.instanceMatrix),V==="instanceColor"&&C.instanceColor&&(N=C.instanceColor)),Z===void 0||Z.attribute!==N||N&&Z.data!==N.data)return!0;z++}return r.attributesNum!==z||r.index!==X}function m(C,I,B,X){const H={},J=I.attributes;let z=0;const L=B.getAttributes();for(const V in L)if(L[V].location>=0){let Z=J[V];Z===void 0&&(V==="instanceMatrix"&&C.instanceMatrix&&(Z=C.instanceMatrix),V==="instanceColor"&&C.instanceColor&&(Z=C.instanceColor));const N={};N.attribute=Z,Z&&Z.data&&(N.data=Z.data),H[V]=N,z++}r.attributes=H,r.attributesNum=z,r.index=X}function _(){const C=r.newAttributes;for(let I=0,B=C.length;I<B;I++)C[I]=0}function g(C){f(C,0)}function f(C,I){const B=r.newAttributes,X=r.enabledAttributes,H=r.attributeDivisors;B[C]=1,X[C]===0&&(i.enableVertexAttribArray(C),X[C]=1),H[C]!==I&&(i.vertexAttribDivisor(C,I),H[C]=I)}function M(){const C=r.newAttributes,I=r.enabledAttributes;for(let B=0,X=I.length;B<X;B++)I[B]!==C[B]&&(i.disableVertexAttribArray(B),I[B]=0)}function b(C,I,B,X,H,J,z){z===!0?i.vertexAttribIPointer(C,I,B,H,J):i.vertexAttribPointer(C,I,B,X,H,J)}function x(C,I,B,X){_();const H=X.attributes,J=B.getAttributes(),z=I.defaultAttributeValues;for(const L in J){const V=J[L];if(V.location>=0){let K=H[L];if(K===void 0&&(L==="instanceMatrix"&&C.instanceMatrix&&(K=C.instanceMatrix),L==="instanceColor"&&C.instanceColor&&(K=C.instanceColor)),K!==void 0){const Z=K.normalized,N=K.itemSize,Q=e.get(K);if(Q===void 0)continue;const xe=Q.buffer,ce=Q.type,W=Q.bytesPerElement,j=ce===i.INT||ce===i.UNSIGNED_INT||K.gpuType===Ml;if(K.isInterleavedBufferAttribute){const ne=K.data,de=ne.stride,me=K.offset;if(ne.isInstancedInterleavedBuffer){for(let Ae=0;Ae<V.locationSize;Ae++)f(V.location+Ae,ne.meshPerAttribute);C.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let Ae=0;Ae<V.locationSize;Ae++)g(V.location+Ae);i.bindBuffer(i.ARRAY_BUFFER,xe);for(let Ae=0;Ae<V.locationSize;Ae++)b(V.location+Ae,N/V.locationSize,ce,Z,de*W,(me+N/V.locationSize*Ae)*W,j)}else{if(K.isInstancedBufferAttribute){for(let ne=0;ne<V.locationSize;ne++)f(V.location+ne,K.meshPerAttribute);C.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let ne=0;ne<V.locationSize;ne++)g(V.location+ne);i.bindBuffer(i.ARRAY_BUFFER,xe);for(let ne=0;ne<V.locationSize;ne++)b(V.location+ne,N/V.locationSize,ce,Z,N*W,N/V.locationSize*ne*W,j)}}else if(z!==void 0){const Z=z[L];if(Z!==void 0)switch(Z.length){case 2:i.vertexAttrib2fv(V.location,Z);break;case 3:i.vertexAttrib3fv(V.location,Z);break;case 4:i.vertexAttrib4fv(V.location,Z);break;default:i.vertexAttrib1fv(V.location,Z)}}}}M()}function w(){T();for(const C in n){const I=n[C];for(const B in I){const X=I[B];for(const H in X){const J=X[H];for(const z in J)u(J[z].object),delete J[z];delete X[H]}}delete n[C]}}function S(C){if(n[C.id]===void 0)return;const I=n[C.id];for(const B in I){const X=I[B];for(const H in X){const J=X[H];for(const z in J)u(J[z].object),delete J[z];delete X[H]}}delete n[C.id]}function E(C){for(const I in n){const B=n[I];for(const X in B){const H=B[X];if(H[C.id]===void 0)continue;const J=H[C.id];for(const z in J)u(J[z].object),delete J[z];delete H[C.id]}}}function v(C){for(const I in n){const B=n[I],X=C.isInstancedMesh===!0?C.id:0,H=B[X];if(H!==void 0){for(const J in H){const z=H[J];for(const L in z)u(z[L].object),delete z[L];delete H[J]}delete B[X],Object.keys(B).length===0&&delete n[I]}}}function T(){R(),a=!0,r!==s&&(r=s,l(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:T,resetDefaultState:R,dispose:w,releaseStatesOfGeometry:S,releaseStatesOfObject:v,releaseStatesOfProgram:E,initAttributes:_,enableAttribute:g,disableUnusedAttributes:M}}function Mv(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,u){u!==0&&(i.drawArraysInstanced(n,c,l,u),t.update(l,n,u))}function o(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let d=0;for(let h=0;h<u;h++)d+=l[h];t.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Sv(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(E){return!(E!==jn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){const v=E===Ii&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==Un&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Qn&&!v)}function c(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(nt("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const p=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&nt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),S=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:p,reversedDepthBuffer:d,maxTextures:h,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:f,maxVertexUniforms:M,maxVaryings:b,maxFragmentUniforms:x,maxSamples:w,samples:S}}function bv(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new as,o=new ct,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(p,d){const h=p.length!==0||d||n!==0||s;return s=d,n=p.length,h},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,d){t=u(p,d,0)},this.setState=function(p,d,h){const m=p.clippingPlanes,_=p.clipIntersection,g=p.clipShadows,f=i.get(p);if(!s||m===null||m.length===0||r&&!g)r?u(null):l();else{const M=r?0:n,b=M*4;let x=f.clippingState||null;c.value=x,x=u(m,d,b,h);for(let w=0;w!==b;++w)x[w]=t[w];f.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(p,d,h,m){const _=p!==null?p.length:0;let g=null;if(_!==0){if(g=c.value,m!==!0||g===null){const f=h+_*4,M=d.matrixWorldInverse;o.getNormalMatrix(M),(g===null||g.length<f)&&(g=new Float32Array(f));for(let b=0,x=h;b!==_;++b,x+=4)a.copy(p[b]).applyMatrix4(M,o),a.normal.toArray(g,x),g[x+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}const Yi=4,fh=[.125,.215,.35,.446,.526,.582],ls=20,Ev=256,br=new uo,ph=new it;let gc=null,vc=0,xc=0,_c=!1;const wv=new D;class pl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=wv}=r;gc=this._renderer.getRenderTarget(),vc=this._renderer.getActiveCubeFace(),xc=this._renderer.getActiveMipmapLevel(),_c=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=vh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(gc,vc,xc),this._renderer.xr.enabled=_c,e.scissorTest=!1,Vs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ds||e.mapping===ir?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),gc=this._renderer.getRenderTarget(),vc=this._renderer.getActiveCubeFace(),xc=this._renderer.getActiveMipmapLevel(),_c=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:cn,minFilter:cn,generateMipmaps:!1,type:Ii,format:jn,colorSpace:Wa,depthBuffer:!1},s=mh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=mh(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Tv(r)),this._blurMaterial=Rv(r,e,t),this._ggxMaterial=Av(r,e,t)}return s}_compileMaterial(e){const t=new gt(new Et,e);this._renderer.compile(t,br)}_sceneToCubeUV(e,t,n,s,r){const c=new Dn(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],p=this._renderer,d=p.autoClear,h=p.toneMapping;p.getClearColor(ph),p.toneMapping=di,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(s),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new gt(new An,new jt({name:"PMREM.Background",side:Rn,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,g=_.material;let f=!1;const M=e.background;M?M.isColor&&(g.color.copy(M),e.background=null,f=!0):(g.color.copy(ph),f=!0);for(let b=0;b<6;b++){const x=b%3;x===0?(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[b],r.y,r.z)):x===1?(c.up.set(0,0,l[b]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[b],r.z)):(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[b]));const w=this._cubeSize;Vs(s,x*w,b>2?w:0,w,w),p.setRenderTarget(s),f&&p.render(_,c),p.render(e,c)}p.toneMapping=h,p.autoClear=d,e.background=M}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ds||e.mapping===ir;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=vh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=gh());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;Vs(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,br)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const c=a.uniforms,l=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),p=Math.sqrt(l*l-u*u),d=0+l*1.25,h=p*d,{_lodMax:m}=this,_=this._sizeLods[n],g=3*_*(n>m-Yi?n-m+Yi:0),f=4*(this._cubeSize-_);c.envMap.value=e.texture,c.roughness.value=h,c.mipInt.value=m-t,Vs(r,g,f,3*_,2*_),s.setRenderTarget(r),s.render(o,br),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=m-n,Vs(e,g,f,3*_,2*_),s.setRenderTarget(e),s.render(o,br)}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&xt("blur direction must be either latitudinal or longitudinal!");const u=3,p=this._lodMeshes[s];p.material=l;const d=l.uniforms,h=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*h):2*Math.PI/(2*ls-1),_=r/m,g=isFinite(r)?1+Math.floor(u*_):ls;g>ls&&nt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${ls}`);const f=[];let M=0;for(let E=0;E<ls;++E){const v=E/_,T=Math.exp(-v*v/2);f.push(T),E===0?M+=T:E<g&&(M+=2*T)}for(let E=0;E<f.length;E++)f[E]=f[E]/M;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=f,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:b}=this;d.dTheta.value=m,d.mipInt.value=b-n;const x=this._sizeLods[s],w=3*x*(s>b-Yi?s-b+Yi:0),S=4*(this._cubeSize-x);Vs(t,w,S,3*x,2*x),c.setRenderTarget(t),c.render(p,br)}}function Tv(i){const e=[],t=[],n=[];let s=i;const r=i-Yi+1+fh.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let c=1/o;a>i-Yi?c=fh[a-i+Yi-1]:a===0&&(c=0),t.push(c);const l=1/(o-2),u=-l,p=1+l,d=[u,u,p,u,p,p,u,u,p,p,u,p],h=6,m=6,_=3,g=2,f=1,M=new Float32Array(_*m*h),b=new Float32Array(g*m*h),x=new Float32Array(f*m*h);for(let S=0;S<h;S++){const E=S%3*2/3-1,v=S>2?0:-1,T=[E,v,0,E+2/3,v,0,E+2/3,v+1,0,E,v,0,E+2/3,v+1,0,E,v+1,0];M.set(T,_*m*S),b.set(d,g*m*S);const R=[S,S,S,S,S,S];x.set(R,f*m*S)}const w=new Et;w.setAttribute("position",new $t(M,_)),w.setAttribute("uv",new $t(b,g)),w.setAttribute("faceIndex",new $t(x,f)),n.push(new gt(w,null)),s>Yi&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function mh(i,e,t){const n=new pi(i,e,t);return n.texture.mapping=oo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Vs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Av(i,e,t){return new xn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Ev,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ho(),fragmentShader:`

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
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function Rv(i,e,t){const n=new Float32Array(ls),s=new D(0,1,0);return new xn({name:"SphericalGaussianBlur",defines:{n:ls,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ho(),fragmentShader:`

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
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function gh(){return new xn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ho(),fragmentShader:`

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
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function vh(){return new xn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ho(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function ho(){return`

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
	`}class Od extends pi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Md(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new An(5,5,5),r=new xn({name:"CubemapFromEquirect",uniforms:ar(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Rn,blending:Ai});r.uniforms.tEquirect.value=t;const a=new gt(s,r),o=t.minFilter;return t.minFilter===qi&&(t.minFilter=cn),new Dm(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function Cv(i){let e=new WeakMap,t=new WeakMap,n=null;function s(d,h=!1){return d==null?null:h?a(d):r(d)}function r(d){if(d&&d.isTexture){const h=d.mapping;if(h===Bo||h===ko)if(e.has(d)){const m=e.get(d).texture;return o(m,d.mapping)}else{const m=d.image;if(m&&m.height>0){const _=new Od(m.height);return _.fromEquirectangularTexture(i,d),e.set(d,_),d.addEventListener("dispose",l),o(_.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const h=d.mapping,m=h===Bo||h===ko,_=h===ds||h===ir;if(m||_){let g=t.get(d);const f=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==f)return n===null&&(n=new pl(i)),g=m?n.fromEquirectangular(d,g):n.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),g.texture;if(g!==void 0)return g.texture;{const M=d.image;return m&&M&&M.height>0||_&&M&&c(M)?(n===null&&(n=new pl(i)),g=m?n.fromEquirectangular(d):n.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),d.addEventListener("dispose",u),g.texture):null}}}return d}function o(d,h){return h===Bo?d.mapping=ds:h===ko&&(d.mapping=ir),d}function c(d){let h=0;const m=6;for(let _=0;_<m;_++)d[_]!==void 0&&h++;return h===m}function l(d){const h=d.target;h.removeEventListener("dispose",l);const m=e.get(h);m!==void 0&&(e.delete(h),m.dispose())}function u(d){const h=d.target;h.removeEventListener("dispose",u);const m=t.get(h);m!==void 0&&(t.delete(h),m.dispose())}function p(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:p}}function Pv(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Js("WebGLRenderer: "+n+" extension not supported."),s}}}function Iv(i,e,t,n){const s={},r=new WeakMap;function a(p){const d=p.target;d.index!==null&&e.remove(d.index);for(const m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",a),delete s[d.id];const h=r.get(d);h&&(e.remove(h),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(p,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function c(p){const d=p.attributes;for(const h in d)e.update(d[h],i.ARRAY_BUFFER)}function l(p){const d=[],h=p.index,m=p.attributes.position;let _=0;if(m===void 0)return;if(h!==null){const M=h.array;_=h.version;for(let b=0,x=M.length;b<x;b+=3){const w=M[b+0],S=M[b+1],E=M[b+2];d.push(w,S,S,E,E,w)}}else{const M=m.array;_=m.version;for(let b=0,x=M.length/3-1;b<x;b+=3){const w=b+0,S=b+1,E=b+2;d.push(w,S,S,E,E,w)}}const g=new(m.count>=65535?vd:gd)(d,1);g.version=_;const f=r.get(p);f&&e.remove(f),r.set(p,g)}function u(p){const d=r.get(p);if(d){const h=p.index;h!==null&&d.version<h.version&&l(p)}else l(p);return r.get(p)}return{get:o,update:c,getWireframeAttribute:u}}function Lv(i,e,t){let n;function s(p){n=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function c(p,d){i.drawElements(n,d,r,p*a),t.update(d,n,1)}function l(p,d,h){h!==0&&(i.drawElementsInstanced(n,d,r,p*a,h),t.update(d,n,h))}function u(p,d,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,p,0,h);let _=0;for(let g=0;g<h;g++)_+=d[g];t.update(_,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Nv(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:xt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Dv(i,e,t){const n=new WeakMap,s=new zt;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=u!==void 0?u.length:0;let d=n.get(o);if(d===void 0||d.count!==p){let R=function(){v.dispose(),n.delete(o),o.removeEventListener("dispose",R)};var h=R;d!==void 0&&d.texture.dispose();const m=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],M=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let x=0;m===!0&&(x=1),_===!0&&(x=2),g===!0&&(x=3);let w=o.attributes.position.count*x,S=1;w>e.maxTextureSize&&(S=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const E=new Float32Array(w*S*4*p),v=new fd(E,w,S,p);v.type=Qn,v.needsUpdate=!0;const T=x*4;for(let C=0;C<p;C++){const I=f[C],B=M[C],X=b[C],H=w*S*4*C;for(let J=0;J<I.count;J++){const z=J*T;m===!0&&(s.fromBufferAttribute(I,J),E[H+z+0]=s.x,E[H+z+1]=s.y,E[H+z+2]=s.z,E[H+z+3]=0),_===!0&&(s.fromBufferAttribute(B,J),E[H+z+4]=s.x,E[H+z+5]=s.y,E[H+z+6]=s.z,E[H+z+7]=0),g===!0&&(s.fromBufferAttribute(X,J),E[H+z+8]=s.x,E[H+z+9]=s.y,E[H+z+10]=s.z,E[H+z+11]=X.itemSize===4?s.w:1)}}d={count:p,texture:v,size:new Ee(w,S)},n.set(o,d),o.addEventListener("dispose",R)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let m=0;for(let g=0;g<l.length;g++)m+=l[g];const _=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Uv(i,e,t,n,s){let r=new WeakMap;function a(l){const u=s.render.frame,p=l.geometry,d=e.get(l,p);if(r.get(d)!==u&&(e.update(d),r.set(d,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==u&&(h.update(),r.set(h,u))}return d}function o(){r=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const Fv={[jh]:"LINEAR_TONE_MAPPING",[ed]:"REINHARD_TONE_MAPPING",[td]:"CINEON_TONE_MAPPING",[yl]:"ACES_FILMIC_TONE_MAPPING",[id]:"AGX_TONE_MAPPING",[sd]:"NEUTRAL_TONE_MAPPING",[nd]:"CUSTOM_TONE_MAPPING"};function Ov(i,e,t,n,s,r){const a=new pi(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new sr(e,t):void 0}),o=new pi(e,t,{type:Ii,depthBuffer:!1,stencilBuffer:!1}),c=new Et;c.setAttribute("position",new yt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new yt([0,2,0,0,2,0],2));const l=new wm({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new gt(c,l),p=new uo(-1,1,1,-1,0,1);let d=null,h=null,m=!1,_,g=null,f=[],M=!1;this.setSize=function(b,x){a.setSize(b,x),o.setSize(b,x);for(let w=0;w<f.length;w++){const S=f[w];S.setSize&&S.setSize(b,x)}},this.setEffects=function(b){f=b,M=f.length>0&&f[0].isRenderPass===!0;const x=a.width,w=a.height;for(let S=0;S<f.length;S++){const E=f[S];E.setSize&&E.setSize(x,w)}},this.begin=function(b,x){if(m||b.toneMapping===di&&f.length===0)return!1;if(g=x,x!==null){const w=x.width,S=x.height;(a.width!==w||a.height!==S)&&this.setSize(w,S)}return M===!1&&b.setRenderTarget(a),_=b.toneMapping,b.toneMapping=di,!0},this.hasRenderPass=function(){return M},this.end=function(b,x){b.toneMapping=_,m=!0;let w=a,S=o;for(let E=0;E<f.length;E++){const v=f[E];if(v.enabled!==!1&&(v.render(b,S,w,x),v.needsSwap!==!1)){const T=w;w=S,S=T}}if(d!==b.outputColorSpace||h!==b.toneMapping){d=b.outputColorSpace,h=b.toneMapping,l.defines={},_t.getTransfer(d)===It&&(l.defines.SRGB_TRANSFER="");const E=Fv[h];E&&(l.defines[E]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=w.texture,b.setRenderTarget(g),b.render(u,p),g=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),c.dispose(),l.dispose()}}const Bd=new vn,ml=new sr(1,1),kd=new fd,zd=new bp,Gd=new Md,xh=[],_h=[],yh=new Float32Array(16),Mh=new Float32Array(9),Sh=new Float32Array(4);function lr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=xh[s];if(r===void 0&&(r=new Float32Array(s),xh[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function tn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function nn(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function fo(i,e){let t=_h[e];t===void 0&&(t=new Int32Array(e),_h[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Bv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function kv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(tn(t,e))return;i.uniform2fv(this.addr,e),nn(t,e)}}function zv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(tn(t,e))return;i.uniform3fv(this.addr,e),nn(t,e)}}function Gv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(tn(t,e))return;i.uniform4fv(this.addr,e),nn(t,e)}}function Hv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(tn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),nn(t,e)}else{if(tn(t,n))return;Sh.set(n),i.uniformMatrix2fv(this.addr,!1,Sh),nn(t,n)}}function Vv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(tn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),nn(t,e)}else{if(tn(t,n))return;Mh.set(n),i.uniformMatrix3fv(this.addr,!1,Mh),nn(t,n)}}function Wv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(tn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),nn(t,e)}else{if(tn(t,n))return;yh.set(n),i.uniformMatrix4fv(this.addr,!1,yh),nn(t,n)}}function Xv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function qv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(tn(t,e))return;i.uniform2iv(this.addr,e),nn(t,e)}}function Yv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(tn(t,e))return;i.uniform3iv(this.addr,e),nn(t,e)}}function $v(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(tn(t,e))return;i.uniform4iv(this.addr,e),nn(t,e)}}function Kv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Zv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(tn(t,e))return;i.uniform2uiv(this.addr,e),nn(t,e)}}function Jv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(tn(t,e))return;i.uniform3uiv(this.addr,e),nn(t,e)}}function Qv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(tn(t,e))return;i.uniform4uiv(this.addr,e),nn(t,e)}}function jv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ml.compareFunction=t.isReversedDepthBuffer()?Cl:Rl,r=ml):r=Bd,t.setTexture2D(e||r,s)}function e1(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||zd,s)}function t1(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Gd,s)}function n1(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||kd,s)}function i1(i){switch(i){case 5126:return Bv;case 35664:return kv;case 35665:return zv;case 35666:return Gv;case 35674:return Hv;case 35675:return Vv;case 35676:return Wv;case 5124:case 35670:return Xv;case 35667:case 35671:return qv;case 35668:case 35672:return Yv;case 35669:case 35673:return $v;case 5125:return Kv;case 36294:return Zv;case 36295:return Jv;case 36296:return Qv;case 35678:case 36198:case 36298:case 36306:case 35682:return jv;case 35679:case 36299:case 36307:return e1;case 35680:case 36300:case 36308:case 36293:return t1;case 36289:case 36303:case 36311:case 36292:return n1}}function s1(i,e){i.uniform1fv(this.addr,e)}function r1(i,e){const t=lr(e,this.size,2);i.uniform2fv(this.addr,t)}function a1(i,e){const t=lr(e,this.size,3);i.uniform3fv(this.addr,t)}function o1(i,e){const t=lr(e,this.size,4);i.uniform4fv(this.addr,t)}function c1(i,e){const t=lr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function l1(i,e){const t=lr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function u1(i,e){const t=lr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function h1(i,e){i.uniform1iv(this.addr,e)}function d1(i,e){i.uniform2iv(this.addr,e)}function f1(i,e){i.uniform3iv(this.addr,e)}function p1(i,e){i.uniform4iv(this.addr,e)}function m1(i,e){i.uniform1uiv(this.addr,e)}function g1(i,e){i.uniform2uiv(this.addr,e)}function v1(i,e){i.uniform3uiv(this.addr,e)}function x1(i,e){i.uniform4uiv(this.addr,e)}function _1(i,e,t){const n=this.cache,s=e.length,r=fo(t,s);tn(n,r)||(i.uniform1iv(this.addr,r),nn(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=ml:a=Bd;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function y1(i,e,t){const n=this.cache,s=e.length,r=fo(t,s);tn(n,r)||(i.uniform1iv(this.addr,r),nn(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||zd,r[a])}function M1(i,e,t){const n=this.cache,s=e.length,r=fo(t,s);tn(n,r)||(i.uniform1iv(this.addr,r),nn(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Gd,r[a])}function S1(i,e,t){const n=this.cache,s=e.length,r=fo(t,s);tn(n,r)||(i.uniform1iv(this.addr,r),nn(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||kd,r[a])}function b1(i){switch(i){case 5126:return s1;case 35664:return r1;case 35665:return a1;case 35666:return o1;case 35674:return c1;case 35675:return l1;case 35676:return u1;case 5124:case 35670:return h1;case 35667:case 35671:return d1;case 35668:case 35672:return f1;case 35669:case 35673:return p1;case 5125:return m1;case 36294:return g1;case 36295:return v1;case 36296:return x1;case 35678:case 36198:case 36298:case 36306:case 35682:return _1;case 35679:case 36299:case 36307:return y1;case 35680:case 36300:case 36308:case 36293:return M1;case 36289:case 36303:case 36311:case 36292:return S1}}class E1{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=i1(t.type)}}class w1{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=b1(t.type)}}class T1{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const yc=/(\w+)(\])?(\[|\.)?/g;function bh(i,e){i.seq.push(e),i.map[e.id]=e}function A1(i,e,t){const n=i.name,s=n.length;for(yc.lastIndex=0;;){const r=yc.exec(n),a=yc.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){bh(t,l===void 0?new E1(o,i,e):new w1(o,i,e));break}else{let p=t.map[o];p===void 0&&(p=new T1(o),bh(t,p)),t=p}}}class Fa{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);A1(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Eh(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const R1=37297;let C1=0;function P1(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const wh=new ct;function I1(i){_t._getMatrix(wh,_t.workingColorSpace,i);const e=`mat3( ${wh.elements.map(t=>t.toFixed(4))} )`;switch(_t.getTransfer(i)){case Xa:return[e,"LinearTransferOETF"];case It:return[e,"sRGBTransferOETF"];default:return nt("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Th(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+P1(i.getShaderSource(e),o)}else return r}function L1(i,e){const t=I1(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const N1={[jh]:"Linear",[ed]:"Reinhard",[td]:"Cineon",[yl]:"ACESFilmic",[id]:"AgX",[sd]:"Neutral",[nd]:"Custom"};function D1(i,e){const t=N1[e];return t===void 0?(nt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Aa=new D;function U1(){_t.getLuminanceCoefficients(Aa);const i=Aa.x.toFixed(4),e=Aa.y.toFixed(4),t=Aa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function F1(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Cr).join(`
`)}function O1(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function B1(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Cr(i){return i!==""}function Ah(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Rh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const k1=/^[ \t]*#include +<([\w\d./]+)>/gm;function gl(i){return i.replace(k1,G1)}const z1=new Map;function G1(i,e){let t=ht[e];if(t===void 0){const n=z1.get(e);if(n!==void 0)t=ht[n],nt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return gl(t)}const H1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ch(i){return i.replace(H1,V1)}function V1(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ph(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const W1={[Ia]:"SHADOWMAP_TYPE_PCF",[Ar]:"SHADOWMAP_TYPE_VSM"};function X1(i){return W1[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const q1={[ds]:"ENVMAP_TYPE_CUBE",[ir]:"ENVMAP_TYPE_CUBE",[oo]:"ENVMAP_TYPE_CUBE_UV"};function Y1(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":q1[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const $1={[ir]:"ENVMAP_MODE_REFRACTION"};function K1(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":$1[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Z1={[Qh]:"ENVMAP_BLENDING_MULTIPLY",[Gf]:"ENVMAP_BLENDING_MIX",[Hf]:"ENVMAP_BLENDING_ADD"};function J1(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Z1[i.combine]||"ENVMAP_BLENDING_NONE"}function Q1(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function j1(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=X1(t),l=Y1(t),u=K1(t),p=J1(t),d=Q1(t),h=F1(t),m=O1(r),_=s.createProgram();let g,f,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Cr).join(`
`),g.length>0&&(g+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Cr).join(`
`),f.length>0&&(f+=`
`)):(g=[Ph(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cr).join(`
`),f=[Ph(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+p:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==di?"#define TONE_MAPPING":"",t.toneMapping!==di?ht.tonemapping_pars_fragment:"",t.toneMapping!==di?D1("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ht.colorspace_pars_fragment,L1("linearToOutputTexel",t.outputColorSpace),U1(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Cr).join(`
`)),a=gl(a),a=Ah(a,t),a=Rh(a,t),o=gl(o),o=Ah(o,t),o=Rh(o,t),a=Ch(a),o=Ch(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,f=["#define varying in",t.glslVersion===Tu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Tu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const b=M+g+a,x=M+f+o,w=Eh(s,s.VERTEX_SHADER,b),S=Eh(s,s.FRAGMENT_SHADER,x);s.attachShader(_,w),s.attachShader(_,S),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function E(C){if(i.debug.checkShaderErrors){const I=s.getProgramInfoLog(_)||"",B=s.getShaderInfoLog(w)||"",X=s.getShaderInfoLog(S)||"",H=I.trim(),J=B.trim(),z=X.trim();let L=!0,V=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(L=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,w,S);else{const K=Th(s,w,"vertex"),Z=Th(s,S,"fragment");xt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+H+`
`+K+`
`+Z)}else H!==""?nt("WebGLProgram: Program Info Log:",H):(J===""||z==="")&&(V=!1);V&&(C.diagnostics={runnable:L,programLog:H,vertexShader:{log:J,prefix:g},fragmentShader:{log:z,prefix:f}})}s.deleteShader(w),s.deleteShader(S),v=new Fa(s,_),T=B1(s,_)}let v;this.getUniforms=function(){return v===void 0&&E(this),v};let T;this.getAttributes=function(){return T===void 0&&E(this),T};let R=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(_,R1)),R},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=C1++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=S,this}let ex=0;class tx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new nx(e),t.set(e,n)),n}}class nx{constructor(e){this.id=ex++,this.code=e,this.usedTimes=0}}function ix(i){return i===fs||i===Ha||i===Va}function sx(i,e,t,n,s,r){const a=new pd,o=new tx,c=new Set,l=[],u=new Map,p=n.logarithmicDepthBuffer;let d=n.precision;const h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(v){return c.add(v),v===0?"uv":`uv${v}`}function _(v,T,R,C,I,B){const X=C.fog,H=I.geometry,J=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?C.environment:null,z=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,L=e.get(v.envMap||J,z),V=L&&L.mapping===oo?L.image.height:null,K=h[v.type];v.precision!==null&&(d=n.getMaxPrecision(v.precision),d!==v.precision&&nt("WebGLProgram.getParameters:",v.precision,"not supported, using",d,"instead."));const Z=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,N=Z!==void 0?Z.length:0;let Q=0;H.morphAttributes.position!==void 0&&(Q=1),H.morphAttributes.normal!==void 0&&(Q=2),H.morphAttributes.color!==void 0&&(Q=3);let xe,ce,W,j;if(K){const Fe=oi[K];xe=Fe.vertexShader,ce=Fe.fragmentShader}else{xe=v.vertexShader,ce=v.fragmentShader;const Fe=o.getVertexShaderStage(v),ut=o.getFragmentShaderStage(v);o.update(v,Fe,ut),W=Fe.id,j=ut.id}const ne=i.getRenderTarget(),de=i.state.buffers.depth.getReversed(),me=I.isInstancedMesh===!0,Ae=I.isBatchedMesh===!0,He=!!v.map,Oe=!!v.matcap,ve=!!L,ue=!!v.aoMap,ge=!!v.lightMap,Le=!!v.bumpMap&&v.wireframe===!1,U=!!v.normalMap,k=!!v.displacementMap,ie=!!v.emissiveMap,Te=!!v.metalnessMap,Ne=!!v.roughnessMap,O=v.anisotropy>0,st=v.clearcoat>0,Ye=v.dispersion>0,P=v.iridescence>0,y=v.sheen>0,q=v.transmission>0,ee=O&&!!v.anisotropyMap,pe=st&&!!v.clearcoatMap,ye=st&&!!v.clearcoatNormalMap,Me=st&&!!v.clearcoatRoughnessMap,re=P&&!!v.iridescenceMap,_e=P&&!!v.iridescenceThicknessMap,Ie=y&&!!v.sheenColorMap,F=y&&!!v.sheenRoughnessMap,$=!!v.specularMap,oe=!!v.specularColorMap,be=!!v.specularIntensityMap,Pe=q&&!!v.transmissionMap,ke=q&&!!v.thicknessMap,G=!!v.gradientMap,Se=!!v.alphaMap,se=v.alphaTest>0,Re=!!v.alphaHash,De=!!v.extensions;let ae=di;v.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(ae=i.toneMapping);const Ce={shaderID:K,shaderType:v.type,shaderName:v.name,vertexShader:xe,fragmentShader:ce,defines:v.defines,customVertexShaderID:W,customFragmentShaderID:j,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:d,batching:Ae,batchingColor:Ae&&I._colorsTexture!==null,instancing:me,instancingColor:me&&I.instanceColor!==null,instancingMorph:me&&I.morphTexture!==null,outputColorSpace:ne===null?i.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:_t.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:He,matcap:Oe,envMap:ve,envMapMode:ve&&L.mapping,envMapCubeUVHeight:V,aoMap:ue,lightMap:ge,bumpMap:Le,normalMap:U,displacementMap:k,emissiveMap:ie,normalMapObjectSpace:U&&v.normalMapType===Xf,normalMapTangentSpace:U&&v.normalMapType===ll,packedNormalMap:U&&v.normalMapType===ll&&ix(v.normalMap.format),metalnessMap:Te,roughnessMap:Ne,anisotropy:O,anisotropyMap:ee,clearcoat:st,clearcoatMap:pe,clearcoatNormalMap:ye,clearcoatRoughnessMap:Me,dispersion:Ye,iridescence:P,iridescenceMap:re,iridescenceThicknessMap:_e,sheen:y,sheenColorMap:Ie,sheenRoughnessMap:F,specularMap:$,specularColorMap:oe,specularIntensityMap:be,transmission:q,transmissionMap:Pe,thicknessMap:ke,gradientMap:G,opaque:v.transparent===!1&&v.blending===Zs&&v.alphaToCoverage===!1,alphaMap:Se,alphaTest:se,alphaHash:Re,combine:v.combine,mapUv:He&&m(v.map.channel),aoMapUv:ue&&m(v.aoMap.channel),lightMapUv:ge&&m(v.lightMap.channel),bumpMapUv:Le&&m(v.bumpMap.channel),normalMapUv:U&&m(v.normalMap.channel),displacementMapUv:k&&m(v.displacementMap.channel),emissiveMapUv:ie&&m(v.emissiveMap.channel),metalnessMapUv:Te&&m(v.metalnessMap.channel),roughnessMapUv:Ne&&m(v.roughnessMap.channel),anisotropyMapUv:ee&&m(v.anisotropyMap.channel),clearcoatMapUv:pe&&m(v.clearcoatMap.channel),clearcoatNormalMapUv:ye&&m(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Me&&m(v.clearcoatRoughnessMap.channel),iridescenceMapUv:re&&m(v.iridescenceMap.channel),iridescenceThicknessMapUv:_e&&m(v.iridescenceThicknessMap.channel),sheenColorMapUv:Ie&&m(v.sheenColorMap.channel),sheenRoughnessMapUv:F&&m(v.sheenRoughnessMap.channel),specularMapUv:$&&m(v.specularMap.channel),specularColorMapUv:oe&&m(v.specularColorMap.channel),specularIntensityMapUv:be&&m(v.specularIntensityMap.channel),transmissionMapUv:Pe&&m(v.transmissionMap.channel),thicknessMapUv:ke&&m(v.thicknessMap.channel),alphaMapUv:Se&&m(v.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(U||O),vertexNormals:!!H.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!H.attributes.uv&&(He||Se),fog:!!X,useFog:v.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||H.attributes.normal===void 0&&U===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:de,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:H.attributes.position!==void 0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:N,morphTextureStride:Q,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:B.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:ae,decodeVideoTexture:He&&v.map.isVideoTexture===!0&&_t.getTransfer(v.map.colorSpace)===It,decodeVideoTextureEmissive:ie&&v.emissiveMap.isVideoTexture===!0&&_t.getTransfer(v.emissiveMap.colorSpace)===It,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Tn,flipSided:v.side===Rn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:De&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(De&&v.extensions.multiDraw===!0||Ae)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ce.vertexUv1s=c.has(1),Ce.vertexUv2s=c.has(2),Ce.vertexUv3s=c.has(3),c.clear(),Ce}function g(v){const T=[];if(v.shaderID?T.push(v.shaderID):(T.push(v.customVertexShaderID),T.push(v.customFragmentShaderID)),v.defines!==void 0)for(const R in v.defines)T.push(R),T.push(v.defines[R]);return v.isRawShaderMaterial===!1&&(f(T,v),M(T,v),T.push(i.outputColorSpace)),T.push(v.customProgramCacheKey),T.join()}function f(v,T){v.push(T.precision),v.push(T.outputColorSpace),v.push(T.envMapMode),v.push(T.envMapCubeUVHeight),v.push(T.mapUv),v.push(T.alphaMapUv),v.push(T.lightMapUv),v.push(T.aoMapUv),v.push(T.bumpMapUv),v.push(T.normalMapUv),v.push(T.displacementMapUv),v.push(T.emissiveMapUv),v.push(T.metalnessMapUv),v.push(T.roughnessMapUv),v.push(T.anisotropyMapUv),v.push(T.clearcoatMapUv),v.push(T.clearcoatNormalMapUv),v.push(T.clearcoatRoughnessMapUv),v.push(T.iridescenceMapUv),v.push(T.iridescenceThicknessMapUv),v.push(T.sheenColorMapUv),v.push(T.sheenRoughnessMapUv),v.push(T.specularMapUv),v.push(T.specularColorMapUv),v.push(T.specularIntensityMapUv),v.push(T.transmissionMapUv),v.push(T.thicknessMapUv),v.push(T.combine),v.push(T.fogExp2),v.push(T.sizeAttenuation),v.push(T.morphTargetsCount),v.push(T.morphAttributeCount),v.push(T.numDirLights),v.push(T.numPointLights),v.push(T.numSpotLights),v.push(T.numSpotLightMaps),v.push(T.numHemiLights),v.push(T.numRectAreaLights),v.push(T.numDirLightShadows),v.push(T.numPointLightShadows),v.push(T.numSpotLightShadows),v.push(T.numSpotLightShadowsWithMaps),v.push(T.numLightProbes),v.push(T.shadowMapType),v.push(T.toneMapping),v.push(T.numClippingPlanes),v.push(T.numClipIntersection),v.push(T.depthPacking)}function M(v,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function b(v){const T=h[v.type];let R;if(T){const C=oi[T];R=Sm.clone(C.uniforms)}else R=v.uniforms;return R}function x(v,T){let R=u.get(T);return R!==void 0?++R.usedTimes:(R=new j1(i,T,v,s),l.push(R),u.set(T,R)),R}function w(v){if(--v.usedTimes===0){const T=l.indexOf(v);l[T]=l[l.length-1],l.pop(),u.delete(v.cacheKey),v.destroy()}}function S(v){o.remove(v)}function E(){o.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:b,acquireProgram:x,releaseProgram:w,releaseShaderCache:S,programs:l,dispose:E}}function rx(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function ax(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Ih(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Lh(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(d){let h=0;return d.isInstancedMesh&&(h+=2),d.isSkinnedMesh&&(h+=1),h}function o(d,h,m,_,g,f){let M=i[e];return M===void 0?(M={id:d.id,object:d,geometry:h,material:m,materialVariant:a(d),groupOrder:_,renderOrder:d.renderOrder,z:g,group:f},i[e]=M):(M.id=d.id,M.object=d,M.geometry=h,M.material=m,M.materialVariant=a(d),M.groupOrder=_,M.renderOrder=d.renderOrder,M.z=g,M.group=f),e++,M}function c(d,h,m,_,g,f){const M=o(d,h,m,_,g,f);m.transmission>0?n.push(M):m.transparent===!0?s.push(M):t.push(M)}function l(d,h,m,_,g,f){const M=o(d,h,m,_,g,f);m.transmission>0?n.unshift(M):m.transparent===!0?s.unshift(M):t.unshift(M)}function u(d,h,m){t.length>1&&t.sort(d||ax),n.length>1&&n.sort(h||Ih),s.length>1&&s.sort(h||Ih),m&&(t.reverse(),n.reverse(),s.reverse())}function p(){for(let d=e,h=i.length;d<h;d++){const m=i[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:p,sort:u}}function ox(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Lh,i.set(n,[a])):s>=r.length?(a=new Lh,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function cx(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new it};break;case"SpotLight":t={position:new D,direction:new D,color:new it,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new it,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new it,groundColor:new it};break;case"RectAreaLight":t={color:new it,position:new D,halfWidth:new D,halfHeight:new D};break}return i[e.id]=t,t}}}function lx(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let ux=0;function hx(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function dx(i){const e=new cx,t=lx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new D);const s=new D,r=new Rt,a=new Rt;function o(l){let u=0,p=0,d=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let h=0,m=0,_=0,g=0,f=0,M=0,b=0,x=0,w=0,S=0,E=0;l.sort(hx);for(let T=0,R=l.length;T<R;T++){const C=l[T],I=C.color,B=C.intensity,X=C.distance;let H=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===fs?H=C.shadow.map.texture:H=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)u+=I.r*B,p+=I.g*B,d+=I.b*B;else if(C.isLightProbe){for(let J=0;J<9;J++)n.probe[J].addScaledVector(C.sh.coefficients[J],B);E++}else if(C.isDirectionalLight){const J=e.get(C);if(J.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const z=C.shadow,L=t.get(C);L.shadowIntensity=z.intensity,L.shadowBias=z.bias,L.shadowNormalBias=z.normalBias,L.shadowRadius=z.radius,L.shadowMapSize=z.mapSize,n.directionalShadow[h]=L,n.directionalShadowMap[h]=H,n.directionalShadowMatrix[h]=C.shadow.matrix,M++}n.directional[h]=J,h++}else if(C.isSpotLight){const J=e.get(C);J.position.setFromMatrixPosition(C.matrixWorld),J.color.copy(I).multiplyScalar(B),J.distance=X,J.coneCos=Math.cos(C.angle),J.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),J.decay=C.decay,n.spot[_]=J;const z=C.shadow;if(C.map&&(n.spotLightMap[w]=C.map,w++,z.updateMatrices(C),C.castShadow&&S++),n.spotLightMatrix[_]=z.matrix,C.castShadow){const L=t.get(C);L.shadowIntensity=z.intensity,L.shadowBias=z.bias,L.shadowNormalBias=z.normalBias,L.shadowRadius=z.radius,L.shadowMapSize=z.mapSize,n.spotShadow[_]=L,n.spotShadowMap[_]=H,x++}_++}else if(C.isRectAreaLight){const J=e.get(C);J.color.copy(I).multiplyScalar(B),J.halfWidth.set(C.width*.5,0,0),J.halfHeight.set(0,C.height*.5,0),n.rectArea[g]=J,g++}else if(C.isPointLight){const J=e.get(C);if(J.color.copy(C.color).multiplyScalar(C.intensity),J.distance=C.distance,J.decay=C.decay,C.castShadow){const z=C.shadow,L=t.get(C);L.shadowIntensity=z.intensity,L.shadowBias=z.bias,L.shadowNormalBias=z.normalBias,L.shadowRadius=z.radius,L.shadowMapSize=z.mapSize,L.shadowCameraNear=z.camera.near,L.shadowCameraFar=z.camera.far,n.pointShadow[m]=L,n.pointShadowMap[m]=H,n.pointShadowMatrix[m]=C.shadow.matrix,b++}n.point[m]=J,m++}else if(C.isHemisphereLight){const J=e.get(C);J.skyColor.copy(C.color).multiplyScalar(B),J.groundColor.copy(C.groundColor).multiplyScalar(B),n.hemi[f]=J,f++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Be.LTC_FLOAT_1,n.rectAreaLTC2=Be.LTC_FLOAT_2):(n.rectAreaLTC1=Be.LTC_HALF_1,n.rectAreaLTC2=Be.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=p,n.ambient[2]=d;const v=n.hash;(v.directionalLength!==h||v.pointLength!==m||v.spotLength!==_||v.rectAreaLength!==g||v.hemiLength!==f||v.numDirectionalShadows!==M||v.numPointShadows!==b||v.numSpotShadows!==x||v.numSpotMaps!==w||v.numLightProbes!==E)&&(n.directional.length=h,n.spot.length=_,n.rectArea.length=g,n.point.length=m,n.hemi.length=f,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=x+w-S,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=E,v.directionalLength=h,v.pointLength=m,v.spotLength=_,v.rectAreaLength=g,v.hemiLength=f,v.numDirectionalShadows=M,v.numPointShadows=b,v.numSpotShadows=x,v.numSpotMaps=w,v.numLightProbes=E,n.version=ux++)}function c(l,u){let p=0,d=0,h=0,m=0,_=0;const g=u.matrixWorldInverse;for(let f=0,M=l.length;f<M;f++){const b=l[f];if(b.isDirectionalLight){const x=n.directional[p];x.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),p++}else if(b.isSpotLight){const x=n.spot[h];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),h++}else if(b.isRectAreaLight){const x=n.rectArea[m];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(g),a.identity(),r.copy(b.matrixWorld),r.premultiply(g),a.extractRotation(r),x.halfWidth.set(b.width*.5,0,0),x.halfHeight.set(0,b.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),m++}else if(b.isPointLight){const x=n.point[d];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(g),d++}else if(b.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(b.matrixWorld),x.direction.transformDirection(g),_++}}}return{setup:o,setupView:c,state:n}}function Nh(i){const e=new dx(i),t=[],n=[],s=[];function r(d){p.camera=d,t.length=0,n.length=0,s.length=0}function a(d){t.push(d)}function o(d){n.push(d)}function c(d){s.push(d)}function l(){e.setup(t)}function u(d){e.setupView(t,d)}const p={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:p,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function fx(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Nh(i),e.set(s,[o])):r>=a.length?(o=new Nh(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const px=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,mx=`uniform sampler2D shadow_pass;
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
}`,gx=[new D(1,0,0),new D(-1,0,0),new D(0,1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1)],vx=[new D(0,-1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1),new D(0,-1,0),new D(0,-1,0)],Dh=new Rt,Er=new D,Mc=new D;function xx(i,e,t){let n=new Nl;const s=new Ee,r=new Ee,a=new zt,o=new Tm,c=new Am,l={},u=t.maxTextureSize,p={[Ji]:Rn,[Rn]:Ji,[Tn]:Tn},d=new xn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ee},radius:{value:4}},vertexShader:px,fragmentShader:mx}),h=d.clone();h.defines.HORIZONTAL_PASS=1;const m=new Et;m.setAttribute("position",new $t(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new gt(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ia;let f=this.type;this.render=function(S,E,v){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;this.type===Sf&&(nt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ia);const T=i.getRenderTarget(),R=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),I=i.state;I.setBlending(Ai),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const B=f!==this.type;B&&E.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(H=>H.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,H=S.length;X<H;X++){const J=S[X],z=J.shadow;if(z===void 0){nt("WebGLShadowMap:",J,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const L=z.getFrameExtents();s.multiply(L),r.copy(z.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/L.x),s.x=r.x*L.x,z.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/L.y),s.y=r.y*L.y,z.mapSize.y=r.y));const V=i.state.buffers.depth.getReversed();if(z.camera._reversedDepth=V,z.map===null||B===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===Ar){if(J.isPointLight){nt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new pi(s.x,s.y,{format:fs,type:Ii,minFilter:cn,magFilter:cn,generateMipmaps:!1}),z.map.texture.name=J.name+".shadowMap",z.map.depthTexture=new sr(s.x,s.y,Qn),z.map.depthTexture.name=J.name+".shadowMapDepth",z.map.depthTexture.format=Li,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=ln,z.map.depthTexture.magFilter=ln}else J.isPointLight?(z.map=new Od(s.x),z.map.depthTexture=new Vp(s.x,mi)):(z.map=new pi(s.x,s.y),z.map.depthTexture=new sr(s.x,s.y,mi)),z.map.depthTexture.name=J.name+".shadowMap",z.map.depthTexture.format=Li,this.type===Ia?(z.map.depthTexture.compareFunction=V?Cl:Rl,z.map.depthTexture.minFilter=cn,z.map.depthTexture.magFilter=cn):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=ln,z.map.depthTexture.magFilter=ln);z.camera.updateProjectionMatrix()}const K=z.map.isWebGLCubeRenderTarget?6:1;for(let Z=0;Z<K;Z++){if(z.map.isWebGLCubeRenderTarget)i.setRenderTarget(z.map,Z),i.clear();else{Z===0&&(i.setRenderTarget(z.map),i.clear());const N=z.getViewport(Z);a.set(r.x*N.x,r.y*N.y,r.x*N.z,r.y*N.w),I.viewport(a)}if(J.isPointLight){const N=z.camera,Q=z.matrix,xe=J.distance||N.far;xe!==N.far&&(N.far=xe,N.updateProjectionMatrix()),Er.setFromMatrixPosition(J.matrixWorld),N.position.copy(Er),Mc.copy(N.position),Mc.add(gx[Z]),N.up.copy(vx[Z]),N.lookAt(Mc),N.updateMatrixWorld(),Q.makeTranslation(-Er.x,-Er.y,-Er.z),Dh.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),z._frustum.setFromProjectionMatrix(Dh,N.coordinateSystem,N.reversedDepth)}else z.updateMatrices(J);n=z.getFrustum(),x(E,v,z.camera,J,this.type)}z.isPointLightShadow!==!0&&this.type===Ar&&M(z,v),z.needsUpdate=!1}f=this.type,g.needsUpdate=!1,i.setRenderTarget(T,R,C)};function M(S,E){const v=e.update(_);d.defines.VSM_SAMPLES!==S.blurSamples&&(d.defines.VSM_SAMPLES=S.blurSamples,h.defines.VSM_SAMPLES=S.blurSamples,d.needsUpdate=!0,h.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new pi(s.x,s.y,{format:fs,type:Ii})),d.uniforms.shadow_pass.value=S.map.depthTexture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(E,null,v,d,_,null),h.uniforms.shadow_pass.value=S.mapPass.texture,h.uniforms.resolution.value=S.mapSize,h.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(E,null,v,h,_,null)}function b(S,E,v,T){let R=null;const C=v.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(C!==void 0)R=C;else if(R=v.isPointLight===!0?c:o,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){const I=R.uuid,B=E.uuid;let X=l[I];X===void 0&&(X={},l[I]=X);let H=X[B];H===void 0&&(H=R.clone(),X[B]=H,E.addEventListener("dispose",w)),R=H}if(R.visible=E.visible,R.wireframe=E.wireframe,T===Ar?R.side=E.shadowSide!==null?E.shadowSide:E.side:R.side=E.shadowSide!==null?E.shadowSide:p[E.side],R.alphaMap=E.alphaMap,R.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,R.map=E.map,R.clipShadows=E.clipShadows,R.clippingPlanes=E.clippingPlanes,R.clipIntersection=E.clipIntersection,R.displacementMap=E.displacementMap,R.displacementScale=E.displacementScale,R.displacementBias=E.displacementBias,R.wireframeLinewidth=E.wireframeLinewidth,R.linewidth=E.linewidth,v.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const I=i.properties.get(R);I.light=v}return R}function x(S,E,v,T,R){if(S.visible===!1)return;if(S.layers.test(E.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&R===Ar)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,S.matrixWorld);const B=e.update(S),X=S.material;if(Array.isArray(X)){const H=B.groups;for(let J=0,z=H.length;J<z;J++){const L=H[J],V=X[L.materialIndex];if(V&&V.visible){const K=b(S,V,T,R);S.onBeforeShadow(i,S,E,v,B,K,L),i.renderBufferDirect(v,null,B,K,S,L),S.onAfterShadow(i,S,E,v,B,K,L)}}}else if(X.visible){const H=b(S,X,T,R);S.onBeforeShadow(i,S,E,v,B,H,null),i.renderBufferDirect(v,null,B,H,S,null),S.onAfterShadow(i,S,E,v,B,H,null)}}const I=S.children;for(let B=0,X=I.length;B<X;B++)x(I[B],E,v,T,R)}function w(S){S.target.removeEventListener("dispose",w);for(const v in l){const T=l[v],R=S.target.uuid;R in T&&(T[R].dispose(),delete T[R])}}}function _x(i,e){function t(){let G=!1;const Se=new zt;let se=null;const Re=new zt(0,0,0,0);return{setMask:function(De){se!==De&&!G&&(i.colorMask(De,De,De,De),se=De)},setLocked:function(De){G=De},setClear:function(De,ae,Ce,Fe,ut){ut===!0&&(De*=Fe,ae*=Fe,Ce*=Fe),Se.set(De,ae,Ce,Fe),Re.equals(Se)===!1&&(i.clearColor(De,ae,Ce,Fe),Re.copy(Se))},reset:function(){G=!1,se=null,Re.set(-1,0,0,0)}}}function n(){let G=!1,Se=!1,se=null,Re=null,De=null;return{setReversed:function(ae){if(Se!==ae){const Ce=e.get("EXT_clip_control");ae?Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.ZERO_TO_ONE_EXT):Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.NEGATIVE_ONE_TO_ONE_EXT),Se=ae;const Fe=De;De=null,this.setClear(Fe)}},getReversed:function(){return Se},setTest:function(ae){ae?ne(i.DEPTH_TEST):de(i.DEPTH_TEST)},setMask:function(ae){se!==ae&&!G&&(i.depthMask(ae),se=ae)},setFunc:function(ae){if(Se&&(ae=tp[ae]),Re!==ae){switch(ae){case wc:i.depthFunc(i.NEVER);break;case Tc:i.depthFunc(i.ALWAYS);break;case Ac:i.depthFunc(i.LESS);break;case nr:i.depthFunc(i.LEQUAL);break;case Rc:i.depthFunc(i.EQUAL);break;case Cc:i.depthFunc(i.GEQUAL);break;case Pc:i.depthFunc(i.GREATER);break;case Ic:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Re=ae}},setLocked:function(ae){G=ae},setClear:function(ae){De!==ae&&(De=ae,Se&&(ae=1-ae),i.clearDepth(ae))},reset:function(){G=!1,se=null,Re=null,De=null,Se=!1}}}function s(){let G=!1,Se=null,se=null,Re=null,De=null,ae=null,Ce=null,Fe=null,ut=null;return{setTest:function(te){G||(te?ne(i.STENCIL_TEST):de(i.STENCIL_TEST))},setMask:function(te){Se!==te&&!G&&(i.stencilMask(te),Se=te)},setFunc:function(te,we,Ue){(se!==te||Re!==we||De!==Ue)&&(i.stencilFunc(te,we,Ue),se=te,Re=we,De=Ue)},setOp:function(te,we,Ue){(ae!==te||Ce!==we||Fe!==Ue)&&(i.stencilOp(te,we,Ue),ae=te,Ce=we,Fe=Ue)},setLocked:function(te){G=te},setClear:function(te){ut!==te&&(i.clearStencil(te),ut=te)},reset:function(){G=!1,Se=null,se=null,Re=null,De=null,ae=null,Ce=null,Fe=null,ut=null}}}const r=new t,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let u={},p={},d={},h=new WeakMap,m=[],_=null,g=!1,f=null,M=null,b=null,x=null,w=null,S=null,E=null,v=new it(0,0,0),T=0,R=!1,C=null,I=null,B=null,X=null,H=null;const J=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,L=0;const V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(L=parseFloat(/^WebGL (\d)/.exec(V)[1]),z=L>=1):V.indexOf("OpenGL ES")!==-1&&(L=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),z=L>=2);let K=null,Z={};const N=i.getParameter(i.SCISSOR_BOX),Q=i.getParameter(i.VIEWPORT),xe=new zt().fromArray(N),ce=new zt().fromArray(Q);function W(G,Se,se,Re){const De=new Uint8Array(4),ae=i.createTexture();i.bindTexture(G,ae),i.texParameteri(G,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(G,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ce=0;Ce<se;Ce++)G===i.TEXTURE_3D||G===i.TEXTURE_2D_ARRAY?i.texImage3D(Se,0,i.RGBA,1,1,Re,0,i.RGBA,i.UNSIGNED_BYTE,De):i.texImage2D(Se+Ce,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,De);return ae}const j={};j[i.TEXTURE_2D]=W(i.TEXTURE_2D,i.TEXTURE_2D,1),j[i.TEXTURE_CUBE_MAP]=W(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[i.TEXTURE_2D_ARRAY]=W(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),j[i.TEXTURE_3D]=W(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(i.DEPTH_TEST),a.setFunc(nr),Le(!1),U(Su),ne(i.CULL_FACE),ue(Ai);function ne(G){u[G]!==!0&&(i.enable(G),u[G]=!0)}function de(G){u[G]!==!1&&(i.disable(G),u[G]=!1)}function me(G,Se){return d[G]!==Se?(i.bindFramebuffer(G,Se),d[G]=Se,G===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=Se),G===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=Se),!0):!1}function Ae(G,Se){let se=m,Re=!1;if(G){se=h.get(Se),se===void 0&&(se=[],h.set(Se,se));const De=G.textures;if(se.length!==De.length||se[0]!==i.COLOR_ATTACHMENT0){for(let ae=0,Ce=De.length;ae<Ce;ae++)se[ae]=i.COLOR_ATTACHMENT0+ae;se.length=De.length,Re=!0}}else se[0]!==i.BACK&&(se[0]=i.BACK,Re=!0);Re&&i.drawBuffers(se)}function He(G){return _!==G?(i.useProgram(G),_=G,!0):!1}const Oe={[cs]:i.FUNC_ADD,[Ef]:i.FUNC_SUBTRACT,[wf]:i.FUNC_REVERSE_SUBTRACT};Oe[Tf]=i.MIN,Oe[Af]=i.MAX;const ve={[Rf]:i.ZERO,[Cf]:i.ONE,[Pf]:i.SRC_COLOR,[bc]:i.SRC_ALPHA,[Ff]:i.SRC_ALPHA_SATURATE,[Df]:i.DST_COLOR,[Lf]:i.DST_ALPHA,[If]:i.ONE_MINUS_SRC_COLOR,[Ec]:i.ONE_MINUS_SRC_ALPHA,[Uf]:i.ONE_MINUS_DST_COLOR,[Nf]:i.ONE_MINUS_DST_ALPHA,[Of]:i.CONSTANT_COLOR,[Bf]:i.ONE_MINUS_CONSTANT_COLOR,[kf]:i.CONSTANT_ALPHA,[zf]:i.ONE_MINUS_CONSTANT_ALPHA};function ue(G,Se,se,Re,De,ae,Ce,Fe,ut,te){if(G===Ai){g===!0&&(de(i.BLEND),g=!1);return}if(g===!1&&(ne(i.BLEND),g=!0),G!==bf){if(G!==f||te!==R){if((M!==cs||w!==cs)&&(i.blendEquation(i.FUNC_ADD),M=cs,w=cs),te)switch(G){case Zs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case tr:i.blendFunc(i.ONE,i.ONE);break;case bu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Eu:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:xt("WebGLState: Invalid blending: ",G);break}else switch(G){case Zs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case tr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case bu:xt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Eu:xt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:xt("WebGLState: Invalid blending: ",G);break}b=null,x=null,S=null,E=null,v.set(0,0,0),T=0,f=G,R=te}return}De=De||Se,ae=ae||se,Ce=Ce||Re,(Se!==M||De!==w)&&(i.blendEquationSeparate(Oe[Se],Oe[De]),M=Se,w=De),(se!==b||Re!==x||ae!==S||Ce!==E)&&(i.blendFuncSeparate(ve[se],ve[Re],ve[ae],ve[Ce]),b=se,x=Re,S=ae,E=Ce),(Fe.equals(v)===!1||ut!==T)&&(i.blendColor(Fe.r,Fe.g,Fe.b,ut),v.copy(Fe),T=ut),f=G,R=!1}function ge(G,Se){G.side===Tn?de(i.CULL_FACE):ne(i.CULL_FACE);let se=G.side===Rn;Se&&(se=!se),Le(se),G.blending===Zs&&G.transparent===!1?ue(Ai):ue(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),a.setFunc(G.depthFunc),a.setTest(G.depthTest),a.setMask(G.depthWrite),r.setMask(G.colorWrite);const Re=G.stencilWrite;o.setTest(Re),Re&&(o.setMask(G.stencilWriteMask),o.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),o.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),ie(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?ne(i.SAMPLE_ALPHA_TO_COVERAGE):de(i.SAMPLE_ALPHA_TO_COVERAGE)}function Le(G){C!==G&&(G?i.frontFace(i.CW):i.frontFace(i.CCW),C=G)}function U(G){G!==yf?(ne(i.CULL_FACE),G!==I&&(G===Su?i.cullFace(i.BACK):G===Mf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):de(i.CULL_FACE),I=G}function k(G){G!==B&&(z&&i.lineWidth(G),B=G)}function ie(G,Se,se){G?(ne(i.POLYGON_OFFSET_FILL),(X!==Se||H!==se)&&(X=Se,H=se,a.getReversed()&&(Se=-Se),i.polygonOffset(Se,se))):de(i.POLYGON_OFFSET_FILL)}function Te(G){G?ne(i.SCISSOR_TEST):de(i.SCISSOR_TEST)}function Ne(G){G===void 0&&(G=i.TEXTURE0+J-1),K!==G&&(i.activeTexture(G),K=G)}function O(G,Se,se){se===void 0&&(K===null?se=i.TEXTURE0+J-1:se=K);let Re=Z[se];Re===void 0&&(Re={type:void 0,texture:void 0},Z[se]=Re),(Re.type!==G||Re.texture!==Se)&&(K!==se&&(i.activeTexture(se),K=se),i.bindTexture(G,Se||j[G]),Re.type=G,Re.texture=Se)}function st(){const G=Z[K];G!==void 0&&G.type!==void 0&&(i.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function Ye(){try{i.compressedTexImage2D(...arguments)}catch(G){xt("WebGLState:",G)}}function P(){try{i.compressedTexImage3D(...arguments)}catch(G){xt("WebGLState:",G)}}function y(){try{i.texSubImage2D(...arguments)}catch(G){xt("WebGLState:",G)}}function q(){try{i.texSubImage3D(...arguments)}catch(G){xt("WebGLState:",G)}}function ee(){try{i.compressedTexSubImage2D(...arguments)}catch(G){xt("WebGLState:",G)}}function pe(){try{i.compressedTexSubImage3D(...arguments)}catch(G){xt("WebGLState:",G)}}function ye(){try{i.texStorage2D(...arguments)}catch(G){xt("WebGLState:",G)}}function Me(){try{i.texStorage3D(...arguments)}catch(G){xt("WebGLState:",G)}}function re(){try{i.texImage2D(...arguments)}catch(G){xt("WebGLState:",G)}}function _e(){try{i.texImage3D(...arguments)}catch(G){xt("WebGLState:",G)}}function Ie(G){return p[G]!==void 0?p[G]:i.getParameter(G)}function F(G,Se){p[G]!==Se&&(i.pixelStorei(G,Se),p[G]=Se)}function $(G){xe.equals(G)===!1&&(i.scissor(G.x,G.y,G.z,G.w),xe.copy(G))}function oe(G){ce.equals(G)===!1&&(i.viewport(G.x,G.y,G.z,G.w),ce.copy(G))}function be(G,Se){let se=l.get(Se);se===void 0&&(se=new WeakMap,l.set(Se,se));let Re=se.get(G);Re===void 0&&(Re=i.getUniformBlockIndex(Se,G.name),se.set(G,Re))}function Pe(G,Se){const Re=l.get(Se).get(G);c.get(Se)!==Re&&(i.uniformBlockBinding(Se,Re,G.__bindingPointIndex),c.set(Se,Re))}function ke(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},p={},K=null,Z={},d={},h=new WeakMap,m=[],_=null,g=!1,f=null,M=null,b=null,x=null,w=null,S=null,E=null,v=new it(0,0,0),T=0,R=!1,C=null,I=null,B=null,X=null,H=null,xe.set(0,0,i.canvas.width,i.canvas.height),ce.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ne,disable:de,bindFramebuffer:me,drawBuffers:Ae,useProgram:He,setBlending:ue,setMaterial:ge,setFlipSided:Le,setCullFace:U,setLineWidth:k,setPolygonOffset:ie,setScissorTest:Te,activeTexture:Ne,bindTexture:O,unbindTexture:st,compressedTexImage2D:Ye,compressedTexImage3D:P,texImage2D:re,texImage3D:_e,pixelStorei:F,getParameter:Ie,updateUBOMapping:be,uniformBlockBinding:Pe,texStorage2D:ye,texStorage3D:Me,texSubImage2D:y,texSubImage3D:q,compressedTexSubImage2D:ee,compressedTexSubImage3D:pe,scissor:$,viewport:oe,reset:ke}}function yx(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ee,u=new WeakMap,p=new Set;let d;const h=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(P,y){return m?new OffscreenCanvas(P,y):qa("canvas")}function g(P,y,q){let ee=1;const pe=Ye(P);if((pe.width>q||pe.height>q)&&(ee=q/Math.max(pe.width,pe.height)),ee<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const ye=Math.floor(ee*pe.width),Me=Math.floor(ee*pe.height);d===void 0&&(d=_(ye,Me));const re=y?_(ye,Me):d;return re.width=ye,re.height=Me,re.getContext("2d").drawImage(P,0,0,ye,Me),nt("WebGLRenderer: Texture has been resized from ("+pe.width+"x"+pe.height+") to ("+ye+"x"+Me+")."),re}else return"data"in P&&nt("WebGLRenderer: Image in DataTexture is too big ("+pe.width+"x"+pe.height+")."),P;return P}function f(P){return P.generateMipmaps}function M(P){i.generateMipmap(P)}function b(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(P,y,q,ee,pe,ye=!1){if(P!==null){if(i[P]!==void 0)return i[P];nt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let Me;ee&&(Me=e.get("EXT_texture_norm16"),Me||nt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let re=y;if(y===i.RED&&(q===i.FLOAT&&(re=i.R32F),q===i.HALF_FLOAT&&(re=i.R16F),q===i.UNSIGNED_BYTE&&(re=i.R8),q===i.UNSIGNED_SHORT&&Me&&(re=Me.R16_EXT),q===i.SHORT&&Me&&(re=Me.R16_SNORM_EXT)),y===i.RED_INTEGER&&(q===i.UNSIGNED_BYTE&&(re=i.R8UI),q===i.UNSIGNED_SHORT&&(re=i.R16UI),q===i.UNSIGNED_INT&&(re=i.R32UI),q===i.BYTE&&(re=i.R8I),q===i.SHORT&&(re=i.R16I),q===i.INT&&(re=i.R32I)),y===i.RG&&(q===i.FLOAT&&(re=i.RG32F),q===i.HALF_FLOAT&&(re=i.RG16F),q===i.UNSIGNED_BYTE&&(re=i.RG8),q===i.UNSIGNED_SHORT&&Me&&(re=Me.RG16_EXT),q===i.SHORT&&Me&&(re=Me.RG16_SNORM_EXT)),y===i.RG_INTEGER&&(q===i.UNSIGNED_BYTE&&(re=i.RG8UI),q===i.UNSIGNED_SHORT&&(re=i.RG16UI),q===i.UNSIGNED_INT&&(re=i.RG32UI),q===i.BYTE&&(re=i.RG8I),q===i.SHORT&&(re=i.RG16I),q===i.INT&&(re=i.RG32I)),y===i.RGB_INTEGER&&(q===i.UNSIGNED_BYTE&&(re=i.RGB8UI),q===i.UNSIGNED_SHORT&&(re=i.RGB16UI),q===i.UNSIGNED_INT&&(re=i.RGB32UI),q===i.BYTE&&(re=i.RGB8I),q===i.SHORT&&(re=i.RGB16I),q===i.INT&&(re=i.RGB32I)),y===i.RGBA_INTEGER&&(q===i.UNSIGNED_BYTE&&(re=i.RGBA8UI),q===i.UNSIGNED_SHORT&&(re=i.RGBA16UI),q===i.UNSIGNED_INT&&(re=i.RGBA32UI),q===i.BYTE&&(re=i.RGBA8I),q===i.SHORT&&(re=i.RGBA16I),q===i.INT&&(re=i.RGBA32I)),y===i.RGB&&(q===i.UNSIGNED_SHORT&&Me&&(re=Me.RGB16_EXT),q===i.SHORT&&Me&&(re=Me.RGB16_SNORM_EXT),q===i.UNSIGNED_INT_5_9_9_9_REV&&(re=i.RGB9_E5),q===i.UNSIGNED_INT_10F_11F_11F_REV&&(re=i.R11F_G11F_B10F)),y===i.RGBA){const _e=ye?Xa:_t.getTransfer(pe);q===i.FLOAT&&(re=i.RGBA32F),q===i.HALF_FLOAT&&(re=i.RGBA16F),q===i.UNSIGNED_BYTE&&(re=_e===It?i.SRGB8_ALPHA8:i.RGBA8),q===i.UNSIGNED_SHORT&&Me&&(re=Me.RGBA16_EXT),q===i.SHORT&&Me&&(re=Me.RGBA16_SNORM_EXT),q===i.UNSIGNED_SHORT_4_4_4_4&&(re=i.RGBA4),q===i.UNSIGNED_SHORT_5_5_5_1&&(re=i.RGB5_A1)}return(re===i.R16F||re===i.R32F||re===i.RG16F||re===i.RG32F||re===i.RGBA16F||re===i.RGBA32F)&&e.get("EXT_color_buffer_float"),re}function w(P,y){let q;return P?y===null||y===mi||y===Fr?q=i.DEPTH24_STENCIL8:y===Qn?q=i.DEPTH32F_STENCIL8:y===Ur&&(q=i.DEPTH24_STENCIL8,nt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===mi||y===Fr?q=i.DEPTH_COMPONENT24:y===Qn?q=i.DEPTH_COMPONENT32F:y===Ur&&(q=i.DEPTH_COMPONENT16),q}function S(P,y){return f(P)===!0||P.isFramebufferTexture&&P.minFilter!==ln&&P.minFilter!==cn?Math.log2(Math.max(y.width,y.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?y.mipmaps.length:1}function E(P){const y=P.target;y.removeEventListener("dispose",E),T(y),y.isVideoTexture&&u.delete(y),y.isHTMLTexture&&p.delete(y)}function v(P){const y=P.target;y.removeEventListener("dispose",v),C(y)}function T(P){const y=n.get(P);if(y.__webglInit===void 0)return;const q=P.source,ee=h.get(q);if(ee){const pe=ee[y.__cacheKey];pe.usedTimes--,pe.usedTimes===0&&R(P),Object.keys(ee).length===0&&h.delete(q)}n.remove(P)}function R(P){const y=n.get(P);i.deleteTexture(y.__webglTexture);const q=P.source,ee=h.get(q);delete ee[y.__cacheKey],a.memory.textures--}function C(P){const y=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(y.__webglFramebuffer[ee]))for(let pe=0;pe<y.__webglFramebuffer[ee].length;pe++)i.deleteFramebuffer(y.__webglFramebuffer[ee][pe]);else i.deleteFramebuffer(y.__webglFramebuffer[ee]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[ee])}else{if(Array.isArray(y.__webglFramebuffer))for(let ee=0;ee<y.__webglFramebuffer.length;ee++)i.deleteFramebuffer(y.__webglFramebuffer[ee]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let ee=0;ee<y.__webglColorRenderbuffer.length;ee++)y.__webglColorRenderbuffer[ee]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[ee]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const q=P.textures;for(let ee=0,pe=q.length;ee<pe;ee++){const ye=n.get(q[ee]);ye.__webglTexture&&(i.deleteTexture(ye.__webglTexture),a.memory.textures--),n.remove(q[ee])}n.remove(P)}let I=0;function B(){I=0}function X(){return I}function H(P){I=P}function J(){const P=I;return P>=s.maxTextures&&nt("WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),I+=1,P}function z(P){const y=[];return y.push(P.wrapS),y.push(P.wrapT),y.push(P.wrapR||0),y.push(P.magFilter),y.push(P.minFilter),y.push(P.anisotropy),y.push(P.internalFormat),y.push(P.format),y.push(P.type),y.push(P.generateMipmaps),y.push(P.premultiplyAlpha),y.push(P.flipY),y.push(P.unpackAlignment),y.push(P.colorSpace),y.join()}function L(P,y){const q=n.get(P);if(P.isVideoTexture&&O(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&q.__version!==P.version){const ee=P.image;if(ee===null)nt("WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)nt("WebGLRenderer: Texture marked for update but image is incomplete");else{de(q,P,y);return}}else P.isExternalTexture&&(q.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,q.__webglTexture,i.TEXTURE0+y)}function V(P,y){const q=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&q.__version!==P.version){de(q,P,y);return}else P.isExternalTexture&&(q.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,q.__webglTexture,i.TEXTURE0+y)}function K(P,y){const q=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&q.__version!==P.version){de(q,P,y);return}t.bindTexture(i.TEXTURE_3D,q.__webglTexture,i.TEXTURE0+y)}function Z(P,y){const q=n.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&q.__version!==P.version){me(q,P,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture,i.TEXTURE0+y)}const N={[Qi]:i.REPEAT,[wi]:i.CLAMP_TO_EDGE,[Lc]:i.MIRRORED_REPEAT},Q={[ln]:i.NEAREST,[Vf]:i.NEAREST_MIPMAP_NEAREST,[Zr]:i.NEAREST_MIPMAP_LINEAR,[cn]:i.LINEAR,[zo]:i.LINEAR_MIPMAP_NEAREST,[qi]:i.LINEAR_MIPMAP_LINEAR},xe={[qf]:i.NEVER,[Jf]:i.ALWAYS,[Yf]:i.LESS,[Rl]:i.LEQUAL,[$f]:i.EQUAL,[Cl]:i.GEQUAL,[Kf]:i.GREATER,[Zf]:i.NOTEQUAL};function ce(P,y){if(y.type===Qn&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===cn||y.magFilter===zo||y.magFilter===Zr||y.magFilter===qi||y.minFilter===cn||y.minFilter===zo||y.minFilter===Zr||y.minFilter===qi)&&nt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,N[y.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,N[y.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,N[y.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,Q[y.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,Q[y.minFilter]),y.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,xe[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===ln||y.minFilter!==Zr&&y.minFilter!==qi||y.type===Qn&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const q=e.get("EXT_texture_filter_anisotropic");i.texParameterf(P,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function W(P,y){let q=!1;P.__webglInit===void 0&&(P.__webglInit=!0,y.addEventListener("dispose",E));const ee=y.source;let pe=h.get(ee);pe===void 0&&(pe={},h.set(ee,pe));const ye=z(y);if(ye!==P.__cacheKey){pe[ye]===void 0&&(pe[ye]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,q=!0),pe[ye].usedTimes++;const Me=pe[P.__cacheKey];Me!==void 0&&(pe[P.__cacheKey].usedTimes--,Me.usedTimes===0&&R(y)),P.__cacheKey=ye,P.__webglTexture=pe[ye].texture}return q}function j(P,y,q){return Math.floor(Math.floor(P/q)/y)}function ne(P,y,q,ee){const ye=P.updateRanges;if(ye.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,q,ee,y.data);else{ye.sort((F,$)=>F.start-$.start);let Me=0;for(let F=1;F<ye.length;F++){const $=ye[Me],oe=ye[F],be=$.start+$.count,Pe=j(oe.start,y.width,4),ke=j($.start,y.width,4);oe.start<=be+1&&Pe===ke&&j(oe.start+oe.count-1,y.width,4)===Pe?$.count=Math.max($.count,oe.start+oe.count-$.start):(++Me,ye[Me]=oe)}ye.length=Me+1;const re=t.getParameter(i.UNPACK_ROW_LENGTH),_e=t.getParameter(i.UNPACK_SKIP_PIXELS),Ie=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let F=0,$=ye.length;F<$;F++){const oe=ye[F],be=Math.floor(oe.start/4),Pe=Math.ceil(oe.count/4),ke=be%y.width,G=Math.floor(be/y.width),Se=Pe,se=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,ke),t.pixelStorei(i.UNPACK_SKIP_ROWS,G),t.texSubImage2D(i.TEXTURE_2D,0,ke,G,Se,se,q,ee,y.data)}P.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,re),t.pixelStorei(i.UNPACK_SKIP_PIXELS,_e),t.pixelStorei(i.UNPACK_SKIP_ROWS,Ie)}}function de(P,y,q){let ee=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(ee=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(ee=i.TEXTURE_3D);const pe=W(P,y),ye=y.source;t.bindTexture(ee,P.__webglTexture,i.TEXTURE0+q);const Me=n.get(ye);if(ye.version!==Me.__version||pe===!0){if(t.activeTexture(i.TEXTURE0+q),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){const se=_t.getPrimaries(_t.workingColorSpace),Re=y.colorSpace===Xi?null:_t.getPrimaries(y.colorSpace),De=y.colorSpace===Xi||se===Re?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,De)}t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment);let _e=g(y.image,!1,s.maxTextureSize);_e=st(y,_e);const Ie=r.convert(y.format,y.colorSpace),F=r.convert(y.type);let $=x(y.internalFormat,Ie,F,y.normalized,y.colorSpace,y.isVideoTexture);ce(ee,y);let oe;const be=y.mipmaps,Pe=y.isVideoTexture!==!0,ke=Me.__version===void 0||pe===!0,G=ye.dataReady,Se=S(y,_e);if(y.isDepthTexture)$=w(y.format===us,y.type),ke&&(Pe?t.texStorage2D(i.TEXTURE_2D,1,$,_e.width,_e.height):t.texImage2D(i.TEXTURE_2D,0,$,_e.width,_e.height,0,Ie,F,null));else if(y.isDataTexture)if(be.length>0){Pe&&ke&&t.texStorage2D(i.TEXTURE_2D,Se,$,be[0].width,be[0].height);for(let se=0,Re=be.length;se<Re;se++)oe=be[se],Pe?G&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,oe.width,oe.height,Ie,F,oe.data):t.texImage2D(i.TEXTURE_2D,se,$,oe.width,oe.height,0,Ie,F,oe.data);y.generateMipmaps=!1}else Pe?(ke&&t.texStorage2D(i.TEXTURE_2D,Se,$,_e.width,_e.height),G&&ne(y,_e,Ie,F)):t.texImage2D(i.TEXTURE_2D,0,$,_e.width,_e.height,0,Ie,F,_e.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Pe&&ke&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,$,be[0].width,be[0].height,_e.depth);for(let se=0,Re=be.length;se<Re;se++)if(oe=be[se],y.format!==jn)if(Ie!==null)if(Pe){if(G)if(y.layerUpdates.size>0){const De=dh(oe.width,oe.height,y.format,y.type);for(const ae of y.layerUpdates){const Ce=oe.data.subarray(ae*De/oe.data.BYTES_PER_ELEMENT,(ae+1)*De/oe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,ae,oe.width,oe.height,1,Ie,Ce)}y.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,oe.width,oe.height,_e.depth,Ie,oe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,se,$,oe.width,oe.height,_e.depth,0,oe.data,0,0);else nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Pe?G&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,oe.width,oe.height,_e.depth,Ie,F,oe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,se,$,oe.width,oe.height,_e.depth,0,Ie,F,oe.data)}else{Pe&&ke&&t.texStorage2D(i.TEXTURE_2D,Se,$,be[0].width,be[0].height);for(let se=0,Re=be.length;se<Re;se++)oe=be[se],y.format!==jn?Ie!==null?Pe?G&&t.compressedTexSubImage2D(i.TEXTURE_2D,se,0,0,oe.width,oe.height,Ie,oe.data):t.compressedTexImage2D(i.TEXTURE_2D,se,$,oe.width,oe.height,0,oe.data):nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Pe?G&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,oe.width,oe.height,Ie,F,oe.data):t.texImage2D(i.TEXTURE_2D,se,$,oe.width,oe.height,0,Ie,F,oe.data)}else if(y.isDataArrayTexture)if(Pe){if(ke&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,$,_e.width,_e.height,_e.depth),G)if(y.layerUpdates.size>0){const se=dh(_e.width,_e.height,y.format,y.type);for(const Re of y.layerUpdates){const De=_e.data.subarray(Re*se/_e.data.BYTES_PER_ELEMENT,(Re+1)*se/_e.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Re,_e.width,_e.height,1,Ie,F,De)}y.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,_e.width,_e.height,_e.depth,Ie,F,_e.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,$,_e.width,_e.height,_e.depth,0,Ie,F,_e.data);else if(y.isData3DTexture)Pe?(ke&&t.texStorage3D(i.TEXTURE_3D,Se,$,_e.width,_e.height,_e.depth),G&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,_e.width,_e.height,_e.depth,Ie,F,_e.data)):t.texImage3D(i.TEXTURE_3D,0,$,_e.width,_e.height,_e.depth,0,Ie,F,_e.data);else if(y.isFramebufferTexture){if(ke)if(Pe)t.texStorage2D(i.TEXTURE_2D,Se,$,_e.width,_e.height);else{let se=_e.width,Re=_e.height;for(let De=0;De<Se;De++)t.texImage2D(i.TEXTURE_2D,De,$,se,Re,0,Ie,F,null),se>>=1,Re>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in i){const se=i.canvas;if(se.hasAttribute("layoutsubtree")||se.setAttribute("layoutsubtree","true"),_e.parentNode!==se){se.appendChild(_e),p.add(y),se.onpaint=Re=>{const De=Re.changedElements;for(const ae of p)De.includes(ae.image)&&(ae.needsUpdate=!0)},se.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,_e);else{const De=i.RGBA,ae=i.RGBA,Ce=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,De,ae,Ce,_e)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(be.length>0){if(Pe&&ke){const se=Ye(be[0]);t.texStorage2D(i.TEXTURE_2D,Se,$,se.width,se.height)}for(let se=0,Re=be.length;se<Re;se++)oe=be[se],Pe?G&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,Ie,F,oe):t.texImage2D(i.TEXTURE_2D,se,$,Ie,F,oe);y.generateMipmaps=!1}else if(Pe){if(ke){const se=Ye(_e);t.texStorage2D(i.TEXTURE_2D,Se,$,se.width,se.height)}G&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ie,F,_e)}else t.texImage2D(i.TEXTURE_2D,0,$,Ie,F,_e);f(y)&&M(ee),Me.__version=ye.version,y.onUpdate&&y.onUpdate(y)}P.__version=y.version}function me(P,y,q){if(y.image.length!==6)return;const ee=W(P,y),pe=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+q);const ye=n.get(pe);if(pe.version!==ye.__version||ee===!0){t.activeTexture(i.TEXTURE0+q);const Me=_t.getPrimaries(_t.workingColorSpace),re=y.colorSpace===Xi?null:_t.getPrimaries(y.colorSpace),_e=y.colorSpace===Xi||Me===re?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);const Ie=y.isCompressedTexture||y.image[0].isCompressedTexture,F=y.image[0]&&y.image[0].isDataTexture,$=[];for(let ae=0;ae<6;ae++)!Ie&&!F?$[ae]=g(y.image[ae],!0,s.maxCubemapSize):$[ae]=F?y.image[ae].image:y.image[ae],$[ae]=st(y,$[ae]);const oe=$[0],be=r.convert(y.format,y.colorSpace),Pe=r.convert(y.type),ke=x(y.internalFormat,be,Pe,y.normalized,y.colorSpace),G=y.isVideoTexture!==!0,Se=ye.__version===void 0||ee===!0,se=pe.dataReady;let Re=S(y,oe);ce(i.TEXTURE_CUBE_MAP,y);let De;if(Ie){G&&Se&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Re,ke,oe.width,oe.height);for(let ae=0;ae<6;ae++){De=$[ae].mipmaps;for(let Ce=0;Ce<De.length;Ce++){const Fe=De[Ce];y.format!==jn?be!==null?G?se&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ce,0,0,Fe.width,Fe.height,be,Fe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ce,ke,Fe.width,Fe.height,0,Fe.data):nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):G?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ce,0,0,Fe.width,Fe.height,be,Pe,Fe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ce,ke,Fe.width,Fe.height,0,be,Pe,Fe.data)}}}else{if(De=y.mipmaps,G&&Se){De.length>0&&Re++;const ae=Ye($[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Re,ke,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(F){G?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,$[ae].width,$[ae].height,be,Pe,$[ae].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,ke,$[ae].width,$[ae].height,0,be,Pe,$[ae].data);for(let Ce=0;Ce<De.length;Ce++){const ut=De[Ce].image[ae].image;G?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ce+1,0,0,ut.width,ut.height,be,Pe,ut.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ce+1,ke,ut.width,ut.height,0,be,Pe,ut.data)}}else{G?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,be,Pe,$[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,ke,be,Pe,$[ae]);for(let Ce=0;Ce<De.length;Ce++){const Fe=De[Ce];G?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ce+1,0,0,be,Pe,Fe.image[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ce+1,ke,be,Pe,Fe.image[ae])}}}f(y)&&M(i.TEXTURE_CUBE_MAP),ye.__version=pe.version,y.onUpdate&&y.onUpdate(y)}P.__version=y.version}function Ae(P,y,q,ee,pe,ye){const Me=r.convert(q.format,q.colorSpace),re=r.convert(q.type),_e=x(q.internalFormat,Me,re,q.normalized,q.colorSpace),Ie=n.get(y),F=n.get(q);if(F.__renderTarget=y,!Ie.__hasExternalTextures){const $=Math.max(1,y.width>>ye),oe=Math.max(1,y.height>>ye);pe===i.TEXTURE_3D||pe===i.TEXTURE_2D_ARRAY?t.texImage3D(pe,ye,_e,$,oe,y.depth,0,Me,re,null):t.texImage2D(pe,ye,_e,$,oe,0,Me,re,null)}t.bindFramebuffer(i.FRAMEBUFFER,P),Ne(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ee,pe,F.__webglTexture,0,Te(y)):(pe===i.TEXTURE_2D||pe>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&pe<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ee,pe,F.__webglTexture,ye),t.bindFramebuffer(i.FRAMEBUFFER,null)}function He(P,y,q){if(i.bindRenderbuffer(i.RENDERBUFFER,P),y.depthBuffer){const ee=y.depthTexture,pe=ee&&ee.isDepthTexture?ee.type:null,ye=w(y.stencilBuffer,pe),Me=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ne(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Te(y),ye,y.width,y.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,Te(y),ye,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,ye,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Me,i.RENDERBUFFER,P)}else{const ee=y.textures;for(let pe=0;pe<ee.length;pe++){const ye=ee[pe],Me=r.convert(ye.format,ye.colorSpace),re=r.convert(ye.type),_e=x(ye.internalFormat,Me,re,ye.normalized,ye.colorSpace);Ne(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Te(y),_e,y.width,y.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,Te(y),_e,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,_e,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Oe(P,y,q){const ee=y.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,P),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const pe=n.get(y.depthTexture);if(pe.__renderTarget=y,(!pe.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),ee){if(pe.__webglInit===void 0&&(pe.__webglInit=!0,y.depthTexture.addEventListener("dispose",E)),pe.__webglTexture===void 0){pe.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,pe.__webglTexture),ce(i.TEXTURE_CUBE_MAP,y.depthTexture);const Ie=r.convert(y.depthTexture.format),F=r.convert(y.depthTexture.type);let $;y.depthTexture.format===Li?$=i.DEPTH_COMPONENT24:y.depthTexture.format===us&&($=i.DEPTH24_STENCIL8);for(let oe=0;oe<6;oe++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,$,y.width,y.height,0,Ie,F,null)}}else L(y.depthTexture,0);const ye=pe.__webglTexture,Me=Te(y),re=ee?i.TEXTURE_CUBE_MAP_POSITIVE_X+q:i.TEXTURE_2D,_e=y.depthTexture.format===us?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(y.depthTexture.format===Li)Ne(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,_e,re,ye,0,Me):i.framebufferTexture2D(i.FRAMEBUFFER,_e,re,ye,0);else if(y.depthTexture.format===us)Ne(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,_e,re,ye,0,Me):i.framebufferTexture2D(i.FRAMEBUFFER,_e,re,ye,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ve(P){const y=n.get(P),q=P.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==P.depthTexture){const ee=P.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),ee){const pe=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,ee.removeEventListener("dispose",pe)};ee.addEventListener("dispose",pe),y.__depthDisposeCallback=pe}y.__boundDepthTexture=ee}if(P.depthTexture&&!y.__autoAllocateDepthBuffer)if(q)for(let ee=0;ee<6;ee++)Oe(y.__webglFramebuffer[ee],P,ee);else{const ee=P.texture.mipmaps;ee&&ee.length>0?Oe(y.__webglFramebuffer[0],P,0):Oe(y.__webglFramebuffer,P,0)}else if(q){y.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)if(t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[ee]),y.__webglDepthbuffer[ee]===void 0)y.__webglDepthbuffer[ee]=i.createRenderbuffer(),He(y.__webglDepthbuffer[ee],P,!1);else{const pe=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ye=y.__webglDepthbuffer[ee];i.bindRenderbuffer(i.RENDERBUFFER,ye),i.framebufferRenderbuffer(i.FRAMEBUFFER,pe,i.RENDERBUFFER,ye)}}else{const ee=P.texture.mipmaps;if(ee&&ee.length>0?t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),He(y.__webglDepthbuffer,P,!1);else{const pe=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ye=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ye),i.framebufferRenderbuffer(i.FRAMEBUFFER,pe,i.RENDERBUFFER,ye)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ue(P,y,q){const ee=n.get(P);y!==void 0&&Ae(ee.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),q!==void 0&&ve(P)}function ge(P){const y=P.texture,q=n.get(P),ee=n.get(y);P.addEventListener("dispose",v);const pe=P.textures,ye=P.isWebGLCubeRenderTarget===!0,Me=pe.length>1;if(Me||(ee.__webglTexture===void 0&&(ee.__webglTexture=i.createTexture()),ee.__version=y.version,a.memory.textures++),ye){q.__webglFramebuffer=[];for(let re=0;re<6;re++)if(y.mipmaps&&y.mipmaps.length>0){q.__webglFramebuffer[re]=[];for(let _e=0;_e<y.mipmaps.length;_e++)q.__webglFramebuffer[re][_e]=i.createFramebuffer()}else q.__webglFramebuffer[re]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){q.__webglFramebuffer=[];for(let re=0;re<y.mipmaps.length;re++)q.__webglFramebuffer[re]=i.createFramebuffer()}else q.__webglFramebuffer=i.createFramebuffer();if(Me)for(let re=0,_e=pe.length;re<_e;re++){const Ie=n.get(pe[re]);Ie.__webglTexture===void 0&&(Ie.__webglTexture=i.createTexture(),a.memory.textures++)}if(P.samples>0&&Ne(P)===!1){q.__webglMultisampledFramebuffer=i.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let re=0;re<pe.length;re++){const _e=pe[re];q.__webglColorRenderbuffer[re]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,q.__webglColorRenderbuffer[re]);const Ie=r.convert(_e.format,_e.colorSpace),F=r.convert(_e.type),$=x(_e.internalFormat,Ie,F,_e.normalized,_e.colorSpace,P.isXRRenderTarget===!0),oe=Te(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,oe,$,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.RENDERBUFFER,q.__webglColorRenderbuffer[re])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(q.__webglDepthRenderbuffer=i.createRenderbuffer(),He(q.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ye){t.bindTexture(i.TEXTURE_CUBE_MAP,ee.__webglTexture),ce(i.TEXTURE_CUBE_MAP,y);for(let re=0;re<6;re++)if(y.mipmaps&&y.mipmaps.length>0)for(let _e=0;_e<y.mipmaps.length;_e++)Ae(q.__webglFramebuffer[re][_e],P,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,_e);else Ae(q.__webglFramebuffer[re],P,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);f(y)&&M(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Me){for(let re=0,_e=pe.length;re<_e;re++){const Ie=pe[re],F=n.get(Ie);let $=i.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&($=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture($,F.__webglTexture),ce($,Ie),Ae(q.__webglFramebuffer,P,Ie,i.COLOR_ATTACHMENT0+re,$,0),f(Ie)&&M($)}t.unbindTexture()}else{let re=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(re=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(re,ee.__webglTexture),ce(re,y),y.mipmaps&&y.mipmaps.length>0)for(let _e=0;_e<y.mipmaps.length;_e++)Ae(q.__webglFramebuffer[_e],P,y,i.COLOR_ATTACHMENT0,re,_e);else Ae(q.__webglFramebuffer,P,y,i.COLOR_ATTACHMENT0,re,0);f(y)&&M(re),t.unbindTexture()}P.depthBuffer&&ve(P)}function Le(P){const y=P.textures;for(let q=0,ee=y.length;q<ee;q++){const pe=y[q];if(f(pe)){const ye=b(P),Me=n.get(pe).__webglTexture;t.bindTexture(ye,Me),M(ye),t.unbindTexture()}}}const U=[],k=[];function ie(P){if(P.samples>0){if(Ne(P)===!1){const y=P.textures,q=P.width,ee=P.height;let pe=i.COLOR_BUFFER_BIT;const ye=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Me=n.get(P),re=y.length>1;if(re)for(let Ie=0;Ie<y.length;Ie++)t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ie,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ie,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer);const _e=P.texture.mipmaps;_e&&_e.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let Ie=0;Ie<y.length;Ie++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(pe|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(pe|=i.STENCIL_BUFFER_BIT)),re){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Me.__webglColorRenderbuffer[Ie]);const F=n.get(y[Ie]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,F,0)}i.blitFramebuffer(0,0,q,ee,0,0,q,ee,pe,i.NEAREST),c===!0&&(U.length=0,k.length=0,U.push(i.COLOR_ATTACHMENT0+Ie),P.depthBuffer&&P.resolveDepthBuffer===!1&&(U.push(ye),k.push(ye),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,k)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,U))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),re)for(let Ie=0;Ie<y.length;Ie++){t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ie,i.RENDERBUFFER,Me.__webglColorRenderbuffer[Ie]);const F=n.get(y[Ie]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ie,i.TEXTURE_2D,F,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){const y=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function Te(P){return Math.min(s.maxSamples,P.samples)}function Ne(P){const y=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function O(P){const y=a.render.frame;u.get(P)!==y&&(u.set(P,y),P.update())}function st(P,y){const q=P.colorSpace,ee=P.format,pe=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||q!==Wa&&q!==Xi&&(_t.getTransfer(q)===It?(ee!==jn||pe!==Un)&&nt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):xt("WebGLTextures: Unsupported texture color space:",q)),y}function Ye(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=J,this.resetTextureUnits=B,this.getTextureUnits=X,this.setTextureUnits=H,this.setTexture2D=L,this.setTexture2DArray=V,this.setTexture3D=K,this.setTextureCube=Z,this.rebindTextures=ue,this.setupRenderTarget=ge,this.updateRenderTargetMipmap=Le,this.updateMultisampleRenderTarget=ie,this.setupDepthRenderbuffer=ve,this.setupFrameBufferTexture=Ae,this.useMultisampledRTT=Ne,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Mx(i,e){function t(n,s=Xi){let r;const a=_t.getTransfer(s);if(n===Un)return i.UNSIGNED_BYTE;if(n===Sl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===bl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===cd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ld)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===ad)return i.BYTE;if(n===od)return i.SHORT;if(n===Ur)return i.UNSIGNED_SHORT;if(n===Ml)return i.INT;if(n===mi)return i.UNSIGNED_INT;if(n===Qn)return i.FLOAT;if(n===Ii)return i.HALF_FLOAT;if(n===ud)return i.ALPHA;if(n===hd)return i.RGB;if(n===jn)return i.RGBA;if(n===Li)return i.DEPTH_COMPONENT;if(n===us)return i.DEPTH_STENCIL;if(n===El)return i.RED;if(n===wl)return i.RED_INTEGER;if(n===fs)return i.RG;if(n===Tl)return i.RG_INTEGER;if(n===Al)return i.RGBA_INTEGER;if(n===La||n===Na||n===Da||n===Ua)if(a===It)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===La)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Na)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Da)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ua)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===La)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Na)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Da)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ua)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Nc||n===Dc||n===Uc||n===Fc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Nc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Dc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Uc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Fc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Oc||n===Bc||n===kc||n===zc||n===Gc||n===Ha||n===Hc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Oc||n===Bc)return a===It?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===kc)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===zc)return r.COMPRESSED_R11_EAC;if(n===Gc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Ha)return r.COMPRESSED_RG11_EAC;if(n===Hc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Vc||n===Wc||n===Xc||n===qc||n===Yc||n===$c||n===Kc||n===Zc||n===Jc||n===Qc||n===jc||n===el||n===tl||n===nl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Vc)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Wc)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Xc)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===qc)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Yc)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===$c)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Kc)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Zc)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Jc)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Qc)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===jc)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===el)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===tl)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===nl)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===il||n===sl||n===rl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===il)return a===It?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===sl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===rl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===al||n===ol||n===Va||n===cl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===al)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ol)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Va)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===cl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Fr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const Sx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,bx=`
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

}`;class Ex{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Sd(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new xn({vertexShader:Sx,fragmentShader:bx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new gt(new Xn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class wx extends vs{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,p=null,d=null,h=null,m=null;const _=typeof XRWebGLBinding<"u",g=new Ex,f={},M=t.getContextAttributes();let b=null,x=null;const w=[],S=[],E=new Ee;let v=null;const T=new Dn;T.viewport=new zt;const R=new Dn;R.viewport=new zt;const C=[T,R],I=new Um;let B=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let j=w[W];return j===void 0&&(j=new qo,w[W]=j),j.getTargetRaySpace()},this.getControllerGrip=function(W){let j=w[W];return j===void 0&&(j=new qo,w[W]=j),j.getGripSpace()},this.getHand=function(W){let j=w[W];return j===void 0&&(j=new qo,w[W]=j),j.getHandSpace()};function H(W){const j=S.indexOf(W.inputSource);if(j===-1)return;const ne=w[j];ne!==void 0&&(ne.update(W.inputSource,W.frame,l||a),ne.dispatchEvent({type:W.type,data:W.inputSource}))}function J(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",J),s.removeEventListener("inputsourceschange",z);for(let W=0;W<w.length;W++){const j=S[W];j!==null&&(S[W]=null,w[W].disconnect(j))}B=null,X=null,g.reset();for(const W in f)delete f[W];e.setRenderTarget(b),h=null,d=null,p=null,s=null,x=null,ce.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,n.isPresenting===!0&&nt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,n.isPresenting===!0&&nt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(W){l=W},this.getBaseLayer=function(){return d!==null?d:h},this.getBinding=function(){return p===null&&_&&(p=new XRWebGLBinding(s,t)),p},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(W){if(s=W,s!==null){if(b=e.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",J),s.addEventListener("inputsourceschange",z),M.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(E),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ne=null,de=null,me=null;M.depth&&(me=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ne=M.stencil?us:Li,de=M.stencil?Fr:mi);const Ae={colorFormat:t.RGBA8,depthFormat:me,scaleFactor:r};p=this.getBinding(),d=p.createProjectionLayer(Ae),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new pi(d.textureWidth,d.textureHeight,{format:jn,type:Un,depthTexture:new sr(d.textureWidth,d.textureHeight,de,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ne={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};h=new XRWebGLLayer(s,t,ne),s.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),x=new pi(h.framebufferWidth,h.framebufferHeight,{format:jn,type:Un,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),ce.setContext(s),ce.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function z(W){for(let j=0;j<W.removed.length;j++){const ne=W.removed[j],de=S.indexOf(ne);de>=0&&(S[de]=null,w[de].disconnect(ne))}for(let j=0;j<W.added.length;j++){const ne=W.added[j];let de=S.indexOf(ne);if(de===-1){for(let Ae=0;Ae<w.length;Ae++)if(Ae>=S.length){S.push(ne),de=Ae;break}else if(S[Ae]===null){S[Ae]=ne,de=Ae;break}if(de===-1)break}const me=w[de];me&&me.connect(ne)}}const L=new D,V=new D;function K(W,j,ne){L.setFromMatrixPosition(j.matrixWorld),V.setFromMatrixPosition(ne.matrixWorld);const de=L.distanceTo(V),me=j.projectionMatrix.elements,Ae=ne.projectionMatrix.elements,He=me[14]/(me[10]-1),Oe=me[14]/(me[10]+1),ve=(me[9]+1)/me[5],ue=(me[9]-1)/me[5],ge=(me[8]-1)/me[0],Le=(Ae[8]+1)/Ae[0],U=He*ge,k=He*Le,ie=de/(-ge+Le),Te=ie*-ge;if(j.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(Te),W.translateZ(ie),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),me[10]===-1)W.projectionMatrix.copy(j.projectionMatrix),W.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{const Ne=He+ie,O=Oe+ie,st=U-Te,Ye=k+(de-Te),P=ve*Oe/O*Ne,y=ue*Oe/O*Ne;W.projectionMatrix.makePerspective(st,Ye,P,y,Ne,O),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function Z(W,j){j===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(j.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(s===null)return;let j=W.near,ne=W.far;g.texture!==null&&(g.depthNear>0&&(j=g.depthNear),g.depthFar>0&&(ne=g.depthFar)),I.near=R.near=T.near=j,I.far=R.far=T.far=ne,(B!==I.near||X!==I.far)&&(s.updateRenderState({depthNear:I.near,depthFar:I.far}),B=I.near,X=I.far),I.layers.mask=W.layers.mask|6,T.layers.mask=I.layers.mask&-5,R.layers.mask=I.layers.mask&-3;const de=W.parent,me=I.cameras;Z(I,de);for(let Ae=0;Ae<me.length;Ae++)Z(me[Ae],de);me.length===2?K(I,T,R):I.projectionMatrix.copy(T.projectionMatrix),N(W,I,de)};function N(W,j,ne){ne===null?W.matrix.copy(j.matrixWorld):(W.matrix.copy(ne.matrixWorld),W.matrix.invert(),W.matrix.multiply(j.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(j.projectionMatrix),W.projectionMatrixInverse.copy(j.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Br*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(d===null&&h===null))return c},this.setFoveation=function(W){c=W,d!==null&&(d.fixedFoveation=W),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=W)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(I)},this.getCameraTexture=function(W){return f[W]};let Q=null;function xe(W,j){if(u=j.getViewerPose(l||a),m=j,u!==null){const ne=u.views;h!==null&&(e.setRenderTargetFramebuffer(x,h.framebuffer),e.setRenderTarget(x));let de=!1;ne.length!==I.cameras.length&&(I.cameras.length=0,de=!0);for(let Oe=0;Oe<ne.length;Oe++){const ve=ne[Oe];let ue=null;if(h!==null)ue=h.getViewport(ve);else{const Le=p.getViewSubImage(d,ve);ue=Le.viewport,Oe===0&&(e.setRenderTargetTextures(x,Le.colorTexture,Le.depthStencilTexture),e.setRenderTarget(x))}let ge=C[Oe];ge===void 0&&(ge=new Dn,ge.layers.enable(Oe),ge.viewport=new zt,C[Oe]=ge),ge.matrix.fromArray(ve.transform.matrix),ge.matrix.decompose(ge.position,ge.quaternion,ge.scale),ge.projectionMatrix.fromArray(ve.projectionMatrix),ge.projectionMatrixInverse.copy(ge.projectionMatrix).invert(),ge.viewport.set(ue.x,ue.y,ue.width,ue.height),Oe===0&&(I.matrix.copy(ge.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),de===!0&&I.cameras.push(ge)}const me=s.enabledFeatures;if(me&&me.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){p=n.getBinding();const Oe=p.getDepthInformation(ne[0]);Oe&&Oe.isValid&&Oe.texture&&g.init(Oe,s.renderState)}if(me&&me.includes("camera-access")&&_){e.state.unbindTexture(),p=n.getBinding();for(let Oe=0;Oe<ne.length;Oe++){const ve=ne[Oe].camera;if(ve){let ue=f[ve];ue||(ue=new Sd,f[ve]=ue);const ge=p.getCameraImage(ve);ue.sourceTexture=ge}}}}for(let ne=0;ne<w.length;ne++){const de=S[ne],me=w[ne];de!==null&&me!==void 0&&me.update(de,j,l||a)}Q&&Q(W,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),m=null}const ce=new Ud;ce.setAnimationLoop(xe),this.setAnimationLoop=function(W){Q=W},this.dispose=function(){}}}const Tx=new Rt,Hd=new ct;Hd.set(-1,0,0,0,1,0,0,0,1);function Ax(i,e){function t(g,f){g.matrixAutoUpdate===!0&&g.updateMatrix(),f.value.copy(g.matrix)}function n(g,f){f.color.getRGB(g.fogColor.value,Ld(i)),f.isFog?(g.fogNear.value=f.near,g.fogFar.value=f.far):f.isFogExp2&&(g.fogDensity.value=f.density)}function s(g,f,M,b,x){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(g,f):f.isMeshLambertMaterial?(r(g,f),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(g,f),p(g,f)):f.isMeshPhongMaterial?(r(g,f),u(g,f),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(g,f),d(g,f),f.isMeshPhysicalMaterial&&h(g,f,x)):f.isMeshMatcapMaterial?(r(g,f),m(g,f)):f.isMeshDepthMaterial?r(g,f):f.isMeshDistanceMaterial?(r(g,f),_(g,f)):f.isMeshNormalMaterial?r(g,f):f.isLineBasicMaterial?(a(g,f),f.isLineDashedMaterial&&o(g,f)):f.isPointsMaterial?c(g,f,M,b):f.isSpriteMaterial?l(g,f):f.isShadowMaterial?(g.color.value.copy(f.color),g.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(g,f){g.opacity.value=f.opacity,f.color&&g.diffuse.value.copy(f.color),f.emissive&&g.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(g.map.value=f.map,t(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.bumpMap&&(g.bumpMap.value=f.bumpMap,t(f.bumpMap,g.bumpMapTransform),g.bumpScale.value=f.bumpScale,f.side===Rn&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,t(f.normalMap,g.normalMapTransform),g.normalScale.value.copy(f.normalScale),f.side===Rn&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,t(f.displacementMap,g.displacementMapTransform),g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias),f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,g.emissiveMapTransform)),f.specularMap&&(g.specularMap.value=f.specularMap,t(f.specularMap,g.specularMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest);const M=e.get(f),b=M.envMap,x=M.envMapRotation;b&&(g.envMap.value=b,g.envMapRotation.value.setFromMatrix4(Tx.makeRotationFromEuler(x)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Hd),g.reflectivity.value=f.reflectivity,g.ior.value=f.ior,g.refractionRatio.value=f.refractionRatio),f.lightMap&&(g.lightMap.value=f.lightMap,g.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,g.lightMapTransform)),f.aoMap&&(g.aoMap.value=f.aoMap,g.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,g.aoMapTransform))}function a(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,f.map&&(g.map.value=f.map,t(f.map,g.mapTransform))}function o(g,f){g.dashSize.value=f.dashSize,g.totalSize.value=f.dashSize+f.gapSize,g.scale.value=f.scale}function c(g,f,M,b){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.size.value=f.size*M,g.scale.value=b*.5,f.map&&(g.map.value=f.map,t(f.map,g.uvTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function l(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.rotation.value=f.rotation,f.map&&(g.map.value=f.map,t(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function u(g,f){g.specular.value.copy(f.specular),g.shininess.value=Math.max(f.shininess,1e-4)}function p(g,f){f.gradientMap&&(g.gradientMap.value=f.gradientMap)}function d(g,f){g.metalness.value=f.metalness,f.metalnessMap&&(g.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,g.metalnessMapTransform)),g.roughness.value=f.roughness,f.roughnessMap&&(g.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,g.roughnessMapTransform)),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)}function h(g,f,M){g.ior.value=f.ior,f.sheen>0&&(g.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),g.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(g.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,g.sheenColorMapTransform)),f.sheenRoughnessMap&&(g.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,g.sheenRoughnessMapTransform))),f.clearcoat>0&&(g.clearcoat.value=f.clearcoat,g.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(g.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,g.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(g.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Rn&&g.clearcoatNormalScale.value.negate())),f.dispersion>0&&(g.dispersion.value=f.dispersion),f.iridescence>0&&(g.iridescence.value=f.iridescence,g.iridescenceIOR.value=f.iridescenceIOR,g.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(g.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,g.iridescenceMapTransform)),f.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),f.transmission>0&&(g.transmission.value=f.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(g.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,g.transmissionMapTransform)),g.thickness.value=f.thickness,f.thicknessMap&&(g.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=f.attenuationDistance,g.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(g.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(g.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=f.specularIntensity,g.specularColor.value.copy(f.specularColor),f.specularColorMap&&(g.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,g.specularColorMapTransform)),f.specularIntensityMap&&(g.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,f){f.matcap&&(g.matcap.value=f.matcap)}function _(g,f){const M=e.get(f).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Rx(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,w){const S=w.program;n.uniformBlockBinding(x,S)}function l(x,w){let S=s[x.id];S===void 0&&(g(x),S=u(x),s[x.id]=S,x.addEventListener("dispose",M));const E=w.program;n.updateUBOMapping(x,E);const v=e.render.frame;r[x.id]!==v&&(d(x),r[x.id]=v)}function u(x){const w=p();x.__bindingPointIndex=w;const S=i.createBuffer(),E=x.__size,v=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,E,v),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,S),S}function p(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return xt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const w=s[x.id],S=x.uniforms,E=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let v=0,T=S.length;v<T;v++){const R=S[v];if(Array.isArray(R))for(let C=0,I=R.length;C<I;C++)h(R[C],v,C,E);else h(R,v,0,E)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(x,w,S,E){if(_(x,w,S,E)===!0){const v=x.__offset,T=x.value;if(Array.isArray(T)){let R=0;for(let C=0;C<T.length;C++){const I=T[C],B=f(I);m(I,x.__data,R),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(R+=B.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(T,x.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,x.__data)}}function m(x,w,S){typeof x=="number"||typeof x=="boolean"?w[0]=x:x.isMatrix3?(w[0]=x.elements[0],w[1]=x.elements[1],w[2]=x.elements[2],w[3]=0,w[4]=x.elements[3],w[5]=x.elements[4],w[6]=x.elements[5],w[7]=0,w[8]=x.elements[6],w[9]=x.elements[7],w[10]=x.elements[8],w[11]=0):ArrayBuffer.isView(x)?w.set(new x.constructor(x.buffer,x.byteOffset,w.length)):x.toArray(w,S)}function _(x,w,S,E){const v=x.value,T=w+"_"+S;if(E[T]===void 0)return typeof v=="number"||typeof v=="boolean"?E[T]=v:ArrayBuffer.isView(v)?E[T]=v.slice():E[T]=v.clone(),!0;{const R=E[T];if(typeof v=="number"||typeof v=="boolean"){if(R!==v)return E[T]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(R.equals(v)===!1)return R.copy(v),!0}}return!1}function g(x){const w=x.uniforms;let S=0;const E=16;for(let T=0,R=w.length;T<R;T++){const C=Array.isArray(w[T])?w[T]:[w[T]];for(let I=0,B=C.length;I<B;I++){const X=C[I],H=Array.isArray(X.value)?X.value:[X.value];for(let J=0,z=H.length;J<z;J++){const L=H[J],V=f(L),K=S%E,Z=K%V.boundary,N=K+Z;S+=Z,N!==0&&E-N<V.storage&&(S+=E-N),X.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=S,S+=V.storage}}}const v=S%E;return v>0&&(S+=E-v),x.__size=S,x.__cache={},this}function f(x){const w={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(w.boundary=4,w.storage=4):x.isVector2?(w.boundary=8,w.storage=8):x.isVector3||x.isColor?(w.boundary=16,w.storage=12):x.isVector4?(w.boundary=16,w.storage=16):x.isMatrix3?(w.boundary=48,w.storage=48):x.isMatrix4?(w.boundary=64,w.storage=64):x.isTexture?nt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(w.boundary=16,w.storage=x.byteLength):nt("WebGLRenderer: Unsupported uniform value type.",x),w}function M(x){const w=x.target;w.removeEventListener("dispose",M);const S=a.indexOf(w.__bindingPointIndex);a.splice(S,1),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function b(){for(const x in s)i.deleteBuffer(s[x]);a=[],s={},r={}}return{bind:c,update:l,dispose:b}}const Cx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let si=null;function Px(){return si===null&&(si=new ys(Cx,16,16,fs,Ii),si.name="DFG_LUT",si.minFilter=cn,si.magFilter=cn,si.wrapS=wi,si.wrapT=wi,si.generateMipmaps=!1,si.needsUpdate=!0),si}class Ix{constructor(e={}){const{canvas:t=jf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:d=!1,outputBufferType:h=Un}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;const _=h,g=new Set([Al,Tl,wl]),f=new Set([Un,mi,Ur,Fr,Sl,bl]),M=new Uint32Array(4),b=new Int32Array(4),x=new D;let w=null,S=null;const E=[],v=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=di,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const R=this;let C=!1,I=null,B=null,X=null,H=null;this._outputColorSpace=pn;let J=0,z=0,L=null,V=-1,K=null;const Z=new zt,N=new zt;let Q=null;const xe=new it(0);let ce=0,W=t.width,j=t.height,ne=1,de=null,me=null;const Ae=new zt(0,0,W,j),He=new zt(0,0,W,j);let Oe=!1;const ve=new Nl;let ue=!1,ge=!1;const Le=new Rt,U=new D,k=new zt,ie={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Te=!1;function Ne(){return L===null?ne:1}let O=n;function st(A,Y){return t.getContext(A,Y)}try{const A={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${_l}`),t.addEventListener("webglcontextlost",ut,!1),t.addEventListener("webglcontextrestored",te,!1),t.addEventListener("webglcontextcreationerror",we,!1),O===null){const Y="webgl2";if(O=st(Y,A),O===null)throw st(Y)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(A){throw xt("WebGLRenderer: "+A.message),A}let Ye,P,y,q,ee,pe,ye,Me,re,_e,Ie,F,$,oe,be,Pe,ke,G,Se,se,Re,De,ae;function Ce(){Ye=new Pv(O),Ye.init(),Re=new Mx(O,Ye),P=new Sv(O,Ye,e,Re),y=new _x(O,Ye),P.reversedDepthBuffer&&d&&y.buffers.depth.setReversed(!0),B=O.createFramebuffer(),X=O.createFramebuffer(),H=O.createFramebuffer(),q=new Nv(O),ee=new rx,pe=new yx(O,Ye,y,ee,P,Re,q),ye=new Cv(R),Me=new Om(O),De=new yv(O,Me),re=new Iv(O,Me,q,De),_e=new Uv(O,re,Me,De,q),G=new Dv(O,P,pe),be=new bv(ee),Ie=new sx(R,ye,Ye,P,De,be),F=new Ax(R,ee),$=new ox,oe=new fx(Ye),ke=new _v(R,ye,y,_e,m,c),Pe=new xx(R,_e,P),ae=new Rx(O,q,P,y),Se=new Mv(O,Ye,q),se=new Lv(O,Ye,q),q.programs=Ie.programs,R.capabilities=P,R.extensions=Ye,R.properties=ee,R.renderLists=$,R.shadowMap=Pe,R.state=y,R.info=q}Ce(),_!==Un&&(T=new Ov(_,t.width,t.height,o,s,r));const Fe=new wx(R,O);this.xr=Fe,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const A=Ye.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Ye.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(A){A!==void 0&&(ne=A,this.setSize(W,j,!1))},this.getSize=function(A){return A.set(W,j)},this.setSize=function(A,Y,fe=!0){if(Fe.isPresenting){nt("WebGLRenderer: Can't change size while VR device is presenting.");return}W=A,j=Y,t.width=Math.floor(A*ne),t.height=Math.floor(Y*ne),fe===!0&&(t.style.width=A+"px",t.style.height=Y+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,A,Y)},this.getDrawingBufferSize=function(A){return A.set(W*ne,j*ne).floor()},this.setDrawingBufferSize=function(A,Y,fe){W=A,j=Y,ne=fe,t.width=Math.floor(A*fe),t.height=Math.floor(Y*fe),this.setViewport(0,0,A,Y)},this.setEffects=function(A){if(_===Un){xt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let Y=0;Y<A.length;Y++)if(A[Y].isOutputPass===!0){nt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(Z)},this.getViewport=function(A){return A.copy(Ae)},this.setViewport=function(A,Y,fe,le){A.isVector4?Ae.set(A.x,A.y,A.z,A.w):Ae.set(A,Y,fe,le),y.viewport(Z.copy(Ae).multiplyScalar(ne).round())},this.getScissor=function(A){return A.copy(He)},this.setScissor=function(A,Y,fe,le){A.isVector4?He.set(A.x,A.y,A.z,A.w):He.set(A,Y,fe,le),y.scissor(N.copy(He).multiplyScalar(ne).round())},this.getScissorTest=function(){return Oe},this.setScissorTest=function(A){y.setScissorTest(Oe=A)},this.setOpaqueSort=function(A){de=A},this.setTransparentSort=function(A){me=A},this.getClearColor=function(A){return A.copy(ke.getClearColor())},this.setClearColor=function(){ke.setClearColor(...arguments)},this.getClearAlpha=function(){return ke.getClearAlpha()},this.setClearAlpha=function(){ke.setClearAlpha(...arguments)},this.clear=function(A=!0,Y=!0,fe=!0){let le=0;if(A){let he=!1;if(L!==null){const Ge=L.texture.format;he=g.has(Ge)}if(he){const Ge=L.texture.type,qe=f.has(Ge),ze=ke.getClearColor(),$e=ke.getClearAlpha(),Ze=ze.r,lt=ze.g,ft=ze.b;qe?(M[0]=Ze,M[1]=lt,M[2]=ft,M[3]=$e,O.clearBufferuiv(O.COLOR,0,M)):(b[0]=Ze,b[1]=lt,b[2]=ft,b[3]=$e,O.clearBufferiv(O.COLOR,0,b))}else le|=O.COLOR_BUFFER_BIT}Y&&(le|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),fe&&(le|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),le!==0&&O.clear(le)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),I=A},this.dispose=function(){t.removeEventListener("webglcontextlost",ut,!1),t.removeEventListener("webglcontextrestored",te,!1),t.removeEventListener("webglcontextcreationerror",we,!1),ke.dispose(),$.dispose(),oe.dispose(),ee.dispose(),ye.dispose(),_e.dispose(),De.dispose(),ae.dispose(),Ie.dispose(),Fe.dispose(),Fe.removeEventListener("sessionstart",ot),Fe.removeEventListener("sessionend",vt),Ke.stop()};function ut(A){A.preventDefault(),Ya("WebGLRenderer: Context Lost."),C=!0}function te(){Ya("WebGLRenderer: Context Restored."),C=!1;const A=q.autoReset,Y=Pe.enabled,fe=Pe.autoUpdate,le=Pe.needsUpdate,he=Pe.type;Ce(),q.autoReset=A,Pe.enabled=Y,Pe.autoUpdate=fe,Pe.needsUpdate=le,Pe.type=he}function we(A){xt("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Ue(A){const Y=A.target;Y.removeEventListener("dispose",Ue),We(Y)}function We(A){Ve(A),ee.remove(A)}function Ve(A){const Y=ee.get(A).programs;Y!==void 0&&(Y.forEach(function(fe){Ie.releaseProgram(fe)}),A.isShaderMaterial&&Ie.releaseShaderCache(A))}this.renderBufferDirect=function(A,Y,fe,le,he,Ge){Y===null&&(Y=ie);const qe=he.isMesh&&he.matrixWorld.determinantAffine()<0,ze=$r(A,Y,fe,le,he);y.setMaterial(le,qe);let $e=fe.index,Ze=1;if(le.wireframe===!0){if($e=re.getWireframeAttribute(fe),$e===void 0)return;Ze=2}const lt=fe.drawRange,ft=fe.attributes.position;let Je=lt.start*Ze,Nt=(lt.start+lt.count)*Ze;Ge!==null&&(Je=Math.max(Je,Ge.start*Ze),Nt=Math.min(Nt,(Ge.start+Ge.count)*Ze)),$e!==null?(Je=Math.max(Je,0),Nt=Math.min(Nt,$e.count)):ft!=null&&(Je=Math.max(Je,0),Nt=Math.min(Nt,ft.count));const Wt=Nt-Je;if(Wt<0||Wt===1/0)return;De.setup(he,le,ze,fe,$e);let Ht,Ut=Se;if($e!==null&&(Ht=Me.get($e),Ut=se,Ut.setIndex(Ht)),he.isMesh)le.wireframe===!0?(y.setLineWidth(le.wireframeLinewidth*Ne()),Ut.setMode(O.LINES)):Ut.setMode(O.TRIANGLES);else if(he.isLine){let hn=le.linewidth;hn===void 0&&(hn=1),y.setLineWidth(hn*Ne()),he.isLineSegments?Ut.setMode(O.LINES):he.isLineLoop?Ut.setMode(O.LINE_LOOP):Ut.setMode(O.LINE_STRIP)}else he.isPoints?Ut.setMode(O.POINTS):he.isSprite&&Ut.setMode(O.TRIANGLES);if(he.isBatchedMesh)if(Ye.get("WEBGL_multi_draw"))Ut.renderMultiDraw(he._multiDrawStarts,he._multiDrawCounts,he._multiDrawCount);else{const hn=he._multiDrawStarts,Xe=he._multiDrawCounts,Cn=he._multiDrawCount,bt=$e?Me.get($e).bytesPerElement:1,Fn=ee.get(le).currentProgram.getUniforms();for(let ti=0;ti<Cn;ti++)Fn.setValue(O,"_gl_DrawID",ti),Ut.render(hn[ti]/bt,Xe[ti])}else if(he.isInstancedMesh)Ut.renderInstances(Je,Wt,he.count);else if(fe.isInstancedBufferGeometry){const hn=fe._maxInstanceCount!==void 0?fe._maxInstanceCount:1/0,Xe=Math.min(fe.instanceCount,hn);Ut.renderInstances(Je,Wt,Xe)}else Ut.render(Je,Wt)};function je(A,Y,fe){A.transparent===!0&&A.side===Tn&&A.forceSinglePass===!1?(A.side=Rn,A.needsUpdate=!0,xi(A,Y,fe),A.side=Ji,A.needsUpdate=!0,xi(A,Y,fe),A.side=Tn):xi(A,Y,fe)}this.compile=function(A,Y,fe=null){fe===null&&(fe=A),S=oe.get(fe),S.init(Y),v.push(S),fe.traverseVisible(function(he){he.isLight&&he.layers.test(Y.layers)&&(S.pushLight(he),he.castShadow&&S.pushShadow(he))}),A!==fe&&A.traverseVisible(function(he){he.isLight&&he.layers.test(Y.layers)&&(S.pushLight(he),he.castShadow&&S.pushShadow(he))}),S.setupLights();const le=new Set;return A.traverse(function(he){if(!(he.isMesh||he.isPoints||he.isLine||he.isSprite))return;const Ge=he.material;if(Ge)if(Array.isArray(Ge))for(let qe=0;qe<Ge.length;qe++){const ze=Ge[qe];je(ze,fe,he),le.add(ze)}else je(Ge,fe,he),le.add(Ge)}),S=v.pop(),le},this.compileAsync=function(A,Y,fe=null){const le=this.compile(A,Y,fe);return new Promise(he=>{function Ge(){if(le.forEach(function(qe){ee.get(qe).currentProgram.isReady()&&le.delete(qe)}),le.size===0){he(A);return}setTimeout(Ge,10)}Ye.get("KHR_parallel_shader_compile")!==null?Ge():setTimeout(Ge,10)})};let at=null;function pt(A){at&&at(A)}function ot(){Ke.stop()}function vt(){Ke.start()}const Ke=new Ud;Ke.setAnimationLoop(pt),typeof self<"u"&&Ke.setContext(self),this.setAnimationLoop=function(A){at=A,Fe.setAnimationLoop(A),A===null?Ke.stop():Ke.start()},Fe.addEventListener("sessionstart",ot),Fe.addEventListener("sessionend",vt),this.render=function(A,Y){if(Y!==void 0&&Y.isCamera!==!0){xt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;I!==null&&I.renderStart(A,Y);const fe=Fe.enabled===!0&&Fe.isPresenting===!0,le=T!==null&&(L===null||fe)&&T.begin(R,L);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),Fe.enabled===!0&&Fe.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Fe.cameraAutoUpdate===!0&&Fe.updateCamera(Y),Y=Fe.getCamera()),A.isScene===!0&&A.onBeforeRender(R,A,Y,L),S=oe.get(A,v.length),S.init(Y),S.state.textureUnits=pe.getTextureUnits(),v.push(S),Le.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),ve.setFromProjectionMatrix(Le,ui,Y.reversedDepth),ge=this.localClippingEnabled,ue=be.init(this.clippingPlanes,ge),w=$.get(A,E.length),w.init(),E.push(w),Fe.enabled===!0&&Fe.isPresenting===!0){const qe=R.xr.getDepthSensingMesh();qe!==null&&Qt(qe,Y,-1/0,R.sortObjects)}Qt(A,Y,0,R.sortObjects),w.finish(),R.sortObjects===!0&&w.sort(de,me,Y.reversedDepth),Te=Fe.enabled===!1||Fe.isPresenting===!1||Fe.hasDepthSensing()===!1,Te&&ke.addToRenderList(w,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ue===!0&&be.beginShadows();const he=S.state.shadowsArray;if(Pe.render(he,A,Y),ue===!0&&be.endShadows(),(le&&T.hasRenderPass())===!1){const qe=w.opaque,ze=w.transmissive;if(S.setupLights(),Y.isArrayCamera){const $e=Y.cameras;if(ze.length>0)for(let Ze=0,lt=$e.length;Ze<lt;Ze++){const ft=$e[Ze];Kt(qe,ze,A,ft)}Te&&ke.render(A);for(let Ze=0,lt=$e.length;Ze<lt;Ze++){const ft=$e[Ze];Bt(w,A,ft,ft.viewport)}}else ze.length>0&&Kt(qe,ze,A,Y),Te&&ke.render(A),Bt(w,A,Y)}L!==null&&z===0&&(pe.updateMultisampleRenderTarget(L),pe.updateRenderTargetMipmap(L)),le&&T.end(R),A.isScene===!0&&A.onAfterRender(R,A,Y),De.resetDefaultState(),V=-1,K=null,v.pop(),v.length>0?(S=v[v.length-1],pe.setTextureUnits(S.state.textureUnits),ue===!0&&be.setGlobalState(R.clippingPlanes,S.state.camera)):S=null,E.pop(),E.length>0?w=E[E.length-1]:w=null,I!==null&&I.renderEnd()};function Qt(A,Y,fe,le){if(A.visible===!1)return;if(A.layers.test(Y.layers)){if(A.isGroup)fe=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(Y);else if(A.isLightProbeGrid)S.pushLightProbeGrid(A);else if(A.isLight)S.pushLight(A),A.castShadow&&S.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||ve.intersectsSprite(A)){le&&k.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Le);const qe=_e.update(A),ze=A.material;ze.visible&&w.push(A,qe,ze,fe,k.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||ve.intersectsObject(A))){const qe=_e.update(A),ze=A.material;if(le&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),k.copy(A.boundingSphere.center)):(qe.boundingSphere===null&&qe.computeBoundingSphere(),k.copy(qe.boundingSphere.center)),k.applyMatrix4(A.matrixWorld).applyMatrix4(Le)),Array.isArray(ze)){const $e=qe.groups;for(let Ze=0,lt=$e.length;Ze<lt;Ze++){const ft=$e[Ze],Je=ze[ft.materialIndex];Je&&Je.visible&&w.push(A,qe,Je,fe,k.z,ft)}}else ze.visible&&w.push(A,qe,ze,fe,k.z,null)}}const Ge=A.children;for(let qe=0,ze=Ge.length;qe<ze;qe++)Qt(Ge[qe],Y,fe,le)}function Bt(A,Y,fe,le){const{opaque:he,transmissive:Ge,transparent:qe}=A;S.setupLightsView(fe),ue===!0&&be.setGlobalState(R.clippingPlanes,fe),le&&y.viewport(Z.copy(le)),he.length>0&&_n(he,Y,fe),Ge.length>0&&_n(Ge,Y,fe),qe.length>0&&_n(qe,Y,fe),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function Kt(A,Y,fe,le){if((fe.isScene===!0?fe.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[le.id]===void 0){const Je=Ye.has("EXT_color_buffer_half_float")||Ye.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[le.id]=new pi(1,1,{generateMipmaps:!0,type:Je?Ii:Un,minFilter:qi,samples:Math.max(4,P.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:_t.workingColorSpace})}const Ge=S.state.transmissionRenderTarget[le.id],qe=le.viewport||Z;Ge.setSize(qe.z*R.transmissionResolutionScale,qe.w*R.transmissionResolutionScale);const ze=R.getRenderTarget(),$e=R.getActiveCubeFace(),Ze=R.getActiveMipmapLevel();R.setRenderTarget(Ge),R.getClearColor(xe),ce=R.getClearAlpha(),ce<1&&R.setClearColor(16777215,.5),R.clear(),Te&&ke.render(fe);const lt=R.toneMapping;R.toneMapping=di;const ft=le.viewport;if(le.viewport!==void 0&&(le.viewport=void 0),S.setupLightsView(le),ue===!0&&be.setGlobalState(R.clippingPlanes,le),_n(A,fe,le),pe.updateMultisampleRenderTarget(Ge),pe.updateRenderTargetMipmap(Ge),Ye.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let Nt=0,Wt=Y.length;Nt<Wt;Nt++){const Ht=Y[Nt],{object:Ut,geometry:hn,material:Xe,group:Cn}=Ht;if(Xe.side===Tn&&Ut.layers.test(le.layers)){const bt=Xe.side;Xe.side=Rn,Xe.needsUpdate=!0,yn(Ut,fe,le,hn,Xe,Cn),Xe.side=bt,Xe.needsUpdate=!0,Je=!0}}Je===!0&&(pe.updateMultisampleRenderTarget(Ge),pe.updateRenderTargetMipmap(Ge))}R.setRenderTarget(ze,$e,Ze),R.setClearColor(xe,ce),ft!==void 0&&(le.viewport=ft),R.toneMapping=lt}function _n(A,Y,fe){const le=Y.isScene===!0?Y.overrideMaterial:null;for(let he=0,Ge=A.length;he<Ge;he++){const qe=A[he],{object:ze,geometry:$e,group:Ze}=qe;let lt=qe.material;lt.allowOverride===!0&&le!==null&&(lt=le),ze.layers.test(fe.layers)&&yn(ze,Y,fe,$e,lt,Ze)}}function yn(A,Y,fe,le,he,Ge){A.onBeforeRender(R,Y,fe,le,he,Ge),A.modelViewMatrix.multiplyMatrices(fe.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),he.onBeforeRender(R,Y,fe,le,A,Ge),he.transparent===!0&&he.side===Tn&&he.forceSinglePass===!1?(he.side=Rn,he.needsUpdate=!0,R.renderBufferDirect(fe,Y,le,he,A,Ge),he.side=Ji,he.needsUpdate=!0,R.renderBufferDirect(fe,Y,le,he,A,Ge),he.side=Tn):R.renderBufferDirect(fe,Y,le,he,A,Ge),A.onAfterRender(R,Y,fe,le,he,Ge)}function xi(A,Y,fe){Y.isScene!==!0&&(Y=ie);const le=ee.get(A),he=S.state.lights,Ge=S.state.shadowsArray,qe=he.state.version,ze=Ie.getParameters(A,he.state,Ge,Y,fe,S.state.lightProbeGridArray),$e=Ie.getProgramCacheKey(ze);let Ze=le.programs;le.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?Y.environment:null,le.fog=Y.fog;const lt=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;le.envMap=ye.get(A.envMap||le.environment,lt),le.envMapRotation=le.environment!==null&&A.envMap===null?Y.environmentRotation:A.envMapRotation,Ze===void 0&&(A.addEventListener("dispose",Ue),Ze=new Map,le.programs=Ze);let ft=Ze.get($e);if(ft!==void 0){if(le.currentProgram===ft&&le.lightsStateVersion===qe)return ts(A,ze),ft}else ze.uniforms=Ie.getUniforms(A),I!==null&&A.isNodeMaterial&&I.build(A,fe,ze),A.onBeforeCompile(ze,R),ft=Ie.acquireProgram(ze,$e),Ze.set($e,ft),le.uniforms=ze.uniforms;const Je=le.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Je.clippingPlanes=be.uniform),ts(A,ze),le.needsLights=un(A),le.lightsStateVersion=qe,le.needsLights&&(Je.ambientLightColor.value=he.state.ambient,Je.lightProbe.value=he.state.probe,Je.directionalLights.value=he.state.directional,Je.directionalLightShadows.value=he.state.directionalShadow,Je.spotLights.value=he.state.spot,Je.spotLightShadows.value=he.state.spotShadow,Je.rectAreaLights.value=he.state.rectArea,Je.ltc_1.value=he.state.rectAreaLTC1,Je.ltc_2.value=he.state.rectAreaLTC2,Je.pointLights.value=he.state.point,Je.pointLightShadows.value=he.state.pointShadow,Je.hemisphereLights.value=he.state.hemi,Je.directionalShadowMatrix.value=he.state.directionalShadowMatrix,Je.spotLightMatrix.value=he.state.spotLightMatrix,Je.spotLightMap.value=he.state.spotLightMap,Je.pointShadowMatrix.value=he.state.pointShadowMatrix),le.lightProbeGrid=S.state.lightProbeGridArray.length>0,le.currentProgram=ft,le.uniformsList=null,ft}function hr(A){if(A.uniformsList===null){const Y=A.currentProgram.getUniforms();A.uniformsList=Fa.seqWithValue(Y.seq,A.uniforms)}return A.uniformsList}function ts(A,Y){const fe=ee.get(A);fe.outputColorSpace=Y.outputColorSpace,fe.batching=Y.batching,fe.batchingColor=Y.batchingColor,fe.instancing=Y.instancing,fe.instancingColor=Y.instancingColor,fe.instancingMorph=Y.instancingMorph,fe.skinning=Y.skinning,fe.morphTargets=Y.morphTargets,fe.morphNormals=Y.morphNormals,fe.morphColors=Y.morphColors,fe.morphTargetsCount=Y.morphTargetsCount,fe.numClippingPlanes=Y.numClippingPlanes,fe.numIntersection=Y.numClipIntersection,fe.vertexAlphas=Y.vertexAlphas,fe.vertexTangents=Y.vertexTangents,fe.toneMapping=Y.toneMapping}function Yr(A,Y){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;x.setFromMatrixPosition(Y.matrixWorld);for(let fe=0,le=A.length;fe<le;fe++){const he=A[fe];if(he.texture!==null&&he.boundingBox.containsPoint(x))return he}return null}function $r(A,Y,fe,le,he){Y.isScene!==!0&&(Y=ie),pe.resetTextureUnits();const Ge=Y.fog,qe=le.isMeshStandardMaterial||le.isMeshLambertMaterial||le.isMeshPhongMaterial?Y.environment:null,ze=L===null?R.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:_t.workingColorSpace,$e=le.isMeshStandardMaterial||le.isMeshLambertMaterial&&!le.envMap||le.isMeshPhongMaterial&&!le.envMap,Ze=ye.get(le.envMap||qe,$e),lt=le.vertexColors===!0&&!!fe.attributes.color&&fe.attributes.color.itemSize===4,ft=!!fe.attributes.tangent&&(!!le.normalMap||le.anisotropy>0),Je=!!fe.morphAttributes.position,Nt=!!fe.morphAttributes.normal,Wt=!!fe.morphAttributes.color;let Ht=di;le.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(Ht=R.toneMapping);const Ut=fe.morphAttributes.position||fe.morphAttributes.normal||fe.morphAttributes.color,hn=Ut!==void 0?Ut.length:0,Xe=ee.get(le),Cn=S.state.lights;if(ue===!0&&(ge===!0||A!==K)){const Ot=A===K&&le.id===V;be.setState(le,A,Ot)}let bt=!1;le.version===Xe.__version?(Xe.needsLights&&Xe.lightsStateVersion!==Cn.state.version||Xe.outputColorSpace!==ze||he.isBatchedMesh&&Xe.batching===!1||!he.isBatchedMesh&&Xe.batching===!0||he.isBatchedMesh&&Xe.batchingColor===!0&&he.colorTexture===null||he.isBatchedMesh&&Xe.batchingColor===!1&&he.colorTexture!==null||he.isInstancedMesh&&Xe.instancing===!1||!he.isInstancedMesh&&Xe.instancing===!0||he.isSkinnedMesh&&Xe.skinning===!1||!he.isSkinnedMesh&&Xe.skinning===!0||he.isInstancedMesh&&Xe.instancingColor===!0&&he.instanceColor===null||he.isInstancedMesh&&Xe.instancingColor===!1&&he.instanceColor!==null||he.isInstancedMesh&&Xe.instancingMorph===!0&&he.morphTexture===null||he.isInstancedMesh&&Xe.instancingMorph===!1&&he.morphTexture!==null||Xe.envMap!==Ze||le.fog===!0&&Xe.fog!==Ge||Xe.numClippingPlanes!==void 0&&(Xe.numClippingPlanes!==be.numPlanes||Xe.numIntersection!==be.numIntersection)||Xe.vertexAlphas!==lt||Xe.vertexTangents!==ft||Xe.morphTargets!==Je||Xe.morphNormals!==Nt||Xe.morphColors!==Wt||Xe.toneMapping!==Ht||Xe.morphTargetsCount!==hn||!!Xe.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(bt=!0):(bt=!0,Xe.__version=le.version);let Fn=Xe.currentProgram;bt===!0&&(Fn=xi(le,Y,he),I&&le.isNodeMaterial&&I.onUpdateProgram(le,Fn,Xe));let ti=!1,Ni=!1,Ss=!1;const Ft=Fn.getUniforms(),Xt=Xe.uniforms;if(y.useProgram(Fn.program)&&(ti=!0,Ni=!0,Ss=!0),le.id!==V&&(V=le.id,Ni=!0),Xe.needsLights){const Ot=Yr(S.state.lightProbeGridArray,he);Xe.lightProbeGrid!==Ot&&(Xe.lightProbeGrid=Ot,Ni=!0)}if(ti||K!==A){y.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Ft.setValue(O,"projectionMatrix",A.projectionMatrix),Ft.setValue(O,"viewMatrix",A.matrixWorldInverse);const Ui=Ft.map.cameraPosition;Ui!==void 0&&Ui.setValue(O,U.setFromMatrixPosition(A.matrixWorld)),P.logarithmicDepthBuffer&&Ft.setValue(O,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(le.isMeshPhongMaterial||le.isMeshToonMaterial||le.isMeshLambertMaterial||le.isMeshBasicMaterial||le.isMeshStandardMaterial||le.isShaderMaterial)&&Ft.setValue(O,"isOrthographic",A.isOrthographicCamera===!0),K!==A&&(K=A,Ni=!0,Ss=!0)}if(Xe.needsLights&&(Cn.state.directionalShadowMap.length>0&&Ft.setValue(O,"directionalShadowMap",Cn.state.directionalShadowMap,pe),Cn.state.spotShadowMap.length>0&&Ft.setValue(O,"spotShadowMap",Cn.state.spotShadowMap,pe),Cn.state.pointShadowMap.length>0&&Ft.setValue(O,"pointShadowMap",Cn.state.pointShadowMap,pe)),he.isSkinnedMesh){Ft.setOptional(O,he,"bindMatrix"),Ft.setOptional(O,he,"bindMatrixInverse");const Ot=he.skeleton;Ot&&(Ot.boneTexture===null&&Ot.computeBoneTexture(),Ft.setValue(O,"boneTexture",Ot.boneTexture,pe))}he.isBatchedMesh&&(Ft.setOptional(O,he,"batchingTexture"),Ft.setValue(O,"batchingTexture",he._matricesTexture,pe),Ft.setOptional(O,he,"batchingIdTexture"),Ft.setValue(O,"batchingIdTexture",he._indirectTexture,pe),Ft.setOptional(O,he,"batchingColorTexture"),he._colorsTexture!==null&&Ft.setValue(O,"batchingColorTexture",he._colorsTexture,pe));const Di=fe.morphAttributes;if((Di.position!==void 0||Di.normal!==void 0||Di.color!==void 0)&&G.update(he,fe,Fn),(Ni||Xe.receiveShadow!==he.receiveShadow)&&(Xe.receiveShadow=he.receiveShadow,Ft.setValue(O,"receiveShadow",he.receiveShadow)),(le.isMeshStandardMaterial||le.isMeshLambertMaterial||le.isMeshPhongMaterial)&&le.envMap===null&&Y.environment!==null&&(Xt.envMapIntensity.value=Y.environmentIntensity),Xt.dfgLUT!==void 0&&(Xt.dfgLUT.value=Px()),Ni){if(Ft.setValue(O,"toneMappingExposure",R.toneMappingExposure),Xe.needsLights&&Dt(Xt,Ss),Ge&&le.fog===!0&&F.refreshFogUniforms(Xt,Ge),F.refreshMaterialUniforms(Xt,le,ne,j,S.state.transmissionRenderTarget[A.id]),Xe.needsLights&&Xe.lightProbeGrid){const Ot=Xe.lightProbeGrid;Xt.probesSH.value=Ot.texture,Xt.probesMin.value.copy(Ot.boundingBox.min),Xt.probesMax.value.copy(Ot.boundingBox.max),Xt.probesResolution.value.copy(Ot.resolution)}Fa.upload(O,hr(Xe),Xt,pe)}if(le.isShaderMaterial&&le.uniformsNeedUpdate===!0&&(Fa.upload(O,hr(Xe),Xt,pe),le.uniformsNeedUpdate=!1),le.isSpriteMaterial&&Ft.setValue(O,"center",he.center),Ft.setValue(O,"modelViewMatrix",he.modelViewMatrix),Ft.setValue(O,"normalMatrix",he.normalMatrix),Ft.setValue(O,"modelMatrix",he.matrixWorld),le.uniformsGroups!==void 0){const Ot=le.uniformsGroups;for(let Ui=0,bs=Ot.length;Ui<bs;Ui++){const Yl=Ot[Ui];ae.update(Yl,Fn),ae.bind(Yl,Fn)}}return Fn}function Dt(A,Y){A.ambientLightColor.needsUpdate=Y,A.lightProbe.needsUpdate=Y,A.directionalLights.needsUpdate=Y,A.directionalLightShadows.needsUpdate=Y,A.pointLights.needsUpdate=Y,A.pointLightShadows.needsUpdate=Y,A.spotLights.needsUpdate=Y,A.spotLightShadows.needsUpdate=Y,A.rectAreaLights.needsUpdate=Y,A.hemisphereLights.needsUpdate=Y}function un(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return J},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(A,Y,fe){const le=ee.get(A);le.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,le.__autoAllocateDepthBuffer===!1&&(le.__useRenderToTexture=!1),ee.get(A.texture).__webglTexture=Y,ee.get(A.depthTexture).__webglTexture=le.__autoAllocateDepthBuffer?void 0:fe,le.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,Y){const fe=ee.get(A);fe.__webglFramebuffer=Y,fe.__useDefaultFramebuffer=Y===void 0},this.setRenderTarget=function(A,Y=0,fe=0){L=A,J=Y,z=fe;let le=null,he=!1,Ge=!1;if(A){const ze=ee.get(A);if(ze.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(O.FRAMEBUFFER,ze.__webglFramebuffer),Z.copy(A.viewport),N.copy(A.scissor),Q=A.scissorTest,y.viewport(Z),y.scissor(N),y.setScissorTest(Q),V=-1;return}else if(ze.__webglFramebuffer===void 0)pe.setupRenderTarget(A);else if(ze.__hasExternalTextures)pe.rebindTextures(A,ee.get(A.texture).__webglTexture,ee.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const lt=A.depthTexture;if(ze.__boundDepthTexture!==lt){if(lt!==null&&ee.has(lt)&&(A.width!==lt.image.width||A.height!==lt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");pe.setupDepthRenderbuffer(A)}}const $e=A.texture;($e.isData3DTexture||$e.isDataArrayTexture||$e.isCompressedArrayTexture)&&(Ge=!0);const Ze=ee.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ze[Y])?le=Ze[Y][fe]:le=Ze[Y],he=!0):A.samples>0&&pe.useMultisampledRTT(A)===!1?le=ee.get(A).__webglMultisampledFramebuffer:Array.isArray(Ze)?le=Ze[fe]:le=Ze,Z.copy(A.viewport),N.copy(A.scissor),Q=A.scissorTest}else Z.copy(Ae).multiplyScalar(ne).floor(),N.copy(He).multiplyScalar(ne).floor(),Q=Oe;if(fe!==0&&(le=B),y.bindFramebuffer(O.FRAMEBUFFER,le)&&y.drawBuffers(A,le),y.viewport(Z),y.scissor(N),y.setScissorTest(Q),he){const ze=ee.get(A.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ze.__webglTexture,fe)}else if(Ge){const ze=Y;for(let $e=0;$e<A.textures.length;$e++){const Ze=ee.get(A.textures[$e]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+$e,Ze.__webglTexture,fe,ze)}}else if(A!==null&&fe!==0){const ze=ee.get(A.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,ze.__webglTexture,fe)}V=-1},this.readRenderTargetPixels=function(A,Y,fe,le,he,Ge,qe,ze=0){if(!(A&&A.isWebGLRenderTarget)){xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let $e=ee.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&qe!==void 0&&($e=$e[qe]),$e){y.bindFramebuffer(O.FRAMEBUFFER,$e);try{const Ze=A.textures[ze],lt=Ze.format,ft=Ze.type;if(A.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+ze),!P.textureFormatReadable(lt)){xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!P.textureTypeReadable(ft)){xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=A.width-le&&fe>=0&&fe<=A.height-he&&O.readPixels(Y,fe,le,he,Re.convert(lt),Re.convert(ft),Ge)}finally{const Ze=L!==null?ee.get(L).__webglFramebuffer:null;y.bindFramebuffer(O.FRAMEBUFFER,Ze)}}},this.readRenderTargetPixelsAsync=async function(A,Y,fe,le,he,Ge,qe,ze=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let $e=ee.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&qe!==void 0&&($e=$e[qe]),$e)if(Y>=0&&Y<=A.width-le&&fe>=0&&fe<=A.height-he){y.bindFramebuffer(O.FRAMEBUFFER,$e);const Ze=A.textures[ze],lt=Ze.format,ft=Ze.type;if(A.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+ze),!P.textureFormatReadable(lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!P.textureTypeReadable(ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Je=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,Je),O.bufferData(O.PIXEL_PACK_BUFFER,Ge.byteLength,O.STREAM_READ),O.readPixels(Y,fe,le,he,Re.convert(lt),Re.convert(ft),0);const Nt=L!==null?ee.get(L).__webglFramebuffer:null;y.bindFramebuffer(O.FRAMEBUFFER,Nt);const Wt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await ep(O,Wt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,Je),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,Ge),O.deleteBuffer(Je),O.deleteSync(Wt),Ge}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,Y=null,fe=0){const le=Math.pow(2,-fe),he=Math.floor(A.image.width*le),Ge=Math.floor(A.image.height*le),qe=Y!==null?Y.x:0,ze=Y!==null?Y.y:0;pe.setTexture2D(A,0),O.copyTexSubImage2D(O.TEXTURE_2D,fe,0,0,qe,ze,he,Ge),y.unbindTexture()},this.copyTextureToTexture=function(A,Y,fe=null,le=null,he=0,Ge=0){let qe,ze,$e,Ze,lt,ft,Je,Nt,Wt;const Ht=A.isCompressedTexture?A.mipmaps[Ge]:A.image;if(fe!==null)qe=fe.max.x-fe.min.x,ze=fe.max.y-fe.min.y,$e=fe.isBox3?fe.max.z-fe.min.z:1,Ze=fe.min.x,lt=fe.min.y,ft=fe.isBox3?fe.min.z:0;else{const Xt=Math.pow(2,-he);qe=Math.floor(Ht.width*Xt),ze=Math.floor(Ht.height*Xt),A.isDataArrayTexture?$e=Ht.depth:A.isData3DTexture?$e=Math.floor(Ht.depth*Xt):$e=1,Ze=0,lt=0,ft=0}le!==null?(Je=le.x,Nt=le.y,Wt=le.z):(Je=0,Nt=0,Wt=0);const Ut=Re.convert(Y.format),hn=Re.convert(Y.type);let Xe;Y.isData3DTexture?(pe.setTexture3D(Y,0),Xe=O.TEXTURE_3D):Y.isDataArrayTexture||Y.isCompressedArrayTexture?(pe.setTexture2DArray(Y,0),Xe=O.TEXTURE_2D_ARRAY):(pe.setTexture2D(Y,0),Xe=O.TEXTURE_2D),y.activeTexture(O.TEXTURE0),y.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,Y.flipY),y.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),y.pixelStorei(O.UNPACK_ALIGNMENT,Y.unpackAlignment);const Cn=y.getParameter(O.UNPACK_ROW_LENGTH),bt=y.getParameter(O.UNPACK_IMAGE_HEIGHT),Fn=y.getParameter(O.UNPACK_SKIP_PIXELS),ti=y.getParameter(O.UNPACK_SKIP_ROWS),Ni=y.getParameter(O.UNPACK_SKIP_IMAGES);y.pixelStorei(O.UNPACK_ROW_LENGTH,Ht.width),y.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Ht.height),y.pixelStorei(O.UNPACK_SKIP_PIXELS,Ze),y.pixelStorei(O.UNPACK_SKIP_ROWS,lt),y.pixelStorei(O.UNPACK_SKIP_IMAGES,ft);const Ss=A.isDataArrayTexture||A.isData3DTexture,Ft=Y.isDataArrayTexture||Y.isData3DTexture;if(A.isDepthTexture){const Xt=ee.get(A),Di=ee.get(Y),Ot=ee.get(Xt.__renderTarget),Ui=ee.get(Di.__renderTarget);y.bindFramebuffer(O.READ_FRAMEBUFFER,Ot.__webglFramebuffer),y.bindFramebuffer(O.DRAW_FRAMEBUFFER,Ui.__webglFramebuffer);for(let bs=0;bs<$e;bs++)Ss&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,ee.get(A).__webglTexture,he,ft+bs),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,ee.get(Y).__webglTexture,Ge,Wt+bs)),O.blitFramebuffer(Ze,lt,qe,ze,Je,Nt,qe,ze,O.DEPTH_BUFFER_BIT,O.NEAREST);y.bindFramebuffer(O.READ_FRAMEBUFFER,null),y.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(he!==0||A.isRenderTargetTexture||ee.has(A)){const Xt=ee.get(A),Di=ee.get(Y);y.bindFramebuffer(O.READ_FRAMEBUFFER,X),y.bindFramebuffer(O.DRAW_FRAMEBUFFER,H);for(let Ot=0;Ot<$e;Ot++)Ss?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Xt.__webglTexture,he,ft+Ot):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Xt.__webglTexture,he),Ft?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Di.__webglTexture,Ge,Wt+Ot):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Di.__webglTexture,Ge),he!==0?O.blitFramebuffer(Ze,lt,qe,ze,Je,Nt,qe,ze,O.COLOR_BUFFER_BIT,O.NEAREST):Ft?O.copyTexSubImage3D(Xe,Ge,Je,Nt,Wt+Ot,Ze,lt,qe,ze):O.copyTexSubImage2D(Xe,Ge,Je,Nt,Ze,lt,qe,ze);y.bindFramebuffer(O.READ_FRAMEBUFFER,null),y.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else Ft?A.isDataTexture||A.isData3DTexture?O.texSubImage3D(Xe,Ge,Je,Nt,Wt,qe,ze,$e,Ut,hn,Ht.data):Y.isCompressedArrayTexture?O.compressedTexSubImage3D(Xe,Ge,Je,Nt,Wt,qe,ze,$e,Ut,Ht.data):O.texSubImage3D(Xe,Ge,Je,Nt,Wt,qe,ze,$e,Ut,hn,Ht):A.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,Ge,Je,Nt,qe,ze,Ut,hn,Ht.data):A.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,Ge,Je,Nt,Ht.width,Ht.height,Ut,Ht.data):O.texSubImage2D(O.TEXTURE_2D,Ge,Je,Nt,qe,ze,Ut,hn,Ht);y.pixelStorei(O.UNPACK_ROW_LENGTH,Cn),y.pixelStorei(O.UNPACK_IMAGE_HEIGHT,bt),y.pixelStorei(O.UNPACK_SKIP_PIXELS,Fn),y.pixelStorei(O.UNPACK_SKIP_ROWS,ti),y.pixelStorei(O.UNPACK_SKIP_IMAGES,Ni),Ge===0&&Y.generateMipmaps&&O.generateMipmap(Xe),y.unbindTexture()},this.initRenderTarget=function(A){ee.get(A).__webglFramebuffer===void 0&&pe.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?pe.setTextureCube(A,0):A.isData3DTexture?pe.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?pe.setTexture2DArray(A,0):pe.setTexture2D(A,0),y.unbindTexture()},this.resetState=function(){J=0,z=0,L=null,y.reset(),De.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ui}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=_t._getDrawingBufferColorSpace(e),t.unpackColorSpace=_t._getUnpackColorSpace()}}const wr=new D;function Bn(i,e,t,n,s,r){const a=2*Math.PI*s/4,o=Math.max(r-2*s,0),c=Math.PI/4;wr.copy(e),wr[n]=0,wr.normalize();const l=.5*a/(a+o),u=1-wr.angleTo(i)/c;return Math.sign(wr[t])===1?u*l:o/(a+o)+l+l*(1-u)}class ci extends An{constructor(e=1,t=1,n=1,s=2,r=.1){const a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const c=new D,l=new D,u=new D(e,t,n).divideScalar(2).subScalar(r),p=this.attributes.position.array,d=this.attributes.normal.array,h=this.attributes.uv.array,m=p.length/6,_=new D,g=.5/a;for(let f=0,M=0;f<p.length;f+=3,M+=2)switch(c.fromArray(p,f),l.copy(c),l.x-=Math.sign(l.x)*g,l.y-=Math.sign(l.y)*g,l.z-=Math.sign(l.z)*g,l.normalize(),p[f+0]=u.x*Math.sign(c.x)+l.x*r,p[f+1]=u.y*Math.sign(c.y)+l.y*r,p[f+2]=u.z*Math.sign(c.z)+l.z*r,d[f+0]=l.x,d[f+1]=l.y,d[f+2]=l.z,Math.floor(f/m)){case 0:_.set(1,0,0),h[M+0]=Bn(_,l,"z","y",r,n),h[M+1]=1-Bn(_,l,"y","z",r,t);break;case 1:_.set(-1,0,0),h[M+0]=1-Bn(_,l,"z","y",r,n),h[M+1]=1-Bn(_,l,"y","z",r,t);break;case 2:_.set(0,1,0),h[M+0]=1-Bn(_,l,"x","z",r,e),h[M+1]=Bn(_,l,"z","x",r,n);break;case 3:_.set(0,-1,0),h[M+0]=1-Bn(_,l,"x","z",r,e),h[M+1]=1-Bn(_,l,"z","x",r,n);break;case 4:_.set(0,0,1),h[M+0]=1-Bn(_,l,"x","y",r,e),h[M+1]=1-Bn(_,l,"y","x",r,t);break;case 5:_.set(0,0,-1),h[M+0]=Bn(_,l,"x","y",r,e),h[M+1]=1-Bn(_,l,"y","x",r,t);break}}static fromJSON(e){return new ci(e.width,e.height,e.depth,e.segments,e.radius)}}const Ct=(i,e,t)=>Qe.smootherstep(i,e,t),Pi=i=>Qe.clamp(Number.isFinite(i)?i:0,0,1);function qt(i,e,t=.08){const n=new an,s=-i/2,r=-e/2;return n.moveTo(s+t,r),n.lineTo(s+i-t,r),n.quadraticCurveTo(s+i,r,s+i,r+t),n.lineTo(s+i,r+e-t),n.quadraticCurveTo(s+i,r+e,s+i-t,r+e),n.lineTo(s+t,r+e),n.quadraticCurveTo(s,r+e,s,r+e-t),n.lineTo(s,r+t),n.quadraticCurveTo(s,r,s+t,r),n}function Hn(i,e,t,n=.05,s=0,r=0){const o=qt(e,t,n).getPoints(12).map(c=>new Ee(c.x+s,c.y+r));return i.holes.push(new mn(o.reverse())),i}function Zi(i,e,t,n){const s=new mn;return s.absarc(e,t,n,0,Math.PI*2,!0),i.holes.push(s),i}function Yt(i,e=.12,t=.012){const n=Math.min(t,e/4),s=e-n*2,r=new Wn(i,{depth:s,bevelEnabled:!0,bevelSize:n,bevelThickness:n,bevelSegments:3,curveSegments:12,steps:1});return r.translate(0,0,-s/2),r}function rt(i,e,t,n=0,s=0,r=0){const a=new gt(e,t);return a.position.set(n,s,r),a.castShadow=a.receiveShadow=!0,i.add(a),a}function et(i,e,t,n,s,r=0,a=0,o=0,c=.035){return rt(i,new ci(e,t,n,2,Math.min(c,e/4,t/4,n/4)),s,r,a,o)}function wt(i,e){const t=new St;return t.name=e,i.add(t),t}function Lx(){const e=new Uint8Array(65536);let t=71;const n=()=>(t=Math.imul(t,1664525)+1013904223>>>0)/4294967296;for(let r=0;r<128;r++){const a=n();for(let o=0;o<128;o++){const c=(r*128+o)*4,l=208+Math.floor(32*(.85*a+.15*n()));e[c]=e[c+1]=e[c+2]=l,e[c+3]=255}}const s=new ys(e,128,128);return s.wrapS=s.wrapT=Qi,s.repeat.set(2,5),s.needsUpdate=!0,s}function Xr(i="#c59a64"){const e=Lx();return{metal:new Tt({color:"#919eaa",metalness:.78,roughness:.4,roughnessMap:e,bumpMap:e,bumpScale:6e-4}),dark:new Tt({color:"#293640",metalness:.15,roughness:.48}),edge:new Tt({color:"#566b76",metalness:.7,roughness:.34,roughnessMap:e}),accent:new Tt({color:i,metalness:.72,roughness:.36}),ink:new Tt({color:"#dae5e8",metalness:.15,roughness:.42}),signal:new Tt({color:"#9ce5db",emissive:"#54bbaa",emissiveIntensity:.65,roughness:.35})}}function po(i){const e=new Set;i.traverse(t=>{t.geometry&&e.add(t.geometry);for(const n of[t.material].flat().filter(Boolean)){e.add(n);for(const s of Object.values(n))s?.isTexture&&e.add(s)}}),e.forEach(t=>t.dispose()),i.clear(),i.removeFromParent()}function Nx(){const i=new St;i.name="Distribution calibration bench";const e=Xr("#76b9bb"),t=wt(i,"Isolated metrology base"),n=wt(i,"Comparator bridge"),s=qt(4.4,2.7,.22);for(const h of[-1.8,1.8])for(const m of[-.95,.95])Zi(s,h,m,.1);rt(t,Yt(s,.23),e.metal,0,-.65,0).rotation.x=-Math.PI/2;for(const h of[-1.8,1.8])for(const m of[-.95,.95])rt(t,new Pt(.16,.19,.25,20),e.dark,h,-.83,m);const r=[],a=[],o=[],c=[];for(const h of[-1.12,1.12]){const m=wt(i,h<0?"Reference sample carousel":"Observed sample carousel");m.position.x=h,r.push(m),rt(m,new Pt(.91,.91,.25,48),e.dark,0,-.4,0);const _=rt(m,new Ms(.87,.035,10,64),e.edge,0,-.25,0);_.rotation.x=Math.PI/2;const g=wt(m,"Indexed specimen rotor");c.push(g),rt(g,new Pt(.77,.77,.08,48),e.metal,0,-.23,0);for(let x=0;x<8;x++){const w=x*Math.PI/4,S=rt(g,new Pt(.15,.15,.1,20),e.dark,Math.cos(w)*.56,-.15,Math.sin(w)*.56);rt(g,new Pt(.1,.1,.07,20),x%3===0?e.accent:e.ink,S.position.x,-.08,S.position.z)}const f=wt(i,"Removable optical head");a.push(f),f.position.x=h;const M=Hn(qt(1.94,1.94,.3),1.55,1.55,.3);rt(f,Yt(M,.12),e.metal,0,.5,0).rotation.x=-Math.PI/2;for(const x of[-.76,.76])et(f,1.4,.035,.05,e.signal,0,.57,x);const b=wt(i,"Reciprocating inspection probe");b.position.x=h,o.push(b),rt(b,new Pt(.11,.11,.65,24),e.edge,0,.83,0),rt(b,new Pt(.17,.11,.19,24),e.dark,0,.41,0),rt(b,new Pt(.085,.085,.028,24),e.signal,0,.3,0)}for(const h of[-2,2])et(n,.16,1.55,.22,e.metal,h,.24,-.85),et(n,.05,1.12,.03,e.accent,h,.26,-.71);et(n,4.15,.27,.32,e.metal,0,1.05,-.85);const l=wt(i,"Comparator measurement electronics");et(l,.98,.53,.25,e.dark,0,.54,-.66);const u=[];for(let h=0;h<7;h++){const m=et(l,.075,.25,.025,e.signal,(h-3)*.115,.54,-.52);u.push(m)}let p;function d(h,m=0){h=Pi(h);const _=Ct(h,.2,1);n.position.set(0,_*1.8,-_*.8),l.position.set(0,_*1.2,_*.3),r.forEach((g,f)=>{g.position.x=(f?1:-1)*(1.12+_*.65),g.position.y=-_*.25,c[f].rotation.y=m*.23*(f?-.8:1)}),a.forEach((g,f)=>{g.position.set((f?1:-1)*(1.12+_*.72),_*1.5,_*.55),g.rotation.z=(f?1:-1)*_*.24}),o.forEach((g,f)=>{g.position.set((f?1:-1)*(1.12+_*.65),_*2.3+Math.sin(m*.65+f)*.055,0)}),u.forEach((g,f)=>g.scale.y=.45+.45*(.5+.5*Math.sin(m*.7+f*.8))),p={progress:h,open:_,carousel:c[0].rotation.y}}return d(0),{group:i,update:d,get state(){return p},dispose:()=>po(i)}}const Sn=(i,e,t)=>{const n=Qe.clamp((t-i)/(e-i),0,1);return n*n*(3-2*n)};function $s(i,e,t=2){const n=new an,s=-i/2,r=-e/2;return n.moveTo(s+t,r),n.lineTo(s+i-t,r),n.quadraticCurveTo(s+i,r,s+i,r+t),n.lineTo(s+i,r+e-t),n.quadraticCurveTo(s+i,r+e,s+i-t,r+e),n.lineTo(s+t,r+e),n.quadraticCurveTo(s,r+e,s,r+e-t),n.lineTo(s,r+t),n.quadraticCurveTo(s,r,s+t,r),n}function Oa(i,e,t,n,s,r=1){const a=new mn($s(n,s,r).getPoints(32).map(o=>o.add(new Ee(e,t))));i.holes.push(a)}function Dx(i,e,t,n=2,s=[]){const r=$s(i,e,n);for(const o of s)Oa(r,...o);const a=new Wn(r,{depth:t,bevelEnabled:!0,bevelSegments:5,steps:1,bevelSize:Math.min(.28,t*.2),bevelThickness:Math.min(.4,t*.2),curveSegments:32});return a.rotateX(-Math.PI/2),a.translate(0,-t/2,0),a.computeVertexNormals(),a}function Uh(i=!1){const e=document.createElement("canvas");e.width=e.height=1024;const t=e.getContext("2d"),n=t.createImageData(1024,1024);let s=37;const r=()=>(s=s*1664525+1013904223>>>0,s/4294967296),a=Array.from({length:1024},()=>r());for(let c=0;c<1024;c++)for(let l=0;l<1024;l++){const u=(c*1024+l)*4,p=i?150+a[c]*55+r()*16:150+r()*65;n.data[u]=n.data[u+1]=n.data[u+2]=p,n.data[u+3]=255}t.putImageData(n,0,0);const o=new Ja(e);return o.wrapS=o.wrapT=Qi,o.repeat.set(2,2),o.anisotropy=16,o}function Ux(){const i=new St;i.name="Sealed instrument";const e=Uh(!0),t=Uh(),n={aluminium:new Nn({color:4738898,metalness:.94,roughness:.49,roughnessMap:e,bumpMap:e,bumpScale:.045,anisotropy:.75,anisotropyRotation:Math.PI/2,clearcoat:.16,clearcoatRoughness:.42}),edge:new Nn({color:11580597,metalness:1,roughness:.27,roughnessMap:e,anisotropy:.6}),dark:new Nn({color:1514011,metalness:.45,roughness:.49,roughnessMap:e,anisotropy:.5}),black:new Nn({color:527116,metalness:.16,roughness:.6,roughnessMap:t,bumpMap:t,bumpScale:.028,clearcoat:.2,clearcoatRoughness:.5}),pcb:new Nn({color:1517092,metalness:.24,roughness:.63,roughnessMap:t}),chip:new Tt({color:1053460,roughness:.76,roughnessMap:t}),gold:new Tt({color:9995354,metalness:.82,roughness:.43}),ceramic:new Tt({color:6512985,roughness:.7}),silk:new jt({color:10660518})},s=[],r=new Set,a={};function o(U,k,ie,Te=[0,0,0]){const Ne=new gt(k,ie);return Ne.position.set(...Te),Ne.castShadow=Ne.receiveShadow=!0,U.add(Ne),Ne}function c(U,k,ie,Te,Ne,O=[0,0,0],st=2,Ye=[]){return o(U,Dx(k,ie,Te,st,Ye),Ne,O)}function l(U,k,ie,Te,Ne,O=64){return o(U,new Pt(k,k,ie,O,1),Te,Ne)}function u(U,k,ie,Te,Ne){const O=new St;return O.name=U,O.position.set(...k),i.add(O),s.push({g:O,base:new D(...k),offset:new D(...ie),start:Te,end:Ne}),a[U]=O,O}function p(U,k,ie,Te,Ne,O="#b4b9b7",st=40){const Ye=document.createElement("canvas");Ye.width=1024,Ye.height=256;const P=Ye.getContext("2d");P.clearRect(0,0,1024,256),P.fillStyle=O,P.font=`${st}px monospace`,P.textBaseline="middle",P.fillText(k,24,128);const y=new Ja(Ye);y.colorSpace=pn;const q=new jt({map:y,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}),ee=o(U,new Xn(ie,Te),q,Ne);return ee.rotation.x=-Math.PI/2,ee}function d(U,k){const ie=new St;ie.position.set(...k),U.add(ie),l(ie,1.1,7,n.edge,[0,-2,0]);const Te=$s(4.6,4.6,2.2),Ne=new mn;for(let st=0;st<6;st++){const Ye=st*Math.PI/3;st?Ne.lineTo(Math.cos(Ye)*.87,Math.sin(Ye)*.87):Ne.moveTo(Math.cos(Ye)*.87,Math.sin(Ye)*.87)}Ne.closePath(),Te.holes.push(Ne);const O=new Wn(Te,{depth:1.1,bevelEnabled:!0,bevelSegments:4,bevelSize:.15,bevelThickness:.15,curveSegments:32});O.rotateX(-Math.PI/2),o(ie,O,n.edge),l(ie,.85,.1,n.chip,[0,.05,0]);for(let st=0;st<7;st++){const Ye=o(ie,new Ms(1.12,.12,8,32),n.dark,[0,-5+st*.65,0]);Ye.rotation.x=Math.PI/2}return ie}const h=[[-77,-50],[77,-50],[-77,50],[77,50]],m=u("Chassis",[0,-12,0],[0,-38,0],.23,.63);c(m,172,118,3,n.dark,[0,0,0],6,h.map(([U,k])=>[U,k,3,3,1.4]));const _=$s(172,118,6);Oa(_,0,0,167,113,4.5);const g=new Wn(_,{depth:29,bevelEnabled:!0,bevelSegments:5,bevelSize:.4,bevelThickness:.35,curveSegments:32});g.rotateX(-Math.PI/2),o(m,g,n.aluminium,[0,1,0]);for(const[U,k]of h)l(m,3.5,10,n.aluminium,[U,7,k]),l(m,1.3,.1,n.chip,[U,12.1,k]);for(const[U,k]of[[-65,-40],[65,-40],[-65,40],[65,40]])c(m,15,12,2,n.black,[U,-3,k],3);p(m,"ASTRA   /   SB—09",65,16,[-38,2.1,27],"#939b9b",39);const f=u("Enclosure",[0,20.5,0],[-16,97,-24],.04,.43),M=[];for(let U=0;U<18;U++)M.push([-55+U*3.3,-29,1.8,29,.8]);c(f,172,118,2.5,n.aluminium,[0,0,0],6,[...M,...h.map(([U,k])=>[U,k,5.4,5.4,2.6])]);const b=$s(165,111,4);Oa(b,0,0,162,108,3);const x=new Wn(b,{depth:2,bevelEnabled:!0,bevelSegments:3,bevelSize:.2,bevelThickness:.2,curveSegments:32});x.rotateX(-Math.PI/2),o(f,x,n.dark,[0,-3.6,0]),p(f,"A S T R A",45,11,[-52,1.69,29],"#303536",56),p(f,"SEALED EXECUTION INSTRUMENT",65,10,[-42,1.7,40],"#424849",25),p(f,"SB–09 / 001",27,7,[62,1.7,42],"#44494a",37);for(const[U,k]of h){const ie=u("Fastener "+U+","+k,[U,22.5,k],[-16,118,-24],0,.25);d(ie,[0,0,0])}const w=u("Logic board",[0,-3,0],[-8,25,8],.2,.55);c(w,153,100,1.7,n.pcb,[0,0,0],3,h.map(([U,k])=>[U*.92,k*.9,3,3,1.4]));const S=document.createElement("canvas");S.width=2048,S.height=1365;const E=S.getContext("2d");E.clearRect(0,0,S.width,S.height),E.strokeStyle="#5a6960",E.lineWidth=1.6;for(let U=0;U<74;U++){const k=70+U*137%1860,ie=90+U*173%1170;E.beginPath(),E.moveTo(k,ie),E.lineTo(k+30,ie),E.lineTo(k+65,ie+35),E.lineTo(k+115,ie+35),E.stroke(),E.beginPath(),E.arc(k,ie,3,0,Math.PI*2),E.stroke()}E.strokeStyle="#bac2ae",E.fillStyle="#bec5b7",E.font="15px monospace";for(let U=0;U<38;U++){const k=80+U*173%1820,ie=80+U*131%1130;E.strokeRect(k,ie,52,27),E.fillText("R"+(102+U),k,ie-8)}E.font="21px monospace",E.fillText("ASTRA  /  SANDBOX CONTROLLER",85,1250),E.fillText("REV 09.3   •   94V–0",1530,1250);const v=new Ja(S);v.colorSpace=pn;const T=o(w,new Xn(152,99),new jt({map:v,transparent:!0,depthWrite:!1}),[0,1.34,0]);T.rotation.x=-Math.PI/2;for(let U=0;U<60;U++){const k=-65+U*19.7%130,ie=-41+U*13.1%82;if(!(k>6&&ie>-29&&ie<40)){c(w,2.8,1.5,1,n.ceramic,[k,1.8,ie],.15);for(const Te of[-1.5,1.5])c(w,.6,1.65,.9,n.edge,[k+Te,1.7,ie],.1)}}for(const[U,k,ie,Te]of[[-50,-24,15,15],[-21,-25,12,16],[-45,22,18,17],[0,38,13,10],[-65,8,8,12]]){c(w,ie,Te,2,n.chip,[U,2.2,k],.7),p(w,"U"+Math.round(U*U+k*k),ie,Te/2,[U,3.5,k],"#89918a",62);for(let Ne=0;Ne<8;Ne++)for(const O of[-1,1])c(w,2,.55,.45,n.edge,[U+O*(ie/2+.8),1.6,k-Te/2+1+Ne*(Te-2)/7],.1)}for(let U=0;U<7;U++)l(w,2.8,6,n.dark,[-67+U*8,4,-39]),l(w,2.45,.3,n.edge,[-67+U*8,7.15,-39]);const R=u("Connector bank",[0,0,-46],[10,20,-53],.29,.62);c(R,128,11,1.5,n.pcb,[0,0,0],1);for(let U=0;U<4;U++){const k=-44+U*26,ie=$s(18,10,1);Oa(ie,0,0,14.5,7,.7);const Te=new Wn(ie,{depth:11,bevelEnabled:!0,bevelSize:.25,bevelThickness:.25,bevelSegments:4,curveSegments:24});o(R,Te,n.edge,[k,6,-6]),c(R,13,8,1.2,n.chip,[k,3,-1],.5);for(let Ne=0;Ne<7;Ne++)c(R,.65,6,.4,n.gold,[k-4.5+Ne*1.5,4,-2],.1)}const C=u("Thermal array",[-43,9,-17],[-53,47,-12],.3,.64);c(C,47,39,2.5,n.dark,[0,0,0],2);for(let U=0;U<14;U++)c(C,1.15,36,8,n.aluminium,[-21+U*3.2,5,0],.48);for(const U of[-18,18])d(C,[U,1.7,16]);const I=u("RF shield",[-43,8,27],[-39,37,48],.34,.67);c(I,37,29,1,n.edge,[0,4,0],2);for(const U of[-18,18])c(I,1,28,7,n.aluminium,[U,0,0],.3);for(const U of[-14,14])c(I,36,1,7,n.aluminium,[0,0,U],.3);p(I,"RF / 02",28,8,[0,4.8,0],"#545b5c",58);const B=u("Sealed core",[35,9,8],[110,48,15],.38,.77),X=n.black.clone();X.color.setHex(1053717),X.roughness=.44,X.metalness=.1,X.envMapIntensity=.32,X.clearcoat=.1,c(B,62,67,13,X,[0,0,0],4),p(B,"A S T R A   /   0 9",43,8,[-4,6.94,-22],"#7e8989",39),p(B,"SANDBOX",37,8,[-7,6.95,20],"#4f5a59",37);const H=new Tt({color:12122071,emissive:7794357,emissiveIntensity:2,roughness:.38});c(B,3.5,.65,.08,H,[22,6.96,22],.3);const J=c(m,13,4.5,.7,n.black,[60,13,59.6],1);J.rotation.x=Math.PI/2;for(const U of[57,63]){const k=o(m,new Ci(.9,20,12),H,[U,13,60.25]);k.name="Front status LED"}const z=new Im(10485714,.4,12,2);z.position.set(22,8,22),B.add(z);const L=new St;L.name="Socketed power cartridge",B.add(L);const V=new Tt({color:2639166,metalness:.2,roughness:.63});c(L,52,42,.8,V,[0,7.5,-2],2);for(const U of[-22,22])for(const k of[-18,14])l(L,1.55,.65,n.edge,[U,8.3,k],24),l(L,.68,.7,n.chip,[U,8.6,k],16);const K=new Tt({color:3357499,emissive:16717320,emissiveIntensity:0,roughness:.52,metalness:.15}),Z=c(L,15,17,1.6,K,[3,8.9,-3],1);Z.name="Faulty power regulator";for(const U of[-6,12])for(let k=0;k<7;k++)c(L,2,.6,.45,n.gold,[U,8.2,-10+k*2.25],.1);for(const[U,k]of[[-15,-8],[-15,4],[17,6]]){c(L,7,7,1.3,n.chip,[U,8.7,k],1);for(let ie=0;ie<4;ie++)c(L,5,.35,.3,n.edge,[U,9.5,k-1.5+ie],.1)}for(let U=0;U<9;U++)c(L,2.4,4,.2,n.gold,[-18+U*4.5,7.95,17],.1);p(L,"PWR–03  /  SERVICE",29,4,[0,8.1,-17],"#c3d1c5",30);const N=K.clone();N.color.setHex(3427397),N.emissive.setHex(5627824),N.emissiveIntensity=.22;const Q=V.clone();Q.emissive.setHex(1461305),Q.emissiveIntensity=.15;const xe=H.clone(),ce=B.clone(!0);ce.name="Replacement power cartridge",i.add(ce),ce.traverse(U=>{U.material===K&&(U.material=N,U.name="Replacement power regulator"),U.material===V&&(U.material=Q),U.material===H&&(U.material=xe),U.isLight&&(U.intensity=0)}),a["Faulty cartridge"]=B,a["Replacement cartridge"]=ce;const W=new cr({color:13496063,transparent:!0,opacity:0,depthWrite:!1,toneMapped:!1}),j=W.clone(),ne=[];for(let U=0;U<3;U++){const k=new Et;k.setAttribute("position",new yt(new Float32Array(27),3));const ie=new Lr(k,j);ie.name="Regulator discharge "+U,ie.frustumCulled=!1,B.add(ie),ne.push(ie)}const de=[];for(let U=0;U<5;U++){const k=new Et;k.setAttribute("position",new yt(new Float32Array(45),3));const ie=new Lr(k,W);ie.name="Enclosure seam discharge "+U,ie.frustumCulled=!1,i.add(ie),de.push(ie)}const me=new Uint8Array(1024*4);for(let U=0;U<32;U++)for(let k=0;k<32;k++){const ie=(U*32+k)*4,Te=Math.hypot((k-15.5)/15.5,(U-15.5)/15.5);me[ie]=me[ie+1]=me[ie+2]=255,me[ie+3]=Math.round(255*Math.max(0,1-Te*Te)**3)}const Ae=new ys(me,32,32);Ae.needsUpdate=!0,Ae.magFilter=cn;const He=[];for(let U=0;U<8;U++){const k=new xd({map:Ae,color:12896715,transparent:!0,opacity:0,depthWrite:!1}),ie=new Fp(k);ie.name="Fault smoke "+U,B.add(ie),He.push(ie)}for(const U of s)U.g!==B&&U.g.traverse(k=>{if(k.material)for(const ie of[k.material].flat())r.add(ie)});const Oe=new Map([...r].map(U=>[U,{color:U.color.clone(),env:U.envMapIntensity,roughness:U.roughness}])),ve=new Rm({color:6846069,transparent:!0,opacity:0,dashSize:1,gapSize:2,depthWrite:!1}),ue=s.filter(U=>!U.g.name.startsWith("Fastener")).map(U=>{const k=new Et().setFromPoints([U.base,U.base]),ie=new Lr(k,ve);return i.add(ie),{p:U,line:ie}});function ge(U,k=0,ie={}){U=Qe.clamp(Number.isFinite(U)?U:0,0,1),k=Number.isFinite(k)?k:0;const Te=ye=>Qe.clamp(Number.isFinite(ye)?ye:0,0,1),Ne=Te(ie.fault),O=Te(ie.repair);for(const[ye,Me]of s.entries()){Me.g.position.copy(Me.base).addScaledVector(Me.offset,Sn(Me.start,Me.end,U));const re=Sn(Me.start,Me.end,U);Me.g.position.y+=Math.sin(k*.65+ye*1.7)*re*.9,Me.g.position.x+=Math.sin(k*.39+ye*2.1)*re*.35}const st=Sn(.72,.85,U)*(1-.65*Math.max(Ne,O));for(const[ye,Me]of Oe)ye.color.copy(Me.color).multiplyScalar(1-st*.94),Me.env!==void 0&&(ye.envMapIntensity=Me.env*(1-st*.9)),Me.roughness!==void 0&&(ye.roughness=Qe.lerp(Me.roughness,.9,st));const Ye=Sn(.03,.52,O),P=Sn(.36,.93,O);ce.position.copy(B.position).add(new D(2300*(1-P),45*(1-P),-18*(1-P))),ce.rotation.z=-.12*(1-P),ce.visible=O>.3,B.position.x-=2300*Ye,B.position.y+=46*Sn(.03,.24,O),B.rotation.z=.24*Ye,B.visible=O<.64;const y=Ne*(1-Sn(.3,.65,O)),q=(k%1.85+1.85)%1.85,ee=(1-Sn(.018,.14,q))*Sn(0,.012,q)+.65*Sn(.205,.218,q)*(1-Sn(.23,.285,q)),pe=y*ee;K.color.setHex(3357499).lerp(new it(16719888),y),K.emissiveIntensity=y*(2.8+.55*Math.sin(k*2.4)+pe*3.8),V.color.setHex(2639166).lerp(new it(12064784),y),V.emissive.setHex(16717832),V.emissiveIntensity=y*(.55+pe*.8),H.color.setHex(12122071).lerp(new it(16736328),y),H.emissive.setHex(7794357).lerp(new it(16721936),y),H.emissiveIntensity=2*(1-y)+y*(1.55+.8*Math.sin(k*6.8)),z.color.setHex(10485714).lerp(new it(16726044),y),z.intensity=B.visible?.4+pe*1.5:0,f.rotation.x=y*(.012*Math.sin(k*3.4)+ee*.027)*(1-Sn(.25,.5,U)),f.position.y+=y*(.35+.55*Math.sin(k*3.4)+ee*1.5)*(1-Sn(.25,.5,U)),W.opacity=Math.min(1,pe*1.7),j.opacity=Math.min(1,y*(.23+.07*Math.sin(k*9))+pe*1.7);for(const[ye,Me]of ne.entries()){Me.visible=y>.005&&B.visible;const re=Me.geometry.attributes.position;for(let _e=0;_e<9;_e++){const Ie=_e/8,F=Math.sin(Ie*Math.PI);re.setXYZ(_e,-9+24*Ie,9.8+F*(4+ye*.65+Math.sin(k*61+_e*2.9+ye)*1.5),-7+ye*4+F*Math.sin(k*47+_e*2.1+ye)*1.8)}re.needsUpdate=!0}for(const[ye,Me]of de.entries()){Me.visible=pe>.005;const re=Me.geometry.attributes.position,_e=ye%2?1:-1;for(let Ie=0;Ie<15;Ie++){const F=Ie/14,$=Math.sin(F*Math.PI),oe=Math.sin(k*73+Ie*4.1+ye*2.7);re.setXYZ(Ie,_e*(22+ye*5+F*37)+$*oe*3.7,f.position.y+2+$*(5+ye*1.7+oe*2.5),60+$*(7+ye*1.5))}re.needsUpdate=!0}for(const[ye,Me]of He.entries()){const re=((k-ye*.12)%1.85+1.85)%1.85/1.85;Me.visible=y>.005&&B.visible,Me.position.set(3+Math.sin(re*5+ye)*re*11,10.1+re*59,-3+Math.sin(re*3+ye)*re*8),Me.scale.setScalar(9+re*27),Me.material.rotation=Math.sin(k*.12+ye)*.45,Me.material.opacity=y*.42*Math.sin(Math.PI*re)*(1-re*.35)}i.userData.state={t:U,time:k,fault:Ne,repair:O,activeFault:y,flash:pe,oldRemoved:Ye,replacementSeated:P,parts:s.length,faultyVisible:B.visible,replacementVisible:ce.visible,faultyCartridgePosition:B.position.toArray(),smokeOrigin:[3,10.1,-3],smokeAttachedTo:B.name,localDischargeOpacity:j.opacity,replacementFault:0},ve.opacity=.2*Sn(.16,.35,U)*(1-Sn(.7,.84,U));for(const{p:ye,line:Me}of ue){const re=Me.geometry.attributes.position;re.setXYZ(0,...ye.base.toArray()),re.setXYZ(1,...ye.g.position.toArray()),re.needsUpdate=!0,Me.computeLineDistances()}}function Le(){const U=new Set,k=new Set,ie=new Set([e,t]);i.traverse(Te=>{if(Te.geometry&&U.add(Te.geometry),Te.material)for(const Ne of[Te.material].flat()){k.add(Ne);for(const O of Object.values(Ne))O?.isTexture&&ie.add(O)}}),U.forEach(Te=>Te.dispose()),k.forEach(Te=>Te.dispose()),ie.forEach(Te=>Te.dispose()),i.removeFromParent()}return ge(0),{group:i,update:ge,dispose:Le,anchors:a}}function zl(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,c=new Et;let l=0;for(let u=0;u<i.length;++u){const p=i[u];let d=0;if(t!==(p.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const h in p.attributes){if(!n.has(h))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+h+'" attribute exists among all geometries, or in none of them.'),null;r[h]===void 0&&(r[h]=[]),r[h].push(p.attributes[h]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==p.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const h in p.morphAttributes){if(!s.has(h))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[h]===void 0&&(a[h]=[]),a[h].push(p.morphAttributes[h])}if(e){let h;if(t)h=p.index.count;else if(p.attributes.position!==void 0)h=p.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,h,u),l+=h}}if(t){let u=0;const p=[];for(let d=0;d<i.length;++d){const h=i[d].index;for(let m=0;m<h.count;++m)p.push(h.getX(m)+u);u+=i[d].attributes.position.count}c.setIndex(p)}for(const u in r){const p=Fh(r[u]);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,p)}for(const u in a){const p=a[u][0].length;if(p!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let d=0;d<p;++d){const h=[];for(let _=0;_<a[u].length;++_)h.push(a[u][_][d]);const m=Fh(h);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(m)}}}return c}function Fh(i){let e,t,n,s=-1,r=0;for(let l=0;l<i.length;++l){const u=i[l];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*t}const a=new e(r),o=new $t(a,t,n);let c=0;for(let l=0;l<i.length;++l){const u=i[l];if(u.isInterleavedBufferAttribute){const p=c/t;for(let d=0,h=u.count;d<h;d++)for(let m=0;m<t;m++){const _=u.getComponent(d,m);o.setComponent(d+p,m,_)}}else a.set(u.array,c);c+=u.count*t}return s!==void 0&&(o.gpuType=s),o}const Fx=i=>Qe.clamp(Number.isFinite(i)?i:0,0,1),Ws=(i,e,t)=>Qe.smoothstep(i,e,t);function Ei(i,e,t){const n=-i/2,s=-e/2,r=Math.max(0,Math.min(t,i/2,e/2)),a=new an;return a.moveTo(n+r,s),a.lineTo(n+i-r,s),a.quadraticCurveTo(n+i,s,n+i,s+r),a.lineTo(n+i,s+e-r),a.quadraticCurveTo(n+i,s+e,n+i-r,s+e),a.lineTo(n+r,s+e),a.quadraticCurveTo(n,s+e,n,s+e-r),a.lineTo(n,s+r),a.quadraticCurveTo(n,s,n+r,s),a}function Ra(i,e,t,n){const s=new mn;s.absarc(e,t,n,0,Math.PI*2,!0),i.holes.push(s)}function Sc(i,e,t=.02){const n=Math.max(0,Math.min(t,e/4)),s=e-2*n,r=new Wn(i,{depth:s,bevelEnabled:n>0,bevelSize:n,bevelThickness:n,bevelSegments:4,curveSegments:32,steps:1});return r.translate(0,0,-s/2),r}function Oh(i=!1){const t=new Uint8Array(262144);let n=71;const s=()=>(n=Math.imul(n,1664525)+1013904223>>>0)/4294967296;for(let a=0;a<256;a++){const o=s();for(let c=0;c<256;c++){const l=205+Math.floor(35*(i?o*.8+s()*.2:s())),u=(a*256+c)*4;t[u]=t[u+1]=t[u+2]=l,t[u+3]=255}}const r=new ys(t,256,256);return r.wrapS=r.wrapT=Qi,r.repeat.set(2,6),r.needsUpdate=!0,r}function Ox(i){const e=new Set;i.traverse(t=>{t.geometry&&e.add(t.geometry);for(const n of[t.material].flat().filter(Boolean)){e.add(n);for(const s of Object.values(n))s?.isTexture&&e.add(s)}});for(const t of e)t.dispose();i.clear(),i.removeFromParent()}function Bx(){const i=new St;i.name="Agent workstation network";const e=Oh(!0),t=Oh(),n=new Nn({color:"#303644",metalness:.84,roughness:.36,roughnessMap:e,bumpMap:e,bumpScale:.001,anisotropy:.35}),s=new Tt({color:"#727e92",metalness:.86,roughness:.3}),r=new Tt({color:"#101722",metalness:0,roughness:.48,roughnessMap:t}),a=new Tt({color:"#14565b",metalness:.18,roughness:.48}),o=new Tt({color:"#d49361",metalness:.86,roughness:.3}),c=new Tt({color:"#d8b775",metalness:.74,roughness:.35}),l=new jt({color:"#55dfff"}),u=new jt({color:"#8d65ff"}),p=new jt({color:"#d5eaf3"}),d=new jt({color:"#071526"}),h=new Map,m=(F,$,oe,be,Pe,ke,G,Se=n,se=.04)=>{const Re=[$,oe,be,se].join(",");h.has(Re)||h.set(Re,new ci($,oe,be,2,Math.min(se,$/3,oe/3,be/3)));const De=new gt(h.get(Re),Se);return De.position.set(Pe,ke,G),De.castShadow=De.receiveShadow=!0,F.add(De),De},_=F=>{const $=new St;return $.name=F,i.add($),$},g=(F,$,oe,be,Pe,ke=.04)=>{const G=Ei(be,Pe,ke).getPoints(6).map(Se=>new Ee(Se.x+$,Se.y+oe)).reverse();F.holes.push(new mn(G))},f=(F,$,oe,be,Pe=n,ke=.015)=>{const G=new gt(Sc($,oe,ke),Pe);return G.rotation.x=-Math.PI/2,G.position.y=be,G.castShadow=G.receiveShadow=!0,F.add(G),G},M=(F,$,oe,be,Pe,ke,G=s,Se=24)=>{const se=new gt(new Pt($,$,oe,Se),G);return se.position.set(be,Pe,ke),F.add(se),se},b=(F,$,oe,be)=>{M(F,.095,.035,$,oe,be,r,16),M(F,.065,.04,$,oe+.015,be,s,12),m(F,.065,.008,.018,$,oe+.04,be,r,.003)},x=(F,$,oe,be=o)=>{const Pe=new Qa($.map(G=>new D(...G))),ke=new gt(new Hr(Pe,32,oe,8,!1),be);return F.add(ke),ke},w=_("Laptop chassis"),S=_("Laptop deck"),E=_("Laptop motherboard"),v=_("Laptop cooling"),T=_("Laptop battery"),R=_("Laptop display"),C=_("Processor modules"),I=_("Memory and storage"),B=_("Captive deck fasteners"),X=Ei(13,8,.38);for(const F of[-4.4,4.4])for(let $=0;$<7;$++)g(X,F,-1.8+($-3)*.24,1.8,.1);for(const F of[-5.8,5.8])for(const $ of[-3.35,3.35])Ra(X,F,-$,.105);f(w,X,.13,-.48);const H=Ei(13,8,.38);g(H,0,0,12.62,7.62,.25),f(w,H,.38,-.23,n,.025);const J=Ei(12.61,7.61,.25);g(J,0,0,12.44,7.44,.19),f(w,J,.12,.015,s,.01),m(w,11.5,.04,.045,0,-.22,4.02,l,.01);for(const F of[-5.55,5.55])for(const $ of[-3.25,3.2])m(w,1.35,.08,.3,F,-.59,$,r,.06);for(const F of[-5.8,5.8])for(const $ of[-3.35,3.35])b(w,F,-.38,$);for(const F of[-1,1]){for(let be=0;be<3;be++){const Pe=Ei(.58,.21,.04);g(Pe,0,0,.43,.12,.025);const ke=new gt(Sc(Pe,.22,.008),s);ke.rotation.y=F*Math.PI/2,ke.position.set(F*6.48,-.22,.3+be*.8),w.add(ke),m(w,.21,.035,.34,F*6.48,-.23,.3+be*.8,r,.008)}const $=Ei(2.2,.28,.04);for(let be=0;be<9;be++)g($,(be-4)*.22,0,.11,.16,.015);const oe=new gt(Sc($,.08,.008),r);oe.rotation.y=F*Math.PI/2,oe.position.set(F*6.52,-.2,-2.15),w.add(oe)}for(const F of[-4.8,4.8]){const $=M(w,.2,1.2,F,.17,-3.64,s,32);$.rotation.z=Math.PI/2;for(const oe of[-.47,.47]){const be=M(w,.22,.075,F+oe,.17,-3.64,r);be.rotation.z=Math.PI/2}m(w,.65,.16,.58,F,.12,-3.46,n)}const z=Ei(12.96,7.96,.36);g(z,0,.83,11.4,3.68,.14),g(z,0,-2.25,3.88,1.43,.16);for(const F of[-5.81,5.81])for(let $=0;$<12;$++)g(z,F,2.85-$*.43,.1,.22,.025);for(const F of[-5.8,5.8])for(const $ of[-3.35,3.35])Ra(z,F,-$,.11);f(S,z,.16,.17,n,.025),m(S,11.35,.1,3.6,0,.17,-.83,r,.1);const L=new ci(.66,.105,.51,2,.035),V=new zn(L,r,75),K=new zn(new An(.7,.026,.55),l,75),Z=new zn(new An(.13,.009,.024),p,75),N=new kt,Q=new it;for(let F=0;F<75;F++)N.position.set((F%15-7)*.735,.3,Math.floor(F/15)*.66-2.15),N.updateMatrix(),V.setMatrixAt(F,N.matrix),N.position.y=.257,N.updateMatrix(),K.setMatrixAt(F,N.matrix),Q.setHSL(.52+F%15/15*.23,.86,.59),K.setColorAt(F,Q),N.position.y=.358,N.position.z-=.09,N.updateMatrix(),Z.setMatrixAt(F,N.matrix);S.add(V,K,Z),m(S,3.82,.04,1.37,0,.235,2.25,r,.13),m(S,3.1,.012,.018,0,.258,2.89,s,.004);for(const F of[-5.8,5.8])for(const $ of[-3.35,3.35])b(B,F,.27,$);for(let F=0;F<2;F++){const $=m(S,.07,.018,.4,5.2+F*.2,.27,2.3,l,.01);$.rotation.y=-.5}const xe=Ei(12.1,6.75,.19);for(const F of[-5.65,5.65])for(const $ of[-2.85,2.85])Ra(xe,F,-$,.12);f(E,xe,.11,-.15,a,.008);for(const F of[-5.65,5.65])for(const $ of[-2.85,2.85])M(E,.17,.065,F,-.07,$,c),b(E,F,-.04,$);const ce=[];for(let F=0;F<22;F++){const $=-4.95+F*.45,oe=.65+F%5*.16;ce.push(new D($,-.086,2.65),new D($,-.086,oe)),ce.push(new D($,-.086,oe),new D($*.57,-.086,oe-.44))}E.add(new yd(new Et().setFromPoints(ce),new cr({color:"#63a3a1",transparent:!0,opacity:.55})));const W=new zn(new An(.17,.1,.11),r,112);for(let F=0;F<112;F++){const $=Math.floor(F/28),oe=F%28;N.position.set(-5.55+oe*.41,-.015,-.1+$*.29),N.updateMatrix(),W.setMatrixAt(F,N.matrix)}E.add(W);for(const[F,$,oe,be]of[[-1.55,-1.15,1.9,1.65],[1.15,-1.15,2.35,1.9]]){m(C,oe+.22,.09,be+.22,F,-.025,$,a,.035),m(C,oe,.11,be,F,.065,$,r,.04),m(C,oe*.71,.055,be*.67,F,.147,$,s,.025);for(const Pe of[-1,1])for(let ke=0;ke<12;ke++)m(C,.047,.035,.1,F+(ke-5.5)*oe/13,.04,$+Pe*(be/2+.04),c,.004);for(let Pe=0;Pe<3;Pe++)m(C,oe*.45,.006,.025,F,.178,$+(Pe-1)*.14,r,.002)}for(const F of[-2.5,2.25]){m(I,3.45,.085,.84,F,.035,.9,a,.025);for(let $=0;$<5;$++)m(I,.49,.07,.49,F+($-2)*.6,.11,.89,r,.015);for(let $=0;$<22;$++)m(I,.09,.018,.12,F+($-10.5)*.145,.086,1.31,c,.003);for(const $ of[-1.77,1.77])m(I,.1,.2,.5,F+$,.045,.9,s,.015)}m(I,3.4,.08,.72,-.4,.04,1.95,a,.025);for(let F=0;F<3;F++)m(I,.64,.09,.47,-1.25+F*.86,.12,1.95,r,.015);b(I,1.11,.115,1.95),m(T,10.6,.26,1.23,0,-.12,2.78,r,.1);for(let F=0;F<4;F++){m(T,2.47,.025,1.05,(F-1.5)*2.58,.025,2.78,n,.07),m(T,.018,.035,.93,(F-1.5)*2.58+1.15,.045,2.78,s,.004);for(let $=0;$<3;$++)m(T,.63-$*.1,.008,.025,(F-1.5)*2.58,.045,2.56+$*.12,s,.003)}x(T,[[4.7,.01,2.6],[5.15,.1,2.28],[4.8,.13,1.7]],.035,r),m(T,.43,.19,.28,4.8,.11,1.64,s,.025);const j=[];for(const F of[-4.5,4.5]){const $=Ei(2.55,2.6,.35);Ra($,0,0,1.06);const oe=f(v,$,.19,.15,r,.02);oe.position.x=F,oe.position.z=-1.95;const be=new gt(new Ms(1.1,.027,8,48),s);be.rotation.x=Math.PI/2,be.position.set(F,.26,-1.95),v.add(be);const Pe=new St;Pe.name=F<0?"Left cooling fan":"Right cooling fan",Pe.position.set(F,.18,-1.95),v.add(Pe),j.push(Pe);const ke=new zn(new ci(.63,.085,.11,1,.024),n,29);for(let Se=0;Se<29;Se++){const se=Se/29*Math.PI*2;N.position.set(Math.cos(se)*.64,0,Math.sin(se)*.64),N.rotation.set(0,-se+.64,0),N.updateMatrix(),ke.setMatrixAt(Se,N.matrix)}Pe.add(ke),N.rotation.set(0,0,0),M(Pe,.3,.15,0,.03,0,s,32),M(Pe,.13,.015,0,.115,0,r);for(const Se of[-1.1,1.1])for(const se of[-1.1,1.1])b(v,F+Se,.27,-1.95+se);const G=new zn(new An(.045,.36,.6),s,26);for(let Se=0;Se<26;Se++)N.position.set(F+(Se-12.5)*.085,.13,-3.36),N.updateMatrix(),G.setMatrixAt(Se,N.matrix);v.add(G)}for(let F=0;F<3;F++)x(v,[[-4.45,.32,-2+F*.2],[-3,.35,-1.65+F*.22],[-1.55,.35,-1.4+F*.23],[1.2,.35,-1.3+F*.23],[3.2,.35,-1.65+F*.22],[4.5,.32,-2+F*.2]],.07);for(const F of[-1.55,1.2])m(v,1.65,.09,1.4,F,.25,-1.15,o,.07);m(R,13,.23,7.65,0,0,3.72,n,.16),m(R,12.58,.025,7.08,0,-.132,3.76,r,.09),m(R,12.12,.015,6.59,0,-.15,3.79,d,.045);const ne=new St;ne.position.set(0,-.164,3.79),R.add(ne);const de=(F,$,oe,be,Pe)=>m(ne,F,.009,$,oe,Pe===r?0:-.022,be,Pe,.025);de(11.9,.3,0,-3.03,r);for(let F=0;F<3;F++)de(.1,.1,-5.55+F*.2,-3.03,[l,u,p][F]);de(1.92,5.52,-4.79,.1,r);for(let F=0;F<10;F++)de(1.14+F%3*.15,.04,-4.8,-2.17+F*.42,F===2?l:s);const me=[];for(let F=0;F<65;F++){const $=-3.35+F*.14,oe=-1.75+Math.sin(F*.075)*.42;me.push($,-.012,oe-.12-Math.sin(F*.05)*.2,$,-.012,oe+.12+Math.sin(F*.05)*.2)}const Ae=new Et;Ae.setAttribute("position",new yt(me,3));const He=[];for(let F=0;F<64;F++)He.push(F*2,F*2+1,F*2+2,F*2+1,F*2+3,F*2+2);Ae.setIndex(He),Ae.attributes.position.setUsage(Vi);const Oe=new jt({color:"#6f7fff",side:Tn});ne.add(new gt(Ae,Oe)),de(5.75,2.18,-.45,.4,r),de(2.65,2.18,4,.4,r);const ve=[0,1].map(F=>{const $=new Et;$.setAttribute("position",new $t(new Float32Array(390),3).setUsage(Vi)),$.setIndex(He);const oe=new gt($,new jt({color:F?"#ffbd88":"#76e3f4",side:Tn}));return oe.name=`Live telemetry waveform ${F+1}`,oe.frustumCulled=!1,ne.add(oe),oe});for(let F=0;F<4;F++)de(5.15,.014,-.42,-.3+F*.46,s);const ue=new zn(new ci(.13,.009,1,2,.004),l,12);ue.name="Live screen activity chart",ue.instanceMatrix.setUsage(Vi),ue.frustumCulled=!1,ne.add(ue);for(let F=0;F<12;F++)ue.setColorAt(F,new it(F%3?"#adf6ff":"#a39aff"));const ge=new kt,Le=new Array(12);for(let F=0;F<3;F++)de(2.71,.73,-1.9+F*3.03,2.21,r),de(1.5,.035,-1.9+F*3.03,2.03,p),de(2.12,.065,-1.9+F*3.03,2.32,s);const U=new zn(new ci(1,.01,.069,2,.003),l,3);U.name="Live screen status meters",U.frustumCulled=!1,U.instanceMatrix.setUsage(Vi),ne.add(U);const k=[];M(R,.06,.024,0,-.155,7.27,r,16);for(const F of[-5.9,5.9])m(R,.16,.045,.16,F,-.15,.25,r,.03);const ie=[],Te=[],Ne=[],O=[];for(let F=0;F<4;F++){const $=new St;$.name=`Agent peer ${F+1}`,i.add($),m($,3.35,.15,2.1,0,0,0,n,.1),m($,2.9,.028,1,0,.09,-.24,r,.025),m($,1.05,.015,.43,0,.09,.62,r,.035),m($,2.9,.025,.03,0,.075,1.045,F%2?u:l,.006);const oe=new St;oe.position.set(0,.09,-.97),oe.rotation.x=-1.87,$.add(oe),m(oe,3.35,.08,2.1,0,0,1.02,n,.075),m(oe,3.08,.015,1.78,0,-.05,1.04,d,.04),m(oe,2.34,.009,.028,0,-.076,.43,l,.003);const be=new zn(new ci(.23,.01,1,2,.003),l,8);be.name=`Peer ${F+1} live activity bars`,be.frustumCulled=!1,be.instanceMatrix.setUsage(Vi),oe.add(be),O.push(be),ie.push($);const Pe=new Et,ke=[];Pe.setAttribute("position",new $t(new Float32Array(392*3),3).setUsage(Vi));for(let se=0;se<48;se++)for(let Re=0;Re<8;Re++){const De=se*8+Re,ae=se*8+(Re+1)%8,Ce=De+8,Fe=ae+8;ke.push(De,ae,Ce,ae,Fe,Ce)}Pe.setIndex(ke);const G=new gt(Pe,new jt({color:"#d57c45",transparent:!0,opacity:.82,depthWrite:!1,side:Tn}));G.name=`Curved peer route ${F+1}`,G.frustumCulled=!1,i.add(G),Te.push(G);const Se=new gt(new Ci(.115,12,8),new jt({color:"#fff2d4",transparent:!0,opacity:1,depthWrite:!1}));i.add(Se),Ne.push(Se)}const st=new Set;i.traverse(F=>{F.geometry&&st.add(F.geometry)});function Ye(F){for(const oe of F.children)oe.isGroup&&Ye(oe);if(F===i)return;const $=new Map;for(const oe of F.children)oe.isMesh&&!oe.isInstancedMesh&&($.has(oe.material)||$.set(oe.material,[]),$.get(oe.material).push(oe));for(const[oe,be]of $){if(be.length<2)continue;const Pe=be.map(Se=>{Se.updateMatrix();const se=Se.geometry.index?Se.geometry.toNonIndexed():Se.geometry.clone();se.applyMatrix4(Se.matrix);for(const Re of Object.keys(se.attributes))["position","normal","uv"].includes(Re)||se.deleteAttribute(Re);return se}),ke=zl(Pe,!1);if(Pe.forEach(Se=>Se.dispose()),!ke)continue;const G=new gt(ke,oe);G.castShadow=G.receiveShadow=!0,be.forEach(Se=>F.remove(Se)),F.add(G)}}Ye(i);const P=new Set;i.traverse(F=>{F.geometry&&P.add(F.geometry)}),st.forEach(F=>{P.has(F)||F.dispose()});const y=[[-12,4.1,-4.5],[12,4.1,-4.5],[-12,.1,6.8],[12,.1,6.8]],q=new Ed(new D,new D,new D,new D),ee=new D,pe=new D,ye=new D,Me=new D,re=new D(0,1,0);let _e;function Ie(F,$=0){const oe=Fx(F),be=Number.isFinite($)?$:0,Pe=Ws(oe,.09,.34),ke=Ws(oe,.4,1),G=.82*(1-Ws(oe,.005,.11)),Se=Ws(oe,.4,.79),se=Ws(oe,.49,.93),Re=Ws(oe,.64,1);S.position.set(5.9*Se,4.9*Se,1.05*Se),S.rotation.set(.1*Se,0,-1.18*Se),R.position.set(-1.15*se,.15+3.6*Se,-3.65+.1*se),R.rotation.x=-1.82-.04*se,E.position.set(-1.15*se,1.5*se,-.15*se),E.rotation.x=.12*se,v.position.set(-1.3*se,3.65*se,-.5*se),v.rotation.x=.18*se,v.scale.y=.25+.75*se,C.position.set(-1.15*se,2.5*se,1.6*Re),C.rotation.x=.12*se,I.position.set(-1.35*se,2.25*se,1.6*Re),I.rotation.x=.13*se,T.position.set(-.8*Re,-.7*Re,.7*Re),T.rotation.x=.1*Re,B.position.set(0,.85*Se,0),j.forEach((ae,Ce)=>{ae.rotation.y=be*(Ce?-.72:.72)}),l.color.setHSL(.56+.018*Math.sin(be*.18),.86,.65);for(let ae=0;ae<12;ae++){const Ce=(.36+ae*.073)*(1+.34*Math.sin(be*.72+ae*.47));Le[ae]=Ce,ge.position.set(2.95+ae*.19,-.024,1.32-Ce/2),ge.scale.set(1,1,Ce),ge.updateMatrix(),ue.setMatrixAt(ae,ge.matrix)}ue.instanceMatrix.needsUpdate=!0,ve.forEach((ae,Ce)=>{const Fe=ae.geometry.attributes.position;for(let ut=0;ut<65;ut++){const te=-3+ut*5.17/64,we=.25+Ce*.4+Math.sin(ut*.15-be*(.84+Ce*.16)+Ce)*.3+Math.sin(ut*.37-be*.44)*.13;Fe.setXYZ(ut*2,te,-.047-Ce*.004,we-.021),Fe.setXYZ(ut*2+1,te,-.047-Ce*.004,we+.021)}Fe.needsUpdate=!0});for(let ae=0;ae<3;ae++){const Ce=1.05+.71*Math.sin(be*.61+ae*1.7);k[ae]=Ce,ge.position.set(-2.96+ae*3.03+Ce/2,-.045,2.32),ge.scale.set(Ce,1,1),ge.updateMatrix(),U.setMatrixAt(ae,ge.matrix)}U.instanceMatrix.needsUpdate=!0;const De=Ae.attributes.position;for(let ae=0;ae<65;ae++){const Ce=-3.35+ae*.14,Fe=-1.75+Math.sin(ae*.075-be*.43)*.36,ut=.13+(Math.sin(ae*.05+be*.17)+1)*.065;De.setXYZ(ae*2,Ce,-.025,Fe-ut),De.setXYZ(ae*2+1,Ce,-.025,Fe+ut)}De.needsUpdate=!0,ie.forEach((ae,Ce)=>{const Fe=y[Ce],ut=Math.sign(Fe[0]),te=Ce<2;ae.position.set(Fe[0],Fe[1]+Math.sin(be*.28+Ce)*.22,Fe[2]),ae.rotation.y=-ut*.18+Math.sin(be*.14+Ce)*.025,ae.scale.setScalar((1-Pe)*1.35),ae.visible=Pe<.999,Te[Ce].visible=Ne[Ce].visible=G>1e-4&&ae.visible,Te[Ce].material.opacity=G,Ne[Ce].material.opacity=G/.82,q.v0.set(ut*5.95,.1,te?-2.3:2.7),q.v1.set(ut*8.7,1,te?-5.4:6.7),q.v2.set(ae.position.x-ut*2.4,ae.position.y+.9,ae.position.z+(te?-1.15:1.25)),q.v3.set(ae.position.x-ut*1.65*ae.scale.x,ae.position.y+.12,ae.position.z+.3);const we=Te[Ce].geometry.attributes.position;for(let We=0;We<49;We++){q.getPoint(We/48,ee),q.getTangent(We/48,pe),ye.crossVectors(pe,re).normalize(),Me.crossVectors(pe,ye).normalize();for(let Ve=0;Ve<8;Ve++){const je=Ve/8*Math.PI*2,at=Math.cos(je)*.065,pt=Math.sin(je)*.065;we.setXYZ(We*8+Ve,ee.x+ye.x*at+Me.x*pt,ee.y+ye.y*at+Me.y*pt,ee.z+ye.z*at+Me.z*pt)}}we.needsUpdate=!0;const Ue=((be*.1+Ce*.23)%1+1)%1;q.getPoint(Ue,Ne[Ce].position);for(let We=0;We<8;We++){const Ve=.35+.19*Math.sin(be*.82+We*.6+Ce)+We*.055;ge.position.set(-1+We*.285,-.085,1.65-Ve/2),ge.scale.set(1,1,Ve),ge.updateMatrix(),O[Ce].setMatrixAt(We,ge.matrix)}O[Ce].instanceMatrix.needsUpdate=!0}),_e={progress:oe,explode:ke,focus:Pe,hue:l.color.getHexString(),peers:ie.filter(ae=>ae.visible).length,connectorOpacity:G,connectorsVisible:Te.some(ae=>ae.visible),connectorRadius:.065,connectorColor:"d57c45",screen:{time:be,chartHeights:[...Le],meterWidths:[...k],waveformSamples:ve.map(ae=>ae.geometry.attributes.position.getZ(32)),animatedCharts:10,ribbonLeadingZ:De.getZ(0),artworkGap:.013}}}return Ie(0),{group:i,update:Ie,get state(){return _e},dispose(){Ox(i)}}}const Vt=Math.PI*2,Bh=22,kx=76,Ba=(i,e=0,t=1)=>Math.min(t,Math.max(e,i));function Ca(i,e,t){const n=Ba((t-i)/(e-i));return n*n*(3-2*n)}function kh(i,e,t){return i<=e||i>=t?0:7*Math.sin(Math.PI*(i-e)/(t-e))**2}function zh(i){i=Ba(Number.isFinite(i)?i:0);const e=Ba((i-.78)/.1),t=i<.78?i:.78+.05*(2*e-e*e),n=Math.PI*.34+t*Vt*24,s=(n%(2*Vt)+2*Vt)%(2*Vt),r=Bh*Math.sin(n),a=Bh*Math.cos(n),o=a+Math.sqrt(kx**2-r**2),c=1+.15*Math.sin(i*Math.PI*4)*(1-Ca(.78,.96,i)),l=31,u=21/(c*c),p=Math.sqrt(l**2-u**2),d=83-2*u,h=-Math.asin((d-37)/25),m=30-15*Math.sin(h),_=37+15*Math.cos(h),g=52-m,f=79-_,M=Math.hypot(g,f),b=Math.acos(Ba((M*M+100-31.5**2)/(20*M),-1,1))-Math.atan2(g,f);return{t:i,theta:n,phase:s,crankX:r,crankY:a,pistonY:o,camAngle:n/2,intake:kh(s,0,Math.PI),exhaust:kh(s,3*Math.PI,4*Math.PI),stroke:["INTAKE","COMPRESSION","POWER","EXHAUST"][Math.floor(s/Math.PI)],speed:c,governorRadius:p,governorHeight:u,sleeveY:d,bellAngle:h,feedbackX:m,feedbackY:_,throttleAngle:b,throttle:1.3-b,covers:Ca(.12,.43,i),cylinder:Ca(.3,.6,i),isolate:Ca(.68,1,i)}}const zx=new D(0,1,0),mt=(i,e,t)=>new D(i,e,t);function Gh(i){const t=new Uint8Array(262144);let n=7103;const s=()=>(n=Math.imul(n,1664525)+1013904223>>>0,n/4294967296),r=Array.from({length:256},()=>s());for(let o=0;o<256;o++)for(let c=0;c<256;c++){const l=(o*256+c)*4,u=i==="metal"?150+r[o]*45+s()*17:175+s()*46;t[l]=t[l+1]=t[l+2]=u,t[l+3]=255}const a=new ys(t,256,256);return a.needsUpdate=!0,a.generateMipmaps=!0,a.minFilter=qi,a.magFilter=cn,a.wrapS=a.wrapT=Qi,a.repeat.set(i==="metal"?2:5,i==="metal"?2:5),a.anisotropy=16,a}function ri(i,e,t){const n=new an,s=-i/2,r=-e/2;return n.moveTo(s+t,r),n.lineTo(s+i-t,r),n.quadraticCurveTo(s+i,r,s+i,r+t),n.lineTo(s+i,r+e-t),n.quadraticCurveTo(s+i,r+e,s+i-t,r+e),n.lineTo(s+t,r+e),n.quadraticCurveTo(s,r+e,s,r+e-t),n.lineTo(s,r+t),n.quadraticCurveTo(s,r,s+t,r),n}function kn(i,e,t,n){const s=new mn;s.absarc(e,t,n,0,Vt,!0),i.holes.push(s)}function Gx(i,e){const t=new an;return t.absarc(0,0,i,0,Vt),e&&kn(t,0,0,e),t}function bn(i,e,t=.45){const n=new Wn(i,{depth:e,steps:1,bevelEnabled:t>0,bevelSegments:4,bevelSize:t,bevelThickness:t,curveSegments:24});return n.translate(0,0,-e/2),n}function Hx(i,e=1.6){const t=i*e/2,n=t*Math.cos(Math.PI/9),s=t-1.25*e,r=t+e,a=u=>{const p=Math.acos(Math.min(1,n/u));return Math.tan(p)-p},o=Math.PI/(2*i),c=a(t),l=[];for(let u=0;u<i;u++){const p=u*Vt/i,d=(h,m)=>l.push(new Ee(h*Math.cos(m),h*Math.sin(m)));d(s,p-Math.PI/i),d(s,p-o-c);for(let h=0;h<=8;h++){const m=Math.max(n,s)+(r-Math.max(n,s))*h/8;d(m,p-o-c+a(m))}for(let h=8;h>=0;h--){const m=Math.max(n,s)+(r-Math.max(n,s))*h/8;d(m,p+o+c-a(m))}d(s,p+o+c),d(s,p+Math.PI/i)}return new an(l)}function Vx(){const i=new St;i.name="AG–01 / governed four-stroke";const e=Gh("metal"),t=Gh("polymer"),n={aluminum:new Nn({color:7634304,metalness:.93,roughness:.36,roughnessMap:e,bumpMap:e,bumpScale:.035,anisotropy:.65,anisotropyRotation:Math.PI/2,clearcoat:.15,clearcoatRoughness:.5}),edge:new Nn({color:11910591,metalness:.94,roughness:.28,roughnessMap:e,anisotropy:.5}),steel:new Nn({color:3423295,metalness:.96,roughness:.31,roughnessMap:e,anisotropy:.35,clearcoat:.25}),black:new Nn({color:1448733,metalness:.18,roughness:.57,roughnessMap:t,bumpMap:t,bumpScale:.06,clearcoat:.12,clearcoatRoughness:.55}),graphite:new Nn({color:5266528,metalness:.35,roughness:.54,roughnessMap:t,bumpMap:t,bumpScale:.025,clearcoat:.18,clearcoatRoughness:.45}),rubber:new Tt({color:725008,roughness:.72,roughnessMap:t}),accent:new Nn({color:10214588,metalness:.55,roughness:.3,roughnessMap:e,clearcoat:.35}),dark:new Tt({color:395787,metalness:.5,roughness:.48})},{aluminum:s,edge:r,steel:a,black:o,graphite:c,rubber:l,accent:u}=n,p=new Set,d=new Set([e,t]),h=(te,we,Ue,We=0,Ve=0,je=0)=>{p.add(te);const at=new gt(te,we);return at.position.set(We,Ve,je),at.castShadow=!0,at.receiveShadow=!0,Ue.add(at),at},m=(te,we,Ue=0,We=0,Ve=0)=>{const je=new St;return je.name=we,je.position.set(Ue,We,Ve),te.add(je),je},_=(te,we,Ue,We,Ve,je=0,at=0,pt=0,ot=3,vt=[])=>{const Ke=ri(we,Ue,ot);for(const[Qt,Bt,Kt]of vt)kn(Ke,Qt,Bt,Kt);return h(bn(Ke,We,.5),Ve,te,je,at,pt)},g=(te,we,Ue,We,Ve=0,je=0,at=0,pt=0)=>h(bn(Gx(we,pt),Ue,.3),We,te,Ve,je,at),f=(te,we,Ue,We,Ve=0,je=0,at=0)=>{const pt=Math.min(.35,we*.12,Ue*.12),ot=[new Ee(0,-Ue/2),new Ee(we-pt,-Ue/2)];for(let vt=0;vt<=6;vt++){const Ke=vt/6*Math.PI/2;ot.push(new Ee(we-pt+pt*Math.sin(Ke),-Ue/2+pt-pt*Math.cos(Ke)))}ot.push(new Ee(we,Ue/2-pt));for(let vt=0;vt<=6;vt++){const Ke=vt/6*Math.PI/2;ot.push(new Ee(we-pt+pt*Math.cos(Ke),Ue/2-pt+pt*Math.sin(Ke)))}return ot.push(new Ee(0,Ue/2)),h(new lo(ot,64),We,te,Ve,je,at)},M=(te,we,Ue,We,Ve=a)=>{const je=f(te,We,1,Ve);return b(je,we,Ue),je};function b(te,we,Ue){const We=Ue.clone().sub(we);te.position.copy(we).add(Ue).multiplyScalar(.5),te.quaternion.setFromUnitVectors(zx,We.clone().normalize()),te.scale.y=We.length()}const x=(te,we,Ue,We,Ve=0,je=0,at=0)=>h(new Ms(we,Ue,10,80),We,te,Ve,je,at);function w(te,we,Ue,We,Ve=2){g(te,Ve*1.42,.5,a,we,Ue,We);const je=new an;for(let ot=0;ot<=6;ot++){const vt=ot/6*Vt;ot?je.lineTo(Ve*Math.cos(vt),Ve*Math.sin(vt)):je.moveTo(Ve,0)}const at=new mn;for(let ot=0;ot<=6;ot++){const vt=-ot/6*Vt;ot?at.lineTo(Ve*.48*Math.cos(vt),Ve*.48*Math.sin(vt)):at.moveTo(Ve*.48,0)}return je.holes.push(at),h(bn(je,1.7,.14),r,te,we,Ue,We+1.1)}function S(te,we,Ue,We,Ve,je,at,pt="#bbc1bf"){const ot=document.createElement("canvas");ot.width=1024,ot.height=128;const vt=ot.getContext("2d");vt.fillStyle=pt,vt.font="38px monospace",vt.textAlign="center",vt.textBaseline="middle",vt.fillText(we,512,64);const Ke=new Ja(ot);Ke.colorSpace=pn,d.add(Ke);const Qt=new jt({map:Ke,transparent:!0,depthWrite:!1});return n["label"+Object.keys(n).length]=Qt,h(new Xn(Ue,We),Qt,te,Ve,je,at)}const E=m(i,"Engine / working core"),v=m(i,"Centrifugal governor + throttle feedback",96,0,12),T=m(E,"Mounting bed"),R=_(T,126,65,7,o,18,-46,0,7,[[-50,-22,3],[50,-22,3],[-50,22,3],[50,22,3]]);R.rotation.x=-Math.PI/2;for(const te of[-31,67])for(const we of[-22,22]){f(T,5,4,l,te,-52,we);const Ue=m(T,"Captured bed fastener",te,-41,we);Ue.rotation.x=-Math.PI/2,w(Ue,0,0,0,2.3)}for(const te of[-19,19])_(T,87,9,6,s,3,-38,te,2);const C=[];for(const te of[-1,1]){const we=m(E,te>0?"Front crankcase service cover":"Rear crankcase service cover",0,0,te*22),Ue=ri(79,76,18);kn(Ue,0,0,12);for(const at of[-28,28])for(const pt of[-25,25])kn(Ue,at,pt,2.4);h(bn(Ue,5,1.1),s,we);const We=ri(78,75,18),Ve=ri(71,68,16);We.holes.push(new mn(Ve.getPoints(96).reverse())),h(bn(We,2,.3),r,we,0,0,te*3.3);const je=ri(65,61,13);kn(je,0,0,14),h(bn(je,1.6,.7),c,we,0,0,te*4.5),g(we,16,2,a,0,0,te*6,10),x(we,12.7,.55,r,0,0,te*7.2);for(const at of[-28,28])for(const pt of[-25,25]){const ot=m(we,"Recessed cover screw",at,pt,te*4);te<0&&(ot.rotation.y=Math.PI),w(ot,0,0,0,2)}for(let at=0;at<5;at++)_(we,18,1.1,.4,a,0,-20+at*2,te*5.5,.4);te>0&&S(we,"ASTRA   /   AG–01",35,4,0,24,6.4),C.push(we)}const I=m(E,"Internal crankshaft bearing bulkheads");for(const te of[-14,14]){const we=ri(65,66,16);kn(we,0,0,26),h(bn(we,3,.7),a,I,0,0,te);for(const Ue of[-25,25])M(I,mt(Ue,-22,-14),mt(Ue,-22,14),2.2,r)}const B=m(E,"Crankshaft"),X=f(B,7,103,a);X.rotation.x=Math.PI/2;for(const te of[-9,9]){const we=new an;we.absarc(0,-4,22,0,Vt),kn(we,0,13,7),h(bn(we,6,1),a,B,0,0,te),g(B,7,1,r,0,22,te>0?13:-13,3.5)}const H=f(B,5.3,24,r,0,22,0);H.rotation.x=Math.PI/2;const J=m(B,"Flywheel",0,0,-48);g(J,43,9,a,0,0,0,32),x(J,41.8,.7,r,0,0,5),x(J,33,.45,r,0,0,5),g(J,12,15,s,0,0,0,7);for(let te=0;te<6;te++){const we=m(J,"Flywheel spoke");we.rotation.z=te*Vt/6,_(we,8,26,6,s,0,23,0,3),w(J,9*Math.cos(te*Vt/6),9*Math.sin(te*Vt/6),8,1.2)}for(let te=0;te<60;te++){const we=te*Vt/60,Ue=_(J,.4,te%5?1.4:2.7,.25,r,39*Math.sin(we),39*Math.cos(we),5,.12);Ue.rotation.z=-we}const z=m(E,"Connecting rod"),L=new an;L.moveTo(-5,0),L.lineTo(-3.2,76),L.quadraticCurveTo(0,80,3.2,76),L.lineTo(5,0),L.closePath();const V=new mn;V.moveTo(-1.4,15),V.lineTo(-1.4,60),V.quadraticCurveTo(0,63,1.4,60),V.lineTo(1.4,15),V.closePath(),L.holes.push(V),h(bn(L,4,.6),s,z),g(z,9,6,s,0,0,0,5.4),g(z,6,7,r,0,76,0,3);for(const te of[-7,7])w(z,te,-3,4,1.3);const K=m(E,"Piston");f(K,21.5,20,s,0,0,0);for(const te of[4.9,7.2,9.2]){const we=x(K,21.6,.43,a,0,te,0);we.rotation.x=Math.PI/2}const Z=f(K,3,46,a,0,-2,0);Z.rotation.x=Math.PI/2;for(const te of[-22,22])g(K,4,.4,a,0,-2,te,2.5);f(K,18,.25,r,0,10.1,0);const N=[];for(const te of[-1,1]){const we=m(E,"Sectioned finned cylinder",0,0,0),Ue=(Ve,je)=>{const at=new an,pt=te>0?0:Math.PI;return at.absarc(0,0,Ve,pt+.025,pt+Math.PI-.025,!1),at.absarc(0,0,je,pt+Math.PI-.025,pt+.025,!0),at.closePath(),at},We=h(bn(Ue(25,22.2),70,.25),a,we,0,79,0);We.rotation.x=-Math.PI/2;for(let Ve=0;Ve<12;Ve++){const je=h(bn(Ue(Ve===0||Ve===11?30:32,24.5),2.2,.55),s,we,0,46+Ve*6,0);je.rotation.x=-Math.PI/2}for(const Ve of[-27,27])_(we,5,72,5,a,Ve,79,te*9,1.2);N.push(we)}const Q=new Set(E.children);for(const te of[-27,27])for(const we of[-18,18]){M(E,mt(te,41,we),mt(te,120,we),1.7,a);const Ue=m(E,"Cylinder stud nut",te,121,we);Ue.rotation.x=-Math.PI/2,w(Ue,0,0,0,2.2)}const xe=m(E,"Cylinder head",0,120,0);for(let te=0;te<3;te++){const we=_(xe,64,55,2.6,s,0,te*4,0,9,[[0,0,22.2],[-27,-18,2],[27,-18,2],[-27,18,2],[27,18,2]]);we.rotation.x=-Math.PI/2}const ce=m(E,"Obsidian rocker cover",0,153,0),W=_(ce,65,43,8,o,0,0,0,10);W.rotation.x=-Math.PI/2;const j=_(ce,66,44,1,r,0,-4,0,10,[[0,0,10]]);j.rotation.x=-Math.PI/2;const ne=S(ce,"AG–01  /  OHV",37,5,0,4.7,0);ne.rotation.x=-Math.PI/2;for(const te of[-25,25]){const we=m(ce,"Rocker cover screw",te,4.5,0);we.rotation.x=-Math.PI/2,w(we,0,0,0,2)}const de=m(E,"Spark plug",1,132,-14);de.rotation.x=-.32,f(de,2.6,14,r);for(let te=0;te<5;te++)f(de,3,1.2,s,0,2+te*1.7,0);f(de,1.2,5,a,0,13,0);const me=E.children.filter(te=>!Q.has(te)),Ae=[];for(const[te,we]of[[0,20],[48,40],[96,20]]){const Ue=m(te===96?v:E,we===40?"40T cam gear":"20T drive gear",te===96?0:te,0,te===96?23:35),We=Hx(we);if(kn(We,0,0,5.3),we===40)for(let Ve=0;Ve<6;Ve++){const je=Ve*Vt/6;kn(We,20*Math.cos(je),20*Math.sin(je),6.3)}else for(let Ve=0;Ve<3;Ve++){const je=Ve*Vt/3;kn(We,10*Math.cos(je),10*Math.sin(je),2.2)}h(bn(We,5,.18),s,Ue),g(Ue,8,7,a,0,0,0,3),w(Ue,0,0,4,2.7),Ae.push(Ue)}const He=m(E,"Timing drive guard",47,0,44),Oe=ri(129,78,21);kn(Oe,-47,0,11),kn(Oe,49,0,11);for(const te of[-18,-6,6,18]){const Ue=ri(5,37,2.4).getPoints(48).map(We=>new Ee(We.x+te,We.y));Oe.holes.push(new mn(Ue.reverse()))}h(bn(Oe,2.5,.8),c,He);const ve=ri(129,78,21);ve.holes.push(new mn(ri(125,74,19).getPoints(96).reverse())),h(bn(ve,.65,.2),r,He,0,0,2.05);for(const te of[-51,51])for(const we of[-25,25])w(He,te,we,2.3,2);S(He,"TIMING  /  2:1",35,4,0,-27,2.7);const ue=new Set(E.children),ge=[],Le=[],U=[],k=[],ie=[],Te=f(E,4,48,a,48,0,9);Te.rotation.x=Math.PI/2;for(let te=0;te<2;te++){const we=te?10:-10,Ue=te?-8:7,We=te?32:25,Ve=We-we,je=48-We,at=m(E,te?"Exhaust cam":"Intake cam",48,0,Ue),pt=[];for(let Bt=0;Bt<=256;Bt++){const Kt=Bt/256*Vt,_n=(-2*(Kt-Math.PI/2)%(2*Vt)+2*Vt)%(2*Vt),yn=te?3*Math.PI:0,xi=te?4*Math.PI:Math.PI,ts=8+(_n>yn&&_n<xi?7*Math.sin(Math.PI*(_n-yn)/(xi-yn))**2:0)*je/Ve;pt.push(new Ee(ts*Math.cos(Kt),ts*Math.sin(Kt)))}h(bn(new an(pt),5,.4),a,at),ge.push(at),M(E,mt(We,142,Ue-5),mt(We,142,Ue+5),3,a);const ot=m(E,"Rocker arm",We,142,Ue);_(ot,Ve+je+7,5,5,s,(je-Ve)/2,0,0,2.4,[[-(je-Ve)/2,0,2]]),g(ot,4.5,6,r,0,0,0,2.3),w(ot,0,0,4,1.7),Le.push({group:ot,arm:Ve,pushArm:je,vx:we,pivotX:We,z:Ue});const vt=m(E,te?"Exhaust valve":"Intake valve",we,0,Ue);f(vt,1.5,28,r,0,128,0),f(vt,6.3,1.8,a,0,114,0),f(vt,4.3,1.4,r,0,137,0),k.push(vt);const Ke=[];for(let Bt=0;Bt<=200;Bt++){const Kt=Bt/200*Vt*8;Ke.push(mt(Math.cos(Kt)*3.5,Bt/200,Math.sin(Kt)*3.5))}const Qt=h(new Hr(new Qa(Ke),160,.53,6,!1),a,E,we,121,Ue);ie.push(Qt),U.push(M(E,mt(48,8,Ue),mt(48,142,Ue),1.35,r)),_(E,17,8,8,a,46,78,Ue,2,[[2,0,2]])}const Ne=E.children.filter(te=>!ue.has(te));_(v,31,38,5,o,0,-23,0,6,[[0,0,7]]);const O=_(v,44,35,5,s,0,-45,0,4,[[-15,-10,2],[15,-10,2],[-15,10,2],[15,10,2]]);O.rotation.x=-Math.PI/2;for(const te of[12,26])f(v,6,6,a,0,te,0);f(v,3,99,r,0,46,0);const st=f(v,4,27,a,0,0,10);st.rotation.x=Math.PI/2;function Ye(te){const we=m(te,"1:1 miter gear");h(new Pt(5,11,6,64),a,we);for(let Ue=0;Ue<20;Ue++){const We=Ue*Vt/20,Ve=_(we,2,6,2,r,8*Math.sin(We),0,8*Math.cos(We),.45);Ve.rotation.y=We,Ve.rotation.x=.6}return we}const P=Ye(v);P.position.set(0,0,7),P.rotation.x=Math.PI/2;const y=Ye(v);y.position.y=7;const q=m(v,"Governor flyweight rotor");f(q,5.3,6,a,0,83,0),_(q,14,5,5,s,0,83,0,2),f(q,4,4,r,0,88,0);const ee=[],pe=[];for(const te of[-1,1]){const we=h(new Ci(7,40,28),a,q);ee.push(we);const Ue=M(q,mt(0,83,0),mt(te*21,60,0),1.9,r),We=M(q,mt(te*21,60,0),mt(0,37,0),1.5,s);pe.push({upper:Ue,lower:We,side:te});const Ve=g(q,3,4,r,te*21,60,0,1);we.userData.pin=Ve}const ye=m(v,"Sliding collar and thrust bearing");f(ye,6,8,s);for(const te of[-3.5,3.5]){const we=x(ye,6,.6,r,0,te,0);we.rotation.x=Math.PI/2}f(ye,7.2,2,a,0,-1,0);const Me=m(v,"Stationary collar fork");for(const te of[-7,7])_(Me,17,2.5,2,a,5,0,te,1);M(Me,mt(13,0,-7),mt(13,0,7),1.5,r);const re=m(v,"Feedback bellcrank",30,37,8);_(re,30,3.3,3,u,-10,0,0,1.5),_(re,3.3,18,3,u,0,7,0,1.5),g(re,3.6,5,a,0,0,0,1.5),w(re,0,0,3,1.5),M(v,mt(30,18,8),mt(30,37,8),2,a),M(re,mt(0,15,0),mt(0,15,10),1.2,r);const _e=M(v,mt(21,44,8),mt(37,67,8),1.35,u),Ie=m(v,"Throttle / butterfly body",52,79,8),F=g(Ie,11,15,s,0,0,0,8.4);F.rotation.y=Math.PI/2;const $=x(Ie,10.5,.5,r,8,0,0);$.rotation.y=Math.PI/2;const oe=m(Ie,"Throttle butterfly"),be=g(oe,8,1,a);be.rotation.y=Math.PI/2,M(oe,mt(0,0,-10),mt(0,0,10),1.1,r);const Pe=m(Ie,"Throttle actuating lever",0,0,10);_(Pe,3,13,2,u,0,-5,0,1.4),w(Pe,0,0,2,1.4);const ke=[mt(140,79,20),mt(130,100,-13),mt(96,115,-23),mt(36,117,-23),mt(23,116,-10)];h(new Hr(new Qa(ke),100,6,32,!1),o,E);for(const te of[39,94]){const we=x(v,3.2,.7,a,0,te,0);we.rotation.x=Math.PI/2}S(v,"ω  /  FEEDBACK",25,3.3,0,-31,3);const G=[...E.children],Se=new Set([K,z,...N,...me,...Ne]),se=new Set([B,I,Ae[0],Ae[1]]),Re=m(E,"Cylinder / piston / valve train assembly"),De=m(E,"Crankshaft / flywheel / timing assembly"),ae=m(E,"Housing / service covers / mounting bed assembly");for(const te of G)(Se.has(te)?Re:se.has(te)?De:ae).add(te);const Ce=[...C,He,ce,xe,...N,T].map((te,we)=>({part:te,i:we,rotation:te.rotation.clone()}));function Fe(te,we=null,Ue=0,We={}){Ue=Number.isFinite(Ue)?Ue:0;const Ve=Dt=>Qe.clamp(Number.isFinite(Dt)?Dt:0,0,1),je=(Dt,un=0,A=1)=>{const Y=Ve((Dt-un)/(A-un));return Y*Y*(3-2*Y)},at=Ve(We.openFront),pt=Ve(We.componentRow),ot=je(pt),vt=zh(te),Ke=we===null?vt:{...zh(we),covers:vt.covers,cylinder:vt.cylinder,isolate:vt.isolate,t:vt.t},{theta:Qt}=Ke,Bt=Qe.lerp(Ke.covers,.15,ot),Kt=Qe.lerp(Ke.cylinder,.18,ot),_n=We.retainEngine?0:Ke.isolate*(1-ot);B.rotation.z=-Qt,Ae[0].rotation.z=-Qt,Ae[1].rotation.z=Qt/2+Math.PI/40,Ae[2].rotation.z=-Qt,K.position.y=Ke.pistonY+2,z.position.set(Ke.crankX,Ke.crankY,0),z.rotation.z=Math.atan2(Ke.crankX,Ke.pistonY-Ke.crankY);for(let Dt=0;Dt<2;Dt++){const un=Dt?Ke.exhaust:Ke.intake,A=Le[Dt];ge[Dt].rotation.z=Qt/2;const Y=Math.asin(un/A.arm);A.group.rotation.z=Y,k[Dt].position.x=A.pivotX-A.arm*Math.cos(Y),k[Dt].position.y=-un,ie[Dt].scale.y=16-un;const fe=mt(A.pivotX+A.pushArm*Math.cos(Y),142+A.pushArm*Math.sin(Y),A.z);b(U[Dt],mt(fe.x,8+un*A.pushArm/A.arm,A.z),fe)}C[0].position.set(-16*Bt,0,-22-42*Bt),C[1].position.set(-22*Bt,-4*Bt,22+55*Bt),He.position.set(47+21*Bt,0,44+69*Bt),ce.position.y=153+50*Bt,xe.position.y=120+37*Kt,N[0].position.set(-39*Kt,5*Kt,-22*Kt),N[1].position.set(-49*Kt,5*Kt,40*Kt),T.position.y=-22*Kt,E.position.x=-1200*_n,E.visible=_n<.999,E.position.y=-24*_n,v.position.set(96-40*_n,12*_n,12+16*_n);const yn=Ve(We.spread)*(1-ot);v.position.x+=90*yn,C[0].position.x-=70*yn,C[1].position.x+=35*yn,He.position.z+=70*yn,ce.position.y+=55*yn,xe.position.y+=25*yn,N[0].position.x-=55*yn,N[1].position.z+=60*yn,q.rotation.y=Qt,P.rotation.z=-Qt,y.rotation.y=Qt,ee.forEach((Dt,un)=>{const A=un?1:-1;Dt.position.set(A*Ke.governorRadius,83-Ke.governorHeight,0),Dt.userData.pin.position.copy(Dt.position),Dt.userData.pin.position.z=7}),pe.forEach(({upper:Dt,lower:un,side:A})=>{const Y=mt(A*Ke.governorRadius,83-Ke.governorHeight,0);b(Dt,mt(0,83,0),Y),b(un,Y,mt(0,Ke.sleeveY,0))}),ye.position.y=Ke.sleeveY,Me.position.y=Ke.sleeveY;const xi=Ke.bellAngle;re.rotation.z=xi,oe.rotation.z=-Ke.throttle,Pe.rotation.z=Ke.throttleAngle;const hr=mt(Ke.feedbackX,Ke.feedbackY,18),ts=mt(52+10*Math.sin(Ke.throttleAngle),79-10*Math.cos(Ke.throttleAngle),18);b(_e,hr,ts);for(const{part:Dt,i:un,rotation:A}of Ce)Dt.rotation.copy(A),Dt.position.y+=Math.sin(Ue*.55+un*1.4)*Bt*.7,Dt.rotation.z+=Math.sin(Ue*.38+un*1.9)*Bt*.003;const Yr=je(at,0,.7),$r=je(at,.2,1);return C[1].position.x-=84*Yr,C[1].rotation.y-=Math.PI/2*$r,He.position.x+=96*Yr,He.rotation.y+=Math.PI/2*$r,Re.position.set(-65*ot,-55*ot,8*ot),De.position.set(70*ot,32*ot,0),v.position.lerp(mt(195,-3,8),ot),ae.position.set(-215*ot,20*ot,0),ae.visible=!0,Ke.openFront=at,Ke.componentRow=pt,Ke.accessoriesVisible=ae.visible,Ke.frontPlatePositions=[C[1].position.toArray(),He.position.toArray()],Ke.frontPlateAngles=[C[1].rotation.y,He.rotation.y],Ke.componentPositions=[ae.position.toArray(),Re.position.toArray(),De.position.toArray(),v.position.toArray()],i.userData.state=Ke,Ke}Fe(0);function ut(){for(const te of p)te.dispose();for(const te of Object.values(n))te.dispose();for(const te of d)te.dispose();i.removeFromParent()}return{group:i,update:Fe,dispose:ut}}const Wx=i=>Qe.clamp(Number.isFinite(i)?i:0,0,1),Tr=(i,e,t)=>Qe.smootherstep(i,e,t);function Ys(i,e,t){const n=new an,s=-i/2,r=-e/2;return n.moveTo(s+t,r),n.lineTo(s+i-t,r),n.quadraticCurveTo(s+i,r,s+i,r+t),n.lineTo(s+i,r+e-t),n.quadraticCurveTo(s+i,r+e,s+i-t,r+e),n.lineTo(s+t,r+e),n.quadraticCurveTo(s,r+e,s,r+e-t),n.lineTo(s,r+t),n.quadraticCurveTo(s,r,s+t,r),n}function Xs(i,e,t,n,s=0,r=0){const a=Ys(e,t,n).getPoints(6),o=new mn(a.reverse().map(c=>new Ee(c.x+s,c.y+r)));i.holes.push(o)}function Xx(i,e,t,n){const s=new mn;s.absarc(e,t,n,0,Math.PI*2,!0),i.holes.push(s)}function qs(i,e,t=.008){const n=Math.min(t,e/4),s=e-n*2,r=new Wn(i,{depth:s,bevelEnabled:n>0,bevelSize:n,bevelThickness:n,bevelSegments:2,curveSegments:10,steps:1});return r.translate(0,0,-s/2),r}function qx(){const e=new Uint8Array(16384);let t=73;for(let s=0;s<64;s++){t=Math.imul(t,1664525)+1013904223>>>0;for(let r=0;r<64;r++){const a=205+t%37,o=(s*64+r)*4;e[o]=e[o+1]=e[o+2]=a,e[o+3]=255}}const n=new ys(e,64,64);return n.wrapS=n.wrapT=Qi,n.repeat.set(2,5),n.needsUpdate=!0,n}function Yx(){const i=new St;i.name="Coordinated autonomous compute swarm";const e=qx(),t=new Tt({color:"#a9b9bf",metalness:.86,roughness:.39,roughnessMap:e,bumpMap:e,bumpScale:35e-5,envMapIntensity:.7}),n=new Tt({color:"#425e70",metalness:.8,roughness:.38,envMapIntensity:.75}),s=new Tt({color:"#182634",metalness:0,roughness:.5}),r=new Tt({color:"#185a64",metalness:.2,roughness:.45}),a=new Tt({color:"#d6a269",metalness:.85,roughness:.33}),o=new Tt({color:"#142c42",metalness:.25,roughness:.15}),c=new Tt({color:"#88e6ee",emissive:"#2fc4e1",emissiveIntensity:.65,roughness:.35}),l=new Tt({color:"#ffb267",emissive:"#f07535",emissiveIntensity:.45,roughness:.4}),u=[t,n,s,r,a,o,c,l],p=new Set,d=(L,V,K,Z=.015)=>new ci(L,V,K,2,Z);function h(L,V){const K=new St;K.name=L,V.add(K);const Z=new Map;return{group:K,add(N,Q,xe=0,ce=0,W=0,j=0,ne=0,de=0){N.applyMatrix4(new Rt().compose(new D(xe,ce,W),new ji().setFromEuler(new gi(j,ne,de)),new D(1,1,1)));const me=Z.get(Q)||[];me.push(N.index?N.toNonIndexed():N),N.index&&N.dispose(),Z.set(Q,me)},finish(){for(const[N,Q]of Z){const xe=zl(Q);Q.forEach(W=>W.dispose()),p.add(xe);const ce=new gt(xe,N);ce.name=`${L} — ${u.indexOf(N)}`,ce.castShadow=!0,ce.receiveShadow=!0,K.add(ce)}return K}}}const m=h("Docking backplane with nine recessed contact sockets",i),_=Ys(4.05,3.18,.19);for(let L=-1;L<=1;L++)for(let V=-1;V<=1;V++)Xs(_,.85,.45,.07,V*1.3,L*.94);m.add(qs(_,.14,.015),n,0,0,-.7);for(const L of[-1.93,1.93])m.add(d(.1,2.9,.17),t,L,0,-.63);for(const L of[-1.49,1.49])m.add(d(3.85,.065,.08),a,0,L,-.79);for(const L of[-1.88,1.88])for(const V of[-1.41,1.41])m.add(new Pt(.057,.057,.04,12),s,L,V,-.6,Math.PI/2),m.add(new Pt(.029,.029,.043,8),t,L,V,-.59,Math.PI/2);m.finish();const g=h("Nine dock recessed guides and power contacts",i),f=[];for(let L=0;L<9;L++){const V=L%3-1,K=1-Math.floor(L/3),Z=new St;Z.name=`Agent ${L+1}: vented autonomous compute capsule`,i.add(Z);const N=h(`Agent ${L+1} hollow chassis, optical recess and PCB`,Z),Q=new an;Q.moveTo(-.56,.3),Q.lineTo(-.56,-.215),Q.quadraticCurveTo(-.56,-.335,-.44,-.335),Q.lineTo(.44,-.335),Q.quadraticCurveTo(.56,-.335,.56,-.215),Q.lineTo(.56,.3),Q.quadraticCurveTo(.56,.335,.525,.335),Q.lineTo(.49,.335),Q.lineTo(.49,-.205),Q.quadraticCurveTo(.49,-.265,.43,-.265),Q.lineTo(-.43,-.265),Q.quadraticCurveTo(-.49,-.265,-.49,-.205),Q.lineTo(-.49,.335),Q.lineTo(-.525,.335),Q.quadraticCurveTo(-.56,.335,-.56,.3),N.add(qs(Q,.63,.009),t);const xe=Ys(1.09,.65,.105);Xs(xe,.99,.55,.075),N.add(qs(xe,.025,.003),s,0,0,.331);const ce=Ys(1.055,.595,.085);Xx(ce,-.265,.035,.115),Xs(ce,.255,.105,.026,.22,-.095),Xs(ce,.19,.045,.018,.23,.12),N.add(qs(ce,.065,.007),n,0,0,.36),N.add(new Ms(.097,.013,6,24),a,-.265,.035,.37),N.add(new Pt(.085,.085,.022,24),o,-.265,.035,.34,Math.PI/2),N.add(new Pt(.038,.038,.018,20),c,-.265,.035,.355,Math.PI/2),N.add(d(.18,.025,.018,.009),c,.23,.12,.35),N.add(d(.23,.07,.025,.012),s,.22,-.095,.334);for(let me=0;me<5;me++)N.add(d(.023,.03,.025,.003),a,.135+me*.04,-.095,.355);N.add(d(.89,.04,.51),r,0,-.14,-.018),N.add(d(.32,.065,.29,.015),s,-.16,-.089,-.01),N.add(d(.29,.03,.27,.01),a,-.16,-.043,-.01);for(let me=0;me<7;me++)N.add(d(.025,.115,.235,.003),t,-.28+me*.04,.025,-.01);for(const me of[-.16,-.055,.05,.155])N.add(d(.19,.043,.069,.005),s,.27,-.095,me);for(const me of[-.41,.41])for(const Ae of[-.2,.2])N.add(new Pt(.025,.025,.08,8),a,me,-.08,Ae),N.add(new Pt(.032,.032,.018,8),n,me,-.027,Ae);for(const me of[-.42,.42])for(const Ae of[-.225,.225])N.add(new Pt(.033,.033,.018,12),t,me,Ae,.404,Math.PI/2),N.add(d(.032,.007,.005,.001),s,me,Ae,.415);const W=Ys(1.04,.59,.08);Xs(W,.65,.17,.025,0,-.02),N.add(qs(W,.04,.004),n,0,0,-.318);for(let me=0;me<6;me++)N.add(d(.045,.105,.15,.008),a,-.25+me*.1,-.02,-.365);N.finish();const j=new St;j.name=`Agent ${L+1} reversible hinged perforated lid`,j.position.set(0,.343,-.31),Z.add(j);const ne=h(`Agent ${L+1} pierced cover and machined hinge`,j),de=Ys(1.08,.6,.095);for(let me=0;me<6;me++)Xs(de,.065,.36,.025,-.285+me*.114,0);ne.add(qs(de,.048,.004),t,0,0,.3,-Math.PI/2);for(const me of[-.35,.35])ne.add(new Pt(.043,.043,.18,12),n,me,-.008,0,0,0,Math.PI/2);ne.finish(),g.add(d(1.13,.1,.63),s,V*1.3,K*.94-.385,-.34);for(const me of[-1,1])g.add(d(.07,.54,.38),n,V*1.3+me*.57,K*.94,-.43);g.add(d(.66,.26,.09),s,V*1.3,K*.94,-.73);for(let me=0;me<6;me++)g.add(d(.045,.09,.03,.004),a,V*1.3-.25+me*.1,K*.94,-.675);f.push({root:Z,hinge:j,col:V,row:K,dock:new D(V*1.3,K*.94,-.54),target:new D(V*2.35+(K===0?.12:0),K*1.73,.5+L%3*.22)})}g.finish();const M=h("Permission perimeter with isolated escalation gate",i);for(const L of[-2.26,2.26])M.add(d(6.45,.026,.026,.007),n,0,L,-.42);M.add(d(.026,4.52,.026,.007),n,-3.225,0,-.42);for(const L of[-3.225,3.225])for(const V of[-2.26,2.26])M.add(d(.16,.16,.045,.025),c,L,V,-.42);M.finish();const b=h("Permission gate opens for the exceptional agent",i);b.add(d(.032,4.36,.032,.009),l),b.finish();const x=20,w=new Float32Array(9*x*2*3),S=new Et;S.setAttribute("position",new $t(w,3).setUsage(Vi)),p.add(S);const E=new cr({color:"#64c9d4",transparent:!0,opacity:.38,depthWrite:!1}),v=new yd(S,E);v.name="Nine independently routed task signals",v.frustumCulled=!1,i.add(v);const T=d(.055,.055,.13,.012);p.add(T);const R=new zn(T,c,18);R.name="Travelling task packets",R.frustumCulled=!1,i.add(R);const C=new kt,I=new D,B=new D,X=new D;let H={};function J(L,V,K){const Z=L.dock,N=L.root.position,Q=1-V;K.set(Q*Q*Q*Z.x+3*Q*V*V*N.x+V*V*V*N.x,Q*Q*Q*Z.y+3*Q*Q*V*Z.y+3*Q*V*V*N.y+V*V*V*N.y,Q*Q*Q*Z.z+3*Q*Q*V*(Z.z-.32)+3*Q*V*V*(N.z-.75)+V*V*V*(N.z-.4)),K.x+=3*Q*Q*V*Z.x}function z(L,V=0){const K=Wx(L),Z=Number.isFinite(V)?V:0,N=Tr(K,.12,.65),Q=Tr(K,.38,.84),xe=Tr(K,.77,1);f.forEach((ce,W)=>{const j=Tr(K,.12+W*.012,.63+W*.012),ne=j*.055;ce.root.position.set(ce.col*1.3+(ce.target.x-ce.col*1.3)*j+Math.sin(Z*.21+W*1.9)*ne,ce.row*.94+(ce.target.y-ce.row*.94)*j+Math.sin(Z*.26+W*1.4)*ne,-.05+(ce.target.z+.05)*j+Math.sin(Z*.18+W)*ne),W===5&&(ce.root.position.x+=xe*.47,ce.root.position.z+=xe*.48),ce.root.rotation.set(-.08*j+Math.sin(Z*.19+W)*.017*j,-ce.col*.11*j+Math.sin(Z*.16+W*2)*.025*j,ce.col*.045*j),ce.hinge.rotation.x=-1.23*Tr(K,.38+W*.008,.82+W*.008);for(let de=0;de<x;de++){const me=(W*x+de)*6;J(ce,de/x,B),J(ce,(de+1)/x,X),B.toArray(w,me),X.toArray(w,me+3)}for(let de=0;de<2;de++){const me=((Z*.058+W*.137+de*.5)%1+1)%1;J(ce,me,B),J(ce,Math.min(1,me+.008),I),C.position.copy(B),C.lookAt(I),C.scale.setScalar(N),C.updateMatrix(),R.setMatrixAt(W*2+de,C.matrix)}}),b.group.position.set(3.225+xe*.2,0,-.42-xe*.5),b.group.rotation.y=xe*.6,M.group.visible=K>.27,b.group.visible=K>.27,v.visible=N>.001,R.visible=v.visible,E.opacity=.12+N*.27,S.attributes.position.needsUpdate=!0,R.instanceMatrix.needsUpdate=!0,H={progress:K,release:N,lidOpening:Q,permissionBreach:xe,agentCount:f.length,capsules:f.map(ce=>({position:ce.root.position.toArray(),rotation:ce.root.rotation.toArray().slice(0,3),lidAngle:ce.hinge.rotation.x})),gatePosition:b.group.position.toArray()}}return z(0,0),{group:i,update:z,get state(){return H},dispose(){p.forEach(L=>L.dispose()),u.forEach(L=>L.dispose()),E.dispose(),e.dispose(),i.clear(),i.removeFromParent()}}}function $x(){const i=new St;i.name="Provenance cartridge archive";const e=Xr(),t=wt(i,"Archive rack enclosure"),n=wt(t,"Archive chassis"),s=[],r=[],a=[],o=[],c=Yt(Zi(qt(.11,.11,.045),0,0,.017),.035,.005),l=new Pt(.027,.027,1.7,10),u=Yt(qt(2.6,1.12,.075),.035,.005);for(const x of[-.86,.84]){const w=Hn(qt(3.8,3.28,.15),3.38,2.89,.1);for(const S of[-1.77,1.77])for(const E of[-1.49,1.49])Zi(w,S,E,.04);rt(n,Yt(w,.13),e.metal,0,0,x);for(const S of[-1.77,1.77])for(const E of[-1.49,1.49])rt(n,c,e.edge,S,E,x+.085)}et(n,3.58,.16,1.66,e.dark,0,-1.53,0);for(const x of[-1.72,1.72])et(n,.11,2.96,1.72,e.edge,x,0,0);for(const x of[-1.45,1.45])et(n,.37,.18,.9,e.dark,x,-1.72,-.05);const p=wt(t,"Vented archive service lid"),d=qt(3.58,1.68,.1);for(let x=0;x<9;x++)Hn(d,.11,1.12,.045,(x-4)*.3,0);rt(p,Yt(d,.11),e.metal).rotation.x=-Math.PI/2,p.position.y=1.58;for(const x of[-1,1]){const w=wt(t,x<0?"Left archive service panel":"Right archive service panel"),S=Hn(qt(1.62,2.82,.09),1.15,1.8,.1);rt(w,Yt(S,.11),e.metal).rotation.y=Math.PI/2,et(w,.065,1.86,1.19,e.dark,-.035*x,0,0),w.position.x=x*1.85,o.push({side:w,sign:x})}const h=Yt(Hn(qt(3.18,1.48,.1),2.84,1.19,.07),.085),m=qt(3.19,.49,.07);Hn(m,1,.14,.055,.05,-.055);const _=Yt(m,.13),g=new Pt(.052,.052,.22,16),f=new An(.06,.025,.05);for(let x=0;x<4;x++){const w=(x-1.5)*.69;for(const R of[-1.6,1.6]){const C=rt(n,l,e.accent,R,w-.18,0);C.rotation.x=Math.PI/2}const S=wt(i,`Archive cartridge ${x+1}`);s.push(S),rt(S,h,e.edge,0,-.16,0).rotation.x=-Math.PI/2,rt(S,_,e.metal,0,0,.8),et(S,.33,.15,.025,e.accent,-1.19,.025,.885);for(let R=0;R<=x;R++)et(S,.023,.073,.028,e.dark,-1.29+R*.055,.025,.905);et(S,.23,.055,.022,e.signal,1.18,.025,.885);const E=wt(S,`Layered provenance records ${x+1}`);r.push(E);for(let R=0;R<3;R++)rt(E,u,R===2?e.accent:R===1?e.ink:e.dark,0,-.13+R*.065,-.055).rotation.x=-Math.PI/2;for(let R=0;R<5;R++)et(E,2.32-R*.18,.013,.022,e.edge,-.08,.022,-.44+R*.19);const v=wt(S,`Optical scan head ${x+1}`);a.push(v),et(v,.21,.11,1.13,e.dark,0,.16,-.05);for(const R of[-.42,.35])rt(v,g,e.edge,0,.16,R).rotation.z=Math.PI/2;et(v,.028,.016,.96,e.signal,0,.097,-.05);const T=rt(E,f,e.signal,0,.04,-.06);E.userData.packet=T}let M;function b(x,w=0,S={}){x=Pi(x);const E=Number.isFinite(w)?w:0,v=Pi(S?.cartridgesOnly??0),T=Pi(S?.assembly??1),R=Ct(T,.15,.7),C=Ct(v,0,.34),I=Ct(v,.16,.88),B=Ct(v,.12,1),X=Ct(x,.12,.62),H=Ct(x,.42,1);t.position.set(-30*B+8*(1-R),3*(1-R),-1.2*(1-R)),t.visible=v<.999&&T>.15,p.position.y=1.58+.66*X+3.2*(1-Ct(T,.5,.94)),o.forEach(({side:z,sign:L})=>z.position.x=L*(1.85+.47*X+2.8*(1-Ct(T,.43,.9)))),s.forEach((z,L)=>{const V=Ct(x,.18+L*.055,.8+L*.04);z.position.set((L%2?1:-1)*.28*H,(L-1.5)*(.69+.2*H),.87*V),z.position.x=Qe.lerp(z.position.x,(L-1.5)*1.75,I),z.position.y=Qe.lerp(z.position.y,.5,I),z.position.z=Qe.lerp(z.position.z,1.3,C),z.scale.setScalar(Qe.lerp(1,.52,I)),z.rotation.set(.65*I,(L-1.5)*-.055*I,0);const K=L===0?1:Ct(T,.24+L*.1,.64+L*.12);z.visible=L===0||T>.24+L*.1,z.position.x+=(L%2?1:-1)*9*(1-K),z.position.y+=1.6*(1-K),z.position.z+=2.1*(1-K);const Z=Qe.lerp(H,1.05,I);r[L].position.y=.19*Z,a[L].position.x=Math.sin(E*.27+L*.9)*.99,a[L].position.y=.19*Z,r[L].userData.packet.position.x=Math.sin(E*.22+L*.7)*.93});const J=S.buildSequence??-1;if(J>=0){const z=Ct(J,1,1.4),L=Ct(J,1.4,1.7),V=Ct(J,1.7,2),K=Ct(J,1.02,1.65);t.visible=J>1,t.position.set(0,0,-18*(1-K)),p.position.y=1.58,o.forEach(({side:Z,sign:N})=>Z.position.x=N*1.85),s.forEach((Z,N)=>{const Q=N===0?1:Ct(J,.08+N*.12,.52+N*.15),xe=Ct(J,0,1);Z.visible=N===0||J>.08+N*.12,Z.scale.setScalar(1),Z.rotation.set(0,0,0),Z.position.set((N-1.5)*3.55*xe*(1-L)+(N?18*(1-Q):0),Qe.lerp(-1.035,(N-1.5)*.69,z),2.5*Ct(J,1,1.35)*(1-V)),r[N].position.y=0,a[N].position.y=0})}M={buildSequence:J,progress:x,service:X,inspect:H,time:E,cartridgesOnly:v,extraction:C,row:I,assembly:T,rackArrival:R,rackPosition:t.position.toArray(),rackVisible:t.visible,departure:B,rackCleared:v>=.999,cartridges:s.map(z=>z.position.toArray()),cartridgeScale:s[0].scale.x,cartridgeVisible:s.map(z=>z.visible),scanHeads:a.map(z=>z.position.x)}}return b(0),{group:i,update:b,get state(){return M},dispose:()=>po(i)}}function Kx(){const i=new St;i.name="From constellations to a spiral galaxy",i.renderOrder=210;const e=6800,t=new Float32Array(e*3),n=new Float32Array(e*3),s=new Float32Array(e),r=f=>{const M=Math.sin(f*127.1+31.7)*43758.5453;return M-Math.floor(M)};for(let f=0;f<e;f++){const M=f*3,b=Math.pow(r(f+1),f%9===0?2.4:.7)*3.9,x=f%4,w=x*Math.PI/2+b*1.7+(r(f+6)-.5)*.48;t[M]=(r(f+12)*2-1)*10,t[M+1]=(r(f+20)*2-1)*5.65,t[M+2]=8,n[M]=Math.cos(w)*b,n[M+1]=Math.sin(w)*b,n[M+2]=(r(f+50)-.5)*(.15+.25*(1-b/4)),s[f]=r(f+90)}const a={uTime:{value:0},uSpace:{value:0},uGather:{value:0},uPixel:{value:1}},o=new Et;o.setAttribute("position",new $t(t,3)),o.setAttribute("target",new $t(n,3)),o.setAttribute("seed",new $t(s,1));const c=new xn({uniforms:a,transparent:!0,depthWrite:!1,depthTest:!1,toneMapped:!1,blending:tr,vertexShader:`attribute vec3 target;attribute float seed;uniform float uTime,uSpace,uGather,uPixel;varying float vSeed,vAlpha;
    void main(){float a=uTime*.027;vec2 spun=mat2(cos(a),-sin(a),sin(a),cos(a))*target.xy;
    vec3 goal=vec3(4.25+spun.x*.90,spun.y*1.04,8.);
    float background=step(.84,fract(seed*47.13));
    float gather=smoothstep(seed*.14,.86+seed*.14,uGather)*(1.-background);
    vec3 p=mix(position,goal,gather);p.xy+=vec2(sin(uTime*.06+seed*51.),cos(uTime*.05+seed*73.))*.025*(1.-gather);
    gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);
    gl_PointSize=(1.6+pow(seed,7.)*24.)*uPixel;vSeed=seed;vAlpha=uSpace*(.78+.18*sin(uTime*.4+seed*38.))*(1.-background*uGather*.65);}`,fragmentShader:"varying float vSeed,vAlpha;void main(){float r=length(gl_PointCoord-.5)*2.;float core=exp(-r*r*18.);float halo=exp(-r*r*4.)*.24;float hue=fract(vSeed*13.71);vec3 c=hue<.20?vec3(1.,.64,.35):hue<.65?vec3(.55,.80,1.):vec3(.96,.98,1.);gl_FragColor=vec4(c,(core+halo)*vAlpha*(1.-smoothstep(.75,1.,r)));}"}),l=new Dl(o,c);l.frustumCulled=!1,l.renderOrder=212,i.add(l);const u=new gt(new Xn(24,14),new jt({color:"#060c12",transparent:!0,opacity:0,depthWrite:!1,depthTest:!1,toneMapped:!1}));u.position.z=7.8,u.renderOrder=210,i.add(u);const p=new gt(new Xn(4,4),new xn({uniforms:a,transparent:!0,depthWrite:!1,depthTest:!1,toneMapped:!1,blending:tr,vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying vec2 vUv;uniform float uGather,uSpace;void main(){float r=length(vUv-.5)*2.;float a=exp(-r*r*12.)*.22+exp(-r*r*180.)*.75;gl_FragColor=vec4(.78,.87,1.,a*uGather*uSpace);}"}));p.position.set(4.25,0,8.1),p.renderOrder=211,i.add(p);const d=[[-8,2.8],[-6.9,3.5],[-5.6,2.9],[-4.8,3.8],[-3.8,3.1],[-5.6,2.9],[-5.8,1.7],[-6.9,1.1],[-7.6,1.7],[-5.8,1.7]],h=new Lr(new Et().setFromPoints(d.map(([f,M])=>new D(f,M,8))),new cr({color:"#789bbd",transparent:!0,opacity:0,depthWrite:!1,depthTest:!1}));h.renderOrder=211,i.add(h);let m=null,_=!1,g={};return{group:i,get state(){return g},update(f,M,b=!1){const x=f.galaxy>.001;x&&!_&&(m=M),x||(m=null),_=x;const w=x?Qe.smoothstep(Math.max(0,M-m),0,8):0,S=b?f.galaxy:w*f.galaxy;a.uTime.value=M,a.uSpace.value=f.space||0,a.uGather.value=S,a.uPixel.value=Math.max(.5,Math.min(2,(typeof innerHeight=="number"?innerHeight:1080)/1080)),u.material.opacity=f.space||0,h.material.opacity=(f.space||0)*.15*(1-S),i.visible=(f.space||0)>.001,g={stars:e,space:f.space,gather:S,rotation:M*.027}},dispose(){i.traverse(f=>{f.geometry?.dispose(),f.material?.dispose()})}}}function Zx(i){const e=wt(i,"Robotic credential intruder"),t=Xr("#c69a70"),n=new Tt({color:"#ff6473",emissive:"#ff203b",emissiveIntensity:1.4,roughness:.3}),s=new Pt(.16,.16,.2,20),r=new Pt(.047,.047,.025,12),a=(g,f,M,b)=>{const x=rt(g,s,t.edge,f,M,b);x.rotation.x=Math.PI/2;const w=rt(g,r,t.accent,f,M,b+.115);w.rotation.x=Math.PI/2},o=(g,f,M,b,x)=>{const w=new D(...f),S=new D(...M),E=S.clone().sub(w),v=rt(g,new Pt(b,b,E.length(),12),x);v.position.copy(w).add(S).multiplyScalar(.5),v.quaternion.setFromUnitVectors(new D(0,1,0),E.normalize())},c=wt(e,"Armoured sensor head");c.position.set(0,2.02,0),et(c,1.36,.78,.72,t.metal,0,0,0,.1);const l=wt(c,"Seating visor cartridge");et(l,1.16,.51,.11,t.dark,0,.01,.39,.07),et(l,.92,.33,.035,t.edge,0,.02,.457,.025),et(l,.86,.28,.025,t.dark,0,.02,.48,.02);for(const g of[-1,1]){const f=et(l,.31,.045,.035,n,g*.245,.045,.535,.01);f.rotation.z=g*.23,et(c,.1,.45,.46,t.edge,g*.72,0,-.04,.025),a(c,g*.51,-.27,.37);for(let M=0;M<3;M++)et(c,.12,.022,.015,t.dark,g*.43,-.17-M*.045,.377,.004)}et(c,.67,.1,.6,t.edge,0,.425,-.045,.025),et(c,.23,.024,.025,t.accent,0,.437,.27,.006);const u=wt(e,"Torso chassis");et(u,.3,.35,.3,t.edge,0,1.47,0),et(u,1.13,.76,.58,t.metal,0,1.02,0,.07);const p=wt(u,"Chest service panel");rt(p,Yt(qt(.83,.5,.07),.065),t.dark,0,1.02,.32);for(let g=0;g<4;g++)et(p,.53,.028,.03,t.edge,0,1.17-g*.09,.367,.005);et(u,.58,.25,.42,t.edge,0,.53,-.035,.04);const d=[],h=[],m=[];for(const g of[-1,1]){const f=wt(e,g<0?"Left retrieval arm":"Right retrieval arm");f.position.set(g*.69,1.23,0),d.push({arm:f,sign:g});const M=[g*1.13,-.38,.18],b=[g*2.22,-1.12,1.16];a(f,0,0,0),a(f,...M),a(f,...b),o(f,[0,0,0],M,.115,t.edge),o(f,[g*.1,-.11,.1],[g*.97,-.45,.28],.045,t.accent),o(f,M,b,.105,t.metal),o(f,[g*1.13,-.51,.3],[g*2.08,-1.15,1.26],.036,t.edge);const x=wt(f,"Opposed mechanical gripper");x.position.set(...b),h.push({hand:x,wrist:b,sign:g}),et(x,.21,.43,.22,t.edge,0,0,.07,.03);for(const w of[-.17,.17]){const S=wt(x,"Gripper jaw");m.push({jaw:S,y:w,sign:g});const E=et(S,.36,.066,.11,t.metal,-g*.18,w,.22,.012);E.rotation.z=g*(w>0?-.15:.15),et(S,.065,.18,.11,t.accent,-g*.34,w*.65,.22,.012),et(S,.032,.09,.12,t.dark,-g*.38,w*.5,.22,.008)}et(x,.038,.12,.028,n,g*.12,0,.195,.008)}function _(g,f,M){const b=Math.max(0,Math.min(1,f))*(1-M),x=1-b,w=Ct(b,.12,.88),S=Ct(b,.18,.94),E=Ct(b,.35,1);e.visible=b>.002,e.position.set(Math.sin(g*.48)*.06,.52+Math.sin(g*.75)*.1+x**3*18,-1.25-x*5),e.rotation.z=Math.sin(g*.42)*.018,c.position.y=2.02+1.5*(1-w),c.rotation.y=Math.sin(g*.5)*.09+(1-w)*.6,l.position.z=.8*(1-Ct(b,.4,1)),u.position.y=-.65*(1-w),p.position.z=1.1*(1-Ct(b,.28,.95));for(const{arm:v,sign:T}of d)v.position.set(T*(.69+1.25*(1-S)),1.23+.3*(1-S),-.4*(1-S)),v.rotation.z=T*(Math.sin(g*.85)*.022+(1-S)*.38);for(const{hand:v,wrist:T,sign:R}of h)v.position.set(T[0]+R*.6*(1-E),T[1],T[2]+.7*(1-E)),v.rotation.y=R*.25*(1-E);for(const{jaw:v,y:T}of m)v.position.y=Math.sign(T)*(.12*(1-E)+.045*(.5+.5*Math.sin(g*1.1)));return n.emissiveIntensity=1.15+.25*Math.sin(g*1.1),{visible:e.visible,presence:b,headSeat:w,armSeat:S,handSeat:E,position:e.position.toArray()}}return _(0,0,0),{update:_}}function Jx(){const i=new St;i.name="Delegation credential instrument";const e=Xr("#c69a70"),t=[],n=[],s=[],r=[],a=[],o=[],c=[],l=[],u=[],p=[],d=e.signal.color.clone(),h=e.signal.emissive.clone(),m=new it("#ff5261"),_=new Tt({color:"#244e50",metalness:.24,roughness:.5}),g=new Nn({color:"#57bfe8",metalness:0,roughness:.24,transparent:!0,opacity:.1,depthWrite:!1,side:Tn}),f=e.edge.clone(),M=e.accent.clone(),b=e.signal.clone();f.color.set("#287ea6"),f.metalness=.38,f.roughness=.3,f.emissive.set("#13557c"),f.emissiveIntensity=.18,M.color.set("#8ad9f5"),b.color.set("#a4edff"),b.emissive.set("#30b5ff");const x=[f,M,b];x.forEach(de=>{de.transparent=!0,de.opacity=0});const w=wt(i,"Identity instrument docking cradle"),S=qt(2.06,1.73,.13);for(const de of[-.7,.7])Hn(S,.15,1.16,.06,de,0);rt(w,Yt(S,.16),e.edge,0,-1.5,0).rotation.x=-Math.PI/2;for(const de of[-.77,.77])et(w,.16,.22,1.56,e.dark,de,-1.6,0);const E=Hn(qt(1.68,2.66,.19),1.18,1.94,.13,0,.04);for(const de of[-.66,.66])for(const me of[-1.16,1.16])Zi(E,de,me,.041);const v=Yt(E,.19,.022),T=Yt(Hn(qt(1.23,1.99,.14),1.12,1.88,.1),.07,.008),R=Yt(Zi(qt(.1,.1,.04),0,0,.014),.03,.004),C=qt(.31,.31,.07);Zi(C,0,0,.077);const I=Yt(C,.047,.008),B=qt(.93,1.43,.08);Hn(B,.33,.1,.045,0,.54);const X=Yt(B,.08,.009),H=new Pt(.014,.014,1,8),J=new Ci(.033,10,8),z=Yt(Hn(qt(.96,1.6,.09),.25,.1,.035,0,.64),.045,.007),L=Yt(qt(.038,.075,.014),.025,.004),V=Yt(Hn(qt(2,2.99,.19),1.6,2.55,.13),.21,.025),K=Yt(qt(1.66,2.63,.13),.06,.012),Z=["Authority root","Delegated scope","Runtime credential"];for(let de=0;de<3;de++){const me=wt(i,`${Z[de]} gate`);t.push(me),rt(me,v,de===0?e.accent:e.metal);const Ae=wt(me,`${Z[de]} locating bezel`);o.push(Ae),rt(Ae,T,e.dark,0,.04,.12);for(const k of[-.66,.66])for(const ie of[-1.16,1.16])rt(me,R,e.edge,k,ie,.12);const He=[];for(const k of[-1,1]){const ie=wt(me,`${Z[de]} ${k<0?"left":"right"} guide rail`);et(ie,.08,1.61,.27,e.edge,0,-.04,-.06);for(const Te of[-.67,.6])et(ie,.13,.065,.15,e.accent,0,Te,.06);He.push({rail:ie,sign:k})}l.push(He);const Oe=wt(me,`${Z[de]} secure processor backplane`);a.push(Oe),rt(Oe,z,_),et(Oe,.39,.38,.075,e.dark,.09,.12,.061),et(Oe,.24,.23,.025,e.edge,.09,.12,.106);for(let k=0;k<5;k++)et(Oe,.022,.075,.026,e.accent,-.06+k*.075,-.11,.057),et(Oe,.024,.29+k*.032,.013,e.accent,-.32+k*.14,-.39,.028);for(const k of[-.66,.62])rt(Oe,R,e.edge,-.32,k,.045);for(let k=0;k<=de;k++)et(me,.105,.15,.13,e.accent,(k-de/2)*.22,-1.36,0);et(me,.57-de*.09,.065,.025,e.signal,0,1.16,.12);const ve=wt(me,`${Z[de]} signed credential plate`);n.push(ve),rt(ve,X,e.ink),rt(ve,I,e.accent,-.22,.27,.066);for(let k=0;k<4;k++)et(ve,.63-(k+de)%3*.09,.023,.012,e.edge,-.015,.02-k*.115,.049);for(let k=0;k<5;k++)et(ve,.045,.072+k%2*.035,.013,e.accent,-.25+k*.12,-.5,.05);et(ve,.78,.085,.1,e.dark,0,-.78,0);const ue=wt(me,`${Z[de]} credential latch`);et(ue,.43,.12,.22,e.edge,0,.89,.04),et(ue,.16,.03,.07,e.accent,0,.967,.06),c.push(ue);for(let k=0;k<6;k++){const ie=e.signal.clone();et(me,.064,.105,.038,e.dark,.697,.6-k*.21,.106),rt(me,L,ie,.697,.6-k*.21,.138),p.push({material:ie,gate:de,index:k})}const ge=rt(me,J,e.signal,-.64,.65,.13);s.push(ge);const Le=wt(me,`${Z[de]} protective shield`);u.push(Le),rt(Le,V,f);const U=rt(Le,K,g,0,0,-.025);U.castShadow=!1;for(const k of[-1,1]){et(Le,.13,2.76,.64,f,k*.925,0,-.3);for(const ie of[-1.2,1.2])rt(Le,R,M,k*.9,ie,.14);et(Le,.055,.48,.035,b,k*.925,.69,.13)}if(de<2){const k=wt(i,`Signed delegation path ${de+1}`),ie=rt(k,H,e.accent),Te=rt(k,J,e.signal);r.push({bridge:k,line:ie,packet:Te})}}const N=new D,Q=new D,xe=new D,ce=new D(0,1,0),W=Zx(i);let j;function ne(de,me=0,Ae={}){de=Pi(de);const He=Number.isFinite(me)?me:0,Oe=Ct(de,.08,.4),ve=Ct(de,.42,.75),ue=Ct(de,.79,1),ge=ve*(1-.85*ue);t.forEach((U,k)=>{U.position.set((k-1)*(1.78+.17*ue)*Oe,(1-k)*.43*Oe,(1-k)*.55*(1-.75*ue)),n[k].position.set(0,.16*ge,.2+.83*ge),a[k].position.set(0,-.13*ge,-.14-.43*ge),o[k].position.z=.39*ge,c[k].position.y=.3*ge,l[k].forEach(({rail:Ne,sign:O})=>Ne.position.x=O*(.59+.16*ge)),s[k].position.y=.56+Math.sin(He*.3+k*.9)*.13;const ie=Ct(de,.79+k*.025,.94+k*.03),Te=k===1?0:k-1;u[k].position.set(Te*1.1*(1-ie),(k===1?1.4:.5)*(1-ie),.59+2.2*(1-ie)),u[k].rotation.y=Te*.38*(1-ie),u[k].rotation.x=-.18*(1-ie),u[k].scale.setScalar(1),u[k].visible=ie>0}),p.forEach(({material:U,gate:k,index:ie})=>{const Te=.5+.5*Math.cos(He*.65-ie*.7-k*.6),Ne=k===1?Pi(Ae.fault||0):0;U.color.copy(d).lerp(m,Ne),U.emissive.copy(h).lerp(m,Ne),U.emissiveIntensity=.18+.78*Te**3+.18*ue}),g.opacity=.18*ue,x.forEach(U=>{U.opacity=ue,U.depthWrite=ue>.98}),w.position.y=-.32*ve,r.forEach(({bridge:U,line:k,packet:ie},Te)=>{N.copy(t[Te].position).add(new D(.77,-.87,.02)),Q.copy(t[Te+1].position).add(new D(-.77,-.87,.02)),xe.subVectors(Q,N),k.position.copy(N).add(Q).multiplyScalar(.5),k.scale.set(1,xe.length(),1),k.quaternion.setFromUnitVectors(ce,xe.normalize()),ie.position.copy(N).lerp(Q,.5+Math.sin(He*.37-Te)*.45),U.visible=Oe>.64}),j={attacker:W.update(He,Pi(Ae.fault||0),ue),progress:de,delegation:Oe,inspection:ve,protection:ue,serviceTravel:ge,time:He,gates:t.map(U=>U.position.toArray()),credentials:n.map(U=>U.position.toArray()),backplanes:a.map(U=>U.position.toArray()),shieldPositions:u.map(U=>U.position.toArray()),shieldsVisible:u.map(U=>U.visible),ledIntensity:p.map(U=>U.material.emissiveIntensity)}}return ne(0),{group:i,update:ne,get state(){return j},dispose:()=>po(i)}}const ur=(i,e=0,t=1)=>Math.max(e,Math.min(t,i)),Vd=(i,e,t)=>{const n=ur((t-i)/(e-i));return n*n*(3-2*n)},eo=(i,e,t)=>i+(e-i)*t,to=["laptop","memory","swarm","sealed","engine","assurance"],rn=(i,e,t,n,s,r,a=0,o={})=>({x:i,y:e,z:t,scale:n,turn:s,progress:r,tilt:a,spin:.35,opacity:1,fault:0,repair:0,cartridgesOnly:0,assembly:1,stretchY:1,stretchZ:1,spread:0,roll:0,openFront:0,componentRow:0,buildSequence:-1,...o}),Qx={"03":{laptop:rn(4.7,-.5,-2,.7,-.25,.34,.12)},"04":{laptop:rn(5.7,2.6,-2,.34,-.5,.68,.22)},"05":{laptop:rn(4.8,-.2,-2,.6,-.25,1,.12)},"06":{memory:rn(5.8,2.9,-2,.68,-.35,0,.22,{assembly:0,buildSequence:0})},"07":{memory:rn(5.2,2.75,-2,.34,-.15,0,.22,{buildSequence:1})},"08":{memory:rn(6,-.1,-2,.9,-.35,0,.1,{buildSequence:2})},"09":{swarm:rn(5.8,2.75,-2,.44,-.35,.08,.12)},10:{swarm:rn(5.8,3,-2,.46,.12,.95,.2)},11:{sealed:rn(4.7,-.3,-1,.95,-.3,.025,.2)},12:{sealed:rn(4.7,-.3,-1,.88,-.55,.4,.25)},13:{sealed:rn(5.8,2.8,-2,.38,-.2,.95,.22)},17:{engine:rn(4.9,-.5,-1,.92,-.45,.02)},18:{engine:rn(6,2.8,-2,.31,-.15,.45,0,{openFront:1})},19:{engine:rn(5.7,2.6,-2,.38,-.35,.9,0,{openFront:1,componentRow:1})},20:{assurance:rn(5.8,2.7,-2,.55,-.35,0,.15)},21:{assurance:rn(-5,-3.9,-1,.58,-.15,.6,.2)},22:{assurance:rn(-5,-4.1,-1,.49,.15,1,.18)}},Hh={14:{x:0,y:-2.2,scale:.9,progress:0,turn:.32,sleeveTurn:0},15:{x:5.6,y:2.65,scale:.36,progress:1,turn:.38,sleeveTurn:0},16:{x:5.6,y:2.65,scale:.36,progress:0,turn:-.2,sleeveTurn:0}},Vh=i=>ur(i*i*i*(i*(i*6-15)+10)),Pa=34,Wd=["day","atmosphere","rain","snow","cloud","storm","vortex","night","autumn","spring","aurora","space","galaxy","shade","wind","frost","eclipse","eclipseTransit","contributions","agents"],jx=[{day:.004,atmosphere:0,cloud:.08},{day:.027,atmosphere:0,cloud:.1},{day:.085,atmosphere:.65,cloud:.1},{day:.19,atmosphere:1,cloud:.1},{day:.23,atmosphere:1,cloud:.16},{day:.26,atmosphere:1,cloud:.2},{day:.29,atmosphere:1,cloud:.12},{day:.32,atmosphere:1,cloud:.14},{day:.35,atmosphere:1,cloud:.15},{day:.39,atmosphere:1,cloud:.14},{day:.44,atmosphere:7,eclipse:1,eclipseTransit:.35,cloud:.08},{day:.45,atmosphere:7,eclipse:1,eclipseTransit:.46,cloud:.05},{day:.46,atmosphere:7,eclipse:1,eclipseTransit:.5,cloud:.05},{day:.47,atmosphere:7,eclipse:1,eclipseTransit:.62,cloud:.1},{day:.51,atmosphere:1,cloud:.26,eclipseTransit:1},{day:.55,atmosphere:2.5,cloud:.48,rain:.22,wind:.2,eclipseTransit:1},{day:.62,atmosphere:8,autumn:.8,cloud:.15},{day:.68,atmosphere:8,autumn:1,cloud:.1},{day:.74,atmosphere:8,autumn:1,cloud:.08},{day:.85,atmosphere:9.5,autumn:.7,cloud:.06},{day:.995,atmosphere:10,aurora:.75,cloud:.025},{day:1.07,atmosphere:11,aurora:1,night:1,cloud:.015},{day:1.12,atmosphere:11,night:1,space:1},{day:1.12,atmosphere:11,night:1,space:1,galaxy:1}];function e_(i){return{...Object.fromEntries(Wd.map(e=>[e,0])),...jx[i.index]}}function t_(i){let e={};const t=i.map((r,a)=>{const o={};for(const l of to)o[l]=Qx[r.id]?.[l]||{...e[l]||rn(5,-7,-5,0,0,0),scale:0,opacity:0};e=o;const c=e_(r);return{id:r.id,objects:o,...c,landscape:1,travel:a/(i.length-1),cameraX:0,cameraY:4,cameraZ:17,system:{strength:Hh[r.id]?1:0,progress:0,x:4.7,y:-.3,z:-2,scale:1.1,turn:.25,sleeveTurn:Math.PI/4,...Hh[r.id]},axis:r.section==="B"?"x":r.actNumber===4?"depth":"y"}}),n=(r,a,o)=>Object.fromEntries(Object.keys(r).map(c=>[c,eo(r[c],a[c],o)]));function s(r){const a=ur(r,0,t.length-1),o=Math.min(Math.floor(a),t.length-1),c=t[o],l=t[Math.min(o+1,t.length-1)],u=a-o,p=Vd(0,1,u),d=Math.sin(Math.PI*p),h={};for(const g of to){const f=c.objects[g],M=l.objects[g];h[g]=n(f,M,p);const b=h[g];if(f.scale===0&&M.scale===0){b.opacity=0;continue}if(f.scale>0&&M.scale>0)continue;const x=Vh(p);f.scale>0?Object.assign(b,f,{x:f.x-Pa*x,opacity:p<1?1:0}):Object.assign(b,M,{x:M.x+Pa*(1-x),opacity:p>0?1:0})}const m=n(c.system,l.system,p),_=Vh(p);return c.system.strength===0&&l.system.strength>0&&Object.assign(m,l.system,{x:l.system.x+Pa*(1-_),strength:p>0?1:0}),c.system.strength>0&&l.system.strength===0&&Object.assign(m,c.system,{x:c.system.x-Pa*_,strength:p<1?1:0}),{position:a,index:o,raw:u,t:p,flight:d,objects:h,axis:c.axis,...Object.fromEntries([...Wd,"landscape","travel","cameraX","cameraY","cameraZ"].map(g=>[g,eo(c[g],l[g],p)])),galaxy:a>=t.length-1-.001?1:0,system:m}}return{shots:t,sample:s}}function n_(){const i=new St,e=[],t=new jt({color:"#182b38",side:Tn,transparent:!0});e.push(t);const n=Array.from({length:16},(a,o)=>{const c=new St;c.position.z=6.3,i.add(c);const l=[-1,1].map(u=>{const p=new Et;p.setAttribute("position",new yt(new Float32Array(144),3).setUsage(Vi));const d=new gt(p,t);return d.frustumCulled=!1,c.add(d),e.push(p),{wing:d,side:u}});return{bird:c,wings:l,i:o}});let s;function r(a,o){const c=Number.isFinite(o)?o:0;t.opacity=.42*(1-Qe.clamp(a.storm||0,0,1))*(1-Qe.clamp(a.night||0,0,1)),n.forEach(({bird:d,wings:h,i:m})=>{const _=Math.floor(m/8),g=Math.ceil(m%8/2),f=m%2?1:-1,M=((c*(.22+_*.045)+_*11+7)%29+29)%29-14.5;d.position.set(M-g*.62,2.35-_*.65+g*.21*f+Math.sin(c*.14+_)*.12,6.3),d.scale.setScalar(_?.64:.91),d.visible=t.opacity>.01;const b=Math.sin(c*Math.PI+m*.43);h.forEach(({wing:x,side:w})=>{const S=x.geometry.attributes.position,E=v=>[w*v*.32,b*.215*Math.pow(v,1.25)+(.065-.035*b)*Math.sin(v*Math.PI),0];for(let v=0;v<8;v++){const T=E(v/8),R=E((v+1)/8),C=.023*(1-v/8.5);[T,R,[R[0],R[1]-C,0],T,[R[0],R[1]-C,0],[T[0],T[1]-C,0]].forEach((B,X)=>S.setXYZ(v*6+X,...B))}S.needsUpdate=!0})});const l=n[0],u=l.wings[0].wing.geometry.attributes.position,p=u.getY(43)*l.bird.scale.y;s={bird:l.bird.position.toArray(),wing:p,wingtip:p,wingRoot:u.getY(0),flapPhase:Math.sin(c*Math.PI),flapPeriod:2,nearWingspan:.64*.91,opacity:t.opacity}}return{group:i,update:r,get state(){return s},dispose(){e.forEach(a=>a.dispose()),i.removeFromParent()}}}function i_(){const i=new St;i.name="Turbulent particle storm funnel",i.position.set(5.5,-1.3,-.15);const e={uTime:{value:0},uStrength:{value:0},uPixel:{value:1}},t=[];function n(r,a=!1){const o=new Float32Array(r*3);let c=a?409:197;for(let d=0;d<o.length;d++)c=Math.imul(c,1664525)+1013904223>>>0,o[d]=c/4294967296;const l=new Et;l.setAttribute("position",new $t(o,3));const u=new xn({uniforms:e,transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:`uniform float uTime,uStrength,uPixel;varying float vAlpha,vSeed,vShade;
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
        }`}),p=new Dl(l,u);return p.name=a?"Turbulent ground contact dust":"Layered spiralling smoke particles",p.frustumCulled=!1,i.add(p),t.push(l,u),p}n(1800),n(300,!0);let s;return{group:i,get state(){return s},update(r,a,o=!1){const c=Qe.clamp(Number.isFinite(r)?r:0,0,1),l=o?0:Number.isFinite(a)?a:0;e.uStrength.value=c,e.uTime.value=l,e.uPixel.value=Math.max(.5,Math.min(2,(typeof innerHeight=="number"?innerHeight:1080)/1080)),i.visible=c>.005,s={strength:c,visible:i.visible,base:i.position.toArray(),topY:1.9,visibleLowerY:1.9-c*3.2,phase:l*3.15,helicalBands:3,topRadius:1.3,dust:c>.52,smokeParticles:1800,dustParticles:300,surfaceMeshes:0,reduced:o}},dispose(){t.forEach(r=>r.dispose()),i.removeFromParent()}}}function s_(){const i=new St;i.name="Seasonal atmosphere";const e=[],t=Object.fromEntries(["Time","Rain","Snow","Night","Cloud","Storm","Autumn","Aurora","Shade","Wind","Frost"].map(N=>["u"+N,{value:0}]));t.uPixel={value:1},t.uSkyWidth={value:24};const n="uniform float uTime,uRain,uSnow,uNight,uCloud,uStorm,uAutumn,uAurora,uShade,uWind,uFrost,uPixel,uSkyWidth;",s=`float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
  float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
  float fbm(vec2 p){return noise(p)*.55+noise(p*2.03)*.27+noise(p*4.01)*.13;}`;function r(N,Q,xe){const ce=new Xn(24,14),W=new xn({uniforms:t,transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:"varying vec2 p;void main(){p=position.xy;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`varying vec2 p;${n}${s}
${xe}`}),j=new gt(ce,W);return j.name=N,j.position.z=Q,i.add(j),e.push(ce,W),j}const a=r("Five layered storm banks with independent wind",-.4,`
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
    }`),c=r("Single animated neon lightning stroke to ground",-.12,`
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
    }`),l=i_();i.add(l.group);const u=new Tt({color:"#64717d",roughness:.85,emissive:"#34414d",emissiveIntensity:.12,transparent:!0,opacity:0,depthWrite:!1});e.push(u);function p(N,Q){const xe=Q.map(([j,ne,de=[0,0,0],me=[1,1,1]])=>{j.applyMatrix4(new Rt().compose(new D(...ne),new ji().setFromEuler(new gi(...de)),new D(...me)));const Ae=j.index?j.toNonIndexed():j.clone();return j.dispose(),Ae}),ce=zl(xe);xe.forEach(j=>j.dispose());const W=new gt(ce,u);return W.name=N,i.add(W),e.push(ce),W}const d=(N,Q,xe)=>new An(N,Q,xe),h=new an;h.moveTo(-.36,0),h.lineTo(0,.28),h.lineTo(.36,0),h.closePath();const m=new Wn(h,{depth:.44,bevelEnabled:!1});m.translate(0,0,-.22);const _=p("Distant windborne house",[[d(.55,.43,.4),[0,0,0]],[m,[0,.215,0]],[d(.075,.23,.085),[.18,.32,-.055]]]),g=[[new Ci(1,12,8),[0,0,0],[0,0,0],[.34,.16,.14]],[d(.18,.23,.16),[.29,.07,0],[0,0,-.25]],[new Ci(1,10,6),[.41,.14,0],[0,0,0],[.14,.09,.1]]];for(const N of[-.23,.21])for(const Q of[-.09,.09])g.push([d(.05,.25,.045),[N,-.21,Q],[0,0,N<0?-.15:.18]]);for(const N of[-.095,.095])g.push([new Ul(.029,.12,7),[.36,.25,N],[0,0,-.2]]),g.push([d(.1,.025,.055),[.29,.18,N*1.6]]);g.push([new Pt(.012,.018,.3,7),[-.38,.02,0],[0,0,-.45]]);const f=p("Distant windborne cow",g),M=p("Distant windborne laptop",[[d(.65,.035,.42),[0,0,0]],[d(.65,.4,.027),[0,.19,-.22],[-.22,0,0]]]),b=[_,f,M],x=new St;x.position.y=-1.7,x.name="Distant autumn woodland canopy banks",i.add(x),x.position.z=.48;const w=new Ci(1,12,8),S=new Pt(.022,.035,1,7),E=new jt({color:"#ffffff",transparent:!0,opacity:0,depthWrite:!1}),v=new jt({color:"#603a30",transparent:!0,opacity:0,depthWrite:!1});e.push(w,S,E,v);const T=28,R=new zn(w,E,T*5),C=new zn(S,v,T);R.name="Lobed copper and russet tree crowns",C.name="Recessed woodland trunks",x.add(C,R);const I=new kt,B=new it,X=["#8c3f30","#a44b32","#bd6540","#92452f","#b55a34"];for(let N=0;N<T;N++){const Q=N>=8,xe=Q?N-8:N,ce=Q?6.55+xe*.26:-11.65+xe*.38,W=-1.64-Math.sin(xe*.31+1)*.1,j=.32+(.5+.5*Math.sin(N*17.3))*.36;I.position.set(ce,W+j*.28,0),I.rotation.set(0,0,.035*Math.sin(N)),I.scale.set(1,j*.6,1),I.updateMatrix(),C.setMatrixAt(N,I.matrix);for(let ne=0;ne<5;ne++){const de=ne/5*Math.PI*2,me=j*.2;I.position.set(ce+Math.cos(de)*me,W+j*.66+Math.sin(de)*j*.16,Math.sin(N+ne)*.045),I.scale.set(j*(.25+ne*.011),j*(.32-ne*.012),j*.22),I.rotation.set(0,N*.27,Math.sin(ne)*.09),I.updateMatrix(),R.setMatrixAt(N*5+ne,I.matrix),B.set(X[(N+ne)%X.length]),R.setColorAt(N*5+ne,B)}}function H(N,Q){const xe=new Float32Array(N*3);for(let ne=0;ne<N;ne++)xe[ne*3]=Math.sin(ne*73.7+2)*43758.5453,xe[ne*3+1]=Math.sin(ne*19.3+7)*15273.13,xe[ne*3+2]=ne/N;const ce=new Et;ce.setAttribute("position",new $t(xe,3));const W=new xn({uniforms:t,transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:`${n}varying float vAlpha,vSeed;void main(){vec3 s=fract(position);vec3 p;float k=${Q.toFixed(1)};
      if(k<.5){float fall=fract(s.y-uTime*(.29+s.z*.1)*(1.+uWind*.35));p=vec3(s.x*27.-13.5-fall*(1.4+uWind*4.),fall*14.-7.,6.);vAlpha=uRain;}
      else if(k<1.5){p=vec3(mod(s.x*27.+uTime*(.10+uWind*3.4),27.)-13.5+sin(uTime*.33+s.z*20.)*.5,fract(s.y-uTime*(.018+s.z*.014+uSnow*.016))*14.-7.,6.);vAlpha=uSnow;}
      else if(k<2.5){p=vec3((s.x-.5)*uSkyWidth,(s.y-.5)*13.,-1.5);vAlpha=pow(uNight,.55)*(.88+.12*sin(uTime*.36+s.z*50.));}
      else {p=vec3(mod(s.x*27.+uTime*(.32+uWind*1.5),27.)-13.5+sin(uTime*.4+s.z*12.)*.7,fract(s.y-uTime*(.024+s.z*.02))*14.-7.,6.);vAlpha=uAutumn*.74;}
      vAlpha*=k>1.5&&k<2.5?.72+.28*s.z:.4+.6*s.z;vSeed=s.z;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);gl_PointSize=(k<.5?26.:k<1.5?4.5:k<2.5?1.6+pow(s.z,5.)*7.4:9.)*uPixel;}`,fragmentShader:`${n}varying float vAlpha,vSeed;void main(){vec2 p=gl_PointCoord-.5;float k=${Q.toFixed(1)};float a;vec3 c=vec3(.86,.92,1.);
      if(k<.5){a=(1.-smoothstep(.029,.084,abs(p.x+p.y*(.19+uWind*.30))))*(1.-smoothstep(.37,.5,abs(p.y)));c=vec3(.76,.85,.93);}
      else if(k<2.5){a=1.-smoothstep(.09,.5,length(p));if(k>1.5){float r=length(p)*2.;a=(exp(-r*r*15.)+exp(-r*r*3.5)*.28)*(1.-smoothstep(.8,1.,r));c=vSeed<.20?vec3(1.,.80,.53):vSeed>.72?vec3(.61,.80,1.):vec3(.97,.98,1.);}}
      else{float t=uTime*.6+vSeed*15.;p=mat2(cos(t),-sin(t),sin(t),cos(t))*p;a=1.-smoothstep(.30,.37,length(p*vec2(1.,1.8)));float vein=abs(p.x)*1.7+abs(p.y)*.7;a*=1.-smoothstep(.42,.62,vein);c=mix(vec3(.74,.10,.055),vec3(.95,.38,.11),vSeed);}
      gl_FragColor=vec4(c,a*vAlpha*.85*(k<.5?1.-uShade*.68:1.));}`}),j=new Dl(ce,W);return j.frustumCulled=!1,i.add(j),e.push(ce,W),j}const J=H(950,0),z=H(370,1),L=H(5200,2),V=H(70,3);L.name="Bright sky-only Milky Way stars",L.renderOrder=30,L.material.blending=tr,L.material.depthTest=!0;const K=r("Subtle sky-only Milky Way haze",-1.48,`
    void main(){float center=2.05+(p.x+11.5)*.09;
      float d=abs(p.y-center),cloud=fbm(vec2(p.x*.34,p.y*.7));
      float band=exp(-d*d/1.9)*(.25+cloud*.75);
      gl_FragColor=vec4(.55,.67,.88,band*pow(uNight,.7)*.085);
    }`);K.renderOrder=29,K.material.blending=tr,K.material.depthTest=!0;let Z;return{group:i,get state(){return Z},update(N,Q){const xe=Number.isFinite(Q)?Q:0,ce=typeof innerWidth=="number"&&typeof innerHeight=="number"&&innerHeight>0?innerWidth/innerHeight:16/9;t.uSkyWidth.value=Math.max(24,10*ce+2),t.uTime.value=xe,t.uPixel.value=Math.min(2,(typeof innerHeight=="number"?innerHeight:1080)/1080);for(const ue of["rain","snow","night","cloud","storm","autumn","aurora","shade","wind","frost"])t["u"+ue[0].toUpperCase()+ue.slice(1)].value=Qe.clamp(N[ue]||0,0,1);const W=t.uAutumn.value;x.visible=W>.005,E.opacity=W*.76,v.opacity=W*.65,x.rotation.z=Math.sin(xe*.27)*.0014,K.visible=t.uNight.value>.005;const j=t.uCloud.value;a.visible=j>.005;for(const[ue,ge]of[[J,N.rain],[z,N.snow],[L,N.night],[V,N.autumn],[o,N.aurora],[c,N.storm]])ue.visible=ge>.005;const ne=1-Qe.smoothstep(j,0,.42),de=t.uStorm.value,me=t.uWind.value,Ae=Qe.clamp(N.vortex||0,0,1);l.update(Ae,xe,!!N.reducedMotion);const He=Qe.smoothstep(Ae,.45,.85);u.opacity=He*.73,b.forEach((ue,ge)=>{const Le=((xe*(.75+ge*.1+me*.45)+ge*9.5+6)%31+31)%31-15.5;ue.position.set(Le,.05+ge*.3+Math.sin(xe*.41+ge*1.7)*.46,.15+ge*.08),ue.rotation.set(Math.sin(xe*.24+ge)*.32,xe*(.18+ge*.035)+ge,Math.sin(xe*.39+ge)*.58),ue.scale.setScalar(ge===1?.74:.79),ue.visible=He>.005});const Oe=(xe%10.7+10.7)%10.7-2.4,ve=Qe.smoothstep(Oe,0,.04)*(1-Qe.smoothstep(Oe,.14,.43));c.visible=de>.25&&ve>.001,Z={cloud:j,cloudsVisible:a.visible,opacityMultiplier:j*.95,clearing:ne,bankCenters:[0,1,2,3,4].map(ue=>(ue-2)*3.8+Math.sin(xe*(.014+ue*.004)+ue)*1.4+(ue<2?-1:1)*ne*10),windOffsets:[.13,.185,.24,.295,.35].map(ue=>xe*ue*(1+me*5)),rainCount:950,rainStreakPixels:26*t.uPixel.value,vortex:Ae,funnel:l.state,wind:me,starCount:5200,starDepth:-1.5,starVerticalRange:[-6.5,6.5],starHorizontalRange:[-t.uSkyWidth.value/2,t.uSkyWidth.value/2],starLowerEdgeMask:"terrain-depth-only",starOpacity:Math.pow(t.uNight.value,.55),starRenderOrder:30,autumnTrees:x.visible?T:0,aurora:t.uAurora.value,auroraDrift:xe*.28,lightning:ve*Qe.smoothstep(de,.25,.65),flying:b.map(ue=>({name:ue.name,visible:ue.visible,position:ue.position.toArray(),rotation:ue.rotation.toArray().slice(0,3)}))}},dispose(){l.dispose(),e.forEach(N=>N.dispose()),i.removeFromParent()}}}function r_(){const i=new St;i.name="Mechanical SDLC funnel";const e=Xr("#bc8152");e.metal.color.set("#b5bdc0"),e.metal.roughness=.34,e.edge.color.set("#3a4a53"),e.edge.roughness=.43;const t=[1.75,1.3,.94,.66],n=[2.15,1.82,1.48,1.14],s=["Code","Test","Operate","Monitor and debug"],r=[],a=[],o=Object.values(e);e.edge.emissive.set("#263039"),e.edge.emissiveIntensity=.08;const c=(M,b=80)=>{const x=new lo(M.map(w=>new Ee(...w)),b);return x.rotateX(Math.PI/2),x},l=c([[.014,-.014],[.035,-.014],[.04,-.009],[.04,.009],[.034,.016],[.014,.016],[.014,-.014]],16),u=c([[.041,-.006],[.053,-.006],[.056,0],[.053,.007],[.041,.007],[.041,-.006]],24),p=t.map(M=>M+.08),d=.34,h=p.reduce((M,b)=>M+b*2,0)+d*3;let m=-h/2;for(let M=0;M<4;M++){const b=t[M],x=n[M],w=b*.82,S=.085,E=new St;E.name=`${s[M]} tapered sleeve`,i.add(E);const v=m+p[M];m+=p[M]*2+d,r.push({sleeve:E,targetX:v,radius:b,length:x});const T=[[w-.025,-x/2],[w,-x/2+.025],[w,-x/2+.09],[b,x/2-.065],[b,x/2-.022],[b-.022,x/2]];rt(E,c(T),M===0?e.accent:e.metal).name=`${s[M]} brushed outer shell`;const R=[[b-S,x/2],[b-S-.013,x/2-.032],[w-S,-x/2+.028],[w-S,-x/2]],C=rt(E,c(R),e.edge);C.name=`${s[M]} open inner bore`;const I=new an;I.absarc(0,0,b+.08,0,Math.PI*2,!1),Zi(I,0,0,b-S);for(let z=0;z<8;z++){const L=z*Math.PI/4;Zi(I,Math.cos(L)*(b-.008),Math.sin(L)*(b-.008),.029)}rt(E,Yt(I,.085,.012),e.metal,0,0,x/2-.012).name=`${s[M]} drilled front flange`;const B=[[w-S,-.022],[w+.032,-.022],[w+.047,-.007],[w+.047,.018],[w+.029,.033],[w-S,.033],[w-S,-.022]];rt(E,c(B),e.edge,0,0,-x/2+.008).name=`${s[M]} rear locating collar`;const X=[[b-S+.009,-.005],[b-S+.027,-.005],[b-S+.027,.005],[b-S+.009,.005],[b-S+.009,-.005]];rt(E,c(X),e.signal,0,0,x/2+.035).name=`${s[M]} rim light guide`;for(let z=0;z<8;z++){const L=z*Math.PI/4,V=Math.cos(L)*(b-.008),K=Math.sin(L)*(b-.008);rt(E,u,e.edge,V,K,x/2+.039),rt(E,l,e.accent,V,K,x/2+.052)}for(const z of[.2,.72]){const L=Qe.lerp(w,b,z),V=-x/2+x*z,K=[[L-.006,-.019],[L+.014,-.019],[L+.02,-.012],[L+.02,.012],[L+.014,.019],[L-.006,.019]];rt(E,c(K),e.edge,0,0,V)}const H=new gt(new An(.1,.025,x*.52),e.edge);H.position.set(0,-.92*b,-.025),H.rotation.x=-.17,E.add(H);const J=rt(E,new An(.042,.036,.09),e.signal);a.push(J)}const _=new Map(o.map(M=>[M,M.opacity]));for(const M of _.keys())M.alphaHash=!0;let g;function f(M={},b=0){const x=Number.isFinite(b)?b:0,w=Pi(M.progress??0),S=Ct(w,.56,.8),E=Pi(M.strength??0);i.visible=E>.001,i.position.set(M.x??0,M.y??0,M.z??0),i.scale.setScalar(Number.isFinite(M.scale)?M.scale:1),i.rotation.set((M.tilt??.13)+Math.sin(x*.11)*.012,(M.turn??-.13)+Math.sin(x*.09)*.035,0);for(const[v,T]of _)v.opacity=T*E;r.forEach(({sleeve:v,targetX:T,radius:R,length:C},I)=>{const B=I===0?0:Ct(w,(3-I)*.18,(4-I)*.18),X=Ct(w,.82,1);v.position.set(T*S,0,I*2.7*B*(1-X)),v.rotation.set(0,0,0),a[I].position.set(0,-.92*R+.023,Math.sin(x*.28+I*.7)*C*.19),a[I].rotation.x=-.17}),g={...M,progress:w,spread:S,strength:E,time:x,nativeWidth:h,rotation:i.rotation.toArray().slice(0,3),stages:r.map(({sleeve:v})=>({name:v.name,position:v.position.toArray(),rotation:v.rotation.z,yaw:v.rotation.y}))}}return f(),{group:i,update:f,get state(){return g},dispose:()=>{e.ink.dispose(),e.dark.dispose(),po(i)}}}const Kn=Object.freeze({winter:{top:"#bdd9ea",middle:"#d3e5ec",horizon:"#edf0e8",glow:"#f8efce",sun:"#fff5d5",ridges:["#dce8ea","#cddfe4","#bbd3dc","#a9c5d1","#94b6c6","#83a7ba"]},cloud:{top:"#a8c2d3",middle:"#c8d8df",horizon:"#e5e3d8",glow:"#d9c0a9",sun:"#fff0ba",ridges:["#d3deda","#c1d1d1","#adc4c9","#99b6c1","#85a7b6","#7395a8"]},storm:{top:"#30495d",middle:"#435d72",horizon:"#7c92a1",glow:"#8eabb7",sun:"#ffe1a0",ridges:["#607b8e","#557286","#4b677d","#415b72","#354d65","#293f57"]},autumn:{top:"#91b9d3",middle:"#d7c5cb",horizon:"#f3c8ab",glow:"#ffe0a4",sun:"#fff0bd",ridges:["#dba99d","#ce907c","#be785f","#ad624f","#994f46","#83443f"]},spring:{top:"#b5dbe6",middle:"#d1e7e2",horizon:"#f4e9ca",glow:"#fff1c9",sun:"#fff6db",ridges:["#d6e0bf","#c4d5ab","#b0c999","#9bbf8a","#87ae7f","#769d76"]},sunset:{top:"#483047",middle:"#b65b69",horizon:"#ffc090",glow:"#ffd1a0",sun:"#ffebc6",ridges:["#db9185","#c97870","#b35e5d","#9b494e","#803c46","#64333e"]},dusk:{top:"#241b32",middle:"#953746",horizon:"#ff8557",glow:"#ffb66c",sun:"#ffe6bd",ridges:["#b77279","#995e6f","#794759","#593345","#3d2939","#261f2f"]},morning:{top:"#80bddf",middle:"#bcdfed",horizon:"#f5e4c4",glow:"#ffe4aa",sun:"#ffebbf",ridges:["#d6ddd1","#c7d5cb","#b5c9c1","#a2bcb6","#8aaca9","#779b9f"]},rain:{top:"#35536b",middle:"#4b687e",horizon:"#8398a8",glow:"#abbac0",sun:"#ffe5ac",ridges:["#637d90","#587489","#4d6c83","#436078","#38536c","#2c435b"]},snow:{top:"#afcadd",middle:"#d3e1e9",horizon:"#f0f1ee",glow:"#edf2ee",sun:"#eef4f0",ridges:["#e1e9ec","#d5e2e8","#c5d8e2","#b2cbd8","#9cbbcd","#8aaabd"]},clear:{top:"#79bbe2",middle:"#b9deef",horizon:"#f3e7cc",glow:"#ffe0a5",sun:"#fff0be",ridges:["#d8ddc5","#c9d4bc","#b6c9ae","#a0ba9e","#8cac92","#7b9d89"]},night:{top:"#090c13",middle:"#171d2b",horizon:"#424454",glow:"#545267",sun:"#9aabc0",ridges:["#343949","#2b3040","#232a38","#1c2330","#151d27","#0e151d"]},dawn:{top:"#262838",middle:"#b66a64",horizon:"#ffd28a",glow:"#fff3ac",sun:"#fff7c9",ridges:["#b7a5a9","#8f8fa1","#637a94","#3e617e","#274762","#182f48"]},eclipse:{top:"#1b112d",middle:"#49243f",horizon:"#9b4659",glow:"#f05b70",sun:"#ffbcc2",ridges:["#904b65","#783e5b","#603149","#4a293e","#362237","#251b2c"]}}),a_=Object.freeze({left:.06,right:.48,top:.2,bottom:.52,color:"#f4eee7"}),ka=Object.freeze({height:10,position:[0,0,20],near:.1,far:100});function o_(i=16/9){const e=new uo(-5*i,5*i,5,-5,ka.near,ka.far);return e.position.set(...ka.position),e}const En=i=>new D(...i.slice(1).match(/../g).map(e=>parseInt(e,16)/255)),c_=`
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,os=[[.4,.42,.435,.405,.44,.425,.4,.435,.47,.44,.485,.44,.41,.42,.44],[.37,.39,.42,.38,.355,.38,.365,.36,.41,.43,.395,.37,.36,.38,.4],[.41,.44,.425,.395,.355,.34,.355,.37,.34,.32,.35,.395,.41,.37,.35],[.3,.32,.285,.26,.29,.325,.31,.275,.3,.345,.325,.295,.27,.29,.32],[.3,.285,.26,.235,.2,.19,.21,.235,.25,.235,.21,.19,.22,.25,.27],[.13,.15,.13,.115,.14,.16,.18,.16,.14,.13,.145,.175,.195,.18,.16]],l_=os.map(i=>new co(i.map((e,t)=>new Ee(-.8+t/(i.length-1)*1.6,e-.5))));function u_(i){const e=new an;e.moveTo(-.8,-.75);const t=new co(i.map((n,s)=>new Ee(-.8+s/(i.length-1)*1.6,n-.5)));for(let n=0;n<=1400;n++){const s=n/1400,r=t.getPoint(s),a=Math.min(i.length-2,Math.floor(s*(i.length-1))),o=Qe.lerp(i[a],i[a+1],s*(i.length-1)-a)-.5;e.lineTo(r.x,Qe.lerp(o,r.y,.48))}return e.lineTo(.8,-.75),e.closePath(),new Bl(e)}function h_({palette:i="dusk",aspect:e=16/9,grain:t=.35,reducedMotion:n=!1}={}){if(!Kn[i])throw new RangeError(`Unknown landscape palette: ${i}`);const s=new St;s.name="Quiet landscape";let r=0,a=0,o=0,c=i==="eclipse"?1:0,l=!1,u=c?.5:0,p=0,d=0,h=10*e,m=!1;const _=[],g=(N,Q,xe={})=>{const ce=new xn({uniforms:N,vertexShader:c_,fragmentShader:`varying vec2 vUv; varying vec3 vPosition;
${Q}`,toneMapped:!1,...xe});return _.push(ce),ce},f=(N,Q,xe)=>{const ce=new Xn(1,1);_.push(ce);const W=new gt(ce,Q);return W.name=N,W.position.z=xe,W.scale.set(h*1.6,15,1),W.frustumCulled=!1,s.add(W),W},M={uTop:{value:En(Kn[i].top)},uMiddle:{value:En(Kn[i].middle)},uHorizon:{value:En(Kn[i].horizon)},uGlow:{value:En(Kn[i].glow)},uProgress:{value:0},uSun:{value:new Ee(.77,.49)},uAspect:{value:e},uRays:{value:1},uGlowGain:{value:1}},b=f("Gradient atmosphere",g(M,`
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
  `),-2),x={uColor:{value:En(Kn[i].sun)},uOpacity:{value:1}},w=f("Low sun",g(x,`
    uniform vec3 uColor;uniform float uOpacity;
    void main() {
      float d = length(vUv - 0.5);
      float edge = fwidth(d);
      float alpha = 1.0 - smoothstep(0.46 - edge, 0.46 + edge, d);
      gl_FragColor = vec4(uColor * (0.94 + vUv.y * 0.06), alpha*uOpacity);
    }
  `,{transparent:!0,depthWrite:!1}),-1);w.scale.setScalar(.86);const S=w.material.clone();_.push(S),S.uniforms.uColor.value.copy(En("#cbd9eb"));const E=f("Rising moon",S,-1.05);E.scale.setScalar(.95),S.fragmentShader=`varying vec2 vUv;uniform vec3 uColor;uniform float uOpacity;
    void main(){float d=length(vUv-.5);float a=1.-smoothstep(.45,.46,d);
    gl_FragColor=vec4(uColor*(.94+.06*(1.-smoothstep(0.,.46,d))),a*uOpacity);}`;const v=w.material.clone();_.push(v),v.uniforms.uColor.value.copy(En("#160a20")),v.uniforms.uSolarOffset={value:new Ee},v.uniforms.uSolarRadius={value:.86*.46/.905},v.fragmentShader=`varying vec2 vUv;
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
    }`;const T=f("Eclipse lunar occluder",v,-.9);T.scale.setScalar(.905);const R={uOpacity:{value:0},uLunarOffset:{value:new Ee},uLunarRadius:{value:.905*.46/1.24}},C=f("Eclipse ruby corona",g(R,`
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
  `,{transparent:!0,depthWrite:!1}),-1.02);C.scale.setScalar(1.24);const I=os.map((N,Q)=>{const xe=u_(N);_.push(xe);const ce={uColor:{value:En(Kn[i].ridges[Q])},uHaze:{value:En(Kn[i].horizon)},uDepth:{value:Q/5},uProgress:{value:0}},W=new gt(xe,g(ce,`
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
    `));return W.name=`Ridge ${Q+1}`,W.position.z=Q,W.scale.set(h,10,1),W.frustumCulled=!1,s.add(W),W}),B=new Ee;function X(N){let Q=-1/0;for(let xe=0;xe<I.length;xe++){const ce=I[xe],W=Qe.clamp(((N-ce.position.x)/h+.8)/1.6,0,1),j=Math.min(os[xe].length-2,Math.floor(W*(os[xe].length-1))),ne=Qe.lerp(os[xe][j],os[xe][j+1],W*(os[xe].length-1)-j)-.5;l_[xe].getPoint(W,B),Q=Math.max(Q,Qe.lerp(ne,B.y,.48)*10+ce.position.y)}return Q}const H={uAmount:{value:Qe.clamp(t,0,1)}},J=f("Host-controlled grain",g(H,`
    uniform float uAmount;
    void main() {
      vec2 p = gl_FragCoord.xy;
      float noise = fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))));
      gl_FragColor = vec4(vec3(step(0.5, noise)), abs(noise - 0.5) * 0.12 * uAmount);
    }
  `,{transparent:!0,depthTest:!1,depthWrite:!1}),8);J.renderOrder=100;function z(N){if(m)return;d=Qe.clamp(Number.isFinite(N)?N:0,0,1);const Q=n?0:d;I.forEach((me,Ae)=>{const He=Qe.smoothstep(Q,Ae*.032,1);me.position.x=(He-.35)*(.008+Ae*.008)*h*(Ae%2?-1:1),me.position.y=-He*(.06+Ae*.055),me.material.uniforms.uProgress.value=d});const xe=Qe.clamp(r/.94,0,1.18)*Math.PI,ce=.5+Math.cos(xe)*.34,W=.49+Math.sin(xe)*.37;w.position.set((ce-.5)*h,(W-.5)*10,-1);const j=(1-Qe.smoothstep(ce,.3,.52))*Qe.smoothstep(W,.48,.6);p=X(w.position.x);const ne=.86*.46;l=!0;for(let me=0;me<9;me++){const Ae=(me/8*2-1)*ne;if(w.position.y+Math.sqrt(Math.max(0,ne*ne-Ae*Ae))>X(w.position.x+Ae)){l=!1;break}}x.uOpacity.value=(l?1-a:1)*(1-o*.48)*(1-j*.15),S.uniforms.uOpacity.value=a,E.position.set(.31*h,2.35,-1.05),T.position.set(w.position.x+(u-.5)*1.9,w.position.y,-.9),v.uniforms.uSolarOffset.value.set((w.position.x-T.position.x)/.905,0),v.uniforms.uOpacity.value=Qe.smoothstep(c,0,.08),T.visible=C.visible=c>0,C.position.set(w.position.x,w.position.y,-1.02),R.uLunarOffset.value.set((T.position.x-w.position.x)/1.24,(T.position.y-w.position.y)/1.24),R.uOpacity.value=Qe.smoothstep(c,.48,1);const de=(1-Qe.smoothstep(Math.sin(xe),.12,.65))*(1-a)*(1-o);M.uRays.value=de*(1-c),M.uGlowGain.value=(1-.82*Qe.smoothstep(r,.045,.2)*(1-Qe.smoothstep(r,.78,.94)))*(1-.78*c)*(1-.85*a),M.uSun.value.set(ce,W),M.uProgress.value=r}function L(N){if(!Kn[N])throw new RangeError(`Unknown landscape palette: ${N}`);c=N==="eclipse"?1:0,u=c?.5:0;const Q=Kn[N];for(const[xe,ce]of[["uTop","top"],["uMiddle","middle"],["uHorizon","horizon"],["uGlow","glow"]])M[xe].value.copy(En(Q[ce]));x.uColor.value.copy(En(Q.sun)),I.forEach((xe,ce)=>{xe.material.uniforms.uColor.value.copy(En(Q.ridges[ce])),xe.material.uniforms.uHaze.value.copy(En(Q.horizon))}),z(d)}const V=["dawn","morning","cloud","rain","storm","snow","winter","clear","autumn","sunset","dusk","night","eclipse"].map(N=>{const Q=Kn[N];return{...Object.fromEntries(["top","middle","horizon","glow","sun"].map(xe=>[xe,En(Q[xe])])),ridges:Q.ridges.map(En)}});function K(N,Q=N/11,xe=0,ce=0,W=0,j){const ne=Qe.clamp(Number.isFinite(N)?N:0,0,12),de=Math.min(11,Math.floor(ne)),me=de===0?Qe.smootherstep(ne,0,1):ne-de,Ae=V[de],He=V[de+1];r=Number.isFinite(Q)?Q:0,a=Qe.clamp(xe,0,1),o=Qe.clamp(ce,0,1),c=Qe.clamp(W,0,1),u=Number.isFinite(j)?Qe.clamp(j,0,1):.5*Qe.smootherstep(c,0,1);const Oe=V[12];for(const[ve,ue]of[["uTop","top"],["uMiddle","middle"],["uHorizon","horizon"],["uGlow","glow"]])M[ve].value.copy(Ae[ue]).lerp(He[ue],me).lerp(Oe[ue],c);x.uColor.value.copy(Ae.sun).lerp(He.sun,me).lerp(Oe.sun,c),I.forEach((ve,ue)=>{ve.material.uniforms.uColor.value.copy(Ae.ridges[ue]).lerp(He.ridges[ue],me).lerp(Oe.ridges[ue],c),ve.material.uniforms.uHaze.value.copy(Ae.horizon).lerp(He.horizon,me).lerp(Oe.horizon,c)})}function Z(N){if(!Number.isFinite(N)||N<=0)throw new RangeError("Aspect must be positive.");h=10*N,M.uAspect.value=N;for(const Q of[b,J])Q.scale.x=h*1.6;for(const Q of I)Q.scale.x=h;z(d)}return z(0),{group:s,update:z,setPalette:L,setAtmosphere:K,setAspect:Z,get celestial(){return{sun:w.position.toArray(),moon:E.position.toArray(),sunOpacity:x.uOpacity.value,moonOpacity:S.uniforms.uOpacity.value,day:r,eclipse:c,eclipseTransit:u,shadowClipped:!0,eclipseMoon:T.position.toArray(),eclipseMoonOpacity:v.uniforms.uOpacity.value,coronaOpacity:R.uOpacity.value,coronaMoonMasked:!0,coronaLunarOffset:R.uLunarOffset.value.toArray(),solarOccluded:l,terrainAtSun:p}},headlineRegion:a_,cameraDefaults:ka,grain:H.uAmount,setGrain(N){H.uAmount.value=Qe.clamp(N,0,1)},setReducedMotion(N){n=!!N,z(d)},dispose(){if(!m){m=!0;for(const N of _)N.dispose();s.clear(),s.removeFromParent()}}}}function d_(i,e,t){const n=new Ix({antialias:!0,alpha:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0});n.setPixelRatio(1),n.outputColorSpace=pn,n.toneMapping=yl,n.toneMappingExposure=1.2,n.autoClear=!1,i.appendChild(n.domElement);const s=new $o,r=new Dn(35,16/9,.05,120),a=new $o,o=o_(16/9),c=h_({aspect:16/9,grain:.45});a.add(c.group),c.group.position.y=-.85;const l=r_();s.add(l.group);const u=new Map,p=Kx();a.add(p.group);const d=s_();a.add(d.group);let h,m=!1,_=1920,g=1080,f=null,M=0,b=0,x=null;const w=new Ee,S=new Ee;function E(){const L=new $o;L.background=new it("#101514");for(const[Z,N,Q,xe,ce,W]of[[14,8,5,-5,12,4],[3,11,4,12,7,1],[16,2,8,-2,6,-9],[8,3,2.4,0,5,12]]){const j=new gt(new Xn(Z,N),new jt({color:new it(Q,Q,Q)}));j.position.set(xe,ce,W),j.lookAt(0,0,0),L.add(j)}const V=new pl(n),K=V.fromScene(L,.025);s.environment=K.texture,s.environmentIntensity=1,h?.dispose(),h=K,V.dispose(),L.traverse(Z=>{Z.geometry?.dispose(),Z.material?.dispose()})}E();const v=[];for(const[L,V,K]of[[16118505,2.5,[-8,12,7]],[12965080,2,[9,5,-8]],[14872295,.7,[7,3,11]]]){const Z=new Nm(L,V);Z.position.set(...K),s.add(Z),v.push(Z)}s.add(new Cm(13820118,856848,.35));const T=n_();a.add(T.group);function R(L){if(!u.has(L)){const V={laptop:Bx,sealed:Ux,engine:Vx,swarm:Yx,memory:$x,assurance:Nx,identity:Jx}[L](),K=new St;K.add(V.group);const Z={laptop:.52,sealed:.028,engine:.022,swarm:1,memory:1,assurance:1,identity:1}[L];V.group.scale.setScalar(Z),L==="engine"&&V.group.position.set(-.55,-1,0),L==="sealed"&&(V.group.position.y=-.65),K.visible=!1,s.add(K),u.set(L,Object.assign(V,{wrapper:K}))}return u.get(L)}function C(L,V){_=Math.max(1,Math.round(L)),g=Math.max(1,Math.round(V)),n.setSize(_,g,!1)}let I=!0,B=0;for(const L of to)R(L);async function X(){const L=[];try{r.position.set(0,4,17),r.lookAt(0,0,0);for(const V of[s,a])V.traverse(K=>{L.push([K,K.visible,K.frustumCulled]),K.visible=!0,K.frustumCulled=!1});await n.compileAsync(a,o),await n.compileAsync(s,r),n.setSize(256,144,!1);for(let V=0;V<3;V++){for(const[Z,N]of u)Z==="engine"?N.update(V/2,0,0,{retainEngine:!0,spread:1}):N.update(V/2,0,{fault:1,repair:V/2,cartridgesOnly:V/2,assembly:V/2});l.update({strength:V===1?.5:1,progress:V/2,scale:1,x:0,y:0,z:0,turn:0},0),d.update({cloud:1,rain:1,snow:1,storm:1,night:1,aurora:1,autumn:1},3.4);for(const Z of[s,a])Z.traverse(N=>{N.visible=!0,N.frustumCulled=!1});const K=[];s.traverse(Z=>{Z.isPointLight&&K.push(Z)});for(let Z=0;Z<=K.length;Z++)K.forEach((N,Q)=>N.visible=Q<Z),n.clear(),n.render(a,o),n.clearDepth(),n.render(s,r),B++;await new Promise(Z=>setTimeout(Z,0))}n.getContext().finish()}finally{n.setSize(_,g,!1);for(const[V,K,Z]of L)V.visible=K,V.frustumCulled=Z;for(const V of u.values())V.wrapper.visible=!1;I=!1}}const H=X(),J=new D;function z(L,V=0,K=!1,Z=1/60,N=!1){if(m||I)return;x=L;const Q=K?0:V;K||N?(w.set(0,0),S.set(0,0)):S.lerp(w,1-Math.exp(-Z*1.2)),c.setAtmosphere(L.atmosphere,L.day,L.night,L.cloud,L.eclipse,L.eclipseTransit),d.update(L,Q),c.update(L.travel+Math.sin(Q*.023)*.006),c.group.position.x=Math.sin(L.travel*Math.PI*2)*.25,o.zoom=1+L.travel*.035+Math.sin(Q*.019)*.004,o.updateProjectionMatrix(),T.update(L,Q),p.update(L,Q,K||N),r.position.set(L.cameraX+w.x*.055,L.cameraY+w.y*.035,L.cameraZ),J.set(0,0,0),r.lookAt(J),v[0].position.x=-8+Math.sin(Q*.16)*.6+S.x*1.2,v[1].position.z=-8+Math.cos(Q*.13)*.7,s.environmentRotation.y=Math.sin(Q*.09)*.025+S.x*.035,v[2].intensity=L.objects.engine.opacity>.1?1.15:.7,l.update(L.system,Q);for(const xe of to){const ce=L.objects[xe];if(ce.opacity<=1e-4||ce.scale<=1e-4){u.has(xe)&&(u.get(xe).wrapper.visible=!1);continue}const W=R(xe);W.wrapper.visible=!0,W.wrapper.position.set(ce.x,ce.y+Math.sin(Q*.48+(xe==="engine"?2:0))*.075,ce.z),W.wrapper.rotation.set(ce.tilt+Math.sin(Q*.17)*.004,ce.turn+Math.sin(Q*.34)*ce.spin,ce.roll+Math.sin(Q*.11)*.003),W.wrapper.scale.set(ce.scale,ce.scale*ce.stretchY,ce.scale*ce.stretchZ);const j=f?.kind===xe?f.t:ce.progress;M=j,xe==="laptop"&&(b=j),xe==="engine"?W.update(j,K?null:Q*.018%.5,Q*.6,{retainEngine:!0,spread:ce.spread,openFront:ce.openFront,componentRow:ce.componentRow}):W.update(j,Q,{fault:ce.fault,repair:ce.repair,cartridgesOnly:ce.cartridgesOnly,assembly:ce.assembly,buildSequence:ce.buildSequence})}n.setViewport(0,0,_,g),n.setScissorTest(!1),n.setClearColor(856081,1),n.clear(),n.render(a,o),n.clearDepth(),n.render(s,r)}return n.domElement.addEventListener("webglcontextlost",L=>{L.preventDefault(),m=!0,e("context")}),n.domElement.addEventListener("webglcontextrestored",()=>{try{E(),m=!1,t()}catch(L){e("restore",L)}}),{renderer:n,ready:H,resize:C,draw:z,setPointer(L,V){w.set(L,V)},clearManual(){f=null},getObjectProgress(){return M},setObjectProgress(L,V="sealed"){f={kind:V,t:L}},getState(){const L=n.getContext(),V=L.getExtension("WEBGL_debug_renderer_info");return{lost:m,warmed:!I,warmedFrames:B,galaxy:p.state,environment:!!s.environment,models:[...u.keys()],renderer:V?L.getParameter(V.UNMASKED_RENDERER_WEBGL):L.getParameter(L.RENDERER),calls:n.info.render.calls,triangles:n.info.render.triangles,geometries:n.info.memory.geometries,programs:n.info.programs.length,textures:n.info.memory.textures,laptop:u.get("laptop")?.state,instrument:l.state,objects:Object.fromEntries([...u].map(([K,Z])=>[K,Z.state||Z.group.userData.state||null])),weather:Object.fromEntries(["day","rain","snow","cloud","storm","vortex","night","autumn","spring","aurora","wind","frost","eclipse"].map(K=>[K,x?.[K]])),landscapeMotion:{...T.state,clouds:d.state,celestial:c.celestial},laptopT:b,objectProgress:M,journey:x,parts:Object.fromEntries([...u].map(([K,Z])=>[K,Object.fromEntries(["Laptop display","Laptop motherboard","Laptop deck","Left cooling fan","Enclosure","Sealed core","Crankshaft","Front crankcase service cover","Centrifugal governor + throttle feedback"].map(N=>{const Q=Z.group.getObjectByName(N);return[N,Q?{position:Q.position.toArray(),rotation:Q.rotation.toArray().slice(0,3)}:null]}))])),poses:Object.fromEntries([...u].map(([K,Z])=>[K,{visible:Z.wrapper.visible,position:Z.wrapper.position.toArray(),rotation:Z.wrapper.rotation.toArray().slice(0,3),scale:Z.wrapper.scale.x}]))}},dispose(){u.forEach(L=>{L.dispose()}),l.dispose(),d.dispose(),p.dispose(),c.dispose(),h?.dispose(),T.dispose(),n.dispose(),n.domElement.remove()}}}function f_(i){const e=i.map(a=>[...document.querySelectorAll(`[data-id="${a.id}"] [data-reveal]`)]),t=i.map(a=>[...document.querySelectorAll(`[data-id="${a.id}"] [data-draw]`)]),n={5:.2,6:.2,12:1,13:.35,14:.2};let s=-1,r=0;return{update(a,o,c,l,u,p){const d=Math.round(a);d!==s&&(s=d,r=u),t[d]?.forEach((h,m)=>{const _=o||c||p?1:Math.max(0,Math.min(1,(u-r-m*.06)/1.8));h.style.strokeDasharray="1",h.style.strokeDashoffset=String(1-_)}),e[d]?.forEach((h,m)=>{const _=o||c||p?1:Math.max(0,Math.min(1,(u-r-m*.1)/(n[d]||.4)));h.style.opacity=String(_),h.style.transform=`translateY(${(1-_)*12}px)`})}}}function p_(i=0,e=3.8,t=.86){let n=i,s=0;return{snap(r){n=r,s=0},step(r,a){const o=Math.max(1,Math.ceil(a*120)),c=Math.min(a,.08)/o;for(let l=0;l<o;l++)s+=(e*e*(r-n)-2*t*e*s)*c,n+=s*c;return Math.abs(r-n)<2e-5&&Math.abs(s)<1e-4&&(n=r,s=0),n},get position(){return n},get velocity(){return s}}}const m_={"01":"right","02":"down","03":"left","04":"down","05":"right","06":"down","07":"left","08":"down","09":"right",10:"down",11:"left",12:"down",13:"right",14:"down",15:"left",16:"down",17:"right",18:"down",19:"left",20:"down",21:"right",22:"down",23:"left"},g_={down:[0,1160],up:[0,-1160],right:[2040,0],left:[-2040,0]};function v_(i){const e=[{x:0,y:0}];for(let s=1;s<i.length;s++){const[r,a]=g_[m_[i[s-1].id]||"down"];e.push({x:e[s-1].x+r,y:e[s-1].y+a})}function t(s){const r=ur(s,0,i.length-1),a=Math.min(Math.floor(r),i.length-2),o=Vd(.025,.975,r-a),c=e[a],l=e[a+1];return{x:eo(c.x,l.x,o),y:eo(c.y,l.y,o),dx:l.x-c.x,dy:l.y-c.y,t:o,index:a}}function n(s,r){const a=t(r),o=e[s];return{x:o.x-a.x,y:o.y-a.y}}return{anchors:e,sample:t,offset:n}}const za=v_(Mt),x_=t_(Mt);let Xd;const no=p_();let io=!0,Wi=[],Ln=null,ai=0;const tt=i=>document.querySelector(i),ei=i=>[...document.querySelectorAll(i)],Gn=matchMedia("(prefers-reduced-motion: reduce)").matches,__=new URLSearchParams(location.search),qr=__.has("presenter"),$i=typeof BroadcastChannel<"u"?new BroadcastChannel("enterprise-ai-2026"):null;let At=0,on=[],en=null,Ga=0,Jn=0,Wh=0,Xh=0,so=0,or=!1,Jt=null,hi=!1,js=null,er=0,li=!0,Ks=null,hs=0;const Ki=i=>i.div?i.name:(i.html.match(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/)?.[1]||i.sourceTitle.split(" (~")[0]).replace(/<br\s*\/?>/g," ").replace(/<[^>]*>/g,"").replace(/&amp;/g,"&"),vl=()=>Math.max(0,Mt.findIndex(i=>i.id===decodeURIComponent(location.hash.slice(1))));function ro(){$i?.postMessage({type:"state",index:At,id:Mt[At].id,startedAt:js,pausedMs:er,paused:li})}function y_(i){const e=document.createElement("div");return e.innerHTML=i||"",e.querySelectorAll(".foot,.fivedots,.eyebrow").forEach(t=>t.remove()),e.querySelectorAll("[style]").forEach(t=>t.removeAttribute("style")),e.querySelectorAll(".cnt").forEach(t=>{const n=Number(t.dataset.n);t.textContent=t.dataset.fmt==="comma"?n.toLocaleString("en-US"):n+({pct:"%",pctplus:"%+",x:"×"}[t.dataset.fmt]||"")}),e.innerHTML}function M_(i){const e=document.createElement("div");return e.innerHTML=i.h||"",(i.sources||[...e.querySelectorAll(".foot a")]).map((t,n)=>{let s;try{const r=new URL(t.href);s=r.hostname.replace(/^www\./,"")+(r.hostname==="github.com"?" / "+r.pathname.split("/").filter(Boolean).slice(0,2).join("/"):"")}catch{s=t.textContent}return`<a href="${t.href}" target="_blank" rel="noopener" title="${t.href}">[${n+1}] ${s}</a>`}).join(" &nbsp; ")}function S_(){tt("#slides").innerHTML=Mt.map(i=>`<section class="slide ${i.layout}" id="slide-${i.id}" aria-label="Slide ${i.id}: ${Ki(i)}" aria-hidden="true" data-id="${i.id}" style="--accent:${i.accent}"><div class="content">${i.html===i.h?y_(i.html):i.html}${i.scene&&i.scene!=="landscape"?`<div class="static-object">${i.scene==="sealed"?"execute_code<br><small>01 SPAN / CONTENTS OPAQUE</small>":i.scene==="engine"?"desired state<br>↓<br>controller<br>↑<br>observed state":"AG–01<br>NETWORK / ACTIVE"}</div>`:""}</div><div class="foot">${M_(i)}</div></section>`).join(""),tt("#rail").innerHTML=Mt.map(i=>`<button data-go="${i.index}" class="${i.div?"divider":""}" aria-label="Slide ${i.id}: ${Ki(i)}" title="${i.id} · ${Ki(i)}"></button>`).join(""),tt("#slide-index").innerHTML=Mt.map(i=>`<button data-go="${i.index}" class="${i.div?"is-divider":""}"><span>${i.id}</span>${Ki(i)}</button>`).join(""),ei("[data-go]").forEach(i=>i.addEventListener("click",()=>{gn(Number(i.dataset.go)),tt("#navigator").close()})),ei("[data-object-t]").forEach(i=>i.addEventListener("click",()=>{qd(Number(i.dataset.objectT),!0)}))}function qh(){const i=Math.min(innerWidth/1920,innerHeight/1080);tt("#stage").style.setProperty("--scale",i);let e=0;on=Mt.map(t=>{const n=e;return e+=innerHeight*(t.div||t.scene?3.6:2.65),n}),tt("#runway").style.height=on.at(-1)+innerHeight+"px",Jt?.resize(1920*i*Math.min(devicePixelRatio,2),1080*i*Math.min(devicePixelRatio,2)),qr||(or=!0,scrollTo(0,on[At]),Ln=on[At],io=!0,en=null,Jn=0)}function Vr(i){let e=0;for(let t=1;t<on.length;t++)Math.abs(i-on[t])<Math.abs(i-on[e])&&(e=t);return e}function Gl(i,e=!0){At=i;const t=Mt[i];ei(".slide").forEach((n,s)=>{n.classList.toggle("active",s===i),n.setAttribute("aria-hidden",String(s!==i)),n.inert=s!==i}),ei("#rail button").forEach((n,s)=>{n.classList.toggle("active",s===i),n.classList.toggle("passed",s<i),n.setAttribute("aria-current",s===i?"step":"false")}),ei("#slide-index button").forEach((n,s)=>n.classList.toggle("active",s===i)),tt("#act-label").textContent=t.div?"":t.actNumber?`${String(t.actNumber).padStart(2,"0")} / ${t.actName}`:"OPENING KEYNOTE",tt("#slide-label").textContent=`${String(i+1).padStart(2,"0")} / ${Mt.length}   ·   ${t.id}`,tt("#stage").style.setProperty("--accent",t.accent),tt("#contract-tracker").innerHTML="",ei(".slide.active [data-object-t]").forEach(n=>n.classList.toggle("selected",Number(n.dataset.objectT)===(t.scene==="sealed"?1:.6))),tt("#previous").disabled=i===0,tt("#next").disabled=i===Mt.length-1,e&&history.replaceState(null,"",`${location.pathname}${location.search}#${t.id}`),ro()}function qd(i,e=!1){if(cancelAnimationFrame(hs),ei(".slide.active [data-object-t]").forEach(r=>r.classList.toggle("selected",Number(r.dataset.objectT)===i)),!e||Gn||!Jt){Jt?.setObjectProgress(i,Mt[At].scene==="engine"?"engine":"sealed");return}const t=Jt.getObjectProgress(),n=performance.now(),s=r=>{const a=Math.min(1,(r-n)/800),o=a*a*(3-2*a);Jt.setObjectProgress(t+(i-t)*o,Mt[At].scene==="engine"?"engine":"sealed"),a<1&&(hs=requestAnimationFrame(s))};hs=requestAnimationFrame(s)}function gn(i,e=!1){if(i=Math.max(0,Math.min(Mt.length-1,i)),clearTimeout(so),qr){$i?.postMessage({type:"go",index:i});return}const t=on[i];cancelAnimationFrame(hs),Jt?.clearManual(),e||Gn?(en=null,Jn=0,or=!0,scrollTo(0,t),Ln=t,io=!0,Gl(i)):(en=t,Ga=scrollY,Jn=0)}function Yh(i){const e=Mt[At].actNumber,t=Math.max(0,Math.min(4,e+i));gn(Mt.findIndex(n=>n.actNumber===t))}function b_(){try{Jt=d_(tt("#graphics"),()=>{hi=!0,Wr()},()=>{hi=!1,Wr()});const i=Math.min(innerWidth/1920,innerHeight/1080);Jt.resize(1920*i*Math.min(devicePixelRatio,2),1080*i*Math.min(devicePixelRatio,2)),hi=!1}catch(i){console.error("WebGL unavailable; static presentation is active.",i),hi=!0}}function Wr(){document.body.classList.toggle("static-mode",hi),tt("#graphics-status").hidden=!hi,tt("#graphics-status").textContent="3D GRAPHICS UNAVAILABLE"}function E_(){window.open(`${location.pathname}?presenter#${Mt[At].id}`,"enterprise-presenter","popup,width=1400,height=940")}function w_(i){if(!(i.metaKey||i.ctrlKey||i.altKey||/INPUT|TEXTAREA|SELECT/.test(i.target.tagName))){if(tt("#blackout").hidden===!1){tt("#blackout").hidden=!0,i.preventDefault();return}if(!(tt("dialog[open]")||i.target.closest?.("[contenteditable=true]")||["Enter"," "].includes(i.key)&&i.target.closest?.("button,a"))){if(i.repeat&&["ArrowRight","ArrowLeft","PageDown","PageUp"," ","Enter"].includes(i.key)){i.preventDefault();return}switch(i.key){case"ArrowRight":case"PageDown":case"Enter":case" ":i.preventDefault(),gn((en===null?At:Vr(en))+1);break;case"ArrowLeft":case"PageUp":i.preventDefault(),gn((en===null?At:Vr(en))-1);break;case"ArrowDown":i.preventDefault(),Yh(1);break;case"ArrowUp":i.preventDefault(),Yh(-1);break;case"Home":i.preventDefault(),gn(0);break;case"End":i.preventDefault(),gn(Mt.length-1);break;case"g":case"G":tt("#navigator").showModal();break;case"?":tt("#help").showModal();break;case"p":case"P":E_();break;case"b":case"B":tt("#blackout").hidden=!1;break;case"f":case"F":document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen?.().catch(()=>{});break}}}}function Yd(i){const e=Math.min(.032,(i-(Wh||i))/1e3);if(Wh=i,en!==null){const c=en-Ga;Jn+=(c*30-Jn*11)*e,Ga+=Jn*e;const l=Ga;or=!0,Math.abs(c)<.5&&Math.abs(Jn)<3?(scrollTo(0,en),en=null,Jn=0):scrollTo(0,l)}(Ln===null||Gn)&&(Ln=scrollY);const t=en!==null?8:5.5;Ln+=(scrollY-Ln)*(1-Math.exp(-e*t)),Math.abs(scrollY-Ln)<.05&&(Ln=scrollY);const n=Vr(Ln);n!==At&&Gl(n);let s=0;for(;s<on.length-2&&Ln>on[s+1];)s++;ai=s+ur((Ln-on[s])/(on[s+1]-on[s])),(io||Gn)&&(no.snap(Gn?At:ai),io=!1);const r=no.step(ai,e),a=x_.sample(Gn?At:r);a.route=za.sample(Gn?At:r),tt("#stage").classList.toggle("theme-light",Wi[At].classList.contains("theme-light")),tt("#stage").classList.toggle("theme-dark",Wi[At].classList.contains("theme-dark"));const o=hi;for(let c=Math.max(0,s-1);c<=Math.min(Mt.length-1,s+2);c++){const l=Wi[c],u=Gn||o,p=u?{x:0,y:0}:za.offset(c,ai),d=u?c===At:Math.abs(c-ai)<1.01;l.classList.toggle("travelling",d),l.style.opacity=d?"1":"0",l.style.transform=`translate3d(${p.x}px,${p.y}px,0)`;const h=l._layers||(l._layers=[...l.querySelector(".content").children]);for(let m=0;m<h.length;m++){const _=Math.min(m,5)*.014;h[m].style.transform=u?"":`translate3d(${p.x*_}px,${p.y*_}px,0)`}}for(let c=0;c<Wi.length;c++)Math.abs(c-ai)>1.01&&(Wi[c].classList.remove("travelling"),Wi[c].style.opacity="0");if(Xd?.update(Gn?At:ai,Gn,o,za,Ks??i/1e3,Ks!==null),tt("#stage").style.setProperty("--journey-progress",String(ai/(Mt.length-1))),Jt&&!o)try{Jt.draw(a,Ks??i/1e3,Gn,e,Ks!==null)}catch(c){console.error("Graphics stopped; static slides retained.",c),hi=!0,Wr()}i-Xh>1e3&&(ro(),Xh=i),requestAnimationFrame(Yd)}function T_(){document.body.classList.add("presenter-mode"),tt("#presenter").hidden=!1,tt("#presenter").innerHTML='<div class="presenter-toolbar"><h1>Enterprise AI / Presenter</h1><time id="clock">00:00 / 45:00</time><button id="timer">Start clock</button><button id="timer-reset">Reset</button><button id="p-prev">← Previous</button><button id="p-next">Next →</button></div><div class="presenter-grid"><div><span class="mono">CURRENT SLIDE</span><h2 id="presenter-current"></h2><div id="speaker-notes"></div></div><div><span class="mono">UP NEXT</span><h2 id="presenter-next"></h2><p id="presenter-warning">Original PPTX notes and source text are preserved below. Reported case-study figures are from the supplied deck; consult their sources before external publication.</p><span class="mono">← → SLIDES / ↑ ↓ ACTS · AUDIENCE WINDOW STAYS IN SYNC</span></div></div>';const i=e=>{At=e,tt("#presenter-current").textContent=`${Mt[e].id} / ${Ki(Mt[e])}`,tt("#speaker-notes").textContent=Mt[e].notes,tt("#speaker-notes").scrollTop=0,tt("#presenter-next").textContent=e<Mt.length-1?`${Mt[e+1].id} / ${Ki(Mt[e+1])}`:"End of deck"};tt("#slide-index").innerHTML=Mt.map(e=>`<button data-go="${e.index}"><span>${e.id}</span>${Ki(e)}</button>`).join(""),ei("#slide-index button").forEach(e=>e.onclick=()=>{gn(Number(e.dataset.go)),tt("#navigator").close()}),i(vl()),tt("#p-prev").onclick=()=>gn(At-1),tt("#p-next").onclick=()=>gn(At+1),tt("#timer").onclick=()=>{$i?.postMessage({type:"timer",action:li?"start":"pause"})},tt("#timer-reset").onclick=()=>$i?.postMessage({type:"timer",action:"reset"}),$i?.addEventListener("message",({data:e})=>{e.type==="state"&&(e.index!==At&&i(e.index),js=e.startedAt,er=e.pausedMs,li=e.paused,tt("#timer").textContent=li?"Start clock":"Pause clock")}),setInterval(()=>{const e=li?er:er+Date.now()-js,t=Math.floor(e/1e3);tt("#clock").textContent=`${String(Math.floor(t/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")} / 45:00`,tt("#clock").style.color=t>=2700?"#f17b70":""},300),$i?.postMessage({type:"request-state"})}ei("[data-close]").forEach(i=>i.onclick=()=>i.closest("dialog").close());ei("dialog").forEach(i=>i.addEventListener("click",e=>{if(e.target===i){const t=i.getBoundingClientRect();(e.clientX<t.left||e.clientX>t.right||e.clientY<t.top||e.clientY>t.bottom)&&i.close()}}));addEventListener("keydown",w_);tt("#blackout").addEventListener("click",()=>{tt("#blackout").hidden=!0});tt("#stage").addEventListener("click",i=>{if(!(i.button!==0||i.target.closest("a,button,input,textarea,select,dialog,[role=button],[contenteditable=true]")||tt("dialog[open]")||getSelection()?.toString())){if(!tt("#blackout").hidden){tt("#blackout").hidden=!0;return}gn((en===null?At:Vr(en))+1)}});tt("#menu-button").onclick=()=>tt("#navigator").showModal();tt("#help-button").onclick=()=>tt("#help").showModal();tt("#previous").onclick=()=>gn(At-1);tt("#next").onclick=()=>gn(At+1);qr?T_():(S_(),Wi=ei(".slide"),Wi.forEach((i,e)=>i.classList.add("theme-"+Mt[e].theme)),Xd=f_(Mt),At=vl(),b_(),qh(),Gl(At),Wr(),addEventListener("resize",qh),addEventListener("pointermove",i=>Jt?.setPointer((i.clientX/innerWidth-.5)*2,(.5-i.clientY/innerHeight)*2),{passive:!0}),addEventListener("pointerout",i=>{i.relatedTarget||Jt?.setPointer(0,0)}),addEventListener("hashchange",()=>gn(vl(),!0)),addEventListener("wheel",()=>{en=null,Jn=0,cancelAnimationFrame(hs),Jt?.clearManual()},{passive:!0}),addEventListener("touchstart",()=>{en=null,Jn=0,cancelAnimationFrame(hs),Jt?.clearManual()},{passive:!0}),addEventListener("scroll",()=>{if(or){or=!1;return}clearTimeout(so),en===null&&(so=setTimeout(()=>{const i=Vr(scrollY);Math.abs(scrollY-on[i])<innerHeight*.48&&gn(i)},800))},{passive:!0}),$i?.addEventListener("message",({data:i})=>{i.type==="go"&&gn(i.index),i.type==="request-state"&&ro(),i.type==="timer"&&(i.action==="reset"?(er=0,js=null,li=!0):i.action==="start"&&li?(js=Date.now(),li=!1):i.action==="pause"&&!li&&(er+=Date.now()-js,li=!0),ro())}),requestAnimationFrame(Yd));window.keynote={ready:qr,slides:Mt.map(i=>({id:i.id,title:Ki(i),layout:i.layout,scene:i.scene})),go(i,e=!0){gn(typeof i=="number"?i:Mt.findIndex(t=>t.id===i),e)},setObjectProgress:qd,scrollBetween(i,e){const t=Mt.findIndex(n=>n.id===i);t<0||t>=Mt.length-1||(en=null,Jn=0,clearTimeout(so),or=!0,cancelAnimationFrame(hs),Jt?.clearManual(),scrollTo(0,on[t]+ur(e)*(on[t+1]-on[t])))},freeze(i=12){Ks=i},unfreeze(){Ks=null},getState(){return{index:At,id:Mt[At].id,settled:en===null&&(Ln===null||Math.abs(Ln-scrollY)<.5),journeyPosition:ai,documentCamera:za.sample(ai),objectPosition:no.position,objectVelocity:no.velocity,scrollY,position:on[At],static:hi,reduced:Gn,graphics:Jt?.getState()}},loseContext(){Jt?.renderer.forceContextLoss()},restoreContext(){Jt?.renderer.forceContextRestore()}};addEventListener("pagehide",()=>{Jt?.dispose(),$i?.close()},{once:!0});if(!qr){const i=new URL("https://ethical.institute/keynotes/ai-enterprise-2026/");i.hash="",i.search="";const e=document.querySelector("[data-live-deck]");e.href=i.href;const t=xf.toString(i.href,{type:"svg",margin:2,width:168,color:{dark:"#08131fff",light:"#ffffffff"}}).then(s=>document.querySelector("#live-deck-qr").innerHTML=s),n=document.createElement("div");n.id="startup-loading",n.setAttribute("role","status"),n.textContent="Preparing the journey",document.body.append(n),Promise.all([t,Jt?.ready,document.fonts.ready,...[...document.images].map(s=>s.decode().catch(()=>{}))]).catch(s=>{console.error("Scene preparation failed",s),hi=!0,Wr()}).finally(()=>{window.keynote.ready=!0,n.remove()})}
