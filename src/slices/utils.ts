export const toQueryString = (params: Record<string, any> | null) => {
  if (!params) return '';
  console.log(JSON.stringify(params))
  console.log(Object.keys(params))
  const query = '?' + Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
  console.log(query)
  return query;
};
