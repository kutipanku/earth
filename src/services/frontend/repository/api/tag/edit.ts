import { PAGE_TYPE } from '@frontend/entity/tag/constants';
import { updateData } from '../shared/fetcher';
import {
  constructExternalBodyPayload,
  constructOwnSystemData,
} from './normalizer';

import type { Tag } from '@frontend/entity/tag/types';
import type { EditTag } from './types';

type EditTagResponse = EditTag['response'];
type EditTagRequestBody = EditTag['request']['body'];

/**
 * This function is responsible to make a network call to edit tag.
 * Both the input and output data must be Tag type
 */
const editTag = async (tag: Tag) => {
  try {
    const response = await updateData<EditTagRequestBody, EditTagResponse>({
      identifier: PAGE_TYPE,
      id: tag.id,
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

export default editTag;
