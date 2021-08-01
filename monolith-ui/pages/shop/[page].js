import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { MultiRangeSlider, Pagination } from '../../components/ui'
import { getProductList } from "../../api/products";
import CardGrid from "../../components/product/Card/CardGrid";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faList } from '@fortawesome/free-solid-svg-icons'

export default function Shop() {

    const router = useRouter();
    const { page } = router.query

    const [products, setProducts] = useState(null)

    const [minVal, setMinVal] = useState(0);
    const [maxVal, setMaxVal] = useState(9999);

    useEffect(() => {

        console.log('will run')
        if (!router.isReady) return;
        getProduct(page);

    }, [router.isReady, page]);

    const getProduct = async (page) => {
        try {
        const response = await getProductList(page);
        const productArray = response.data;

        console.log(productArray)
        setProducts(productArray)

        } catch (e) {
            console.log(e);
        }
    };

    const getValues = ( minRangeVal, maxRangeVal ) => {
        setMinVal(minRangeVal);
        setMaxVal(maxRangeVal);
    }

    const CATEGORIES = ['Automotive', 'Baby & Toys', 'Computer Accessories', 'Fashion', 'Groceries & Pets', 'Health & Beauty']
    const BRANDS = ['Alienware', 'Chum', 'Nestle', 'Nike', 'Ordinary', 'Vinda']

    return (
        <div className='font-rubik text-font-gray'>
        <div className='mx-auto py-10 flex-grow-0 flex flex-wrap-reverse justify-center gap-x-10' style={{ width: '80%' }}>
            <section className='flex flex-col border border-gray-300' >
            <form className='flex flex-col justify-center p-4 h-44 border-b bg-gray-50'>
                <span className='mb-4 font-semibold'>FILTER BY PRICE</span>
                <MultiRangeSlider
                    min={0}
                    max={9999}
                    getValues={getValues}
                />
                <div className='flex flex-wrap items-center justify-between text-ba mt-7'>
                <p className='space-x-1.5'>
                    <span>Price:</span>
                    <span className='font-medium'>${minVal}</span>
                    <span>-</span>
                    <span className='font-medium'>${maxVal}</span>
                </p>
                <button
                    className='bg-secondary h-10 border border-white rounded-xl ml-3 px-6 text-primary text-sm font-medium focus:outline-none'
                    type='button'
                >
                    FILTER
                </button>
                </div>
            </form>
            <div className='pl-4 pt-10'>
                <h3 className='font-medium pb-7'>CATEGORY</h3>
                <ul className='space-y-4'>
                {CATEGORIES.map(category => (
                    <li key={category} className='text-secondary font-light'>
                    <input type='checkbox'/>
                        <span className='pl-2'>{category}</span>
                    </li>
                ))}
                </ul>
            </div>
            <div className='pl-4 pt-10'>
                <h3 className='font-medium pb-7'>BRAND</h3>
                <ul className='space-y-4'>
                {BRANDS.map(brand => (
                    <li key={brand} className='text-secondary font-light'>
                    <input type='checkbox'/>
                        <span className='pl-2'>{brand}</span>
                    </li>
                ))}
                </ul>
            </div>
            </section>
            <section className='flex-grow'>
            <div className='flex flex-wrap justify-between px-6 py-5 border border-gray-300' >
                <div className='flex items-center gap-x-3'>
                <FontAwesomeIcon icon={faTh} className='h-4 text-gray-600 cursor-pointer' />
                <FontAwesomeIcon icon={faList} className='h-4 text-gray-600 cursor-pointer' />
                <p className='mx-10 font-light text-base'>
                    {`Showing ${ (page-1) * products?.page_size + 1 }-${ (page-1) * products?.page_size + products?.results.length } of ${products?.count} results`}
                </p>
                </div>
                <div>
                <label className='mr-3'>Sort by</label>
                <select className='border border-gray-200 font-light focus:outline-none'>
                    <option value='default'>Default sorting</option>
                    <option value="popularity">Sort by popularity</option>
                    <option value="rating">Sort by average rating</option>
                </select>
                </div>
            </div>
            <CardGrid style={{ paddingTop: '2.5rem' }} products={products?.results} />
            <div className='flex flex-wrap justify-center items-center gap-x-4 mt-10 px-6 py-5 border border-gray-300' >
                <Pagination page={page} next={products?.next} previous={products?.previous} count={products?.count} display={products?.display} />
            </div>
            </section>
        </div>
        </div>
    );
}
