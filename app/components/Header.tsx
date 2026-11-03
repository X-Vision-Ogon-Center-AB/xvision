import {
  GetAllLinsOperations,
  GetGenerlSettings,
  GetOgonOperationer,
} from "../lib/apireq";
import Navigate from "./Navigate";

const Header = async ({ lang }: any) => {
  const response = await GetGenerlSettings();

  const ogonOperation = await GetOgonOperationer();
  const linsOperation = await GetAllLinsOperations();
  return (
    <Navigate
      props={response}
      ogonOperationer={ogonOperation.stories}
      linsOperation={linsOperation.stories}
      lang={lang}
    />
  );
};

export default Header;
