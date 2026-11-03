"use client";

import Image from "next/image";
import Link from "next/link";
import XVISION from "@/public/logo.png";
import NavDots from "./Blocks/NavDots/NavDots";
import useStore from "../lib/store";
import { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { render } from "storyblok-rich-text-react-renderer";
import scss from "./navigate.module.scss";
import { FaFacebook, FaInstagram } from "react-icons/fa";

interface Menu {
  link_title: string;
  _uid: string;
  link: {
    cached_url: string;
    linktype: any;
    url?: string;
  };
}

export default function Navigate({ props, ogonOperationer, linsOperation, lang }: any) {
  const [showLinser, isShowLinser] = useState(false);
  const [showOgon, isShowOgon] = useState(false);
  const open = useStore((state) => state.open);
  const isOpen = useStore((state) => state.setIsOpenMenu);

  const {
    story: {
      content: { logo, Menu, sub_menu, number, mail, popup, showpopup, IG, FB, book_direct_button },
    },
  } = props;

  const handleLinser = () => {
    isShowLinser(!showLinser);
    isShowOgon(false);
  };
  const handleOgon = () => {
    isShowOgon(!showOgon);
    isShowLinser(false);
  };

  return (
    <header className="bg-transparent py-4 px-5 flex items-center justify-between fixed header top-0 z-50 w-full">
      {open && (
        <div
          className="fixed bg-black h-full w-full top-0 left-0 opacity-40 hover:cursor-pointer"
          onClick={() => isOpen(false)}
          style={{ zIndex: 10 }}
        />
      )}
      <Link className="flex items-center" href="/">
        <Image src={logo.filename} width={150} height={50} alt={logo.alt} />
      </Link>
      <nav className="hidden md:flex items-center space-x-6">
        {Menu.map((menuItem: Menu) => {
          return (
            <Link
              key={menuItem._uid}
              className="text-black hover:text-[#1d383f] transition-all"
              href={`/${
                menuItem.link.linktype === "story"
                  ? `${menuItem.link.cached_url.replace(/\/(da|en)\//, "")}`
                  : menuItem.link.url
              }`}
            >
              {menuItem.link_title}
            </Link>
          );
        })}
        <div className="flex gap-2 font-bold">
          <Link href="https://www.xvisionkliniken.se/">SV</Link>
          <span>|</span>
          <Link href="https://www.xvisionkliniken.dk/">DK</Link>
          <span>|</span>
          <Link href="https://www.xvisionclinic.com/">EN</Link>
        </div>
        <Link
          href={`${
            lang === "da"
              ? "https://patient.nu/portal/public/calendar/909ce9da-3780-11ee-a420-fa163e329242"
              : lang === "en"
              ? "https://patient.nu/portal/public/calendar/d9a0a298-3536-11ee-a420-fa163e329242"
              : "https://patient.nu/portal/public/calendar/d9a0a298-3536-11ee-a420-fa163e329242"
          }`}
          className="text-white button bg-[#1D383F] hover:bg-white hover:text-black hover:border-black border-2"
        >
          {book_direct_button}
        </Link>

        <NavDots />
      </nav>
      <div className="flex lg:hidden">
        <NavDots />
      </div>

      <div
        className={`absolute h-[100vh] right-0 top-0 w-full ${
          !showLinser && !showOgon ? "lg:w-[35%]" : "lg:w-[50%]"
        } bg-[#172D32] transition-all duration-300 z-10 ${!open ? "translate-x-full" : "translate-x-0"} `}
      >
        <div className="flex w-full p-[17.8px] h-[90px] items-center justify-between bg-[#A9C1BD]">
          {!showLinser && !showOgon && <Image src={XVISION} width={140} height={50} alt="XVISION" />}
          {showLinser && (
            <Link href="" className="flex gap-2 items-center text-[17px] font-bold open-sans" onClick={handleLinser}>
              <IoChevronBack fontSize={20} />
              {lang == "da" ? "Tilbage" : lang === "en" ? "Back" : "Tillbaka"}
            </Link>
          )}
          {showOgon && (
            <Link href="" className="flex gap-2 items-center text-[17px] font-bold open-sans" onClick={handleOgon}>
              <IoChevronBack fontSize={20} />
              {lang == "da" ? "Tilbage" : lang === "en" ? "Back" : "Tillbaka"}
            </Link>
          )}
        </div>
        <div className="flex">
          <div
            className={`px-5 pt-10 lg:p-10 text-[28px] lg:text-[26px] text-white flex flex-col gap-2 lg:gap-5 lg:mt-10 w-full lg:w-full bg-[#172D32]`}
          >
            {sub_menu.map((menuItem: any) => {
              return menuItem.sub_menu_linser ? (
                <button
                  key={menuItem._uid}
                  onClick={handleLinser}
                  className={`${showLinser && "text-[#CFEDC6]"} flex justify-between items-center`}
                >
                  {menuItem.link_title}
                  <IoChevronForward fontSize={20} className="block lg:hidden" />
                </button>
              ) : menuItem.sub_menu_ogonoperation ? (
                <button
                  key={menuItem._uid}
                  onClick={handleOgon}
                  className={`${showOgon && "text-[#CFEDC6]"} flex justify-between items-center`}
                >
                  {menuItem.link_title}
                  <IoChevronForward fontSize={20} className="block lg:hidden" />
                </button>
              ) : (
                <Link
                  key={menuItem._uid}
                  onClick={() => isOpen(!open)}
                  className="hover:text-[#cfedc6]"
                  href={`${
                    menuItem.link.linktype === "story"
                      ? `${menuItem.link.cached_url.replace(/\/(da|en)\//, "")}`
                      : `${menuItem.link.cached_url}`
                  }`}
                >
                  {menuItem.link_title}
                </Link>
              );
            })}
            <div className="mt-5 hidden lg:block">
              <Link
                href={`${
                  lang === "da"
                    ? "https://patient.nu/portal/public/calendar/909ce9da-3780-11ee-a420-fa163e329242"
                    : lang === "en"
                    ? "https://patient.nu/portal/public/calendar/d9a0a298-3536-11ee-a420-fa163e329242"
                    : "https://patient.nu/portal/public/calendar/d9a0a298-3536-11ee-a420-fa163e329242"
                }`}
                className="text-black text-center text-[18px] lg:max-w-[100%] button bg-[#CFEDC6] mt-10"
              >
                {book_direct_button}
              </Link>
            </div>
            <div className="flex flex-col text-[18px] mt-2 lg:mt-24">
              <h3 className="font-semibold">{lang === "da" ? "Kontakte" : lang === "en" ? "Contact" : "Kontakt"}</h3>
              <div className="flex flex-col mt-2 font-light">
                <Link href={`tel:${number}`}>{number}</Link>
                <Link href={`mailto:${mail}`}>{mail}</Link>
              </div>
              <div className="flex space-x-4 mt-4">
                <Link href={FB.url}>
                  <FaFacebook size={25} />
                </Link>
                <Link href={IG.url}>
                  <FaInstagram size={25} />
                </Link>

                <div className="flex gap-2">
                  <Link onClick={() => isOpen(false)} href="https://www.xvisionkliniken.se/">
                    SV
                  </Link>
                  <span>|</span>
                  <Link onClick={() => isOpen(false)} href="https://www.xvisionkliniken.dk/">
                    DK
                  </Link>
                  <span>|</span>
                  <Link onClick={() => isOpen(false)} href="https://www.xvisionclinic.com/">
                    EN
                  </Link>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-4 mt-6">
                <div className="lg:hidden">
                  <Link
                    href={`${
                      lang === "da"
                        ? "https://patient.nu/portal/public/calendar/909ce9da-3780-11ee-a420-fa163e329242"
                        : lang === "en"
                        ? "https://patient.nu/portal/public/calendar/d9a0a298-3536-11ee-a420-fa163e329242"
                        : "https://patient.nu/portal/public/calendar/d9a0a298-3536-11ee-a420-fa163e329242"
                    }`}
                    onClick={() => isOpen(false)}
                    className="text-black text-center text-[18px] lg:max-w-[100%] button bg-[#CFEDC6] mt-10"
                  >
                    {book_direct_button}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`p-10 text-[20px] text-white flex flex-col gap-5 lg:pt-20  w-full lg:w-1/2 h-[100vh] bg-[#1D383F] transition-all duration-300 absolute right-0 ${
              !showLinser ? "translate-x-full" : "translate-x-0"
            }`}
          >
            <Link
              onClick={() => isOpen(false)}
              href={`/linsoperation`}
              className="hover:text-[#cfedc6] block lg:hidden"
            >
              {lang === "da" ? "Om Linseoperationer" : lang === "en" ? "About lens operations" : "Om Linsoperationer"}
            </Link>
            {linsOperation.map((el: any, index: number) => {
              return (
                <Link
                  onClick={() => isOpen(false)}
                  href={`/${el.full_slug.replace(/^(da|en)\//, "")}`}
                  key={index}
                  className="hover:text-[#cfedc6]"
                >
                  <span>{el.content.site_title ? el.content.site_title : el.name}</span>
                </Link>
              );
            })}
          </div>
          <div
            className={`p-10 text-[20px] capitalize text-white flex flex-col gap-5 lg:pt-20 w-full lg:w-1/2 h-[100vh] bg-[#1D383F] absolute transition-all duration-300 right-0 ${
              !showOgon ? "translate-x-full" : "translate-x-0"
            }`}
          >
            <Link onClick={() => isOpen(false)} href={`/ogonlaser`} className="hover:text-[#cfedc6] block lg:hidden">
              {lang === "da"
                ? "Om øjenoperationer"
                : lang === "en"
                ? "About eye laser treatments"
                : "Om ögonoperationer"}
            </Link>
            {ogonOperationer.map((el: any, index: number) => {
              return (
                <Link
                  onClick={() => isOpen(false)}
                  href={`/${el.full_slug.replace(/^(da|en)\//, "")}`}
                  key={index}
                  className="hover:text-[#cfedc6] normal-case"
                >
                  <span>{el.content.site_title ? el.content.site_title : el.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      {showpopup && (
        <div
          className={`absolute top-20 left-0 p-4 text-center w-full bg-[#F6EEDC] text-[12px] xl:text-[16px] ${scss.popup}`}
        >
          {render(popup)}
        </div>
      )}
    </header>
  );
}
