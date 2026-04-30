export class AudioEngine {
  constructor({ rate = 0.78 } = {}) {
    this.rate = rate;
    this.audio = null;
    this.enabled = false;
    this.voice = null;
    this.pickVoice();
  }

  initAmbient(src) {
    this.audio = new Audio(src);
    this.audio.loop = true;
    this.audio.volume = 0.22;
  }

  toggleAmbient() {
    if (!this.audio) return false;

    this.enabled = !this.enabled;

    if (this.enabled) {
      this.audio.play().catch(() => {
        this.enabled = false;
      });
    } else {
      this.audio.pause();
    }

    return this.enabled;
  }

  setRate(rate) {
    this.rate = rate;
  }

  pickVoice() {
    if (!("speechSynthesis" in window)) return;

    const choose = () => {
      const voices = window.speechSynthesis.getVoices();
      this.voice =
        voices.find((voice) => /^es/i.test(voice.lang)) ||
        voices[0] ||
        null;
    };

    choose();
    window.speechSynthesis.onvoiceschanged = choose;
  }

  speak(text, onEnd = null) {
    if (!("speechSynthesis" in window)) {
      onEnd?.();
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    utterance.rate = this.rate;
    utterance.pitch = 1.08;
    utterance.volume = 0.95;

    if (this.voice) utterance.voice = this.voice;

    utterance.onend = () => onEnd?.();
    utterance.onerror = () => onEnd?.();

    window.speechSynthesis.speak(utterance);
  }

  stopSpeech() {
    window.speechSynthesis?.cancel?.();
  }

  bell() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;

    const ctx = new Ctx();
    const now = ctx.currentTime;

    [880, 1320, 1760].forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.value = freq;

      gain.gain.setValueAtTime(0.13 / (index + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.6);
    });
  }
}