import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


const AdminRecentOrders = () => {
  const [recentOrders, setRecentOrders] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("accessToken");

    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);
  const getAdminStates = async () => {
    if (!token) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/orders/admin/orders/recent`,

        {
          params: {
            limit: 5,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res.data?.data);
      setRecentOrders(res.data?.data);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  useEffect(() => {
    getAdminStates();
  }, [token]);

  return (
    <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">Recent Orders</h2>
        <Link
          to = {"/admin/a-orders"}
          className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors"
        >
          View all
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              <th className="pb-3">Order</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Total</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-xs font-medium text-gray-700">
            {recentOrders.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-400">
                  No recent orders found.
                </td>
              </tr>
            ) : (
              recentOrders.map((order, idx) => (
                <tr
                  key={order._id || idx}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-3.5 font-bold text-gray-900">
                    #{order.orderNumber || order._id?.slice(-6)}
                  </td>
                  <td className="py-3.5">
                    {order.user?.name || order.customer || "Guest"}
                  </td>
                  <td className="py-3.5 font-bold text-gray-900">
                    ${order.totalAmount.toFixed(2) || order.total}
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md ${
                        order.status === "confirmed" ||
                        order.status === "Delivered"
                          ? "text-green-600 bg-green-50"
                          : order.status === "pending" ||
                              order.status === "Processing"
                            ? "text-amber-600 bg-amber-50"
                            : "text-red-600 bg-red-50"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRecentOrders;
