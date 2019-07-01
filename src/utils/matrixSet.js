import {
  compose,
  lt,
  gte,
  equals,
  applySpec,
  pipe,
  path,
  prop,
  __
} from 'ramda';
import {
  m1, m2, m3,
  isM1, isM2, isM3,
  isP1, isP2, isP3, isP4,
  tier1, tier2, tier3,
} from '.';

export const matrixSet = [
  [
    isM1(true),
    tier1
  ],
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

export const setUpMatrixRules = levels =>
  pipe(
    applySpec({
      isM1: compose(
        equals(m1),
        path(['currentLevel', 'type'])
      ),
      isM2: compose(
        equals(m2),
        path(['currentLevel', 'type'])
      ),
      isM3: compose(
        equals(m3),
        path(['currentLevel', 'type'])
      ),
      isP1: compose(
        lt(__, levels.m2),
        prop('pointsEarned')
      ),
      isP2: compose(
        gte(__, levels.m2),
        prop('pointsEarned')
      ),
      isP3: compose(
        lt(__, levels.m3),
        prop('pointsEarned')
      ),
      isP4: compose(
        gte(__, levels.m3),
        prop('pointsEarned')
      )
    })
  );