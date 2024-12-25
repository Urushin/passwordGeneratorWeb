import React from 'react';
import type { Language } from '../types';

interface Props {
  language: Language;
  onChange: (lang: Language) => void;
}

const LanguageToggle: React.FC<Props> = ({ language, onChange }) => {
  return (
    <button
      onClick={() => onChange(language === 'fr' ? 'en' : 'fr')}
      className="px-3 py-1.5 text-sm font-medium rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      aria-label={`Switch to ${language === 'fr' ? 'English' : 'French'}`}
    >
      {language === 'fr' ? 'EN' : 'FR'}
    </button>
  );
};

export default LanguageToggle;