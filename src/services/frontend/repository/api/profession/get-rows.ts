import { PAGE_TYPE } from '@frontend/entity/profession/constants';
import { readRowsData } from '../shared/fetcher';
import { constructOwnSystemRowData } from './normalizer';

import type {
  Profession,
  ProfessionFilter,
} from '@frontend/entity/profession/types';
import type { GetProfessions } from './types';

type GetNationalitiesResponse = GetProfessions['response'];

interface Props {
  page?: number;
  rowPerPage?: number;
  filter: ProfessionFilter;
}

/**
 * This function is responsible to make a network call to get profession as rows.
 */
const getProfessionRows = async ({
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
        list: [] as Profession[],
        total: 0,
      },
    };
  }
};

export default getProfessionRows;
