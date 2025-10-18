// 3D Circular Gallery – Vanilla JS (OGL)
// CDN Import (kein Build nötig)
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'https://esm.sh/ogl@1.0.6';

// Helpers
function debounce(func, wait){ let t; return function(...args){ clearTimeout(t); t=setTimeout(()=>func.apply(this,args),wait); }; }
function lerp(a,b,t){ return a+(b-a)*t; }
function autoBind(instance){ const proto=Object.getPrototypeOf(instance); Object.getOwnPropertyNames(proto).forEach(k=>{ if(k!== 'constructor' && typeof instance[k]==='function'){ instance[k]=instance[k].bind(instance);} }); }

// Canvas-Text (einzeilig – hier: "Name – Position")
function createTextTexture(gl, text, font='bold 28px Figtree, Inter, sans-serif', color='#ffffff'){
  const canvas=document.createElement('canvas');
  const ctx=canvas.getContext('2d');
  ctx.font=font;
  const metrics=ctx.measureText(text);
  const textWidth=Math.ceil(metrics.width);
  const textHeight=Math.ceil(parseInt(font,10)*1.4);
  canvas.width=textWidth+24; canvas.height=textHeight+24;
  ctx.font=font;
  ctx.fillStyle=color;
  ctx.textBaseline='middle';
  ctx.textAlign='center';
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillText(text, canvas.width/2, canvas.height/2);
  const texture=new Texture(gl,{generateMipmaps:false});
  texture.image=canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

class Title{ constructor({gl, plane, text, textColor='#ffffff', font='bold 28px Figtree, Inter, sans-serif'}){ autoBind(this); this.gl=gl; this.plane=plane; this.text=text; this.textColor=textColor; this.font=font; this.createMesh(); }
  createMesh(){ const {texture,width,height}=createTextTexture(this.gl,this.text,this.font,this.textColor); const geometry=new Plane(this.gl); const program=new Program(this.gl,{ vertex:`attribute vec3 position; attribute vec2 uv; uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`, fragment:`precision highp float; uniform sampler2D tMap; varying vec2 vUv; void main(){ vec4 c=texture2D(tMap,vUv); if(c.a<0.1) discard; gl_FragColor=c; }`, uniforms:{ tMap:{ value:texture } }, transparent:true }); this.mesh=new Mesh(this.gl,{ geometry, program }); const aspect=width/height; const textH=this.plane.scale.y*0.14; const textW=textH*aspect; this.mesh.scale.set(textW,textH,1); this.mesh.position.y=-this.plane.scale.y*0.5 - textH*0.55; this.mesh.setParent(this.plane); }
}

class Media{ constructor({geometry,gl,image,index,length,renderer,scene,screen,text,viewport,bend,textColor,borderRadius=0}){ this.extra=0; this.geometry=geometry; this.gl=gl; this.image=image; this.index=index; this.length=length; this.renderer=renderer; this.scene=scene; this.screen=screen; this.text=text; this.viewport=viewport; this.bend=bend; this.textColor=textColor; this.borderRadius=borderRadius; this.createShader(); this.createMesh(); this.createTitle(); this.onResize(); }
  createShader(){ const texture=new Texture(this.gl,{generateMipmaps:true}); this.program=new Program(this.gl,{ depthTest:false, depthWrite:false, vertex:`precision highp float; attribute vec3 position; attribute vec2 uv; uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; varying vec2 vUv; void main(){ vUv=uv; vec3 p=position; p.z=0.0; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0); }`, fragment:`#ifdef GL_OES_standard_derivatives\n#extension GL_OES_standard_derivatives : enable\n#endif\nprecision highp float; uniform vec2 uImageSizes; uniform vec2 uPlaneSizes; uniform sampler2D tMap; uniform float uBorderRadius; uniform float uUseTexture; varying vec2 vUv; float roundedBoxSDF(vec2 p, vec2 b, float r){ vec2 d=abs(p)-b; return length(max(d,vec2(0.0)))+min(max(d.x,d.y),0.0)-r; } void main(){ vec2 ratio=vec2( min((uPlaneSizes.x/uPlaneSizes.y)/(uImageSizes.x/uImageSizes.y),1.0), min((uPlaneSizes.y/uPlaneSizes.x)/(uImageSizes.y/uImageSizes.x),1.0)); vec2 uv=vec2( vUv.x*ratio.x+(1.0-ratio.x)*0.5, vUv.y*ratio.y+(1.0-ratio.y)*0.5 ); vec4 tex=texture2D(tMap,uv); vec3 baseRgb=mix(vec3(0.0), tex.rgb, uUseTexture); float d=roundedBoxSDF(vUv-0.5, vec2(0.5-uBorderRadius), uBorderRadius); float aa=fwidth(d)*1.5; float alpha=1.0-smoothstep(0.0, aa, d); gl_FragColor=vec4(baseRgb, alpha); }`, uniforms:{ tMap:{ value:texture }, uPlaneSizes:{ value:[0,0] }, uImageSizes:{ value:[0,0] }, uBorderRadius:{ value:this.borderRadius }, uUseTexture:{ value:0 } }, transparent:true }); const img=new Image(); img.crossOrigin='anonymous'; img.src=this.image; img.onload=()=>{ texture.image=img; this.program.uniforms.uImageSizes.value=[img.naturalWidth,img.naturalHeight]; this.program.uniforms.uUseTexture.value=1.0; }; }
  createMesh(){ this.plane=new Mesh(this.gl,{ geometry:this.geometry, program:this.program }); this.plane.setParent(this.scene); }
  createTitle(){ this.title=new Title({ gl:this.gl, plane:this.plane, text:this.text, textColor:this.textColor }); }
  update(scroll, direction){ this.plane.position.x=this.x-scroll.current-this.extra; const x=this.plane.position.x; const H=this.viewport.width/2.0; if(this.bend===0){ this.plane.position.y=0; this.plane.rotation.z=0; } else { const B=Math.abs(this.bend); const R=(H*H+B*B)/(2.0*B); const ex=Math.min(Math.abs(x),H); const arc=R-Math.sqrt(R*R-ex*ex); if(this.bend>0){ this.plane.position.y=-arc; this.plane.rotation.z=-Math.sign(x)*Math.asin(ex/R); } else { this.plane.position.y=arc; this.plane.rotation.z=Math.sign(x)*Math.asin(ex/R); } } this.program.uniforms; }
  onResize({screen,viewport}={}){ if(screen) this.screen=screen; if(viewport){ this.viewport=viewport; } const scale=this.screen.height/1500; this.plane.scale.y=(this.viewport.height*(1100*scale))/this.screen.height; this.plane.scale.x=(this.viewport.width*(700*scale))/this.screen.width; this.program.uniforms.uPlaneSizes.value=[this.plane.scale.x,this.plane.scale.y]; this.padding=2; this.width=this.plane.scale.x+this.padding; this.widthTotal=this.width*this.length; this.x=this.width*this.index; }
}

class App{ constructor(container,{items,bend=3,textColor='#ffffff',borderRadius=0.05,font='bold 28px Figtree, Inter, sans-serif',scrollSpeed=2,scrollEase=0.05}={}){ document.documentElement.classList.remove('no-js'); this.container=container; this.scrollSpeed=scrollSpeed; this.scroll={ ease:scrollEase, current:0, target:0, last:0 }; this.onCheckDebounce=debounce(this.onCheck,200); this.createRenderer(); this.createCamera(); this.createScene(); this.onResize(); this.createGeometry(); this.createMedias(items,bend,textColor,borderRadius,font); this.update(); this.addEventListeners(); }
  createRenderer(){ this.renderer=new Renderer({ alpha:true, antialias:true, dpr:Math.min(window.devicePixelRatio||1,2) }); this.gl=this.renderer.gl; this.gl.canvas.style.width='100%'; this.gl.canvas.style.height='100%'; this.gl.clearColor(0,0,0,0); this.container.appendChild(this.gl.canvas); }
  createCamera(){ this.camera=new Camera(this.gl); this.camera.fov=45; this.camera.position.z=20; }
  createScene(){ this.scene=new Transform(); }
  createGeometry(){ this.planeGeometry=new Plane(this.gl,{ heightSegments:50, widthSegments:100 }); }
  createMedias(items,bend,textColor,borderRadius,font){ const fallback=[
    { image:'Images/teams/leonardo.png', name:'Leonardo Braun', position:'Projekt- & Designmanagement' },
    { image:'Images/teams/thinesh.png',  name:'Thinesh Rajabalah', position:'Programmierung' },
    { image:'Images/teams/mentor.png',   name:'Mentor Sadiku', position:'Projektabgabe & Wartung' }
  ]; const gallery=(items&&items.length?items:fallback).concat(items&&items.length?items:fallback); this.medias=gallery.map((d,idx)=> new Media({ geometry:this.planeGeometry, gl:this.gl, image:d.image, index:idx, length:gallery.length, renderer:this.renderer, scene:this.scene, screen:this.screen, text:`${d.name} – ${d.position}`, viewport:this.viewport, bend, textColor, borderRadius })); }
  onTouchDown(e){ this.isDown=true; this.scroll.position=this.scroll.current; this.start=e.touches?e.touches[0].clientX:e.clientX; }
  onTouchMove(e){ if(!this.isDown) return; const x=e.touches?e.touches[0].clientX:e.clientX; const dist=(this.start-x)*(this.scrollSpeed*0.025); this.scroll.target=this.scroll.position+dist; }
  onTouchUp(){ this.isDown=false; this.onCheck(); }
  onWheel(e){ const d=e.deltaY||e.wheelDelta||e.detail; this.scroll.target+=(d>0?this.scrollSpeed:-this.scrollSpeed)*0.2; this.onCheckDebounce(); }
  onCheck(){ if(!this.medias||!this.medias[0]) return; const width=this.medias[0].width; const itemIndex=Math.round(Math.abs(this.scroll.target)/width); const item=width*itemIndex; this.scroll.target=this.scroll.target<0?-item:item; }
  onResize(){ const rect=this.container.getBoundingClientRect(); this.screen={ width:Math.max(1,rect.width), height:Math.max(1,rect.height) }; this.renderer.setSize(this.screen.width,this.screen.height); this.camera.perspective({ aspect:this.screen.width/this.screen.height }); const fov=(this.camera.fov*Math.PI)/180; const h=2*Math.tan(fov/2)*this.camera.position.z; const w=h*this.camera.aspect; this.viewport={ width:w, height:h }; if(this.medias){ this.medias.forEach(m=>m.onResize({ screen:this.screen, viewport:this.viewport })); } }
  update(){ this.scroll.current=lerp(this.scroll.current,this.scroll.target,this.scroll.ease); const dir=this.scroll.current>this.scroll.last?'right':'left'; if(this.medias){ this.medias.forEach(m=>m.update(this.scroll,dir)); } try{ this.renderer.render({ scene:this.scene, camera:this.camera }); }catch(_e){} this.scroll.last=this.scroll.current; this.raf=window.requestAnimationFrame(this.update.bind(this)); }
  addEventListeners(){ this.boundOnResize=this.onResize.bind(this); this.boundOnWheel=this.onWheel.bind(this); this.boundOnTouchDown=this.onTouchDown.bind(this); this.boundOnTouchMove=this.onTouchMove.bind(this); this.boundOnTouchUp=this.onTouchUp.bind(this); window.addEventListener('resize',this.boundOnResize); window.addEventListener('wheel',this.boundOnWheel); window.addEventListener('mousedown',this.boundOnTouchDown); window.addEventListener('mousemove',this.boundOnTouchMove); window.addEventListener('mouseup',this.onTouchUp.bind(this)); window.addEventListener('touchstart',this.boundOnTouchDown); window.addEventListener('touchmove',this.boundOnTouchMove); window.addEventListener('touchend',this.onTouchUp.bind(this)); }
  destroy(){ window.cancelAnimationFrame(this.raf); window.removeEventListener('resize',this.boundOnResize); window.removeEventListener('wheel',this.boundOnWheel); window.removeEventListener('mousedown',this.boundOnTouchDown); window.removeEventListener('mousemove',this.boundOnTouchMove); window.removeEventListener('mouseup',this.onTouchUp); window.removeEventListener('touchstart',this.boundOnTouchDown); window.removeEventListener('touchmove',this.boundOnTouchMove); window.removeEventListener('touchend',this.onTouchUp); if(this.renderer&&this.renderer.gl&&this.renderer.gl.canvas.parentNode){ this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas); } }
}

// Auto-Init
function initCircularGallery(){
  const section=document.getElementById('team'); if(!section) return;
  let container=document.getElementById('team-gallery');
  if(!container){
    container=document.createElement('div');
    container.id='team-gallery';
    container.className='circular-gallery';
    Object.assign(container.style, {
      width:'100%',
      height:'600px',
      minHeight:'600px',
      position:'relative'
    });
    // in Section oberhalb der State-of-the-Art Karte einfügen
    const anchor=section.querySelector('.mt-16');
    section.querySelector('.container')?.insertBefore(container, anchor||null);
  }
  if(container.__galleryInit) return; container.__galleryInit=true;

  const items=[
    { image:'Images/teams/leonardo.png', name:'Leonardo Braun', position:'Projekt- & Designmanagement' },
    { image:'Images/teams/thinesh.png',  name:'Thinesh Rajabalah', position:'Programmierung' },
    { image:'Images/teams/mentor.png',   name:'Mentor Sadiku', position:'Projektabgabe & Wartung' }
  ];

  const app=new App(container,{ items, bend:3, textColor:'#ffffff', borderRadius:0.05, scrollSpeed:2, scrollEase:0.05 });
  window.__teamGallery=app;

  // Cleanup
  window.addEventListener('beforeunload', ()=>{ try{ app.destroy(); }catch(_e){} });
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded', initCircularGallery);
}else{
  initCircularGallery();
}


