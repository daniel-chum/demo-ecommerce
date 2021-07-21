import Link from "next/link";
import { useState } from "react";
import s from './DropdownMenu.module.css'
import cn from 'classnames'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const LINKS = [
  {
    name: "Listing",
    href: "/listing",
  },
  {
    name: "Profile",
    href: "/profile",
  },
];

const DropdownMenu = ({logout, cart }) => {
  const [display, setDisplay] = useState(false);

  return (
    <div className='flex justify-center items-center'>
      <div className='relative flex justify-center items-center pr-6'>
        <span className='absolute right-4 bottom-4
                        text-black text-xs font-semibold
                        bg-primary border rounded-full h-5 w-5 flex justify-center items-center'
        >
          {cart.length}
        </span>
        <Link href='/cart'>
          <a className='contents'>
            <button className='focus:outline-none'>
              <FontAwesomeIcon icon={faShoppingCart} className='h-6 cursor-pointer'/>
            </button>
          </a>
        </Link>
      </div>
      <div
        onMouseEnter={() => setDisplay(!display)}
        onMouseLeave={() => setDisplay(!display)}
        className='relative'
      >
        <div>
          <FontAwesomeIcon icon={faUser} className='h-6 cursor-pointer'/>
        </div>
        {display && (
          <ul
            className={cn(s.dropdownMenu,
              "fadeIn absolute right-5 mt-4 bg-gray-50 z-40 border border-gray-300 " +
              "lg:absolute lg:-right-2 lg:shadow-md lg:w-40 lg:h-auto")}
          >
            {LINKS.map(({ name, href }) => (
              <li key={href}>
                <div>
                  <Link href={href}>
                    <a
                      className="text-accents-2 cursor-pointer px-6 py-3 flex transition ease-in-out duration-200
                                 hover:bg-accents-2 hover:text-secondary"
                      onClick={() => {
                        setDisplay(false);
                      }}
                    >
                      {name}
                    </a>
                  </Link>
                </div>
              </li>
            ))}
            <li>
              <a
                className= "text-accents-2 cursor-pointer px-6 py-3 flex transition ease-in-out duration-200
                            border-t border-gray-300 hover:bg-accents-2 hover:text-secondary"
                onClick={() => logout()}
              >
                Logout
              </a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;
