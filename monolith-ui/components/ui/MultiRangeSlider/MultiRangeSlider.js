import React, {
  useCallback,
  useEffect,
  useState,
  useRef
} from "react";
import s from "./MultiRangeSlider.module.css";
import cn from 'classnames'

const MultiRangeSlider = ({
  min,
  max,
  getValues
}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    getValues( minVal, maxVal )
  }, [minVal, maxVal]);

  return (
    <div className="relative w-full">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className={cn(s.thumb, 'w-full z-30 absolute h-0 pointer-events-none')}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className={cn(s.thumb, 'w-full z-40 absolute h-0 pointer-events-none')}
      />

      <div className="relative">
        <div className="absolute w-full h-2 bg-gray-300 rounded-3xl"></div>
        <div ref={range} className="absolute h-2 bg-secondary rounded-3xl"></div>
        {/* <div className="absolute mt-6">{minVal}</div>
        <div className="absolute mt-6 right-0">{maxVal}</div> */}
      </div>
    </div>
  );
};

export default MultiRangeSlider;
