import PartnerLogos from "@/app/components/Blocks/PartnerLogos/PartnerLogos";
import { storyblokEditable } from "@storyblok/react";

export const PartnerLogosComponent = ({blok, lang}: any) => {
  return (
    <div {...storyblokEditable}>
      <PartnerLogos images={blok?.partnerlogos} title={blok.title} lang={lang} />
    </div>
  );
};
