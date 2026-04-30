export const sceneState = {
  progress: 0,
  targetProgress: 0,
  dayMode: false,
  bloom: true
};

export function setSceneProgress(value) {
  sceneState.targetProgress = Math.max(0, Math.min(1, value / 100));
}

export function toggleDayMode() {
  sceneState.dayMode = !sceneState.dayMode;
  return sceneState.dayMode;
}