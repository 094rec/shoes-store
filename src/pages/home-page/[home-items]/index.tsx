import React from 'react';
import clsx from 'clsx';
import { TItem } from '..';
import { Skeleton } from '@/components/ui/skeleton';
import { SelectParam } from './SelectParam';
import { Item } from './Item';

type Props = {
  items: TItem[];
  searchVal: string;
  hasItems: boolean;
  isLoading: boolean;
};

const MemoizedItem = React.memo(Item);

export const Items = ({ items = [], searchVal, hasItems, isLoading }: Props) => {
  return (
    <>
      <div
        className={`${searchVal && 'relative flex bg-gradient-to-b from-blue-200 to-sky-100 h-screen'}`}
      >
        <div className={`w-10/12 mx-auto xs:w-11/12 ${searchVal && 'mt-16'}`}>
          <div className="flex justify-between items-center mb-4">
            <h3
              className={clsx(
                'font-extrabold filter drop-shadow-md text-center xx:text-left',
                !searchVal
                  ? 'text-slate-900 text-2xl xx:text-3xl sm:text-4xl'
                  : 'text-slate-900/80 text-xl xx:text-2xl sm:text-3xl',
              )}
            >
              {!searchVal && hasItems && <p>Popular Sales</p>}
              {searchVal && (
                <p className="flex items-center">
                  Found:
                  {!isLoading ? (
                    <span className="ml-2">{items.length}</span>
                  ) : (
                    <Skeleton className="ml-2 sm:ml-3 w-[35px] sm:w-[45px] h-[24px] sm:h-[30px] rounded-lg bg-blue-400/80 opacity-5" />
                  )}
                  {!isLoading && !hasItems && <span>(·•᷄∩•᷅ )</span>}
                </p>
              )}
            </h3>
            {hasItems && <SelectParam />}
          </div>

          {hasItems && (
            <div className="grid grid-cols-1 gap-6 items-center justify-items-center xs:grid-cols-2 lg:grid-cols-3">
              {items?.map((item) => <MemoizedItem {...item} key={item.id} />)}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
