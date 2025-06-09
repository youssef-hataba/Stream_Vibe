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
    <div className="bg-black-6 rounded-xl border border-black-15 p-6 mt-6 mx-4 flex flex-col md:flex-row items-center md:items-start gap-6">
      {/* Avatar */}
      <div className="relative w-[160px] h-[160px] rounded-full overflow-hidden border border-black-30">
        {preview ? (
          <Image
            src={preview}
            alt={`${name} profile picture`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-black-20 flex items-center justify-center">
            <AiOutlineUser className="text-gray-60" size={80} />
          </div>
        )}
      </div>

      {/* Info & Actions */}
      <div className="flex-1 flex flex-col items-center md:items-start gap-4">
        {/* Name & Email */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-white mb-1">{name}</h2>
          <p className="text-gray-60">{email}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <button
            onClick={handleLogout}
            className="bg-red-50 text-black-6 px-5 py-2 rounded-full font-semibold hover:opacity-90 transition-all duration-200"
          >
            Logout
          </button>

          <label
            htmlFor="upload-profile-pic"
            className={`px-5 py-2 border border-red-45 text-red-45 rounded-full text-sm font-medium cursor-pointer hover:bg-red-45 hover:text-black-6 transition ${
              uploading ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            {uploading ? "Uploading..." : "Change Picture"}
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
    </div>
  );
};

export default ProfileHeader;
