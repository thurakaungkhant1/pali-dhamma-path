import { Link } from 'react-router-dom';
import { Heart, BookOpen, Users, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import LotusDecoration from '@/components/LotusDecoration';

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-temple-gold/10 blur-3xl" />
        
        <div className="container px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-temple-gold shadow-gold">
                <span className="text-primary-foreground font-pali text-4xl font-bold">နိ</span>
              </div>
            </div>
            
            <h1 className="font-myanmar text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              နိဿယဓမ္မ အကြောင်း
            </h1>
            
            <p className="text-lg text-muted-foreground font-myanmar leading-relaxed">
              နိဿယဓမ္မသည် ပါဠိတရားတော်များကို နိဿယနည်းလမ်းအတိုင်း 
              မြန်မာပြည်သူများ လွယ်ကူစွာ နားလည်နိုင်ရန် ရည်ရွယ်၍ တည်ထောင်ထားခြင်း ဖြစ်ပါသည်။
            </p>
          </div>
        </div>
      </section>

      <LotusDecoration />

      {/* What is Nissaya */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-myanmar text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              နိဿယ ဆိုသည်မှာ
            </h2>
            
            <div className="space-y-6 text-foreground/90 font-myanmar leading-relaxed">
              <p>
                နိဿယဆိုသည်မှာ ပါဠိစာပေကို ဘာသာပြန်ဆိုရာတွင် သုံးစွဲသော မြန်မာ့ရိုးရာနည်းလမ်း ဖြစ်ပါသည်။ 
                ပါဠိစကားလုံးတစ်လုံးချင်းစီကို မြန်မာဘာသာဖြင့် အနက်ပြန်ဆိုပြီး၊ 
                ဝါကျတစ်ခုလုံး၏ အဓိပ္ပာယ်ကို ရှင်းလင်းပြသည်။
              </p>
              
              <p>
                ဤနည်းလမ်းသည် ပါဠိစာပေကို လေ့လာသူများအတွက် အလွန်အကျိုးရှိပြီး၊
                မူရင်းပါဠိနှင့် မြန်မာဘာသာပြန်ကို နှိုင်းယှဉ်လေ့လာနိုင်စေပါသည်။
              </p>
              
              <p>
                နိဿယဓမ္မ ဝက်ဘ်ဆိုက်သည် ဤရိုးရာနည်းလမ်းကို ဒစ်ဂျစ်တယ်ပုံစံဖြင့် တင်ပြထားခြင်း ဖြစ်ပြီး၊
                မည်သူမဆို မည်သည့်နေရာမှမဆို ဖတ်ရှုနိုင်ရန် ဖန်တီးထားခြင်း ဖြစ်ပါသည်။
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container px-4">
          <h2 className="font-myanmar text-2xl md:text-3xl font-bold text-foreground mb-12 text-center">
            ကျွန်ုပ်တို့၏ တန်ဖိုးထားချက်များ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-myanmar text-lg font-semibold text-foreground mb-2">
                တိကျမှန်ကန်ခြင်း
              </h3>
              <p className="text-muted-foreground font-myanmar">
                မူရင်း ပါဠိတော်များကို တိကျမှန်ကန်စွာ ဘာသာပြန်ဆိုပြီး 
                နိဿယနည်းလမ်းအတိုင်း ရှင်းလင်းချက်များ ပေးပါသည်။
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-full bg-bodhi/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-bodhi" />
              </div>
              <h3 className="font-myanmar text-lg font-semibold text-foreground mb-2">
                လူတိုင်းအတွက်
              </h3>
              <p className="text-muted-foreground font-myanmar">
                သံဃာတော်များ၊ ဒါယကာဒါယိကာမများ၊ ကျောင်းသားကျောင်းသူများ
                လူတိုင်း လေ့လာနိုင်ပါသည်။
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-full bg-temple-gold/10 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-temple-gold" />
              </div>
              <h3 className="font-myanmar text-lg font-semibold text-foreground mb-2">
                အခမဲ့ဝန်ဆောင်မှု
              </h3>
              <p className="text-muted-foreground font-myanmar">
                တရားတော်များကို အခမဲ့ ဖတ်ရှုနိုင်ပါသည်။ 
                ကြော်ငြာများ မပါဝင်ပါ။
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-full bg-lotus/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-lotus" />
              </div>
              <h3 className="font-myanmar text-lg font-semibold text-foreground mb-2">
                သာသနာပြု
              </h3>
              <p className="text-muted-foreground font-myanmar">
                စီးပွားရေး ရည်ရွယ်ချက်မဟုတ်ဘဲ သာသနာတော် ထွန်းကားရေးအတွက်သာ 
                ဆောင်ရွက်ပါသည်။
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Usage */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-myanmar text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              လှူဒါန်းမှုများကို မည်သို့ အသုံးပြုသနည်း
            </h2>

            <div className="space-y-4 mb-8">
              {[
                'ပါဠိတရားတော်များကို နိဿယနည်းလမ်းဖြင့် ဆက်လက် ဘာသာပြန်ဆိုခြင်း',
                'ဝက်ဘ်ဆိုက် ထိန်းသိမ်းမှုနှင့် hosting ကုန်ကျစရိတ်',
                'ပိုမိုကောင်းမွန်သော ဖတ်ရှုမှု အတွေ့အကြုံ ဖန်တီးခြင်း',
                'အသံဖိုင်များ ထုတ်လုပ်ခြင်း (ပါဠိရွတ်ဖတ်သံ၊ မြန်မာရှင်းလင်းချက်)',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-medium">{index + 1}</span>
                  </div>
                  <p className="font-myanmar text-foreground/90">{item}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link to="/donate">
                <Button variant="donation" size="lg" className="gap-2 font-myanmar">
                  <Heart className="w-5 h-5" />
                  ဓမ္မဒါန ပြုလုပ်ရန်
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LotusDecoration />

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-myanmar text-2xl md:text-3xl font-bold text-foreground mb-6">
              တရားတော်များကို စတင်ဖတ်ရှုပါ
            </h2>
            <p className="text-muted-foreground font-myanmar mb-8">
              ယနေ့ပင် ဗုဒ္ဓ၏ အဆုံးအမများကို နိဿယနည်းလမ်းဖြင့် လေ့လာပါ
            </p>
            <Link to="/teachings">
              <Button variant="golden" size="xl" className="gap-2 font-myanmar">
                <BookOpen className="w-5 h-5" />
                တရားတော်များ ဖတ်ရန်
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
