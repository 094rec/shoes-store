import clsx from 'clsx';
import React from 'react';
import { TItem } from '..';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useItemBtnsLogic } from '@/hooks';
import { FaCartShopping } from 'react-icons/fa6';
import { FaStar } from 'react-icons/fa';

const MemoOnImgClick = React.memo(
  ({ id, img, title }: { id: string; img: string; title: string }) => (
    <Link
      to={`/shoes/${id}`}
      className="absolute w-1/2 right-0 object-contain cursor-pointer duration-100 active:scale-90"
    >
      <img src={img} alt={title} loading="lazy" />
    </Link>
  ),
);

const MemoRank = React.memo(({ rank }: { rank: number }) => (
  <div className="flex items-center gap-0.5">
    <FaStar className="text-white/70 drop-shadow-lg size-3" />
    <p className="text-white/70 text-sm">{rank}</p>
  </div>
));

const MemoOnAddItem = React.memo(
  ({ btnState, onAddItem }: { btnState: boolean; onAddItem: () => void }) => (
    <FaCartShopping
      onClick={onAddItem}
      className={clsx(
        'drop-shadow-2xl cursor-pointer active:duration-100',
        btnState ? 'text-white/30' : 'text-white/70 active:scale-90',
      )}
    />
  ),
);

export const Item = ({ id, title, text, rank, img, price, color, shadow }: TItem) => {
  const item = { id, title, img, price };
  const { btnState, onAddItemAndGoToCart, onAddItem } = useItemBtnsLogic(item);
  return (
    <div
      className={cn(
        'relative w-full flex justify-between items-center p-1 xx:p-2 lg:p-2 xl:p-4 px-3 rounded-3xl transition-all duration-300 hover:scale-105 bg-gradient-to-b overflow-hidden',
        color,
        shadow,
      )}
    >
      <div className="flex flex-col items-start justify-center">
        <h3 className="text-base font-semibold text-white/80 drop-shadow-lg filter sm:text-lg md:text-lg lg:text-xl -mb-1">
          {title}
        </h3>
        <h3 className="text-xs font-normal text-white/70 drop-shadow-base filter sm:text-base md:text-base lg:text-lg mb-1">
          {text}
        </h3>
        <div className="flex justify-between items-center w-[90px]">
          <p className="text-white/70 text-sm">&#36;{price}</p>
          <MemoRank rank={rank} />
        </div>
        <div className="flex justify-between items-center w-[100px]">
          <MemoOnAddItem btnState={btnState} onAddItem={onAddItem} />
          <button
            onClick={onAddItemAndGoToCart}
            className="btn-theme opacity-80 text-xs sm:text-sm p-1 px-2 sm:py-0.5 bg-white/60 text-slate-800"
          >
            {!btnState ? 'Buy now' : 'Go cart'}
          </button>
        </div>
      </div>
      <MemoOnImgClick id={id} img={img} title={title} />
    </div>
  );
};
