import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    if (values.checkbox) {
      console.log(values);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/signup",
          {
            name: values.name,
            email: values.email,
            password: values.password,
          },
        );
        console.log(response.data.data);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        toast.success("Account created successfully!");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error(
        "You must agree to the Terms and Conditions and Privacy Policy to create an account.",
      );
    }
  };
  const validationSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().required().email(),
    password: Yup.string().required().min(5),
  });
  return (
    <div className="w-full bg-white h-screen text-black overflow-x-hidden flex-center py-4">
      <div className="container h-full overflow-hidden flex">
        <div className="w-1/2 bg-gray-400 relative">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={5}
            slidesPerView={1}
            autoplay={{ delay: 5000 }}
            loop={true}
          >
            <SwiperSlide>
              <img
                src="/login-images/pic1.jpg"
                className="h-full w-full object-cover"
                alt="pic1"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/login-images/pic2.jpg"
                className="h-full w-full object-cover"
                alt="pic2"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/login-images/pic3.jpg"
                className="h-full w-full object-cover"
                alt="pic3"
              />
            </SwiperSlide>
          </Swiper>

          {/* overlay layer */}

          <div className="w-full h-full absolute top-0 left-0 bg-black/70 z-50">
            <div className="container h-full flex-center">
              <div className="p-13 h-full w-full">
                <div
                  id="logo"
                  className="px-4 p-2 bg-white rounded-[90px] w-fit"
                >
                  <img
                    src="/login-images/logo.png"
                    alt="logo"
                    className="w-20 object-cover"
                  />
                </div>
                <div className="w-full h-full pt-33.75">
                  <h1 className="text-[40px] text-white font-medium">
                    Welcome to Food House!
                  </h1>
                  <p className="text-white text-lg pt-8.75">
                    Discover the best food delivery experience at your
                    fingertips. Order now and enjoy delicious meals delivered
                    straight to your door!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/*  form section ?*/}
        </div>
        <div className="w-full lg:w-1/2 h-full flex-center overflow-auto">
          <div className="conatiner w-full flex-center h-full">
            <div className="w-full h-full p-13 flex-center ">
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  checkbox: false,
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <Form className="w-full h-full px-4 flex-center flex-col items-start! ">
                  <h1 className="text-3xl font-medium pb-3">Welcome back!</h1>
                  <p className=" pb-7.5">Meet the good taste today</p>
                  <div className="w-full h-full flex flex-col gap-7.5">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="name">Full name</label>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        className="py-2 bg-white border rounded-md px-4"
                        placeholder="Type your name"
                      />
                      <ErrorMessage
                        name="name"
                        component="P"
                        className="text-red-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="email">E-mail</label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className="py-2 bg-white border rounded-md px-4"
                        placeholder="Type your email"
                      />
                      <ErrorMessage
                        name="email"
                        component="P"
                        className="text-red-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="password">Password</label>
                      <span className="w-full relative">
                        <Field
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          className="py-2 bg-white border rounded-md px-4 w-full"
                          placeholder="Type your password"
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
                    <div className="gap-1 flex items-start">
                      <Field
                        type="checkbox"
                        id="checkbox"
                        name="checkbox"
                        className="checkbox checkbox-neutral  w-4 h-4 rounded-none  border mt-1"
                        placeholder="Type your password"
                      />
                      <label htmlFor="checkbox" className="pl-2">
                        By creating an account means you agree to the{" "}
                        <b>Terms and Conditions</b>, and our{" "}
                        <b>Privacy Policy</b>
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="bg-login-btn-color py-2 rounded-[90px] font-bold text-[16px] text-white cursor-pointer hover:bg-login-btn-color/95 transition-colors duration-150"
                    >
                      Sign In
                    </button>
                    <p className="text-sm text-gray-500 text-center">
                      or do it via other accounts
                    </p>
                    <div className="w-full flex-center gap-8">
                      <FcGoogle className="text-2xl cursor-pointer" />
                      <FaApple className="text-2xl cursor-pointer" />
                      <FaFacebook className="text-blue-600 text-2xl cursor-pointer" />
                    </div>
                    <p className="text-sm text-gray-500 cursor-pointer text-center">
                      Do you have an account?
                      <Link
                        to="/login"
                        className="text-login-btn-color underline"
                      >
                        {" "}
                        Login
                      </Link>
                    </p>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
