import React from 'react';
import debounce from 'debounce';
import { useSearchStore } from '@/store';
import { IoCloseOutline } from 'react-icons/io5';

type Props = {
  tempSearch: string;
  setTempSearch: (search: string) => void;
};

export const Search = ({ tempSearch, setTempSearch }: Props) => {
  const searchVal = useSearchStore((state) => state.searchVal);
  const setSearchVal = useSearchStore((state) => state.setSearchVal);
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchVal('');
        setTempSearch('');
        ref.current?.focus();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const updateSearch = React.useCallback(
    debounce((val: string) => {
      setSearchVal(val);
    }, 600),
    [],
  );

  return (
    <>
      <input
        ref={ref}
        value={tempSearch}
        className="p-1 w-36 rounded-lg mr-2 bg-white bg-opacity-30 focus:outline-none placeholder-white/50 pl-3 custom-cursor-white text-black/60 ring-1 ring-blue-600 ring-opacity-5"
        onChange={(e) => {
          setTempSearch(e.target.value);
          updateSearch(e.target.value);
        }}
        type="text"
        placeholder="Search..."
      />
      {searchVal && (
        <IoCloseOutline
          onClick={() => {//onClearSearch
            setTempSearch('');
            setSearchVal('');
            ref.current?.focus();
          }}
          className="absolute top-0.5 right-10 text-white/80 size-7 transition-all duration-300 hover:text-white/50 active:scale-95 cursor-pointer"
        />
      )}
    </>
  );
};
