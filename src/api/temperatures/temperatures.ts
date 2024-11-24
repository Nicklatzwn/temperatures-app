import { AxiosResponse } from 'axios';
import http from '../config/axios';
import { Endpoints } from '../config/endpoints';
import { IResponseTemperatureData } from '@/models/responseInterfaces/IResponseTemperatureData';
import { ITemperatureData } from '@/models/reusableInterfaces';

const postTemperatures = async (data: ITemperatureData[]): Promise<IResponseTemperatureData> => {
  const url = Endpoints.temperatures;
  const response: AxiosResponse<IResponseTemperatureData> = await http.post(url, data);
  return response.data;
};

export { postTemperatures };
