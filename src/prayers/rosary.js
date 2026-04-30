import { PRAYERS } from "./prayers.js";

export class PrayerEngine {
  constructor(mode = "mercy") {
    this.mode = mode;
    this.index = 0;
  }

  setMode(mode) {
    if (!PRAYERS[mode]) {
      throw new Error(`Modo de oración no válido: ${mode}`);
    }

    this.mode = mode;
    this.index = 0;
  }

  getSteps() {
    return PRAYERS[this.mode] ?? [];
  }

  current() {
    return this.getSteps()[this.index] ?? this.getSteps()[0];
  }

  next() {
    const steps = this.getSteps();
    this.index = Math.min(this.index + 1, steps.length - 1);
    return this.current();
  }

  previous() {
    this.index = Math.max(this.index - 1, 0);
    return this.current();
  }

  reset() {
    this.index = 0;
    return this.current();
  }

  progress() {
    const steps = this.getSteps();
    if (!steps.length) return 0;
    return Math.round(((this.index + 1) / steps.length) * 100);
  }

  isComplete() {
    return this.index >= this.getSteps().length - 1;
  }
}