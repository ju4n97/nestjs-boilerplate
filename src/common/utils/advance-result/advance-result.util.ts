import { AdvanceQuery } from '@lib/dto/advance-result';
import { FilterOperator, Sort } from '@lib/enums/advance-result';
import { QueryOptions } from '@lib/interfaces/advance-result';
import {
  Between,
  Equal,
  FindOperator,
  In,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  Not,
} from 'typeorm';

/**
 * @description Defines the structure of a FindManyOptions object.
 * @param advanceQuery Client query parameters.
 * @param options.simple If true, only the "select", "relations" and "filter" properties will be mapped
 * and the "order", "take" and "skip" properties will be omitted
 * @param options.pk Primary key name in case it is different from "id".
 * @returns A FindManyOptions object.
 */
export const mapQuery = (
  advanceQuery: AdvanceQuery,
  options?: QueryOptions,
): any => {
  // Gets the functionality options.
  const { simple, pk } = Object(options);

  // Gets the query parameters.
  const {
    select,
    relations,
    filter,
    sort,
    isLoadingAll,
    take,
    skip,
  } = advanceQuery;

  // Maps the query parameters to populate FindManyOptions object
  return {
    select: mapSelect(select, pk || 'id'),
    relations: mapRelations(relations),
    where: mapFilter(filter),
    order: simple ? null : mapSort(sort),
    take: simple ? null : mapTake(take, isLoadingAll),
    skip: simple ? null : mapSkip(skip, isLoadingAll),
  };
};

/**
 * @description Defines the structure of a selection object.
 * @param selectParam Selections query parameter (select).
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
 * @param relationsParam Relations query parameter (select).
 * @returns An array that will be processed by typeorm, which has the following structure:
 * [field1, field2, field3]
 */
export const mapRelations = (relationsParams: string): any => {
  if (!relationsParams) {
    return null;
  }

  return relationsParams.split(',').map(r => r);
};

/**
 * @description Defines the structure of a filter object.
 * @param filterParam Filter query parameter (filter).
 * @returns A dynamic array of objects that will be processed by typeorm, which allows dynamic queries.
 */
export const mapFilter = (filterParam: string): Record<string, string>[] => {
  if (!filterParam) {
    return null;
  }

  // Matches first condition.
  const first = (filterParam.match(/\[\[.+?\]/) || []).map(x => x.slice(1));

  // Determine if the first condition is an OR or an AND.
  const firstOr =
    filterParam.indexOf('or') > -1 ? filterParam.indexOf('or') : 9999999;
  const firstAnd =
    filterParam.indexOf('and') > -1 ? filterParam.indexOf('and') : 9999999;
  const firstConditionOr = firstOr < firstAnd;

  // Matches OR and AND conditions inside the query parameter.
  let ands = (filterParam.match(/"and",\[.+?\]/gi) || []).map(x => x.slice(6));
  let ors = (filterParam.match(/"or",\[.+?\]/gi) || []).map(x => x.slice(5));

  // Concatenates the first condition to the conditional arrays based on their state.
  if (firstConditionOr) {
    ors = [...first, ...ors];
  } else {
    ands = [...first, ...ands];
  }

  let andConditions = {};
  const finalCondition = [];

  // Loops through the AND conditions and define a structure to be merged with the OR conditionals.
  for (const and of ands) {
    andConditions = Object.assign(andConditions, {
      ..._destructureArray(JSON.parse(and)),
    });

    // If there are no OR conditionals, it sets the AND conditionals as final.
    if (ors.length === 0) {
      finalCondition.push(andConditions);
    }
  }

  // Generates separated objects to perform the OR queries and concatenates the AND conditionals to them.
  for (const or of ors) {
    finalCondition.push({
      ...andConditions,
      ..._destructureArray(JSON.parse(or)),
    });
  }

  return finalCondition;
};

/**
 * @description Defines the structure of a sorting object.
 * @param orderParam Sorting query parameter (sort).
 * @returns A key-value object { [key]: value }.
 */
export const mapSort = (orderParam: string): Record<string, string> => {
  if (!orderParam) {
    return null;
  }

  const param = JSON.parse(orderParam)[0];

  const key = param.selector;
  const order = param.desc ? Sort.Desc : Sort.Asc;
  const obj = {
    [key]: order,
  };

  return obj;
};

/**
 * @description Sets the limit of data it will take from an entity.
 * @param take limit of data.
 * @param isLoadingAll If true, ignores the take parameter and returns all data.
 * @returns Limit of data it will take from an entity.
 */
export const mapTake = (take: number, isLoadingAll = false): number =>
  !isLoadingAll ? take : null;

/**
 * @description Sets the limit of data it will omit from an entity.
 * @param take limit of data.
 * @param isLoadingAll If true, ignores the take parameter and returns all data.
 * @returns Limit of data it will omit from an entity.
 */
export const mapSkip = (skip: number, isLoadingAll = false): number =>
  !isLoadingAll ? skip : 0;

/**
 * @description Gets the values of a 3-position array and returns a new object
 * @param array 3-position Array ([key, filterOperator, value]).
 * @returns An object that will be processed by typeorm.
 */
const _destructureArray = (array: Array<string>) => {
  const key = array[0];
  const filterOperator = array[1] as FilterOperator;
  const value = array[2];

  return {
    [key]: _getfilterExpression(value, filterOperator),
  };
};

/**
 * @description Defines the operator to use to execute a filter expression.
 * @param value Filter value.
 * @param filterOperator Filter operator
 * @returns Filter value inside typeorm FindOperator expresion.
 */
const _getfilterExpression = (
  value: string,
  filterOperator: FilterOperator,
): FindOperator<string> => {
  return {
    [FilterOperator.Equals]: Equal(value),
    [FilterOperator.NotEquals]: Not(Equal(value)),
    [FilterOperator.Contains]: Like(`%${value}%`),
    [FilterOperator.NotContain]: Not(Like(`%${value}%`)),
    [FilterOperator.StartsWith]: Like(`${value}%`),
    [FilterOperator.NotStartWith]: Not(Like(`${value}%`)),
    [FilterOperator.EndsWith]: Like(`%${value}`),
    [FilterOperator.NotEndWith]: Not(Like(`%${value}`)),
    [FilterOperator.MoreThan]: MoreThan(value),
    [FilterOperator.MoreThanOrEqual]: LessThanOrEqual(value),
    [FilterOperator.LessThan]: LessThan(value),
    [FilterOperator.LessThanOrEqual]: LessThanOrEqual(value),
    [FilterOperator.In]: In(value.split('|')),
    [FilterOperator.NotIn]: Not(In(value.split('|'))),
    [FilterOperator.Between]: Between(value.split('|')[0], value.split('|')[1]),
  }[filterOperator];
};
