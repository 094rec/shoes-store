import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { TItem } from '@/pages/home-page';
import { useAllStore } from '@/store';

export const useAll = () => {
  const setItems = useAllStore((state) => state.setItems);
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
    setItems(data || []);
  }, [data, setItems]);

  return { data: data || [], isLoading, error };
};
