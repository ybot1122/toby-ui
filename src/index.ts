export { FAQItem, FAQItemList } from "./components/FAQItem/FAQItem";

export type FAQItem = ({question, children}: {question: string, children: JSX.Element | JSX.Element[]}) => JSX.Element;
export type FAQItemList = ({children}: {children: JSX.Element | JSX.Element[]}) => JSX.Element;
