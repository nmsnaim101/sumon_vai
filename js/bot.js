// ভোটার সহায়তা — চ্যাট ইঞ্জিন (নিয়মভিত্তিক সহকারী, এলএলএম নয়) + ভোটার স্লিপ
(function(){
const $=id=>document.getElementById(id);if(!$('cp')||!window.KB)return;
const BN='০১২৩৪৫৬৭৮৯',a2b=s=>String(s).replace(/[0-9]/g,c=>BN[c]),d2a=s=>String(s).replace(/[০-৯]/g,c=>BN.indexOf(c));
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const SB=()=>window.SB||{},CF=()=>typeof CFG!=='undefined'?CFG:{};
const GREET='আসসালামু আলাইকুম 👋 আমি ভোটার সহায়তা। আমাকে তৈরি করেছেন এনএমএস নাঈম। বলুন আপনাকে কীভাবে সাহায্য করতে পারি?';
// ---------- বাংলা নর্মালাইজ ----------
function norm(s){return d2a(String(s).normalize('NFC')).toLowerCase().replace(/[‌‍়্ঁঃ.,;:()\-!?।'"“”‘’\/]/g,' ').replace(/ী/g,'ি').replace(/ঈ/g,'ই').replace(/ূ/g,'ু').replace(/ঊ/g,'উ').replace(/ণ/g,'ন').replace(/[ষশ]/g,'স').replace(/ৎ/g,'ত').replace(/\s+/g,' ').trim()}
const LAT=/[a-z]/i,SM={'ক':'k','খ':'k','গ':'g','ঘ':'g','ঙ':'n','চ':'s','ছ':'s','জ':'j','ঝ':'j','ঞ':'n','ট':'t','ঠ':'t','ড':'d','ঢ':'d','ণ':'n','ত':'t','থ':'t','দ':'d','ধ':'d','ন':'n','প':'p','ফ':'p','ব':'b','ভ':'b','ম':'m','য':'j','র':'r','ল':'l','শ':'s','ষ':'s','স':'s','হ':'h','ৎ':'t','ং':'n',' ':' '};
function sk(s){s=String(s);if(LAT.test(s))return s.toLowerCase().replace(/[^a-z ]/g,'').replace(/([kgctdpbs])h/g,'$1').replace(/q/g,'k').replace(/x/g,'ks').replace(/c/g,'s').replace(/z/g,'j').replace(/[fp]/g,'p').replace(/[vb]/g,'b').replace(/[aeiouwy]/g,'').replace(/(.)\1+/g,'$1').replace(/\s+/g,' ').trim();
return s.normalize('NFC').replace(/য়/g,'').replace(/[ডঢ]়/g,'r').split('').map(c=>SM[c]||'').join('').replace(/(.)\1+/g,'$1').replace(/\s+/g,' ').trim()}
const sc=(h,t)=>{let s=0;for(const k of t){const i=h.indexOf(k);if(i<0)return -1;s+=(' '+h+' ').includes(' '+k+' ')?3:(i==0||h[i-1]==' ')?2:1}return s};
// ---------- জ্ঞানভান্ডার সূচক ----------
const IDX=window.KB.map((e,i)=>({i,e,k:e.k.map(norm).filter(Boolean)}));
function match(text,max){const p=' '+text+' ',out=[];
 for(const x of IDX){let best=0,n=0;for(const k of x.k){let s=0;
  if(p.includes(' '+k+' '))s=k.length*2+2;else if(k.length>=4&&p.includes(k))s=k.length;else if(k.length>=4&&k.split(' ').length>1){const ws=k.split(' ');if(ws.every(w=>w.length>1&&p.includes(w)))s=k.length*.7}
  if(s){n++;if(s>best)best=s}}
  if(best)out.push([best+Math.min(n-1,3),x])}
 out.sort((a,b)=>b[0]-a[0]);return out.slice(0,max||3)}
// ---------- চ্যাট UI ----------
const M=$('cm'),T=()=>{const d=new Date();return a2b(String(d.getHours()%12||12))+':'+a2b(String(d.getMinutes()).padStart(2,'0'))};
let busy=Promise.resolve(),mode=null,pend=null,CNT=0;
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const down=()=>{M.scrollTop=M.scrollHeight};
function bubble(html,who,acts,extra){const d=document.createElement('div');d.className='bm '+who;d.innerHTML=html+'<span class="tm">'+T()+'</span>';
 if(acts&&acts.length){const a=document.createElement('div');a.className='ba';acts.forEach(x=>{const b=document.createElement('button');b.textContent=x[0];b.onclick=()=>act(x[1],x[0]);a.appendChild(b)});d.appendChild(a)}
 M.appendChild(d);down();return d}
function user(t){bubble(esc(t),'u')}
function bot(html,acts,opt){busy=busy.then(async()=>{const ty=document.createElement('div');ty.className='bm b';ty.innerHTML='<span class="ty"><i></i><i></i><i></i></span>';M.appendChild(ty);down();
 await wait(Math.min(450+String(html).length*5,1300));ty.remove();const b=bubble(html,'b',acts);if(opt&&opt.after)await opt.after(b)});return busy}
// ---------- প্লেসহোল্ডার ----------
function fill(t){const s=SB(),S=s.S?s.S():{},C=CF();
 const tot=s.TOT?bn(s.TOT):'৩৯,৩৪০';
 return t.replace(/\{\{(\w+)\}\}/g,(m,k)=>{switch(k){
  case 'phone':return esc(C.phone||'');case 'tel':return C.tel||'';case 'office':return esc(C.office||'');case 'officeTel':return '+88'+String(d2a(C.office||'')).replace(/\D/g,'');
  case 'symbol':return esc(C.symbol||'ধানের শীষ');case 'name':return esc(C.name||'মুরাদ জিয়াউর রহমান (সুমন)');case 'fb':return esc(C.fb||'#');case 'site':return esc(C.site||'');
  case 'tot':return tot;
  case 'wards':return (s.WD||[]).map((w,i)=>'ওয়ার্ড '+bn(i+1)+': '+bn(w[0])).join(' · ');
  case 'pledges':return (C.pledges||[]).map((p,i)=>bn(i+1)+'. '+esc(p.t)).join('<br>');
  case 'date':{const vd=S.voteDate||C.voteDate,t=vd?new Date(vd).getTime():0;return t>Date.now()?'ভোটের আর <b>'+bn(Math.ceil((t-Date.now())/864e5))+' দিন</b> বাকি। তারিখ: <b>'+bn(new Date(t).toLocaleDateString('en-GB'))+'</b>।':'ভোটের তারিখ এখনো জানানো হয়নি। ঘোষণা হলে এই সাইটের হোম পেজে দেখতে পাবেন।'}
  case 'days':return '';
  case 'next':{const e=s.nxt&&s.nxt();return e?'পরবর্তী কর্মসূচি: <b>'+esc(e.n)+'</b><br>📅 '+bn(+e.d.split('-')[2])+' '+(s.MON||[])[+e.d.split('-')[1]-1]+(e.t?' · 🕒 '+esc(e.t):'')+'<br>📍 '+esc(e.p):'এখন নতুন কর্মসূচি নেই। শিগগিরই জানানো হবে।'}
 }return m})}
const bn=n=>a2b(String(n).replace(/\B(?=(\d{3})+(?!\d))/g,','));
// ---------- অ্যাকশন ----------
function close(){$('cp').classList.remove('on')}
function act(a,label){
 if(a==='slip'){user(label);return askSlip()}
 if(a==='wa'){return window.shWA&&window.shWA('🌾 ধানের শীষে ভোট দিন! '+(CFG.name||'')+' — ইউপি চেয়ারম্যান প্রার্থী, ০৬নং রাজগঞ্জ ইউনিয়ন।',CFG.site)}
 if(a.startsWith('tel')){const n=a.split(':')[1];location.href='tel:'+(n||CFG.tel).replace(/^\{\{officeTel\}\}$/,'+88'+d2a(CFG.office||'').replace(/\D/g,''));return}
 if(a.startsWith('ask:')){user(label);return reply(a.slice(4))}
 if(a.startsWith('go:')){const p=a.split(':');close();SB().go&&SB().go(p[1]);if(p[2]&&SB().tab)setTimeout(()=>SB().tab(p[2]),300)}}
// ---------- ভোটার ডেটা ----------
let DB=null,DBP=null;
async function inflate(b){const bin=Uint8Array.from(atob(b),c=>c.charCodeAt(0));
 return await new Response(new Blob([bin]).stream().pipeThrough(new DecompressionStream('gzip'))).text()}
function loadDB(){if(DB)return Promise.resolve(DB);if(DBP)return DBP;
 DBP=(async()=>{const h=await (await fetch('agent.html',{cache:'force-cache'})).text(),m=h.match(/B64='([A-Za-z0-9+\/=]+)'/);if(!m)throw 0;const d=JSON.parse(await inflate(m[1]));
  const r=d.rows.map(x=>({v:x[0],nm:x[1],fa:x[2],mo:x[3],dob:x[4],ad:d.addr[x[6]],a:x[7],w:d.areas[x[7]][1],g:x[8],s:x[9],nn:norm(x[1]),nf:norm(x[2]),nmo:norm(x[3]),k:sk(x[1]),fk:sk(x[2])}));
  const byV=new Map(r.map(x=>[x.v,x]));DB={areas:d.areas,r,byV};return DB})().catch(e=>{DBP=null;throw e});return DBP}
// ---------- ইনপুট বিশ্লেষণ ----------
const STOP=new Set('আমার আমি নাম নামে ভোটার ভোটারের স্লিপ স্লিপটা দাও দিন দেন চাই বের করুন করে কর করো কর দিয়ে এনআইডি আইডি নম্বর নাম্বার এর এই কে কি কী কত কোথায় কীভাবে কিভাবে ও এবং তার তাহার সাহায্য প্লিজ please'.split(' ').map(norm));
const QW=new Set(['কে','কি','কী','কত','কোথায়','কেন','কখন','কবে'].map(norm));
const FW='(?:পিতার\\s*নাম|পিতা|বাবার\\s*নাম|বাবা|আব্বা|father|s\\/o|ছেলে|মেয়ে|পুত্র|কন্যা)',MW='(?:মাতার\\s*নাম|মাতা|মায়ের\\s*নাম|মা|আম্মা|mother)';
const toks=s=>norm(s).split(' ').filter(w=>w&&!STOP.has(w));
function parse(t){const raw=d2a(t),o={};
 const dg=raw.replace(/[\s\-]/g,'').match(/\d{8,}/);if(dg&&!/[a-zA-Zঀ-৿]{3,}/.test(raw.replace(/[0-9\s\-]/g,'').replace(/(ভোটার|নম্বর|নাম্বার|এনআইডি|আইডি|nid|স্লিপ|দাও|দিন|চাই|আমার|বের|করুন|কার্ড|জাতীয়|পরিচয়পত্র|পরিচয়|পত্র)/gi,'')))o.num=dg[0];
 else if(dg)o.num=dg[0];
 const ym=raw.match(/(?:^|\D)((?:19|20)\d{2})(?:\D|$)/);if(ym&&!o.num)o.year=ym[1];
 const wm=raw.match(/ওয়ার্ড\s*(?:নং|নম্বর)?\s*(\d)/);if(wm)o.ward=wm[1];
 let s=raw.replace(/ওয়ার্ড\s*(?:নং|নম্বর)?\s*\d/g,' ').replace(/\d+/g,' ');
 let m,mo='';const mr=new RegExp('(?:^|[\\s,،])'+MW+'(?:[\\s:,\\-]+)(.+)$','i').exec(s);if(mr){mo=mr[1];s=s.slice(0,mr.index)}
 const fr=new RegExp('(?:^|[\\s,،:])'+FW+'(?:\\s*(?:এর|এঁর|র))?(?:[\\s:,\\-]+)(.+)$','i').exec(s);
 let name,fa='';
 if(fr){name=s.slice(0,fr.index);fa=fr[1]}
 else if(/[,\n،]/.test(s)){const p=s.split(/[,\n،]/).map(x=>x.trim()).filter(Boolean);name=p[0]||'';fa=p[1]||'';if(p[2]&&!mo)mo=p[2]}
 else name=s;
 name=name.replace(/(?:নাম|ভোটার|স্লিপ|আমার|আমি)\s*[:\-]?/g,' ');
 o.name=toks(name);o.fa=toks(fa);o.mo=toks(mo);
 o.q=norm(raw).split(' ').some(w=>QW.has(w));
 return o}
// ---------- খোঁজা ----------
function find(o){const D=DB;
 if(o.num){const n=o.num;if(n.length<12)return{err:n.length==10?'ten':'short'};
  const r=D.byV.get(n)||D.byV.get(n.slice(-12));return r?{list:[r]}:{list:[],num:1}}
 const nt=o.name,ft=o.fa,mt=o.mo,nk=sk(nt.join(' ')).split(' ').filter(Boolean),fk=sk(ft.join(' ')).split(' ').filter(Boolean);
 const run=ph=>{const out=[];for(const r of D.r){if(o.ward&&String(r.w)!==o.ward)continue;if(o.year&&!String(r.dob).includes(o.year))continue;
  let s=ph?sc(r.k,nk):sc(r.nn,nt);if(s<0)continue;
  if(ft.length){const f=ph?sc(r.fk,fk):sc(r.nf,ft);if(f<0)continue;s+=f}
  if(mt.length){const f=sc(r.nmo,mt);if(f<0)continue;s+=f}
  if(!ph&&r.nn===nt.join(' '))s+=5;out.push([s,r])}
  return out.sort((a,b)=>b[0]-a[0])};
 let out=run(false),fz=0;if(!out.length&&nk.length){out=run(true);fz=1}
 return{list:out.map(x=>x[1]),top:out.map(x=>x[0]),fz}}
// ---------- স্লিপ ছবি ----------
const grp=v=>a2b(String(v)).replace(/(.{4})(?=.)/g,'$1 ');
let CPH=null;const cand=()=>CPH||(CPH=new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src='img/candidate.jpg'}));
async function slip(r){try{await Promise.all([document.fonts.load('28px BnEmbed'),document.fonts.load('700 28px BnEmbed')])}catch(e){}
 const CP=await cand(),W=720,P=36,F='"Noto Sans Bengali","Kalpurush","Siyam Rupali",BnEmbed,system-ui,sans-serif',c=document.createElement('canvas');c.width=W;let x=c.getContext('2d');
 const rows=[['নাম',r.nm],['পিতা',r.fa],['মাতা',r.mo],['জন্ম তারিখ',a2b(r.dob)],['ওয়ার্ড · এলাকা',a2b(r.w)+' · '+DB.areas[r.a][0]],['ভোটার নম্বর',grp(r.v)],['ঠিকানা',r.ad]];
 x.font='28px '+F;const wr=(t,w)=>{const L=[];let l='';for(const s of String(t).split(' ')){const n=l?l+' '+s:s;if(x.measureText(n).width>w&&l){L.push(l);l=s}else l=n}L.push(l);return L},ls=rows.map(q=>wr(q[1],W-2*P));
 const H=440+ls.reduce((a,l)=>a+34+l.length*38+14,0);c.height=H;x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,W,H);
 x.fillStyle='#0a5c43';x.fillRect(0,0,W,96);x.fillStyle='#c8962e';x.fillRect(0,96,W,5);x.fillStyle='#fff';x.font='700 32px '+F;x.fillText('ভোটার স্লিপ',P,48);x.font='24px '+F;x.fillText('০৬নং রাজগঞ্জ ইউনিয়ন · বেগমগঞ্জ, নোয়াখালী',P,80);
 x.fillStyle='#e8f3ee';x.fillRect(P,128,W-2*P,112);x.fillStyle='#5d6d64';x.font='600 22px '+F;x.fillText('ক্রমিক নং ('+(r.g?'মহিলা':'পুরুষ')+')',P+20,164);x.fillStyle='#0a5c43';x.font='700 56px '+F;x.fillText(a2b(r.s),P+20,224);
 let y=280;rows.forEach((q,i)=>{x.fillStyle='#5d6d64';x.font='600 22px '+F;x.fillText(q[0],P,y);y+=36;x.fillStyle='#14211b';x.font=(i?'':'700 ')+'28px '+F;ls[i].forEach(l=>{x.fillText(l,P,y);y+=38});y+=14});
 x.fillStyle='#8a978f';x.font='20px '+F;x.fillText('ভোটার তালিকা: বাংলাদেশ নির্বাচন কমিশন',P,H-22);x.fillStyle='#0a5c43';x.fillRect(P,H-168,W-2*P,112);x.fillStyle='#c8962e';x.fillRect(P,H-168,8,112);
 x.save();x.beginPath();x.arc(P+70,H-112,46,0,7);x.closePath();x.fillStyle='#fff';x.fill();x.clip();if(CP){const k=Math.max(92/CP.naturalWidth,92/CP.naturalHeight),w=CP.naturalWidth*k,h=CP.naturalHeight*k;x.drawImage(CP,P+70-w/2,H-112-h/2,w,h)}x.restore();
 x.beginPath();x.arc(P+70,H-112,46,0,7);x.lineWidth=4;x.strokeStyle='#fff';x.stroke();x.textAlign='center';x.fillStyle='#fff';x.font='700 34px '+F;x.fillText((CF().pet||'সুমন ভাই')+'কে চেয়ারম্যান',W/2+60,H-114);x.font='600 30px '+F;x.fillText('হিসেবে দেখতে চাই',W/2+60,H-72);
 return c}
const toBlob=c=>new Promise(r=>c.toBlob(r,'image/png'));
function slipActs(c,r){const nm='voter-slip-'+r.a+'-'+r.g+'-'+r.s+'.png';return[
 ['⬇ ডাউনলোড',async()=>{const b=await toBlob(c),u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download=nm;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000)}],
 ['🖨 প্রিন্ট',()=>{const w=open('','_blank');if(!w)return;w.document.write('<title>ভোটার স্লিপ</title><style>body{margin:0;text-align:center}img{max-width:100%;width:520px}@page{margin:10mm}</style><img src="'+c.toDataURL('image/png')+'" onload="print()">');w.document.close()}],
 ['💬 শেয়ার',async()=>{try{const b=await toBlob(c),f=new File([b],nm,{type:'image/png'});if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:'ভোটার স্লিপ'});return}}catch(e){if(e&&e.name==='AbortError')return}window.shWA&&window.shWA('🎫 আমার ভোটার স্লিপ। ধানের শীষে ভোট দিন! — '+(CFG.name||''),CFG.site)}]]}
async function showSlip(r){const c=await slip(r);window.SB&&SB.hit&&SB.hit('slip',1);
 const html='✅ <b>স্লিপ পাওয়া গেছে</b><br><span class="ch-w">ওয়ার্ড '+a2b(r.w)+'</span> ক্রমিক '+a2b(r.s)+'<img class="sl" alt="ভোটার স্লিপ" src="'+c.toDataURL('image/png')+'">';
 const acts=slipActs(c,r).map(x=>[x[0],'fn']);
 await bot(html,[],{after:b=>{const a=document.createElement('div');a.className='ba';slipActs(c,r).forEach(x=>{const bt=document.createElement('button');bt.textContent=x[0];bt.onclick=x[1];a.appendChild(bt)});b.insertBefore(a,b.querySelector('.tm'));down()}});
 bot('ভোট দিতে জাতীয় পরিচয়পত্র সাথে নিতে ভুলবেন না। আরেকজনের স্লিপ লাগলে নাম ও পিতার নাম লিখুন।',[['🗳️ ভোটের নিয়ম','ask:ভোট দেওয়ার নিয়ম']])}
// ---------- স্লিপ প্রবাহ ----------
function askSlip(){mode='slip';pend=null;return bot('স্লিপ বের করতে এভাবে লিখুন:<br>• <b>নাম, পিতার নাম</b> — যেমন: “রহিমা বেগম, পিতা আব্দুল করিম”<br>• অথবা <b>১২ ডিজিটের ভোটার নম্বর</b> (পুরনো ১৩/১৭ ডিজিটের এনআইডি নম্বরও চলবে)')}
async function lookup(o){
 let ld;try{ld=await bot('একটু অপেক্ষা করুন, তালিকা খুঁজছি…',[],{after:async b=>{try{await loadDB();b.remove()}catch(e){ld=1;b.remove()}}})}catch(e){}
 if(!DB)return bot('দুঃখিত, এখন তালিকা লোড করা গেল না। ইন্টারনেট দেখে আবার চেষ্টা করুন, অথবা ফোন করুন: '+fill('{{phone}}'));
 const o2=Object.assign({},pend||{},o,{name:o.name.length?o.name:(pend&&pend.name)||[],fa:o.fa.length?o.fa:(pend&&pend.fa)||[],mo:o.mo.length?o.mo:(pend&&pend.mo)||[]});
 if(!o2.num&&!o2.name.length)return bot('নামটি ঠিকমতো বুঝতে পারিনি। “নাম, পিতার নাম” আকারে লিখুন।');
 const r=find(o2);
 if(r.err==='ten'){return bot('এটি স্মার্ট কার্ডের ১০ ডিজিটের নম্বর বলে মনে হচ্ছে, যা ভোটার তালিকার নম্বরের সাথে মেলে না। আপনার <b>নাম ও পিতার নাম</b> লিখুন।')}
 if(r.err)return bot('ভোটার নম্বর ১২ ডিজিটের হয়। নম্বরটি আবার দেখে লিখুন, অথবা নাম ও পিতার নাম দিন।');
 if(!r.list.length){pend=null;return bot(r.num?'এই নম্বরে কোনো ভোটার পাওয়া যায়নি। নম্বর ঠিক আছে কি দেখুন, অথবা নাম ও পিতার নাম লিখুন।':'এই তথ্যে কাউকে পাওয়া যায়নি। বানান বদলে বা পিতার নাম ঠিকভাবে লিখে আবার চেষ্টা করুন। তবু না পেলে ফোন করুন: '+fill('{{phone}}'))}
 if(!o2.num&&!o2.fa.length){pend=o2;mode='slip';return bot('আপনার <b>পিতার নাম</b> লিখুন — একই নামের কয়েকজন থাকতে পারে, তাই নিশ্চিত হতে চাই।')}
 const L=r.list;
 let pick=null;if(L.length==1)pick=L[0];
 else{const ex=L.filter(x=>x.nn===o2.name.join(' ')&&x.nf===o2.fa.join(' '));if(ex.length==1)pick=ex[0]}
 if(pick){pend=null;mode=null;return showSlip(pick)}
 pend=o2;mode='slip';
 if(L.length<=5)return bot('একই তথ্যে <b>'+bn(L.length)+' জন</b> পাওয়া গেছে। আপনি কোনজন?',L.map(x=>[x.nm+' · পিতা '+x.fa+' · ওয়ার্ড '+a2b(x.w)+(x.dob?' · জন্ম '+a2b(String(x.dob).slice(-4)):''),'pick:'+x.v]))
 return bot('অনেকজন মিলে যাচ্ছে ('+bn(L.length)+' জন)। নির্দিষ্ট করতে <b>মাতার নাম</b> বা <b>জন্মসাল</b> (যেমন ১৯৮৫) বা <b>ওয়ার্ড নম্বর</b> যোগ করে লিখুন।')}
const _act=act;act=function(a,l){if(a.startsWith('pick:')){const r=DB&&DB.byV.get(a.slice(5));if(r){user(l.split(' · ')[0]);pend=null;mode=null;return showSlip(r)}}return _act(a,l)};
// ---------- উত্তর ----------
function strong(t){const m=match(norm(t),3);return m}
function reply(t){const o=parse(t),nt=norm(t);
 // ১) নম্বর পাঠালে
 if(o.num&&(mode==='slip'||o.num.length>=10)){return lookup(o)}
 // ২) নাম+পিতা স্পষ্ট থাকলে
 const nameOK=o.name.length&&o.fa.length&&!o.q&&![...o.name,...o.fa].some(w=>QW.has(w));
 if(nameOK&&(mode==='slip'||/স্লিপ|পিতা|বাবা|father|ছেলে|মেয়ে|পুত্র|কন্যা/i.test(t)||/[,\n]/.test(t)))return lookup(o);
 // ৩) স্লিপ মোড: শুধু নাম বা পিতার নাম
 if(mode==='slip'){const m=strong(t);const isQ=m.length&&m[0][0]>=9&&!pend;
  if(!isQ){if(pend&&!pend.fa.length&&o.name.length)return lookup(Object.assign({},o,{fa:o.name,name:[]}));
   if(o.name.length&&!o.q){return lookup(o)}
   if(o.year||o.ward||o.mo.length)return lookup(o)}
  mode=pend?mode:null}
 // ৪) "স্লিপ + একটি নাম" বললে
 if(/স্লিপ/.test(nt)&&o.name.length>=2&&!o.q&&!match(nt,1).length)return lookup(o);
 // ৫) জ্ঞানভান্ডার
 const m=match(nt,3);
 if(m.length&&m[0][0]>=6){const e=m[0][1].e;mode=null;
  if(e.a==='__now__'){return bot('এখন '+esc(new Date().toLocaleString('bn-BD',{dateStyle:'full',timeStyle:'short'})))}
  if((e.b||[]).some(x=>x[1]==='slip'))mode='slip';
  return bot(fill(e.a),(e.b||[]).map(x=>[x[0],x[1]]))}
 // ৬) ফলব্যাক
 const sug=m.filter(x=>x[0]>=3).slice(0,3);
 return bot('দুঃখিত, প্রশ্নটি ঠিক বুঝতে পারিনি। 🙏 নিচের কোনোটি জানতে চান?'+(sug.length?'':'<br>অথবা ফোন করুন: <a href="tel:'+(CFG.tel||'')+'">'+esc(CFG.phone||'')+'</a>'),
  sug.map(x=>[x[1].e.k[0],'ask:'+x[1].e.k[0]]).concat(sug.length?[]:[['🎫 ভোটার স্লিপ','slip'],['🗳️ ভোটের নিয়ম','ask:ভোট দেওয়ার নিয়ম'],['👤 প্রার্থী পরিচয়','ask:প্রার্থী কে']]))}
// ---------- সংযোগ ----------
const QS=[['🎫 ভোটার স্লিপ বের করুন','slip'],['ভোট কবে?','ask:ভোট কবে'],['ভোট দেওয়ার নিয়ম','ask:ভোট দেওয়ার নিয়ম'],['প্রার্থীর পরিচয়','ask:প্রার্থী কে'],['ইশতেহার','ask:ইশতেহার'],['কর্মসূচি','ask:কর্মসূচি'],['সমস্যা জানাতে চাই','ask:সমস্যা জানাব'],['যোগাযোগ','ask:যোগাযোগ']];
$('cq').innerHTML='';QS.forEach(q=>{const b=document.createElement('button');b.textContent=q[0];b.onclick=()=>{if(q[1]==='slip'){user(q[0]);askSlip()}else{user(q[0]);reply(q[1].slice(4))}};$('cq').appendChild(b)});
const send=()=>{const v=$('ci').value.trim();if(!v)return;$('ci').value='';user(v);reply(v)};
$('cs').onclick=send;$('ci').onkeydown=e=>{if(e.key==='Enter')send()};
$('cx').onclick=close;
$('cb').onclick=()=>{const p=$('cp');p.classList.toggle('on');if(p.classList.contains('on'))window.SB&&SB.hit&&SB.hit('chat');$('cb').classList.remove('pu');
 if(p.classList.contains('on')){if(!CNT){CNT=1;busy=busy.then(async()=>{const ty=document.createElement('div');ty.className='bm b';ty.innerHTML='<span class="ty"><i></i><i></i><i></i></span>';M.appendChild(ty);await wait(700);ty.remove();const b=document.createElement('div');b.className='bm b';b.textContent=GREET;M.appendChild(b)})}setTimeout(()=>$('ci').focus({preventScroll:true}),350)}};
window.SBbot={reply,norm,match,parse};
})();
