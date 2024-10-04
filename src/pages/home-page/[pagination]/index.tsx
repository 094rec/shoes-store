import React, { useCallback } from 'react';
import clsx from 'clsx';
import { TItem } from '..';
import { SelectLimit } from './SelectLimit';

type Props = {
  passNum: (val: number) => void;
  setActive: (val: number) => void;
  active: number;
  limit: number;
  setLimit: (limit: number) => void;
  data: TItem[];
};

export const Pagination = React.memo(
  ({ passNum, setActive, active, setLimit, limit, data }: Props) => {
    const [pagBtnQnt, setPagBtnQnt] = React.useState(4);
    const nums = Array.from({ length: Math.ceil(pagBtnQnt) }, (_, i) => i + 1);

    React.useEffect(() => {
      if (data) setPagBtnQnt(Math.ceil(data?.length / limit));
    }, [data, limit]);

    const changeNumBtn = useCallback(
      (n: number) => {
        passNum(n);
        setActive(n);
      },
      [passNum, setActive],
    );

    const nextBtn = useCallback(() => {
      if (active < nums.length) {
        passNum(active + 1);
        setActive(active + 1);
      }
    }, [passNum, setActive, active, nums]);

    return (
      <>
        <div className="w-11/12 mb-5 sm:mb-6">
          <div className="flex gap-2 lg:gap-3 justify-end items-center mr-6 mt-10 w-full">
            <SelectLimit limit={limit} setLimit={setLimit} data={data} />

            <div className="flex gap-0.5 xx:gap-1 justify-center items-center">
              {nums.map((n) => (
                <button
                  key={n}
                  onClick={() => changeNumBtn(n)}
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
              onClick={nextBtn}
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
  },
);
