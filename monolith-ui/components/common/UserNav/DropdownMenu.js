import cn from "classnames";
import Link from "next/link";
import { useRef, useState } from "react";
import s from "./DropdownMenu.module.css";
import { Cart, User } from "../../icons";

import { useAuth } from "../../../lib/hooks/auth";

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
    <div className='flex justify-center items-center'>
      <Link href='/cart'>
        <div className='flex justify-center items-center pr-8'>
          <button className='focus:outline-none'>
            <Cart />
          </button>
        </div>
      </Link>
      <div
        onMouseEnter={() => setDisplay(!display)}
        onMouseLeave={() => setDisplay(!display)}
        className='flex justify-center items-center'
      >
        <div className='focus:outline-none'>
          <User />
        </div>
        {display && (
          <ul className={cn(s.dropdownMenu, "fadeIn")} ref={ref}>
            {LINKS.map(({ name, href }) => (
              <li key={href}>
                <div>
                  <Link href={href}>
                    <a
                      className={cn(s.link)}
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
                className={cn(s.link, "border-t border-accents-0")}
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
