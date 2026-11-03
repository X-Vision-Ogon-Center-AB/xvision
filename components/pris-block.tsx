import PrisBlock from "@/app/components/Blocks/PrisBlock/PrisBlock";
import { storyblokEditable } from "@storyblok/react";

export const PrisBlockComponent = ({ lang, blok }: any) => {
  return (
    <div {...storyblokEditable}>
      <PrisBlock props={blok} lang={lang} />
    </div>
  );
};
