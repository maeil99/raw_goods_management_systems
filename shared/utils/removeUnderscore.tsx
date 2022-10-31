const removeUnderscore = (str?:string) => {
  if (!str) return '';
  const newStr = str.trim().replace(/[ _\\/]/g, ' ');
  return newStr;
};

export default removeUnderscore;
