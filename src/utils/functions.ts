import { ChartDataset } from 'chart.js';

export const generateRandomColor = (): string => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r}, ${g}, ${b}, 0.7)`;
};

export const calculateMeanAndStd = (values: (number | null)[], mean: number): number => {
  const validValues = values.filter((value) => value !== null);
  const variance = validValues.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / validValues.length;
  const stdDev = Math.sqrt(variance);
  return stdDev;
};

export const getPointFields = (
  color: string
): Pick<ChartDataset<'line'>, 'borderColor' | 'backgroundColor' | 'borderWidth' | 'hoverBorderWidth'> => {
  return {
    borderColor: color,
    backgroundColor: color,
    borderWidth: 0.5,
    hoverBorderWidth: 2,
  };
};
