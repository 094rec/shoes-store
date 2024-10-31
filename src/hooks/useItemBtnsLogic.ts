import React from 'react';
import { useBtnStore, useCartStateStore, useCartStore } from '../store';
import { toast } from '../utils';

type CartBtnProps = {
  id: string;
  title: string;
  img: string;
  price: number;
};

export const useItemBtnsLogic = ({ id, title, img, price }: CartBtnProps) => {
  const { setCartState } = useCartStateStore();
  const incItem = useCartStore((state) => state.incItem);
  const item = useCartStore((state) => state.selById(id));

  const btnState = useBtnStore((state) => state.btnState[id]);
  const setBtnState = useBtnStore((state) => state.setBtnState);

  React.useEffect(() => {
    if (!item) setBtnState(id, false);
  }, [item]);

  const addItemBtn = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      if (!btnState && id) {
        incItem({ id, title, img, price });
        toast('Item added');
      }
      setCartState(true);
      setBtnState(id, true);
    },
    [id, title, img, price, btnState],
  );

  const addItemBtnCart = React.useCallback(() => {
    setBtnState(id, true);
    if (!btnState) {
      incItem({ id, title, img, price });
      toast('Item added');
    }
  }, [id, title, img, price, btnState]);

  return { btnState, addItemBtn, addItemBtnCart };
};
