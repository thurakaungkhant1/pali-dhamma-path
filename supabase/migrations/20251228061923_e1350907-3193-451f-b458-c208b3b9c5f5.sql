-- Create profiles table for admin users
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT,
  full_name TEXT,
  is_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT,
  description TEXT,
  icon TEXT DEFAULT '📜',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on categories (public read)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are publicly readable" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Only admins can insert categories" ON public.categories FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true));
CREATE POLICY "Only admins can update categories" ON public.categories FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true));
CREATE POLICY "Only admins can delete categories" ON public.categories FOR DELETE 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true));

-- Create teachings table (main content)
CREATE TABLE public.teachings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_en TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  source TEXT,
  pali_audio_url TEXT,
  myanmar_audio_url TEXT,
  is_daily_dhamma BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT false,
  download_count INTEGER NOT NULL DEFAULT 0,
  view_count INTEGER NOT NULL DEFAULT 0,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on teachings
ALTER TABLE public.teachings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published teachings are publicly readable" ON public.teachings FOR SELECT 
  USING (is_published = true OR EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true));
CREATE POLICY "Only admins can insert teachings" ON public.teachings FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true));
CREATE POLICY "Only admins can update teachings" ON public.teachings FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true));
CREATE POLICY "Only admins can delete teachings" ON public.teachings FOR DELETE 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true));

-- Create paragraphs table (paragraph-based content)
CREATE TABLE public.paragraphs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  teaching_id UUID REFERENCES public.teachings(id) ON DELETE CASCADE NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  pali_text TEXT NOT NULL,
  pali_romanized TEXT,
  myanmar_translation TEXT NOT NULL,
  myanmar_explanation TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on paragraphs
ALTER TABLE public.paragraphs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Paragraphs of published teachings are publicly readable" ON public.paragraphs FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.teachings WHERE id = teaching_id AND (is_published = true OR EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true))));
CREATE POLICY "Only admins can insert paragraphs" ON public.paragraphs FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true));
CREATE POLICY "Only admins can update paragraphs" ON public.paragraphs FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true));
CREATE POLICY "Only admins can delete paragraphs" ON public.paragraphs FOR DELETE 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true));

-- Create bookmarks table
CREATE TABLE public.bookmarks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  teaching_id UUID REFERENCES public.teachings(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, teaching_id)
);

-- Enable RLS on bookmarks
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own bookmarks" ON public.bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own bookmarks" ON public.bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own bookmarks" ON public.bookmarks FOR DELETE USING (auth.uid() = user_id);

-- Create reading_progress table for offline tracking
CREATE TABLE public.reading_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  teaching_id UUID REFERENCES public.teachings(id) ON DELETE CASCADE NOT NULL,
  last_paragraph_id UUID REFERENCES public.paragraphs(id) ON DELETE SET NULL,
  progress_percentage INTEGER DEFAULT 0,
  is_downloaded BOOLEAN NOT NULL DEFAULT false,
  last_read_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, teaching_id)
);

-- Enable RLS on reading_progress
ALTER TABLE public.reading_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own reading progress" ON public.reading_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own reading progress" ON public.reading_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reading progress" ON public.reading_progress FOR UPDATE USING (auth.uid() = user_id);

-- Create donations table
CREATE TABLE public.donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'MMK',
  payment_method TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  donor_name TEXT,
  donor_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on donations
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own donations" ON public.donations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert donations" ON public.donations FOR INSERT WITH CHECK (true);
CREATE POLICY "Only admins can view all donations" ON public.donations FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true));

-- Create daily_dhamma table
CREATE TABLE public.daily_dhamma (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  teaching_id UUID REFERENCES public.teachings(id) ON DELETE CASCADE NOT NULL,
  featured_date DATE NOT NULL UNIQUE,
  excerpt TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on daily_dhamma (public read)
ALTER TABLE public.daily_dhamma ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Daily dhamma is publicly readable" ON public.daily_dhamma FOR SELECT USING (true);
CREATE POLICY "Only admins can insert daily dhamma" ON public.daily_dhamma FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true));
CREATE POLICY "Only admins can update daily dhamma" ON public.daily_dhamma FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true));
CREATE POLICY "Only admins can delete daily dhamma" ON public.daily_dhamma FOR DELETE 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true));

-- Create app_settings table for global settings
CREATE TABLE public.app_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on app_settings (public read)
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "App settings are publicly readable" ON public.app_settings FOR SELECT USING (true);
CREATE POLICY "Only admins can update app settings" ON public.app_settings FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true));

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_teachings_updated_at BEFORE UPDATE ON public.teachings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_app_settings_updated_at BEFORE UPDATE ON public.app_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for audio files
INSERT INTO storage.buckets (id, name, public) VALUES ('audio', 'audio', true);

-- Storage policies for audio bucket
CREATE POLICY "Audio files are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'audio');
CREATE POLICY "Only admins can upload audio" ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'audio' AND EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true));
CREATE POLICY "Only admins can update audio" ON storage.objects FOR UPDATE 
  USING (bucket_id = 'audio' AND EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true));
CREATE POLICY "Only admins can delete audio" ON storage.objects FOR DELETE 
  USING (bucket_id = 'audio' AND EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true));

-- Insert default categories
INSERT INTO public.categories (name, name_en, description, icon, sort_order) VALUES
('သုတ္တန်ပိဋကတ်', 'Sutta Pitaka', 'ဗုဒ္ဓဘုရားရှင်၏ မူရင်းတရားတော်များ', '📜', 1),
('ဓမ္မပဒ', 'Dhammapada', 'ဗုဒ္ဓ၏ အဆုံးအမ ဂါထာများ', '🪷', 2),
('မင်္ဂလသုတ်', 'Mangala Sutta', 'မင်္ဂလာ ၃၈ ပါး', '✨', 3),
('မေတ္တာသုတ်', 'Metta Sutta', 'မေတ္တာတရားတော်', '💝', 4),
('ပရိတ္တကြီး', 'Paritta', 'အကာကွယ်ပေးသော တရားတော်များ', '🛡️', 5);

-- Insert default app settings
INSERT INTO public.app_settings (key, value) VALUES
('site_title', '{"my": "နိဿယဓမ္မ", "en": "Nissaya Dhamma"}'),
('site_description', '{"my": "ပါဠိတရားတော်များကို မြန်မာဘာသာဖြင့် လွယ်ကူစွာ နားလည်နိုင်ရန်", "en": "Pali scriptures with easy Myanmar translations"}'),
('donation_info', '{"kbzpay": "", "wavemoney": "", "stripe_enabled": false}');