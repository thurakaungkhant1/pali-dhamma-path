import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, BookmarkCheck, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Teaching, categories } from '@/data/teachings';
import { useBookmarks } from '@/hooks/useBookmarks';
import { cn } from '@/lib/utils';

interface TeachingCardProps {
  teaching: Teaching;
  featured?: boolean;
}

const TeachingCard = ({ teaching, featured = false }: TeachingCardProps) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [isHovered, setIsHovered] = useState(false);
  
  const category = categories.find(c => c.id === teaching.category);
  const bookmarked = isBookmarked(teaching.id);

  return (
    <article
      className={cn(
        'group relative bg-card rounded-xl border border-border overflow-hidden transition-all duration-300',
        featured ? 'shadow-gold' : 'shadow-card hover:shadow-soft',
        isHovered && 'border-primary/30'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/80 backdrop-blur-sm text-xs font-myanmar">
          <span>{category?.icon}</span>
          <span>{category?.name}</span>
        </span>
      </div>

      {/* Bookmark Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
        onClick={(e) => {
          e.preventDefault();
          toggleBookmark(teaching.id);
        }}
      >
        {bookmarked ? (
          <BookmarkCheck className="w-5 h-5 text-primary" />
        ) : (
          <Bookmark className="w-5 h-5" />
        )}
      </Button>

      <Link to={`/teaching/${teaching.id}`} className="block p-6 pt-14">
        {/* Pali Text */}
        <div className={cn(
          'mb-4 p-4 rounded-lg bg-parchment/50 dark:bg-secondary/30',
          featured && 'bg-gradient-to-br from-parchment to-secondary/30'
        )}>
          <p className="font-pali text-lg md:text-xl leading-relaxed text-foreground/90 italic">
            {teaching.paliText}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {teaching.paliRomanized}
          </p>
        </div>

        {/* Myanmar Translation */}
        <p className="font-myanmar text-base leading-relaxed text-foreground mb-4">
          {teaching.myanmarTranslation}
        </p>

        {/* Source */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground font-myanmar">
            {teaching.source}
          </span>
          <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
            <span className="font-myanmar">ဆက်ဖတ်ရန်</span>
            <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </Link>

      {/* Decorative Corner */}
      {featured && (
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-primary/10 to-transparent rounded-tl-full" />
      )}
    </article>
  );
};

export default TeachingCard;
