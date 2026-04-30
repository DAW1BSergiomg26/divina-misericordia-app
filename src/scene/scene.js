import * as THREE from "three";
import { sceneState } from "./state.js";
import { createGlowTexture, createStoneTexture } from "./renderer.js";

export class SanctuaryScene {
  constructor(root) {
    this.root = root;
    this.clock = new THREE.Clock();
    this.objects = {};
  }

  init() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance"
    });

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.root.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x030810, 0.035);

    this.camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    this.camera.position.set(0, 2.6, 7.2);

    this.build();
    this.bindResize();
    this.animate();
  }

  build() {
    const glow = createGlowTexture();
    const stone = createStoneTexture();

    const floorMat = new THREE.MeshStandardMaterial({
      map: stone,
      color: 0x5c4532,
      roughness: 0.8
    });

    const gold = new THREE.MeshStandardMaterial({
      color: 0xf0c060,
      metalness: 0.8,
      roughness: 0.18,
      emissive: 0x382200,
      emissiveIntensity: 0.25
    });

    const white = new THREE.MeshStandardMaterial({
      color: 0xfffff2,
      roughness: 0.18,
      emissive: 0xfff2b0,
      emissiveIntensity: 1.1
    });

    this.scene.add(new THREE.HemisphereLight(0x201638, 0x090503, 0.8));

    this.divineLight = new THREE.DirectionalLight(0xffe8a0, 3.2);
    this.divineLight.position.set(0, 10, 6);
    this.scene.add(this.divineLight);

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(26, 20), floorMat);
    floor.rotation.x = -Math.PI / 2;
    this.scene.add(floor);

    const wall = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 12),
      new THREE.MeshStandardMaterial({
        map: stone,
        color: 0x37251e,
        roughness: 0.9
      })
    );
    wall.position.set(0, 5.8, -5.5);
    this.scene.add(wall);

    this.buildAltar(gold, white, glow);
    this.buildRays(glow);
    this.buildCandles(glow);
    this.buildFlowers();
    this.buildIncense(glow);
    this.buildParticles(glow);
  }

  buildAltar(gold, white, glow) {
    const marble = new THREE.MeshStandardMaterial({
      color: 0xd8cfc0,
      roughness: 0.32
    });

    const altar = new THREE.Mesh(new THREE.BoxGeometry(5.8, 1.1, 1.6), marble);
    altar.position.set(0, 0.55, 0.25);
    this.scene.add(altar);

    const cloth = new THREE.Mesh(
      new THREE.BoxGeometry(5.9, 0.08, 1.85),
      new THREE.MeshStandardMaterial({ color: 0xf7ead4, roughness: 0.7 })
    );
    cloth.position.set(0, 1.15, 0.25);
    this.scene.add(cloth);

    const group = new THREE.Group();

    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.65, 0.14, 64), gold);
    group.add(base);

    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 0.95, 32), gold);
    stem.position.y = 0.58;
    group.add(stem);

    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.58, 0.045, 18, 128), gold);
    ring.position.y = 1.28;
    group.add(ring);

    for (let i = 0; i < 64; i++) {
      const long = i % 4 === 0;
      const length = long ? 1.25 : 0.72;
      const ray = new THREE.Mesh(new THREE.BoxGeometry(0.025, length, 0.015), gold);
      const a = (i / 64) * Math.PI * 2;

      ray.position.set(
        Math.sin(a) * (0.58 + length / 2),
        1.28 + Math.cos(a) * (0.58 + length / 2),
        0
      );

      ray.rotation.z = -a;
      group.add(ray);
    }

    const host = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.04, 96), white);
    host.rotation.x = Math.PI / 2;
    host.position.y = 1.28;
    group.add(host);

    const halo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glow,
        color: 0xffefad,
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: 0.38,
        depthWrite: false
      })
    );

    halo.position.set(0, 1.28, 0.08);
    halo.scale.set(2.6, 2.6, 1);
    group.add(halo);

    const light = new THREE.PointLight(0xffee99, 2.2, 13);
    light.position.set(0, 1.35, 0.7);
    group.add(light);

    group.position.set(0, 1.25, 0.35);
    this.scene.add(group);

    this.objects.sacrament = { group, ring, halo, light };
  }

  buildRays(glow) {
    const makeRay = (color, x, rot) => {
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });

      const geo = new THREE.PlaneGeometry(1.3, 4.6);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, 2.05, 1.75);
      mesh.rotation.z = rot;
      this.scene.add(mesh);
      return mesh;
    };

    this.objects.redRay = makeRay(0xff382e, -0.55, 0.22);
    this.objects.blueRay = makeRay(0x66b7ff, 0.55, -0.22);

    const aura = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glow,
        color: 0xfff0bd,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );

    aura.position.set(0, 2.55, 1.02);
    aura.scale.set(2.2, 2.2, 1);
    this.scene.add(aura);

    this.objects.aura = aura;
  }

  buildCandles(glow) {
    const wax = new THREE.MeshStandardMaterial({
      color: 0xfff1d2,
      roughness: 0.72
    });

    this.objects.candles = [];

    [-2.1, -1.55, 1.55, 2.1].forEach((x) => {
      const group = new THREE.Group();

      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.9, 32), wax);
      body.position.y = 0.45;
      group.add(body);

      const flame = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glow,
          color: 0xff9d32,
          transparent: true,
          blending: THREE.AdditiveBlending,
          opacity: 0.9,
          depthWrite: false
        })
      );

      flame.position.y = 1;
      flame.scale.set(0.22, 0.36, 1);
      group.add(flame);

      const light = new THREE.PointLight(0xff8c20, 1.1, 4);
      light.position.y = 1;
      group.add(light);

      group.position.set(x, 1.18, 1.05);
      this.scene.add(group);
      this.objects.candles.push({ group, flame, light });
    });
  }

  buildFlowers() {
    const red = new THREE.MeshStandardMaterial({
      color: 0xb60018,
      roughness: 0.48,
      emissive: 0x250006,
      emissiveIntensity: 0.08
    });

    [-2.9, 2.9].forEach((x) => {
      const bouquet = new THREE.Group();

      for (let i = 0; i < 28; i++) {
        const flower = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 8), red);
        const a = (i / 28) * Math.PI * 2;
        const r = 0.18 + Math.random() * 0.22;

        flower.position.set(Math.cos(a) * r, Math.random() * 0.42, Math.sin(a) * r);
        bouquet.add(flower);
      }

      bouquet.position.set(x, 1.25, 0.9);
      this.scene.add(bouquet);
    });
  }

  buildIncense(glow) {
    [-3.45, 3.45].forEach((x) => {
      const smoke = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glow,
          color: 0xd8d2c8,
          transparent: true,
          opacity: 0.12,
          depthWrite: false
        })
      );

      smoke.position.set(x, 2.15, 0.9);
      smoke.scale.set(0.65, 1.9, 1);
      this.scene.add(smoke);
    });
  }

  buildParticles() {
    const count = 900;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * 6;

      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = Math.random() * 8;
      positions[i * 3 + 2] = Math.sin(a) * r - 1.2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xffd060,
      size: 0.045,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particles = new THREE.Points(geo, mat);
    this.particles.userData.positions = positions;
    this.scene.add(this.particles);
  }

  bindResize() {
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const t = this.clock.getElapsedTime();

    sceneState.progress += (sceneState.targetProgress - sceneState.progress) * 0.04;

    if (this.objects.sacrament) {
      const p = sceneState.progress;
      this.objects.sacrament.group.rotation.y = Math.sin(t * 0.25) * 0.04;
      this.objects.sacrament.ring.rotation.z += 0.004;
      this.objects.sacrament.halo.material.opacity = 0.25 + p * 0.55 + Math.sin(t * 1.4) * 0.05;
      this.objects.sacrament.light.intensity = 2 + p * 5 + Math.sin(t * 1.2) * 0.25;
    }

    if (this.objects.redRay) {
      const p = sceneState.progress;
      this.objects.redRay.material.opacity = 0.18 + p * 0.35 + Math.sin(t) * 0.04;
      this.objects.blueRay.material.opacity = 0.18 + p * 0.35 + Math.cos(t) * 0.04;
      this.objects.aura.material.opacity = 0.18 + p * 0.4 + Math.sin(t * 1.5) * 0.05;
    }

    this.objects.candles?.forEach(({ flame, light }, i) => {
      const flicker = 0.85 + Math.sin(t * 10 + i) * 0.12 + Math.random() * 0.04;
      flame.scale.set(0.22 * flicker, 0.36 * flicker, 1);
      light.intensity = 1.1 * flicker;
    });

    if (this.particles) {
      const arr = this.particles.geometry.attributes.position.array;

      for (let i = 0; i < arr.length; i += 3) {
        arr[i + 1] += 0.006;
        if (arr[i + 1] > 8) arr[i + 1] = 0;
      }

      this.particles.geometry.attributes.position.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
  }
}