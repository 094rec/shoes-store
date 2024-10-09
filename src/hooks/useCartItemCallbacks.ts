import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCartContext, useLeftOne, useSelCartItemById } from '.';
import {
  addItem,
  delItem,
  removeItem,
  TCartItem,
} from '../store/slices/cartSlice';

// import { useWhyDidYouUpdate } from 'ahooks';///

export const useCartItemCallbacks = ({ id, title, img, price, qnt }: TCartItem) => {
  const disp = useDispatch();
  const nav = useNavigate();
  const { setCartState } = useCartContext();

  const { item } = useSelCartItemById(id);
  const isLeftOne = useLeftOne(id);


  const checkingItems = React.useCallback(
    (action: string) => {
      setTimeout(() => {
        if (isLeftOne) {
          if (item && action === 'decr' && item.qnt < 2) {
            setCartState(false);
          } else if (action === 'del') {
            setCartState(false);
          }
        }
      }, 100);
    },
    [item, isLeftOne],
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
  }, [id, setCartState]);

  const handleDel = React.useCallback(() => {
    disp(delItem({ id }));
    setTimeout(() => checkingItems('del'), 0);
    }, [id, checkingItems]);

  // useWhyDidYouUpdate('useCartItemCallback', { id, title, img, price, qnt, disp, nav, setCartState, handleIncrease, handleDecrease, handleImg, handleDel });///

  return { handleIncrease, handleDecrease, handleImg, handleDel };
};
