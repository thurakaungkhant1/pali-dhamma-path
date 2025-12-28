import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import TeachingCard from '@/components/TeachingCard';
import { teachings, categories } from '@/data/teachings';
import { cn } from '@/lib/utils';

const Teachings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  
  const activeCategory = searchParams.get('category');

  const filteredTeachings = useMemo(() => {
    if (!activeCategory) return teachings;
    return teachings.filter(t => t.category === activeCategory);
  }, [activeCategory]);

  const handleCategoryClick = (categoryId: string | null) => {
    if (categoryId) {
      setSearchParams({ category: categoryId });
    } else {
      setSearchParams({});
    }
    setShowFilters(false);
  };

  return (
    <Layout>
      {/* Header */}
      <section className="pt-8 pb-12 bg-secondary/30">
        <div className="container px-4">
          <h1 className="font-myanmar text-3xl md:text-4xl font-bold text-foreground mb-4">
            ဓမ္မသင်ကြားမှုများ
          </h1>
          <p className="text-muted-foreground font-myanmar max-w-2xl">
            ပါဠိတရားတော်များကို မြန်မာဘာသာဖြင့် လေ့လာပါ
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container px-4">
          <div className="flex items-center gap-4 py-4">
            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              size="sm"
              className="md:hidden gap-2 font-myanmar"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4" />
              စစ်ထုတ်ရန်
            </Button>

            {/* Desktop Category Pills */}
            <div className="hidden md:flex items-center gap-2 flex-wrap">
              <Button
                variant={!activeCategory ? 'default' : 'outline'}
                size="sm"
                className="font-myanmar"
                onClick={() => handleCategoryClick(null)}
              >
                အားလုံး
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  className="gap-2 font-myanmar"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <span>{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Active Filter Badge */}
            {activeCategory && (
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-muted-foreground hover:text-foreground md:hidden"
                onClick={() => handleCategoryClick(null)}
              >
                <X className="w-4 h-4" />
                <span className="font-myanmar">
                  {categories.find(c => c.id === activeCategory)?.name}
                </span>
              </Button>
            )}
          </div>

          {/* Mobile Filter Dropdown */}
          <div className={cn(
            'md:hidden overflow-hidden transition-all duration-300',
            showFilters ? 'max-h-64 pb-4' : 'max-h-0'
          )}>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={!activeCategory ? 'default' : 'outline'}
                size="sm"
                className="font-myanmar"
                onClick={() => handleCategoryClick(null)}
              >
                အားလုံး
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  className="gap-2 font-myanmar"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <span>{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Teachings Grid */}
      <section className="py-12">
        <div className="container px-4">
          {filteredTeachings.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground font-myanmar">
                ဤအမျိုးအစားတွင် တရားတော်များ မရှိသေးပါ
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground font-myanmar mb-6">
                {filteredTeachings.length} ခု တွေ့ရှိသည်
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTeachings.map((teaching) => (
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

export default Teachings;
