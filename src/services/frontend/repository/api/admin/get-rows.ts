import { PAGE_TYPE } from '@frontend/entity/admin/constants';
import { readRowsData } from '../shared/fetcher';
import { constructOwnSystemRowData } from './normalizer';

import type { Admin, AdminFilter } from '@frontend/entity/admin/types';
import type { GetAdmins } from './types';

type GetAdminsResponse = GetAdmins['response'];

interface Props {
  page?: number;
  rowPerPage?: number;
  filter: AdminFilter;
}

/**
 * Read rows data to relative module's data source.
 */
const getAdminRows = async ({ page = 0, rowPerPage = 100, filter }: Props) => {
  const processedFilter = Object.fromEntries(
    Object.entries(filter).filter(
      ([_, value]) => value !== null && value !== undefined
    )
  );

  try {
    const response = await readRowsData<GetAdminsResponse>({
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
        list: [] as Admin[],
        total: 0,
      },
    };
  }
};

export default getAdminRows;
