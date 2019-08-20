

var dataCacheName = 'streamtools-0.8';


self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(dataCacheName)
    .then(cache => {
      return cache.addAll(filesToCache);
    }).catch(function(err) {
      console.log("ERROR!?");
      console.log(err);
    })
  );
});


var addOutput = function(wds) {
  var opt = document.querySelectorAll(".output")[0];
  opt.appendChild("<p>" + wds + "</p>");
  //$(".output").append("<p>" + wds + "</p>");
};

self.addEventListener('fetch', event => {
  //console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        //console.log('Found ', event.request.url, ' in cache');
        //addOutput('Found ', event.request.url, ' in cache');
        return response;
      }
      //console.log('--> Network request for ', event.request.url);
      return fetch(event.request);

      // TODO 4 - Add fetched files to the cache

    }).catch(error => {

      // TODO 6 - Respond with custom offline page
      console.log("offline, no file found...");

    })
  );
});


self.addEventListener('activate', event => {
  console.log('Clearing Cashe if required');

  const cacheWhitelist = [dataCacheName];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});




var filesToCache = [
'/index.html',
'/manifest.json',
'/css/base.css',
'/bundle.js',
'/1.bundle.js',
'/js/renderer.js',
'/fonts/windlass.woff',
'/fonts/windlass.woff2',
'/video/chenzo_headshot.mp4',
'/video/waterup.mp4',
'/images/16x16.png',
'/images/32x32.png',
'/images/192x192.png',
'/images/256x256.png',
'/images/512x512.png',
];