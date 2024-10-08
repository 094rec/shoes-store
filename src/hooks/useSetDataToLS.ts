import React from 'react';
import { TCartItem } from '../store/slices/cartSlice.ts';
import { TItem } from '../pages/home-page/index.tsx';

export const useSetDataToLS = (
  items?: TCartItem[],
  page?: number,
  limit?: number,
  dataAll?: TItem[],
  param?: string,
) => {
  const isMounted = React.useRef(false);
  {
    React.useEffect(() => {
      if (isMounted.current) {
        items && localStorage.setItem('data', JSON.stringify(items));
      }
      isMounted.current = true;
    }, [items]);
  }

  {
    React.useEffect(() => {
      page && localStorage.setItem('pagPage', page.toString());
    }, [page]);
  }

  {
    React.useEffect(() => {
      limit && localStorage.setItem('pagLimit', limit.toString());
    }, [limit]);
  }

  {
    React.useEffect(() => {
      dataAll &&
        localStorage.setItem(
          'data-colors',
          JSON.stringify(
            dataAll.map((el) => ({ id: el.id, color: el.color })),
          ),
        );
    }, [dataAll]);
  }
  {
    React.useEffect(() => {
      param && localStorage.setItem('searchParam', param);
    }, [param]);
  }
};
