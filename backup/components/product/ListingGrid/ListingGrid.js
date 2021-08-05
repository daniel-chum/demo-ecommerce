import Link from 'next/link';
import Carousel from "../../ui/Carousel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'

const ListingGrid = ({ productList, handleDeleteButton, className }) => {

  const placeholderImg = "/product-img-placeholder.svg";

  const HEADER = ['ID', 'Created', 'Image', 'Name', 'Price', '']

  //Convert iso date to local date
  const convertDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {  year: 'numeric', month: 'long', day: 'numeric' });
  }

  return (
    <table className={`${className} font-rubik`}>
      <thead
        className='grid w-full justify-items-center items-center'
        style={{
          gridTemplateColumns: '8% 18% 8% 40% 15% 10%'
        }}>
        <tr className="contents">
          {HEADER.map((header, index) => {
            let firstElement = index == 0 ? 'justify-self-start' : null
            return (
              <th key={index}>
                {header}
              </th>
            )
          }
          )}
        </tr>
      </thead>
      <tbody>
      {productList.map((product) => (
        <tr key={product.id} className="flex justify-center items-center bg-white border my-2">
          <td className='text-center' style={{ width: '8%' }}>
            <Link href={`/product/${product.id}`}>
              <a>
                <u className='text-primary font-semibold '>{product.id}</u>
              </a>
            </Link>
          </td>
          <td className='text-center' style={{ width: '18%' }}>
            <span className=' font-light'>{convertDate(product.created)}</span>
          </td>
          <td className='flex justify-center items-center' style={{ width: '8%', height:'calc(40px + 6vh)'}}>
            <div className='h-5/6' style={{ aspectRatio: "1/1" }}>
              <Carousel style={{ height: '100%' }} arrowsOnHover={true} dotSize='h-1.5 w-1.5' dotGap='space-x-1'>
                {product['images'].map((image, index) => {
                  let link = image.image
                  return (
                    <div key={index} className='flex-none bg-gray-100'>
                      <img
                        src={link || placeholderImg}
                        alt={product.title || "Listing Image"}
                        className='object-contain'
                      />
                    </div>
                  )
                }
                )}
              </Carousel>
            </div>
          </td>
          <td className="text-center  px-6" style={{ width: '40%' }}>{product.title}</td>
          <td className="text-center  font-light" style={{ width: '15%' }}>${product.price}</td>
          <td className="flex justify-center items-center" style={{ width: '10%' }}>
            <button
              className="h-5 w-5 flex justify-center items-center focus:outline-none"
              productid={product.id}
              onClick={() => handleDeleteButton(product.id)}
              type="button"
            >
              <FontAwesomeIcon icon={faTimesCircle} className='h-4 text-gray-600 cursor-pointer' />
            </button>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
};

export default ListingGrid;
