import { removeAuthor } from '@frontend/repository/api/author';
import type { TableRowProps } from '@/frontend/entity/shared/types';
import type { AuthorListItem } from '@frontend/repository/api/author/types';

interface Props {
  selectedRow: AuthorListItem | null;
  doSetSelectedRow: (value: AuthorListItem | null) => void;
  doReplaceState: (value: string) => void;
  doNavigate: (url: string) => void;
  doOpenNotification: (
    severity: 'success' | 'info' | 'warning' | 'error',
    message: string
  ) => void;
  doSetLoading: (value: boolean) => void;
  doSetDeleteDialogOpen: (value: boolean) => void;
  doGetList: (value?: string) => void;
}

const useTable = ({
  selectedRow,
  doNavigate,
  doReplaceState,
  doOpenNotification,
  doSetSelectedRow,
  doSetLoading,
  doSetDeleteDialogOpen,
  doGetList,
}: Props) => {
  const handleOnDelete = () => {
    if (selectedRow !== null) {
      removeAuthor({ id: selectedRow?.id }).then(() => {
        doSetDeleteDialogOpen(false);
        doOpenNotification(
          'success',
          `Successfully delete author with name: ${selectedRow?.name}`
        );
        doSetSelectedRow(null);

        doSetLoading(true);

        doGetList();
      });
    }
  };

  const handleTriggerAction = (
    type: string,
    rowData: TableRowProps<AuthorListItem>
  ) => {
    if (type === 'view') {
      doNavigate(`/dashboard/author/${rowData.row.id}`);
    } else if (type === 'edit') {
      doNavigate(`/dashboard/author/${rowData.row.id}/edit`);
    } else {
      doSetSelectedRow(rowData.row);
      doSetDeleteDialogOpen(true);
    }
  };

  const handleApplyFilter = (joinedFilter: string) => {
    doSetLoading(true);
    doReplaceState(joinedFilter);
    doGetList(joinedFilter);
  };

  const handleRedirectToAddPage = () => {
    doNavigate(`/dashboard/author/add`);
  };

  return {
    handleTriggerAction,
    handleOnDelete,
    handleRedirectToAddPage,
    handleApplyFilter,
  };
};

export default useTable;
