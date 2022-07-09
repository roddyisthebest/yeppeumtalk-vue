import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://yeppeumtalk.com/api/v1',
});
