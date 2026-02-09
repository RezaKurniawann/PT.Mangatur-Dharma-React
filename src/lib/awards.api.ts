/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchingApi } from "./catalog-api";
import { AppConfig } from "./config";

export async function getListAwards(
  startDate?: string,
  endDate?: string
): Promise<any[]> {
  let sqlCondition = "";
  if (startDate) {
    sqlCondition += ` and cwdate >= '${startDate}'`;
  }
  if (endDate) {
    sqlCondition += ` and cwdate <= '${endDate}'`;
  }
  const objParams = {
    params: {
      Method: "LoadGrid",
      Controller: "CMAWRH",
      ApiDB: AppConfig.apiDB,
      sqlCondition,
    },
  };

  try {
    const response = await fetchingApi(
      `${AppConfig.apiUrl}/getDataCms`,
      objParams
    );
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error("Gagal mengambil data penghargaan:", error);
    return [];
  }
  return [];
}

export async function getAwardDetails(): Promise<any[]> {
  const objParams = {
    params: {
      Method: "LoadGrid",
      Controller: "CMAWRD",
      ApiDB: AppConfig.apiDB,
    },
  };

  try {
    const response = await fetchingApi(
      `${AppConfig.apiUrl}/getDataCms`,
      objParams
    );
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error("Gagal mengambil data penghargaan-detail:", error);
    return [];
  }
  return [];
}
