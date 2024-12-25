import { useState } from 'react';

interface UseClipboardResult {
  copyToClipboard: (text: string) => Promise<boolean>;
  error: string | null;
}

export function useClipboard(): UseClipboardResult {
  const [error, setError] = useState<string | null>(null);

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      setError(null);
      return true;
    } catch (err) {
      setError('Échec de la copie dans le presse-papiers');
      return false;
    }
  };

  return { copyToClipboard, error };
}