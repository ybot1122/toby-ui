"use client";

import React, { useEffect, useRef, useState } from "react";
import * as TobyUITypes from "../..";

export const Carousel: TobyUITypes.Carousel = ({ slidesToShow, children }) => {
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWidth(containerRef.current?.getBoundingClientRect().width);
  }, []);

  const itemWidth = Math.round(width / slidesToShow);
  const totalWidth = Math.round(children.length * itemWidth);

  console.log(itemWidth, totalWidth);

  const prevButton = <button>Prev</button>;
  const nextButton = <button>Next</button>;

  return (
    <div className="flex w-full">
      {prevButton}
      <div className="overflow-hidden w-full" ref={containerRef}>
        <ul style={{ width: `${totalWidth}px` }}>
          {children.map((c) => (
            <div className="inline-block" style={{ width: `${itemWidth}px` }}>
              {c}
            </div>
          ))}
        </ul>
      </div>
      {nextButton}
    </div>
  );
};
