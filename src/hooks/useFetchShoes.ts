import { useQuery } from '@tanstack/react-query';
import { request } from '../utils/api';
import { TItem } from '../pages/home-page/index.tsx';

const getData = async (url: string) => {
  return await request(url);
};

export const useFetchShoes = ([...par], url: string) => {
  const { data, isLoading, error } = useQuery<TItem[]>({
    queryKey: [par],
    queryFn: () => getData(url),
    staleTime: 1000 * 60 * 5,
  });
  return { data: data ?? [], isLoading, error };
};
