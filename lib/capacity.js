export function getCapacities(code) {
  const url = `${process.env.BASE_API_URL}/nurseries/${code}/capacities.json`;
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
}

