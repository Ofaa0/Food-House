import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CartPage from "./pages/CartPage";
import MenuPage from "./pages/MenuPage";
import SingleItemPage from "./pages/SingleItemPage";
import BlogsPage from "./pages/BlogsPage";
import SingleBlogPage from "./pages/SingleBlogPage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <>
      <div className="w-full min-h-dvh bg-white">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />}></Route>
              <Route path="/cart" element={<CartPage />}></Route>
              <Route path="/menu" element={<MenuPage />}></Route>
              <Route
                path="/single-item/:itemId"
                element={<SingleItemPage />}
              ></Route>
              <Route path="/blog" element={<BlogsPage />}></Route>
              <Route
                path="/single-blog/:blogId"
                element={<SingleBlogPage />}
              ></Route>
              <Route path="/about" element={<AboutUsPage />}></Route>
              <Route path="/contact" element={<ContactUsPage />}></Route>
              <Route path="/checkout" element={<CheckoutPage />}></Route>
            </Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/sign-up" element={<SignupPage />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route
              path="/reset-password/:token"
              element={<ResetPassword />}
            ></Route>
            <Route path="*" element={<h1 className="text-black">Not found</h1>}></Route>
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" />
      </div>
    </>
  );
}

export default App;
