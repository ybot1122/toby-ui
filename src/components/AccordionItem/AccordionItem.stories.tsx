import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { AccordionItem, AccordionItemList } from "./AccordionItem";

const meta = {
  title: "AccordionItemList",
  component: AccordionItemList,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {},
} satisfies Meta<typeof AccordionItemList>;

const faqs = [
  {
    q: "What can I expect during a coaching session?",
    a: [
      "You can choose to meet with any of our coaches to create a unique plan for your individual background and situation, measure progress and ensure that you're thriving within your strengths while also growing in each season.",
      "A free 30-minute discovery call is always offered to ensure we're the right fit for you! When you are ready to take the next steps, you can schedule incremental sessions or take advantage of our package offerings.",
    ],
  },
  {
    q: "I have a business consultation request. What should I do?",
    a: [
      "Keenesse coaching & consulting provides a wide array of professional services for businesses, non-profits and individuals. The first step is to schedule a free consultation to ensure we're a right fit.",
      "If you would like to proceed, Keenesse would provide a proposal and quote before we proceed to contract. The proposal will include expectations of the service, rates and method of payments, possible mileage or travel fees.",
    ],
  },

  {
    q: "Are there discounts for students?",
    a: [
      "Yes, students get an additional 15% off all packages! Email hello@keenesse.com from your .edu email address to request student discounts.",
    ],
  },

  {
    q: "Do you offer pro bono services?",
    a: [
      "On a case by case basis we offer pro bono services. At this time the capacity for pro bono services is full but feel free to email hello@keenesse.com or fill out the contact form on the website to inquire about future opportunities.",
    ],
  },
  {
    q: "Do you offer refunds?",
    a: [
      "No refunds for services are offered. But we understand that life happens. If you can no longer make a scheduled time, you are welcome to reschedule as many times as you would like using the reschedule link at the bottom of your booking confirmation email.",
    ],
  },
  {
    q: "I still have more questions, how do I reach out?",
    a: ["Don't be shy, email hello@keenesee.com with further questions!"],
  },
];

export default meta;
type Story = StoryObj<typeof meta>;

export const Story: Story = {
  args: {
    children: [
      ...faqs.map((f) => (
        <AccordionItem
          question={f.q}
          key={f.q}
          bold={true}
          questionFontColor="text-blue-500"
          fillColor="fill-yellow-700"
          borderColor="border-green-300"
        >
          {f.a.map((ans) => (
            <p key={ans} className="first:mt-0 mt-5">
              {ans}
            </p>
          ))}
        </AccordionItem>
      )),
      <AccordionItem
        question="Do you have pictures?"
        questionFontColor="text-pink-500"
        fillColor="fill-blue-300"
        borderColor="broder-slate-300"
      >
        <img
          alt="logo"
          src="https://www.itsprobablyspicy.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdryy6uo6k%2Fimage%2Fupload%2Fv1709668872%2Fits-probably-spicy%2Fstewtable2.jpg&w=1080&q=75"
        />
      </AccordionItem>,
    ],
  },
};
