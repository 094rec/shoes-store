import React from 'react';
import { useNavigate } from 'react-router-dom';
import { decItem, incItem, removeItem, useCartStateStore } from '@/store';
import { useItemById, useLeftOne } from './useSelectors';
import { TCartItem } from '@/utils';

export const useCartItemBtnsLogic = ({ id, title, img, price }: TCartItem) => {
  const nav = useNavigate();
  const setCartState = useCartStateStore((state) => state.setCartState);
  const item = useItemById(id); //reactive sel
  const isLeftOne = useLeftOne(id); //reactive sel

  const onInc = React.useCallback(() => {
    incItem({ id, title, img, price });
  }, [id, title, img, price]);

  const onImgClick = React.useCallback(() => {
    nav(`/shoes/${id}`);
    setCartState(false);
  }, [id, setCartState]);

  const onDec = React.useCallback(() => {
    decItem(id);
    setTimeout(() => {
      if (isLeftOne && item && (item.qnt ?? 0) < 2) {
        setCartState(false);
      }
    }, 0);
  }, [id, item, isLeftOne]);

  const onRemove = React.useCallback(() => {
    removeItem(id);
    setTimeout(() => {
      if (isLeftOne) setCartState(false);
    }, 0);
  }, [id, isLeftOne]);

  return { onInc, onDec, onImgClick, onRemove };
};
