import Link from "next/link";
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#1F1F1F] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">

          {/* First Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Home</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories" className="hover:underline text-gray-400">Categories</Link>
              </li>
              <li>
                <Link href="/" className="hover:underline text-gray-400">Hero</Link>
              </li>
              <li>
                <Link href="/trendingMovies" className="hover:underline text-gray-400">Trending Movies</Link>
              </li>
              <li>
                <Link href="/" className="hover:underline text-gray-400">New Releases</Link>
              </li>
              <li>
                <Link href="/" className="hover:underline text-gray-400">Must Watch</Link>
              </li>
            </ul>
          </div>

        {/* Second Column */}
        <div>
            <h3 className="text-lg font-semibold mb-4">Movies</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline text-gray-400">Gernes</Link>
              </li>
              <li>
                <Link href="/" className="hover:underline text-gray-400">Trending</Link>
              </li>
              <li>
                <Link href="/" className="hover:underline text-gray-400">Popular</Link>
              </li>
            </ul>
          </div>



          {/* Third Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline text-gray-400">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Fourth Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscription</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline text-gray-400">Plans</Link>
              </li>
              <li>
                <Link href="/" className="hover:underline text-gray-400">Features</Link>
              </li>
            </ul>
          </div>

          {/* Fifth Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://www.facebook.com" target="_blank">
                  <Image
                    src="/images/facebook.png"
                    alt="Facebook Icon"
                    width={40}
                    height={40}
                    className="rounded-lg shadow-lg"
                  />
                </Link>
              </li>
              <li>
                <Link href="https://www.instagram.com" target="_blank">
                  <Image
                    src="/images/instagram.png"
                    alt="Instagram Icon"
                    width={40}
                    height={40}
                    className="rounded-lg shadow-lg"
                  />
                </Link>
              </li>
              <li>
                <Link href="https://www.twitter.com" target="_blank">
                  <Image
                    src="/images/twitter.png"
                    alt="Twitter Icon"
                    width={40}
                    height={40}
                    className="rounded-lg shadow-lg"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* CopyRights */}
        <div className="mt-12 border-t border-gray-700 pt-6">
          <div className="flex justify-between items-left">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Stream Vibe. All rights reserved.
            </p>
            <div className="flex items-right space-x-4">
              <p className="text-sm text-gray-400 border-r border-gray-700 pr-4">
                Terms Of Use
              </p>
              <p className="text-sm text-gray-400 border-r border-gray-700 pr-4">
               Privacy Policy
              </p>
              <p className="text-sm text-gray-400">Cookie Policy</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
