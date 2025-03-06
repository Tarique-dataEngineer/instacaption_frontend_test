import React, { useContext } from "react";
import { Link, useNavigate } from "@remix-run/react";
import { AppContext } from "../context/AppContextProvider";
import { assets } from "../assets/assets";
import Login from "~/components/Login"; // ✅ Ensure Login is correctly imported

const Navbar: React.FC = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();

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

              {/* Profile Dropdown */}
              <div className="relative group">
                <img
                  src={assets.profile_icon}
                  className="w-10 drop-shadow cursor-pointer"
                  alt="Profile Icon"
                />
                <div
                  className="absolute hidden group-hover:block top-0 right-0 z-10 text-black 
                  rounded pt-12"
                >
                  <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                    <li onClick={logout} className="py-1 px-2 cursor-pointer pr-10 hover:bg-gray-100">
                      Logout
                    </li>
                  </ul>
                </div>
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
