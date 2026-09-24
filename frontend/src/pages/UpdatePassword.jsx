import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

const UpdatePassword = () => {
  const changePassword = async (currentPassword, newPassword) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/users/change-password",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("accessToken"))}`,
          },
        },
      );

      toast.success(res.data?.message || "Password changed successfully!");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update password",
      );
    }
  };

  const initialValues = {
    newPassword: "",
    currentPassword: "",
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New Password is required"),
    currentPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Old Password is required"),
  });

  const handleSubmit = async(values) => {
    console.log("Password Update Requested:", values.newPassword);
    console.log("Password Update Requested:", values.currentPassword);

   await changePassword(values.currentPassword, values.newPassword);
  };

  return (
    <div className="md:col-span-8 lg:col-span-9 bg-white rounded-2xl p-6 md:p-10 border border-gray-100 shadow-sm">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Main Content Area */}
        <div className="md:col-span-12 lg:col-span-12 bg-white rounded-2xl p-6 md:p-10 border border-gray-100 shadow-sm space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Login and security
            </h1>
          </div>

          {/* Login Section with Formik */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Login</h2>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-gray-900 mb-1">
                        New Password
                      </label>

                      {/* Field input for updating password if needed */}
                      <div className="max-w-xs">
                        <Field
                          type="password"
                          name="newPassword"
                          placeholder="Enter new password"
                          className="w-full bg-[#fcfcfc] border border-gray-300 text-gray-700 py-1.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gray-500 transition-colors"
                        />
                        <ErrorMessage
                          name="newPassword"
                          component="p"
                          className="mt-1 text-[10px] text-red-500"
                        />
                      </div>
                      <label className="block text-xs font-bold text-gray-900 mb-1 pt-3">
                        Old Password
                      </label>
                      <div className="max-w-xs">
                        <Field
                          type="password"
                          name="currentPassword"
                          placeholder="Enter new password"
                          className="w-full bg-[#fcfcfc] border border-gray-300 text-gray-700 py-1.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gray-500 transition-colors"
                        />
                        <ErrorMessage
                          name="currentPassword"
                          component="p"
                          className="mt-1 text-[10px] text-red-500"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="px-5 py-2 border cursor-pointer border-gray-900 rounded-full text-xs font-bold text-gray-900 hover:bg-gray-900 hover:text-white transition-colors whitespace-nowrap duration-300"
                      >
                        Update password
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          {/* Social Accounts Section */}
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
