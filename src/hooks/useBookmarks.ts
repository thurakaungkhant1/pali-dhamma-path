import { useState, useEffect } from 'react';

const BOOKMARKS_KEY = 'pali-dhamma-bookmarks';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(BOOKMARKS_KEY);
    if (stored) {
      setBookmarks(JSON.parse(stored));
    }
  }, []);

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => {
      const newBookmarks = prev.includes(id)
        ? prev.filter(b => b !== id)
        : [...prev, id];
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newBookmarks));
      return newBookmarks;
    });
  };

  const isBookmarked = (id: string) => bookmarks.includes(id);

  return { bookmarks, toggleBookmark, isBookmarked };
};
