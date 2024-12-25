import { useState, useCallback } from 'react';
import { translations } from '../i18n/translations';
import type { Language } from '../types';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('fr');

  const t = useCallback((key: string) => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  }, [language]);

  return { language, setLanguage, t };
}