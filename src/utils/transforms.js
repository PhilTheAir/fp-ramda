import {
  assoc,
  ascend,
  compose,
  map,
  head,
  lt,
  gte,
  props,
  sort,
  equals,
  applySpec,
  pipe,
  path,
  prop,
  takeLast,
  whereEq,
  __
} from 'ramda';
import {
  getTierPoints,
  isM1,
  isM1,
  isM1,
  isM1,
  setupMappingsResult,
  formatNumber,
  getRatio
 } from '.';

export const m1 = "m1";
export const m2 = "m2";
export const m3 = "m3";

export const basicArr = [m1, m2];
export const fullArr = [
  m1,
  m2,
  m3
];

export const mInfo = {
  m1: {
    type: m1,
    title: '0',
    subTitle: '',
    imageColor: "red",
    imageAlt: ''
  },
  m2: {
    type: m2,
    title: '',
    subTitle: 'subTitle1',
    url: '',
    imageColor: "green",
    imageAlt: 'subTitleAlt1'
  },
  m3: {
    type: m3,
    title: '',
    subTitle: 'subTitle1',
    url: '',
    imageColor: "blue",
    imageAlt: 'subTitleAlt1'
  }
};

const tier1 = props(basicArr)(mInfo);
const tier2 = props(fullArr)(mInfo);
const tier3 = [];




const matrixSet = [
  [isM1(true), tier1],
  [
    isM2(true),
    isP1(true),
    tier1
  ],
  [
    isM2(true),
    isP2(true),
    tier2
  ],
  [
    isM3(true),
    isP3(true),
    tier2
  ],
  [
    isM3(true),
    isP4(true),
    tier3
  ]
];

const currentLevelType = path(['currentLevel', 'type']);
const pointsEarned = prop('pointsEarned');

const setUpMatrixRules = levels =>
pipe(
  applySpec({
    isM1: compose(
      equals(m1),
      currentLevelType
    ),
    isM2: compose(
      equals(m2),
      currentLevelType
    ),
    isM3: compose(
      equals(m3),
      currentLevelType
    ),
    isP1: compose(
      lt(__, levels.m2),
      pointsEarned
    ),
    isP2: compose(
      gte(__, levels.m2),
      pointsEarned
    ),
    isP3: compose(
      lt(__, levels.m3),
      pointsEarned
    ),
    isP4: compose(
      gte(__, levels.m3),
      pointsEarned
    )
  })
);

const applyPoints = levelsOfPoints => item =>
  assoc('points', prop(prop('type', item), levelsOfPoints), item);
const applyTitle = item => assoc('title', formatNumber(item.points), item);
const getPointsTitle = levelsOfPoints =>
  map(
    compose(
      applyTitle,
      applyPoints(levelsOfPoints)
    )
  );

const getMaxPoints = compose(
  prop('points'),
  head,
  takeLast(1),
  sort(ascend(prop('points')))
);

const setRatio = maxPoints => item =>
  assoc('percentage', getRatio(prop('points', item), maxPoints), item);
const applyRatio = items => {
  const maxPoints = getMaxPoints(items);
  return compose(map(setRatio(maxPoints)))(items);
};

const assignPcpUrl = pcpUrl => item =>
  equals(item.type, m3) ? assoc('url', pcpUrl, item) : item;
const assignPcUrl = pcUrl => item =>
  equals(item.type, m2) ? assoc('url', pcUrl, item) : item;
const applyUrls = (pcUrl, pcpUrl) =>
  map(
    compose(
      assignPcpUrl(pcpUrl),
      assignPcUrl(pcUrl)
    )
  );

const getItems = (levelsOfPoints, pcUrl, pcpUrl) =>
  compose(
    applyUrls(pcUrl, pcpUrl),
    applyRatio,
    getPointsTitle(levelsOfPoints)
  );

const getPoints = (pointsEarned, targetPoints) => ({
  points: pointsEarned,
  title: formatNumber(pointsEarned),
  percentage: getRatio(pointsEarned, targetPoints)
});

export const transforms = (pointsClubData, pointsClubLink, pointsClubPlusLink) => {
  const {levels, pointsEarned, targetPoints} = pointsClubData;
  const levelsOfPoints = getTierPoints(levels);
  const abstracted = setUpMatrixRules(levelsOfPoints)(pointsClubData);
  const result = setupMappingsResult(matrixSet).find(rule =>
    whereEq(rule.tests)(abstracted)
  );

  if (result) {
    return {
      items: getItems(
        levelsOfPoints,
        pointsClubLink,
        pointsClubPlusLink
      )(result.values[0]),
      current: getPoints(pointsEarned, targetPoints)
    };
  }
  return [];
};
