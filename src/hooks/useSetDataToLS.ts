import React from 'react';
import { TItem } from '../pages/home-page';
import { TCartItem } from '../store';

export const useSetDataToLS = ({
  // items,
  // page,
  // limit,
  dataAll,
  // param,
  btnState,
  id,
}: {
  items?: TCartItem[];
  page?: number;
  limit?: number;
  dataAll?: TItem[];
  param?: string;
  btnState?: boolean;
  id?: string;
}) => {
  // const isMounted = React.useRef(false);
  // {
  //   React.useEffect(() => {
  //     if (isMounted.current && items) {
  //       localStorage.setItem('data', JSON.stringify(items));
  //     }
  //     isMounted.current = true;
  //   }, [items]);
  // }

  // {
  //   React.useEffect(() => {
  //     if (page) localStorage.setItem('pagPage', page.toString());
  //   }, [page]);
  // }

  // {
  //   React.useEffect(() => {
  //     if (limit) localStorage.setItem('pagLimit', limit.toString());
  //   }, [limit]);
  // }

  {
    React.useEffect(() => {
      if (dataAll && dataAll.length > 0) {
        localStorage.setItem(
          'data-colors',
          JSON.stringify(dataAll.map((el) => ({ id: el.id, color: el.color }))),
        );
      }
    }, [dataAll]);
  }
  // {
  //   React.useEffect(() => {
  //     if (param) localStorage.setItem('searchParam', param);
  //   }, [param]);
  // }
  {
    React.useEffect(() => {
      if (id && btnState) {
        localStorage.setItem(`btnState-${id}`, JSON.stringify(btnState));
      }
    }, [btnState, id]);
  }
};
