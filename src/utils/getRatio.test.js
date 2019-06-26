import getRatio from './getRatio';

describe('getRatio', () => {
  it('Should return correct percentage', () => {
    const output = getRatio(20, 50);
    expect(output).toEqual(40);
  });

  it('Should return max 100 if 1st arg is greater than 2nd arg', () => {
    const output = getRatio(60, 50);
    expect(output).toEqual(100);
  });

  it('Should return 0  if 2nd arg is less than 0', () => {
    const output = getRatio(1, -2);
    expect(output).toEqual(0);
  });
});
