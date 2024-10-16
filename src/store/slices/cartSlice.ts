import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDataFromLS } from '../../utils';
import { RootState } from '..';

export type TCartItem = {
  id: string;
  title: string;
  img: string;
  price: number;
  qnt: number;
};

type CartSlice = {
  items: TCartItem[];
  total: number;
  totalQnt: number;
};

const { items, total, totalQnt } = getDataFromLS();

const initialState: CartSlice = {
  items,
  total,
  totalQnt,
};

const recalculate = (state: CartSlice) => {
  state.total = state.items.reduce((c, { price, qnt }) => c + Number(price) * qnt, 0);
  state.totalQnt = state.items.reduce((c, { qnt }) => c + qnt, 0);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<TCartItem>) => {
      const item = state.items.find((el) => el.id === action.payload.id);
      item ? item.qnt++ : state.items.push(action.payload);
      recalculate(state);
    },
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.items.find((el) => el.id === action.payload.id);
      if (item)
        if (item.qnt > 1) item.qnt--;
        else state.items = state.items.filter((el) => el.id !== action.payload.id);
      recalculate(state);
    },
    delItem: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter((el) => el.id !== action.payload.id);
      recalculate(state);
    },
    removeAllItems: (state) => {
      state.items = [];
      state.total = 0;
      state.totalQnt = 0;
    },
  },
});

export const selById = (id: string) => (state: RootState) => {
  return state.cart.items.find((el) => el.id === id);
};

export const leftOne = (id: string) => (state: RootState) => {
    return (state.cart.items.filter((el) => el.id !== id)).length === 0;
  };

export const selectCart = (state: RootState) => state.cart;
export const { addItem, removeItem, delItem, removeAllItems } = cartSlice.actions;

export default cartSlice.reducer;
