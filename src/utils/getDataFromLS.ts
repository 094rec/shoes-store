import { partItem } from '../pages/shoe-page';
import { recalculateTotals } from '.';

export const getDataFromLS = (id?: string) => {
  const storedItems = localStorage.getItem('data');
  const storedPage = localStorage.getItem('pagPage');
  const storedLim = localStorage.getItem('pagLimit');
  const storedParam = localStorage.getItem('searchParam');
  const storedCol = localStorage.getItem('data-colors');
  const storedSt = localStorage.getItem(`btnState-${id}`);

  const items = storedItems ? JSON.parse(storedItems) : [];
  const initPage = storedPage ? +storedPage : 1;
  const initLim = storedLim ? +storedLim : 4;
  const initAct = storedPage ? +storedPage : 1;
  const initParam = storedParam ? storedParam : 'title';
  const initCol: partItem[] = storedCol ? JSON.parse(storedCol) : [];
  const initSt: boolean = storedSt ? JSON.parse(storedSt) : false;

  const { total, totalQnt } = recalculateTotals(items);

  return { initPage, initLim, initAct, initParam, initCol, initSt, items, total, totalQnt };
};
