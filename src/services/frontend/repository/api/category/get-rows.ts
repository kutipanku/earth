import { PAGE_TYPE } from '@frontend/entity/category/constants';
import { readRowsData } from '../shared/fetcher';
import { constructOwnSystemRowData } from './normalizer';

import type { Category, CategoryFilter } from '@frontend/entity/category/types';
import type { GetCategories } from './types';

type GetCategoriesResponse = GetCategories['response'];

interface Props {
  page?: number;
  rowPerPage?: number;
  filter: CategoryFilter;
}

/**
 * This function is responsible to make a network call to get category as rows.
 */
const getCategoryRows = async ({
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
    const response: GetCategoriesResponse = await readRowsData({
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
        list: [] as Category[],
        total: 0,
      },
    };
  }
};

export default getCategoryRows;
