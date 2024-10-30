import React from 'react';
import clsx from 'clsx';
import { TItem } from '..';
import { Item } from './Item';
import { SelectParam } from './SelectParam';

type Props = {
  items: TItem[];
  searchVal: string;
  hasItems: boolean;
};

const MemoizedItem = React.memo(Item);

export const Items = ({ items = [], searchVal, hasItems }: Props) => {
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
                <p>
                  Found: {items.length} {!hasItems && <span>(·•᷄∩•᷅ )</span>}
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
