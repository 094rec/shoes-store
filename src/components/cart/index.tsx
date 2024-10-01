import React from 'react';
import { CartCount } from './CartCount';
import { CartEmpty } from './CartEmpty';
import { CartItem } from './CartItem';
import { useCartContext } from '../../hooks/useCartContext';
import { useSelector } from 'react-redux';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { selectCart } from '../../redux/slices/cartSlice';
import clsx from 'clsx';

export const Cart = React.memo(() => {
  const { items, total, totalQnt } = useSelector(selectCart);
  const { cartState: val, setCartState } = useCartContext();
  const cartRef = useOutsideClick(() => setCartState(false));

  // const cartRef = React.useRef<HTMLDivElement>(null);
  // const handleClickOutside = (e) => {
  //       if (cartRef.current && !e.composedPath().includes(cartRef.current)) {
  //         console.log('outside click')
  //         setCartState(false);}
  // };

  // React.useEffect(() => {
  //   console.log('listener added');
  //   document.addEventListener('click', handleClickOutside);
  //   return () => {
  //     console.log('listener removed');
  //     document.body.removeEventListener('click', handleClickOutside);
  //   };
  // }, []);

  return (
    <>
      <div
        className={clsx(
          'fixed top-0 left-0 right-0 bottom-0 blur-effect-theme h-full w-full {opacity-100} transition-all duration-300',
          val ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-8',
        )}
      >
        <div
          ref={cartRef}
          className="absolute blur-effect-theme h-screen max-w-[20rem] xx:max-w-[22rem] xs:max-w-[26rem] sm:max-w-[30rem] opacity-100 right-0 w-full transition-all"
        >
          <CartCount totalQnt={totalQnt} />
          {items.length < 1 && <CartEmpty />}
          <div className="flex flex-col gap-4 overflow-y-scroll scroll-smooth scroll-hidden items-center w-full h-screen p-3 drop-shadow-sm">
            {items?.map((item) => <CartItem {...item} key={item.id} />)}
          </div>
          <div className="fixed bottom-0 bg-white flex justify-between items-center w-full p-3 pl-4 pb-4 drop-shadow-sm">
            <p className="text-sm lg:text-base text-slate-900">Subtotal:</p>
            <p className="text-sm lg:text-base bg-theme-cart text-white/90 font-light rounded px-1">
              &#36;{total}
            </p>
          </div>
        </div>
      </div>
    </>
  );
});
