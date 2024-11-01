import { useCartStore } from '@/store';
import { TCartItem } from '.';

type PersistedCartState = {
  state?: {
    items: TCartItem[];
    total: number;
    totalQnt: number;
  };
  version?: number;
};

export const initCartStore = () => {
  const jsonString = localStorage.getItem('cart-state');
  
  let persistedState: PersistedCartState = {};

  try {
    persistedState = JSON.parse(jsonString || '{}');
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    persistedState = { state: { items: [], total: 0, totalQnt: 0 }, version: 0 };
  }
  
  const items = persistedState?.state?.items || [];
  const total = typeof persistedState?.state?.total === 'number' ? persistedState.state.total : 0;
  const totalQnt = typeof persistedState?.state?.totalQnt === 'number' ? persistedState.state.totalQnt : 0;

  useCartStore.setState({
    items,
    total,
    totalQnt,
  });
};
