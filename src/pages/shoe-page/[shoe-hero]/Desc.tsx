import { IoCaretBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useCartButton } from '../../../hooks/useCartButton';
import { TItem } from '../../home-page';

export const Desc = ({ id, title, text, img, price }: TItem) => {
  const { btnState, addItemBtn } = useCartButton({ id, title, img, price });

  const nav = useNavigate();
  return (
    <>
      <div className="flex justify-between items-center">
        <IoCaretBack
          onClick={() => nav(-1)}
          className="size-20 xx:size-24 sm:size-28 text-white/50 opacity-40 transition-all duration-300 hover:text-white/40 hover:scale-105 active:scale-90 active:text-white/90 cursor-pointer"
        />
        <div className="flex flex-col text-white/80 gap-1 xs:gap-2 md:gap-3 items-center">
          <div className="grid justify-items-center">
            <h2 className="text-xl xs:text-2xl font-normal text-white/90 sm:text-2xl md:text-3xl lg:text-3xl filter drop-shadow-md">
              {title}
            </h2>
            <h3 className="text-lg xs:text-xl font-light text-white/80 sm:text-xl md:text-2xl lg:text-2xl filter drop-shadow-md -mt-1">
              {text}
            </h3>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <p className="text-sm xs:text-base font-normal text-white/70 drop-shadow-base filter sm:text-base md:text-base">
              &#36;{price}
            </p>
            <div className="flex justify-center">
              <button
                onClick={(e) => addItemBtn(e)}
                className="btn-theme opacity-80 text-xs xx:text-sm p-0.5 px-2 xs:py-0.5 bg-white/60 text-slate-900 transition-all duration-300 hover:scale-105 active:scale-90"
              >
                {!btnState ? 'Buy now' : 'Go cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
