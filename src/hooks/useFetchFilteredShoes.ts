import { useQuery } from '@tanstack/react-query';
import { TItem } from '../pages/home-page';
import { request } from '../utils';

const getData = async (url: string) => {
  return await request(url);
};

export const useFetchFilteredShoes = ([...par], url: string) => {
  const { data, isLoading, error } = useQuery<TItem[]>({
    queryKey: [par],
    queryFn: () => getData(url),
    staleTime: 1000 * 60 * 1,
    retry: 1,
  });
  return { data: data ?? [], isLoading, error };
};
