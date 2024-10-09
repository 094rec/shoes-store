import React from 'react';
import { SearchContext } from '../contexts/SearchContext';

export const useSearchContext = () => {
  const context = React.useContext(SearchContext);
  if (!context) {
    throw new Error("Search context unavailable");
  }
  return context;
};