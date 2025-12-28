import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
  count: number;
  index: number;
}

const CategoryCard = ({ id, name, nameEn, description, icon, count, index }: CategoryCardProps) => {
  return (
    <Link
      to={`/teachings?category=${id}`}
      className={cn(
        'group relative block p-6 rounded-xl bg-card border border-border overflow-hidden transition-all duration-300 hover:shadow-soft hover:border-primary/30 hover:-translate-y-1',
        'opacity-0 animate-fade-in'
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      {/* Content */}
      <h3 className="font-myanmar font-semibold text-lg text-foreground mb-1">
        {name}
      </h3>
      <p className="text-sm text-muted-foreground mb-3">
        {nameEn}
      </p>
      <p className="text-sm text-muted-foreground font-myanmar mb-4 line-clamp-2">
        {description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-myanmar">
          {count} ခု
        </span>
        <span className="inline-flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight className="w-4 h-4" />
        </span>
      </div>

      {/* Decorative Background */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-tl from-primary/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
};

export default CategoryCard;
