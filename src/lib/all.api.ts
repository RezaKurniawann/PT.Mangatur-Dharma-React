import { fetchingApi } from './catalog-api';
import { AppConfig } from './config';

// ==================== PENGHARGAAN ====================
export async function getListAwardsHeader(): Promise<any[]> {
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
    console.error('Gagal mengambil data penghargaan header:', error);
    return [];
  }
  return [];
}

export async function getListAwardsDetail(): Promise<any[]> {
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
    console.error('Gagal mengambil data penghargaan detail:', error);
    return [];
  }
  return [];
}

// ==================== PELANGGAN ====================
export async function getListCustomers(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'CMCSTM',
      ApiDB: AppConfig.apiDB,
    },
  };
  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil data pelanggan:', error);
    return [];
  }
  return [];
}

// ==================== KATEGORI PELANGGAN ====================
export async function getCustomerCategories(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'TBLSYS',
      ApiDB: AppConfig.apiDB,
      sqlCondition: ` and tsdpfg = '1' and tsdscd = 'CUSTCAT'`,
    },
  };
  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil kategori pelanggan:', error);
    return [];
  }
  return [];
}

// ==================== BERITA ====================
export async function getListNews(): Promise<any[]> {
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

// ==================== KATEGORI BERITA ====================
export async function getNewsCategories(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'TBLSYS',
      ApiDB: AppConfig.apiDB,
      sqlCondition: ` and tsdpfg = '1' and tsdscd = 'NEWSCAT'`,
    },
  };
  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil kategori news:', error);
    return [];
  }
  return [];
}



// ==================== ARTIKEL ====================
export async function getListArtikel(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'CMARTK',
      ApiDB: AppConfig.apiDB,
    },
  };
  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil data artikel:', error);
    return [];
  }
  return [];
}

// ==================== KATEGORI ARTIKEL ====================
export async function getArticleCategories(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'TBLSYS',
      ApiDB: AppConfig.apiDB,
      sqlCondition: ` and tsdpfg = '1' and tsdscd = 'ARTCAT'`,
    },
  };
  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil kategori artikel:', error);
    return [];
  }
  return [];
}

// ==================== PRODUK ====================
export async function getListProducts(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'CMPROD',
      ApiDB: AppConfig.apiDB,
    },
  };
  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil data produk:', error);
    return [];
  }
  return [];
}

// ==================== KATEGORI PRODUK ====================
export async function getProductCategories(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'TBLSYS',
      ApiDB: AppConfig.apiDB,
      sqlCondition: ` and tsdpfg = '1' and tsdscd = 'PRODCAT'`,
    },
  };
  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil kategori produk:', error);
    return [];
  }
  return [];
}

// ==================== RUNNING TRANSACTION NO ====================
export async function getRunningTransactionNo(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'CSYNBR',
      ApiDB: AppConfig.apiDB,
    },
  };
  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil data running transaction no:', error);
    return [];
  }
  return [];
}

// ==================== DESCRIPTION ====================
export async function getDescriptions(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'TBLDSC',
      ApiDB: AppConfig.apiDB,
    },
  };
  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil data description:', error);
    return [];
  }
  return [];
}

// ==================== ERROR LOG FILE ====================
export async function getErrorLogFiles(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'TBLELF',
      ApiDB: AppConfig.apiDB,
    },
  };
  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil data error log file:', error);
    return [];
  }
  return [];
}

// ==================== HISTORY LOGIN ====================
export async function getHistoryLogin(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'TBLHSL',
      ApiDB: AppConfig.apiDB,
    },
  };
  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil data history login:', error);
    return [];
  }
  return [];
}

// ==================== HISTORY SINTAX ====================
export async function getHistorySintax(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'TBLHSS',
      ApiDB: AppConfig.apiDB,
    },
  };
  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil data history sintax:', error);
    return [];
  }
  return [];
}

// ==================== MENU ====================
export async function getMenus(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'TBLMNU',
      ApiDB: AppConfig.apiDB,
    },
  };
  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil data menu:', error);
    return [];
  }
  return [];
}

// ==================== RUNNING NO ====================
export async function getRunningNo(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'TBLNOR',
      ApiDB: AppConfig.apiDB,
    },
  };
  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil data running no:', error);
    return [];
  }
  return [];
}

// ==================== PROSES BATCH LOG FILE ====================
export async function getProsesBatchLogFiles(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'TBLPLF',
      ApiDB: AppConfig.apiDB,
    },
  };
  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil data proses batch log file:', error);
    return [];
  }
  return [];
}

// ==================== PARAMETER ====================
export async function getParameters(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'TBLPRM',
      ApiDB: AppConfig.apiDB,
    },
  };
  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil data parameter:', error);
    return [];
  }
  return [];
}

// ==================== SINTAX LOG FILE ====================
export async function getSintaxLogFiles(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'TBLSLF',
      ApiDB: AppConfig.apiDB,
    },
  };
  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil data sintax log file:', error);
    return [];
  }
  return [];
}

// ==================== SYSTEM ====================
export async function getSystems(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'TBLSYS',
      ApiDB: AppConfig.apiDB,
    },
  };
  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil data system:', error);
    return [];
  }
  return [];
}

// ==================== USER ACCESS MENU HISTORY ====================
export async function getUserAccessMenuHistory(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'TBLUAH',
      ApiDB: AppConfig.apiDB,
    },
  };
  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil data user access menu history:', error);
    return [];
  }
  return [];
}

// ==================== USER ACCESS MENU ====================
export async function getUserAccessMenu(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'TBLYAM',
      ApiDB: AppConfig.apiDB,
    },
  };
  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil data user access menu:', error);
    return [];
  }
  return [];
}

// ==================== USER ENABLE DISABLE HISTORY ====================
export async function getUserEnableDisableHistory(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'TBLUED',
      ApiDB: AppConfig.apiDB,
    },
  };
  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil data user enable disable history:', error);
    return [];
  }
  return [];
}

// ==================== USER PASSWORD HISTORY ====================
export async function getUserPasswordHistory(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'TBLUPH',
      ApiDB: AppConfig.apiDB,
    },
  };
  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil data user password history:', error);
    return [];
  }
  return [];
}

// ==================== USER OTHER ACCESS ====================
export async function getUserOtherAccess(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'TBLUSH',
      ApiDB: AppConfig.apiDB,
    },
  };
  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil data user other access:', error);
    return [];
  }
  return [];
}

// ==================== USER ====================
export async function getUsers(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'TBLUSR',
      ApiDB: AppConfig.apiDB,
    },
  };
  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil data user:', error);
    return [];
  }
  return [];
}

// ==================== USER TOKEN ====================
export async function getUserTokens(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'TBLUST',
      ApiDB: AppConfig.apiDB,
    },
  };
  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil data user token:', error);
    return [];
  }
  return [];
}

// ==================== VERSION HISTORY ====================
export async function getVersionHistory(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'TBLVRH',
      ApiDB: AppConfig.apiDB,
    },
  };
  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil data version history:', error);
    return [];
  }
  return [];
}

// ==================== VERSION ====================
export async function getVersions(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'TBLVRS',
      ApiDB: AppConfig.apiDB,
    },
  };
  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil data version:', error);
    return [];
  }
  return [];
}

// ==================== SINTAX LOGFILE EXEC ====================
export async function getSintaxLogfileExec(): Promise<any[]> {
  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'TBLXLF',
      ApiDB: AppConfig.apiDB,
    },
  };
  try {
    const response = await fetchingApi(`${AppConfig.apiUrl}/getDataCms`, objParams);
    if (response?.data?.items) {
      return response.data.items;
    }
  } catch (error) {
    console.error('Gagal mengambil data sintax logfile exec:', error);
    return [];
  }
  return [];
}