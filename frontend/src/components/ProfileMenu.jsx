import { useState } from "react";
import { FiUser, FiCreditCard, FiImage, FiLogOut } from "react-icons/fi";
import { useProfileList } from "../store/zus";
import { Link } from "react-router-dom";

const ProfileMenu = ({ styling }) => {
  const { isOpen, toggleProfile } = useProfileList();
  if (!isOpen) return null;

  return (
    <div
      className={`absolute inline-block text-left z-10000 right-0 top-10 ${styling}`}
    >
      <div className="relative w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 font-sans">

        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">
            Profile Options
          </h3>
        </div>

        <div className="space-y-1">
          <Link
            to={"/my-info"}
            onClick={toggleProfile}
            className="flex items-center gap-3 py-3 border-b border-gray-100 text-gray-800 hover:text-black font-semibold text-sm transition-colors"
          >
            <FiUser className="text-lg text-gray-800" />
            <span>Personal info</span>
          </Link>

       
          <Link
            to={"/my-info/update-password"}
            onClick={toggleProfile}
            className="flex items-center gap-3 py-3 border-b border-gray-100 text-gray-800 hover:text-black font-semibold text-sm transition-colors"
          >
            <FiCreditCard className="text-lg text-gray-800" />
            <span>Login and security</span>
          </Link>

         
          <Link
            to={"/my-info/my-payments"}
            onClick={toggleProfile}
            className="flex items-center gap-3 py-3 border-b border-gray-100 text-gray-800 hover:text-black font-semibold text-sm transition-colors"
          >
            <FiCreditCard className="text-lg text-gray-800" />
            <span>My payments</span>
          </Link>

     

          
          <Link
            to={"/my-info/my-orders"}
            onClick={toggleProfile}
            className="flex items-center gap-3 py-3 border-b border-gray-100 text-gray-800 hover:text-black font-semibold text-sm transition-colors"
          >
            <FiImage className="text-lg text-gray-800" />
            <span>My orders</span>
          </Link>

         
          <button
            onClick={() => {
              sessionStorage.removeItem("accessToken");
              toggleProfile();
            }}
            className="w-full flex items-center cursor-pointer gap-3 pt-3 text-gray-800 hover:text-red-600 font-semibold text-sm transition-colors text-left"
          >
            <FiLogOut className="text-lg text-gray-800" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
