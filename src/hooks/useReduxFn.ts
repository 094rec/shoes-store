import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { leftOne, selById, selectCart } from '../store/slices/cartSlice';

export const useSelCartItemById = (id: string) => {
  const item = useSelector(
      (state: RootState) => selById(state, id),
      (prevItem, nextItem) => prevItem === nextItem, 
    );
  return React.useMemo(() => ({ item }), [item]);
}

export const useLeftOne = (id: string) => {
  const bool = useSelector(
      (state: RootState) => leftOne(state, id),
      (prevItem, nextItem) => prevItem === nextItem, 
    );
  // return React.useMemo(() => state, [state]);
  return bool;
}

export const useSelCartItems = () => {
  const items = useSelector(
    (state: RootState) => selectCart(state),
    (prevItems, nextItems) => prevItems === nextItems,
  );

  return React.useMemo(() => {items}, [items]);
};