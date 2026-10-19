import React from 'react';

const AdminSettings = () => {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Settings</h1>
        <p className="text-xs text-gray-400 mt-0.5">Manage your store preferences and profile configurations</p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
          General Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 mb-1">
              STORE NAME
            </label>
            <input
              type="text"
              defaultValue="Bakery & Desserts"
              className="w-full bg-[#fcfcfc] border border-gray-200 text-gray-700 py-2.5 px-3.5 rounded-xl text-xs font-medium focus:outline-none focus:border-gray-400"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 mb-1">
              SUPPORT EMAIL
            </label>
            <input
              type="email"
              defaultValue="support@store.com"
              className="w-full bg-[#fcfcfc] border border-gray-200 text-gray-700 py-2.5 px-3.5 rounded-xl text-xs font-medium focus:outline-none focus:border-gray-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 mb-1">
            CURRENCY
          </label>
          <select className="w-full sm:w-1/2 bg-[#fcfcfc] border border-gray-200 text-gray-700 py-2.5 px-3.5 rounded-xl text-xs font-medium focus:outline-none">
            <option>USD ($)</option>
            <option>EUR (€)</option>
            <option>EGP (E£)</option>
          </select>
        </div>

        <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
          <button className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-2.5 px-6 rounded-full shadow-sm transition-all">
            Save Changes
          </button>
          <button className="text-xs font-bold text-gray-500 hover:text-gray-900 px-4 py-2.5">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;