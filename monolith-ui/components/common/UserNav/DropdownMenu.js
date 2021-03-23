import cn from "classnames";
import Link from "next/link";
import { useRef, useState } from "react";
import s from "./DropdownMenu.module.css";
import { User } from "../../icons";

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
    <div
      className="tooltip"
      onMouseEnter={() => setDisplay(!display)}
      onMouseLeave={() => setDisplay(!display)}
    >
      <button className={s.avatarButton} aria-label="Menu">
        <User />
      </button>
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
  );
};

export default DropdownMenu;
