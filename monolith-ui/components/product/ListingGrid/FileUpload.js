import {  useRef } from "react";
import FilePreviewContainer from "../../ui/FilePreview/FilePreviewContainer";
import DragAndDrop from "../../ui/DragAndDrop/DragAndDrop";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

const FileUpload = ( { files, setFiles } ) => {

  const fileInput = useRef();

  const handleUploadClick = () => {
    fileInput.current.click();
  };

  const removeFile = (file) => {
    URL.revokeObjectURL(file.preview)

    setFiles((prevState) => {
      const newState = [ ...prevState ];
      newState.splice(newState.indexOf(file), 1);
      return newState;
    });
  };

  const deleteAllFIles = () => {
    files.forEach(image => {
        URL.revokeObjectURL(image.preview);
      });
    setFiles([]);
  };

  const handleUpload = (e) => {
    const { files } = e.target;

    addNewFiles(files)
  }

  const addNewFiles = (files) => {
    const filesToUpload = [...files].map(file => {
      return {
        file: file,
        preview: URL.createObjectURL(file)
      }
    })

    setFiles((prevState) => {
      const newState = [...prevState];
      newState.push(...filesToUpload);
      return newState;
    })
  }

  return (
    <DragAndDrop handleDrop={addNewFiles}>
      <div className="h-44 3xl:h-52 px-4 rounded-lg border-dashed border-2 border-gray-300">
        {files.length == 0 ? (
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
            <div className='pt-4 mx-1.5' >
              <FilePreviewContainer showArrow={true} scrollBar={true}>
                {files.map((file) => {
                  let imageLink = file.preview;

                  return (
                    <div key={imageLink}>
                      <img
                        src={imageLink}
                        className="absolute w-full h-full object-scale-down	"
                      />
                      <div className='absolute w-full h-full opacity-0 hover:opacity-80 hover:bg-gray-200'>
                        <span className="block break-all text-gray-900 text-xs px-2 pt-4">
                          {file.file.name}
                        </span>
                        <div className=" absolute bottom-2 right-2" onClick={() => removeFile(file)}>
                          <FontAwesomeIcon icon={faTrash} className='h-4 text-gray-600 cursor-pointer' />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </FilePreviewContainer>
            </div>
            <label
              className="absolute left-1/2 transform -translate-x-1/2 transform bottom-2 cursor-pointer"
              onClick={handleUploadClick}
            >
              <FontAwesomeIcon icon={faPlusCircle} className='h-4 text-white  bg-secondary border-secondary rounded-full border cursor-pointer' />
            </label>
            <i
              className="absolute bottom-2 right-3 text-gray-600 cursor-pointer text-xs"
              onClick={deleteAllFIles}
            >
              Reset
            </i>
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
