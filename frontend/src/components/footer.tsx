import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-500 text-gray-200 py-10 rounded-4xl">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 rounded-4xl">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold mb-4">MyShop</h2>
          <p className="text-gray-400">
            Quality products, curated for you. Fast delivery and top-notch customer service.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <a href="/" className="hover:text-white transition">Home</a>
            </li>
            <li>
              <a href="/products" className="hover:text-white transition">Products</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition">Contact</a>
            </li>
            <li>
              <a href="/about" className="hover:text-white transition">About</a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-gray-400">
            <a href="#" className="hover:text-white transition"><FaFacebook size={24} /></a>
            <a href="#" className="hover:text-white transition"><FaTwitter size={24} /></a>
            <a href="#" className="hover:text-white transition"><FaInstagram size={24} /></a>
            <a href="#" className="hover:text-white transition"><FaLinkedin size={24} /></a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
