import { PAGE_TYPE } from '@frontend/entity/profession/constants';
import { readOptionsData } from '../shared/fetcher';
import { constructOwnSystemOptionData } from './normalizer';

import type { ProfessionFilter } from '@frontend/entity/profession/types';
import type { GetProfessionOptions } from './types';

type GetProfessionOptionsResponse = GetProfessionOptions['response'];

interface Props {
  page?: number;
  rowPerPage?: number;
  filter: ProfessionFilter;
}

/**
 * This function is responsible to make a network call to get profession as options.
 */
const getProfessionOptions = async ({
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
    const response = await readOptionsData<GetProfessionOptionsResponse>({
      identifier: PAGE_TYPE,
      page,
      rowPerPage,
      filterString: new URLSearchParams(processedFilter).toString(),
    });

    return {
      success: response.success,
      data: constructOwnSystemOptionData(response.data),
      message: response.message,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error,
    };
  }
};

export default getProfessionOptions;
