import { Carousel } from '../ui'

const Slider = ({
    ...props
}) => {
    return(
        <Carousel  className='h-44 md:h-80 lg:h-96 xl:h-80vh' >
            <li className='z-50'>
                <div
                    className='absolute z-50 pl-12 sm:pl-32 lg:pl-40 xl:pl-52 transform translate-y-1/3 flex flex-col h-full
                                font-rubik text-secondary'>
                    <h1 className='text-xl md:text-3xl lg:text-5xl 2xl:text-8xl tracking-tighter italic font-extrabold'>TAKE FLIGHT</h1>
                    <p className='md:mt-2 3xl:mt-10 text-xs md:text-xl 3xl:text-2xl font-normal' >
                        BIG SALE UP TO 60% OFF
                    </p>
                    <button
                        className='mt-2 3xl:mt-10 w-20 lg:w-32 md:h-10 lg:h-16 border md:border-2 text-xs md:text-sm lg:text-xl font-bold border-secondary rounded-lg  text-secondary'
                        type='button'
                        >
                            Shop now
                    </button>
                </div>
                <img
                    src='/lebron-soldiers.png'
                    alt='Sneaker Banner'
                    className='object-cover w-full h-full'
                />
            </li>
            <li className='z-50'>
                <div
                    className='absolute z-50 pl-10 sm:pl-24 lg:pl-40 xl:pl-52 pt-10 md:pt-28 xl:pt-60 flex flex-col h-full
                                font-chicle text-green-600'>
                    <h1 className='text-lg md:text-3xl lg:text-4xl xl:text-6xl 3xl:text-7xl tracking-wide'>Super GROCERY FAIR</h1>
                    <p className='md:mt-2 3xl:mt-10 text-xs md:text-xl xl:text-2xl font-normal' >
                        LIGHT UP YOUR LIFE WITH SAVINGS
                    </p>
                    <button
                        className='mt-2 3xl:mt-10 w-20 lg:w-32 md:h-10 lg:h-16 border md:border-2 text-xs md:text-sm lg:text-xl font-bold font-rubik border-green-400 rounded-lg text-green-400'
                        type='button'
                        >
                            Shop now
                    </button>
                </div>
                <img
                    src='/groceries-banner.png'
                    alt='Groceries Banner'
                    className='object-cover w-full h-full'
                />

            </li>
            <li className='z-50'>
                <div
                    className='absolute z-50 pt-10 md:pt-28 3xl:pt-40 pl-12 md:pl-28 lg:pl-40 xl:pl-52 2xl:pl-72 xl:w-1/3 flex flex-col h-full
                               font-oswald text-secondary-bright'>
                    <h1 className='text-lg md:text-3xl lg:text-4xl xl:text-8xl font-bold '>Modern Comfort Series</h1>
                    <p className='mt-2 3xl:mt-10 text-xs md:text-xl xl:text-2xl font-normal font-rubik tracking-tight' >
                        Free shipping worldwide
                    </p>
                    <button
                        className='mt-2 3xl:mt-10 w-24 lg:w-32 h-6 md:h-10 lg:h-14 border md:border-2 text-xs md:text-lg lg:text-xl font-medium bg-secondary-bright rounded-lg text-white'
                        type='button'
                        >
                            Shop now
                    </button>
                </div>
                    <img
                        src='/furniture.png'
                        alt='Groceries Banner'
                        className='object-cover w-full h-full'
                    />
            </li>
        </Carousel>
    )
}

export default Slider