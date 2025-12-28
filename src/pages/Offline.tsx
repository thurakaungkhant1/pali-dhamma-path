import { Link } from 'react-router-dom';
import { Download, Trash2, WifiOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { useOfflineStorage } from '@/hooks/useOfflineStorage';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const Offline = () => {
  const { offlineTeachings, removeFromOffline, clearAllOffline, offlineCount } = useOfflineStorage();
  const { toast } = useToast();

  const handleRemove = (id: string, title: string) => {
    removeFromOffline(id);
    toast({
      title: 'ဖယ်ရှားပြီးပါပြီ',
      description: `"${title}" ကို ဒေါင်းလုဒ်များမှ ဖယ်ရှားပြီးပါပြီ`,
    });
  };

  const handleClearAll = () => {
    clearAllOffline();
    toast({
      title: 'အားလုံး ဖယ်ရှားပြီးပါပြီ',
      description: 'ဒေါင်းလုဒ်အားလုံးကို ဖယ်ရှားပြီးပါပြီ',
    });
  };

  return (
    <Layout>
      {/* Header */}
      <section className="pt-8 pb-12 bg-secondary/30">
        <div className="container px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-myanmar text-3xl md:text-4xl font-bold text-foreground mb-4">
                ဒေါင်းလုဒ်များ
              </h1>
              <p className="text-muted-foreground font-myanmar">
                အော့ဖ်လိုင်းတွင် ဖတ်ရှုနိုင်သော တရားတော်များ
              </p>
            </div>
            {offlineCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="gap-2 font-myanmar text-destructive hover:text-destructive"
                onClick={handleClearAll}
              >
                <Trash2 className="w-4 h-4" />
                အားလုံးဖယ်ရှား
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container px-4">
          {offlineCount === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
                <WifiOff className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="font-myanmar text-xl font-semibold text-foreground mb-4">
                ဒေါင်းလုဒ် မရှိသေးပါ
              </h2>
              <p className="text-muted-foreground font-myanmar mb-8 max-w-md mx-auto">
                တရားတော်များကို ဒေါင်းလုဒ်လုပ်ရန် တရားတော်စာမျက်နှာတွင် ဒေါင်းလုဒ်ခလုတ်ကို နှိပ်ပါ
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
                {offlineCount} ခု ဒေါင်းလုဒ်လုပ်ထားသည်
              </p>
              <div className="space-y-4">
                {offlineTeachings.map((teaching) => (
                  <div
                    key={teaching.id}
                    className="p-4 rounded-xl bg-card border border-border flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0 flex-1">
                      <Link to={`/teaching/${teaching.id}`}>
                        <h3 className="font-myanmar font-semibold text-foreground hover:text-primary transition-colors truncate">
                          {teaching.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        ဒေါင်းလုဒ်လုပ်ခဲ့သည်: {format(new Date(teaching.downloadedAt), 'yyyy-MM-dd')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Link to={`/teaching/${teaching.id}`}>
                        <Button variant="outline" size="sm" className="gap-1 font-myanmar">
                          ဖတ်ရန်
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleRemove(teaching.id, teaching.title)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Offline;
