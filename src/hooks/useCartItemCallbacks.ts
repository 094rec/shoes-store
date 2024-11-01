import React from 'react';
import { useNavigate } from 'react-router-dom';
import { decItem, incItem, removeItem, useCartStateStore } from '@/store';
import { useItemById, useLeftOne } from './useSelectors';
import { TCartItem } from '@/utils';

export const useCartItemCallbacks = ({ id, title, img, price }: TCartItem) => {
  const nav = useNavigate();
  const setCartState = useCartStateStore((state) => state.setCartState);
  const item = useItemById(id); //react selector
  const isLeftOne = useLeftOne(id); //react selector

  const handleIncrease = React.useCallback(() => {
    incItem({ id, title, img, price });
  }, [id, title, img, price]);

  const handleImg = React.useCallback(() => {
    nav(`/shoes/${id}`);
    setCartState(false);
  }, [id, setCartState]);

  const handleDecrease = React.useCallback(() => {
    decItem(id);
    setTimeout(() => {
      if (isLeftOne && item && (item.qnt ?? 0) < 2) {
        setCartState(false);
      }
    }, 0);
  }, [id, item, isLeftOne]);

  const handleDel = React.useCallback(() => {
    removeItem(id);
    setTimeout(() => {
      if (isLeftOne) setCartState(false);
    }, 0);
  }, [id, isLeftOne]);

  return { handleIncrease, handleDecrease, handleImg, handleDel };
};
