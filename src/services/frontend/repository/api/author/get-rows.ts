import { readRowsAPI } from '../shared/fetcher';
import { normalizeOutputRow } from './normalizer';

import type { Pagination } from '../shared/types';
import type { AuthorListOutputAPI } from './types';

interface Props extends Pagination {}

/**
 * Read rows data to relative module's data source.
 */
const getAuthorRows = async ({ page, rowPerPage, filterString }: Props) => {
  const response = await readRowsAPI<AuthorListOutputAPI>({
    identifier: 'author',
    page,
    rowPerPage,
    filterString,
  });

  return {
    data: {
      list: response.data.list.map((row) => normalizeOutputRow(row)),
      total: response.data.total,
    },
    success: response.success,
  };
};

export default getAuthorRows;
