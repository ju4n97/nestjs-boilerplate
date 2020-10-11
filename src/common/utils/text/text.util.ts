/**
 * @description Extracts initials from one or more texts.
 * @param entries Input text.
 * @returns String with initials.
 */
export const toInitials = (...entries: string[]): string => {
  let initials = '';
  for (const entry of entries) {
    initials += entry
      .split(' ')
      .reduce((acum, t) => acum + `${t[0].toUpperCase()}.`, '');
  }
  return initials;
};

/**
 * @description Capitalize one or more words in a text.
 * @param entries Input text.
 * @returns String with all words capitalized.
 */
export const toCapitalizedCase = (entry: string): string => {
  return entry
    .split(' ')
    .map(w => `${w[0].toUpperCase()}${w.slice(1, w.length).toLowerCase()}`)
    .join(' ');
};
