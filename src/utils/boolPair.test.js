import {
  boolPair
 } from './';

describe('boolPair', () => {
  it('Should return a true pair when pass in true', () => {
    const tt = boolPair('tt');
    expect(tt(true)).toEqual(['tt', true]);
  });

  it('Should return a false pair when pass in false', () => {
    const ff = boolPair('ff');
    expect(ff(false)).toEqual(['ff', false]);
  });

  it('Should return a false pair when pass nothing', () => {
    const ff = boolPair('ff');
    expect(ff()).toEqual(['ff', false]);
  });
});
