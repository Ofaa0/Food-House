import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    password: Yup.string().required().min(5),
  });

  const handleSubmit =async (values) => {
    console.log(values);
    console.log(token,"|||");
    
    if (token) {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/auth/reset-password/${token}`,
          {
            password: values.password,
          },
        );
        console.log(response.data);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Invalid or expired reset token.");
    }
  };
  return (
    <div className="w-full h-dvh bg-white flex-center text-black overflow-hidden">
      <div className="container h-dvh px-4 lg:px-0 flex-center">
        <Formik
          initialValues={{ password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form className="w-full  lg:w-100  border rounded-2xl shadow-2xl px-4 py-5 overflow-hidden">
            <h1 className="text-center text-2xl font-bold pb-4">
              Create new password
            </h1>
            <div className="h-full flex items-start justify-center flex-col gap-1 pb-4">
              <label htmlFor="password">Password</label>
              <span className="w-full relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="py-2 bg-white border rounded-md px-4 w-full"
                  placeholder="Type your new password"
                />
                {showPassword ? (
                  <LiaEyeSolid
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-2xl"
                  />
                ) : (
                  <LiaEyeSlashSolid
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-2xl"
                  />
                )}
              </span>
              <ErrorMessage
                name="password"
                component="P"
                className="text-red-500"
              />
            </div>

            <button
              type="submit"
              className="bg-login-btn-color py-2 rounded-[90px] font-bold text-[16px] text-white cursor-pointer hover:bg-login-btn-color/95 transition-colors duration-150 w-full"
            >
              Reset
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
export default ResetPassword;
