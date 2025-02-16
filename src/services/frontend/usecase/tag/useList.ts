import { getTagRows } from '@frontend/repository/api/tag';

import type { Tag, TagFilter } from '@frontend/entity/tag/types';

interface Props {
  page: number;
  rowPerPage: number;
  filter: TagFilter;
  setCount: (count: number) => void;
  setLoading: (value: boolean) => void;
  setList: (list: Tag[]) => void;
}

const useList = ({
  page,
  rowPerPage,
  filter,
  setCount,
  setLoading,
  setList,
}: Props) => {
  const handleGetList = (directFilter?: TagFilter) => {
    getTagRows({
      page,
      rowPerPage,
      filter: directFilter || filter,
    }).then((responseObject) => {
      setCount(responseObject.data.total);
      setList(responseObject.data.list);
      setLoading(false);
    });
  };

  return { handleGetList };
};

export default useList;
