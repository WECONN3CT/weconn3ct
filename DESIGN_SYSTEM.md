# GAMMA.APP DESIGN SYSTEM
## Vollständige Design-Anleitung für Cursor

### 🎨 FARBPALETTE

#### Primärfarben (Core Blues)
```css
--gamma-ultramarine: #2E3EE8;
--gamma-deep-ocean: #1B2470;
--gamma-periwinkle: #E8EBFF;
--gamma-glacier: #F0F4FF;
```

#### Akzentfarben (sparsam verwenden!)
```css
--gamma-rocket-fire: #FF4E3E;
--gamma-evergreen: #00C896;
--gamma-purple: #9D4EDD;
--gamma-orange: #FF8C42;
```

#### Neutrale Farben
```css
--gamma-white: #FFFFFF;
--gamma-off-white: #FAFBFC;
--gamma-light-gray: #E5E7EB;
--gamma-gray: #9CA3AF;
--gamma-dark-gray: #4B5563;
--gamma-black: #111827;
```

#### Farbregeln
- **Light Tones (Periwinkle, Glacier)** = Hintergründe
- **Deep Tones (Ultramarine, Deep Ocean)** = Text, Buttons, Hauptelemente
- **Akzentfarben** = Nur für CTAs, Highlights, wichtige Elemente
- **Kontrast-Regel**: Immer Light + Deep kombinieren, niemals Midtones zusammen

---

### 📝 TYPOGRAFIE

#### Font-Families
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-secondary: 'Space Grotesk', 'Inter', sans-serif;
--font-display: 'Cabinet Grotesk', 'Inter', sans-serif;
```

**Alternative (wenn ES Build/PP Mori nicht verfügbar):**
- ES Build → Cabinet Grotesk, Space Grotesk, Inter
- PP Mori → Inter, System UI

#### Font-Größen
```css
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */
--text-6xl: 3.75rem;     /* 60px */
--text-7xl: 4.5rem;      /* 72px */
```

#### Font-Weights
```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

#### Line-Heights
```css
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;
```

---

### 📐 SPACING & LAYOUT

#### Spacing Scale
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
```

#### Border Radius
```css
--radius-none: 0;
--radius-sm: 0.375rem;   /* 6px */
--radius-md: 0.5rem;     /* 8px */
--radius-lg: 0.75rem;    /* 12px */
--radius-xl: 1rem;       /* 16px */
--radius-2xl: 1.5rem;    /* 24px */
--radius-3xl: 2rem;      /* 32px */
--radius-full: 9999px;
```

#### Shadows
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
--shadow-gamma: 0 8px 32px rgba(46, 62, 232, 0.15);
```

---

### 🎯 KOMPONENTEN-SYSTEM

#### 1. CARD SYSTEM (Kern-Element)
**Card-Typen:**
- Standard Card: Text + optionales Bild
- Full-bleed Card: Randlos, volle Breite
- Split Card: Text + Accent Image (50/50)
- Hero Card: Großes Bild mit Overlay-Text

**Card-Properties:**
```css
.card {
  background: var(--gamma-white);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.card-full-bleed {
  border-radius: 0;
  margin: 0 calc(var(--space-8) * -1);
  width: calc(100% + var(--space-16));
}
```

#### 2. BUTTONS
```css
/* Primary Button */
.btn-primary {
  background: var(--gamma-ultramarine);
  color: var(--gamma-white);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
  transition: all 0.2s ease;
}

/* Secondary Button */
.btn-secondary {
  background: var(--gamma-periwinkle);
  color: var(--gamma-ultramarine);
}

/* Accent Button */
.btn-accent {
  background: var(--gamma-rocket-fire);
  color: var(--gamma-white);
}
```

#### 3. NAVIGATION
- Sticky Header mit Glasmorphism
- Logo links, Navigation rechts
- Mobile: Hamburger Menu
- Smooth Scroll

#### 4. HERO SECTION
- Großer Titel (text-5xl bis text-7xl)
- Untertitel (text-lg bis text-xl)
- CTA-Buttons
- Optional: Accent Image oder Gradient Background

---

### 🎨 LAYOUT-PATTERNS

#### Container
```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

.container-narrow {
  max-width: 800px;
}

.container-wide {
  max-width: 1440px;
}
```

#### Grid System
```css
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-8); }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-8); }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-8); }
```

#### Flexbox Utilities
```css
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.gap-4 { gap: var(--space-4); }
```

---

### ✨ ANIMATIONEN & TRANSITIONS

#### Hover-Effekte
```css
/* Button Hover */
.btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}

/* Card Hover */
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-2xl);
}
```

#### Fade-In Animation
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}
```

#### Scroll-basierte Animationen
- Cards erscheinen beim Scrollen
- Parallax-Effekte für Bilder
- Smooth transitions zwischen Sektionen

---

### 📱 RESPONSIVE BREAKPOINTS

```css
/* Mobile First Approach */
--breakpoint-sm: 640px;   /* Tablets */
--breakpoint-md: 768px;   /* Tablets landscape */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large Desktop */
--breakpoint-2xl: 1536px; /* Extra Large */

@media (max-width: 768px) {
  /* Mobile Styles */
  .grid-3 { grid-template-columns: 1fr; }
  .text-7xl { font-size: var(--text-4xl); }
}
```

---

### 🎯 DESIGN-PRINZIPIEN

1. **Mobile-First**: Immer von klein nach groß designen
2. **Kontrast**: Hoher Kontrast für Lesbarkeit (besonders mobil)
3. **Eine Idee pro Card**: Klare, fokussierte Content-Blöcke
4. **Weißraum**: Großzügiger Abstand zwischen Elementen
5. **Konsistenz**: Gleiche Abstände, Rundungen, Schatten
6. **Storytelling**: Content fließt logisch von oben nach unten
7. **Interaktivität**: Hover-Effekte, smooth transitions
8. **Performance**: Optimierte Bilder, lazy loading

---

### 🚀 WICHTIGE HINWEISE FÜR CURSOR

#### DO's:
✅ Verwende das Card-System als Hauptlayout-Element
✅ Kombiniere Light + Deep Farbtöne für Kontrast
✅ Nutze großzügige Abstände (min. 32px zwischen Sektionen)
✅ Implementiere smooth hover-transitions
✅ Mache alles mobile-responsive
✅ Verwende Flexbox/Grid für Layouts
✅ Füge subtile Animationen hinzu

#### DON'Ts:
❌ Keine Midtones zusammen kombinieren
❌ Keine zu kleinen Schriften (<14px für Body-Text)
❌ Keine harten Kanten (immer border-radius)
❌ Keine überladenen Cards (eine Idee pro Card)
❌ Keine schwachen Kontraste
❌ Keine starren Layouts (immer responsive)

---

### 📦 DATEISTRUKTUR

```
project/
├── index.html
├── css/
│   ├── variables.css      (alle CSS-Variablen)
│   ├── base.css          (Reset, Typography)
│   ├── components.css    (Cards, Buttons, etc.)
│   └── utilities.css     (Helper-Classes)
├── js/
│   ├── main.js           (Hauptlogik)
│   └── animations.js     (Scroll-Animationen)
└── assets/
    └── images/
```

---

### 🎨 BEISPIEL-KOMPONENTEN

#### Hero Section
```html
<section class="hero">
  <div class="container">
    <h1 class="text-7xl font-bold">Große Überschrift</h1>
    <p class="text-xl text-gray">Untertitel hier</p>
    <div class="cta-buttons">
      <button class="btn-primary">Primary Action</button>
      <button class="btn-secondary">Secondary</button>
    </div>
  </div>
</section>
```

#### Card Grid
```html
<section class="cards-section">
  <div class="container">
    <div class="grid-3">
      <div class="card">
        <h3>Card Titel</h3>
        <p>Card Content</p>
      </div>
      <!-- mehr cards -->
    </div>
  </div>
</section>
```

---

Diese Datei dient als vollständige Referenz für alle Design-Entscheidungen.
