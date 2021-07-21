import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "../../icons";
import UserNav from "../../common/UserNav/UserNav";

const Navbar = () => {

  return (
    <div className="sticky top-0 z-50 w-full flex justify-between px-28 3xl:px-60 py-2.5 items-center bg-secondary shadow-magical">
      <Link href='/'>
        <a>
          <div
            className='flex items-center justify-center border-2 border-primary w-11 h-11 rounded-full
            transform duration-300 ease-in-out cursor-pointer hover:bg-primary hover:shadow-md'
          >
            <Logo className='fill-current text-primary hover:fill-current hover:text-secondary'/>
          </div>
        </a>
      </Link>
      <UserNav />
    </div>
  );
};

export default Navbar;
