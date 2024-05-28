'use client';

import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

import {
  TABLE_HEADER,
  INITIAL_FILTER_STATE,
  PAGE_TYPE,
  HOME_PAGE_TITLE,
} from '@/entity/log/constant';
import type { Log } from '@/entity/log/type';
import useTable from '@/usecase/useTable';
import UnifiedHeadTag from '@/presentation/Head';
import UnifiedFilter from '@/presentation/Filter';
import UnifiedHeaderHome from '@/presentation/HeaderHome';
import UnifiedDeleteDialog from '@/presentation/DialogDelete';
import styles from '@/styles/Dashboard.module.css';

const LogPage = () => {
  const {
    isLoading,
    data,
    count,
    page,
    rowPerPage,
    deleteDialogOpen,
    selectedRow,
    setPage,
    setRowPerPage,
    setDeleteDialogOpen,
    handleTriggerAction,
    handleOnDelete,
    handleRedirectToAddPage,
    handleApplyFilter,
  } = useTable<Log>({
    name: PAGE_TYPE,
    filter: INITIAL_FILTER_STATE,
    rowPerPage: 20,
  });

  return (
    <div className={styles.container}>
      <UnifiedHeadTag title={HOME_PAGE_TITLE} />

      <main className={styles.main}>
        <UnifiedHeaderHome
          title={HOME_PAGE_TITLE}
          actAdd=''
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
            rowsPerPageOptions={[10, 20, 50, 100, 200]}
            onPageChange={setPage}
            onPageSizeChange={setRowPerPage}
          />
        </Box>
        <UnifiedDeleteDialog
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleOnDelete}
          identifier={selectedRow?.row.name_en || ''}
        />
      </main>
    </div>
  );
};

export default LogPage;
