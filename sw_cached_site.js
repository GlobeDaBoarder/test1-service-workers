const cacheName = 'v2.2';

const filesToCache = [
    "/test1/index.html",
    "/test1/css/style.css",
    "/test1/js/main.js"
]

//Call Install Event
self.addEventListener("install", (e) => {
    console.log("System worker installing...")
    e.waitUntil(
        caches
            .open(cacheName)
            .then((cache) => {
                console.log("Initial caching...")
                cache.addAll(filesToCache)
            })
            .then(() => self.skipWaiting())
    );
});

// Call Activate Event
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
  e.waitUntil(
    caches
        .keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
  );
});

// Call Fetch Event
self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching: ' );
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Make copy/clone of response
        const resClone = res.clone();
        // Open cache
        caches
            .open(cacheName)
            .then(cache => {
                console.log("caching in fetch event...")

                cache.put(e.request, resClone)
            })

        return res;
      })
      .catch(() => {
          caches
              .match(e.request)
              .then(res => res)
      })
  );
});
