const CACHE_NAME = 'oasis-v2';
const urlsToCache = [
  '/Oasis/',
  '/Oasis/index.html',
  '/Oasis/styles.css',
  '/Oasis/manifest.json',
  '/Oasis/icons/icon-512x512.svg',
  '/Oasis/generate-icon.html',
  '/Oasis/generate-icons.ps1',
  '/Oasis/hide-gamma.js'
];

// Instalar el service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activar el service worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('oasis-') && cacheName !== CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Manejar las peticiones
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(response => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      }).catch(() => {
        // Si no hay conexión y es una página, mostrar una página offline
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('/offline.html');
        }
        return Promise.reject('No se puede acceder a la red');
      });
    })
  );
});

// Notificar cuando se detecte una actualización
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
