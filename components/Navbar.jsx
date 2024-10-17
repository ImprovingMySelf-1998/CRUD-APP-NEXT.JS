// src/components/Navbar.js
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <div className="text-white text-xs sm:text-lg md:text-xl lg:text-2xl font-bold">
            My Logo
          </div>
        </Link>
        <Link href={"/addUser"}>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg py-1 sm:py-2 px-2 sm:px-4 md:px-6 lg:px-8 rounded">
            Add User
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
