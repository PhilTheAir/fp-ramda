import {
  equals
} from 'ramda';

export const boolPair = property => (expected = null) => [
  property,
  equals(true)(expected)
];
