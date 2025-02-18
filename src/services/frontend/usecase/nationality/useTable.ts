import { removeNationality } from '@frontend/repository/api/nationality';

import type { TableRowProps } from '@frontend/entity/shared/types';
import type { Nationality } from '@frontend/entity/nationality/types';

interface Props {
  selectedRow: Nationality | null;
  setSelectedRow: (value: Nationality | null) => void;
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
      removeNationality(selectedRow?.id).then(() => {
        setDeleteDialogOpen(false);
        openNotification(
          'success',
          `Successfully delete nationality with name: ${selectedRow?.name.eng}`
        );
        setSelectedRow(null);

        setLoading(true);

        getList();
      });
    }
  };

  const handleTriggerAction = (
    type: string,
    rowData: TableRowProps<Nationality>
  ) => {
    if (type === 'view') {
      navigateTo(`/dashboard/nationality/${rowData.row.id}`);
    } else if (type === 'edit') {
      navigateTo(`/dashboard/nationality/${rowData.row.id}/edit`);
    } else {
      setSelectedRow(rowData.row);
      setDeleteDialogOpen(true);
    }
  };

  const handleApplyFilter = (newFilter: string) => {
    setLoading(true);
    replaceState(newFilter);

    getList(newFilter);
  };

  const handleRedirectToAddPage = () => {
    navigateTo('/dashboard/nationality/add');
  };

  return {
    handleTriggerAction,
    handleOnDelete,
    handleRedirectToAddPage,
    handleApplyFilter,
  };
};

export default useTable;
