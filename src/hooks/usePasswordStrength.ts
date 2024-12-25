import { useMemo } from 'react';
import { calculatePasswordStrength } from '../utils/passwordGenerator';
import type { PasswordStrength } from '../types';

export function usePasswordStrength(password: string): PasswordStrength {
  return useMemo(() => calculatePasswordStrength(password), [password]);
}