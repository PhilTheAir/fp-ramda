import {
  equals
} from 'ramda';

export const boolPair = property => expected => [
  property,
  equals(true)(expected)
];

export const isM1 = boolPair('isM1');
export const isM2 = boolPair('isM2');
export const isM3 = boolPair('isM3');
export const isP1 = boolPair('isP1');
export const isP2 = boolPair('isP2');
export const isP3 = boolPair('isP3');
export const isP4 = boolPair('isP4');