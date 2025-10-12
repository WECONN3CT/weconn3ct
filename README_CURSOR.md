# GAMMA.APP DESIGN SYSTEM - CURSOR INSTRUCTIONS

## 📋 PROJEKTÜBERSICHT

Dies ist ein vollständiges Design-System basierend auf Gamma.app. Alle Styles, Komponenten und Patterns sind implementiert und ready to use.

## 🎯 FÜR CURSOR AI: SO BAUST DU DAMIT

### WICHTIGSTE REGELN

1. **IMMER diese CSS-Dateien in dieser Reihenfolge einbinden:**
   ```html
   <link rel="stylesheet" href="css/variables.css">
   <link rel="stylesheet" href="css/base.css">
   <link rel="stylesheet" href="css/components.css">
   <link rel="stylesheet" href="css/utilities.css">
   ```

2. **FARBEN-KOMBINATIONEN (WICHTIG!):**
   - ✅ Light Tones (Periwinkle, Glacier) + Deep Tones (Ultramarine, Deep Ocean)
   - ✅ Weiß/Off-White als Basis mit Primary Blue für Akzente
   - ❌ NIEMALS Midtones zusammen kombinieren
   - ❌ NIEMALS Deep Tones aufeinander setzen
   - Akzentfarben (Rocket Fire, Evergreen) nur sparsam verwenden!

3. **TYPOGRAFIE:**
   - Große Headlines: `text-7xl`, `text-6xl`, `text-5xl`
   - Fließtext: `text-base` oder `text-lg`
   - Immer `font-bold` oder `font-semibold` für Überschriften
   - Responsive: Schriften werden automatisch kleiner auf Mobile

4. **CARD-SYSTEM (Haupt-Layout-Element):**
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

5. **SPACING:**
   - Zwischen Sections: `section-lg` (große Abstände)
   - Zwischen Cards: `gap-8` oder `gap-6`
   - Interne Paddings: `p-8`, `p-6`

## 📁 DATEISTRUKTUR

```
project/
├── index.html              ← Beispiel-Template (REFERENZ!)
├── DESIGN_SYSTEM.md        ← Vollständige Design-Doku
├── README_CURSOR.md        ← Diese Datei
├── css/
│   ├── variables.css       ← Alle CSS-Variablen (Farben, Fonts, etc.)
│   ├── base.css           ← Reset, Typography, Container
│   ├── components.css     ← Cards, Buttons, Navigation, Forms
│   └── utilities.css      ← Flexbox, Grid, Helper-Classes
└── js/
    └── main.js            ← Navigation, Animations, Interaktionen
```

## 🎨 VERFÜGBARE KOMPONENTEN

### BUTTONS
```html
<!-- Primary Button -->
<button class="btn btn-primary">Primary Action</button>

<!-- Secondary Button -->
<button class="btn btn-secondary">Secondary</button>

<!-- Accent Button -->
<button class="btn btn-accent">Accent CTA</button>

<!-- Outline Button -->
<button class="btn btn-outline">Outline</button>

<!-- Größen -->
<button class="btn btn-primary btn-sm">Klein</button>
<button class="btn btn-primary btn-lg">Groß</button>
<button class="btn btn-primary btn-xl">Extra Groß</button>
```

### CARDS

#### Standard Card
```html
<div class="card">
    <div class="card-header">
        <h3 class="card-title">Card Titel</h3>
        <p class="card-subtitle">Untertitel</p>
    </div>
    <div class="card-body">
        <p>Content hier</p>
    </div>
    <div class="card-footer">
        <button class="btn btn-primary">Action</button>
    </div>
</div>
```

#### Split Card (Text + Bild)
```html
<div class="card card-split">
    <div class="card-content">
        <h2>Titel</h2>
        <p>Text Content</p>
        <button class="btn btn-primary">CTA</button>
    </div>
    <div class="card-image">
        <img src="bild.jpg" alt="Description">
    </div>
</div>
```

#### Card Grid
```html
<div class="grid-auto-fit">
    <div class="card">...</div>
    <div class="card">...</div>
    <div class="card">...</div>
</div>
```

### NAVIGATION
```html
<nav class="navbar" id="navbar">
    <div class="navbar-container">
        <a href="#" class="navbar-logo">Logo</a>
        <ul class="navbar-menu" id="navbarMenu">
            <li><a href="#section" class="navbar-link">Link</a></li>
            <li class="navbar-cta">
                <a href="#" class="btn btn-primary">CTA</a>
            </li>
        </ul>
        <button class="navbar-toggle" id="navbarToggle">
            <span class="navbar-toggle-icon"></span>
        </button>
    </div>
</nav>
```

### HERO SECTION
```html
<section class="hero bg-gradient-secondary">
    <div class="container">
        <div class="hero-content">
            <h1 class="hero-title">Große Überschrift</h1>
            <p class="hero-subtitle">Beschreibender Text</p>
            <div class="hero-cta">
                <a href="#" class="btn btn-primary btn-lg">Primary CTA</a>
                <a href="#" class="btn btn-outline btn-lg">Secondary</a>
            </div>
        </div>
    </div>
</section>
```

### BADGES & TAGS
```html
<span class="badge">Standard Badge</span>
<span class="badge badge-accent">Accent Badge</span>
<span class="badge badge-success">Success Badge</span>
```

### FORMS
```html
<div class="form-group">
    <label class="form-label">Label</label>
    <input type="text" class="form-input" placeholder="Placeholder">
    <p class="form-helper">Helper Text</p>
</div>
```

## 🎯 LAYOUT-PATTERNS

### Container-System
```html
<div class="container">        <!-- Standard (1280px) -->
<div class="container-narrow">  <!-- Schmal (800px) -->
<div class="container-wide">    <!-- Breit (1440px) -->
<div class="container-full">    <!-- Volle Breite -->
```

### Grid-Layouts
```html
<!-- 2-Spalten Grid -->
<div class="grid grid-cols-2 gap-8">
    <div>Column 1</div>
    <div>Column 2</div>
</div>

<!-- Auto-fit Grid (responsive) -->
<div class="grid-auto-fit">
    <div class="card">...</div>
    <div class="card">...</div>
</div>

<!-- 3-Spalten auf Desktop, 1 auf Mobile -->
<div class="grid grid-cols-3 md:grid-cols-1 gap-8">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
</div>
```

### Flexbox-Layouts
```html
<!-- Zentriert -->
<div class="flex items-center justify-center">
    <p>Zentrierter Content</p>
</div>

<!-- Space Between -->
<div class="flex justify-between items-center">
    <div>Links</div>
    <div>Rechts</div>
</div>

<!-- Spalten mit Gap -->
<div class="flex flex-col gap-6">
    <div>Item 1</div>
    <div>Item 2</div>
</div>
```

## 🎨 FARB-VERWENDUNG

### Backgrounds
```html
<section class="bg-white">           <!-- Weiß -->
<section class="bg-periwinkle">      <!-- Helles Blau -->
<section class="bg-glacier">         <!-- Eisblau -->
<section class="bg-primary">         <!-- Ultramarine -->
<section class="bg-gradient-primary"><!-- Gradient -->
```

### Text-Farben
```html
<p class="text-primary">       <!-- Primärfarbe -->
<p class="text-accent">        <!-- Akzentfarbe -->
<p class="text-muted">         <!-- Gedämpft -->
```

## ✨ ANIMATIONEN

### Scroll-Animationen (automatisch!)
```html
<div class="animate-fade-in-up">                    <!-- Von unten einblenden -->
<div class="animate-fade-in-up animation-delay-100"><!-- Mit Verzögerung -->
<div class="animate-slide-in-left">                 <!-- Von links -->
<div class="animate-scale-in">                      <!-- Skalieren -->
```

### Hover-Effekte
```html
<div class="hover:shadow-xl hover:-translate-y-2">
    Card mit Hover-Effekt
</div>
```

## 📱 RESPONSIVE DESIGN

### Responsive Utilities
```html
<!-- Versteckt auf Mobile -->
<div class="md:hidden">Desktop only</div>

<!-- Versteckt auf Desktop -->
<div class="mobile-only">Mobile only</div>

<!-- Flexbox-Richtung ändern -->
<div class="flex md:flex-col">Wird auf Mobile zur Spalte</div>

<!-- Text zentrieren auf Mobile -->
<div class="text-left md:text-center">...</div>

<!-- Grid-Spalten ändern -->
<div class="grid grid-cols-4 lg:grid-cols-2 md:grid-cols-1">
    <!-- 4 Spalten → 2 → 1 -->
</div>
```

### Breakpoints
- `sm`: 640px (kleine Tablets)
- `md`: 768px (Tablets)
- `lg`: 1024px (Desktop)
- `xl`: 1280px (große Desktops)

## 🚀 NEUE SEITE ERSTELLEN - STEP BY STEP

### 1. HTML-Struktur
```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- CSS -->
    <link rel="stylesheet" href="css/variables.css">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/utilities.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar" id="navbar">...</nav>
    
    <!-- Hero -->
    <section class="hero">...</section>
    
    <!-- Content Sections -->
    <section class="section-lg">...</section>
    
    <!-- Footer -->
    <footer>...</footer>
    
    <!-- JavaScript -->
    <script src="js/main.js"></script>
</body>
</html>
```

### 2. Hero Section erstellen
```html
<section class="hero bg-gradient-secondary">
    <div class="container">
        <div class="hero-content">
            <h1 class="hero-title">Deine Überschrift</h1>
            <p class="hero-subtitle">Beschreibung</p>
            <div class="hero-cta">
                <a href="#" class="btn btn-primary btn-lg">Haupt-CTA</a>
                <a href="#" class="btn btn-outline btn-lg">Sekundär</a>
            </div>
        </div>
    </div>
</section>
```

### 3. Features Grid
```html
<section class="section-lg">
    <div class="container">
        <h2 class="text-5xl font-bold text-center mb-16">Features</h2>
        
        <div class="grid-auto-fit">
            <div class="card animate-fade-in-up">
                <div class="text-4xl mb-4">🎨</div>
                <h3 class="card-title">Feature 1</h3>
                <p>Beschreibung</p>
            </div>
            
            <div class="card animate-fade-in-up animation-delay-100">
                <div class="text-4xl mb-4">⚡</div>
                <h3 class="card-title">Feature 2</h3>
                <p>Beschreibung</p>
            </div>
        </div>
    </div>
</section>
```

### 4. Split Section (Text + Bild)
```html
<section class="section-lg bg-periwinkle">
    <div class="container">
        <div class="card card-split">
            <div class="card-content">
                <h2 class="text-4xl font-bold mb-4">Überschrift</h2>
                <p class="text-lg mb-6">Text Content</p>
                <button class="btn btn-primary">CTA</button>
            </div>
            <div class="card-image">
                <img src="image.jpg" alt="Description">
            </div>
        </div>
    </div>
</section>
```

### 5. CTA Section
```html
<section class="section-lg bg-primary text-white">
    <div class="container text-center">
        <h2 class="text-6xl font-bold mb-6">Call to Action</h2>
        <p class="text-2xl mb-8">Beschreibung</p>
        <div class="flex gap-4 justify-center">
            <a href="#" class="btn btn-accent btn-xl">Primary CTA</a>
            <a href="#" class="btn btn-outline btn-xl" style="border-color: white; color: white;">Secondary</a>
        </div>
    </div>
</section>
```

## 🎯 BEST PRACTICES FÜR CURSOR

### ✅ DO's:
1. **Verwende immer das Card-System** für Content-Blöcke
2. **Nutze Utility-Classes** für Spacing (`mb-8`, `mt-16`, `gap-6`)
3. **Kombiniere Animationen** mit Delays für staggered effects
4. **Teste auf Mobile** - verwende `md:` Prefixes
5. **Verwende Container** für Content-Begrenzung
6. **Setze hohe Kontraste** (Light + Deep Farben)
7. **Füge `animate-fade-in-up`** zu Sections hinzu
8. **Verwende semantisches HTML** (header, section, footer)

### ❌ DON'Ts:
1. ❌ Keine inline-styles (außer für spezielle Fälle)
2. ❌ Keine eigenen CSS-Klassen (nutze Utilities!)
3. ❌ Keine zu kleinen Schriften (<14px für Body)
4. ❌ Keine Midtones zusammen kombinieren
5. ❌ Keine überladenen Cards (eine Idee pro Card)
6. ❌ Keine harten Kanten (immer border-radius)

## 🔧 DEBUGGING

### JavaScript nicht funktioniert?
Stelle sicher, dass:
- `js/main.js` am Ende von `<body>` eingebunden ist
- IDs korrekt sind: `navbar`, `navbarToggle`, `navbarMenu`

### Animationen nicht sichtbar?
- Elements brauchen `.animate-*` Classes
- JavaScript muss geladen sein (Intersection Observer)

### Mobile Navigation nicht funktioniert?
- Check: `.navbar-toggle` und `.navbar-menu` IDs
- CSS muss `components.css` enthalten

## 📝 BEISPIEL-WORKFLOWS

### Workflow 1: Landing Page erstellen
1. Kopiere `index.html` als Basis
2. Ändere Hero-Section (Titel, Subtitle, CTA)
3. Erstelle Features Grid mit `grid-auto-fit`
4. Füge Split-Section hinzu (Text + Bild)
5. Erstelle CTA-Section am Ende
6. Teste Mobile-Ansicht

### Workflow 2: Feature-Section hinzufügen
```html
<section class="section-lg" id="new-feature">
    <div class="container">
        <div class="text-center mb-16">
            <h2 class="text-5xl font-bold mb-4">Section Titel</h2>
            <p class="text-xl text-muted">Beschreibung</p>
        </div>
        
        <div class="grid grid-cols-3 gap-8 md:grid-cols-1">
            <!-- Cards hier -->
        </div>
    </div>
</section>
```

## 🎨 FARB-BEISPIELE

```html
<!-- Heller Hintergrund mit dunklem Text -->
<section class="bg-periwinkle">
    <h2 class="text-primary">Überschrift</h2>
    <p class="text-muted">Text</p>
</section>

<!-- Dunkler Hintergrund mit hellem Text -->
<section class="bg-primary text-white">
    <h2>Überschrift</h2>
    <p class="opacity-90">Text</p>
</section>

<!-- Gradient-Hintergrund -->
<section class="bg-gradient-primary text-white">
    <h2>Gradient Background</h2>
</section>
```

## 🚀 QUICK START CHECKLIST

- [ ] Alle CSS-Dateien eingebunden?
- [ ] JavaScript eingebunden (vor `</body>`)?
- [ ] Google Fonts geladen?
- [ ] Navigation mit korrekten IDs?
- [ ] Container um Content?
- [ ] Responsive Classes verwendet?
- [ ] Animationen hinzugefügt?
- [ ] Farb-Kontraste geprüft?
- [ ] Mobile getestet?

## 📚 WEITERFÜHRENDE INFOS

Siehe auch:
- `DESIGN_SYSTEM.md` - Vollständige Design-Dokumentation
- `index.html` - Beispiel-Implementation
- `css/components.css` - Alle Komponenten
- `css/utilities.css` - Alle Helper-Classes

---

**💡 TIPP FÜR CURSOR:** 
Kopiere Code-Snippets aus `index.html` und passe sie an. Alle Komponenten sind dort als Beispiel implementiert!

**🎯 ZIEL:** 
Baue moderne, responsive Websites im Gamma-Style ohne eigenes CSS zu schreiben. Nutze das Design-System!
