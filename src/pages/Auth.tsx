import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: 'အကောင့်ဝင်ရောက်မှု မအောင်မြင်ပါ',
            description: error.message === 'Invalid login credentials' 
              ? 'အီးမေးလ် သို့မဟုတ် စကားဝှက် မှားယွင်းနေပါသည်' 
              : error.message,
            variant: 'destructive',
          });
        } else {
          toast({ title: 'အကောင့်ဝင်ရောက်မှု အောင်မြင်ပါသည်' });
          navigate('/');
        }
      } else {
        if (password.length < 6) {
          toast({
            title: 'စကားဝှက် တိုလွန်းပါသည်',
            description: 'စကားဝှက်သည် အနည်းဆုံး ၆ လုံး ရှိရမည်',
            variant: 'destructive',
          });
          setLoading(false);
          return;
        }

        const { error } = await signUp(email, password, fullName);
        if (error) {
          let message = error.message;
          if (error.message.includes('already registered')) {
            message = 'ဤအီးမေးလ်ဖြင့် အကောင့်တစ်ခု ရှိပြီးသားဖြစ်ပါသည်';
          }
          toast({
            title: 'အကောင့်ဖွင့်မှု မအောင်မြင်ပါ',
            description: message,
            variant: 'destructive',
          });
        } else {
          toast({ 
            title: 'အကောင့်ဖွင့်မှု အောင်မြင်ပါသည်',
            description: 'အကောင့်ဝင်ရောက်ပြီးပါပြီ',
          });
          navigate('/');
        }
      }
    } catch (err) {
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-secondary/50 to-background">
      {/* Header */}
      <div className="p-4">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-myanmar">ပင်မစာမျက်နှာ</span>
        </Link>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-temple-gold shadow-gold mb-4">
              <span className="text-primary-foreground font-pali text-3xl font-bold">နိ</span>
            </div>
            <h1 className="font-myanmar text-2xl font-bold text-foreground">
              {isLogin ? 'အကောင့်ဝင်ရန်' : 'အကောင့်အသစ်ဖွင့်ရန်'}
            </h1>
            <p className="text-sm text-muted-foreground font-myanmar mt-2">
              {isLogin 
                ? 'သင်၏ အကောင့်ဖြင့် ဝင်ရောက်ပါ' 
                : 'အကောင့်အသစ် ဖန်တီးပါ'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="font-myanmar">အမည်</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="သင့်အမည်"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10 h-12 font-myanmar"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="font-myanmar">အီးမေးလ်</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-myanmar">စကားဝှက်</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="golden"
              size="lg"
              className="w-full font-myanmar"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isLogin ? (
                'ဝင်ရောက်ရန်'
              ) : (
                'အကောင့်ဖွင့်ရန်'
              )}
            </Button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground font-myanmar">
              {isLogin ? 'အကောင့်မရှိသေးပါသလား?' : 'အကောင့်ရှိပြီးသားလား?'}
            </p>
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="font-myanmar"
            >
              {isLogin ? 'အကောင့်အသစ်ဖွင့်ရန်' : 'အကောင့်ဝင်ရန်'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
