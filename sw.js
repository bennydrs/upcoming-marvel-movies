const CACHE_VERSION = 10
const CURRENT_CACHE = `main-${CACHE_VERSION}`

const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/manifest.json",
  "/js/script.js",
  "/js/utils.js",
  "/data/movies.js",
  "/img/assets/upcoming-marvel-movies-header.png",
  "/img/assets/android-chrome-192x192.png",
  "/img/assets/favicon.ico",
  "img/antman3.jpg",
  "img/armor-wars.jpg",
  "img/black-panther2.jpg",
  "img/blackwidow.jpg",
  "img/blade.jpg",
  "img/captain-marvel2.jpg",
  "img/drstrange-itmom.jpg",
  "img/eternals.jpg",
  "img/fantastic4.jpg",
  "img/gotg-holiday.jpg",
  "img/gotgv3.jpg",
  "img/groot.jpg",
  "img/hawkeye.jpg",
  "img/iron-heart.jpg",
  "img/loki.jpg",
  "img/moon-knight.jpg",
  "img/msmarvel.jpg",
  "img/secret-invasion.jpg",
  "img/shangchi.jpg",
  "img/shehulk.jpg",
  "img/spiderman-no-way-home.jpg",
  "img/thor-love-and-thunder.jpg",
  "img/whatif.jpg",
  "/offline.html",
]

// Install SW
self.addEventListener("install", (event) => {
  // @ts-ignore
  event.waitUntil(
    caches.open(CURRENT_CACHE).then((cache) => {
      console.log("Opened cache")

      return cache.addAll(assets)
    })
  )
})

// Listen for requests
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches
//       .match(event.request)
//       .then((cacheRes) => {
//         return cacheRes || fetch(event.request)
//       })
//       .catch(() => caches.match("/offline.html"))
//   )
// })

// Activate the SW
self.addEventListener("activate", (event) => {
  const cacheWhitelist = []
  cacheWhitelist.push(CURRENT_CACHE)

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName)
          }
        })
      )
    )
  )
})

// fetch the resource from the network
const fromNetwork = (request, timeout) =>
  new Promise((fulfill, reject) => {
    const timeoutId = setTimeout(reject, timeout)
    fetch(request).then((response) => {
      clearTimeout(timeoutId)
      fulfill(response)
      update(request)
    }, reject)
  })

// fetch the resource from the browser cache
const fromCache = (request) =>
  caches
    .open(CURRENT_CACHE)
    .then((cache) =>
      cache.match(request).then((matching) => matching || cache.match("offline.html"))
    )

// cache the current page to make it available for offline
const update = (request) =>
  caches
    .open(CURRENT_CACHE)
    .then((cache) => fetch(request).then((response) => cache.put(request, response)))

// general strategy when making a request (eg if online try to fetch it
// from the network with a timeout, if something fails serve from cache)
self.addEventListener("fetch", (evt) => {
  evt.respondWith(fromNetwork(evt.request, 10000).catch(() => fromCache(evt.request)))
  evt.waitUntil(update(evt.request))
})
