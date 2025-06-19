import { AccordionItemSection } from "components/componentsSection/AccordionItem";
import { CarouselSection } from "components/componentsSection/Carousel";
import { NavBarSection } from "components/componentsSection/NavBar";

export function clientLoader() {
  return { message: "Hello from clientLoader" };
}

export default function Components() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">React Components</h1>
      <AccordionItemSection />
      <CarouselSection />
      <NavBarSection />
    </div>
  );
}
