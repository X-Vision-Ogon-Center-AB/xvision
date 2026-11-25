import { currentLang } from "./seo";

/**
 * Structured business details (schema.org JSON-LD) for Google.
 *
 * One organisation, three clinics. Each site lists all three, in its own
 * language, with the clinic in that country first (Hellerup on .dk).
 * Keep addresses and phone in sync with the footer.
 */

type Lang = "sv" | "da" | "en";

const SITE: Record<Lang, string> = {
  sv: "https://www.xvisionkliniken.se",
  da: "https://www.xvisionkliniken.dk",
  en: "https://www.xvisionclinic.com",
};

const PHONE = "+46103001008";
const EMAIL = "info@xvisionkliniken.se";
const LOGO = "https://a.storyblok.com/f/320587/326x114/026430ffa8/xvision_logo-2x.png";
const SAME_AS = [
  "https://www.facebook.com/xvisionogonklinik/",
  "https://www.instagram.com/xvisionkliniken/",
  "https://www.youtube.com/@xvisionkliniken",
];

const TEXT: Record<Lang, { org: string; desc: string; malmo: string; lund: string; hellerup: string; specialties: string[] }> = {
  sv: {
    org: "X-Vision Ögonklinik",
    desc: "Ögonklinik för ögonlaser (SMILE Pro, LASIK, LASEK), linsbyte, grå starr, torra ögon, crosslinking och vitreolys i Malmö, Lund och Hellerup.",
    malmo: "X-Vision Ögonklinik Malmö",
    lund: "X-Vision Ögonklinik Lund",
    hellerup: "X-Vision Eye Center Hellerup",
    specialties: ["Ögonlaser", "Linsbyte", "Grå starr", "Torra ögon", "Crosslinking", "Vitreolys"],
  },
  da: {
    org: "X-Vision Øjenklinik",
    desc: "Øjenklinik for øjenlaser (SMILE Pro, LASIK, LASEK), linseudskiftning, grå stær, tørre øjne, crosslinking og vitreolyse i Hellerup, Malmø og Lund.",
    malmo: "X-Vision Øjenklinik Malmø",
    lund: "X-Vision Øjenklinik Lund",
    hellerup: "X-Vision Eye Center Hellerup",
    specialties: ["Øjenlaser", "Linseudskiftning", "Grå stær", "Tørre øjne", "Crosslinking", "Vitreolyse"],
  },
  en: {
    org: "X-Vision Eye Clinic",
    desc: "Eye clinic for laser eye surgery (SMILE Pro, LASIK, LASEK), lens replacement, cataract, dry eye, cross-linking and vitreolysis in Malmö, Lund and Hellerup.",
    malmo: "X-Vision Eye Clinic Malmö",
    lund: "X-Vision Eye Clinic Lund",
    hellerup: "X-Vision Eye Center Hellerup",
    specialties: ["Laser eye surgery", "Lens replacement", "Cataract surgery", "Dry eye", "Corneal cross-linking", "Vitreolysis"],
  },
};

function clinic(lang: Lang, key: "malmo" | "lund" | "hellerup") {
  const t = TEXT[lang];
  const site = SITE[lang];
  const address = {
    malmo: { streetAddress: "Hyllie Stationstorg 2", postalCode: "215 32", addressLocality: "Malmö", addressCountry: "SE" },
    lund: { streetAddress: "Stora Södergatan 57A", postalCode: "222 23", addressLocality: "Lund", addressCountry: "SE" },
    hellerup: { streetAddress: "Strandvejen 88", postalCode: "2900", addressLocality: "Hellerup", addressCountry: "DK" },
  }[key];
  return {
    "@type": ["MedicalClinic", "LocalBusiness"],
    "@id": `${site}/#clinic-${key}`,
    name: t[key],
    url: site,
    image: LOGO,
    telephone: PHONE,
    email: EMAIL,
    address: { "@type": "PostalAddress", ...address },
    availableService: t.specialties.map((name) => ({ "@type": "MedicalProcedure", name })),
    parentOrganization: { "@id": `${site}/#organization` },
  };
}

export function businessJsonLd(lang: Lang = currentLang()) {
  const t = TEXT[lang];
  const site = SITE[lang];
  const order: ("malmo" | "lund" | "hellerup")[] = lang === "da" ? ["hellerup", "malmo", "lund"] : ["malmo", "lund", "hellerup"];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalOrganization",
        "@id": `${site}/#organization`,
        name: t.org,
        legalName: "X-Vision Ögon Center AB",
        taxID: "559001-0178",
        description: t.desc,
        url: site,
        logo: LOGO,
        telephone: PHONE,
        email: EMAIL,
        sameAs: SAME_AS,
        inLanguage: lang,
        areaServed: [{ "@type": "Country", name: "SE" }, { "@type": "Country", name: "DK" }],
        location: order.map((k) => ({ "@id": `${site}/#clinic-${k}` })),
      },
      ...order.map((k) => clinic(lang, k)),
      {
        "@type": "WebSite",
        "@id": `${site}/#website`,
        url: site,
        name: t.org,
        inLanguage: lang,
        publisher: { "@id": `${site}/#organization` },
      },
    ],
  };
}
