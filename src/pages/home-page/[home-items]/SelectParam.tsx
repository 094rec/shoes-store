import React from 'react';
import clsx from 'clsx';
import { useClickAway } from 'react-use';
import { useSearchStore } from '../../../store';
import { AiFillLike } from 'react-icons/ai';
import { GrMoney } from 'react-icons/gr';
import { MdAbc } from 'react-icons/md';

type Props = {
  param: string;
  setParam: (param: string) => void;
};

export const SelectParam = ({ param, setParam }: Props) => {
  const { searchVal } = useSearchStore();

  const options = React.useMemo(() => [
    { value: 'title', icon: <MdAbc className="size-7 -m-1 text-black/90" /> },
    { value: 'price', icon: <GrMoney className="size-4 text-black/90" /> },
    { value: 'rank', icon: <AiFillLike className="size-4 sm:size-5 text-black/90" /> },
  ], []);

  const [dropState, setDropState] = React.useState(false);
  const ref = React.useRef(null);
  useClickAway(ref, () => setDropState(false));

  return (
    <div className="relative z-20 grid items-center justify-start">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setDropState(!dropState);
        }}
        className={clsx(
          'h-7 xs:h-8 flex justify-center items-center bg-gradient-to-b px-4 py-2 rounded-lg focus:outline-none btn-ah',
          !searchVal
            ? 'from-white to-gray-100 drop-shadow-lg'
            : 'from-blue-200 to-blue-300 drop-shadow-sm',
        )}
      >
        {options.find((el) => el.value === param)?.icon}
      </button>

      {dropState && (
        <div
          ref={ref}
          className={clsx(
            'absolute mt-[60px] w-[53px] rounded-md shadow-lg',
            !searchVal ? 'bg-white' : 'bg-blue-100',
          )}
        >
          <ul className="">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  setDropState(false);
                  setParam(option.value);
                }}
                className={clsx(
                  'flex items-center gap-2 px-2 py-1.5 cursor-pointer transition-colors hover:rounded-md drop-shadow-sm',
                  !searchVal ? 'hover:bg-gray-200' : 'hover:bg-blue-200',
                )}
              >
                {option.icon}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
