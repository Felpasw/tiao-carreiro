import axios from 'axios';

export const albumAPI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

albumAPI.interceptors.request.use((request: any) => {
  request.headers = {
    ...request.headers,
    Authorization: process.env.NEXT_PUBLIC_TOKEN,
  };
  return request;
});

albumAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.alert('Not Allowed');
    }
    return Promise.reject(error);
  }
);
