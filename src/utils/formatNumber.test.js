import formatNumber from './formatNumber';

describe('formatNumber', () => {
  it('Should format the number to correct format', () => {
    const formatted = formatNumber(150000);
    expect(formatted).toEqual('150,000');
  });

  it('Should format the string to correct format', () => {
    const formatted = formatNumber('150000');
    expect(formatted).toEqual('150,000');
  });

  it('Should default to 0 if not string or number', () => {
    const formatted = formatNumber(null);
    expect(formatted).toEqual('0');
  });
});
