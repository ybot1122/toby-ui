type ReactChildren = JSX.Element | JSX.Element[];

export type AccordionItem = ({
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
export type AccordionItemList = ({
  children,
}: {
  children: ReactChildren;
}) => JSX.Element;
export type NavBar = ({
  children,
  logo,
  iconFill,
}: {
  children: ReactChildren;
  logo: ReactChildren;
  iconFill: string;
}) => JSX.Element;
export type NavItem = ({
  children,
  backgroundColor,
  hoverBottomColor,
}: {
  children: ReactChildren;
  backgroundColor?: string;
  hoverBottomColor?: string;
}) => JSX.Element;
export type Carousel = ({
  slidesToShow,
  children,
  prevButton,
  nextButton,
  responsive,
}: {
  slidesToShow: number;
  children: React.ReactNode[];
  prevButton: (onClick: () => void) => React.ReactNode;
  nextButton: (onClick: () => void) => React.ReactNode;
  responsive?: { breakpoint: number; slidesToShow: number }[];
}) => JSX.Element;
export interface CloudinaryResource {
  asset_id: string;
  public_id: string;
  resource_type: string;
  format: string;
  folder: string;
  url: string;
  secure_url: string;
}
