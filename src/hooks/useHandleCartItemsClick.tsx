import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from './useCartContext';
import { addItem, delItem, removeItem, TCartItem } from '../redux/slices/cartSlice';

export const useHandleCartItemsClick = ({ id, title, img, price, qnt }: TCartItem) => {
  const disp = useDispatch();
  const nav = useNavigate();
  const { setCartState } = useCartContext();

  const handleIncrease = React.useCallback(() => {
    disp(addItem({ id, title, img, price, qnt }));
  }, [id, title, img, price]);

  const handleDecrease = React.useCallback(() => {
    disp(removeItem({ id }));
  }, [id]);

  const handleImg = React.useCallback(() => {
    nav(`/shoes/${id}`);
    setCartState(false);
  }, [id, nav, setCartState]);

  const handleDel = React.useCallback(() => {
    disp(delItem({ id }));
  }, [id]);

  return { handleIncrease, handleDecrease, handleImg, handleDel };
};
