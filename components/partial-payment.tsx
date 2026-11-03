import { IoWarningOutline } from "react-icons/io5";
import { render } from "storyblok-rich-text-react-renderer";

export const PartialPayment = ({ blok }: any) => {
  return (
    <div className="flex justify-center p-4 lg:pb-16 lg:pt-0 w-[80%] lg:w-[80%] mx-auto mb-6 lg:mb-0 mt-8 lg:mt-0">
      <div className="flex flex-col items-center gap-4">
        <div>
          <IoWarningOutline fontSize={100} className="text-red-700" />
        </div>
        <div className="text-center">
          <h2 className="font-bold pb-4 text-[20px]">{blok?.payment_title}</h2>
          <div className="lg:w-[800px] partial-content">
            {render(blok?.payment_content)}
          </div>
        </div>
      </div>
    </div>
  );
};
