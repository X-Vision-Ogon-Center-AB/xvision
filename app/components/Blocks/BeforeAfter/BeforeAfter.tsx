import { render } from "storyblok-rich-text-react-renderer";

const BeforeAfter = ({ props }: any) => {
  return (
    <div className="m-auto pt-14 lg:pt-24 pb-14 lg:pb-32 bg-[#1D383F] text-white px-5 lg:px-0">
      <h2 className="lg:text-center mb-14 lg:mb-24 text-[35px]">
        {props.before_after_title}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 lg:max-w-[80%] mx-auto">
        <div>
          <h3 className="mb-10 text-[22px] font-bold">{props.before_title}</h3>
          <span className="text-[18px] flex-col flex gap-5">
            {render(props.before_content, {
              nodeResolvers: {
                bullet_list: (children) => (
                  <ul className="list-disc ml-5">{children}</ul>
                ),
                list_item: (children) => <li className="mb-2">{children}</li>,
              },
            })}
          </span>
        </div>
        <div>
          <h3 className="mb-10 text-[22px] font-bold">{props.after_title}</h3>
          <span className="text-[18px] flex-col flex gap-5 list">
            {render(props.after_content)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfter;
