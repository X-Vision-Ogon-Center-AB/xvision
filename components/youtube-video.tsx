"use client";

import { useState } from "react";
import { render } from "@/lib/rich-text";

/**
 * Extracts the 11-character YouTube video id from any common link format:
 * youtube.com/watch?v=ID, youtu.be/ID, youtube.com/shorts/ID, /embed/ID or a bare ID.
 */
export function getYouTubeId(input?: string): string | null {
  if (!input) return null;
  const value = input.trim();
  if (/^[\w-]{11}$/.test(value)) return value;
  try {
    const url = new URL(value);
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.slice(1, 12) || null;
    }
    const v = url.searchParams.get("v");
    if (v) return v.slice(0, 11);
    const match = url.pathname.match(/\/(shorts|embed|live)\/([\w-]{11})/);
    return match ? match[2] : null;
  } catch {
    return null;
  }
}

type LiteYouTubeProps = {
  url?: string;
  title?: string;
  vertical?: boolean;
};

/**
 * Click-to-play YouTube player.
 *
 * Shows only a thumbnail and a play button. Nothing is loaded from YouTube until
 * the visitor clicks, and the player then uses youtube-nocookie.com. This keeps
 * pages fast and avoids YouTube cookies before the visitor chooses to watch.
 */
export function LiteYouTube({ url, title, vertical }: LiteYouTubeProps) {
  const [playing, setPlaying] = useState(false);
  const id = getYouTubeId(url);
  if (!id) return null;

  const label = title || "YouTube video";
  const aspect = vertical ? "aspect-[9/16] max-w-[360px]" : "aspect-video";

  return (
    <div className={`relative w-full mx-auto overflow-hidden rounded-2xl bg-black ${aspect}`}>
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Spela upp: ${label}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt={label}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
          />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-[#1D383F]/90 transition-transform group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="h-8 w-8 fill-white" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}

/**
 * Storyblok block "youtube_video".
 * Fields: video_url, title, content (richtext), two_columns, vertical, heading.
 */
export const YouTubeVideo = ({ blok }: any) => {
  if (!getYouTubeId(blok?.video_url)) return null;
  const hasText = blok?.content && blok.two_columns;

  return (
    <div className="container mx-auto my-14 px-4 lg:px-0">
      {blok.heading && (
        <h2 className="mb-8 text-center text-[32px] lg:text-[40px]">{blok.heading}</h2>
      )}
      <div className={hasText ? "grid items-center gap-8 md:grid-cols-2" : "max-w-4xl mx-auto"}>
        <LiteYouTube url={blok.video_url} title={blok.title} vertical={blok.vertical} />
        {hasText && <div className="render-content">{render(blok.content)}</div>}
      </div>
      {blok.title && !hasText && (
        <p className="mt-4 text-center text-[18px] opacity-80">{blok.title}</p>
      )}
    </div>
  );
};
