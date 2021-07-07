import Image from "next/image";


const FilePreview = ({ imageURL, name, ...props }) => {
  return (
    <div className="flex-none relative w-24 h-32 border border-gray-300" onClick={props.onClick}>
      <img
        src={imageURL}
        className="absolute w-full h-full object-scale-down	"
      />
      {/* <Image
        quality="85"
        src={imageURL}
        alt={imageURL}
        width={140}
        height={100}
      /> */}
      <div className={props.className}>
        {props.children}
      </div>
    </div>
  );
};

export default FilePreview;
