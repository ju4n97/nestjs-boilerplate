/**
 * @description Adds input hours to a date.
 * @param sourceDate Target date.
 * @param numberOfHours Number of hours to add.
 * @returns New date with the hours added..
 */
export const addHours = (sourceDate: Date, numberOfHours: number): Date =>
  new Date(sourceDate.setHours(sourceDate.getHours() + numberOfHours));
