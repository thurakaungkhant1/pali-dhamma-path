import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Teaching } from './useTeachings';

export const useBookmarksDb = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const bookmarksQuery = useQuery({
    queryKey: ['bookmarks', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('bookmarks')
        .select(`
          id,
          teaching_id,
          created_at,
          teaching:teachings(
            *,
            category:categories(*)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const addBookmark = useMutation({
    mutationFn: async (teachingId: string) => {
      if (!user) throw new Error('Must be logged in');

      const { data, error } = await supabase
        .from('bookmarks')
        .insert({ user_id: user.id, teaching_id: teachingId })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks', user?.id] });
    },
  });

  const removeBookmark = useMutation({
    mutationFn: async (teachingId: string) => {
      if (!user) throw new Error('Must be logged in');

      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', user.id)
        .eq('teaching_id', teachingId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks', user?.id] });
    },
  });

  const isBookmarked = (teachingId: string): boolean => {
    if (!bookmarksQuery.data) return false;
    return bookmarksQuery.data.some(b => b.teaching_id === teachingId);
  };

  const toggleBookmark = async (teachingId: string) => {
    if (isBookmarked(teachingId)) {
      await removeBookmark.mutateAsync(teachingId);
    } else {
      await addBookmark.mutateAsync(teachingId);
    }
  };

  return {
    bookmarks: bookmarksQuery.data ?? [],
    isLoading: bookmarksQuery.isLoading,
    isBookmarked,
    toggleBookmark,
    addBookmark,
    removeBookmark,
  };
};
