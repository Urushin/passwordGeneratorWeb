import React from 'react';
import { Copy, Trash2 } from 'lucide-react';
import type { PasswordHistory } from '../types';

interface Props {
  history: PasswordHistory[];
  onCopy: (password: string) => void;
  onClear: () => void;
  t: (key: string) => string;
}

const PasswordHistoryComponent: React.FC<Props> = ({ history, onCopy, onClear, t }) => {
  const handleClear = () => {
    if (window.confirm(t('confirmClear'))) {
      onClear();
    }
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          {t('history')}
        </h2>
        {history.length > 0 && (
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            aria-label={t('clearHistory')}
          >
            <Trash2 className="w-4 h-4" />
            {t('clearHistory')}
          </button>
        )}
      </div>
      <div className="space-y-2">
        {history.map((entry, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div className="flex-1">
              <div className="font-mono text-sm text-gray-800 dark:text-gray-200">
                {entry.password}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(entry.timestamp).toLocaleString()} - {t(`categories.${entry.category}`)}
              </div>
            </div>
            <button
              onClick={() => onCopy(entry.password)}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              aria-label="Copy password"
            >
              <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordHistoryComponent;