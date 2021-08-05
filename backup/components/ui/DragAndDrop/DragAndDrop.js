import { useState, useRef, useEffect } from "react";

const DragAndDrop = (props) => {
  const [drag, setDrag] = useState(false);
  const dragCounter = useRef(0);
  const dropRef = useRef();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dragCounter.current++;
    if (e.dataTransfer.items.length > 0) {
      setDrag(true);
    }
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dragCounter.current--;

    if (dragCounter.current > 0) return;
    setDrag(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dragCounter.current--;
    setDrag(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      props.handleDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  useEffect(() => {
    let div = dropRef.current;
    div.addEventListener("dragenter", handleDragIn);
    div.addEventListener("dragleave", handleDragOut);
    div.addEventListener("dragover", handleDrag);
    div.addEventListener("drop", handleDrop);
    return () => {
      div.removeEventListener("dragenter", handleDragIn);
      div.removeEventListener("dragleave", handleDragOut);
      div.removeEventListener("dragover", handleDrag);
      div.removeEventListener("drop", handleDrop);
    };
  }, []);

  return (
    <div className="relative" ref={dropRef}>
      {drag && (
        <div className="border-dashed border-2 rounded-lg border-gray-600 flex items-center justify-center bg-gray-100 absolute w-full h-full text-black opacity-80 z-50">
          <span>Drop here</span>
        </div>
      )}
      {props.children}
    </div>
  );
};

export default DragAndDrop;
