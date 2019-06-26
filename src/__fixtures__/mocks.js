export const input = {
  startDate: '2019-02-01',
  endDate: '2020-06-30',
  pointsEarnedCurrentYear: 299999,
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
    type: 'POINTS_CLUB',
    description: 'Points Club',
    targetPoints: 300000
  },
  nextLevel: {
    type: 'POINTS_CLUB_PLUS',
    description: 'Points Club Plus',
    targetPoints: 300000
  },
  levels: [
    {
      type: 'POINTS_CLUB_BASE',
      description: 'Base Level',
      targetPoints: 0
    },
    {
      type: 'POINTS_CLUB',
      description: 'Points Club',
      targetPoints: 150000
    },
    {
      type: 'POINTS_CLUB_PLUS',
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
  ],
  status: 'ATTAIN',
  _requestMetadata: {
    requestId: 'b5757b9f064d15e3312005ed77acf727',
    requestMethod: 'GET',
    requestHost: 'api.services-sit.qantasloyalty.com',
    requestURI: '/member/1970695696/pointsclub',
    application: 'lsl-rewards-heroes-service-0.0.6-SNAPSHOT[efef91e]'
  }
};

export const output = {
  items: [
    {
      type: 'POINTS_CLUB_BASE',
      title: '0',
      subTitle: '',
      imageColor: '#ee0000',
      imageAlt: '',
      points: 0,
      percentage: 0
    },
    {
      type: 'POINTS_CLUB',
      title: '150,000',
      subTitle: 'Points Club',
      url: '#pointsClubTimelineLink',
      imageColor: '#168196',
      imageAlt: 'Points Club',
      points: 150000,
      percentage: 50
    },
    {
      type: 'POINTS_CLUB_PLUS',
      title: '300,000',
      subTitle: 'Points Club Plus',
      url: '#pointsClubPlusTimelineLink',
      imageColor: '#025795',
      imageAlt: 'Points Club Plus',
      points: 300000,
      percentage: 100
    }
  ],
  current: {
    points: 299999,
    title: '299,999',
    percentage: 99.99
  }
};