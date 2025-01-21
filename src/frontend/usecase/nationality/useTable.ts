import { useCallback, useEffect, useState, useMemo } from 'react';
import type { TableRowProps } from '@/frontend/entity/core/types';
import { removeNationality } from '@frontend/repository/api/nationality';
import type { NationalityListItem } from '@frontend/repository/api/nationality/types';

interface Props {
  selectedRow: NationalityListItem | null;
  doSetSelectedRow: (value: NationalityListItem | null) => void;
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
  const handleOnDelete = useCallback(() => {
    if (selectedRow !== null) {
      removeNationality({ id: selectedRow?.id }).then(() => {
        doSetDeleteDialogOpen(false);
        doOpenNotification(
          'success',
          `Successfully delete nationality with name: ${selectedRow?.name.eng}`
        );
        doSetSelectedRow(null);

        doSetLoading(true);

        doGetList();
      });
    }
  }, [selectedRow]);

  const handleTriggerAction = (
    type: string,
    rowData: TableRowProps<NationalityListItem>
  ) => {
    if (type === 'view') {
      doNavigate(`/dashboard/nationality/${rowData.row.id}`);
    } else if (type === 'edit') {
      doNavigate(`/dashboard/nationality/${rowData.row.id}/edit`);
    } else {
      doSetSelectedRow(rowData.row);
      doSetDeleteDialogOpen(true);
    }
  };

  const handleApplyFilter = (joinedFilter: string) => {
    console.warn('[DEBUG] joinedFilter', joinedFilter);
    doSetLoading(true);
    doReplaceState(joinedFilter);
    doGetList(joinedFilter);
  };

  const handleRedirectToAddPage = () => {
    doNavigate(`/dashboard/nationality/add`);
  };

  return {
    handleTriggerAction,
    handleOnDelete,
    handleRedirectToAddPage,
    handleApplyFilter,
  };
};

export default useTable;
