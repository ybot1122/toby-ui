import {
  AccordionItem,
  AccordionItemList,
} from "@ybot1122/toby-ui/AccordionItem";
import { SdkSection } from "components/SdkSection";
import TabbedDemo from "components/TabbedDemo";

export const AccordionItemSection = () => {
  return (
    <SdkSection id="AccordionItem" title="AccordionItem">
      <div>
        <p className="my-8">
          AccordionItem and AccordionItemList to create a list of collapsible
          items
        </p>

        <TabbedDemo
          Demo={
            <AccordionItemList>
              <AccordionItem
                question="What kind of services do you provide?"
                questionFontColor="text-blue-700"
                borderColor="border-green-500"
                fillColor="color-red-400"
              >
                <p>
                  We are a professional contracting company offering
                  high-quality construction, renovation, and maintenance
                  services. Our experienced team is committed to delivering
                  reliable solutions for residential and commercial projects,
                  ensuring customer satisfaction and exceptional results every
                  time.
                </p>
              </AccordionItem>
              <AccordionItem
                question="Where do you operate?"
                questionFontColor="text-blue-700"
                borderColor="border-green-500"
                fillColor="color-red-400"
              >
                <p>
                  We are a professional contracting company offering
                  high-quality construction, renovation, and maintenance
                  services. Our experienced team is committed to delivering
                  reliable solutions for residential and commercial projects,
                  ensuring customer satisfaction and exceptional results every
                  time.
                </p>
              </AccordionItem>
              <AccordionItem
                question="How often do you make trips?"
                questionFontColor="text-blue-700"
                borderColor="border-green-500"
                fillColor="color-red-400"
              >
                <p>
                  We are a professional contracting company offering
                  high-quality construction, renovation, and maintenance
                  services. Our experienced team is committed to delivering
                  reliable solutions for residential and commercial projects,
                  ensuring customer satisfaction and exceptional results every
                  time.
                </p>
              </AccordionItem>
            </AccordionItemList>
          }
          markdown={`\`\`\`tsx
import {
  AccordionItem,
  AccordionItemList,
} from "@ybot1122/toby-ui/AccordionItem";
<AccordionItemList>
  <AccordionItem
    question="What kind of services do you provide?"
    questionFontColor="text-blue-700"
    borderColor="border-green-500"
    fillColor="color-red-400"
  >
    <p>
      We are a professional contracting company offering
      high-quality construction, renovation, and maintenance
      services. Our experienced team is committed to delivering
      reliable solutions for residential and commercial projects,
      ensuring customer satisfaction and exceptional results every
      time.
    </p>
  </AccordionItem>
  <AccordionItem
    question="Where do you operate?"
    questionFontColor="text-blue-700"
    borderColor="border-green-500"
    fillColor="color-red-400"
  >
    <p>
      We are a professional contracting company offering
      high-quality construction, renovation, and maintenance
      services. Our experienced team is committed to delivering
      reliable solutions for residential and commercial projects,
      ensuring customer satisfaction and exceptional results every
      time.
    </p>
  </AccordionItem>
  <AccordionItem
    question="How often do you make trips?"
    questionFontColor="text-blue-700"
    borderColor="border-green-500"
    fillColor="color-red-400"
  >
    <p>
      We are a professional contracting company offering
      high-quality construction, renovation, and maintenance
      services. Our experienced team is committed to delivering
      reliable solutions for residential and commercial projects,
      ensuring customer satisfaction and exceptional results every
      time.
    </p>
  </AccordionItem>
</AccordionItemList>`}
        />
      </div>
    </SdkSection>
  );
};
