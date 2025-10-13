// Vanilla JS BlurText using Web Animations API
(function(){
  class BlurText {
    constructor(el, cfg={}){
      this.root = el;
      this.config = Object.assign({
        text: '',
        delay: 150,
        animateBy: 'words', // 'words' | 'chars'
        direction: 'top',   // 'top' | 'bottom'
        threshold: 0.2,
        stepDuration: 0.4,  // seconds
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }, cfg);
      this.setup();
    }

    setup(){
      const text = this.config.text || this.root.textContent || '';
      const items = (this.config.animateBy === 'chars') ? Array.from(text) : text.split(' ');
      this.root.textContent = '';
      this.spans = items.map((segment, i)=>{
        const span = document.createElement('span');
        span.className = 'blur-text-word';
        span.textContent = segment === ' ' ? '\u00A0' : segment;
        if (this.config.animateBy === 'words' && i < items.length - 1) {
          span.textContent += ' ';
        }
        this.root.appendChild(span);
        return span;
      });

      // Observer
      const io = new IntersectionObserver((entries)=>{
        if (entries[0].isIntersecting){
          this.animate();
          io.disconnect();
        }
      }, { threshold: this.config.threshold });
      io.observe(this.root);
    }

    animate(){
      const fromY = this.config.direction === 'top' ? -50 : 50;
      const midY  = this.config.direction === 'top' ? 5 : -5;
      const durationMs = Math.max(200, Math.round(this.config.stepDuration * 1000 * 2));
      this.spans.forEach((span, index)=>{
        span.animate([
          { filter: 'blur(10px)', opacity: 0, transform: `translateY(${fromY}px)` },
          { filter: 'blur(5px)',  opacity: 0.5, transform: `translateY(${midY}px)`, offset: 0.5 },
          { filter: 'blur(0px)',  opacity: 1,   transform: 'translateY(0px)' }
        ],{
          duration: durationMs,
          delay: index * this.config.delay,
          easing: this.config.easing,
          fill: 'forwards'
        });
      });
    }
  }

  window.BlurText = BlurText;

  document.addEventListener('DOMContentLoaded', ()=>{
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle){
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


