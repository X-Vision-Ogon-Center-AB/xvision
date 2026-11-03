"use client";

import TilesBehandlingar from "@/app/components/Blocks/TilesBehandlingar/TilesBehandlingar";
import { storyblokEditable } from "@storyblok/react";

export const TilesBehandlingarComponent = ({
  blok,
  ogonOperationer,
  linsOperation,
  lang,
}: any) => {
  return (
    <div {...storyblokEditable}>
      <TilesBehandlingar
        props={blok}
        operations={ogonOperationer.stories}
        linsoperation={linsOperation.stories}
        lang={lang}
      />
    </div>
  );
};
