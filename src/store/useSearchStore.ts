import { create } from 'zustand';

type SearchState = {
  searchVal: string;
  setSearchVal: (val: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchVal: '',
  setSearchVal: (val) => set({ searchVal: val }),
}))