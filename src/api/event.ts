import { AxiosResponse } from 'axios';
import { api } from '.';
import { response } from '@/types';
const saveEvent = (formData: FormData): Promise<AxiosResponse<unknown>> => {
  return api.post('/events', { formData });
};

const updateEvent = (
  formData: FormData,
  idx: number
): Promise<AxiosResponse<unknown>> => {
  return api.put(`/events/${idx}`, { formData });
};

const deleteEvent = (idx: number): Promise<AxiosResponse<unknown>> => {
  return api.delete(`/events/${idx}`);
};

const getEvents = (
  size: number,
  page: number,
  query: string
): Promise<AxiosResponse<response>> => {
  return api.get(`/events?size=${size}&page=${page}&query=${query}`);
};

const getEventByIdx = (idx: string): Promise<AxiosResponse<response>> => {
  return api.get(`/events/${idx}`);
};

const saveApply = (
  idx: string,
  name: string,
  phone: string,
  clauseAgree: boolean
): Promise<AxiosResponse<response>> => {
  return api.post(`/events/${idx}/applies`, { name, phone, clauseAgree });
};

const getApply = (
  idx: number,
  page: number,
  size: number
): Promise<AxiosResponse<unknown>> => {
  return api.get(`/events/${idx}/applies?page=${page}&size=${size}`);
};

export {
  saveEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  getEventByIdx,
  saveApply,
  getApply,
};
