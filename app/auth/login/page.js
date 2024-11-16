"use client";

import {useState} from "react";
import Link from "next/link";
import MovieWall from "@/app/_components/MovieWall";
import {useRouter} from "next/navigation";
import supabase from "@/app/lib/supabaseClient";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate email and password
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // if (!passwordRegex.test(formData.password)) {
    //   setError("Password must be 6+ chars, with uppercase, number, special char.");
    //   return;
    // }

    setError(""); // Clear error if validation passes

    try {
      // Attempt login with Supabase
      const {data, error} = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push("/");
      }

    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  return (
    <div className="w-screen min-h-screen z-10 absolute left-0 top-0 flex items-center justify-center bg-cover bg-center bg-black-6">
      <MovieWall />
      <div className="w-full h-screen absolute backdrop-blur-[4px] bg-black-6/35"></div>
      <Link href="/" className="absolute left-[6%] top-[21px] z-40">
        <img src="/Logo.svg" alt="logo" className="h-[46px]" />
      </Link>
      <div
        className="bg-black-8/75 backdrop-blur-xl border border-black-15 p-8 rounded-lg 
      shadow-md w-full max-w-md mx-12 lg:mx-0">
        <h1 className="text-2xl text-[27px] font-semibold text-center mb-6 text-gray-60">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border bg-black-6 border-black-15 outline-none text-white placeholder:text-sm"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border bg-black-6 border-black-15 text-white outline-none placeholder:text-sm"
          />
          {error && <p className="text-red-45 text-sm">{error}</p>}{" "}
          {/* Display error message if exists */}
          <button
            type="submit"
            className="w-full p-3 border border-black-15 text-red-45 font-semibold rounded-lg
            bg-black-6 text-base hover:bg-red-50 hover:bg-opacity-70 hover:font-bold hover:text-black-6
            transition-all duration-200">
            Login
          </button>
        </form>
        <p className="text-center mt-6 text-gray-60">
          Don’t have an account?
          <Link href="/auth/register" className="text-gray-70 hover:text-red-45 transition-colors">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
} 