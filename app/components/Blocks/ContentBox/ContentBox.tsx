import { render } from "storyblok-rich-text-react-renderer";
import scss from "./contentbox.module.scss";

const ContentBox = ({ props }: any) => {
  return (
    <>
      <div className="flex bg-[#F0F0F0] max-w-[80%] mx-auto my-14 p-20 rounded-3xl">
        <div
          className={`text-[18px] open-sans ${scss.contentBox} flex flex-col gap-5`}
        >
          {render(props.content)}
        </div>
      </div>
    </>
  );
};

export default ContentBox;
