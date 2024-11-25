import { describe, it, expect } from 'vitest';
import { RootState } from '@/store/store';
import {
  getTemperatures,
  getTemperaturesData,
  getTemperaturesError,
  getTemperaturesFilename,
  getTemperaturesYear,
  getTemperaturesYears,
  getYear,
  hasTemperaturesData,
  isTemperaturesLoading,
  isYearAxis,
} from '../temperatures.selector';

describe('Selectors', () => {
  const mockState: RootState = {
    temperatures: {
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
      filename: 'test-file.csv',
      loading: false,
      error: '',
      year: 1859,
      yearsAxis: true,
    },
  };

  it('should get temperatures data from the state', () => {
    const temperatures = getTemperatures(mockState);
    expect(temperatures).toEqual(mockState.temperatures.data);
  });

  it('should get the temperatures filename', () => {
    const filename = getTemperaturesFilename(mockState);
    expect(filename).toBe(mockState.temperatures.filename);
  });

  it('should check if temperatures data is loading', () => {
    const loading = isTemperaturesLoading(mockState);
    expect(loading).toBe(mockState.temperatures.loading);
  });

  it('should get the temperatures error message', () => {
    const error = getTemperaturesError(mockState);
    expect(error).toBe(mockState.temperatures.error);
  });

  it('should get the selected year', () => {
    const year = getYear(mockState);
    expect(year).toBe(mockState.temperatures.year);
  });

  it('should check if year axis is enabled', () => {
    const yearAxis = isYearAxis(mockState);
    expect(yearAxis).toBe(mockState.temperatures.yearsAxis);
  });

  it('should check if there is any temperatures data', () => {
    const hasData = hasTemperaturesData(mockState);
    expect(hasData).toBe(true);
  });

  it('should get the list of years from temperatures data', () => {
    const years = getTemperaturesYears(mockState);
    expect(years).toEqual([1859, 1860]);
  });

  it('should get the temperatures data filtered by year', () => {
    const temperaturesForYear = getTemperaturesYear(mockState);
    expect(temperaturesForYear).toEqual([mockState.temperatures.data[0]]);
  });

  it('should get the chart data formatted for Chart.js', () => {
    const chartData = getTemperaturesData(mockState);

    // Verifying the structure of the data
    expect(chartData).toHaveProperty('labels');
    expect(chartData).toHaveProperty('datasets');
    expect(chartData.labels).toEqual([1859, 1860]); // Check labels (years)
    expect(chartData.datasets.length).toBeGreaterThan(0); // Ensure there are datasets
  });
});
