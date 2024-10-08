import { TItem } from '../../home-page';
import { Slider } from './Slider';
import { Desc } from './Desc';

type Props = {
  item: TItem;
};

export const HeroSingle = ({ item}: Props) => {
  return (
    <>
      <div className="relative flex justify-center items-center w-full mb-6">
        {item.imgs && item.imgs.length > 0 ? (
          <Slider imgs={item.imgs} />
        ) : (
          <img
            src={item.img}
            alt={`${item.title}/img`}
            className="object-contain w-11/12 max-w-lg rounded-xl btn-ah"
          />
        )}
      </div>
      <div className="flex justify-center items-center xs:flex-row ">
        <Desc {...item} />
      </div>
    </>
  );
};
