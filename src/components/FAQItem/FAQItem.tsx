import React, { useState } from "react";
import * as TobyUITypes from "../..";

export const FAQItem: TobyUITypes.FAQItem = ({
  question,
  answer,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      className={`grid py-10 px-5 w-full`}
    >
      <div className="flex w-full items-center">
        <button
          className={`text-left text-2xl cursor mr-5 grow ${isOpen ? "mb-10" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {question}
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`ml-5 w-[20px] ${isOpen ? "mb-10" : ""}`}
          aria-hidden="true"
        >
          X
        </button>        
      </div>


      {isOpen &&
        answer.map((ans) => (
          <p className="md:mx-10 w-full text-lg mb-5" key={ans}>
            {ans}
          </p>
        ))}
    </li>
  );
}

export const FAQItemList: TobyUITypes.FAQItemList = ({children}) => {
  return (
    <ul className="*:border-t *:border-zinc-500 *:last:border-b">
      {children}
    </ul>
  )
}