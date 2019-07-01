import {
  boolPair
 } from './';

describe('boolPair', () => {
  it('Should return a true pair when pass in true', () => {
    const isPointsClub = boolPair('isPointsClub');
    expect(isPointsClub(true)).toEqual(['isPointsClub', true]);
  });

  it('Should return a false pair when pass in false', () => {
    const isPointsClub = boolPair('isPointsClub');
    expect(isPointsClub(false)).toEqual(['isPointsClub', false]);
  });
});
