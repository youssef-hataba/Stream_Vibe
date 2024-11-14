"use client"

import { AiOutlineUser } from "react-icons/ai";

const ProfileHeader = ({ name,email, handleLogout }) => (
  <div className="flex items-center gap-4 mt-6">
  <div className="bg-black-6 p-6 border border-black-15">
    <div className="bg-black-20 rounded-full p-2">
      <AiOutlineUser className="text-gray-60" size={80} />
    </div>
  </div>
  <div className="flex flex-col gap-7">
    <div>
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
  </div>
</div>

);

export default ProfileHeader;
