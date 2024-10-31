import { useParams } from 'react-router-dom';
import { useOne } from '@/hooks';
import { getZusDataFromLS } from '@/utils';
import { Cart, Containter, Loader, NotFound } from '@/components';
import { HeroSingle } from './[shoe-hero]';

export type partItem = {
  id: string;
  color: string;
};

export default function ShoePage() {
  const { id } = useParams();
  if (!id) return null;

  const { data, isLoading, error } = useOne(id);

  const colorData = getZusDataFromLS('colors-state')?.colors || [];
  const { color } = colorData.find((el: partItem) => el.id === id) || {};

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
