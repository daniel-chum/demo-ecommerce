import ListingGrid from "../components/product/ListingGrid/ListingGrid";
import ListingForm from "../components/product/ListingGrid/ListingForm";
import { getListing, addListing, deleteListing } from "../api/listing";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../lib/hooks/auth";
import { Modal, PopUp } from "../components/ui";

export default function Listing() {
  const [listings, setListings] = useState([]);
  const [displayListingForm, setdisplayListingForm] = useState(false);
  const router = useRouter();
  const { getToken, isAuthenticated } = useAuth();

  // Upload fields
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState("0.00");
  const [images, setImages] = useState([]);

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false)
  const [itemCreatedAnimation, setItemCreatedAnimation] = useState(false);
  const [itemDeletedAnimation, setItemDeletedAnimation] = useState(false);

  useEffect(() => {
    const getUserListing = async () => {
      try {
        const response = await getListing(getToken);
        const productArray = response.data;
        setListings(productArray);
      } catch (e) {
        router.push("/");
        console.log(e);
      }
    };

    getUserListing();
  }, []);

  const handleCreateButton = async (e) => {
    e.preventDefault();

    console.log('in create button')
    setLoading(true)
    const formData = new FormData();

    if (title != "" && price != "") {
      formData.append("title", title);
      formData.append("price", price);

      if (images != null) {
        for (let i = 0; i < images.length; i++) {
          let imageField = `images[${i}]image`
          formData.append(imageField, images[i].file, images[i].file.name);
        }
      }

      try {
        const res = await addListing(getToken, formData);

        setListings((prevListings) => [...prevListings, res.data]);

        setItemCreatedAnimation(true);

        setTitle("");
        setPrice("");
        setImages([]);
        setMessage("");

      } catch (errors) {
        let errorMessage = JSON.stringify(errors.response.data).replace(/[\[{"}\]]/g,"").replace(":", ": ")
        setMessage(errorMessage)
      } finally { setLoading(false) }

    } else {
      setMessage("All fields must be filled for listing creation!");
      setLoading(false)
    }
  };

  const handleDeleteButton = async (productId) => {
    setLoading(true)
    try {
      await deleteListing(getToken, productId);
      setListings(listings.filter((product) => product.id !== productId));
      setItemDeletedAnimation(true);
    } catch (e) {
      console.log(e);
    } finally { setLoading(false) }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setItemCreatedAnimation(false);
    }, 2500);

    return () => clearTimeout(timeout);
  }, [itemCreatedAnimation]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setItemDeletedAnimation(false);
    }, 2500);

    return () => clearTimeout(timeout);
  }, [itemDeletedAnimation]);

  return (
    <div className='pt-10 px-56 3xl:px-96 bg-background pb-28' style={{ minHeight: '80vh' }}>
      {isAuthenticated && (
        <>
          <label className='flex items-center'>
            <h2 className='font-rubik font-bold text-2xl'>Listings</h2>
            <button
              className="ml-10 w-36 h-12 rounded bg-primary font-semibold font-rubik text-secondary focus:outline-none"
              onClick={() =>
                setdisplayListingForm((displayListingForm) => !displayListingForm)
              }
            >
              Add Listing
            </button>
          </label>
          <Modal
            open={displayListingForm}
            onClose={() => {
                setdisplayListingForm((displayListingForm) => !displayListingForm)
              }
            }
            width="w-5/12"
            height="h-auto"
          >
            <ListingForm
              title={title}
              price={price}
              images={images}
              message={message}
              onSubmit={handleCreateButton}
              setTitle={setTitle}
              setPrice={setPrice}
              setImages={setImages}
            />
            <PopUp display={itemCreatedAnimation}>Item created!</PopUp>
            <PopUp display={loading} loader={true}>
              <span className='animate-pulse'>LOADING ...</span>
            </PopUp>
          </Modal>
          <ListingGrid
            className='w-full mt-10'
            productList={listings}
            handleDeleteButton={handleDeleteButton}
          />
          <PopUp display={itemDeletedAnimation}>Item deleleted!</PopUp>
          <PopUp display={loading} loader={true}>
            <span className='animate-pulse'>LOADING ...</span>
          </PopUp>
        </>
      )}
    </div>
  );
}
