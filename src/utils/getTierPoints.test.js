import getLevelOfPoints from './getTierPoints';
import pointsClubData from '../_DATA/mockResponseData';

describe('getTierPoints', () => {
  it('Should return correct level and points info', () => {
    const result = getLevelOfPoints(pointsClubData.levels);
    expect(result).toEqual({
      POINTS_CLUB: 150000,
      POINTS_CLUB_BASE: 0,
      POINTS_CLUB_PLUS: 300000
    });
  });
});
