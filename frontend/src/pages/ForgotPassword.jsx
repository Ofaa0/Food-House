import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useResetToken } from "../store/zus";

const ForgotPassword = () => {
  const {setResetToken} = useResetToken();
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
  });

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        {
          email: values.email,
        },
      );
      console.log(response.data);
      setResetToken(response.data?.data?.resetToken);
      setTimeout(() => {
        navigate(`/reset-password/${response.data?.data?.resetToken}`);
      }, 1000);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full h-dvh bg-white flex-center text-black overflow-hidden">
      <div className="container h-dvh px-4 lg:px-0 flex-center">
        <Formik
          initialValues={{ email: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form className="w-full  lg:w-100  border rounded-2xl shadow-2xl px-4 py-5 overflow-hidden">
            <h1 className="text-center text-2xl font-bold pb-4">
              Oh, You forgot the password
            </h1>
            <div className="h-full flex items-start justify-center flex-col gap-1 pb-4">
              <label htmlFor="email">E-mail</label>
              <Field
                type="email"
                id="email"
                name="email"
                className="py-2 bg-white border rounded-md px-4 w-full"
                placeholder="Type your email"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500"
              />
            </div>

            <button
              type="submit"
              className="bg-login-btn-color py-2 rounded-[90px] font-bold text-[16px] text-white cursor-pointer hover:bg-login-btn-color/95 transition-colors duration-150 w-full"
            >
              Send
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
