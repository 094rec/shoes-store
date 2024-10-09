import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selById } from '../store/slices/cartSlice';
import { useCartContext, useSetDataToLS } from '.';
import { getDataFromLS, toast } from '../utils';

type CartBtnProps = {
  id: string;
  title: string;
  img: string;
  price: number;
};

export const useItemBtnsLogic = ({ id, title, img, price }: CartBtnProps) => {
  const disp = useDispatch();
  const { setCartState } = useCartContext();
  const item = useSelector(selById(id));
  const { initSt } = getDataFromLS(id);
  const [btnState, setBtnState] = React.useState(initSt);

  React.useEffect(() => {
    if (!item) setBtnState(false);
  }, [item]);

  useSetDataToLS({ btnState, id });

  const addItemBtn = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      if (!btnState && id) {
        disp(addItem({ id, title, img, price, qnt: 1 }));
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
      disp(addItem({ id, title, img, price, qnt: 1 }));
      toast('Item added');
    }
  }, [id, title, img, price, btnState]);

  return { btnState, addItemBtn, addItemBtnCart };
};
