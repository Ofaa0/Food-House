import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import {
  FiUser,
  FiLock,
  FiCreditCard,
  FiTag,
  FiAward,
  FiShoppingBag,
  FiX,
} from "react-icons/fi";

const ProfileLayout = () => {
  const [activeTab, setActiveTab] = useState("personal-info");
  //   const [submitted, setSubmitted] = useState(false);

  // عناصر القائمة الجانبية
  const sidebarItems = [
    {
      id: "personal-info",
      label: "Personal info",
      icon: FiUser,
      linkTo: "/my-info",
    },
    {
      id: "login-security",
      label: "Login and security",
      icon: FiLock,
      linkTo: "/my-info/update-password",
    },
    {
      id: "my-payments",
      label: "My payments",
      icon: FiCreditCard,
      linkTo: "/my-info/my-payments",
    },

    {
      id: "my-orders",
      label: "My orders",
      icon: FiShoppingBag,
      linkTo: "/my-info/my-orders",
    },
  ];
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6 md:p-12 font-sans text-gray-800">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Sidebar Menu */}
        <div className="md:col-span-4 lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Link
                to={item.linkTo}
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "text-red-500 bg-red-50/50"
                    : "text-gray-700 hover:text-black hover:bg-gray-50"
                }`}
              >
                <Icon
                  className={`text-base ${isActive ? "text-red-500" : "text-gray-600"}`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Main Content Area */}
        {/* <div className="md:col-span-8 lg:col-span-9 bg-white rounded-2xl p-6 md:p-10 border border-gray-100 shadow-sm">
          
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Personal info
            </h1>
            <button
              type="button"
              className="px-4 py-1.5 border border-gray-900 rounded-full text-xs font-bold text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
            >
              View profile
            </button>
          </div>

          {submitted && (
            <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 text-xs rounded-lg">
              Profile updated successfully!
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-8">
            
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Account info
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 mb-1">
                    DISPLAY NAME
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    placeholder="Enter your display name"
                    value={formik.values.displayName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full bg-[#fcfcfc] border border-gray-300 text-gray-700 py-2.5 px-3.5 rounded-xl text-xs font-medium focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 mb-1">
                    REAL NAME
                  </label>
                  <input
                    type="text"
                    name="realName"
                    value={formik.values.realName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full bg-[#fcfcfc] border ${
                      formik.touched.realName && formik.errors.realName
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } text-gray-700 py-2.5 px-3.5 rounded-xl text-xs font-medium focus:outline-none focus:border-gray-500 transition-colors uppercase`}
                  />
                  {formik.touched.realName && formik.errors.realName && (
                    <p className="mt-1 text-[10px] text-red-500">{formik.errors.realName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 mb-1">
                    PHONE
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full bg-[#fcfcfc] border border-gray-300 text-gray-700 py-2.5 px-3.5 rounded-xl text-xs font-medium focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 mb-1">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full bg-[#fcfcfc] border ${
                      formik.touched.email && formik.errors.email
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } text-gray-700 py-2.5 px-3.5 rounded-xl text-xs font-medium focus:outline-none focus:border-gray-500 transition-colors`}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-1 text-[10px] text-red-500">{formik.errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 mb-1">
                  YOUR ADDRESS
                </label>
                <input
                  type="text"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-[#fcfcfc] border border-gray-300 text-gray-700 py-2.5 px-3.5 rounded-xl text-xs font-medium focus:outline-none focus:border-gray-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Social
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 mb-1">
                    WEBSITE
                  </label>
                  <input
                    type="text"
                    name="website"
                    placeholder="Your site URL"
                    value={formik.values.website}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full bg-[#fcfcfc] border border-gray-300 text-gray-700 py-2.5 px-3.5 rounded-xl text-xs font-medium focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 mb-1">
                    TWITTER
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      name="twitter"
                      placeholder="@twitter username"
                      value={formik.values.twitter}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full bg-[#fcfcfc] border border-gray-300 text-gray-700 py-2.5 px-3.5 pr-28 rounded-xl text-xs font-medium focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-400"
                    />
                    <button
                      type="button"
                      className="absolute right-1.5 px-3 py-1 border border-gray-900 rounded-full text-[10px] font-bold text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
                    >
                      Verify account
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex items-center gap-4">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="bg-[#4F56F6] hover:bg-[#3d43d8] text-white text-xs font-bold py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50"
              >
                Update profile
              </button>

              <button
                type="button"
                onClick={() => formik.resetForm()}
                className="flex items-center gap-1.5 text-xs font-bold text-gray-900 hover:text-red-500 transition-colors py-2 px-3"
              >
                <FiX className="text-sm" />
                <span>Clear all</span>
              </button>
            </div>

          </form>

        </div> */}
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
