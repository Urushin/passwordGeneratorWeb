import React from 'react';
import type { PasswordStrength } from '../types';

interface Props {
  strength: PasswordStrength;
}

const strengthConfig = {
  weak: {
    color: 'bg-red-500',
    width: '33%',
    label: 'Faible',
    description: 'Le mot de passe devrait être plus long et plus complexe'
  },
  medium: {
    color: 'bg-yellow-500',
    width: '66%',
    label: 'Moyen',
    description: 'Ajoutez plus de types de caractères pour plus de sécurité'
  },
  strong: {
    color: 'bg-green-500',
    width: '100%',
    label: 'Fort',
    description: 'Excellent! Ce mot de passe est sécurisé'
  }
};

const PasswordStrengthIndicator: React.FC<Props> = ({ strength }) => {
  const config = strengthConfig[strength];

  return (
    <div className="space-y-2" role="status" aria-live="polite">
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Force: {config.label}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {config.description}
        </div>
      </div>
      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
        <div
          className={`h-full rounded-full transition-all duration-300 ${config.color}`}
          style={{ width: config.width }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;