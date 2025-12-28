import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Category {
  id: string;
  name: string;
  name_en: string | null;
  description: string | null;
  icon: string | null;
  sort_order: number | null;
}

export interface Paragraph {
  id: string;
  teaching_id: string;
  sort_order: number;
  pali_text: string;
  pali_romanized: string | null;
  myanmar_translation: string;
  myanmar_explanation: string | null;
}

export interface Teaching {
  id: string;
  title: string;
  title_en: string | null;
  category_id: string | null;
  source: string | null;
  pali_audio_url: string | null;
  myanmar_audio_url: string | null;
  is_daily_dhamma: boolean;
  is_published: boolean;
  download_count: number;
  view_count: number;
  created_at: string;
  updated_at: string;
  category?: Category;
  paragraphs?: Paragraph[];
}

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as Category[];
    },
  });
};

export const useTeachings = (categoryId?: string) => {
  return useQuery({
    queryKey: ['teachings', categoryId],
    queryFn: async () => {
      let query = supabase
        .from('teachings')
        .select(`
          *,
          category:categories(*)
        `)
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      
      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as Teaching[];
    },
  });
};

export const useTeaching = (id: string) => {
  return useQuery({
    queryKey: ['teaching', id],
    queryFn: async () => {
      const { data: teaching, error: teachingError } = await supabase
        .from('teachings')
        .select(`
          *,
          category:categories(*)
        `)
        .eq('id', id)
        .maybeSingle();
      
      if (teachingError) throw teachingError;
      if (!teaching) return null;

      const { data: paragraphs, error: paragraphsError } = await supabase
        .from('paragraphs')
        .select('*')
        .eq('teaching_id', id)
        .order('sort_order', { ascending: true });
      
      if (paragraphsError) throw paragraphsError;

      // Increment view count
      await supabase
        .from('teachings')
        .update({ view_count: (teaching.view_count || 0) + 1 })
        .eq('id', id);

      return { ...teaching, paragraphs } as Teaching;
    },
    enabled: !!id,
  });
};

export const useDailyDhamma = () => {
  return useQuery({
    queryKey: ['daily-dhamma'],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('daily_dhamma')
        .select(`
          *,
          teaching:teachings(
            *,
            category:categories(*)
          )
        `)
        .eq('featured_date', today)
        .maybeSingle();
      
      if (error) throw error;
      
      // If no daily dhamma for today, get the latest one
      if (!data) {
        const { data: latest, error: latestError } = await supabase
          .from('daily_dhamma')
          .select(`
            *,
            teaching:teachings(
              *,
              category:categories(*)
            )
          `)
          .order('featured_date', { ascending: false })
          .limit(1)
          .maybeSingle();
        
        if (latestError) throw latestError;
        return latest;
      }
      
      return data;
    },
  });
};

export const useSearchTeachings = (query: string) => {
  return useQuery({
    queryKey: ['search-teachings', query],
    queryFn: async () => {
      if (!query.trim()) return [];

      const { data, error } = await supabase
        .from('teachings')
        .select(`
          *,
          category:categories(*)
        `)
        .eq('is_published', true)
        .or(`title.ilike.%${query}%,source.ilike.%${query}%`)
        .order('created_at', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      return data as Teaching[];
    },
    enabled: query.length > 0,
  });
};

// Admin mutations
export const useCreateTeaching = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (teaching: { title: string; category_id?: string; source?: string; is_published?: boolean }) => {
      const { data, error } = await supabase
        .from('teachings')
        .insert([teaching])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachings'] });
    },
  });
};

export const useUpdateTeaching = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Teaching> & { id: string }) => {
      const { data, error } = await supabase
        .from('teachings')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['teachings'] });
      queryClient.invalidateQueries({ queryKey: ['teaching', variables.id] });
    },
  });
};

export const useCreateParagraph = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (paragraph: { teaching_id: string; pali_text: string; myanmar_translation: string; sort_order?: number; pali_romanized?: string; myanmar_explanation?: string }) => {
      const { data, error } = await supabase
        .from('paragraphs')
        .insert([paragraph])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['teaching', variables.teaching_id] });
    },
  });
};

export const useUpdateParagraph = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, teaching_id, ...updates }: Partial<Paragraph> & { id: string; teaching_id: string }) => {
      const { data, error } = await supabase
        .from('paragraphs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['teaching', variables.teaching_id] });
    },
  });
};

export const useDeleteParagraph = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, teaching_id }: { id: string; teaching_id: string }) => {
      const { error } = await supabase
        .from('paragraphs')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['teaching', variables.teaching_id] });
    },
  });
};
