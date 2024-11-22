import React, { useCallback, useEffect, useRef, useState } from "react";
import * as TobyUITypes from "../..";

export const NavBar: TobyUITypes.NavBar = ({ children, logo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  return (
    <nav className="flex p-4 mx-auto max-w-screen-xl items-center">
      {logo}

      <ul className={`ml-10 flex-grow flex`}>{children}</ul>

      <div className="ml-10">
        <button onClick={toggleMenu}>
          <HamburgerIcon isOpen={isOpen} />
        </button>
      </div>
    </nav>
  );
};

export const NavItem: TobyUITypes.NavItem = ({ children }) => {
  return (
    <li className={`group relative md:text-center uppercase text-md flex-grow`}>
      {children}
      <span
        className="opacity-0 transition-opacity ease-in duration-300 group-hover:opacity-100 block w-full h-[2px] bg-blue-300 b-0"
        aria-hidden="true"
      ></span>
    </li>
  );
};

const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => {
  const currTimer = useRef<number>();
  const animSeqRef = useRef<0 | 1 | 2>(0);
  const [animSeq, setAnimSeq] = useState<0 | 1 | 2>(0);
  const top =
    animSeq === 0
      ? ""
      : animSeq === 1
        ? "translate-y-[-5px]"
        : "rotate-45 translate-x-[8.5px]";
  const mid =
    animSeq === 0 ? "" : animSeq === 1 ? "scale-[0.1]" : "scale-[0.1]";
  const bot =
    animSeq === 0
      ? ""
      : animSeq === 1
        ? "translate-y-[5px]"
        : "rotate-[-45deg] translate-x-[8.5px]";

  useEffect(() => {
    clearInterval(currTimer.current);
    if (!isOpen) {
      if (animSeqRef.current === 2) {
        setAnimSeq(1);
        animSeqRef.current = 1;
        currTimer.current = window.setTimeout(() => {
          setAnimSeq(0);
          animSeqRef.current = 0;
        }, 300);
      }
    } else {
      setAnimSeq(1);
      animSeqRef.current = 1;
      currTimer.current = window.setTimeout(() => {
        setAnimSeq(2);
        animSeqRef.current = 2;
      }, 300);
    }
  }, [isOpen]);

  return (
    <svg
      id="burger"
      width="30"
      height={30}
      className={isOpen ? "o" : "c"}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
    >
      <path
        className={`duration-300 origin-top-left ${top}`}
        d="M0 5h30v2H0z"
      />
      <line
        className={`transition-transform duration-300 origin-center ${mid}`}
        x1="0"
        y1="15"
        x2="30"
        y2="15"
        stroke="black"
        strokeWidth="2"
      />
      <path
        className={`transition-transform duration-300 origin-bottom-left ${bot}`}
        d="M0 23h30v2H0z"
      />
    </svg>
  );
};
