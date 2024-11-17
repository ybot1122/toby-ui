import React, { useCallback, useState, useEffect } from "react";
import * as TobyUITypes from "../..";
import { generateUUID } from "../../utils/generateUUID";

export const FAQItem: TobyUITypes.FAQItem = ({
  question,
  answer: answerProp,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [answer, setAnswer] = useState<{text: string, id: string}[]>([]);

  useEffect(() => {
    setAnswer(answerProp.map((a) => ({text: a, id: generateUUID()})))
  }, [answerProp, setAnswer])

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen])

  const questionMb = isOpen ? 'mb-10' : '';

  return (
    <li
      className={`grid justify-items-stretch py-10 px-5 w-full border-t border-zinc-500 last:border-b`}
    >

      {/* QUESTION */}
      <div className={`flex items-center ${questionMb}`}>
        <button
          className={`text-left text-2xl cursor mr-5 grow`}
          onClick={toggleOpen}
        >
          {question}
        </button>
        <button
          onClick={toggleOpen}
          className={`ml-5 w-[20px]`}
          aria-hidden="true"
        >
          <PlusMinusIcon isOpen={isOpen} />
        </button>        
      </div>


      {/* ANSWER */}
      {isOpen &&
        answer.map(({text, id}) => (
          <p className="md:mx-10 text-lg mb-5" key={id}>
            {text}
          </p>
        ))}
    </li>
  );
}

export const FAQItemList: TobyUITypes.FAQItemList = ({children}) => {
  return (
    <ul className="">
      {children}
    </ul>
  )
}

const PlusMinusIcon = ({isOpen}: {isOpen: boolean}) => {

  const rotate = isOpen ? 'rotate-90' : '';

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 160 160">
  <rect  x="70" width="20" height="160" className={`transition-transform duration-300 origin-center ${rotate}`} />
  <rect y="70" width="160" height="20"  />
</svg>

  )
}