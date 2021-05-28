import { Arrow } from "../../icons";
import FilePreview from "./FilePreview";
import { useRef, useEffect, useState } from "react";
import cn from "classnames";
import s from "./FilePreviewContainer.module.css";

const FilePreviewContainer = ({
  files,
  handleUploadClick,
  removeFile,
  ...props
}) => {
  const scrollWindow = useRef();

  const [scrollable, setScrollable] = useState(false);

  const deleteAllFIles = () => {
    Object.keys(files).forEach((file) => {
      removeFile(file);
    });
  };

  useEffect(() => {
    if (scrollWindow.current.scrollWidth === scrollWindow.current.clientWidth) {
      setScrollable(false);
    } else {
      setScrollable(true);
    }
  }, [files]);

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
          {Object.keys(files).map((fileName) => {
            let image = files[fileName].preview;
            return (
              <FilePreview
                key={fileName}
                name={fileName}
                imageURL={image}
                onClick={() => removeFile(fileName)}
              />
            );
          })}
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
      <div className="absolute w-full bottom-1.5 grid grid-cols-3">
        <label
          className=" text-center text-call-to-action font-normal cursor-pointer text-xs col-start-2"
          onClick={handleUploadClick}
        >
          Add more images
        </label>
        <i
          className="w-min justify-self-end text-gray-600 cursor-pointer text-xs pr-3"
          onClick={deleteAllFIles}
        >
          Reset
        </i>
      </div>
    </div>
  );
};

export default FilePreviewContainer;
