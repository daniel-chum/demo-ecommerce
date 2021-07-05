import ProductGrid from "../components/product/ProductForm/ProductGrid/ProductGrid";
import ProductForm from "../components/product/ProductForm/ProductForm";
import { getListing, addListing, deleteListing } from "../api/listing";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../lib/hooks/auth";
import { Modal } from "../components/ui";

export default function Listing() {
  const [listings, setListings] = useState([]);
  const [displayProductForm, setdisplayProductForm] = useState(false);
  const router = useRouter();
  const { getToken, isAuthenticated } = useAuth();

  // Upload fields
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState([]);

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



  const handleCreateButton = async (e) => {
    e.preventDefault();
    console.log(image);

    const formData = new FormData();

    if (title != "" && price != "") {
      formData.append("title", title);
      formData.append("price", price);

      if (image != null) {
        for (let i = 0; i < image.length; i++) {
          let imageField = `images[${i}]image`
          formData.append(imageField, image[i], image[i].name);
        }
        // formData.append("image", image);
      }
      try {
        const res = await addListing(getToken, formData);
        setListings((prevListings) => [...prevListings, res.data]);
        e.target.reset();
        setTitle("");
        setPrice("");
        setImage([]);
      } catch (e) {
        console.log(e);
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
          setdisplayProductForm((displayProductForm) => !displayProductForm)
        }
      >
        Add Product
      </button>
      <Modal
        open={displayProductForm}
        onClose={() =>
          setdisplayProductForm((displayProductForm) => !displayProductForm)
        }
        width="w-5/12"
        height="h-auto"
      >
        <ProductForm
          title={title}
          price={price}
          onSubmit={handleCreateButton}
          setTitle={setTitle}
          setPrice={setPrice}
          setImage={setImage}
        />
      </Modal>
      <ProductGrid
        productList={listings}
        handleDeleteButton={handleDeleteButton}
      />
    </>
  );
}
