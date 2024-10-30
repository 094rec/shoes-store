import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TItem } from '../pages/home-page';

type AllState = {
  items: TItem[];
  setItems: (items: TItem[]) => void;
  itemsCount: number;
};

export const useAllStore = create<AllState>()(
  persist((set) => ({
    items: [],
    setItems: (newItems) => set({ items: newItems, itemsCount: newItems.length }),
    itemsCount: 0,
  }),
  {
    name: 'colors-state',
    partialize: (state) => ({
      colors: state.items.map((el) => ({id: el.id, color: el.color})),
    }),
  },
));
