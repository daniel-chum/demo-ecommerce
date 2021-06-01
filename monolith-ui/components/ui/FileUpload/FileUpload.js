import { useState, useRef, useEffect } from "react";
import FilePreviewContainer from "./FilePreviewContainer";
import DragAndDrop from "../DragAndDrop/DragAndDrop";

const FileUpload = (props) => {
  const { setImage, ...rest } = props;

  const fileInput = useRef();
  const [files, setFiles] = useState({});

  const handleUploadClick = () => {
    fileInput.current.click();
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

  const addNewFiles = (newFiles) => {
    for (let file of newFiles) {
      setFiles((prevState) => ({
        ...prevState,
        [file.name]: {
          file: file,
          preview: URL.createObjectURL(file),
        },
      }));
    }
    return { ...files };
  };

  const convertNestedObjectToArray = (nestedObj) =>
    Object.keys(nestedObj).map((key) => nestedObj[key].file); // Get file without preview property

  useEffect(() => {
    const filesAsArray = convertNestedObjectToArray(files);
    setImage(filesAsArray);
  }, [files]);

  useEffect(() => {
    return () => {
      Object.keys(files).forEach((file) => {
        URL.revokeObjectURL(files[file].preview);
      });
    };
  }, []);

  return (
    <DragAndDrop handleDrop={addNewFiles}>
      <div className="h-44 rounded-lg border-dashed border-2 border-gray-300">
        {Object.keys(files).length == 0 ? (
          <div className="flex flex-col justify-center items-center h-full">
            <span className="block text-gray-400 font-normal cursor-default">
              Drop your images here
            </span>
            <span className="block text-gray-400 font-normal cursor-default ">
              or
            </span>
            <label
              className="block text-blue-400 font-normal cursor-pointer"
              onClick={handleUploadClick}
            >
              Browse images
            </label>
          </div>
        ) : (
          <>
            <FilePreviewContainer
              files={files}
              setFiles={setFiles}
              handleUploadClick={handleUploadClick}
              removeFile={removeFile}
            />
          </>
        )}
        <input
          ref={fileInput}
          type="file"
          onChange={handleUpload}
          accept="image/*"
          title=""
          className="hidden"
          multiple
        />
      </div>
    </DragAndDrop>
  );
};

export default FileUpload;
