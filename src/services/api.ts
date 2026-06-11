import axios from 'axios';

const API_BASE_URLS = [
  import.meta.env.VITE_API_BASE_URL,
  'http://localhost:5000/api',
  'http://localhost:5001/api',
].filter((value): value is string => Boolean(value));

let resolvedApiBaseUrl: string | null = null;
let resolvingApiBaseUrl: Promise<string> | null = null;

const resolveApiBaseUrl = async (): Promise<string> => {
  if (resolvedApiBaseUrl) {
    return resolvedApiBaseUrl;
  }

  if (resolvingApiBaseUrl) {
    return resolvingApiBaseUrl;
  }

  resolvingApiBaseUrl = (async () => {
    for (const baseUrl of API_BASE_URLS) {
      try {
        await axios.get(`${baseUrl}/health`, { timeout: 1500 });
        resolvedApiBaseUrl = baseUrl;
        return baseUrl;
      } catch {
        // Try the next backend candidate.
      }
    }

    resolvedApiBaseUrl = API_BASE_URLS[0] || 'http://localhost:5000/api';
    return resolvedApiBaseUrl;
  })();

  return resolvingApiBaseUrl;
};

const api = axios.create({
  baseURL: API_BASE_URLS[0] || 'http://localhost:5000/api',
});

api.interceptors.request.use(async (config) => {
  config.baseURL = await resolveApiBaseUrl();

  const token = localStorage.getItem('accessToken');
  console.log('Sending Request with Token:', token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
