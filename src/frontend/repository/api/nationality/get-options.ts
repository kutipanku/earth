import { readOptionsAPI } from '../core';
import type { Pagination, ReponseAPI } from '../core/types';
import type { NationalityOptionItem } from './types';

type Response = ReponseAPI<NationalityOptionItem[]>;
interface Props extends Pagination {}

/**
 * Read options data to relative module's data source.
 */
const getNationalityOptions = async ({
  page,
  rowPerPage,
  filterString,
}: Props) => {
  const response = await readOptionsAPI<Response>({
    identifier: 'nationality',
    page,
    rowPerPage,
    filterString,
  });

  return response.data;
};

export default getNationalityOptions;
