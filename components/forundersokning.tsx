import Forundersokning from "@/app/components/Forundersokning/Forundersokning";
import { storyblokEditable } from "@storyblok/react";

export const ForunderSokningComponent = ({ blok, lang, headingLevel }: any) => {
  return (
    <div {...storyblokEditable}>
      <Forundersokning props={blok} lang={lang} headingLevel={headingLevel} />
    </div>
  );
};
