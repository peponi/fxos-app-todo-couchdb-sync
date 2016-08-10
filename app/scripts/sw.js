var CACHE_NAME = 'fxos-app-todo-cache-v1',
    urlsToCache = [
    '/',
    '/index.html',
    '/app/styles/bundle/lib.css',
    '/app/styles/bundle/app.css',
    '/app/scripts/lib.js',
    '/app/scripts/app.js',
    '/app/images/icons/png/menu62.png',
    '/app/images/input_areas/images/clear.png',
    '/app/images/input_areas/images/dialog.svg',
    '/app/styles/bundle/drawer/images/ui/pattern.png',
    '/app/styles/bundle/drawer/images/ui/header.png',
    '/app/styles/bundle/drawer/images/ui/separator.png',
    '/app/styles/bundle/drawer/images/ui/shadow_header.png',
    '/app/styles/bundle/drawer/images/ui/pattern_subheader.png',
    '/app/styles/bundle/drawer/images/ui/shadow.png',
    '/app/styles/bundle/headers/images/icons/back.png',
    '/app/styles/bundle/fonts/FiraSans/FiraSans-Light.eot',
    '/app/styles/bundle/fonts/FiraSans/FiraSans-Light.otf',
    '/app/styles/bundle/fonts/FiraSans/FiraSans-Light.ttf',
    '/app/styles/bundle/fonts/FiraSans/FiraSans-Light.woff',
    '/app/styles/bundle/fonts/FiraSans/FiraSans-Bold.eot',
    '/app/styles/bundle/fonts/FiraSans/FiraSans-Bold.otf',
    '/app/styles/bundle/fonts/FiraSans/FiraSans-Bold.ttf',
    '/app/styles/bundle/fonts/FiraSans/FiraSans-Bold.woff',
    '/app/styles/bundle/fonts/FiraSans/FiraSans-Regular.eot',
    '/app/styles/bundle/fonts/FiraSans/FiraSans-Regular.otf',
    '/app/styles/bundle/fonts/FiraSans/FiraSans-Regular.ttf',
    '/app/styles/bundle/fonts/FiraSans/FiraSans-Regular.woff',
    '/app/styles/bundle/input_areas/images/clear.png',
    '/app/styles/bundle/input_areas/images/dialog.svg',
    '/app/styles/bundle/switches/images/switch/background_off.png',
    '/app/styles/bundle/status/images/ui/pattern.png'
    ];

self.addEventListener('install', function(e) {
    // Perform install steps
    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

