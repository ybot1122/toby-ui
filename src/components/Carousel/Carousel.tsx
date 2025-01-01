import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as TobyUITypes from "../..";

export const Carousel: TobyUITypes.Carousel = ({
  slidesToShow: slidesToShowProp,
  children,
  prevButton,
  nextButton,
  responsive: responsiveProp = [],
}) => {
  const [slidesToShow, setSlidesToShow] = useState(slidesToShowProp);
  const [width, setWidth] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [responsive, setResponsive] = useState([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const transformRef = useRef(0);
  // xOffset ref and state should always be set together.
  const xOffsetRef = useRef(0);
  const [xOffset, setXOffset] = useState(0);
  // keep track of when/where a pointer or touch event started
  const pointerStartData = useRef<undefined | { x: number }>();

  const goToSlide = useCallback(
    (ind: number) => () => {
      setStartIndex(ind);
    },
    [setStartIndex],
  );

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

  useEffect(() => {
    const breakpoints = [];
    for (const rp of responsiveProp) {
      breakpoints.push(rp.breakpoint);
    }
    breakpoints.push(0);
    console.log(breakpoints.sort());
    console.log(breakpoints);

    // TODO: Figure out responsive
  }, [responsiveProp, setResponsive]);

  // handle resize
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const containerWidth = entries[0].contentRect.width;
      //const bodyWidth = document.body.clientWidth;
      setWidth(containerWidth);
      // TODO: figure out responsive
    });

    if (containerRef?.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [setWidth, responsive, setSlidesToShow]);

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
    containerRef.current.addEventListener("pointerdown", pointerDownCb);
    containerRef.current.addEventListener("pointerup", pointerUpCb);
    containerRef.current.addEventListener("pointermove", pointerMoveCb);
    containerRef.current.addEventListener("touchstart", pointerDownCb);
    containerRef.current.addEventListener("touchmove", pointerMoveCb);
    containerRef.current.addEventListener("touchend", pointerUpCb);

    return () => {
      containerRef.current.removeEventListener("pointerdown", pointerDownCb);
      containerRef.current.removeEventListener("pointerup", pointerUpCb);
      containerRef.current.removeEventListener("pointermove", pointerMoveCb);
      containerRef.current.removeEventListener("touchstart", pointerDownCb);
      containerRef.current.removeEventListener("touchmove", pointerMoveCb);
      containerRef.current.removeEventListener("touchend", pointerUpCb);
    };
  }, [pointerDownCb, pointerUpCb, pointerMoveCb]);

  const dots = useMemo(() => {
    const dotsArray = [];
    for (let i = 0; i < children.length - slidesToShow + 1; i++) {
      dotsArray.push(
        <li
          key={i}
          className={`w-[20px] h-[20px] px-5 mt-5 text-2xl ${startIndex === i ? "" : "opacity-50"}`}
        >
          <button onClick={goToSlide(i)}>•</button>
        </li>,
      );
    }
    return dotsArray;
  }, [children.length, slidesToShow, startIndex, goToSlide]);

  return (
    <>
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
              <li
                className="inline-block"
                style={{ width: `${itemWidth}px` }}
                key={ind}
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
        {nextButton(goNext)}
      </div>
      <ul className="flex justify-center">{dots}</ul>
    </>
  );
};

function isPointerEvent(e: object): e is PointerEvent {
  return "clientX" in e && "ctrlKey" in e && e.ctrlKey === undefined;
}
function isMouseEvent(e: object): e is MouseEvent {
  return "clientX" in e && "ctrlKey" in e && e.ctrlKey !== undefined;
}
