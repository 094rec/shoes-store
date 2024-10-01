export const request = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Bad network response');
    return await res.json();
  } catch (err) {
    console.error('Error fetching data: ', err);
    return null;
  }
};
