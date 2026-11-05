// এজেন্ট পেজের অ্যাডমিন ট্যাব: ফর্মে আসা বার্তা দেখায়। পাসওয়ার্ড মেলানো হয় Apps Script-এ (apps-script/Code.gs)
let admPW=null,admRows=[],admSeen=null;
const admSay=m=>$('ae')?$('ae').textContent=m:toast(m),admTy=['মতামত','সমস্যা জানান','স্বেচ্ছাসেবক হতে চাই','ভুল তথ্য','ভোট দিয়েছে'];
function adm(){if(admPW)return;$('v3').innerHTML=`<div class="h2" style="margin-top:0">অ্যাডমিন প্যানেল</div><p class="m" style="margin:0 0 6px">ফর্মে আসা মতামত, সমস্যা ও স্বেচ্ছাসেবকের তালিকা।</p><label for="apw">অ্যাডমিন পাসওয়ার্ড</label><input id="apw" type="password" autocomplete="off"><button class="pri" id="ag">খুলুন</button><p class="err" id="ae"></p>`;
 $('ag').onclick=()=>admLoad($('apw').value);$('apw').onkeydown=e=>{if(e.key==='Enter')admLoad($('apw').value)}}
async function admLoad(pw){if(!CFG.formUrl)return admSay('ফর্মের Apps Script লিংক (formUrl) এখনো বসানো হয়নি।');if(!pw)return admSay('পাসওয়ার্ড লিখুন।');admSay('লোড হচ্ছে…');
 try{const r=await(await fetch(CFG.formUrl,{method:'POST',body:JSON.stringify({action:'list',pw})})).json();if(!r.ok)return admSay(r.err||'পাসওয়ার্ড ভুল।');admPW=pw;admShow(r.rows)}
 catch(x){admSay('ডেটা আনা যায়নি। Apps Script ঠিকমতো Deploy হয়েছে কিনা দেখুন।')}}
function admShow(rows,f=''){admRows=rows;if(admSeen===null){try{admSeen=+localStorage.getItem('admSeen')||0;localStorage.setItem('admSeen',Date.now())}catch(e){admSeen=0}}const nw=r=>new Date(r[0]).getTime()>admSeen;const l=rows.filter(r=>!f||r[1]==f),n=t=>a2b(rows.filter(r=>r[1]==t).length),ph=r=>String(r[3]||'').replace(/\D/g,'');
 $('v3').innerHTML=`<div class="h2" style="margin-top:0">অ্যাডমিন · মোট ${a2b(rows.length)}টি বার্তা · নতুন ${a2b(rows.filter(nw).length)}টি</div>
<div class="ch" id="af"><button data-f=""${f?'':' class="on"'}>সব</button>${admTy.map(t=>`<button data-f="${t}"${f==t?' class="on"':''}>${t} (${n(t)})</button>`).join('')}</div>
<div id="al">${l.map(r=>`<article class="card r" style="padding:12px;margin-top:10px"><div class="sub">${nw(r)?'<span class="tag m">নতুন</span> ':''}${esc(new Date(r[0]).toLocaleString('bn-BD'))} · <b>${esc(r[1])}</b></div><div class="nm">${esc(r[2])}${r[4]?' · '+esc(r[4]):''}</div><p style="margin:6px 0">${esc(r[5])}</p>${ph(r)?`<div class="ac" style="padding:0"><button data-u="tel:${ph(r)}">📞 ${esc(r[3])}</button><button data-u="https://wa.me/${ph(r).replace(/^0/,'880')}">💬 হোয়াটসঅ্যাপ</button></div>`:''}</article>`).join('')||'<div class="em">কোনো বার্তা নেই।</div>'}</div>
<div class="g2"><button class="pri" id="ar">🔄 রিফ্রেশ</button><button class="pri" id="ao" style="background:var(--mut)">বের হন</button></div>`;
 $('af').onclick=e=>{const b=e.target.closest('button');if(b)admShow(admRows,b.dataset.f)};
 $('al').onclick=e=>{const b=e.target.closest('[data-u]');if(!b)return;b.dataset.u.startsWith('tel')?location.href=b.dataset.u:open(b.dataset.u,'_blank','noopener')};
 $('ar').onclick=()=>admLoad(admPW);$('ao').onclick=()=>{admPW=null;admRows=[];admSeen=null;adm()}}
