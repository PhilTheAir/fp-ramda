import {
  getTierPoints
 } from './';

describe('getTierPoints', () => {
  it('Should return level and points info correctly', () => {
    const levels = [
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
    ];
    const result = getTierPoints(levels);
    expect(result).toEqual({
      PC: 150000,
      PCB: 0,
      PCP: 300000
    });
  });
});
