import React, { useState } from "react";
import reactImg from "../assets/react.svg";
import shoppingImg from "../assets/shopping.jpg";
import bags from "../assets/bags.jpg"
import dress from "../assets/dresses.jpg"
import makeup from "../assets/makeups.jpg"
import shoes from "../assets/shoes.jpg"
import purse from "../assets/purse.jpg"
import cover from "../assets/cover.jpg"

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

  const cardProducts = [
    { id: 1, name: "Shoes", price: "$50", image: shoes  },
    { id: 2, name: "Purse", price: "$70", image: purse },
    { id: 3, name: "Phone Cover", price: "$90", image: cover },
    { id: 4, name: "Bag", price: "$50", image: bags },
    { id: 5, name: "Dress", price: "$70", image: dress },
    { id: 6, name: "Makeup", price: "$90", image: makeup },
  ];
  const [likeCounts, setLikeCounts] = useState(cardProducts.map(() => 0));
  const [loved, setLoved] = useState(cardProducts.map(() => false));

  const toggleLove = (index: number) => {
    setLoved(prev =>
      prev.map((val, i) => (i === index ? !val : val)) // toggle only that product
    );
  };


  return (
    <div className="font-sans text-gray-800">
      {/* Product Card */}
      <section className="py-[4%]  mx-[5%]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center bg-indigo-100 shadow-lg rounded-2xl overflow-hidden min-h-[10%]">
            {/* Left: Single Product Display */}
          <div className="md:w-1/2 mt-6 md:mt-0 md:pr-8 text-center">
            <p className="text-xl font-bold mb-1 mt-6">Purchase our most selling products</p>
            <p className="text-xl font-bold mb-6">with upto <span className="px-2.5 text-3xl font-bold italic text-amber-500">50%</span> discount</p>
            {/* Product Image */}
            <div className="bg-indigo-200 rounded-lg shadow-md p-4 inline-block relative w-full md:w-[95%] h-64 md:h-64">
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
            <div className="flex justify-center mt-4 space-x-6">
              {/* <button
                onClick={prevProduct}
                className="appearance-none p-4 bg-purple-600 text-black rounded-full hover:bg-purple-700 transition text-5xl font-bold border-none"
              >
                ←
              </button> */}
              <button
                onClick={nextProduct}
                className="appearance-none w-[15%] h-auto  p-4 bg-indigo-50  rounded-2xl hover:bg-purple-700 transition: text-2xl  font-bold border-none"
              >
                →
              </button>
            </div>


          </div>

            {/* Right: Shopping Image */}
            <div className="md:w-1/2 p-2 flex justify-center">
                <img
                    src={shoppingImg}
                    alt="Featured Product"
                    className="w-full md:w-[100%] h-96 md:h-[10%] object-cover rounded-lg shadow-md"
                />
            </div>
        </div>
      </section>

      {/* Products Carousel with React Button */}
      <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Our Products</h2>
            <div className="relative">
              {/* Products Row */}
              <div id="productsRow" className="flex overflow-hidden space-x-4">
                {cardProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="bg-indigo-100 rounded-3xl shadow-lg flex-shrink-0 w-[24%] relative"
                  >
                    {/* Love Button */}
                    <button
                      onClick={() => toggleLove(index)}
                      className="absolute top-4 right-4 text-2xl transition-transform transform hover:scale-110"
                    >
                      <span className={loved[index] ? "text-red-500" : "text-gray-300"}>
                        ❤️
                      </span>
                    </button>

                    <img
                      src={product.image}
                      alt={product.name}
                      className="p-4 w-full h-64 object-cover rounded-3xl"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-800">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 mt-1">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Prev Button */}
              <button
                onClick={() => {
                  const row = document.getElementById("productsRow");
                  const cardWidth = row?.firstElementChild?.clientWidth || 0;
                  if (row) row.scrollBy({ left: -(cardWidth + 16), behavior: "smooth" });
                }}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-purple-600 text-black p-3 rounded-r-full hover:bg-purple-700 transition"
              >
                &lt;
              </button>

              {/* Next Button */}
              <button
                onClick={() => {
                  const row = document.getElementById("productsRow");
                  const cardWidth = row?.firstElementChild?.clientWidth || 0;
                  if (row) row.scrollBy({ left: cardWidth + 16, behavior: "smooth" });
                }}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-purple-600 text-black p-3 rounded-l-full hover:bg-purple-700 transition"
              >
                &gt;
              </button>
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
