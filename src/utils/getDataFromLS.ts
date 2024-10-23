import {
  cartItemsSchema,
  colorsSchema,
  limitSchema,
  pageSchema,
  parameterSchema,
  stateSchema,
} from '../schemas';
import {
  recalculateTotals,
  parseData,
  resetData,
  DEFAULT_ITEM_COUNT,
  DEFAULT_LIMIT,
  DEFAULT_PARAM,
} from '.';

export const getDataFromLS = (id?: string) => {
  //getting data from ls for items/page/limit/param/colors/state
  const storedItems = parseData('data');
  const storedCol = parseData('data-colors');

  const storedPage = localStorage.getItem('pagPage');
  const storedLim = localStorage.getItem('pagLimit');
  const storedParam = localStorage.getItem('searchParam');
  const storedSt = localStorage.getItem(`btnState-${id}`);

  //count items and pages
  const itemCount = storedCol ? storedCol.length : DEFAULT_ITEM_COUNT;
  const pageCount = storedLim ? Math.ceil(itemCount / +storedLim) : itemCount;
  //validate items
  const parsedItems = cartItemsSchema.safeParse(storedItems);
  const validatedItems = parsedItems.success ? parsedItems.data : [];
  if (!parsedItems.success) resetData('data');
  //validate colors
  const parsedCol = colorsSchema.safeParse(storedCol);
  const validatedCol = parsedCol.success ? parsedCol.data : [];
  if (!parsedCol.success) resetData('data-colors');
  //validate limit
  const parsedLim = limitSchema(itemCount).safeParse(storedLim);
  const validatedLim = parsedLim.success ? parsedLim.data : DEFAULT_LIMIT;
  //validate param
  const parsedParam = parameterSchema.safeParse(storedParam);
  const validatedParam = parsedParam.success ? parsedParam.data : DEFAULT_PARAM;
  //validate page
  const parsedPage = pageSchema(pageCount).safeParse(storedPage);
  const validatedPage = parsedPage.success ? parsedPage.data : 1;
  //validate state
  const parsedSt = stateSchema.safeParse(storedSt);
  const validatedSt = parsedSt.success ? parsedSt.data : false;

  //recalculate totals
  const { total, totalQnt } = recalculateTotals(validatedItems);

  return {
    items: validatedItems,
    initLim: validatedLim,
    initParam: validatedParam,
    initPage: validatedPage,
    initAct: validatedPage,
    initCol: validatedCol,
    initSt: validatedSt,
    total,
    totalQnt,
  };
};
