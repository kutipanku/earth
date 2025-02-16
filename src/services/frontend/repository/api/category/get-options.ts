import { PAGE_TYPE } from '@frontend/entity/category/constants';
import { readOptionsData } from '../shared/fetcher';
import { constructOwnSystemOptionData } from './normalizer';

import type { CategoryFilter } from '@frontend/entity/category/types';
import type { GetCategoryOptions } from './types';

type GetCategoryOptionsResponse = GetCategoryOptions['response'];

interface Props {
  page?: number;
  rowPerPage?: number;
  filter: CategoryFilter;
}

/**
 * This function is responsible to make a network call to get category as options.
 */
const getCategoryOptions = async ({
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
    const response = await readOptionsData<GetCategoryOptionsResponse>({
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

export default getCategoryOptions;
