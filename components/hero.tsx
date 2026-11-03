import Hero from "@/app/components/Blocks/Hero/Hero";
import { storyblokEditable } from "@storyblok/react";

export const HeroComponent = ({ blok }: any) => {
  return (
    <div {...storyblokEditable}>
      <Hero
        title={blok.title}
        text={blok.text}
        uspar={blok.uspar}
        img={blok.img}
        buttons={blok.buttons}
        no_image_hero={blok.no_image_hero}
        subtitle={blok.subtitle}
        text_center={blok.text_center}
        no_dots={blok.no_dots}
        opacity={blok.opacity}
        //   popup={global.story.content.showpopup}
        mobile_img={blok.mobile_img}
        heroHome={blok.heroHome}
        heroOmoss={blok.heroOmoss}
      />
    </div>
  );
};
