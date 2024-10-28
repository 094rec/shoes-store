import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FilterState = {
  page: number;
  limit: number;
  active: number;
  param: string;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setActive: (active: number) => void;
  setParam: (param: string) => void;
};

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
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
    },
  ),
);