import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Shield } from 'lucide-react';
import type { PasswordOptions, PasswordHistory as PasswordHistoryType } from '../types';
import { generatePassword } from '../utils/passwordGenerator';
import { savePreferences, loadPreferences, saveToHistory, loadHistory } from '../utils/storage';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { usePasswordStrength } from '../hooks/usePasswordStrength';
import { useClipboard } from '../hooks/useClipboard';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import PasswordHistory from './PasswordHistory';
import AdvancedOptions from './AdvancedOptions';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import CollapsibleSection from './CollapsibleSection';
import Notification from './Notification';

const PasswordGenerator: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { copyToClipboard } = useClipboard();
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({ visible: false, message: '' });
  const [history, setHistory] = useState<PasswordHistoryType[]>([]);
  const [options, setOptions] = useState<PasswordOptions>({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    customSymbols: '',
    excludedChars: '',
    category: 'general',
  });

  const passwordStrength = usePasswordStrength(password);

  useEffect(() => {
    const prefs = loadPreferences();
    if (prefs) {
      setLanguage(prefs.language);
      setOptions(prev => ({ ...prev, ...prefs.defaultOptions }));
    }
    setHistory(loadHistory());
  }, [setLanguage]);

  const handleGenerate = () => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
    
    if (newPassword) {
      const historyEntry: PasswordHistoryType = {
        password: newPassword,
        timestamp: Date.now(),
        category: options.category,
        strength: passwordStrength,
      };
      
      saveToHistory(historyEntry);
      setHistory(prev => [historyEntry, ...prev].slice(0, 10));
    }
  };

  const handleCopy = async (textToCopy: string = password) => {
    const success = await copyToClipboard(textToCopy);
    if (success) {
      setNotification({ visible: true, message: t('copied') });
    }
  };

  const handleClearHistory = () => {
    localStorage.removeItem('password_generator_history');
    setHistory([]);
  };

  const handleOptionChange = (updates: Partial<PasswordOptions>) => {
    setOptions(prev => {
      const newOptions = { ...prev, ...updates };
      savePreferences({
        theme,
        language,
        defaultOptions: newOptions,
      });
      return newOptions;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('title')}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <LanguageToggle language={language} onChange={setLanguage} />
              <ThemeToggle theme={theme} onChange={setTheme} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <div className="flex items-center gap-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <input
                  type="text"
                  readOnly
                  value={password}
                  placeholder={t('passwordPlaceholder')}
                  className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-200 font-mono"
                />
                <button
                  onClick={() => handleCopy()}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  title={t('copy')}
                >
                  <Copy className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                <button
                  onClick={handleGenerate}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  title={t('generate')}
                >
                  <RefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>

            {password && (
              <PasswordStrengthIndicator strength={passwordStrength} t={t} />
            )}

            <CollapsibleSection title={t('advanced')}>
              <AdvancedOptions options={options} onChange={handleOptionChange} t={t} />
            </CollapsibleSection>

            <div className="space-y-3">
              {[
                { key: 'includeUppercase', label: t('uppercase') },
                { key: 'includeLowercase', label: t('lowercase') },
                { key: 'includeNumbers', label: t('numbers') },
                { key: 'includeSymbols', label: t('symbols') },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={options[key as keyof PasswordOptions] as boolean}
                    onChange={(e) => handleOptionChange({ [key]: e.target.checked })}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <label className="ml-2 text-sm text-gray-600 dark:text-gray-300">{label}</label>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <PasswordHistory
                history={history}
                onCopy={handleCopy}
                onClear={handleClearHistory}
                t={t}
              />
            </div>
          </div>
        </div>
      </div>

      <Notification
        message={notification.message}
        isVisible={notification.visible}
        onClose={() => setNotification({ visible: false, message: '' })}
      />
    </div>
  );
};

export default PasswordGenerator;