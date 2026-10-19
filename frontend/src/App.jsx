import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
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
import ProfileLayout from "./layouts/ProfileLayout";
import UserInfoPage from "./pages/UserInfoPage";
import UpdatePassword from "./pages/UpdatePassword";
import MyPayments from "./pages/MyPayments";
import MyOrders from "./pages/MyOrders";
import AdminPage from "./pages/AdminPage";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminSettings from "./pages/AdminSettings";
import ProtectedAdmin from "./routes/ProtectedAdmin";

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
              <Route path="/my-info" element={<ProfileLayout />}>
                <Route index element={<UserInfoPage />}></Route>
                <Route
                  path="update-password"
                  element={<UpdatePassword />}
                ></Route>
                <Route path="my-payments" element={<MyPayments />}></Route>
                <Route path="my-orders" element={<MyOrders />}></Route>
              </Route>
                <Route
                  path="/admin"
                  element={
                    <ProtectedAdmin>
                      <AdminLayout />
                    </ProtectedAdmin>
                  }
                >
                  <Route index element={<AdminPage />}></Route>
                  <Route path="a-products" element={<AdminProducts />}></Route>
                  <Route path="a-orders" element={<AdminOrders />}></Route>
                  <Route path="a-settings" element={<AdminSettings />}></Route>
                </Route>
            </Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/sign-up" element={<SignupPage />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route
              path="/reset-password/:token"
              element={<ResetPassword />}
            ></Route>
            <Route
              path="*"
              element={<h1 className="text-black">Not found</h1>}
            ></Route>
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" />
      </div>
    </>
  );
}

export default App;
