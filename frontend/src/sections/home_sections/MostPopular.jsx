import toast from "react-hot-toast";
import SectionHeader from "../../components/SectionHeader";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCartItems } from "../../store/zus";
import { useGetCart } from "../../hooks/useGetCart";

const MostPopular = () => {
  const [popItems, setPopItems] = useState([]);
  // const [token, setToken] = useState(null);
  const { addToCart } = useGetCart();

  const getMostPopular = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/menu/popular`);
      console.log(res.data?.data);
      setPopItems(res.data?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getMostPopular();
    // setToken(JSON.parse(sessionStorage.getItem("accessToken")));
  }, []);

  

  return (
    <div className="set-section text-black">
      <div className="container px-4 lg:px-0 h-full">
        <SectionHeader title="Most Popular" subtitle="Our Exclusive Cakes" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-13">
          {popItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md pb-6.5"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-68.25 object-cover rounded-md"
              />
              <div className="px-6.25 pt-12">
                <div className="flex justify-between items-start font-pop py-1 lg:py-0">
                  <div className="flex flex-col gap-2 text-[#141416]">
                    <h3 className="text-[16px] leading-6 font-medium ">
                      {item.name}
                    </h3>
                    <p className="text-[12px] leading-5">{item.description}</p>
                  </div>
                  <p className="text-[16px] font-medium leading-6 text-main-dark-red border border-gray-500 rounded-sm p-2">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <button
                  className="cursor-pointer bg-main-dark-red hover:bg-main-dark-red/90  text-white px-4 py-3 rounded-[90px] mt-5  transition-colors duration-300"
                  onClick={() => {
                    addToCart(item._id);
                  }}
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MostPopular;
