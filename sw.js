self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open('sala-v1').then(c =>
      c.addAll([
        './',
        './index.html',
        './manifest.json'
      ])
    )
  );
});

self.addEventListener('activate', e => {
  clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
