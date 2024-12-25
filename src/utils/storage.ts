import { UserPreferences, PasswordHistory } from '../types';

const STORAGE_KEYS = {
  PREFERENCES: 'password_generator_preferences',
  HISTORY: 'password_generator_history',
};

export const savePreferences = (preferences: UserPreferences): void => {
  localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences));
};

export const loadPreferences = (): UserPreferences | null => {
  const stored = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
  return stored ? JSON.parse(stored) : null;
};

export const saveToHistory = (password: PasswordHistory): void => {
  const history = loadHistory();
  const updatedHistory = [password, ...history].slice(0, 10); // Keep last 10 passwords
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updatedHistory));
};

export const loadHistory = (): PasswordHistory[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.HISTORY);
  return stored ? JSON.parse(stored) : [];
};