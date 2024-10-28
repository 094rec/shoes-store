import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCartStateStore } from '../store';
import {
  addItem,
  delItem,
  leftOne,
  removeItem,
  selById,
  TCartItem,
} from '../store/slices/cartSlice';

export const useCartItemCallbacks = ({ id, title, img, price, qnt }: TCartItem) => {
  const disp = useDispatch();
  const nav = useNavigate();
  const { setCartState } = useCartStateStore();
  const isLeftOne = useSelector(leftOne(id));
  const item = useSelector(selById(id));

  const handleIncrease = React.useCallback(() => {
    disp(addItem({ id, title, img, price, qnt }));
  }, [id, title, img, price]);

  const handleImg = React.useCallback(() => {
    nav(`/shoes/${id}`);
    setCartState(false);
  }, [id, setCartState]);

  const handleDecrease = React.useCallback(() => {
    disp(removeItem({ id }));
    setTimeout(() => {
      if (isLeftOne && item && item.qnt < 2) {
        setCartState(false);
      }
    }, 0);
  }, [id, item, isLeftOne]);

  const handleDel = React.useCallback(() => {
    disp(delItem({ id }));
    setTimeout(() => {
      if (isLeftOne) setCartState(false);
    }, 0);
  }, [id, isLeftOne]);

  return { handleIncrease, handleDecrease, handleImg, handleDel };
};
