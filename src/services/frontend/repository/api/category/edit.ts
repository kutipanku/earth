import { PAGE_TYPE } from '@frontend/entity/category/constants';
import { updateData } from '../shared/fetcher';
import {
  constructExternalBodyPayload,
  constructOwnSystemData,
} from './normalizer';

import type { Category } from '@frontend/entity/category/types';
import type { EditCategory } from './types';

type EditCategoryResponse = EditCategory['response'];
type EditCategoryRequestBody = EditCategory['request']['body'];

/**
 * This function is responsible to make a network call to edit category.
 * Both the input and output data must be Category type
 */
const editCategory = async (category: Category) => {
  try {
    const response = await updateData<
      EditCategoryRequestBody,
      EditCategoryResponse
    >({
      identifier: PAGE_TYPE,
      id: category.id,
      body: constructExternalBodyPayload(category),
    });

    return {
      success: response.success,
      message: response.message,
      fields: response.fields,
      data: constructOwnSystemData(response.data),
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      fields: [],
      message: error,
    };
  }
};

export default editCategory;
