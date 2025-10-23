import React, { useEffect } from 'react';
import { getListAwards } from '@/lib/awards.api';
import { AppConfig } from '@/lib/config';

const ApiTester = () => {
  useEffect(() => {
    const testApi = async () => {
      console.log('Menguji koneksi API...');
      try {
        const data = await getListAwards(AppConfig.ApiDB);
        console.log('Koneksi API berhasil! Data:', data);
      } catch (error) {
        console.error('Koneksi API gagal:', error);
      }
    };
    testApi();
  }, []);
  return <div>Lihat konsol browser untuk hasilnya.</div>;
};

export default ApiTester;
