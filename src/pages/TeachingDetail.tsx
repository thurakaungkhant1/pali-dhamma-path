import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Bookmark, BookmarkCheck, Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import LotusDecoration from '@/components/LotusDecoration';
import TeachingCard from '@/components/TeachingCard';
import { teachings, categories } from '@/data/teachings';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useToast } from '@/hooks/use-toast';

const TeachingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const teaching = teachings.find(t => t.id === id);
  const category = teaching ? categories.find(c => c.id === teaching.category) : null;
  
  // Get related teachings from same category
  const relatedTeachings = teaching 
    ? teachings.filter(t => t.category === teaching.category && t.id !== teaching.id).slice(0, 2)
    : [];

  if (!teaching) {
    return (
      <Layout>
        <div className="container px-4 py-20 text-center">
          <h1 className="font-myanmar text-2xl text-foreground mb-4">
            ဤတရားတော်ကို ရှာမတွေ့ပါ
          </h1>
          <Link to="/teachings">
            <Button variant="outline" className="gap-2 font-myanmar">
              <ArrowLeft className="w-4 h-4" />
              တရားတော်များသို့ ပြန်သွားရန်
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleCopy = () => {
    const text = `${teaching.paliText}\n\n${teaching.paliRomanized}\n\n${teaching.myanmarTranslation}\n\n— ${teaching.source}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: 'ကူးယူပြီးပါပြီ',
      description: 'တရားတော်ကို clipboard သို့ ကူးယူပြီးပါပြီ။',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: teaching.source,
          text: teaching.myanmarTranslation,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      handleCopy();
    }
  };

  const bookmarked = isBookmarked(teaching.id);

  return (
    <Layout>
      {/* Header */}
      <section className="pt-8 pb-6 bg-secondary/30">
        <div className="container px-4">
          <Link to="/teachings" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-myanmar">တရားတော်များ</span>
          </Link>

          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-sm font-myanmar mb-4">
                <span>{category?.icon}</span>
                <span>{category?.name}</span>
              </span>
              <h1 className="font-myanmar text-2xl md:text-3xl font-bold text-foreground">
                {teaching.source}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => toggleBookmark(teaching.id)}
              >
                {bookmarked ? (
                  <BookmarkCheck className="w-5 h-5 text-primary" />
                ) : (
                  <Bookmark className="w-5 h-5" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleShare}
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container px-4">
          <article className="max-w-3xl mx-auto">
            {/* Pali Text Box */}
            <div className="p-6 md:p-8 rounded-xl bg-parchment/50 dark:bg-secondary/30 border border-border mb-8 relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 opacity-60 hover:opacity-100"
                onClick={handleCopy}
              >
                {copied ? <Check className="w-4 h-4 text-bodhi" /> : <Copy className="w-4 h-4" />}
              </Button>

              <p className="font-pali text-xl md:text-2xl leading-relaxed text-foreground/90 italic mb-4">
                {teaching.paliText}
              </p>
              <p className="text-sm md:text-base text-muted-foreground">
                {teaching.paliRomanized}
              </p>
            </div>

            <LotusDecoration size="sm" className="my-8" />

            {/* Myanmar Translation */}
            <div className="mb-8">
              <h2 className="font-myanmar text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full" />
                မြန်မာဘာသာပြန်
              </h2>
              <p className="font-myanmar text-lg leading-relaxed text-foreground">
                {teaching.myanmarTranslation}
              </p>
            </div>

            {/* Explanation */}
            <div className="p-6 rounded-xl bg-bodhi/5 border border-bodhi/20">
              <h2 className="font-myanmar text-lg font-semibold text-bodhi mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-bodhi rounded-full" />
                ရှင်းလင်းချက်
              </h2>
              <p className="font-myanmar text-base leading-relaxed text-foreground/90">
                {teaching.explanation}
              </p>
            </div>

            {/* Tags */}
            {teaching.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {teaching.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-secondary text-sm font-myanmar text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        </div>
      </section>

      {/* Related Teachings */}
      {relatedTeachings.length > 0 && (
        <section className="py-12 bg-secondary/30">
          <div className="container px-4">
            <h2 className="font-myanmar text-xl font-bold text-foreground mb-8">
              ဆက်စပ်တရားတော်များ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              {relatedTeachings.map((t) => (
                <TeachingCard key={t.id} teaching={t} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default TeachingDetail;
