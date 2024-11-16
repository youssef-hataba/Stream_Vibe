"use client";

import Link from "next/link";
import Search from "./Search";
import {useState, useEffect} from "react";
import {FaSearch} from "react-icons/fa";
import {AiOutlineUser} from "react-icons/ai";
import supabase from "@/app/lib/supabaseClient";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);


  const classes = isOpen ? "" : "hidden lg:block";

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Fetch the user session
  useEffect(() => {
    const session = supabase.auth.getSession();
    setUser(session?.user || null);

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="mx-4 sm:mx-[6%] flex items-center justify-between pt-[20px] pb-[30px]">
      {/* Logo */}
      {!isOpen && (
        <Link href="/">
          <img src="/Logo.svg" alt="logo" className="h-[46px]" />
        </Link>
      )}

      {/* Search Component */}
      <Search classes={classes} />

      {/* Search Icon and Login/User Avatar */}
      <div className="flex items-center gap-4">
        <FaSearch className="text-red-45 lg:hidden" size={25} onClick={handleOpen} />

        {/* Conditional Rendering based on user session */}
        {!isOpen && (
          <>
            {user ? (
              <Link href="/profile" className="p-1 rounded-full bg-black-15">
                <AiOutlineUser className="text-red-45 opacity-[80%] text-3xl" />
              </Link>
            ) : (
              <Link href="/auth/login">
                <p
                  className="text-gray-60 border-4 border-black-12 font-semibold rounded-full px-5 py-1.5 
                  cursor-pointer hover:text-red-45 hover:text-opacity-100 hover:border-red-45 
                  hover:border-opacity-70 transition-all duration-200">
                  Login
                </p>
              </Link>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 