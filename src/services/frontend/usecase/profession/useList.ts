import { getProfessionRows } from '@frontend/repository/api/profession';

import type {
  Profession,
  ProfessionFilter,
} from '@frontend/entity/profession/types';

interface Props {
  page: number;
  rowPerPage: number;
  filter: ProfessionFilter;
  setCount: (count: number) => void;
  setLoading: (value: boolean) => void;
  setList: (list: Profession[]) => void;
}

const useList = ({
  page,
  rowPerPage,
  filter,
  setCount,
  setLoading,
  setList,
}: Props) => {
  const handleGetList = (directFilter?: ProfessionFilter) => {
    getProfessionRows({
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
