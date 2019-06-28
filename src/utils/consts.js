import {
  props
} from 'ramda';

export const m1 = "m1";
export const m2 = "m2";
export const m3 = "m3";

const basicArr = [m1, m2];
const fullArr = [
  m1,
  m2,
  m3
];

const mInfo = {
  m1: {
    type: m1,
    title: '0',
    subTitle: '',
    imageColor: "red",
    imageAlt: ''
  },
  m2: {
    type: m2,
    title: '',
    subTitle: 'subTitle1',
    url: '',
    imageColor: "green",
    imageAlt: 'subTitleAlt1'
  },
  m3: {
    type: m3,
    title: '',
    subTitle: 'subTitle1',
    url: '',
    imageColor: "blue",
    imageAlt: 'subTitleAlt1'
  }
};

export const tier1 = props(basicArr)(mInfo);
export const tier2 = props(fullArr)(mInfo);
export const tier3 = [];