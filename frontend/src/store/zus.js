import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useResetToken = create((set) => ({
  resetToken: null,
  setResetToken: (token) => set({ resetToken: token }),
}));

export const useCartItems = create(
  persist(
    (set) => ({
      cartItems: [],

      setCartItems: (items) => set({ cartItems: items }),
    }),
    {
      name: "cartItems",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useSearchQuery = create(
  (set) => ({
    searchQuery: "",

    setSearchQuery: (query) => set({ searchQuery: query }),
  })
);