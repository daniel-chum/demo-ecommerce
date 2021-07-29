import React from "react";
import Image from 'next/image';
import { Logo } from "../../icons"
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faPinterest, faWhatsappSquare } from '@fortawesome/free-brands-svg-icons';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';


export default function Footer(props) {
  return (
    <div className="px-14 pt-10 bg-secondary text-white font-rubik font-light" style={{ fontSize: '0.9rem' }}>
      <div className='grid' style={{ gridTemplateColumns: '30% repeat(2, 1fr) 30%' }}>
        <div className='w-11/12'>
          <Logo className='text-white'/>
          <span className='flex items-center text-xl font-medium pt-5'>
            <FontAwesomeIcon icon={faHeadset} className='h-10 mr-4 text-primary' />
            + (012) 999 777 555
          </span>
          <p className='font-normal pt-3'>
            Welcome to the world's largest online shopping platform where anyone can buy or sell.
            What are you waiting for?
            <br></br>
            Sign up now!
          </p>
          <div className="flex gap-x-4 pt-6">
            <FontAwesomeIcon icon={faFacebookF} className='h-4 cursor-pointer'/>
            <FontAwesomeIcon icon={faTwitter} className='h-4 cursor-pointer'/>
            <FontAwesomeIcon icon={faPinterest} className='h-4 cursor-pointer'/>
            <FontAwesomeIcon icon={faWhatsappSquare} className='h-4 cursor-pointer'/>
          </div>
        </div>
        <ul className='flex flex-col items-start justify-self-center gap-y-3 pt-3.5'>
          <label className='text-base font-semibold pb-2'>INFORMATION</label>
          <Link href='/about'><a><li className='cursor-pointer'>About Us</li></a></Link>
          <li className='cursor-pointer'>Delivery Information</li>
          <li className='cursor-pointer'>Privacy policy</li>
          <li className='cursor-pointer'>Terms & Conditions</li>
          <li className='cursor-pointer'>Return Policy</li>
        </ul>
        <ul className='flex flex-col items-start justify-self-center gap-y-3 pt-3.5'>
          <label className='text-base font-semibold pb-2'>QUICK LINKS</label>
          <Link href='/'><a><li className='cursor-pointer'>Home</li></a></Link>
          <Link href='/profile'><a><li className='cursor-pointer'>Profile</li></a></Link>
          <Link href='/listing'><a><li className='cursor-pointer'>Listing</li></a></Link>
          <Link href='/cart'><a><li className='cursor-pointer'>Cart</li></a></Link>
        </ul>
        <div className='flex flex-col items-start justify-self-end gap-y-3 pt-3.5'>
          <label className='text-base font-semibold pb-2'>GET IN TOUCH</label>
          <span>Address: 123 Main Street, Anytown, CA 12345 – USA.</span>
          <span>Telephone Enquiry: (012) 999 777 555</span>
          <label className='text-base font-semibold pt-2 pb-2'>OPENING TIME</label>
          <span>Open: 8:00 AM - Close: 12:00 PM</span>
          <span>Monday- Sunday: Open</span>
        </div>
      </div>
      <div className='flex justify-between items-center border-t border-gray-50 border-opacity-10 mt-8 pt-2 pb-2'>
        <p>Copyright © <span className='text-primary'>Chum</span>. All Right Reserved.</p>
        <div className='relative w-96 h-10'>
          <Image
            quality="100"
            src='/payment.png'
            alt='Payment gateways'
            layout='fill'
            objectFit='scale-down'
          />
        </div>
      </div>
    </div>
  );
}
