export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  customSymbols: string;
  excludedChars: string;
  category: PasswordCategory;
  minUppercase?: number;
  minLowercase?: number;
  minNumbers?: number;
  minSymbols?: number;
  template?: string;
  tags?: string[];
  notes?: string;
}

export type PasswordCategory = 'general' | 'banking' | 'social' | 'email' | 'otp';

export interface PasswordHistory {
  password: string;
  timestamp: number;
  category: PasswordCategory;
  strength: PasswordStrength;
  tags?: string[];
  notes?: string;
}

export type PasswordStrength = 'weak' | 'medium' | 'strong';

export type Theme = 'light' | 'dark' | 'system';

export type Language = 'fr' | 'en';