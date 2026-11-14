// অ্যাডমিন: খবর, ভিডিও, কনটেন্ট (ticker/ইশতেহার), পরিসংখ্যান
(function(){
const B=()=>$('abd'),I=(a,b)=>`<input style="${IS}" ${a}>`,TA=(a,v,r)=>`<textarea style="${IS};min-height:${r||70}px;resize:vertical" ${a}>${esc(v||'')}</textarea>`;
const ok=m=>toast(m||'সংরক্ষিত ✓'),ld=()=>{B().innerHTML='<p class="m">লোড হচ্ছে…</p>'};
const lines=t=>String(t||'').split('\n').map(x=>x.trim()).filter(Boolean);
// ===== কনটেন্ট: ticker + ইশতেহার =====
let CN={ticker:[],pledges:[]};
window.admCn=async function(){ld();const r=await admApi({action:'st_get'}),c=r.content||{};
 CN.ticker=c.ticker||[];CN.pledges=(c.pledges&&c.pledges.length?c.pledges:CFG.pledges).map(p=>({t:p.t||'',d:p.d||'',pts:(p.pts||[]).slice(),more:(p.more||[]).slice()}));cnShow()};
function cnShow(){B().innerHTML=`<div class="h2" style="margin-top:0">📢 উপরের ঘোষণা (ticker)</div><p class="m" style="margin:0 0 6px">প্রতি লাইনে একটি বার্তা লিখুন। একাধিক হলে ৫ সেকেন্ড পরপর বদলাবে। ফাঁকা রাখলে "সেটিং" ট্যাবের নোটিশ দেখাবে।</p>${TA('id="ctk"',CN.ticker.join('\n'),90)}
<div class="h2" style="margin-top:16px">📜 ইশতেহার</div><p class="m" style="margin:0 0 6px">এখানে বদলালে হোমের প্রতিশ্রুতি কার্ড, ইশতেহার পেজ ও চ্যাট — সব জায়গায় বদলাবে।</p><div id="cpl">${CN.pledges.map((p,i)=>`<article class="card r" style="padding:12px;margin-top:10px"><div class="sub"><b>প্রতিশ্রুতি ${a2b(i+1)}</b></div><label class="m">শিরোনাম${I(`data-i="${i}" data-k="t" value="${esc(p.t)}"`)}</label><label class="m">সংক্ষিপ্ত বিবরণ${TA(`data-i="${i}" data-k="d"`,p.d,70)}</label><label class="m">মূল পয়েন্ট (প্রতি লাইনে একটি)${TA(`data-i="${i}" data-k="pts"`,p.pts.join('\n'),90)}</label><label class="m">বিস্তারিত অনুচ্ছেদ (প্রতি লাইনে একটি অনুচ্ছেদ)${TA(`data-i="${i}" data-k="more"`,p.more.join('\n'),110)}</label><button class="pri" data-del="${i}" style="background:#b3261e;margin-top:6px">🗑 মুছুন</button></article>`).join('')}</div>
<button class="pri" id="cpa" style="margin-top:10px">➕ নতুন প্রতিশ্রুতি</button><button class="pri" id="cps" style="margin-top:8px">💾 সংরক্ষণ করুন</button><button class="pri" id="cpr" style="margin-top:8px;background:#667">↩ মূল লেখায় ফিরুন</button><p class="err" id="ae"></p>`;
 $('cpl').oninput=e=>{const t=e.target,i=t.dataset.i;if(i==null)return;const k=t.dataset.k;CN.pledges[+i][k]=(k==='pts'||k==='more')?lines(t.value):t.value};
 $('cpl').onclick=e=>{const b=e.target.closest('[data-del]');if(b&&confirm('এই প্রতিশ্রুতি মুছবেন?')){CN.ticker=lines($('ctk').value);CN.pledges.splice(+b.dataset.del,1);cnShow()}};
 $('cpa').onclick=()=>{CN.ticker=lines($('ctk').value);CN.pledges.push({t:'',d:'',pts:[],more:[]});cnShow();scrollTo(0,document.body.scrollHeight)};
 $('cps').onclick=async()=>{CN.ticker=lines($('ctk').value);const P=CN.pledges.filter(p=>p.t.trim());if(!P.length)return admSay('অন্তত একটি প্রতিশ্রুতির শিরোনাম দিন।');admSay('সংরক্ষণ হচ্ছে…');
  try{const a=await admApi({action:'ct_save',key:'ticker',value:CN.ticker}),b=await admApi({action:'ct_save',key:'pledges',value:P});if(a.ok&&b.ok){admSay('');ok()}else admSay(a.err||b.err)}catch(x){admSay(x.message)}};
 $('cpr').onclick=async()=>{if(!confirm('অ্যাডমিনের সব ইশতেহার মুছে মূল (ফাইলের) লেখায় ফিরবেন?'))return;try{const b=await admApi({action:'ct_save',key:'pledges',value:[]});if(b.ok){ok('মূল লেখায় ফিরেছে');admCn()}}catch(x){admSay(x.message)}}}
// ===== ভিডিও =====
let VD=[];
window.admVid=async function(){ld();const r=await admApi({action:'st_get'});VD=((r.content||{}).videos||[]).map(v=>({t:v.t||'',u:v.u||'',c:v.c||''}));vdShow()};
function vdShow(){B().innerHTML=`<div class="h2" style="margin-top:0">🎬 ভিডিও (গ্যালারি পেজে দেখাবে)</div><p class="m" style="margin:0 0 6px">ইউটিউব, ফেসবুক ভিডিও বা সরাসরি .mp4 লিংক বসান। ফেসবুক ভিডিও অবশ্যই "Public" হতে হবে।</p><div id="vdl">${VD.map((v,i)=>`<article class="card r" style="padding:12px;margin-top:10px"><label class="m">শিরোনাম${I(`data-i="${i}" data-k="t" value="${esc(v.t)}" placeholder="যেমন: প্রার্থীর বার্তা"`)}</label><label class="m">লিংক${I(`data-i="${i}" data-k="u" value="${esc(v.u)}" placeholder="https://youtu.be/…"`)}</label><label class="m">ক্যাটাগরি (ঐচ্ছিক)${I(`data-i="${i}" data-k="c" value="${esc(v.c)}" placeholder="যেমন: জনসভা"`)}</label><button class="pri" data-del="${i}" style="background:#b3261e;margin-top:6px">🗑 মুছুন</button></article>`).join('')||'<p class="m">এখনো ভিডিও নেই।</p>'}</div>
<button class="pri" id="vda" style="margin-top:10px">➕ নতুন ভিডিও</button><button class="pri" id="vds" style="margin-top:8px">💾 সংরক্ষণ করুন</button><p class="err" id="ae"></p>`;
 $('vdl').oninput=e=>{const t=e.target;if(t.dataset.i!=null)VD[+t.dataset.i][t.dataset.k]=t.value};
 $('vdl').onclick=e=>{const b=e.target.closest('[data-del]');if(b&&confirm('মুছে ফেলবেন?')){VD.splice(+b.dataset.del,1);vdShow()}};
 $('vda').onclick=()=>{VD.push({t:'',u:'',c:''});vdShow();scrollTo(0,document.body.scrollHeight)};
 $('vds').onclick=async()=>{const L=VD.filter(v=>v.u.trim());admSay('সংরক্ষণ হচ্ছে…');try{const r=await admApi({action:'ct_save',key:'videos',value:L});if(r.ok){VD=L;admSay('');ok()}else admSay(r.err)}catch(x){admSay(x.message)}}}
// ===== খবর =====
let NWL=[],NE=null,NIMG;
window.admNews=async function(){ld();const r=await admApi({action:'nw_get'});NWL=r.news||[];nwList()};
const dts=d=>{try{return new Date(d+'T00:00:00').toLocaleDateString('bn-BD',{day:'numeric',month:'long',year:'numeric'})}catch(e){return d}};
function nwList(){B().innerHTML=`<div class="h2" style="margin-top:0">📰 খবর ও ঘোষণা · ${a2b(NWL.length)}টি</div><button class="pri" id="nwa">➕ নতুন খবর লিখুন</button><div id="nwl">${NWL.map(n=>`<article class="card r" style="padding:12px;margin-top:10px"><div class="sub">${esc(dts(n.d))}${n.i?' · 🖼️ ছবিসহ':''}</div><div class="nm">${esc(n.t)}</div><p class="m" style="margin:4px 0">${esc(n.x.slice(0,110))}${n.x.length>110?'…':''}</p><div class="ac" style="padding:0"><button data-e="${n.id}">✏️ সম্পাদনা</button><button data-d="${n.id}">🗑 মুছুন</button></div></article>`).join('')||'<p class="m" style="margin-top:10px">এখনো কোনো খবর নেই।</p>'}</div>`;
 $('nwa').onclick=()=>nwEdit({id:'',d:new Date().toISOString().slice(0,10),t:'',x:'',i:false});
 $('nwl').onclick=async e=>{const ed=e.target.closest('[data-e]'),dl=e.target.closest('[data-d]');
  if(ed)nwEdit(NWL.find(n=>n.id===ed.dataset.e));
  if(dl&&confirm('এই খবর মুছে ফেলবেন?')){try{const r=await admApi({action:'nw_del',id:dl.dataset.d});if(r.ok){ok('মুছে ফেলা হয়েছে');admNews()}else toast(r.err)}catch(x){toast(x.message)}}}}
async function nwEdit(n){NE=Object.assign({},n);NIMG=undefined;
 B().innerHTML=`<div class="h2" style="margin-top:0">${n.id?'✏️ খবর সম্পাদনা':'📝 নতুন খবর'}</div><label class="m">তারিখ${I(`type="date" id="nd" value="${esc(n.d)}"`)}</label><label class="m">শিরোনাম${I(`id="nt2" value="${esc(n.t)}" maxlength="200"`)}</label><label class="m">লেখা${TA('id="nx" maxlength="4000"',n.x,170)}</label>
<label class="m">ছবি (ঐচ্ছিক — নিজে ছোট হয়ে যাবে)<input type="file" id="nf" accept="image/*" style="${IS}"></label><div id="np" style="margin:6px 0">${n.i?'<p class="m">আগের ছবি থাকবে। নতুন ছবি দিলে বদলে যাবে।</p>':''}</div>${n.i?'<button class="pri" id="nrm" style="background:#667;margin-bottom:8px">❌ ছবি সরান</button>':''}
<button class="pri" id="nsv">💾 প্রকাশ করুন</button><button class="pri" id="ncl" style="margin-top:8px;background:#667">← ফিরে যান</button><p class="err" id="ae"></p>`;
 $('ncl').onclick=admNews;if($('nrm'))$('nrm').onclick=()=>{NIMG='';$('np').innerHTML='<p class="m">ছবি সরানো হবে (সংরক্ষণ করলে)।</p>'};
 $('nf').onchange=async e=>{const f=e.target.files[0];if(!f)return;$('np').innerHTML='<p class="m">ছবি প্রস্তুত হচ্ছে…</p>';try{NIMG=await shrink(f);$('np').innerHTML=`<img src="${NIMG}" style="max-width:100%;border-radius:10px"><p class="m">${a2b(Math.round(NIMG.length/1024))} KB</p>`}catch(x){NIMG=undefined;$('np').innerHTML='<p class="err">ছবি পড়া যায়নি।</p>'}};
 $('nsv').onclick=async()=>{const t=$('nt2').value.trim();if(!t)return admSay('শিরোনাম লিখুন।');admSay('প্রকাশ হচ্ছে…');
  const b={action:'nw_put',id:NE.id,d:$('nd').value,t,x:$('nx').value};if(NIMG!==undefined)b.img=NIMG;
  try{const r=await admApi(b);if(r.ok){ok('প্রকাশিত ✓');admNews()}else admSay(r.err)}catch(x){admSay(x.message)}}}
function shrink(f){return new Promise((res,rej)=>{const u=URL.createObjectURL(f),i=new Image();i.onerror=rej;i.onload=()=>{URL.revokeObjectURL(u);
 for(const W of [640,560,480,400,340]){const k=Math.min(1,W/i.width),c=document.createElement('canvas');c.width=Math.round(i.width*k);c.height=Math.round(i.height*k);const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(i,0,0,c.width,c.height);
  for(const q of [.7,.6,.5,.4,.3]){const s=c.toDataURL('image/jpeg',q);if(s.length<=44000)return res(s)}}rej(new Error('big'))};i.src=u})}
// ===== পরিসংখ্যান =====
const LB={visit:'মোট ভিজিট',home:'হোম',make:'ব্যানার',manifesto:'ইশতেহার',drug:'মাদকবিরোধী',gallery:'গ্যালারি',news:'খবর',ward:'ওয়ার্ড',guide:'গাইড',svc:'সেবা',form:'মতামত',chat:'চ্যাট খোলা',slip:'স্লিপ বের হয়েছে',share:'শেয়ার',install:'অ্যাপ ইনস্টল'};
window.admSx=async function(){ld();const r=await admApi({action:'sx_get'}),R=r.rows||[],days={},tot={},td=new Date().toISOString().slice(0,10),tod={};
 R.forEach(x=>{tot[x[1]]=(tot[x[1]]||0)+x[2];if(x[0]===td)tod[x[1]]=x[2];if(x[1]==='visit')days[x[0]]=x[2]});
 const D=[];for(let i=13;i>=0;i--){const d=new Date(Date.now()-i*864e5).toISOString().slice(0,10);D.push([d,days[d]||0])}
 const mx=Math.max(1,...D.map(x=>x[1])),w=300/14;
 const svg=`<svg viewBox="0 0 300 110" style="width:100%;height:auto"><g>${D.map((x,i)=>{const h=Math.round(x[1]/mx*80);return`<rect x="${i*w+3}" y="${90-h}" width="${w-6}" height="${h}" rx="3" fill="var(--c,#0a5c43)"><title>${x[0]}: ${x[1]}</title></rect><text x="${i*w+w/2}" y="104" font-size="8" text-anchor="middle" fill="currentColor" opacity=".6">${a2b(+x[0].slice(8))}</text>${x[1]?`<text x="${i*w+w/2}" y="${86-h}" font-size="8" text-anchor="middle" fill="currentColor">${a2b(x[1])}</text>`:''}`}).join('')}</g></svg>`;
 const big=(k)=>`<div class="card r" style="padding:12px;text-align:center"><div class="m">${LB[k]}</div><b style="font-size:26px">${a2b(tot[k]||0)}</b><div class="m">আজ ${a2b(tod[k]||0)}</div></div>`;
 const pg=['home','make','manifesto','drug','gallery','news','ward','guide','svc','form'].map(k=>[k,tot[k]||0]).sort((a,b)=>b[1]-a[1]),pm=Math.max(1,pg[0][1]);
 B().innerHTML=`<div class="h2" style="margin-top:0">📊 সাইটের পরিসংখ্যান (গত ৬০ দিন)</div><p class="m" style="margin:0 0 8px">শুধু সংখ্যা গোনা হয় — কারও নাম, নম্বর বা ব্যক্তিগত তথ্য জমা হয় না। একই ব্রাউজারে একই অংশ একবারই গোনা হয় (স্লিপ ও শেয়ার বাদে)।</p>
<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px">${['visit','slip','chat','share'].map(big).join('')}</div>
<div class="h2" style="margin-top:16px">গত ১৪ দিনের ভিজিট</div>${svg}
<div class="h2" style="margin-top:16px">কোন পেজ বেশি দেখা হয়েছে</div>${pg.map(x=>`<div style="margin:8px 0"><div style="display:flex;justify-content:space-between;font-size:14px"><span>${LB[x[0]]}</span><b>${a2b(x[1])}</b></div><div style="height:8px;border-radius:99px;background:var(--ln,#dde5e0);overflow:hidden"><div style="height:100%;width:${Math.round(x[1]/pm*100)}%;background:var(--c,#0a5c43)"></div></div></div>`).join('')}
<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:12px">${['install'].map(big).join('')}</div><button class="pri" id="sxr" style="margin-top:12px">🔄 নতুন করে আনুন</button>`;
 $('sxr').onclick=admSx}
})();
