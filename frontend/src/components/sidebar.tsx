import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white fixed top-0 left-0 p-4">
      <h2 className="text-2xl font-bold mb-6">Menu</h2>
      <ul className="space-y-4">
        <li><a href="#" className="hover:text-blue-400">Dashboard</a></li>
        <li><a href="#" className="hover:text-blue-400">Profile</a></li>
        <li><a href="#" className="hover:text-blue-400">Settings</a></li>
        <li><a href="#" className="hover:text-blue-400">Logout</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
