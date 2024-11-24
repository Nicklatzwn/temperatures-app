import { Endpoints } from '@/api/config/endpoints';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post(`*/${Endpoints.temperatures}`, (value) => {
    const data = value.request.body;
    return HttpResponse.json(data);
  }),
];
