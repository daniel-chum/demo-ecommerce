import { TrashBin } from "../../icons/";
import s from "./FilePreview.module.css";

const FilePreview = ({ imageURL, name, ...props }) => {
  return (
    <div className="relative w-28 h-28 border border-gray-300 container">
      <img
        src={imageURL}
        className="absolute w-full h-full object-scale-down	"
      />
      <div className="absolute w-full h-full middle opacity-0 hover:opacity-80 hover:bg-gray-200">
        <span className="block break-all text-gray-900 text-xs px-2 pt-4">
          {name}
        </span>
        <TrashBin
          width="16"
          height="16"
          className=" absolute bottom-1 right-1"
          {...props}
        />
      </div>
    </div>
  );
};

export default FilePreview;
