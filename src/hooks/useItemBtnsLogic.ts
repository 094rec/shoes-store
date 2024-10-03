import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCartContext } from './useCartContext';
import { addItem, selectCart } from '../redux/slices/cartSlice';
import { toast } from '../utils/toast';

type CartBtnProps = {
  id: string;
  title: string;
  img: string;
  price: string;
};

export const useItemBtnsLogic = ({ id, title, img, price }: CartBtnProps) => {
  const disp = useDispatch();
  const { setCartState } = useCartContext();
  const { items } = useSelector(selectCart);

  const [btnState, setBtnState] = React.useState(() => {
    const savedState = localStorage.getItem(`btnState-${id}`);
    return savedState ? JSON.parse(savedState) : false;
  });

  const curItem = React.useMemo(() => items.find((el) => el.id === id), [items, id]);

  React.useEffect(() => {
    if (!curItem) setBtnState(false);
  }, [curItem]);

  React.useEffect(() => {
    localStorage.setItem(`btnState-${id}`, JSON.stringify(btnState));
  }, [btnState, id]);

  const addItemBtn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (!btnState && id) {
      disp(addItem({ id, title, img, price, qnt: 1 }));
      toast('Item added');
    }
    setCartState(true);
    setBtnState(true);
  };

  const addItemBtnCart = React.useCallback(() => {
    setBtnState(true);
    if (!btnState) {
      disp(addItem({ id, title, img, price, qnt: 1 }));
      toast('Item added');
    }
  }, [id, title, img, price, setBtnState ]);

  return { btnState, addItemBtn, addItemBtnCart };
};
