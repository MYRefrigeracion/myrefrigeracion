const CACHE_NAME = 'my-refrigeracion-pro-20260430b';
const PRECACHE_URLS = [
  './',
  './index.html',
  './nosotros.html',
  './informacion.html',
  './galeria.html',
  './groupmy.html',
  './contacto.html',
  './instalar-app.html',
  './css/pro-site.css',
  './js/pro-site.js',
  './images/logo.png',
  './icons/whatsapp.webp'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS).catch(() => undefined))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(key => {
      if (key !== CACHE_NAME && key.startsWith('my-refrigeracion')) return caches.delete(key);
      return undefined;
    }))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        return response;
      }).catch(() => caches.match(request).then(response => response || caches.match('./index.html')))
    );
    return;
  }

  const isStatic = /\.(css|js|png|jpg|jpeg|webp|svg|ico|json|webmanifest)$/i.test(new URL(request.url).pathname);
  if (!isStatic) return;

  event.respondWith(
    caches.match(request).then(cached => {
      const fetchPromise = fetch(request).then(response => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
