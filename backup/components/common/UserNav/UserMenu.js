import Link from "next/link";
import { useState } from "react";
import s from './UserMenu.module.css'
import cn from 'classnames'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const LINKS = [
  {
    name: "My Listing",
    href: "/listing",
  },
  {
    name: "Account",
    href: "/account",
  },
];

const UserMenu = ({ user, cart, logout }) => {

  const [display, setDisplay] = useState(false);

  return (
    <div className='flex justify-center items-center font-rubik text-secondary'>
      <div className='relative flex justify-center items-center mr-8'>
        <span className='absolute left-5 bottom-4
                        text-xs font-semibold
                        bg-primary rounded-full h-5 w-5 flex justify-center items-center'
        >
          {cart.length}
        </span>
        <Link href='/cart'>
          <a className='contents'>
            <button className='focus:outline-none'>
              <FontAwesomeIcon icon={faShoppingCart} className='h-6 text-secondary cursor-pointer'/>
            </button>
          </a>
        </Link>
      </div>
      <div
        onMouseEnter={() => setDisplay(!display)}
        onMouseLeave={() => setDisplay(!display)}
        className='relative '
      >
        <div className='flex justify-center items-center'>
          <span className='border-dotted border-secondary leading-tight mr-2 cursor-default' style={{ borderBottomWidth: '2.5px' }}>{user.username}</span>
          <FontAwesomeIcon icon={faUser} className='h-6 text-secondary' />
        </div>
        {display && (
          <div className= "fadeIn absolute lg:-right-2 lg:w-40 lg:h-auto">
            <ul className='mt-2 bg-background shadow z-50 border border-gray-300'>
              {LINKS.map(({ name, href }) => (
                <li key={href}>
                  <div>
                    <Link href={href}>
                      <a
                        className="cursor-pointer px-6 py-3 flex transition ease-in-out duration-200
                                   hover:bg-gray-200"
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
                  className="cursor-pointer px-6 py-3 flex transition ease-in-out duration-200
                              border-t border-gray-300 hover:bg-gray-200"
                  onClick={() => logout()}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
