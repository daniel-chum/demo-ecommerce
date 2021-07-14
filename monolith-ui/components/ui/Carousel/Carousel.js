import React, { useState } from 'react'
import s from './Carousel.module.css'
import cn from 'classnames'

const Carousel = ({
  ...props
}) => {

  const [selectedIndex, setSelectedIndex] = useState(0)

  const addNumber = (number) => {

    console.log("in add number")
    let length = props.children.length - 1
    let newIndex = selectedIndex + number

    if (newIndex < 0) {

      setSelectedIndex(length)

      return
    }
    if (newIndex > length) {

      setSelectedIndex(0)

      return
    }

    setSelectedIndex(newIndex)
  }

  return (
    <div className='relative w-full h-60 overflow-hidden'>
      <button
        className='z-50 absolute top-1/2 transform -translate-y-2/4 left-3  focus:outline-none text-white'
        onClick={() => addNumber(-1)}
      >
        &#10094;
      </button>

      <ol
        className='absolute w-full h-full  '
        style={{
          transform: `translateX(-${selectedIndex * 100}%)`
        }}
      >

        {props.children.map((child, index) => {

          let visibility = selectedIndex == index ? "opacity-100 " : "opacity-0"

          return React.cloneElement(child, {
            className: `${visibility} absolute w-full h-full transition-all duration-500 ease-in-out`,
            style: {
              left: `${index * 100}%`
            }
            })
          })
        }

      </ol>

      <button
        className='absolute top-1/2 transform -translate-y-2/4 right-3 focus:outline-none text-white'
        onClick={() => addNumber(1)}
      >
        &#10095;
      </button>
      <div className='absolute bottom-1 w-full h-6 space-x-2 text-center'>
        {props.children.map((child, index) => {

          let color = index == selectedIndex ? 'bg-secondary' : "bg-gray-500"

          return (
            <span
              className={`${color} w-3 h-3 rounded-full inline-block transition duration-300 ease-in-out`}
              onClick={() => { setSelectedIndex(index) }}
            ></span>
          )
          })
        }
      </div>
    </div>
  );
};

export default Carousel;
