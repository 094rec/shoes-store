import { z } from 'zod';

const MAX_NUM = 20;

const itemSchema = z.object({
  id: z.string().refine((val) => {
    const num = Number(val);
    return !isNaN(num) && num >= 1 && num <= MAX_NUM;
  }),
  title: z.string(),
  img: z.string(),
  price: z.number().int(),
  qnt: z.number().int(),
});
export type TCartItem = z.infer<typeof itemSchema>;

const cartSchema = z.object({
  items: z.array(itemSchema),
  total: z.number().int().nonnegative(),
  totalQnt: z.number().int().nonnegative(),
});

export const valCartPersistedState = (persistedState: any, currentState: any) => {
  const parsedCart = cartSchema.safeParse(persistedState);

  if (!parsedCart.success) {
    localStorage.setItem(
      'cart-state',
      JSON.stringify({ state: { items: [], total: 0, totalQnt: 0 }, version: 0 }),
    );
    return {
      ...currentState,
      items: [],
      total: 0,
      totalQnt: 0,
    };
  }

  return {
    ...currentState,
    ...persistedState,
  };
};
