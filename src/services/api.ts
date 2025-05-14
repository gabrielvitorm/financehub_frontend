import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL // já apontando para https://apifinancehub-9om8.onrender.com
});

// opcional: adiciona interceptor pra mandar o token em todas as requisições
api.interceptors.request.use(cfg => {
  const tk = localStorage.getItem('token');
  if (tk) cfg.headers!['Authorization'] = `Bearer ${tk}`;
  return cfg;
});
