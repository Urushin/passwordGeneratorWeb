import React from 'react';
import { PasswordOptions } from '../types';
import SymbolSelector from './SymbolSelector';

interface Props {
  options: PasswordOptions;
  onChange: (options: Partial<PasswordOptions>) => void;
}

const AdvancedOptions: React.FC<Props> = ({ options, onChange }) => {
  const categories = [
    { value: 'general', label: 'Général' },
    { value: 'banking', label: 'Bancaire' },
    { value: 'social', label: 'Réseaux Sociaux' },
    { value: 'email', label: 'Email' },
    { value: 'otp', label: 'Code à usage unique' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Catégorie
          </label>
          <select
            value={options.category}
            onChange={(e) => onChange({ category: e.target.value as PasswordOptions['category'] })}
            className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {categories.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Modèle (U=maj, L=min, N=num, S=sym)
          </label>
          <input
            type="text"
            value={options.template || ''}
            onChange={(e) => onChange({ template: e.target.value })}
            placeholder="Ex: UUNN-LLSS"
            className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Exigences minimales
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { key: 'minUppercase', label: 'Majuscules' },
            { key: 'minLowercase', label: 'Minuscules' },
            { key: 'minNumbers', label: 'Chiffres' },
            { key: 'minSymbols', label: 'Symboles' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Min. {label}
              </label>
              <input
                type="number"
                min="0"
                max="99"
                value={options[key as keyof PasswordOptions] || 0}
                onChange={(e) => onChange({ [key]: parseInt(e.target.value) || 0 })}
                className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          ))}
        </div>
      </div>

      <SymbolSelector options={options} onChange={onChange} />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Caractères à exclure
        </label>
        <input
          type="text"
          value={options.excludedChars}
          onChange={(e) => onChange({ excludedChars: e.target.value })}
          placeholder="Ex: 0O1l"
          className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Notes
        </label>
        <textarea
          value={options.notes || ''}
          onChange={(e) => onChange({ notes: e.target.value })}
          placeholder="Ajoutez des notes pour ce mot de passe..."
          className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          rows={3}
        />
      </div>
    </div>
  );
};

export default AdvancedOptions;