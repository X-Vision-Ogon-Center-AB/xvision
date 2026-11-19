# X-Vision webbplats – översikt

Det här repot innehåller källkoden till X-Visions webbplats. Här finns webbplatsens tekniska funktioner, layout, navigering, språkhantering och kopplingar till externa tjänster.

Repot finns på GitHub:

<https://github.com/X-Vision-Ogon-Center-AB/xvision>

## Kort sammanfattning

Webbplatsen är byggd med:

- **Next.js och React** – ramverket och byggblocken som genererar webbplatsen.
- **TypeScript** – JavaScript med tydligare typer.
- **Storyblok** – innehållssystemet för texter, bilder, menyer och sidinnehåll.
- **Vercel** – plattformen som bygger, publicerar och levererar webbplatsen.
- **SCSS och Tailwind CSS** – styling och layout.
- **GitHub** – versionshantering och historik över kodändringar.

## Hur allt hänger ihop

Den förenklade kedjan ser ut så här:

```
Kodändring på GitHub
        ↓
Vercel upptäcker ändringen
        ↓
Vercel installerar beroenden och bygger projektet
        ↓
Vercel publicerar en ny version
        ↓
Domänen visar den nya versionen
        ↓
Webbplatsen hämtar aktuellt innehåll från Storyblok
```

GitHub och Storyblok har olika roller:

- **GitHub** innehåller hur webbplatsen fungerar tekniskt.
- **Storyblok** innehåller mycket av det redaktionella innehållet.
- **Vercel** bygger och publicerar webbplatsen.
- **Domänleverantören/DNS** styr vart domänerna pekar.

En ändring i Storyblok behöver normalt inte innebära en ny kodändring. En ändring i layout, funktion eller routning behöver däremot ändras i repot och sedan byggas om av Vercel.

## Vad används Vercel till?

Vercel är tjänsten som kör och publicerar webbplatsen. Den fungerar som en kombination av webbserver, byggsystem och publiceringsverktyg.

I detta projekt används Vercel till att:

1. koppla projektet till GitHub-repot,
2. bygga webbplatsen efter en ändring,
3. skapa förhandsversioner,
4. publicera godkända versioner i Production,
5. koppla domänerna till rätt projekt,
6. lagra miljövariabler som API-nycklar och andra inställningar.

När projektet är kopplat till GitHub sker publicering normalt automatiskt när ändringar pushas till produktionsgrenen, i detta repo `main`.

## Repots viktigaste mappar och filer

### `app/`

Här finns webbplatsens routes, layout och sidstruktur. Next.js använder mappstrukturen för att förstå vilka URL:er som ska finnas.

Viktiga delar:

- `app/page.tsx` – startsidan pekar vidare till den dynamiska sidlogiken.
- `app/[slug]/` – dynamiska sidor baserade på URL:ens slug.
- `app/blog/` – bloggens routes och sidlogik.
- `app/api/` – serverfunktioner/API-routes, till exempel formulärfunktioner.
- `app/components/` – gemensamma delar som header och footer.
- `app/layout.tsx` – det gemensamma skalet runt sidorna.
- `app/globals.scss` – globala stilregler.
- `app/sitemap.ts` – generering av webbplatsens sitemap.
- `app/not-found.tsx` – webbplatsens 404-sida.

I `app/layout.tsx` kopplas bland annat Storyblok, header, footer, Google Tag Manager, Cookiebot och reCAPTCHA in.

### `components/`

Här finns återanvändbara komponenter och innehållsblock, till exempel hero-sektioner, kontaktformulär, nyhetsbrev, prisblock, videoblock och informationsrutor.

En komponent är en återanvändbar del av gränssnittet. Om samma typ av block används på flera sidor är det bättre att ändra komponenten än att kopiera samma kod på flera ställen.

### `lib/`

Här ligger hjälpfunktioner som används av flera delar av projektet. `lib/get-data.ts` används för att hämta data från Storyblok.

### `public/`

Här ligger statiska filer som ska kunna nås direkt från webbplatsen, till exempel bilder, ikoner och verifieringsfiler.

### `middleware.ts`

Denna fil arbetar innan en sida visas. I projektet används den framför allt för språkberoende redirects och rewrites.

Det innebär att en publik URL kan:

- skickas vidare till en ny URL med en permanent redirect,
- internt kopplas till en annan Storyblok-sökväg utan att besökaren ser den interna sökvägen.

Ändringar i denna fil påverkar routningen för de språkversioner och äldre länkar som omfattas av reglerna.

### `next.config.mjs`

Här ligger Next.js-konfiguration, bland annat konfiguration för redirects, rewrites och andra ramverksinställningar.

### `package.json`

Här står projektets scripts och installerade paket. Filen anger bland annat vilken version av Next.js och React projektet använder samt vilka verktyg som behövs när Vercel bygger webbplatsen.

### `yarn.lock`

Denna fil låser exakta versioner av projektets beroenden. Den bör normalt uppdateras automatiskt när paket installeras eller uppdateras.

## Språkversioner och projektstruktur

De svenska, danska och engelska webbplatserna bygger på **en och samma källkod i detta GitHub-repo**. Det innebär att tekniska ändringar i webbplatsens komponenter, funktioner och grundstruktur kan återanvändas för alla språkversioner.

I Vercel finns samtidigt **tre separata projekt**:

- ett projekt för svenska (`xvisionkliniken.se`),
- ett projekt för danska (`xvisionkliniken.dk`),
- ett projekt för engelska (`xvisionclinic.com`).

Varje Vercel-projekt deployar samma kod till sin egen domän och använder rätt språk- och innehållsinställning. På så sätt kan webbplatserna ha gemensam teknisk grund men ändå publiceras separat och vara kopplade till varsin domän.

Själva innehållet sätts i Storyblok. Där finns de olika språkversionernas texter, bilder, sidinnehåll och SEO-information. Vercel-projekten använder miljövariabeln `STORYBLOCK_LANG` för att ange vilket språk och vilket Storyblok-innehåll den aktuella deploymenten ska visa.

Förenklat ser strukturen ut så här:

```text
En gemensam källkod i GitHub
        ↓
Tre separata Vercel-projekt
        ↓
Svensk, dansk och engelsk domän
        ↓
Språkspecifikt innehåll från Storyblok
```

Språket påverkar bland annat:

- vilket Storyblok-innehåll som hämtas,
- vilket språk HTML-dokumentet får,
- vilka redirects och rewrites som används,
- vilka alternativa språkversioner som anges för sökmotorer.

Ändringar av `STORYBLOCK_LANG` ska göras i rätt Vercel-projekt och endast när projektets språk ska ändras.

## Innehåll i Storyblok

Storyblok fungerar som webbplatsens innehållssystem. Där kan redaktörer vanligtvis ändra:

- rubriker och brödtexter,
- bilder och videor,
- knappar och länkar,
- sidblock och innehållsordning,
- SEO-titel och metabeskrivning,
- delar av header och footer.

Koden innehåller reglerna för hur blocken renderas. Om ett block saknas, visas fel eller behöver ett nytt beteende kan både Storyblok-innehållet och koden behöva undersökas.

## Externa tjänster och integrationer

Projektet innehåller kopplingar till:

- **Storyblok** – innehåll och siddata.
- **Vercel** – hosting, deployment, miljövariabler och domäner.
- **Google Tag Manager** – statistik- och marknadsföringsskript.
- **Cookiebot** – samtycke och cookiehantering.
- **Google reCAPTCHA** – skydd av vissa formulär.
- **Resend** – e-postutskick från formulär eller serverfunktioner.

Nycklar och hemliga värden ska ligga som miljövariabler i Vercel och inte skrivas direkt i repot. Lägg aldrig API-nycklar, lösenord eller tokens i en commit.

## Ändra webbplatsen på ett säkert sätt

En rekommenderad arbetsgång är:

1. Kontrollera om ändringen ska göras i Storyblok eller i koden.
2. Skapa en egen branch i GitHub om ändringen är mer än en liten justering.
3. Gör ändringen så avgränsad som möjligt.
4. Kontrollera Vercels förhandsversion.
5. Testa visuellt på desktop och mobil.
6. Testa berörda länkar, formulär och språkversioner.
7. Merge:a till `main` när ändringen är kontrollerad.
8. Kontrollera Production-deployment efter publicering.

## Publicering och kontroll efteråt

Efter en ändring bör man kontrollera:

- att Vercel-builden är grön och har status `Ready`,
- att rätt Vercel-projekt byggdes,
- att rätt språkversion uppdaterades,
- att produktionsdomänen visar den nya versionen,
- att startsida och viktiga undersidor fungerar,
- att språkväxling och redirects fungerar,
- att kontaktformulär och andra viktiga interaktioner fungerar,
- att inga uppenbara fel syns i webbläsaren eller Vercels loggar.

En lyckad build betyder att koden kunde byggas. Det är inte samma sak som att varje formulär, extern integration och varje URL automatiskt är testad.

## Vanliga problem

### Webbplatsen visar gammalt innehåll

Kontrollera att:

- rätt Vercel-deployment ligger i Production,
- rätt domän pekar på rätt Vercel-projekt,
- Storyblok-innehållet verkligen är publicerat,
- webbläsarens cache inte visar en äldre version.

### En sida ger 404

Kontrollera om:

- sidan finns i Storyblok med rätt slug,
- URL:en finns i route- eller middlewarelogiken,
- den engelska eller danska URL:en behöver en rewrite,
- en äldre URL ska redirectas till en ny URL.

### Ett formulär fungerar inte

Kontrollera reCAPTCHA-konfigurationen, e-posttjänsten och Vercels Function Logs.

### En språkversion visar fel innehåll

Kontrollera `STORYBLOCK_LANG` i rätt Vercel-projekt. Kontrollera därefter att Storyblok har rätt språkversion och att sidan är publicerad.

## Vad bör inte ändras utan kontroll?

Var extra försiktig med:

- `middleware.ts`,
- `next.config.mjs`,
- `app/layout.tsx`,
- miljövariabler i Vercel,
- DNS-poster och domänkopplingar,
- Storyblok-token och andra API-nycklar,
- språkvariabeln `STORYBLOCK_LANG`.

Ändra inte DNS-poster som rör e-post, till exempel MX- och SPF-poster, utan att först kontrollera vilken tjänst som använder dem.

## Ansvarsfördelning

| Område | Hanteras främst i |
|---|---|
| Kod, komponenter och funktioner | GitHub-repot |
| Text, bilder och redaktionellt innehåll | Storyblok |
| Byggprocess och publicering | Vercel |
| Domäner och DNS | Domänleverantören och/eller Vercel |
| Miljövariabler och API-nycklar | Vercel, inte GitHub |
| Statistik och samtycke | Google Tag Manager och Cookiebot |

## Sitemap, ompekningar och hreflang

Projektet genererar flera viktiga SEO-relaterade delar direkt i koden:

- **Sitemap:** `app/sitemap.ts` genererar webbplatsens sitemap. Den beskriver vilka publika sidor som ska kunna hittas av sökmotorer.
- **Ompekningar och interna omskrivningar:** `middleware.ts` innehåller språkberoende redirects och rewrites. `next.config.mjs` innehåller ytterligare Next.js-konfiguration för redirects och rewrites.
- **Hreflang:** `app/layout.tsx` innehåller länkar som anger motsvarande språkversioner för svenska, danska och engelska. Dessa hjälper sökmotorer att förstå att språkversionerna hör ihop.

När en URL ändras behöver man därför kontrollera både den nya sidan, eventuell ompekning, sitemap och motsvarande språkversioner.

## Teknisk grundinformation

- Ramverk: Next.js 14.2.35
- UI: React 18
- Programmeringsspråk: TypeScript
- Styling: SCSS och Tailwind CSS
- Innehåll: Storyblok
- Versionshantering: GitHub
- Hosting och deployment: Vercel
- Produktionsbranch: `main`

## När README:n bör uppdateras

Uppdatera denna fil när:

- en ny extern tjänst läggs till,
- nya miljövariabler krävs,
- språk eller domäner ändras,
- publiceringsflödet ändras,
- större route- eller middleware-regler införs.

README:n innehåller medvetet inga hemliga värden, API-nycklar eller lösenord.

