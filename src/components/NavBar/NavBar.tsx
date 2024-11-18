import React from "react";
import * as TobyUITypes from "../..";

export const NavBar: TobyUITypes.NavBar = () => {

  return (
    <nav>

<div className="flex py-4 mx-auto max-w-screen-lg h-full text-blue">
        <div className="self-center ml-5 flex-grow">
          <a
            href="/"
            className="text-center inline-block text-2xl md:text-4xl"
          >
            Keenesse
            <br />
            Coaching &amp; Consulting
          </a>
        </div>

        <div className="md:hidden justify-self-end flex mr-5">
            <MenuIcon />
        </div>

        <div className="flex col-start-2 justify-end">
          <ul
            className={`mt-[60px] md:mt-[0px] absolute md:mr-5 md:static max-md:animate-slideIn md:flex w-1/2 md:w-auto z-40 bg-white items-center justify-between md:space-x-4`}
          >
            <li>Item2</li>
            <li>Item3</li>
            <li>Item4</li>
          </ul>
        </div>
      </div>


    </nav>
  )
}

const MenuIcon = () => {
  return (
    <svg viewBox="0 0 100 50">

  <path id="line1" d="M 10, 25 L 90, 25" stroke="black" strokeWidth="5" />

  <path id="line2" d="M 10, 25 L 90, 25" stroke="black" strokeWidth="5" />

  <path id="line3" d="M 10, 25 L 90, 25" stroke="black" strokeWidth="5" />

</svg>

  )
}