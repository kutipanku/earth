import { removeCategory } from '@frontend/repository/api/category';

import type { TableRowProps } from '@frontend/entity/shared/types';
import type { Category } from '@frontend/entity/category/types';

interface Props {
  selectedRow: Category | null;
  setSelectedRow: (value: Category | null) => void;
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
      removeCategory(selectedRow?.id).then(() => {
        setDeleteDialogOpen(false);
        openNotification(
          'success',
          `Successfully delete category with name: ${selectedRow?.name.eng}`
        );
        setSelectedRow(null);

        setLoading(true);

        getList();
      });
    }
  };

  const handleTriggerAction = (
    type: string,
    rowData: TableRowProps<Category>
  ) => {
    if (type === 'view') {
      navigateTo(`/dashboard/category/${rowData.row.id}`);
    } else if (type === 'edit') {
      navigateTo(`/dashboard/category/${rowData.row.id}/edit`);
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
    navigateTo('/dashboard/category/add');
  };

  return {
    handleTriggerAction,
    handleOnDelete,
    handleRedirectToAddPage,
    handleApplyFilter,
  };
};

export default useTable;
