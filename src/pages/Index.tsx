import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Heart, Sparkles, Download, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import TeachingListCard from '@/components/TeachingListCard';
import CategoryCard from '@/components/CategoryCard';
import DailyDhammaCard from '@/components/DailyDhammaCard';
import LotusDecoration from '@/components/LotusDecoration';
import { useCategories, useTeachings, useDailyDhamma } from '@/hooks/useTeachings';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: teachings, isLoading: teachingsLoading } = useTeachings();
  const { data: dailyDhamma } = useDailyDhamma();

  const recentTeachings = teachings?.slice(0, 6) ?? [];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-background to-background" />
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-temple-gold/10 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        <div className="container relative z-10 px-4 py-20 text-center">
          {/* Logo */}
          <div className="mb-8 opacity-0 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-temple-gold shadow-gold">
              <span className="text-primary-foreground font-pali text-5xl font-bold">နိ</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="block font-myanmar text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2">
              နိဿယဓမ္မ
            </span>
            <span className="block text-lg md:text-xl text-muted-foreground">
              Nissaya Dhamma
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto mb-8 text-lg md:text-xl text-muted-foreground font-myanmar leading-relaxed opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            ပါဠိတရားတော်များကို မြန်မာဘာသာဖြင့် <br className="hidden sm:block" />
            နိဿယနည်းလမ်းအတိုင်း ရှင်းလင်းစွာ နားလည်နိုင်ရန်
          </p>

          {/* Features */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8 text-sm text-muted-foreground opacity-0 animate-fade-in" style={{ animationDelay: '0.25s' }}>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary">
              <BookOpen className="w-4 h-4" />
              <span className="font-myanmar">ပုဒ်တစ်ပုဒ်ချင်း ရှင်းလင်းချက်</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary">
              <Download className="w-4 h-4" />
              <span className="font-myanmar">အော့ဖ်လိုင်း ဖတ်ရှုနိုင်</span>
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/teachings">
              <Button variant="golden" size="xl" className="gap-2 font-myanmar">
                <BookOpen className="w-5 h-5" />
                တရားတော်များ ဖတ်ရန်
              </Button>
            </Link>
            {!user && (
              <Link to="/auth">
                <Button variant="outline" size="lg" className="gap-2 font-myanmar">
                  <Users className="w-4 h-4" />
                  အကောင့်ဝင်ရန်
                </Button>
              </Link>
            )}
          </div>

          {/* Scroll Indicator */}
          <div className="scroll-indicator mx-auto opacity-0 animate-fade-in" style={{ animationDelay: '0.5s' }} />
        </div>
      </section>

      {/* Daily Dhamma */}
      {dailyDhamma?.teaching && (
        <section className="py-16 md:py-24">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto">
              <DailyDhammaCard 
                teaching={dailyDhamma.teaching} 
                excerpt={dailyDhamma.excerpt}
              />
            </div>
          </div>
        </section>
      )}

      <LotusDecoration />

      {/* Categories */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="font-myanmar text-2xl md:text-3xl font-bold text-foreground mb-4">
              အမျိုးအစားများ
            </h2>
            <p className="text-muted-foreground font-myanmar">
              သင်စိတ်ဝင်စားသော အမျိုးအစားကို ရွေးချယ်ပါ
            </p>
          </div>

          {categoriesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-40 bg-card rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories?.map((category, index) => (
                <CategoryCard 
                  key={category.id} 
                  id={category.id}
                  name={category.name}
                  nameEn={category.name_en ?? ''}
                  description={category.description ?? ''}
                  icon={category.icon ?? '📜'}
                  count={0}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recent Teachings */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-myanmar text-2xl md:text-3xl font-bold text-foreground mb-2">
                နောက်ဆုံးထွက် တရားတော်များ
              </h2>
              <p className="text-muted-foreground font-myanmar">
                အသစ်ထည့်သွင်းထားသော တရားတော်များ
              </p>
            </div>
            <Link to="/teachings" className="hidden sm:block">
              <Button variant="outline" className="gap-2 font-myanmar">
                အားလုံးကြည့်ရန်
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {teachingsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-48 bg-card rounded-xl animate-pulse" />
              ))}
            </div>
          ) : recentTeachings.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground font-myanmar">
                တရားတော်များ မရှိသေးပါ
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentTeachings.map((teaching) => (
                <TeachingListCard key={teaching.id} teaching={teaching} />
              ))}
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Link to="/teachings">
              <Button variant="outline" className="gap-2 font-myanmar">
                အားလုံးကြည့်ရန်
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <LotusDecoration />

      {/* Mission Statement */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bodhi/10 text-bodhi">
                <Heart className="w-8 h-8" />
              </div>
            </div>
            
            <h2 className="font-myanmar text-2xl md:text-3xl font-bold text-foreground mb-6">
              ကျွန်ုပ်တို့၏ ရည်မှန်းချက်
            </h2>
            
            <p className="text-lg text-muted-foreground font-myanmar leading-relaxed mb-8">
              နိဿယဓမ္မသည် ပါဠိတရားတော်များကို နိဿယနည်းလမ်းအတိုင်း 
              မြန်မာပြည်သူများ လွယ်ကူစွာ နားလည်နိုင်ရန် ရည်ရွယ်၍ ပြုစုထားခြင်း ဖြစ်ပါသည်။
              စီးပွားရေး ရည်ရွယ်ချက်မဟုတ်ဘဲ သာသနာပြုလုပ်ငန်း အဖြစ်သာ ဆောင်ရွက်ပါသည်။
            </p>

            <Link to="/about">
              <Button variant="peaceful" size="lg" className="gap-2 font-myanmar">
                ပိုမိုလေ့လာရန်
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Donation CTA */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-2xl bg-gradient-to-br from-monk-robe/10 via-primary/5 to-temple-gold/10 border border-primary/20">
            <div className="text-center">
              <div className="mb-6">
                <span className="text-5xl">🙏</span>
              </div>
              
              <h2 className="font-myanmar text-2xl md:text-3xl font-bold text-foreground mb-4">
                ဓမ္မဒါန ပြုလုပ်ရန်
              </h2>
              
              <p className="max-w-xl mx-auto text-muted-foreground font-myanmar leading-relaxed mb-8">
                သင်၏ လှူဒါန်းမှုသည် ပါဠိတရားတော်များကို မြန်မာဘာသာသို့ ဆက်လက် 
                ဘာသာပြန်ဆိုရန်နှင့် ဤဝက်ဘ်ဆိုက်ကို ထိန်းသိမ်းရန် အထောက်အကူ ဖြစ်ပါသည်။
              </p>

              <Link to="/donate">
                <Button variant="donation" size="xl" className="gap-2 font-myanmar">
                  <Heart className="w-5 h-5" />
                  လှူဒါန်းရန်
                </Button>
              </Link>

              <p className="mt-6 text-sm text-muted-foreground font-myanmar">
                မဖြစ်မနေ မဟုတ်ပါ။ သင်၏ စိတ်ဆန္ဒအလျောက်သာ ဖြစ်ပါသည်။
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
