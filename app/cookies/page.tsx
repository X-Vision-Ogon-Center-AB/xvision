import dynamic from "next/dynamic";
import Image from "next/image";
const CookieConsent = dynamic(() => import("../components/CookieConsent"), {
  ssr: false,
});
const Cookies = () => {
  return (
    <div>
      <div className="h-[220px] w-full relative top-0"></div>
      <CookieConsent />;
    </div>
  );
};

export default Cookies;
