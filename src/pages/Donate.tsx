import { useState } from 'react';
import { Heart, CheckCircle, Wallet, CreditCard, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/components/layout/Layout';
import LotusDecoration from '@/components/LotusDecoration';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const Donate = () => {
  const { user } = useAuth();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [donorName, setDonorName] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const amounts = [5000, 10000, 20000, 50000, 100000];
  
  const paymentMethods = [
    { id: 'kbzpay', name: 'KBZ Pay', icon: Wallet },
    { id: 'wave', name: 'Wave Money', icon: Wallet },
    { id: 'cbpay', name: 'CB Pay', icon: CreditCard },
    { id: 'bank', name: 'Bank Transfer', icon: Building2 },
  ];

  const handleDonate = async () => {
    const amount = selectedAmount || parseInt(customAmount);
    if (!amount || amount <= 0) {
      toast({
        title: 'ပမာဏ ရွေးချယ်ပါ',
        description: 'လှူဒါန်းလိုသော ပမာဏကို ရွေးချယ်ပါ သို့မဟုတ် ရိုက်ထည့်ပါ',
        variant: 'destructive',
      });
      return;
    }
    if (!selectedMethod) {
      toast({
        title: 'ငွေပေးချေနည်း ရွေးချယ်ပါ',
        description: 'ငွေပေးချေနည်းတစ်ခုကို ရွေးချယ်ပါ',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from('donations').insert({
        user_id: user?.id ?? null,
        amount,
        currency: 'MMK',
        payment_method: selectedMethod,
        donor_name: donorName || null,
        donor_message: donorMessage || null,
        status: 'pending',
      });

      if (error) throw error;

      toast({
        title: 'ကျေးဇူးတင်ပါသည်',
        description: 'သင်၏ လှူဒါန်းမှုအတွက် အထူးကျေးဇူးတင်ရှိပါသည်။ သာသနာတော် ထွန်းကားပါစေ။',
      });

      // Reset form
      setSelectedAmount(null);
      setCustomAmount('');
      setSelectedMethod(null);
      setDonorName('');
      setDonorMessage('');
    } catch (error) {
      toast({
        title: 'အမှားတစ်ခု ဖြစ်ပေါ်ခဲ့ပါသည်',
        description: 'နောက်မှ ထပ်ကြိုးစားပါ',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-monk-robe/10 via-primary/5 to-background overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-monk-robe/10 blur-3xl" />
        
        <div className="container px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6">
              <span className="text-6xl">🙏</span>
            </div>
            
            <h1 className="font-myanmar text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              ဓမ္မဒါန ပြုလုပ်ရန်
            </h1>
            
            <p className="text-lg text-muted-foreground font-myanmar leading-relaxed">
              သင်၏ လှူဒါန်းမှုသည် ပါဠိတရားတော်များကို နိဿယနည်းလမ်းဖြင့် 
              ဆက်လက် ဘာသာပြန်ဆိုရန်နှင့် ဤဝက်ဘ်ဆိုက်ကို ထိန်းသိမ်းရန် အထောက်အကူ ဖြစ်ပါသည်။
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-xl mx-auto">
            {/* Amount Selection */}
            <div className="mb-8">
              <h2 className="font-myanmar text-lg font-semibold text-foreground mb-4">
                ပမာဏ ရွေးချယ်ပါ (ကျပ်)
              </h2>
              
              <div className="grid grid-cols-3 gap-3 mb-4">
                {amounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 font-myanmar font-medium ${
                      selectedAmount === amount
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    {amount.toLocaleString()}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Input
                  type="number"
                  placeholder="အခြား ပမာဏ..."
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  className="h-14 text-lg font-myanmar pr-16"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-myanmar">
                  ကျပ်
                </span>
              </div>
            </div>

            <LotusDecoration size="sm" className="my-8" />

            {/* Payment Method */}
            <div className="mb-8">
              <h2 className="font-myanmar text-lg font-semibold text-foreground mb-4">
                ငွေပေးချေနည်း ရွေးချယ်ပါ
              </h2>
              
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ${
                      selectedMethod === method.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <method.icon className={`w-5 h-5 ${
                      selectedMethod === method.id ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <span className={`font-medium ${
                      selectedMethod === method.id ? 'text-primary' : 'text-foreground'
                    }`}>
                      {method.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Info */}
            <div className="space-y-4 mb-8">
              <div>
                <label className="block font-myanmar text-sm font-medium text-foreground mb-2">
                  အမည် (မဖြစ်မနေမဟုတ်)
                </label>
                <Input
                  type="text"
                  placeholder="သင့်အမည်"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="h-12 font-myanmar"
                />
              </div>
              <div>
                <label className="block font-myanmar text-sm font-medium text-foreground mb-2">
                  မှတ်ချက် (မဖြစ်မနေမဟုတ်)
                </label>
                <Textarea
                  placeholder="သင်၏ မှတ်ချက်..."
                  value={donorMessage}
                  onChange={(e) => setDonorMessage(e.target.value)}
                  className="font-myanmar"
                  rows={3}
                />
              </div>
            </div>

            {/* Donate Button */}
            <Button
              variant="donation"
              size="xl"
              className="w-full gap-2 font-myanmar"
              onClick={handleDonate}
              disabled={loading}
            >
              <Heart className="w-5 h-5" />
              {loading ? 'လုပ်ဆောင်နေပါသည်...' : 'လှူဒါန်းရန်'}
            </Button>

            {/* Note */}
            <p className="mt-6 text-center text-sm text-muted-foreground font-myanmar">
              မဖြစ်မနေ မဟုတ်ပါ။ သင်၏ စိတ်ဆန္ဒအလျောက်သာ ဖြစ်ပါသည်။
            </p>
          </div>
        </div>
      </section>

      {/* Why Donate */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-myanmar text-2xl font-bold text-foreground mb-8 text-center">
              သင်၏ လှူဒါန်းမှု၏ အကျိုးကျေးဇူးများ
            </h2>

            <div className="space-y-4">
              {[
                {
                  title: 'ဓမ္မဒါန ကုသိုလ်',
                  description: 'တရားဓမ္မကို ပျံ့နှံ့စေခြင်းသည် အမြင့်မြတ်ဆုံး ဒါနဖြစ်ပါသည်'
                },
                {
                  title: 'လူတိုင်း လက်လှမ်းမီစေခြင်း',
                  description: 'သင်၏ လှူဒါန်းမှုကြောင့် လူတိုင်း အခမဲ့ တရားတော်များ ဖတ်ရှုနိုင်ပါသည်'
                },
                {
                  title: 'သာသနာပြုလုပ်ငန်း',
                  description: 'ဗုဒ္ဓ၏ အဆုံးအမများကို နောင်လာမျိုးဆက်များသို့ လက်ဆင့်ကမ်းပေးခြင်း'
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border">
                  <div className="w-8 h-8 rounded-full bg-bodhi/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-bodhi" />
                  </div>
                  <div>
                    <h3 className="font-myanmar font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-myanmar">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-16 md:py-24">
        <div className="container px-4 text-center">
          <p className="text-2xl text-primary mb-4">🙏</p>
          <p className="font-myanmar text-lg text-foreground/90 max-w-xl mx-auto leading-relaxed">
            "ဒါနဟူသော အလှူသည် သုခချမ်းသာ၏ အကြောင်းတရားပေ"
          </p>
          <p className="mt-4 text-muted-foreground font-myanmar">
            သာသနာတော် ထွန်းကားပါစေ
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Donate;
