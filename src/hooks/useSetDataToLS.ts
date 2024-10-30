import React from 'react';

export const useSetDataToLS = ({ btnState, id }: { btnState?: boolean; id?: string }) => {
  {
    React.useEffect(() => {
      if (id && btnState) {
        localStorage.setItem(`btnState-${id}`, JSON.stringify(btnState));
      }
    }, [btnState, id]);
  }
};
