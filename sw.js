const CACHE_NAME = 'my-refrigeracion-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/index.css',
  '/css/styles.css',
  '/css/mobile.css',
  '/css/whatsapp.css',
  '/js/main.js',
  '/images/logo.png',
  '/images/refrigeracion1.webp',
  '/images/refrigeracion2.webp',
  '/images/refrigeracion3.webp',
  '/images/refrigeracion4.webp',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/icon-120x120.png',
  '/icons/icon-152x152.png',
  '/icons/icon-180x180.png',
  '/videos/pasos.webm',
  '/videos/pasos.vtt',
  '/manifest.json'
];

// Cache de fuentes y otros recursos estáticos
const fontsToCache = [
  '/fonts/Roboto-Regular.ttf',
  '/fonts/Roboto-Bold.ttf'
];

// Cache de imágenes dinámicas
const dynamicCacheName = 'dynamic-cache-v1';
const maxEntries = 50;

// Limpiar cache antiguo
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('my-refrigeracion-') && cacheName !== CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Instalación del service worker
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(urlsToCache);
      }),
      caches.open(dynamicCacheName).then(cache => {
        return cache.addAll(fontsToCache);
      })
    ])
  );
});

// Manejo de fetch
self.addEventListener('fetch', event => {
  const request = event.request;
  
  // Cache de imágenes dinámicas
  if (request.method === 'GET' && request.headers.get('accept').includes('image/')) {
    event.respondWith(
      caches.open(dynamicCacheName).then(cache => {
        return cache.match(request).then(response => {
          if (response) return response;
          
          return fetch(request).then(response => {
            if (!response.ok) return response;
            
            cache.put(request, response.clone());
            return response;
          });
        });
      })
    );
    return;
  }

  // Cache de recursos estáticos
  event.respondWith(
    caches.match(request).then(response => {
      if (response) return response;
      
      return fetch(request).then(response => {
        if (!response.ok) return response;
        
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(request, response.clone());
          return response;
        });
      });
    })
  );
});

// Limpiar cache dinámico cuando supera el límite
setInterval(() => {
  caches.open(dynamicCacheName).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > maxEntries) {
        const oldestKey = keys[0];
        cache.delete(oldestKey);
      }
    });
  });
}, 24 * 60 * 60 * 1000); // Limpiar diariamente

// Instalación del service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activación del service worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('my-refrigeracion-') && cacheName !== CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Manejo de fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseToCache));
            return response;
          });
      })
  );
});
