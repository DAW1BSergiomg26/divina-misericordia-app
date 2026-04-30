import * as THREE from "three";

export function createGlowTexture(color = [255, 220, 120]) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;

  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(64, 64, 1, 64, 64, 64);

  gradient.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},1)`);
  gradient.addColorStop(0.35, `rgba(${color[0]},${color[1]},${color[2]},.55)`);
  gradient.addColorStop(1, "rgba(0,0,0,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);

  return new THREE.CanvasTexture(canvas);
}

export function createStoneTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#18110d";
  ctx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 8000; i++) {
    const v = 18 + Math.random() * 44;
    ctx.fillStyle = `rgb(${v},${v - 5},${v - 8})`;
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
  }

  return new THREE.CanvasTexture(canvas);
}