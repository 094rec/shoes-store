import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TCartItem, useCartStateStore, useCartStore  } from '../store';

export const useCartItemCallbacks = ({ id, title, img, price }: TCartItem) => {
  const nav = useNavigate();
  const { setCartState } = useCartStateStore();
  const incItem = useCartStore((state) => state.incItem);
  const decItem = useCartStore((state) => state.decItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const item = useCartStore((state) => state.selById(id));
  const isLeftOne = useCartStore((state) => state.leftOne(id));


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
