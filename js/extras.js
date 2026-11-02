const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])),J=u=>fetch(u).then(r=>r.json()).catch(()=>null),
vb=u=>`<button class="btn" data-v="${esc(u)}">▶ ভিডিও দেখুন</button>`;
J('data/gallery.json').then(d=>{d=d||{};$('gl').innerHTML=(d.photos||[]).map(p=>typeof p=='string'?{src:p,cap:''}:p).map(p=>p.src?`<div class="gt"><img src="${esc(p.src)}" alt="${esc(p.cap)}" loading="lazy">${p.cap?`<b>${esc(p.cap)}</b>`:''}</div>`:`<div class="gt e"><span>📷</span><b>${esc(p.cap)}</b></div>`).join('');
 $('vl').innerHTML=(d.videos||[]).map(v=>`<div class="card"><b>${esc(v.title)}</b>${vb(v.url)}</div>`).join('')+(d.voice||[]).map(v=>`<div class="card"><b>🎙️ ${esc(v.title)}</b><audio controls preload="none" src="${esc(v.src)}" style="width:100%;margin-top:8px"></audio></div>`).join('')||($('gl').innerHTML?'':'<div class="card">শীঘ্রই ছবি ও ভিডিও যুক্ত হবে।</div>')});
document.addEventListener('click',e=>{const b=e.target.closest('[data-v]'),g=e.target.closest('#gl img');
 if(b)b.outerHTML=`<iframe class="v" allowfullscreen allow="autoplay;encrypted-media;picture-in-picture" src="https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(b.dataset.v)}&show_text=false"></iframe>`;
 if(g){const l=document.createElement('div');l.id='lb';l.innerHTML=`<img src="${g.src}" alt="">`;l.onclick=()=>l.remove();document.body.appendChild(l)}});
$('fs').onclick=async()=>{const m=$('fm').value.trim(),n=$('fn').value.trim(),x=$('fx'),b=$('fs');
 if(!CFG.formUrl)return x.textContent='ফর্ম এখনো চালু হয়নি।';if(!n||!m)return x.textContent='নাম ও বার্তা লিখুন।';if($('fh').value)return;
 b.disabled=1;x.textContent='পাঠানো হচ্ছে…';
 try{await fetch(CFG.formUrl,{method:'POST',mode:'no-cors',body:JSON.stringify({type:$('ft').value,name:n,phone:$('fp').value.trim(),ward:$('fw').value,msg:m})});x.textContent='ধন্যবাদ, আপনার বার্তা পৌঁছেছে ✓';$('fm').value='';toast('পাঠানো হয়েছে ✓')}catch(e){x.textContent='পাঠানো যায়নি, আবার চেষ্টা করুন।'}b.disabled=0};
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
