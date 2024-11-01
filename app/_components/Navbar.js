"use client";

import {useState} from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.burger} onClick={() => toggleMenu()}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={styles.logo}>
        <Link href="/">
          <img src="/Logo.svg" alt="logo" />
        </Link>
      </div>


      <ul className={styles.navLinks} style={isOpen ? {left: "0"} : {left: "-100%"}}>
        <li>
          <Link href="/" className={styles.active}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/services">Services</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>

      <ul className={styles.authLinks}>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
      </ul>

      {/* القائمة الجانبية */}
      {/* <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <ul>
          <li>
            <Link href="/" onClick={toggleMenu}>Home</Link>
          </li>
          <li>
            <Link href="/about" onClick={toggleMenu}>About</Link>
          </li>
          <li>
            <Link href="/services" onClick={toggleMenu}>Services</Link>
          </li>
          <li>
            <Link href="/contact" onClick={toggleMenu}>Contact</Link>
          </li>
          <li>
            <Link href="/login" onClick={toggleMenu}>Login</Link>
          </li>
          <li>
            <Link href="/register" onClick={toggleMenu}>Register</Link>
          </li>
        </ul>
      </div> */}
    </nav>
  );
};

export default Navbar;
