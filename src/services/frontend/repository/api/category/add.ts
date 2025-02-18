import { PAGE_TYPE } from '@frontend/entity/category/constants';
import { createData } from '../shared/fetcher';
import {
  constructExternalBodyPayload,
  constructOwnSystemData,
} from './normalizer';

import type { Category } from '@frontend/entity/category/types';
import type { AddCategory } from './types';

type AddCategoryResponse = AddCategory['response'];
type AddCategoryRequestBody = AddCategory['request']['body'];

/**
 * This function is responsible to make a network call to create new category.
 * Both the input and output data must be Category type
 */
const addCategory = async (category: Category) => {
  try {
    const response = await createData<
      AddCategoryRequestBody,
      AddCategoryResponse
    >({
      identifier: PAGE_TYPE,
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

export default addCategory;
