import { updateAPI } from '../shared/fetcher';
import { normalizeInput, normalizeOutputForField } from './normalizer';

import type { AuthorInput } from '@frontend/entity/author/types';
import type { ReponseAPI } from '../shared/types';
import type { AuthorAddInputAPI, AuthorResponseAPI } from './types';

interface Props {
  id: string;
  data: AuthorInput;
}

/**
 * Edit data to relative module's data source.
 */
const editAuthor = async ({ id, data }: Props) => {
  const response = await updateAPI<
    AuthorAddInputAPI,
    ReponseAPI<AuthorResponseAPI>
  >({
    identifier: 'author',
    body: normalizeInput(data),
    id,
  });

  return {
    ...response,
    data: normalizeOutputForField(response.data),
  };
};

export default editAuthor;
