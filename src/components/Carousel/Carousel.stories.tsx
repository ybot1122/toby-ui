import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Carousel } from "./Carousel";

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

const meta = {
  title: "Carousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {},
  argTypes: {},
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Story: Story = {
  args: {
    enableDots: true,
    slidesToShow: 4,
    children: tiles.map((i, ind) => {
      return (
        <div
          key={i}
          className={`text-center h-[340px] px-10 ${ind % 2 === 0 ? "bg-red-500" : "bg-blue-500"}`}
        >
          <div className="h-full flex justify-center flex-wrap">{i}</div>
        </div>
      );
    }),
    prevButton: (onClick) => <button onClick={onClick}>PREV</button>,
    nextButton: (onClick) => <button onClick={onClick}>NEXT</button>,
    responsive: [
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
    ],
  },
};

const imgs = [
  "https://res.cloudinary.com/dryy6uo6k/image/upload/s--d3Cjnjq9--/v1736386297/its-probably-spicy/img-20250108-wa0004.jpg",
  "https://res.cloudinary.com/dryy6uo6k/image/upload/v1734813599/its-probably-spicy/img-20241221-wa0022.jpg",
  "https://res.cloudinary.com/dryy6uo6k/image/upload/v1733190706/its-probably-spicy/4.jpg",
  "https://res.cloudinary.com/dryy6uo6k/image/upload/v1733190680/its-probably-spicy/3.jpg",
];

export const WithImages: Story = {
  args: {
    enableDots: true,
    slidesToShow: 1,
    children: imgs.map((i) => {
      return <img src={i} alt={i} />;
    }),
    prevButton: (onClick) => (
      <button
        onClick={onClick}
        className="translate-x-12 z-10 h-[35px] border-blue-100 border"
      >
        PREV
      </button>
    ),
    nextButton: (onClick) => (
      <button
        onClick={onClick}
        className="-translate-x-12 h-[35px] border-blue-100 border"
      >
        NEXT
      </button>
    ),
  },
};

const Counter = ({ ind }: { ind: number }) => {
  const [count, setCount] = React.useState(0);

  const bg = ind % 2 === 0 ? "bg-blue-500" : "bg-green-500";
  return (
    <div className={"text-center py-10 " + bg}>
      <p className="text-xl">{count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Increment
      </button>
    </div>
  );
};

export const WithInteractiveTiles: Story = {
  args: {
    enableDots: true,
    slidesToShow: 1,
    children: [1, 2, 3, 4, 5].map((i) => {
      return (
        <div>
          <Counter ind={i} />
        </div>
      );
    }),
    prevButton: (onClick) => (
      <button
        onClick={onClick}
        className="translate-x-12 z-10 h-[35px] border-blue-100 border"
      >
        PREV
      </button>
    ),
    nextButton: (onClick) => (
      <button
        onClick={onClick}
        className="-translate-x-12 h-[35px] border-blue-100 border"
      >
        NEXT
      </button>
    ),
  },
};
