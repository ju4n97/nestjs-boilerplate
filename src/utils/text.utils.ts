type LetterCase = 'none' | 'lowercase' | 'uppercase' | 'capitalize';
type NormalizeParams =
  | string
  | {
      text: string;
      letterCase?: LetterCase;
      separator?: string;
    };

/**
 * Controls the transformation of text & remove unwanted spaces
 * @param args text valur or object of type "NormalizeParams"
 * @returns normalized text
 */
const normalize = (args: NormalizeParams): string => {
  if (!args) return '';

  // Optional params inicialization
  let text = '';
  let letterCase: LetterCase = 'none';
  let separator = ' ';

  // Checks if the provided argument is a text value or an object of options
  if (typeof args === 'object') {
    if (args.text) {
      text = args.text;
    }

    if (args.letterCase) {
      letterCase = args.letterCase;
    }

    if (args.separator) {
      separator = args.separator;
    }
  } else {
    text = args;
  }

  // Split text into words & remove unwanted spaces
  const words = text.trim().split(' ').filter(Boolean);

  // Process text transform normalization
  const normalizedText: Record<LetterCase, () => string> = {
    none: () => words.join(separator),
    lowercase: () => words.join(separator).toLowerCase(),
    uppercase: () => words.join(separator).toUpperCase(),
    capitalize: () =>
      words
        .map(word => {
          const initial = word[0].toUpperCase();
          const rest = word.substring(1, word.length).toLowerCase();
          return initial + rest;
        })
        .join(separator),
  };

  // Run transform function based on letterCase param
  return normalizedText[letterCase]();
};

export const TextUtils = { normalize };
