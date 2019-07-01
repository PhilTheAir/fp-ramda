import {
  tier1,
  tier2
} from '.';

describe('tiers', () => {
  it('Should return tiers info correctly', () => {
    expect(tier1).toEqual([
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
    ]);
    expect(tier2).toEqual([
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
    ]);
  });
});
