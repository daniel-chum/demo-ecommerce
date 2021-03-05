import cn from "classnames";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import s from "./DropdownMenu.module.css";
// import ClickOutside from '@lib/click-outside'
// import { Avatar } from '@components/common'

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

import { useAuth } from "../../../lib/hooks/auth";

const LINKS = [
  {
    name: "My Listing",
    href: "/listing",
  },
  {
    name: "My Profile",
    href: "/profile",
  },
];

const DropdownMenu = () => {
  const [display, setDisplay] = useState(false);
  const { pathname } = useRouter();
  const { logout } = useAuth();
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      if (display) {
        disableBodyScroll(ref.current);
      } else {
        enableBodyScroll(ref.current);
      }
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [display]);

  return (
    // <ClickOutside active={display} onClick={() => setDisplay(false)}>
    <div>
      <button
        className={s.avatarButton}
        onClick={() => setDisplay(!display)}
        aria-label="Menu"
      >
        <p>Dropdown</p>
      </button>
      {display && (
        <ul className={s.dropdownMenu} ref={ref}>
          {LINKS.map(({ name, href }) => (
            <li key={href}>
              <div>
                <Link href={href}>
                  <a
                    className={cn(s.link, {
                      [s.active]: pathname === href,
                    })}
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
              className={cn(s.link, "border-t border-accents-2 mt-4")}
              onClick={() => logout()}
            >
              Logout
            </a>
          </li>
        </ul>
      )}
    </div>
    // </ClickOutside>
  );
};

export default DropdownMenu;
