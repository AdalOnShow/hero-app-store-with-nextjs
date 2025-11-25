export const formatNumber = (num) => {
  if (num >= 1000000) {
    const formatted = (num / 1000000).toFixed(1);
    return formatted.replace(/\.0$/, '') + 'M';
  }

  if (num >= 1000) {
    const formatted = (num / 1000).toFixed(1);
    return formatted.replace(/\.0$/, '') + 'K';
  }

  return num;
};