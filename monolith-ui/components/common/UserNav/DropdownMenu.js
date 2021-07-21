import Link from "next/link";
import { useRef, useState } from "react";
import { Cart, User } from "../../icons";
import { useAuth } from "../../../lib/hooks/auth";
import s from './DropdownMenu.module.css'
import cn from 'classnames'

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

const DropdownMenu = () => {
  const [display, setDisplay] = useState(false);
  const { logout } = useAuth();
  const ref = useRef();

  return (
    <div className='flex  justify-center items-center'>
      <Link href='/cart'>
        <a>
          <div className='flex justify-center items-center pr-8'>
            <button className='focus:outline-none'>
              <Cart />
            </button>
          </div>
        </a>
      </Link>
      <div
        onMouseEnter={() => setDisplay(!display)}
        onMouseLeave={() => setDisplay(!display)}
        className='relative'
      >
        <div className='focus:outline-none'>
          <User />
        </div>
        {display && (
          <ul
            className={cn(s.dropdownMenu,
              "fadeIn fixed right-5 mt-4 origin-top-right outline-none bg-secondary z-40 w-full h-full " +
              "lg:absolute lg:-right-2 lg:shadow-md lg:w-40 lg:h-auto")}
          >
            {LINKS.map(({ name, href }) => (
              <li key={href}>
                <div>
                  <Link href={href}>
                    <a
                      className="text-accents-2 cursor-pointer px-6 py-3 flex transition ease-in-out duration-200
                                border-accents-0 hover:bg-accents-2 hover:text-secondary"
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
                            border-t border-accents-0 hover:bg-accents-2 hover:text-secondary"
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
