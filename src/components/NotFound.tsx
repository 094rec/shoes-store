import { cn } from '@/lib/utils';

type Props = {
  title: string;
  className?: string;
};

export const NotFound = ({ title, className }: Props) => {
  return (
    <p
      className={cn(
          'w-10/12 m-auto font-medium filter drop-shadow-md text-center text-lg xx:text-xl',
          className,
      )}
    >
      {title}
      <span className="whitespace-nowrap">(·•᷄∩•᷅ )</span>
    </p>
  );
};
