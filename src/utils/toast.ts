import { toast as toastify } from 'react-toastify';

export const toast = (
  message: string,
  type: 'success' | 'error' | 'info' | 'warning' = 'success',
) => {
  toastify[type](message, {
    position: 'bottom-right',
    closeOnClick: true,
    autoClose: 1000,
    hideProgressBar: true,
  });
};
