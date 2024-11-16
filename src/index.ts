export * from './components/FAQItem/FAQItem'

export namespace TobyUI {
  export type FAQItem = ({question, answer}: {question: string, answer: string[]}) => JSX.Element;
  export type FAQItemList = ({children}: {children: JSX.Element | JSX.Element[]}) => JSX.Element;
}
