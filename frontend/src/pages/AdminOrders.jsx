import { FiSearch, FiFilter, FiEye, FiDownload } from 'react-icons/fi';

const AdminOrders = () => {
  const orders = [
    { id: '#ORD-12345', customer: 'Pham Tran Lan', date: 'Sep 28, 2026', total: '$19.50', payment: 'Visa', status: 'Completed' },
    { id: '#ORD-12346', customer: 'John Doe', date: 'Sep 28, 2026', total: '$34.00', payment: 'Mastercard', status: 'Pending' },
    { id: '#ORD-12347', customer: 'Sarah Smith', date: 'Sep 27, 2026', total: '$12.50', payment: 'Apple Pay', status: 'Processing' },
    { id: '#ORD-12348', customer: 'Ahmed Hassan', date: 'Sep 26, 2026', total: '$52.00', payment: 'Cash on Delivery', status: 'Canceled' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Orders</h1>
          <p className="text-xs text-gray-400 mt-0.5">Track and manage all customer orders</p>
        </div>
        <button className="border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold py-2.5 px-5 rounded-full shadow-sm flex items-center justify-center gap-2 transition-all">
          <FiDownload className="text-sm" />
          <span>Export Orders</span>
        </button>
      </div>

      {/* Search & Status Filters */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search order ID or customer..."
            className="w-full bg-[#fcfcfc] border border-gray-200 text-gray-700 text-xs rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-gray-400 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none border border-gray-200 px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
            <FiFilter className="text-xs" />
            <span>Filter</span>
          </button>
          <select className="bg-[#fcfcfc] border border-gray-200 text-gray-700 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none">
            <option>All Statuses</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Canceled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#fcfcfc] border-b border-gray-100 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                <th className="py-3.5 px-6">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs font-medium text-gray-700">
              {orders.map((order, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-gray-900">{order.id}</td>
                  <td className="py-4 px-4 font-semibold text-gray-800">{order.customer}</td>
                  <td className="py-4 px-4 text-gray-400">{order.date}</td>
                  <td className="py-4 px-4 text-gray-500">{order.payment}</td>
                  <td className="py-4 px-4 font-bold text-gray-900">{order.total}</td>
                  <td className="py-4 px-4">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md ${
                      order.status === 'Completed' ? 'text-green-600 bg-green-50' :
                      order.status === 'Pending' ? 'text-amber-600 bg-amber-50' :
                      order.status === 'Processing' ? 'text-blue-600 bg-blue-50' :
                      'text-red-600 bg-red-50'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors">
                      <FiEye className="text-base" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminOrders;