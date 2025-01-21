import type { Pagination } from './types';

interface Props extends Pagination {
  identifier: string;
}

async function readOptionsAPI<Output>({
  identifier,
  page,
  rowPerPage,
  filterString,
}: Props) {
  const response: Output = await fetch(
    `/api/${identifier}/options?page=${page}&limit=${rowPerPage}&${filterString}`
  ).then((res) => res.json());

  return response;
}

export default readOptionsAPI;
