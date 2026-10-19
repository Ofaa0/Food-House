import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiFilter } from 'react-icons/fi';
import AddNewItemForm from '../components/AddNewItemForm';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import toast from 'react-hot-toast';
import axios from 'axios';

const AdminProducts = () => {
  const [showForm, setShowForm] = useState(false)

  const [menuItems, setMenuItems] = useState([])

  const getAllMenuItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/menu");
      console.log("Menu Items:", response.data?.data);
      setMenuItems( response.data?.data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  useEffect(() => {
    getAllMenuItems();
  }, []);
  const products = [
    { id: 1, name: 'Cheese Cake', category: 'Desserts', price: '$12.00', stock: 24, status: 'In Stock' },
    { id: 2, name: 'Strawberry Donut', category: 'Bakery', price: '$4.50', stock: 8, status: 'Low Stock' },
    { id: 3, name: 'Tropical Soda', category: 'Drinks', price: '$5.00', stock: 0, status: 'Out of Stock' },
    { id: 4, name: 'Blueberry Cupcake', category: 'Desserts', price: '$10.50', stock: 45, status: 'In Stock' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header & Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Products</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage your inventory and product listings</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="bg-red-500 cursor-pointer hover:bg-red-600 text-white text-xs font-bold py-2.5 px-5 rounded-full shadow-sm flex items-center justify-center gap-2 transition-all">
            {showForm ? <AiOutlineClose className="text-sm" /> : <FiPlus className="text-sm" />}
          <span>{showForm ? 'Cancel' : 'Add New Product'}</span>
        </button>
      </div>

          {showForm && <AddNewItemForm />}
      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-[#fcfcfc] border border-gray-200 text-gray-700 text-xs rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-gray-400 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none border border-gray-200 px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
            <FiFilter className="text-xs" />
            <span>Filter</span>
          </button>
          <select className="bg-[#fcfcfc] border border-gray-200 text-gray-700 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none">
            <option>All Categories</option>
            <option>Desserts</option>
            <option>Bakery</option>
            <option>Drinks</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#fcfcfc] border-b border-gray-100 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                <th className="py-3.5 px-6">Product</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs font-medium text-gray-700">
              {menuItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-gray-900">{item.name}</td>
                  <td className="py-4 px-4 text-gray-500">{item.category}</td>
                  <td className="py-4 px-4 font-bold text-gray-900">{item.price}</td>
                  <td className="py-4 px-4">{item.stock} items</td>
                  <td className="py-4 px-4">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md ${
                      item.status === 'In Stock' ? 'text-green-600 bg-green-50' :
                      item.status === 'Low Stock' ? 'text-amber-600 bg-amber-50' :
                      'text-red-600 bg-red-50'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors">
                        <FiEdit2 className="text-sm" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                        <FiTrash2 className="text-sm" />
                      </button>
                    </div>
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

export default AdminProducts;