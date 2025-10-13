/* BlurText – Vanilla JS Web Animations API
 * Animiert Wörter oder Zeichen mit Blur→Sharp, Fade-in und TranslateY
 */
(function(){
  class BlurText {
    constructor(rootEl, options={}){
      this.rootEl = rootEl;
      const datasetText = (rootEl.getAttribute('data-blur-text')||'').trim();
      const defaults = {
        text: datasetText,
        delay: 150,              // ms zwischen Segmenten
        animateBy: 'words',      // 'words' | 'chars'
        direction: 'top',        // 'top' | 'bottom'
        threshold: 0.2,
        stepDuration: 0.4,       // Sekunden pro Schritt (2 Schritte + Start)
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      };
      this.config = Object.assign({}, defaults, options);
      this.segments = [];
      this._built = false;
      this._observer = null;
      this.build();
      this.observe();
    }

    build(){
      if (this._built) return;
      const { text, animateBy, direction } = this.config;
      const content = (text || this.rootEl.textContent || '').trim();
      this.rootEl.textContent = '';

      const isWords = animateBy === 'words';
      const parts = isWords ? content.split(' ') : Array.from(content);
      const initialY = direction === 'top' ? -50 : 50;

      parts.forEach((p, idx)=>{
        const span = document.createElement('span');
        span.className = 'blur-text-word';
        span.textContent = p;
        span.style.filter = 'blur(10px)';
        span.style.opacity = '0';
        span.style.transform = `translateY(${initialY}px)`;
        this.rootEl.appendChild(span);
        this.segments.push(span);
        // Zwischenräume für Wortmodus
        if (isWords && idx < parts.length - 1) this.rootEl.appendChild(document.createTextNode(' '));
      });
      this._built = true;
    }

    observe(){
      const { threshold } = this.config;
      const onEnter = (entries, obs)=>{
        const e = entries[0];
        if (!e || !e.isIntersecting) return;
        obs.unobserve(this.rootEl);
        this.animate();
      };
      this._observer = new IntersectionObserver(onEnter, { threshold });
      this._observer.observe(this.rootEl);
      // Falls bereits sichtbar (Hero oben), sofort animieren
      if (this.isInViewport(this.rootEl)) {
        try { this._observer.disconnect(); } catch(_){}
        this.animate();
      }
    }

    isInViewport(el){
      const r = el.getBoundingClientRect();
      return r.top < (window.innerHeight||document.documentElement.clientHeight) && r.bottom > 0;
    }

    animate(){
      const { delay, stepDuration, easing, direction } = this.config;
      const up = direction === 'top';
      const keyframes = [
        { filter:'blur(10px)', opacity: 0,   transform: `translateY(${up?-50:50}px)` },
        { filter:'blur(5px)',  opacity: 0.5, transform: `translateY(${up?5:-5}px)`, offset: 0.6 },
        { filter:'blur(0px)',  opacity: 1,   transform: 'translateY(0px)' }
      ];
      const duration = Math.max(200, stepDuration * 2 * 1000);

      this.segments.forEach((el, i)=>{
        el.animate(keyframes, {
          duration,
          easing,
          delay: i * delay,
          fill: 'forwards'
        });
      });
    }
  }

  // Expose + Auto-init for hero title
  window.BlurText = BlurText;
  document.addEventListener('DOMContentLoaded', ()=>{
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
      new BlurText(heroTitle, {
        text: heroTitle.dataset.blurText,
        delay: 150,
        animateBy: 'words',
        direction: 'top',
        stepDuration: 0.4
      });
    }
  });
})();


