import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FiShoppingBag,
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
  FiPlus,
  FiMoreVertical,
  FiLoader,
} from "react-icons/fi";
import AdminRecentOrders from "../components/AdminRecentOrders";
import AddNewItemForm from "../components/AddNewItemForm";

const AdminPage = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("accessToken");

    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    activeUsers: 0,
    conversionRate: "0%",
  });

  const getAdminStates = async () => {
    if (!token) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/orders/admin/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res.data?.data);
      setStats(res.data?.data);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  useEffect(() => {
    getAdminStates();
  }, [token]);

  const statCards = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: "+14%",
      icon: FiDollarSign,
    },
    {
      title: "Total Orders",
      value: stats.totalOrders.toLocaleString(),
      change: "+8%",
      icon: FiShoppingBag,
    },
    {
      title: "Active Users",
      value: stats.activeUsers.toLocaleString(),
      change: "+22%",
      icon: FiUsers,
    },
    {
      title: "Conversion Rate",
      value: stats.conversionRate,
      change: "+1.2%",
      icon: FiTrendingUp,
    },
  ];



  // if (loading) {
  //   return (
  //     <div className="min-h-[400px] flex items-center justify-center">
  //       <FiLoader className="animate-spin text-3xl text-red-500" />
  //     </div>
  //   );
  // }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 space-y-10 font-sans text-gray-800">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Manage your store, track orders, and add new products.
        </p>
      </div>

      {/* 1. Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-black text-gray-900">
                  {stat.value}
                </h3>
                <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-md inline-block mt-2">
                  {stat.change} this month
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center text-xl shrink-0">
                <Icon />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 2. Recent Orders Table (Left - 7 Cols) */}
        <AdminRecentOrders />

        {/* 3. Add Product Form (Right - 5 Cols) */}
        <AddNewItemForm />
      </div>
    </div>
  );
};

export default AdminPage;
