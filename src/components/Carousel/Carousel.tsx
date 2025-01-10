import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as TobyUITypes from "../..";

function getResponsiveMatch(
  responsive: { breakpoint: number; slidesToShow: number }[],
  width: number,
) {
  const sortedResponsive = responsive.sort(
    (a, b) => a.breakpoint - b.breakpoint,
  );
  const result = sortedResponsive.find((r) => r.breakpoint >= width);
  return result?.slidesToShow;
}

export const Carousel: TobyUITypes.Carousel = ({
  slidesToShow: slidesToShowProp,
  children,
  prevButton,
  nextButton,
  responsive: responsiveProp = [],
  enableDots = true,
  swipeDistance = 0.25,
}) => {
  const [slidesToShow, setSlidesToShow] = useState(slidesToShowProp);
  const [startIndex, setStartIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
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

  // handle resize
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const containerWidth = entries[0].contentRect.width;

      const responsiveMatch = getResponsiveMatch(
        responsiveProp,
        containerWidth,
      );

      if (responsiveMatch) {
        setSlidesToShow(responsiveMatch);
      } else {
        setSlidesToShow(slidesToShowProp);
      }
    });

    resizeObserver.observe(document.body);

    return () => resizeObserver.disconnect();
  }, [setSlidesToShow]);

  // handle touch
  const touchStartCb = useCallback((event: TouchEvent) => {
    pointerStartData.current = {
      x: event.changedTouches["0"].clientX,
    };
  }, []);

  const pointerDownCb = useCallback((event: PointerEvent) => {
    event.preventDefault();
    pointerStartData.current = {
      x: event.clientX,
    };
  }, []);

  const pointerUpCb = useCallback(() => {
    if (!pointerStartData.current) return;

    const itemWidth = containerRef.current?.clientWidth / slidesToShow;

    const offset = xOffsetRef.current;
    const distance = offset / itemWidth;

    if (Math.abs(distance) >= swipeDistance) {
      const diff =
        Math.abs(distance) < 1 ? Math.sign(distance) : Math.round(distance);
      const newIndex = startIndex - diff;

      const clampedIndex = Math.min(
        children.length - slidesToShow,
        Math.max(0, newIndex),
      );
      setStartIndex(clampedIndex);
    }

    pointerStartData.current = undefined;
    xOffsetRef.current = 0;
    setXOffset(0);
  }, [setXOffset, setStartIndex, slidesToShow, startIndex, swipeDistance]);

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
    containerRef.current?.addEventListener("pointerdown", pointerDownCb);
    containerRef.current?.addEventListener("touchstart", touchStartCb);
    document.addEventListener("pointerup", pointerUpCb);
    document.addEventListener("pointermove", pointerMoveCb);
    document.addEventListener("touchmove", pointerMoveCb);
    document.addEventListener("touchend", pointerUpCb);

    return () => {
      containerRef.current?.removeEventListener("pointerdown", pointerDownCb);
      containerRef.current?.removeEventListener("touchstart", touchStartCb);
      document.removeEventListener("pointerup", pointerUpCb);
      document.removeEventListener("pointermove", pointerMoveCb);
      document.removeEventListener("touchmove", pointerMoveCb);
      document.removeEventListener("touchend", pointerUpCb);
    };
  }, [touchStartCb, pointerUpCb, pointerMoveCb, pointerDownCb]);

  const dots = useMemo(() => {
    if (!enableDots) return null;

    const dotsArray = [];
    for (let i = 0; i < children.length - slidesToShow + 1; i++) {
      dotsArray.push(
        <li
          key={i}
          className={`w-[20px] h-[20px] px-5 my-2 text-2xl ${startIndex === i ? "" : "opacity-50"}`}
        >
          <button type="button" onClick={goToSlide(i)}>
            •
          </button>
        </li>,
      );
    }
    return <ul className="flex justify-center">{dotsArray}</ul>;
  }, [children.length, slidesToShow, startIndex, goToSlide, enableDots]);

  const itemWidth = 100 / slidesToShow;

  return (
    <>
      <div className="flex w-full items-center flex-row">
        {prevButton(goPrev)}
        <div className="overflow-hidden w-full" ref={containerRef}>
          <ul
            className={`${xOffset !== 0 ? "" : "transition-transform"} whitespace-nowrap w-full`}
            style={{
              transform: `translateX(-${itemWidth * startIndex}%) translateX(${xOffset}px)`,
            }}
          >
            {children.map((c, ind) => (
              <li
                className="inline-block whitespace-normal"
                style={{ width: `${itemWidth}%` }}
                key={ind}
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
        {nextButton(goNext)}
      </div>
      {dots}
    </>
  );
};

function isPointerEvent(e: object): e is PointerEvent {
  return "clientX" in e && "ctrlKey" in e && e.ctrlKey === undefined;
}
function isMouseEvent(e: object): e is MouseEvent {
  return "clientX" in e && "ctrlKey" in e && e.ctrlKey !== undefined;
}
