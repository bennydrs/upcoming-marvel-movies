const CACHE_NAME = "site-umm-v1"
const urlsToCache = [
  "/",
  "index.html",
  "style.css",
  "manifest.json",
  "img/assets/upcoming-marvel-movies-header.png",
  "img/assets/android-chrome-192x192.png",
  "img/assets/favicon.ico",
]

// Install SW
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache")

      return cache.addAll(urlsToCache)
    })
  )
})

// Listen for requests
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      return cacheRes || fetch(event.request)
    })
  )
})

// Activate the SW
self.addEventListener("activate", (event) => {
  const cacheWhitelist = []
  cacheWhitelist.push(CACHE_NAME)

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
