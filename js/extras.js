const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])),J=u=>fetch(u).then(r=>r.json()).catch(()=>null),
vb=u=>`<button class="btn" data-v="${esc(u)}">▶ ভিডিও দেখুন</button>`;
let GD=null,GC=0;
const gp=p=>typeof p=='string'?{src:p,cap:''}:p,
gAll=d=>(d.cats||[]).flatMap(c=>(c.photos||[]).map(gp)),
gShow=()=>{const d=GD,cs=d.cats||[],c=GC?cs.find(x=>x.id==GC):null,L=c?(c.photos||[]).map(gp):gAll(d);
 $('gk').innerHTML=`<button class="${GC?'':'on'}" data-k="0">সব (${gAll(d).length})</button>`+cs.map(x=>`<button class="${x.id==GC?'on':''}" data-k="${x.id}">${esc(x.name)} (${(x.photos||[]).length})</button>`).join('');
 $('gd').textContent=c?c.desc||'':'';
 $('gl').innerHTML=L.length?L.map(p=>`<div class="gt"><img src="${esc(p.src)}" data-full="${esc(p.full||p.src)}" onerror="this.onerror=null;this.src=this.dataset.full" alt="${esc(p.cap)}" loading="lazy">${p.cap?`<b>${esc(p.cap)}</b>`:''}</div>`).join(''):'<div class="card" style="grid-column:1/-1;text-align:center">📷 শীঘ্রই ছবি যুক্ত হবে।</div>'};
let GL=0;const loadG=()=>{if(GL)return;GL=1;if(!GD)$('gl').innerHTML='<div class="card" style="grid-column:1/-1;text-align:center">ছবি লোড হচ্ছে…</div>';
 J('data/gallery.json').then(d=>{d=GD=d||{};if(d.photos&&!d.cats)d.cats=[{id:1,name:'ছবি',desc:'',photos:d.photos}];gShow();
 window.GVID=(d.videos||[]).map(v=>({t:v.title,u:v.url}));window.SBv&&window.SBv();
 $('vv').innerHTML=(d.voice||[]).map(v=>`<div class="card"><b>🎙️ ${esc(v.title)}</b><audio controls preload="none" src="${esc(v.src)}" style="width:100%;margin-top:8px"></audio></div>`).join('')})};
document.addEventListener('click',e=>{if(e.target.closest('nav button[data-t="gallery"]'))loadG()},true);
{const cn=navigator.connection||{};if(!cn.saveData&&!/2g/.test(cn.effectiveType||''))setTimeout(()=>('requestIdleCallback'in window?requestIdleCallback(loadG):loadG()),9000)}
document.addEventListener('click',e=>{const b=e.target.closest('[data-v]'),g=e.target.closest('#gl img'),k=e.target.closest('#gk button');
 if(k){GC=+k.dataset.k;gShow()}
 if(b)b.outerHTML=`<iframe class="v" allowfullscreen allow="autoplay;encrypted-media;picture-in-picture" src="https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(b.dataset.v)}&show_text=false"></iframe>`;
 if(g)lbOpen([...document.querySelectorAll('#gl img')],g)});
// গ্যালারি লাইটবক্স: ক্যাপশন, আগে/পরে, সোয়াইপ, কীবোর্ড
function lbOpen(L,g){let i=Math.max(0,L.indexOf(g));const l=document.createElement('div');l.id='lb';l.className='lbx';
 l.innerHTML='<button class="lbc" aria-label="বন্ধ">✕</button><button class="lbn lbp" aria-label="আগের">‹</button><figure><img alt=""><figcaption></figcaption></figure><button class="lbn lbf" aria-label="পরের">›</button><div class="lbk"></div>';
 const im=l.querySelector('img'),cp=l.querySelector('figcaption'),ct=l.querySelector('.lbk'),sh=n=>{i=(n+L.length)%L.length;const e=L[i];im.src=e.dataset.full||e.src;cp.textContent=e.alt||'';cp.hidden=!e.alt;ct.textContent=(i+1).toLocaleString('bn-BD')+' / '+L.length.toLocaleString('bn-BD')};
 const k=e=>{if(e.key==='Escape')cl();if(e.key==='ArrowRight')sh(i+1);if(e.key==='ArrowLeft')sh(i-1)},cl=()=>{l.remove();document.removeEventListener('keydown',k)};
 l.onclick=e=>{if(e.target.closest('.lbc')||e.target===l||e.target.tagName==='FIGURE')cl();else if(e.target.closest('.lbp'))sh(i-1);else if(e.target.closest('.lbf'))sh(i+1)};
 let x0=null;l.ontouchstart=e=>x0=e.touches[0].clientX;l.ontouchend=e=>{if(x0==null)return;const d=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(d)>50)sh(i+(d<0?1:-1))};
 document.addEventListener('keydown',k);document.body.appendChild(l);sh(i)}
$('fs').onclick=async()=>{const m=$('fm').value.trim(),n=$('fn').value.trim(),x=$('fx'),b=$('fs');
 if(!CFG.formUrl)return x.textContent='ফর্ম এখনো চালু হয়নি।';if(!n||!m)return x.textContent='নাম ও বার্তা লিখুন।';if($('fh').value)return;
 b.disabled=1;x.textContent='পাঠানো হচ্ছে…';
 try{await fetch(CFG.formUrl,{method:'POST',mode:'no-cors',body:JSON.stringify({type:$('ft').value,name:n,phone:$('fp').value.trim(),ward:$('fw').value,msg:m})});x.textContent='ধন্যবাদ, আপনার বার্তা পৌঁছেছে ✓';$('fm').value='';toast('পাঠানো হয়েছে ✓')}catch(e){x.textContent='পাঠানো যায়নি, আবার চেষ্টা করুন।'}b.disabled=0};
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
