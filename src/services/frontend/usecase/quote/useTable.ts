import { removeQuote } from '@frontend/repository/api/quote';

import type { TableRowProps } from '@frontend/entity/shared/types';
import type { Quote } from '@frontend/entity/quote/types';

interface Props {
  selectedRow: Quote | null;
  setSelectedRow: (value: Quote | null) => void;
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
      removeQuote(selectedRow?.id).then(() => {
        setDeleteDialogOpen(false);
        openNotification(
          'success',
          `Successfully delete quote with name: ${selectedRow?.content.eng}`
        );
        setSelectedRow(null);

        setLoading(true);

        getList();
      });
    }
  };

  const handleTriggerAction = (type: string, rowData: TableRowProps<Quote>) => {
    if (type === 'view') {
      navigateTo(`/dashboard/quote/${rowData.row.id}`);
    } else if (type === 'edit') {
      navigateTo(`/dashboard/quote/${rowData.row.id}/edit`);
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
    navigateTo('/dashboard/quote/add');
  };

  return {
    handleTriggerAction,
    handleOnDelete,
    handleRedirectToAddPage,
    handleApplyFilter,
  };
};

export default useTable;
