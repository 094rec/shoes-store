import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartDataFromLS } from '../../utils/getCartDataFromLS';
import { RootState } from '../store';

export type TCartItem = {
  id: string;
  title: string;
  img: string;
  price: string;
  qnt: number;
};

type CartSlice = {
  items: TCartItem[];
  total: number;
  totalQnt: number;
};

const { items, total, totalQnt } = getCartDataFromLS();

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
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.totalQnt = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const { addItem, removeItem, delItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
