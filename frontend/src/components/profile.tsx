import React, { useEffect, useState } from "react";

interface User {
  role: "admin" | "user";
  name: string;
  email: string;
  address: string;
  phone: string;
}

interface Order {
  _id: string;
  productName: string;
  productImage?: string;
  address?: string;
  phone?: string;
  quantity: number;
  size?: string;
  color?: string;
  status: string;
  createdAt: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  // Fetch user + orders
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:3000/api/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setUpdateForm({
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
        });
      });

    const fetchOrders = async () => {
      const res = await fetch("http://localhost:3000/api/users/my-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setOrders(data);
      else console.error("Failed to fetch orders", data);
    };
    fetchOrders();
  }, []);

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:3000/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateForm),
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 relative">
      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl w-[90%] max-w-3xl shadow-2xl p-8 relative animate-fadeIn">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold text-center mb-6 border-b pb-3 text-gray-800">
              Order Details
            </h2>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <img
                  src={selectedOrder.productImage}
                  alt={selectedOrder.productName}
                  className="w-56 h-56 object-cover rounded-xl border"
                />
              </div>

              <div className="flex-1 space-y-3">
                <h3 className="text-xl font-semibold text-gray-800">
                  {selectedOrder.productName}
                </h3>

                <div className="grid grid-cols-2 gap-y-2 text-gray-700">
                  <p>
                    <b>Quantity:</b> {selectedOrder.quantity}
                  </p>
                  {selectedOrder.size && (
                    <p>
                      <b>Size:</b> {selectedOrder.size}
                    </p>
                  )}
                  {selectedOrder.color && (
                    <p>
                      <b>Color:</b> {selectedOrder.color}
                    </p>
                  )}
                  <p>
                    <b>Status:</b>{" "}
                    <span
                      className={`font-semibold ${
                        selectedOrder.status?.toLowerCase() === "pending"
                          ? "text-yellow-600"
                          : selectedOrder.status?.toLowerCase() === "shipped"
                          ? "text-blue-600"
                          : selectedOrder.status?.toLowerCase() === "delivered"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {selectedOrder.status}
                    </span>
                  </p>
                  <p>
                    <b>Address:</b> {selectedOrder.address}
                  </p>
                  <p>
                    <b>Phone:</b> {selectedOrder.phone}
                  </p>
                </div>

                {selectedOrder.status.toLowerCase() === "pending" && (
                  <div className="mt-6 flex flex-wrap gap-4">
                    <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
                      Request Change
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                      Cancel Order
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Section */}
      {user && (
         <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl shadow-lg border border-gray-100 mb-8">
          {/* <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl shadow-lg border border-indigo-200"> */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-1">
                  {user.role === "admin" ? "Admin Dashboard" : "My Profile"}
                </h1>
                <p className="text-gray-600 text-sm">
                  Welcome back, <b>{user.name}</b> 👋
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="mt-4 md:mt-0 bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>

            {/* User Info Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {["name", "email", "phone", "address"].map((field) => (
                <div
                  key={field}
                  className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
                >
                  <p className="text-sm text-gray-500 capitalize">
                    {field === "name"
                      ? "Full Name"
                      : field === "email"
                      ? "Email Address"
                      : field === "phone"
                      ? "Phone Number"
                      : "Address"}
                  </p>

                  {isEditing ? (
                    <input
                      type={field === "email" ? "email" : "text"}
                      className="w-full mt-1 p-2 border rounded-md"
                      value={updateForm[field as keyof typeof updateForm]}
                      onChange={(e) =>
                        setUpdateForm({
                          ...updateForm,
                          [field]: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <h3 className="text-lg font-semibold text-gray-800 mt-1">
                      {user[field as keyof User]}
                    </h3>
                  )}
                </div>
              ))}
            </div>

            {/* Update Button */}
            <div className="mt-8 text-center">
              {isEditing ? (
                <button
                  onClick={handleUpdateProfile}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md transition"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md transition"
                >
                  Update Profile
                </button>
              )}
            </div>

            {/* Admin Notice */}
            {user.role === "admin" && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium text-center">
                You have <b>admin privileges</b> to manage users and orders.
              </div>
            )}
          </div>
        // </div>
      )}

      {/* Orders Table */}
      <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          My Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-600 text-center">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-indigo-200 text-gray-700 text-sm uppercase">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold border-b">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left font-semibold border-b">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left font-semibold border-b">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center font-semibold border-b">
                    Details
                  </th>
                  <th className="px-6 py-3 text-center font-semibold border-b">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id} className={`transition ${index % 2 === 0 ? "bg-indigo-100" : "bg-indigo-50"} hover:bg-sky-50`}>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={order.productImage}
                        alt={order.productName}
                        className="w-12 h-12 object-cover rounded-lg border"
                      />
                      <span className="font-medium text-gray-800">
                        {order.productName}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status.toLowerCase() === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status.toLowerCase() === "shipped"
                            ? "bg-blue-100 text-blue-700"
                            : order.status.toLowerCase() === "delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-blue-600 transition"
                      >
                        Details
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
