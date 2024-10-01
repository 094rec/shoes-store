import clsx from 'clsx';
import React from 'react';
import { SelectLimit } from './SelectLimit';
import { TItem } from '..';

type Props = {
  passNum: (val: number) => void;
  handleClick: (val: number) => void;
  active: number;
  limit: number;
  setLimit: (limit: number) => void;
  data: TItem[],
};

export const Pagination = ({ passNum, handleClick, active, setLimit, limit, data }: Props) => {
  const [pagBtnQnt, setPagBtnQnt] = React.useState(4);
  const nums = Array.from({ length: Math.ceil(pagBtnQnt) }, (_, i) => i + 1);

  React.useEffect(() => {
    if (data) setPagBtnQnt(Math.ceil(data?.length / limit));
  }, [data, limit]);

  return (
    <>
      <div className="w-11/12 mb-5 sm:mb-6">
        <div className="flex gap-2 lg:gap-3 justify-end items-center mr-6 mt-10 w-full">
          <SelectLimit limit={limit} setLimit={setLimit} data={data}/>

          <div className="flex gap-0.5 xx:gap-1 justify-center items-center">
            {nums.map((n) => (
              <button
                key={n}
                onClick={() => {
                  passNum(n);
                  handleClick(n);
                }}
                className={clsx(
                  'h-7 w-7 sm:h-8 sm:w-8 rounded-full font-medium xs:font-semibold text-xs sm:text-sm flex items-center justify-center btn-a cursor-pointer ',
                  active === n
                    ? 'bg-gradient-to-b from-blue-300 to-blue-500 hover:bg-blue-100 text-white shadow-sm shadow-blue-200'
                    : 'text-black/80 hover:bg-blue-400 hover:text-white',
                )}
              >
                {n}
              </button>
            ))}
          </div>
          <button
            disabled={active === nums.length}
            onClick={() => {
              if (active < nums.length) {
                passNum(active + 1);
                handleClick(active + 1);
              }
            }}
            className={clsx(
              'ml-1 h-6 w-6 xx:h-7 xx:w-7 sm:h-8 sm:w-8 rounded font-semibold text-sm flex items-center justify-center drop-shadow-xl cursor-pointer',
              active === nums.length ? 'text-slate-600' : 'text-slate-800 btn-ah',
            )}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};
