import { Carousel } from '../ui'

const Slider = ({
    ...props
}) => {
    return(
        <Carousel style={{ height: 'max(650px, 78vh)' }}>
            <li className='z-50'>
                <div
                    className='absolute z-50 pl-52 transform translate-y-1/3 flex flex-col h-full
                                font-rubik text-secondary'>
                    <h1 className='text-7xl 3xl:text-8xl tracking-tighter italic font-extrabold'>TAKE FLIGHT</h1>
                    <p className='mt-10 text-2xl font-normal' >
                        BIG SALE UP TO 60% OFF
                    </p>
                    <button
                        className='w-max mt-10 px-16 py-3 border-2 text-xl font-bold border-secondary rounded-lg  text-secondary'
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
                    className='absolute z-50 pl-60 pt-32 flex flex-col h-full
                                font-chicle text-green-600'>
                    <h1 className=' w-1/3  text-7xl 3xl:text-8xl tracking-wide'>Super GROCERY FAIR</h1>
                    <p className='mt-10 text-2xl font-normal' >
                        LIGHT UP YOUR LIFE WITH SAVINGS
                    </p>
                    <button
                        className='w-max mt-10 px-16 py-3 border-2 text-xl font-bold font-rubik border-green-400 rounded-lg text-green-400'
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
                    className='absolute z-50 pl-72 pt-32 flex flex-col h-full
                               font-oswald text-secondary-bright'>
                    <h1 className=' w-1/3  text-7xl 3xl:text-8xl font-bold '>Modern Comfort Series</h1>
                    <p className='mt-10 text-2xl font-normal font-rubik tracking-tight' >
                        Free shipping worldwide
                    </p>
                    <button
                        className='w-max mt-10 px-16 py-3 border-2 text-xl font-medium bg-secondary-bright rounded-lg text-white'
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