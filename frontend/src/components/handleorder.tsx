import React, { useEffect, useState } from "react";

interface Order {
  _id: string;
  productName: string;
  productImage?: string;
  userName: string;
  userId: string;
  userEmail: string;
  type?: string;
  address?: string;
  phone?: string;
  quantity: number;
  size?: string;
  color?: string;
  status: string;
  createdAt: string;
  paymentMethod?: string;
}

const PendingOrdersPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Fetch pending orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/products/pending", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setOrders(data);
        //console
      } catch (err) {
        console.error("Error fetching pending orders:", err);
      }
    };
    fetchOrders();
  }, []);

  // Filter orders by type
  const filteredOrders = orders.filter((order) =>
    order.type?.toLowerCase().includes(search.toLowerCase())
  );

  // Delete order
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost3000/api/orders/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };
 console.log("Order length",orders.length)
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Pending Orders
      </h1>

      {/* Search bar */}
      <div className="flex justify-center mb-6">
        <select
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-400 rounded-lg px-4 py-2 w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
            <option className="font-bold text-gray-500" value="">Search product type here...</option>
            <option value="Dress">Dress</option>
            <option value="Shoes">Shoes</option>
            <option value="MakeUp">Make Up</option>
        </select>
      </div>

      {/* Orders table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 text-gray-800 text-sm uppercase">
            <tr>
              <th className="px-6 py-3 text-left font-semibold border-b">Product</th>
              <th className="px-6 py-3 text-left font-semibold border-b">User</th>
              <th className="px-6 py-3 text-left font-semibold border-b">Type</th>
              <th className="px-6 py-3 text-center font-semibold border-b">Details</th>
              <th className="px-6 py-3 text-center font-semibold border-b">Delete</th>
            </tr>
          </thead>

          <tbody>
        
            {orders.map((order, index) => (
              <tr
                key={order._id}
                className={`transition ${
                  index % 2 === 0 ? "bg-indigo-50" : "bg-purple-50"
                } hover:bg-blue-50`}
              >
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src={order.productImage || "/placeholder.jpg"}
                    alt={order.productName}
                    className="w-12 h-12 object-cover rounded-lg border"
                  />
                  <span className="font-medium text-gray-800">{order.productName}</span>
                </td>
                <td className="px-6 py-4 text-gray-700">{order.userName}</td>
                <td className="px-6 py-4 text-gray-700">{order.type}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
                  >
                    Details
                  </button>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
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
                  src={selectedOrder.productImage || "/placeholder.jpg"}
                  alt={selectedOrder.productName}
                  className="w-56 h-56 object-cover rounded-xl border"
                />
              </div>

              <div className="flex-1 space-y-3">
                <h3 className="text-xl font-semibold text-gray-800">
                  {selectedOrder.productName}
                </h3>

                <div className="grid grid-cols-2 gap-y-2 text-gray-700">
                  <p><b>Ordered By:</b> {selectedOrder.userName}</p>
                  <p><b>Email:</b> {selectedOrder.userEmail}</p>
                  <p><b>Date:</b> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                  <p><b>Quantity:</b> {selectedOrder.quantity}</p>
                  {selectedOrder.size && <p><b>Size:</b> {selectedOrder.size}</p>}
                  {selectedOrder.color && <p><b>Color:</b> {selectedOrder.color}</p>}
                  <p><b>Payment Method:</b> {selectedOrder.paymentMethod}</p>
                  <p><b>Address:</b> {selectedOrder.address}</p>
                  <p><b>Phone:</b> {selectedOrder.phone}</p>
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
                    Confirm
                  </button>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                    Delivered
                  </button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                    Cancel
                  </button>
                </div>
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
    </div>
  );
};

export default PendingOrdersPage;
