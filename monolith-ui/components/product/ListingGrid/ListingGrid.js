import Image from "next/image";
import FilePreviewContainer from "../../ui/FilePreview/FilePreviewContainer";
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
    <table className={`${className}`}>
      <thead
        className='grid w-full justify-items-center items-center'
        style={{
          gridTemplateColumns: '8% 10% 15% 50% 10% 7%'
        }}>
        <tr className="contents">
          {HEADER.map((header, index) => {
            let firstElement = index == 0 ? 'justify-self-start' : null
            return (
              <th key={index} className={firstElement}>
                {header}
              </th>
            )
          }
          )}
        </tr>
      </thead>
      <tbody>
      {productList.map((product) => (
        <tr key={product.id} className="flex justify-center items-center border-b py-4">
          <td style={{ width: '8%' }}>
            {product.id}
          </td>
          <td style={{ width: '8%' }}>
            {convertDate(product.created)}
          </td>
          <td style={{ width: '15%', aspectRatio: '1/1' }}>
            <Carousel style={{ height: '100%' }} arrowsOnHover={true}>
              {product['images'].map((image, index) => {
                let link = image.image
                return (
                  <div className='flex-none bg-gray-100 ' style={{ aspectRatio: '1/1' }}>
                    <Image
                      quality="100"
                      src={link || placeholderImg}
                      alt={product.title || "Listing Image"}
                      layout='fill'
                      objectFit='contain'
                    />
                  </div>
                )
              })}
            </Carousel>
          </td>
          <td className="text-center font-rubik font-light px-6" style={{ width: '50%' }}>{product.title}</td>
          <td className="text-center font-rubik font-light" style={{ width: '10%' }}>${product.price}</td>
          <td className="flex justify-center items-center" style={{ width: '7%' }}>
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
