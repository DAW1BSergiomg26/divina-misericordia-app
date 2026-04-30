const CACHE_NAME = "divina-misericordia-v1";

const STATIC_ASSETS = [
  "./index.html",
  "./manifest.json",

  "./styles/base.css",
  "./styles/main.css",
  "./styles/layout.css",
  "./styles/components.css",

  "./src/main.js",
  "./src/core/config.js",
  "./src/audio/audio.js",
  "./src/prayers/prayers.js",
  "./src/prayers/rosary.js",
  "./src/scene/state.js",
  "./src/scene/renderer.js",
  "./src/scene/scene.js",
  "./src/ui/ui.js"
];

const CDN_ASSETS = [
  "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)),
      caches.open(CACHE_NAME).then(async (cache) => {
        for (const url of CDN_ASSETS) {
          const response = await fetch(url, { mode: "cors" });
          if (response.ok) await cache.put(url, response);
        }
      })
    ])
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => caches.match(event.request));
    })
  );
});