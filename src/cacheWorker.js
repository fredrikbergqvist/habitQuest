var version = 'v1::';
var filesToCache = [
    '/',
    '/index.html',
    '/styles.bundle.css',
    '/inline.bundle.js',
    '/main.bundle.js',
    '/vendor.bundle.js',
    '/assets/json/habits.json',
    '/assets/fonts/habitQuest-icons.svg',
    '/assets/fonts/habitQuest-icons.ttf',
    '/assets/fonts/habitQuest-icons.woff',
    'https://fonts.googleapis.com/css?family=Roboto|Sarpanch:700,900'
];

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(version + 'habitQuest').then(function (cache) {
            return cache.addAll(filesToCache)
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
    if (event.request.method !== 'GET') {
        console.log('WORKER: fetch event ignored.', event.request.method, event.request.url);
        return;
    }

    event.respondWith(
        caches
            .match(event.request)
            .then(function (response) {
                var networked = fetch(event.request)
                    .then(fetchedFromNetwork, unableToResolve)
                    .catch(unableToResolve);
                return response || networked;

                function fetchedFromNetwork(response) {
                    var cacheCopy = response.clone();

                    console.log('WORKER: fetch response from network.', event.request.url);

                    caches
                        .open(version + 'habitQuest')
                        .then(function add(cache) {
                            cache.put(event.request, cacheCopy);
                        })
                        .then(function () {
                            console.log('WORKER: fetch response stored in cache.', event.request.url);
                        });

                    // Return the response so that the promise is settled in fulfillment.
                    return response;
                }

                function unableToResolve() {
                    console.log('WORKER: fetch request failed in both cache and network.');
                    return new Response('<h1>Service Unavailable</h1>', {
                        status : 503,
                        statusText : 'Service Unavailable',
                        headers : new Headers({
                            'Content-Type' : 'text/html'
                        })
                    });
                }
            })
    );
});

self.addEventListener("activate", function(event) {
    console.log('WORKER: activate event in progress.');

    event.waitUntil(
        caches
            .keys()
            .then(function (keys) {
                return Promise.all(
                    keys
                        .filter(function (key) {
                            return !key.startsWith(version);
                        })
                        .map(function (key) {
                            return caches.delete(key);
                        })
                );
            })
            .then(function() {
                console.log('WORKER: activate completed.');
            })
    );
});
