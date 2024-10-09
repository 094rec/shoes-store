import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCart } from '../../store/slices/cartSlice';
import { useFetchOne, useSetDataToLS } from '../../hooks';
import { getDataFromLS } from '../../utils';
import { PulseLoader } from 'react-spinners';
import { Cart } from '../../components';
import { HeroSingle } from './[shoe-hero]';

export type partItem = {
  id: string;
  color: string;
};

export const ShoePage = () => {
  const { id } = useParams();
  if (!id) return null;

  const { initCol } = getDataFromLS();
  const { color } = initCol.find((el) => el.id === id) || {};
  const { data, isLoading, error } = useFetchOne(id);

  const { items } = useSelector(selectCart);
  useSetDataToLS({ items });

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
