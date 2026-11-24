import type { Attribution } from "./attribution";

/**
 * Sends a website lead to HubSpot through the Forms API (no secret needed).
 *
 * Only contact details, the site/language and the traffic source are sent.
 * "Leadkälla" (first contact) is deliberately not sent, so returning contacts keep theirs.
 * Answers to health questions, free-text messages, birth dates and visual
 * acuity values stay in the e-mail to the clinic and are NEVER sent to HubSpot.
 *
 * Env:
 *   HUBSPOT_PORTAL_ID   e.g. 149211981
 *   HUBSPOT_FORM_GUID   GUID of the HubSpot form "Webbformulär – hemsidan (API)": e539a5ce-1bd3-4cac-8335-61a14b16bff2
 *   HUBSPOT_FORMS_HOST  optional, default api-eu1.hsforms.com (EU data centre)
 * If PORTAL_ID or FORM_GUID is missing, nothing is sent (the e-mail still goes out).
 */

export type WebsiteLead = {
  name?: string;
  email?: string;
  phone?: string;
  formType: "forundersokning" | "kontakt";
  /** Free-text treatment wish; only mapped to a fixed category, never sent as text. */
  treatmentText?: string;
  attribution?: Attribution;
};

const LANG = (process.env.STORYBLOCK_LANG || "sv").toLowerCase();

function splitName(name = ""): { firstname: string; lastname: string } {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return { firstname: parts[0] || "", lastname: "" };
  return { firstname: parts[0], lastname: parts.slice(1).join(" ") };
}

/** Maps the free-text answer to a value of the HubSpot property "behandlingsintresse". */
export function mapTreatment(text = "", formType: WebsiteLead["formType"]): string {
  const t = text.toLowerCase();
  if (/(rle|linsbyte|linseskift|lens exchange|refractive lens)/.test(t)) return "RLE / Linsbyte";
  if (/(laser|smile|lasik|lasek|prk|icl|implantat|implant)/.test(t)) return "Synfelskirurgi / Laser";
  return formType === "forundersokning" ? "Synfelskirurgi / Laser" : "Annat / Ej fastställt";
}

function clean(v?: string, max = 255): string | undefined {
  if (!v) return undefined;
  const s = String(v).trim().slice(0, max);
  return s || undefined;
}

export async function sendLeadToHubSpot(lead: WebsiteLead): Promise<void> {
  const portal = process.env.HUBSPOT_PORTAL_ID;
  const form = process.env.HUBSPOT_FORM_GUID;
  const host = process.env.HUBSPOT_FORMS_HOST || "api-eu1.hsforms.com";
  const email = clean(lead.email);
  if (!portal || !form || !email) return;

  const a = lead.attribution || {};
  const { firstname, lastname } = splitName(lead.name);
  const values: Record<string, string | undefined> = {
    email,
    firstname: clean(firstname, 100),
    lastname: clean(lastname, 100),
    phone: clean(lead.phone, 40),
    hs_language: LANG === "da" ? "da" : LANG === "en" ? "en" : "sv",
    // Danish site → Hellerup/Copenhagen; Swedish and English leads are routed by the lead rule.
    klinik: LANG === "da" ? "Köpenhamn" : undefined,
    behandlingsintresse: mapTreatment(lead.treatmentText, lead.formType),
    utm_source: clean(a.utm_source, 100),
    utm_medium: clean(a.utm_medium, 100),
    utm_campaign: clean(a.utm_campaign, 100),
    utm_content: clean(a.utm_content, 100),
    xv_webbformular: lead.formType,
    xv_referrer: clean(a.referrer, 200),
  };

  const fields = Object.entries(values)
    .filter(([, v]) => v !== undefined)
    .map(([name, value]) => ({ objectTypeId: "0-1", name, value }));

  const body = {
    fields,
    context: {
      ...(a.hutk ? { hutk: a.hutk } : {}),
      ...(a.page_uri ? { pageUri: a.page_uri } : {}),
      pageName: lead.formType === "forundersokning" ? "Gratis förundersökning" : "Kontaktformulär",
    },
  };

  try {
    const res = await fetch(
      `https://${host}/submissions/v3/integration/submit/${portal}/${form}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
    );
    if (!res.ok) {
      // Log status and HubSpot's error text only; never log the lead itself.
      console.error("HubSpot form submit failed", res.status, (await res.text()).slice(0, 500));
    }
  } catch (err) {
    console.error("HubSpot form submit error", err);
  }
}
