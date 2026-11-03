import { render } from "storyblok-rich-text-react-renderer";

export const Video = ({ blok }: any) => {
  return (
    <div className={`container mx-auto lg:my-14 ${blok.two_columns ? "grid px-4 items-center lg:px-0 md:grid-cols-2 gap-8" : ""} my-20`}>
      {blok.video.filename && (
        <video loop muted controls className="mx-auto max-h-[600px]" playsInline>
          <source src={blok.video.filename} />
        </video>
      )}
      {blok.video_two.filename && (
        <video autoPlay loop muted controls className="mx-auto max-h-[600px]" playsInline>
          <source src={blok.video_two.filename} />
        </video>
      )}
      {blok.two_columns &&
        <div className="mt-14 render-content">
          {render(blok.content)}
        </div>
      }
    </div>
  );
};
