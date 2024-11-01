import clsx from 'clsx';
import React from 'react';
import { useFilStore, useAllStore } from '@/store';
import { SelectLimit } from './SelectLimit';

export const Pagination = ({ hasItems }: { hasItems: boolean }) => {
  const itemsCount = useAllStore((state) => state.itemsCount);
  const limit = useFilStore((state) => state.limit);
  const page = useFilStore((state) => state.page);
  const setPage = useFilStore((state) => state.setPage);

  const pagBtnQnt = Math.ceil(itemsCount / limit);
  const nums = Array.from({ length: Math.ceil(pagBtnQnt) }, (_, i) => i + 1);
  //reseting page when current page > max page(pagBtnQnt)
  React.useEffect(() => {
    if (page > pagBtnQnt && pagBtnQnt !== 0) {
      setPage(1);
    }
  }, [page, pagBtnQnt]);

  return (
    <>
      {hasItems && (
        <div className="w-11/12 mb-5 sm:mb-6">
          <div className="flex gap-2 lg:gap-3 justify-end items-center mr-6 mt-10 w-full">
            <SelectLimit itemsCount={itemsCount} />

            <div className="flex gap-0.5 xx:gap-1 justify-center items-center">
              {nums.map((n) => (
                <button
                  key={n}
                  onClick={() => {
                    setPage(n);
                  }}
                  className={clsx(
                    'h-7 w-7 sm:h-8 sm:w-8 rounded-full font-medium xs:font-semibold text-xs sm:text-sm flex items-center justify-center btn-a',
                    page === n
                      ? 'bg-gradient-to-b from-blue-300 to-blue-500 hover:bg-blue-100 text-white shadow-sm shadow-blue-200'
                      : 'text-black/80 hover:bg-blue-400 hover:text-white',
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
            <button
              disabled={page === nums.length}
              onClick={() => {
                setPage(page + 1);
              }}
              className={clsx(
                'ml-1 h-6 w-6 xx:h-7 xx:w-7 sm:h-8 sm:w-8 rounded font-semibold text-sm flex items-center justify-center drop-shadow-xl cursor-pointer',
                page === nums.length ? 'text-slate-600' : 'text-slate-800 btn-ah',
              )}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};
