import { ITemperatureData } from '@/models/reusableInterfaces';
import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';
import { ChartData, ChartDataset } from 'chart.js';
import { calculateMeanAndStd, generateRandomColor, getPointFields } from '@/utils';
import { months } from '@/assets/consts';

/**
 * Selector to get the temperatures data from the state.
 *
 * @param {RootState} state - The Redux state.
 * @returns {ITemperatureData[]} The list of temperatures data.
 */
export const getTemperatures = (state: RootState): ITemperatureData[] => state.temperatures.data;

/**
 * Selector to get the filename of the uploaded temperatures file.
 *
 * @param {RootState} state - The Redux state.
 * @returns {string} The filename of the uploaded data.
 */
export const getTemperaturesFilename = (state: RootState): string => state.temperatures.filename;

/**
 * Selector to check if temperatures data is being loaded.
 *
 * @param {RootState} state - The Redux state.
 * @returns {boolean} `true` if loading, `false` otherwise.
 */
export const isTemperaturesLoading = (state: RootState): boolean => state.temperatures.loading;

/**
 * Selector to get the error message related to temperatures, if any.
 *
 * @param {RootState} state - The Redux state.
 * @returns {string} The error message.
 */
export const getTemperaturesError = (state: RootState): string => state.temperatures.error;

/**
 * Selector to get the selected year for temperatures data.
 *
 * @param {RootState} state - The Redux state.
 * @returns {number | null} The selected year, or `null` if no year is selected.
 */
export const getYear = (state: RootState): number | null => state.temperatures.year;

/**
 * Selector to check if the year axis is enabled for temperatures data.
 *
 * @param {RootState} state - The Redux state.
 * @returns {boolean} `true` if the year axis is enabled, `false` otherwise.
 */
export const isYearAxis = (state: RootState): boolean => state.temperatures.yearsAxis;

/**
 * Selector to check if there is any temperatures data in the state.
 *
 * @param {ITemperatureData[]} temperatures - The list of temperatures data.
 * @returns {boolean} `true` if there is temperatures data, `false` otherwise.
 */
export const hasTemperaturesData = createSelector([getTemperatures], (temperatures) => temperatures.length > 0);

/**
 * Selector to get all the years from the temperatures data.
 *
 * @param {ITemperatureData[]} temperatures - The list of temperatures data.
 * @returns {number[]} An array of years.
 */
export const getTemperaturesYears = createSelector([getTemperatures], (temperatures) =>
  temperatures.map((data) => data.Year).filter((x) => x !== null)
);

/**
 * Selector to get temperatures data filtered by the selected year.
 *
 * @param {ITemperatureData[]} temperatures - The list of temperatures data.
 * @param {number | null} year - The selected year.
 * @returns {ITemperatureData[] | null} An array of temperatures data for the selected year, or `null` if no year is selected.
 */
export const getTemperaturesYear = createSelector([getTemperatures, getYear], (temperatures, year) =>
  year ? temperatures.filter((x) => x.Year === year) : null
);

/**
 * Selector to get the temperature data formatted for chart display.
 *
 * This selector processes the temperature data and formats it into a structure
 * compatible with Chart.js. It creates datasets and labels based on the selected year and axis configuration.
 *
 * @param {ITemperatureData[]} temperatures - The list of temperature data.
 * @param {ITemperatureData[] | null} temperaturesYear - The filtered temperature data for the selected year.
 * @param {number[]} temperaturesYears - The list of available years.
 * @param {boolean} yearAxis - Flag indicating whether to display data by year or by months.
 * @returns {ChartData<'line'>} The chart data object.
 */
export const getTemperaturesData = createSelector(
  [getTemperatures, getTemperaturesYear, getTemperaturesYears, isYearAxis],
  (temperatures, temperaturesYear, temperaturesYears, yearAxis) => {
    const selectedTemperatures = temperaturesYear ?? temperatures;
    const datasets: ChartDataset<'line'>[] = yearAxis
      ? [
          {
            label: 'Mean + 1s',
            data: selectedTemperatures.map(({ Year, Annual, ...monthTemps }) =>
              Annual === null ? null : Annual + calculateMeanAndStd(Object.values(monthTemps), Annual)
            ),
            ...getPointFields(generateRandomColor()),
          },
          {
            label: 'Mean',
            data: selectedTemperatures.map((x) => x.Annual),
            ...getPointFields(generateRandomColor()),
          },
          {
            label: 'Mean - 1s',
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
