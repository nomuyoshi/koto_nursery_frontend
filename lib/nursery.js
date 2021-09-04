export function postSearch(params = {}) {
  const url = `${process.env.API_BASE_URL}/nurseries/search.json`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

export function getNursery(code) {
  const url = `${process.env.API_BASE_URL}/nurseries/${code}.json`;
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
}

