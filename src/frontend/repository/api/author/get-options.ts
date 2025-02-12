import { readOptionsAPI } from '../shared/fetcher';

import type { Pagination, ReponseAPI } from '../shared/types';
import type { AuthorOptionItem } from './types';

interface Props extends Pagination {}

/**
 * Read options data to relative module's data source.
 */
const getAuthorOptions = async ({ page, rowPerPage, filterString }: Props) => {
  const response = await readOptionsAPI<ReponseAPI<AuthorOptionItem[]>>({
    identifier: 'author',
    page,
    rowPerPage,
    filterString,
  });

  return response.data;
};

export default getAuthorOptions;
