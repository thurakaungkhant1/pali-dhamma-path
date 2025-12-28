import { useState, useMemo } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import TeachingCard from '@/components/TeachingCard';
import { teachings } from '@/data/teachings';

const Search = () => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    return teachings.filter(teaching => 
      teaching.paliText.toLowerCase().includes(lowerQuery) ||
      teaching.paliRomanized.toLowerCase().includes(lowerQuery) ||
      teaching.myanmarTranslation.includes(query) ||
      teaching.explanation.includes(query) ||
      teaching.source.toLowerCase().includes(lowerQuery) ||
      teaching.tags.some(tag => tag.includes(query))
    );
  }, [query]);

  return (
    <Layout>
      {/* Header */}
      <section className="pt-8 pb-12 bg-secondary/30">
        <div className="container px-4">
          <h1 className="font-myanmar text-3xl md:text-4xl font-bold text-foreground mb-4">
            ရှာဖွေရန်
          </h1>
          <p className="text-muted-foreground font-myanmar mb-8">
            ပါဠိစကား သို့မဟုတ် မြန်မာဘာသာဖြင့် ရှာဖွေပါ
          </p>

          {/* Search Input */}
          <div className="max-w-xl relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="ရှာဖွေလိုသော စကားလုံး..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 pr-12 h-14 text-lg font-myanmar rounded-xl"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setQuery('')}
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="container px-4">
          {!query.trim() ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
                <SearchIcon className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="font-myanmar text-xl font-semibold text-foreground mb-4">
                ရှာဖွေလိုသော စကားလုံးကို ရိုက်ထည့်ပါ
              </h2>
              <p className="text-muted-foreground font-myanmar max-w-md mx-auto">
                ပါဠိစကား၊ မြန်မာဘာသာပြန်၊ သို့မဟုတ် အကြောင်းအရာ အားဖြင့် ရှာဖွေနိုင်ပါသည်
              </p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="font-myanmar text-xl font-semibold text-foreground mb-4">
                ရှာဖွေမှု ရလဒ် မရှိပါ
              </h2>
              <p className="text-muted-foreground font-myanmar">
                "{query}" နှင့် ကိုက်ညီသော တရားတော် မတွေ့ရှိပါ
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground font-myanmar mb-6">
                "{query}" အတွက် {searchResults.length} ခု တွေ့ရှိသည်
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((teaching) => (
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

export default Search;
