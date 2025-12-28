import { cn } from '@/lib/utils';

interface LotusDecorationProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LotusDecoration = ({ className, size = 'md' }: LotusDecorationProps) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl',
  };

  return (
    <div className={cn('lotus-divider', className)}>
      <span className={cn('px-4 text-primary animate-glow', sizeClasses[size])}>
        ❀
      </span>
    </div>
  );
};

export default LotusDecoration;
