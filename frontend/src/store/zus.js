import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useResetToken = create((set) => ({
  resetToken: null,
  setResetToken: (token) => set({ resetToken: token }),
}));
export const useGetUser = create(
  persist(
    (set) => ({
      currentUser: null,

      setCurrentUser: (user) =>
        set({
          currentUser: user,
        }),

      clearCurrentUser: () =>
        set({
          currentUser: null,
        }),
    }),
    {
      name: "currentUser",
      storage: {
        getItem: (name) => {
          const value = sessionStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    },
  ),
);
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
export const useProfileList = create((set) => ({
  isOpen: false,

  toggleProfile: () =>
    set((state) => ({
      isOpen: !state.isOpen,
    })),
}));