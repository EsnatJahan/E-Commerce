import React from "react";
import shop from "../assets/shop.png";
import dressImg1 from "../assets/shoes.jpg";
import dressImg2 from "../assets/purse.jpg";
import dressImg3 from "../assets/makeups.jpg";
import dressImg4 from "../assets/dresses.jpg";

const Dress: React.FC = () => {

  const categories = ["Saree", "Shirt", "Jean", "Pant", "T-Shirt", "Panjabee", "Coat", "Suit"];

  const products = [
    { id: 1, name: "Floral Dress", brand: "Brand A", price: "$45", image: dressImg1 },
    { id: 2, name: "Summer Shirt", brand: "Brand B", price: "$25", image: dressImg2 },
    { id: 3, name: "Denim Jeans", brand: "Brand C", price: "$50", image: dressImg3 },
    { id: 4, name: "Casual Pant", brand: "Brand D", price: "$30", image: dressImg4 },
  ];

  return (
    <div>
      {/* Header / Banner Section */}
      <div
        className="m-[5%] mt-3 bg-gradient-to-br from-slate-300 via-indigo-100 to-slate-200 shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row"
        style={{ minHeight: "37vh" }}
      >
        {/* Text Container */}
        <div className="flex-1 p-6 flex flex-col justify-center">
          <h2 className="text-black text-3xl font-bold mb-2">Dress Collection</h2>
          <p className="text-black text-m font-bold">
            Explore our exclusive dress collection featuring the latest trends and styles. From casual wear to elegant evening outfits, find the perfect dress for any occasion. Each piece is designed with quality and comfort in mind.
          </p>
        </div>

        {/* Image */}
        <div className="md:w-1/2 w-full">
          <img
            src={shop}
            alt="Featured Product"
            className="w-full object-cover rounded-l-2xl"
          />
        </div>
      </div>

      {/* Categories & Products Section */}
      <div className="flex flex-col md:flex-row m-[5%] mt-6 gap-6">
        {/* Left Column - Categories */}
        <div className="md:w-1/4 bg-gray-100 rounded-2xl p-4 shadow-inner">
          <h3 className="text-lg font-bold mb-4">Categories</h3>
          <ul className="flex flex-col gap-3">
            {categories.map((cat) => (
              <li
                key={cat}
                className="block bg-gray-700/20 hover:bg-gray-700/40 text-gray-800 text-lg font-bold px-6 py-4 rounded-xl shadow-md transition justify-center"
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column - Products */}
        <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg p-4 flex flex-col justify-between"
            >
              {/* Product Image */}
              <div className="h-48 w-full mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover rounded-xl"
                />
              </div>
              <h4 className="font-bold text-lg">{product.name}</h4>
              <p className="text-gray-600">{product.brand}</p>
              <p className="text-indigo-600 font-semibold">{product.price}</p>
              <button className="mt-2 bg-red-500 text-white rounded-full px-4 py-1 hover:bg-red-600 transition-colors">
                ❤️ Love
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dress;
