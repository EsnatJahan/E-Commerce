import React, { useState, useEffect } from "react";
import logoImg from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

   const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent default <a> behavior
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.location.href = "/"; // redirect to home
  };


  return (
    <>
      {/* Navbar */}
      <nav className="bg-gray-200 text-gray-800 font-thin italic p-2 flex items-center">
        {/* LEFT: Hamburger */}
        <div className="flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-md hover:bg-gray-200 focus:outline-none"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* CENTER: Links */}
      
        <div className="flex-1 flex justify-end">
          {/* Search Bar */}
          <div className="w-full max-w-md ">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:outline-none font-bold focus:ring-2 focus:ring-sky-400"
            />
          </div>
          <div className="flex space-x-6 items-center text-lg text-black">
            <a href="/" className="px-3 py-1 hover:underline font-sans ">Home</a>
            <a href="/signup" className="px-3 py-1 hover:underline font-sans">Sign Up</a>
            {isLoggedIn ? (
              <a href="/" onClick={handleLogout} className="hover:underline cursor-pointer">
               Logout
              </a>
            ) : (
              <Link to="/login" className="hover:underline">
               Login
              </Link>
            )}
          </div>

          
        </div>

        {/* RIGHT: Logo */}
        <div className="flex items-center ml-4">
          <img src={logoImg} alt="Logo" className="h-10 w-auto" />
        </div>
      </nav>

      {/* Overlay (click to close sidebar) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-slate-200 shadow-2xl rounded-r-3xl text-black transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-10">Menu</h2>
          <ul className="space-y-6">
            <li>
              <a
                href="/dress"
                onClick={() => setIsOpen(false)}
                className="block bg-gray-700/20 hover:bg-gray-700/40 text-gray-800 text-lg font-bold px-6 py-4 rounded-xl shadow-md transition"
              >
                Dress
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => setIsOpen(false)}
                className="block bg-gray-700/20 hover:bg-gray-700/40 text-gray-800 text-lg font-bold px-6 py-4 rounded-xl shadow-md transition"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => setIsOpen(false)}
                className="block bg-gray-700/20 hover:bg-gray-700/40 text-gray-800 text-lg font-bold px-6 py-4 rounded-xl shadow-md transition"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => setIsOpen(false)}
                className="block bg-gray-700/20 hover:bg-gray-700/40 text-gray-800 text-lg font-bold px-6 py-4 rounded-xl shadow-md transition"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
