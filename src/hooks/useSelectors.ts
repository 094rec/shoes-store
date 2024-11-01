import { useCartStore } from '@/store';

export const useItemById = (id: string) =>
  useCartStore((state) => state.items.find((el) => el.id === id));

export const useLeftOne = (id: string) =>
  useCartStore((state) => state.items.filter((el) => el.id !== id).length === 0);
