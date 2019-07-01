import {
  props
} from 'ramda';

export const m1 = "m1";
export const m2 = "m2";
export const m3 = "m3";

export const basicArr = [
  m1, 
  m2
];
export const fullArr = [
  m1,
  m2,
  m3
];

export const mInfo = {
  m1: {
    type: m1,
    title: '0',
    subTitle: '',
  },
  m2: {
    type: m2,
    title: '',
    subTitle: 'subTitle1',
    url: '',
  },
  m3: {
    type: m3,
    title: '',
    subTitle: 'subTitle1',
    url: '',
  }
};

export const tier1 = props(basicArr)(mInfo);
export const tier2 = props(fullArr)(mInfo);
export const tier3 = [];