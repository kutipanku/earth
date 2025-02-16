import { PAGE_TYPE } from '@frontend/entity/category/constants';
import { readDetailData } from '../shared/fetcher';
import { constructOwnSystemFieldData } from './normalizer';

import type { GetCategory } from './types';

type GetCategoryResponse = GetCategory['response'];

/**
 * Read detailed data to relative module's data source.
 */
const getCategoryDetail = async (id: string) => {
  try {
    const response = await readDetailData<GetCategoryResponse>({
      identifier: PAGE_TYPE,
      id,
    });

    return {
      success: response.success,
      data: constructOwnSystemFieldData(response.data),
      message: response.message,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error,
    };
  }
};

export default getCategoryDetail;
