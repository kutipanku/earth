import type { Pagination } from '../types';

interface Props extends Pagination {
  identifier: string;
}

async function readRowsData<Output>({
  identifier,
  page,
  rowPerPage,
  filterString,
}: Props) {
  return fetch(
    `/api/${identifier}?page=${page}&limit=${rowPerPage}&${filterString}`
  ).then((res) => res.json() as Output);
}

export default readRowsData;
