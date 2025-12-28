import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DailyDhammaCardProps {
  teaching: {
    id: string;
    title: string;
    category?: {
      name: string;
      icon: string | null;
    } | null;
  };
  excerpt?: string | null;
  className?: string;
}

const DailyDhammaCard = ({ teaching, excerpt, className }: DailyDhammaCardProps) => {
  return (
    <div className={cn(
      'relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-temple-gold/5 to-transparent border border-primary/20 p-6 md:p-8',
      className
    )}>
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-2xl" />
      
      <div className="relative z-10">
        {/* Label */}
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary animate-glow" />
          <span className="font-myanmar text-sm font-medium text-primary">
            ယနေ့ဓမ္မတရား
          </span>
        </div>

        {/* Category */}
        {teaching.category && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-xs font-myanmar mb-4">
            <span>{teaching.category.icon}</span>
            <span>{teaching.category.name}</span>
          </span>
        )}

        {/* Title */}
        <h2 className="font-myanmar text-xl md:text-2xl font-bold text-foreground mb-4">
          {teaching.title}
        </h2>

        {/* Excerpt */}
        {excerpt && (
          <p className="font-myanmar text-muted-foreground leading-relaxed mb-6 line-clamp-3">
            {excerpt}
          </p>
        )}

        {/* CTA */}
        <Link to={`/teaching/${teaching.id}`}>
          <Button variant="golden" className="gap-2 font-myanmar">
            ဆက်ဖတ်ရန်
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DailyDhammaCard;
