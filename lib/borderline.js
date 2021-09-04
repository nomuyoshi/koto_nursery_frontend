export function getBorderlines(code) {
  const url = `${process.env.API_BASE_URL}/nurseries/${code}/borderlines.json`;
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
}
