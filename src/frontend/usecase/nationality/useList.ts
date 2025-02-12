import { getNationalityRows } from '@frontend/repository/api/nationality';

import type {
  NationalityFilter,
  Nationality,
} from '@frontend/entity/nationality/types';

interface Props {
  page: number;
  rowPerPage: number;
  filter: NationalityFilter;
  setCount: (count: number) => void;
  setLoading: (value: boolean) => void;
  setList: (list: Nationality[]) => void;
}

const useList = ({
  page,
  rowPerPage,
  filter,
  setCount,
  setLoading,
  setList,
}: Props) => {
  const handleGetList = (directFilter?: NationalityFilter) => {
    getNationalityRows({
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
