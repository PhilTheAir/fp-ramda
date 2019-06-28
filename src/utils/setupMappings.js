import {
  fromPairs,
  dropLast,
  takeLast
} from 'ramda';

export const setupMappings = length => arr =>
  arr.map(rule => ({
    tests: fromPairs(dropLast(length, rule)),
    values: takeLast(length, rule)
  }));

export const getMappingsResult = setupMappings(1);
