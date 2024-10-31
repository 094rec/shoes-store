import React from 'react';
import { TItem } from '@/pages/home-page';
import { Slider } from './Slider';
import { Desc } from './Desc';

type Props = {
  item: TItem;
};

const MemoizedSlider = React.memo(Slider);

export const HeroSingle = ({ item }: Props) => {
  const { img, title, imgs } = item;
  return (
    <>
      <div className="relative flex justify-center items-center w-full mb-6">
        {imgs?.length ? (
          <MemoizedSlider imgs={imgs} />
        ) : (
          <img
            src={img}
            alt={`${title}/img`}
            className="object-contain w-11/12 max-w-lg rounded-xl btn-ah"
            loading="lazy"
          />
        )}
      </div>
      <div className="flex justify-center items-center xs:flex-row ">
        <Desc {...item} />
      </div>
    </>
  );
};
