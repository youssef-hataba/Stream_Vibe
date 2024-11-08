// components/Navbar.js

"use client";

import Link from "next/link";
import Search from "./Search";
import {useState} from "react";

import {FaSearch} from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const classes = isOpen ? "" : "hidden lg:block";

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="mx-4 sm:mx-[6%] flex items-center justify-between pt-[20px] pb-[30px]">
      {!isOpen && (
        <Link href="/">
          <img src="/Logo.svg" alt="logo" className="h-[46px]" />
        </Link>
      )}

      <Search classes={classes} />

      <div className="flex items-center gap-4">
        <FaSearch className="text-red-45 lg:hidden" size={25} onClick={handleOpen} />
        {!isOpen && (
          <p
            className="text-gray-60 border-4 border-black-12 font-semibold rounded-full px-5 py-1.5 
          cursor-pointer hover:text-red-45 hover:text-opacity-100 hover:border-red-45 
          hover:border-opacity-70 transition-all duration-200">
            Login
          </p>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
