import { describe, it, expect } from 'vitest';
import { temperaturesActions } from '../temperaturesSlice';
import { clear, clearError, setError, setYear, setYearAxis } from '../temperatures.actions';

describe('Action Creators', () => {
  it('should create an action to set an error', () => {
    const errorMessage = 'An error occurred';
    const expectedAction = temperaturesActions.setError(errorMessage);

    // Test if the action creator returns the expected action
    expect(setError(errorMessage)).toEqual(expectedAction);
  });

  it('should create an action to clear the error', () => {
    const expectedAction = temperaturesActions.clearError();

    // Test if the action creator returns the expected action
    expect(clearError()).toEqual(expectedAction);
  });

  it('should create an action to set the year', () => {
    const year = 2022;
    const expectedAction = temperaturesActions.setYear(year);

    // Test if the action creator returns the expected action
    expect(setYear(year)).toEqual(expectedAction);
  });

  it('should create an action to set the year to null', () => {
    const expectedAction = temperaturesActions.setYear(null);

    // Test if the action creator returns the expected action
    expect(setYear(null)).toEqual(expectedAction);
  });

  it('should create an action to set the yearAxis flag', () => {
    const yearAxis = true;
    const expectedAction = temperaturesActions.setYearAxis(yearAxis);

    // Test if the action creator returns the expected action
    expect(setYearAxis(yearAxis)).toEqual(expectedAction);
  });

  it('should create an action to clear the state', () => {
    const expectedAction = temperaturesActions.clear();

    // Test if the action creator returns the expected action
    expect(clear()).toEqual(expectedAction);
  });
});
