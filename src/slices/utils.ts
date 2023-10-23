export const toQueryString = (params: Record<string, any> | null) => {
  if (!params) return '';
  return '?' + Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
};
