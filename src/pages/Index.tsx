import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import TeachingCard from '@/components/TeachingCard';
import CategoryCard from '@/components/CategoryCard';
import LotusDecoration from '@/components/LotusDecoration';
import { teachings, categories } from '@/data/teachings';

const Index = () => {
  const featuredTeaching = teachings[0];
  const recentTeachings = teachings.slice(1, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-background to-background" />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-temple-gold/10 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        <div className="container relative z-10 px-4 py-20 text-center">
          {/* Logo */}
          <div className="mb-8 opacity-0 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-temple-gold shadow-gold">
              <span className="text-primary-foreground font-pali text-4xl font-bold">ဓ</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="block font-myanmar text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2">
              ပါဠိတရားတော်
            </span>
            <span className="block text-lg md:text-xl text-muted-foreground">
              Pāḷi Dhamma Myanmar
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto mb-8 text-lg md:text-xl text-muted-foreground font-myanmar leading-relaxed opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            ဗုဒ္ဓဘာသာ ပါဠိတော်များကို မြန်မာဘာသာဖြင့် <br className="hidden sm:block" />
            လွယ်ကူစွာ နားလည်နိုင်ရန် ပြုစုထားပါသည်။
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/teachings">
              <Button variant="golden" size="xl" className="gap-2 font-myanmar">
                <BookOpen className="w-5 h-5" />
                တရားတော်များ ဖတ်ရန်
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="gap-2 font-myanmar">
                ကျွန်ုပ်တို့အကြောင်း
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="scroll-indicator mx-auto opacity-0 animate-fade-in" style={{ animationDelay: '0.5s' }} />
        </div>
      </section>

      {/* Featured Teaching */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-sm text-primary font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="font-myanmar">ယနေ့တရားတော်</span>
            </span>
            <h2 className="font-myanmar text-2xl md:text-3xl font-bold text-foreground">
              အထူးဖော်ပြချက်
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <TeachingCard teaching={featuredTeaching} featured />
          </div>
        </div>
      </section>

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} {...category} index={index} />
            ))}
          </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentTeachings.map((teaching) => (
              <TeachingCard key={teaching.id} teaching={teaching} />
            ))}
          </div>

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
              ဤဝက်ဘ်ဆိုက်သည် ဗုဒ္ဓဘာသာ ပါဠိတရားတော်များကို မြန်မာပြည်သူပြည်သားများ 
              လွယ်ကူစွာ နားလည်နိုင်ရန် ရည်ရွယ်၍ ပြုစုထားခြင်း ဖြစ်ပါသည်။ 
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
