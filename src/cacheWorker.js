var self = this;
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('habitQuest').then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles.bundle.css',
                '/inline.bundle.js',
                '/main.bundle.js',
                '/vendor.bundle.js',
                '/assets/json/habits.json',
                '/assets/fonts/habitQuest-icons.svg',
                '/assets/fonts/habitQuest-icons.ttf',
                '/assets/fonts/habitQuest-icons.woff'
            ])
                .then(function () {
                    self.skipWaiting()
                });
        })
    )
});

self.addEventListener('activate', function (event) {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
