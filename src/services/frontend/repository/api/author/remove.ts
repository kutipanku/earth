import { deleteAPI } from '../shared/fetcher';
import { normalizeOutputForField } from './normalizer';

import type { ReponseAPI } from '../shared/types';
import type { AuthorResponseAPI } from './types';

interface Props {
  id: string;
}

/**
 * Remove data to relative module's data source.
 */
const removeAuthor = async ({ id }: Props) => {
  const response = await deleteAPI<string, ReponseAPI<AuthorResponseAPI>>({
    identifier: 'author',
    id,
  });

  return {
    ...response,
    data: normalizeOutputForField(response.data),
  };
};

export default removeAuthor;
