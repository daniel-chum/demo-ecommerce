import { Input } from "../../ui";
import FileUpload from "./FileUpload";

const ListingForm = ({
  onSubmit,
  setTitle,
  setPrice,
  setImages,
  title,
  price,
  images,
  message
}) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col space-y-2 z-40 font-rubik">
        {message && (
          <div className="text-black font-rubik border border-primary p-3">{message}</div>
        )}
      <Input type="text" onChange={setTitle} value={title} label="TITLE" />
      <Input
        type="number"
        className="pt-2"
        min="0"
        step="0.01"
        onChange={setPrice}
        value={price}
        label="PRICE"
        prefix='$'
      />
      <span className="text-secondary-bright pt-4 pl-1">IMAGE</span>
      <FileUpload files={images} setFiles={setImages}></FileUpload>
      <div className="ml-auto pt-8 pr-3">
        <button
          className="w-36 h-12 rounded bg-primary font-semibold text-secondary focus:outline-none"
          type="submit"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default ListingForm;
