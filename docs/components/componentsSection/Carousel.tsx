import { Carousel } from "@ybot1122/toby-ui/Carousel";
import { SdkSection } from "components/SdkSection";
import TabbedDemo from "components/TabbedDemo";
const tiles = [
  "Job Application Strategies",
  "Resume Development",
  "Interviewing",
  "Offer Negotiations",
  "Career Development & Transitions",
  "Growth & Leadership",
  "Lifestyle changes",
  "Accountability",
];

export const CarouselSection = () => {
  return (
    <SdkSection id="Carousel" title="Carousel">
      <div>
        <p className="my-8">
          Carousel - show items in a scrollable container, with customizable
          buttons, breakpoints, and swipe distance for touch interaction.
        </p>

        <TabbedDemo
          Demo={
            <Carousel
              slidesToShow={4}
              responsive={[
                {
                  breakpoint: 1280,
                  slidesToShow: 3,
                },
                {
                  breakpoint: 640,
                  slidesToShow: 2,
                },
                {
                  breakpoint: 320,
                  slidesToShow: 1,
                },
              ]}
              prevButton={(onClick) => <button onClick={onClick}>Prev</button>}
              nextButton={(onClick) => <button onClick={onClick}>Next</button>}
              enableDots={true}
            >
              {tiles.map((i, ind) => {
                return (
                  <div
                    key={i}
                    style={{
                      height: "300px",
                      padding: "10px",
                      backgroundColor: ind % 2 === 0 ? "red" : "blue",
                    }}
                  >
                    {i}
                  </div>
                );
              })}
            </Carousel>
          }
          markdown={`\`\`\`tsx
import { Carousel } from "@ybot1122/toby-ui/Carousel";

<Carousel
    slidesToShow={4}
    responsive={[
      {
        breakpoint: 1280,
        slidesToShow: 3,
      },
      {
        breakpoint: 640,
        slidesToShow: 2,
      },
      {
        breakpoint: 320,
        slidesToShow: 1,
      },
    ]}
    prevButton={(onClick) => <button onClick={onClick}>Prev</button>}
    nextButton={(onClick) => <button onClick={onClick}>Next</button>}
    enableDots={true}
  >
    {tiles.map((i, ind) => {
      return (
        <div
          key={i}
          style={{
            height: "300px",
            padding: "10px",
            backgroundColor: ind % 2 === 0 ? "red" : "blue",
          }}
        >
          {i}
        </div>
      );
    })}
  </Carousel>`}
        />
      </div>
    </SdkSection>
  );
};
