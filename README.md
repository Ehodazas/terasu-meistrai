# Terasų meistrai – svetainė

Daugiapuslapė terasų įrengimo įmonės svetainė lietuvių kalba.
React 19 · Vite · TypeScript · Tailwind CSS v4 · React Router · GSAP (tik keli animuoti momentai) · Lucide ikonos.

> **Svarbu.** „Terasų meistrai“ – išgalvota įmonė. Kontaktai, darbo zona ir projektai yra **pavyzdiniai**,
> o užklausos forma veikia **demonstraciniu režimu**, kol neprijungiamas siuntimo servisas. Prieš paleidžiant
> svetainę – žr. skyrių [Kontrolinis sąrašas prieš paleidimą](#kontrolinis-sąrašas-prieš-paleidimą).

---

## 1. Paleidimas kompiuteryje

Reikia Node.js 20.11 ar naujesnės versijos.

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # gamybinė versija į dist/
npm run preview      # peržiūrėti dist/ versiją
npm run lint         # oxlint patikra
```

## 2. Struktūra

```
public/
  images/            optimizuotos WebP nuotraukos (<raktas>-800.webp, <raktas>-1600.webp)
  favicon.svg, _redirects (Netlify)
src/
  data/              VISAS turinys ir nustatymai
    site.ts          įmonės kontaktai, darbo laikas, darbo zona, svetainės URL
    services.ts      paslaugos
    materials.ts     medžiagos ir lyginamoji lentelė
    projects.ts      DEMONSTRACINIAI projektai (pažymėti DEMO_PROJECTS / demo: true)
    faq.ts           dažnai užduodami klausimai (DUK)
    articles.ts      patarimų straipsniai (/patarimai)
    content.ts       navigacija, darbų eigos žingsniai
    images.ts        nuotraukų registras (matmenys, alt tekstai lietuviškai, šaltinis)
    seo.ts           puslapių pavadinimai ir aprašymai
  components/        Header, Footer, QuoteForm, Img, PageHero, ProcessSteps ir kt.
  pages/             Home, Services, Materials, Projects, ProjectDetail, About, Contact, Privacy, NotFound
  lib/               validation.ts (formos taisyklės), motion.ts (GSAP registracija)
vite.config.ts       build: statinės SEO žymos kiekvienam puslapiui, sitemap.xml, robots.txt, 404.html
```

Maršrutai: `/`, `/paslaugos`, `/terasu-tipai`, `/atlikti-darbai`, `/atlikti-darbai/:projektas`, `/apie-mus`,
`/patarimai`, `/patarimai/:straipsnis`, `/terasos-planuokle`, `/kontaktai`, `/privatumo-politika`, kiti – 404 puslapis.

### Funkcijos

- **Terasos planuoklė** (`src/pages/Planner.tsx`) – 5 žingsnių klausimynas (darbai, medžiaga, plotas ir aukštis,
  papildomi elementai, laikas). Pabaigoje atsakymai perkeliami į užklausos formą kontaktų puslapyje. Kainos
  neskaičiuoja.
- **DUK** – `src/data/faq.ts`, rodoma pagrindiniame ir paslaugų puslapiuose (su FAQPage struktūriniais duomenimis).
- **Patarimai** – straipsniai `src/data/articles.ts`; nauji automatiškai patenka į sitemap.
- **Nuotraukų peržiūra** projektų puslapiuose (rodyklės, Escape, braukimas).
- **Mobili veiksmų juosta** (Skambinti / Gauti pasiūlymą) telefonuose.

### Animacijos

GSAP (`src/components/PageReveal.tsx`): elementams pridėkite `data-reveal` (iškyla), `data-reveal="img"`
(nuotrauka atsiveria), `data-split` (antraštės žodžiai iškyla po vieną) arba `data-parallax`. Pagrindiniame
puslapyje – skaidrių hero, bėganti juosta ir kompiuteryje prisegama horizontali projektų galerija. Pasirinkus
„sumažinti judesį“ animacijos išjungiamos.

## 3. Įmonės informacijos keitimas

Atidarykite `src/data/site.ts`:

- `phone`, `phoneHref`, `email`, `address`, `hours`, `serviceArea` – įrašykite tikrus duomenis;
- `url` – tikras domenas (naudojamas canonical, Open Graph, sitemap);
- `isPlaceholder: false` – paslėps žymas „Pavyzdiniai kontaktiniai duomenys“.

Tekstai puslapiuose yra `src/pages/*.tsx`, paslaugos ir medžiagos – `src/data/`. Privatumo politikos šablone
(`src/pages/Privacy.tsx`) užpildykite laukus laužtiniuose skliaustuose `[...]`.

## 4. Nuotraukų keitimas

Visos dabartinės nuotraukos – iliustracinės, iš [Unsplash](https://unsplash.com/license) (nemokamos komercinei
veiklai, autoriaus nurodyti nebūtina). Jų ID nurodyti `src/data/images.ts` (`unsplash` laukas).
Jos **nėra** įmonės darbai, todėl prieš paleidžiant rekomenduojama naudoti savo objektų nuotraukas.

**Greičiausias būdas** – pakeisti failus tais pačiais pavadinimais:

1. Paruoškite nuotrauką dviem pločiais: ~800 px ir ~1600 px (WebP, kokybė ~70).
   Pvz., su [Squoosh](https://squoosh.app) arba `cwebp -q 70 -resize 1600 0 foto.jpg -o pergola-1600.webp`.
2. Įkelkite į `public/images/` kaip `<raktas>-800.webp` ir `<raktas>-1600.webp`.
3. `src/data/images.ts` atnaujinkite `w`, `h` (1600 px versijos matmenys) ir `alt` tekstą.

**Nauja nuotrauka** – pridėkite naują įrašą į `images.ts` ir naudokite jo raktą turinyje (pvz., projekto `images`).
Socialinių tinklų paveikslėlis – `public/images/og-image.jpg` (1200×630).

## 5. Projektų (atliktų darbų) keitimas

`src/data/projects.ts`: pakeiskite demonstracinius įrašus tikrais projektais. Kiekvienas projektas turi
`slug` (URL dalis), `title`, `material`, `type`, `area`, `tags` (`medines` / `wpc` / `atnaujinimas` – filtrai),
aprašymą, darbų sąrašą ir nuotraukų raktus. Kai neliks demonstracinių projektų, nustatykite
`DEMO_PROJECTS = false`, o `Project` tipe pašalinkite `demo: true` ir su juo susijusias „Pavyzdys“ /
„Demonstracinis projektas“ žymas (`ProjectCard.tsx`, `ProjectDetail.tsx`, `Home.tsx`).
Puslapiai, sitemap ir SEO žymos naujiems projektams sugeneruojami automatiškai.

## 6. Užklausos formos prijungimas

Be konfigūracijos forma tikrina laukus, bet **nieko nesiunčia** ir aiškiai praneša, kad užklausa neišsiųsta.
Sėkmės pranešimas rodomas tik tada, kai serveris atsako sėkmingai.

Forma siunčia JSON `POST` užklausą į adresą iš `VITE_FORM_ENDPOINT`. Su [Formspree](https://formspree.io):

1. Susikurkite formą Formspree paskyroje, gausite adresą `https://formspree.io/f/xxxxxxx`.
2. Sukurkite failą `.env` (pagal `.env.example`):
   ```
   VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
   ```
3. Talpinimo platformoje (Netlify / Vercel / GitHub Actions secrets) nurodykite tą patį kintamąjį ir perkurkite svetainę.

Siunčiami laukai: `vardas`, `telefonas`, `el_pastas`, `miestas`, `terasos_tipas`, `plotas_m2`, `informacija`,
`_subject`. Tinka ir kiti servisai, priimantys JSON (Getform, Basin, savas API ar serverless funkcija, siunčianti
laišką per Resend / SendGrid / SMTP) – jei reikia kitokio formato, keiskite `onSubmit` faile
`src/components/QuoteForm.tsx`.

Apsauga nuo šlamšto: paslėptas laukas `_gotcha` (Formspree jį atpažįsta), minimalus pildymo laikas (2,5 s),
kliento pusės validacija. Esant dideliam šlamšto kiekiui, įjunkite servisų siūlomą apsaugą
(pvz., Formspree reCAPTCHA / Cloudflare Turnstile) – tada atnaujinkite privatumo politiką.

## 7. Diegimas

Prieš diegiant nustatykite `VITE_SITE_URL` (tikras adresas) – kitaip canonical ir sitemap rodys pavyzdinį domeną.

### Netlify
Prijunkite repozitoriją – `netlify.toml` jau nurodo `npm run build` ir `dist`. `public/_redirects` užtikrina,
kad visi maršrutai veiktų. Environment variables: `VITE_SITE_URL`, `VITE_FORM_ENDPOINT`.

### Vercel
Importuokite projektą (Framework: Vite). `vercel.json` sutvarko maršrutus. Nustatykite tuos pačius kintamuosius.

### GitHub Pages
1. Įkelkite kodą į GitHub repozitoriją (šaka `main`).
2. Settings → Pages → Source: **GitHub Actions**.
3. (Neprivaloma) Settings → Secrets → Actions: `VITE_FORM_ENDPOINT`.
4. Workflow `.github/workflows/deploy-pages.yml` automatiškai nustato `BASE_PATH=/<repozitorija>/`.
   Jei naudojate savo domeną – workflow faile pakeiskite `BASE_PATH` į `/` ir `VITE_SITE_URL` į savo adresą.

Kiekvienam puslapiui build metu sukuriamas atskiras `index.html`, todėl tiesioginės nuorodos veikia ir
GitHub Pages, o `404.html` naudojamas nežinomiems adresams.

## 8. SEO

- **Puslapiai iš anksto sugeneruoti (SSG):** `npm run build` kiekvieną maršrutą atvaizduoja į pilną HTML
  (`src/entry-server.tsx`, `scripts/prerender.mjs`). Turinys matomas ir be JavaScript – paieškos sistemoms,
  AI įrankiams ir nuorodų peržiūroms. Naršyklėje React šį HTML tik „pažadina“ (hydrate). Kode, kuris vykdomas
  atvaizduojant, nenaudokite `window` ar `document` – tik `useEffect` viduje arba per `src/lib/browser.ts`.
- Unikalūs `<title>`, `meta description`, canonical ir Open Graph – `src/data/seo.ts`, statiškai įrašomi į kiekvieno
  maršruto HTML build metu ir atnaujinami naršant.
- `sitemap.xml` ir `robots.txt` generuojami automatiškai (`vite.config.ts`).
- Semantinė struktūra: vienas `h1` puslapyje, nuoseklūs `h2`/`h3`, aprašomieji lietuviški alt tekstai.
- Nėra išgalvotų adresų, atsiliepimų ar `LocalBusiness` duomenų. Kai turėsite tikrus rekvizitus, galite pridėti
  `LocalBusiness` JSON-LD ir Google Business profilį.

## 9. Privatumas ir slapukai

Svetainė nenaudoja slapukų, analitikos ar išorinių šriftų/CDN (šriftai ir nuotraukos talpinami kartu su svetaine),
todėl slapukų sutikimo juosta nereikalinga. Įdiegus analitiką (pvz., Google Analytics), reikės sutikimo mechanizmo
ir privatumo politikos atnaujinimo.

## 10. Prieinamumas ir judesys

Klaviatūros navigacija, matomi fokusavimo žymekliai, „Pereiti prie turinio“ nuoroda, fokusas mobiliame meniu,
formos klaidos susietos su laukais (`aria-describedby`). Animacijos išjungiamos, jei sistemoje pasirinkta
„sumažinti judesį“ (`prefers-reduced-motion`).

## Kontrolinis sąrašas prieš paleidimą

- [ ] `src/data/site.ts`: tikri kontaktai, darbo zona, `url`, `isPlaceholder: false`
- [ ] `VITE_FORM_ENDPOINT` nustatytas ir išbandytas tikru pateikimu
- [ ] Demonstraciniai projektai pakeisti tikrais, `DEMO_PROJECTS = false`
- [ ] Nuotraukos pakeistos savomis (ypač projektų)
- [ ] Privatumo politikos `[...]` laukai užpildyti
- [ ] `VITE_SITE_URL` nustatytas talpinimo platformoje
