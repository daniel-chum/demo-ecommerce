import React from "react";
// import { Container } from "@components/ui";
// import { RightArrow } from "@components/icons";
import s from "./Hero.module.css";
import Link from "next/link";

const Hero = ({ headline, description, link }) => {
  return (
    <div className="bg-black">
      <div className={s.root}>
        <h2 className="text-4xl leading-10 font-extrabold text-white sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
          {headline}
        </h2>
        <div className="flex flex-col justify-between">
          <p className="mt-5 text-xl leading-7 text-accent-2 text-white">
            {description}
          </p>
          <Link href={link}>
            <a className="text-white pt-3 font-bold hover:underline flex flex-row cursor-pointer w-max-content">
              Read it here
              {/* <RightArrow width="20" heigh="20" className="ml-1" /> */}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
