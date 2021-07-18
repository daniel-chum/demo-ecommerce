import Image from 'next/image'
import { Carousel } from '../ui'

const Slider = ({
    ...props
}) => {
    return(
        <Carousel>
            <li className='bg-primary'>
                <div className='w-4/5 h-full mx-auto flex justify-center items-center'>
                    <section className='relative pl-20 flex flex-col h-full items-start justify-center'>
                        <h1 className='text-dark text-6xl tracking-tighter italic font-extrabold font-open-sans'>TAKE FLIGHT</h1>
                        <p className='text-dark font-normal font-open-sans' >
                            BIG SALE UP TO 20% OFF
                        </p>
                    </section>
                    <div className='h-full flex justify-center items-center'>
                        <Image
                            quality="100"
                            src='/lebron-12.png'
                            alt='Sneaker Banner'
                            width= '500'
                            height='250'
                        />
                    </div>
                </div>
            </li>
            <li className='bg-primary'>
                <div className='absolute h-full right-7 top-7'>
                <Image
                    quality="100"
                    src='/lebron-12.png'
                    alt='Sneaker Banner'
                    width= '500'
                    height='250'
                />
                </div>
                <section className='relative flex flex-col h-full px-4 items-start justify-center'>
                    <h1 className='text-black'>Welcome to my demo project</h1>
                    <p className=' w-1/2 text-center text-black'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nulla ligula, tempor in elementum eu, hendrerit quis sem.
                        Maecenas ultricies non enim sit amet vehicula. Sed euismod gravida varius. Nunc eget ex a neque elementum ultrices.
                    </p>
                </section>
            </li>
            <li>
                <div className='relative h-full'>
                <section className='relative flex flex-col h-full px-4 items-end justify-center'>
                    <h1>Slide 3 Heading</h1>
                    <p className='text-center'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nulla ligula, tempor in elementum eu, hendrerit quis sem.
                    Maecenas ultricies non enim sit amet vehicula. Sed euismod gravida varius. Nunc eget ex a neque elementum ultrices.
                    Nam id nulla sed ligula malesuada convallis. Morbi et faucibus justo, vitae consequat urna.
                    </p>
                </section>
                </div>
            </li>
        </Carousel>
    )
}

export default Slider