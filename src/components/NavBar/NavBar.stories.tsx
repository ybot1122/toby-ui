import type { Meta, StoryObj } from '@storybook/react';

import { NavBar } from './NavBar';

const meta = {
  title: 'NavBar',
  component: NavBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
  },
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Story: Story = {
  args: {
  },
};

