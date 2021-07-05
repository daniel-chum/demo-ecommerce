import { FileUpload, Input } from "../../ui";

const ProductForm = ({
  onSubmit,
  setTitle,
  setPrice,
  setImage,
  title,
  price,
}) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col space-y-2">
      <span className="text-accents-2">Product Details</span>
      <Input type="text" onChange={setTitle} value={title} label="TITLE" />
      <Input
        type="number"
        className="pt-8"
        min="0"
        step="0.01"
        onChange={setPrice}
        value={price}
        label="PRICE"
      />
      <span className="text-accents-2 text-xs">IMAGE</span>
      <FileUpload setImage={setImage}></FileUpload>
      <div className="ml-auto pt-2 pr-3">
        <button
          className="w-28 h-12 rounded
         bg-primary hover:bg-primary-bright transition duration-300 ease-in-out
         font-medium text-white focus:outline-none"
          type="submit"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
