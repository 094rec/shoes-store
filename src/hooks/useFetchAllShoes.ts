import { useQuery } from '@tanstack/react-query';
import { TItem } from '../pages/home-page';

export const useFetchAllShoes = () => {
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

  return { data: data || [], isLoading, error };
};
