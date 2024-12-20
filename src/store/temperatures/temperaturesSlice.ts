import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITemperatureState } from '@/models/reusableInterfaces';
import { IResponseTemperatureData } from '@/models/responseInterfaces';
import { postTemperatures } from '@/api/temperatures/temperatures';
import { IRequestTemperaturesData } from '@/models/requestInterfaces';

/**
 * Initial state for the temperatures slice.
 *
 * Represents the default structure of the state managed by this slice.
 *
 * @constant {ITemperatureState}
 */
const initialState: ITemperatureState = {
  data: [],
  year: null,
  yearsAxis: false,
  filename: '',
  loading: false,
  error: '',
};

/**
 * Redux slice for managing temperature-related state and actions.
 *
 * This slice encapsulates all logic for handling temperature data, including
 * state management, synchronous actions, and asynchronous side effects.
 */
const temperaturesSlice = createSlice({
  name: 'temperatures',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = initialState.error;
    },
    setYear: (state, action: PayloadAction<number | null>) => {
      state.year = action.payload;
    },
    setYearAxis: (state, action: PayloadAction<boolean>) => {
      state.yearsAxis = action.payload;
    },
    clear: (state) => {
      state.data = initialState.data;
      state.year = initialState.year;
      state.yearsAxis = initialState.yearsAxis;
      state.filename = initialState.filename;
      state.loading = initialState.loading;
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postTemperaturesData.pending, (state, action) => {
      state.loading = true;
      state.filename = action.meta.arg.filename;
    });
    builder.addCase(postTemperaturesData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || initialState.error;
      state.filename = initialState.filename;
    });
    builder.addCase(postTemperaturesData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
  },
});

/**
 * Async thunk to post temperature data to the server.
 *
 * Dispatches actions for pending, fulfilled, and rejected states.
 *
 * @param {IRequestTemperaturesData} param - The request data containing the file content and metadata.
 * @returns {Promise<IResponseTemperatureData>} A promise resolving to the response data.
 */
export const postTemperaturesData = createAsyncThunk<IResponseTemperatureData, IRequestTemperaturesData>(
  'post-temperatures-data',
  ({ data }) => postTemperatures(data)
);

/**
 * Exports the reducer and actions from the temperatures slice.
 *
 * The `temperaturesReducer` is used to configure the Redux store.
 * The `temperaturesActions` provide access to all defined action creators.
 *
 * @constant {Object}
 */
export const { reducer: temperaturesReducer, actions: temperaturesActions } = temperaturesSlice;
