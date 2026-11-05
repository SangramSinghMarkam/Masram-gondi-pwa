const V='masram-v6',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png','MasaramGondi.ttf'];
// Install: cache the app files fresh from the network (a missing file, e.g. the font, must not block install)
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>Promise.all(F.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})))).then(()=>self.skipWaiting())));
// Activate: drop old caches, take control, and reload open pages once when this is an update so the new version shows immediately
self.addEventListener('activate',e=>e.waitUntil((async()=>{
 const old=(await caches.keys()).filter(x=>x!=V);
 await Promise.all(old.map(x=>caches.delete(x)));
 await clients.claim();
 if(old.length)(await clients.matchAll({type:'window'})).forEach(c=>{try{c.navigate(c.url)}catch(_){}})
})()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET')return;
 const put=res=>{if(res&&(res.ok||res.type=='opaque')){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res};
 // Pages: network first (always the newest app when online), cached copy when offline
 if(r.mode=='navigate'){e.respondWith(fetch(new Request(r.url,{cache:'no-cache'})).then(put).catch(()=>caches.match(r,{ignoreSearch:true}).then(h=>h||caches.match('index.html'))));return}
 // Everything else: cached copy first, refreshed in the background
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(h=>{const n=fetch(r).then(put).catch(()=>h);return h||n}))});
