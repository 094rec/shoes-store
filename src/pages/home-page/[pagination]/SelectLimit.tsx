import React from 'react';
import { useClickAway } from 'react-use';
import { useFilStore } from '@/store';
import { TbNumber4Small, TbNumber6Small } from 'react-icons/tb';

export const SelectLimit = ({ itemsCount }: { itemsCount: number }) => {
  const limit = useFilStore((state) => state.limit);
  const setLimit = useFilStore((state) => state.setLimit);
  const [dropState, setDropState] = React.useState(false);
  const ref = React.useRef(null);
  useClickAway(ref, () => setDropState(false));

  const options = React.useMemo(
    () => [
      { value: 4, icon: <TbNumber4Small className="size-6 -m-1 text-black/50" /> },
      { value: 6, icon: <TbNumber6Small className="size-6 -m-1 text-black/50" /> },
      {
        value: itemsCount,
        icon: <span className="text-xs px-0.5 text-black/60 font-semibold">{itemsCount}</span>,
      },
    ],
    [itemsCount],
  );

  return (
    <div className="relative z-20 grid items-center justify-start">
      <button
        onClick={(e) => {//onOpenLimit
          e.stopPropagation();
          setDropState(!dropState);
        }}
        className="h-7 xs:h-7 flex justify-center items-center bg-gradient-to-b px-2 sm:px-2.5 rounded-xl 1drop-shadow-lg shadow-xl shadow-blue-100 from-sky-50 to-sky-200 focus:outline-none btn-ah"
      >
        {options.find((el) => el.value === limit)?.icon}
      </button>

      {dropState && (
        <div
          ref={ref}
          className="absolute mb-[43px] xs:mb-[46px] sm:mb-[56px] w-[32px] sm:w-[37px] rounded-xl shadow-lg bg-white"
        >
          <ul>
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {//onSelectLimit
                  setDropState(false);
                  setLimit(option.value);
                }}
                className="flex justify-center items-center gap-2 px-2 py-1 sm:py-1.5 cursor-pointer transition-colors hover:rounded-xl drop-shadow-sm hover:bg-blue-100"
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
