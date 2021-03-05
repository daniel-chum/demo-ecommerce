import HomePageProductGrid from "../components/common/HomePageProductGrid/HomePageProductGrid";
import ProductForm from "../components/product/ProductForm/ProductForm";
import { getListing, addListing } from "../api/listing";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../lib/hooks/auth";

export default function Listing() {
  const [listings, setListings] = useState([]);
  const router = useRouter();
  const { getToken, isAuthenticated } = useAuth();

  useEffect(() => {
    const getUserListing = async () => {
      try {
        const response = await getListing(getToken);
        const productArray = response.data;
        console.log(productArray);
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
    console.log(e.target.files);
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
        console.log(res.data);
        setListings([...listings, res.data]);
        setTitle("");
        setPrice("");
        console.log(listings);
      } catch (e) {
        console.log(e);
        setTitle("");
        setPrice(0);
      }
    } else {
      console.log("Title and price must not be blank for listing creation!");
    }
  };

  return (
    <>
      <h2>Product Page</h2>
      <ProductForm
        title={title}
        price={price}
        onSubmit={handleAddButton}
        setTitle={setTitle}
        setPrice={setPrice}
        setImage={handleUpload}
      />
      <HomePageProductGrid productList={listings} />
    </>
  );
}
