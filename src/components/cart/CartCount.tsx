import React, { useCallback } from 'react';
import clsx from 'clsx';
import { removeAllItems, useCartStateStore, useCartStore } from '@/store';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import { TiArrowBack } from 'react-icons/ti';

const MemoOnCloseCart = React.memo(({ onCloseCart }: { onCloseCart: () => void }) => (
  <button onClick={onCloseCart}>
    <TiArrowBack className="size-6 text-slate-700 drop-shadow-sm transition-all duration-300 active:scale-90" />
  </button>
));

export const CartCount = () => {
  const totalQnt = useCartStore((state) => state.totalQnt);
  const cartState = useCartStateStore((state) => state.cartState);
  const setCartState = useCartStateStore((state) => state.setCartState);

  const onCloseCart = useCallback(() => {
    setCartState(false);
  }, [setCartState]);

  const onClearAndCloseCart = () => {
    if (totalQnt !== 0) {
      removeAllItems();
      const timeoutId = setTimeout(() => setCartState(!cartState), 100);
      return () => clearTimeout(timeoutId);
    }
  };

  return (
    <div className="sticky top-0 z-20 flex justify-between items-center bg-white p-2 drop-shadow-sm pl-4">
      <div className="flex gap-2 items-center">
        <MemoOnCloseCart onCloseCart={onCloseCart} />
        <div className="text-sm lg:text-base font-light text-slate-900">Qnt: {totalQnt}</div>
      </div>
      <button onClick={onClearAndCloseCart}>
        <RiDeleteBack2Fill
          className={clsx(
            'size-6 lg:size-7 cursor-pointer drop-shadow-md transition-all duration-300',
            totalQnt > 0
              ? 'text-rose-700/70 active:scale-90'
              : 'text-slate-700 active:scale-100',
          )}
        />
      </button>
    </div>
  );
};
