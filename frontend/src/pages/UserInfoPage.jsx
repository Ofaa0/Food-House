import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiX } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import { useGetUser } from "../store/zus";

const UserInfoPage = () => {
  const [token, setToken] = useState(null);
  const { currentUser } = useGetUser();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("accessToken");
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);
  console.log("currentUser:", currentUser);

  const updateUserInfo = async (name, email, phone, address) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/users/profile",
        {
          name: name,
          email: email,
          phone: phone,
          address: address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Updated Profile:", res.data?.data);
      toast.success(res.data?.message || "Profile updated successfully!");
      if (setSubmitted) setSubmitted(true);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const initialValues = {
    displayName: "",
    name: currentUser.name,
    phone: "",
    email: currentUser.email,
    address: "",
  };

  const validationSchema = Yup.object({
    displayName: Yup.string(),
    name: Yup.string().required("Name is required"),
    phone: Yup.string(),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    address: Yup.string(),
  });

  const handleSubmit = async (values) => {
    const { name, email, phone, address } = values;

    if (token) {
      await updateUserInfo(name, email, phone, address);
    } else {
      toast.error("Please login first!");
    }
  };

  return (
    <div className="md:col-span-8 lg:col-span-9 bg-white rounded-2xl p-6 md:p-10 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Personal info
        </h1>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting, resetForm }) => (
          <Form className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Account info
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 mb-1">
                    DISPLAY NAME
                  </label>
                  <Field
                    type="text"
                    name="displayName"
                    placeholder="Enter your display name"
                    className="w-full bg-[#fcfcfc] border border-gray-300 text-gray-700 py-2.5 px-3.5 rounded-xl text-xs font-medium focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-400"
                  />
                  <ErrorMessage
                    name="displayName"
                    component="p"
                    className="mt-1 text-[10px] text-red-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 mb-1">
                    REAL NAME
                  </label>

                  <Field
                    type="text"
                    name="name"
                    className={`w-full bg-[#fcfcfc] border ${
                      touched.name && errors.name
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-700 py-2.5 px-3.5 rounded-xl text-xs font-medium focus:outline-none focus:border-gray-500 transition-colors uppercase`}
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="mt-1 text-[10px] text-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 mb-1">
                    PHONE
                  </label>
                  <Field
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    className="w-full bg-[#fcfcfc] border border-gray-300 text-gray-700 py-2.5 px-3.5 rounded-xl text-xs font-medium focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-400"
                  />
                  <ErrorMessage
                    name="phone"
                    component="p"
                    className="mt-1 text-[10px] text-red-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 mb-1">
                    EMAIL
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className={`w-full bg-[#fcfcfc] border ${
                      touched.email && errors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-700 py-2.5 px-3.5 rounded-xl text-xs font-medium focus:outline-none focus:border-gray-500 transition-colors`}
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="mt-1 text-[10px] text-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 mb-1">
                  YOUR ADDRESS
                </label>
                <Field
                  type="text"
                  name="address"
                  placeholder="123 Ave, Newyork"
                  className="w-full bg-[#fcfcfc] border border-gray-300 text-gray-700 py-2.5 px-3.5 rounded-xl text-xs font-medium focus:outline-none focus:border-gray-500 transition-colors"
                />
                <ErrorMessage
                  name="address"
                  component="p"
                  className="mt-1 text-[10px] text-red-500"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#4F56F6] hover:bg-[#3d43d8] text-white text-xs font-bold py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50"
              >
                Update profile
              </button>

              <button
                type="button"
                onClick={() => resetForm()}
                className="flex items-center gap-1.5 text-xs font-bold text-gray-900 hover:text-red-500 transition-colors py-2 px-3"
              >
                <FiX className="text-sm" />
                <span>Clear all</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserInfoPage;
