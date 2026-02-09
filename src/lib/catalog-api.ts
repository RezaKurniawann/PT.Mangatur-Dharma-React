/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppConfig } from './config';
import { adrDec, adrEnc } from './lib-helper';

export const fetchingApi = async (
  url: string,
  options: {
    method?: string;
    params?: Record<string, any>;
    data?: any;
    headers?: Record<string, any>;
  } = {}
) => {
  const encParams = adrEnc(JSON.stringify(options.params));
  const fetchOptions: RequestInit = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ` + AppConfig.appKey,
      ...options.headers,
    },
  };

  if (options.method && options.method !== 'GET' && options.method !== 'HEAD') {
    fetchOptions.body = JSON.stringify(options.data || {});
  }

  const response = await fetch(`${url}?${encParams}`, fetchOptions);

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const responseData = await response.json();
  return adrDec(responseData.Data);
};
