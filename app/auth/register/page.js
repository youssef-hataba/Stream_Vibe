"use client";

import { useState } from "react";
import Link from "next/link";
import MovieWall from "@/app/_components/MovieWall";

const usernameRegex = /^(?=.{3,16}$)(?![_\.])[a-zA-Z0-9._]+(?<![_\.])$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleRegister = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!usernameRegex.test(formData.username)) {
      validationErrors.username = "Username must be 3-16 chars, no special chars at start/end.";
    }

    if (!emailRegex.test(formData.email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    if (!passwordRegex.test(formData.password)) {
      validationErrors.password =
        "Password must be 6+ chars, with uppercase, number, special char.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div
      className="w-screen min-h-screen z-10 absolute left-0 top-0 flex items-center justify-center bg-black-6">
      <MovieWall />
      <div className="w-full h-screen absolute backdrop-blur-[4px] bg-black-6/35"></div>
      <Link href="/" className="absolute left-[6%] top-[21px] z-40">
        <img src="/Logo.svg" alt="logo" className="h-[46px]" />
      </Link>
      <div
        className="bg-black-8/75 backdrop-blur-xl border border-black-15 p-8 rounded-lg 
      shadow-md w-full max-w-md mx-12 lg:mx-0"
      >
        <h1 className="text-2xl text-[27px] font-semibold text-center mb-6 text-gray-60 ">
          Register
        </h1>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Username Input */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border bg-black-6 border-black-15 outline-none 
            text-white placeholder:text-sm"
          />
          {errors.username && (
            <p className="text-red-45 text-sm">{errors.username}</p>
          )}

          {/* Email Input */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border bg-black-6 border-black-15 text-white
            outline-none placeholder:text-sm"
          />
          {errors.email && <p className="text-red-45 text-sm">{errors.email}</p>}

          {/* Password Input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border bg-black-6 border-black-15 text-white
            outline-none placeholder:text-sm"
          />
          {errors.password && (
            <p className="text-red-45 text-sm">{errors.password}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 border border-black-15 text-red-45 font-semibold rounded-lg
            bg-black-6 text-base hover:bg-red-50 hover:bg-opacity-70 hover:font-bold hover:text-black-6
              transition-all duration-150"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-6 text-gray-60">
          Already have an account?
          <Link
            href="/auth/login"
            className="text-gray-70 hover:text-red-45 transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
