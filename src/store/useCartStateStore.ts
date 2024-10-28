import { create } from 'zustand';

type CartState = {
  cartState: boolean;
  setCartState: (state: boolean) => void;
};

export const useCartStateStore = create<CartState>((set) => ({
  cartState: false,
  setCartState: (state) => set({ cartState: state }),
}));