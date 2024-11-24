import { ITemperatureData } from './ITemperatureData';

export interface ITemperatureState {
  data: ITemperatureData[];
  year: null | number;
  yearsAxis: boolean;
  filename: string;
  loading: boolean;
  error: string;
}
