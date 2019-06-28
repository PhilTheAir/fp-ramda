import {
  assoc,
  ascend,
  compose,
  always,
  min,
  map,
  head,
  sort,
  prop,
  takeLast
} from 'ramda';

const getMaxPoints = compose(
  prop('points'),
  head,
  takeLast(1),
  sort(ascend(prop('points')))
);

const getRatio = (cur, target) =>
  compose(
    min(100),
    always(target > 0 ? 100 * (cur / target) : 0)
  )(target);

const setRatio = maxPoints => item =>
  assoc('percentage', getRatio(prop('points', item), maxPoints), item);

export const applyRatio = items => {
  const maxPoints = getMaxPoints(items);
  return compose(map(setRatio(maxPoints)))(items);
};