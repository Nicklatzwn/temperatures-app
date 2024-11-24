import { ITemperatureData } from '@/models/reusableInterfaces';
import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';
import { ChartData, ChartDataset } from 'chart.js';
import { generateRandomColor } from '@/utils';
import { months } from '@/assets/consts';

export const getTemperatures = (state: RootState): ITemperatureData[] => state.temperatures.data;
export const getTemperaturesFilename = (state: RootState): string => state.temperatures.filename;
export const isTemperaturesLoading = (state: RootState): boolean => state.temperatures.loading;
export const getTemperaturesError = (state: RootState): string => state.temperatures.error;
export const getYear = (state: RootState): number | null => state.temperatures.year;
export const isAnnual = (state: RootState): boolean => state.temperatures.annual;

export const hasTemperaturesData = createSelector([getTemperatures], (temperatures) => temperatures.length > 0);
export const getTemperaturesYears = createSelector([getTemperatures], (temperatures) =>
  temperatures.map((data) => data.Year).filter((x) => x !== null)
);
export const getTemperaturesYear = createSelector([getTemperatures, getYear], (temperatures, year) =>
  year ? temperatures.filter((x) => x.Year === year) : null
);
export const getTemperaturesData = createSelector(
  [getTemperatures, getTemperaturesYear, getTemperaturesYears, isAnnual],
  (temperatures, temperaturesYear, temperaturesYears, annual) => {
    const selectedTemperatures = temperaturesYear ?? temperatures;
    const colorYearAverages = generateRandomColor();
    const datasets: ChartDataset<'line'>[] = annual
      ? [
          {
            label: 'Yearly Averages (Annual)',
            data: selectedTemperatures.map((x) => x.Annual),
            borderColor: colorYearAverages,
            backgroundColor: colorYearAverages,
            borderWidth: 0.5,
            hoverBorderWidth: 2,
          } as ChartDataset<'line'>,
        ]
      : selectedTemperatures.map((yearData) => {
          const { Year, Annual, ...monthTemps } = yearData;
          const color = generateRandomColor();
          const point: ChartDataset<'line'> = {
            label: Year?.toString(),
            data: annual ? [Annual] : Object.values(monthTemps),
            borderColor: color,
            backgroundColor: color,
            borderWidth: 0.5,
            hoverBorderWidth: 2,
          };
          return point;
        });
    const data: ChartData<'line'> = {
      labels: annual ? temperaturesYears : months,
      datasets,
    };
    return data;
  }
);
