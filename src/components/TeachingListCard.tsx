import { Link } from 'react-router-dom';
import { Bookmark, BookmarkCheck, ChevronRight, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Teaching } from '@/hooks/useTeachings';
import { useBookmarksDb } from '@/hooks/useBookmarksDb';
import { useOfflineStorage } from '@/hooks/useOfflineStorage';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface TeachingListCardProps {
  teaching: Teaching;
}

const TeachingListCard = ({ teaching }: TeachingListCardProps) => {
  const { user } = useAuth();
  const { isBookmarked, toggleBookmark } = useBookmarksDb();
  const { isAvailableOffline } = useOfflineStorage();
  
  const bookmarked = isBookmarked(teaching.id);
  const offline = isAvailableOffline(teaching.id);

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) return;
    await toggleBookmark(teaching.id);
  };

  return (
    <article className="group relative bg-card rounded-xl border border-border overflow-hidden shadow-card hover:shadow-soft transition-all duration-300">
      {/* Category Badge */}
      {teaching.category && (
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/80 backdrop-blur-sm text-xs font-myanmar">
            <span>{teaching.category.icon}</span>
            <span>{teaching.category.name}</span>
          </span>
        </div>
      )}

      {/* Bookmark Button */}
      {user && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={handleBookmark}
        >
          {bookmarked ? (
            <BookmarkCheck className="w-5 h-5 text-primary" />
          ) : (
            <Bookmark className="w-5 h-5" />
          )}
        </Button>
      )}

      <Link to={`/teaching/${teaching.id}`} className="block p-6 pt-14">
        {/* Title */}
        <h3 className="font-myanmar text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {teaching.title}
        </h3>
        
        {teaching.source && (
          <p className="text-sm text-muted-foreground mb-4">
            {teaching.source}
          </p>
        )}

        {/* Stats & Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {teaching.view_count}
            </span>
            {offline && (
              <span className="flex items-center gap-1 text-bodhi">
                <Download className="w-3.5 h-3.5" />
                <span className="font-myanmar">ဒေါင်းလုဒ်</span>
              </span>
            )}
          </div>
          
          <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
            <span className="font-myanmar">ဖတ်ရန်</span>
            <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </article>
  );
};

export default TeachingListCard;
