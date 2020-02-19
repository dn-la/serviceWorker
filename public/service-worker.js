const cacheKeeplist = 'v2'

self.addEventListener('install', function(event){
    console.log('[SW] Install Service Worker!',event)
    event.waitUntil(
    caches.open(cacheKeeplist)
    .then(function(cache){
        // cache.add('/index.html')
        // cache.add('/src/js/app.js')  
        // cache.add('https://fonts.googleapis.com/icon?family=Material+Icons')  
        cache.addAll([
            '/index.html',
            '/src/js/app.js',
            'https://fonts.googleapis.com/css?family=Roboto:400,700',
            'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBBc4AMP6lQ.woff2'
        ])
        }) 
    )
})

self.addEventListener('activate', function(event){
    console.log('[SW] Activate Service Worker~~~',event)
    
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
              if (cacheKeeplist.indexOf(key) === -1) {
                return caches.delete(key)
              }
            }))
          })
    )
    return self.clients.claim()
})

self.addEventListener('fetch', function(event){
    console.log('[SW] Fetch!',event)
    
    event.respondWith(
        caches.match(event.request).then((response) => {
        return response || fetch(event.request)
      })
    )
    // event.respondWith(null)
}) 