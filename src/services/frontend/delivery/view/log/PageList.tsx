'use client';

import {
  INITIAL_FILTER_STATE,
  HOME_PAGE_TITLE,
} from '@frontend/entity/log/constants';
import { useList, useTable } from '@frontend/usecase/log';
import { useEffect, useState } from '../../lib/react';
import { useRouter, useSearchParams } from '../../lib/next';
import { Box } from '../../lib/mui';
import { DataGrid } from '../../lib/mui-x-date';
import {
  UnifiedHeadTag,
  UnifiedFilter,
  UnifiedHeaderHome,
} from '../../presentation';
import styles from '../shared/Dashboard.module.css';
import { getTableHeader } from './functions';

import type { Log, LogFilter } from '@frontend/entity/log/types';

const LogPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Log[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);

  const getFilterObject = (searchParams: URLSearchParams) => {
    const currentFilter: LogFilter = {
      page:
        searchParams.get('page') !== null
          ? Number(searchParams.get('page'))
          : null,
      rowPerPage:
        searchParams.get('rowPerPage') !== null
          ? Number(searchParams.get('rowPerPage'))
          : null,
      admin: searchParams.get('admin'),
      action: searchParams.get('action'),
      entity: searchParams.get('entity'),
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

  const { handleTriggerAction, handleApplyFilter } = useTable({
    navigateTo: (url) => router.push(url),
    replaceState: (value: string) =>
      window.history.replaceState({}, '', `?${value}`),
    setLoading: (value: boolean) => setLoading(value),
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
          actAdd={''}
          isLoading={isLoading}
          actAddFunction={() => {}}
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
      </main>
    </div>
  );
};

export default LogPage;
