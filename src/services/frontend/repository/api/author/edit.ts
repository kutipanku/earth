import { PAGE_TYPE } from '@frontend/entity/author/constants';
import { updateData } from '../shared/fetcher';
import {
  constructExternalBodyPayload,
  constructOwnSystemData,
} from './normalizer';

import type { Author } from '@frontend/entity/author/types';
import type { EditAuthor } from './types';

type EditAuthorResponse = EditAuthor['response'];
type EditAuthorRequestBody = EditAuthor['request']['body'];

/**
 * This function is responsible to make a network call to edit author.
 * Both the input and output data must be Author type
 */
const editAuthor = async (author: Author) => {
  try {
    const response = await updateData<
      EditAuthorRequestBody,
      EditAuthorResponse
    >({
      identifier: PAGE_TYPE,
      id: author.id,
      body: constructExternalBodyPayload(author),
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

export default editAuthor;
