const CACHE_NAME = "registre-meds-cache-v1";
const urlsToCache = [
  "./index.html",
  "./manifest.json",
  "./style.css", // si tu externalises le CSS
  "./sw.js"
];

// Installer le service worker et mettre en cache les fichiers essentiels
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Intercepter les requêtes et servir depuis le cache si disponible
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Mettre à jour le cache quand le service worker est activé
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
});