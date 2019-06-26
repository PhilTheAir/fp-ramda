import {
  compose,
  always,
  min
} from 'ramda';

export const getRatio = (cur, target) =>
  compose(
    min(100),
    always(target > 0 ? 100 * (cur / target) : 0)
  )(target);
