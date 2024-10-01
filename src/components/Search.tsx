import React from 'react';
import { useSearchContext } from '../hooks/useSearchContext';
import { IoCloseOutline } from 'react-icons/io5';
import debounce from 'debounce';

type Props = {
  tempSearch: string,
  setTempSearch: (search: string) => void,
};

export const Search = ({ tempSearch, setTempSearch }: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { searchVal: val, setSearchVal } = useSearchContext();

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchVal('');
        setTempSearch('');
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
        ref={inputRef}
        value={tempSearch}
        className="p-1 w-36 rounded-lg mr-2 bg-white bg-opacity-30 focus:outline-none placeholder-white/50 pl-3 custom-cursor-white text-black/60 ring-1 ring-blue-600 ring-opacity-5"
        onChange={(e) => {
          setTempSearch(e.target.value);
          updateSearch(e.target.value);
        }}
        type="text"
        placeholder="Search..."
      />
      {val && (
        <IoCloseOutline
          onClick={() => {
            setTempSearch('');
            setSearchVal('');
            inputRef.current?.focus();
          }}
          className="absolute top-0.5 right-10 text-white/80 size-7 transition-all duration-300 hover:text-white/50 active:scale-95 cursor-pointer"
        />
      )}
    </>
  );
};
