import { isHealthPath } from "@/lib/health-paths";

/**
 * Neutral thank-you page for leads from health pages (vårdsidor).
 *
 * Tracking tags never fire on health pages (GTM exception "Vårdsidor"), so a form
 * sent from e.g. the dry-eye or vitreolysis page could not be measured. Instead of
 * firing the lead event there, the visitor is sent to /tack, a page that says
 * nothing about any condition, and the lead event fires on that page.
 *
 * - The form type ("kontakt" / "forundersokning") is passed in sessionStorage, so
 *   no health information ends up in the URL.
 * - The navigation uses rel="noreferrer", so the health page's URL is not passed
 *   on as referrer to /tack or to any tag that runs there.
 * - The lead event fires only after a real form submission; visiting /tack
 *   directly or reloading it does not count as a lead.
 */

export const THANK_YOU_PATH = "/tack";
const PENDING_KEY = "xv_lead_pending";

function pushLead(formType: string) {
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: "xv_lead", form_type: formType });
}

/**
 * Call after a form has been sent successfully.
 * Returns true when the visitor is being redirected to the thank-you page
 * (the caller should then not show its own success state).
 */
export function reportLead(formType: string): boolean {
  if (typeof window === "undefined") return false;

  if (!isHealthPath(window.location.pathname)) {
    pushLead(formType);
    return false;
  }

  try {
    sessionStorage.setItem(PENDING_KEY, formType);
  } catch {
    // Storage blocked: the visitor still gets the thank-you page, the lead is just not counted.
  }
  const link = document.createElement("a");
  link.href = THANK_YOU_PATH;
  link.rel = "noreferrer";
  document.body.appendChild(link);
  link.click();
  return true;
}

/** Called once by the thank-you page. */
export function firePendingLead() {
  let formType: string | null = null;
  try {
    formType = sessionStorage.getItem(PENDING_KEY);
    sessionStorage.removeItem(PENDING_KEY);
  } catch {
    return;
  }
  if (formType) pushLead(formType);
}
