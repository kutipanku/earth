import { PAGE_TYPE } from '@frontend/entity/author/constants';
import { deleteData } from '../shared/fetcher';
import { constructOwnSystemData } from './normalizer';

import type { RemoveAuthor } from './types';

type RemoveAuthorResponse = RemoveAuthor['response'];

/**
 * This function is responsible to make a network call to remove author.
 */
const removeAuthor = async (id: string) => {
  try {
    const response = await deleteData<RemoveAuthorResponse>({
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

export default removeAuthor;
