import { Link } from 'react-router-dom';
import { BookmarkX, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import TeachingCard from '@/components/TeachingCard';
import { teachings } from '@/data/teachings';
import { useBookmarks } from '@/hooks/useBookmarks';

const Bookmarks = () => {
  const { bookmarks } = useBookmarks();
  
  const bookmarkedTeachings = teachings.filter(t => bookmarks.includes(t.id));

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
          {bookmarkedTeachings.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
                <BookmarkX className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="font-myanmar text-xl font-semibold text-foreground mb-4">
                သိမ်းဆည်းထားသော တရားတော် မရှိသေးပါ
              </h2>
              <p className="text-muted-foreground font-myanmar mb-8 max-w-md mx-auto">
                တရားတော်များကို bookmark လုပ်ရန် တရားတော်ကဒ်ပေါ်ရှိ bookmark ခလုတ်ကို နှိပ်ပါ
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
                {bookmarkedTeachings.length} ခု သိမ်းဆည်းထားသည်
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarkedTeachings.map((teaching) => (
                  <TeachingCard key={teaching.id} teaching={teaching} />
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
