# WECONN3CT WEBSITE - CURSOR INSTRUCTIONS

## 📋 PROJEKT-ÜBERSICHT

Dies ist die WECONN3CT.App Website gebaut mit dem Gamma Design-System. Alle Styles, Komponenten und Patterns sind ready to use für euer Softwareunternehmen.

## 🎯 WECONN3CT BRAND IDENTITY

### Unternehmen
- **Name:** WECONN3CT.App
- **Tagline:** "Software made in Germany, built for the world"
- **Slogan:** "Wir verwandeln Ideen in digitale Erlebnisse"

### Services
1. **App-Entwicklung** - Business-Apps, Lifestyle-Anwendungen, Games
2. **Website-Entwicklung** - Landing Pages, Web-Anwendungen
3. **Software-Lösungen** - Individuelle Business-Software
4. **KI-Integration** - AI-gestützte Entwicklung
5. **UX/UI Design** - Modernes Interface-Design
6. **Wartung & Support** - Kontinuierliche Betreuung

### Team
- **Leonardo Braun** - Projekt- & Designmanagement
- **Jan Beek** - Programmierung
- **Mentor Sadiku** - Projektabgabe & Wartung

### Standort
**Bad Honnef** - "Das Rheinische Nizza"
- Am Rhein gelegen mit Blick auf das Siebengebirge
- Kreatives Umfeld trifft moderne Infrastruktur
- Regional verbunden, international aktiv

### Stats
- **15** Mitarbeiter
- **4** Teams
- **8** Partner
- **12** Projekte

### Vision
"Digitale Innovation für jeden erreichbar machen"
- Jede Idee verdient eine Chance
- KI-gestützte Prozesse
- Speed & Qualität
- Made in Germany

---

## 🎨 DESIGN-ANPASSUNGEN FÜR WECONN3CT

### Farbschema (behalte Gamma-Farben bei)
- **Primary:** Ultramarine (#2E3EE8) - Für CTAs und wichtige Elemente
- **Backgrounds:** Periwinkle (#E8EBFF), Glacier (#F0F4FF)
- **Accents:** Rocket Fire (#FF4E3E) für wichtige CTAs

### Typografie
- Headlines: Bold, klar, deutsch
- Tone of Voice: Professionell aber zugänglich
- Sprache: Deutsch (du-Form für direkten Kontakt)

### Wichtige Badges
```html
<div class="badge">🇩🇪 Made in Germany</div>
<div class="badge badge-accent">KI-Power</div>
<div class="badge">Full-Service</div>
```

---

## 📄 SEITENSTRUKTUR WECONN3CT

### 1. HERO SECTION
**Inhalt:**
- Badge: "🇩🇪 Made in Germany"
- Headline: "Wir verwandeln Ideen in digitale Erlebnisse"
- Subline: "Apps, Websites und Software, die nicht nur funktionieren, sondern begeistern..."
- CTA: "Kostenloses Erstgespräch" + "Unsere Services"

**Code:**
```html
<section class="hero bg-gradient-secondary">
    <div class="container">
        <div class="hero-content">
            <div class="badge mb-4">🇩🇪 Made in Germany</div>
            <h1 class="hero-title">Wir verwandeln Ideen in digitale Erlebnisse</h1>
            <p class="hero-subtitle">Apps, Websites und Software...</p>
            <div class="hero-cta">
                <a href="#kontakt" class="btn btn-primary btn-lg">Kostenloses Erstgespräch</a>
                <a href="#services" class="btn btn-outline btn-lg">Unsere Services</a>
            </div>
        </div>
    </div>
</section>
```

### 2. SERVICES SECTION
**6 Service-Cards:**
1. 📱 App-Entwicklung
2. 🌐 Website-Entwicklung
3. ⚙️ Software-Lösungen
4. 🤖 KI-Integration
5. 🎨 UX/UI Design
6. 🔧 Wartung & Support

**Layout:** Grid mit `grid-auto-fit` für automatische Responsiveness

### 3. VISION SECTION
**Split Card Layout:**
- Links: Text mit Vision & Beschreibung
- Rechts: Bild/Grafik
- Background: `bg-periwinkle`

### 4. WARUM WECONN3CT
**3 Reasons:**
1. ⚡ Höchstgeschwindigkeit - KI-gestützte Prozesse
2. 🇩🇪 Made in Germany - Qualität & Datenschutz
3. 🎯 Full-Service - Alles aus einer Hand

### 5. TEAM SECTION
**3 Team-Mitglieder:**
- Leonardo Braun (Projekt- & Designmanagement)
- Jan Beek (Programmierung)
- Mentor Sadiku (Projektabgabe & Wartung)

Plus: State-of-the-Art Card mit Beschreibung

### 6. STANDORT SECTION
**Bad Honnef Präsentation:**
- Split Card (reverse)
- Text über Bad Honnef
- 3 Bulletpoints mit Icons

### 7. STATS SECTION
**4 Zahlen:**
- 15 Mitarbeiter
- 4 Teams
- 8 Partner
- 12 Projekte

**Background:** `bg-primary text-white`

### 8. KONTAKT CTA
**Call-to-Action:**
- "Lass uns reden"
- Kostenloses Erstgespräch
- E-Mail Option

---

## 🚀 NEUE SEITEN ERSTELLEN

### Landing Page Pattern
```html
<!-- Hero mit WECONN3CT Branding -->
<section class="hero bg-gradient-secondary">
    <div class="container">
        <div class="hero-content">
            <div class="badge mb-4">🇩🇪 Made in Germany</div>
            <h1 class="hero-title">[Service] von WECONN3CT</h1>
            <p class="hero-subtitle">[Beschreibung]</p>
            <div class="hero-cta">
                <a href="#kontakt" class="btn btn-primary btn-lg">Jetzt anfragen</a>
            </div>
        </div>
    </div>
</section>
```

### Service Detail Page Pattern
```html
<!-- Service Hero -->
<section class="hero bg-periwinkle">
    <div class="container">
        <h1 class="text-6xl font-bold text-center mb-6">[Service Name]</h1>
        <p class="text-xl text-center text-muted max-w-3xl mx-auto">
            [Service Beschreibung]
        </p>
    </div>
</section>

<!-- Features Grid -->
<section class="section-lg">
    <div class="container">
        <div class="grid-auto-fit">
            <!-- Feature Cards -->
        </div>
    </div>
</section>

<!-- CTA -->
<section class="section-lg bg-primary text-white">
    <div class="container text-center">
        <h2 class="text-5xl font-bold mb-6">Bereit zu starten?</h2>
        <a href="#kontakt" class="btn btn-accent btn-xl">Kostenloses Gespräch buchen</a>
    </div>
</section>
```

---

## 🎨 WECONN3CT DESIGN-REGELN

### DO's für WECONN3CT
✅ **Deutsche Sprache** - Du-Form für direkten Kontakt
✅ **Made in Germany Badge** prominent platzieren
✅ **KI-Bezug** - AI/KI-Power erwähnen wo passend
✅ **Professionell aber zugänglich** - Keine Corporate-Kälte
✅ **Speed betonen** - "Höchstgeschwindigkeit", "Schnell"
✅ **Full-Service** - Alles aus einer Hand kommunizieren

### DON'Ts
❌ Keine englischen Headlines (außer Tagline)
❌ Nicht zu technisch - verständlich bleiben
❌ Keine generischen Stock-Phrasen
❌ Nicht zu formell - locker aber professionell

---

## 📋 CONTENT-VORLAGEN

### Service-Beschreibungen Template
```
[Emoji] [Service Name]
[Kurzbeschreibung was wir machen]
[Benefit/USP für den Kunden]
```

Beispiel:
```
📱 App-Entwicklung
Business-Apps, Lifestyle-Anwendungen oder kreative Spiele – Wir bringen deine Ideen in den App-Store. 
Mit einzigartigem UX-Design und schnellem Development.
```

### Team-Member Template
```
[Name]
[Position]
[Kurzbeschreibung der Rolle/Expertise]
```

### USP Template
```
[Icon] [Titel]
[Beschreibung des Vorteils]
[Konkrete Beispiele/Details]
```

---

## 🎯 WICHTIGE CTAs

### Primary CTAs
- "Kostenloses Erstgespräch buchen"
- "Jetzt anfragen"
- "Termin buchen"
- "Projekt starten"

### Secondary CTAs
- "Mehr erfahren"
- "Unsere Services"
- "Zum Portfolio"
- "E-Mail senden"

### CTA-Platzierung
```html
<!-- Hero -->
<a href="#kontakt" class="btn btn-primary btn-lg">Kostenloses Erstgespräch</a>

<!-- Section Ende -->
<a href="#kontakt" class="btn btn-accent btn-xl">Jetzt starten</a>

<!-- Footer-nahe -->
<a href="#kontakt" class="btn btn-primary btn-lg">Termin buchen</a>
```

---

## 🔧 TECHNISCHE INTEGRATION

### Navigation für WECONN3CT
```html
<nav class="navbar" id="navbar">
    <div class="navbar-container">
        <a href="#" class="navbar-logo">WECONN3CT</a>
        <ul class="navbar-menu" id="navbarMenu">
            <li><a href="#services" class="navbar-link">Services</a></li>
            <li><a href="#vision" class="navbar-link">Vision</a></li>
            <li><a href="#team" class="navbar-link">Team</a></li>
            <li><a href="#standort" class="navbar-link">Standort</a></li>
            <li class="navbar-cta">
                <a href="#kontakt" class="btn btn-primary">Termin buchen</a>
            </li>
        </ul>
    </div>
</nav>
```

### Footer für WECONN3CT
```html
<footer class="py-12 bg-black text-white">
    <div class="container">
        <!-- 4-Spalten Grid mit Services, Unternehmen, Kontakt, Legal -->
        <div class="text-muted">
            © 2025 WECONN3CT.App – Software made in Germany, built for the world
        </div>
    </div>
</footer>
```

---

## 📱 RESPONSIVE BESONDERHEITEN

### Team Cards auf Mobile
```html
<div class="grid grid-cols-3 gap-8 lg:grid-cols-2 md:grid-cols-1">
    <!-- Team Cards -->
</div>
```

### Stats auf Mobile
```html
<div class="grid grid-cols-4 gap-8 md:grid-cols-2 sm:grid-cols-1">
    <!-- 15, 4, 8, 12 -->
</div>
```

---

## ✨ WECONN3CT SPEZIFISCHE ANIMATIONEN

### Empfohlene Animationen
```html
<!-- Hero -->
<div class="badge mb-4 animate-fade-in">🇩🇪 Made in Germany</div>
<h1 class="hero-title animate-fade-in-up">...</h1>

<!-- Service Cards mit Stagger -->
<div class="card animate-fade-in-up">Service 1</div>
<div class="card animate-fade-in-up animation-delay-100">Service 2</div>
<div class="card animate-fade-in-up animation-delay-200">Service 3</div>

<!-- Stats mit Counter (optional) -->
<div data-counter="15" data-suffix="">15</div>
```

---

## 🚀 QUICK START FÜR NEUE WECONN3CT SEITEN

### 1. Kopiere die Basis
```bash
cp weconn3ct.html neue-seite.html
```

### 2. Passe Hero an
- Ändere Headline
- Passe Subline an
- Setze relevante CTAs

### 3. Content Sections
- Behalte Services/Team/Vision-Struktur
- Oder erstelle neue Sections mit gleichem Style

### 4. Checklist
- [ ] WECONN3CT Logo/Name
- [ ] "Made in Germany" Badge
- [ ] KI-Bezug erwähnt
- [ ] Deutsche Texte
- [ ] CTAs zu #kontakt
- [ ] Footer mit Copyright

---

## 💡 CONTENT-IDEEN FÜR WEITERE SEITEN

### Mögliche Landingpages
1. **/app-entwicklung** - Fokus auf Mobile Apps
2. **/website-entwicklung** - Web-Projekte
3. **/ki-integration** - AI-Services
4. **/portfolio** - Projekt-Showcase
5. **/kontakt** - Erweiterte Kontaktseite
6. **/team** - Ausführliche Team-Vorstellung
7. **/karriere** - Jobs & Bewerbungen

### Content-Bausteine wiederverwenden
- Service-Cards → Portfolio-Items
- Team-Cards → Partner-Präsentation
- Stats Section → Projekt-Zahlen
- Split Cards → Case Studies

---

## 🎨 BRAND ASSETS REFERENZ

### Farben (Gamma-System beibehalten)
- Primary Blue: `#2E3EE8` (CTAs, Links)
- Light Backgrounds: `#E8EBFF`, `#F0F4FF`
- Accent: `#FF4E3E` (Wichtige CTAs)

### Icons & Emojis (konsistent verwenden)
- 📱 App-Entwicklung
- 🌐 Website-Entwicklung
- ⚙️ Software-Lösungen
- 🤖 KI/AI
- 🎨 Design
- 🔧 Support/Wartung
- 🇩🇪 Made in Germany
- ⚡ Speed/Geschwindigkeit
- 🎯 Präzision/Fokus
- 🏞️ Bad Honnef/Standort

---

## 📚 RESSOURCEN

**Haupt-Dateien:**
- `weconn3ct.html` - Vollständige WECONN3CT Website
- `css/` - Gamma Design-System (unverändert)
- `js/main.js` - Interaktionen

**Dokumentation:**
- `DESIGN_SYSTEM.md` - Design-Referenz
- `QUICK_REFERENCE.md` - Code-Snippets
- Diese Datei - WECONN3CT spezifisch

---

## ✅ FINAL CHECKLIST

Jede WECONN3CT Seite muss haben:
- [ ] WECONN3CT Branding (Logo, Name)
- [ ] Deutsche Sprache (Du-Form)
- [ ] "Made in Germany" erwähnt
- [ ] KI-Aspekt kommuniziert
- [ ] Klare CTAs (#kontakt)
- [ ] Responsive (Mobile-First)
- [ ] Animationen (fade-in-up)
- [ ] Footer mit Copyright
- [ ] Gamma Design-System CSS
- [ ] Navigation mit Services/Vision/Team/Standort

---

**🎯 Bereit zum Entwickeln!**

Nutze `weconn3ct.html` als Vorlage und passe für neue Services/Pages an.
Das Gamma Design-System bleibt, nur der Content ist WECONN3CT-spezifisch!
