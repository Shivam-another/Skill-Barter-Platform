export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? ''
  : 'http://localhost:5000';

export const SOCKET_URL = process.env.NODE_ENV === 'production'
  ? '/'
  : 'http://localhost:5000';