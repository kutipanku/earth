import { getLogRows } from '@frontend/repository/api/log';

import type { Log, LogFilter } from '@frontend/entity/log/types';

interface Props {
  page: number;
  rowPerPage: number;
  filter: LogFilter;
  setCount: (count: number) => void;
  setLoading: (value: boolean) => void;
  setList: (list: Log[]) => void;
}

const useList = ({
  page,
  rowPerPage,
  filter,
  setCount,
  setLoading,
  setList,
}: Props) => {
  const handleGetList = (directFilterString?: LogFilter) => {
    getLogRows({
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
