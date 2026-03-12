/* =============================================
   EDUPORTAL — SERVICE WORKER
   Cache-first strategy for offline support
   ============================================= */

const CACHE_NAME = 'eduportal-v1';

const STATIC_ASSETS = [
  './',
  './index.html',
  './about.html',
  './colleges_section.html',
  './cutoff.html',
  './courses.html',
  './admission.html',
  './counselling.html',
  './blog.html',
  './contact.html',
  './auth.html',
  './css/shared.css',
  './css/style.css',
  './css/colleges.css',
  './js/shared.js',
  './js/script.js',
  './js/colleges.js',
  './icons/icon-192.svg',
  './icons/icon-512.svg',
  './manifest.json'
];

/* ── Install: pre-cache all static assets ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.allSettled(
        STATIC_ASSETS.map(url =>
          cache.add(url).catch(() => {/* ignore individual failures */})
        )
      );
    }).then(() => self.skipWaiting())
  );
});

/* ── Activate: clean old caches ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/* ── Fetch: cache-first, fallback to network ── */
self.addEventListener('fetch', event => {
  // Only handle GET requests for same-origin or CDN assets
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // For CDN requests (Bootstrap, Google Fonts, etc.) — network first, cache fallback
  const isCDN = url.hostname.includes('cdn.jsdelivr.net') ||
                url.hostname.includes('fonts.googleapis.com') ||
                url.hostname.includes('fonts.gstatic.com');

  if (isCDN) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // For local assets — cache first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => {
        // Offline fallback: serve index.html for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
