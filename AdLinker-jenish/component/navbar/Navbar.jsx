import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

// ✅ Import logo correctly
import Logo from "/image/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#1E293B] text-white px-4 py-3 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* LOGO SECTION */}
        <div className="flex items-center space-x-2">
          <img
            src={Logo}
            alt="Logo"
            className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] object-contain"
          />
          <span className="text-lg sm:text-xl font-bold">AdLinker</span>
        </div>

        {/* Desktop Menu (Hidden on Mobile) */}
        <ul className="hidden md:flex space-x-6 text-gray-300">
          <li className="hover:text-white cursor-pointer">Advertiser</li>
          <li className="hover:text-white cursor-pointer">
            <NavLink to="/Publisher"> Publisher</NavLink>
          </li>
          <li className="hover:text-white cursor-pointer">Blog</li>
          <li className="hover:text-white cursor-pointer">Glossary</li>
          <li className="hover:text-white cursor-pointer">FAQ</li>
          <li className="hover:text-white cursor-pointer">Company</li>
        </ul>

        {/* Buttons & Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          {/* Desktop Buttons */}
          <div className="hidden md:flex space-x-2">
            <NavLink to="/register">
              <button className="bg-white text-black px-4 py-2 rounded-md">
                Register
              </button>
            </NavLink>
            <NavLink to="/login">
              <button className="border border-white px-4 py-2 rounded-md text-white">
                Sign in
              </button>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Hidden by Default) */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-[#1E293B] transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        } md:hidden flex flex-col items-center pt-20`}
      >
        <button
          className="absolute top-5 right-5 text-white"
          onClick={() => setIsOpen(false)}
        >
          <X size={32} />
        </button>

        <ul className="flex flex-col space-y-5 text-lg text-gray-300">
          <li
            className="hover:text-white cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Advertiser
          </li>
          <li
            className="hover:text-white cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Publisher
          </li>
          <li
            className="hover:text-white cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Blog
          </li>
          <li
            className="hover:text-white cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Glossary
          </li>
          <li
            className="hover:text-white cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            FAQ
          </li>
          <li
            className="hover:text-white cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Company
          </li>
        </ul>

        {/* Mobile Buttons */}
        <div className="flex flex-col items-center space-y-4 mt-6 w-4/5">
          <NavLink to="/register" className="w-full">
            <button className="bg-white text-black w-full py-2 rounded-md text-center">
              Register
            </button>
          </NavLink>
          <NavLink to="/login" className="w-full">
            <button className="border border-white w-full py-2 rounded-md text-white text-center">
              Sign in
            </button>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
