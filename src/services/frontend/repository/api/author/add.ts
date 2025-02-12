import { createAPI } from '../shared/fetcher';
import { normalizeInput, normalizeOutputForField } from './normalizer';

import type { AuthorInput } from '@frontend/entity/author/types';
import type { ReponseAPI } from '../shared/types';
import type { AuthorAddInputAPI, AuthorResponseAPI } from './types';

interface Props {
  data: AuthorInput;
}

/**
 * Add data to relative module's data source.
 */
const addAuthor = async ({ data }: Props) => {
  const response = await createAPI<
    AuthorAddInputAPI,
    ReponseAPI<AuthorResponseAPI>
  >({
    identifier: 'author',
    body: normalizeInput(data),
  });

  return {
    ...response,
    data: normalizeOutputForField(response.data),
  };
};

export default addAuthor;
