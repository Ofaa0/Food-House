import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCartItems } from "../store/zus";
// import { Heart, X, Plus, Minus, Check, ArrowLeft } from "lucide-react";
import { IoMdClose } from "react-icons/io";
import { GoArrowLeft, GoPlus } from "react-icons/go";
import { AiOutlineMinus } from "react-icons/ai";
import { useGetCart } from "../hooks/useGetCart";

const CartPage = () => {
  const { setCartItems } = useCartItems();
  const [cart, setCart] = useState([]);
  const { addToCart, delFromCart, remFromCart } = useGetCart();
  const totalCartPrice = cart.reduce((total, item) => {
    return total + item.menuItem?.price * item.quantity;
  }, 0);

  const getUserCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cart`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("accessToken"))}`,
        },
      });
      console.log(res.data?.data);
      setCartItems(res.data?.data?.items);
      setCart(res.data?.data?.items);
      } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };
  const handleAddToCart = async (item) => {
    const updatedCart = await addToCart(item.menuItem?._id);
    setCart(updatedCart.items);
    setCartItems(updatedCart.items);
  };
  const handleDelFromCart = async (item) => {
    const updatedCart = await delFromCart(
      item.menuItem?._id,
      item.quantity,
    );
    setCart(updatedCart.items);
    setCartItems(updatedCart.items);
  };
  const handleRemFromCart = async (item) => {
    const updatedCart = await remFromCart(item.menuItem?._id);
    setCart(updatedCart.items);
    setCartItems(updatedCart.items);
  };

  useEffect(() => {
    getUserCart();
  }, []);
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-8 font-sans antialiased text-gray-800">
      {/* Outer Card Container */}
      {cart.length > 0 ? (
        <div className="w-full max-w-4xl bg-[#F5F5F5] rounded-md shadow-sm border border-gray-200 p-6 md:p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Cart{" "}
              <span className="text-gray-400 font-normal text-xl">
                {cart.length}
              </span>
            </h1>
          </div>

          {/* Table/List Header */}
          <div className="bg-[#F5F5F5] rounded-sm px-4 py-3 grid grid-cols-12 text-xs font-semibold text-gray-700 items-center">
            <div className="col-span-6 md:col-span-5">Item</div>
            <div className="col-span-2 text-center hidden md:block">Price</div>
            <div className="col-span-3 md:col-span-2 text-center">Quantity</div>
            <div className="col-span-3 md:col-span-3 text-right pr-12 md:pr-14">
              Total Price
            </div>
          </div>

          {/* Cart Items List */}
          <div className="divide-y divide-gray-200 border-b border-gray-200">
            {cart.map((item) => (
              <div
                key={item.menuItem?._id}
                className="py-4 px-2 md:px-4 grid grid-cols-12 items-center gap-2 md:gap-4"
              >
                {/* Item Thumbnail & Description */}
                <div className="col-span-6 md:col-span-5 flex items-center gap-3 md:gap-4">
                  <img
                    src={item.menuItem?.image}
                    alt={item.menuItem?.name}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover shrink-0"
                  />
                  <div className="pr-2">
                    <h3 className="font-bold text-gray-900 text-xs md:text-sm leading-snug">
                      {item.menuItem?.name}
                    </h3>
                    <p className="text-[11px] md:text-xs text-gray-500 line-clamp-2 mt-0.5 leading-normal">
                      {item.menuItem?.description}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2 text-center text-xs md:text-sm font-medium text-gray-700 hidden md:block">
                  ${item.menuItem?.price}
                </div>

                {/* Quantity Controls Pill */}
                <div className="col-span-3 md:col-span-2 flex justify-center">
                  <div className="flex items-center bg-[#f4f4f4] rounded-full px-3 py-1 gap-3 text-gray-700">
                    <button
                      onClick={() => {
                        handleDelFromCart(item);
                      }}
                      className="text-gray-600 hover:text-black cursor-pointer"
                    >
                      <AiOutlineMinus />
                    </button>
                    <span className="text-xs md:text-sm font-medium select-none">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => {
                        handleAddToCart(item);
                      }}
                      className="text-gray-600 hover:text-black cursor-pointer"
                    >
                      <GoPlus />
                    </button>
                  </div>
                </div>

                {/* Total Price + Action Icons */}
                <div className="col-span-3 md:col-span-3 flex items-center justify-end gap-3 md:gap-5">
                  <span className="font-semibold text-xs md:text-sm text-gray-900">
                    ${(item.menuItem?.price * item.quantity).toFixed(2)}
                  </span>

                  {/* Heart / Favorite Icon */}
                  {/* <button className="text-red-500 hover:opacity-80">
                  <Heart size={16} className="fill-red-500 text-red-500" />
                </button> */}

                  {/* Remove Icon */}
                  <button
                    onClick={() => {
                      handleRemFromCart(item);
                    }}
                    className="text-gray-800 hover:text-black cursor-pointer"
                  >
                    <IoMdClose />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Promocode & Discount Bar */}
          <div className="py-5 px-2 md:px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs md:text-sm font-medium text-gray-800">
                Promocode
              </span>

              {/* Promocode Pill Input Badge */}
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-1 bg-white text-xs md:text-sm font-medium text-gray-800 gap-2">
                <span>HAPPY</span>
                {/* <Check size={14} className="text-gray-800 stroke-[2.5]" /> */}
              </div>

              <span className="text-xs md:text-sm text-gray-700 font-normal">
                Congrats! You have 10% discount
              </span>
            </div>

            {/* Discount Text */}
            <div className="text-xs md:text-sm text-gray-800 font-normal self-end sm:self-center">
              Discount:{" "}
              <span className="font-bold text-gray-900">
                ${(totalCartPrice * 0.1).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Bottom Bar Footer */}
          <div className="pt-6 px-2 md:px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Back Link */}
            <a
              href="#shopping"
              className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-900 hover:underline"
            >
              <GoArrowLeft />
              Back to shopping
            </a>

            {/* Total Price & Checkout Button */}
            <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
              <div className="text-xs md:text-sm font-normal text-gray-800">
                Total Price:{" "}
                <span className="font-bold text-sm md:text-base text-gray-900 ml-1">
                  ${(totalCartPrice - totalCartPrice * 0.1).toFixed(2)}
                </span>
              </div>

              <button className="bg-[#111] hover:bg-black text-white text-xs md:text-sm font-medium px-6 py-2.5 rounded-full">
                Check out
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-600 text-5xl ">Your cart is empty</p>
        </div>
      )}
    </div>
  );
};

export default CartPage;