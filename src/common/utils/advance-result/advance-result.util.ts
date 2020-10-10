/**
 * @description Defines the structure of a selection object.
 * @param selectParam Query parameter of selection (select).
 * @param pk Primary key name in case it is different from "id".
 * @returns An array that will be processed by typeorm, which has the following structure:
 * [field1, field2, field3]
 */
export const mapSelect = (selectParams: string, pk: string): any => {
  if (!selectParams) {
    return null;
  }

  const fields = selectParams.split(',').map(s => s);
  fields.unshift(pk);
  return fields;
};
