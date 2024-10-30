import { z } from 'zod';
import { parseData, resetData } from './preparingData';

const colorsSchema = z.array(z.object({ id: z.string(), color: z.string() }));
const stateSchema = z.coerce.boolean();

export const getDataFromLS = (id?: string) => {
  const storedCol = parseData('data-colors');
  const storedSt = localStorage.getItem(`btnState-${id}`);

  const parsedCol = colorsSchema.safeParse(storedCol);
  const validatedCol = parsedCol.success ? parsedCol.data : [];
  if (!parsedCol.success) resetData('data-colors');

  const parsedSt = stateSchema.safeParse(storedSt);
  const validatedSt = parsedSt.success ? parsedSt.data : false;

  return {
    initCol: validatedCol,
    initSt: validatedSt,
  };
};
