import React, { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Optional: close sidebar with Esc key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-purple-400 text-white p-4 flex justify-between items-center">
        {/* Hamburger Button */}
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
            >
            <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
            </svg>
        </button>



        {/* Logo */}
        <h1 className="text-xl font-bold">My Website</h1>
      </nav>

      {/* Overlay (click to close) */}
      {isOpen && (
        <div
            className="fixed inset-0 bg-transparent z-40"
            onClick={() => setIsOpen(false)}
        />
     )}


      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-stone-100 shadow-2xl rounded-r-3xl text-black transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        <div className="p-4" >
          <h2 className="text-2xl font-bold mb-10">Menu</h2>
          <ul className="space-y-6">
            <li>
                <a
                href="#"
                onClick={() => setIsOpen(false)}
                className="block bg-white/20 hover:bg-white/40 text-white text-lg font-bold px-6 py-4 rounded-xl shadow-md transition"
                >
                Dashboard
                </a>
            </li>
            <li>
                <a
                href="#"
                onClick={() => setIsOpen(false)}
                className="block bg-white/20 hover:bg-white/40 text-white text-lg font-bold px-6 py-4 rounded-xl shadow-md transition"
                >
                Profile
                </a>
            </li>
            <li>
                <a
                href="#"
                onClick={() => setIsOpen(false)}
                className="block bg-white/20 hover:bg-white/40 text-white text-lg font-bold px-6 py-4 rounded-xl shadow-md transition"
                >
                Settings
                </a>
            </li>
            <li>
                <a
                href="#"
                onClick={() => setIsOpen(false)}
                className="block bg-white/20 hover:bg-white/40 text-white text-lg font-bold px-6 py-4 rounded-xl shadow-md transition"
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
