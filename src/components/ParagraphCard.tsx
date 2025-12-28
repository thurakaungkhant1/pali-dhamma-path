import { useReading } from '@/contexts/ReadingContext';
import { Paragraph } from '@/hooks/useTeachings';
import { cn } from '@/lib/utils';

interface ParagraphCardProps {
  paragraph: Paragraph;
  index: number;
}

const fontSizeMap = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
};

const ParagraphCard = ({ paragraph, index }: ParagraphCardProps) => {
  const { settings } = useReading();

  return (
    <article 
      className="p-6 rounded-xl bg-card border border-border shadow-card transition-all duration-300 opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Paragraph Number */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
          {index + 1}
        </span>
      </div>

      {/* Pali Text */}
      {settings.showPali && (
        <div className="mb-6 p-4 rounded-lg bg-parchment/50 dark:bg-secondary/30">
          <p className={cn(
            'font-pali leading-relaxed text-foreground/90 italic',
            fontSizeMap[settings.fontSize]
          )}>
            {paragraph.pali_text}
          </p>
          {paragraph.pali_romanized && (
            <p className="mt-2 text-sm text-muted-foreground">
              {paragraph.pali_romanized}
            </p>
          )}
        </div>
      )}

      {/* Myanmar Translation */}
      {settings.showTranslation && (
        <div className="mb-6">
          <h4 className="font-myanmar text-sm font-semibold text-primary mb-2 flex items-center gap-2">
            <span className="w-1 h-4 bg-primary rounded-full" />
            မြန်မာဘာသာပြန်
          </h4>
          <p className={cn(
            'font-myanmar leading-relaxed text-foreground',
            fontSizeMap[settings.fontSize]
          )}>
            {paragraph.myanmar_translation}
          </p>
        </div>
      )}

      {/* Myanmar Explanation */}
      {settings.showExplanation && paragraph.myanmar_explanation && (
        <div className="p-4 rounded-lg bg-bodhi/5 border border-bodhi/20">
          <h4 className="font-myanmar text-sm font-semibold text-bodhi mb-2 flex items-center gap-2">
            <span className="w-1 h-4 bg-bodhi rounded-full" />
            နိဿယရှင်းလင်းချက်
          </h4>
          <p className={cn(
            'font-myanmar leading-relaxed text-foreground/90',
            fontSizeMap[settings.fontSize]
          )}>
            {paragraph.myanmar_explanation}
          </p>
        </div>
      )}
    </article>
  );
};

export default ParagraphCard;
