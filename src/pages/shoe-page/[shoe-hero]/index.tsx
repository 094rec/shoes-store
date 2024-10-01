import React from 'react';
import { Desc } from './Desc';
import { Slider } from './Slider';
import { TItem } from '../../home-page';

type Props = {
  shoe: TItem,
};

export const HeroSingle = ({ shoe }: Props) => {
  const [img, setImg] = React.useState(shoe.img);
  return (
    <>
      <div className="relative flex justify-center items-center w-full mb-6">
        <img
          src={img}
          alt={`${shoe.title}/img`}
          className="object-contain w-full h-full max-w-lg rounded-xl shadow-xl transition-all duration-300 hover:scale-105"
        />
      </div>
      <div className="flex flex-col-reverse gap-4 justify-center items-center xs:flex-row ">
        <Desc {...shoe} />
        {shoe?.imgs?.length > 0 && <Slider {...shoe} setImg={setImg} />}
      </div>
    </>
  );
};
