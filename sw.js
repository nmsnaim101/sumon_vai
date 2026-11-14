const V='v10',A=['./','index.html','css/style.css','css/home.css','js/config.js','js/app.js','js/studio.js','js/extras.js','js/extras2.js','js/kb.js','js/bot.js','js/live.js','js/icons.js','js/motion.js','fonts/bn.woff','manifest.json','img/icon-192.png','img/icon-512.png','img/candidate.jpg','img/hero.jpg','img/hero_cut.webp','img/hero_cut.png','img/dunu.jpg','img/dunu_s.jpg','img/symbol.png','img/leader1.jpg','img/leader2.jpg','img/leader3.jpg'];
addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>Promise.all(A.map(u=>c.add(u).catch(()=>{})))).then(()=>skipWaiting())));
addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>clients.claim())));
addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
 if(r.method!='GET'||u.origin!=location.origin||/\/(agent\.html|caption\.html)$|\/js\/admin2?\.js$|\/js\/agent-extra\.js$/.test(u.pathname))return;
 const put=x=>{if(x&&x.ok){const c=x.clone();caches.open(V).then(k=>k.put(r,c))}return x};
 if(r.mode==='navigate'||u.pathname.endsWith('.html')||u.pathname.endsWith('/')){ // পেজ: আগে নেটওয়ার্ক, না পেলে সংরক্ষিত
  e.respondWith(fetch(r).then(put).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));return}
 // ছবি, JS, CSS, গ্যালারি: সংরক্ষিতটা সঙ্গে সঙ্গে দেখায় (দ্রুত ও অফলাইনে চলে), পেছনে নতুনটা এনে রাখে
 e.respondWith(caches.match(r).then(m=>{const n=fetch(r).then(put).catch(()=>m);return m||n}))});
