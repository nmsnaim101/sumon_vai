// নতুন ফিচার: কাউন্টডাউন, কর্মসূচি, প্রতিশ্রুতি স্লাইডার, ওয়ার্ড কার্ড, সমস্যা ট্র্যাকার, চ্যাটবট, ইনস্টল, শেয়ার
(function(){
const SITE='https://sumonchairman.vercel.app/',U=CFG.formUrl||'',q=s=>document.querySelector(s),go=t=>{const b=q('nav button[data-t="'+t+'"]');if(b){b.click();scrollTo({top:0,behavior:'smooth'})}};
const MON=['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
// শুধু সংখ্যা (ব্যক্তিগত তথ্য নয়): ওয়ার্ডভিত্তিক মোট ভোটার ও এলাকা
const WD=[[5390,'শ্রীধর পুর, আলী হাসিম পুর, আলাদি নগর (উত্তর)'],[4746,'রাজুল্লা পুর, আলাদি নগর (মধ্য)'],[4472,'আলাদি নগর (দক্ষিণ)'],[5051,'ছোট হোসেন পুর, উত্তর কেশব পুর, দিলিল পুর, দক্ষিণ কেশব পুর'],[3815,'বানা বাড়িয়া, হাফিজ পুর, টংগীর পাড়'],[4418,'আলাম পুর, মনপুরা'],[4200,'কৃষ্ণরামপুর, ভবানীপুর, রাজেন্দ্রপুর, বিজয়পুর'],[3635,'মাধব সিং, তেতৈয়া, মজিদ পুর, ছোট মেহেদীপুর, দেবী চরণ পুর'],[3613,'বাকীপুর, নানুপুর, গণি হাকিম পুর']];
const TOT=WD.reduce((a,w)=>a+w[0],0),nf=n=>bn(String(n).replace(/\B(?=(\d{3})+(?!\d))/g,','));
let PUB={events:[],settings:{}};try{PUB=JSON.parse(localStorage.getItem('pub'))||PUB}catch(e){}
const S=()=>PUB.settings||{};
const shWA=(t,u)=>open('https://wa.me/?text='+encodeURIComponent(t+'\n'+(u||SITE)),'_blank','noopener'),shFB=u=>open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(u||SITE),'_blank','noopener');
window.shWA=shWA;window.shFB=shFB;

// ---------- হোম: নোটিশ, কাউন্টডাউন ----------
function cdDraw(){const e=$('cd');if(!e)return;const vd=S().voteDate||CFG.voteDate,nt=S().notice;
 $('nt').style.display=nt?'':'none';$('nt').textContent=nt?'📢 '+nt:'';
 const t=vd?new Date(vd).getTime():NaN;
 if(!(t>0)){e.innerHTML='<div class="cdm">ভোটের তারিখ শিগগিরই জানানো হবে</div>';return}
 const d=t-Date.now();
 if(d<=0){e.innerHTML='<div class="cdm">ভোটের সময় এসে গেছে — ধানের শীষে ভোট দিন</div>';return}
 const D=Math.floor(d/864e5),H=Math.floor(d%864e5/36e5),M=Math.floor(d%36e5/6e4),Sx=Math.floor(d%6e4/1e3),z=n=>bn(String(n).padStart(2,'0'));
 e.innerHTML=`<div class="cdl">ভোটের আর</div><div class="cdn"><b>${bn(D)}</b><i>দিন</i></div><div class="cdt2"><span><b>${z(H)}</b>ঘণ্টা</span><span><b>${z(M)}</b>মিনিট</span><span><b>${z(Sx)}</b>সেকেন্ড</span></div>`}
setInterval(cdDraw,1000);

// ---------- প্রতিশ্রুতি স্লাইডার ----------
const IC=['🛡️','🤝','🌾','📍','📋'];
function pledges(){const el=$('pl');if(!el)return;
 el.className='sl';el.innerHTML=CFG.pledges.map((p,i)=>`<article class="pc"><div class="pi">${IC[i%IC.length]}</div><h3>${esc(p.t)}</h3><p>${esc(p.d)}</p><ul>${(p.pts||[]).slice(0,3).map(x=>`<li>${esc(x)}</li>`).join('')}</ul><button class="lnk" data-go="manifesto">বিস্তারিত ইশতেহার →</button></article>`).join('');
 const dt=document.createElement('div');dt.className='dots';dt.innerHTML=CFG.pledges.map((_,i)=>`<i class="${i?'':'on'}"></i>`).join('');el.after(dt);
 el.onscroll=()=>{const i=Math.round(el.scrollLeft/(el.firstElementChild.offsetWidth+12));[...dt.children].forEach((d,k)=>d.classList.toggle('on',k==i))};
 const sm=el.parentNode.querySelector('small');if(sm)sm.textContent='পাশে সোয়াইপ করুন ➜'}

// ---------- কর্মসূচি ----------
function evs(){const el=$('ev');if(!el)return;const t0=new Date();t0.setHours(0,0,0,0);
 const L=(PUB.events||[]).filter(e=>e.d&&new Date(e.d+'T00:00:00')>=t0).sort((a,b)=>a.d.localeCompare(b.d));
 el.innerHTML=L.length?L.map(e=>{const p=e.d.split('-');return `<div class="ev"><div class="dd"><b>${bn(+p[2])}</b>${MON[+p[1]-1]||''}</div><div class="ei"><b>${esc(e.n)}</b><span>${e.t?'🕒 '+esc(e.t):''}${e.p?' · 📍 '+esc(e.p):''}</span>${e.x?'<small>'+esc(e.x)+'</small>':''}</div><button class="sh" data-ev="${esc(e.id)}" aria-label="শেয়ার">📤</button></div>`}).join(''):'<p class="m">নতুন কর্মসূচি শিগগিরই জানানো হবে।</p>';
 el.onclick=ev=>{const b=ev.target.closest('[data-ev]');if(!b)return;const e=L.find(x=>x.id==b.dataset.ev);if(e){const p=e.d.split('-');shWA(`📅 ${bn(+p[2])} ${MON[+p[1]-1]} · ${e.t||''}\n📍 ${e.p||''}\n${e.n}\n— মুরাদ জিয়াউর রহমান (সুমন), ধানের শীষ`)}}}

// ---------- ওয়ার্ড ----------
let WSEL=0;
const lst=s=>String(s||'').split(/[\n,;،]+/).map(x=>x.trim()).filter(Boolean);
function wards(){const el=$('wg');if(!el)return;const mx=Math.max(...WD.map(w=>w[0]));
 el.innerHTML=WD.map((w,i)=>`<button class="wt${WSEL==i+1?' on':''}" data-w="${i+1}" style="--k:${(w[0]/mx).toFixed(2)}"><small>ওয়ার্ড</small><b>${bn(i+1)}</b><span>${nf(w[0])} ভোটার</span></button>`).join('');
 const d=$('wdt');if(!WSEL){d.innerHTML='<p class="m">কোনো ওয়ার্ডে ট্যাপ করুন — সেই ওয়ার্ডের ভোটার সংখ্যা, সমস্যা ও কাজ দেখাবে।</p>';return}
 const w=WD[WSEL-1],p=lst(S()['ward'+WSEL+'p']),k=lst(S()['ward'+WSEL+'w']);
 d.innerHTML=`<h3>ওয়ার্ড ${bn(WSEL)}</h3><div class="wst"><div><b>${nf(w[0])}</b>মোট ভোটার</div><div><b>${bn(Math.round(w[0]/TOT*100))}%</b>ইউনিয়নের মধ্যে</div></div><p class="m">📍 ${esc(w[1])}</p><h4>⚠️ প্রধান সমস্যা</h4>${p.length?'<ul>'+p.map(x=>`<li>${esc(x)}</li>`).join('')+'</ul>':'<p class="m">তথ্য শিগগিরই যোগ হবে।</p>'}<h4>✅ কাজ ও পরিকল্পনা</h4>${k.length?'<ul>'+k.map(x=>`<li>${esc(x)}</li>`).join('')+'</ul>':'<p class="m">তথ্য শিগগিরই যোগ হবে।</p>'}<button class="btn" id="wrp">এই ওয়ার্ডের সমস্যা জানান</button><button class="btn" id="wsh" style="background:#25d366;color:#07240f">💬 শেয়ার করুন</button>`;
 $('wrp').onclick=()=>{$('pw').value='ওয়ার্ড '+bn(WSEL);$('pw').value=[...$('pw').options].find(o=>o.text==='ওয়ার্ড '+WSEL)?'ওয়ার্ড '+WSEL:'';tab('rp');$('pm').scrollIntoView({behavior:'smooth',block:'center'})};
 $('wsh').onclick=()=>shWA(`ওয়ার্ড ${bn(WSEL)} (০৬নং রাজগঞ্জ ইউনিয়ন) — ভোটার ${nf(w[0])} জন। মুরাদ জিয়াউর রহমান (সুমন), ধানের শীষ।`)}

// ---------- সমস্যা ট্র্যাকার ----------
function tab(k){q('#pt .pt-r').hidden=k!='rp';q('#pt .pt-t').hidden=k!='tr';document.querySelectorAll('#ptb button').forEach(b=>b.classList.toggle('on',b.dataset.k==k))}
function prob(){
 $('ptb').onclick=e=>{const b=e.target.closest('button');if(b)tab(b.dataset.k)};
 $('pw').innerHTML='<option value="">ওয়ার্ড (ঐচ্ছিক)</option>'+[1,2,3,4,5,6,7,8,9].map(n=>`<option>ওয়ার্ড ${n}</option>`).join('');
 $('ps').onclick=async()=>{const n=$('pn').value.trim(),m=$('pm').value.trim(),o=$('po');if($('ph2').value)return;if(!U)return o.textContent='এই সুবিধা এখনো চালু হয়নি।';if(!n||!m)return o.textContent='নাম ও সমস্যা লিখুন।';
  $('ps').disabled=1;o.textContent='জমা হচ্ছে…';
  try{const r=await(await fetch(U,{method:'POST',body:JSON.stringify({action:'prob',name:n,phone:$('pp').value.trim(),ward:$('pw').value,subject:$('pj').value,msg:m})})).json();
   if(!r.ok)o.textContent=r.err||'জমা হয়নি।';else{o.innerHTML=`<div class="idb">✅ আপনার সমস্যা জমা হয়েছে<br>আপনার নম্বর: <b>${bn(r.id)}</b><small>এই নম্বর দিয়ে পরে "অবস্থা দেখুন" থেকে জানতে পারবেন। নম্বরটি লিখে বা স্ক্রিনশট করে রাখুন।</small><button class="btn" id="pcp">📋 নম্বর কপি করুন</button></div>`;$('pcp').onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(r.id);toast('কপি হয়েছে ✓')};try{localStorage.setItem('myProb',r.id)}catch(e){}$('pm').value='';$('tn').value=r.id;boom()}}
  catch(e){o.textContent='জমা হয়নি, ইন্টারনেট দেখে আবার চেষ্টা করুন।'}$('ps').disabled=0};
 try{const m=localStorage.getItem('myProb');if(m)$('tn').value=m}catch(e){}
 $('tg').onclick=async()=>{const id=$('tn').value.replace(/[^\d০-৯]/g,'').replace(/[০-৯]/g,c=>'০১২৩৪৫৬৭৮৯'.indexOf(c)),o=$('tr');if(!id)return o.textContent='নম্বর লিখুন।';if(!U)return o.textContent='এই সুবিধা এখনো চালু হয়নি।';o.textContent='খোঁজা হচ্ছে…';
  try{const r=await(await fetch(U+'?a=track&id='+id)).json();if(!r.ok)return o.textContent=r.err;const st=['নতুন','চলমান','সমাধান হয়েছে'],k=Math.max(0,st.indexOf(r.status));
   o.innerHTML=`<div class="idb"><b>নম্বর ${bn(id)}</b> · ${esc(r.subject)}<div class="stp">${st.map((s,i)=>`<span class="${i<=k?'on':''}${i==k?' cur':''}"><em>${i<k||(i==2&&k==2)?'✅':bn(i+1)}</em><small>${s=='নতুন'?'গৃহীত':s}</small></span>`).join('')}</div><b>${r.status=='সমাধান হয়েছে'?'🎉 সমাধান হয়েছে':r.status=='চলমান'?'⏳ কাজ চলছে':'📝 গৃহীত হয়েছে, দেখা হচ্ছে'}</b>${r.note?'<p>'+esc(r.note)+'</p>':''}</div>`}
  catch(e){o.textContent='অবস্থা জানা যায়নি, আবার চেষ্টা করুন।'}}}

// ---------- ইনস্টল ----------
let DP=null;addEventListener('beforeinstallprompt',e=>{e.preventDefault();DP=e});
const isApp=()=>matchMedia('(display-mode:standalone)').matches||navigator.standalone;
function inst(){const b=$('inst');if(!b)return;if(isApp()){b.style.display='none';return}
 b.onclick=async()=>{if(DP){DP.prompt();await DP.userChoice;DP=null;return}
  const ios=/iphone|ipad|ipod/i.test(navigator.userAgent),m=document.createElement('div');m.id='lb';m.style.cssText+=';padding:20px';
  m.innerHTML=`<div class="card" style="max-width:340px;margin:auto;text-align:left" onclick="event.stopPropagation()"><h2>📲 ফোনে ইনস্টল করুন</h2>${ios?'<ol><li>নিচে <b>Safari-র শেয়ার (⬆️)</b> বোতামে চাপুন</li><li><b>"Add to Home Screen"</b> চাপুন</li><li><b>Add</b> চাপুন</li></ol>':'<ol><li>ব্রাউজারের ওপরের <b>⋮ মেনু</b> খুলুন</li><li><b>"Install app" / "Add to Home screen"</b> চাপুন</li><li><b>Install</b> চাপুন</li></ol>'}<small>ইনস্টল করলে ফোনের হোম স্ক্রিনে অ্যাপের মতো আইকন থাকবে, ইন্টারনেট কম থাকলেও চলবে।</small><button class="btn" onclick="this.closest('#lb').remove()">বুঝেছি</button></div>`;
  m.onclick=()=>m.remove();document.body.appendChild(m)}}
addEventListener('appinstalled',()=>{const b=$('inst');if(b)b.style.display='none'});

// ---------- চ্যাটবটের জন্য সেতু (js/bot.js) ----------
const nxt=()=>(PUB.events||[]).filter(e=>e.d&&new Date(e.d+'T23:59:59')>=new Date()).sort((a,b)=>a.d.localeCompare(b.d))[0];
window.SB={go,tab:t=>tab(t),S,nxt,MON,TOT,WD,U,SITE};
setTimeout(()=>{const o=$('cb');o&&o.classList.add('pu')},4000);

// ---------- শেয়ার: গ্যালারি ----------
function galShare(){const gl=$('gl');if(!gl)return;const row=document.createElement('div');row.id='gsh';row.className='row';gl.before(row);
 const draw=()=>{if(!GC){row.innerHTML='<button id="gsa">💬 গ্যালারি হোয়াটসঅ্যাপে শেয়ার</button><button id="gsf">📘 ফেসবুকে শেয়ার</button>'}else{row.innerHTML='<button id="gsa">💬 এই ক্যাটাগরি হোয়াটসঅ্যাপে শেয়ার</button><button id="gsf">📘 ফেসবুকে শেয়ার</button>'}
  const u=SITE+(GC?'?c='+GC:'?g=1'),nm=GC?((GD.cats||[]).find(c=>c.id==GC)||{}).name:'ছবির গ্যালারি';
  $('gsa').onclick=()=>shWA('📷 '+(nm||'গ্যালারি')+' — মুরাদ জিয়াউর রহমান (সুমন), ০৬নং রাজগঞ্জ ইউনিয়ন',u);$('gsf').onclick=()=>shFB(u)};
 new MutationObserver(()=>{if(GD&&!row.dataset.k||row.dataset.k!=GC){row.dataset.k=GC;draw()}}).observe(gl,{childList:true});
 // লাইটবক্সে ছবি শেয়ার
 new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.id!=='lb'||n.querySelector('.lbs')||!n.querySelector('img'))return;
  const im=n.querySelector('img'),sr=im.src;if(!/^data:|^https?:|\.jpg|\.png|\.jpeg|\.webp/.test(sr))return;
  let cat=0,cap='';(GD.cats||[]).forEach(c=>(c.photos||[]).forEach(p=>{p=typeof p=='string'?{src:p}:p;if(p.src===sr||p.full===sr){cat=c.id;cap=p.cap||''}}));
  const u=SITE+(cat?'?c='+cat:''),tx=(cap?cap+' — ':'')+'মুরাদ জিয়াউর রহমান (সুমন), ০৬নং রাজগঞ্জ ইউনিয়ন';
  const bx=document.createElement('div');bx.className='lbs';bx.innerHTML='<button data-s="f">🖼️ ছবিসহ পাঠান</button><button data-s="w">💬 হোয়াটসঅ্যাপ</button><button data-s="b">📘 ফেসবুক</button>';
  bx.onclick=async e=>{e.stopPropagation();const k=e.target.dataset.s;if(k=='w')shWA(tx,u);if(k=='b')shFB(u);
   if(k=='f'){try{const bl=await(await fetch(sr)).blob(),f=new File([bl],'sumon.jpg',{type:bl.type||'image/jpeg'});if(navigator.canShare&&navigator.canShare({files:[f]}))await navigator.share({files:[f],text:tx+'\n'+u});else shWA(tx,u)}catch(x){}}};
  n.appendChild(bx)}))).observe(document.body,{childList:true});
 // ?c= লিংক খুললে সেই ক্যাটাগরি দেখাবে
 const c=new URLSearchParams(location.search),w=c.get('c'),g=c.get('g');
 if(w||g){go('gallery');const t=setInterval(()=>{if(GD){clearInterval(t);if(w){GC=+w;gShow()}}},300)}}

// ---------- হোমের বোতাম ও ক্লিক ----------
document.addEventListener('click',e=>{const g=e.target.closest('[data-go]');if(g){go(g.dataset.go);if(g.dataset.tab)tab(g.dataset.tab)}
 const w=e.target.closest('.wt');if(w){WSEL=+w.dataset.w;wards();$('wdt').scrollIntoView({behavior:'smooth',block:'nearest'})}
 const r=e.target.closest('.btn,.cta,.tl,.wt');if(r){r.classList.remove('rp');void r.offsetWidth;r.classList.add('rp')}});
$('shs').onclick=()=>shWA('🌾 ধানের শীষে ভোট দিন! মুরাদ জিয়াউর রহমান (সুমন) — ইউপি চেয়ারম্যান প্রার্থী, ০৬নং রাজগঞ্জ ইউনিয়ন। ওয়েবসাইট:');
$('shf').onclick=()=>shFB(SITE);

function all(){cdDraw();evs();wards()}
pledges();prob();inst();galShare();all();
fetch(U+'?a=pub').then(r=>r.json()).then(r=>{if(r&&r.ok){PUB=r;try{localStorage.setItem('pub',JSON.stringify(r))}catch(e){}all()}}).catch(()=>{});
})();
