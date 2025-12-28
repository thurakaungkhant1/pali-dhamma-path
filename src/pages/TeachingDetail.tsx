import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import ParagraphCard from '@/components/ParagraphCard';
import ReadingToolbar from '@/components/ReadingToolbar';
import AudioPlayer from '@/components/AudioPlayer';
import LotusDecoration from '@/components/LotusDecoration';
import { useTeaching } from '@/hooks/useTeachings';
import { useBookmarksDb } from '@/hooks/useBookmarksDb';
import { useOfflineStorage } from '@/hooks/useOfflineStorage';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const TeachingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { data: teaching, isLoading, error } = useTeaching(id ?? '');
  const { isBookmarked, toggleBookmark } = useBookmarksDb();
  const { saveForOffline, removeFromOffline, isAvailableOffline } = useOfflineStorage();
  const { toast } = useToast();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (error || !teaching) {
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

  const bookmarked = user ? isBookmarked(teaching.id) : false;
  const downloaded = isAvailableOffline(teaching.id);

  const handleBookmark = async () => {
    if (!user) {
      toast({
        title: 'အကောင့်ဝင်ရန် လိုအပ်ပါသည်',
        description: 'သိမ်းဆည်းရန် အကောင့်ဝင်ပါ',
      });
      return;
    }
    await toggleBookmark(teaching.id);
    toast({
      title: bookmarked ? 'သိမ်းဆည်းမှု ဖယ်ရှားပြီးပါပြီ' : 'သိမ်းဆည်းပြီးပါပြီ',
    });
  };

  const handleDownload = () => {
    if (downloaded) {
      removeFromOffline(teaching.id);
      toast({
        title: 'ဒေါင်းလုဒ် ဖယ်ရှားပြီးပါပြီ',
      });
    } else {
      saveForOffline(teaching);
      toast({
        title: 'ဒေါင်းလုဒ်လုပ်ပြီးပါပြီ',
        description: 'အော့ဖ်လိုင်းတွင် ဖတ်ရှုနိုင်ပါပြီ',
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: teaching.title,
          text: `${teaching.title} - နိဿယဓမ္မ`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: 'လင့်ခ် ကူးယူပြီးပါပြီ' });
    }
  };

  return (
    <Layout>
      {/* Header */}
      <section className="pt-8 pb-6 bg-secondary/30">
        <div className="container px-4">
          <Link to="/teachings" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-myanmar">တရားတော်များ</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              {teaching.category && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-sm font-myanmar mb-4">
                  <span>{teaching.category.icon}</span>
                  <span>{teaching.category.name}</span>
                </span>
              )}
              <h1 className="font-myanmar text-2xl md:text-3xl font-bold text-foreground mb-2">
                {teaching.title}
              </h1>
              {teaching.source && (
                <p className="text-muted-foreground">{teaching.source}</p>
              )}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Reading Toolbar - Sticky */}
      <div className="sticky top-16 md:top-20 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container px-4 py-3">
          <ReadingToolbar
            isBookmarked={bookmarked}
            isDownloaded={downloaded}
            onBookmark={handleBookmark}
            onDownload={handleDownload}
          />
        </div>
      </div>

      {/* Audio Players */}
      {(teaching.pali_audio_url || teaching.myanmar_audio_url) && (
        <section className="py-6 bg-secondary/20">
          <div className="container px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {teaching.pali_audio_url && (
                <AudioPlayer 
                  src={teaching.pali_audio_url} 
                  title="ပါဠိ ရွတ်ဖတ်သံ" 
                />
              )}
              {teaching.myanmar_audio_url && (
                <AudioPlayer 
                  src={teaching.myanmar_audio_url} 
                  title="မြန်မာ ရှင်းလင်းချက်" 
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* Paragraphs */}
      <section className="py-12">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {teaching.paragraphs && teaching.paragraphs.length > 0 ? (
              teaching.paragraphs.map((paragraph, index) => (
                <ParagraphCard 
                  key={paragraph.id} 
                  paragraph={paragraph} 
                  index={index} 
                />
              ))
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground font-myanmar">
                  ဤတရားတော်တွင် အကြောင်းအရာ မရှိသေးပါ
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <LotusDecoration />

      {/* Navigation */}
      <section className="py-12 bg-secondary/30">
        <div className="container px-4 text-center">
          <Link to="/teachings">
            <Button variant="outline" className="gap-2 font-myanmar">
              <ArrowLeft className="w-4 h-4" />
              အခြားတရားတော်များ ကြည့်ရန်
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default TeachingDetail;
