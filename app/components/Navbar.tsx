import React, { useContext, useState } from "react";
import { Link, useNavigate } from "@remix-run/react";
import { AppContext } from "../context/AppContextProvider";
import { assets } from "../assets/assets";
import Login from "~/components/Login"; // ✅ Ensure Login is correctly imported
import ProfileMenu from "~/components/ProfileMenu";

const Navbar: React.FC = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  if (!context) {
    console.error("Navbar must be used within an AppContextProvider");
    return null;
  }

  const { user, showLogin, setShowLogin, logout, credit } = context;

  return (
    <>
      <div className="flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/">
          <img src={assets.instaC_logo} alt="Logo" className="w-28 sm:w-32 lg:w-40" />
        </Link>

        {/* Right Section */}
        <div>
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Credit Button */}
              <button
                onClick={() => navigate("/buy")}
                className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 
                rounded-full hover:scale-105 transition-all duration-700"
              >
                <img className="w-5" src={assets.credit_star} alt="Credit Icon" />
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  Credit left: {credit}
                </p>
              </button>

              {/* User Greeting */}
              <p className="text-gray-600 max-sm:hidden pl-4">Hi, {user.name}</p>

            {/* Profile Menu */}
            <div className="relative">
              <img
                src={user.avatar || assets.profile_icon}
                className="w-10 h-10 rounded-full drop-shadow cursor-pointer"
                alt="Profile"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              />
              {showProfileMenu && (
                <ProfileMenu 
                  onClose={() => {
                    setShowProfileMenu(false);
                    logout();
                  }} 
                />
              )}
            </div>
          </div>
        ) : (
            <div className="flex items-center gap-2 sm:gap-5">
              {/* Pricing Link */}
              <p onClick={() => navigate("/buy")} className="cursor-pointer">
                Pricing
              </p>

              {/* Login Button */}
              <button
                onClick={() => setShowLogin(true)} // ✅ Ensure this updates state correctly
                className="bg-zinc-800 text-white px-7 py-2 sm:px-8 text-sm rounded-full"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Show Login Component when showLogin is true */}
      {showLogin && <Login />}
    </>
  );
};

export default Navbar;
