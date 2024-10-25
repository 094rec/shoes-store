import { twMerge } from 'tailwind-merge';

type Props = {
  children: React.ReactNode;
  color?: string;
  className?: string;
};

export const Containter = ({ children, color, className }: Props) => {
  return (
    <div
      className={twMerge(
        'relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b p-6 from-blue-500 to-blue-400',
        className,
        color,
      )}
    >
      {children}
    </div>
  );
};
