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

/**
 * @description Defines the structure of a relations object.
 * @param relationsParam  Query parameter of relations (select).
 * @returns An array that will be processed by typeorm, which has the following structure:
 * [field1, field2, field3]
 */
export const mapRelations = (relationsParams: string): any => {
  if (!relationsParams) {
    return null;
  }

  return relationsParams.split(',').map(r => r);
};
