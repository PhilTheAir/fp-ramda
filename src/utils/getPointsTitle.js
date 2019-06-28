import {
  assoc,
  compose,
  map,
  prop
} from 'ramda';
import {
  formatNumber
} from './';

const applyPoints = levelsOfPoints => item =>
  assoc('points', prop(prop('type', item), levelsOfPoints), item);

const applyTitle = item => assoc('title', formatNumber(item.points), item);

export const getPointsTitle = levelsOfPoints =>
  map(
    compose(
      applyTitle,
      applyPoints(levelsOfPoints)
    )
  );