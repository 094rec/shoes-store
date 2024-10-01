import { useQuery } from '@tanstack/react-query';
import { TItem } from '../pages/home-page';

export const useFetchOne = (id: string) => {
  const { data, isLoading, error } = useQuery<TItem>({
    queryKey: ['shoe', id],
    queryFn: async () => {
      const res = await fetch(`https://66efa6eff2a8bce81be3ba6e.mockapi.io/items/${id}`);
      if (!res.ok) throw new Error('Bad network response');
      return await res.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  return { data: data || ({} as TItem), isLoading, error };
};