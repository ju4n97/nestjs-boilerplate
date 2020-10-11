/**
 * @description Removes undefined property values from object.
 * @param obj Object with undefined properties.
 * @returns Sanitized object.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const removeEmptyProps = (obj: any): any => {
  const newObject = JSON.parse(JSON.stringify(obj));
  Object.keys(newObject).forEach(
    key => !newObject[key] && delete newObject[key],
  );
  return newObject;
};

/**
 * @description Converts enum to string.
 * @param entries enum.
 * @returns String with enum keys.
 */
export const enumToString = (e: { [k: string]: string }): string => {
  let result = '';

  for (const key in e) {
    result += `${e[key]}, `;
  }

  return result.substring(0, result.length - 2);
};
