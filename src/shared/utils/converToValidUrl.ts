export const converToValidUrl = (url: string) => {
  let link = url;

  if (!(link.startsWith('http://') || link.startsWith('https://'))) {
    link = `http://${link}`;
  }

  return link;
};
