export const parseData = (name: string) => {
  let data = [];
  const rawData = localStorage.getItem(`${name}`);
  try {
    if (!rawData) throw new Error(`Empty ${name} ls`);
    data = JSON.parse(rawData);
    if (!Array.isArray(data)) throw new Error();
  } catch (error) {
    console.warn(`Invalid ${name} ls. Clearing...`);
    localStorage.removeItem(`${name}`);
    localStorage.setItem(`${name}`, JSON.stringify([]));
  }
  return data;
};

export const resetData = (name: string, defValue: any = []) => {
  localStorage.removeItem(`${name}`);
  localStorage.setItem(`${name}`, JSON.stringify(defValue));
}