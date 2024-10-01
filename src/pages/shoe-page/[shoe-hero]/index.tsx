import { Desc } from './Desc';
import { Slider } from './Slider';
import { TItem } from '../../home-page';

type Props = {
  shoe: TItem;
};

export const HeroSingle = ({ shoe }: Props) => {
  return (
    <>
      <div className="relative flex justify-center items-center w-full mb-6">
        {shoe?.imgs?.length > 0 ? (
          <Slider {...shoe} />
        ) : (
          <img
            src={shoe.img}
            alt={`${shoe.title}/img`}
            className="object-contain w-full h-full max-w-lg rounded-xl shadow-xl btn-ah"
          />
        )}
      </div>
      <div className="flex justify-center items-center xs:flex-row ">
        <Desc {...shoe} />
      </div>
    </>
  );
};
