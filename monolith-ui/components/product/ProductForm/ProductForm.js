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
    <form onSubmit={onSubmit} className="w-80 flex flex-col space-y-2">
      <span className="text-black">Add Product</span>
      <Input
        type="text"
        placeholder="Title"
        onChange={setTitle}
        value={title}
      />
      <Input
        type="number"
        placeholder="Price"
        onChange={setPrice}
        value={price}
      />
      <input type="file" onChange={setImage} />
      <Button variant="slim" type="submit">
        Create
      </Button>
    </form>
  );
};

export default ProductForm;
