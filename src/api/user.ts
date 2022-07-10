import { AxiosResponse } from 'axios';
import { api } from '.';
import { response } from '@/types';

const signup = (
  email: string,
  password: string
): Promise<AxiosResponse<unknown>> => {
  return api.post('/user', { email, password });
};

const login = (
  email: string,
  password: string
): Promise<AxiosResponse<response>> => {
  return api.post('/user/authentication', { email, password });
};

export { signup, login };
