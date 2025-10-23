

/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchingApi } from './catalog-api';
import { AppConfig } from './config';

export async function getListBerita(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'CMNEWS',
      ApiDB: AppConfig.apiDB,
    },
  };

  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil data berita:', error);
    return [];
  }
  return [];
}

