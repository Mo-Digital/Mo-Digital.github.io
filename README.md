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

## Ordnerstruktur

```
/
├── index.html              Startseite
├── kontakt/index.html      Kontaktformular + Calendly
├── referenzen/index.html   Portfolio/Referenzen mit Filter
├── faq/index.html          FAQ (Akkordeon)
├── impressum/index.html    Impressum (Rechtsvorlage)
├── datenschutz/index.html  Datenschutzerklärung (Rechtsvorlage)
├── assets/
│   ├── css/                input.css (Quelle) + style.css (gebautes CSS)
│   ├── js/                 main.js, contact-form.js, referenzen-filter.js
│   ├── fonts/               lokal gehostete Space Grotesk / Inter Schriftdateien
│   └── img/                 SVG-Platzhalterbilder
├── robots.txt
└── sitemap.xml
```

Jede Unterseite liegt in einem eigenen Ordner mit `index.html`, damit beim Hosten
automatisch saubere URLs wie `/kontakt` bzw. `/kontakt/` funktionieren (Netlify, Vercel,
GitHub Pages, eigener Server – ohne zusätzliche Rewrite-Regeln). Alle internen Links und
Asset-Pfade sind root-relativ (`/assets/...`, `/kontakt/`), d. h. die Seite muss von der
Domain-Wurzel ausgeliefert werden.

## Bevor du live gehst: das musst du eintragen

Alle Platzhalter sind im Code mit `<!-- TODO -->`-Kommentaren oder `[IN GROSSBUCHSTABEN]`
markiert. Zentrale Übersicht:

### 1. Kontaktdaten (überall identisch verwendet)
- **E-Mail:** aktuell `hallo@mo-digital.example` – suche/ersetze in allen 6 HTML-Dateien
  (Footer + teils im Fließtext). Achte darauf, dass sichtbarer Text und `mailto:`-Link
  identisch bleiben.
- **Social-Media-Handles:** Instagram/TikTok/LinkedIn aktuell `@mo.digital` bzw.
  `mo-digital` – in allen 6 Footern identisch. Nach dem Ersetzen erneut in allen Dateien
  prüfen, dass Linktext und `href` exakt übereinstimmen.
- **[STADT/REGION]:** in Meta-Descriptions, Footer und Texten – deine echte Stadt/Region.
- **[DEIN NAME]  / [DEIN VOLLER NAME]:** Hero, Über-mich-Sektion, Impressum, Datenschutz,
  Schema.org-JSON-LD in `index.html`.

### 2. Impressum (`impressum/index.html`)
Name/Firma, Anschrift, Telefon, USt-IdNr. (falls vorhanden), verantwortliche Person.
**Wichtig:** Lass den Text vor Live-Schaltung von einem Anwalt oder Impressum-Generator
(z. B. IHK, e-recht24.de) prüfen – die Vorlage ersetzt keine Rechtsberatung.

### 3. Datenschutzerklärung (`datenschutz/index.html`)
Verantwortlicher, Hosting-Anbieter, eingesetzter Formular-Dienst (siehe Punkt 5),
Stand-Datum. Ebenfalls vor Live-Schaltung rechtlich prüfen lassen.

### 4. Referenzen (`referenzen/index.html`)
6 Platzhalter-Projekte ("Projekt Alpha" bis "Zeta") mit Screenshot-Platzhaltern –
durch echte Projekte, Screenshots und Beschreibungen ersetzen.

### 5. Kontaktformular-Backend (`kontakt/index.html`)
Das `<form data-contact-form action="https://formspree.io/f/DEIN-FORM-ID" ...>` zeigt
aktuell auf einen Platzhalter. Zwei Optionen:
- **Formspree:** eigene Formspree-Form-ID in `action` eintragen.
- **Netlify Forms:** zusätzlich `data-netlify="true"` und `name="kontakt"` auf dem
  `<form>`-Tag setzen sowie ein verstecktes Feld `<input type="hidden" name="form-name"
  value="kontakt" />` ergänzen.

### 6. Calendly-Link (`kontakt/index.html`)
Platzhalter `https://calendly.com/DEIN-LINK` durch deinen echten Calendly-Link ersetzen
(zwei Stellen: `data-url` des Widgets sowie ggf. weitere Verweise).

### 7. Testimonials & Kennzahlen (`index.html`, Referenzen-Sektion)
3 Testimonial-Platzhalter (Zitat + Name/Firma) und 3 Kennzahlen (`+150%`, `20+`, `24h`)
durch echte Werte ersetzen.

### 8. Bilder
Alle `assets/img/*.svg` sind Platzhalter (Portrait, Kundenlogos, Projekt-Screenshots,
Favicon, OG-Bild). Durch echte Fotos/Screenshots (JPG/PNG/WebP) ersetzen und die
`<img src="...">`-Pfade in den HTML-Dateien entsprechend anpassen. Für das
Open-Graph-Bild empfiehlt sich ein echtes JPG/PNG (1200×630px) statt SVG, da nicht alle
Social-Plattformen SVG-Vorschaubilder korrekt darstellen.

### 9. Domain
`https://www.mo-digital.example` ist ein Platzhalter – in `robots.txt`, `sitemap.xml`
sowie den `canonical`- und `og:url`-Tags in allen 6 HTML-`<head>`s durch deine echte
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
  Desktop (1440px) für alle 6 Seiten kontrolliert.
- Die Seite funktioniert auch ohne JavaScript vollständig (Inhalte sind standardmäßig
  sichtbar; Scroll-Animationen sind eine reine Zusatz-Verschönerung bei aktiviertem JS).
- FAQ-Akkordeon, Referenzen-Filter und das mehrstufige Kontaktformular wurden
  durchgeklickt und funktionieren wie vorgesehen.

## Bekannte Platzhalter-Limitierung

Das Kontaktformular sendet aktuell an eine Platzhalter-Formspree-URL und schlägt daher
fehl, bis du Punkt 5 oben erledigt hast. Die Fehlerbehandlung im Formular greift in
diesem Fall korrekt (Fehlermeldung statt stillem Fehlschlag).
