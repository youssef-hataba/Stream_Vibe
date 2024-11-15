import Link from "next/link";
import {FaFacebookSquare} from "react-icons/fa";
import {FaInstagramSquare} from "react-icons/fa";
import {FaTwitter} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black-6 text-white py-12 mt-20 ">
      <div className="max-w-7xl mx-4 sm:mx-[6%]">
      <div className="grid grid-cols-2  md:grid-cols-5 gap-6">
          {/* First Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Home</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#categories-section" className="hover:text-red-45 text-gray-400">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="#herosection" className="hover:text-red-45 text-gray-400">
                  Hero
                </Link>
              </li>
              <li>
                <Link href="#trending-section" className="hover:text-red-45 text-gray-400">
                  Trending Movies
                </Link>
              </li>
              <li>
                <Link href="#new-releases" className="hover:text-red-45 text-gray-400">
                  New Releases
                </Link>
              </li>
              <li>
                <Link href="#must-watch" className="hover:text-red-45 text-gray-400">
                  Must Watch
                </Link>
              </li>
            </ul>
          </div>

          {/* Second Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Movies</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#categories-section" className="hover:text-red-45 text-gray-400">
                  Gernes
                </Link>
              </li>
              <li>
                <Link href="#trending-section" className="hover:text-red-45 text-gray-400">
                  Trending
                </Link>
              </li>
              <li>
                <Link href="#top-rated" className="hover:text-red-45 text-gray-400">
                  Popular
                </Link>
              </li>
            </ul>
          </div>

{/* Third Column */}
<div>
            <h3 className="text-lg font-semibold mb-4">Series</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-red-45 text-gray-400">
                  Gernes
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-red-45 text-gray-400">
                  Trending
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-red-45 text-gray-400">
                  Popular
                </Link>
              </li>
            </ul>
          </div>

          {/* Forth Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/support" className="hover:text-red-45 text-gray-400">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Fifth Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <ul className="flex gap-4 items-center">
              <li>
                <Link href="https://www.facebook.com" target="_blank">
                  <FaFacebookSquare className="hover:scale-110 transition-transform duration-200 hover:text-red-45" size={22} />
                </Link>
              </li>
              <li>
                <Link href="https://www.instagram.com" target="_blank">
                  <FaInstagramSquare  className="hover:scale-110 transition-transform duration-200 hover:text-red-45" size={22}/>
                </Link>
              </li>
              <li>
                <Link href="https://www.twitter.com" target="_blank">
                  <FaTwitter className="hover:scale-110 transition-transform duration-200 hover:text-red-45" size={22} />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* CopyRights */}
        <div className="mt-12 border-t border-gray-700 pt-6">
          <div className="flex justify-between">
            <p className="text-xs text-gray-400 sm:border-none border-r border-gray-700 pr-4 items-left">
              &copy; {new Date().getFullYear()} Stream Vibe. All rights reserved.
            </p>
            <div className="flex items-right space-x-4">
              <p className="text-xs text-gray-400 border-r border-gray-700 pr-4">Terms Of Use</p>
              <p className="text-xs text-gray-400 border-r border-gray-700 pr-4">Privacy Policy</p>
              <p className="text-xs text-gray-400">Cookie Policy</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
