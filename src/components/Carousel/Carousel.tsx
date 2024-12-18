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

  const pointerCancelCb = useCallback((e: unknown) => {
    console.log(e);
    console.log("cancelled?");
  }, []);

  const pointerUpCb = useCallback(
    (event: PointerEvent | TouchEvent | MouseEvent) => {
      let x = 0;
      if (isPointerEvent(event) || isMouseEvent(event)) {
        x = event.clientY;
      } else {
        x = event.changedTouches["0"].clientY;
      }

      if (!pointerStartData.current) return;

      // TODO: implement logic to determine which item is active

      console.log(x);

      pointerStartData.current = undefined;
      xOffsetRef.current = 0;
      setXOffset(0);
    },
    [setXOffset],
  );

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
    addEventListener("pointercancel", pointerCancelCb);
    addEventListener("touchstart", pointerDownCb);
    addEventListener("touchcancel", pointerCancelCb);
    addEventListener("touchmove", pointerMoveCb);
    addEventListener("touchend", pointerUpCb);

    return () => {
      removeEventListener("pointerdown", pointerDownCb);
      removeEventListener("pointerup", pointerUpCb);
      removeEventListener("pointermove", pointerMoveCb);
      removeEventListener("pointercancel", pointerCancelCb);
      removeEventListener("touchstart", pointerDownCb);
      removeEventListener("touchcancel", pointerCancelCb);
      removeEventListener("touchmove", pointerMoveCb);
      removeEventListener("touchend", pointerUpCb);
    };
  }, [pointerDownCb, pointerUpCb]);

  // TODO: add dots

  const transform = -1 * itemWidth * startIndex + xOffset;
  console.log(transform);

  return (
    <div className="flex w-full">
      {prevButton(goPrev)}
      <div className="overflow-hidden w-full" ref={containerRef}>
        <ul
          className={xOffset !== 0 ? "" : "transition-transform"}
          style={{
            width: `${totalWidth}px`,
            transform: `translateX(${transform}px)`,
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
  return "clientY" in e && "ctrlKey" in e && e.ctrlKey === undefined;
}
function isMouseEvent(e: object): e is MouseEvent {
  return "clientY" in e && "ctrlKey" in e && e.ctrlKey !== undefined;
}
