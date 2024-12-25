import { PasswordOptions, PasswordStrength } from '../types';

const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

function getRandomChar(chars: string): string {
  return chars[Math.floor(Math.random() * chars.length)];
}

function shuffleString(str: string): string {
  return str.split('').sort(() => Math.random() - 0.5).join('');
}

function generateFromTemplate(template: string, options: PasswordOptions): string {
  let result = '';
  for (const char of template) {
    switch (char) {
      case 'U': result += getRandomChar(CHAR_SETS.uppercase); break;
      case 'L': result += getRandomChar(CHAR_SETS.lowercase); break;
      case 'N': result += getRandomChar(CHAR_SETS.numbers); break;
      case 'S': result += getRandomChar(options.customSymbols || CHAR_SETS.symbols); break;
      default: result += char;
    }
  }
  return result;
}

export const generatePassword = (options: PasswordOptions): string => {
  if (options.template) {
    return generateFromTemplate(options.template, options);
  }

  let chars = '';
  let password = '';
  
  // Build character set
  if (options.includeUppercase) chars += CHAR_SETS.uppercase;
  if (options.includeLowercase) chars += CHAR_SETS.lowercase;
  if (options.includeNumbers) chars += CHAR_SETS.numbers;
  if (options.includeSymbols) chars += options.customSymbols || CHAR_SETS.symbols;

  // Remove excluded characters
  const excludeSet = new Set(options.excludedChars);
  chars = chars.split('').filter(char => !excludeSet.has(char)).join('');

  if (!chars) return '';

  // Handle minimum requirements
  const requirements: string[] = [];
  
  if (options.minUppercase) {
    for (let i = 0; i < options.minUppercase; i++) {
      requirements.push(getRandomChar(CHAR_SETS.uppercase));
    }
  }
  if (options.minLowercase) {
    for (let i = 0; i < options.minLowercase; i++) {
      requirements.push(getRandomChar(CHAR_SETS.lowercase));
    }
  }
  if (options.minNumbers) {
    for (let i = 0; i < options.minNumbers; i++) {
      requirements.push(getRandomChar(CHAR_SETS.numbers));
    }
  }
  if (options.minSymbols) {
    for (let i = 0; i < options.minSymbols; i++) {
      requirements.push(getRandomChar(options.customSymbols || CHAR_SETS.symbols));
    }
  }

  // Fill remaining length with random characters
  const remainingLength = options.length - requirements.length;
  for (let i = 0; i < remainingLength; i++) {
    requirements.push(getRandomChar(chars));
  }

  // Shuffle all characters
  password = shuffleString(requirements.join(''));

  return password;
};

export const generateOTP = (length: number = 6): string => {
  return Array.from({ length }, () => 
    Math.floor(Math.random() * 10)
  ).join('');
};

export const calculatePasswordStrength = (password: string): PasswordStrength => {
  if (!password) return 'weak';

  const length = password.length;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  
  const varietyScore = [hasUpper, hasLower, hasNumber, hasSymbol].filter(Boolean).length;
  
  if (length >= 12 && varietyScore >= 3) return 'strong';
  if (length >= 8 && varietyScore >= 2) return 'medium';
  return 'weak';
};