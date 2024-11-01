import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { TItem } from '@/pages/home-page';
import { useFilStore, useSearchStore } from '@/store';

const fetchItems = async (page: number, limit: number, searchVal: string, param: string) => {
  const baseUrl = 'https://66efa6eff2a8bce81be3ba6e.mockapi.io/items';
  const queryParams = new URLSearchParams({
    ...(searchVal ? { title: searchVal } : { l: limit.toString(), p: page.toString() }),
    sortBy: param,
    ...(param === 'rank' ? { order: 'desc' } : {}),
  });
  const res = await fetch(`${baseUrl}?${queryParams}`);
  if (!res.ok) throw new Error('Bad network response');
  return await res.json();
};

export const useFil = () => {
  const { page, limit, param, setItems } = useFilStore();
  const searchVal = useSearchStore((state) => state.searchVal);
  const { data, isLoading, error } = useQuery<TItem[]>({
    queryKey: ['shoes', page, limit, searchVal, param],
    queryFn: () => fetchItems(page, limit, searchVal, param),
    staleTime: 1000 * 60 * 1,
    retry: 1,
  });

  React.useEffect(() => {
    setItems(data || []);
  }, [data, setItems]);

  return { data: data ?? [], isLoading, error };
};
