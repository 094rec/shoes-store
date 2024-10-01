import clsx from 'clsx';
import { TItem } from '../index.tsx';
import { Item } from './Item.tsx';
import { SelectParam } from './SelectParam.tsx';

type Props = {
  items: TItem[];
  searchVal: string;
  param: string;
  setParam: (param: string) => void;
};

export const Items = ({ items, searchVal: val, param, setParam }: Props) => {
  return (
    <>
      <div
        className={`${val && 'relative flex bg-gradient-to-b from-blue-200 to-sky-100 h-screen'}`}
      >
        <div className={`nike-container w-10/12 xs:w-11/12 ${val && 'mt-16'}`}>
          <div className="flex justify-between items-center mb-4">
            <h3
              className={clsx(
                'font-extrabold filter drop-shadow-md text-center xx:text-left',
                !val
                  ? 'text-slate-900 text-2xl xx:text-3xl sm:text-4xl'
                  : 'text-slate-900/80 text-xl xx:text-2xl sm:text-3xl',
              )}
            >
              {!val ? (
                <p>Popular Sales</p>
              ) : (
                (items || []).length > 0 ? (
                items.length === 9 ? <p>Not Found (·•᷄∩•᷅ )</p> : <p>Found: {items.length}</p>):(<p>Not Found (·•᷄∩•᷅ )</p>)
              )}
            </h3>
            {(items || []).length > 0 && <SelectParam param={param} setParam={setParam} />}
          </div>

          {Array.isArray(items) && items?.length > 0 && (
            <div className="grid grid-cols-1 gap-6 items-center justify-items-center xs:grid-cols-2 lg:grid-cols-3">
              {items?.map((item) => <Item {...item} key={item.id} />)}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
