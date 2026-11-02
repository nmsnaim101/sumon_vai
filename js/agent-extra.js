// এজেন্ট পেজের "তালিকা" ট্যাব: ওয়ার্ড/এলাকা তালিকা, প্রিন্ট/PDF, Excel(CSV), একসাথে স্লিপ, পরিবার ভিউ, ভোট দেওয়ার টিক (টার্নআউট)
(()=>{const T=document.querySelector('.tb');if(!T||!$('v3'))return;
T.insertAdjacentHTML('beforeend','<button id="t4">তালিকা</button>');
$('v3').insertAdjacentHTML('afterend','<section id="v4" class="card" hidden style="margin-top:-30px;position:relative"></section>');
document.body.insertAdjacentHTML('beforeend','<div id="pr"></div><style>#pr{display:none}.sl{border:1.5px solid #0a5c43;border-radius:8px;padding:8px;break-inside:avoid;font-size:13px;line-height:1.5}.sg{display:grid;grid-template-columns:1fr 1fr;gap:8px}#v4 table{width:100%;font-size:13px;border-collapse:collapse}#v4 td,#pr td{padding:4px 3px;border-bottom:1px solid #ccc;vertical-align:top}#pr table{width:100%;border-collapse:collapse;font-size:12px}@media print{body>*:not(#pr){display:none!important}#pr{display:block!important;color:#000;background:#fff}}</style>');
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
<div class="g2"><button class="pri" id="xp">🖨️ প্রিন্ট / PDF</button><button class="pri" id="xe">📊 Excel (CSV)</button></div><button class="pri" id="xs">🎫 সব স্লিপ একসাথে (PDF)</button><div id="xl">${list(L)}</div>`;
 $('x1').onchange=e=>{S.w=e.target.value;S.a='';draw()};$('x2').onchange=e=>{S.a=e.target.value;draw()};$('x3').onchange=e=>{S.g=e.target.value;draw()};$('x4').onchange=e=>{S.f=e.target.value;draw()};
 $('xp').onclick=()=>pr(`<h2>ভোটার তালিকা (${a2b(L.length)} জন)</h2><table>${L.slice(0,4000).map(r=>`<tr><td>${a2b(r.s)}</td><td>${esc(r.nm)}</td><td>${esc(r.fa)}</td><td>${a2b(r.v)}</td><td>${esc(an(r))}</td><td>${r.g?'মহিলা':'পুরুষ'}</td></tr>`).join('')}</table>`);
 $('xs').onclick=()=>{if(L.length>500)toast('প্রথম ৫০০টি স্লিপ হবে, এলাকা বা ওয়ার্ড বেছে ছোট করুন');const t=(typeof CFG!='undefined'&&CFG.tag1)||'';pr(`<div class="sg">${L.slice(0,500).map(r=>`<div class="sl"><b>${esc(r.nm)}</b><br>ক্রমিক ${a2b(r.s)} · ভোটার নং ${a2b(r.v)}<br>পিতা: ${esc(r.fa)}<br>ওয়ার্ড ${a2b(r.w)}, ${esc(an(r))}<br><b style="color:#0a5c43">${esc(t)}</b></div>`).join('')}</div>`)};
 $('xe').onclick=()=>{const q=v=>'"'+String(v??'').replace(/"/g,'""')+'"',c='ক্রমিক,নাম,পিতা,মাতা,ভোটার নং,জন্মতারিখ,ঠিকানা,এলাকা,ওয়ার্ড,লিঙ্গ\n'+L.map(r=>[r.s,r.nm,r.fa,r.mo,r.v,r.dob,r.ad,an(r),r.w,r.g?'মহিলা':'পুরুষ'].map(q).join(',')).join('\n'),a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\ufeff'+c],{type:'text/csv'}));a.download='voters.csv';document.body.appendChild(a);a.click();a.remove()};
 $('xl').onchange=e=>{const k=e.target.dataset.v;if(!k)return;const on=e.target.checked,r=db.r.find(x=>x.v==k);on?done[k]=1:delete done[k];try{localStorage.setItem('tv',JSON.stringify(done))}catch(x){}
  $('xc').textContent=a2b(rows().filter(x=>done[x.v]).length);
  if(r&&typeof CFG!='undefined'&&CFG.formUrl)fetch(CFG.formUrl,{method:'POST',mode:'no-cors',body:JSON.stringify({type:'ভোট দিয়েছে',name:r.nm,phone:'',ward:'ওয়ার্ড '+a2b(r.w),msg:'ক্রমিক '+a2b(r.s)+', ভোটার নং '+r.v+(on?'':' (বাতিল)')})}).catch(()=>{})}}
function pr(h){$('pr').innerHTML=h;setTimeout(()=>print(),150)}
['t1','t2','t3'].forEach(i=>$(i).addEventListener('click',()=>{$('v4').hidden=true;$('t4').className=''}));
$('t4').onclick=()=>{if(!db)return toast('আগে ভোটার তালিকা খুলুন');tab(0);$('v4').hidden=false;$('t4').className='on';draw()}})();
