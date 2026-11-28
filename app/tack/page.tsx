import type { Metadata } from "next";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { currentLang } from "@/lib/seo";
import FireLead from "./FireLead";

/**
 * Neutral thank-you page shown after a form is sent from a health page.
 * Deliberately mentions no treatment or condition. See lib/lead-thank-you.ts.
 */

const TEXT = {
  sv: {
    title: "Tack! Vi har tagit emot din förfrågan.",
    body: "Vi kontaktar dig så snart som möjligt. Vill du prata med oss direkt når du oss på telefon vardagar 08:30–16:30.",
    home: "Till startsidan",
    meta: "Tack – X-Vision",
  },
  da: {
    title: "Tak! Vi har modtaget din henvendelse.",
    body: "Vi kontakter dig hurtigst muligt. Vil du tale med os med det samme, kan du ringe til os på hverdage kl. 8.30–16.30.",
    home: "Til forsiden",
    meta: "Tak – X-Vision",
  },
  en: {
    title: "Thank you! We have received your request.",
    body: "We will contact you as soon as possible. If you would like to speak to us directly, you can call us on weekdays 08:30–16:30 (CET).",
    home: "Back to the home page",
    meta: "Thank you – X-Vision",
  },
} as const;

export const generateMetadata = async (): Promise<Metadata> => ({
  title: TEXT[currentLang()].meta,
  robots: { index: false, follow: false },
});

export default function ThankYou() {
  const t = TEXT[currentLang()];
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1D383F] text-white flex-col px-6">
      <FireLead />
      <h1 className="text-[35px] text-center leading-[45px] max-w-3xl">{t.title}</h1>
      <p className="text-[20px] text-center mt-6 max-w-2xl">{t.body}</p>
      <Link href="/" className="text-[#CFEDC6] mt-10 text-[20px] flex gap-2 items-center">
        {t.home} <IoIosArrowForward />
      </Link>
    </div>
  );
}
