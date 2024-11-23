import React, { useCallback, useEffect, useRef, useState } from "react";
import * as TobyUITypes from "../..";

export const NavBar: TobyUITypes.NavBar = ({ children, logo }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const toggleMenu = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating((prev) => !prev);
    setIsOpen((prev) => !prev);
    window.setTimeout(() => {
      setIsAnimating((prev) => !prev);
    }, 700);
  }, [setIsOpen, setIsAnimating, isAnimating]);

  const right =
    (isOpen ? "translate-x-0" : "translate-x-full") + " md:translate-x-0 ";
  const visible = !isOpen && !isAnimating ? "invisible" : "";

  return (
    <nav
      className="relative flex items-center px-8 py-4 mx-auto max-w-screen-xl overflow-x-clip"
      ref={navRef}
    >
      <div className="shrink-0">{logo}</div>

      <div className="ml-auto md:hidden z-50">
        <button onClick={toggleMenu}>
          <HamburgerIcon isOpen={isOpen} />
        </button>
      </div>

      <ul
        className={`w-[75vw] absolute ${right} ${visible} right-0 top-full duration-700 ease-in-out transition-transform block z-20 md:visible md:w-full md:static md:ml-5 md:flex-grow md:flex md:items-stretch`}
      >
        {children}
      </ul>
    </nav>
  );
};

export const NavItem: TobyUITypes.NavItem = ({
  children,
  backgroundColor = "bg-zinc-100",
  hoverBottomColor = "bg-blue-300",
}) => {
  return (
    <li
      className={`group relative md:text-center uppercase text-md flex-grow flex flex-col ${backgroundColor}`}
    >
      {children}
      <span
        className={`opacity-0 transition-opacity ease-in duration-300 group-hover:opacity-100 block w-full h-[2px] ${hoverBottomColor} b-0 mt-auto`}
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
