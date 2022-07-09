import { AxiosResponse } from 'axios';
import { api } from '.';

const updateLink = (formData: FormData): Promise<AxiosResponse<unknown>> => {
  return api.put('/links', { formData });
};

const getLink = (): Promise<AxiosResponse<unknown>> => {
  return api.get('/links');
};

export { updateLink, getLink };
