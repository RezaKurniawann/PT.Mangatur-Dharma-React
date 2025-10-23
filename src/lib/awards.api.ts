/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchingApi } from './catalog-api';
import { AppConfig } from './config';

export async function getListAwards(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'CMAWRH',
      ApiDB: AppConfig.apiDB,
    },
  };

  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil data penghargaan:', error);
    return [];
  }
  return [];
}

export async function getAwardDetails(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'CMAWRD',
      ApiDB: AppConfig.apiDB,
    },
  };

  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil data penghargaan-detail:', error);
    return [];
  }
  return [];
}

