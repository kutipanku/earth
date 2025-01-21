import { readRowsAPI } from '../core';
import type { Pagination } from '../core/types';
import type { NationalityListOutputAPI } from './types';

interface Props extends Pagination {}

/**
 * Read rows data to relative module's data source.
 */
const getNationalityRows = async ({
  page,
  rowPerPage,
  filterString,
}: Props) => {
  const response = await readRowsAPI<NationalityListOutputAPI>({
    identifier: 'nationality',
    page,
    rowPerPage,
    filterString,
  });

  return response;
};

export default getNationalityRows;
