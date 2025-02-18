import { PAGE_TYPE } from '@frontend/entity/tag/constants';
import { readOptionsData } from '../shared/fetcher';
import { constructOwnSystemOptionData } from './normalizer';

import type { TagFilter } from '@frontend/entity/tag/types';
import type { GetTagOptions } from './types';

type GetTagOptionsResponse = GetTagOptions['response'];

interface Props {
  page?: number;
  rowPerPage?: number;
  filter: TagFilter;
}

/**
 * This function is responsible to make a network call to get tag as options.
 */
const getTagOptions = async ({ page = 0, rowPerPage = 100, filter }: Props) => {
  const processedFilter = Object.fromEntries(
    Object.entries(filter).filter(
      ([_, value]) => value !== null && value !== undefined
    )
  );

  try {
    const response = await readOptionsData<GetTagOptionsResponse>({
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

export default getTagOptions;
