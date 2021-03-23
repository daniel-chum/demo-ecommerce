import ProductGrid from "../components/common/ProductGrid/ProductGrid";
import ProductForm from "../components/product/ProductForm/ProductForm";
import { getListing, addListing, deleteListing } from "../api/listing";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../lib/hooks/auth";
import { Modal } from "../components/ui";

export default function Listing() {
  const [listings, setListings] = useState([]);
  const [displayAddProduct, setDisplayAddProduct] = useState(false);
  const router = useRouter();
  const { getToken, isAuthenticated } = useAuth();

  useEffect(() => {
    const getUserListing = async () => {
      try {
        const response = await getListing(getToken);
        const productArray = response.data;
        setListings(productArray);
      } catch (e) {
        console.log(e);
        console.log("User must be logged in to view listing page.");
      }
    };

    if (!isAuthenticated) {
      router.push("/");
      return;
    }
    getUserListing();
  }, []);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddButton = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (title != "" && price != "") {
      formData.append("title", title);
      formData.append("price", price);

      if (image != null) {
        formData.append("image", image);
      }
      try {
        const res = await addListing(getToken, formData);
        setListings((prevListings) => [...prevListings, res.data]);
        setTitle("");
        setPrice("");
      } catch (e) {
        console.log(e);
        setTitle("");
        setPrice("");
      }
    } else {
      console.log("Title and price must not be blank for listing creation!");
    }
  };

  const handleDeleteButton = async (productId) => {
    try {
      const res = await deleteListing(getToken, productId);
      setListings(listings.filter((product) => product.id !== productId));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h2>Listings</h2>
      <button
        className="flex items-center justify-evenly w-28 h-12 rounded
         bg-red-500 hover:bg-red-700 transition duration-300 ease-in-out 
         font-medium text-white focus:outline-none"
        onClick={() =>
          setDisplayAddProduct((displayAddProduct) => !displayAddProduct)
        }
      >
        Add Product
      </button>
      <Modal
        open={displayAddProduct}
        onClose={() =>
          setDisplayAddProduct((displayAddProduct) => !displayAddProduct)
        }
      >
        <ProductForm
          title={title}
          price={price}
          onSubmit={handleAddButton}
          setTitle={setTitle}
          setPrice={setPrice}
          setImage={handleUpload}
        />
      </Modal>
      <ProductGrid
        productList={listings}
        handleDeleteButton={handleDeleteButton}
      />
    </>
  );
}
