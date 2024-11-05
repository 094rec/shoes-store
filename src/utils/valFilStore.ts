import { z } from 'zod';

//@logic reseting of maxpage sets in pagination/index
const pageSchema = z.coerce.number().int().min(1); 
const limitSchema = (count: number) => {
  return z.coerce
    .number()
    .int()
    .refine((val) => [4, 6, count].includes(val));
};
const paramSchema = z.string().refine((val) => ['title', 'price', 'rank'].includes(val));

export const valFilPersistedState = (persistedState: any, currentState: any) => {
  const parsedPage = pageSchema.safeParse(persistedState?.page);
  const parsedLimit = limitSchema(persistedState?.count).safeParse(persistedState?.limit);
  const parsedParam = paramSchema.safeParse(persistedState?.param);

  return {
    ...currentState,
    ...persistedState,
    page: parsedPage.success ? parsedPage.data : 1,
    limit: parsedLimit.success ? parsedLimit.data : 4,
    param: parsedParam.success ? parsedParam.data : 'title',
  };
};
