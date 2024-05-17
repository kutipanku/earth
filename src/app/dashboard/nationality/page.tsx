'use client';

import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

import {
  TABLE_HEADER,
  INITIAL_FILTER_STATE,
  PAGE_TYPE,
  HOME_PAGE_TITLE,
  HOME_PAGE_REDIRECT_ADD,
} from '@/entity/nationality/constant';
import type { Nationality } from '@/entity/nationality/type';
import useTable from '@/usecase/useTable';
import UnifiedHeadTag from '@/presentation/Head';
import UnifiedFilter from '@/presentation/Filter';
import UnifiedHeaderHome from '@/presentation/HeaderHome';
import UnifiedDeleteDialog from '@/presentation/DialogDelete';
import styles from '@/styles/Dashboard.module.css';

const NationalityPage = () => {
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
  } = useTable<Nationality>({ name: PAGE_TYPE, identifier: 'name_en' });

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

export default NationalityPage;
