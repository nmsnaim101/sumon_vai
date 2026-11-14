// লাইভ কনটেন্ট (অ্যাডমিন থেকে বদলানো ticker/ইশতেহার/ভিডিও), খবর ও ঘোষণা, গোপনীয়তা-বান্ধব পরিসংখ্যান
(function(){
const $=id=>document.getElementById(id),SB=window.SB||{},U=CFG.formUrl||'',SITE=CFG.site||location.origin+'/';
const BNS='০১২৩৪৫৬৭৮৯',bn=s=>String(s).replace(/[0-9]/g,c=>BNS[c]);
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const LS={g:k=>{try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}},s:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
// ---------- পরিসংখ্যান: শুধু গণনা, কোনো ব্যক্তিগত তথ্য নয় ----------
const OK=['visit','home','make','manifesto','drug','gallery','ward','guide','svc','form','news','chat','slip','share','install'];
function hit(k,f){if(!U||OK.indexOf(k)<0)return;try{if(!f){if(sessionStorage.getItem('h_'+k))return;sessionStorage.setItem('h_'+k,'1')}}catch(e){}
 try{fetch(U+'?a=hit&k='+k,{mode:'no-cors',keepalive:true}).catch(()=>{})}catch(e){}}
SB.hit=hit;window.SB=SB;
hit('visit');hit('home');
document.addEventListener('click',e=>{const b=e.target.closest('nav button[data-t]');if(b)hit(b.dataset.t)});
addEventListener('appinstalled',()=>hit('install',1));
// ---------- ticker ----------
let TK=[],ti=0,tt=null;
window.SBtk=()=>TK.length>0;
function tick(){const n=$('nt');if(!n)return;clearInterval(tt);if(!TK.length){n.style.display='none';return}
 n.style.display='';const show=()=>{n.classList.remove('tf');void n.offsetWidth;n.textContent='📢 '+TK[ti%TK.length];n.classList.add('tf');ti++};show();if(TK.length>1)tt=setInterval(show,5500)}
// ---------- ইশতেহার ----------
function mf(){const e=$('mf');if(!e)return;const eh=esc;
 e.innerHTML=CFG.pledges.map((p,i)=>`<details class="card"${i?'':' open'}><summary><b>${eh(p.t)}</b></summary><p>${eh(p.d)}</p><ul>${(p.pts||[]).map(x=>`<li>${eh(x)}</li>`).join('')}</ul><div class="more">${(p.more||[]).map(t=>`<p>${eh(t)}</p>`).join('')}</div></details>`).join('');
 const st=document.querySelector('.stats div:last-child b');if(st){st.dataset.n=CFG.pledges.length;st.textContent=bn(CFG.pledges.length)}}
// ---------- ভিডিও ----------
let CV=[];
function vinfo(u){u=String(u||'').trim();let m;
 if(m=u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/))([\w-]{11})/))return{k:'yt',id:m[1],th:'https://i.ytimg.com/vi/'+m[1]+'/hqdefault.jpg',src:'https://www.youtube-nocookie.com/embed/'+m[1]+'?autoplay=1&rel=0'};
 if(/facebook\.com|fb\.watch/.test(u))return{k:'fb',src:'https://www.facebook.com/plugins/video.php?href='+encodeURIComponent(u)+'&show_text=false&autoplay=true'};
 if(/\.(mp4|webm|ogg)(\?|$)/i.test(u))return{k:'mp4',src:u};return{k:'ln',src:u}}
function vids(){const L=CV.concat(window.GVID||[]).filter(v=>v&&v.u),g=$('vl');if(!g)return;
 g.innerHTML=L.length?L.map((v,i)=>{const f=vinfo(v.u);return`<button class="vt" data-i="${i}" aria-label="ভিডিও চালান"><span class="vp"${f.th?` style="background-image:url('${esc(f.th)}')"`:''}><i>▶</i></span><b>${esc(v.t||'ভিডিও')}</b>${v.c?`<small>${esc(v.c)}</small>`:''}</button>`}).join(''):'<div class="card vne">🎬 ভিডিও শীঘ্রই যুক্ত হবে।</div>';
 g._L=L}
window.SBv=vids;
document.addEventListener('click',e=>{const b=e.target.closest('.vt');if(!b)return;const v=$('vl')._L[+b.dataset.i],f=vinfo(v.u);
 if(f.k==='ln'){open(f.src,'_blank','noopener');return}
 const w=document.createElement('div');w.className='vx';w.innerHTML='<div class="vb"><button class="vc" aria-label="বন্ধ">✕</button>'+(f.k==='mp4'?`<video controls autoplay playsinline src="${esc(f.src)}"></video>`:`<iframe allowfullscreen allow="autoplay;encrypted-media;picture-in-picture;fullscreen" src="${esc(f.src)}"></iframe>`)+`<p>${esc(v.t||'')}</p></div>`;
 w.onclick=ev=>{if(ev.target===w||ev.target.closest('.vc'))w.remove()};document.body.appendChild(w)});
// ---------- খবর ----------
let NW=LS.g('news')||[];
const dt=d=>{try{return new Date(d+'T00:00:00').toLocaleDateString('bn-BD',{day:'numeric',month:'long',year:'numeric'})}catch(e){return d}};
const ex=(t,n)=>{t=String(t).replace(/\s+/g,' ');return t.length>n?t.slice(0,n).trim()+'…':t};
function card(n,full){const sh=SITE+'?n='+n.id;
 return`<article class="nc" id="n_${n.id}">${n.i?`<div class="ni"><img data-nid="${n.id}" alt="" width="640" height="360"></div>`:''}<div class="nb"><time>${esc(dt(n.d))}</time><h3>${esc(n.t)}</h3><div class="nx${full?' o':''}">${esc(n.x).replace(/\n/g,'<br>')}</div>${n.x.length>160?`<button class="lnk nmx" data-n="${n.id}">${full?'কম দেখুন':'আরও পড়ুন'}</button>`:''}<div class="ac"><button data-s="wa" data-n="${n.id}">💬 হোয়াটসঅ্যাপ</button><button data-s="fb" data-n="${n.id}">👍 ফেসবুক</button><button data-s="cp" data-n="${n.id}">🔗 লিংক</button></div></div></article>`}
const io='IntersectionObserver'in window?new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){io.unobserve(en.target);nimg(en.target)}}),{rootMargin:'200px'}):null;
async function nimg(el){const id=el.dataset.nid;let s=null;try{s=sessionStorage.getItem('ni_'+id)}catch(e){}
 if(!s){try{const r=await (await fetch(U+'?a=nimg&id='+id)).json();if(r.ok)s=r.img}catch(e){}if(s)try{sessionStorage.setItem('ni_'+id,s)}catch(e){}}
 if(s)el.src=s;else el.parentNode.remove()}
function news(){const L=NW;const nl=$('nl'),h=$('nws');
 if(nl){nl.innerHTML=L.length?L.map(n=>card(n)).join(''):'<div class="card" style="text-align:center">📰 শীঘ্রই খবর ও ঘোষণা দেওয়া হবে।</div>';nl.querySelectorAll('img[data-nid]').forEach(i=>io?io.observe(i):nimg(i))}
 if(h){h.hidden=!L.length;h.innerHTML=L.length?`<div class="card"><h2>📰 সর্বশেষ খবর</h2>${L.slice(0,3).map(n=>`<button class="nh" data-go="news" data-nid="${n.id}"><time>${esc(dt(n.d))}</time><b>${esc(n.t)}</b><span>${esc(ex(n.x,70))}</span></button>`).join('')}<button class="lnk" data-go="news">সব খবর দেখুন →</button></div>`:''}}
document.addEventListener('click',e=>{
 const m=e.target.closest('button.nmx');if(m){const c=$('n_'+m.dataset.n),x=c.querySelector('.nx');x.classList.toggle('o');m.textContent=x.classList.contains('o')?'কম দেখুন':'আরও পড়ুন';return}
 const s=e.target.closest('[data-s]');if(s){const n=NW.find(x=>x.id===s.dataset.n);if(!n)return;const link=SITE+'?n='+n.id;
  if(s.dataset.s==='wa')window.shWA?shWA('📰 '+n.t+'\n'+ex(n.x,140),link):0;
  if(s.dataset.s==='fb')window.shFB?shFB(link):0;
  if(s.dataset.s==='cp'){navigator.clipboard&&navigator.clipboard.writeText(link).then(()=>{s.textContent='✓ কপি হয়েছে';setTimeout(()=>s.textContent='🔗 লিংক',1500)});hit('share',1)}return}
 const nh=e.target.closest('.nh');if(nh){setTimeout(()=>{const c=$('n_'+nh.dataset.nid);c&&c.scrollIntoView({behavior:'smooth',block:'start'})},350)}});
function loadNews(){if(!U)return news();news();fetch(U+'?a=news').then(r=>r.json()).then(r=>{if(r&&r.ok){NW=r.news||[];LS.s('news',NW);news();deep()}}).catch(()=>{})}
function deep(){const m=location.search.match(/[?&]n=(n\d+)/);if(!m||deep.d)return;const c=$('n_'+m[1]);if(!c)return;deep.d=1;SB.go&&SB.go('news');setTimeout(()=>{c.scrollIntoView({behavior:'smooth'});const x=c.querySelector('.nx');x&&x.classList.add('o')},400)}
// ---------- পাবলিক কনটেন্ট প্রয়োগ ----------
function apply(P){const ct=(P&&P.content)||{};
 const tk=(Array.isArray(ct.ticker)?ct.ticker:[]).slice(),nt=P&&P.settings&&P.settings.notice;if(tk.length&&nt)tk.unshift(nt);TK=tk;tick();
 if(Array.isArray(ct.pledges)&&ct.pledges.length){CFG.pledges=ct.pledges.map(p=>({t:p.t,d:p.d,pts:p.pts||[],more:p.more||[]}));mf();SB.pledges&&SB.pledges()}
 if(Array.isArray(ct.videos)){CV=ct.videos;vids()}}
window.SBpub=apply;
vids();if(SB.PUB)apply(SB.PUB());loadNews();
})();
