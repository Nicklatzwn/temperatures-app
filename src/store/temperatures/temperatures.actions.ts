import { temperaturesActions } from './temperaturesSlice';

export const setError = (error: string): ReturnType<typeof temperaturesActions.setError> =>
  temperaturesActions.setError(error);
export const clearError = (): ReturnType<typeof temperaturesActions.clearError> => temperaturesActions.clearError();
export const setYear = (year: number | null): ReturnType<typeof temperaturesActions.setYear> =>
  temperaturesActions.setYear(year);
export const setAnnual = (annual: boolean): ReturnType<typeof temperaturesActions.setAnnual> =>
  temperaturesActions.setAnnual(annual);
export const clear = (): ReturnType<typeof temperaturesActions.clear> => temperaturesActions.clear();
