const V='v3',A=['./','index.html','css/style.css','js/config.js','js/app.js','js/studio.js','js/extras.js','fonts/bn.woff','manifest.json','data/gallery.json','img/icon-192.png','img/icon-512.png','img/candidate.jpg','img/hero.jpg','img/hero_cut.png','img/dunu.jpg','img/symbol.png','img/leader1.jpg','img/leader2.jpg','img/leader3.jpg'];
addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>Promise.all(A.map(u=>c.add(u).catch(()=>{})))).then(()=>skipWaiting())));
addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>clients.claim())));
addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!='GET'||u.origin!=location.origin||u.pathname.endsWith('agent.html'))return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))))});
