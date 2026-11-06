// Masram Gondi Learning - offline service worker (works from a GitHub Pages subpath such as /repo-name/)
const V='masram-v7';
const CORE=['./','index.html'];                                                    // must be saved or the worker does not install
const EXTRA=['manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png','MasaramGondi.ttf']; // saved if present
const FONT_CSS='https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600&family=Noto+Sans+Masaram+Gondi&display=swap';
const INDEX=new URL('index.html',self.registration.scope).href;
const NET_WAIT=3000; // on a slow or flaky connection, show the saved app after 3 seconds

// Save the Google fonts (the stylesheet and the font files it points to) so Hindi and Gondi text also work offline
async function saveFonts(c){
 const css=await fetch(FONT_CSS,{mode:'cors'}); if(!css.ok)return;
 const txt=await css.clone().text(); await c.put(FONT_CSS,css);
 const urls=[...new Set([...txt.matchAll(/url\((https?:[^)]+)\)/g)].map(m=>m[1]))];
 await Promise.allSettled(urls.map(u=>c.add(new Request(u,{mode:'cors'}))))}

self.addEventListener('install',e=>e.waitUntil((async()=>{
 const c=await caches.open(V);
 await Promise.all(CORE.map(u=>c.add(new Request(u,{cache:'reload'}))));
 await Promise.allSettled(EXTRA.map(u=>c.add(new Request(u,{cache:'reload'}))));
 await Promise.race([saveFonts(c).catch(()=>{}),new Promise(r=>setTimeout(r,8000))]);
 await self.skipWaiting()})()));

// Activate: remove old caches, take control, and reload open pages once after an update so the new version shows straight away
self.addEventListener('activate',e=>e.waitUntil((async()=>{
 const old=(await caches.keys()).filter(x=>x!=V);
 await Promise.all(old.map(x=>caches.delete(x)));
 await clients.claim();
 if(old.length)(await clients.matchAll({type:'window'})).forEach(c=>{try{c.navigate(c.url)}catch(_){}})})()));

self.addEventListener('fetch',e=>{
 const r=e.request; if(r.method!='GET')return;
 const u=new URL(r.url),same=u.origin==location.origin;
 if(r.mode=='navigate'){if(same)e.respondWith(page(e));return}
 if(!same&&!(u.hostname=='fonts.googleapis.com'||u.hostname=='fonts.gstatic.com'||r.destination=='image'))return;
 e.respondWith(asset(e,r,same))});

// Pages: newest version from the network when online; the saved copy when offline or when the network is slow
async function page(e){
 const c=await caches.open(V);
 const net=fetch(new Request(e.request.url,{cache:'no-cache'})).then(res=>{
  if(res.ok&&/text\/html/i.test(res.headers.get('content-type')||''))c.put(INDEX,res.clone());return res});
 e.waitUntil(net.catch(()=>{}));
 const first=await Promise.race([net.catch(()=>null),new Promise(ok=>setTimeout(()=>ok(null),NET_WAIT))]);
 if(first&&first.ok)return first;
 return (await c.match(INDEX))||first||net.catch(()=>Response.error())}

// Files, icons and fonts: saved copy first, refreshed quietly in the background
async function asset(e,r,same){
 const c=await caches.open(V);
 const hit=await c.match(r,{ignoreSearch:same,ignoreVary:true});
 const net=fetch(same?new Request(r,{cache:'no-cache'}):r).then(res=>{if(res&&(res.ok||res.type=='opaque'))c.put(r,res.clone());return res});
 if(hit){e.waitUntil(net.catch(()=>{}));return hit}
 return net.catch(()=>Response.error())}
