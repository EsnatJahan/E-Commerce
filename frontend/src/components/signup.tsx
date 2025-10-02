import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";


const SignUp: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [dialog, setDialog] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ mark this async to use await
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setDialog({ open: true, message: "Passwords do not match!" });
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (res.ok) {
        setDialog({ open: true, message: "✅ Account created successfully!" });
        localStorage.setItem("token", data.token);
      } else {
        setDialog({
          open: true,
          message: `❌ ${data.message || "Signup failed"}`,
        });
      }
    } catch (error) {
      console.error(error);
      setDialog({
        open: true,
        message: "⚠️ Something went wrong. Try again later.",
      });
    }




  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 via-pink-200 to-purple-100 p-10">
      <div className="bg-purple-200 shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Signup */}
        <div className="flex justify-center space-x-4 text-purple-500">
          <a href="#" className="hover:text-purple-700 transition">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="hover:text-purple-700 transition">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="hover:text-purple-700 transition">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="hover:text-purple-700 transition">
            <FaLinkedin size={24} />
          </a>
        </div>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-purple-600 font-medium hover:underline"
          >
            Log In
          </a>
        </p>
      </div>

      {/* Custom Dialog */}
      {dialog.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <p className="text-lg text-gray-700">{dialog.message}</p>
            <button
              onClick={() => setDialog({ ...dialog, open: false })}
              className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
