"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import * as TobyUITypes from "../..";

export const Carousel: TobyUITypes.Carousel = ({ slidesToShow, children }) => {
  const [width, setWidth] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWidth(containerRef.current?.getBoundingClientRect().width);
  }, []);

  const goNext = useCallback(() => {
    if (startIndex + slidesToShow < children.length) {
      setStartIndex(startIndex + 1);
    }
  }, [startIndex, slidesToShow, setStartIndex, children]);

  const goPrev = useCallback(() => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  }, [startIndex, setStartIndex]);

  const itemWidth = Math.round(width / slidesToShow);
  const totalWidth = Math.round(children.length * itemWidth);

  console.log(itemWidth, totalWidth);

  const prevButton = <button onClick={goPrev}>Prev</button>;
  const nextButton = <button onClick={goNext}>Next</button>;

  return (
    <div className="flex w-full">
      {prevButton}
      <div className="overflow-hidden w-full" ref={containerRef}>
        <ul
          style={{
            width: `${totalWidth}px`,
            transform: `translateX(-${itemWidth * startIndex}px)`,
          }}
        >
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
