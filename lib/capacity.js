export function getCapacities(code) {
  const url = `${process.env.API_BASE_URL}/nurseries/${code}/capacities.json`;
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
}
