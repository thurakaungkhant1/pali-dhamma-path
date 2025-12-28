import { Minus, Plus, Moon, Sun, Eye, EyeOff, Download, BookmarkPlus, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useReading } from '@/contexts/ReadingContext';
import { cn } from '@/lib/utils';

interface ReadingToolbarProps {
  isBookmarked?: boolean;
  isDownloaded?: boolean;
  onBookmark?: () => void;
  onDownload?: () => void;
  className?: string;
}

const ReadingToolbar = ({ 
  isBookmarked, 
  isDownloaded,
  onBookmark, 
  onDownload,
  className 
}: ReadingToolbarProps) => {
  const { 
    settings, 
    updateSettings, 
    toggleNightMode, 
    increaseFontSize, 
    decreaseFontSize 
  } = useReading();

  return (
    <div className={cn(
      'flex items-center gap-1 p-2 rounded-xl bg-card/80 backdrop-blur-sm border border-border shadow-soft',
      className
    )}>
      {/* Font Size Controls */}
      <div className="flex items-center gap-1 pr-2 border-r border-border">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={decreaseFontSize}
          className="w-8 h-8"
          title="စာလုံးသေးစေရန်"
        >
          <Minus className="w-4 h-4" />
        </Button>
        <span className="text-xs text-muted-foreground w-6 text-center">
          {settings.fontSize === 'sm' ? 'S' : 
           settings.fontSize === 'base' ? 'M' : 
           settings.fontSize === 'lg' ? 'L' : 
           settings.fontSize === 'xl' ? 'XL' : '2XL'}
        </span>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={increaseFontSize}
          className="w-8 h-8"
          title="စာလုံးကြီးစေရန်"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Section Toggles */}
      <div className="flex items-center gap-1 px-2 border-r border-border">
        <Button 
          variant={settings.showPali ? 'default' : 'ghost'} 
          size="sm"
          onClick={() => updateSettings({ showPali: !settings.showPali })}
          className="h-7 text-xs font-myanmar"
        >
          ပါဠိ
        </Button>
        <Button 
          variant={settings.showTranslation ? 'default' : 'ghost'} 
          size="sm"
          onClick={() => updateSettings({ showTranslation: !settings.showTranslation })}
          className="h-7 text-xs font-myanmar"
        >
          ဘာသာပြန်
        </Button>
        <Button 
          variant={settings.showExplanation ? 'default' : 'ghost'} 
          size="sm"
          onClick={() => updateSettings({ showExplanation: !settings.showExplanation })}
          className="h-7 text-xs font-myanmar"
        >
          ရှင်းလင်းချက်
        </Button>
      </div>

      {/* Night Mode */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleNightMode}
        className="w-8 h-8"
        title={settings.nightMode ? 'နေ့အလင်းမုဒ်' : 'ညအမှောင်မုဒ်'}
      >
        {settings.nightMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </Button>

      {/* Bookmark */}
      {onBookmark && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onBookmark}
          className="w-8 h-8"
          title={isBookmarked ? 'သိမ်းဆည်းမှု ဖယ်ရှားရန်' : 'သိမ်းဆည်းရန်'}
        >
          {isBookmarked ? (
            <BookmarkCheck className="w-4 h-4 text-primary" />
          ) : (
            <BookmarkPlus className="w-4 h-4" />
          )}
        </Button>
      )}

      {/* Download */}
      {onDownload && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onDownload}
          className={cn('w-8 h-8', isDownloaded && 'text-bodhi')}
          title={isDownloaded ? 'ဒေါင်းလုဒ်လုပ်ပြီး' : 'ဒေါင်းလုဒ်လုပ်ရန်'}
        >
          <Download className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default ReadingToolbar;
