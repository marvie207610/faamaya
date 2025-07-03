// Service Worker for Zooniverse Clone
const CACHE_NAME = "zooniverse-cache-v1"
const urlsToCache = [
  "/",
  "/static/css/base.css",
  "/static/css/header.css",
  "/static/css/components.css",
  "/static/css/home.css",
  "/static/css/fonts.css",
  "/static/css/animations.css",
  "/static/css/colors.css",
  "/static/js/main.js",
  "/static/js/home.js",
  "/static/js/components.js",
  "/static/js/form-validation.js",
  "/static/js/project-filter.js",
  "/static/images/logo/zooniverse-logo.png",
  "/static/images/favicon.png",
  "/static/images/loading-dots.png",
  "/static/images/hero-background.png",
  "/static/manifest.json",
]

// Install event - cache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache")
      return cache.addAll(urlsToCache)
    }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})

// Fetch event - serve from cache, fall back to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response
      }

      // Clone the request
      const fetchRequest = event.request.clone()

      return fetch(fetchRequest).then((response) => {
        // Check if valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response
        }

        // Clone the response
        const responseToCache = response.clone()

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache)
        })

        return response
      })
    }),
  )
})
