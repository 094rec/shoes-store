import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from './useCartContext';
import {
  addItem,
  delItem,
  removeItem,
  selectCart,
  TCartItem,
} from '../redux/slices/cartSlice';

export const useCartItemCallbacks = ({ id, title, img, price, qnt }: TCartItem) => {
  const disp = useDispatch();
  const nav = useNavigate();
  const { setCartState } = useCartContext();
  const { items } = useSelector(selectCart);

  const checkingItems = React.useCallback(
    (action: string) => {
      setTimeout(() => {
        const item = items.find((el) => el.id === id);
        const updatedItems = items.filter((el) => el.id !== id);
        if (updatedItems.length === 0) {
          if (item && action === 'decr' && item.qnt < 2) {
            setCartState(false);
          } else if (action === 'del') {
            setCartState(false);
          }
        }
      }, 100);
    },
    [items, id, setCartState],
  );

  const handleIncrease = React.useCallback(() => {
    disp(addItem({ id, title, img, price, qnt }));
  }, [id, title, img, price]);

  const handleDecrease = React.useCallback(() => {
    disp(removeItem({ id }));
    setTimeout(() => checkingItems('decr'), 0);
  }, [id, checkingItems]);

  const handleImg = React.useCallback(() => {
    nav(`/shoes/${id}`);
    setCartState(false);
  }, [id, nav, setCartState]);

  const handleDel = React.useCallback(() => {
    disp(delItem({ id }));
    setTimeout(() => checkingItems('del'), 0);
  }, [id, checkingItems]);

  return { handleIncrease, handleDecrease, handleImg, handleDel };
};
