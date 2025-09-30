import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  category: string;
  brand: string;
  type: string;
  description: string;
  price: number;
  discount: number;
  sizes: string[];
  colors: string[];
  stock: number;
  images: string[];
}

const ProductDetail: React.FC = () => {
  const { id } = useParams(); // URL param
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  // Fetch main product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/products/GetProductDetail/${id}`);
        const data = await res.json();
        setProduct(data);
        if (data.images && data.images.length > 0) setMainImage(data.images[0]);

        // Fetch recommendations for same brand and type
        if (data.brand && data.type) {
          const recRes = await fetch(
            `http://localhost:3000/api/products/GetProductofBrand?brand=${data.brand}&type=${data.type}`
          );
          const recData: Product[] = await recRes.json();
          // Exclude current product from recommendations
          const filtered = recData.filter((p) => p._id !== data._id);
          setRecommendations(filtered);
        }
      } catch (err) {
        console.error("Failed to fetch product", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <h2 className="text-center mt-10">Loading product...</h2>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 pb-2 bg-white shadow-lg rounded-2xl">
      {/* Grid for images & details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 h-[80%]">
        {/* Left - Images */}
        <div>
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-[75vh] object-cover rounded-xl mb-4"
          />
          <div className="flex gap-4">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                onClick={() => setMainImage(img)}
                className={`h-24 w-24 object-cover rounded-lg cursor-pointer border-2 ${
                  mainImage === img ? "border-indigo-600" : "border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right - Details */}
        <div>
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <h3 className="text-xl font-semibold mb-2">{product.brand}</h3>
          <p className="text-gray-600 mb-2">Category: {product.category}</p>
          <p className="text-gray-500 mb-4">{product.description}</p>

          <div className="mb-4">
            {product.discount > 0 ? (
              <>
                <span className="text-2xl font-bold text-red-500 mr-2">
                  ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                </span>
                <span className="line-through text-gray-500">${product.price}</span>
                <span className="ml-2 text-green-600 font-semibold">
                  -{product.discount}%
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-indigo-600">${product.price}</span>
            )}
          </div>

          {/* Sizes */}
          {product.sizes.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold mb-1">Available Sizes:</h4>
              <div className="flex gap-2">
                {product.sizes.map((size, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 border rounded-md cursor-pointer hover:bg-indigo-100"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold mb-1">Available Colors:</h4>
              <div className="flex gap-2">
                {product.colors.map((color, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 border rounded-md cursor-pointer hover:bg-indigo-100"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stock */}
          <p className="mb-4">
            {product.stock > 0 ? (
              <span className="text-green-600 font-semibold">
                In Stock ({product.stock})
              </span>
            ) : (
              <span className="text-red-500 font-semibold">Out of Stock</span>
            )}
          </p>

          {/* Add to Cart */}
          {/* <button
            disabled={product.stock === 0}
            className={`px-6 py-2 rounded-lg transition ${
              product.stock === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 text-black hover:bg-purple-700"
            }`}
          >
            Add to Cart
          </button> */}
          <button className="px-6 py-2 rounded-lg bg-purple-600 text-black hover:bg-purple-700 transition">
            Add to Cart
          </button>
        </div>
      </div>

{/* Recommendation Section */}
{recommendations.length > 0 && (
  <section className="py-10 bg-gray-50 mt-10">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">You might also like</h2>
      <div className="relative">
        {/* Products Row */}
        <div id="recommendationRow" className="flex overflow-hidden space-x-4">
          {recommendations.map((rec) => (
            <div
              key={rec._id}
              className="bg-white rounded-3xl shadow-lg flex-shrink-0 w-[24%] cursor-pointer"
              onClick={() => navigate(`/product/${rec._id}`)}
            >
              <img
                src={rec.images[0]}
                alt={rec.name}
                className="p-4 w-full h-64 object-cover rounded-3xl"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{rec.name}</h3>
                <p className="text-indigo-600 mt-1 font-semibold">
                  ${rec.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Prev Button */}
        <button
          onClick={() => {
            const row = document.getElementById("recommendationRow");
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
            const row = document.getElementById("recommendationRow");
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
)}

    </div>
  );
};

export default ProductDetail;
