import Image from "next/image";

const Team = ({ props }: any) => {
  return (
    <div className="flex flex-col max-w-[75rem] mx-auto my-24">
        <div className="text-center mb-20 flex flex-col gap-5">
            <h2 className="text-[35px]">{props.title}</h2>
            <h4 className="text-[18px] w-full lg:max-w-[60%] mx-auto">{props.content}</h4>
        </div>
      <div className="flex flex-wrap gap-10 justify-center mx-auto">
        {props.team.map((item: any) => {
          return (
            <div className="flex flex-col gap-5 w-full lg:w-[30%] px-5 lg:px-0">
              {item.img.filename ? (
                <Image
                  src={item?.img?.filename}
                  alt={item.img.alt}
                  width={311}
                  height={382}
                />
              ) : (
                <div className="w-[311px] h-[382px] bg-slate-500 rounded-3xl" />
              )}

              <div>
                <h4 className="text-[16px]">{item.title}</h4>
                <h2 className="text-[28px]">{item.namn}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Team;
