import { useRef, useEffect, useState } from "react";
import cn from "classnames";
import s from "./FilePreviewContainer.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

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

  const scrollBarOnHover = props.scrollBarOnHover ? 'overflow-hidden hover:overflow-x-auto' : props.scrollBar ? 'overflow-x-auto' : "overflow-hidden"

  return (
    <>
      <div className="relative flex items-center mx-1.5">
        {props.showArrow &&
          <button
          className={cn(
              "focus:outline-none left-3 z-40", { invisible: !scrollable },
              { 'absolute': props.arrowInContainer },
            )}
            onClick={() => {
              scrollWindow.current.scrollLeft -= 100;
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} className='h-5 text-gray-700'/>
          </button>
        }

        <div
          className={cn(
            "flex w-full h-full space-x-2",
            scrollBarOnHover,
            s.scrollbar,
            { 'mx-2': props.showArrow }
          )}
          ref={scrollWindow}
        >
          {props.children}
        </div>

        {props.showArrow &&
          <button
          className={cn(
              "transform rotate-180 right-3 z-40 focus:outline-none", { invisible: !scrollable },
              { 'absolute': props.arrowInContainer },
            )}
            onClick={() => {
              scrollWindow.current.scrollLeft += 100;
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} className='h-5 text-gray-700'/>
          </button>
        }
      </div>
    </>
  );
};

export default FilePreviewContainer;
