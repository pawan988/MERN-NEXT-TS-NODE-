import React from "react";
import Container from "../Container";
import Link from "next/link";
import Image from "next/image";
import eLogo from "../../../assets/e-logo.png";
import "./Header.css";
import { BsCart2 } from "react-icons/bs";
const Header = () => {
  return (
    <div className="sticky top-0 w-full bg-slate-200 z-30 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link href="/">
              <div className="e-logo">
                <Image src={eLogo} alt="logo" />
              </div>
            </Link>
            <div className="hidden md:block">
              <div className="font-sans text-black  bg-white flex items-center justify-center border-2 rounded-xl">
                <div className="overflow-hidden flex rounded-xl">
                  <input
                    type="text"
                    className="px-4 py-2 focus:border-transparent"
                    placeholder="Search..."
                  />

                  <button className="flex items-center justify-center px-4 border-l">
                    <svg
                      className="h-4 w-4 text-grey-dark"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-8 md:gap-12">
              <div>
                <BsCart2 />
              </div>
              <div>UserMenu</div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Header;
