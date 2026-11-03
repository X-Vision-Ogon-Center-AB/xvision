import ContactForm from "@/app/components/Blocks/ContactForm/ContactForm";
import { storyblokEditable } from "@storyblok/react";

export const ContactFormComponent = ({ generalSetting, lang }: any) => {
  return (
    <div {...storyblokEditable}>
      <ContactForm global={generalSetting} lang={lang} />;
    </div>
  );
};
