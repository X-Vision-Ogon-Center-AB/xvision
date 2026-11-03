import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function Custom404() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#1D383F] text-white flex flex-col">
      <h1 className="text-[35px] text-center leading-[45px]">
        404. Sidan du söker finns inte. <br /> Kan vi hjälpa dig vidare?
      </h1>
      <div className="flex flex-col gap-5 mt-10 text-[20px] text-center items-center">
        <Link href="/" className=" text-[#CFEDC6] mt-5 flex gap-2 items-center">
          Tillbaka till start <IoIosArrowForward />
        </Link>

        <Link href="/linsoperation" className=" text-[#CFEDC6] mt-5 flex gap-2 items-center">
          Linsoperation <IoIosArrowForward />
        </Link>

        <Link href="/ogonlaser" className=" text-[#CFEDC6] mt-5 flex gap-2 items-center">
          Ögonlaser <IoIosArrowForward />
        </Link>
      </div>
    </div>
  );
}
