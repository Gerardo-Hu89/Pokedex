export const capitalizeFirstLetter = (str: string, ind: number = 0):string => {
  const spaceBefore = ind > 0 ? ' ' : '';
  return spaceBefore + str.charAt(0).toUpperCase() + str.slice(1);
};