import type { TableRowProps } from '@frontend/entity/shared/types';
import type { Admin } from '@frontend/entity/admin/types';

interface Props {
  replaceState: (value: string) => void;
  navigateTo: (url: string) => void;
  setLoading: (value: boolean) => void;
  getList: (value?: string) => void;
}

const useTable = ({ navigateTo, replaceState, setLoading, getList }: Props) => {
  const handleTriggerAction = (type: string, rowData: TableRowProps<Admin>) => {
    if (type === 'view') {
      navigateTo(`/dashboard/admin/${rowData.row.id}`);
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
