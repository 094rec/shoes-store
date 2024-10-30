import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { TItem } from '../pages/home-page';
import { useFilStore, useSearchStore } from '../store';

export const useFil = () => {
  const { page, limit, param } = useFilStore();
  const { searchVal } = useSearchStore();
  const setItems = useFilStore((state) => state.setItems);
  const { data, isLoading, error } = useQuery<TItem[]>({
    queryKey: ['shoes', page, limit, searchVal, param],
    queryFn: async () => {
      const res = await fetch(
        `https://66efa6eff2a8bce81be3ba6e.mockapi.io/items?${searchVal ? '' : `l=${limit}&p=${page}&`}${searchVal ? `title=${searchVal}&` : ''}sortBy=${param}${param === 'rank' ? '&order=desc' : ''}`,
      );
      if (!res.ok) throw new Error('Bad network response');
      return await res.json();
    },
    staleTime: 1000 * 60 * 1,
    retry: 1,
  });

  React.useEffect(() => {
    setItems(data || []);
  }, [data, setItems]);

  return { data: data ?? [], isLoading, error };
};
