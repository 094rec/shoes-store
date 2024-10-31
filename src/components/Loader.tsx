import { MoonLoader, PulseLoader } from 'react-spinners';

type Props = {
  type?: 'moon' | 'pulse';
  color?: string;
  size?: number;
  loading: boolean;
  opacity?: number;
}

export const Loader = ({
  type = 'moon',
  color = '#227cdf',
  size = 80,
  loading,
  opacity = 100,
}: Props) => {
  const LoaderComp = type === 'moon' ? MoonLoader : PulseLoader;
  if (!loading) return null;
  return (
    <div className={`absolute z-20 flex justify-center items-center h-screen w-full opacity-${opacity}`}>
      <LoaderComp color={color} size={size} loading={loading} />
    </div>
  );
};