import { ITemperatureData } from './ITemperatureData';

export interface ITemperatureState {
  data: ITemperatureData[];
  year: null | number;
  annual: boolean;
  filename: string;
  loading: boolean;
  error: string;
}
