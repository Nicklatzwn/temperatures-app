import { describe, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';

import { server } from '@/setup-tests';
import { IRequestTemperaturesData } from '@/models/requestInterfaces';
import { postTemperaturesData, temperaturesReducer } from '../temperaturesSlice';
import { http, HttpResponse } from 'msw';
import { Endpoints } from '@/api/config/endpoints';

const mockRequestData: IRequestTemperaturesData = {
  data: [
    {
      Year: 1859,
      Jan: 25.7,
      Feb: 25.4,
      Mar: 24.2,
      Apr: 23.1,
      May: 19.5,
      Jun: 15.7,
      Jul: 14.7,
      Aug: 17.7,
      Sep: 18.3,
      Oct: 23.9,
      Nov: 23.6,
      Dec: 25.4,
      Annual: 21.4,
    },
    {
      Year: 1860,
      Jan: 25.7,
      Feb: 23.6,
      Mar: 24.9,
      Apr: 21.8,
      May: 18.6,
      Jun: 15.5,
      Jul: 14.7,
      Aug: 16.0,
      Sep: 17.9,
      Oct: 20.0,
      Nov: 21.6,
      Dec: 23.2,
      Annual: 20.3,
    },
  ],
  filename: 'test-file',
};

describe('Temperatures Slice - Async Thunk', () => {
  it('should handle posting temperature data successfully', async () => {
    const store = configureStore({
      reducer: { temperatures: temperaturesReducer },
    });

    // Dispatch the async thunk
    await store.dispatch(postTemperaturesData(mockRequestData));

    // Get the current state and check that the data was populated correctly
    const state = store.getState().temperatures;
    expect(state.data).toEqual(mockRequestData.data);
    expect(state.loading).toBe(false);
    expect(state.filename).toBe('test-file');
  });

  it('should handle errors when posting temperature data fails', async () => {
    // Mock an error response
    server.use(
      http.post(`*${Endpoints.temperatures}`, async () =>
        HttpResponse.json({ error: { message: 'Internal server error' } }, { status: 400 })
      )
    );

    const store = configureStore({
      reducer: { temperatures: temperaturesReducer },
    });

    // Dispatch the async thunk
    await store.dispatch(postTemperaturesData(mockRequestData));

    const state = store.getState().temperatures;
    expect(state.error).toBe('Internal server error');
    expect(state.loading).toBe(false);
  });
});
