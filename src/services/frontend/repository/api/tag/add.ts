import { PAGE_TYPE } from '@frontend/entity/tag/constants';
import { createData } from '../shared/fetcher';
import {
  constructExternalBodyPayload,
  constructOwnSystemData,
} from './normalizer';

import type { Tag } from '@frontend/entity/tag/types';
import type { AddTag } from './types';

type AddTagResponse = AddTag['response'];
type AddTagRequestBody = AddTag['request']['body'];

/**
 * This function is responsible to make a network call to create new tag.
 * Both the input and output data must be Tag type
 */
const addTag = async (tag: Tag) => {
  try {
    const response = await createData<AddTagRequestBody, AddTagResponse>({
      identifier: PAGE_TYPE,
      body: constructExternalBodyPayload(tag),
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

export default addTag;
