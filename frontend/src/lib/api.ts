const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1').replace(/\/$/, '');

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body?.error?.message || body?.message || `API request failed (${response.status})`);
  return body as T;
}

export const apiClient = {
  health: () => request<{ success: boolean; status: string }>('/health'),
  login: (email: string, password: string) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  registerPatient: (payload: Record<string, unknown>) => request('/auth/register', { method: 'POST', body: JSON.stringify({ ...payload, role: 'patient' }) }),
};
