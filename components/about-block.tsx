import AboutBlock from "@/app/components/Blocks/AboutBlock/AboutBlock";
import { storyblokEditable } from "@storyblok/react";

export const AboutBlockComponent = ({ blok }: any) => {
  return (
    <div {...storyblokEditable}>
      <AboutBlock props={blok} />
    </div>
  );
};
