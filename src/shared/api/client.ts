/** Design reminder: API helpers should stay reliable and clean so the UI remains composed. */
import { API_BASE_URL } from '@/shared/config/constants';

export async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}
