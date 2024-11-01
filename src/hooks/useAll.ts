import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { TItem } from '@/pages/home-page';
import { useAllStore, useFilStore } from '@/store';

type FilState = {
  setItemsForVal: (items: TItem[]) => void;
};

export const useAll = () => {
  const setItems = useAllStore((state) => state.setItems);
  const setItemsForVal = useFilStore((state: FilState) => state.setItemsForVal);
  const { data, isLoading, error } = useQuery<TItem[]>({
    queryKey: ['all-shoes'],
    queryFn: async () => {
      const res = await fetch(`https://66efa6eff2a8bce81be3ba6e.mockapi.io/items`);
      if (!res.ok) throw new Error('Bad network response');
      return await res.json();
    },
    staleTime: 1000 * 60 * 10,
    retry: false,
  });

  React.useEffect(() => {
    setItems(data || []); //for pagination and colors-bg-singlepage
    setItemsForVal(data || []); //for validate
  }, [data, setItems, setItemsForVal]);

  return { data: data || [], isLoading, error };
};
