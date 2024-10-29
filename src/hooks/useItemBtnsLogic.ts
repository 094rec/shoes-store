import React from 'react';
import { useCartStateStore, useCartStore } from '../store';
import { useSetDataToLS } from '.';
import { getDataFromLS, toast } from '../utils';

type CartBtnProps = {
  id: string;
  title: string;
  img: string;
  price: number;
};

export const useItemBtnsLogic = ({ id, title, img, price }: CartBtnProps) => {
  const { setCartState } = useCartStateStore();
  const initSt = getDataFromLS(id).initSt;
  const [btnState, setBtnState] = React.useState(initSt);
  const incItem = useCartStore((state) => state.incItem);
  const item = useCartStore((state) => state.selById(id));

  React.useEffect(() => {
    if (!item) setBtnState(false);
  }, [item]);

  useSetDataToLS({ btnState, id });

  const addItemBtn = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      if (!btnState && id) {
        incItem({ id, title, img, price });
        toast('Item added');
      }
      setCartState(true);
      setBtnState(true);
    },
    [id, title, img, price, btnState],
  );

  const addItemBtnCart = React.useCallback(() => {
    setBtnState(true);
    if (!btnState) {
      incItem({ id, title, img, price });
      toast('Item added');
    }
  }, [id, title, img, price, btnState]);

  return { btnState, addItemBtn, addItemBtnCart };
};
