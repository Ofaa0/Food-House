import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FiGrid,
  FiBox,
  FiShoppingBag,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiBell,
  FiSearch,
} from "react-icons/fi";

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: FiGrid, toLink: "/admin" },
    { id: "products", label: "Products", icon: FiBox, toLink: "a-products" },
    { id: "orders", label: "Orders", icon: FiShoppingBag, toLink: "a-orders" },
    {
      id: "settings",
      label: "Settings",
      icon: FiSettings,
      toLink: "a-settings",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-gray-800 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 p-6 flex flex-col justify-start gap-6 hidden md:flex shrink-0">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-xl bg-red-500 flex items-center justify-center text-white font-extrabold text-sm">
              A
            </div>
            <span className="text-lg font-black text-gray-900 tracking-tight">
              AdminPanel
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <Link
                  to={item.toLink}
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "text-red-500 bg-red-50/50"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon
                    className={`text-base ${isActive ? "text-red-500" : "text-gray-400"}`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-gray-500 hover:text-red-500 hover:bg-red-50/50 transition-all">
          <FiLogOut className="text-base" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}
        <header className="bg-white border-b border-gray-100 py-4 px-6 sm:px-8 flex items-center justify-between">
          {/* <div className="relative w-64 md:w-80">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full bg-[#fcfcfc] border border-gray-200 text-gray-700 text-xs rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div> */}

          <div className="flex items-center gap-4">
            <button className="relative w-9 h-9 rounded-xl border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
              <FiBell className="text-sm" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>
            </button>
            <div className="flex items-center gap-3 pl-2 border-l border-gray-100">
              <div className="w-8 h-8 rounded-full bg-gray-200 font-bold text-xs flex items-center justify-center text-gray-700">
                AD
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-gray-900 leading-tight">
                  Admin User
                </p>
                <p className="text-[10px] text-gray-400">admin@store.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content Area */}
        <main className="flex-1 container mx-auto px-4 sm:px-8 py-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
