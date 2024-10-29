import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type TCartItem = {
  id: string;
  title: string;
  img: string;
  price: number;
  qnt?: number;
};

type CartState = {
  items: TCartItem[];
  total: number;
  totalQnt: number;
  incItem: (newItem: Omit<TCartItem, 'qnt'>) => void;
  decItem: (id: string) => void;
  removeItem: (id: string) => void;
  removeAllItems: () => void;
  selById: (id: string) => TCartItem | undefined;
  leftOne: (id: string) => boolean;
};

const recalculate = (state: CartState) => {
  state.total = state.items.reduce((c, { price, qnt }) => c + price * (qnt ?? 0), 0);
  state.totalQnt = state.items.reduce((c, { qnt }) => c + (qnt ?? 0), 0);
};

export const useCartStore = create<CartState>()(
  persist(
    devtools(
      immer((set, get) => ({
        items: [],
        total: 0,
        totalQnt: 0,

        incItem: (addingItem) =>
          set((state) => {
            const item = state.items.find((el) => el.id === addingItem.id);
            if (item) item.qnt = (item.qnt ?? 0) + 1;
            else state.items.push({ ...addingItem, qnt: 1 });
            recalculate(state);
          }),

        decItem: (id) =>
          set((state) => {
            const item = state.items.find((el) => el.id === id);
            if (item) {
              if ((item.qnt ?? 0) > 1) item.qnt! --;
              else state.items = state.items.filter((el) => el.id !== id);
            } 
            recalculate(state);
          }),

        removeItem: (id) =>
          set((state) => {
            state.items = state.items.filter((el) => el.id !== id);
            recalculate(state);
          }),

        removeAllItems: () =>
          set((state) => {
            state.items = [];
            state.total = 0;
            state.totalQnt = 0;
          }),

        selById: (id) => {
          return get().items.find((el) => el.id === id);
        },

        leftOne: (id) => {
          return get().items.filter((el) => el.id !== id).length === 0;
        },

      })),
    ),
    {
      name: 'cart-state',
      partialize: (state) => ({
        items: state.items,
        total: state.total,
        totalQnt: state.totalQnt,
      }),
    },
  ),
);