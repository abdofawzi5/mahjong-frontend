import axios from 'axios';
import type { IApiClient } from './IApiClient';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiClient: IApiClient = axiosInstance;
