import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaHeart,
  FaRegHeart,
  FaShoppingCart,
  FaStar,
  FaUtensils,
} from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useGetCart } from "../hooks/useGetCart";

const SingleItemPage = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart, delFromCart } = useGetCart();
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Show interactive feedback toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };
  const getSingleItem = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/menu/${itemId}`);
      console.log(res.data?.data);
      setItem(res.data?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getSingleItem();
  }, [itemId]);

  return (
    <div className="min-h-screen w-full bg-slate-50/60 flex items-center justify-center p-4 md:p-8 font-sans antialiased text-slate-800">
      {/* Toast Alert */}
      {/* {toastMessage && (
        <div className="fixed top-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl z-50 text-sm font-medium animate-bounce flex items-center gap-2">
          <span>✨</span> {toastMessage}
        </div>
      )} */}

      
      <div className="w-full container max-w-9xl bg-white rounded-3xl p-5 md:p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 md:gap-10 items-stretch transition-all duration-300 hover:shadow-md">
        
        <div className="w-full md:w-1/2 flex-shrink-0">
          <div className="w-full h-72 md:h-[400px] rounded-2xl md:rounded-3xl overflow-hidden bg-slate-100 relative group">
            <img
              src={item?.image}
              alt={item?.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          </div>
        </div>

        {}
        <div className="w-full md:w-1/2 flex flex-col justify-between py-2">
          <div>
            {/* Title & Favorite Button Header */}
            <div className="flex items-center justify-between gap-4 mb-3">
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#1a233a] tracking-tight">
                {item?.name}
              </h1>

              <button
                onClick={() => {
                  setIsFavorite(!isFavorite);
                  showToast(
                    isFavorite
                      ? "Removed from favorites"
                      : "Added to favorites!",
                  );
                }}
                className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:border-slate-400 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer flex-shrink-0"
                aria-label="Add to favorite"
              >
                {isFavorite ? (
                  <FaHeart className="w-5 h-5 text-red-500 animate-in zoom-in-50 duration-200" />
                ) : (
                  <FaRegHeart className="w-5 h-5 text-slate-700" />
                )}
              </button>
            </div>

            {/* Price */}
            <div className="text-2xl md:text-3xl font-extrabold text-[#ff0000] mb-4">
              ${item?.price?.toFixed(2)}
            </div>

            {/* Description */}
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed mb-6 font-normal">
              {item?.description}
            </p>

            {}
            <div className="flex items-center gap-6 mb-8 text-xs md:text-sm">
              {/* Star Rating */}
              <div className="flex items-center gap-2">
                <FaStar className="w-4 h-4 text-amber-400 fill-current" />
                <span className="font-bold text-slate-900">4,8</span>
                <span className="text-slate-400 font-normal">(1,873)</span>
              </div>

              {/* Category / Food Type */}
              <div className="flex items-center gap-2 text-slate-600">
                <FaUtensils className="w-3.5 h-3.5 text-slate-800" />
                <span className="font-semibold text-slate-800">Cake</span>
              </div>
            </div>

            {}
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => {
                  decrementQuantity();
                }}
                disabled={quantity <= 1}
                className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-800 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-90"
                aria-label="Decrease quantity"
              >
                <FiMinus className="w-4 h-4 stroke-[2.5]" />
              </button>

              <span className="text-base md:text-lg font-bold text-slate-800 w-6 text-center select-none">
                {quantity}
              </span>

              <button
                onClick={() => {
                  incrementQuantity();
                }}
                className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-800 hover:bg-slate-100 transition-all active:scale-90"
                aria-label="Increase quantity"
              >
                <FiPlus className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {}
          <div className="flex items-center gap-3 md:gap-4 pt-2">
            {/* Order Now Button */}
            <button
              onClick={() =>
                showToast(`Ordering ${quantity} Chocolate CheeseCake(s)...`)
              }
              className="flex-1 bg-[#ff0000] hover:bg-[#e60000] active:scale-[0.98] text-white text-xs md:text-sm font-bold py-3.5 px-6 rounded-full transition-all shadow-sm hover:shadow-md cursor-pointer text-center"
            >
              Order Now
            </button>

            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart(item._id, quantity)}
              className="border border-slate-300 hover:border-slate-800 text-slate-700 hover:text-slate-900 active:scale-[0.98] text-xs md:text-sm font-semibold py-3.5 px-5 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer bg-white"
            >
              <FaShoppingCart className="w-3.5 h-3.5 text-[#ff0000]" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleItemPage;
