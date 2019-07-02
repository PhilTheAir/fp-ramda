export const formatNumber = str => {
  let result = "0";
  try {
    const num = Number(str);
    result = num.toLocaleString();
    return result;
  }
  catch {
    return result;
  }
};
