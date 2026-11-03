"use client";

import scss from "./navdots.module.scss";
import useStore from "@/app/lib/store";

const NavDots = () => {
  const open = useStore((state) => state.open);
  const setIsOpen = useStore((state) => state.setIsOpenMenu);

  const handleClick = () => {
    setIsOpen(!open);
  };
  
  return (
    <div
      className={`${open ? scss.container : scss.container2} `}
      onClick={handleClick}
    >
      {open ? (
        <>
          <div className={`${scss.dotRight2}  ${scss.dot}`} />
          <div className={`${scss.dot} ${scss.dotLeft}`} />
          <div className={`${scss.dot} ${scss.center}`}></div>
          <div className={`${scss.dot} ${scss.dotRight}`}></div>
          <div className={scss.dot} />
        </>
      ) : (
        <>
          <div className={`${scss.dot} ${scss.dotMerged}`} />
          <div className={`${scss.dot} ${scss.center}`}></div>
          <div className={`${scss.dot} ${scss.dotMergedRight}`}></div>
        </>
      )}
    </div>
  );
};

export default NavDots;
