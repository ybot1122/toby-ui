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
  const transformRef = useRef(0);
  // xOffset ref and state should always be set together.
  const xOffsetRef = useRef(0);
  const [xOffset, setXOffset] = useState(0);
  // keep track of when/where a pointer or touch event started
  const pointerStartData = useRef<undefined | { x: number }>();

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
  transformRef.current = -1 * itemWidth * startIndex + xOffset;

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

  // handle touch
  const pointerDownCb = useCallback(
    (event: PointerEvent | TouchEvent | MouseEvent) => {
      let x = 0;

      if (isPointerEvent(event) || isMouseEvent(event)) {
        x = event.clientX;
      } else {
        x = event.changedTouches["0"].clientX;
      }

      pointerStartData.current = {
        x,
      };
    },
    [],
  );

  const pointerUpCb = useCallback(() => {
    if (!pointerStartData.current) return;

    const nextIndex = Math.min(
      children.length - slidesToShow,
      Math.max(0, Math.round(transformRef.current / itemWidth) * -1),
    );

    pointerStartData.current = undefined;
    xOffsetRef.current = 0;
    setXOffset(0);
    setStartIndex(nextIndex);
  }, [setXOffset, itemWidth, setStartIndex]);

  const pointerMoveCb = useCallback(
    (event: PointerEvent | TouchEvent | MouseEvent) => {
      if (!pointerStartData.current) return;

      let x = 0;
      if (isPointerEvent(event) || isMouseEvent(event)) {
        x = event.clientX;
      } else {
        x = event.changedTouches["0"].clientX;
      }

      setXOffset(x - pointerStartData.current.x);
      xOffsetRef.current = x - pointerStartData.current.x;
    },
    [setXOffset],
  );

  useEffect(() => {
    addEventListener("pointerdown", pointerDownCb);
    addEventListener("pointerup", pointerUpCb);
    addEventListener("pointermove", pointerMoveCb);
    addEventListener("touchstart", pointerDownCb);
    addEventListener("touchmove", pointerMoveCb);
    addEventListener("touchend", pointerUpCb);

    return () => {
      removeEventListener("pointerdown", pointerDownCb);
      removeEventListener("pointerup", pointerUpCb);
      removeEventListener("pointermove", pointerMoveCb);
      removeEventListener("touchstart", pointerDownCb);
      removeEventListener("touchmove", pointerMoveCb);
      removeEventListener("touchend", pointerUpCb);
    };
  }, [pointerDownCb, pointerUpCb]);

  // TODO: add dots

  return (
    <div className="flex w-full">
      {prevButton(goPrev)}
      <div className="overflow-hidden w-full" ref={containerRef}>
        <ul
          className={xOffset !== 0 ? "" : "transition-transform"}
          style={{
            width: `${totalWidth}px`,
            transform: `translateX(${transformRef.current}px)`,
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

function isPointerEvent(e: object): e is PointerEvent {
  return "clientX" in e && "ctrlKey" in e && e.ctrlKey === undefined;
}
function isMouseEvent(e: object): e is MouseEvent {
  return "clientX" in e && "ctrlKey" in e && e.ctrlKey !== undefined;
}
