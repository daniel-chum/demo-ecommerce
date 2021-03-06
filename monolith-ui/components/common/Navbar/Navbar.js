import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import s from "./NavBar.module.css";
import { Logo } from "../../icons";
import UserNav from "../../common/UserNav/UserNav";
import cn from "classnames";
import throttle from "lodash.throttle";

const Navbar = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = throttle(() => {
      const offset = 0;
      const { scrollTop } = document.documentElement;
      const scrolled = scrollTop > offset;
      setHasScrolled(scrolled);
    }, 200);

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={cn(s.root, { "shadow-magical": hasScrolled })}>
      <div className={s.logo} onClick={() => router.push("/")}>
        <Logo />
      </div>
      <UserNav />
    </div>
  );
};

export default Navbar;
