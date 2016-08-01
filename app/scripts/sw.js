var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    'build/index.html',
    'build/app/styles/bundle/lib.css',
    'build/app/styles/bundle/app.css',
    'build/app/scripts/lib.js',
    'build/app/scripts/app.js',
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});