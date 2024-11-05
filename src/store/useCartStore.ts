import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { initCartStore, TCartItem, valCartPersistedState } from '@/utils';

type CartState = {
  items: TCartItem[];
  total: number;
  totalQnt: number;
};

const initCart = {
  items: [],
  total: 0,
  totalQnt: 0,
};

const recalculate = (state: CartState) => {
  state.total = state.items.reduce((c, { price, qnt }) => c + price * (qnt ?? 0), 0);
  state.totalQnt = state.items.reduce((c, { qnt }) => c + (qnt ?? 0), 0);
};

export const incItem = (addingItem: Omit<TCartItem, 'qnt'>) =>
  useCartStore.setState((state) => {
    const item = state.items.find((el) => el.id === addingItem.id);
    if (item) item.qnt = (item.qnt ?? 0) + 1;
    else state.items.push({ ...addingItem, qnt: 1 });
    recalculate(state);
  });

export const decItem = (id: string) =>
  useCartStore.setState((state) => {
    const item = state.items.find((el) => el.id === id);
    if (item) {
      if ((item.qnt ?? 0) > 1) item.qnt = (item.qnt ?? 0) - 1;
      else state.items = state.items.filter((el) => el.id !== id);
    }
    recalculate(state);
  });

export const removeItem = (id: string) =>
  useCartStore.setState((state) => {
    state.items = state.items.filter((el) => el.id !== id);
    recalculate(state);
  });

export const removeAllItems = () =>
  useCartStore.setState((state) => {
    state.items = [];
    state.total = 0;
    state.totalQnt = 0;
  });

export const useCartStore = create<CartState>()(
  persist(
    immer(
      devtools(() => initCart, {
        name: 'cartstore',
      }),
    ),
    {
      name: 'cart-state',
      partialize: (state) => ({
        items: state.items,
        total: state.total,
        totalQnt: state.totalQnt,
      }),
      //zod validation
      merge: valCartPersistedState,
    },
  ),
);
//pre-check data(before zod validation)
initCartStore();
