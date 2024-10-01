import { useQuery } from '@tanstack/react-query';
import { TItem } from '../pages/home-page/index.tsx';

export const useFetchAllShoes = () => {
  const { data, isLoading, error } = useQuery<TItem[]>({
    queryKey: ['fshoes'],
    queryFn: async () => {
      const res = await fetch(`https://66efa6eff2a8bce81be3ba6e.mockapi.io/items`);
      if (!res.ok) throw new Error('Bad network response');
      return await res.json();
    },
    staleTime: 1000 * 60 * 10,
  });

  return { data: data || [], isLoading, error };
};
