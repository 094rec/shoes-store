import { recalculateTotals } from './recalculateTotals';

export const getCartDataFromLS = () => {
  const data = localStorage.getItem('data');
  const items = data ? JSON.parse(data) : [];
  const { total, totalQnt } = recalculateTotals(items);
  return { items, total, totalQnt };
};
