import React, { PropsWithChildren } from 'react';

export type SearchType = {
  searchVal: string;
  setSearchVal: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchContext = React.createContext<SearchType | undefined>(undefined);

export const SearchProvider = ({ children }: PropsWithChildren) => {
  const [searchVal, setSearchVal] = React.useState('');

  return <SearchContext.Provider value={{searchVal, setSearchVal}}>{children}</SearchContext.Provider>;
};
