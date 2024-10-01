import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCartContext } from './useCartContext';
import { addItem, selectCart } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';

type CartBtnProps = {
  id: string;
  title: string;
  img: string;
  price: string;
};

type CartBtnRes = {
  btnState: boolean;
  addItemBtn: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  addItemBtnCart?: () => void;
};

export const useCartButton = ({ id, title, img, price }: CartBtnProps): CartBtnRes => {
  const disp = useDispatch();
  const { setCartState } = useCartContext();
  const { items } = useSelector(selectCart);

  const [btnState, setBtnState] = React.useState(() => {
    const savedState = localStorage.getItem(`btnState-${id}`);
    return savedState ? JSON.parse(savedState) : false;
  });

  React.useEffect(() => {
    const item = items.find((el) => el.id === id);
    if (!item) setBtnState(false);
  }, [items]);

  React.useEffect(() => {
    localStorage.setItem(`btnState-${id}`, JSON.stringify(btnState));
  }, [btnState, id]);

  const addItemBtn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (!btnState && id) {
      disp(addItem({ id, title, img, price, qnt: 1 }));
      toast.success('Item added', {
        position: 'bottom-right',
        closeOnClick: true,
        autoClose: 1000,
        hideProgressBar: true,
      });
    }
    setCartState(true);
    setBtnState(true);
  };

  const addItemBtnCart = () => {
    setBtnState(true);
    if (!btnState) {
      disp(addItem({ id, title, img, price, qnt: 1 }));
      toast.success('Item added', {
        position: 'bottom-right',
        closeOnClick: true,
        autoClose: 1000,
        hideProgressBar: true,
      });
    }
  };

  return { btnState, addItemBtn, addItemBtnCart };
};
