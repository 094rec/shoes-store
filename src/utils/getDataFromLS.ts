export const getDataFromLS = () => {
  const storedPage = localStorage.getItem('pagPage');
  const storedLim = localStorage.getItem('pagLimit');
  const storedParam = localStorage.getItem('searchParam');

  const initPage = storedPage ? +storedPage : 1;
  const initLim = storedLim ? +storedLim : 4;
  const initAct = storedPage ? +storedPage : 1;
  const initParam = storedParam ? storedParam : 'title';

  return { initPage, initLim, initAct, initParam };
};
