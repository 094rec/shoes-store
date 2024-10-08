type Item = {
  price: number;
  qnt: number;
};

export const recalculateTotals = (items: Item[]) => {
  const total = items.reduce((c, { price, qnt }) => c + price * qnt, 0);
  const totalQnt = items.reduce((c, { qnt }) => c + qnt, 0);
  return { total, totalQnt };
};
