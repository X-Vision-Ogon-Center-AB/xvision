import CTABlock from "@/app/components/Blocks/CTA/CTABlock";
import { storyblokEditable } from "@storyblok/react";

export const CTAComponent = ({ blok }: any) => {
  return (
    <div {...storyblokEditable}>
      <CTABlock
        sub_under_title={blok.sub_under_title}
        subtitle={blok.subtitle}
        title={blok.title}
        content={blok.content}
        btn={blok.btn}
        bg_image={blok.bg_image}
        bg_image_2={blok.bg_image_2}
        two_images={blok.two_images}
      />
    </div>
  );
};
