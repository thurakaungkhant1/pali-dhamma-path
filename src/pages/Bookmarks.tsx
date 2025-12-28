import { Link } from 'react-router-dom';
import { BookmarkX, ArrowRight, Loader2, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import TeachingListCard from '@/components/TeachingListCard';
import { useBookmarksDb } from '@/hooks/useBookmarksDb';
import { useAuth } from '@/contexts/AuthContext';

const Bookmarks = () => {
  const { user, loading: authLoading } = useAuth();
  const { bookmarks, isLoading } = useBookmarksDb();

  if (authLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <section className="pt-8 pb-12 bg-secondary/30">
          <div className="container px-4">
            <h1 className="font-myanmar text-3xl md:text-4xl font-bold text-foreground mb-4">
              သိမ်းဆည်းထားသော တရားတော်များ
            </h1>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
              <LogIn className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="font-myanmar text-xl font-semibold text-foreground mb-4">
              အကောင့်ဝင်ရန် လိုအပ်ပါသည်
            </h2>
            <p className="text-muted-foreground font-myanmar mb-8 max-w-md mx-auto">
              သိမ်းဆည်းထားသော တရားတော်များကို ကြည့်ရှုရန် အကောင့်ဝင်ပါ
            </p>
            <Link to="/auth">
              <Button variant="golden" className="gap-2 font-myanmar">
                <LogIn className="w-4 h-4" />
                အကောင့်ဝင်ရန်
              </Button>
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="pt-8 pb-12 bg-secondary/30">
        <div className="container px-4">
          <h1 className="font-myanmar text-3xl md:text-4xl font-bold text-foreground mb-4">
            သိမ်းဆည်းထားသော တရားတော်များ
          </h1>
          <p className="text-muted-foreground font-myanmar">
            သင်သိမ်းဆည်းထားသော တရားတော်များကို ဤနေရာတွင် ပြန်လည်ဖတ်ရှုနိုင်ပါသည်
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container px-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : bookmarks.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
                <BookmarkX className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="font-myanmar text-xl font-semibold text-foreground mb-4">
                သိမ်းဆည်းထားသော တရားတော် မရှိသေးပါ
              </h2>
              <p className="text-muted-foreground font-myanmar mb-8 max-w-md mx-auto">
                တရားတော်များကို bookmark လုပ်ရန် တရားတော်စာမျက်နှာတွင် bookmark ခလုတ်ကို နှိပ်ပါ
              </p>
              <Link to="/teachings">
                <Button variant="golden" className="gap-2 font-myanmar">
                  တရားတော်များ ရှာဖွေရန်
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground font-myanmar mb-6">
                {bookmarks.length} ခု သိမ်းဆည်းထားသည်
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarks.map((bookmark) => (
                  bookmark.teaching && (
                    <TeachingListCard key={bookmark.id} teaching={bookmark.teaching as any} />
                  )
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Bookmarks;
