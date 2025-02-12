import type { Pagination } from '../types';

interface Props extends Pagination {
  identifier: string;
}

async function readOptionsData<Output>({
  identifier,
  page,
  rowPerPage,
  filterString,
}: Props) {
  return fetch(
    `/api/${identifier}/options?page=${page}&limit=${rowPerPage}&${filterString}`
  ).then((res) => res.json() as Output);
}

export default readOptionsData;
