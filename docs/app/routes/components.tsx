import { AccordionItemSection } from "components/componentsSection/AccordionItem";
import { CarouselSection } from "components/componentsSection/Carousel";
import { SdkSection } from "components/SdkSection";

export function clientLoader() {
  return { message: "Hello from clientLoader" };
}

export default function Components() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">React Components</h1>
      <AccordionItemSection />
      <CarouselSection />
      <SdkSection id="NavBar" title="NavBar">
        It collapses
      </SdkSection>
    </div>
  );
}
