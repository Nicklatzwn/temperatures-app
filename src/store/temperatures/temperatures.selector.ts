import { ITemperatureData } from '@/models/reusableInterfaces';
import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';
import { ChartData, ChartDataset } from 'chart.js';
import { calculateMeanAndStd, generateRandomColor, getPointFields } from '@/utils';
import { months } from '@/assets/consts';

export const getTemperatures = (state: RootState): ITemperatureData[] => state.temperatures.data;
export const getTemperaturesFilename = (state: RootState): string => state.temperatures.filename;
export const isTemperaturesLoading = (state: RootState): boolean => state.temperatures.loading;
export const getTemperaturesError = (state: RootState): string => state.temperatures.error;
export const getYear = (state: RootState): number | null => state.temperatures.year;
export const isYearAxis = (state: RootState): boolean => state.temperatures.yearsAxis;

export const hasTemperaturesData = createSelector([getTemperatures], (temperatures) => temperatures.length > 0);
export const getTemperaturesYears = createSelector([getTemperatures], (temperatures) =>
  temperatures.map((data) => data.Year).filter((x) => x !== null)
);
export const getTemperaturesYear = createSelector([getTemperatures, getYear], (temperatures, year) =>
  year ? temperatures.filter((x) => x.Year === year) : null
);
export const getTemperaturesData = createSelector(
  [getTemperatures, getTemperaturesYear, getTemperaturesYears, isYearAxis],
  (temperatures, temperaturesYear, temperaturesYears, yearAxis) => {
    const selectedTemperatures = temperaturesYear ?? temperatures;
    const datasets: ChartDataset<'line'>[] = yearAxis
      ? [
          {
            label: 'Yearly (Mean + 1s)',
            data: selectedTemperatures.map(({ Year, Annual, ...monthTemps }) =>
              Annual === null ? null : Annual + calculateMeanAndStd(Object.values(monthTemps), Annual)
            ),
            ...getPointFields(generateRandomColor()),
          },
          {
            label: 'Yearly (Mean)',
            data: selectedTemperatures.map((x) => x.Annual),
            ...getPointFields(generateRandomColor()),
          },
          {
            label: 'Yearly (Mean - 1s)',
            data: selectedTemperatures.map(({ Year, Annual, ...monthTemps }) =>
              Annual === null ? null : Annual - calculateMeanAndStd(Object.values(monthTemps), Annual)
            ),
            ...getPointFields(generateRandomColor()),
          },
        ]
      : selectedTemperatures.map(({ Year, Annual, ...monthTemps }) => ({
          label: Year?.toString(),
          data: Object.values(monthTemps),
          ...getPointFields(generateRandomColor()),
        }));

    const labels: number[] | string[] = yearAxis ? temperaturesYears : months;

    const data: ChartData<'line'> = {
      labels,
      datasets,
    };
    return data;
  }
);
