export { FAQItem, FAQItemList } from "./components/FAQItem/FAQItem";

export type FAQItem = ({question, answer}: {question: string, answer: string[]}) => JSX.Element;
export type FAQItemList = ({children}: {children: JSX.Element | JSX.Element[]}) => JSX.Element;
