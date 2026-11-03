import ContentBox from "@/app/components/Blocks/ContentBox/ContentBox";
import { storyblokEditable } from "@storyblok/react";

export const ContentBoxComponent = ({ blok }: any) => {
  return (
    <div {...storyblokEditable}>
      <ContentBox props={blok} />
    </div>
  );
};
