"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import * as TobyUITypes from "../..";

export const Carousel: TobyUITypes.Carousel = ({
  slidesToShow,
  children,
  prevButton,
  nextButton,
}) => {
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

  const itemWidth = Math.ceil(width / slidesToShow);
  const totalWidth = Math.ceil(children.length * itemWidth);

  // handle resize
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });

    if (containerRef?.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [setWidth]);

  // TODO: handle touch

  // TODO: add dots

  return (
    <div className="flex w-full">
      {prevButton(goPrev)}
      <div className="overflow-hidden w-full" ref={containerRef}>
        <ul
          className="transition-transform"
          style={{
            width: `${totalWidth}px`,
            transform: `translateX(-${itemWidth * startIndex}px)`,
          }}
        >
          {children.map((c, ind) => (
            <div
              className="inline-block"
              style={{ width: `${itemWidth}px` }}
              key={ind}
            >
              {c}
            </div>
          ))}
        </ul>
      </div>
      {nextButton(goNext)}
    </div>
  );
};
