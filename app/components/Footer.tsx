import React from "react";
import { Link } from "@remix-run/react"; // ✅ Use Remix's <Link>
import { assets } from "~/assets/assets"; // ✅ Correct Remix path

const Footer = () => {
  return (
    <footer className="flex items-center justify-between gap-4 py-3 mt-20">
      {/* Logo */}
      <Link to="/">
        <img src={assets.instaC_logo} alt="Logo" width={150} />
      </Link>

      {/* Copyright */}
      <p
        className="flex-1 border-l border-gray-200 pl-4 text-sm 
        text-gray-500 max-sm:hidden"
      >
        Copyright &copy; {new Date().getFullYear()} techie.dev | All rights reserved.
      </p>

      {/* Social Media Links */}
      <div className="flex gap-2.5">
        <Link to="https://www.facebook.com" target="_blank">
          <img src={assets.facebook_icon} alt="Facebook" width={35} />
        </Link>
        <Link to="https://www.twitter.com" target="_blank">
          <img src={assets.twitter_icon} alt="Twitter" width={35} />
        </Link>
        <Link to="https://www.instagram.com" target="_blank">
          <img src={assets.instagram_icon} alt="Instagram" width={35} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
