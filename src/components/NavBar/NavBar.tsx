import React, { useCallback, useState } from "react";
import * as TobyUITypes from "../..";

export const NavBar: TobyUITypes.NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  return (
    <nav>
      <div className="flex py-4 mx-auto max-w-screen-lg">
        <div className="">
          <a href="/" className="">
            Keenesse
            <br />
            Coaching &amp; Consulting
          </a>
        </div>

        <div className="ml-10">
          <button onClick={toggleMenu}>
            <HamburgerIcon isOpen={isOpen} />
          </button>
        </div>

        <div className="ml-10">
          <ul className={``}>
            <li>Item2</li>
            <li>Item3</li>
            <li>Item4</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <svg
      id="burger"
      width="30"
      height={30}
      className={isOpen ? "o" : "c"}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
    >
      <path className="top" d="M0 5h30v2H0z" />
      <line
        className="mid"
        x1="0"
        y1="15"
        x2="30"
        y2="15"
        stroke="black"
        strokeWidth="2"
      />
      <path className="bot" d="M0 23h30v2H0z" />
    </svg>
  );
};
