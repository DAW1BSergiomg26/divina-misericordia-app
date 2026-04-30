import { CONFIG } from "./core/config.js";
import { PrayerEngine } from "./prayers/rosary.js";
import { AudioEngine } from "./audio/audio.js";
import { SanctuaryScene } from "./scene/scene.js";
import { setSceneProgress } from "./scene/state.js";
import { UI } from "./ui/ui.js";
import { PRAYERS } from "./prayers/prayers.js";

class DivineMercyApp {
  constructor() {
    this.mode = CONFIG.defaultMode;
    this.speed = "normal";
    this.isPlaying = false;
    this.timer = null;

    this.prayers = new PrayerEngine(this.mode);
    this.audio = new AudioEngine({ rate: CONFIG.speeds[this.speed].rate });
    this.ui = new UI();

    this.scene = new SanctuaryScene(document.getElementById("scene-root"));
  }

  init() {
    this.scene.init();
    this.audio.initAmbient(CONFIG.audio.ambient);

    this.bindEvents();
    this.render();

    setTimeout(() => {
      document.getElementById("loading")?.classList.add("hidden");
    }, 900);

    this.registerServiceWorker();
  }

  bindEvents() {
    document.querySelectorAll("[data-mode]").forEach((button) => {
      button.addEventListener("click", () => this.setMode(button.dataset.mode));
    });

    document.querySelectorAll("[data-speed]").forEach((button) => {
      button.addEventListener("click", () => this.setSpeed(button.dataset.speed));
    });

    document.getElementById("play-btn").addEventListener("click", () => this.toggleAutoPrayer());
    document.getElementById("next-btn").addEventListener("click", () => this.next());
    document.getElementById("prev-btn").addEventListener("click", () => this.previous());
    document.getElementById("reset-btn").addEventListener("click", () => this.reset());

    document.getElementById("audio-btn").addEventListener("click", () => {
      const enabled = this.audio.toggleAmbient();
      this.ui.toast(enabled ? "🎵 Música ambiental activada" : "🔇 Música pausada");
    });

    document.getElementById("fullscreen-btn").addEventListener("click", () => {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
      else document.exitFullscreen?.();
    });

    document.querySelector(".trust-card").addEventListener("click", () => {
      this.audio.bell();
      this.audio.speak(PRAYERS.offerings.trust.text);
      this.ui.toast("✝ Jesús, En Vos Confío");
    });

    document.getElementById("flowers-btn").addEventListener("click", () => {
      this.audio.speak(PRAYERS.offerings.flowers.text);
      this.ui.toast("🌹 Flores ofrecidas");
    });

    document.getElementById("incense-btn").addEventListener("click", () => {
      this.audio.speak(PRAYERS.offerings.incense.text);
      this.ui.toast("🌿 Incienso ofrecido");
    });
  }

  setMode(mode) {
    this.stop();
    this.mode = mode;
    this.prayers.setMode(mode);
    this.ui.setActiveMode(mode);
    this.render();
    this.ui.toast(`Modo: ${this.labelMode(mode)}`);
  }

  setSpeed(speed) {
    this.speed = speed;
    const config = CONFIG.speeds[speed];

    this.audio.setRate(config.rate);
    this.ui.setActiveSpeed(speed);
    this.ui.toast(`Velocidad ${speed}`);
  }

  toggleAutoPrayer() {
    if (this.isPlaying) {
      this.stop();
      return;
    }

    this.isPlaying = true;
    this.ui.setPlaying(true);
    this.ui.toast("🙏 Oración guiada iniciada");
    this.prayCurrentAndContinue();
  }

  prayCurrentAndContinue() {
    const step = this.prayers.current();

    this.audio.bell();
    this.audio.speak(step.text, () => {
      if (!this.isPlaying) return;

      if (this.prayers.isComplete()) {
        this.stop();
        this.ui.toast("🙏 Oración completada");
        return;
      }

      this.timer = setTimeout(() => {
        this.prayers.next();
        this.render();
        this.prayCurrentAndContinue();
      }, CONFIG.speeds[this.speed].delay);
    });
  }

  next() {
    this.prayers.next();
    this.render();
    this.audio.bell();
  }

  previous() {
    this.prayers.previous();
    this.render();
  }

  reset() {
    this.stop();
    this.prayers.reset();
    this.render();
    this.ui.toast("Oración reiniciada");
  }

  stop() {
    this.isPlaying = false;
    this.ui.setPlaying(false);
    this.audio.stopSpeech();

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  render() {
    const step = this.prayers.current();
    const progress = this.prayers.progress();

    this.ui.renderPrayer(step, progress);
    setSceneProgress(progress);
  }

  labelMode(mode) {
    return {
      mercy: "Hora de la Misericordia",
      chaplet: "Coronilla",
      novena: "Novena",
      cross: "Vía Crucis",
      rosary: "Santo Rosario"
    }[mode] ?? mode;
  }

  registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register(CONFIG.pwa.swPath)
        .then(() => console.log("SW registrado"))
        .catch((err) => console.warn("SW error:", err));
    }
  }
}

const app = new DivineMercyApp();
app.init();

window.app = app;