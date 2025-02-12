import { removeProfession } from '@frontend/repository/api/profession';

import type { TableRowProps } from '@/frontend/entity/shared/types';
import type { Profession } from '@frontend/entity/profession/types';

interface Props {
  selectedRow: Profession | null;
  setSelectedRow: (value: Profession | null) => void;
  replaceState: (value: string) => void;
  navigateTo: (url: string) => void;
  openNotification: (
    severity: 'success' | 'info' | 'warning' | 'error',
    message: string
  ) => void;
  setLoading: (value: boolean) => void;
  setDeleteDialogOpen: (value: boolean) => void;
  getList: (value?: string) => void;
}

const useTable = ({
  selectedRow,
  navigateTo,
  replaceState,
  openNotification,
  setSelectedRow,
  setLoading,
  setDeleteDialogOpen,
  getList,
}: Props) => {
  const handleOnDelete = () => {
    if (selectedRow !== null) {
      removeProfession(selectedRow?.id).then(() => {
        setDeleteDialogOpen(false);
        openNotification(
          'success',
          `Successfully delete profession with name: ${selectedRow?.name.eng}`
        );
        setSelectedRow(null);

        setLoading(true);

        getList();
      });
    }
  };

  const handleTriggerAction = (
    type: string,
    rowData: TableRowProps<Profession>
  ) => {
    if (type === 'view') {
      navigateTo(`/dashboard/profession/${rowData.row.id}`);
    } else if (type === 'edit') {
      navigateTo(`/dashboard/profession/${rowData.row.id}/edit`);
    } else {
      setSelectedRow(rowData.row);
      setDeleteDialogOpen(true);
    }
  };

  const handleApplyFilter = (joinedFilter: string) => {
    setLoading(true);
    replaceState(joinedFilter);
    getList(joinedFilter);
  };

  const handleRedirectToAddPage = () => {
    navigateTo(`/dashboard/profession/add`);
  };

  return {
    handleTriggerAction,
    handleOnDelete,
    handleRedirectToAddPage,
    handleApplyFilter,
  };
};

export default useTable;
