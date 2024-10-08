import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCart } from '../../store/slices/cartSlice.ts';
import { useFetchOne, useSetDataToLS } from '../../hooks/index.ts';
import { getDataFromLS } from '../../utils/getDataFromLS.ts';
import { PulseLoader } from 'react-spinners';
import { Cart } from '../../components/index.ts';
import { HeroSingle } from './[shoe-hero]/index.tsx';

type partItem = {
  id: string;
  color: string;
};

export const ShoePage = () => {
  const { id } = useParams();
  if (!id) return <p>Invalid id</p>;

  const { initCol } = getDataFromLS();
  const { color } = initCol.find((el: partItem) => el.id === id) || {};
  const { data, isLoading, error } = useFetchOne(id);

  const { items } = useSelector(selectCart);
  useSetDataToLS(items);

  return (
    <>
      <Cart />
      <div
        className={`relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b ${color || 'from-blue-500 to-blue-400'} p-6`}
      >
        {isLoading ? (
          <div className="opacity-25">
            <PulseLoader
              color="#fff"
              size={window.innerWidth > 500 ? 20 : 16}
              loading={isLoading}
            />
          </div>
        ) : (
          <>
            {!error ? (
              <HeroSingle item={data} />
            ) : (
              <p className="w-10/12 m-auto font-medium filter drop-shadow-md text-center text-white/80 text-lg xx:text-xl sm:text-2xl">
                Shoe not found. Please try to reload the Page
                <span className="whitespace-nowrap">(·•᷄∩•᷅ )</span>
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ShoePage;
