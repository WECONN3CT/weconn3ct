# GAMMA DESIGN SYSTEM - PROJEKT-ÜBERSICHT

## 📦 ALLE DATEIEN UND IHRE ZWECKE

### 📚 DOKUMENTATION

#### `DESIGN_SYSTEM.md`
**Zweck:** Vollständige Design-System Dokumentation
- Alle Farben mit HEX-Codes
- Typografie-Regeln und Schriften
- Spacing-System
- Komponenten-Übersicht
- Design-Prinzipien
- **Wann verwenden:** Für tiefes Verständnis des Design-Systems

#### `README_CURSOR.md`
**Zweck:** Ausführliche Anleitung speziell für Cursor AI
- Step-by-Step Anleitungen
- Code-Beispiele für alle Komponenten
- Layout-Patterns
- Best Practices
- Workflows
- **Wann verwenden:** Als Haupt-Referenz beim Entwickeln

#### `QUICK_REFERENCE.md`
**Zweck:** Schnelle Nachschlage-Cheat-Sheet
- Alle wichtigen Klassen auf einen Blick
- Copy-Paste-Ready Code-Snippets
- Häufigste Patterns
- **Wann verwenden:** Wenn du schnell eine Klasse finden musst

#### `.cursorrules`
**Zweck:** Automatische Regeln für Cursor AI
- Wird von Cursor automatisch erkannt
- Definiert Projekt-Konventionen
- Code-Style Guidelines
- **Wann verwenden:** Cursor lädt diese automatisch

#### `PROJECT_OVERVIEW.md` (diese Datei)
**Zweck:** Übersicht über alle Dateien
- Was ist wo
- Wann welche Datei verwenden
- **Wann verwenden:** Zum Orientieren im Projekt

---

### 🎨 CSS-DATEIEN

#### `css/variables.css`
**Zweck:** Alle CSS-Variablen
**Inhalt:**
- Farbpalette (Primary, Accent, Neutrals)
- Typografie (Font-Families, Sizes, Weights)
- Spacing-Scale
- Border-Radius
- Shadows
- Transitions
- Z-Index
- Gradients

**Einbinden:** Als ERSTES in HTML
```html
<link rel="stylesheet" href="css/variables.css">
```

#### `css/base.css`
**Zweck:** Reset, Basis-Styles, Typography
**Inhalt:**
- CSS Reset
- Typography (h1-h6, p, lists)
- Container-System
- Sections
- Spacing Utilities
- Text Utilities
- Color Utilities

**Einbinden:** Als ZWEITES in HTML
```html
<link rel="stylesheet" href="css/base.css">
```

#### `css/components.css`
**Zweck:** Alle UI-Komponenten
**Inhalt:**
- Buttons (alle Varianten)
- Cards (Standard, Split, Full-bleed)
- Navigation (Navbar, Mobile Menu)
- Hero Section
- Badges & Tags
- Forms
- Avatars
- Dividers

**Einbinden:** Als DRITTES in HTML
```html
<link rel="stylesheet" href="css/components.css">
```

#### `css/utilities.css`
**Zweck:** Helper-Klassen und Utilities
**Inhalt:**
- Display (flex, grid, block, etc.)
- Flexbox Utilities
- Grid System
- Position
- Width & Height
- Shadows
- Border Radius
- Animations
- Responsive Utilities

**Einbinden:** Als LETZTES in HTML
```html
<link rel="stylesheet" href="css/utilities.css">
```

---

### 💻 JAVASCRIPT-DATEIEN

#### `js/main.js`
**Zweck:** Haupt-JavaScript mit Core-Funktionen
**Inhalt:**
- Mobile Navigation
- Sticky Navbar
- Smooth Scroll
- Scroll Animations (Intersection Observer)
- Active Navigation Links
- Card Hover Effects
- Button Ripple Effect
- Scroll to Top Button
- Lazy Loading Images

**Einbinden:** Am Ende von <body>
```html
<script src="js/main.js"></script>
```

#### `js/animations.js` (OPTIONAL)
**Zweck:** Erweiterte Animations-Effekte
**Inhalt:**
- Scroll Progress Bar
- Parallax Scrolling
- Advanced Reveal Animations
- Counter Animation
- Stagger Animation
- Typing Effect
- Floating Elements
- Gradient Text Animation
- Magnetic Cursor Effect
- Image Reveal

**Einbinden:** Optional nach main.js
```html
<script src="js/animations.js"></script>
```

---

### 📄 HTML-DATEIEN

#### `index.html`
**Zweck:** Vollständiges Beispiel-Template
**Inhalt:**
- Navigation mit Mobile Menu
- Hero Section
- Features Grid
- Split Card Section
- How It Works Section
- Testimonials
- CTA Section
- Footer

**Verwendung:** Als Referenz und Startpunkt kopieren

---

## 🚀 QUICK START GUIDE

### 1. NEUE SEITE ERSTELLEN

**Minimale HTML-Struktur:**
```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Deine Seite</title>
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- CSS in dieser Reihenfolge! -->
    <link rel="stylesheet" href="css/variables.css">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/utilities.css">
</head>
<body>
    
    <!-- Navigation kopieren aus index.html -->
    <nav class="navbar" id="navbar">...</nav>
    
    <!-- Hero Section -->
    <section class="hero">...</section>
    
    <!-- Content Sections -->
    <section class="section-lg">...</section>
    
    <!-- Footer -->
    <footer>...</footer>
    
    <!-- JavaScript am Ende! -->
    <script src="js/main.js"></script>
    <!-- Optional: Erweiterte Animationen -->
    <!-- <script src="js/animations.js"></script> -->
</body>
</html>
```

### 2. DATEI-VERWENDUNG WORKFLOW

**Beim Entwickeln:**
1. **Starte mit** `index.html` als Vorlage
2. **Referenziere** `QUICK_REFERENCE.md` für Klassen
3. **Schaue in** `README_CURSOR.md` für Code-Beispiele
4. **Prüfe** `DESIGN_SYSTEM.md` bei Fragen zum Design

**Bei Problemen:**
1. **Check** `.cursorrules` für Projekt-Regeln
2. **Vergleiche** mit `index.html` Beispielen
3. **Suche in** `README_CURSOR.md` nach Lösungen

---

## 📋 CHECKLISTEN

### ✅ Neue Seite Checklist
- [ ] Alle 4 CSS-Dateien eingebunden (richtige Reihenfolge!)
- [ ] Google Fonts geladen
- [ ] Container um Content (`<div class="container">`)
- [ ] Navigation mit korrekten IDs (`navbar`, `navbarMenu`, `navbarToggle`)
- [ ] JavaScript eingebunden (vor `</body>`)
- [ ] Responsive Klassen verwendet (`md:grid-cols-1`)
- [ ] Animationen hinzugefügt (`animate-fade-in-up`)
- [ ] Farb-Kontraste geprüft (Light + Deep)

### ✅ Code Quality Checklist
- [ ] Keine custom CSS-Klassen (nur Utilities!)
- [ ] Semantic HTML verwendet
- [ ] Card-System für Content-Blöcke
- [ ] Spacing mit Utility-Klassen (`mb-8`, `gap-6`)
- [ ] Mobile-First responsive
- [ ] Accessibility (alt-tags, aria-labels)

---

## 🎯 WELCHE DATEI WANN?

### Ich möchte verstehen wie das System funktioniert
→ Lies `DESIGN_SYSTEM.md`

### Ich möchte schnell eine Klasse finden
→ Nutze `QUICK_REFERENCE.md`

### Ich möchte Code-Beispiele sehen
→ Schaue in `README_CURSOR.md` oder `index.html`

### Ich möchte eine neue Komponente bauen
→ 1. Suche in `QUICK_REFERENCE.md` nach Pattern
→ 2. Kopiere Code aus `index.html`
→ 3. Passe an mit Hilfe von `README_CURSOR.md`

### Ich verstehe eine CSS-Variable nicht
→ Schaue in `css/variables.css` (kommentiert)

### Ich brauche einen speziellen Button-Style
→ `components.css` anschauen oder `QUICK_REFERENCE.md`

### Ich möchte coole Animationen
→ Nutze `js/animations.js` (siehe Kommentare für Beispiele)

### Cursor versteht meine Anfrage nicht
→ Check ob `.cursorrules` geladen wurde
→ Referenziere explizit: "Nutze das Design aus README_CURSOR.md"

---

## 🔧 TROUBLESHOOTING

### Problem: Styles werden nicht geladen
**Lösung:** 
- Prüfe CSS-Reihenfolge (variables → base → components → utilities)
- Check Browser Console für Fehler
- Pfade korrekt? (`css/` Ordner vorhanden?)

### Problem: JavaScript funktioniert nicht
**Lösung:**
- JavaScript am Ende von `<body>` eingebunden?
- Browser Console für Fehler checken
- IDs korrekt? (`navbar`, `navbarMenu`, `navbarToggle`)

### Problem: Mobile Navigation öffnet nicht
**Lösung:**
- `main.js` eingebunden?
- Korrektes HTML-Markup aus `index.html` kopiert?
- IDs vorhanden und korrekt?

### Problem: Animationen laufen nicht
**Lösung:**
- Klassen korrekt? (`animate-fade-in-up`)
- JavaScript geladen?
- Intersection Observer supported? (moderne Browser)

### Problem: Farben sehen falsch aus
**Lösung:**
- `variables.css` eingebunden?
- Richtige Kombination? (Light + Deep, nicht Midtones!)
- Siehe `DESIGN_SYSTEM.md` → Farbregeln

---

## 📊 DATEI-GRÖSSEN (ca.)

- `variables.css` → ~6 KB
- `base.css` → ~8 KB
- `components.css` → ~12 KB
- `utilities.css` → ~15 KB
- `main.js` → ~8 KB
- `animations.js` → ~10 KB
- **Total:** ~60 KB (ungeminified)

---

## 🎨 DESIGN-TOKENS QUICK ACCESS

**Primärfarben:**
- Ultramarine: `#2E3EE8` → `var(--gamma-ultramarine)`
- Deep Ocean: `#1B2470` → `var(--gamma-deep-ocean)`
- Periwinkle: `#E8EBFF` → `var(--gamma-periwinkle)`
- Glacier: `#F0F4FF` → `var(--gamma-glacier)`

**Font Families:**
- Primary: Inter (Google Fonts)
- Display: Space Grotesk (Google Fonts)

**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## 💡 TIPPS

1. **Nutze `index.html` als Vorlage** - Kopiere ganze Sections und passe an
2. **QUICK_REFERENCE.md bookmarken** - Für schnellen Zugriff
3. **Cursor Regeln aktivieren** - `.cursorrules` wird automatisch geladen
4. **Mobile-First denken** - Verwende `md:` Prefixes
5. **Card-System nutzen** - Fast alles kann eine Card sein
6. **Animations sparsam** - Nicht übertreiben, subtil ist besser

---

## 🚀 NÄCHSTE SCHRITTE

1. **Lies** `README_CURSOR.md` einmal durch
2. **Öffne** `index.html` im Browser
3. **Experimentiere** mit Komponenten
4. **Baue** deine erste Seite
5. **Referenziere** `QUICK_REFERENCE.md` beim Coden

Happy Coding! 🎨✨
