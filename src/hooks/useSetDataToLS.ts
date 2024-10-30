import React from 'react';
import { TItem } from '../pages/home-page';

export const useSetDataToLS = ({
  dataAll,
  btnState,
  id,
}: {
  dataAll?: TItem[];
  btnState?: boolean;
  id?: string;
}) => {
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
  {
    React.useEffect(() => {
      if (id && btnState) {
        localStorage.setItem(`btnState-${id}`, JSON.stringify(btnState));
      }
    }, [btnState, id]);
  }
};
