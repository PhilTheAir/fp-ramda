import {
  getTierPoints,
  boolPair,
  setupMappingsResult,
  formatNumber,
  getRatio
 } from '.';
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

export const POINTS_CLUB_BASE = 'POINTS_CLUB_BASE';
export const POINTS_CLUB = 'POINTS_CLUB';
export const POINTS_CLUB_PLUS = 'POINTS_CLUB_PLUS';

export const TIMELINE_RANGE_BASE_TO_CLUB = [POINTS_CLUB_BASE, POINTS_CLUB];
export const TIMELINE_RANGE_BASE_TO_CLUB_PLUS = [
  POINTS_CLUB_BASE,
  POINTS_CLUB,
  POINTS_CLUB_PLUS
];

export const TIMELINE_ITEMS = () => ({
  POINTS_CLUB_BASE: {
    type: POINTS_CLUB_BASE,
    title: '0',
    subTitle: '',
    imageColor: Variables.red,
    imageAlt: ''
  },
  POINTS_CLUB: {
    type: POINTS_CLUB,
    title: '',
    subTitle: 'Points Club',
    url: '',
    imageColor: Variables.pointsClub,
    imageAlt: 'Points Club'
  },
  POINTS_CLUB_PLUS: {
    type: POINTS_CLUB_PLUS,
    title: '',
    subTitle: 'Points Club Plus',
    url: '',
    imageColor: Variables.pointsClubPlus,
    imageAlt: 'Points Club Plus'
  }
});

const tier1 = props(TIMELINE_RANGE_BASE_TO_CLUB)(TIMELINE_ITEMS());
const tier2 = props(TIMELINE_RANGE_BASE_TO_CLUB_PLUS)(TIMELINE_ITEMS());
const tier3 = [];

const TIMELINE_ITEMS_TO_RENDER = () => ({
  tier1,
  tier2,
  tier3
});

/*###########################################################
Create rules statements
###########################################################*/
const isPointsClubBase = boolPair('isPointsClubBase');
const isPointsClub = boolPair('isPointsClub');
const isPointsClubPlus = boolPair('isPointsClubPlus');
const isPointsEarnedLessThanPointsClub = boolPair(
  'isPointsEarnedLessThanPointsClub'
);
const isPointsEarnedMoreThanPointsClub = boolPair(
  'isPointsEarnedMoreThanPointsClub'
);
const isPointsEarnedLessThanPointsClubPlus = boolPair(
  'isPointsEarnedLessThanPointsClubPlus'
);
const isPointsEarnedMoreThanPointsClubPlus = boolPair(
  'isPointsEarnedMoreThanPointsClubPlus'
);

/*###########################################################
Create rules matrix table which is translated from:
https://jira.qantas.com.au/browse/RHLP-515
###########################################################*/
const TIMELINE_MATRIX_TABLE = [
  [isPointsClubBase(true), TIMELINE_ITEMS_TO_RENDER().tier1],
  [
    isPointsClub(true),
    isPointsEarnedLessThanPointsClub(true),
    TIMELINE_ITEMS_TO_RENDER().tier1
  ],
  [
    isPointsClub(true),
    isPointsEarnedMoreThanPointsClub(true),
    TIMELINE_ITEMS_TO_RENDER().tier2
  ],
  [
    isPointsClubPlus(true),
    isPointsEarnedLessThanPointsClubPlus(true),
    TIMELINE_ITEMS_TO_RENDER().tier2
  ],
  [
    isPointsClubPlus(true),
    isPointsEarnedMoreThanPointsClubPlus(true),
    TIMELINE_ITEMS_TO_RENDER().tier3
  ]
];

/*###########################################################
construct abstracted result to be tested by matrix rules
each user data can be translated into true or false statements
###########################################################*/
const currentLevelType = path(['currentLevel', 'type']);
const pointsEarnedCurrentYear = prop('pointsEarnedCurrentYear');

const getAbstractedMatrix = levels =>
pipe(
  applySpec({
    isPointsClubBase: compose(
      equals(POINTS_CLUB_BASE),
      currentLevelType
    ),
    isPointsClub: compose(
      equals(POINTS_CLUB),
      currentLevelType
    ),
    isPointsClubPlus: compose(
      equals(POINTS_CLUB_PLUS),
      currentLevelType
    ),
    isPointsEarnedLessThanPointsClub: compose(
      lt(__, levels.POINTS_CLUB),
      pointsEarnedCurrentYear
    ),
    isPointsEarnedMoreThanPointsClub: compose(
      gte(__, levels.POINTS_CLUB),
      pointsEarnedCurrentYear
    ),
    isPointsEarnedLessThanPointsClubPlus: compose(
      lt(__, levels.POINTS_CLUB_PLUS),
      pointsEarnedCurrentYear
    ),
    isPointsEarnedMoreThanPointsClubPlus: compose(
      gte(__, levels.POINTS_CLUB_PLUS),
      pointsEarnedCurrentYear
    )
  })
);

/*###########################################################
apply points and title to the result 
###########################################################*/
const applyPoints = levelsOfPoints => item =>
  assoc('points', prop(prop('type', item), levelsOfPoints), item);
const applyTitle = item => assoc('title', formatNumber(item.points), item);
const getPointsAndTitle = levelsOfPoints =>
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

/*###########################################################
apply percentage of width of each items to the result 
###########################################################*/
const assignPercentage = maxPoints => item =>
  assoc('percentage', getRatio(prop('points', item), maxPoints), item);
const applyPercentage = items => {
  const maxPoints = getMaxPoints(items);
  return compose(map(assignPercentage(maxPoints)))(items);
};

/*###########################################################
apply points club and points club urls to the result 
###########################################################*/
const assignPcpUrl = pcpUrl => item =>
  equals(item.type, POINTS_CLUB_PLUS) ? assoc('url', pcpUrl, item) : item;
const assignPcUrl = pcUrl => item =>
  equals(item.type, POINTS_CLUB) ? assoc('url', pcUrl, item) : item;
const applyUrls = (pcUrl, pcpUrl) =>
  map(
    compose(
      assignPcpUrl(pcpUrl),
      assignPcUrl(pcUrl)
    )
  );

const getTimelineItems = (levelsOfPoints, pcUrl, pcpUrl) =>
  compose(
    applyUrls(pcUrl, pcpUrl),
    applyPercentage,
    getPointsAndTitle(levelsOfPoints)
  );

const getCurrentPoint = (pointsEarnedCurrentYear, targetPoints) => ({
  points: pointsEarnedCurrentYear,
  title: formatNumber(pointsEarnedCurrentYear),
  percentage: getRatio(pointsEarnedCurrentYear, targetPoints)
});

/*************************************************
 * @param pointsClubData: Points Club response data
 *************************************************/
export const transforms = (pointsClubData, pointsClubLink, pointsClubPlusLink) => {
  const {levels, pointsEarnedCurrentYear, targetPoints} = pointsClubData;
  const levelsOfPoints = getTierPoints(levels);
  const abstracted = getAbstractedMatrix(levelsOfPoints)(pointsClubData);
  const result = setupMappingsResult(TIMELINE_MATRIX_TABLE).find(rule =>
    whereEq(rule.tests)(abstracted)
  );

  if (result) {
    return {
      items: getTimelineItems(
        levelsOfPoints,
        pointsClubLink,
        pointsClubPlusLink
      )(result.values[0]),
      current: getCurrentPoint(pointsEarnedCurrentYear, targetPoints)
    };
  }
  return [];
};
