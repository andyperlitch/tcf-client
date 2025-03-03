import { useCallback, useMemo, useState, forwardRef } from "react";

import { ScreenElementFragment } from "@/gql/graphql";
import { useEffect } from "react";

export const ScreenElementBoundingBox = forwardRef<
  HTMLDivElement,
  {
    selected: boolean;
    onSelect: (elementId: string) => void;
    element: ScreenElementFragment;
    activeEngagement: boolean;
    onUpdate: (element: ScreenElementFragment) => void;
    onDoubleClick?: () => void;
  }
>(function ScreenElementBoundingBox(
  { selected, onSelect, element, activeEngagement, onUpdate, onDoubleClick },
  wrapperRef
) {
  const { pxToVw, pxToVh } = usePixelToViewport();
  const handleClick = useCallback(() => {
    if (!selected) {
      onSelect(element.id);
    }
    return true;
  }, [selected, onSelect, element.id]);
  const moveElementHandlers = useMoveElementHandlers({
    elementRef: wrapperRef as React.RefObject<HTMLDivElement>,
    onUpdatePosition: useCallback(
      ({ x, y }) => {
        const translatedXandY = {
          left: `${pxToVw(x)}vw`,
          top: `${pxToVh(y)}vh`,
        };

        let updates = {};
        if (activeEngagement) {
          updates = {
            engagementStyles: {
              ...element.engagementStyles,
              ...translatedXandY,
            },
          };
        } else {
          // this fancy logic is for a nice UX where if the engagement styles are the same as the default styles,
          // we update both. Once the user deviates between the two, we only update the one which is active.
          const engagementStyles =
            element.engagementStyles.top === element.defaultStyles.top &&
            element.engagementStyles.left === element.defaultStyles.left
              ? {
                  ...element.engagementStyles,
                  ...translatedXandY,
                }
              : {
                  ...translatedXandY,
                  ...element.engagementStyles,
                };
          updates = {
            defaultStyles: {
              ...element.defaultStyles,
              ...translatedXandY,
            },
            engagementStyles,
          };
        }

        onUpdate({
          ...element,
          ...updates,
        });
      },
      [pxToVw, pxToVh, activeEngagement, onUpdate, element]
    ),
  });

  const onUpdateSize = useCallback(
    ({
      top,
      left,
      width,
      height,
    }: Pick<DOMRect, "width" | "height" | "top" | "left">) => {
      if (!selected) {
        onSelect(element.id);
      }
      const updates = activeEngagement
        ? {
            engagementStyles: {
              ...element.engagementStyles,
              width: `${pxToVw(width)}vw`,
              height: `${pxToVh(height)}vh`,
              top: `${pxToVh(top)}vh`,
              left: `${pxToVw(left)}vw`,
            },
          }
        : {
            defaultStyles: {
              ...element.defaultStyles,
              width: `${pxToVw(width)}vw`,
              height: `${pxToVh(height)}vh`,
              top: `${pxToVh(top)}vh`,
              left: `${pxToVw(left)}vw`,
            },
          };

      onUpdate({
        ...element,
        ...updates,
      });
    },
    [selected, activeEngagement, element, pxToVw, pxToVh, onUpdate, onSelect]
  );

  const scaleSEHandlers = useResizeElementHandlers({
    elementRef: wrapperRef as React.RefObject<HTMLDivElement>,
    anchorLocation: "se",
    onUpdateSize,
  });
  const scaleSWHandlers = useResizeElementHandlers({
    elementRef: wrapperRef as React.RefObject<HTMLDivElement>,
    anchorLocation: "sw",
    onUpdateSize,
  });
  const scaleNEHandlers = useResizeElementHandlers({
    elementRef: wrapperRef as React.RefObject<HTMLDivElement>,
    anchorLocation: "ne",
    onUpdateSize,
  });
  const scaleNWHandlers = useResizeElementHandlers({
    elementRef: wrapperRef as React.RefObject<HTMLDivElement>,
    anchorLocation: "nw",
    onUpdateSize,
  });

  const selectedHandleClass = selected
    ? "bg-blue-600 w-2 h-2"
    : "opacity-0 hover:opacity-50";

  const selectedBoundingBoxClass = selected
    ? "opacity-100"
    : "opacity-0 hover:opacity-50";

  return (
    <div className={`absolute h-full w-full`}>
      {/* bounding box */}
      <div
        {...moveElementHandlers}
        data-name="BOUNDING_BOX"
        onDoubleClick={onDoubleClick}
        onClick={handleClick}
        className={`
          absolute h-full w-full cursor-move border border-white

          ${selectedBoundingBoxClass}
        `}
      ></div>
      {/* corner handles */}
      <div
        data-name="BOUNDING_BOX-NW-HANDLE"
        className={`
          absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2
          cursor-nw-resize rounded-full border border-white

          ${selectedHandleClass}
        `}
        {...scaleNWHandlers}
      ></div>
      <div
        data-name="BOUNDING_BOX-NE-HANDLE"
        className={`
          absolute right-0 top-0 -translate-y-1/2 translate-x-1/2
          cursor-ne-resize rounded-full border border-white

          ${selectedHandleClass}
        `}
        {...scaleNEHandlers}
      ></div>
      <div
        data-name="BOUNDING_BOX-SW-HANDLE"
        className={`
          absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2
          cursor-sw-resize rounded-full border border-white

          ${selectedHandleClass}
        `}
        {...scaleSWHandlers}
      ></div>
      <div
        data-name="BOUNDING_BOX-SE-HANDLE"
        className={`
          absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2
          cursor-se-resize rounded-full border border-white

          ${selectedHandleClass}
        `}
        {...scaleSEHandlers}
      ></div>
    </div>
  );
});

/**
 * Returns a set of functions to convert between pixels and viewport units.
 *
 * @returns An object containing functions to convert between pixels and viewport units.
 */
function usePixelToViewport() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    // on window resize, update the viewport width and height
    const handleResize = () => {
      console.log("window resized");
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return useMemo(() => {
    const pxToVw = (px: number) => (px / viewportWidth) * 100;
    const pxToVh = (px: number) => (px / viewportHeight) * 100;
    const vhToPx = (vh: number) => (vh / 100) * viewportHeight;
    const vwToPx = (vw: number) => (vw / 100) * viewportWidth;

    return { pxToVw, pxToVh, vhToPx, vwToPx };
  }, [viewportHeight, viewportWidth]);
}

/**
 * Returns a set of functions to handle moving an element.
 *
 * @param onUpdatePosition - A function to update the element's position.
 * @param elementRef - A ref to the element to move.
 * @param bboxRef - A ref to the editing bounding box of the element.
 * @returns An object containing functions to handle moving an element.
 */
function useMoveElementHandlers({
  onUpdatePosition,
  elementRef,
}: {
  onUpdatePosition: (position: { x: number; y: number }) => void;
  elementRef: React.RefObject<HTMLDivElement>;
}) {
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // ignore right clicks
    if (e.button === 2) {
      return;
    }

    const startX = e.clientX;
    const startY = e.clientY;

    // get the element's bounding client rect
    const { top, left } = elementRef.current?.getBoundingClientRect() ?? {
      top: 0,
      left: 0,
    };

    // remove the `transition-all` class from the element
    // if (elementRef.current && "classList" in elementRef.current) {
    //   elementRef.current.classList.remove("transition-all");
    //   elementRef.current.classList.remove("duration-1000");
    // }

    // create a listener on window for mouse move
    const onMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      // update the element's transform position
      if (elementRef.current && "style" in elementRef.current) {
        elementRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    // create a listener on window for mouse up
    const onMouseUp = (e: MouseEvent) => {
      // get final delta
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      // call onUpdatePosition with new x and y
      onUpdatePosition({ x: left + deltaX, y: top + deltaY });

      // reset the element's transform position
      if (elementRef.current && "style" in elementRef.current) {
        elementRef.current.style.transform = "translate(0px, 0px)";
      }

      // add the `transition-all` class back to the element,
      // but this needs to be wrapped in a setTimeout because onUpdatePosition
      // is asynchronous
      // setTimeout(() => {
      //   if (elementRef.current && "classList" in elementRef.current) {
      //     elementRef.current.classList.add("transition-all");
      //     elementRef.current.classList.add("duration-1000");
      //   }
      // }, 0);

      // remove the mouse move listener
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    window.addEventListener("mouseup", onMouseUp);
  };

  return {
    onMouseDown,
  };
}

function useResizeElementHandlers({
  elementRef,
  onUpdateSize,
  anchorLocation,
}: {
  elementRef: React.RefObject<HTMLDivElement>;
  onUpdateSize: (
    boundingBox: Pick<DOMRect, "width" | "height" | "top" | "left">
  ) => void;
  anchorLocation: "nw" | "ne" | "sw" | "se" | "n" | "e" | "s" | "w";
}) {
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // ignore right clicks
    if (e.button === 2) {
      return;
    }

    const startX = e.clientX;
    const startY = e.clientY;

    // get the element's bounding client rect
    const { width, height, top, left } =
      elementRef.current?.getBoundingClientRect() ?? {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
      };

    // remove the `transition-all` class from the element
    if (elementRef.current && "classList" in elementRef.current) {
      // elementRef.current.classList.remove("transition-all");
    }

    let newWidth = width;
    let newHeight = height;
    let newTop = top;
    let newLeft = left;

    const mouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      let deltaY = e.clientY - startY;

      if (e.shiftKey) {
        deltaY = (deltaX * height) / width;
      }

      // if n, change height and top
      if (anchorLocation.includes("n")) {
        newHeight = height - deltaY;
        newTop = top + deltaY;
      }
      // if s, change height
      if (anchorLocation.includes("s")) {
        newHeight = height + deltaY;
      }
      // if w, change width and left
      if (anchorLocation.includes("w")) {
        newWidth = width - deltaX;
        newLeft = left + deltaX;
      }
      // if e, change width
      if (anchorLocation.includes("e")) {
        newWidth = width + deltaX;
      }

      if (elementRef.current && "style" in elementRef.current) {
        elementRef.current.style.width = `${newWidth}px`;
        elementRef.current.style.height = `${newHeight}px`;
        elementRef.current.style.top = `${newTop}px`;
        elementRef.current.style.left = `${newLeft}px`;
      }
    };

    window.addEventListener("mousemove", mouseMove);

    const onMouseUp = () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      // add the `transition-all` class back to the element
      if (elementRef.current && "classList" in elementRef.current) {
        // elementRef.current.classList.add("transition-all");
      }

      onUpdateSize({
        width: newWidth,
        height: newHeight,
        top: newTop,
        left: newLeft,
      });
    };
    window.addEventListener("mouseup", onMouseUp);
  };

  return {
    onMouseDown,
  };
}
