import React, { useCallback, useState } from "react";
import * as TobyUITypes from "../..";

export const FAQItem: TobyUITypes.FAQItem = ({
  question,
  children,
  questionFontColor,
  borderColor,
  fillColor,
  bold = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  const questionMb = isOpen ? "mb-10" : "";
  const fontBold = bold ? "font-bold" : "";

  return (
    <li
      className={`grid justify-items-stretch py-10 px-5 w-full border-t ${borderColor} last:border-b`}
    >
      {/* QUESTION */}
      <div className={`flex items-center ${questionMb}`}>
        <button
          className={`text-left text-2xl cursor mr-5 grow ${questionFontColor} ${fontBold}`}
          onClick={toggleOpen}
        >
          {question}
        </button>
        <button
          onClick={toggleOpen}
          className={`ml-5 w-[20px]`}
          aria-hidden="true"
        >
          <PlusMinusIcon isOpen={isOpen} fillColor={fillColor} />
        </button>
      </div>

      {/* ANSWER */}
      {isOpen ? <div>{children}</div> : <></>}
    </li>
  );
};

export const FAQItemList: TobyUITypes.FAQItemList = ({ children }) => {
  return <ul className="">{children}</ul>;
};

const PlusMinusIcon = ({
  isOpen,
  fillColor,
}: {
  isOpen: boolean;
  fillColor: string;
}) => {
  const rotate = isOpen ? "rotate-90" : "";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 160 160"
      className={fillColor}
    >
      <rect
        x="70"
        width="20"
        height="160"
        className={`transition-transform duration-300 origin-center ${rotate}`}
      />
      <rect y="70" width="160" height="20" />
    </svg>
  );
};
