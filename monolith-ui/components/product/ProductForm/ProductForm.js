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
    <form
      onSubmit={onSubmit}
      className="w-80 flex flex-col justify-between p-3"
    >
      <div className="flex justify-center pb-12 ">Add Product</div>
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
        Submit
      </Button>
    </form>
  );
};

export default ProductForm;
