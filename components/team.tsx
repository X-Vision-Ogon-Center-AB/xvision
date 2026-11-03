import Team from "@/app/components/Blocks/Team/Team";
import { storyblokEditable } from "@storyblok/react";

export const TeamComponent = ({ blok }: any) => {
  return (
    <div {...storyblokEditable}>
      <Team props={blok} />
    </div>
  );
};
