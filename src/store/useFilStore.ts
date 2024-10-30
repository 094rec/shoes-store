import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TItem } from '../pages/home-page';
import { z } from 'zod';

const paramSchema = z.coerce
  .string()
  .refine((val) => ['title', 'price', 'rank'].includes(val));

type FilState = {
  items: TItem[];
  setItems: (items: TItem[]) => void;
  hasItems: boolean;

  page: number;
  limit: number;
  active: number;
  param: string;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setActive: (active: number) => void;
  setParam: (param: string) => void;
};

export const useFilStore = create<FilState>()(
  persist(
    (set) => ({
      items: [],
      setItems: (items) => set({ items, hasItems: items.length > 0 }),
      hasItems: false,

      page: 1,
      limit: 4,
      active: 1,
      param: 'title',
      setPage: (page) => set({ page }),
      setLimit: (limit) => set({ limit, page: 1, active: 1 }),
      setActive: (active) => set({ active }),
      setParam: (param) => set({ param }),
    }),
    {
      name: 'filter-state',
      partialize: (state) => ({
        page: state.page,
        limit: state.limit,
        active: state.active,
        param: state.param,
      }),
      merge: (persistedState: any, currentState) => {
        const parsedParam = paramSchema.safeParse(persistedState?.param);
        return {
          ...currentState,
          ...persistedState,
          param: parsedParam.success ? parsedParam.data : 'title',
        };
      },
    },
  ),
);
