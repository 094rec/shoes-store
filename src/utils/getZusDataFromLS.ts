  export const getZusDataFromLS = (name: string) => {
    const rawData = localStorage.getItem(`${name}`);
    if (!rawData) {
      console.warn(`Empty ${name}`);
      return null;
    }
    try {
      const data = JSON.parse(rawData);
      if (typeof data !== 'object' || data === null) {
        throw new Error(`Invalid ${name}`);
      }
      return data.state || {};
    } catch (e) {
      console.warn(`Failed to parse ${name}: ${(e as Error).message}`);
      localStorage.removeItem(`${name}`);
    }
  };

  // const getZusDataFromLS = (name: string) => {
  //   let data = [];
  //   const rawData = localStorage.getItem(`${name}`);
  //   try {
  //     if (!rawData) throw new Error(`Empty ${name}`);
  //     data = JSON.parse(rawData);
  //     if (typeof data !== 'object') throw new Error();
  //   } catch (err) {
  //     console.warn(`Invalid ${name}`);
  //     localStorage.removeItem(`${name}`);
  //   }
  //   return data?.state || {};
  // };
