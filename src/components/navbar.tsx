"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import MenuButton from "./menu-button";
import Container from "./container";
import { ThemeToggle } from "./ui/toggle-theme";
import Search from "./search";
import { Icons } from "./icons";
import Image from "next/image";

type Props = {};

const routes = [
  {
    href: "/",
    label: "Products",
  },
  {
    href: "/",
    label: "Categories",
  },
  {
    href: "/",
    label: "On Sale",
  },
];

const Navbar = () => {
  const [yValue, setYValue] = useState(0);
  const [toHide, setToHide] = useState(false);

  // useEffect(() => {
  //   const showHeaderOnScrollUp = () => {
  //     if (yValue >= window.scrollY) {
  //       setToHide(false);
  //     } else {
  //       setToHide(true);
  //     }
  //     setYValue(window.scrollY);
  //   };

  //   window.addEventListener("scroll", showHeaderOnScrollUp);

  //   return () => {
  //     window.removeEventListener("scroll", showHeaderOnScrollUp);
  //   };
  // }, [yValue]);

  return (
    <div
      className={
        "fixed top-0 left-0 right-0 flex py-1 px-4 border-b z-[1] bg-background/80 backdrop-blur-md " +
        (toHide && " py-0 h-0 hidden ")
      }
    >
      <Container>
        <div className="px-6 lg:px-8 flex h-10 sm:h-12 md:h-14 items-center justify-between w-full">
          <div className="flex space-x-2">
            <MenuButton routes={routes} />
            {/* <Link href="/" className="mr-6 flex items-center space-x-2">
              <Icons.logo className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">SUN-CAPY</span>
            </Link> */}
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Image
                src={"/capy3.png"}
                alt="capy"
                width={40}
                height={40}
                className="h-7 w-7 dark:invert hidden sm:block"
              />
              <span className="hidden font-bold sm:inline-block">SUN-CAPY</span>
            </Link>
            {/* <Link href="/">
              <h1 className="text-xl font-bold hidden sm:flex">E-STORE</h1>
            </Link> */}
          </div>
          <div>
            <Search />
          </div>
          <div className=" flex items-center  space-x-4  md:space-x-8 lg:space-x-10 text-lg ">
            <ThemeToggle />
            <Link href={"/"}>
              <ShoppingCart className="h-6 w-6" />
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </div>
          {/* <nav className=" flex items-center  space-x-4  md:space-x-8 lg:space-x-10 text-lg">
            {routes.map((route) => (
              <Link
                key={route.label}
                href={route.href}
                className="hidden sm:block"
              >
                {route.label}
              </Link>
            ))}
            <ThemeToggle />
            <Link href={"/"}>
              <ShoppingCart className="h-6 w-6" />
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </nav> */}
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
