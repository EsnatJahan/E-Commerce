import React, { useState } from "react";
import reactImg from "../assets/react.svg";
import shoppingImg from "../assets/shopping.jpg";
import bags from "../assets/bags.jpg"
import dress from "../assets/dresses.jpg"
import makeup from "../assets/makeups.jpg"

const Home: React.FC = () => {
  // Array of products
  const products = [bags, dress, makeup];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Product Card */}
       {/* Product Card */}
        <section className="py-[6%] bg-white mx-[5%]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center bg-indigo-100 shadow-lg rounded-2xl overflow-hidden min-h-[600px]">
            {/* Left: Single Product Display */}
            <div className="md:w-1/2 mt-6 md:mt-0 md:pr-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Our Product</h2>

            {/* Product Image */}
            <div className="bg-indigo-200 rounded-lg shadow-md p-4 inline-block relative w-full md:w-[100%] h-64 md:h-72">
            {products.map((product, index) => (
                <img
                key={index}
                src={product}
                alt={`Product ${index + 1}`}
                className={ `p-5  w-full h-full object-cover rounded-md transition-opacity duration-500 absolute top-0 left-0 ${
                    index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                />
            ))}
            {/* <p className="font-semibold text-center mt-2">
                Product {currentIndex + 1}
            </p> */}
            </div>




            {/* Navigation Arrows */}
            <div className="flex justify-center mt-4 space-x-6">
                <button
                onClick={prevProduct}
                className="px-4 py-2 bg-purple-600 text-black rounded-lg hover:bg-purple-700 transition"
                >
                &larr; 
                {/* Prev */}
                </button>
                <button
                onClick={nextProduct}
                className="px-4 py-2 bg-purple-600 text-black rounded-lg hover:bg-purple-700 transition"
                >
                {/* Next */}
                 &rarr;
                </button>
            </div>
            </div>

            {/* Right: Shopping Image */}
            <div className="md:w-1/2 p-6 flex justify-center">
                <img
                    src={shoppingImg}
                    alt="Featured Product"
                    className="w-full md:w-[100%] h-96 md:h-[500px] object-cover rounded-lg shadow-md"
                />
            </div>
        </div>
        </section>


      {/* About Us Card */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center bg-purple-100 shadow-lg rounded-2xl overflow-hidden">
          {/* Left Text */}
          <div className="md:w-1/2 p-6">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p>
              We provide seamless complaint management services for students.
              Our platform ensures faster resolution and better hall management.
            </p>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 p-6">
            <img src={shoppingImg} alt="About" className="w-full rounded-lg shadow-md" />
          </div>
        </div>
      </section>

      {/* Contact Card */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center bg-white shadow-lg rounded-2xl overflow-hidden">
          {/* Left Image */}
          <div className="md:w-1/2 p-6">
            <img src={shoppingImg} alt="Contact" className="w-full rounded-lg shadow-md" />
          </div>

          {/* Right Text */}
          <div className="md:w-1/2 p-6">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p>Email: <a href="mailto:halladmin@cuet.ac.bd" className="text-purple-600 underline">halladmin@cuet.ac.bd</a></p>
            <p>Phone: +880-1234-567890</p>
            <p className="mt-2">Address: CUET Hall, Chattogram, Bangladesh</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>&copy; 2024 CUET Hall Complaint Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
