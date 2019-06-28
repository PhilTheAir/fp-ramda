import {
  whereEq, 
  head, 
  compose, 
  prop
} from 'ramda';
import {
  getMappingsResult
} from './';

describe('setupMappings', () => {
  const TIMELINE_MATRIX_TABLE = [
    [
      ['isPointsClubBase', true],
      [
        {
          result: 'result1'
        }
      ]
    ],
    [
      ['isPointsClub', true],
      ['isPointsEarnedLessThanPointsClub', true],
      [
        {
          result: 'result2'
        }
      ]
    ],
    [
      ['isPointsClub', true],
      ['isPointsEarnedMoreThanPointsClub', true],
      [
        {
          result: 'result3'
        }
      ]
    ],
    [
      ['isPointsClubPlus', true],
      ['isPointsEarnedLessThanPointsClubPlus', true],
      [
        {
          result: 'result4'
        }
      ]
    ],
    [
      ['isPointsClubPlus', true],
      ['isPointsEarnedMoreThanPointsClubPlus', true],
      [
        {
          result: 'result5'
        }
      ]
    ]
  ];
  it('Should return result1 when meet rules', () => {
    const dataToBeTested = {
      isPointsClubBase: true,
      isPointsClub: false,
      isPointsClubPlus: false,
      isPointsEarnedLessThanPointsClub: true,
      isPointsEarnedMoreThanPointsClub: false,
      isPointsEarnedLessThanPointsClubPlus: false,
      isPointsEarnedMoreThanPointsClubPlus: false
    };
    const result = getMappingsResult(TIMELINE_MATRIX_TABLE).find(
      rule => whereEq(rule.tests)(dataToBeTested)
    );
    expect(
      compose(
        prop('result'),
        head
      )(result.values[0])
    ).toEqual('result1');
  });

  it('Should return result3 when meet rules', () => {
    const dataToBeTested = {
      isPointsClubBase: false,
      isPointsClub: true,
      isPointsClubPlus: false,
      isPointsEarnedLessThanPointsClub: true,
      isPointsEarnedMoreThanPointsClub: false,
      isPointsEarnedLessThanPointsClubPlus: false,
      isPointsEarnedMoreThanPointsClubPlus: false
    };
    const result = getMappingsResult(TIMELINE_MATRIX_TABLE).find(
      rule => whereEq(rule.tests)(dataToBeTested)
    );
    expect(
      compose(
        prop('result'),
        head
      )(result.values[0])
    ).toEqual('result2');
  });

  it('Should return result2 when meet rules', () => {
    const dataToBeTested = {
      isPointsClubBase: false,
      isPointsClub: true,
      isPointsClubPlus: false,
      isPointsEarnedLessThanPointsClub: false,
      isPointsEarnedMoreThanPointsClub: true,
      isPointsEarnedLessThanPointsClubPlus: false,
      isPointsEarnedMoreThanPointsClubPlus: false
    };
    const result = getMappingsResult(TIMELINE_MATRIX_TABLE).find(
      rule => whereEq(rule.tests)(dataToBeTested)
    );
    expect(
      compose(
        prop('result'),
        head
      )(result.values[0])
    ).toEqual('result3');
  });
});
