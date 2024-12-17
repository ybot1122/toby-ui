import type { Meta, StoryObj } from "@storybook/react";

import { Carousel } from "./Carousel";

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
  },
};
