import { getCategoryRows } from '@frontend/repository/api/category';

import type { Category, CategoryFilter } from '@frontend/entity/category/types';

interface Props {
  page: number;
  rowPerPage: number;
  filter: CategoryFilter;
  setCount: (count: number) => void;
  setLoading: (value: boolean) => void;
  setList: (list: Category[]) => void;
}

const useList = ({
  page,
  rowPerPage,
  filter,
  setCount,
  setLoading,
  setList,
}: Props) => {
  const handleGetList = (directFilter?: CategoryFilter) => {
    getCategoryRows({
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
