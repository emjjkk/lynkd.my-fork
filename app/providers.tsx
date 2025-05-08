'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type Locale = 'en' | 'zh';
const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
} | undefined>(undefined);

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    // Sync with server cookie on client-side changes
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; sameSite=lax${
      process.env.NODE_ENV === 'production' ? '; secure' : ''
    }`;
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}