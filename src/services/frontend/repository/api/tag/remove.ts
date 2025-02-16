import { PAGE_TYPE } from '@frontend/entity/tag/constants';
import { deleteData } from '../shared/fetcher';
import { constructOwnSystemData } from './normalizer';

import type { RemoveTag } from './types';

type RemoveTagResponse = RemoveTag['response'];

/**
 * This function is responsible to make a network call to remove tag.
 */
const removeTag = async (id: string) => {
  try {
    const response = await deleteData<RemoveTagResponse>({
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

export default removeTag;
