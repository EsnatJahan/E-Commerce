import React, { useState } from "react";

const AddProduct: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    category: "",
    description: "",
    brand: "",
    price: "",
    discount: "",
    sizes: [] as string[],
    colors: [] as string[],
    stock: "",
    createdAt: "",
  });

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle array changes (sizes/colors)
  const handleArrayChange = (field: "sizes" | "colors", value: string, idx: number) => {
    const arr = [...formData[field]];
    arr[idx] = value;
    setFormData({ ...formData, [field]: arr });
  };

  // Add new size/color input
  const addArrayField = (field: "sizes" | "colors") => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  // Remove size/color input
  const removeArrayField = (field: "sizes" | "colors", idx: number) => {
    const arr = formData[field].filter((_, i) => i !== idx);
    setFormData({ ...formData, [field]: arr });
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();

    // Append text fields
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => data.append(key, v));
      } else {
        data.append(key, value);
      }
    });

    // Append images
    images.forEach((img) => data.append("images", img));

    try {
      const res = await fetch("http://localhost:3000/api/products/add-product", {
        method: "POST",
        body: data, // Do NOT set Content-Type manually
      });

      const result = await res.json();
      if (res.ok) {
        alert("Product added successfully!");
        setFormData({
          name: "",
          type: "",
          category: "",
          description: "",
          brand: "",
          price: "",
          discount: "",
          sizes: [],
          colors: [],
          stock: "",
          createdAt: "",
        });
        setImages([]);
      } else {
        console.error(result);
        alert("Failed to add product");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Add New Product</h2>

      {/* Image Upload */}
        <div className="mb-6">
        <label className="block font-semibold mb-2 text-gray-700">Product Images</label>
        <div className="flex flex-wrap gap-4">
            {images.map((img, idx) => (
            <div key={idx} className="w-32 h-32 border rounded-xl overflow-hidden">
                <img src={URL.createObjectURL(img)} alt={`upload-${idx}`} className="w-full h-full object-cover" />
            </div>
            ))}

            {/* Add more image button */}
            <label className="w-32 h-32 border-2 border-dashed border-gray-400 flex justify-center items-center rounded-xl cursor-pointer hover:bg-gray-50">
            <span className="text-3xl text-gray-500">+</span>
            <input
                type="file"
                name="images"  // <--- Important! Must match backend multer key
                multiple
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
            />
            </label>
        </div>
        </div>


      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

        {/* Product Name */}
        <div>
          <label className="block font-semibold mb-1">Product Name</label>
          <input type="text" name="name" className="border rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange} value={formData.name} required />
        </div>

        {/* Product Type */}
        <div>
          <label className="block font-semibold mb-1">Product Type</label>
          <select name="type" className="border rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange} value={formData.type} required>
            <option value="">Select Type</option>
            <option value="Dress">Dress</option>
            <option value="Shoes">Shoes</option>
            <option value="Make Up">Make Up</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold mb-1">Category</label>
          <input type="text" name="category" className="border rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange} value={formData.category} />
        </div>

        {/* Brand */}
        <div>
          <label className="block font-semibold mb-1">Brand</label>
          <input type="text" name="brand" className="border rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange} value={formData.brand} />
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block font-semibold mb-1">Description</label>
          <textarea name="description" className="border rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-indigo-400"
            rows={3} onChange={handleChange} value={formData.description}></textarea>
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold mb-1">Price</label>
          <input type="number" name="price" className="border rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange} value={formData.price} />
        </div>

        {/* Discount */}
        <div>
          <label className="block font-semibold mb-1">Discount (%)</label>
          <input type="number" name="discount" className="border rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange} value={formData.discount} />
        </div>

        {/* Sizes */}
        <div className="col-span-2">
          <label className="block font-semibold mb-2">Sizes</label>
          {formData.sizes.map((size, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input type="text" value={size} placeholder="S, M, L or 7, 8, 9"
                className="border rounded px-2 py-1 w-32"
                onChange={(e) => handleArrayChange("sizes", e.target.value, idx)} />
              <button type="button" className="bg-red-500 text-white px-2 rounded"
                onClick={() => removeArrayField("sizes", idx)}>Remove</button>
            </div>
          ))}
          <button type="button" className="bg-green-500 text-white px-4 py-1 rounded"
            onClick={() => addArrayField("sizes")}>Add Size</button>
        </div>

        {/* Colors */}
        <div className="col-span-2">
          <label className="block font-semibold mb-2">Colors</label>
          {formData.colors.map((color, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input type="text" value={color} placeholder="Red, Blue, Black..."
                className="border rounded px-2 py-1 w-32"
                onChange={(e) => handleArrayChange("colors", e.target.value, idx)} />
              <button type="button" className="bg-red-500 text-white px-2 rounded"
                onClick={() => removeArrayField("colors", idx)}>Remove</button>
            </div>
          ))}
          <button type="button" className="bg-green-500 text-white px-4 py-1 rounded"
            onClick={() => addArrayField("colors")}>Add Color</button>
        </div>

        {/* Stock */}
        <div>
          <label className="block font-semibold mb-1">Stock</label>
          <input type="number" name="stock" className="border rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange} value={formData.stock} />
        </div>

        {/* Created At */}
        <div>
          <label className="block font-semibold mb-1">Created At</label>
          <input type="date" name="createdAt" className="border rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange} value={formData.createdAt} />
        </div>

        {/* Submit */}
        <div className="col-span-2 text-center mt-4">
          <button type="submit" className="bg-indigo-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-indigo-700 transition">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
