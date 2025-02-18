import { PAGE_TYPE } from '@frontend/entity/category/constants';
import { deleteData } from '../shared/fetcher';
import { constructOwnSystemData } from './normalizer';

import type { RemoveCategory } from './types';

type RemoveCategoryResponse = RemoveCategory['response'];

/**
 * This function is responsible to make a network call to remove category.
 */
const removeCategory = async (id: string) => {
  try {
    const response = await deleteData<RemoveCategoryResponse>({
      identifier: PAGE_TYPE,
      id,
    });

    return {
      success: response.success,
      message: response.message,
      data: constructOwnSystemData(response.data),
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error,
    };
  }
};

export default removeCategory;
