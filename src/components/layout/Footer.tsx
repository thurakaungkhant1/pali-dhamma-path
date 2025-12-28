import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Lotus Divider */}
        <div className="lotus-divider mb-8">
          <span className="px-4 text-2xl text-primary">❀</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-temple-gold flex items-center justify-center">
                <span className="text-primary-foreground font-pali text-xl font-bold">ဓ</span>
              </div>
              <div>
                <h3 className="font-myanmar font-semibold text-foreground">ပါဠိတရားတော်</h3>
                <p className="text-xs text-muted-foreground">Pāḷi Dhamma Myanmar</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-myanmar leading-relaxed">
              ဗုဒ္ဓဘာသာတရားတော်များကို မြန်မာဘာသာဖြင့် လွယ်ကူစွာ နားလည်နိုင်ရန် ရည်ရွယ်ပါသည်။
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="font-myanmar font-semibold text-foreground mb-4">အမြန်လင့်များ</h4>
            <nav className="space-y-2">
              <Link to="/teachings" className="block text-sm text-muted-foreground hover:text-primary transition-colors font-myanmar">
                ဓမ္မသင်ကြားမှု
              </Link>
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors font-myanmar">
                ကျွန်ုပ်တို့အကြောင်း
              </Link>
              <Link to="/donate" className="block text-sm text-muted-foreground hover:text-primary transition-colors font-myanmar">
                လှူဒါန်းရန်
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="text-center md:text-right">
            <h4 className="font-myanmar font-semibold text-foreground mb-4">အမျိုးအစားများ</h4>
            <nav className="space-y-2">
              <Link to="/teachings?category=sutta" className="block text-sm text-muted-foreground hover:text-primary transition-colors font-myanmar">
                သုတ္တန်ပိဋကတ်
              </Link>
              <Link to="/teachings?category=dhamma" className="block text-sm text-muted-foreground hover:text-primary transition-colors font-myanmar">
                ဓမ္မစကားများ
              </Link>
              <Link to="/teachings?category=daily" className="block text-sm text-muted-foreground hover:text-primary transition-colors font-myanmar">
                နေ့စဉ်သင်ကြားမှု
              </Link>
              <Link to="/teachings?category=mindfulness" className="block text-sm text-muted-foreground hover:text-primary transition-colors font-myanmar">
                သတိပဋ္ဌာန်
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground font-myanmar flex items-center justify-center gap-1">
            <Heart className="w-4 h-4 text-lotus" />
            <span>သာသနာတော် ထွန်းကားပါစေ</span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © {new Date().getFullYear()} Pāḷi Dhamma Myanmar
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
