import { z } from 'zod';

export const cartItemsSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    img: z.string(),
    price: z.number().int().positive(),
    qnt: z.number().int().positive(),
  }),
);

export const colorsSchema = z.array(z.object({ id: z.string(), color: z.string() }));

export const limitSchema = (itemCount: number) => {
  return z.coerce
    .number()
    .int()
    .refine((val) => [4, 6, itemCount].includes(val));
};

export const parameterSchema = z
  .string()
  .refine((val) => ['title', 'price', 'rank'].includes(val));

export const pageSchema = (pageCount: number) => {
  return z.coerce.number().int().min(1).max(pageCount);
};

export const stateSchema = z.coerce.boolean();
