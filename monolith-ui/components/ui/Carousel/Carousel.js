import React, { useState, useRef, useEffect } from 'react'

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

    let position = slider.current.children[newIndex].style.transform.replace("translateX(","").replace("%)", "")

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

  useEffect(() => {

    setChildPosition()
    setParentPosition(0)

  }, [])

  const arrowsOnHover = props.children.length <= 1 ? 'hidden' : (props.arrowsOnHover) ? 'opacity-0 hover:opacity-100' : 'opacity-100'

  return (
    <div className='relative mx-auto overflow-hidden' style={props.style}>
      <ol
        className='relative w-full h-full transition-all duration-300 ease-in-out'
        ref={slider}
        onTransitionEnd={() => handleTransitonEnd()}
      >

        {props.children.map((child, index) => {

          return React.cloneElement(child, {
            key:  index,
            className: `${child.props.className} absolute w-full h-full`,
            })
          })
        }

      </ol>
      <div className={`${arrowsOnHover} absolute top-0 h-full w-full`}>
        <button
          className='z-40 absolute top-1/2 transform -translate-y-2/4 focus:outline-none text-white bg-gray-800 bg-opacity-10 hover:bg-opacity-20 h-12 w-12 rounded-full'
          style= {{left:'5%'}}
          onClick={() => handleNewIndex(selectedIndex - 1)}
        >
          &#10094;
        </button>
        <button
          className='absolute top-1/2 transform -translate-y-2/4 right-3 focus:outline-none text-white bg-gray-800 bg-opacity-10 hover:bg-opacity-20 h-12 w-12 rounded-full'
          style= {{right:'5%'}}
          onClick={() => handleNewIndex(selectedIndex + 1)}
        >
          &#10095;
        </button>
      </div>
      <div className='absolute bottom-0.5 w-full h-6 space-x-2 text-center'>
        {props.children.map((child, index) => {

          let color = index == selectedIndex ? 'bg-secondary' : "bg-gray-500"

          if (props.children.length > 1) {
            return (
              <span
                key={index}
                className={`${color} w-3 h-3 rounded-full inline-block transition duration-300 ease-in-out`}
                onClick={() => handleNewIndex(index)}
              ></span>
            )
          }
          })
        }
      </div>
    </div>
  );
};

export default Carousel;
