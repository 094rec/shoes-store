import { useState, useMemo, createContext, Dispatch, SetStateAction, PropsWithChildren } from 'react';

export type CartType = {
  cartState: boolean;
  setCartState: Dispatch<SetStateAction<boolean>>;
};

export const CartContext = createContext<CartType | undefined>(undefined);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartState, setCartState] = useState(false);
  const val = useMemo(() => ({ cartState, setCartState }), [cartState]);

  return <CartContext.Provider value={val}>{children}</CartContext.Provider>;
};
