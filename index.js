var cacheName = 'shell-conten';
var DatacacheName = 'fecthData';
var filesToCache = [


  '/index.html',

  '/',
];

self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});


self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});


self.addEventListener('fetch', function (e) {
  console.log('[ServiceWksdfljdsalfjlaorker] Fetch', e.request.url.typeOf);
  console.log('start url index',e.request.url.indexOf("https://api.github.com/"))
  if (e.request.url.indexOf("https://api.github.com/")>-1) {
    caches.open(DatacacheName).then(function (cache) {
      return fetch(e.request).then(function (response) {
        cache.put(e.request, response.clone())
        return response;
      })
    })
  }
  e.respondWith(
    
    caches.match(e.request).then(function (response) {
      console.log('cache load')
      return response || fetch(e.request);
    })
  );
});