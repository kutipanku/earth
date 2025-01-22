import { removeProfession } from '@frontend/repository/api/profession';
import type { TableRowProps } from '@frontend/entity/core/types';
import type { ProfessionListItem } from '@frontend/repository/api/profession/types';

interface Props {
  selectedRow: ProfessionListItem | null;
  doSetSelectedRow: (value: ProfessionListItem | null) => void;
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
      removeProfession({ id: selectedRow?.id }).then(() => {
        doSetDeleteDialogOpen(false);
        doOpenNotification(
          'success',
          `Successfully delete profession with name: ${selectedRow?.name.eng}`
        );
        doSetSelectedRow(null);

        doSetLoading(true);

        doGetList();
      });
    }
  };

  const handleTriggerAction = (
    type: string,
    rowData: TableRowProps<ProfessionListItem>
  ) => {
    if (type === 'view') {
      doNavigate(`/dashboard/profession/${rowData.row.id}`);
    } else if (type === 'edit') {
      doNavigate(`/dashboard/profession/${rowData.row.id}/edit`);
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
    doNavigate(`/dashboard/profession/add`);
  };

  return {
    handleTriggerAction,
    handleOnDelete,
    handleRedirectToAddPage,
    handleApplyFilter,
  };
};

export default useTable;
