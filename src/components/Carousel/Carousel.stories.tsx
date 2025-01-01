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
