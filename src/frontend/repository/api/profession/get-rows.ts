import { readRowsAPI } from '../shared/fetcher';
import type { Pagination } from '../shared/types';
import type { ProfessionListOutputAPI } from './types';

interface Props extends Pagination {}

/**
 * Read rows data to relative module's data source.
 */
const getProfessionRows = async ({ page, rowPerPage, filterString }: Props) => {
  const response = await readRowsAPI<ProfessionListOutputAPI>({
    identifier: 'profession',
    page,
    rowPerPage,
    filterString,
  });

  return response;
};

export default getProfessionRows;
