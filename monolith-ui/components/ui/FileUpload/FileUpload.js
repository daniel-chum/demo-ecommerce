import { useState, useRef, useEffect } from "react";
import { Arrow } from "../../icons";
import s from "./FileUpload.module.css";
import cn from "classnames";
import FilePreview from "./FilePreview";

const FileUpload = (props) => {
  const { setImage, ...rest } = props;

  const fileInput = useRef();
  const scrollWindow = useRef(null);
  const [files, setFiles] = useState({});

  const handleUploadClick = () => {
    fileInput.current.click();
  };

  const addNewFiles = (newFiles) => {
    for (let file of newFiles) {
      setFiles((prevState) => ({
        ...prevState,
        [file.name]: file,
      }));
    }
    return { ...files };
  };

  const removeFile = (fileName) => {
    setFiles((prevState) => {
      const newState = { ...prevState };
      delete newState[fileName];
      return newState;
    });
  };

  const handleUpload = (e) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      let uploadedFiles = addNewFiles(newFiles);
    }
  };

  useEffect(() => {
    console.log(files);
    // console.log("client width is :" + scrollWindow.current.clientWidth);
    // console.log("scroll width is :" + scrollWindow.current.scrollWidth);
  }, [files]);

  return (
    <div className="flex flex-col justify-center items-center h-40 rounded-lg border-dashed border-2 border-gray-300">
      {Object.keys(files).length == 0 ? (
        <>
          <span className="block text-gray-400 font-normal cursor-default">
            Drop your files here
          </span>
          <span className="block text-gray-400 font-normal cursor-default ">
            or
          </span>
          <label
            className="block text-blue-400 font-normal cursor-pointer"
            onClick={handleUploadClick}
          >
            Browse files
          </label>
        </>
      ) : (
        <>
          <div className="flex w-full justify-between items-center px-2">
            {scrollWindow.current.scrollWidth >
            scrollWindow.current.clientWidth ? (
              <Arrow
                className="transform rotate-180"
                width="10"
                height="20"
                fill="#064e96"
                onClick={() => {
                  scrollWindow.current.scrollLeft -= 80;
                }}
              />
            ) : null}

            <div className="w-11/12">
              <div
                className={cn(s.noScrollbar, "flex space-x-1 overflow-x-auto")}
                ref={scrollWindow}
              >
                {Object.keys(files).map((fileName) => {
                  let file = files[fileName];
                  let imageURL = URL.createObjectURL(file);
                  return (
                    <FilePreview
                      key={fileName}
                      name={fileName}
                      imageURL={imageURL}
                      onClick={() => removeFile(fileName)}
                    />
                  );
                })}
              </div>
            </div>
            {scrollWindow.current.scrollWidth >
            scrollWindow.current.clientWidth ? (
              <Arrow
                width="10"
                height="20"
                fill="#064e96"
                onClick={() => {
                  scrollWindow.current.scrollLeft += 80;
                }}
              />
            ) : null}
          </div>
          <label
            className="mx-auto text-blue-400 font-normal cursor-pointer text-xs pt-2"
            onClick={handleUploadClick}
          >
            Add more files
          </label>
        </>
      )}
      <input
        ref={fileInput}
        type="file"
        onChange={handleUpload}
        accept="image/*"
        title=""
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;
