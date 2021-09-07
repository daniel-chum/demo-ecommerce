import React, { useState, useRef, useLayoutEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import cn from 'classnames'

const Carousel = ({
  ...props
}) => {

  const [selectedIndex, setSelectedIndex] = useState(0)
  const loading = useRef(false)

  const slider = useRef(null)

  const handleNewIndex = (number) => {

    if (loading.current === true || number === selectedIndex ) { return } // If the carousel is loading or the index is already selected, do nothing
    loading.current = true

    let lastChildIndex = props.children.length - 1

    let differenceBetweenIndexes = number - selectedIndex
    let newIndex = selectedIndex + differenceBetweenIndexes

    if (Math.abs(differenceBetweenIndexes) > 1) { // handle slider dot selections
      setChildPosition(newIndex)                  // reset to normal position of child -> [start, ..... , end]
    } else {
      setChildPosition(selectedIndex)             // set infinite scrolling position of child
    }

    if (newIndex < 0) {

      setParentPosition(lastChildIndex)
      setSelectedIndex(lastChildIndex)
      return
    }

    if (newIndex > lastChildIndex) {

      setParentPosition(0)
      setSelectedIndex(0)
      return
    }

    setParentPosition(newIndex)
    setSelectedIndex(newIndex)
  }

  const setChildPosition = (newIndex) => {

    const setEachPosition = (index) => {

      let childPosition = index

      if ( (newIndex == props.children.length - 1) && (index === 0)) { // handle left slider boundary
        childPosition = props.children.length
      }

      if (newIndex === 0  && (index === props.children.length - 1)) { // handle right slider boundary
        childPosition = -1
      }

      let transformDistance = `translateX(${childPosition * 100}%)`
      return transformDistance
    }

    let child = slider.current.childNodes

    Object.keys(child).forEach((key, index) => {

      child[key].style.transform = setEachPosition(index)

    })
  }

  const setParentPosition = (newIndex) => {

    if (slider.current === null) {
      return
    }

    let position = slider.current.children[newIndex]?.style.transform.replace("translateX(","").replace("%)", "")

    slider.current.style.transform = `translateX(${-1 * position}%)`

  }

  const handleTransitonEnd = () => {
    // reset position after transition animation at boundaries (first and last element)

    const resetPosition = (initialPosition) => {
      slider.current.style.transition = 'none';   // no transition animation while resetting position
      slider.current.style.transform = `translateX(-${initialPosition * 100}%)`;
      slider.current.childNodes[initialPosition].style.transform = `translateX(${initialPosition * 100}%)`;
      setTimeout(() => {
        slider.current.style.transition = 'all 0.3s ease-in-out'; // set transition back to normal on next event cycle
      })
    }

    if (slider.current.style.transform == `translateX(-${props.children.length * 100}%)`) { // handle left slider boundary
      resetPosition(0)
    }

    if (slider.current.style.transform == `translateX(100%)`) { // handle left slider boundary
      resetPosition(props.children.length-1)
    }

    loading.current = false
  }

  useLayoutEffect(() => {

    setParentPosition(0)

  }, [])

  const arrowsOnHover = props.children.length <= 1 ? 'hidden' : (props.arrowsOnHover) ? 'opacity-0 hover:opacity-100' : 'opacity-100'
  const dotGap = props.dotGap? props.dotGap : 'space-x-2'

  return (
    <section className={cn('relative overflow-hidden', props.className)} style={props.style}>
      <ol
        className='relative w-full h-full transition-all duration-300 ease-in-out'
        ref={slider}
        onTransitionEnd={() => handleTransitonEnd()}
      >

        {props.children.map((child, index) => {

          let style = {transform: `translateX(${100 * index}%)`}
          return React.cloneElement(child, {
            key:  index,
            className: `${child.props.className} absolute w-full h-full`,
            style: style
            })
          })
        }

      </ol>
      <div className={`${arrowsOnHover} absolute top-0 h-full w-full`}>
        <button
          className='z-40 absolute top-1/2 transform -translate-y-2/4
                     focus:outline-none bg-gray-800 bg-opacity-10 hover:bg-opacity-20 rounded-full
                     flex justify-center items-center'
          style= {{left:'5%', height:'calc(20px + 7%)', aspectRatio: '1/1'}}
          onClick={() => handleNewIndex(selectedIndex - 1)}
        >
          <FontAwesomeIcon icon={faChevronLeft} className='h-full w-full text-white'/>
        </button>
        <button
          className='z-40 absolute top-1/2 transform -translate-y-2/4 rotate-180
                     focus:outline-none bg-gray-800 bg-opacity-10 hover:bg-opacity-20 rounded-full
                     flex justify-center items-center'
          style= {{right:'5%', height:'calc(20px + 7%)', aspectRatio: '1/1'}}
          onClick={() => handleNewIndex(selectedIndex + 1)}
        >
          <FontAwesomeIcon icon={faChevronLeft} className='h-full w-full text-white' />
        </button>
      </div>
      <div className={`absolute bottom-0.5 w-full h-6 text-center ${dotGap}`}>
        {props.children.map((child, index) => {

          let color = index == selectedIndex ? 'bg-secondary' : "bg-gray-400"
          let dotSize = props.dotSize? props.dotSize: 'w-3 h-3'

          if (props.children.length > 1) {
            return (
              <span
                key={index}
                className={`${color} ${dotSize} rounded-full inline-block transition duration-300 ease-in-out`}
                onClick={() => handleNewIndex(index)}
              ></span>
            )
          }
          })
        }
      </div>
    </section>
  );
};

export default Carousel;
