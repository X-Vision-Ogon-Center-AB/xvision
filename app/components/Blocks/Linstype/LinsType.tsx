import Image from "next/image";

interface Linser {
  icon: {
    alt: string;
    filename: string;
  };
  title: string;
  content: string;
}

const LinsType = ({ props }: any) => {
  return (
    <div className="py-10 lg:py-20 px-5 lg:px-0 lg:max-w-[80%] m-auto flex items-center justify-center">
      <div className="flex flex-wrap justify-center gap-5 lg:gap-10 items-center">
        {props.map((item: Linser) => {
          return (
            <div className="flex flex-col h-[270px] items-center justify-center gap-5 bg-[#1D383F] rounded-[37px] text-white">
              <Image
                src={item.icon.filename}
                alt={item.icon.filename}
                width={50}
                height={50}
              />
              <h2>{item.title}</h2>
              <p className="max-w-[70%] text-center">{item.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LinsType;
