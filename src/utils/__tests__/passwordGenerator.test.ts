import { describe, it, expect } from 'vitest';
import { generatePassword, calculatePasswordStrength } from '../passwordGenerator';
import type { PasswordOptions } from '../../types';

describe('generatePassword', () => {
  const defaultOptions: PasswordOptions = {
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    customSymbols: '',
    excludedChars: '',
    category: 'general'
  };

  it('generates password with correct length', () => {
    const password = generatePassword(defaultOptions);
    expect(password.length).toBe(defaultOptions.length);
  });

  it('respects excluded characters', () => {
    const options = { ...defaultOptions, excludedChars: '0O1l' };
    const password = generatePassword(options);
    expect(password).not.toMatch(/[0O1l]/);
  });

  it('uses custom symbols when provided', () => {
    const options = { 
      ...defaultOptions,
      customSymbols: '@#$',
      includeSymbols: true
    };
    const password = generatePassword(options);
    expect(password).toMatch(/[@#$]/);
  });
});

describe('calculatePasswordStrength', () => {
  it('returns weak for short passwords', () => {
    expect(calculatePasswordStrength('abc123')).toBe('weak');
  });

  it('returns medium for moderate passwords', () => {
    expect(calculatePasswordStrength('Abcd123!')).toBe('medium');
  });

  it('returns strong for complex passwords', () => {
    expect(calculatePasswordStrength('Abcd123!@#XYZ')).toBe('strong');
  });
});