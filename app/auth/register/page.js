"use client";

import { useUser } from "@/app/context/UserContext"; 
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MovieWall from "@/app/_components/MovieWall";
import Image from "next/image";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#^@$!%*?&])[A-Za-z\d#^@$!%*?&]{6,}$/;

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useUser();
  
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    const { firstName, lastName, email, password } = formData;

    if (!emailRegex.test(email)) {
      return setError("Invalid email format.");
    }
    if (!passwordRegex.test(password)) {
      return setError("Password must be 6+ chars, with uppercase, lowercase, number, and special character.");
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setUser(data.user);

      router.push("/"); // Redirect after success
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-screen min-h-screen z-10 absolute left-0 top-0 flex items-center justify-center bg-black-6">
      <MovieWall />
      <div className="w-full h-screen absolute backdrop-blur-[4px] bg-black-6/35"></div>
      <Link href="/" className="absolute left-[6%] top-[21px] z-40">
        <Image src="/Logo.svg" alt="logo" height={46} width={153}/>
      </Link>
      <div className="bg-black-8/75 backdrop-blur-xl border border-black-15 p-8 rounded-lg shadow-md w-full max-w-md mx-12 lg:mx-0">
        <h1 className="text-2xl text-[27px] font-semibold text-center mb-6 text-gray-60">
          Register
        </h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border bg-black-6 border-black-15 text-white outline-none placeholder:text-sm"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border bg-black-6 border-black-15 text-white outline-none placeholder:text-sm"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border bg-black-6 border-black-15 text-white outline-none placeholder:text-sm"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border bg-black-6 border-black-15 text-white outline-none placeholder:text-sm"
          />
          {error && <p className="text-red-45 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full p-3 border border-black-15 text-red-45 font-semibold rounded-lg bg-black-6 transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center mt-6 text-gray-60">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-gray-70 hover:text-red-45 transition-colors">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
