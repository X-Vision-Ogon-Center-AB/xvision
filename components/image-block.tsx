import ImageBlock from "@/app/components/Blocks/ImageBlock/ImageBlock";
import { storyblokEditable } from "@storyblok/react";

export const ImageBlockComponent = ({ blok, lang }: any) => {
  return (
    <div {...storyblokEditable}>
      <ImageBlock props={blok} lang={lang} />;
    </div>
  );
};
