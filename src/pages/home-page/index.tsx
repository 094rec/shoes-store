import React from 'react';
import { useSelector } from 'react-redux';
import { Cart, Hero, Items } from '../../components';
import { heroapi } from '../../data/data';
import { useSearchContext } from '../../hooks/useSearchContext';
import { useSetDataToLS } from '../../hooks/useSetDataToLS';
import { selectCart } from '../../redux/slices/cartSlice';
import { useFetchShoes } from '../../hooks/useFetchShoes';
import { getDataFromLS } from '../../utils/getDataFromLS';
import { useFetchAllShoes } from '../../hooks/useFetchAllShoes';
import { Pagination } from './[pagination]';
import { MoonLoader } from 'react-spinners';

export type TItem = {
  id: string;
  title: string;
  text: string;
  rank: string;
  img: string;
  imgs: string[];
  price: string;
  color: string;
  shadow: string;
};

export const HomePage = () => {
  const { initPage, initAct, initLim, initParam } = getDataFromLS();
  const { searchVal } = useSearchContext();
  const [page, setPage] = React.useState(initPage);
  const [limit, setLimit] = React.useState(initLim);
  const [active, setActive] = React.useState(initAct);
  const [param, setParam] = React.useState(initParam);
  const isMounted = React.useRef(false);

  const { data, isLoading, error } = useFetchShoes(
    ['shoes', page, limit, searchVal, param],
    `https://66efa6eff2a8bce81be3ba6e.mockapi.io/items?l=${searchVal ? '' : limit}&p=${searchVal ? '' : page}&title=${searchVal}&sortBy=${param}${param === 'rank' ? '&order=desc' : ''}`,
  );
  if (error) return null;

  const { data: dataAll, error: errorAll } = useFetchAllShoes();
  if (errorAll) return null;

  const { items } = useSelector(selectCart);
  useSetDataToLS(items, page, limit, dataAll, param);

  React.useEffect(() => {
    if (isMounted.current) {
      setPage(1);
      setActive(1);
    }
    isMounted.current = true;
  }, [limit]);

  // const filteredSales = {
  //   ...popularsales,
  //   items: popularsales.items.filter((obj) => obj.title.toLowerCase().includes(val.toLowerCase())),
  // };

  React.useEffect(() => {
    const saveScrollPosition = () => {
      if (window.scrollY > 0 && window.scrollY > +localStorage.getItem('scrollPosition')!) {
        localStorage.setItem('scrollPosition', window.scrollY.toString());
      }
    };
    // window.addEventListener('beforeunload', saveScrollPosition);
    window.addEventListener('scroll', saveScrollPosition);
    return () => {
      // window.removeEventListener('beforeunload', saveScrollPosition);
      window.removeEventListener('scroll', saveScrollPosition);
    };
  }, []);

  // React.useEffect(() => {
  //   const scrollPosition = localStorage.getItem('scrollPosition');
  //   if (scrollPosition) {
  //     window.scrollTo(0, parseInt(scrollPosition, 10));
  //   }
  // }, [data, page]);

  return (
    <>
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
        <Items searchVal={searchVal} items={data} param={param} setParam={(val) => setParam(val)} />
      )}
      {!searchVal && (
        <Pagination
          passNum={(n) => setPage(n)}
          handleClick={(n) => setActive(n)}
          active={active}
          setLimit={(val) => setLimit(val)}
          limit={limit}
          data={dataAll}
        />
      )}
    </>
  );
};
