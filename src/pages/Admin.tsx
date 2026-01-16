import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Plus, BookOpen, Settings, Calendar, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useTeachings, useCategories } from '@/hooks/useTeachings';

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();
  const { data: teachings, isLoading: teachingsLoading } = useTeachings();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return (
      <Layout>
        <div className="container px-4 py-20 text-center">
          <h1 className="font-myanmar text-2xl text-foreground mb-4">
            ခွင့်ပြုချက် မရှိပါ
          </h1>
          <p className="text-muted-foreground font-myanmar mb-6">
            ဤစာမျက်နှာကို ကြည့်ရှုခွင့် မရှိပါ။ Admin အကောင့်ဖြင့် ဝင်ရောက်ပါ။
          </p>
          <Link to="/">
            <Button variant="outline" className="font-myanmar">
              ပင်မစာမျက်နှာသို့
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="pt-8 pb-12 bg-secondary/30">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-myanmar text-3xl md:text-4xl font-bold text-foreground mb-2">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground font-myanmar">
                တရားတော်များ စီမံခန့်ခွဲရန်
              </p>
            </div>
            <Link to="/admin/teaching/new">
              <Button variant="golden" className="gap-2 font-myanmar">
                <Plus className="w-5 h-5" />
                တရားတော်သစ် ထည့်ရန်
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="container px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="font-myanmar">စုစုပေါင်း တရားတော်</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-3xl font-bold">
                    {teachingsLoading ? '-' : teachings?.length ?? 0}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="font-myanmar">အမျိုးအစားများ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-bodhi/10">
                    <Settings className="w-5 h-5 text-bodhi" />
                  </div>
                  <span className="text-3xl font-bold">
                    {categoriesLoading ? '-' : categories?.length ?? 0}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="font-myanmar">ကြည့်ရှုမှု (စုစုပေါင်း)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-temple-gold/10">
                    <Calendar className="w-5 h-5 text-temple-gold" />
                  </div>
                  <span className="text-3xl font-bold">
                    {teachingsLoading ? '-' : teachings?.reduce((sum, t) => sum + (t.view_count || 0), 0)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="font-myanmar">ဒေါင်းလုဒ် (စုစုပေါင်း)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-lotus/10">
                    <Calendar className="w-5 h-5 text-lotus" />
                  </div>
                  <span className="text-3xl font-bold">
                    {teachingsLoading ? '-' : teachings?.reduce((sum, t) => sum + (t.download_count || 0), 0)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Teachings List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-myanmar">တရားတော်များ</CardTitle>
                  <CardDescription className="font-myanmar">
                    တရားတော်များကို ပြင်ဆင်ရန် နှိပ်ပါ
                  </CardDescription>
                </div>
                <Link to="/admin/teaching/new">
                  <Button variant="outline" size="sm" className="gap-2 font-myanmar">
                    <Plus className="w-4 h-4" />
                    အသစ်ထည့်ရန်
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {teachingsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : !teachings || teachings.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground font-myanmar mb-4">
                    တရားတော်များ မရှိသေးပါ
                  </p>
                  <Link to="/admin/teaching/new">
                    <Button variant="golden" className="gap-2 font-myanmar">
                      <Plus className="w-5 h-5" />
                      ပထမဆုံး တရားတော် ထည့်ရန်
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {teachings.map((teaching) => (
                    <Link
                      key={teaching.id}
                      to={`/admin/teaching/${teaching.id}`}
                      className="block py-4 hover:bg-muted/50 -mx-6 px-6 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-myanmar font-medium text-foreground">
                            {teaching.title}
                          </h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            {teaching.category && (
                              <span className="flex items-center gap-1">
                                <span>{teaching.category.icon}</span>
                                <span>{teaching.category.name}</span>
                              </span>
                            )}
                            <span>ကြည့်ရှုမှု: {teaching.view_count}</span>
                            <span className={teaching.is_published ? 'text-bodhi' : 'text-muted-foreground'}>
                              {teaching.is_published ? 'ထုတ်ဝေပြီး' : 'မူကြမ်း'}
                            </span>
                          </div>
                        </div>
                        <span className="text-muted-foreground">→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
