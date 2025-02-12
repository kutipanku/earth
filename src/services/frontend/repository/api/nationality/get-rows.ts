import { PAGE_TYPE } from '@frontend/entity/nationality/constants';
import { readRowsData } from '../shared/fetcher';
import { constructOwnSystemRowData } from './normalizer';

import type {
  Nationality,
  NationalityFilter,
} from '@frontend/entity/nationality/types';
import type { GetNationalities } from './types';

type GetNationalitiesResponse = GetNationalities['response'];

interface Props {
  page?: number;
  rowPerPage?: number;
  filter: NationalityFilter;
}

/**
 * This function is responsible to make a network call to get nationality as rows.
 */
const getNationalityRows = async ({
  page = 0,
  rowPerPage = 100,
  filter,
}: Props) => {
  const processedFilter = Object.fromEntries(
    Object.entries(filter).filter(
      ([_, value]) => value !== null && value !== undefined
    )
  );

  try {
    const response: GetNationalitiesResponse = await readRowsData({
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
        list: [] as Nationality[],
        total: 0,
      },
    };
  }
};

export default getNationalityRows;
