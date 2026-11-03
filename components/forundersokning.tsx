import Forundersokning from "@/app/components/Forundersokning/Forundersokning";
import { storyblokEditable } from "@storyblok/react";

export const ForunderSokningComponent = ({ blok, lang }: any) => {
  return (
    <div {...storyblokEditable}>
      <Forundersokning props={blok} lang={lang} />
    </div>
  );
};
