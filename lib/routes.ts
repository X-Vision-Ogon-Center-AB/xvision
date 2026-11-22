/**
 * Public URL rules for the Danish (.dk) and English (.com) sites.
 * Shared by middleware (redirect/rewrite), sitemap, SEO tags and every link
 * the site renders, so links point straight at the public URL instead of
 * bouncing through a 301.
 */
type PathMap = Record<string, string>;

type LanguageRules = {
  redirects: PathMap;
  rewrites: PathMap;
};

/**
 * Customer-approved public URL migration.
 *
 * The CSV files are the source of truth. Public URLs are changed here while
 * Storyblok continues to be queried with the existing internal slugs.
 *
 * STORYBLOCK_LANG is project-specific in Vercel:
 * - da: xvisionkliniken.dk
 * - en: xvisionclinic.com
 * - any other value: no migration rules (including Swedish)
 */
export const RULES: Record<string, LanguageRules> = {
  da: {
    // Old public path -> exact customer-provided new public path.
    redirects: {
      "/ogonlaser": "/oejenlaser",
      "/ogonoperationer/SMILE": "/oejenoperationer/smile-pro",
      "/ogonoperationer/smile": "/oejenoperationer/smile-pro",
      "/ogonoperationer/fs-lasik": "/oejenoperationer/fs-lasik",
      "/ogonoperationer/no-touch-trans-prk": "/oejenoperationer/no-touch-trans-prk",
      "/ogonoperationer/prk-lasek": "/oejenoperationer/lasek",
      "/linsoperation": "/linseudskiftning",
      "/linsoperationer/gra-starr": "/linseoperationer/graa-staer",
      "/linsoperationer/add-on-linsimplantat": "/linseoperationer/add-on-linseimplantat",
      "/linsoperationer/copayment-medfinansiering": "/linseoperationer/medfinansiering",
      "/linsoperationer/icl-linsimplantat": "/linseoperationer/icl-linseimplantat",
      "/linsoperationer/linsbyte-rle": "/linseoperationer/rle-linseudskiftning",
      "/crosslinking-vid-keratokonus": "/crosslinking-ved-keratokonus",
      "/vitreolys-med-yag-laser-behandling": "/vitreolyse-med-yag-laser",
      "/torra-oegon": "/toerre-oejne",
      "/undersokning": "/synsundersoegelse",
      "/gratis-forundersokning": "/gratis-forundersoegelse",
      "/modern-teknologi": "/moderne-teknologi",
      "/om-oss": "/om-os",
      "/var-trygghetsgaranti": "/tryghedsgaranti",
      "/x-vision-oegonklinik-lund": "/oejenklinik-lund",
      "/delbetalning": "/delbetaling",
      "/privacy-policy": "/privatlivspolitik",
      "/blog/floaters-mouches-volantes-och-flugor-i-synfaeltet": "/blog/floaters-og-fluer-i-synsfeltet",
      "/blog/for-gammal-for-ogonlaser": "/blog/for-gammel-til-oejenlaser",
      "/blog/halos-runt-lampor": "/blog/haloer-omkring-lyskilder",
      "/blog/hur-lange-haller-ogonlaser": "/blog/hvor-laenge-holder-oejenlaser",
      "/blog/hur-saekert-aer-ett-linsbyte-": "/blog/hvor-sikkert-er-linseudskiftning",
      "/blog/synskaerpa-1-0-och-oegonlaser": "/blog/synsstyrke-1-0-og-oejenlaser",
      "/blog/kontaktlinser-fore-ogonlaser": "/blog/kontaktlinser-foer-oejenlaser",
      "/ogonoperationer": "/oejenlaser",
      "/linsoperationer": "/linseudskiftning",
      "/erbjudande": "/tilbud",
      "/erbjudanden": "/tilbud",
      "/blog/10-vanliga-myter-om-oegonlaserbehandling": "/blog/10-myter-om-oejenlaser",
      "/blog/astigmatism": "/blog/astigmatisme",
      "/blog/fs-lasik-smile-eller-icl-vilken-synoperation-passar-baest-foer-dina-oegon-": "/blog/fs-lasik-smile-eller-icl",
      "/blog/groen-starr": "/blog/groen-staer",
      "/blog/gula-flaecken": "/blog/den-gule-plet",
      "/blog/halos-blandning-efter-grastarrsoperation": "/blog/haloer-efter-graa-staer-operation",
      "/blog/kataraktoperation-vad-behoever-jag-veta-": "/blog/kataraktoperation-det-skal-du-vide",
      "/blog/manga-tror-att-glasoegon-och-linser-aer-enda-loesningen": "/blog/slip-for-briller-og-linser",
      "/blog/oegonlaser-vid-astigmatism-kan-brytningsfel-korrigeras-": "/blog/oejenlaser-ved-astigmatisme",
      "/blog/oegonmigraen": "/blog/oejenmigraene",
      "/blog/radd-for-ogonlaser": "/blog/bange-for-oejenlaser",
      "/blog/sa-kan-du-slippa-dina-laesglasoegon": "/blog/slip-for-laesebriller",
      "/blog/torra-oegon-och-synfelsoperation-passar-fs-lasik-smile-trans-prk-icl-eller-linsbyte-baest-": "/blog/toerre-oejne-og-synskorrektion",
      "/blog/torra-ogon-kontaktlinser": "/blog/toerre-oejne-af-kontaktlinser",
      "/blog/troetta-oegon": "/blog/traette-oejne",
      "/blog/vad-kostar-ogonlaser": "/blog/hvad-koster-oejenlaser",
      "/blog/vaelj-raett-oegonklinik-foer-laser-och-linsbyte": "/blog/vaelg-den-rette-oejenklinik",
      "/blog/alderssynthet": "/blog/alderssyn",
      "/blog/narsynthet": "/blog/naersynethed",
      "/blog/oversynthet": "/blog/langsynethed",
      "/troetta-ogon": "/traette-oejne",
    },
    // New public path -> existing Storyblok path. First CSV occurrence wins.
    rewrites: {
      "/oejenlaser": "/ogonlaser",
      "/oejenoperationer/smile-pro": "/ogonoperationer/SMILE",
      "/oejenoperationer/fs-lasik": "/ogonoperationer/fs-lasik",
      "/oejenoperationer/no-touch-trans-prk": "/ogonoperationer/no-touch-trans-prk",
      "/oejenoperationer/lasek": "/ogonoperationer/prk-lasek",
      "/linseudskiftning": "/linsoperation",
      "/linseoperationer/graa-staer": "/linsoperationer/gra-starr",
      "/linseoperationer/add-on-linseimplantat": "/linsoperationer/add-on-linsimplantat",
      "/linseoperationer/medfinansiering": "/linsoperationer/copayment-medfinansiering",
      "/linseoperationer/icl-linseimplantat": "/linsoperationer/icl-linsimplantat",
      "/linseoperationer/rle-linseudskiftning": "/linsoperationer/linsbyte-rle",
      "/crosslinking-ved-keratokonus": "/crosslinking-vid-keratokonus",
      "/vitreolyse-med-yag-laser": "/vitreolys-med-yag-laser-behandling",
      "/toerre-oejne": "/torra-oegon",
      "/synsundersoegelse": "/undersokning",
      "/gratis-forundersoegelse": "/gratis-forundersokning",
      "/moderne-teknologi": "/modern-teknologi",
      "/om-os": "/om-oss",
      "/tryghedsgaranti": "/var-trygghetsgaranti",
      "/oejenklinik-lund": "/x-vision-oegonklinik-lund",
      "/delbetaling": "/delbetalning",
      "/privatlivspolitik": "/privacy-policy",
      "/blog/floaters-og-fluer-i-synsfeltet": "/blog/floaters-mouches-volantes-och-flugor-i-synfaeltet",
      "/blog/for-gammel-til-oejenlaser": "/blog/for-gammal-for-ogonlaser",
      "/blog/haloer-omkring-lyskilder": "/blog/halos-runt-lampor",
      "/blog/hvor-laenge-holder-oejenlaser": "/blog/hur-lange-haller-ogonlaser",
      "/blog/hvor-sikkert-er-linseudskiftning": "/blog/hur-saekert-aer-ett-linsbyte-",
      "/blog/synsstyrke-1-0-og-oejenlaser": "/blog/synskaerpa-1-0-och-oegonlaser",
      "/blog/kontaktlinser-foer-oejenlaser": "/blog/kontaktlinser-fore-ogonlaser",
      "/tilbud": "/erbjudande",
      "/blog/10-myter-om-oejenlaser": "/blog/10-vanliga-myter-om-oegonlaserbehandling",
      "/blog/astigmatisme": "/blog/astigmatism",
      "/blog/fs-lasik-smile-eller-icl": "/blog/fs-lasik-smile-eller-icl-vilken-synoperation-passar-baest-foer-dina-oegon-",
      "/blog/groen-staer": "/blog/groen-starr",
      "/blog/den-gule-plet": "/blog/gula-flaecken",
      "/blog/haloer-efter-graa-staer-operation": "/blog/halos-blandning-efter-grastarrsoperation",
      "/blog/kataraktoperation-det-skal-du-vide": "/blog/kataraktoperation-vad-behoever-jag-veta-",
      "/blog/slip-for-briller-og-linser": "/blog/manga-tror-att-glasoegon-och-linser-aer-enda-loesningen",
      "/blog/oejenlaser-ved-astigmatisme": "/blog/oegonlaser-vid-astigmatism-kan-brytningsfel-korrigeras-",
      "/blog/oejenmigraene": "/blog/oegonmigraen",
      "/blog/bange-for-oejenlaser": "/blog/radd-for-ogonlaser",
      "/blog/slip-for-laesebriller": "/blog/sa-kan-du-slippa-dina-laesglasoegon",
      "/blog/toerre-oejne-og-synskorrektion": "/blog/torra-oegon-och-synfelsoperation-passar-fs-lasik-smile-trans-prk-icl-eller-linsbyte-baest-",
      "/blog/toerre-oejne-af-kontaktlinser": "/blog/torra-ogon-kontaktlinser",
      "/blog/traette-oejne": "/blog/troetta-oegon",
      "/blog/hvad-koster-oejenlaser": "/blog/vad-kostar-ogonlaser",
      "/blog/vaelg-den-rette-oejenklinik": "/blog/vaelj-raett-oegonklinik-foer-laser-och-linsbyte",
      "/blog/alderssyn": "/blog/alderssynthet",
      "/blog/naersynethed": "/blog/narsynthet",
      "/blog/langsynethed": "/blog/oversynthet",
      "/traette-oejne": "/troetta-ogon",
    },
  },
  en: {
    // Old public path -> exact customer-provided new public path.
    redirects: {
      "/ogonlaser": "/laser-eye-surgery",
      "/ogonoperationer/SMILE": "/eye-surgery/smile-pro",
      "/ogonoperationer/smile": "/eye-surgery/smile-pro",
      "/ogonoperationer/fs-lasik": "/eye-surgery/fs-lasik",
      "/ogonoperationer/no-touch-trans-prk": "/eye-surgery/no-touch-trans-prk",
      "/ogonoperationer/prk-lasek": "/eye-surgery/lasek",
      "/linsoperation": "/lens-replacement",
      "/linsoperationer/gra-starr": "/lens-surgery/cataract",
      "/linsoperationer/add-on-linsimplantat": "/lens-surgery/add-on-lens-implant",
      "/linsoperationer/copayment-medfinansiering": "/lens-surgery/co-payment",
      "/linsoperationer/icl-linsimplantat": "/lens-surgery/icl-implantable-lens",
      "/linsoperationer/linsbyte-rle": "/lens-surgery/rle-lens-exchange",
      "/crosslinking-vid-keratokonus": "/cross-linking-keratoconus",
      "/vitreolys-med-yag-laser-behandling": "/yag-laser-vitreolysis",
      "/torra-oegon": "/dry-eyes",
      "/undersokning": "/eye-examination",
      "/gratis-forundersokning": "/free-consultation",
      "/modern-teknologi": "/modern-technology",
      "/om-oss": "/about-us",
      "/var-trygghetsgaranti": "/peace-of-mind-guarantee",
      "/x-vision-oegonklinik-lund": "/eye-clinic-lund",
      "/priser": "/prices",
      "/delbetalning": "/instalments",
      "/kunder": "/patient-reviews",
      "/ogonoperationer": "/laser-eye-surgery",
      "/linsoperationer": "/lens-replacement",
      "/erbjudande": "/offers",
      "/erbjudanden": "/offers",
      "/blog/10-vanliga-myter-om-oegonlaserbehandling": "/blog/10-myths-about-laser-eye-surgery",
      "/blog/floaters-mouches-volantes-och-flugor-i-synfaeltet": "/blog/floaters-in-your-vision",
      "/blog/for-gammal-for-ogonlaser": "/blog/too-old-for-laser-eye-surgery",
      "/blog/fs-lasik-smile-eller-icl-vilken-synoperation-passar-baest-foer-dina-oegon-": "/blog/fs-lasik-smile-or-icl",
      "/blog/groen-starr": "/blog/glaucoma",
      "/blog/gula-flaecken": "/blog/macula-and-amd",
      "/blog/halos-blandning-efter-grastarrsoperation": "/blog/halos-and-glare-after-cataract-surgery",
      "/blog/halos-runt-lampor": "/blog/halos-around-lights",
      "/blog/hur-lange-haller-ogonlaser": "/blog/how-long-does-laser-eye-surgery-last",
      "/blog/hur-saekert-aer-ett-linsbyte-": "/blog/is-lens-replacement-safe",
      "/blog/kataraktoperation-vad-behoever-jag-veta-": "/blog/cataract-surgery-what-to-know",
      "/blog/kontaktlinser-fore-ogonlaser": "/blog/contact-lenses-before-laser-eye-surgery",
      "/blog/manga-tror-att-glasoegon-och-linser-aer-enda-loesningen": "/blog/life-without-glasses-and-contacts",
      "/blog/oegonlaser-vid-astigmatism-kan-brytningsfel-korrigeras-": "/blog/laser-eye-surgery-for-astigmatism",
      "/blog/oegonmigraen": "/blog/ocular-migraine",
      "/blog/radd-for-ogonlaser": "/blog/afraid-of-laser-eye-surgery",
      "/blog/sa-kan-du-slippa-dina-laesglasoegon": "/blog/get-rid-of-reading-glasses",
      "/blog/synskaerpa-1-0-och-oegonlaser": "/blog/20-20-vision-and-laser-eye-surgery",
      "/blog/torra-oegon-och-synfelsoperation-passar-fs-lasik-smile-trans-prk-icl-eller-linsbyte-baest-": "/blog/dry-eyes-and-vision-correction",
      "/blog/torra-ogon-kontaktlinser": "/blog/dry-eyes-from-contact-lenses",
      "/blog/troetta-oegon": "/blog/tired-eyes-screen-work",
      "/blog/vad-kostar-ogonlaser": "/blog/laser-eye-surgery-cost",
      "/blog/vaelj-raett-oegonklinik-foer-laser-och-linsbyte": "/blog/choosing-an-eye-clinic",
      "/blog/alderssynthet": "/blog/presbyopia",
      "/blog/narsynthet": "/blog/myopia",
      "/blog/oversynthet": "/blog/hyperopia",
      "/troetta-ogon": "/tired-eyes",
    },
    // New public path -> existing Storyblok path. First CSV occurrence wins.
    rewrites: {
      "/laser-eye-surgery": "/ogonlaser",
      "/eye-surgery/smile-pro": "/ogonoperationer/SMILE",
      "/eye-surgery/fs-lasik": "/ogonoperationer/fs-lasik",
      "/eye-surgery/no-touch-trans-prk": "/ogonoperationer/no-touch-trans-prk",
      "/eye-surgery/lasek": "/ogonoperationer/prk-lasek",
      "/lens-replacement": "/linsoperation",
      "/lens-surgery/cataract": "/linsoperationer/gra-starr",
      "/lens-surgery/add-on-lens-implant": "/linsoperationer/add-on-linsimplantat",
      "/lens-surgery/co-payment": "/linsoperationer/copayment-medfinansiering",
      "/lens-surgery/icl-implantable-lens": "/linsoperationer/icl-linsimplantat",
      "/lens-surgery/rle-lens-exchange": "/linsoperationer/linsbyte-rle",
      "/cross-linking-keratoconus": "/crosslinking-vid-keratokonus",
      "/yag-laser-vitreolysis": "/vitreolys-med-yag-laser-behandling",
      "/dry-eyes": "/torra-oegon",
      "/eye-examination": "/undersokning",
      "/free-consultation": "/gratis-forundersokning",
      "/modern-technology": "/modern-teknologi",
      "/about-us": "/om-oss",
      "/peace-of-mind-guarantee": "/var-trygghetsgaranti",
      "/eye-clinic-lund": "/x-vision-oegonklinik-lund",
      "/prices": "/priser",
      "/instalments": "/delbetalning",
      "/patient-reviews": "/kunder",
      "/offers": "/erbjudande",
      "/blog/10-myths-about-laser-eye-surgery": "/blog/10-vanliga-myter-om-oegonlaserbehandling",
      "/blog/floaters-in-your-vision": "/blog/floaters-mouches-volantes-och-flugor-i-synfaeltet",
      "/blog/too-old-for-laser-eye-surgery": "/blog/for-gammal-for-ogonlaser",
      "/blog/fs-lasik-smile-or-icl": "/blog/fs-lasik-smile-eller-icl-vilken-synoperation-passar-baest-foer-dina-oegon-",
      "/blog/glaucoma": "/blog/groen-starr",
      "/blog/macula-and-amd": "/blog/gula-flaecken",
      "/blog/halos-and-glare-after-cataract-surgery": "/blog/halos-blandning-efter-grastarrsoperation",
      "/blog/halos-around-lights": "/blog/halos-runt-lampor",
      "/blog/how-long-does-laser-eye-surgery-last": "/blog/hur-lange-haller-ogonlaser",
      "/blog/is-lens-replacement-safe": "/blog/hur-saekert-aer-ett-linsbyte-",
      "/blog/cataract-surgery-what-to-know": "/blog/kataraktoperation-vad-behoever-jag-veta-",
      "/blog/contact-lenses-before-laser-eye-surgery": "/blog/kontaktlinser-fore-ogonlaser",
      "/blog/life-without-glasses-and-contacts": "/blog/manga-tror-att-glasoegon-och-linser-aer-enda-loesningen",
      "/blog/laser-eye-surgery-for-astigmatism": "/blog/oegonlaser-vid-astigmatism-kan-brytningsfel-korrigeras-",
      "/blog/ocular-migraine": "/blog/oegonmigraen",
      "/blog/afraid-of-laser-eye-surgery": "/blog/radd-for-ogonlaser",
      "/blog/get-rid-of-reading-glasses": "/blog/sa-kan-du-slippa-dina-laesglasoegon",
      "/blog/20-20-vision-and-laser-eye-surgery": "/blog/synskaerpa-1-0-och-oegonlaser",
      "/blog/dry-eyes-and-vision-correction": "/blog/torra-oegon-och-synfelsoperation-passar-fs-lasik-smile-trans-prk-icl-eller-linsbyte-baest-",
      "/blog/dry-eyes-from-contact-lenses": "/blog/torra-ogon-kontaktlinser",
      "/blog/tired-eyes-screen-work": "/blog/troetta-oegon",
      "/blog/laser-eye-surgery-cost": "/blog/vad-kostar-ogonlaser",
      "/blog/choosing-an-eye-clinic": "/blog/vaelj-raett-oegonklinik-foer-laser-och-linsbyte",
      "/blog/presbyopia": "/blog/alderssynthet",
      "/blog/myopia": "/blog/narsynthet",
      "/blog/hyperopia": "/blog/oversynthet",
      "/tired-eyes": "/troetta-ogon",
    },
  },
};

export type SiteLang = "sv" | "da" | "en";

/** Language of the site being built. Set per Vercel project via STORYBLOCK_LANG. */
export function siteLang(): SiteLang {
  const value = process.env.NEXT_PUBLIC_SITE_LANG || process.env.STORYBLOCK_LANG;
  if (value === "da" || value === "dk") return "da";
  if (value === "en") return "en";
  return "sv";
}

/**
 * Turns a Storyblok link (cached_url / full_slug, with or without a da/ or en/
 * prefix) into the public path on the current site.
 */
export function localHref(raw?: string | null, lang: SiteLang = siteLang()): string {
  if (!raw) return "/";
  if (/^(https?:|mailto:|tel:|#)/i.test(raw)) return raw;
  const match = raw.match(/^([^#?]*)(.*)$/);
  let path = (match?.[1] ?? raw).replace(/^\/+/, "").replace(/^(da|en)\//, "").replace(/\/+$/, "");
  const suffix = match?.[2] ?? "";
  if (path === "" || path === "home") return `/${suffix}`;
  path = `/${path}`;
  const rules = lang === "sv" ? undefined : RULES[lang];
  const target = rules?.redirects[path] ?? rules?.redirects[path.toLowerCase()] ?? path;
  return `${target}${suffix}`;
}
