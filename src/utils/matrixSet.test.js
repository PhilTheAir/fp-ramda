import {
  matrixSet,
  setUpMatrixRules
} from '.';

describe('tiers', () => {
  it('Should return matrixSet correctly', () => {
    expect(matrixSet).toEqual([
      [
        ["isM1", true],
        [
          {
            type: "m1",
            title: '0',
            subTitle: '',
          },
          {
            type: "m2",
            title: '',
            subTitle: 'subTitle1',
            url: '',
          }
        ]
      ],
      [
        ["isM2", true],
        ["isP1", true],
        [
          {
            type: "m1",
            title: '0',
            subTitle: '',
          },
          {
            type: "m2",
            title: '',
            subTitle: 'subTitle1',
            url: '',
          }
        ]
      ],
      [
        ["isM2", true],
        ["isP2", true],
        [
          {
            type: "m1",
            title: '0',
            subTitle: '',
          },
          {
            type: "m2",
            title: '',
            subTitle: 'subTitle1',
            url: '',
          },
          {
            type: "m3",
            title: '',
            subTitle: 'subTitle1',
            url: '',
          }
        ]
      ],
      [
        ["isM3", true],
        ["isP3", true],
        [
          {
            type: "m1",
            title: '0',
            subTitle: '',
          },
          {
            type: "m2",
            title: '',
            subTitle: 'subTitle1',
            url: '',
          },
          {
            type: "m3",
            title: '',
            subTitle: 'subTitle1',
            url: '',
          }
        ]
      ],
      [
        ["isM3", true],
        ["isP4", true],
        []
      ]
    ]);

    const p1 = {
      PC: 150000,
      PCB: 0,
      PCP: 300000
    };
    const p2 = {
      startDate: '2019-02-01',
      endDate: '2020-06-30',
      pointsEarned: 299999,
      pointsRemaining: 30001,
      targetPoints: 300000,
      airPoints: 0,
      groundPoints: 270000,
      membershipYearStartDate: '2019-06-11',
      membershipYearEndDate: '2020-06-30',
      remainingDays: '2',
      remainingWeeks: '2',
      remainingMonths: '12',
      currentLevel: {
        type: 'PC',
        description: 'Points Club',
        targetPoints: 300000
      },
      nextLevel: {
        type: 'PCP',
        description: 'Points Club Plus',
        targetPoints: 300000
      },
      levels: [
        {
          type: 'PCB',
          description: 'Base Level',
          targetPoints: 0
        },
        {
          type: 'PC',
          description: 'Points Club',
          targetPoints: 150000
        },
        {
          type: 'PCP',
          description: 'Points Club Plus',
          targetPoints: 300000
        }
      ],
      categories: [
        {
          name: 'Commercial',
          points: 270000,
          type: 'COMMERCIAL'
        }
      ]
    };
    expect(setUpMatrixRules(p1)(p2)).toEqual({
      "isM1": false, "isM2": false, "isM3": false, "isP1": false, "isP2": false, "isP3": false, "isP4": false
    });
  });
});
