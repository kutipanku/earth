import { getAuthorRows } from '@frontend/repository/api/author';

import type { Author, AuthorFilter } from '@frontend/entity/author/types';

interface Props {
  page: number;
  rowPerPage: number;
  filter: AuthorFilter;
  setCount: (count: number) => void;
  setLoading: (value: boolean) => void;
  setList: (list: Author[]) => void;
}

const useList = ({
  page,
  rowPerPage,
  filter,
  setCount,
  setLoading,
  setList,
}: Props) => {
  const handleGetList = (directFilterString?: AuthorFilter) => {
    getAuthorRows({
      page,
      rowPerPage,
      filter: directFilterString || filter,
    }).then((responseObject) => {
      setCount(responseObject.data.total);
      setList(responseObject.data.list);
      setLoading(false);
    });
  };

  return { handleGetList };
};

export default useList;
