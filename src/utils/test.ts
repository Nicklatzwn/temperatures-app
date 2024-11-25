import { Endpoints } from '@/api/config/endpoints';
import { ITemperatureState } from '@/models/reusableInterfaces';
import { RootState } from '@/store/store';
import { temperaturesReducer } from '@/store/temperatures';
import { configureStore } from '@reduxjs/toolkit';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post(`*${Endpoints.temperatures}`, async (value) => {
    try {
      const data = await value.request.json();
      return HttpResponse.json({ data });
    } catch (error) {
      return HttpResponse.json({ error: 'Failed to parse body' }, { status: 400 });
    }
  }),
];

// Helper function to create a mock store
export const createMockStore = (initialState: ITemperatureState, state: Partial<RootState> = {}) => {
  return configureStore({
    reducer: {
      temperatures: temperaturesReducer,
    },
    preloadedState: {
      temperatures: {
        ...initialState,
        ...state.temperatures,
      },
      ...state,
    },
  });
};
