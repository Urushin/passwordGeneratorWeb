import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Theme } from '../types';

interface Props {
  theme: Theme;
  onChange: (theme: Theme) => void;
}

const ThemeToggle: React.FC<Props> = ({ theme, onChange }) => {
  return (
    <button
      onClick={() => onChange(theme === 'light' ? 'dark' : 'light')}
      className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      ) : (
        <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      )}
    </button>
  );
};

export default ThemeToggle;