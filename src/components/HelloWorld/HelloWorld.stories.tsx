import type { Meta, StoryObj } from "@storybook/react";

import { HelloWorld } from "./HelloWorld";

const meta = {
  title: "HelloWorld",
  component: HelloWorld,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {},
  argTypes: {},
} satisfies Meta<typeof HelloWorld>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Story: Story = {
  args: {},
};
