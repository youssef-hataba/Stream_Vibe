"use client";

import { useState } from "react";
import Image from "next/image";
import { AiOutlineUser } from "react-icons/ai";

const ProfileHeader = ({ name, email, handleLogout, profilePic, setUser }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(profilePic);

  const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const previewUrl = URL.createObjectURL(file);
  setPreview(previewUrl);

  const formData = new FormData();
  formData.append("image", file);

  try {
    setUploading(true);
    const res = await fetch("http://localhost:5000/api/user/upload-profilePic", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    const data = await res.json();

    if (res.ok) {
      // Get latest user data
      const userRes = await fetch("http://localhost:5000/api/user/profile", {
        method: "GET",
        credentials: "include",
      });
      const userData = await userRes.json();

      if (userRes.ok && userData.user) {
        setUser(userData.user);
      }
    } else {
      alert(data.message || "Failed to upload image");
      setPreview(profilePic);
    }
  } catch (err) {
    alert("Error uploading image");
    setPreview(profilePic);
  } finally {
    setUploading(false);
  }
};

  return (
    <div className="flex items-center gap-4 mt-6">
      
      <div className="bg-black-6 p-6 border border-black-15 w-[200px] h-[200px] flex items-center justify-center">
        {preview ? (
          <div className="relative w-[180px] h-[160px] rounded-full overflow-hidden">
            <Image
              src={preview}
              alt={`${name} profile picture`}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        ) : (
          <div className="bg-black-20 rounded-full p-2 flex items-center justify-center w-[160px] h-[160px]">
            <AiOutlineUser className="text-gray-60" size={80} />
          </div>
        )}
      </div>

      
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1 self-start mb-5">
          <p>
            <span className="text-gray-60">Name:</span> {name}
          </p>
          <p>
            <span className="text-gray-60">Email:</span> {email}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="border border-black-15 py-2 px-4 rounded-full text-red-50
            opacity-[80%] font-semibold hover:bg-red-50 hover:bg-opacity-80 hover:font-bold hover:text-black-6
            transition-all duration-300"
        >
          Logout
        </button>

        
        <label
          htmlFor="upload-profile-pic"
          className={`cursor-pointer text-center text-sm text-red-45 underline ${
            uploading ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {uploading ? "Uploading..." : "Change Profile Picture"}
        </label>
        <input
          id="upload-profile-pic"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />
      </div>
    </div>
  );
};

export default ProfileHeader;
