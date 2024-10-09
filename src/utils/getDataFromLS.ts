import { partItem } from '../pages/shoe-page';

export const getDataFromLS = (id?: string) => {
  const storedPage = localStorage.getItem('pagPage');
  const storedLim = localStorage.getItem('pagLimit');
  const storedParam = localStorage.getItem('searchParam');
  const storedCol = localStorage.getItem('data-colors');
  const storedSt = localStorage.getItem(`btnState-${id}`);

  const initPage = storedPage ? +storedPage : 1;
  const initLim = storedLim ? +storedLim : 4;
  const initAct = storedPage ? +storedPage : 1;
  const initParam = storedParam ? storedParam : 'title';
  const initCol: partItem[] = storedCol ? JSON.parse(storedCol) : [];
  const initSt: boolean = storedSt ? JSON.parse(storedSt) : false;
  
  return { initPage, initLim, initAct, initParam, initCol, initSt };
};

