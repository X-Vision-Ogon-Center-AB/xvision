import Link from "next/link";
import { render } from "storyblok-rich-text-react-renderer";

interface InfoBox {
  title?: string;
  content?: any;
  link?: any;
  slug_name?: string;
}

const InfoBox = ({ title, content, link, slug_name }: InfoBox) => {
  return (
    <div className="py-20 lg:py-32 flex flex-col lg:flex-row items-center relative">
      <div className="flex flex-wrap px-5 lg:px-20">
        <div className="w-full lg:w-1/2">
          <span className="absolute top-5 lg:top-16 uppercase text-[16px] font-semibold">
            {slug_name}
          </span>
          <h2 className="text-[44px] lg:max-w-[60%] pb-10 lg:pb-0 font-medium">
            {title}
          </h2>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-10 lg:pr-20 ">
          <span className="text-[18px] flex flex-col gap-5">
            {render(content, {
              markResolvers: {
                link: (children, props) => (
                  <a href={props.href} className="underline font-bold">
                    {children}
                  </a>
                ),
              },
            })}
          </span>

          {link && (
            <Link href="" className="underline underline-offset-8">
              Läs mer
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
