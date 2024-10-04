import { useNavigate } from 'react-router-dom';

export const useCustomNav = () => {
  const nav = useNavigate();
  // return React.useCallback((path: string) => nav(path), [nav]);
  return nav;
};
