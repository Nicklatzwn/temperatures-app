import { temperaturesActions } from './temperaturesSlice';

/**
 * Action creator to set an error message in the temperatures state.
 *
 * This action is used to set an error message in the Redux store when an error occurs
 * related to temperatures data (e.g., failed API request, invalid input, etc.).
 *
 * @param {string} error - The error message to set.
 * @returns {ReturnType<typeof temperaturesActions.setError>} The action object to set the error.
 */
export const setError = (error: string): ReturnType<typeof temperaturesActions.setError> =>
  temperaturesActions.setError(error);

/**
 * Action creator to clear any existing errors in the temperatures state.
 *
 * This action clears the error message stored in the temperatures slice of the Redux store.
 * It is typically used to reset the error state once the error has been acknowledged or resolved.
 *
 * @returns {ReturnType<typeof temperaturesActions.clearError>} The action object to clear errors.
 */
export const clearError = (): ReturnType<typeof temperaturesActions.clearError> => temperaturesActions.clearError();

/**
 * Action creator to set the selected year in the temperatures state.
 *
 * This action updates the Redux store with the selected year. The year can be used for
 * filtering temperatures data or to display data for a specific year.
 *
 * @param {number | null} year - The year to set. Can be null to clear the selected year.
 * @returns {ReturnType<typeof temperaturesActions.setYear>} The action object to set the year.
 */
export const setYear = (year: number | null): ReturnType<typeof temperaturesActions.setYear> =>
  temperaturesActions.setYear(year);

/**
 * Action creator to set whether the temperatures data is organized by year or month.
 *
 * This action is used to set a flag (`yearAxis`) in the Redux store that determines whether
 * the temperatures data should be displayed or processed by year, or another axis (e.g., monthly).
 *
 * @param {boolean} yearAxis - The flag to set. `true` for year-based, `false` for month-based.
 * @returns {ReturnType<typeof temperaturesActions.setYearAxis>} The action object to set the yearAxis flag.
 */
export const setYearAxis = (yearAxis: boolean): ReturnType<typeof temperaturesActions.setYearAxis> =>
  temperaturesActions.setYearAxis(yearAxis);

/**
 * Action creator to clear the temperatures data and reset the state.
 *
 * This action resets the entire temperatures state, including any data, selected year, and any other state related to temperatures.
 * It is typically used to reset the state when the user wants to clear all the chart temperatures data.
 *
 * @returns {ReturnType<typeof temperaturesActions.clear>} The action object to clear the state.
 */
export const clear = (): ReturnType<typeof temperaturesActions.clear> => temperaturesActions.clear();
