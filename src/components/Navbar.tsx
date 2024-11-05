import React from 'react';
import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCartStateStore, useCartStore, useSearchStore } from '@/store';
import { SiNike } from 'react-icons/si';
import { BsBag } from 'react-icons/bs';
import { Search } from './Search';

const MemoSearch = React.memo(Search);

export const Navbar = () => {
  const loc = useLocation();
  const nav = useNavigate();
  const isHomePage = loc.pathname === '/';
  const totalQnt = useCartStore((state) => state.totalQnt);
  const setSearchVal = useSearchStore((state) => state.setSearchVal);
  const setCartState = useCartStateStore((state) => state.setCartState);
  const [navState, setNavState] = React.useState(false);
  const [tempSearch, setTempSearch] = React.useState('');
  
  const MemoOnReturnHome = React.memo(({ onReturnHome }: { onReturnHome: () => void }) => (
    <button onClick={onReturnHome}>
      <SiNike
        className={clsx(
          'opacity-80 size-10 xs:size-11 sm:size-12 ml-2 active:scale-90 active:duration-100 hover:scale-110',
          navState ? 'text-gray-900/60 transition-all duration-300' : 'text-white/50',
        )}
      />
    </button>
  ));

  const onReturnHome = React.useCallback(() => {
    setSearchVal('');
    setTempSearch('');
    nav('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setSearchVal, setTempSearch, nav]);

  React.useEffect(() => {
    const onNavScroll = () => {
      setNavState(window.scrollY > 250);
    };
    window.addEventListener('scroll', onNavScroll);
    return () => window.removeEventListener('scroll', onNavScroll);
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 py-2 sm:py-1 px-3.5 z-40 text-white backdrop-blur-sm backdrop-filter">
      <div className="flex justify-between items-center">
        <MemoOnReturnHome onReturnHome={onReturnHome} />
        <div className="relative flex items-center gap-2">
          {isHomePage && (
            <MemoSearch tempSearch={tempSearch} setTempSearch={setTempSearch} />
          )}
          <button
            className="relative"
            onClick={(e) => {//onOpenCart
              e.stopPropagation();
              setCartState(true);
            }}
          >
            <BsBag
              className={clsx(
                'size-5 lg:size-6 transition-all duration-300 hover:scale-110 active:-scale-x-150 cursor-pointer',
                navState ? 'text-gray-900/60 transition-all duration-300' : 'text-white/50',
              )}
            />
            <div
              className={clsx(
                'absolute top-2.5 lg:top-3 -right-0.5 text-xs font-light rounded-full px-1',
                navState ? 'bg-black/80 text-white' : 'bg-white/80 text-black/80',
              )}
            >
              {totalQnt}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
