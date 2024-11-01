import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TItem } from '@/pages/home-page';
import { valFilPersistedState } from '@/utils';

export const useFilStore = create(
  persist(
    (set) => ({
      items: [] as TItem[],
      setItems: (items: TItem[]) => set({ items, hasItems: items.length > 0 }),
      hasItems: false,

      itemsForVal: [] as TItem[], //itemsForValidation
      setItemsForVal: (items: TItem[]) => set({ itemsForVal: items, itemsCount: items.length }),
      itemsCount: 0,

      page: 1,
      limit: 4,
      param: 'title',
      setPage: (page: number) => set({ page }),
      setLimit: (limit: number) => set({ limit, page: 1 }),
      setParam: (param: string) => set({ param }),
    }),
    {
      name: 'filter-state',
      partialize: (state) => ({
        page: state.page,
        limit: state.limit,
        param: state.param,
        count: state.itemsCount, //count for maxlimit
      }),
      merge: valFilPersistedState,
    },
  ),
);
