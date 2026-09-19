import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { useSearchQuery } from "../../store/zus";
import { useGetCart } from "../../hooks/useGetCart";
import { useNavigate } from "react-router-dom";

const PRODUCTS = [
  {
    id: 1,
    title: "Chocolate Cheesecake",
    price: "$20.99",
    rating: 5,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    title: "Chocolate Cheesecake",
    price: "$20.99",
    rating: 5,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    title: "Chocolate Cheesecake",
    price: "$20.99",
    rating: 5,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    title: "Chocolate Cheesecake",
    price: "$20.99",
    rating: 5,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    title: "Chocolate Cheesecake",
    price: "$20.99",
    rating: 5,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 6,
    title: "Chocolate Cheesecake",
    price: "$20.99",
    rating: 5,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 7,
    title: "Chocolate Cheesecake",
    price: "$20.99",
    rating: 5,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 8,
    title: "Chocolate Cheesecake",
    price: "$20.99",
    rating: 5,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 9,
    title: "Chocolate Cheesecake",
    price: "$20.99",
    rating: 5,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 10,
    title: "Chocolate Cheesecake",
    price: "$20.99",
    rating: 5,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 11,
    title: "Chocolate Cheesecake",
    price: "$20.99",
    rating: 5,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 12,
    title: "Chocolate Cheesecake",
    price: "$20.99",
    rating: 5,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 13,
    title: "Chocolate Cheesecake",
    price: "$20.99",
    rating: 5,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 14,
    title: "Chocolate Cheesecake",
    price: "$20.99",
    rating: 5,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 15,
    title: "Chocolate Cheesecake",
    price: "$20.99",
    rating: 5,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1621996346565-e3d5d6281288?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 16,
    title: "Chocolate Cheesecake",
    price: "$20.99",
    rating: 5,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
  },
];

const AllProducts = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [limit, setLimit] = useState(25);
  const [category, setCategory] = useState("");
  const { searchQuery } = useSearchQuery();
  const { addToCart } = useGetCart();
  const getAllMenuItems = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/menu`, {
        params: {
          limit: limit,
          category: category,
          name: searchQuery,
        },
      });
      console.log(res.data?.data);
      setMenuItems(res.data?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };
  useEffect(() => {
    getAllMenuItems();
  }, [limit, category, searchQuery]);
  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 md:px-8 font-sans antialiased text-gray-900">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
        {/* Header with Title & Page Indicators */}
        <div className="flex flex-col items-center mb-8 relative">
          {/* Section Title */}
          <div className="w-full text-left">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
              All Product
            </h2>
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {menuItems.map((product) => (
            <div
              
              key={product._id}
              className="bg-white rounded-2xl border border-gray-100 p-2.5 flex flex-col justify-between hover:shadow-md transition-all duration-200 group"
            >
              {/* Product Image */}
              <div
              onClick={() => {
                navigate(`/single-item/${product._id}`);
              }}
              className="w-full cursor-pointer aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-2.5 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="px-1">
                {/* Title */}
                <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-1 leading-snug truncate">
                  {product.name}
                </h3>

                {/* Price and Add to Cart Button */}
                <div className="flex items-center justify-between mt-1 mb-1.5">
                  <span className="text-xs md:text-sm font-bold text-red-500">
                    ${product.price.toFixed(2)}
                  </span>

                  {/* Red Cart Button */}
                  <button
                    onClick={() => addToCart(product._id)}
                    aria-label="Add to cart"
                    className="w-7 h-7 md:w-8 md:h-8 bg-red-500 hover:bg-red-600 active:scale-95 text-white rounded-full flex items-center justify-center transition-all shadow-xs cursor-pointer"
                  >
                    <FaShoppingCart className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  </button>
                </div>

                {/* Star Rating & Review Count */}
                <div className="flex items-center gap-1">
                  <div className="flex items-center text-amber-400 gap-0.5">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <FaStar
                        key={i}
                        className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current"
                      />
                    ))}
                  </div>
                  <span className="text-[10px] md:text-xs text-gray-400 font-normal">
                    ({product.stock})
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {}
        <div className="mt-10 flex justify-center">
          {limit < 100 && (
            <button
              className="border border-gray-300 hover:border-gray-900 text-gray-700 hover:text-black font-medium text-xs md:text-sm px-8 py-2 rounded-full transition-all duration-200 cursor-pointer hover:bg-gray-50 active:scale-95 shadow-2xs"
              onClick={() => setLimit((prev) => prev + 25)}
            >
              Load more 25+
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default AllProducts;
