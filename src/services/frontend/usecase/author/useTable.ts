import { removeAuthor } from '@frontend/repository/api/author';

import type { TableRowProps } from '@frontend/entity/shared/types';
import type { Author } from '@frontend/entity/author/types';

interface Props {
  selectedRow: Author | null;
  setSelectedRow: (value: Author | null) => void;
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
      removeAuthor(selectedRow?.id).then(() => {
        setDeleteDialogOpen(false);
        openNotification(
          'success',
          `Successfully delete author with name: ${selectedRow?.name}`
        );
        setSelectedRow(null);

        setLoading(true);

        getList();
      });
    }
  };

  const handleTriggerAction = (
    type: string,
    rowData: TableRowProps<Author>
  ) => {
    if (type === 'view') {
      navigateTo(`/dashboard/author/${rowData.row.id}`);
    } else if (type === 'edit') {
      navigateTo(`/dashboard/author/${rowData.row.id}/edit`);
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
    navigateTo('/dashboard/author/add');
  };

  return {
    handleTriggerAction,
    handleOnDelete,
    handleRedirectToAddPage,
    handleApplyFilter,
  };
};

export default useTable;
