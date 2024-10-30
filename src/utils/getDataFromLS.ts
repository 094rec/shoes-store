import { z } from 'zod'; //??

const stateSchema = z.coerce.boolean();

export const getDataFromLS = (id?: string) => {
  const storedSt = localStorage.getItem(`btnState-${id}`);

  const parsedSt = stateSchema.safeParse(storedSt);
  const validatedSt = parsedSt.success ? parsedSt.data : false;

  return {
    initSt: validatedSt,
  };
};
