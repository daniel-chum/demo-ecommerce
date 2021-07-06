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

  return (
    <div className="relative h-full">
      <div className="flex items-center px-1 pt-2">
        <Arrow
          className={cn("transform rotate-180", { invisible: !scrollable })}
          width="15"
          height="30"
          fill="#2870b8"
          onClick={() => {
            scrollWindow.current.scrollLeft -= 90;
          }}
        />
        <div
          className={cn(
            "flex w-full overflow-x-auto space-x-1.5 mx-1.5",
            s.scrollbar
          )}
          ref={scrollWindow}
        >
          {props.children}
        </div>
        <Arrow
          className={cn({ invisible: !scrollable })}
          width="15"
          height="30"
          fill="#2870b8"
          onClick={() => {
            scrollWindow.current.scrollLeft += 90;
          }}
        />
      </div>
    </div>
  );
};

export default FilePreviewContainer;
