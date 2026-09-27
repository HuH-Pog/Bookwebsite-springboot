const API_BASE_URL = 'http://localhost:8080/api';

class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });
  } catch (networkErr) {
    throw new ApiError(
      'Could not reach the server. Please make sure the backend is running on port 8080.',
      0
    );
  }

  let data = null;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    data = await response.json().catch(() => null);
  }

  if (!response.ok) {
    const message = data?.message || `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status, data?.details);
  }

  return data;
}

export const authApi = {
  register: (payload) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  login: (payload) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};

export const booksApi = {
  getAll: () => request('/books'),
  getById: (id) => request(`/books/${id}`),
  getByCategory: (category) => request(`/books/category/${encodeURIComponent(category)}`),
};

export const usersApi = {
  getById: (id) => request(`/users/${id}`),
};

export { ApiError };
