"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { Plus, ShoppingCart } from "lucide-react";
import MenuButton from "./menu-button";
import Container from "./container";
import { ThemeToggle } from "./ui/toggle-theme";
import Search from "./search";
import Image from "next/image";
import { Button } from "./ui/button";

type Props = {};

const routes = [
  {
    href: "/",
    label: "All Products",
  },
  {
    href: "/",
    label: "Brands",
  },
  {
    href: "/",
    label: "On Sale",
  },
];

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 flex py-1  border-b z-[1] bg-background/80 backdrop-blur-md">
      <Container>
        <div className="px-6 lg:px-8 flex h-10 sm:h-12 md:h-14 items-center justify-between w-full">
          <div className="flex space-x-2 pr-10">
            <MenuButton routes={routes} />
            <Link href="/home" className="mr-6 flex items-center space-x-2">
              <Image
                src={"/capy3.png"}
                alt="capy"
                width={40}
                height={40}
                className="h-7 w-7 dark:invert hidden sm:block"
              />
              <span className="hidden font-bold sm:inline-block">SUN-CAPY</span>
            </Link>
          </div>
          <div>
            <Suspense>
              <Search />
            </Suspense>
          </div>
          <div className=" flex items-center  space-x-4  md:space-x-6 lg:space-x-8 text-lg ">
            <Link href={"/create"}>
              <Button variant="ghost" size="icon">
                <Plus className="h-6 w-6 " />

                <span className="sr-only">Add Product</span>
              </Button>
            </Link>
            <ThemeToggle />
            <Link href={"/home"}>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-6 w-6" />
                <span className="sr-only">Shopping Cart</span>
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
