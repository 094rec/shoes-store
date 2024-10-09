type Item = {
  price: number;
  qnt: number;
};

const recalculateTotals = (items: Item[]) => {
  const total = items.reduce((c, { price, qnt }) => c + price * qnt, 0);
  const totalQnt = items.reduce((c, { qnt }) => c + qnt, 0);
  return { total, totalQnt };
};

export const getCartDataFromLS = () => {
  const data = localStorage.getItem('data');
  const items = data ? JSON.parse(data) : [];
  const { total, totalQnt } = recalculateTotals(items);
  return { items, total, totalQnt };
};
