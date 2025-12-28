import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ReadingSettings {
  fontSize: 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  showPali: boolean;
  showTranslation: boolean;
  showExplanation: boolean;
  nightMode: boolean;
}

interface ReadingContextType {
  settings: ReadingSettings;
  updateSettings: (settings: Partial<ReadingSettings>) => void;
  toggleNightMode: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}

const defaultSettings: ReadingSettings = {
  fontSize: 'base',
  showPali: true,
  showTranslation: true,
  showExplanation: true,
  nightMode: false,
};

const fontSizes: ReadingSettings['fontSize'][] = ['sm', 'base', 'lg', 'xl', '2xl'];

const ReadingContext = createContext<ReadingContextType | undefined>(undefined);

export const ReadingProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<ReadingSettings>(() => {
    const stored = localStorage.getItem('nissaya-reading-settings');
    return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('nissaya-reading-settings', JSON.stringify(settings));
    
    // Apply night mode to document
    if (settings.nightMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<ReadingSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const toggleNightMode = () => {
    setSettings(prev => ({ ...prev, nightMode: !prev.nightMode }));
  };

  const increaseFontSize = () => {
    setSettings(prev => {
      const currentIndex = fontSizes.indexOf(prev.fontSize);
      if (currentIndex < fontSizes.length - 1) {
        return { ...prev, fontSize: fontSizes[currentIndex + 1] };
      }
      return prev;
    });
  };

  const decreaseFontSize = () => {
    setSettings(prev => {
      const currentIndex = fontSizes.indexOf(prev.fontSize);
      if (currentIndex > 0) {
        return { ...prev, fontSize: fontSizes[currentIndex - 1] };
      }
      return prev;
    });
  };

  return (
    <ReadingContext.Provider value={{
      settings,
      updateSettings,
      toggleNightMode,
      increaseFontSize,
      decreaseFontSize,
    }}>
      {children}
    </ReadingContext.Provider>
  );
};

export const useReading = () => {
  const context = useContext(ReadingContext);
  if (context === undefined) {
    throw new Error('useReading must be used within a ReadingProvider');
  }
  return context;
};
