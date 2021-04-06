import { Button, Input } from "../..//ui";

const ProductForm = ({
  onSubmit,
  setTitle,
  setPrice,
  setImage,
  title,
  price,
}) => {
  return (
    // <form onSubmit={onSubmit} className="flex flex-col space-y-2">
    //   <span className="text-accents-2">Product Details</span>
    //   <Input type="text" onChange={setTitle} value={title} label="TITLE" />
    //   <Input
    //     type="number"
    //     className="pt-8"
    //     min="0"
    //     step="0.01"
    //     onChange={setPrice}
    //     value={price}
    //     label="PRICE"
    //   />
    //   <input type="file" onChange={setImage} />
    //   <button
    //     className="flex items-center justify-evenly w-28 h-12 rounded
    //      bg-primary hover:bg-primary-bright transition duration-300 ease-in-out
    //      font-medium text-white focus:outline-none"
    //     type="submit"
    //   >
    //     Create
    //   </button>
    // </form>

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
      <div className="h-40 rounded-lg border-dashed border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer">
        <div className="absolute">
          <div className="flex flex-col items-center ">
            <span className="block text-gray-400 font-normal">
              Attach you files here
            </span>
            <span className="block text-gray-400 font-normal">or</span>
            <button className="block text-blue-400 font-normal">
              Browse files
            </button>
          </div>
        </div>
        <input
          type="file"
          className="h-full w-full hidden"
          onChange={setImage}
          accept="image/*"
          // className="text-primary"
        />
      </div>
      <button
        className="flex items-center justify-evenly w-28 h-12 rounded
         bg-primary hover:bg-primary-bright transition duration-300 ease-in-out
         font-medium text-white focus:outline-none"
        type="submit"
      >
        Create
      </button>
    </form>
  );
};

export default ProductForm;
