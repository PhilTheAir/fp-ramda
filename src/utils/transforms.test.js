import {compose, assocPath} from 'ramda';
import getTimelineProps from './getTimelineProps';
import pointsClubData from '../_DATA/mockResponseData';

describe('getTimelineProps', () => {
  const pointsClubLink = '#url1';
  const pointsClubPlusLink = '#url2';

  describe('Should return correct current level props', () => {
    const result = getTimelineProps(
      pointsClubData,
      pointsClubLink,
      pointsClubPlusLink
    );
    describe('should return correct current points info', () => {
      it('should get correct percentage for current points', () => {
        expect(result.current.percentage).toEqual(99.99966666666667);
      });
      it('should get correct  current points', () => {
        expect(result.current.points).toEqual(299999);
      });
      it('should get correct title', () => {
        expect(result.current.title).toEqual('299,999');
      });
    });
  });

  describe('should return correct items props to render', () => {
    it('should return 2 items when in base level and Points Club level when user is in Base tier', () => {
      const timeLineItems = compose(
        assocPath(['currentLevel', 'type'], 'POINTS_CLUB_BASE'),
        assocPath(['targetPoints'], 150000),
        assocPath(['pointsEarnedCurrentYear'], 1000)
      )(pointsClubData);
      const result = getTimelineProps(
        timeLineItems,
        pointsClubLink,
        pointsClubPlusLink
      );
      expect(result.items.length).toEqual(2);
      expect(result.items[0].type).toEqual('POINTS_CLUB_BASE');
      expect(result.items[1].type).toEqual('POINTS_CLUB');
      expect(result.current.percentage).toEqual(0.6666666666666667);
    });

    it('should return 2 items to render when is in Points Club level and points earned is less than points club points', () => {
      const timeLineItems = compose(
        assocPath(['currentLevel', 'type'], 'POINTS_CLUB'),
        assocPath(['targetPoints'], 150000),
        assocPath(['pointsEarnedCurrentYear'], 1000)
      )(pointsClubData);
      const result = getTimelineProps(
        timeLineItems,
        pointsClubLink,
        pointsClubPlusLink
      );
      expect(result.items.length).toEqual(2);
      expect(result.items[0].type).toEqual('POINTS_CLUB_BASE');
      expect(result.items[1].type).toEqual('POINTS_CLUB');
      expect(result.current.percentage).toEqual(0.6666666666666667);
    });

    it('should return 3 items to render when is in Points Club level and points earned is more than points club points', () => {
      const timeLineItems = compose(
        assocPath(['currentLevel', 'type'], 'POINTS_CLUB'),
        assocPath(['targetPoints'], 300000),
        assocPath(['pointsEarnedCurrentYear'], 150001)
      )(pointsClubData);
      const result = getTimelineProps(
        timeLineItems,
        pointsClubLink,
        pointsClubPlusLink
      );
      expect(result.items.length).toEqual(3);
      expect(result.items[0].type).toEqual('POINTS_CLUB_BASE');
      expect(result.items[1].type).toEqual('POINTS_CLUB');
      expect(result.items[2].type).toEqual('POINTS_CLUB_PLUS');
      expect(result.current.percentage).toEqual(50.00033333333334);
    });

    it('should return 3 items to render when is in Points Club Plus level and points earned is less than Points Club Points', () => {
      const timeLineItems = compose(
        assocPath(['currentLevel', 'type'], 'POINTS_CLUB_PLUS'),
        assocPath(['targetPoints'], 300000),
        assocPath(['pointsEarnedCurrentYear'], 1500)
      )(pointsClubData);
      const result = getTimelineProps(
        timeLineItems,
        pointsClubLink,
        pointsClubPlusLink
      );
      expect(result.items.length).toEqual(3);
      expect(result.items[0].type).toEqual('POINTS_CLUB_BASE');
      expect(result.items[1].type).toEqual('POINTS_CLUB');
      expect(result.items[2].type).toEqual('POINTS_CLUB_PLUS');
      expect(result.current.percentage).toEqual(0.5);
    });

    it('should return 3 items to render when is in Points Club Plus level and points earned is more than Points Club points and less than Points Club Plus', () => {
      const timeLineItems = compose(
        assocPath(['currentLevel', 'type'], 'POINTS_CLUB_PLUS'),
        assocPath(['targetPoints'], 300000),
        assocPath(['pointsEarnedCurrentYear'], 150001)
      )(pointsClubData);
      const result = getTimelineProps(
        timeLineItems,
        pointsClubLink,
        pointsClubPlusLink
      );
      expect(result.items.length).toEqual(3);
      expect(result.items[0].type).toEqual('POINTS_CLUB_BASE');
      expect(result.items[1].type).toEqual('POINTS_CLUB');
      expect(result.items[2].type).toEqual('POINTS_CLUB_PLUS');
      expect(result.current.percentage).toEqual(50.000333333333334);
    });

    it('should return 0 item to render when is in Points Club Plus level and points earned is more than Points Club Plus', () => {
      const timeLineItems = compose(
        assocPath(['currentLevel', 'type'], 'POINTS_CLUB_PLUS'),
        assocPath(['targetPoints'], 300000),
        assocPath(['pointsEarnedCurrentYear'], 300001)
      )(pointsClubData);
      const result = getTimelineProps(
        timeLineItems,
        pointsClubLink,
        pointsClubPlusLink
      );
      expect(result.items.length).toEqual(0);
      expect(result.current.percentage).toEqual(100);
    });
  });
});
