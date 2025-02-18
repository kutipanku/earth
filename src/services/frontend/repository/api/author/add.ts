import { PAGE_TYPE } from '@frontend/entity/author/constants';
import { createData } from '../shared/fetcher';
import {
  constructExternalBodyPayload,
  constructOwnSystemData,
} from './normalizer';

import type { Author } from '@frontend/entity/author/types';
import type { AddAuthor } from './types';

type AddAuthorResponse = AddAuthor['response'];
type AddAuthorRequestBody = AddAuthor['request']['body'];

/**
 * This function is responsible to make a network call to create new author.
 * Both the input and output data must be Author type
 */
const addAuthor = async (author: Author) => {
  const response = await createData<AddAuthorRequestBody, AddAuthorResponse>({
    identifier: PAGE_TYPE,
    body: constructExternalBodyPayload(author),
  });

  return {
    ...response,
    data: constructOwnSystemData(response.data),
  };
};

export default addAuthor;
