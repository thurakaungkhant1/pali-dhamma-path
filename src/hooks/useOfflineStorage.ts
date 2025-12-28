import { useState, useEffect } from 'react';
import { Teaching, Paragraph } from './useTeachings';

interface OfflineTeaching extends Teaching {
  downloadedAt: string;
}

const OFFLINE_KEY = 'nissaya-offline-teachings';

export const useOfflineStorage = () => {
  const [offlineTeachings, setOfflineTeachings] = useState<OfflineTeaching[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(OFFLINE_KEY);
    if (stored) {
      setOfflineTeachings(JSON.parse(stored));
    }
  }, []);

  const saveForOffline = (teaching: Teaching) => {
    const offlineTeaching: OfflineTeaching = {
      ...teaching,
      downloadedAt: new Date().toISOString(),
    };

    setOfflineTeachings(prev => {
      // Replace if already exists
      const filtered = prev.filter(t => t.id !== teaching.id);
      const updated = [...filtered, offlineTeaching];
      localStorage.setItem(OFFLINE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromOffline = (teachingId: string) => {
    setOfflineTeachings(prev => {
      const updated = prev.filter(t => t.id !== teachingId);
      localStorage.setItem(OFFLINE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const isAvailableOffline = (teachingId: string): boolean => {
    return offlineTeachings.some(t => t.id === teachingId);
  };

  const getOfflineTeaching = (teachingId: string): OfflineTeaching | undefined => {
    return offlineTeachings.find(t => t.id === teachingId);
  };

  const clearAllOffline = () => {
    localStorage.removeItem(OFFLINE_KEY);
    setOfflineTeachings([]);
  };

  return {
    offlineTeachings,
    saveForOffline,
    removeFromOffline,
    isAvailableOffline,
    getOfflineTeaching,
    clearAllOffline,
    offlineCount: offlineTeachings.length,
  };
};
