import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Moon, Sun, Heart, LogIn, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const { user, signOut, isAdmin } = useAuth();

  const navLinks = [
    { href: '/', label: 'ပင်မစာမျက်နှာ' },
    { href: '/teachings', label: 'ဓမ္မသင်ကြားမှု' },
    { href: '/bookmarks', label: 'သိမ်းဆည်းထားသည်' },
    { href: '/offline', label: 'ဒေါင်းလုဒ်များ' },
    { href: '/about', label: 'အကြောင်း' },
    ...(isAdmin ? [{ href: '/admin', label: 'Admin' }] : []),
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-soft' 
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-temple-gold flex items-center justify-center shadow-gold group-hover:scale-105 transition-transform">
              <span className="text-primary-foreground font-pali text-xl font-bold">ဓ</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-myanmar font-semibold text-foreground leading-tight">
                ပါဠိတရားတော်
              </h1>
              <p className="text-xs text-muted-foreground">Pāḷi Dhamma</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg font-myanmar text-sm transition-colors',
                  isActive(link.href)
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Link to="/search">
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Search className="w-5 h-5" />
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleDarkMode}
              className="hidden sm:flex"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            <Link to="/donate" className="hidden sm:block">
              <Button variant="donation" size="sm" className="gap-2">
                <Heart className="w-4 h-4" />
                <span className="font-myanmar">လှူဒါန်း</span>
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-lg border-b border-border overflow-hidden transition-all duration-300',
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="container mx-auto px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'block px-4 py-3 rounded-lg font-myanmar transition-colors',
                isActive(link.href)
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="pt-2 border-t border-border flex items-center gap-2">
            <Link to="/search" className="flex-1">
              <Button variant="outline" className="w-full gap-2">
                <Search className="w-4 h-4" />
                <span className="font-myanmar">ရှာဖွေရန်</span>
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={toggleDarkMode}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>

          <Link to="/donate" className="block pt-2">
            <Button variant="donation" className="w-full gap-2">
              <Heart className="w-4 h-4" />
              <span className="font-myanmar">လှူဒါန်းရန်</span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
