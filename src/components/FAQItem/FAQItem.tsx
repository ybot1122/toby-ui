import React, { useState } from "react";
import { TobyUI } from "../..";

export const FAQItem: TobyUI.FAQItem = ({
  question,
  answer,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      className={`flex py-10 text-left w-full flex-wrap`}
    >
      <button
        className={`block text-blue text-2xl cursor w-1/2 text-left ${isOpen ? "mb-10" : ""} grow mr-5`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
      </button>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? "mb-10" : ""} ml-5 relative w-[20px]`}
        aria-hidden="true"
      >
        <div
          className="right-[20px] absolute inline-block w-[20px] h-[2px] bg-blue"
          aria-hidden="true"
        ></div>
        <div
          className={`right-[20px] inline-block w-[20px] h-[2px] bg-blue absolute ${isOpen ? "animate-closePlus" : "rotate-90 animate-openPlus"}`}
          aria-hidden="true"
        ></div>
      </button>

      {isOpen &&
        answer.map((ans) => (
          <p className="md:mx-10 w-full text-lg mb-5" key={ans}>
            {ans}
          </p>
        ))}
    </li>
  );
}

export const FAQItemList: TobyUI.FAQItemList = ({children}) => {
  return (
    <ul className="*:border-t *:border-borderGray">
      {children}
    </ul>
  )
}