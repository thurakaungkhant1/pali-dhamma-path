import { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Save, Loader2, GripVertical, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useTeaching, useCategories, useCreateTeaching, useUpdateTeaching, useCreateParagraph, useUpdateParagraph, useDeleteParagraph } from '@/hooks/useTeachings';
import { useToast } from '@/hooks/use-toast';

interface ParagraphForm {
  id?: string;
  pali_text: string;
  pali_romanized: string;
  myanmar_translation: string;
  myanmar_explanation: string;
  sort_order: number;
  isNew?: boolean;
  isDeleted?: boolean;
}

const AdminTeachingEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { toast } = useToast();
  
  const isNew = id === 'new';
  const { data: teaching, isLoading: teachingLoading } = useTeaching(id ?? '');
  const { data: categories } = useCategories();
  
  const createTeaching = useCreateTeaching();
  const updateTeaching = useUpdateTeaching();
  const createParagraph = useCreateParagraph();
  const updateParagraph = useUpdateParagraph();
  const deleteParagraph = useDeleteParagraph();

  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [source, setSource] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [isDailyDhamma, setIsDailyDhamma] = useState(false);
  const [paragraphs, setParagraphs] = useState<ParagraphForm[]>([]);
  const [saving, setSaving] = useState(false);

  // Load teaching data
  useEffect(() => {
    if (teaching && !isNew) {
      setTitle(teaching.title);
      setTitleEn(teaching.title_en ?? '');
      setCategoryId(teaching.category_id ?? '');
      setSource(teaching.source ?? '');
      setIsPublished(teaching.is_published);
      setIsDailyDhamma(teaching.is_daily_dhamma);
      setParagraphs(
        (teaching.paragraphs ?? []).map(p => ({
          id: p.id,
          pali_text: p.pali_text,
          pali_romanized: p.pali_romanized ?? '',
          myanmar_translation: p.myanmar_translation,
          myanmar_explanation: p.myanmar_explanation ?? '',
          sort_order: p.sort_order,
        }))
      );
    }
  }, [teaching, isNew]);

  const handleAddParagraph = () => {
    setParagraphs(prev => [
      ...prev,
      {
        pali_text: '',
        pali_romanized: '',
        myanmar_translation: '',
        myanmar_explanation: '',
        sort_order: prev.length + 1,
        isNew: true,
      }
    ]);
  };

  const handleParagraphChange = (index: number, field: keyof ParagraphForm, value: string) => {
    setParagraphs(prev => prev.map((p, i) => 
      i === index ? { ...p, [field]: value } : p
    ));
  };

  const handleDeleteParagraph = (index: number) => {
    setParagraphs(prev => prev.map((p, i) => 
      i === index ? { ...p, isDeleted: true } : p
    ));
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast({
        title: 'ခေါင်းစဉ် ထည့်ပါ',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      let teachingId = id;

      if (isNew) {
        // Create new teaching
        const result = await createTeaching.mutateAsync({
          title,
          category_id: categoryId || undefined,
          source: source || undefined,
          is_published: isPublished,
        });
        teachingId = result.id;
        
        // Also update other fields
        await updateTeaching.mutateAsync({
          id: result.id,
          title_en: titleEn || undefined,
          is_daily_dhamma: isDailyDhamma,
        });
      } else if (teachingId) {
        // Update existing teaching
        await updateTeaching.mutateAsync({
          id: teachingId,
          title,
          title_en: titleEn || undefined,
          category_id: categoryId || undefined,
          source: source || undefined,
          is_published: isPublished,
          is_daily_dhamma: isDailyDhamma,
        });
      }

      // Handle paragraphs
      if (teachingId) {
        for (const paragraph of paragraphs) {
          if (paragraph.isDeleted && paragraph.id) {
            await deleteParagraph.mutateAsync({ id: paragraph.id, teaching_id: teachingId });
          } else if (paragraph.isNew && !paragraph.isDeleted) {
            await createParagraph.mutateAsync({
              teaching_id: teachingId,
              pali_text: paragraph.pali_text,
              myanmar_translation: paragraph.myanmar_translation,
              pali_romanized: paragraph.pali_romanized || undefined,
              myanmar_explanation: paragraph.myanmar_explanation || undefined,
              sort_order: paragraph.sort_order,
            });
          } else if (paragraph.id && !paragraph.isDeleted) {
            await updateParagraph.mutateAsync({
              id: paragraph.id,
              teaching_id: teachingId,
              pali_text: paragraph.pali_text,
              myanmar_translation: paragraph.myanmar_translation,
              pali_romanized: paragraph.pali_romanized || undefined,
              myanmar_explanation: paragraph.myanmar_explanation || undefined,
              sort_order: paragraph.sort_order,
            });
          }
        }
      }

      toast({
        title: isNew ? 'တရားတော် ဖန်တီးပြီးပါပြီ' : 'သိမ်းဆည်းပြီးပါပြီ',
      });

      if (isNew && teachingId) {
        navigate(`/admin/teaching/${teachingId}`);
      }
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: 'အမှားတစ်ခု ဖြစ်ပေါ်ပါသည်',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) {
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
          <Link to="/">
            <Button variant="outline" className="font-myanmar">
              ပင်မစာမျက်နှာသို့
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  if (!isNew && teachingLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  const activeParagraphs = paragraphs.filter(p => !p.isDeleted);

  return (
    <Layout>
      {/* Header */}
      <section className="pt-8 pb-6 bg-secondary/30">
        <div className="container px-4">
          <Link to="/admin" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-myanmar">Admin Dashboard</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-myanmar text-2xl md:text-3xl font-bold text-foreground">
                {isNew ? 'တရားတော်သစ် ထည့်ရန်' : 'တရားတော် ပြင်ဆင်ရန်'}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              {!isNew && (
                <Link to={`/teaching/${id}`}>
                  <Button variant="outline" className="gap-2 font-myanmar">
                    <Eye className="w-4 h-4" />
                    ကြည့်ရန်
                  </Button>
                </Link>
              )}
              <Button 
                variant="golden" 
                className="gap-2 font-myanmar"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                သိမ်းဆည်းရန်
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="font-myanmar">အခြေခံ အချက်အလက်</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="font-myanmar">ခေါင်းစဉ် (မြန်မာ) *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="ဥပမာ - ဓမ္မပဒ ဂါထာ ၁"
                      className="font-myanmar"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="titleEn" className="font-myanmar">ခေါင်းစဉ် (English)</Label>
                    <Input
                      id="titleEn"
                      value={titleEn}
                      onChange={(e) => setTitleEn(e.target.value)}
                      placeholder="e.g. Dhammapada Verse 1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="font-myanmar">အမျိုးအစား</Label>
                    <Select value={categoryId} onValueChange={setCategoryId}>
                      <SelectTrigger>
                        <SelectValue placeholder="အမျိုးအစား ရွေးပါ" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            <span className="flex items-center gap-2">
                              <span>{cat.icon}</span>
                              <span className="font-myanmar">{cat.name}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="source" className="font-myanmar">အရင်းအမြစ်</Label>
                    <Input
                      id="source"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      placeholder="ဥပမာ - ဓမ္မပဒပါဠိတော်"
                      className="font-myanmar"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-8">
                  <div className="flex items-center gap-3">
                    <Switch
                      id="published"
                      checked={isPublished}
                      onCheckedChange={setIsPublished}
                    />
                    <Label htmlFor="published" className="font-myanmar cursor-pointer">
                      ထုတ်ဝေမည်
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch
                      id="dailyDhamma"
                      checked={isDailyDhamma}
                      onCheckedChange={setIsDailyDhamma}
                    />
                    <Label htmlFor="dailyDhamma" className="font-myanmar cursor-pointer">
                      နေ့စဉ်ဓမ္မ အဖြစ် သတ်မှတ်မည်
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Paragraphs */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-myanmar">စာပိုဒ်များ</CardTitle>
                    <CardDescription className="font-myanmar">
                      ပါဠိနှင့် မြန်မာဘာသာပြန် အပိုင်းလိုက် ထည့်ပါ
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2 font-myanmar" onClick={handleAddParagraph}>
                    <Plus className="w-4 h-4" />
                    စာပိုဒ် ထည့်ရန်
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {activeParagraphs.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
                    <p className="text-muted-foreground font-myanmar mb-4">
                      စာပိုဒ်များ မရှိသေးပါ
                    </p>
                    <Button variant="outline" className="gap-2 font-myanmar" onClick={handleAddParagraph}>
                      <Plus className="w-4 h-4" />
                      ပထမဆုံး စာပိုဒ် ထည့်ရန်
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {paragraphs.map((paragraph, index) => {
                      if (paragraph.isDeleted) return null;
                      
                      return (
                        <div 
                          key={paragraph.id ?? `new-${index}`}
                          className="p-6 border border-border rounded-lg bg-card relative"
                        >
                          <div className="absolute top-4 right-4 flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              #{paragraph.sort_order}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:bg-destructive/10"
                              onClick={() => handleDeleteParagraph(index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label className="font-myanmar text-primary">ပါဠိ စာသား *</Label>
                              <Textarea
                                value={paragraph.pali_text}
                                onChange={(e) => handleParagraphChange(index, 'pali_text', e.target.value)}
                                placeholder="ပါဠိ စာသား ရိုက်ထည့်ပါ..."
                                className="font-pali min-h-[80px]"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label className="font-myanmar text-muted-foreground">ပါဠိ (Romanized)</Label>
                              <Input
                                value={paragraph.pali_romanized}
                                onChange={(e) => handleParagraphChange(index, 'pali_romanized', e.target.value)}
                                placeholder="e.g. Sabbapāpassa akaraṇaṃ..."
                                className="font-pali"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label className="font-myanmar text-bodhi">မြန်မာ ဘာသာပြန် *</Label>
                              <Textarea
                                value={paragraph.myanmar_translation}
                                onChange={(e) => handleParagraphChange(index, 'myanmar_translation', e.target.value)}
                                placeholder="မြန်မာ ဘာသာပြန် ရိုက်ထည့်ပါ..."
                                className="font-myanmar min-h-[80px]"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label className="font-myanmar text-accent">ရှင်းလင်းချက် (မြန်မာ)</Label>
                              <Textarea
                                value={paragraph.myanmar_explanation}
                                onChange={(e) => handleParagraphChange(index, 'myanmar_explanation', e.target.value)}
                                placeholder="ရှင်းလင်းချက် (ရှိလျှင်) ရိုက်ထည့်ပါ..."
                                className="font-myanmar min-h-[100px]"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {activeParagraphs.length > 0 && (
                  <div className="flex justify-center pt-4">
                    <Button variant="outline" className="gap-2 font-myanmar" onClick={handleAddParagraph}>
                      <Plus className="w-4 h-4" />
                      နောက်ထပ် စာပိုဒ် ထည့်ရန်
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end gap-4">
              <Link to="/admin">
                <Button variant="outline" className="font-myanmar">
                  ပယ်ဖျက်ရန်
                </Button>
              </Link>
              <Button 
                variant="golden" 
                className="gap-2 font-myanmar"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                သိမ်းဆည်းရန်
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminTeachingEdit;
