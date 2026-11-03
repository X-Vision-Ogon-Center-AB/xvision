import InfoBox from "@/app/components/Blocks/InfoBox/InfoBox";
import { storyblokEditable } from "@storyblok/react";

export const InfoBoxComponent = ({ blok }: any) => {
  return (
    <div {...storyblokEditable}>
      <InfoBox
        title={blok.title}
        slug_name={blok.subtitle}
        content={blok.content}
        link={blok.btns}
      />
    </div>
  );
};
