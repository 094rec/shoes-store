import React, { useCallback } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllItems, selectCart } from '../../store/slices/cartSlice';
import { useCartContext } from '../../hooks';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import { TiArrowBack } from 'react-icons/ti';

const MemoArrowBackBtn = React.memo(({ closeCart }: { closeCart: () => void }) => (
  <button onClick={closeCart}>
    <TiArrowBack className="size-6 text-slate-700 drop-shadow-sm transition-all duration-300 active:scale-90" />
  </button>
));

export const CartCount = ({ totalQnt: qnt }: { totalQnt: number }) => {
  const disp = useDispatch();
  const { setCartState } = useCartContext();
  const { items } = useSelector(selectCart);

  const closeCart = useCallback(() => {
    setCartState(false);
  }, [setCartState]);

  const clearCart = () => {
    if (items.length !== 0) {
      disp(removeAllItems());
      const timeoutId = setTimeout(() => setCartState((prev) => !prev), 100);
      return () => clearTimeout(timeoutId);
    }
  };

  return (
    <>
      <div className="sticky top-0 z-20 flex justify-between items-center bg-white p-2 drop-shadow-sm pl-4">
        <div className="flex gap-2 items-center">
          <MemoArrowBackBtn closeCart={closeCart} />
          <div className="text-sm lg:text-base font-light text-slate-900">Qnt: {qnt}</div>
        </div>
        <button onClick={clearCart}>
          <RiDeleteBack2Fill
            className={clsx(
              'size-6 lg:size-7 cursor-pointer drop-shadow-md transition-all duration-300',
              qnt > 0 ? 'text-rose-700/70 active:scale-90' : 'text-slate-700 active:scale-100',
            )}
          />
        </button>
      </div>
    </>
  );
};
