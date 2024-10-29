import {
  useFetchAllShoes,
  useFetchFilteredShoes,
  useSetDataToLS,
} from '../../hooks';
import { heroapi } from '../../data/initData';
import { useSearchStore } from '../../store';
import { Cart, Loader, NotFound } from '../../components';
import { Hero, Items, Pagination } from '..';

export type TItem = {
  id: string;
  title: string;
  text: string;
  rank: number;
  img: string;
  imgs?: string[];
  price: number;
  color: string;
  shadow: string;
};

export const HomePage = () => {
  const { searchVal } = useSearchStore();

  const { data, isLoading, error } = useFetchFilteredShoes();
  const hasItems = (data || []).length > 0;

  const { data: dataAll, error: errorAll } = useFetchAllShoes();

  useSetDataToLS({ dataAll });

  return (
    <>
      {error && null}
      {errorAll && null}
      <Cart />
      {!searchVal && <Hero {...heroapi} />}
      <Loader
        type="moon"
        color="#227cdf"
        size={window.innerWidth > 640 ? 80 : 65}
        loading={isLoading}
      />
      {!isLoading && (
        <>
          <Items
            searchVal={searchVal}
            items={data}
          />
          {!hasItems && !searchVal && (
            <NotFound
              title="Shoes not found. Please try to reload an App"
              className="-mt-8 mb-10 text-red-900/90 md:text-2xl"
            />
          )}
          {hasItems && !searchVal && !errorAll && (
            <Pagination
              data={dataAll}
            />
          )}
        </>
      )}
    </>
  );
};
