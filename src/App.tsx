// import { Suspense } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/home-page';
import { ToastContainer } from 'react-toastify';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/queryClient';
import ShoePage from './pages/shoe-page/index.tsx';
// const ShoePage = React.lazy(() => import('./pages/shoe-page'));

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/shoes/:id" element={<ShoePage />} />
        <Route path="*" element={<p className="mt-14">err304</p>} />
      </Route>,
    ),
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <Suspense fallback={<div>...loading</div>}> */}
        <RouterProvider router={router} />
        <ToastContainer />
        {/* </Suspense> */}
      </QueryClientProvider>
    </>
  );
};

export default App;
