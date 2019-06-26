export const formatNumber = str => {
  const typeOfStr = typeof str;
  switch (typeOfStr) {
    case 'string': {
      const num = parseInt(str);
      const result = num.toLocaleString();
      return result;
    }
    case 'number': {
      const result = str.toLocaleString();
      return result;
    }
    default:
      return '0';
  }
};
