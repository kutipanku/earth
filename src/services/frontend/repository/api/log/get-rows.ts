import { PAGE_TYPE } from '@frontend/entity/log/constants';
import { readRowsData } from '../shared/fetcher';
import { constructOwnSystemRowData } from './normalizer';

import type { Log, LogFilter } from '@frontend/entity/log/types';
import type { GetLogs } from './types';

type GetNationalitiesResponse = GetLogs['response'];

interface Props {
  page?: number;
  rowPerPage?: number;
  filter: LogFilter;
}

/**
 * Read rows data to relative module's data source.
 */
const getLogRows = async ({ page = 0, rowPerPage = 100, filter }: Props) => {
  const processedFilter = Object.fromEntries(
    Object.entries(filter).filter(
      ([_, value]) => value !== null && value !== undefined
    )
  );

  try {
    const response = await readRowsData<GetNationalitiesResponse>({
      identifier: PAGE_TYPE,
      page,
      rowPerPage,
      filterString: new URLSearchParams(processedFilter).toString(),
    });

    return {
      succsess: response.success,
      message: null,
      data: {
        list: constructOwnSystemRowData(response.data.list),
        total: response.data.total,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error,
      data: {
        list: [] as Log[],
        total: 0,
      },
    };
  }
};

export default getLogRows;
