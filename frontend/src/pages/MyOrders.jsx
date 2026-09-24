import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiClock, FiCalendar, FiChevronDown } from "react-icons/fi";
import Modal from "../components/Modal";

const MyOrders = () => {
  const [token, setToken] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  useEffect(() => {
    setToken(JSON.parse(sessionStorage.getItem("accessToken")));
  }, []);

  const getMyOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res.data?.data);
      setOrders(res.data?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) getMyOrders();
  }, [token]);

  return (
    <div className="md:col-span-8 lg:col-span-9 bg-white rounded-2xl p-6 md:p-10 border border-gray-100 shadow-sm">
      {/* Previous Orders Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          Previous orders
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-[#f8f8f8] rounded-2xl p-5 space-y-4 border border-gray-100 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header & Status */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-gray-900">
                    {order._id}
                  </h3>
                  <span className="text-[10px] font-bold text-gray-500 bg-gray-200/60 px-2.5 py-0.5 rounded-md">
                    {order.status}
                  </span>
                </div>

                {/* Date & Time */}
                <div className="flex items-center gap-3 text-[11px] text-gray-400">
                  <div className="flex items-center gap-1">
                    <FiCalendar className="text-xs" />
                    <span>
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiClock className="text-xs" />
                    {new Date(order.createdAt).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-2 pt-2 border-t border-gray-200/60">
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-3 text-xs font-bold text-gray-800"
                    >
                      <span className="w-4 text-center">{item.quantity}</span>
                      <span>{item.menuItem?.name}</span>
                    </div>
                  ))}

                  {/* More Items Dropdown Badge */}
                  {/* {order.moreItems > 0 && (
                    <div className="flex items-center justify-between text-xs text-gray-500 font-semibold pt-1 cursor-pointer">
                      <span>{order.moreItems} More item</span>
                      <FiChevronDown className="text-sm" />
                    </div>
                  )} */}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3">
                <button
                  onClick={() => {
                    setSelectedOrder(order);
                  }}
                  type="button"
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-2.5 rounded-full shadow-sm transition-colors text-center"
                >
                  Details
                </button>
              
              </div>
            </div>
          ))}
        </div>
      </section>
      <Modal selectedOrder={selectedOrder} onClose={()=>{setSelectedOrder(null)}} />
    </div>
  );
};

export default MyOrders;
