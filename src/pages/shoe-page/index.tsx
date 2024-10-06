import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCart } from '../../store/slices/cartSlice.ts';
import { useFetchOne, useSetDataToLS } from '../../hooks/index.ts';
import { PulseLoader } from 'react-spinners';
import { Cart } from '../../components/index.ts';
import { HeroSingle } from './[shoe-hero]/index.tsx';

type partItem = {
  id: string;
  color: string;
  shadow: string;
};

export const ShoePage = () => {
  const { id } = useParams();
  if (!id) return null;

  const data = localStorage.getItem('data-all');
  const itemsAll = data ? JSON.parse(data) : [];
  const item = itemsAll.find((el: partItem) => el.id === id);
  const { data: shoe, isLoading, error } = useFetchOne(id);
  if (error) return null;
  if (!shoe) return null;

  const { items } = useSelector(selectCart);
  useSetDataToLS(items);

  return (
    <>
      <Cart />
      <div
        className={`relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b ${item?.color} ${item?.shadow} p-6`}
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
          <HeroSingle shoe={shoe} />
        )}
      </div>
    </>
  );
};

export default ShoePage;
