export const CONFIG = {
  appName: "Divina Misericordia",
  storageKey: "divinaMisericordiaState",
  defaultMode: "mercy",

  speeds: {
    slow: { rate: 0.62, delay: 2200 },
    normal: { rate: 0.78, delay: 1500 },
    fast: { rate: 0.98, delay: 900 }
  },

  audio: {
    ambient: "assets/audio/ambient.mp3"
  },

  pwa: {
    swPath: "service-worker.js"
  }
};