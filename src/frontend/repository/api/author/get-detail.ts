import { readDetailAPI } from '../core';
import { normalizeOutputForField } from './normalizer';

import type { ReponseAPI } from '../core/types';
import type { AuthorResponseAPI } from './types';

interface Props {
  id: string;
  type?: 'default' | 'edit';
}

/**
 * Read detailed data to relative module's data source.
 */
const getAuthorDetail = async ({ id, type = 'default' }: Props) => {
  const response = await readDetailAPI<string, ReponseAPI<AuthorResponseAPI>>({
    identifier: 'author',
    id,
  });

  return {
    ...response,
    data: normalizeOutputForField(response.data, type),
  };
};

export default getAuthorDetail;
