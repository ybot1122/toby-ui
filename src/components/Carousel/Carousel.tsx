"use client";

import React, { useEffect, useRef, useState } from "react";
import * as TobyUITypes from "../..";

export const Carousel: TobyUITypes.Carousel = ({ slidesToShow }) => {
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWidth(containerRef.current?.getBoundingClientRect().width);
  }, []);

  const items = [];

  const itemWidth = Math.round(width / slidesToShow);

  for (let i = 0; i < 12; i++) {
    items.push(
      <li
        key={i}
        className="inline-block"
        style={{
          width: `${itemWidth}px`,
          background: i % 2 === 0 ? "red" : "blue",
        }}
      >
        Item {i}
      </li>,
    );
  }

  const totalWidth = Math.round(items.length * itemWidth);

  console.log(itemWidth, totalWidth);

  const prevButton = <button>Prev</button>;
  const nextButton = <button>Next</button>;

  return (
    <div className="flex w-full">
      {prevButton}
      <div className="overflow-hidden w-full" ref={containerRef}>
        <ul style={{ width: `${totalWidth}px` }}>{items}</ul>
      </div>
      {nextButton}
    </div>
  );
};
