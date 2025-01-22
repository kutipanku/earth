import { readOptionsAPI } from '../core';
import type { Pagination, ReponseAPI } from '../core/types';
import type { ProfessionOptionItem } from './types';

type Response = ReponseAPI<ProfessionOptionItem[]>;
interface Props extends Pagination {}

/**
 * Read options data to relative module's data source.
 */
const getProfessionOptions = async ({
  page,
  rowPerPage,
  filterString,
}: Props) => {
  const response = await readOptionsAPI<Response>({
    identifier: 'profession',
    page,
    rowPerPage,
    filterString,
  });

  return response.data;
};

export default getProfessionOptions;
