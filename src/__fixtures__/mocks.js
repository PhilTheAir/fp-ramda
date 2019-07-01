export const input = {
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
      type: 'PCB',
      title: '0',
      subTitle: '',
      points: 0,
      percentage: 0
    },
    {
      type: 'PC',
      title: '150,000',
      subTitle: 'Points Club',
      url: '#link1',
      points: 150000,
      percentage: 50
    },
    {
      type: 'PCP',
      title: '300,000',
      subTitle: 'Points Club Plus',
      url: '#link2',
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