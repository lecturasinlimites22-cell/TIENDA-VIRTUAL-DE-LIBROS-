const API_URL = 'http://127.0.0.1:8001/api';

export async function apiFetch(endpoint, options = {}) {
  const token = sessionStorage.getItem('admin-token');
  const headers = {
    Accept: 'application/json',
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (response.status === 401) {
    sessionStorage.removeItem('admin-session');
    sessionStorage.removeItem('admin-token');
  }

  return response;
}

export { API_URL };
