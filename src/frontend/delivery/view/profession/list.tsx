'use client';

import {
  INITIAL_FILTER_STATE,
  HOME_PAGE_TITLE,
  HOME_PAGE_REDIRECT_ADD,
} from '@frontend/entity/profession/constants';
import { useList, useTable } from '@frontend/usecase/profession';
import { useEffect, useState, useMemo } from '../../lib/react';
import { useRouter, useSearchParams } from '../../lib/next';
import { Box } from '../../lib/mui';
import { DataGrid } from '../../lib/mui-x-date';
import { useNotificationContext } from '../../view/notification';
import {
  UnifiedHeadTag,
  UnifiedFilter,
  UnifiedHeaderHome,
  DialogDelete,
} from '../../presentation';
import styles from '@/styles/Dashboard.module.css';
import { TABLE_HEADER } from './constants';

import type { ProfessionListItem } from '@frontend/repository/api/profession/types';

const ProfessionPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [dispatch] = useNotificationContext();

  const [isLoading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ProfessionListItem[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ProfessionListItem | null>(
    null
  );

  const filterString = useMemo(() => {
    const filterArray: string[] = [];
    INITIAL_FILTER_STATE.forEach((filterKey) => {
      const searchParam = searchParams.get(filterKey.key);

      if (searchParam) {
        filterArray.push(filterKey.key + '=' + searchParam);
      }
    });

    return filterArray.join('&');
  }, [searchParams]);

  const { handleGetList } = useList({
    page,
    rowPerPage,
    filterString,
    doSetCount: (total) => setCount(total),
    doSetLoading: (value) => setLoading(value),
    doSetList: (list) => setData(list),
  });

  const {
    handleTriggerAction,
    handleOnDelete,
    handleRedirectToAddPage,
    handleApplyFilter,
  } = useTable({
    selectedRow,
    doNavigate: (url) => router.push(url),
    doReplaceState: (value: string) =>
      window.history.replaceState({}, '', `?${value}`),
    doOpenNotification: (severity, message) =>
      dispatch({
        type: 'OPEN_NOTIFICATION',
        payload: {
          message,
          severity,
        },
      }),
    doSetSelectedRow: (value: ProfessionListItem | null) =>
      setSelectedRow(value),
    doSetLoading: (value: boolean) => setLoading(value),
    doSetDeleteDialogOpen: (value: boolean) => setDeleteDialogOpen(value),
    doGetList: handleGetList,
  });

  useEffect(() => {
    handleGetList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <UnifiedHeadTag title={HOME_PAGE_TITLE} />

      <main className={styles.main}>
        <UnifiedHeaderHome
          title={HOME_PAGE_TITLE}
          actAdd={HOME_PAGE_REDIRECT_ADD}
          isLoading={isLoading}
          actAddFunction={handleRedirectToAddPage}
        />
        <UnifiedFilter
          isLoading={isLoading}
          initialFilterState={INITIAL_FILTER_STATE}
          handleApplyFilter={handleApplyFilter}
        />
        <Box style={{ height: 700, width: '100%' }}>
          <DataGrid
            rows={data}
            rowCount={count}
            columns={TABLE_HEADER(handleTriggerAction)}
            disableSelectionOnClick
            disableColumnMenu
            loading={isLoading}
            pagination
            page={page}
            pageSize={rowPerPage}
            paginationMode='server'
            rowsPerPageOptions={[10, 20, 50]}
            onPageChange={setPage}
            onPageSizeChange={setRowPerPage}
          />
        </Box>
        <DialogDelete
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleOnDelete}
          identifier={selectedRow?.name.eng || ''}
        />
      </main>
    </div>
  );
};

export default ProfessionPage;
