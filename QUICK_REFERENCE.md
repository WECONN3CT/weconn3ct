# GAMMA DESIGN SYSTEM - QUICK REFERENCE CHEAT SHEET

## 🎨 FARBEN

### CSS-Variablen
```css
--gamma-ultramarine      /* #2E3EE8 - Hauptblau */
--gamma-deep-ocean       /* #1B2470 - Dunkles Blau */
--gamma-periwinkle       /* #E8EBFF - Helles Blau */
--gamma-glacier          /* #F0F4FF - Eisblau */
--gamma-rocket-fire      /* #FF4E3E - Rot (Akzent) */
--gamma-evergreen        /* #00C896 - Grün (Akzent) */
```

### Utility-Klassen
```css
.bg-white, .bg-periwinkle, .bg-glacier, .bg-primary
.text-primary, .text-accent, .text-muted
.bg-gradient-primary, .bg-gradient-secondary
```

## 📝 TYPOGRAFIE

### Größen
```css
.text-xs     /* 12px */
.text-sm     /* 14px */
.text-base   /* 16px */
.text-lg     /* 18px */
.text-xl     /* 20px */
.text-2xl    /* 24px */
.text-3xl    /* 30px */
.text-4xl    /* 36px */
.text-5xl    /* 48px */
.text-6xl    /* 60px */
.text-7xl    /* 72px */
```

### Gewichte & Alignment
```css
.font-normal, .font-medium, .font-semibold, .font-bold, .font-extrabold
.text-left, .text-center, .text-right
.leading-tight, .leading-normal, .leading-relaxed
```

## 🔲 BUTTONS

```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-accent">Accent</button>
<button class="btn btn-outline">Outline</button>
<button class="btn btn-ghost">Ghost</button>

<!-- Größen -->
<button class="btn btn-sm">Klein</button>
<button class="btn btn-lg">Groß</button>
<button class="btn btn-xl">Extra</button>
```

## 🎴 CARDS

### Basic Card
```html
<div class="card">
    <div class="card-header">
        <h3 class="card-title">Titel</h3>
    </div>
    <div class="card-body">
        <p>Content</p>
    </div>
</div>
```

### Split Card
```html
<div class="card card-split">
    <div class="card-content">...</div>
    <div class="card-image">
        <img src="..." alt="">
    </div>
</div>
```

### Varianten
```css
.card-flat          /* Ohne Shadow */
.card-gradient      /* Mit Gradient */
.card-glass         /* Glassmorphism */
.card-full-bleed    /* Volle Breite */
```

## 📐 LAYOUT

### Container
```html
<div class="container">Standard (1280px)</div>
<div class="container-narrow">Schmal (800px)</div>
<div class="container-wide">Breit (1440px)</div>
```

### Grid
```html
<div class="grid grid-cols-3 gap-8">...</div>
<div class="grid-auto-fit">...</div>  <!-- Responsive -->
```

### Flexbox
```html
<div class="flex items-center justify-between">...</div>
<div class="flex flex-col gap-6">...</div>
```

## 📏 SPACING

### Margin
```css
.mt-4, .mt-8, .mt-12, .mt-16, .mt-20
.mb-4, .mb-8, .mb-12, .mb-16, .mb-20
.my-4, .my-8, .my-12
```

### Padding
```css
.pt-8, .pt-12, .pt-16
.pb-8, .pb-12, .pb-16
.py-8, .py-12, .py-16
```

### Gap
```css
.gap-2, .gap-4, .gap-6, .gap-8, .gap-12, .gap-16
```

## ✨ ANIMATIONEN

```html
<div class="animate-fade-in">Fade In</div>
<div class="animate-fade-in-up">Fade In Up</div>
<div class="animate-slide-in-left">Slide Left</div>
<div class="animate-scale-in">Scale In</div>

<!-- Mit Delay -->
<div class="animate-fade-in-up animation-delay-100">100ms</div>
<div class="animate-fade-in-up animation-delay-200">200ms</div>
```

## 🎯 COMMON PATTERNS

### Hero Section
```html
<section class="hero bg-gradient-secondary">
    <div class="container">
        <div class="hero-content">
            <h1 class="hero-title">Titel</h1>
            <p class="hero-subtitle">Subtitle</p>
            <div class="hero-cta">
                <a href="#" class="btn btn-primary btn-lg">CTA</a>
            </div>
        </div>
    </div>
</section>
```

### Feature Grid
```html
<section class="section-lg">
    <div class="container">
        <div class="grid-auto-fit">
            <div class="card">
                <h3 class="card-title">Feature</h3>
                <p>Description</p>
            </div>
        </div>
    </div>
</section>
```

### Navigation
```html
<nav class="navbar" id="navbar">
    <div class="navbar-container">
        <a href="#" class="navbar-logo">Logo</a>
        <ul class="navbar-menu" id="navbarMenu">
            <li><a href="#" class="navbar-link">Link</a></li>
        </ul>
        <button class="navbar-toggle" id="navbarToggle">
            <span class="navbar-toggle-icon"></span>
        </button>
    </div>
</nav>
```

## 📱 RESPONSIVE

```css
/* Desktop → Tablet → Mobile */
.grid-cols-4              /* Desktop: 4 Spalten */
.lg:grid-cols-2           /* Tablet: 2 Spalten */
.md:grid-cols-1           /* Mobile: 1 Spalte */

/* Flexbox Direction */
.flex                     /* Desktop: Zeile */
.md:flex-col             /* Mobile: Spalte */

/* Visibility */
.md:hidden               /* Versteckt auf Mobile */
.mobile-only             /* Nur auf Mobile */

/* Text Alignment */
.text-left               /* Desktop: Links */
.md:text-center         /* Mobile: Zentriert */
```

## 🔧 UTILITIES

### Display
```css
.block, .inline-block, .flex, .grid, .hidden
```

### Position
```css
.relative, .absolute, .fixed, .sticky
```

### Size
```css
.w-full, .h-full, .w-screen, .h-screen
.max-w-xl, .max-w-2xl, .max-w-4xl
```

### Shadows
```css
.shadow-sm, .shadow-md, .shadow-lg, .shadow-xl, .shadow-gamma
```

### Border Radius
```css
.rounded-lg, .rounded-xl, .rounded-2xl, .rounded-full
```

### Opacity
```css
.opacity-0, .opacity-50, .opacity-75, .opacity-100
```

## 🎨 FARB-KOMBINATIONEN

### ✅ GOOD
```html
<!-- Light BG + Deep Text -->
<section class="bg-periwinkle">
    <h2 class="text-primary">Heading</h2>
</section>

<!-- Deep BG + White Text -->
<section class="bg-primary text-white">
    <h2>Heading</h2>
</section>

<!-- White BG + Primary Accent -->
<section class="bg-white">
    <button class="btn btn-primary">CTA</button>
</section>
```

### ❌ BAD
```html
<!-- Midtones zusammen -->
<div class="bg-purple text-orange">❌</div>

<!-- Deep auf Deep -->
<div class="bg-deep-ocean text-primary">❌</div>
```

## 🚀 SCHNELLSTART-TEMPLATE

```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/variables.css">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/utilities.css">
</head>
<body>
    <nav class="navbar" id="navbar">...</nav>
    <section class="hero">...</section>
    <section class="section-lg">...</section>
    <script src="js/main.js"></script>
</body>
</html>
```

## 📋 CHECKLISTE

Vor dem Build:
- [ ] CSS-Dateien eingebunden (richtige Reihenfolge!)
- [ ] Container verwendet
- [ ] Responsive Klassen gesetzt
- [ ] Animationen hinzugefügt
- [ ] Farb-Kontraste geprüft
- [ ] Mobile getestet

## 💡 TIPPS

1. **Immer Container verwenden** für Content-Begrenzung
2. **Grid-auto-fit** für responsive Card-Grids
3. **animate-fade-in-up** + delays für schöne Scroll-Effekte
4. **section-lg** für große Abstände zwischen Sections
5. **md:grid-cols-1** macht fast jedes Grid mobile-ready
6. **btn btn-primary btn-lg** für Hero-CTAs

---

**🔍 QUICK LOOKUP:**
- Farben → `variables.css` Zeile 1-50
- Buttons → `components.css` Zeile 1-100
- Cards → `components.css` Zeile 100-250
- Grid → `utilities.css` Zeile 40-80
- Responsive → `utilities.css` Ende
