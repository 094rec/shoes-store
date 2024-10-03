import { TItem } from '../../home-page';
import { Slider } from './Slider';
import { Desc } from './Desc';

type Props = {
  shoe: TItem;
};

export const HeroSingle = ({ shoe }: Props) => {
  return (
    <>
      <div className="relative flex justify-center items-center w-full mb-6">
        {shoe.imgs && shoe.imgs.length > 0 ? (
          <Slider imgs={shoe.imgs} />
        ) : (
          <img
            src={shoe.img}
            alt={`${shoe.title}/img`}
            className="object-contain w-11/12 max-w-lg rounded-xl btn-ah"
          />
        )}
      </div>
      <div className="flex justify-center items-center xs:flex-row ">
        <Desc {...shoe} />
      </div>
    </>
  );
};
