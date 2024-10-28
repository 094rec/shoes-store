import clsx from 'clsx';
import { TItem } from '..';
import { useFilterStore } from '../../../store';
import { SelectLimit } from './SelectLimit';

type Props = {
  data: TItem[];
};

export const Pagination = ({ data }: Props) => {
  const { limit, active, setActive, setPage } = useFilterStore();//??
  const pagBtnQnt = Math.ceil(data?.length / limit);
  const nums = Array.from({ length: Math.ceil(pagBtnQnt) }, (_, i) => i + 1);

  return (
    <>
      <div className="w-11/12 mb-5 sm:mb-6">
        <div className="flex gap-2 lg:gap-3 justify-end items-center mr-6 mt-10 w-full">
          <SelectLimit data={data} />

          <div className="flex gap-0.5 xx:gap-1 justify-center items-center">
            {nums.map((n) => (
              <button
                key={n}
                onClick={() => {
                  setPage(n);
                  setActive(n);
                }}
                className={clsx(
                  'h-7 w-7 sm:h-8 sm:w-8 rounded-full font-medium xs:font-semibold text-xs sm:text-sm flex items-center justify-center btn-a',
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
              setPage(active + 1);
              setActive(active + 1);
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
