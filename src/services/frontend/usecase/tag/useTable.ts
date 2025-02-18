import { removeTag } from '@frontend/repository/api/tag';

import type { TableRowProps } from '@frontend/entity/shared/types';
import type { Tag } from '@frontend/entity/tag/types';

interface Props {
  selectedRow: Tag | null;
  setSelectedRow: (value: Tag | null) => void;
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
      removeTag(selectedRow?.id).then(() => {
        setDeleteDialogOpen(false);
        openNotification(
          'success',
          `Successfully delete tag with name: ${selectedRow?.name.eng}`
        );
        setSelectedRow(null);

        setLoading(true);

        getList();
      });
    }
  };

  const handleTriggerAction = (type: string, rowData: TableRowProps<Tag>) => {
    if (type === 'view') {
      navigateTo(`/dashboard/tag/${rowData.row.id}`);
    } else if (type === 'edit') {
      navigateTo(`/dashboard/tag/${rowData.row.id}/edit`);
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
    navigateTo('/dashboard/tag/add');
  };

  return {
    handleTriggerAction,
    handleOnDelete,
    handleRedirectToAddPage,
    handleApplyFilter,
  };
};

export default useTable;
