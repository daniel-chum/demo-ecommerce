import React, { useRef, useEffect, useState } from "react";
import cn from "classnames";
import s from "./FilePreviewContainer.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

const FilePreviewContainer = ({
  ...props
}) => {
  const scrollWindow = useRef();
  const [scrollable, setScrollable] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(1);

  useEffect(() => {
    if (scrollWindow.current.scrollWidth === scrollWindow.current.clientWidth) {
      setScrollable(false);
    } else {
      setScrollable(true);
    }
  });

  const scrollBarOnHover = props.scrollBarOnHover ? 'overflow-hidden hover:overflow-x-auto' : props.scrollBar ? 'overflow-x-auto' : "overflow-hidden"

  const handleArrowClick = (scrollAmount, indexAddAmount) => {
    scrollWindow.current.scrollLeft += scrollAmount;
    if (selectedImageIndex + indexAddAmount >= 1 && selectedImageIndex + indexAddAmount <= props.children.length) {
      setSelectedImageIndex(selectedImageIndex + indexAddAmount)
    }
  }

  return (
    <div className={cn(props.className, 'relative')}>
      <div className={cn({ 'w-11/12 mx-auto': props.showArrow && scrollable && !props.arrowInContainer})}>
        <div
          className={cn(
            "flex w-full h-full space-x-2",
            s.scrollbar,
            scrollBarOnHover
          )}
          ref={scrollWindow}
        >

          {props.children.map((child, index) => {
            let childWidth = props.viewableElementsInContainer ? 1 / props.viewableElementsInContainer : 1 / 4
            return React.cloneElement(child, {
              key:  index,
              className: `${child.props.className} flex-none relative  bg-gray-100`,
              style: { aspectRatio: '1/1', width: `calc(${childWidth * 100}% - 0.375rem)`, scrollSnapAlign: 'start' },
              })
            })
          }

        </div>
      </div>
      {(props.showArrow || props.arrowInContainer) &&
        <>
          <button
            className={cn(
                "focus:outline-none absolute top-1/2 transform -translate-y-2/4 z-40 h-full", { invisible: !scrollable },
                { 'left-1': props.arrowInContainer },
              )}
              onClick={() => {
                handleArrowClick(-100, -1)
              }}
              type='button'
            >
          <FontAwesomeIcon icon={faChevronLeft} className=' text-gray-700' style={{ height: '15%' }}/>
            </button>
          <button
            className={cn(
                "transform rotate-180 focus:outline-none absolute top-1/2 transform -translate-y-2/4 z-50 right-0 h-full", { invisible: !scrollable },
                { 'right-1': props.arrowInContainer },
              )}
              onClick={() => {
                handleArrowClick(100, 1)
              }}
              type='button'
            >
              <FontAwesomeIcon icon={faChevronLeft}  className=' text-gray-700' style={{ height: '15%' }}/>
          </button>

        </>
      }
      {(props.showIndexing && props.children.length > 1 ) &&
        <>
          <span className='relative left-1/2 transform -translate-x-1/2 font-rubik'>
            {selectedImageIndex + "/" + props.children.length}
          </span>
        </>
      }
    </div>
  );
};

export default FilePreviewContainer;
