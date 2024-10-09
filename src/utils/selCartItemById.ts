import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { selectById } from '../store/slices/cartSlice';

export const selCartItemById = (id: string) => {
  const item = useSelector(
      (state: RootState) => selectById(state, id),
      (prevItem, nextItem) => prevItem === nextItem, 
    );
  return { item };
}
