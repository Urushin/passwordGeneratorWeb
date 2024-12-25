import React from 'react';
import type { PasswordOptions } from '../types';

interface Props {
  options: PasswordOptions;
  onChange: (options: Partial<PasswordOptions>) => void;
}

const commonSymbols = ['!@#$%', '&*()_+', '-=[]{}', '|;:,.<>?'];

const SymbolSelector: React.FC<Props> = ({ options, onChange }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Symboles personnalisés
      </label>
      <div className="flex flex-wrap gap-2">
        {commonSymbols.map((symbolGroup, index) => (
          <button
            key={index}
            onClick={() => onChange({ customSymbols: symbolGroup })}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              options.customSymbols === symbolGroup
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            aria-label={`Utiliser les symboles ${symbolGroup}`}
          >
            {symbolGroup}
          </button>
        ))}
      </div>
      <input
        type="text"
        value={options.customSymbols}
        onChange={(e) => onChange({ customSymbols: e.target.value })}
        placeholder="Ou entrez vos propres symboles"
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
        aria-label="Symboles personnalisés"
      />
    </div>
  );
};

export default SymbolSelector;