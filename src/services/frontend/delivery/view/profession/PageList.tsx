'use client';

import {
  INITIAL_FILTER_STATE,
  HOME_PAGE_TITLE,
  HOME_PAGE_REDIRECT_ADD,
} from '@frontend/entity/profession/constants';
import { useList, useTable } from '@frontend/usecase/profession';
import { useEffect, useState } from '../../lib/react';
import { useRouter, useSearchParams } from '../../lib/next';
import { Box } from '../../lib/mui';
import { DataGrid } from '../../lib/mui-x-date';
import { useNotificationContext } from '../notification';
import {
  UnifiedHeadTag,
  UnifiedFilter,
  UnifiedHeaderHome,
  DialogDelete,
} from '../../presentation';
import styles from '@/styles/Dashboard.module.css';
import { getTableHeader } from './functions';

import type {
  Profession,
  ProfessionFilter,
} from '@frontend/entity/profession/types';

const ProfessionPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [dispatch] = useNotificationContext();

  const [isLoading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Profession[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Profession | null>(null);

  const getFilterObject = (searchParams: URLSearchParams) => {
    const currentFilter: ProfessionFilter = {
      page:
        searchParams.get('page') !== null
          ? Number(searchParams.get('page'))
          : null,
      rowPerPage:
        searchParams.get('rowPerPage') !== null
          ? Number(searchParams.get('rowPerPage'))
          : null,
      name: searchParams.get('name'),
      slug: searchParams.get('slug'),
    };

    return currentFilter;
  };

  const { handleGetList } = useList({
    page,
    rowPerPage,
    filter: getFilterObject(searchParams),
    setCount: (total) => setCount(total),
    setLoading: (value) => setLoading(value),
    setList: (list) => setData(list),
  });

  const {
    handleTriggerAction,
    handleOnDelete,
    handleRedirectToAddPage,
    handleApplyFilter,
  } = useTable({
    selectedRow,
    navigateTo: (url) => router.push(url),
    replaceState: (value: string) =>
      window.history.replaceState({}, '', `?${value}`),
    openNotification: (severity, message) =>
      dispatch({
        type: 'OPEN_NOTIFICATION',
        payload: {
          message,
          severity,
        },
      }),
    setSelectedRow: (value: Profession | null) => setSelectedRow(value),
    setLoading: (value: boolean) => setLoading(value),
    setDeleteDialogOpen: (value: boolean) => setDeleteDialogOpen(value),
    getList: (newFilter?: string) => {
      const filterObject = getFilterObject(
        new URLSearchParams(newFilter || '')
      );
      handleGetList(filterObject);
    },
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
            columns={getTableHeader({
              triggerActionClick: handleTriggerAction,
            })}
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
