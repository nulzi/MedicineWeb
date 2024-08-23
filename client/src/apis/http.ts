import axios from 'axios';
import { getToken } from '../utils/localStorage';

const BASE_URL = 'http://localhost:5000';

export const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'content-type': 'application/json',
    Authorization: getToken() ? `Bearer ${getToken()}` : '',
  },
  withCredentials: true,
});
