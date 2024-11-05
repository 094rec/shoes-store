import { useAll, useFil } from '@/hooks';
import { heroapi } from '@/data/initData';
import { useFilStore, useSearchStore } from '@/store';
import { Cart, Loader, NotFound } from '@/components';
import { Hero, Items, Pagination } from '..';
import React from 'react';

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

const MemoPagination = React.memo(Pagination);

export const HomePage = () => {
  const searchVal = useSearchStore((state) => state.searchVal);

  const { data, isLoading, error } = useFil();
  const hasItems = useFilStore((state) => state.hasItems);

  const { error: errorAll } = useAll();

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
      <Items searchVal={searchVal} items={data} hasItems={hasItems} isLoading={isLoading} />
      {!isLoading && !searchVal && (
        <>
          {!hasItems && (
            <NotFound
              title="Shoes not found. Please try to reload an App"
              className="-mt-8 mb-10 text-red-900/90 md:text-2xl"
            />
          )}
          {!errorAll && <MemoPagination hasItems={hasItems} />}
        </>
      )}
    </>
  );
};
