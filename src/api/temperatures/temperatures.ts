import http from '../config/axios';
import { Endpoints } from '../config/endpoints';
import { IResponseTemperatureData } from '@/models/responseInterfaces/IResponseTemperatureData';
import { ITemperatureData } from '@/models/reusableInterfaces';

const postTemperatures = async (data: ITemperatureData[]): Promise<IResponseTemperatureData> => {
  const url = Endpoints.temperatures;
  // await http.post(url, data);
  return { data };
};

export { postTemperatures };
