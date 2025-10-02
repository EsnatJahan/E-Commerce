import React, { useState } from "react";

const Login: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Login successful!");
        // Save JWT in localStorag
        localStorage.setItem("token", data.token);
        window.location.href = "/"; 
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 via-pink-200 to-purple-100">
      <form onSubmit={handleSubmit} className="bg-purple-200 p-6 rounded-4xl shadow-md w-[37%] ">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-2 mb-3 border rounded"
        />
        <button type="submit" className="w-full bg-purple-500 text-white p-2 rounded">
          Login
        </button>
        {message && <p className="mt-3 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
