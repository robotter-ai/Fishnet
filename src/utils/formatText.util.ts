export const formatText = (text: string) => {
  const textArray = text.split('_');
  return textArray.join(' ');
};
