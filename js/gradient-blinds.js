// GradientBlinds WebGL Effekt (Vanilla, basierend auf OGL)
import { Renderer, Program, Mesh, Triangle } from 'https://cdn.skypack.dev/ogl';

const MAX_COLORS = 8;
const hexToRGB = (hex) => {
  const c = hex.replace('#', '').padEnd(6, '0');
  const r = parseInt(c.slice(0, 2), 16) / 255;
  const g = parseInt(c.slice(2, 4), 16) / 255;
  const b = parseInt(c.slice(4, 6), 16) / 255;
  return [r, g, b];
};

const prepStops = (stops) => {
  const base = (stops && stops.length ? stops : ['#1ECAD3', '#2E3EE8', '#9D4EDD']).slice(0, MAX_COLORS);
  if (base.length === 1) base.push(base[0]);
  while (base.length < MAX_COLORS) base.push(base[base.length - 1]);
  const arr = [];
  for (let i = 0; i < MAX_COLORS; i++) arr.push(hexToRGB(base[i]));
  const count = Math.max(2, Math.min(MAX_COLORS, stops?.length ?? 3));
  return { arr, count };
};

class GradientBlinds {
  constructor(container, opts = {}){
    this.container = container;
    this.opts = Object.assign({
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      paused: false,
      gradientColors: ['#1ECAD3', '#2E3EE8', '#9D4EDD'],
      angle: 20 * Math.PI/180,
      noise: 0.25,
      blindCount: 18,
      blindMinWidth: 60,
      mouseDampening: 0.12,
      mirrorGradient: true,
      spotlightRadius: 0.45,
      spotlightSoftness: 1.2,
      spotlightOpacity: 0.85,
      distortAmount: 0.4,
      shineDirection: 'left',
      mixBlendMode: 'lighten'
    }, opts);

    this.mouse = [0,0];
    this.sMouse = [0,0];
    this.time = 0;
    this._raf = null;

    this.init();
  }

  init(){
    const renderer = new Renderer({ dpr: this.opts.dpr, alpha: true, antialias: true });
    this.renderer = renderer;
    const gl = renderer.gl;
    const canvas = gl.canvas;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    this.container.innerHTML = '';
    this.container.appendChild(canvas);

    const vertex = `attribute vec2 position;varying vec2 vUv;void main(){vUv=position*0.5+0.5;gl_Position=vec4(position,0.,1.);}`;
    const fragment = `precision mediump float;uniform vec3 iResolution;uniform vec2 iMouse;uniform float iTime;uniform float uAngle;uniform float uNoise;uniform float uBlindCount;uniform float uSpotlightRadius;uniform float uSpotlightSoftness;uniform float uSpotlightOpacity;uniform float uMirror;uniform float uDistort;uniform float uShineFlip;uniform vec3 uColor0;uniform vec3 uColor1;uniform vec3 uColor2;uniform vec3 uColor3;uniform vec3 uColor4;uniform vec3 uColor5;uniform vec3 uColor6;uniform vec3 uColor7;uniform int uColorCount;varying vec2 vUv;float rand(vec2 co){return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453);}vec2 rot(vec2 p,float a){float c=cos(a);float s=sin(a);return mat2(c,-s,s,c)*p;}vec3 gcol(float t){float tt=clamp(t,0.,1.);int count=uColorCount;if(count<2)count=2;float sc=tt*float(count-1);float sg=floor(sc);float f=fract(sc);if(sg<1.)return mix(uColor0,uColor1,f);if(sg<2.&&count>2.)return mix(uColor1,uColor2,f);if(sg<3.&&count>3.)return mix(uColor2,uColor3,f);if(sg<4.&&count>4.)return mix(uColor3,uColor4,f);if(sg<5.&&count>5.)return mix(uColor4,uColor5,f);if(sg<6.&&count>6.)return mix(uColor5,uColor6,f);if(sg<7.&&count>7.)return mix(uColor6,uColor7,f);if(count>7)return uColor7; if(count>6)return uColor6; if(count>5)return uColor5; if(count>4)return uColor4; if(count>3)return uColor3; if(count>2)return uColor2; return uColor1;}void main(){vec2 res=iResolution.xy;vec2 uv0=vUv;float aspect=res.x/res.y;vec2 p=uv0*2.-1.;p.x*=aspect;vec2 pr=rot(p,uAngle);pr.x/=aspect;vec2 uv=pr*.5+.5;vec2 uvMod=uv;if(uDistort>0.){float a=uvMod.y*6.;float b=uvMod.x*6.;float w=.01*uDistort;uvMod.x+=sin(a)*w;uvMod.y+=cos(b)*w;}float t=uvMod.x;if(uMirror>.5){t=1.-abs(1.-2.*fract(t));}vec3 base=gcol(t);vec2 off=vec2(iMouse.x/res.x,iMouse.y/res.y);float d=length(uv0-off);float r=max(uSpotlightRadius,1e-4);float dn=d/r;float spot=(1.-2.*pow(dn,uSpotlightSoftness))*uSpotlightOpacity;vec3 cir=vec3(spot);float stripe=fract(uvMod.x*max(uBlindCount,1.));if(uShineFlip>.5) stripe=1.-stripe;vec3 ran=vec3(stripe);vec3 col=cir+base-ran;col+=(rand(gl_FragCoord.xy+iTime)-.5)*uNoise;gl_FragColor=vec4(col,1.);} `;

    const { arr, count } = prepStops(this.opts.gradientColors);
    this.uniforms = {
      iResolution: { value: [gl.drawingBufferWidth, gl.drawingBufferHeight, 1] },
      iMouse: { value: [0, 0] },
      iTime: { value: 0 },
      uAngle: { value: this.opts.angle },
      uNoise: { value: this.opts.noise },
      uBlindCount: { value: Math.max(1, this.opts.blindCount) },
      uSpotlightRadius: { value: this.opts.spotlightRadius },
      uSpotlightSoftness: { value: this.opts.spotlightSoftness },
      uSpotlightOpacity: { value: this.opts.spotlightOpacity },
      uMirror: { value: this.opts.mirrorGradient ? 1 : 0 },
      uDistort: { value: this.opts.distortAmount },
      uShineFlip: { value: this.opts.shineDirection === 'right' ? 1 : 0 },
      uColor0: { value: arr[0] },
      uColor1: { value: arr[1] },
      uColor2: { value: arr[2] },
      uColor3: { value: arr[3] },
      uColor4: { value: arr[4] },
      uColor5: { value: arr[5] },
      uColor6: { value: arr[6] },
      uColor7: { value: arr[7] },
      uColorCount: { value: count }
    };

    const program = new Program(gl, { vertex, fragment, uniforms: this.uniforms });
    const geometry = new Triangle(gl);
    const mesh = new Mesh(gl, { program, geometry });
    this.mesh = mesh;

    const onResize = () => {
      const w = this.container.clientWidth || 1;
      const h = this.container.clientHeight || 1;
      this.renderer.setSize(w, h);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = w * dpr, H = h * dpr;
      this.uniforms.iResolution.value = [W, H, 1];
    };
    this._onResize = onResize;
    window.addEventListener('resize', onResize);
    onResize();

    const onMouseMove = (e) => {
      const rect = this.container.getBoundingClientRect();
      const x = e.clientX - rect.left; const y = e.clientY - rect.top;
      this.mouse[0] = x; this.mouse[1] = y;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    this._onMouseMove = onMouseMove;

    const loop = (t) => {
      this.time = t * 0.001;
      const s = 0.88;
      this.sMouse[0] = this.sMouse[0] * s + this.mouse[0] * (1 - s);
      this.sMouse[1] = this.sMouse[1] * s + this.mouse[1] * (1 - s);
      this.uniforms.iMouse.value = [this.sMouse[0], this.sMouse[1]];
      this.uniforms.iTime.value = this.time;
      this.renderer.render({ scene: this.mesh });
      this._raf = requestAnimationFrame(loop);
    };
    this._raf = requestAnimationFrame(loop);
  }

  destroy(){
    if (this._raf) cancelAnimationFrame(this._raf);
    if (this._onResize) window.removeEventListener('resize', this._onResize);
    if (this._onMouseMove) window.removeEventListener('mousemove', this._onMouseMove);
    if (this.renderer){
      try{ const gl = this.renderer.gl; const ext = gl.getExtension('WEBGL_lose_context'); if (ext) ext.loseContext(); }catch(_e){}
    }
    this.renderer = null; this.mesh = null; this.uniforms = null;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('gradient-blinds-background');
  if (!el) {
    console.error('❌ Container #gradient-blinds-background not found!');
    return;
  }
  console.log('✅ Container found, initializing GradientBlinds...');
  // Startparameter in WECONN3CT CI-Farben
  new GradientBlinds(el, {
    gradientColors: ['#1ECAD3', '#2E3EE8', '#9D4EDD'],
    angle: 20 * Math.PI/180,
    blindCount: 18,
    noise: 0.22,
    mirrorGradient: true,
    spotlightRadius: 0.42,
    spotlightOpacity: 0.9,
    distortAmount: 0.35,
    shineDirection: 'left'
  });
});


