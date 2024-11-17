export { FAQItem, FAQItemList } from "./components/FAQItem/FAQItem";

export type FAQItem = ({question, children , questionFontColor,
  borderColor,
  fillColor,
  bold
}: {question: string, children: JSX.Element | JSX.Element[], 

questionFontColor: string,
borderColor: string,
fillColor: string,
bold?: boolean
}
) => JSX.Element;
export type FAQItemList = ({children}: {children: JSX.Element | JSX.Element[]}) => JSX.Element;
