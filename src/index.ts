export { FAQItem, FAQItemList } from "./components/FAQItem/FAQItem";

type ReactChildren = JSX.Element | JSX.Element[];

export type FAQItem = ({
  question,
  children,
  questionFontColor,
  borderColor,
  fillColor,
  bold,
}: {
  question: string;
  children: ReactChildren;

  questionFontColor: string;
  borderColor: string;
  fillColor: string;
  bold?: boolean;
}) => JSX.Element;
export type FAQItemList = ({
  children,
}: {
  children: ReactChildren;
}) => JSX.Element;
export type NavBar = ({ children }: { children: ReactChildren }) => JSX.Element;
export type NavItem = ({
  children,
}: {
  children: ReactChildren;
}) => JSX.Element;
