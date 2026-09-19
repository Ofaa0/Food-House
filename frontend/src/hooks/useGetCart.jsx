import axios from "axios";
import toast from "react-hot-toast";
import { useCartItems } from "../store/zus";
import { useEffect, useState } from "react";

export const useGetCart = () => {
  const {setCartItems} = useCartItems();
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(JSON.parse(sessionStorage.getItem("accessToken")));
  }, []);
  const addToCart = async (itemId,  qty = 1) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/cart/add`,
        {
          menuItemId: itemId,
          quantity: qty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Item added to cart!");
      console.log(res.data?.data);
      setCartItems(res.data?.data?.items);
      return res.data?.data; // Return the updated cart data
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };
  const delFromCart = async (itemId, qty) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/cart/update`,
        {
          menuItemId: itemId,
          quantity: qty - 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Item removed successfully!");
      console.log(res.data?.data);
      return res.data?.data; // Return the updated cart data
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };
  const remFromCart = async (itemId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/cart/remove/${itemId}`,
       
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Item removed from cart!");
      console.log(res.data?.data);
      return res.data?.data; // Return the updated cart data
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return { addToCart , delFromCart, remFromCart };
};
