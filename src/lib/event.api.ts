import { fetchingApi } from './catalog-api';
import { AppConfig } from './config';
import { EventDataRow, ResponseEventData } from '@/types/events.types';

export async function getListEvents(page = 1, limit = 8, category = ''): Promise<{ list: EventDataRow[]; totalRows: number }> {
  let sqlCondition = '';
  if (category != '') {
    sqlCondition = ` AND rtrim(evctgr) = '${category.toUpperCase()}' `;
  }
  const start = page * limit - limit;

  const objParams = {
    params: {
      Method: 'LoadGrid',
      Controller: 'EVNCMS',
      Iy: '1',
      FrmId: 'EVNCMS_LoadGrid',
      tipeGrid: 'WithPaging',
      withImage: '1',
      limit: limit,
      start: start,
      page: page,
      sqlCondition: sqlCondition || '',
      ApiDB: AppConfig.apiDB,
    },
  };
  const response = await fetchingApi(`${AppConfig.apiUrl}/getData`, objParams);

  if (response?.data?.items?.length > 0) {
    const datas: EventDataRow[] = response.data.items.map(
      (item: ResponseEventData, index: number) =>
        ({
          no: (index + 1).toString(),
          thumbnail: item.file,
          category: item.category,
          title: item.evtitl,
          description: item.evremk,
          postingDate: item.evpsdt,
          slug: item.evslug,
        } as EventDataRow)
    );
    return {
      list: datas,
      totalRows: response.data.total,
    };
  } else {
    return {
      list: [],
      totalRows: 0,
    };
  }
}
