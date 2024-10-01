import React from 'react';
import { BsBag } from 'react-icons/bs';
import { SiNike } from 'react-icons/si';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search } from './Search';
import { useSearchContext } from '../hooks/useSearchContext';
import { useCartContext } from '../hooks/useCartContext';
import { useSelector } from 'react-redux';
import { selectCart } from '../redux/slices/cartSlice';
import clsx from 'clsx';

export const Navbar = () => {
  const { totalQnt } = useSelector(selectCart);
  const loc = useLocation();
  const isHomePage = loc.pathname === '/';
  const { setSearchVal } = useSearchContext();
  const { setCartState } = useCartContext();
  const nav = useNavigate();

  const [navState, setNavState] = React.useState(false);
  const [tempSearch, setTempSearch] = React.useState('');

  React.useEffect(() => {
    const onNavScroll = () => {
      setNavState(window.scrollY > 250);
    };
    window.addEventListener('scroll', onNavScroll);
    return () => window.removeEventListener('scroll', onNavScroll);
  }, []);

  const handleHomeClick = () => {
    setSearchVal('');
    setTempSearch('');
    nav('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCartBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCartState(true);
  };

  return (
    <div className="fixed left-0 right-0 top-0 py-2 sm:py-1 px-3.5 z-40 text-white backdrop-blur-sm backdrop-filter">
      <div className="flex justify-between items-center">
        <button onClick={handleHomeClick}>
          <SiNike
            className={clsx(
              'opacity-80 size-10 xs:size-11 sm:size-12 ml-2 active:scale-90 active:duration-100 hover:scale-110',
              navState ? 'text-gray-900/60 transition-all duration-300' : 'text-white/50',
            )}
          />
        </button>
        <div className="relative flex items-center gap-2">
          {isHomePage && <Search tempSearch={tempSearch} setTempSearch={setTempSearch} />}
          <button className="relative" onClick={openCartBtn}>
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
