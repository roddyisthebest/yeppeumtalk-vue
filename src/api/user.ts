import { AxiosResponse } from 'axios';
import { api } from '.';

const signUp = (
  email: string,
  password: string
): Promise<AxiosResponse<unknown>> => {
  return api.post('/user', { email, password });
};

const login = (
  email: string,
  password: string
): Promise<AxiosResponse<unknown>> => {
  return api.post('/user/authentication', { email, password });
};

export { signUp, login };
