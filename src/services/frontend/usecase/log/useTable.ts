import type { TableRowProps } from '@frontend/entity/shared/types';
import type { Log } from '@frontend/entity/log/types';

interface Props {
  replaceState: (value: string) => void;
  navigateTo: (url: string) => void;
  setLoading: (value: boolean) => void;
  getList: (value?: string) => void;
}

const useTable = ({ navigateTo, replaceState, setLoading, getList }: Props) => {
  const handleTriggerAction = (type: string, rowData: TableRowProps<Log>) => {
    if (type === 'view') {
      navigateTo(`/dashboard/log/${rowData.row.id}`);
    }

    return;
  };

  const handleApplyFilter = (joinedFilter: string) => {
    setLoading(true);
    replaceState(joinedFilter);
    getList(joinedFilter);
  };

  return {
    handleTriggerAction,
    handleApplyFilter,
  };
};

export default useTable;
