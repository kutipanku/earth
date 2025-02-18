import { getAdminRows } from '@frontend/repository/api/admin';

import type { Admin, AdminFilter } from '@frontend/entity/admin/types';

interface Props {
  page: number;
  rowPerPage: number;
  filter: AdminFilter;
  setCount: (count: number) => void;
  setLoading: (value: boolean) => void;
  setList: (list: Admin[]) => void;
}

const useList = ({
  page,
  rowPerPage,
  filter,
  setCount,
  setLoading,
  setList,
}: Props) => {
  const handleGetList = (directFilterString?: AdminFilter) => {
    getAdminRows({
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
