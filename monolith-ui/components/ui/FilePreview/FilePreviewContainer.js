import { Arrow } from "../../icons";
import { useRef, useEffect, useState } from "react";
import cn from "classnames";
import s from "./FilePreviewContainer.module.css";

const FilePreviewContainer = ({
  ...props
}) => {
  const scrollWindow = useRef();
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    if (scrollWindow.current.scrollWidth === scrollWindow.current.clientWidth) {
      setScrollable(false);
    } else {
      setScrollable(true);
    }
  });

  const scrollBarOnHover = props.scrollBarOnHover ? 'overflow-hidden hover:overflow-x-auto' : 'overflow-x-auto'

  return (
    <>
      <div className="flex items-center">
        {props.showArrow &&
          <Arrow
            className={cn("transform rotate-180 ml-2", { invisible: !scrollable })}
            width="15"
            height="30"
            fill="var(--primary)"
            onClick={() => {
              scrollWindow.current.scrollLeft -= 90;
            }}
          />
        }

        <div
          className={cn(
            "flex w-full h-full space-x-2",
            scrollBarOnHover,
            s.scrollbar,
            { 'mx-3': props.showArrow }
          )}
          ref={scrollWindow}
        >
          {props.children}
        </div>

        {props.showArrow &&
          <Arrow
            className={cn('mr-2', { invisible: !scrollable })}
            width="15"
            height="30"
            fill="var(--primary)"
            onClick={() => {
              scrollWindow.current.scrollLeft += 90;
            }}
          />
        }
      </div>
    </>
  );
};

export default FilePreviewContainer;
