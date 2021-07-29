import { useState, useEffect } from 'react'

const CheckOut = ({ cartList, className }) => {

    const [subTotal, setSubTotal] = useState(0)
    const [shippingFee, setShippingFee] = useState(5)

    useEffect(() => {

        if (cartList.length === 0) {
            setShippingFee(0)
            return
        }

        const subTotal = cartList.reduce((accumulator, currentValue) => {
            return accumulator + (parseFloat(currentValue.product.price) * currentValue.quantity)
        }, 0)

        setSubTotal(subTotal)
        setShippingFee(5)

    }, [cartList])

    return (
        <section className={`${className} flex flex-col border-2 pb-6`}>
            <span className=' border-b-2 pt-3 h-12 font-rubik font-semibold'>CART TOTALS</span>
            <div className='pt-4 flex justify-between'>
                <span className='font-rubik'>SUBTOTAL</span>
                <span className='font-rubik'>${subTotal.toFixed(2)}</span>
            </div>
            <div className='pt-4 pb-4 flex justify-between'>
                <span className='font-rubik'>SHIPPING</span>
                <span className='font-rubik'>${shippingFee.toFixed(2)}</span>
            </div>
            <div className='pt-4 pb-1 flex justify-between'>
                <span className='font-rubik'>PROMO CODE</span>
                <span className='font-rubik text-red-400'>-$0.00</span>
            </div>
            <input
                className='border rounded-sm w-2/5 font-rubik font-light pl-2 mb-3 text-sm focus:outline-none'
                type="text"
                placeholder='Enter code'
            />
            <div className='pt-4 pb-4 border-t flex justify-between'>
                <span className='font-rubik'>TOTAL</span>
                <span className='font-rubik text-primary'>${(subTotal + shippingFee).toFixed(2)}</span>
            </div>
            <button
                className='bg-primary rounded-md h-12 font-rubik font-semibold text-secondary focus:outline-none'
            >
            CHECKOUT
            </button>
        </section>
    )
};

export default CheckOut;
