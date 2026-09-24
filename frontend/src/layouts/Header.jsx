import { Link } from "react-router-dom";
import { navLinks } from "../data/Lists";
import { FiShoppingCart } from "react-icons/fi";
import { LuUserRound } from "react-icons/lu";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { useCartItems, useProfileList } from "../store/zus";
import ProfileMenu from "../components/ProfileMenu";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const isLoggedIn = JSON.parse(sessionStorage.getItem("accessToken"));
  const { cartItems } = useCartItems();
  const { toggleProfile } = useProfileList();
  return (
    <header className="w-full py-5 flex-center relative border-b ">
      <div className="container px-4 lg:px-0 h-full flex justify-between items-center">
        <div className="flex-center ">
          <span>
            <img
              src="./login-images/logo.png"
              className="w-27.25 lg:pr-8 lg:border-r-2 border-[#E6E8EC]"
              alt="logo"
            />
          </span>
          <nav
            className={`lg:pl-8 lg:justify-center lg:items-center lg:flex-row lg:gap-8 lg:static fixed inset-0 z-90 flex flex-col gap-4 h-dvh bg-white lg:h-auto py-8 lg:p-0 lg:translate-0  ${!showMobileMenu ? "-translate-y-250" : "translate-y-0"} duration-500`}
          >
            <div className="lg:hidden flex justify-between items-center px-4 pb-4">
              <span>
                <img
                  src="./login-images/logo.png"
                  className="w-27.25 lg:pr-8 lg:border-r-2 border-[#E6E8EC]"
                  alt="logo"
                />
              </span>
              <AiOutlineClose
                onClick={() => {
                  setShowMobileMenu(false);
                }}
                className="text-gray-600 text-2xl cursor-pointer"
              />
            </div>
            {navLinks.map((link, i) => (
              <Link
                onClick={() => {
                  setShowMobileMenu(false);
                }}
                className="lg:text-black-text font-bold lg:text-[16px] leading-4 text-gray-500 hover:border-l-2 hover:text-black-text lg:hover:border-l-0 duration-100 px-4 py-7 lg:py-0 text-xl"
                key={link.id}
                to={link.linkTo}
              >
                {link.linkName}
              </Link>
            ))}
          </nav>
        </div>
        <div className="text-black-text flex-center gap-4 lg:gap-8">
          {isLoggedIn ? (
            <div className="flex-center gap-8 text-2xl">
              <Link to={"/cart"} className="relative ">
                <FiShoppingCart />
                <span className="absolute -right-3 -top-1 bg-red-600 text-white w-5 h-5 rounded-full flex-center text-[12px]">
                  {cartItems.length}
                </span>
              </Link>

              <span className="relative cursor-pointer">
                <LuUserRound
                  onClick={toggleProfile}
                />
                <ProfileMenu />
              </span>
            </div>
          ) : (
            <div className="flex-center gap-4">
              <Link
                to={"/login"}
                className="bg-main-dark-red border border-main-dark-red px-6 py-2  font-bold text-[16px] text-white cursor-pointer hover:scale-95 transition-colors duration-[1]"
              >
                Login
              </Link>
              <Link
                to={"/sign-up"}
                className="bg-transparent border border-main-dark-red px-6 py-2  font-bold text-[16px] text-main-dark-red cursor-pointer hover:scale-95 transition-colors duration-[1]"
              >
                Signup
              </Link>
            </div>
          )}

          <HiOutlineMenuAlt4
            className="cursor-pointer lg:hidden"
            onClick={() => {
              setShowMobileMenu(true);
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
