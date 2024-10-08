import {
  useFetchAllShoes,
  useFetchFilteredShoes,
  useSearchContext,
  useSetDataToLS,
} from '../../hooks';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCart } from '../../store/slices/cartSlice';
import { getDataFromLS } from '../../utils/getDataFromLS';
import { heroapi } from '../../data/data';
import { MoonLoader } from 'react-spinners';
import { Cart } from '../../components';
import { Hero, Items, Pagination } from '..';

export type TItem = {
  id: string;
  title: string;
  text: string;
  rank: string;
  img: string;
  imgs?: string[];
  price: string;
  color: string;
  shadow: string;
};

export const HomePage = () => {
  const { initPage, initAct, initLim, initParam } = getDataFromLS();
  const [page, setPage] = React.useState(initPage);
  const [limit, setLimit] = React.useState(initLim);
  const [active, setActive] = React.useState(initAct);
  const [param, setParam] = React.useState(initParam);
  const { searchVal } = useSearchContext();
  const isMounted = React.useRef(false);

  const { data, isLoading, error } = useFetchFilteredShoes(
    ['shoes', page, limit, searchVal, param],
    `https://66efa6eff2a8bce81be3ba6e.mockapi.io/items?${searchVal ? '' : `l=${limit}&p=${page}&`}${searchVal ? `title=${searchVal}&` : ''}sortBy=${param}${param === 'rank' ? '&order=desc' : ''}`,
  );
  const hasItems = (data || []).length > 0;

  const { data: dataAll, error: errorAll } = useFetchAllShoes();

  React.useEffect(() => {
    errorAll && setLimit(20);
    return () => {
      if (errorAll) {
        localStorage.setItem('pagLimit', '4');
        localStorage.setItem('pagPage', '1');
      }
    };
  }, [errorAll]);

  const { items } = useSelector(selectCart);
  useSetDataToLS(items, page, limit, dataAll, param);

  React.useEffect(() => {
    if (isMounted.current) {
      setPage(1);
      setActive(1);
    }
    isMounted.current = true;
  }, [limit]);

  return (
    <>
      {error && null}
      {errorAll && null}
      <Cart />
      {!searchVal && <Hero {...heroapi} />}
      {isLoading ? (
        <div className="opacity-100 flex justify-center items-center h-screen">
          <MoonLoader
            color="#227cdf"
            size={window.innerWidth > 640 ? 80 : 65}
            loading={isLoading}
          />
        </div>
      ) : (
        <Items
          searchVal={searchVal}
          items={data}
          param={param}
          setParam={(val) => setParam(val)}
        />
      )}
      {!hasItems && !isLoading && (
        <p className="w-10/12 m-auto font-medium filter drop-shadow-md text-center text-red-900/90 text-lg xx:text-xl md:text-2xl -mt-8 mb-10">
          Shoes not found. Please try to reload an App
          <span className="whitespace-nowrap">(·•᷄∩•᷅ )</span>
        </p>
      )}
      {hasItems && !searchVal && !errorAll && (
        <Pagination
          passNum={(n) => setPage(n)}
          setActive={(n) => setActive(n)}
          active={active}
          setLimit={(val) => setLimit(val)}
          limit={limit}
          data={dataAll}
        />
      )}
    </>
  );
};
