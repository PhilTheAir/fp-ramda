import {
  compose,
  whereEq
} from 'ramda';
import {
  getTierPoints,
  matrixSet,
  setUpMatrixRules,
  getMappingsResult,
  formatNumber,
  getRatio,
  applyRatio,
  getPointsTitle,
  applyUrls
} from '.';

export const transforms = (data, link1, link2) => {
  const {
    levels, pointsEarned, targetPoints
  } = data;
  const levelsOfPoints = getTierPoints(levels);
  const abstracted = setUpMatrixRules(levelsOfPoints)(data);
  const result = getMappingsResult(matrixSet).find(rule =>
    whereEq(rule.tests)(abstracted)
  );
  if (result) {
    const items = compose(
      applyUrls(link1, link2),
      applyRatio,
      getPointsTitle(levelsOfPoints)
    );
    return {
      items: items(result.values[0]),
      current: {
        points: pointsEarned,
        title: formatNumber(pointsEarned),
        percentage: getRatio(pointsEarned, targetPoints)
      }
    };
  }
  return [];
};
