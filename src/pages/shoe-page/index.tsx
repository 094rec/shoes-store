import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCart } from '../../store/slices/cartSlice';
import { useFetchOne, useSetDataToLS } from '../../hooks';
import { getDataFromLS } from '../../utils';
import { Cart, Containter, Loader, NotFound } from '../../components';
import { HeroSingle } from './[shoe-hero]';

export type partItem = {
  id: string;
  color: string;
};

export default function ShoePage() {
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
      <Containter color={color}>
        <Loader
          type="pulse"
          loading={isLoading}
          color="#fff"
          size={window.innerWidth > 500 ? 20 : 16}
          opacity={25}
        />
        {!isLoading && (
          <>
            {!error && <HeroSingle item={data} />}
            {error && (
              <NotFound
                title="Shoe not found. Please try to reload the Page"
                className="text-white/80 sm:text-2xl"
              />
            )}
          </>
        )}
      </Containter>
    </>
  );
}
