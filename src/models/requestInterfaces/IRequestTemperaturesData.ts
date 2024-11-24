import { ITemperatureData } from '../reusableInterfaces/ITemperatureData';

export interface IRequestTemperaturesData {
  data: ITemperatureData[];
  filename: string;
}
