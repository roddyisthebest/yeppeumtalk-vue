import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://yeppeumtalk.com/api/v1',
});

export const setToken = async (accessToken: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};
