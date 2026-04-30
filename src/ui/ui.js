export class UI {
  constructor() {
    this.title = document.getElementById("prayer-title");
    this.text = document.getElementById("prayer-text");
    this.progressFill = document.getElementById("progress-fill");
    this.progressLabel = document.getElementById("progress-label");
    this.countLabel = document.getElementById("count-label");
    this.playBtn = document.getElementById("play-btn");
    this.toastEl = document.getElementById("toast");
    this.countdownEl = document.getElementById("mercy-countdown");

    this.startMercyClock();
  }

  renderPrayer(step, progress) {
    this.title.textContent = step?.title ?? "Oración";
    this.text.textContent = step?.text ?? "";
    this.progressFill.style.width = `${progress}%`;
    this.progressLabel.textContent = `${progress}%`;

    const total = this.getCurrentTotal();
    const current = Math.max(1, Math.round((progress / 100) * total));

    if (this.countLabel) {
      this.countLabel.textContent = `Cuenta ${current} de ${total}`;
    }
  }

  setPlaying(isPlaying) {
    this.playBtn.textContent = isPlaying ? "⏸" : "▶";
  }

  setActiveMode(mode) {
    document.querySelectorAll("[data-mode]").forEach((button) => {
      button.classList.toggle("active", button.dataset.mode === mode);
    });
  }

  setActiveSpeed(speed) {
    document.querySelectorAll("[data-speed]").forEach((button) => {
      button.classList.toggle("active", button.dataset.speed === speed);
    });
  }

  toast(message) {
    this.toastEl.textContent = message;
    this.toastEl.classList.add("show");

    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.toastEl.classList.remove("show");
    }, 2600);
  }

  startMercyClock() {
    const update = () => {
      if (!this.countdownEl) return;

      const now = new Date();
      const target = new Date(now);

      target.setHours(15, 0, 0, 0);

      if (now >= target) {
        target.setDate(target.getDate() + 1);
      }

      const diff = target - now;
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      this.countdownEl.textContent =
        `Faltan ${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")} para las 15:00`;
    };

    update();
    setInterval(update, 1000);
  }

  getCurrentTotal() {
    const active = document.querySelector("[data-mode].active");
    const mode = active?.dataset?.mode;

    return {
      mercy: 4,
      chaplet: 61,
      novena: 9,
      cross: 16,
      rosary: 59
    }[mode] ?? 59;
  }
}