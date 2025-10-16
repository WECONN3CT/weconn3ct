// js/gradient-blinds.js
import { Renderer, Program, Mesh, Triangle } from 'https://esm.sh/ogl@1.0.6';

const MAX_COLORS = 8;

function hexToRGB(hex) {
  const c = hex.replace('#', '').padEnd(6, '0');
  return [parseInt(c.slice(0, 2), 16) / 255, parseInt(c.slice(2, 4), 16) / 255, parseInt(c.slice(4, 6), 16) / 255];
}

function prepStops(stops) {
  const base = (stops && stops.length ? stops : ['#FF9FFC', '#5227FF']).slice(0, MAX_COLORS);
  if (base.length === 1) base.push(base[0]);
  while (base.length < MAX_COLORS) base.push(base[base.length - 1]);
  const arr = [];
  for (let i = 0; i < MAX_COLORS; i++) arr.push(hexToRGB(base[i]));
  const count = Math.max(2, Math.min(MAX_COLORS, stops?.length ?? 2));
  return { arr, count };
}

function canWebGL() {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  return !!gl;
}

export class GradientBlinds {
  constructor(container, opts = {}) {
    this.container = container;
    this.opts = Object.assign(
      {
        dpr: Math.min(window.devicePixelRatio || 1, 2),
        paused: false,
        gradientColors: ['#FF9FFC', '#5227FF'],
        angle: 0,
        noise: 0.3,
        blindCount: 16,
        blindMinWidth: 60,
        mouseDampening: 0.15,
        mirrorGradient: false,
        spotlightRadius: 0.5,
        spotlightSoftness: 1,
        spotlightOpacity: 1,
        distortAmount: 0,
        shineDirection: 'left',
        mixBlendMode: 'lighten'
      },
      opts
    );

    this._state = {
      renderer: null,
      program: null,
      mesh: null,
      geometry: null,
      raf: null,
      mouseTarget: [0, 0],
      lastTime: 0,
      firstResize: true,
      ro: null,
      prefersReducedMotion: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    };

    this._init();
  }

  _fallbackBackground() {
  const { gradientColors, angle } = this.opts;
  const stops = gradientColors && gradientColors.length >= 2 ? gradientColors : ['#FF9FFC', '#5227FF'];
    this.container.style.background = `linear-gradient(${angle}deg, ${stops[0]} 0%, ${stops[stops.length - 1]} 100%)`;
    this.container.style.mixBlendMode = this.opts.mixBlendMode || 'normal';
  }

  _init() {
    const { paused } = this.opts;
    const { prefersReducedMotion } = this._state;

    if (!canWebGL() || prefersReducedMotion) {
      this._fallbackBackground();
      return;
    }

    const renderer = new Renderer({ dpr: this.opts.dpr, alpha: true, antialias: true });
    this._state.renderer = renderer;
    const gl = renderer.gl;
    const canvas = gl.canvas;

    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    this.container.appendChild(canvas);
    if (this.opts.mixBlendMode) this.container.style.mixBlendMode = this.opts.mixBlendMode;

    const vertex = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

    const fragment = `
#ifdef GL_ES
precision mediump float;
#endif
uniform vec3  iResolution;
uniform vec2  iMouse;
uniform float iTime;
uniform float uAngle;
uniform float uNoise;
uniform float uBlindCount;
uniform float uSpotlightRadius;
uniform float uSpotlightSoftness;
uniform float uSpotlightOpacity;
uniform float uMirror;
uniform float uDistort;
uniform float uShineFlip;
uniform vec3  uColor0; uniform vec3  uColor1; uniform vec3  uColor2; uniform vec3  uColor3;
uniform vec3  uColor4; uniform vec3  uColor5; uniform vec3  uColor6; uniform vec3  uColor7;
uniform int   uColorCount;
varying vec2 vUv;

float rand(vec2 co){ return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453); }
vec2 rotate2D(vec2 p, float a){ float c = cos(a); float s = sin(a); return mat2(c, -s, s, c) * p; }

vec3 getGradientColor(float t){
  float tt = clamp(t, 0.0, 1.0);
  int count = uColorCount; if (count < 2) count = 2;
  float scaled = tt * float(count - 1);
  float seg = floor(scaled);
  float f = fract(scaled);
  if (seg < 1.0) return mix(uColor0, uColor1, f);
  if (seg < 2.0 && count > 2) return mix(uColor1, uColor2, f);
  if (seg < 3.0 && count > 3) return mix(uColor2, uColor3, f);
  if (seg < 4.0 && count > 4) return mix(uColor3, uColor4, f);
  if (seg < 5.0 && count > 5) return mix(uColor4, uColor5, f);
  if (seg < 6.0 && count > 6) return mix(uColor5, uColor6, f);
  if (seg < 7.0 && count > 7) return mix(uColor6, uColor7, f);
  if (count > 7) return uColor7;
  if (count > 6) return uColor6;
  if (count > 5) return uColor5;
  if (count > 4) return uColor4;
  if (count > 3) return uColor3;
  if (count > 2) return uColor2;
  return uColor1;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
  vec2 uv0 = fragCoord.xy / iResolution.xy;
  float aspect = iResolution.x / iResolution.y;
  vec2 p = uv0 * 2.0 - 1.0; p.x *= aspect;
  vec2 pr = rotate2D(p, uAngle); pr.x /= aspect;
  vec2 uv = pr * 0.5 + 0.5;

  vec2 uvMod = uv;
  if (uDistort > 0.0) {
    float a = uvMod.y * 6.0;
    float b = uvMod.x * 6.0;
    float w = 0.01 * uDistort;
    uvMod.x += sin(a) * w;
    uvMod.y += cos(b) * w;
  }
  float t = uvMod.x;
  if (uMirror > 0.5) { t = 1.0 - abs(1.0 - 2.0 * fract(t)); }
  vec3 base = getGradientColor(t);

  vec2 offset = vec2(iMouse.x/iResolution.x, iMouse.y/iResolution.y);
  float d = length(uv0 - offset);
  float r = max(uSpotlightRadius, 1e-4);
  float dn = d / r;
  float spot = (1.0 - 2.0 * pow(dn, uSpotlightSoftness)) * uSpotlightOpacity;
  vec3 cir = vec3(spot);

  float stripe = fract(uvMod.x * max(uBlindCount, 1.0));
  if (uShineFlip > 0.5) stripe = 1.0 - stripe;
  vec3 ran = vec3(stripe);

  vec3 col = cir + base - ran;
  col += (rand(gl_FragCoord.xy + iTime) - 0.5) * uNoise;
  fragColor = vec4(col, 1.0);
}

void main() {
  vec4 color;
  mainImage(color, vUv * iResolution.xy);
  gl_FragColor = color;
}
`;

    const { arr: colorArr, count: colorCount } = prepStops(this.opts.gradientColors);
    const uniforms = {
      iResolution: { value: [gl.drawingBufferWidth, gl.drawingBufferHeight, 1] },
      iMouse: { value: [0, 0] },
      iTime: { value: 0 },
      uAngle: { value: (this.opts.angle * Math.PI) / 180 },
      uNoise: { value: this.opts.noise },
      uBlindCount: { value: Math.max(1, this.opts.blindCount) },
      uSpotlightRadius: { value: this.opts.spotlightRadius },
      uSpotlightSoftness: { value: this.opts.spotlightSoftness },
      uSpotlightOpacity: { value: this.opts.spotlightOpacity },
      uMirror: { value: this.opts.mirrorGradient ? 1 : 0 },
      uDistort: { value: this.opts.distortAmount },
      uShineFlip: { value: this.opts.shineDirection === 'right' ? 1 : 0 },
      uColor0: { value: colorArr[0] },
      uColor1: { value: colorArr[1] },
      uColor2: { value: colorArr[2] },
      uColor3: { value: colorArr[3] },
      uColor4: { value: colorArr[4] },
      uColor5: { value: colorArr[5] },
      uColor6: { value: colorArr[6] },
      uColor7: { value: colorArr[7] },
      uColorCount: { value: colorCount }
    };

    const program = new Program(gl, { vertex, fragment, uniforms });
    const geometry = new Triangle(gl);
    const mesh = new Mesh(gl, { geometry, program });

    this._state.program = program;
    this._state.geometry = geometry;
    this._state.mesh = mesh;

    const resize = () => {
      const rect = this.container.getBoundingClientRect();
      this._state.renderer.setSize(rect.width, rect.height);
      uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight, 1];

      if (this.opts.blindMinWidth && this.opts.blindMinWidth > 0) {
        const maxByMinWidth = Math.max(1, Math.floor(rect.width / this.opts.blindMinWidth));
        const effective = this.opts.blindCount ? Math.min(this.opts.blindCount, maxByMinWidth) : maxByMinWidth;
        uniforms.uBlindCount.value = Math.max(1, effective);
      } else {
        uniforms.uBlindCount.value = Math.max(1, this.opts.blindCount);
      }

      if (this._state.firstResize) {
        this._state.firstResize = false;
        const cx = gl.drawingBufferWidth / 2;
        const cy = gl.drawingBufferHeight / 2;
        uniforms.iMouse.value = [cx, cy];
        this._state.mouseTarget = [cx, cy];
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(this.container);
    this._state.ro = ro;

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scale = this._state.renderer.dpr || 1;
      const x = (e.clientX - rect.left) * scale;
      const y = (rect.height - (e.clientY - rect.top)) * scale;
      this._state.mouseTarget = [x, y];
      if (this.opts.mouseDampening <= 0) uniforms.iMouse.value = [x, y];
    };
    canvas.addEventListener('pointermove', onPointerMove);

    const onVisibility = () => {
      if (document.visibilityState !== 'visible' && this._state.raf) {
        cancelAnimationFrame(this._state.raf);
        this._state.raf = null;
      } else if (document.visibilityState === 'visible' && !this._state.raf && !this.opts.paused) {
        this._state.raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    const loop = (t) => {
      this._state.raf = requestAnimationFrame(loop);
      uniforms.iTime.value = t * 0.001;
      if (this.opts.mouseDampening > 0) {
        if (!this._state.lastTime) this._state.lastTime = t;
        const dt = (t - this._state.lastTime) / 1000;
        this._state.lastTime = t;
        const tau = Math.max(1e-4, this.opts.mouseDampening);
        let factor = 1 - Math.exp(-dt / tau);
        if (factor > 1) factor = 1;
        const target = this._state.mouseTarget;
        const cur = uniforms.iMouse.value;
        cur[0] += (target[0] - cur[0]) * factor;
        cur[1] += (target[1] - cur[1]) * factor;
      } else {
        this._state.lastTime = t;
      }
      if (!this.opts.paused) {
        try { this._state.renderer.render({ scene: mesh }); } catch {}
      }
    };

    if (!paused) this._state.raf = requestAnimationFrame(loop);

    this._teardown = () => {
      if (this._state.raf) cancelAnimationFrame(this._state.raf);
      canvas.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibility);
      ro.disconnect();
      if (canvas.parentElement === this.container) this.container.removeChild(canvas);
      try { program.remove?.(); } catch {}
      try { geometry.remove?.(); } catch {}
      try { mesh.remove?.(); } catch {}
      try { this._state.renderer.destroy?.(); } catch {}
      this._state = {};
    };
  }

  setPaused(paused) { this.opts.paused = !!paused; }
  setColors(colors) { this.opts.gradientColors = colors; }
  dispose() { this._teardown?.(); }
}


