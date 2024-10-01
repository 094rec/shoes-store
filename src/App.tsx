import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { HomePage } from './pages/home-page/index.tsx';
import { ShoePage } from './pages/shoe-page';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export type SearchType = {
  searchVal: string;
  setSearchVal: React.Dispatch<React.SetStateAction<string>>;
};

export type CartType = {
  cartState: boolean;
  setCartState: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchContext = React.createContext<SearchType | undefined>(undefined);
export const CartContext = React.createContext<CartType | undefined>(undefined);

const App = () => {
  const [searchVal, setSearchVal] = React.useState('');
  const [cartState, setCartState] = React.useState(false);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/shoes/:id" element={<ShoePage />} />
        <Route path="*" element={<>err304</>} />
      </Route>,
    ),
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <CartContext.Provider value={{ cartState, setCartState }}>
            <SearchContext.Provider value={{ searchVal, setSearchVal }}>
              <RouterProvider router={router} />
              <ToastContainer />
            </SearchContext.Provider>
          </CartContext.Provider>
        </Provider>
      </QueryClientProvider>
    </>
  );
};

export default App;
