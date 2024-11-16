"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import supabase from "@/app/lib/supabaseClient";
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

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
  
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      }, {
        data: {
          name: formData.username,
        },
      });
  
      if (authError) {
        setError(authError.message);
        setIsLoading(false);
        return;
      }
  
      // Insert user details in the Users table, including the auth_user_id
      const { data, error } = await supabase
        .from("users")
        .insert([{
          id: authData.user.id, // Use the user's ID from Supabase Auth
          name: formData.username,
          email: formData.email,
          password: formData.password, // Storing password like this is insecure!
        }])
        .select();
  
      if (error) {
        setError(error.message);
      } else {
        router.push("/"); // Redirect to another page after successful registration
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-screen min-h-screen z-10 absolute left-0 top-0 flex items-center justify-center bg-black-6">
      <MovieWall />
      <div className="w-full h-screen absolute backdrop-blur-[4px] bg-black-6/35"></div>
      <Link href="/" className="absolute left-[6%] top-[21px] z-40">
        <img src="/Logo.svg" alt="logo" className="h-[46px]" />
      </Link>
      <div className="bg-black-8/75 backdrop-blur-xl border border-black-15 p-8 rounded-lg shadow-md w-full max-w-md mx-12 lg:mx-0">
        <h1 className="text-2xl text-[27px] font-semibold text-center mb-6 text-gray-60">
          Register
        </h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
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