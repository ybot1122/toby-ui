export { FAQItem, FAQItemList } from "./components/FAQItem/FAQItem";

export type FAQItem = ({question, children , questionFontColor,
  borderColor,
  fillColor,
}: {question: string, children: JSX.Element | JSX.Element[], 

questionFontColor: string,
borderColor: string,
fillColor: string
}
) => JSX.Element;
export type FAQItemList = ({children}: {children: JSX.Element | JSX.Element[]}) => JSX.Element;
