import {
  compose, 
  map, 
  props, 
  fromPairs
} from 'ramda';

export const getTierPoints = levels =>
  compose(
    fromPairs,
    map(props(['type', 'targetPoints']))
  )(levels);
