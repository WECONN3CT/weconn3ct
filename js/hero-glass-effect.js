// Hero Title Glass Effect with Chromatic Aberration (Vanilla JS)
(function() {
  const generateDisplacementMap = (width, height) => {
    const borderWidth = 0.07;
    const borderRadius = 20;
    const brightness = 50;
    const opacity = 0.93;
    const blur = 11;

    const edgeSize = Math.min(width, height) * (borderWidth * 0.5);

    const svgContent = `
      <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hero-red-grad" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="hero-blue-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${width}" height="${height}" fill="black"/>
        <rect x="0" y="0" width="${width}" height="${height}" rx="${borderRadius}" fill="url(#hero-red-grad)"/>
        <rect x="0" y="0" width="${width}" height="${height}" rx="${borderRadius}" fill="url(#hero-blue-grad)" style="mix-blend-mode: difference"/>
        <rect x="${edgeSize}" y="${edgeSize}" width="${width - edgeSize * 2}" height="${height - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)"/>
      </svg>
    `;

    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  };

  const initGlassEffect = () => {
    const wrapper = document.querySelector('.hero-title-glass-wrapper');
    const title = document.querySelector('.hero-title-glass');
    const feImage = document.getElementById('hero-displacement-map');

    if (!wrapper || !title || !feImage) {
      console.warn('Hero glass effect elements not found');
      return;
    }

    const updateMap = () => {
      const rect = title.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      const mapURL = generateDisplacementMap(width, height);
      feImage.setAttribute('href', mapURL);
    };

    // Initialize
    updateMap();

    // Update on resize
    const resizeObserver = new ResizeObserver(() => {
      setTimeout(updateMap, 0);
    });
    resizeObserver.observe(title);

    console.log('✅ Hero glass effect initialized');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlassEffect);
  } else {
    initGlassEffect();
  }
})();


