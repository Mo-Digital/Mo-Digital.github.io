# Mo Digital – Website

Statische One-Person-Business-Website: HTML5, Tailwind CSS (v4) und Vanilla JavaScript.
Kein Build-Schritt nötig zum Hosten – `assets/css/style.css` ist bereits fertig gebaut und eingecheckt.

## Lokal starten

Du brauchst nur einen einfachen statischen Webserver (kein Node/Build nötig zum Ansehen):

```bash
npx serve .
# oder: python3 -m http.server 8000
```

Danach im Browser öffnen: `http://localhost:3000` (bzw. der Port, den dein Server anzeigt).

### CSS neu bauen (nur nötig, wenn du Klassen/Design änderst)

```bash
npm install
npm run build:css        # einmaliger Production-Build (minifiziert)
npm run watch:css        # baut automatisch bei jeder Änderung neu
```

Die Tailwind-Konfiguration (Farben, Schriften, Komponenten) liegt in `assets/css/input.css`.

## Deployment (GitHub Pages)

GitHub Pages ist auf "Deploy from a branch" → `main` konfiguriert (klassisches Pages-Setup,
kein eigener Workflow im Repo nötig). Das heißt konkret:

- **Nur was in `main` liegt, wird live ausgeliefert.** Änderungen, die nur auf einem
  Feature-/Claude-Branch committet und gepusht wurden, erscheinen nicht auf der Live-Seite,
  bis dieser Branch per Pull Request (oder Merge) in `main` gelandet ist – auch wenn der
  Push selbst erfolgreich war.
- Nach jedem Merge in `main` läuft automatisch ein "pages build and deployment"-Check im
  Actions-Tab. Grün heißt nur "der aktuelle Stand von `main` wurde erfolgreich ausgeliefert" –
  nicht zwangsläufig, dass dein letzter Feature-Branch-Commit schon Teil davon ist.
- Faustregel bei "meine Änderungen sind live nicht sichtbar": zuerst prüfen, ob der Commit
  wirklich in `main` ist (`git log origin/main`), erst danach an Browser-Cache denken.

### Cache-Busting für CSS/JS

Alle `<link rel="stylesheet">`- und `<script src="...">`-Verweise auf
`assets/css/style.css` und `assets/js/*.js` tragen einen Versions-Query-Parameter
(`?v=1`). Erhöhe diese Zahl (`?v=2`, `?v=3`, …) in allen 5 HTML-Dateien, wenn du CSS oder
JS änderst und neu deployst – sonst kann der Browser eines wiederkehrenden Besuchers die
alte, gecachte Datei weiterverwenden.

## Ordnerstruktur

```
/
├── index.html              Startseite
├── kontakt/index.html      Kontaktformular + Calendly
├── faq/index.html          FAQ (Akkordeon)
├── impressum/index.html    Impressum (Rechtsvorlage)
├── datenschutz/index.html  Datenschutzerklärung (Rechtsvorlage)
├── assets/
│   ├── css/                input.css (Quelle) + style.css (gebautes CSS)
│   ├── js/                 main.js, contact-form.js
│   ├── fonts/               lokal gehostete Space Grotesk / Inter Schriftdateien
│   └── img/                 SVG-Platzhalterbilder
├── robots.txt
└── sitemap.xml
```

Es gibt aktuell **keine Referenzen/Portfolio-Seite** – die kommt erst, sobald echte
Projekte vorliegen. Die Testimonial-Sektion auf der Startseite ("Das sagen Kund:innen")
bleibt bestehen, aber mit Platzhalter-Namen (siehe Punkt 6 unten).

Jede Unterseite liegt in einem eigenen Ordner mit `index.html`, damit beim Hosten
automatisch saubere URLs wie `/kontakt` bzw. `/kontakt/` funktionieren (Netlify, Vercel,
GitHub Pages, eigener Server – ohne zusätzliche Rewrite-Regeln). Alle internen Links und
Asset-Pfade sind **relativ** (`assets/...` von der Startseite aus, `../assets/...` von den
Unterseiten aus), d. h. die Seite funktioniert unverändert sowohl auf einer eigenen Domain
als auch in einem Unterordner – z. B. bei einem GitHub-Pages-Projekt unter
`https://username.github.io/repo-name/`.

## Bevor du live gehst: das musst du eintragen

Alle Platzhalter sind im Code mit `<!-- TODO -->`-Kommentaren oder `[IN GROSSBUCHSTABEN]`
markiert. Zentrale Übersicht:

### 1. Kontaktdaten (überall identisch verwendet)
- **E-Mail:** aktuell `hallo@mo-digital.example` – suche/ersetze in allen 5 HTML-Dateien
  (Footer + teils im Fließtext). Achte darauf, dass sichtbarer Text und `mailto:`-Link
  identisch bleiben.
- **Social-Media-Handles:** Instagram/TikTok/LinkedIn aktuell `@mo.digital` bzw.
  `mo-digital` – in allen 5 Footern identisch. Nach dem Ersetzen erneut in allen Dateien
  prüfen, dass Linktext und `href` exakt übereinstimmen.
- **[STADT/REGION]:** in Meta-Descriptions, Footer und Texten – deine echte Stadt/Region.
- **[DEIN VOLLER NAME]:** Impressum, Datenschutz, Schema.org-JSON-LD in `index.html`
  (rechtlicher Name für Impressum – der öffentliche Name "Mo" ist bereits im Hero, in der
  Über-mich-Sektion und den Bild-alt-Texten eingetragen).

### 2. Logo (alle 5 Seiten, Header)
Neben dem Schriftzug "Mo Digital" im Header steht aktuell ein runder Platzhalter mit
einem "M" (`<!-- TODO: echtes Logo hier einsetzen -->`). Ersetze das `<span>` durch ein
`<img>`-Tag mit deinem echten Logo, sobald vorhanden.

### 3. Impressum (`impressum/index.html`)
Name/Firma, Anschrift, Telefon, USt-IdNr. (falls vorhanden), verantwortliche Person.
**Wichtig:** Lass den Text vor Live-Schaltung von einem Anwalt oder Impressum-Generator
(z. B. IHK, e-recht24.de) prüfen – die Vorlage ersetzt keine Rechtsberatung.

### 4. Datenschutzerklärung (`datenschutz/index.html`)
Verantwortlicher, Hosting-Anbieter, Stand-Datum. Ebenfalls vor Live-Schaltung rechtlich
prüfen lassen.

### 5. Kontaktseite (`kontakt/index.html`)
Kein klassisches Formular: Die Seite ist ein reiner Auswahl-Flow (2 Fragen per Klick,
keine Texteingabe, keine Datenerhebung) und führt danach direkt zum eingebetteten
Calendly-Widget. Der Calendly-Link ist bereits gesetzt
(`https://calendly.com/mhammed-hakan/30min`).

### 6. Testimonials & Kennzahlen (`index.html`, Abschnitt "Das sagen Kund:innen")
3 Testimonial-Karten mit Fantasienamen (Lukas Bergmann, Aryan Singh, Jessica Miller) und
3 Kennzahlen (`+150%`, `20+`, `24h`) – durch echte Kundenbewertungen und Werte ersetzen,
sobald verfügbar.

### 7. Bilder
Alle `assets/img/*.svg` sind Platzhalter (Portrait, Favicon, OG-Bild). Durch echte
Fotos/Screenshots (JPG/PNG/WebP) ersetzen und die `<img src="...">`-Pfade in
den HTML-Dateien entsprechend anpassen. Für das Open-Graph-Bild empfiehlt sich ein
echtes JPG/PNG (1200×630px) statt SVG, da nicht alle Social-Plattformen
SVG-Vorschaubilder korrekt darstellen.

### 8. Domain
`https://www.mo-digital.example` ist ein Platzhalter – in `robots.txt`, `sitemap.xml`
sowie den `canonical`- und `og:url`-Tags in allen 5 HTML-`<head>`s durch deine echte
Domain ersetzen.

## SEO & Technik – was schon eingebaut ist

- Individuelle `<title>`/`<meta description>` sowie Open-Graph-Tags pro Seite
- `Schema.org`-JSON-LD: `ProfessionalService` (Startseite) und `FAQPage` (FAQ-Seite)
- `robots.txt` und `sitemap.xml`
- Lokal gehostete Schriften (Space Grotesk, Inter) – keine Anfrage an Google-Server
- Lazy-Loading für Bilder unterhalb des ersten Viewports (`loading="lazy"`)
- Sauberes, semantisches HTML mit `alt`-Texten, Skip-Link, sichtbaren Fokus-Ringen und
  tastaturbedienbarem FAQ-Akkordeon
- `/impressum/` und `/datenschutz/` sind per `<meta name="robots" content="noindex,
  follow">` von der Suchmaschinen-Indexierung ausgeschlossen

## Qualitätskontrolle (bereits durchgeführt)

- Alle internen Links (Navigation, Footer, Anker wie `/#leistungen`) wurden geprüft und
  zeigen auf existierende Ziele.
- E-Mail- und Social-Media-Links: sichtbarer Text und tatsächliches Linkziel wurden
  seitenübergreifend auf exakte Übereinstimmung geprüft.
- Responsives Verhalten wurde per Screenshot-Test auf Mobile (390px), Tablet (768px) und
  Desktop (1440px) für alle 5 Seiten kontrolliert.
- Die Seite funktioniert auch ohne JavaScript vollständig (Inhalte sind standardmäßig
  sichtbar; Scroll-Animationen sind eine reine Zusatz-Verschönerung bei aktiviertem JS).
- FAQ-Akkordeon und der Auswahl-Flow auf der Kontaktseite wurden durchgeklickt und
  funktionieren wie vorgesehen.
