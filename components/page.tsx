import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";

const page = ({ blok, ogonOperationer, linsOperation, generalSetting, lang }: any) => {
  return (
    <div {...storyblokEditable(blok)}>
      {blok &&
        Array.isArray(blok.body) &&
        blok.body.map((nestedBlok: any) => (
          <StoryblokComponent
            blok={nestedBlok}
            key={nestedBlok._uid}
            ogonOperationer={ogonOperationer}
            linsOperation={linsOperation}
            generalSetting={generalSetting}
            lang={lang}
          />
        ))}
    </div>
  );
};

export default page;
