'use client';

import {
  INITIAL_FILTER_STATE,
  HOME_PAGE_TITLE,
  HOME_PAGE_REDIRECT_ADD,
} from '@frontend/entity/quote/constants';
import { useList, useTable } from '@frontend/usecase/quote';
import { useEffect, useState, useMemo } from '../../lib/react';
import { useRouter, useSearchParams } from '../../lib/next';
import { Box } from '../../lib/mui';
import { DataGrid } from '../../lib/mui-x-date';
import {
  UnifiedHeadTag,
  UnifiedFilter,
  UnifiedHeaderHome,
  DialogDelete,
} from '../../presentation';
import { useNotificationContext } from '../notification';
import styles from '@/styles/Dashboard.module.css';
import { getTableHeader } from './functions';

import type { Quote, QuoteFilter } from '@frontend/entity/quote/types';

const QuotePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [dispatch] = useNotificationContext();

  const [isLoading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Quote[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Quote | null>(null);

  const getFilterObject = (searchParams: URLSearchParams) => {
    const currentFilter: QuoteFilter = {
      page:
        searchParams.get('page') !== null
          ? Number(searchParams.get('page'))
          : null,
      rowPerPage:
        searchParams.get('rowPerPage') !== null
          ? Number(searchParams.get('rowPerPage'))
          : null,
      content: searchParams.get('content'),
      description: searchParams.get('description'),
      author: searchParams.get('author'),
      category: searchParams.get('category'),
      tags:
        searchParams.getAll('tags').length !== 0
          ? searchParams.getAll('tags')
          : null,
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
    setSelectedRow: (value: Quote | null) => setSelectedRow(value),
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
          identifier={selectedRow?.content.eng || ''}
        />
      </main>
    </div>
  );
};

export default QuotePage;
