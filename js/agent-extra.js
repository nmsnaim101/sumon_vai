// প্রিমিয়াম স্মার্ট কার্ড স্টাইল — সাদা ব্যাকগ্রাউন্ড, প্রিন্টের উপযোগী (শুধু ভোটার ফলাফলের কার্ড)
(()=>{const st=document.createElement('style');st.textContent=`
#rs .card.r{position:relative;border:1.5px solid #d9bf7a;border-radius:20px;color:#14211b;background:linear-gradient(160deg,#fff 0,#fff 60%,#fdfaf0 100%);box-shadow:0 10px 28px rgba(60,45,10,.12),0 0 0 4px rgba(217,191,122,.14);animation:scIn .45s both;-webkit-print-color-adjust:exact;print-color-adjust:exact}
#rs .card.r:before{content:"";position:absolute;left:0;top:0;bottom:0;width:7px;background:linear-gradient(#e6c46a,#a47a24)}
#rs .card.r:has(.av.f):before{background:linear-gradient(#f0a0c0,#c0457f)}
#rs .card.r:after{content:"";position:absolute;right:-46px;top:-46px;width:170px;height:170px;border-radius:50%;pointer-events:none;background:radial-gradient(rgba(217,191,122,.28),transparent 68%)}
@keyframes scIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
#rs .rh{padding:16px 16px 12px 24px;position:relative;z-index:1}
#rs .av{background:linear-gradient(135deg,#f3dc98,#b98a2c);color:#2a1e05;box-shadow:0 0 0 3px #fff,0 0 0 4.5px #d9bf7a}#rs .av.f{background:linear-gradient(135deg,#f9c3d8,#d86a9a);color:#4a0f2a;box-shadow:0 0 0 3px #fff,0 0 0 4.5px #e7a3c0}
#rs .nm{color:#0f2a22;font-size:19px}#rs .nm mark{background:#f6e7b4;color:#0f2a22;border-radius:4px}#rs .sub{color:#5b6b63}
#rs .tag,#rs .tag.m,#rs .tag.f{background:#fff;color:#7a5a12;border:1px solid #d9bf7a}#rs .tag.f{color:#a3346b;border-color:#e7a3c0}
#rs .vn{background:linear-gradient(90deg,#fbf7ea,#fff);border-color:#ecdca8;padding:12px 16px 12px 24px;position:relative;z-index:1}
#rs .vn:before{content:"";flex:none;width:44px;height:33px;border-radius:7px;box-shadow:inset 0 0 0 1px rgba(90,60,5,.35);background-image:linear-gradient(90deg,transparent 39%,rgba(90,60,5,.3) 40% 41%,transparent 42%),linear-gradient(transparent 49%,rgba(90,60,5,.3) 50% 51%,transparent 52%),linear-gradient(135deg,#f6dd96,#b88a2a)}
#rs .vn>div{flex:1;min-width:0}#rs .vn small{color:#6b6a5a}#rs .vn b{color:#0a4a37;letter-spacing:.12em;font-size:25px}
#rs .vn button{background:linear-gradient(135deg,#0f5b44,#0a3d2e);color:#fff;font-weight:700}
#rs dl{padding:14px 16px 14px 24px;position:relative;z-index:1}#rs dt{color:#7a7a6a}#rs dd{color:#14211b}
#rs .ac{padding:0 16px 16px 24px;position:relative;z-index:1}#rs .ac button{background:#fff;color:#0a4a37;border:1.5px solid #d9bf7a}#rs .ac button+button{background:transparent;border:1.5px solid #dcd6c0;color:#5b6b63}
#rs .mc{background:#fff;color:#0a4a37;border-color:#d9bf7a}
#rs .mg{padding:16px 16px 16px 24px;color:#5b6b63}
@media print{#rs .card.r{box-shadow:none;break-inside:avoid}#rs .ac,#rs .vn button,#rs .mc{display:none}}
`;document.head.appendChild(st)})();
// এজেন্ট পেজের "তালিকা" ট্যাব: ওয়ার্ড/এলাকা তালিকা, প্রিন্ট/PDF, Excel(CSV), একসাথে স্লিপ, পরিবার ভিউ, ভোট দেওয়ার টিক (টার্নআউট)
(()=>{const T=document.querySelector('.tb');if(!T||!$('v3'))return;
T.insertAdjacentHTML('beforeend','<button id="t4">তালিকা</button>');
$('v3').insertAdjacentHTML('afterend','<section id="v4" class="card" hidden style="margin-top:-30px;position:relative"></section>');
document.body.insertAdjacentHTML('beforeend','<style>.sl{border:1.5px solid #0a5c43;border-radius:8px;padding:8px;break-inside:avoid;font-size:13px;line-height:1.5}.sg{display:grid;grid-template-columns:1fr 1fr;gap:8px}#v4 table{width:100%;font-size:13px;border-collapse:collapse}#v4 td,#pp td{padding:4px 3px;border-bottom:1px solid #ccc;vertical-align:top}#pp table{width:100%;border-collapse:collapse;font-size:12px}#pp tr{break-inside:avoid}</style>');
const S={w:'',a:'',g:'',f:'0'};let done={};try{done=JSON.parse(localStorage.getItem('tv')||'{}')}catch(e){}
const rows=()=>db.r.filter(r=>(!S.w||r.w==S.w)&&(S.a===''||r.a==S.a)&&(S.g===''||r.g==S.g)),an=r=>db.areas[r.a][0],
 row=r=>`<tr><td><input type="checkbox" data-v="${esc(r.v)}"${done[r.v]?' checked':''} aria-label="ভোট দিয়েছে"></td><td>${a2b(r.s)}</td><td>${esc(r.nm)}<br><small>পিতা: ${esc(r.fa)}</small></td><td>${a2b(r.v)}</td></tr>`;
function list(L){if(S.f=='1'){const m={};L.forEach(r=>(m[r.ad||'ঠিকানা নেই']=m[r.ad||'ঠিকানা নেই']||[]).push(r));
 return Object.entries(m).sort((x,y)=>y[1].length-x[1].length).slice(0,150).map(([k,v])=>`<details><summary>${esc(k)} (${a2b(v.length)} জন)</summary><table>${v.map(row).join('')}</table></details>`).join('')||'<div class="em">কেউ নেই।</div>'}
 return `<table>${L.slice(0,300).map(row).join('')}</table>`+(L.length>300?`<p class="m">প্রথম ৩০০ জন দেখানো হচ্ছে, প্রিন্ট ও Excel-এ সবাই আসবে।</p>`:'')}
function draw(){const ws=[...new Set(db.r.map(r=>r.w))].sort((x,y)=>x-y),L=rows(),o=(v,t,s)=>`<option value="${v}"${s?' selected':''}>${t}</option>`;
 $('v4').innerHTML=`<div class="h2" style="margin-top:0">তালিকা ও টুলস</div>
<div class="g2"><div><label for="x1">ওয়ার্ড</label><select id="x1">${o('','সব',!S.w)+ws.map(w=>o(w,a2b(w),S.w==w)).join('')}</select></div><div><label for="x2">এলাকা</label><select id="x2">${o('','সব',S.a==='')+db.areas.map((a,i)=>(!S.w||a[1]==S.w)?o(i,esc(a[0]),S.a===String(i)):'').join('')}</select></div></div>
<div class="g2"><div><label for="x3">লিঙ্গ</label><select id="x3">${o('','সবাই',S.g==='')+o('0','পুরুষ',S.g==='0')+o('1','মহিলা',S.g==='1')}</select></div><div><label for="x4">দেখুন</label><select id="x4">${o('0','তালিকা',S.f=='0')+o('1','পরিবার (ঠিকানা অনুযায়ী)',S.f=='1')}</select></div></div>
<p>মোট <b>${a2b(L.length)}</b> জন · ভোট দিয়েছে <b id="xc">${a2b(L.filter(r=>done[r.v]).length)}</b></p>
<div class="g2"><button class="pri" id="xd">⬇ PDF ডাউনলোড</button><button class="pri" id="xp">🖨️ প্রিন্ট</button></div><div class="g2"><button class="pri" id="xe">📊 Excel (CSV)</button><button class="pri" id="xs">🎫 সব স্লিপ প্রিন্ট</button></div><p class="m" id="xm" style="font-size:12.5px;margin:8px 2px 0"></p><div id="xl">${list(L)}</div>`;
 $('x1').onchange=e=>{S.w=e.target.value;S.a='';draw()};$('x2').onchange=e=>{S.a=e.target.value;draw()};$('x3').onchange=e=>{S.g=e.target.value;draw()};$('x4').onchange=e=>{S.f=e.target.value;draw()};
 $('xd').onclick=()=>pdfList(L);
 $('xp').onclick=()=>{if(L.length>6000)toast('অনেক বড় তালিকা, প্রিন্ট ধীর হতে পারে। ওয়ার্ড বা এলাকা বেছে নেওয়া ভালো');pr(`<h2>ভোটার তালিকা (${a2b(L.length)} জন)</h2><table>${L.map(r=>`<tr><td>${a2b(r.s)}</td><td>${esc(r.nm)}</td><td>${esc(r.fa)}</td><td>${a2b(r.v)}</td><td>${esc(an(r))}</td><td>${r.g?'মহিলা':'পুরুষ'}</td></tr>`).join('')}</table>`)};
 $('xs').onclick=()=>{if(L.length>1500)toast('প্রথম ১৫০০টি স্লিপ হবে, এলাকা বা ওয়ার্ড বেছে ছোট করুন');const pet=(typeof CFG!='undefined'&&CFG.pet)||'সুমন ভাই',ph=(typeof CFG!='undefined'&&CFG.photo)||'img/candidate.jpg',t=pet+'কে চেয়ারম্যান হিসেবে দেখতে চাই';pr(`<div class="sg">${L.slice(0,1500).map(r=>`<div class="sl"><b>${esc(r.nm)}</b><br>ক্রমিক ${a2b(r.s)} · ভোটার নং ${a2b(r.v)}<br>পিতা: ${esc(r.fa)}<br>ওয়ার্ড ${a2b(r.w)}, ${esc(an(r))}<br><div style="display:flex;align-items:center;gap:6px;margin-top:4px"><img src="${esc(ph)}" alt="" style="width:28px;height:28px;border-radius:50%;object-fit:cover"><b style="color:#0a5c43">${esc(t)}</b></div></div>`).join('')}</div>`)};
 $('xe').onclick=()=>{const q=v=>'"'+String(v??'').replace(/"/g,'""')+'"',c='ক্রমিক,নাম,পিতা,মাতা,ভোটার নং,জন্মতারিখ,ঠিকানা,এলাকা,ওয়ার্ড,লিঙ্গ\n'+L.map(r=>[r.s,r.nm,r.fa,r.mo,r.v,r.dob,r.ad,an(r),r.w,r.g?'মহিলা':'পুরুষ'].map(q).join(',')).join('\n'),a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\ufeff'+c],{type:'text/csv'}));a.download='voters.csv';document.body.appendChild(a);a.click();a.remove()};
 $('xl').onchange=e=>{const k=e.target.dataset.v;if(!k)return;const on=e.target.checked,r=db.r.find(x=>x.v==k);on?done[k]=1:delete done[k];try{localStorage.setItem('tv',JSON.stringify(done))}catch(x){}
  $('xc').textContent=a2b(rows().filter(x=>done[x.v]).length);
  if(r&&typeof CFG!='undefined'&&CFG.formUrl)fetch(CFG.formUrl,{method:'POST',mode:'no-cors',body:JSON.stringify({type:'ভোট দিয়েছে',name:r.nm,phone:'',ward:'ওয়ার্ড '+a2b(r.w),msg:'ক্রমিক '+a2b(r.s)+', ভোটার নং '+r.v+(on?'':' (বাতিল)')})}).catch(()=>{})}}
function pr(h){const p=$('pp');p.style.maxWidth='none';p.innerHTML=h;const bk=()=>{p.style.maxWidth='';p.innerHTML='';removeEventListener('afterprint',bk)};addEventListener('afterprint',bk);setTimeout(()=>print(),200)}
const FN='"Noto Sans Bengali","Kalpurush","Siyam Rupali","BnEmbed",system-ui,sans-serif';
function mkpdfN(J,w,h){const e=new TextEncoder(),P=[],o=[];let n=0;const add=b=>{P.push(b);n+=b.length},ob=(i,s)=>{o[i]=n;add(e.encode(i+' 0 obj\n'+s+'\nendobj\n'))};
 add(e.encode('%PDF-1.4\n'));const N=J.length;ob(1,'<</Type/Catalog/Pages 2 0 R>>');ob(2,'<</Type/Pages/Kids['+J.map((_,i)=>(3+3*i)+' 0 R').join(' ')+']/Count '+N+'>>');
 J.forEach((j,i)=>{const pg=3+3*i,ct=pg+1,im=pg+2,cs='q 595 0 0 842 0 0 cm /I Do Q';ob(pg,'<</Type/Page/Parent 2 0 R/MediaBox[0 0 595 842]/Resources<</XObject<</I '+im+' 0 R>>>>/Contents '+ct+' 0 R>>');ob(ct,'<</Length '+cs.length+'>>\nstream\n'+cs+'\nendstream');
  o[im]=n;add(e.encode(im+' 0 obj\n<</Type/XObject/Subtype/Image/Width '+w+'/Height '+h+'/ColorSpace/DeviceRGB/BitsPerComponent 8/Filter/DCTDecode/Length '+j.length+'>>\nstream\n'));add(j);add(e.encode('\nendstream\nendobj\n'))});
 const tot=3+3*N,xr=n;let x='xref\n0 '+tot+'\n0000000000 65535 f \n';for(let i=1;i<tot;i++)x+=String(o[i]).padStart(10,'0')+' 00000 n \n';
 add(e.encode(x+'trailer\n<</Size '+tot+'/Root 1 0 R>>\nstartxref\n'+xr+'\n%%EOF'));return new Blob(P,{type:'application/pdf'})}
async function pdfList(L){if(!L.length)return toast('তালিকা খালি');const W=1240,H=1754,RH=32,TOP=190,PR=Math.floor((H-TOP-80)/RH),PER=3000,parts=Math.ceil(L.length/PER),$m=$('xm'),c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
 try{await Promise.all([document.fonts.load('22px BnEmbed'),document.fonts.load('700 22px BnEmbed')])}catch(e){}
 const fit=(t,w)=>{t=String(t||'');if(x.measureText(t).width<=w)return t;while(t.length>1&&x.measureText(t+'…').width>w)t=t.slice(0,-1);return t+'…'},
  lab=(S.w?'ওয়ার্ড '+a2b(S.w):'সব ওয়ার্ড')+' · '+(S.a!==''?db.areas[S.a][0]:'সব এলাকা')+(S.g!==''?' · '+(S.g=='1'?'মহিলা':'পুরুষ'):''),
  col=[[50,'ক্রমিক',90],[140,'নাম',290],[430,'পিতা',290],[730,'ভোটার নম্বর',210],[950,'এলাকা',190],[1150,'লিঙ্গ',0]];
 try{for(let p=0;p<parts;p++){const ch=L.slice(p*PER,(p+1)*PER),np=Math.ceil(ch.length/PR),J=[];
  for(let g=0;g<np;g++){$m.textContent='PDF তৈরি হচ্ছে… ফাইল '+a2b(p+1)+'/'+a2b(parts)+' · পৃষ্ঠা '+a2b(g+1)+'/'+a2b(np);
   x.fillStyle='#fff';x.fillRect(0,0,W,H);x.fillStyle='#0a5c43';x.fillRect(0,0,W,96);x.fillStyle='#fff';x.font='700 34px '+FN;x.fillText('ভোটার তালিকা · ০৬নং রাজগঞ্জ ইউনিয়ন',50,60);
   x.fillStyle='#14211b';x.font='600 24px '+FN;x.fillText(lab+' · মোট '+a2b(L.length)+' জন'+(parts>1?' · অংশ '+a2b(p+1)+'/'+a2b(parts):''),50,140);
   x.fillStyle='#e8f3ee';x.fillRect(40,TOP-40,W-80,RH);x.fillStyle='#0a5c43';x.font='700 21px '+FN;col.forEach(k=>x.fillText(k[1],k[0],TOP-17));
   x.font='21px '+FN;ch.slice(g*PR,(g+1)*PR).forEach((r,i)=>{const y=TOP+i*RH;if(i%2){x.fillStyle='#f4f7f5';x.fillRect(40,y-23,W-80,RH)}x.fillStyle='#14211b';
    [a2b(r.s),r.nm,r.fa,a2b(r.v),an(r),r.g?'মহিলা':'পুরুষ'].forEach((t,k)=>x.fillText(k?fit(t,col[k][2]-10):t,col[k][0],y))});
   x.fillStyle='#8a978f';x.font='20px '+FN;x.fillText('ভোটার তালিকা: বাংলাদেশ নির্বাচন কমিশন · পৃষ্ঠা '+a2b(g+1)+'/'+a2b(np),50,H-30);
   const b=await new Promise(r=>c.toBlob(r,'image/jpeg',.5));J.push(new Uint8Array(await b.arrayBuffer()))}
  await put('voters'+(parts>1?'-part'+(p+1)+'-of-'+parts:'')+'.pdf',mkpdfN(J,W,H));await new Promise(r=>setTimeout(r,700))}
  $m.textContent='PDF তৈরি হয়েছে ✓ ('+a2b(L.length)+' জন)'}catch(e){$m.textContent='PDF তৈরি করা যায়নি। প্রিন্ট বা Excel ব্যবহার করুন।'}}
['t1','t2','t3'].forEach(i=>$(i).addEventListener('click',()=>{$('v4').hidden=true;$('t4').className=''}));
$('t4').onclick=()=>{if(!db)return toast('আগে ভোটার তালিকা খুলুন');tab(0);$('v4').hidden=false;$('t4').className='on';draw()}})();
