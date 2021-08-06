import React from 'react'
import Marquee from "react-fast-marquee";
import { useUI } from "../components/ui/context"

export default function About() {
    const { openModal } = useUI();

    const ICONS = [
        '/django.png',
        '/nextjs.png',
        '/nodejs.png',
        '/tailwind.png',
        '/github.png',
        '/docker.png',
        '/digitalocean.png'
    ]

    return (
        <div className='font-rubik'>
            <section
            className='flex items-center bg-background-2'
            style={{ height: '70vh', clipPath: 'ellipse(80% 70% at 50% 30%)' }}
            >
                <img
                    src='/global.jpg'
                    alt="Listing Image"
                    className='absolute opacity-20 object-cover'
                />
                <div className='pt w-1/3 mx-auto pb-4 text-center font-rubik font-medium text-white text-6xl '>
                    <h1>Welcome to the leading platform in digital commerce.</h1>
                    <span className='text-xl font-light'>We serve millions across the world.</span>
                </div>
            </section>
            <section className='py-10'>
                <p className='pt-12 w-1/3 mx-auto pb-4 text-center font-rubik font-medium text-primary text-5xl '>
                    <span>Try out this demo website.</span>
                    <br />
                    <br />
                    <span className='block text-xl font-light text-font-gray'>
                        This website simulates the entirety of an e-commerce platform. You can register and sign in as a user, where you can list products or add products to your cart.
                    </span>
                </p>
                <span className='block w-max mx-auto px-8 py-3 mt-20 bg-primary-bright text-sm font-light leading-none'>
                    {'Interested in finding out more? '}
                    <button
                        className='text-primary font-medium focus:outline-none'
                        onClick={() => openModal()}
                    >
                     Register now
                    </button>
                </span>
            </section>
            <section className='py-10 w-8/12  mx-auto flex flex-wrap justify-center gap-x-20'>
                <div className='relative' style={{ width: 'calc(10rem + 20%)', height: 'calc(10rem + 25vh)'}}>
                    <img
                        src='/shopping.png'
                        alt="Shopping isometric"
                        className='object-fill'
                    />
                </div>
                <div className='flex flex-col justify-center' style={{ width: 'calc(10rem + 20%)', height: 'calc(10rem + 25vh)' }}>
                    <h2 className='font-medium text-primary text-4xl pt-8'>Purchase instantly, anywhere.</h2>
                    <p className='font-light text-lg text-font-gray pt-4'>Those options are already baked in with this model shoot me an email clear blue water but we need distributors to evangelize the new line to local markets, but fire up your browser. Strategic high-level 30,000 ft view.</p>
                </div>
            </section>
            <section className='py-10 w-8/12  mx-auto flex flex-wrap justify-center space-x-20'>
                <div className='flex flex-col justify-center' style={{ width: 'calc(10rem + 20%)', height: 'calc(10rem + 25vh)' }}>
                    <h2 className='font-medium text-primary text-4xl pt-8'>Set up shop with minimal configuration.</h2>
                    <p className='font-light text-lg text-font-gray pt-4'>Lorem ipsum dolor amet mustache knausgaard +1, blue bottle waistcoat tbh semiotics artisan synth stumptown gastropub cornhole celiac swag. Brunch raclette vexillologist post-ironic glossier ennui XOXO. </p>
                </div>
                <div className='relative ' style={{ width: 'calc(10rem + 20%)', height: 'calc(10rem + 25vh)' }}>
                    <img
                        quality="100"
                        src='/business.png'
                        alt="Business isometric"
                        className='object-fill'
                    />
                </div>
            </section>
            <section className='pt-20 mt-16 bg-primary-bright '>
                <p className='pt-10 w-1/3 mx-auto pb-4 text-center font-rubik font-medium text-primary text-5xl '>
                    <span>Running on solid foundations.</span>
                    <br />
                    <span className='block mt-8 text-xl font-light text-font-gray'>"This is a really good tech stack" -  Someone, probably.</span>
                </p>
                <Marquee gradient={false} speed="150" >
                    {ICONS.map((icon, index) => (
                        <div className='relative mx-10 mt-12 mb-6'>
                            <img
                                src={icon}
                                alt="Listing Image"
                                className='w-48 h-20 object-contain'
                            />
                        </div>
                    ))}
                </Marquee>
            </section>
        </div>
    )
}
