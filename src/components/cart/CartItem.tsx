import { TCartItem } from '../../store/slices/cartSlice';
import { RiDeleteBack2Line } from 'react-icons/ri';
import { useCartItemCallbacks } from '../../hooks';

export const CartItem = ({ id, img, price, title, qnt }: TCartItem) => {
  const { handleIncrease, handleDecrease, handleImg, handleDel } = useCartItemCallbacks({
    id,
    img,
    price,
    title,
    qnt,
  });

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-between items-center w-[220px] lg:w-[260px] gap-4 pl-2">
          <img
            onClick={handleImg}
            className="w-[120px] lg:w-[125px] h-auto drop-shadow-2xl transition-all duration-100 hover:scale-105 active:scale-90 cursor-pointer"
            src={img}
            alt=""
          />
          <div className="flex flex-col">
            <h3 className="text-sm text-slate-900 font-light drop-shadow-base filter lg:text-base">
              {title}
            </h3>
            <div className="flex justify-between items-center gap-3">
              <button
                className="text-xs lg:text-base bg-theme-cart text-white w-5 h-5 lg:w-6 lg:h-6 rounded-md drop-shadow-sm transition-all duration-300 active:scale-90"
                onClick={handleDecrease}
              >
                {qnt > 1 ? '-' : 'x'}
              </button>
              <p className="text-xs lg:text-base bg-theme-cart flex justify-center items-center text-white w-5 h-5 lg:w-6 lg:h-6 rounded-md">
                {qnt}
              </p>
              <button
                className="text-xs lg:text-base bg-theme-cart text-white w-5 h-5 lg:w-6 lg:h-6 rounded-md drop-shadow-sm transition-all duration-300 active:scale-90"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-sm lg:text--base font-light text-slate-900">
            &#36;{qnt * +price}
          </p>
          <button
          onClick={handleDel}
          >
            <RiDeleteBack2Line className="size-6 lg:size-7 text-blue-900/70 drop-shadow-md transition-all duration-300 active:scale-90" />
          </button>
        </div>
      </div>
    </>
  );
};