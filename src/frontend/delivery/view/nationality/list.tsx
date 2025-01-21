'use client';
import { useEffect, useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Box } from '@/frontend/delivery/lib/mui';
import { DataGrid } from '@/frontend/delivery/lib/mui-x-date';

import { useNotificationContext } from '../../view/notification';
import {
  INITIAL_FILTER_STATE,
  HOME_PAGE_TITLE,
  HOME_PAGE_REDIRECT_ADD,
} from '@/frontend/entity/nationality/constants';
import { useList, useTable } from '@frontend/usecase/nationality';
import {
  UnifiedHeadTag,
  UnifiedFilter,
  UnifiedHeaderHome,
  DialogDelete,
} from '../../presentation';
import styles from '@/styles/Dashboard.module.css';
import type { NationalityListItem } from '@frontend/repository/api/nationality/types';

import { TABLE_HEADER } from './constants';

const NationalityPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [dispatch] = useNotificationContext();

  const [isLoading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<NationalityListItem[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<NationalityListItem | null>(
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
    doNavigate: (url) => router.replace(url),
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
    doSetSelectedRow: (value: NationalityListItem | null) =>
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

export default NationalityPage;
