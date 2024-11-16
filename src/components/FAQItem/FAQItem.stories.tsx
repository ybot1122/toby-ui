import type { Meta, StoryObj } from '@storybook/react';

import { FAQItem } from './FAQItem';

const meta = {
  title: 'FAQItem',
  component: FAQItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
  },
} satisfies Meta<typeof FAQItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Story: Story = {
  args: {
  },
};
