import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "../../icons";
import UserNav from "../../common/UserNav/UserNav";

const Navbar = () => {

  return (
    <div className="sticky top-0 z-50 w-full flex justify-between px-48 py-2 bg-white shadow-magical">
      <Link href='/'>
        <a>
          <Logo />
        </a>
      </Link>
      <UserNav />
    </div>
  );
};

export default Navbar;
